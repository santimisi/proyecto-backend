import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "react-use-cart";
//todas las vistas para la aplicacion ---
import ProductGrid from "./Views/ProductGrid";
import ProductDetails from "./Views/ProductDetails";
import NotFound from "./Views/NotFound";
//---
//layout para la todas las paginas ---
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
///------

import useLocalStorage from "./utils/LocalStorage";
import { MyGlobalContext } from "./utils/globalContext";

// ---- de aqui manejo las rutas para poder interactuar con las dinamicas y tener mas limio el codigo ---
export const ROUTE_PATHS = {
  Home: "/",
  ProductDetails: "/product-detail/:id"
};
export const navigateToRoute = {
  goToProductDetails: (id: string) =>
    `${ROUTE_PATHS.ProductDetails}`.replace(":id", id)
};

// ----------

const App = () => {
  // inicializo el local Storage dependiendo el global state que declare antes con el contexto
  const [userType, setUserType] = useLocalStorage("userType", "customer");
  //inicializo el estado global para que pueda acceder en todo momento a la variable de tipo de usuario
  const [userTypeState, setUserTypeState] = useState<string>(userType);

  return (
    <MyGlobalContext.Provider value={{ userTypeState, setUserTypeState }}>
      {/* agrego third party library para el carrito, me dio flojera implementarlo yo, quizas despues lo haga */}
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route
              path={ROUTE_PATHS.Home}
              element={
                <ProductGrid userType={userType} setUserType={setUserType} />
              }
            />
            <Route
              path={ROUTE_PATHS.ProductDetails}
              element={<ProductDetails />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </MyGlobalContext.Provider>
  );
};

export default App;
