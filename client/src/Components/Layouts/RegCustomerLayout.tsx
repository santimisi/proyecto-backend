import React, { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import NavBar from "../NavBar";

export default function RegCustomerLayout({ children }: any): ReactElement {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
