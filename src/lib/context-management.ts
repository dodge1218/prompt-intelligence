import { supabase } from './supabase';
import { ContextFile } from './types';
import { generateEmbedding } from './vectorization';

export async function uploadContextFile(file: File): Promise<ContextFile> {
  const user = await supabase.auth.getUser();
  if (!user.data.user) throw new Error('User not authenticated');

  const content = await readFileContent(file);
  const fileType = getFileType(file.name);
  
  // Estimate token count (rough approximation: 4 chars per token)
  const tokenCount = Math.ceil(content.length / 4);

  // Generate embedding for the content
  let embedding: number[] | null = null;
  try {
    // Only generate embedding if content is not too large (e.g., < 8000 tokens)
    // Otherwise we might need to chunk it (future improvement)
    if (tokenCount < 8000) {
      embedding = await generateEmbedding(content);
    }
  } catch (error) {
    console.warn('Failed to generate embedding for context file:', error);
  }

  const { data, error } = await supabase
    .from('context_files')
    .insert({
      user_id: user.data.user.id,
      filename: file.name,
      file_type: fileType,
      content: content,
      token_count: tokenCount,
      vector_embedding: embedding
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    userId: data.user_id,
    filename: data.filename,
    fileType: data.file_type as any,
    content: data.content,
    tokenCount: data.token_count,
    createdAt: data.created_at
  };
}

export async function getContextFiles(): Promise<ContextFile[]> {
  const user = await supabase.auth.getUser();
  if (!user.data.user) return [];

  const { data, error } = await supabase
    .from('context_files')
    .select('*')
    .eq('user_id', user.data.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch context files:', error);
    return [];
  }

  return data.map(d => ({
    id: d.id,
    userId: d.user_id,
    filename: d.filename,
    fileType: d.file_type as any,
    content: d.content,
    tokenCount: d.token_count,
    createdAt: d.created_at
  }));
}

export async function deleteContextFile(fileId: string): Promise<void> {
  const user = await supabase.auth.getUser();
  if (!user.data.user) throw new Error('User not authenticated');

  const { error } = await supabase
    .from('context_files')
    .delete()
    .eq('id', fileId)
    .eq('user_id', user.data.user.id);

  if (error) throw error;
}

function readFileContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
}

function getFileType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (['json', 'csv', 'md', 'txt'].includes(ext || '')) {
    return ext!;
  }
  return 'txt'; // Default
}
