import React from "react";

const Goal = ({ goal, emoji, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="border-2 cursor-pointer flex items-center pl-5 gap-5 bg-slate-950/95 rounded-md border-slate-950"
    >
      <span className="bg-blue-700/30 p-1.5 rounded-md ">{emoji}</span>
      <span className="text-amber-50 font-medium">{goal}</span>
    </div>
  );
};

export default Goal;
