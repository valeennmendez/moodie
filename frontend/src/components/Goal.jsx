import React from "react";

const Goal = ({ goal, emoji, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="border-2 cursor-pointer flex items-center pl-5 gap-5 bg-primary/18 rounded-md border-none"
    >
      <span className="bg-base-100 p-1.5 rounded-md ">{emoji}</span>
      <span className="text-base font-medium">{goal}</span>
    </div>
  );
};

export default Goal;
