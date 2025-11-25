import { supabase } from './supabase'

export interface SimilarPromptResult {
  id: string
  prompt: string
  ice_overall: number
  pie_tier: number
  similarity: number
}

export interface NovelPromptResult {
  id: string
  prompt: string
  ice_idea: number
  ice_overall: number
  pie_tier: number
  created_at: string
}

export interface ExploitablePromptResult {
  id: string
  prompt: string
  ice_exploitability: number
  ice_overall: number
  pie_tier: number
  created_at: string
}

export interface ClassifiedPromptResult {
  id: string
  prompt: string
  ice_overall: number
  pie_tier: number
  pie_primary_category: string
  created_at: string
}

export async function generateEmbedding(prompt: string): Promise<number[]> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  
  if (!apiKey) {
    console.warn('OpenAI API key not configured, skipping embedding generation')
    throw new Error('OpenAI API key not configured')
  }

  try {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: prompt,
        model: 'text-embedding-3-large',
        encoding_format: 'float',
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Embedding API failed: ${error.error?.message || response.statusText}`)
    }

    const data = await response.json()
    return data.data[0].embedding
  } catch (error) {
    console.error('Failed to generate embedding:', error)
    throw error
  }
}

export async function findSimilarPrompts(
  embedding: number[],
  userId: string,
  threshold: number = 0.7,
  limit: number = 10
): Promise<SimilarPromptResult[]> {
  try {
    const { data, error } = await supabase.rpc('find_similar_prompts', {
      query_embedding: embedding,
      match_threshold: threshold,
      match_count: limit,
      filter_user_id: userId,
    })

    if (error) {
      console.error('Error finding similar prompts:', error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Failed to find similar prompts:', error)
    return []
  }
}

export async function detectDuplicate(
  prompt: string,
  userId: string,
  threshold: number = 0.9
): Promise<{ isDuplicate: boolean; similarPrompt?: SimilarPromptResult; similarity?: number }> {
  try {
    const embedding = await generateEmbedding(prompt)
    const similar = await findSimilarPrompts(embedding, userId, threshold, 1)
    
    if (similar.length > 0 && similar[0].similarity >= threshold) {
      return {
        isDuplicate: true,
        similarPrompt: similar[0],
        similarity: similar[0].similarity,
      }
    }

    return { isDuplicate: false }
  } catch (error) {
    console.error('Failed to detect duplicate:', error)
    return { isDuplicate: false }
  }
}

export async function getTopNovelPrompts(
  userId: string,
  limit: number = 10
): Promise<NovelPromptResult[]> {
  try {
    const { data, error } = await supabase.rpc('get_top_novel_prompts', {
      user_uuid: userId,
      limit_count: limit,
    })

    if (error) {
      console.error('Error getting top novel prompts:', error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Failed to get top novel prompts:', error)
    return []
  }
}

export async function getTopExploitablePrompts(
  userId: string,
  limit: number = 10
): Promise<ExploitablePromptResult[]> {
  try {
    const { data, error } = await supabase.rpc('get_top_exploitable_prompts', {
      user_uuid: userId,
      limit_count: limit,
    })

    if (error) {
      console.error('Error getting top exploitable prompts:', error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Failed to get top exploitable prompts:', error)
    return []
  }
}

export async function getPromptsByClassification(
  userId: string,
  tier?: number,
  category?: string,
  limit: number = 50
): Promise<ClassifiedPromptResult[]> {
  try {
    const { data, error } = await supabase.rpc('get_prompts_by_classification', {
      user_uuid: userId,
      target_tier: tier || null,
      target_category: category || null,
      limit_count: limit,
    })

    if (error) {
      console.error('Error getting prompts by classification:', error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Failed to get prompts by classification:', error)
    return []
  }
}

export async function saveAnalysisWithEmbedding(
  analysisData: any,
  embedding?: number[]
): Promise<void> {
  try {
    const dataToInsert = embedding
      ? { ...analysisData, vector_embedding: embedding }
      : analysisData

    const { error } = await supabase
      .from('prompt_analyses')
      .insert(dataToInsert)

    if (error) {
      console.error('Failed to save analysis with embedding:', error)
      throw error
    }
  } catch (error) {
    console.error('Error saving analysis with embedding:', error)
    throw error
  }
}

export async function backfillEmbeddings(batchSize: number = 100): Promise<void> {
  try {
    const { data: prompts, error } = await supabase
      .from('prompt_analyses')
      .select('id, prompt')
      .is('vector_embedding', null)
      .limit(batchSize)

    if (error) {
      console.error('Error fetching prompts for backfill:', error)
      throw error
    }

    if (!prompts || prompts.length === 0) {
      console.log('No prompts to backfill')
      return
    }

    console.log(`Backfilling embeddings for ${prompts.length} prompts...`)

    for (const prompt of prompts) {
      try {
        const embedding = await generateEmbedding(prompt.prompt)
        
        const { error: updateError } = await supabase
          .from('prompt_analyses')
          .update({ vector_embedding: embedding })
          .eq('id', prompt.id)

        if (updateError) {
          console.error(`Failed to update embedding for prompt ${prompt.id}:`, updateError)
        } else {
          console.log(`✓ Backfilled embedding for prompt ${prompt.id}`)
        }

        await new Promise(resolve => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`Failed to generate embedding for prompt ${prompt.id}:`, error)
      }
    }

    console.log('Backfill complete')
  } catch (error) {
    console.error('Failed to backfill embeddings:', error)
    throw error
  }
}
