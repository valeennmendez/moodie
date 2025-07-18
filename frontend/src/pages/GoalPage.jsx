import { useState } from "react";
import CardMood from "../components/CardMood";
import { Heart, Star, Brain, Eye, Shuffle, ArrowLeft } from "lucide-react";
import { selectionStore } from "../store/selectionStore";
import { useNavigate } from "react-router-dom";
import Goal from "../components/Goal";

const GoalPage = () => {
  const navigate = useNavigate();
  const { setGoal } = selectionStore();

  const goals = [
    {
      goal: "Quiero sentirme mejor",
      emoji: <Heart className="text-blue-500/70" />,
    },
    {
      goal: "Quiero mantener esta emoción",
      emoji: <Star className="text-blue-500/70" />,
    },
    {
      goal: "Quiero entenderla mejor",
      emoji: <Brain className="text-blue-500/70" />,
    },
    { goal: "Quiero distraerme", emoji: <Eye className="text-blue-500/70" /> },
    { goal: "Sorprendeme", emoji: <Shuffle className="text-blue-500/70" /> },
  ];

  function onClick() {
    navigate("/");
  }

  function setGoalSelected(goal) {
    console.log("Meta seleccionada:", goal);
    setGoal(goal);
    navigate("/results");
  }

  return (
    <div className="min-h-[92.9vh] w-full bg-slate-950/95 flex flex-col items-center p-10">
      <div className="flex left-0  w-sm sm:w-md md:w-lg lg:w-xl">
        <span
          className="flex text-white/70 mb-10 hover:bg-black/40 px-4 py-2 rounded-md cursor-pointer"
          onClick={() => onClick()}
        >
          <ArrowLeft />
          Volver
        </span>
      </div>
      <div className="text-center">
        <h1 className="text-amber-50 font-bold text-2xl sm:text-3xl md:text-4xl ">
          ¿Qué querés hacer con ese sentimiento?
        </h1>
        <h3 className="text-amber-50/80 font-semibold text-md sm:text-lg md:text-xl lg:text-xl">
          Te encontraremos la película perfecta.
        </h3>
      </div>
      <div className="grid grid-cols-1 grid-rows-5 h-[25rem]  w-sm sm:w-md md:w-lg lg:w-xl mt-5 gap-2">
        {goals.map(({ goal, emoji }) => (
          <Goal
            key={goal}
            goal={goal}
            emoji={emoji}
            onSelect={() => setGoalSelected(goal)}
          />
        ))}
      </div>
    </div>
  );
};

export default GoalPage;
