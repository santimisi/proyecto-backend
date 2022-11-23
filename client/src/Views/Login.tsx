import React, { ReactElement, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";

import img from "../Assets/images/loginbg.png";
import { useForm } from "../utils/useForm";
import { LoginFormDataType } from "../utils/adminUtils";

export default function Login({ setUserInfo }: any): ReactElement {
  const initialState: LoginFormDataType = {
    userName: "",
    password: ""
  };

  const { state, bind } = useForm(initialState);
  const { userName, password } = state;
  const navigate = useNavigate();

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // global context pega aqui
    setUserInfo(state);
    try {
      const { data: response } = await axios.post(
        `${process.env.REACT_APP_LOGIN_URL}`,
        state,
        {
          withCredentials: true
        }
      );
      if (response.status === "success") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Acceso Correcto",
          showConfirmButton: false,
          timer: 1500
        });
        if (response.type === "admin") {
          navigate("/dsh");
          window.location.reload();
        } else {
          navigate("/shop");
          window.location.reload();
        }
      }
    } catch (e: any) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: e.response.data.message,
        showConfirmButton: false,
        timer: 1500
      });
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
            <form onSubmit={onSubmitHandler}>
              <input
                {...bind}
                required
                className="w-full p-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                placeholder="Ingresa nombre de usuario aquí"
                name="userName"
                value={userName}
              />
              <input
                {...bind}
                required
                className="w-full p-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light mt-2"
                placeholder="Ingresa contraseña aquí"
                type="password"
                name="password"
                value={password}
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
            <div className="w-full flex justify-center">
              <Link to="/signin">
                <button className="pt-10 text-blue-500 text-center">
                  {" "}
                  Crear cuenta nueva
                </button>
              </Link>
            </div>
            <div className="mt-12 border-b border-b-gray-300"></div>
            <Link to="/shop">
              <p className="py-6 text-small font-thin text-center text-gray-400 cursor-pointer">
                Acceder como invitado
              </p>
            </Link>
            <div className="flex flex-col space-x-0 space-y-6 md:flex-row md:space-x-4 md:space-y-0"></div>
          </div>
          <img src={img} alt="login bg" className="w-[430px] hidden md:block" />
        </div>
      </div>
    </>
  );
}
