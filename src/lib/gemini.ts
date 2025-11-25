import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ''

let genAI: GoogleGenerativeAI | null = null

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey)
}

export type GeminiModel = 'gemini-1.5-pro' | 'gemini-1.5-flash' | 'gemini-1.0-pro'

export async function callGemini(
  prompt: string,
  modelName: GeminiModel = 'gemini-1.5-flash',
  jsonMode: boolean = false
): Promise<string> {
  if (!genAI || !apiKey) {
    throw new Error('Gemini API key not configured')
  }

  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      ...(jsonMode && { responseMimeType: 'application/json' })
    }
  })

  const result = await model.generateContent(prompt)
  const response = await result.response
  return response.text()
}

export function isGeminiConfigured(): boolean {
  return !!apiKey
}

export const GEMINI_MODELS = {
  'gemini-1.5-pro': {
    name: 'Gemini 1.5 Pro',
    description: 'Highest quality, medium cost',
    costPer1MTokens: 7.00
  },
  'gemini-1.5-flash': {
    name: 'Gemini 1.5 Flash',
    description: 'Fast, low cost, good quality',
    costPer1MTokens: 0.35
  },
  'gemini-1.0-pro': {
    name: 'Gemini 1.0 Pro',
    description: 'Backup option',
    costPer1MTokens: 3.50
  }
} as const
