import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { useEffect } from "react";
import { authStore } from "../store/authStore";

const VerificationCode = () => {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [data, setData] = useState({
    codeInput: null,
    email: null,
  });
  const inputRef = useRef([]);
  const navigate = useNavigate();

  const { verification, authUser, isVerifying } = authStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.lengt > 1) {
      const pastedCode = value.slice(0, 5).split("");
      for (let i = 0; i < 5; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 4) {
        inputRef.current[index + 1].focus();
      }
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    const newCode = code.join("");
    const codeInt = parseInt(newCode);
    setData({ email: authUser, codeInput: codeInt });
    console.log("DATA", data);
    verification(data);
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [code]);

  console.log(data);

  return (
    <div className="overflow-hidden min-h-[calc(100vh-4rem)]  w-full bg-base-200 flex flex-col justify-center items-center  px-3 sm:px-10 ">
      <div className="m-auto w-[100%] lg:w-[36rem]">
        <div className="w-full max-w-xl">
          <button className="btn btn-ghost text-base-content mb-3">
            <ArrowLeft />
            Volver
          </button>
        </div>
        <div className="bg-base-200 border-1 border-base-content/10  flex flex-col p-10 rounded-lg">
          <div className="text-center mb-5">
            <div className="mx-auto w-16 h-16 bg-base-content rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-base-300" />
            </div>
            <h1 className="font-bold mt-3 text-base-500 text-2xl sm:text-3xl md:text-4xl ">
              Verifica tu cuenta
            </h1>
            <h3 className=" text-base-content/50 text-sm">
              Hemos enviado un codigo de 5 digitos a <br />
              <span className="text-base-content">{authUser}</span>
            </h3>
          </div>
          <div className="min-h-[15rem] flex flex-col justify-between">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-row gap-5 justify-center"
            >
              {code.map((digit, index) => (
                <input
                  type="text"
                  key={index}
                  ref={(el) => (inputRef.current[index] = el)}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl font-bold bg-base-content/15 text-base-content boder-2 border-gray-50 rounded-lg focus:border-green-500 focus:outline-none"
                />
              ))}
            </form>
            <div
              className={`${
                isVerifying ? `flex` : `hidden`
              }  w-full justify-center items-center gap-2`}
            >
              <span className="loading text-base-content loading-spinner loading-xs"></span>
              <span className="text-center text-base-content">
                Verificando código
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-4 text-center text-base-content/50 text-sm">
                ¿No recibiste el código?
              </span>
              <button className="bg-base-content text-base-300 h-12 w-full text-center  flex justify-center items-center rounded-lg cursor-pointer">
                {" "}
                Reenviar Código{" "}
              </button>
              <span className="text-base-content/50 mt-3 text-center text-sm">
                Al verificar tu cuenta aceptas nuestros terminos de servicio y
                política de privacidad
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;

//HACER MAS PRUEBAS CON CORREO Y CODIGO.
