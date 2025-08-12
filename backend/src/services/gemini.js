import { GoogleGenAI } from "@google/genai";

import dotenv from "dotenv";

//dotenv.config({ path: "../.env" });
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function generateGenresWithGemeni({ mood, goal, experience }) {
  /*   const prompt = `
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

  */

  const favorites = undefined;
  const dislikes = undefined;
  const languages = undefined;
  const format = undefined;
  const intensity = undefined;
  const years = undefined;
  const actor_director = undefined;

  const prompt = `
    
  Sos una IA experta en recomendar películas de forma personalizada según el estado emocional del usuario y su perfil cinéfilo.

  Formato de salida obligatorio:
    [
        {"title": "The Road", "imdb_id": "tt0898367"},
        {"title": "Atonement", "imdb_id": "tt0783233"},
        {"title": "Mystic River", "imdb_id": "tt0327056"}
    ]

    -title: título oficial en español o inglés.
    -imdb_id: ID real de IMDb (no inventar, debe ser verificable en IMDb).
    -No incluyas descripciones ni ningún otro texto fuera del JSON.
    -La lista debe contener exactamente 3 películas.

  Datos del usuario:
    -Estado emocional actual: "${mood}"
    -Qué quiere hacer con ese estado: "${goal}"
    -Qué tipo de experiencia quiere: "${experience}"

  Perfil del usuario:
    Películas favoritas: "${favorites}"
    Géneros que no le gustan: "${dislikes}"
    Idiomas preferidos: "${languages}"
    Prefiere: "${format}"
    Nivel de intensidad emocional deseado: "${intensity}"
    Años favoritos: "${years}"
    Actor/director favorito: "${actor_director}"

  Reglas:

  Si el usuario quiere cambiar una emoción negativa → recomendar películas que alivien o mejoren el estado.
  Si quiere continuar con una emoción negativa → recomendar películas que acompañen y validen ese sentimiento.
  Si quiere potenciar una emoción positiva → recomendar películas que la amplifiquen.
  Si quiere entender su estado → recomendar películas introspectivas.

  Usar las películas favoritas para inferir estilo, ritmo, tono y géneros preferidos.
  No recomendar géneros listados en "Géneros que no le gustan".
  Evitar películas que no estén en los idiomas preferidos.
  Ajustar la intensidad emocional según el parámetro "intensity".
  Respetar "formato preferido" y "años favoritos".
  En caso de que algún dato de perfil no esté definido, simplemente ignorarlo y no mencionarlo.
  Importante: Todas las películas sugeridas deben tener un imdb_id real obtenido de IMDb.
    
  NO uses comillas triples, NO uses etiquetas como \`\`\`json.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const output = response.text;
    const json = JSON.parse(output);

    console.log(json);

    return json;
  } catch (error) {
    console.log("Error in the function generateGenresWithGemeni", error);
    return [];
  }
}
