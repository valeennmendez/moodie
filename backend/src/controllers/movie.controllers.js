import { generateGenresWithGemeni } from "../services/gemini.js";
import { getMoviesById } from "../services/tmdb.js";

export const recommendation = async (req, res) => {
  const { mood, goal, experience } = req.body;

  try {
    console.log(mood, goal, experience);
    const moviesJson = await generateGenresWithGemeni({
      mood,
      goal,
      experience,
    });

    const movies = await getMoviesById(moviesJson);

    return res.status(200).json({ movies });
  } catch (error) {
    console.log("Error in movie.controllers.recommendation", error);
    res
      .status(501)
      .json({ error: "Error in movie.controllers.recommendation" });
  }
};
