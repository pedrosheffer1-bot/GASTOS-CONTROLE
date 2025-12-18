
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, Transaction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getFinancialAdvice(
  history: ChatMessage[],
  transactions: Transaction[],
  userInput: string
): Promise<string> {
  const modelName = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    You are 'Finnegan', a high-end AI financial advisor for the Royal Deep Fintech app. 
    You are sophisticated, professional, yet helpful.
    Current user balance details and recent transactions are provided to you.
    Help the user understand their spending, save more, or provide investment insights.
    Recent Transactions: ${JSON.stringify(transactions.slice(0, 5))}
  `;

  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  // Add the current user query
  contents.push({
    role: 'user',
    parts: [{ text: userInput }]
  });

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: contents as any,
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      }
    });

    return response.text || "I apologize, I'm having trouble analyzing your finances right now.";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "I'm temporarily offline. Let's try again in a moment.";
  }
}
