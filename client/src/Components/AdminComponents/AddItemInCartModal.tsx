import React, { FormEvent, ReactElement } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ExistingItemFormDataType } from "../../utils/adminUtils";
import { useForm } from "../../utils/useForm";

interface Props {
  title: string;
  item: any;
  setIsModalOpen: (status: boolean) => void;
}

export default function AddItemInCartModal({
  title,
  item,
  setIsModalOpen
}: Props): ReactElement {
  const initialState: ExistingItemFormDataType = {
    _id: "",
    nombre: "",
    descripcion: "",
    codigo: "",
    foto: "",
    price: 0,
    stock: 0,
    type: "",
    alcohol: 0,
    region: "",
    sold: 0,
    quantity: 1
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //se hace el llamado al back con la URL que corresponde a addOne, con el nuevo objecto completo y modelado
    //y con los headers para verificar si es admin, ya el servidor validara esta variable y regresara 403 si no es admin
    //y un 200 si es admin y agrega el item
    axios
      .post(
        `${process.env.REACT_APP_CARRITO_API_ROUTE}/${item._id}/productos`,
        state,
        {
          headers: { isadmin: true }
        }
      )
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Todo Bien!",
          text: response.data.message
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.descripcion
        });
      });
  };

  const { state, bind } = useForm(initialState);
  const {
    _id,
    nombre,
    descripcion,
    codigo,
    foto,
    price,
    stock,
    type,
    alcohol,
    region,
    sold
  } = state;

  // todos los campose de inputs
  const inputs = [
    {
      value: nombre,
      name: "nombre",
      style: "w-full md:w-1/2 px-3 mb-6 md:mb-0",
      type: "text"
    },
    {
      value: type,
      name: "type",
      style: "w-full md:w-1/2 px-3",
      type: "text"
    },
    {
      value: region,
      name: "region",
      style: "w-full md:w-1/2 px-3",
      type: "text"
    },
    {
      value: alcohol,
      name: "alcohol",
      style: "w-full md:w-1/2 px-3",
      type: "number"
    },
    {
      value: descripcion,
      name: "descripcion",
      style: "px-3 w-full",
      type: "text"
    },
    {
      value: price,
      name: "price",
      style: "w-full md:w-1/3 px-3 mb-6 md:mb-0",
      type: "number"
    },
    {
      value: stock,
      name: "stock",
      style: "w-full md:w-1/3 px-3 mb-6 md:mb-0",
      type: "number"
    },
    {
      value: codigo,
      name: "codigo",
      style: "w-full md:w-1/3 px-3 mb-6 md:mb-0",
      type: "text"
    },
    {
      value: foto,
      name: "foto",
      style: "w-full md:w-1/2 px-3",
      type: "text"
    },
    {
      value: sold,
      name: "sold",
      style: "w-full md:w-1/2 px-3",
      type: "number"
    },
    {
      value: _id,
      name: "_id",
      style: "w-full px-3",
      type: "text"
    }
  ];

  return (
    <div className="h-full w-screen fixed overflow-y-auto overflow-x-hidden top-20 right-0 left-0 z-50 md:inset-0 h-modal md:h-full flex items-center justify-center">
      <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg dark:bg-gray-700  border-2 border-grey-200 shadow-2xl">
          <button
            onClick={() => setIsModalOpen(false)}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="authentication-modal"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <form onSubmit={submitHandler} className="w-full mx-auto pt-10 px-10">
            <h1 className="text-center pb-10 font-bold text-3xl">
              {" "}
              {title}: {item._id}
            </h1>
            <div className="flex flex-wrap -mx-3 mb-6">
              {inputs.map((input) => {
                return (
                  <div className={input.style}>
                    <label className="input-lable" htmlFor={input.name}>
                      {input.name}
                    </label>
                    <input
                      required
                      className="starting-input"
                      type={input.type}
                      {...bind}
                      name={input.name}
                      id={input.name}
                      value={input.value}
                    />
                  </div>
                );
              })}
            </div>
            <button type="submit" className="mx-auto mt-6 mb-6 block btn">
              {" "}
              Agregar Nuevo Mezcal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
