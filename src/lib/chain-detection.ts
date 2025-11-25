import { supabase } from './supabase';
import { Database } from './database'; // Assuming types are here or similar
import { calculateChainMetadata } from './chain-metadata';

// Types for Chain Analysis
export interface ChainCandidate {
  id: string;
  prompt: string;
  created_at: string;
  vector_embedding?: number[];
}

export interface DetectedChain {
  prompts: ChainCandidate[];
  startTime: string;
  endTime: string;
  conversationId?: string;
}

// Configuration for chain detection
const CHAIN_CONFIG = {
  TIME_THRESHOLD_MINUTES: 30, // Prompts within 30 mins are likely same chain
  SIMILARITY_THRESHOLD: 0.6,  // Cosine similarity threshold for semantic continuity
};

/**
 * Detects chains from a list of unchained prompts based on temporal proximity.
 * In a real implementation, this would also use vector similarity.
 */
export function detectChains(prompts: ChainCandidate[]): DetectedChain[] {
  if (prompts.length === 0) return [];

  const chains: DetectedChain[] = [];
  let currentChain: ChainCandidate[] = [prompts[0]];

  for (let i = 1; i < prompts.length; i++) {
    const prevPrompt = prompts[i - 1];
    const currentPrompt = prompts[i];

    const prevTime = new Date(prevPrompt.created_at).getTime();
    const currentTime = new Date(currentPrompt.created_at).getTime();
    const diffMinutes = (currentTime - prevTime) / (1000 * 60);

    if (diffMinutes <= CHAIN_CONFIG.TIME_THRESHOLD_MINUTES) {
      // Add to current chain
      currentChain.push(currentPrompt);
    } else {
      // Finalize current chain and start a new one
      chains.push({
        prompts: currentChain,
        startTime: currentChain[0].created_at,
        endTime: currentChain[currentChain.length - 1].created_at,
      });
      currentChain = [currentPrompt];
    }
  }

  // Push the last chain
  if (currentChain.length > 0) {
    chains.push({
      prompts: currentChain,
      startTime: currentChain[0].created_at,
      endTime: currentChain[currentChain.length - 1].created_at,
    });
  }

  return chains;
}

/**
 * Fetches unchained prompts for the current user and runs chain detection.
 * Then persists the detected chains to Supabase.
 */
export async function processUnchainedPrompts(userId: string) {
  try {
    // 1. Fetch unchained prompts (using the RPC function we defined in SQL)
    // Note: You might need to generate types for this RPC or use 'any' for now
    const { data: prompts, error } = await supabase.rpc('find_unchained_prompts', {
      user_uuid: userId,
      lookback_hours: 24 * 7 // Look back 7 days
    });

    if (error) throw error;
    if (!prompts || prompts.length === 0) return { chainsDetected: 0 };

    // 2. Detect chains
    const detectedChains = detectChains(prompts);

    // 3. Persist chains
    let chainsCreated = 0;
    for (const chain of detectedChains) {
      // Only create chains with more than 1 prompt, or single prompts if they are isolated?
      // For now, let's persist all "sessions" as chains.
      
      // Calculate metadata
      const metadata = calculateChainMetadata(chain);

      // Insert chain record
      const { data: chainData, error: chainError } = await supabase
        .from('prompt_chains')
        .insert({
          user_id: userId,
          start_timestamp: chain.startTime,
          end_timestamp: chain.endTime,
          prompt_count: chain.prompts.length,
          growth_delta: metadata.growth_delta,
          loop_pattern: metadata.loop_pattern,
          vow_event: metadata.vow_event,
          theme_cluster: metadata.theme_cluster,
          symbolic_role_drift: metadata.symbolic_role_drift,
          kairos_chronos_ratio: metadata.kairos_chronos_ratio
        })
        .select()
        .single();

      if (chainError) {
        console.error('Error creating chain:', chainError);
        continue;
      }

      const chainId = chainData.id;

      // Update prompts with chain_id
      const promptIds = chain.prompts.map(p => p.id);
      const { error: updateError } = await supabase
        .from('prompt_analyses')
        .update({ chain_id: chainId })
        .in('id', promptIds);

      if (updateError) {
        console.error('Error updating prompts with chain_id:', updateError);
      } else {
        chainsCreated++;
      }
    }

    return { chainsDetected: chainsCreated };

  } catch (err) {
    console.error('Chain processing failed:', err);
    throw err;
  }
}
