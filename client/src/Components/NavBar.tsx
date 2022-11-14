import React, { ReactElement } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Navbar(): ReactElement {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const { data: response } = await axios.get(
        "http://localhost:8080/api/logout",
        {
          withCredentials: true
        }
      );
      Swal.fire({
        icon: "success",
        title: "Bravo",
        text: response.message
      });
      navigate("/");
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No puedes hacer logout si no has iniciado sesion"
      });
    }
  };

  return (
    <nav className="p-3 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Entregable
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="inline-flex justify-center items-center ml-3 text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-500"
          aria-controls="navbar-solid-bg"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hiden w-full md:block md:w-auto" id="navbar-solid-bg">
          <button
            onClick={handleLogout}
            className="flex flex-col mt-4 bg-blue-500 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 p-3"
          >
            {" "}
            Logout{" "}
          </button>
        </div>
      </div>
    </nav>
  );
}
