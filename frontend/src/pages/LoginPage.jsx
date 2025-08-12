import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authStore } from "../store/authStore";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = authStore();

  const buttonHandle = (e) => {
    if (e.target.value) {
      setActive(true);
      setFormData({ ...formData, email: e.target.value });
    } else {
      setActive(false);
    }
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    console.log(formData);
    const res = await login(formData);
    if (res === 200) {
      navigate("/");
    } else {
      toast.error("Ocurrió un error.");
    }
  };

  return (
    <div className="overflow-hidden min-h-[calc(100vh-4rem)]  w-full bg-base-200 flex flex-col justify-center items-center  px-3 sm:px-10 ">
      <div className="m-auto w-[100%] lg:w-[36rem]">
        <div className="w-full max-w-xl">
          <button
            className="btn btn-ghost text-base-content mb-3"
            onClick={(e) => navigate("/")}
          >
            <ArrowLeft />
            Volver
          </button>
        </div>
        <div className="bg-base-200 border-1 border-base-content/10  flex flex-col p-10 rounded-lg">
          <div className="text-center mb-5">
            <h1 className="font-bold text-base-500 text-2xl sm:text-3xl md:text-4xl ">
              Iniciar Sesion
            </h1>
            <h3 className=" text-base-content/50 text-sm">
              Accede a tu cuenta de Moodie.
            </h3>
          </div>
          <div className="min-h-[15rem]">
            <form
              action="post"
              className="flex flex-col gap-5"
              onSubmit={(e) => submitHandle(e)}
            >
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Correo electrónico</span>
                <input
                  type="email"
                  className="border-2 border-base-content/30 h-12 rounded-lg px-5"
                  placeholder="tumail@example.com"
                  onChange={(e) => buttonHandle(e)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Contraseña</span>
                <input
                  type="password"
                  className="border-2 border-base-content/30 h-12 rounded-lg px-5"
                  placeholder="*********"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <button
                className={`${
                  active ? `bg-base-content text-base-300` : `bg-base-100`
                } h-12 w-full text-center  flex justify-center items-center rounded-lg cursor-pointer`}
                type="submit"
              >
                {isLoggingIn ? (
                  <span className="loading text-base-300 loading-spinner loading-xs"></span>
                ) : (
                  `Iniciar Sesion`
                )}
              </button>
              <span className="text-center text-base-content/30">
                ¿No tienes cuenta?{" "}
                <a
                  onClick={() => navigate("/signup")}
                  className="text-base-content/80 cursor-pointer border-b-1"
                >
                  Registrate
                </a>{" "}
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
