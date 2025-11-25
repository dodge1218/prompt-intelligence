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
}

export interface AnalysisFilters {
  tier?: PIETier
  category?: PIECategory
  minScore?: number
  dateRange?: [number, number]
}
