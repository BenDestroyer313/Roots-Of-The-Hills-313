import { GoogleGenAI } from "@google/genai";

// FIX: Aligned with Gemini API guidelines by assuming process.env.API_KEY is always available
// and removing manual API key checks.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCulturalRecommendations = async (context: string) => {
  try {
    const prompt = `You are a "Culture Curator" for 'Roots of the Hills', an app promoting artisans from Uttarakhand, India. Based on the following context, recommend 3 specific types of products. Be brief, evocative, and inspiring. Context: "${context}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error getting cultural recommendations:", error);
    return "Sorry, the Culture Curator is having a moment of reflection. Please try again later.";
  }
};

export const getChatbotResponse = async (
  query: string,
  mode: 'Buyer' | 'Seller' | 'Learn'
) => {
  try {
    let systemInstruction = "";
    switch (mode) {
      case 'Buyer':
        systemInstruction = "You are a helpful shopping assistant for 'Roots of the Hills'. Help users find products from Uttarakhand. Be warm and friendly.";
        break;
      case 'Seller':
        systemInstruction = "You are a guide for artisans on 'Roots of the Hills'. Explain app features like listing products and storytelling in simple terms.";
        break;
      case 'Learn':
        systemInstruction = "You are a cultural guide for Uttarakhand. Answer questions about traditions, festivals, and art forms like Aipan. Be engaging and informative.";
        break;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error getting chatbot response:", error);
    return "I'm sorry, I'm having trouble connecting to the hills' wisdom right now. Please try again.";
  }
};
