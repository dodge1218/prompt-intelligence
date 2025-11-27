import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { processUnchainedPrompts } from '../lib/chain-detection';
import { getPromptsByChainId } from '../lib/database';
import { PromptAnalysis } from '../lib/types';
import { 
  ArrowClockwise, 
  DownloadSimple, 
  FileArrowDown, 
  ChatCircle, 
  TrendUp, 
  CaretRight,
  CalendarBlank,
  Hash
} from '@phosphor-icons/react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { exportChainsToCSV, exportChainsToJSON } from '../lib/chain-export';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTierColor } from '@/lib/scoring';

export interface ChainData {
  id: string;
  start_timestamp: string;
  end_timestamp: string;
  prompt_count: number;
  growth_delta: {
    mtier: number;
    sal: number;
    complexity: number;
  };
  loop_pattern: string | null;
  vow_event: string | null;
  theme_cluster: string[];
  symbolic_role_drift: string | null;
  kairos_chronos_ratio: number;
}

export function ChainVisualization() {
  const [chains, setChains] = useState<ChainData[]>([]);
  const [selectedChainId, setSelectedChainId] = useState<string | null>(null);
  const [chainPrompts, setChainPrompts] = useState<PromptAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [loadingPrompts, setLoadingPrompts] = useState(false);

  useEffect(() => {
    fetchChains();
  }, []);

  useEffect(() => {
    if (selectedChainId) {
      fetchChainPrompts(selectedChainId);
    } else {
      setChainPrompts([]);
    }
  }, [selectedChainId]);

  async function handleRefresh() {
    setProcessing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const result = await processUnchainedPrompts(user.id);
        if (result.chainsDetected > 0) {
          toast.success(`Detected ${result.chainsDetected} new conversation chains`);
          await fetchChains();
        } else {
          toast.info('No new chains detected');
        }
      }
    } catch (error) {
      console.error('Error processing chains:', error);
      toast.error('Failed to process chains');
    } finally {
      setProcessing(false);
    }
  }

  async function fetchChains() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('prompt_chains')
        .select('*')
        .eq('user_id', user.id)
        .order('start_timestamp', { ascending: false });

      if (error) throw error;
      setChains(data || []);
      if (data && data.length > 0 && !selectedChainId) {
        // Optional: Select first chain by default? Or leave empty.
        // setSelectedChainId(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching chains:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchChainPrompts(chainId: string) {
    setLoadingPrompts(true);
    try {
      const prompts = await getPromptsByChainId(chainId);
      setChainPrompts(prompts);
    } catch (error) {
      console.error('Error fetching chain prompts:', error);
      toast.error('Failed to load chain details');
    } finally {
      setLoadingPrompts(false);
    }
  }

  const selectedChain = chains.find(c => c.id === selectedChainId);

  if (loading) return <div className="p-12 text-center text-muted-foreground">Loading chain analysis...</div>;

  return (
    <div className="flex h-[calc(100vh-200px)] border rounded-lg overflow-hidden bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r bg-muted/10 flex flex-col">
        <div className="p-4 border-b flex items-center justify-between bg-background/50 backdrop-blur-sm">
          <h3 className="font-semibold flex items-center gap-2">
            <ChatCircle className="w-4 h-4" />
            Chains
          </h3>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleRefresh}
              disabled={processing}
              title="Detect new chains"
              className="h-8 w-8"
            >
              <ArrowClockwise className={`w-4 h-4 ${processing ? 'animate-spin' : ''}`} />
            </Button>
            {chains.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <DownloadSimple className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => exportChainsToJSON(chains)}>
                    <FileArrowDown className="w-4 h-4 mr-2" />
                    JSON
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => exportChainsToCSV(chains)}>
                    <FileArrowDown className="w-4 h-4 mr-2" />
                    CSV
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {chains.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No chains detected yet.
                <br />
                Submit more prompts!
              </div>
            ) : (
              chains.map((chain) => (
                <div
                  key={chain.id}
                  onClick={() => setSelectedChainId(chain.id)}
                  className={`
                    p-3 rounded-lg cursor-pointer transition-all border
                    ${selectedChainId === chain.id 
                      ? 'bg-primary/10 border-primary/30 shadow-sm' 
                      : 'bg-card hover:bg-accent/50 border-transparent hover:border-border'}
                  `}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-muted-foreground">
                      {new Date(chain.start_timestamp).toLocaleDateString()}
                    </span>
                    {chain.vow_event && (
                      <Badge variant="outline" className="text-[10px] h-4 px-1 border-purple-500/30 text-purple-500">
                        Vow
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Hash className="w-3 h-3 text-muted-foreground" />
                    {chain.prompt_count} Prompts
                  </div>

                  <div className="flex gap-2">
                    {chain.loop_pattern && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${
                        chain.loop_pattern === 'escalating' ? 'border-green-500/30 text-green-500' :
                        chain.loop_pattern === 'regressive' ? 'border-red-500/30 text-red-500' :
                        'border-blue-500/30 text-blue-500'
                      }`}>
                        {chain.loop_pattern}
                      </span>
                    )}
                    {chain.growth_delta?.mtier > 0 && (
                      <span className="text-[10px] flex items-center text-green-500">
                        <TrendUp className="w-3 h-3 mr-0.5" />
                        +{chain.growth_delta.mtier} Tier
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-background/50">
        {selectedChain ? (
          <>
            {/* Chain Header */}
            <div className="p-6 border-b bg-background">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    Chain Analysis
                    <Badge variant="secondary" className="font-mono">
                      {selectedChain.id.slice(0, 8)}
                    </Badge>
                  </h2>
                  <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    <CalendarBlank className="w-4 h-4" />
                    {new Date(selectedChain.start_timestamp).toLocaleString()} 
                    <CaretRight className="w-3 h-3" />
                    {new Date(selectedChain.end_timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex gap-4 text-right">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">K/C Ratio</div>
                    <div className="text-xl font-mono font-bold text-primary">
                      {selectedChain.kairos_chronos_ratio?.toFixed(2) || '0.00'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Growth</div>
                    <div className={`text-xl font-mono font-bold ${
                      (selectedChain.growth_delta?.sal || 0) >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {(selectedChain.growth_delta?.sal || 0) > 0 ? '+' : ''}
                      {selectedChain.growth_delta?.sal || 0}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {selectedChain.theme_cluster?.map((theme, i) => (
                  <Badge key={i} variant="outline" className="bg-accent/5">
                    {theme}
                  </Badge>
                ))}
                {selectedChain.symbolic_role_drift && (
                  <Badge variant="outline" className="border-purple-500/30 text-purple-500">
                    Role: {selectedChain.symbolic_role_drift}
                  </Badge>
                )}
              </div>
            </div>

            {/* Prompts List */}
            <ScrollArea className="flex-1 p-6">
              {loadingPrompts ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 bg-muted/10 animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="space-y-8 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-border">
                  {chainPrompts.map((prompt, index) => (
                    <div key={prompt.id} className="relative pl-10">
                      {/* Timeline Node */}
                      <div className="absolute left-[11px] top-6 w-3 h-3 rounded-full bg-background border-2 border-primary z-10" />
                      
                      <Card className="border-l-4" style={{ borderLeftColor: getTierColor(prompt.pieClassification.tier).includes('emerald') ? '#10b981' : getTierColor(prompt.pieClassification.tier).includes('purple') ? '#a855f7' : '#3b82f6' }}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <CardTitle className="text-base font-mono">
                                {new Date(prompt.timestamp).toLocaleTimeString()}
                              </CardTitle>
                              <div className="flex gap-2">
                                <Badge variant="secondary" className={getTierColor(prompt.pieClassification.tier)}>
                                  Tier {prompt.pieClassification.tier}
                                </Badge>
                                <Badge variant="outline">
                                  {prompt.pieClassification.primaryCategory}
                                </Badge>
                                <Badge variant="outline">
                                  ICE: {prompt.iceScore.overall}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="whitespace-pre-wrap text-sm leading-relaxed">
                            {prompt.prompt}
                          </p>
                          {prompt.suggestions && prompt.suggestions.length > 0 && (
                            <div className="mt-4 pt-4 border-t">
                              <p className="text-xs font-semibold text-muted-foreground mb-2">SUGGESTIONS</p>
                              <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                                {prompt.suggestions.slice(0, 2).map((s, i) => (
                                  <li key={i}>{s}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-4">
              <ChatCircle className="w-8 h-8 opacity-50" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Select a Chain</h3>
            <p className="max-w-md">
              Choose a conversation chain from the sidebar to view the detailed prompt sequence and analysis metrics.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
