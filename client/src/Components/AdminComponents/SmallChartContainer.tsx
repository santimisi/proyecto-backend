import axios from "axios";
import React, { useState } from "react";
import { FiTrash2, FiTrash, FiPlus } from "react-icons/fi";
import Swal from "sweetalert2";

import { itemType } from "../../utils/adminUtils";
import AddItemInCartModal from "./AddItemInCartModal";

export default function SmallChartContainer({ item }: any) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDeleteItem = (item: any, product: any) => {
    Swal.fire({
      title: `Seguro que quieres borrar el item: "${product.nombre}" `,
      showDenyButton: true,
      confirmButtonText: "Borrar",
      denyButtonText: `No Borrar`
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .delete(
              `${process.env.REACT_APP_CARRITO_API_ROUTE}/${item}/productos/${product._id}`,
              {
                headers: {
                  isadmin: true
                }
              }
            )
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

  const handleDeleteCart = (item: any) => {
    Swal.fire({
      title: `Seguro que quieres borrar el carrito con Id: "${item._id}" `,
      showDenyButton: true,
      confirmButtonText: "Borrar",
      denyButtonText: `No Borrar`
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .delete(`${process.env.REACT_APP_CARRITO_API_ROUTE}/${item._id}`, {
              headers: {
                isadmin: true
              }
            })
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Carrito Borrado!",
                text: "Carrito Borrado satisfactoriamente"
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
        Swal.fire("Carrito no borrado", "", "info");
      }
    });
  };

  const handleOpenEditCartModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col row-span-3 bg-white shadow rounded-lg">
        <div className="flex flex-row items-center justify-between">
          <div className="px-6 py-5 font-semibold border-b border-gray-400 w-full">
            Cart Id: <span className="text-blue-900">{item._id}</span>
          </div>
          <div className="flex flex-row justify-center mr-5">
            <FiPlus
              className="cursor-pointer text-blue-500"
              onClick={() => handleOpenEditCartModal()}
            />
            <FiTrash
              className="cursor-pointer text-red-400 ml-2"
              onClick={() => handleDeleteCart(item)}
            />
          </div>
        </div>
        <div className="p-4 flex-grow">
          <div className="flex items-center h-full px-4 ">
            <div className="w-full bg-white ">
              <div className="divide-y-2 divide-gray-200">
                {item.productos.map((product: itemType) => {
                  return (
                    <div
                      key={product._id}
                      className="p-3 flex flex-row items-center justify-between"
                    >
                      <div>
                        <span className="font-bold">{product.nombre} </span>
                        <span className="text-xs text-gray-600 pl-5">
                          {" "}
                          Cantidad:{" "}
                        </span>
                        {product.quantity}
                      </div>
                      <FiTrash2
                        className="cursor-pointer text-red-800"
                        onClick={() => handleDeleteItem(item._id, product)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen ? (
        <AddItemInCartModal
          title="Agregar Item a Carrito"
          item={item}
          setIsModalOpen={setIsModalOpen}
        />
      ) : null}
    </>
  );
}
