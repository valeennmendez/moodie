import { generateGenresWithGemeni } from "../services/gemini.js";
import { getMoviesByGenres } from "../services/tmdb.js";

export const recommendation = async (req, res) => {
  const { mood, goal, experience } = req.body;

  try {
    const genres = await generateGenresWithGemeni({ mood, goal, experience });

    const movies = await getMoviesByGenres(genres);

    return res.status(200).json({ genres, movies });
  } catch (error) {
    console.log("Error in movie.controllers.recommendation", error);
    res
      .status(501)
      .json({ error: "Error in movie.controllers.recommendation" });
  }
};
