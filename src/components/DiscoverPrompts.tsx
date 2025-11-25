import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sparkle, Lightning, TrendUp } from '@phosphor-icons/react'
import { getTopNovelPrompts, getTopExploitablePrompts } from '@/lib/vectorization'
import { getTierColor } from '@/lib/scoring'
import type { NovelPromptResult, ExploitablePromptResult } from '@/lib/vectorization'

interface DiscoverPromptsProps {
  userId: string
  onSelectPrompt?: (prompt: { id: string; prompt: string }) => void
}

export function DiscoverPrompts({ userId, onSelectPrompt }: DiscoverPromptsProps) {
  const [novelPrompts, setNovelPrompts] = useState<NovelPromptResult[]>([])
  const [exploitablePrompts, setExploitablePrompts] = useState<ExploitablePromptResult[]>([])
  const [isLoadingNovel, setIsLoadingNovel] = useState(false)
  const [isLoadingExploitable, setIsLoadingExploitable] = useState(false)

  useEffect(() => {
    loadTopNovelPrompts()
    loadTopExploitablePrompts()
  }, [userId])

  const loadTopNovelPrompts = async () => {
    setIsLoadingNovel(true)
    try {
      const results = await getTopNovelPrompts(userId, 10)
      setNovelPrompts(results)
    } catch (err) {
      console.error('Failed to load novel prompts:', err)
    } finally {
      setIsLoadingNovel(false)
    }
  }

  const loadTopExploitablePrompts = async () => {
    setIsLoadingExploitable(true)
    try {
      const results = await getTopExploitablePrompts(userId, 10)
      setExploitablePrompts(results)
    } catch (err) {
      console.error('Failed to load exploitable prompts:', err)
    } finally {
      setIsLoadingExploitable(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendUp className="w-5 h-5" />
          Discover Your Best Prompts
        </CardTitle>
        <CardDescription>
          RePrompt architecture: resurface your highest-value prompts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="novel">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="novel" className="gap-2">
              <Sparkle className="w-4 h-4" />
              Most Novel
            </TabsTrigger>
            <TabsTrigger value="exploitable" className="gap-2">
              <Lightning className="w-4 h-4" />
              Most Exploitable
            </TabsTrigger>
          </TabsList>

          <TabsContent value="novel" className="mt-4">
            {isLoadingNovel ? (
              <div className="text-center py-8 text-muted-foreground">
                <Sparkle className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                <p>Loading novel prompts...</p>
              </div>
            ) : novelPrompts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Sparkle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No prompts yet</p>
                <p className="text-sm">Analyze some prompts to see your most novel ones here</p>
              </div>
            ) : (
              <ScrollArea className="h-[500px]">
                <div className="space-y-3">
                  {novelPrompts.map((result, idx) => (
                    <Card
                      key={result.id}
                      className="cursor-pointer hover:bg-accent/5 transition-colors"
                      onClick={() => onSelectPrompt?.(result)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="bg-accent/20">
                                #{idx + 1}
                              </Badge>
                              <Badge className={getTierColor(result.pie_tier as 1 | 2 | 3)} variant="secondary">
                                Tier {result.pie_tier}
                              </Badge>
                            </div>
                            <p className="font-mono text-sm mb-2">{result.prompt}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline" className="bg-primary/10">
                                Idea: {result.ice_idea}/100
                              </Badge>
                              <Badge variant="outline">
                                Overall: {result.ice_overall}/100
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(result.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent value="exploitable" className="mt-4">
            {isLoadingExploitable ? (
              <div className="text-center py-8 text-muted-foreground">
                <Lightning className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                <p>Loading exploitable prompts...</p>
              </div>
            ) : exploitablePrompts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Lightning className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No prompts yet</p>
                <p className="text-sm">Analyze some prompts to see your most exploitable ones here</p>
              </div>
            ) : (
              <ScrollArea className="h-[500px]">
                <div className="space-y-3">
                  {exploitablePrompts.map((result, idx) => (
                    <Card
                      key={result.id}
                      className="cursor-pointer hover:bg-accent/5 transition-colors"
                      onClick={() => onSelectPrompt?.(result)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="bg-accent/20">
                                #{idx + 1}
                              </Badge>
                              <Badge className={getTierColor(result.pie_tier as 1 | 2 | 3)} variant="secondary">
                                Tier {result.pie_tier}
                              </Badge>
                            </div>
                            <p className="font-mono text-sm mb-2">{result.prompt}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline" className="bg-secondary/10">
                                Exploitability: {result.ice_exploitability}/100
                              </Badge>
                              <Badge variant="outline">
                                Overall: {result.ice_overall}/100
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(result.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
