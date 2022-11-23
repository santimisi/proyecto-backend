import React, { FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "../../utils/useForm";
import { FormDataType } from "../../utils/adminUtils";

interface Props {
  title: string;
}
export default function AddItemModal({ title }: Props) {
  const initialState: FormDataType = {
    nombre: "",
    descripcion: "",
    codigo: "",
    foto: "",
    price: 0,
    stock: 0,
    type: "",
    alcohol: 0,
    region: "",
    sold: 0
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_PRODUCT_API_ROUTE}/`, state, {
        headers: { isadmin: true }
      })
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

  // custom hook to handle forms :3
  const { state, bind } = useForm(initialState);
  const {
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
      style: "w-full md:w-full px-3 pt-2",
      type: "text"
    },
    {
      value: price,
      name: "price",
      style: "pt-2 w-full md:w-1/3 px-3",
      type: "number"
    },
    {
      value: stock,
      name: "stock",
      style: "pt-2 w-full md:w-1/3 px-3",
      type: "number"
    },
    {
      value: codigo,
      name: "codigo",
      style: " w-full md:w-1/3 px-3 pt-2",
      type: "text"
    },
    {
      value: foto,
      name: "foto",
      style: "pt-2 md:w-full w-full px-3",
      type: "text"
    },
    {
      value: sold,
      name: "sold",
      style: "pt-2 w-full px-3",
      type: "number"
    }
  ];

  return (
    <form onSubmit={submitHandler} className="w-1/2 mx-auto pt-10">
      <h1 className="text-center pb-10 font-bold text-3xl"> {title}</h1>
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
                id={input.name}
                name={input.name}
                type={input.type}
                {...bind}
                value={input.value}
              />
            </div>
          );
        })}
      </div>
      <button type="submit" className="mx-auto mt-6 mb-6 block btn">
        Agregar Nuevo Mezcal
      </button>
    </form>
  );
}
