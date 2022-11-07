import React, { ReactElement } from "react";
import { Outlet } from "react-router-dom";

// components used in the layout
import AdminHeader from "../AdminComponents/AdminHeader";
import LeftBar from "../AdminComponents/LeftBar";

// context to bring the info
import { useGlobalContext } from "../../utils/globalContext";

export default function AdminLayout({ children }: any): ReactElement {
  const { userInfo } = useGlobalContext();
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <LeftBar />
      <div className="flex-grow text-gray-800">
        <AdminHeader />
        {userInfo ? (
          <h1>Hola! vengo desde global context: {userInfo.name}</h1>
        ) : null}
        <Outlet />
      </div>
    </div>
  );
}
