import React, { ReactElement, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { connect } from "socket.io-client";

// components used in the layout
import AdminHeader from "../AdminComponents/AdminHeader";
import LeftBar from "../AdminComponents/LeftBar";

const socketUrl = process.env.REACT_APP_SOCKET_URL || "http://localhost:3001/";
const socket = connect(socketUrl);

export default function AdminLayout(): ReactElement {
  const [activityLogs, setActivityLogs] = useState<any>();

  useEffect(() => {
    socket.on("recover_logs", (data) => {
      setActivityLogs(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <LeftBar />
      <div className="flex-grow text-gray-800">
        <AdminHeader activityLogs={activityLogs} />
        <Outlet />
      </div>
    </div>
  );
}
