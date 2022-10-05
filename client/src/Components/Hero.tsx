import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../utils/globalContext";

type Props = {
  userType: string;
  setUserType: (type: string) => void;
};

const userStates = ["Cliente", "Admin"];

export default function Hero({ userType, setUserType }: Props) {
  const { setUserTypeState } = useGlobalContext();
  const [currentType, setCurrentType] = useState("");

  useEffect(() => {
    setCurrentType(userType);
  }, [setCurrentType, userType]);

  const handleChangeType = (item: string) => {
    // para cambiar el estado en Local Storage
    setUserType(item);
    //current Type para prender botonoes de colores
    setCurrentType(item);
    // para cambiar el estado global
    setUserTypeState(item);
  };
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Compra mezcal con nosotros!
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Somos una comercializadora de bebidas de agave especializados en el
          mezcal mexicano, aquí podrás encontrar bebidas para todo los
          paladares.
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          {userStates.map((item) => {
            return (
              <div
                key={item}
                onClick={() => handleChangeType(item)}
                className={`inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center ${
                  item === currentType
                    ? "bg-blue-400 text-white"
                    : "text-gray-900"
                }  cursor-pointer rounded-lg border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100`}
              >
                Soy {item}
              </div>
            );
          })}
        </div>
        {userType === "Cliente" && (
          <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36 -mb-32">
            <span className="font-semibold text-gray-400 uppercase text-2xl">
              Todos nuestros productos
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
