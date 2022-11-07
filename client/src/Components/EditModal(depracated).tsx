import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// import { useGlobalContext } from "../utils/globalContext";
// import { IsAdminVerificator } from "../utils/IsAdminVerificator";

//tipo de datos de los props en EditModal
interface PropTypes {
  element: any;
  modalIsOpen: boolean;
  setModalIsOpen: (e: boolean) => void;
}

export default function EditModal({
  modalIsOpen,
  setModalIsOpen,
  element
}: PropTypes) {
  //esto solo esta hecho para dejar que se mueva el scroll y cerrar
  const handleCloseModal = () => {
    document.body.style.overflow = "";
    setModalIsOpen(false);
  };

  // declaro estados de los nuevos valores y sus tipos para modelado

  interface FormDataType {
    nombre: string;
    descripcion: string;
    codigo: string;
    foto: string;
    price: number;
    stock: number;
    type: string;
    alcohol: number;
    region: string;
  }

  const [nombre, setNombre] = useState(element.nombre);
  const [descripcion, setDescripcion] = useState(element.descripcion);
  const [codigo, setCodigo] = useState(element.codigo);
  const [foto, setFoto] = useState(element.foto);
  const [price, setPrice] = useState(element.price);
  const [stock, setStock] = useState(element.stock);
  const [type, setType] = useState(element.type);
  const [alcohol, setAlcohol] = useState(element.alcohol);
  const [region, setRegion] = useState(element.region);

  // esto es para ver que el tipo de usuario que es, la variable es global y esta en este contexto
  // const { userTypeState } = useGlobalContext();

  const responseBody: FormDataType = {
    nombre: "",
    descripcion: "",
    codigo: "",
    foto: "",
    price: 0,
    stock: 0,
    type: "",
    alcohol: 0,
    region: ""
  };

  const inputChangeHandler = (
    setFunction: React.Dispatch<React.SetStateAction<any>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFunction(event.target.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    responseBody.nombre = nombre;
    responseBody.type = type;
    responseBody.descripcion = descripcion;
    responseBody.codigo = codigo;
    responseBody.foto = foto;
    responseBody.price = price;
    responseBody.stock = stock;
    responseBody.type = type;
    responseBody.alcohol = alcohol;
    responseBody.region = region;
    //lo mismo que tengo en el formulario principal, todo el modelado y el submit handler igual, quizas despues lo modularize
    axios
      .put(
        `${process.env.REACT_APP_PRODUCT_API_ROUTE}/${element._id}`,
        responseBody,
        {
          headers: {
            // isadmin: JSON.stringify(IsAdminVerificator(userTypeState))
          }
        }
      )
      .then((response) => {
        setNombre("");
        setDescripcion("");
        setCodigo("");
        setFoto("");
        setPrice(0);
        setStock(0);
        setType("");
        setAlcohol(0);
        setRegion("");
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

  return (
    <div
      id="authentication-modal"
      aria-hidden="true"
      className={`${
        !modalIsOpen ? "hidden" : ""
      } h-full w-screen fixed overflow-y-auto overflow-x-hidden top-20 right-0 left-0 z-50 md:inset-0 h-modal md:h-full flex items-center justify-center`}
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg dark:bg-gray-700  border-2 border-grey-200 shadow-2xl">
          <button
            onClick={() => handleCloseModal()}
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
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 ">
              Editar Artículo
            </h3>
            <form className="space-y-6" onSubmit={onSubmitHandler}>
              <div>
                <label
                  htmlFor="nombre"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nuevo Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  className="input-modify-modal  "
                  placeholder={element.nombre}
                  value={nombre}
                  required
                  onChange={(e) => inputChangeHandler(setNombre, e)}
                />
              </div>
              <div>
                <label htmlFor="type" className="lable-modify-modal">
                  Nuevo Tipo
                </label>
                <input
                  type="text"
                  name="type"
                  id="type"
                  placeholder={element.type}
                  className="input-modify-modal"
                  value={type}
                  required
                  onChange={(e) => inputChangeHandler(setType, e)}
                />
              </div>
              <div>
                <label htmlFor="codigo" className="lable-modify-modal">
                  Nuevo Codigo
                </label>
                <input
                  type="text"
                  name="codigo"
                  id="codigo"
                  placeholder={element.codigo}
                  className="input-modify-modal  "
                  required
                  value={codigo}
                  onChange={(e) => inputChangeHandler(setCodigo, e)}
                />
              </div>
              <div>
                <label htmlFor="foto" className="lable-modify-modal">
                  Nueva Foto (URL)
                </label>
                <input
                  type="text"
                  name="foto"
                  id="foto"
                  placeholder={element.foto}
                  className="input-modify-modal  "
                  required
                  value={foto}
                  onChange={(e) => inputChangeHandler(setFoto, e)}
                />
              </div>
              <div>
                <label htmlFor="price" className="lable-modify-modal">
                  Nuevo Precio
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder={element.price}
                  className="input-modify-modal  "
                  required
                  value={price}
                  onChange={(e) => inputChangeHandler(setPrice, e)}
                />
              </div>
              <div>
                <label htmlFor="stock" className="lable-modify-modal">
                  Nuevo Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  placeholder={element.stock}
                  className="input-modify-modal  "
                  required
                  value={stock}
                  onChange={(e) => inputChangeHandler(setStock, e)}
                />
              </div>
              <div>
                <label htmlFor="alcohol" className="lable-modify-modal">
                  Nuevo % de Alcohol
                </label>
                <input
                  type="number"
                  name="alcohol"
                  id="alcohol"
                  placeholder={element.alcohol}
                  className="input-modify-modal  "
                  required
                  value={alcohol}
                  onChange={(e) => inputChangeHandler(setAlcohol, e)}
                />
              </div>
              <div>
                <label htmlFor="region" className="lable-modify-modal">
                  Nueva Región
                </label>
                <input
                  type="text"
                  name="region"
                  id="region"
                  placeholder={element.region}
                  className="input-modify-modal  "
                  required
                  value={region}
                  onChange={(e) => inputChangeHandler(setRegion, e)}
                />
              </div>
              <div>
                <label htmlFor="descripcion" className="lable-modify-modal">
                  Nueva Descripción
                </label>
                <input
                  type="text"
                  name="descripcion"
                  id="descripcion"
                  placeholder={element.descripcion}
                  className="input-modify-modal  "
                  required
                  value={descripcion}
                  onChange={(e) => inputChangeHandler(setDescripcion, e)}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Confirmar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
