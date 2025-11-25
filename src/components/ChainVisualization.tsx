import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { processUnchainedPrompts } from '../lib/chain-detection';
import { ArrowClockwise } from '@phosphor-icons/react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { exportChainsToCSV, exportChainsToJSON } from '../lib/chain-export';
import { DownloadSimple, FileArrowDown } from '@phosphor-icons/react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

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
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchChains();
  }, []);

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
    } catch (error) {
      console.error('Error fetching chains:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="p-4 text-center">Loading chain analysis...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Conversation Chains</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={processing}
          >
            <ArrowClockwise className={`w-4 h-4 mr-2 ${processing ? 'animate-spin' : ''}`} />
            {processing ? 'Analyzing...' : 'Detect Chains'}
          </Button>

          {chains.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <DownloadSimple className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => exportChainsToJSON(chains)}>
                  <FileArrowDown className="w-4 h-4 mr-2" />
                  Export as JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportChainsToCSV(chains)}>
                  <FileArrowDown className="w-4 h-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      
      {chains.length === 0 ? (
        <div className="p-6 text-center border border-dashed border-gray-700 rounded-lg">
          <p className="text-gray-400">No conversation chains detected yet.</p>
          <p className="text-sm text-gray-500 mt-2">
            Chains are formed automatically when you submit multiple prompts in a session.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {chains.map((chain) => (
            <div key={chain.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 hover:border-purple-500/50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-xs font-mono text-gray-500">
                    {new Date(chain.start_timestamp).toLocaleDateString()}
                  </span>
                  <div className="text-sm text-gray-300 mt-1">
                    {new Date(chain.start_timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className="bg-gray-700/50 px-2 py-1 rounded text-xs text-gray-300">
                  {chain.prompt_count} prompts
                </div>
              </div>

              <div className="space-y-3">
                {/* Loop Pattern */}
                {chain.loop_pattern && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Pattern</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      chain.loop_pattern === 'escalating' ? 'border-green-500/30 text-green-400' :
                      chain.loop_pattern === 'regressive' ? 'border-red-500/30 text-red-400' :
                      chain.loop_pattern === 'collapsing' ? 'border-orange-500/30 text-orange-400' :
                      'border-blue-500/30 text-blue-400'
                    }`}>
                      {chain.loop_pattern}
                    </span>
                  </div>
                )}

                {/* Vow Event */}
                {chain.vow_event && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Vow</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {chain.vow_event}
                    </span>
                  </div>
                )}

                {/* Role Drift */}
                {chain.symbolic_role_drift && (
                  <div className="text-xs">
                    <span className="text-gray-500 uppercase tracking-wider mr-2">Role Drift</span>
                    <span className="text-gray-300">{chain.symbolic_role_drift}</span>
                  </div>
                )}

                {/* Growth Metrics */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-700/50">
                  <div className="text-center">
                    <div className="text-[10px] text-gray-500 uppercase">M-Tier</div>
                    <div className="text-sm font-mono text-green-400">+{chain.growth_delta?.mtier || 0}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-gray-500 uppercase">SAL</div>
                    <div className="text-sm font-mono text-blue-400">+{chain.growth_delta?.sal || 0}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-gray-500 uppercase">K/C Ratio</div>
                    <div className="text-sm font-mono text-purple-400">{chain.kairos_chronos_ratio}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
