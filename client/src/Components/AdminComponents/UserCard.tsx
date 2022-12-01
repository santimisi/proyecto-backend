import axios from "axios";
import React, { ReactElement, useState } from "react";
import Swal from "sweetalert2";

interface UserCardProps {
  _id: string;
  userName: string;
  isAdmin: boolean;
  name: string;
  lastName: string;
  profilePicture: string;
}

export default function UserCard({
  _id,
  userName,
  isAdmin,
  name,
  lastName,
  profilePicture
}: UserCardProps): ReactElement {
  const handleConvert = async (userName: string, _id: string, type: string) => {
    Swal.fire({
      title: `Seguro que quieres cambiar el tipo de cuanta a ${type} `,
      showDenyButton: true,
      confirmButtonText: "Cambiar",
      denyButtonText: `No Cambiar`
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .post(`${process.env.REACT_APP_CONVERT_USER_TYPE}`, {
              userName,
              _id
            })
            .then((response) => {
              if (response.data.status === "success") {
                Swal.fire({
                  icon: "success",
                  title: "Todo Bien!",
                  text: response.data.message
                }).then(() => {
                  window.location.reload();
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Algo sucedio",
                  text: response.data.message
                });
              }
            });
        } catch (e) {
          console.log(e);
        }
      } else if (result.isDenied) {
        Swal.fire("Usuario no cambiado", "", "info");
      }
    });
  };

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md ">
      <div className="flex justify-end px-4 pt-4">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="inline-block text-gray-500 hover:bg-gray-100   rounded-lg text-sm p-1.5"
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
          </svg>
        </button>
        <div className="relative">
          <div
            id="dropdown"
            className={`z-50  ${
              isMenuOpen ? "absolute" : "hidden"
            } -right-16 top-10 text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-44 `}
          >
            <ul className="py-1" aria-labelledby="dropdownButton">
              <li>
                <a
                  href="/"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100  "
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={
            profilePicture ||
            "https://www.nicepng.com/png/detail/799-7998295_profile-placeholder-woman-720-profile-photo-placeholder-png.png"
          }
          alt="Bonnie"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {userName}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{name}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{_id}</span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          {isAdmin ? (
            <button
              onClick={() => handleConvert(userName, _id, "Usuario")}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
            >
              Hacer Usuario
            </button>
          ) : (
            <button
              onClick={() => handleConvert(userName, _id, "Admin")}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
            >
              Hacer Admin
            </button>
          )}
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 ">
            Ver Compras
          </button>
        </div>
      </div>
    </div>
  );
}
