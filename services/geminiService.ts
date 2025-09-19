
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A concise summary of the provided text, capturing the main points.",
    },
    keywords: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "A list of the most relevant keywords or topics from the text.",
    },
  },
  required: ["summary", "keywords"],
};

export const analyzeText = async (text: string): Promise<AnalysisResult> => {
  if (!text.trim()) {
    return { summary: '', keywords: [] };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following text. Provide a summary and extract key topics. Text: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonString = response.text.trim();
    const result: AnalysisResult = JSON.parse(jsonString);
    return result;

  } catch (error) {
    console.error("Error analyzing text with Gemini API:", error);
    throw new Error("Failed to analyze text. The AI model may be temporarily unavailable.");
  }
};
