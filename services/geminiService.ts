
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export async function askGeminiAboutImage(base64Image: string, question: string): Promise<string> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  // Extract base64 clean data (remove mime type prefix)
  const base64Data = base64Image.split(',')[1] || base64Image;

  const imagePart = {
    inlineData: {
      mimeType: 'image/png',
      data: base64Data,
    },
  };

  const textPart = {
    text: `You are an AI assistant analyzing a screenshot. 
    
    CRITICAL INSTRUCTIONS FOR RESPONSE FORMATTING:
    - Respond in PLAIN TEXT ONLY.
    - DO NOT use any markdown characters: No bold (**), no italics (*), no headers (#), no backticks (\`), no horizontal rules (---).
    - DO NOT use bullet points with dashes (-) or asterisks (*). Use numbers (1., 2.) or simple indentation.
    - DO NOT wrap the response in quotes.
    - Use clear spacing and capital letters for section headings instead of bolding.
    - Ensure the response is clean, human-readable, and free of any technical markers or markdown noise.

    USER QUESTION: ${question}`
  };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts: [imagePart, textPart] },
      config: {
        temperature: 0.1, // Even lower temperature to minimize creative/unstructured formatting
        topP: 0.95,
        topK: 64,
      }
    });

    return response.text || "I was unable to analyze the image.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return `Error: ${error.message || "Failed to get response from AI"}`;
  }
}
