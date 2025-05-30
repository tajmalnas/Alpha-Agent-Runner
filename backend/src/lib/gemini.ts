import { GoogleGenerativeAI } from "@google/generative-ai"
import "dotenv/config"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function getGeminiResponse(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
  const result = await model.generateContent(prompt)
  const text = result.response.text()
  return text
}
