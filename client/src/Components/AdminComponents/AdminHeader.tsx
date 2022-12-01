import axios from "axios";
import React, { ReactElement } from "react";
import {
  IoIosNotificationsOutline,
  IoMdLogOut,
  IoMdSearch
} from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useGlobalContext } from "../../utils/globalContext";

interface Props {
  activityLogs: any;
}

export default function AdminHeader({ activityLogs }: Props): ReactElement {
  const navigate = useNavigate();
  const { userInfo, loadingUserInfo } = useGlobalContext();

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
        timer: 3000
      });
      navigate("/");
      window.location.reload();
    } catch (e) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Algo salio mal",
        showConfirmButton: false,
        timer: 3000
      });
    }
  };

  return (
    <header className="flex items-center h-20 px-6 sm:px-10 bg-white">
      <button className="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
        <span className="sr-only">Menu</span>
        <svg
          aria-hidden="true"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </button>
      <div className="relative w-full max-w-md sm:-ml-2">
        <IoMdSearch className="absolute h-6 w-6 mt-3 ml-2 text-gray-400" />
        <input
          type="text"
          role="search"
          placeholder="Search..."
          className="py-2 pl-10 pr-4 w-full border-4 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg"
        />
      </div>
      <div className="flex flex-shrink-0 items-center ml-auto">
        {loadingUserInfo ? (
          <> Loading ...</>
        ) : (
          <div className="inline-flex items-center p-2 unded-lg">
            <span className="sr-only">User Menu</span>
            <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
              <span className="font-semibold">{userInfo.userName}</span>
              <span className="text-sm text-gray-600">
                {userInfo.isAuth ? "Admin" : "Client"}
              </span>
            </div>
            <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
              <img
                src={userInfo.userData.profilePicture}
                alt="user profile "
                className="h-full w-full object-cover"
              />
            </span>
          </div>
        )}

        <div className="border-l pl-3 ml-3 space-x-1">
          {activityLogs ? (
            <button className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
              <span className="sr-only">Notifications</span>
              <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
              <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
              <IoIosNotificationsOutline className="w-6 h-6" />
            </button>
          ) : (
            <button className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
              <span className="sr-only">Notifications</span>
              <IoIosNotificationsOutline className="w-6 h-6" />
            </button>
          )}
          <button
            onClick={handleLogOut}
            className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full"
          >
            <span className="sr-only">Log out</span>
            <IoMdLogOut className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
