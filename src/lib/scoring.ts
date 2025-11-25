import type { ICEScore, PIEClassification, PromptAnalysis } from './types'
import { callGemini, isGeminiConfigured, type GeminiModel } from './gemini'

export type AIModel = 'gpt-4o' | 'gpt-4o-mini' | 'gemini-1.5-pro' | 'gemini-1.5-flash' | 'gemini-1.0-pro'

export async function analyzePrompt(prompt: string, modelName: AIModel = 'gpt-4o'): Promise<PromptAnalysis> {
  const startTime = Date.now()
  const tokenCount = estimateTokens(prompt)
  
  const analysisPromptText = `You are an expert prompt engineer analyzing prompts using two frameworks:

ICE Framework:
- Idea (0-100): Novelty, originality, creative thinking
- Cost (0-100): Efficiency (higher score = lower tokens/complexity for the value delivered)
- Exploitability (0-100): Reusability, scalability, generalizability

PIE Framework (9 categories across 3 tiers):
Tier 1 (Reactive): dopamine (instant gratification), escape (avoidance), loops (repetitive/stuck)
Tier 2 (Productive): builder (creating things), deploy (executing), tool (practical utility)
Tier 3 (Strategic): strategic (long-term thinking), kairos (perfect timing/insight), self-authoring (meta-awareness)

Analyze this prompt:
"""
${prompt}
"""

Return a JSON object with this exact structure:
{
  "ice": {
    "idea": <number 0-100>,
    "cost": <number 0-100>,
    "exploitability": <number 0-100>,
    "ideaReasoning": "<brief explanation>",
    "costReasoning": "<brief explanation>",
    "exploitabilityReasoning": "<brief explanation>"
  },
  "pie": {
    "tier": <1, 2, or 3>,
    "primaryCategory": "<one of the 9 categories>",
    "secondaryCategories": ["<category>"],
    "reasoning": "<explanation of tier and category choices>"
  },
  "suggestions": ["<specific improvement 1>", "<specific improvement 2>", "<specific improvement 3>"]
}`

  let response: string
  
  if (modelName.startsWith('gemini-')) {
    response = await callGemini(analysisPromptText, modelName as GeminiModel, true)
  } else {
    const analysisPrompt = spark.llmPrompt`${analysisPromptText}`
    response = await spark.llm(analysisPrompt, modelName, true)
  }
  
  const data = JSON.parse(response)
  
  const responseTime = Date.now() - startTime
  
  const iceScore: ICEScore = {
    idea: data.ice.idea,
    cost: data.ice.cost,
    exploitability: data.ice.exploitability,
    overall: Math.round((data.ice.idea + data.ice.cost + data.ice.exploitability) / 3)
  }
  
  const pieClassification: PIEClassification = {
    tier: data.pie.tier,
    primaryCategory: data.pie.primaryCategory,
    secondaryCategories: data.pie.secondaryCategories || [],
    reasoning: data.pie.reasoning
  }
  
  const analysis: PromptAnalysis = {
    id: `prompt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    prompt,
    timestamp: Date.now(),
    iceScore,
    pieClassification,
    suggestions: data.suggestions || [],
    tokenCount,
    modelVersion: `${modelName}-v1`,
    responseTimeMs: responseTime,
  }
  
  return analysis
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

export function getTierColor(tier: 1 | 2 | 3): string {
  switch (tier) {
    case 1:
      return 'text-muted-foreground bg-muted'
    case 2:
      return 'text-secondary-foreground bg-secondary'
    case 3:
      return 'text-primary-foreground bg-primary'
  }
}

export function getCategoryLabel(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

export const TIER_DESCRIPTIONS = {
  1: 'Reactive - Immediate gratification or avoidance patterns',
  2: 'Productive - Building, deploying, and creating practical value',
  3: 'Strategic - Long-term thinking with meta-awareness'
}

export const CATEGORY_DESCRIPTIONS = {
  dopamine: 'Seeking instant gratification or entertainment',
  escape: 'Avoiding discomfort or difficult tasks',
  loops: 'Stuck in repetitive patterns without progress',
  builder: 'Creating or constructing something tangible',
  deploy: 'Executing and shipping work',
  tool: 'Practical utility and problem-solving',
  strategic: 'Long-term planning and systems thinking',
  kairos: 'Perfect timing and seizing key moments',
  'self-authoring': 'Meta-awareness and personal evolution'
}

export const MODEL_INFO = {
  'gpt-4o': {
    name: 'GPT-4o',
    description: 'OpenAI flagship - highest quality',
    costPer1MTokens: 15.0,
    provider: 'OpenAI'
  },
  'gpt-4o-mini': {
    name: 'GPT-4o Mini',
    description: 'Fast and cost-effective',
    costPer1MTokens: 0.60,
    provider: 'OpenAI'
  },
  'gemini-1.5-pro': {
    name: 'Gemini 1.5 Pro',
    description: 'Google flagship - high quality',
    costPer1MTokens: 7.0,
    provider: 'Google',
    requiresConfig: true
  },
  'gemini-1.5-flash': {
    name: 'Gemini 1.5 Flash',
    description: 'Ultra-fast and economical',
    costPer1MTokens: 0.35,
    provider: 'Google',
    requiresConfig: true
  },
  'gemini-1.0-pro': {
    name: 'Gemini 1.0 Pro',
    description: 'Reliable backup option',
    costPer1MTokens: 3.5,
    provider: 'Google',
    requiresConfig: true
  }
} as const

export function estimateCost(tokenCount: number, model: AIModel): number {
  const costPer1M = MODEL_INFO[model].costPer1MTokens
  return (tokenCount / 1_000_000) * costPer1M
}

export function getAvailableModels(): AIModel[] {
  const models: AIModel[] = ['gpt-4o', 'gpt-4o-mini']
  
  if (isGeminiConfigured()) {
    models.push('gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-1.0-pro')
  }
  
  return models
}
