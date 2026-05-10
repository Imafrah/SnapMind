
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const parseImageData = (imageData: string) => {
  const dataUrlMatch = imageData.match(/^data:([^;]+);base64,(.+)$/);

  if (dataUrlMatch) {
    return {
      mimeType: dataUrlMatch[1],
      data: dataUrlMatch[2],
    };
  }

  return {
    mimeType: 'image/png',
    data: imageData,
  };
};

export async function askGeminiAboutImage(base64Image: string, question: string): Promise<string> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const imageData = parseImageData(base64Image);

  const imagePart = {
    inlineData: {
      mimeType: imageData.mimeType,
      data: imageData.data,
    },
  };

  const textPart = {
    text: `You are an AI assistant analyzing a screenshot.

FORMAT THE ANSWER IN A CLEAR STRUCTURE:
1. Start with a short direct answer under the heading SUMMARY.
2. Add DETAILS with the important observations, using numbered points.
3. Add NEXT STEPS only when the user needs actions, fixes, or instructions.
4. Keep each point short and practical.

STRICT OUTPUT RULES:
1. Use plain text only.
2. Do not use markdown symbols such as **, #, backticks, or horizontal rules.
3. Do not use dash bullets or star bullets. Use numbered points only.
4. Do not wrap the response in quotes.
5. Use uppercase section headings like SUMMARY, DETAILS, NEXT STEPS.
6. If the screenshot does not contain enough information, say exactly what is missing.

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
    throw new Error(error.message || "Failed to get response from AI");
  }
}
