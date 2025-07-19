import { GoogleGenAI } from "@google/genai";

import dotenv from "dotenv";

dotenv.config({ path: "../.env" });
//dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function generateGenresWithGemeni({ mood, goal, experience }) {
  const prompt = `
    Sos una IA que recomienda géneros de películas según el estado emocional del usuario.

    Tu tarea es devolver 3 géneros de películas que se ajusten emocional y psicológicamente al estado del usuario y a lo que desea hacer con él.

    Respondé solamente un array JSON como este: ["Drama", "Romance", "Suspenso"]

    ---

    Datos del usuario:
    - Estado emocional actual: "${mood}"
    - Qué quiere hacer con ese estado: "${goal}"
    - Qué tipo de experiencia quiere: "${experience}"

    Reglas:
    - Si el usuario quiere cambiar una emoción negativa como tristeza, ansiedad, miedo, enojo → recomendá géneros que alivien o mejoren el estado (ej. Comedia, Aventura, Animación)
    - Si quiere continuar con un estado negativo → recomendá géneros que acompañen ese sentimiento (ej. Drama, Biografía, Documental)
    - Si quiere potenciar un estado positivo → sugerí géneros que lo amplifiquen (ej. Romance, Música, Fantasía)
    - Si quiere entender su estado → usá géneros introspectivos como Drama, Psicológico, Misterio

    No repitas siempre los mismos géneros. Elegí de forma variada.`;

  try {
    console.log(prompt);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const output = response.text;
    const json = JSON.parse(output);

    return json;
  } catch (error) {
    console.log("Error in the function generateGenresWithGemeni", error);
    return [];
  }
}
