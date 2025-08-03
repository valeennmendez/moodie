import { useState } from "react";
import {
  LogIn,
  LetterText,
  Settings,
  MenuIcon,
  ChevronDown,
  ChevronUp,
  User,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../store/authStore";

const Navbar = () => {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const { isAuthenticated, authUser } = authStore();
  const [openSlide, setOpenSlide] = useState(false);

  const handleClick = (path) => {
    setOpenMenu(!openMenu);
    navigate(path);
  };

  const handleSlide = (path) => {
    if (path) {
      console.log("Path: ", path);
      navigate(path);
      setOpenSlide(false);
    } else {
      setOpenSlide(!openSlide);
    }
  };

  console.log("USER: ", authUser);

  return (
    <div className="navbar bg-base-100 shadow-md px-1">
      <div className="flex-1">
        <a
          className="btn btn-ghost text-xl font-bold"
          onClick={() => navigate("/")}
        >
          Moodie
        </a>
      </div>
      {isAuthenticated ? (
        <div className="relative group mr-8 hidden sm:inline">
          <div onClick={() => handleSlide()} className="flex gap-0.5">
            <span className="font-semibold border-base-content/50 cursor-pointer hover:border-b-2">
              Bienvenido {authUser?.name}
            </span>
            {openSlide ? (
              <ChevronUp className="size-6 mt-0.5 cursor-pointer " />
            ) : (
              <ChevronDown className="size-6 mt-0.5 cursor-pointer " />
            )}
          </div>
          <div
            className={`${
              openSlide ? `flex` : `hidden`
            } absolute z-10 left-0 mt-5 bg-base-200 rounded w-full shadow-lg opacity-100 transition-all duration-300`}
          >
            <ul className="flex flex-col  w-full">
              <li
                className="font-semibold p-4 w-full h-10 cursor-pointer hover:bg-base-content/10 gap-1.5 flex items-center transition-all duration-400 "
                onClick={() => handleSlide("/settings")}
              >
                <Settings className="size-4.5" />
                Configuracion
              </li>
              <li className="font-semibold p-4 w-full h-10 cursor-pointer hover:bg-base-content/10 gap-1.5 flex items-center transition-all duration-400 ">
                <User className="size-4.5" />
                Perfil
              </li>
              <li className="font-semibold p-4 rounded-b w-full h-10 gap-1.5 cursor-pointer  hover:bg-base-content/10 transition-all duration-400 flex items-center">
                <LogOut className="size-4.5" />
                Salir
              </li>
            </ul>
          </div>
        </div>
      ) : (
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
      )}

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
              tabIndex={0}
              onClick={() => handleClick("/settings")}
            >
              <Settings className="size-4.5" />
              Settings
            </a>
          </li>
          <li className="flex cursor-pointer ">
            <a
              className="flex font-semibold items-center gap-1"
              onClick={() => handleClick("/login")}
            >
              {isAuthenticated ? (
                <>
                  <User className="size-4.5" /> Perfil
                </>
              ) : (
                <>
                  <LogIn className="size-4.5" />
                  "Login"
                </>
              )}
            </a>
          </li>
          <li className="flex cursor-pointer ">
            <a
              className="flex font-semibold items-center gap-1"
              tabIndex={0}
              onClick={() => handleClick("/signup")}
            >
              {isAuthenticated ? (
                <>
                  <LogOut className="size-4.5" /> Salir
                </>
              ) : (
                <>
                  <LetterText className="size-4.5" />
                  SignUp
                </>
              )}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
