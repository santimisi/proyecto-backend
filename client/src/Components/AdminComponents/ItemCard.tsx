import axios from "axios";
import React, { ReactElement, useState } from "react";
import Swal from "sweetalert2";
import { itemType } from "../../utils/adminUtils";
import EditModal from "./EditModal";

interface CardItemProps {
  item: itemType;
}

export default function ItemCard({ item }: CardItemProps): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);
  const [activeItem, setActiveItem] = useState<itemType>();

  const handleDelete = (item: itemType) => {
    Swal.fire({
      title: `Seguro que quieres borrar el item: "${item.nombre}" `,
      showDenyButton: true,
      confirmButtonText: "Borrar",
      denyButtonText: `No Borrar`
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .delete(`${process.env.REACT_APP_PRODUCT_API_ROUTE}/${item._id}`, {
              headers: {
                isadmin: true
              }
            })
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Item Borrado!",
                text: "Item Borrado satisfactoriamente"
              }).then(() => {
                window.location.reload();
              });
            })
            .catch((response) => {
              Swal.fire({
                icon: "error",
                title: "No tienes permisos para borrarlo",
                text: response.message
              });
            });
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "No se pudo borrar",
            text: error
          });
        }
      } else if (result.isDenied) {
        Swal.fire("Item no borrado", "", "info");
      }
    });
  };

  const handleEdit = (item: itemType) => {
    document.body.style.overflow = "hidden";
    setActiveItem(item);
    setModalIsOpen(true);
  };

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
                <button
                  onClick={() => handleDelete(item)}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-32 h-32 mb-3  shadow-sm"
          src={item.foto}
          alt="not found"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {item.nombre}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {item._id}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {item.region}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ${item.price}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          %{item.alcohol}
        </span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <button
            onClick={() => handleEdit(item)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
          >
            Edit
          </button>
        </div>
      </div>
      {activeItem && (
        <EditModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          element={activeItem}
        />
      )}
    </div>
  );
}
