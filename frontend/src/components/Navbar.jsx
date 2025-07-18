import React from "react";
import { LogIn, LetterText, Settings, MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-950/95 flex h-14 items-center justify-between px-10">
      <h1
        className="text-amber-50 font-bold text-2xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        Moodie
      </h1>
      <div className="hidden sm:flex">
        <ul className="flex gap-10">
          <li className="flex font-semibold text-amber-50 items-center gap-1 bg-black/25 px-2 py-1 rounded-md cursor-pointer">
            <LogIn className="size-4.5" />
            Login
          </li>
          <li className="flex font-semibold text-amber-50 items-center gap-1 bg-black/25 px-2 py-1 rounded-md cursor-pointer">
            <LetterText className="size-4.5" />
            SignUp
          </li>
          <li className="flex font-semibold text-amber-50 items-center gap-1 bg-black/25 px-2 py-1 rounded-md cursor-pointer">
            <Settings className="size-4.5" />
            Settings
          </li>
        </ul>
      </div>
      <MenuIcon className="sm:hidden flex text-amber-50" />
    </div>
  );
};

export default Navbar;
