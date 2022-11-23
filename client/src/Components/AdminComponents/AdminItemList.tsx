import React, { ReactElement, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import axios from "axios";

import { itemType, limitText } from "../../utils/adminUtils";
import EditModal from "./EditModal";

export default function AdminItemList({ allItemsArray }: any): ReactElement {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);
  const [activeItem, setActiveItem] = useState<itemType>();

  const handleModifyitem = (item: itemType) => {
    document.body.style.overflow = "hidden";
    console.log(item);
    setActiveItem(item);
    setModalIsOpen(true);
  };

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
  return (
    <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg w-full">
      <div className="px-6 py-5 font-semibold border-b border-gray-100">
        Items en invetario
      </div>
      <div className="p-4 flex-grow">
        <div className="flex items-center justify-center h-full px-4">
          <div className="w-full bg-white rounded-lg shadow-lg">
            <ul className="divide-y-2 divide-gray-400">
              {allItemsArray.map((item: any) => {
                return (
                  <div key={item._id}>
                    <li className="w-full  flex justify-between p-3 hover:bg-blue-600 hover:text-white group">
                      <p>
                        <span className="text-xs text-gray-500 italic group-hover:text-white">
                          Nombre:{" "}
                        </span>
                        {limitText(item.nombre, 15)}
                      </p>
                      <p>
                        <span className="text-xs text-gray-500 italic group-hover:text-white">
                          ID:{" "}
                        </span>
                        {item._id}
                      </p>
                      <div className="flex flex-row gap-5">
                        <FiEdit2
                          onClick={() => handleModifyitem(item)}
                          className="w-6 h-6 text-blue-600 group-hover:text-white cursor-pointer"
                        />

                        <FiTrash2
                          onClick={() => handleDelete(item)}
                          className="w-6 h-6 text-red-600 group-hover:text-white cursor-pointer"
                        />
                      </div>
                    </li>
                    {activeItem && (
                      <EditModal
                        modalIsOpen={modalIsOpen}
                        setModalIsOpen={setModalIsOpen}
                        element={activeItem}
                      />
                    )}
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
