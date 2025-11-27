import React, { useEffect, useState } from 'react';
import { Upload, Trash, FileText, FileCsv, FileCode, File as FileIcon, Spinner } from '@phosphor-icons/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';
import { uploadContextFile, getContextFiles, deleteContextFile } from '../lib/context-management';
import { ContextFile } from '../lib/types';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';

export function ContextManager() {
  const [files, setFiles] = useState<ContextFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadFiles();
  }, []);

  async function loadFiles() {
    try {
      const data = await getContextFiles();
      setFiles(data);
    } catch (error) {
      console.error('Failed to load context files:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validate file type
      const validTypes = ['.json', '.csv', '.md', '.txt'];
      if (!validTypes.some(type => file.name.toLowerCase().endsWith(type))) {
        toast.error('Invalid file type. Please upload JSON, CSV, MD, or TXT.');
        return;
      }

      // Validate size (e.g., 5MB limit for now)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File too large. Maximum size is 5MB.');
        return;
      }

      setUploading(true);
      try {
        const newFile = await uploadContextFile(file);
        setFiles([newFile, ...files]);
        toast.success('File uploaded successfully');
      } catch (error) {
        console.error('Upload failed:', error);
        toast.error('Failed to upload file');
      } finally {
        setUploading(false);
        // Reset input
        e.target.value = '';
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteContextFile(id);
      setFiles(files.filter(f => f.id !== id));
      toast.success('File deleted');
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete file');
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'json': return <FileCode className="w-6 h-6 text-yellow-500" />;
      case 'csv': return <FileCsv className="w-6 h-6 text-green-500" />;
      case 'md': return <FileText className="w-6 h-6 text-blue-500" />;
      default: return <FileIcon className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 h-[calc(100vh-200px)]">
      {/* Upload Section */}
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Upload Context</CardTitle>
          <CardDescription>
            Add files to your knowledge base. These will be used to ground the AI's analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-center items-center border-2 border-dashed border-muted m-6 rounded-lg bg-muted/5">
          <div className="text-center space-y-4">
            <div className="p-4 bg-primary/10 rounded-full inline-block">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="font-medium">Click to upload</p>
              <p className="text-sm text-muted-foreground mt-1">
                JSON, CSV, MD, TXT (Max 5MB)
              </p>
            </div>
            <input
              type="file"
              id="context-upload"
              className="hidden"
              accept=".json,.csv,.md,.txt"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            <Button asChild disabled={uploading}>
              <label htmlFor="context-upload" className="cursor-pointer">
                {uploading ? (
                  <>
                    <Spinner className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Select File'
                )}
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Files List */}
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Your Knowledge Base</CardTitle>
          <CardDescription>
            {files.length} file{files.length !== 1 ? 's' : ''} uploaded
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-full px-6 pb-6">
            {loading ? (
              <div className="space-y-4 mt-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-muted/20 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : files.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No files uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {files.map(file => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      {getFileIcon(file.fileType)}
                      <div className="min-w-0">
                        <p className="font-medium truncate">{file.filename}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{new Date(file.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{file.tokenCount?.toLocaleString()} tokens</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive shrink-0"
                      onClick={() => handleDelete(file.id)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
