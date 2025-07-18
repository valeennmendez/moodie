import { useState } from "react";
import CardMood from "../components/CardMood";
import { ArrowRight } from "lucide-react";
import { selectionStore } from "../store/selectionStore";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const navigate = useNavigate();
  const { setMood } = selectionStore();

  const moods = [
    { mood: "Feliz", emoji: "feliz.png" },
    { mood: "Triste", emoji: "triste.png" },
    { mood: "Relajado", emoji: "relajado.png" },
    { mood: "Estresado", emoji: "estresado.png" },
    { mood: "Pensativo", emoji: "pensativo.png" },
    { mood: "Neutral", emoji: "neutral.png" },
  ];

  function onClick(mood) {
    setMood(mood);
    navigate("/goal");
  }

  return (
    <div className="min-h-[92.9vh] w-full bg-slate-950/95 flex flex-col items-center p-10">
      <div className="text-center">
        <h1 className="text-amber-50 font-bold text-4xl">
          Te recomendaré una película...
        </h1>
        <h3 className="text-amber-50/80 font-semibold text-2xl">
          ¿Cómo te sentís hoy?
        </h3>
      </div>
      <div className="grid grid-cols-2 grid-rows-3 h-[25rem] w-sm sm:w-md md:w-lg lg:w-xl mt-5 p-5 sm:p-0 gap-2">
        {moods.map(({ mood, emoji }) => (
          <CardMood
            key={mood}
            mood={mood}
            emoji={emoji}
            onSelect={() => setSelectedMood(mood)}
            selected={selectedMood === mood}
          />
        ))}
      </div>
      <div className=" w-sm sm:w-md md:w-lg lg:w-xl px-5 sm:px-0">
        <div
          onClick={() => onClick(selectedMood)}
          className={`${
            selectedMood
              ? `bg-blue-700/60 hover:bg-blue-700/30`
              : `bg-[#0e2238]`
          }  h-14 mt-0 sm:mt-5 rounded-md flex justify-center items-center gap-2 cursor-pointer`}
        >
          <span
            className={`font-medium ${
              selectedMood ? `text-amber-50` : `text-white/15 `
            } `}
          >
            Continuar
          </span>
          <ArrowRight
            className={`size-5 ${
              selectedMood ? `text-amber-50` : `text-white/15 `
            } mt-0.5`}
          />
        </div>
      </div>
      <span className="sm:text-sm mt-2 text-amber-50/30 text-[10px] text-center">
        Te recomendamos crear una cuenta para mantener un historial de tus
        peliculas vistas.
      </span>
    </div>
  );
};

export default HomePage;
