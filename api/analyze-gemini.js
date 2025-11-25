
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, model } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key not configured on server' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const aiModel = genAI.getGenerativeModel({ 
      model: model || 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const result = await aiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    res.status(200).json({ result: text });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
