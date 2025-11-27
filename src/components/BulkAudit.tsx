import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, Spinner } from '@phosphor-icons/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { toast } from 'sonner';

export function BulkAudit() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'complete' | 'error'>('idle');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    if (file.type === 'application/json' || file.name.endsWith('.json') || file.name.endsWith('.zip')) {
      setFile(file);
      setStatus('idle');
    } else {
      toast.error('Please upload a JSON or ZIP file');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setStatus('uploading');
    setProgress(0);

    // Simulate upload and processing
    try {
      // TODO: Implement actual file parsing and vectorization logic
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      setStatus('processing');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('complete');
      toast.success('Bulk audit complete!');
    } catch (error) {
      console.error('Upload failed:', error);
      setStatus('error');
      toast.error('Failed to process file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Bulk Prompt Audit</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload your entire prompt history (from ChatGPT or other tools) to instantly vectorize, analyze, and discover hidden patterns in your workflow.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Import Data</CardTitle>
            <CardDescription>
              Upload your `conversations.json` export from OpenAI or a ZIP archive.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`
                border-2 border-dashed rounded-lg p-8 text-center transition-colors
                ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
                ${status === 'complete' ? 'border-green-500/50 bg-green-500/5' : ''}
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {status === 'complete' ? (
                <div className="flex flex-col items-center gap-4">
                  <CheckCircle className="w-12 h-12 text-green-500" weight="fill" />
                  <div>
                    <p className="font-medium">Processing Complete</p>
                    <p className="text-sm text-muted-foreground">Your prompts have been analyzed.</p>
                  </div>
                  <Button variant="outline" onClick={() => { setFile(null); setStatus('idle'); }}>
                    Upload Another
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 rounded-full bg-muted/50">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Drag & drop your file here</p>
                    <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    accept=".json,.zip"
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                  <Button asChild variant="secondary" disabled={uploading}>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Select File
                    </label>
                  </Button>
                </div>
              )}
            </div>

            {file && status !== 'complete' && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg bg-card">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-primary" />
                    <div>
                      <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button size="sm" onClick={handleUpload} disabled={uploading}>
                    {uploading ? <Spinner className="w-4 h-4 animate-spin" /> : 'Start Audit'}
                  </Button>
                </div>

                {uploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{status === 'uploading' ? 'Uploading...' : 'Processing...'}</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How to Export</CardTitle>
            <CardDescription>
              Follow these steps to get your data from ChatGPT.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="space-y-4 list-decimal list-inside text-sm text-muted-foreground">
              <li className="pl-2">
                <span className="text-foreground font-medium">Go to Settings</span>
                <p className="pl-6 mt-1">Open ChatGPT, click your profile icon, and select "Settings".</p>
              </li>
              <li className="pl-2">
                <span className="text-foreground font-medium">Data Controls</span>
                <p className="pl-6 mt-1">Navigate to "Data controls" and look for "Export data".</p>
              </li>
              <li className="pl-2">
                <span className="text-foreground font-medium">Confirm Export</span>
                <p className="pl-6 mt-1">Click "Export" and confirm. You'll receive an email with a download link.</p>
              </li>
              <li className="pl-2">
                <span className="text-foreground font-medium">Download & Upload</span>
                <p className="pl-6 mt-1">Download the ZIP file, extract it if needed, and upload `conversations.json` here.</p>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
