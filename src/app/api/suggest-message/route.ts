import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// Simple in-memory cache to store previously generated questions
let questionCache: string[] = [];

export async function GET() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt =
      `Create a list of three open-ended engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform and should be suitable for a diverse audience. Avoid personal and sensitive topics, focusing instead on universal themes that encourage friendly interaction. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment. 
      
      IMPORTANT: Make sure these questions are different from the following previously generated questions: ${questionCache.join(', ')}. 
      
      Your output should be structured like this: 'Question 1?||Question 2?||Question 3?'`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Split the text into an array of questions
    const questions = text.split('||').map(question => question.trim())

    // Update the cache with the new questions
    questionCache = [...questionCache, ...questions].slice(-9);  // Keep last 9 questions in cache

    return new Response(JSON.stringify({ questions }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error generating questions:', error)
    return new Response(JSON.stringify({ error: 'Failed to generate questions' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}