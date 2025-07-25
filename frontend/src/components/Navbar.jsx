import { useState } from "react";
import { LogIn, LetterText, Settings, MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  /*   return (
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
          <li
            onClick={() => navigate("/settings")}
            className="flex font-semibold text-amber-50 items-center gap-1 bg-black/25 px-2 py-1 rounded-md cursor-pointer"
          >
            <Settings className="size-4.5" />
            Settings
          </li>
        </ul>
      </div>
      <MenuIcon className="sm:hidden flex text-amber-50" />
    </div>
  );
};
 */

  const [openMenu, setOpenMenu] = useState(false);

  const handleClick = (path) => {
    setOpenMenu(!openMenu);
    navigate(path);
  };

  return (
    <div className="navbar bg-base-100 shadow-md p-0">
      <div className="flex-1">
        <a
          className="btn btn-ghost text-xl font-bold"
          onClick={() => navigate("/")}
        >
          Moodie
        </a>
      </div>
      <div className="hidden sm:flex flex-none">
        <ul className="flex flex-row gap-10 pr-5">
          <li className="flex cursor-pointer ">
            <a
              className="flex font-semibold items-center gap-1 "
              onClick={() => navigate("/login")}
            >
              <LogIn className="size-4.5" />
              Login
            </a>
          </li>
          <li className="flex cursor-pointer ">
            <a
              className="flex font-semibold items-center gap-1"
              tabIndex={0}
              onClick={() => navigate("/signup")}
            >
              <LetterText className="size-4.5" />
              SignUp
            </a>
          </li>
          <li className="flex cursor-pointer ">
            <a
              className="flex font-semibold items-center gap-1"
              tabIndex={0}
              onClick={() => navigate("/settings")}
            >
              <Settings className="size-4.5" />
              Settings
            </a>
          </li>
        </ul>
      </div>
      <div className="sm:hidden flex-none">
        <button className="btn btn-square btn-ghost">
          <MenuIcon className="size-6" onClick={() => setOpenMenu(!openMenu)} />
        </button>
      </div>
      <div
        className={`${
          openMenu ? `flex` : `hidden`
        }  absolute top-14 w-full z-10  items-center justify-center bg-base-200 h-40`}
      >
        <ul className="flex flex-col gap-6">
          <li className="flex cursor-pointer ">
            <a
              className="flex font-semibold items-center gap-1"
              onClick={() => handleClick("/login")}
            >
              <LogIn className="size-4.5" />
              Login
            </a>
          </li>
          <li className="flex cursor-pointer ">
            <a
              className="flex font-semibold items-center gap-1"
              tabIndex={0}
              onClick={() => handleClick("/signup")}
            >
              <LetterText className="size-4.5" />
              SignUp
            </a>
          </li>
          <li className="flex cursor-pointer ">
            <a
              className="flex font-semibold items-center gap-1"
              tabIndex={0}
              onClick={() => handleClick("/settings")}
            >
              <Settings className="size-4.5" />
              Settings
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
