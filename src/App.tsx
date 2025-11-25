import React, { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Brain, ClockCounterClockwise, Sparkle, Lightning, DownloadSimple, FileArrowDown, CurrencyDollar, Database, MagnifyingGlass, Copy, Check } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { analyzePrompt, getTierColor, TIER_DESCRIPTIONS, type AIModel } from '@/lib/scoring'
import type { PromptAnalysis } from '@/lib/types'
import { RadarChart } from '@/components/RadarChart'
import { TierMatrix } from '@/components/TierMatrix'
import { exportToJSON, exportToCSV, exportSingleAnalysisToJSON, exportSingleAnalysisToCSV } from '@/lib/export'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { PaymentGate } from '@/components/PaymentGate'
import { LockedContent } from '@/components/LockedContent'
import { SimilarPrompts } from '@/components/SimilarPrompts'
import { DiscoverPrompts } from '@/components/DiscoverPrompts'
import { DuplicateWarning } from '@/components/DuplicateWarning'
import { ModelSelector } from '@/components/ModelSelector'
import { AuthModal } from '@/components/AuthModal'
import { UserMenu } from '@/components/UserMenu'
import { PromptTemplates } from '@/components/PromptTemplates'
import { saveAnalysisToDatabase, getAnalysesFromDatabase, checkUserHasCredits, decrementUserCredits } from '@/lib/database'
import { detectDuplicate } from '@/lib/vectorization'
import { isDevelopmentMode, devBypassPayment } from '@/lib/supabase'

function App() {
  const [promptInput, setPromptInput] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState<PromptAnalysis | null>(null)
  const [history, setHistory] = useKV<PromptAnalysis[]>('prompt-history', [])
  const [showPaymentGate, setShowPaymentGate] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const [analysisLocked, setAnalysisLocked] = useState(true)
  const [isLoadingFromDB, setIsLoadingFromDB] = useState(false)
  const [duplicateDetected, setDuplicateDetected] = useState<{
    isDuplicate: boolean
    similarPrompt?: any
    similarity?: number
  } | null>(null)
  const [userId, setUserId] = useState<string>('')
  const [selectedModel, setSelectedModel] = useKV<AIModel>('selected-ai-model', 'gpt-4o')
  const [copiedPrompt, setCopiedPrompt] = useState(false)
  const [historyFilter, setHistoryFilter] = useState('')
  const [historySortBy, setHistorySortBy] = useState<'date' | 'score' | 'tier'>('date')

  useEffect(() => {
    loadHistoryFromDatabase()
    loadUserId()
  }, [])

  const loadUserId = async () => {
    const user = await spark.user()
    setUserId(user.id)
  }

  const loadHistoryFromDatabase = async () => {
    setIsLoadingFromDB(true)
    try {
      const dbHistory = await getAnalysesFromDatabase(100)
      if (dbHistory.length > 0) {
        setHistory(dbHistory)
      }
    } catch (error) {
      console.error('Failed to load history from database:', error)
    } finally {
      setIsLoadingFromDB(false)
    }
  }

  const checkAccess = async () => {
    if (isDevelopmentMode && devBypassPayment) {
      setHasAccess(true)
      setAnalysisLocked(false)
      return true
    }

    const hasCredits = await checkUserHasCredits()
    setHasAccess(hasCredits)
    return hasCredits
  }

  const handleAnalyze = async (bypassDuplicateCheck = false) => {
    if (!promptInput.trim()) {
      toast.error('Please enter a prompt to analyze')
      return
    }

    if (!bypassDuplicateCheck && userId) {
      try {
        const duplicateCheck = await detectDuplicate(promptInput, userId, 0.85)
        if (duplicateCheck.isDuplicate) {
          setDuplicateDetected(duplicateCheck)
          return
        }
      } catch (error) {
        console.warn('Duplicate detection failed, continuing anyway:', error)
      }
    }

    setDuplicateDetected(null)
    setIsAnalyzing(true)
    try {
      const analysis = await analyzePrompt(promptInput, selectedModel || 'gpt-4o')
      setCurrentAnalysis(analysis)
      
      const hasValidAccess = await checkAccess()
      
      if (!hasValidAccess) {
        setAnalysisLocked(true)
        setShowPaymentGate(true)
        toast.warning('Upgrade to view full analysis')
      } else {
        setAnalysisLocked(false)
        
        await saveAnalysisToDatabase(analysis)
        await decrementUserCredits()
        
        setHistory((current) => [analysis, ...(current || [])])
        
        toast.success('Analysis complete & saved')
      }
    } catch (error) {
      toast.error('Failed to analyze prompt')
      console.error(error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handlePurchase = async (tier: 'basic' | 'pro' | 'enterprise') => {
    toast.info(`Payment integration coming soon! Selected: ${tier}`)
    
    setHasAccess(true)
    setAnalysisLocked(false)
    setShowPaymentGate(false)
    
    if (currentAnalysis) {
      await saveAnalysisToDatabase(currentAnalysis)
      setHistory((current) => [currentAnalysis, ...(current || [])])
    }
    
    toast.success('Access granted! Analysis unlocked.')
  }

  const loadFromHistory = (analysis: PromptAnalysis) => {
    setCurrentAnalysis(analysis)
    setPromptInput(analysis.prompt)
    setAnalysisLocked(false)
  }

  const handleExportCurrent = (format: 'json' | 'csv') => {
    if (!currentAnalysis) return
    
    if (format === 'json') {
      exportSingleAnalysisToJSON(currentAnalysis)
      toast.success('Analysis exported as JSON')
    } else {
      exportSingleAnalysisToCSV(currentAnalysis)
      toast.success('Analysis exported as CSV')
    }
  }

  const handleExportAll = (format: 'json' | 'csv') => {
    if (!history || history.length === 0) {
      toast.error('No analyses to export')
      return
    }
    
    if (format === 'json') {
      exportToJSON(history)
      toast.success(`Exported ${history.length} analyses as JSON`)
    } else {
      exportToCSV(history)
      toast.success(`Exported ${history.length} analyses as CSV`)
    }
  }

  const copyPromptToClipboard = async () => {
    if (!currentAnalysis) return
    
    try {
      await navigator.clipboard.writeText(currentAnalysis.prompt)
      setCopiedPrompt(true)
      toast.success('Prompt copied to clipboard')
      setTimeout(() => setCopiedPrompt(false), 2000)
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const filteredHistory = (history || []).filter(item => {
    if (!historyFilter.trim()) return true
    const searchLower = historyFilter.toLowerCase()
    return (
      item.prompt.toLowerCase().includes(searchLower) ||
      item.pieClassification.primaryCategory.toLowerCase().includes(searchLower) ||
      `tier ${item.pieClassification.tier}`.includes(searchLower)
    )
  })

  const sortedHistory = [...filteredHistory].sort((a, b) => {
    switch (historySortBy) {
      case 'date':
        return b.timestamp - a.timestamp
      case 'score':
        return b.iceScore.overall - a.iceScore.overall
      case 'tier':
        return a.pieClassification.tier - b.pieClassification.tier
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-6 max-w-7xl">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <CurrencyDollar className="w-10 h-10 text-primary" weight="duotone" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">Money GPT</h1>
                <p className="text-muted-foreground text-sm">Premium Prompt Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isDevelopmentMode && (
                <Badge variant="outline" className="text-accent border-accent">
                  Dev Mode
                </Badge>
              )}
              <UserMenu onSignInClick={() => setShowAuthModal(true)} />
            </div>
          </div>
          <p className="text-muted-foreground text-sm italic">
            Turn prompts into profit. Analyze like a pro.
          </p>
        </header>

        <Tabs defaultValue="analyze" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="analyze" className="gap-2">
              <Brain className="w-4 h-4" />
              Analyze
            </TabsTrigger>
            <TabsTrigger value="discover" className="gap-2">
              <MagnifyingGlass className="w-4 h-4" />
              Discover
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Database className="w-4 h-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyze" className="space-y-6">
            <ModelSelector
              selectedModel={selectedModel || 'gpt-4o'}
              onModelChange={setSelectedModel}
              estimatedTokens={Math.ceil(promptInput.length / 4)}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Submit Prompt for Analysis</CardTitle>
                <CardDescription>
                  Get premium ICE and PIE scoring with actionable insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  id="prompt-input"
                  placeholder="Enter your prompt here... e.g., 'Write a blog post about AI safety' or 'Debug this Python function that calculates fibonacci numbers'"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  className="min-h-[150px] font-mono text-sm"
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {promptInput.length} characters (~{Math.ceil(promptInput.length / 4)} tokens)
                  </span>
                  <Button onClick={() => handleAnalyze(false)} disabled={isAnalyzing || !promptInput.trim()}>
                    {isAnalyzing ? (
                      <>Analyzing...</>
                    ) : (
                      <>
                        <Lightning className="w-4 h-4 mr-2" weight="fill" />
                        Analyze Prompt
                      </>
                    )}
                  </Button>
                </div>

                {duplicateDetected && duplicateDetected.isDuplicate && (
                  <DuplicateWarning
                    similarPrompt={duplicateDetected.similarPrompt}
                    similarity={duplicateDetected.similarity!}
                    onViewExisting={() => {
                      const fullAnalysis = history?.find(h => h.id === duplicateDetected.similarPrompt.id)
                      if (fullAnalysis) {
                        loadFromHistory(fullAnalysis)
                      }
                    }}
                    onContinueAnyway={() => handleAnalyze(true)}
                  />
                )}
              </CardContent>
            </Card>

            {!promptInput && !currentAnalysis && (
              <PromptTemplates onSelectTemplate={setPromptInput} />
            )}

            {currentAnalysis && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">Analysis Results</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Analyzed {new Date(currentAnalysis.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!analysisLocked && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyPromptToClipboard}
                        >
                          {copiedPrompt ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy Prompt
                            </>
                          )}
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <DownloadSimple className="w-4 h-4 mr-2" />
                              Export
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleExportCurrent('json')}>
                              <FileArrowDown className="w-4 h-4 mr-2" />
                              Export as JSON
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExportCurrent('csv')}>
                              <FileArrowDown className="w-4 h-4 mr-2" />
                              Export as CSV
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    )}
                  </div>
                </div>
                
                <LockedContent isLocked={analysisLocked} onUnlock={() => setShowPaymentGate(true)}>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          ICE Score
                          <Badge variant="outline">{currentAnalysis.iceScore.overall}/100</Badge>
                        </CardTitle>
                        <CardDescription>
                          Idea · Cost · Exploitability framework evaluation
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex justify-center">
                          <RadarChart score={currentAnalysis.iceScore} size={240} />
                        </div>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium">Idea</span>
                              <span className="text-sm text-muted-foreground">
                                {currentAnalysis.iceScore.idea}/100
                              </span>
                            </div>
                            <Progress value={currentAnalysis.iceScore.idea} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium">Cost</span>
                              <span className="text-sm text-muted-foreground">
                                {currentAnalysis.iceScore.cost}/100
                              </span>
                            </div>
                            <Progress value={currentAnalysis.iceScore.cost} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium">Exploitability</span>
                              <span className="text-sm text-muted-foreground">
                                {currentAnalysis.iceScore.exploitability}/100
                              </span>
                            </div>
                            <Progress value={currentAnalysis.iceScore.exploitability} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          PIE Classification
                          <Badge className={getTierColor(currentAnalysis.pieClassification.tier)}>
                            Tier {currentAnalysis.pieClassification.tier}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          {TIER_DESCRIPTIONS[currentAnalysis.pieClassification.tier]}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <TierMatrix
                          primaryCategory={currentAnalysis.pieClassification.primaryCategory}
                          secondaryCategories={currentAnalysis.pieClassification.secondaryCategories}
                        />
                      </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Sparkle className="w-5 h-5" weight="fill" />
                          Analysis & Suggestions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Classification Reasoning</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {currentAnalysis.pieClassification.reasoning}
                          </p>
                        </div>
                        {currentAnalysis.suggestions && currentAnalysis.suggestions.length > 0 && (
                          <>
                            <Separator />
                            <div>
                              <h4 className="font-semibold mb-3">Improvement Suggestions</h4>
                              <ul className="space-y-2">
                                {currentAnalysis.suggestions.map((suggestion, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                                    <span className="text-accent font-semibold shrink-0">{idx + 1}.</span>
                                    <span>{suggestion}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </LockedContent>
              </>
            )}
          </TabsContent>

          <TabsContent value="discover" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <DiscoverPrompts
                userId={userId}
                onSelectPrompt={(prompt) => {
                  setPromptInput(prompt.prompt)
                  const analysis = history?.find(h => h.id === prompt.id)
                  if (analysis) {
                    setCurrentAnalysis(analysis)
                    setAnalysisLocked(false)
                  }
                }}
              />
              <SimilarPrompts
                promptText={promptInput}
                userId={userId}
                onSelectPrompt={(prompt) => {
                  const analysis = history?.find(h => h.id === prompt.id)
                  if (analysis) {
                    loadFromHistory(analysis)
                  }
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Prompt History</CardTitle>
                    <CardDescription>
                      Review your past analyses stored in the database
                    </CardDescription>
                  </div>
                  {history && history.length > 0 && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <DownloadSimple className="w-4 h-4 mr-2" />
                          Export All
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleExportAll('json')}>
                          <FileArrowDown className="w-4 h-4 mr-2" />
                          Export as JSON
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExportAll('csv')}>
                          <FileArrowDown className="w-4 h-4 mr-2" />
                          Export as CSV
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {history && history.length > 0 && (
                  <div className="mb-4 flex gap-3 items-center">
                    <Input
                      id="history-search"
                      placeholder="Search prompts..."
                      value={historyFilter}
                      onChange={(e) => setHistoryFilter(e.target.value)}
                      className="flex-1"
                    />
                    <Select value={historySortBy} onValueChange={(value: any) => setHistorySortBy(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date">Newest First</SelectItem>
                        <SelectItem value="score">Highest Score</SelectItem>
                        <SelectItem value="tier">Best Tier</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {isLoadingFromDB ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Database className="w-12 h-12 mx-auto mb-3 opacity-50 animate-pulse" />
                    <p>Loading from database...</p>
                  </div>
                ) : !history || history.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <ClockCounterClockwise className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No prompts analyzed yet</p>
                    <p className="text-sm">Start by analyzing your first prompt</p>
                  </div>
                ) : filteredHistory.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <MagnifyingGlass className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No prompts match your search</p>
                    <p className="text-sm">Try different keywords</p>
                  </div>
                ) : (
                  <>
                    {historyFilter && (
                      <p className="text-sm text-muted-foreground mb-3">
                        Found {filteredHistory.length} of {history.length} prompts
                      </p>
                    )}
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="space-y-3">
                        {sortedHistory.map((item) => (
                        <Card
                          key={item.id}
                          className="cursor-pointer hover:bg-accent/5 transition-colors"
                          onClick={() => loadFromHistory(item)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <p className="font-mono text-sm truncate mb-2">{item.prompt}</p>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Badge className={getTierColor(item.pieClassification.tier)} variant="secondary">
                                    Tier {item.pieClassification.tier}
                                  </Badge>
                                  <Badge variant="outline">
                                    {item.pieClassification.primaryCategory}
                                  </Badge>
                                  <Badge variant="outline">
                                    ICE: {item.iceScore.overall}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(item.timestamp).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <footer className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground space-y-1">
          <p>Your prompt intelligence, monetized and persistent.</p>
          <p className="italic">Money GPT: Where AI meets ROI.</p>
        </footer>
      </div>

      <PaymentGate 
        isOpen={showPaymentGate} 
        onClose={() => setShowPaymentGate(false)}
        onPurchase={handlePurchase}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          loadHistoryFromDatabase()
          loadUserId()
        }}
      />
    </div>
  )
}

export default App