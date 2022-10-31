import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useGlobalContext } from "../utils/globalContext";
import EditModal from "./EditModal";
import { IsAdminVerificator } from "../utils/IsAdminVerificator";

//element es toda la informacion del item, su ID, nombre, precio etc
// ahorita tiene tipo any por que solo quiero pasarlo para probar
export interface AdminButtonsType {
  element: any;
}

export default function AdminButtons({
  element
}: AdminButtonsType): ReactElement {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  // esto va a redireccionar cuando se cumpla una accion
  let navigate = useNavigate();

  //este es el estado global donde esta almacenado el tipo de usuario ""
  const { userTypeState } = useGlobalContext();
  // funcion para borrar un item, mandamos el delete con el id del elemento a borrar
  const handleErease = () => {
    try {
      axios
        .delete(`${process.env.REACT_APP_PRODUCT_API_ROUTE}/${element._id}`, {
          headers: {
            isadmin: JSON.stringify(IsAdminVerificator(userTypeState))
          }
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Item Borrado!",
            text: "Item Borrado satisfactoriamente"
          }).then(() => {
            navigate("/");
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
  };

  // funcion para editar un producto y abriri modal
  const handleEdit = (e: any) => {
    setModalIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <div className="flex items-center justify-around">
      {" "}
      <button
        className="bg-red-400  text-white font-bold py-2 px-4 border-b-4 border-red-600 rounded mt-4"
        onClick={(e) => handleErease()}
      >
        Borrar
      </button>
      <button
        className="bg-gray-200  text-gray-600 font-bold py-2 px-4 border-b-4 border-gray-400 rounded mt-4"
        onClick={(e) => handleEdit(e)}
      >
        Editar
      </button>
      {/* cuando presionamos Editar, el handleEdit abre un modal para poder mandar
      un request con la nueva info a ingresar al sistema */}
      <EditModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        element={element}
      />
    </div>
  );
}
