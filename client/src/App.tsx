import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "react-use-cart";
//todas las vistas para la aplicacion ---
import ProductGrid from "./Views/ProductGrid";
import ProductDetails from "./Views/ProductDetails";
import NotFound from "./Views/NotFound";
import Dashboard from "./Views/Dashboard";
import AllItemsAdmin from "./Components/AdminComponents/AllItemsAdmin";
import AllCartsAdmin from "./Components/AdminComponents/AllCartsAdmin";
//---
//layout para la todas las paginas ---
import RegCustomerLayout from "./Components/Layouts/RegCustomerLayout";
import AdminLayout from "./Components/Layouts/AdminLayout";
///------
// import useLocalStorage from "./utils/LocalStorage";

import Login from "./Views/Login";
import AllUsersAdmin from "./Components/AdminComponents/AllUsersAdmin";
import ScrollToTop from "./utils/ScrollToTop";

// --- Global context
import { MyGlobalContext } from "./utils/globalContext";

// ---- de aqui manejo las rutas para poder interactuar con las dinamicas y tener mas limio el codigo ---
export const ROUTE_PATHS = {
  Login: "/",
  ProductDetails: "/product-detail/:id",
  Dashboard: "/dsh",
  Shop: "/shop",
  AllAdminItems: "/dsh/allItems",
  AllAdminCarts: "/dsh/allCarts",
  AllAdminUsers: "/dsh/allUsers"
};
export const navigateToRoute = {
  goToProductDetails: (id: string) =>
    `${ROUTE_PATHS.ProductDetails}`.replace(":id", id)
};

// ----------

const App = () => {
  // el username va a estar en global context
  const [userInfo, setUserInfo] = useState<any>();

  // routing para cliente normal
  const clientRouting = [
    { path: ROUTE_PATHS.Login, element: <Login setUserInfo={setUserInfo} /> },
    { path: ROUTE_PATHS.Shop, element: <ProductGrid /> },
    { path: ROUTE_PATHS.ProductDetails, element: <ProductDetails /> }
  ];

  // routing para dashboard de admin
  const adminRouting = [
    { path: ROUTE_PATHS.Dashboard, element: <Dashboard /> },
    { path: ROUTE_PATHS.AllAdminItems, element: <AllItemsAdmin /> },
    { path: ROUTE_PATHS.AllAdminCarts, element: <AllCartsAdmin /> },
    { path: ROUTE_PATHS.AllAdminUsers, element: <AllUsersAdmin /> }
  ];

  return (
    <MyGlobalContext.Provider value={{ userInfo, setUserInfo }}>
      {/* agrego third party library para el carrito, me dio flojera implementarlo yo, quizas despues lo haga */}
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path={ROUTE_PATHS.Login} element={<RegCustomerLayout />}>
              {clientRouting.map((item) => {
                return (
                  <Route
                    path={item.path}
                    element={item.element}
                    key={item.path}
                  />
                );
              })}
            </Route>
            <Route path={ROUTE_PATHS.Dashboard} element={<AdminLayout />}>
              {adminRouting.map((item) => {
                return (
                  <Route
                    path={item.path}
                    element={item.element}
                    key={item.path}
                  />
                );
              })}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </MyGlobalContext.Provider>
  );
};

export default App;
