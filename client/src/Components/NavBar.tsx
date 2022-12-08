import axios from "axios";
import React, { ReactElement, useState, useEffect } from "react";
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import agave from "../Assets/images/agave.png";
import { useGlobalContext } from "../utils/globalContext";
import CartModal from "./CartModal";

export default function NavBar(): ReactElement {
  const { userInfo, loadingUserInfo } = useGlobalContext();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    document.body.style.overflow = "hidden";
    setModalIsOpen(true);
  };

  const handleLogOut = async () => {
    try {
      const { data: response } = await axios.get(
        `${process.env.REACT_APP_LOGOUT_URL}`,
        {
          withCredentials: true
        }
      );

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 1500
      });
      navigate("/");
      window.location.reload();
    } catch (e) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Algo salio mal",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAuth) {
        setIsLoaded(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingUserInfo]);

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/shop" className="flex items-center">
          <img src={agave} className="w-12 h-12" alt="main logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Agave
          </span>
        </Link>
        {isLoaded ? (
          <>
            <div className="flex items-center md:order-2">
              <button
                className="btn"
                type="button"
                data-modal-toggle="defaultModal"
                onClick={() => handleOpen()}
              >
                Cart
              </button>
              <button
                onClick={handleLogOut}
                className="relative p-2 ml-5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full"
              >
                <span className="sr-only">Log out</span>
                <IoMdLogOut className="w-6 h-6" />
              </button>
            </div>
          </>
        ) : (
          <Link to="/">
            <button className="btn" type="button">
              Login
            </button>
          </Link>
        )}
      </div>
      <CartModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </nav>
  );
}
