import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../store/authStore";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const { signup, isSigningUp } = authStore();

  const buttonHandle = (e) => {
    if (e.target.value) {
      setActive(true);
      setFormData({ ...formData, email: e.target.value });
    } else {
      setActive(false);
    }
  };

  const submitHandle = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Todos los campos deben estar completos.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("La contraseña debe ser mayor a 6 caracteres.");
      return;
    }

    if (formData.password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }
    signup(formData);
    navigate("/verification");
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
              Registrate
            </h1>
            <h3 className=" text-base-content/50 text-sm mt-2">
              Completa los campos para obtener tu cuenta Moodie
            </h3>
          </div>
          <div className="min-h-[15rem]">
            <form
              action="post"
              className="flex flex-col gap-5"
              onSubmit={(e) => submitHandle(e)}
            >
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Nombre completo</span>
                <input
                  type="text"
                  className="border-2 border-base-content/30 h-10 rounded-lg px-5"
                  placeholder="Tu nombre"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Correo electrónico</span>
                <input
                  type="email"
                  className="border-2 border-base-content/30 h-10 rounded-lg px-5"
                  placeholder="tumail@example.com"
                  onChange={(e) => buttonHandle(e)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold">
                  Contraseña{" "}
                  <span className="font-light text-[10px] text-base-content/00">
                    Mínimo 6 caracteres
                  </span>{" "}
                </span>

                <input
                  type="password"
                  className="border-2 border-base-content/30 h-10 rounded-lg px-5"
                  placeholder="*********"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Confirmar Contraseña</span>
                <input
                  type="password"
                  className="border-2 border-base-content/30 h-10 rounded-lg px-5"
                  placeholder="*********"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                className={`${
                  active ? `bg-base-content text-base-300` : `bg-base-100`
                } h-10 w-full text-center  flex justify-center items-center rounded-lg cursor-pointer`}
                type="submit"
              >
                {isSigningUp ? (
                  <span className="loading text-base-300 loading-spinner loading-xs"></span>
                ) : (
                  `Registrarse`
                )}
              </button>
              <span className="text-center text-base-content/30">
                ¿Ya tienes una cuenta?{" "}
                <a
                  onClick={() => navigate("/login")}
                  className="text-base-content/80 cursor-pointer border-b-1"
                >
                  Inicia Sesion
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
