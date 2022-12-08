import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/images/agave.png";
import { IoMdCube, IoIosCart, IoIosMan, IoIosBookmarks } from "react-icons/io";
import { MdOutlineStorefront } from "react-icons/md";

export default function LeftBar(): ReactElement {
  const sideBarRoutes = [
    {
      icon: <IoMdCube className="h-6 w-6" />,
      route: "/dsh/allItems",
      title: "Items"
    },
    {
      icon: <IoIosCart className="h-6 w-6" />,
      route: "/dsh/allCarts",
      title: "Carts"
    },
    {
      icon: <IoIosMan className="h-6 w-6" />,
      route: "/dsh/allUsers",
      title: "Users"
    },
    {
      icon: <IoIosBookmarks className="h-6 w-6" />,
      route: "/dsh/allLogs",
      title: "Logs"
    }
  ];
  return (
    <aside className="hidden sm:flex sm:flex-col">
      <a
        href="/dsh"
        className="inline-flex items-center justify-center h-20 w-20 bg-blue-600 hover:bg-blue-500 focus:bg-blue-500"
      >
        <img
          src={logo}
          className="h-21 w-12"
          alt="admin logo"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </a>
      <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
        <nav className="flex flex-col mx-4 my-6 space-y-4">
          {sideBarRoutes.map((item) => {
            return (
              <Link
                key={item.title}
                to={item.route}
                className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg "
              >
                <span className="sr-only">{item.title}</span>
                {item.icon}
              </Link>
            );
          })}
        </nav>
        <div className="inline-flex items-center justify-center h-20 w-20">
          <a
            href="/shop"
            className="p-5 inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
          >
            <MdOutlineStorefront className="h-6 w-6" />
          </a>
        </div>
      </div>
    </aside>
  );
}
