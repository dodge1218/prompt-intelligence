import { supabase } from './supabase'
import type { PromptAnalysis, DatabaseAnalysis, User } from './types'
import { generateEmbedding } from './vectorization'

export async function saveAnalysisToDatabase(analysis: PromptAnalysis): Promise<void> {
  const user = await supabase.auth.getUser()
  
  const dbAnalysis: Partial<DatabaseAnalysis> = {
    id: analysis.id,
    user_id: user.data.user?.id || 'anonymous',
    prompt: analysis.prompt,
    token_count: analysis.tokenCount,
    ice_idea: analysis.iceScore.idea,
    ice_cost: analysis.iceScore.cost,
    ice_exploitability: analysis.iceScore.exploitability,
    ice_overall: analysis.iceScore.overall,
    pie_tier: analysis.pieClassification.tier,
    pie_primary_category: analysis.pieClassification.primaryCategory,
    pie_secondary_categories: analysis.pieClassification.secondaryCategories,
    pie_reasoning: analysis.pieClassification.reasoning,
    suggestions: analysis.suggestions || [],
    model_version: analysis.modelVersion || 'gpt-4o-v1',
    response_time_ms: analysis.responseTimeMs || 0,
  }

  try {
    const embedding = await generateEmbedding(analysis.prompt)
    const dataWithEmbedding = { ...dbAnalysis, vector_embedding: embedding }
    
    const { error } = await supabase
      .from('prompt_analyses')
      .insert(dataWithEmbedding)

    if (error) {
      console.error('Failed to save analysis to database:', error)
      throw new Error('Failed to save analysis')
    }
  } catch (embeddingError) {
    console.warn('Failed to generate embedding, saving without it:', embeddingError)
    
    const { error } = await supabase
      .from('prompt_analyses')
      .insert(dbAnalysis)

    if (error) {
      console.error('Failed to save analysis to database:', error)
      throw new Error('Failed to save analysis')
    }
  }
}

export async function getAnalysesFromDatabase(limit = 100): Promise<PromptAnalysis[]> {
  const user = await supabase.auth.getUser()
  
  if (!user.data.user) {
    return []
  }

  const { data, error } = await supabase
    .from('prompt_analyses')
    .select('*')
    .eq('user_id', user.data.user.id)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Failed to fetch analyses from database:', error)
    return []
  }

  return (data || []).map(dbAnalysisToAnalysis)
}

export async function getUserProfile(): Promise<User | null> {
  const user = await supabase.auth.getUser()
  
  if (!user.data.user) {
    return null
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.data.user.id)
    .single()

  if (error) {
    console.error('Failed to fetch user profile:', error)
    return null
  }

  return {
    id: data.id,
    email: data.email,
    subscriptionStatus: data.subscription_status,
    subscriptionTier: data.subscription_tier,
    creditsRemaining: data.credits_remaining,
    createdAt: data.created_at,
  }
}

export async function checkUserHasCredits(): Promise<boolean> {
  const profile = await getUserProfile()
  
  if (!profile) {
    return false
  }

  return profile.creditsRemaining > 0 || profile.subscriptionStatus === 'active'
}

export async function decrementUserCredits(): Promise<void> {
  const user = await supabase.auth.getUser()
  
  if (!user.data.user) {
    throw new Error('User not authenticated')
  }

  const { error } = await supabase.rpc('decrement_user_credits', {
    user_uuid: user.data.user.id
  })

  if (error) {
    console.error('Failed to decrement credits:', error)
  }
}

function dbAnalysisToAnalysis(dbAnalysis: DatabaseAnalysis): PromptAnalysis {
  return {
    id: dbAnalysis.id,
    prompt: dbAnalysis.prompt,
    timestamp: new Date(dbAnalysis.created_at).getTime(),
    tokenCount: dbAnalysis.token_count,
    iceScore: {
      idea: dbAnalysis.ice_idea,
      cost: dbAnalysis.ice_cost,
      exploitability: dbAnalysis.ice_exploitability,
      overall: dbAnalysis.ice_overall,
    },
    pieClassification: {
      tier: dbAnalysis.pie_tier as 1 | 2 | 3,
      primaryCategory: dbAnalysis.pie_primary_category as any,
      secondaryCategories: dbAnalysis.pie_secondary_categories as any[],
      reasoning: dbAnalysis.pie_reasoning,
    },
    suggestions: dbAnalysis.suggestions,
    userId: dbAnalysis.user_id,
    modelVersion: dbAnalysis.model_version,
    responseTimeMs: dbAnalysis.response_time_ms,
  }
}

export async function initializeUserProfile(email: string): Promise<void> {
  const user = await supabase.auth.getUser()
  
  if (!user.data.user) {
    return
  }

  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('id', user.data.user.id)
    .single()

  if (existing) {
    return
  }

  const { error } = await supabase
    .from('users')
    .insert({
      id: user.data.user.id,
      email,
      subscription_status: 'trial',
      subscription_tier: 'free',
      credits_remaining: 3,
    })

  if (error) {
    console.error('Failed to initialize user profile:', error)
  }
}

export async function deleteAllAnalyses(): Promise<number> {
  const user = await supabase.auth.getUser()
  
  if (!user.data.user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('prompt_analyses')
    .delete()
    .eq('user_id', user.data.user.id)
    .select()

  if (error) {
    console.error('Failed to delete analyses:', error)
    throw new Error('Failed to delete history')
  }

  return data?.length || 0
}

export async function deleteAnalysisById(analysisId: string): Promise<void> {
  const user = await supabase.auth.getUser()
  
  if (!user.data.user) {
    throw new Error('User not authenticated')
  }

  const { error } = await supabase
    .from('prompt_analyses')
    .delete()
    .eq('id', analysisId)
    .eq('user_id', user.data.user.id)

  if (error) {
    console.error('Failed to delete analysis:', error)
    throw new Error('Failed to delete analysis')
  }
}
