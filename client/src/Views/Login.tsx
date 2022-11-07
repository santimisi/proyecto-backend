import React, { useState, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

import img from "../Assets/images/loginbg.png";

export default function Login({ setUserInfo }: any): ReactElement {
  // estos estados son para handling solo dentro de Login, luego se hace la asignacion con setUserInfo que es el estado global del app
  const [currentUserName, setCurrentUserName] = useState<any>("");
  const [currentUserPassword, setCurrentUserPassword] = useState<any>("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setUserInfo({
      name: "Gerardo",
      userName: currentUserName,
      password: currentUserPassword,
      accountType: "Admin",
      purchases: "0",
      carts: "0",
      _id: "019239861987"
    });
    if (currentUserName === "admin") {
      navigate("/dsh");
    } else {
      navigate("/shop");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-blue-300">
        <div className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
          <div className="p-6 md:p-20 rounded-2xl">
            <h2 className=" mb-5 text-4xl font-bold">Inicia Sesión</h2>
            <p className="max-w-sm mb-12 font-sans font-light text-gray-600">
              Accede a tu cuenta para poder comprar botellas de mezcal al mejor
              precio.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                className="w-full p-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                placeholder="Ingresa nombre de usuario aquí"
                value={currentUserName}
                onChange={(e) => setCurrentUserName(e.target.value)}
              />
              <input
                className="w-full p-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light mt-2"
                placeholder="Ingresa contraseña aquí"
                type="password"
                value={currentUserPassword}
                onChange={(e) => setCurrentUserPassword(e.target.value)}
              />
              <div className="flex flex-col items-center justify-between mt-6 space-y-6 md:flex-row md:space-y-0">
                <div className="font-thin text-blue-700 cursor-pointer">
                  {" "}
                  Olvidé contraseña
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-blue-700 shadow-blue-100 hover:bg-opacity-90 hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
                >
                  <span>Next</span>
                  <AiOutlineArrowRight className="w-7 text-white" />
                </button>
              </div>
            </form>

            <div className="mt-12 border-b border-b-gray-300"></div>
            <p className="py-6 text-small font-thin text-center text-gray-400">
              Acceder como invitado
            </p>
            <div className="flex flex-col space-x-0 space-y-6 md:flex-row md:space-x-4 md:space-y-0"></div>
          </div>
          <img src={img} alt="login bg" className="w-[430px] hidden md:block" />
        </div>
      </div>
    </>
  );
}
