import axios from "axios";
import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { SigninFormDataType } from "../utils/adminUtils";
import { useForm } from "../utils/useForm";

export default function Signin() {
  const initialState: SigninFormDataType = {
    userName: "",
    password: "",
    isAdmin: false,
    name: "",
    lastName: "",
    profilePicture: ""
  };

  const { state, bind } = useForm(initialState);
  const { userName, password, isAdmin, name, lastName, profilePicture } = state;
  const navigate = useNavigate();

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data: response } = await axios.post(
        `${process.env.REACT_APP_SIGNIN_URL}`,
        state,
        {
          withCredentials: true
        }
      );
      if (response.status === "success") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario creado",
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/");
        window.location.reload();
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
    <section className="bg-blue-300 h-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className=" font-bold leading-tight tracking-tight text-gray-900 text-3xl dark:text-white">
              Crea una nueva cuenta
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmitHandler}>
              <div>
                <label
                  htmlFor="userName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tu Username
                </label>
                <input
                  {...bind}
                  type="text"
                  value={userName}
                  name="userName"
                  id="userName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tu Contraseña
                </label>
                <input
                  {...bind}
                  type="password"
                  value={password}
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tu Nombre
                </label>
                <input
                  {...bind}
                  type="text"
                  value={name}
                  name="name"
                  id="name"
                  placeholder="Nombre"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tu Apellido
                </label>
                <input
                  {...bind}
                  type="text"
                  value={lastName}
                  name="lastName"
                  id="lastName"
                  placeholder="Apellido"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tu URL de foto de perfil
                </label>
                <input
                  {...bind}
                  type="text"
                  value={profilePicture}
                  name="profilePicture"
                  id="profilePicture"
                  placeholder="Foto"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    Acepto los{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="/"
                    >
                      Terminos y Condiciones
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Crea una cuenta
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Ya tienes una cuenta?{" "}
                <a
                  href="/"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Inicia aquí
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
