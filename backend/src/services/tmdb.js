import axios from "axios";
import dotenv from "dotenv";
import { getGenreId, getGenreNames } from "../models/genresMap.js";

//dotenv.config({ path: "../.env" });
dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

//https://api.themoviedb.org/3/discover/movie?with_genres=ID1,ID2&api_key=TU_API_KEY&language=es-ES

export async function getMoviesByGenres(genres) {
  try {
    if (!Array.isArray(genres)) {
      throw new Error("El parámetro 'genres' debe ser un array");
    }

    const genreIds = getGenreId(genres);

    const allowedLanguages = ["en", "es", "fr"];
    const blockedLanguages = ["ja", "ko", "zh"];

    const randomPage = Math.floor(Math.random() * 5) + 1;
    const sortOptions = ["popularity.desc", "vote_average.desc"];
    const sortBy = sortOptions[Math.floor(Math.random() * sortOptions.length)];

    //find/tt1028532?external_source=imdb_id&language=es
    const response = await axios.get(`${BASE_URL}/find/`, {
      params: {
        api_key: TMDB_API_KEY,
        with_genres: genreIds.join(","),
        sort_by: sortBy,
        language: "es-ES",
        include_adult: false,
        page: randomPage,
        "vote_average.gte": 6.0,
        "vote_count.gte": 100,
      },
    });

    const rawResults = response.data.results || [];

    const filtered = rawResults
      .filter(
        (movie) =>
          allowedLanguages.includes(movie.original_language) &&
          !blockedLanguages.includes(movie.original_language) &&
          movie.poster_path &&
          movie.overview?.length > 30
      )
      .sort((a, b) => b.vote_average - a.vote_average)
      .slice(0, 3);

    const movies = filtered.slice(0, 3).map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      date: movie.release_date,
      puntuation: movie.vote_average,
      genres: getGenreNames(movie.genre_ids),
    }));

    return movies;
  } catch (error) {
    console.error("Error al obtener películas de TMDb:", error.message);
    return [];
  }
}

export const getMoviesById = async (moviesParam) => {
  try {
    const moviesResponse = await Promise.all(
      moviesParam.map(async (movie) => {
        const res = await axios.get(`${BASE_URL}/find/${movie.imdb_id}?`, {
          params: {
            api_key: TMDB_API_KEY,
            external_source: "imdb_id",
            language: "es",
          },
        });

        const movieInfo = {
          title: res.data.movie_results[0].title,
          overview: res.data.movie_results[0].overview,
          poster: `https://image.tmdb.org/t/p/w500${res.data.movie_results[0].poster_path}`,
          date: res.data.movie_results[0].release_date,
          puntuation: res.data.movie_results[0].vote_average,
          genres: getGenreNames(res.data.movie_results[0].genre_ids),
        };

        return movieInfo;
      })
    );

    return moviesResponse;
  } catch (error) {
    console.log("Error in getMovieById: ", error);
  }
};
