
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, model } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: model || 'gpt-4o',
      response_format: { type: "json_object" },
    });

    const responseContent = completion.choices[0].message.content;
    res.status(200).json({ result: responseContent });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
