import { useEffect, useState } from "react";
import axios from "axios";
import { selectionStore } from "../store/selectionStore";
//import { movieRecommendations } from "../store/movieRecommendations";

const Results = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const { moodSelection, goalSelection } = selectionStore();
  console.log("Meta recuperada en resultados:", goalSelection);

  const NODE_ENV = import.meta.env.VITE_ENV;
  const route = "/api/movie/recommendation";

  useEffect(() => {
    setMovies([]);
    setGenres([]);

    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${
            NODE_ENV === "development"
              ? `http://localhost:5001${route}`
              : `https://moodie.onrender.com${route}`
          }`,
          {
            mood: moodSelection,
            goal: goalSelection,
          }
        );

        setMovies(response.data.movies);
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-[92.8vh] w-full bg-slate-950/95 flex flex-col items-center p-10">
      {movies.length === 0 ? (
        <div className="h-[80vh] w-full flex flex-col justify-center items-center text-4xl">
          <h1 className="text-amber-50 font-bold text-center">
            Buscando la mejor película
          </h1>
          <p className="text-slate-300 text-lg">Espere un momento...</p>
          <span className="loading loading-spinner loading-xs"></span>
        </div>
      ) : (
        <>
          <div className="text-center">
            <h1 className="text-amber-50 font-bold text-4xl">
              Películas para vos
            </h1>
            <h3 className="text-amber-50/70 font-semibold text-xl">
              Basado en como te sentís hoy.
            </h3>
          </div>
          <div className=" sm:w-[35rem] md:w-[50rem] lg:w-full px-10">
            <div className="my-5">
              <h1 className="text-slate-300/60 left-0">
                Géneros recomendados: {<span>{genres?.join(", ")}</span>}
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              {movies.map((movie) => (
                <div className="flex flex-col md:flex-row gap-2 md:gap-10 rounded-md border-1 border-white/20 overflow-hidden ">
                  <div className="">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="md:w-64 w-full h-full object-contains"
                    />
                  </div>
                  <div className="w-full p-5 flex flex-col justify-around">
                    <h1 className="text-amber-50 font-bold text-2xl lg:text-4xl">
                      {movie.title}
                    </h1>
                    <p className="text-slate-300 text-sm lg:text-lg">
                      {movie.genres.join(",")}
                    </p>
                    <span className="text-sm lg:text-lg text-slate-300 font-semibold">
                      ⭐{Math.round(movie.puntuation * 10) / 10}
                    </span>
                    <p className="text-slate-300 text-[13px] lg:text-sm pr-5">
                      {movie.overview}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

/* 70 rem */

export default Results;
