export interface ICEScore {
  idea: number
  cost: number
  exploitability: number
  overall: number
}

export type PIETier = 1 | 2 | 3

export type PIECategory =
  | 'dopamine'
  | 'escape'
  | 'loops'
  | 'builder'
  | 'deploy'
  | 'tool'
  | 'strategic'
  | 'kairos'
  | 'self-authoring'

export interface PIEClassification {
  tier: PIETier
  primaryCategory: PIECategory
  secondaryCategories: PIECategory[]
  reasoning: string
}

export interface PromptAnalysis {
  id: string
  prompt: string
  timestamp: number
  iceScore: ICEScore
  pieClassification: PIEClassification
  suggestions?: string[]
  tokenCount: number
  userId?: string
  modelVersion?: string
  responseTimeMs?: number
}

export interface AnalysisFilters {
  tier?: PIETier
  category?: PIECategory
  minScore?: number
  dateRange?: [number, number]
}

export interface User {
  id: string
  email: string
  subscriptionStatus: 'trial' | 'active' | 'expired' | 'none'
  subscriptionTier: 'basic' | 'pro' | 'enterprise' | 'free'
  creditsRemaining: number
  createdAt: string
}

export interface Transaction {
  id: string
  userId: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed'
  provider: string
  creditsPurchased: number
  createdAt: string
}

export interface DatabaseAnalysis {
  id: string
  user_id: string
  prompt: string
  token_count: number
  ice_idea: number
  ice_cost: number
  ice_exploitability: number
  ice_overall: number
  pie_tier: number
  pie_primary_category: string
  pie_secondary_categories: string[]
  pie_reasoning: string
  suggestions: string[]
  created_at: string
  model_version: string
  response_time_ms: number
}

export interface ContextFile {
  id: string
  userId: string
  filename: string
  fileType: 'json' | 'csv' | 'md' | 'txt'
  content: string
  tokenCount?: number
  createdAt: string
}
