import React from "react";
import { useState } from "react";

const CardMood = ({ mood, emoji, onSelect, selected }) => {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-colors duration-300 p-5 flex flex-col items-center rounded-md border-2 ${
        selected
          ? "bg-primary/60 hover:bg-primary/30 border-primary"
          : "bg-base-200 hover:bg-base-300 border-base-300"
      }`}
    >
      <img src={emoji} className="w-10" alt={`emoji ${mood}`} />
      <h2 className="font-medium text-xl text-base-content text-center mt-2">
        {mood}
      </h2>
    </div>
  );
};

/* return (
    <div
      onClick={onSelect}
      className={`${
        selected
          ? `bg-blue-700/60 hover:bg-blue-700/30`
          : `bg-[#0e2238] hover:bg-black/20`
      } border-2 cursor-pointer border-[#0c1e306d]  transition-colors duration-300 rounded-md  flex flex-col items-center p-5`}
    >
      <img src={emoji} className="w-[2.5rem]" alt={`emoji ${mood}`} />
      <h2 className="font-medium text-xl text-amber-50 text-center mt-2">
        {mood}
      </h2>
    </div>
  );
}; */

export default CardMood;
