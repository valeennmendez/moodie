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
      emoji: <Heart className="text-primary" />,
    },
    {
      goal: "Quiero mantener esta emoción",
      emoji: <Star className="text-primary" />,
    },
    {
      goal: "Quiero entenderla mejor",
      emoji: <Brain className="text-primary" />,
    },
    {
      goal: "Quiero distraerme",
      emoji: <Eye className="text-primary" />,
    },
    {
      goal: "Sorprendeme",
      emoji: <Shuffle className="text-primary" />,
    },
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
    <div className="min-h-screen w-full bg-base-100 flex flex-col items-center p-10">
      <div className="w-full max-w-xl">
        <button
          className="btn btn-ghost text-base-content mb-10"
          onClick={onClick}
        >
          <ArrowLeft />
          Volver
        </button>
      </div>

      <div className="text-center mb-5">
        <h1 className="font-bold text-base-500 text-2xl sm:text-3xl md:text-4xl ">
          ¿Qué querés hacer con ese sentimiento?
        </h1>
        <h3 className="font-semibold text-base-400 text-md sm:text-lg md:text-xl lg:text-xl">
          Te encontraremos la película perfecta.
        </h3>
      </div>

      <div className="grid grid-cols-1 max-w-xl grid-rows-5 h-[25rem]  w-sm sm:w-md md:w-lg lg:w-xl mt-5 gap-2 px-8 sm:p-0">
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
