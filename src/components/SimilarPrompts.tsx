import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MagnifyingGlass, Sparkle } from '@phosphor-icons/react'
import { findSimilarPrompts, generateEmbedding } from '@/lib/vectorization'
import { getTierColor } from '@/lib/scoring'
import type { SimilarPromptResult } from '@/lib/vectorization'

interface SimilarPromptsProps {
  promptText: string
  userId: string
  onSelectPrompt?: (prompt: SimilarPromptResult) => void
}

export function SimilarPrompts({ promptText, userId, onSelectPrompt }: SimilarPromptsProps) {
  const [similarPrompts, setSimilarPrompts] = useState<SimilarPromptResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (promptText.trim().length < 10) {
      setSimilarPrompts([])
      return
    }

    loadSimilarPrompts()
  }, [promptText, userId])

  const loadSimilarPrompts = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const embedding = await generateEmbedding(promptText)
      const results = await findSimilarPrompts(embedding, userId, 0.5, 5)
      setSimilarPrompts(results)
    } catch (err) {
      console.error('Failed to find similar prompts:', err)
      setError('Failed to find similar prompts')
    } finally {
      setIsLoading(false)
    }
  }

  if (promptText.trim().length < 10) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MagnifyingGlass className="w-5 h-5" />
            Similar Prompts
          </CardTitle>
          <CardDescription>
            Type at least 10 characters to find similar prompts
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MagnifyingGlass className="w-5 h-5" />
          Similar Prompts
        </CardTitle>
        <CardDescription>
          Prompts semantically similar to your input
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="text-center py-8 text-muted-foreground">
            <MagnifyingGlass className="w-8 h-8 mx-auto mb-2 animate-pulse" />
            <p>Searching for similar prompts...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-destructive">
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && similarPrompts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Sparkle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No similar prompts found</p>
            <p className="text-sm">This appears to be a novel prompt!</p>
          </div>
        )}

        {!isLoading && !error && similarPrompts.length > 0 && (
          <ScrollArea className="h-[400px]">
            <div className="space-y-3">
              {similarPrompts.map((result) => (
                <Card
                  key={result.id}
                  className="cursor-pointer hover:bg-accent/5 transition-colors"
                  onClick={() => onSelectPrompt?.(result)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-sm truncate mb-2">{result.prompt}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={getTierColor(result.pie_tier as 1 | 2 | 3)} variant="secondary">
                            Tier {result.pie_tier}
                          </Badge>
                          <Badge variant="outline">
                            ICE: {result.ice_overall}
                          </Badge>
                          <Badge variant="outline" className="bg-primary/10">
                            {Math.round(result.similarity * 100)}% similar
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
