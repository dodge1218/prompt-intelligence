
import { DetectedChain } from './chain-detection';

export interface ChainMetadata {
  growth_delta: {
    mtier: number; // Mental Tier growth
    sal: number;   // Self-Awareness Level growth
    complexity: number;
  };
  loop_pattern: 'escalating' | 'regressive' | 'collapsing' | 'resolved' | null;
  vow_event: 'formed' | 'fulfilled' | 'broken' | 'distorted' | null;
  theme_cluster: string[];
  symbolic_role_drift: string | null;
  kairos_chronos_ratio: number;
}

/**
 * Analyzes a detected chain to extract deeper metadata about the user's psychological state and progression.
 * 
 * @param chain The detected chain of prompts
 * @returns Calculated metadata
 */
export function calculateChainMetadata(chain: DetectedChain): ChainMetadata {
  const prompts = chain.prompts;
  const promptTexts = prompts.map(p => p.prompt.toLowerCase());
  
  // 1. Calculate Growth Delta (Heuristic based on length and complexity)
  // In a real system, this would compare the 'mtier' and 'sal' of the first vs last prompt analysis
  const avgLength = promptTexts.reduce((acc, p) => acc + p.length, 0) / promptTexts.length;
  const growth_delta = {
    mtier: parseFloat((Math.random() * 0.5).toFixed(2)), // Placeholder: 0.0 - 0.5
    sal: parseFloat((Math.random() * 0.3).toFixed(2)),   // Placeholder: 0.0 - 0.3
    complexity: parseFloat((avgLength / 100).toFixed(2)) // Normalized length
  };

  // 2. Detect Loop Patterns
  // Check for repetition of key phrases or stagnation
  let loop_pattern: ChainMetadata['loop_pattern'] = null;
  const uniquePrompts = new Set(promptTexts);
  const repetitionRatio = 1 - (uniquePrompts.size / promptTexts.length);

  if (repetitionRatio > 0.5) {
    loop_pattern = 'collapsing'; // High repetition
  } else if (promptTexts.length > 3 && promptTexts[promptTexts.length - 1].length < promptTexts[0].length * 0.5) {
    loop_pattern = 'regressive'; // Prompts getting significantly shorter
  } else if (promptTexts.length > 3 && promptTexts[promptTexts.length - 1].length > promptTexts[0].length * 1.5) {
    loop_pattern = 'escalating'; // Prompts getting significantly longer/more complex
  } else {
    loop_pattern = 'resolved';
  }

  // 3. Detect Vow Events
  // Look for commitment language
  const vowKeywords = ['i promise', 'i will', 'my goal', 'i commit', 'never again'];
  let vow_event: ChainMetadata['vow_event'] = null;
  
  const hasVow = promptTexts.some(text => vowKeywords.some(kw => text.includes(kw)));
  if (hasVow) {
    // Simple heuristic: if it's early in the chain, it's 'formed'. 
    // If later and positive sentiment (mocked), 'fulfilled'.
    vow_event = 'formed';
  }

  // 4. Theme Cluster (Mocked extraction)
  const commonThemes = ['productivity', 'anxiety', 'learning', 'coding', 'relationships'];
  const theme_cluster = commonThemes.filter(() => Math.random() > 0.7); // Random selection

  // 5. Symbolic Role Drift
  const roles = ['victim', 'hero', 'observer', 'architect', 'critic'];
  const startRole = roles[Math.floor(Math.random() * roles.length)];
  const endRole = roles[Math.floor(Math.random() * roles.length)];
  const symbolic_role_drift = startRole === endRole ? null : `${startRole}->${endRole}`;

  // 6. Kairos/Chronos Ratio
  // Ratio of "meaningful time" (high intensity) to "chronological time" (duration)
  // Mocked based on prompt density
  const durationMinutes = (new Date(chain.endTime).getTime() - new Date(chain.startTime).getTime()) / (1000 * 60);
  const density = durationMinutes > 0 ? chain.prompts.length / durationMinutes : 1;
  const kairos_chronos_ratio = parseFloat(density.toFixed(2));

  return {
    growth_delta,
    loop_pattern,
    vow_event,
    theme_cluster,
    symbolic_role_drift,
    kairos_chronos_ratio
  };
}
