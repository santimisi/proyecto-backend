import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";
import empty from "../Assets/images/empty.png";
import ItemInCart from "./ItemInCart";
interface CartModalTypes {
  modalIsOpen: boolean;
  setModalIsOpen: (e: boolean) => void;
}

export default function CartModal({
  modalIsOpen,
  setModalIsOpen
}: CartModalTypes) {
  const handleCloseModal = () => {
    document.body.style.overflow = "";
    setModalIsOpen(false);
  };
  const { isEmpty, items, emptyCart } = useCart();
  const navigate = useNavigate();

  const handleSubmitCart = () => {
    try {
      axios
        .post(`${process.env.REACT_APP_CARRITO_API_ROUTE}/`, items)
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Gracias por tu compra.",
            text: `El ID de tu carrito es ${response.data.id}, en breve deberrías recibir un correo con tu guía para el envío`
          });
          document.body.style.overflow = "";
          emptyCart();
          setModalIsOpen(false);
          navigate("/shop");
        })
        .catch((response) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.response.data.message
          });
        });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salio mal, si persiste contactanos"
      });
    }
  };
  return (
    <div
      id="checkout-modal"
      aria-hidden="true"
      className={`${
        !modalIsOpen ? "hidden" : ""
      } h-full w-screen fixed overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full flex items-center justify-center`}
    >
      <div className="relative p-10 w-full  h-full md:h-auto">
        <div className="relative bg-white rounded-lg dark:bg-gray-700 border-2 p-2 md:p-20 border-grey-200 shadow-2xl">
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
          {isEmpty ? (
            <div className="flex items-center justify-center mx-auto w-full h-full flex-col">
              <h2 className="text-lg md:text-3xl">
                {" "}
                Tu carrito se encuentra vacío
              </h2>
              <img src={empty} alt="not found" className="h-22 md:h-[300px] " />
            </div>
          ) : (
            <div className=" mx-auto w-full">
              <h2 className="sr-only">Order summary</h2>

              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {items.map((item, idx) => {
                    return <ItemInCart itemData={item} key={item.nombre} />;
                  })}
                </ul>
              </div>

              <dl className="text-sm font-medium text-gray-500 mt-10 space-y-6">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-gray-900">$104.00</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Taxes</dt>
                  <dd className="text-gray-900">$8.32</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd className="text-gray-900">$14.00</dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 text-gray-900 pt-6">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">$126.32</dd>
                </div>
              </dl>
            </div>
          )}
          <button
            className="mt-6 w-full bg-red-400 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  "
            onClick={() => emptyCart()}
          >
            {" "}
            Vaciar Carrito
          </button>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-400 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-50"
            onClick={() => handleSubmitCart()}
          >
            Continuar
          </button>
          {/* <CartStaticModal />   */}
        </div>
      </div>
    </div>
  );
}
