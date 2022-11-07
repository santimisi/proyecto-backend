import React, { useContext } from "react";
import { MyGlobalContext } from "../utils/globalContext";

export default function Hero() {
  const { userInfo } = useContext(MyGlobalContext);
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        {userInfo ? (
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Hola! {userInfo.name}
          </h1>
        ) : null}
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Compra mezcal con nosotros
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Somos una comercializadora de bebidas de agave especializados en el
          mezcal mexicano, aquí podrás encontrar bebidas para todo los
          paladares.
        </p>
        <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36 -mb-32">
          <span className="font-semibold text-gray-400 uppercase text-2xl">
            Todos nuestros productos
          </span>
        </div>
      </div>
    </section>
  );
}
