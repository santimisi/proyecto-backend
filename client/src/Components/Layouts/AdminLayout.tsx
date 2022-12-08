import React, { ReactElement } from "react";
import { Outlet } from "react-router-dom";

// components used in the layout
import AdminHeader from "../AdminComponents/AdminHeader";
import LeftBar from "../AdminComponents/LeftBar";

export default function AdminLayout(): ReactElement {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <LeftBar />
      <div className="flex-grow text-gray-800">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
}
