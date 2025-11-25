import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WarningCircle, Key, Copy, Check } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'

interface SetupInstructionsProps {
  missingKeys: string[]
}

export function SetupInstructions({ missingKeys }: SetupInstructionsProps) {
  const [copiedEnv, setCopiedEnv] = useState(false)

  const copyEnvExample = () => {
    const envContent = `# Money GPT Environment Variables

# Required: OpenAI API Key (for GPT models)
VITE_OPENAI_API_KEY=your_openai_key_here

# Optional: Google Gemini API Key (for cost savings)
VITE_GEMINI_API_KEY=your_gemini_key_here

# Supabase Configuration (already set)
VITE_SUPABASE_URL=https://eqvjsqfnmxzjmyldcfgc.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_key

# Development Mode
VITE_MODE=development
VITE_DEV_BYPASS_PAYMENT=true`

    navigator.clipboard.writeText(envContent)
    setCopiedEnv(true)
    toast.success('Environment template copied to clipboard')
    setTimeout(() => setCopiedEnv(false), 2000)
  }

  return (
    <Card className="border-amber-500/50 bg-amber-500/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <WarningCircle className="w-5 h-5 text-amber-500" weight="fill" />
          <CardTitle className="text-amber-500">Setup Required</CardTitle>
        </div>
        <CardDescription>
          Some API keys are missing. The app needs configuration to work properly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Key className="w-4 h-4" />
          <AlertTitle>Missing API Keys</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {missingKeys.map(key => (
                <li key={key} className="text-sm">{key}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <p className="text-sm font-semibold">Quick Setup:</p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Create a <code className="bg-muted px-1 py-0.5 rounded">.env.local</code> file in your project root</li>
            <li>Copy the environment template below</li>
            <li>Replace the placeholder values with your actual API keys</li>
            <li>Restart the development server</li>
          </ol>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyEnvExample}
            className="gap-2"
          >
            {copiedEnv ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy .env Template
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">
              Get OpenAI Key
            </a>
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          <p className="font-semibold mb-1">Where to get keys:</p>
          <ul className="space-y-1">
            <li>• OpenAI: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">platform.openai.com/api-keys</a></li>
            <li>• Gemini: <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">makersuite.google.com/app/apikey</a></li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
