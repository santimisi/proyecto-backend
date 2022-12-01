import React, { ReactElement } from "react";
import {
  FiPackage,
  FiArchive,
  FiShoppingCart,
  FiTrendingUp,
  FiUser,
  FiUserPlus
} from "react-icons/fi";
import { RotatingLines } from "react-loader-spinner";

// local components -------
import BigChartContainer from "../Components/AdminComponents/BigChartContainer";
import OverallCard from "../Components/AdminComponents/OverallCard";
import ScrollDownList from "../Components/AdminComponents/ScrollDownList";
// import SmallChartContainer from "../Components/AdminComponents/SmallChartContainer";

// importing utils to handle all the numbers and quantities, as well as fetches to API
import { useApiGet, TApiResponse } from "../utils/fetchProducts";
import {
  allItemsInStock,
  allItemsSoldYearly,
  findAllAdmins,
  numberWithCommas
} from "../utils/adminUtils";
import ScrollDownListUsers from "../Components/AdminComponents/ScrollDownListUsers";
import { useGlobalContext } from "../utils/globalContext";

export default function Dashboard(): ReactElement {
  const { data: allItemsArray, isLoading: isLoadingItems }: TApiResponse =
    useApiGet(`${process.env.REACT_APP_PRODUCT_API_ROUTE}`);

  const { data: allCartsArray, isLoading: isLoadingCars }: TApiResponse =
    useApiGet(`${process.env.REACT_APP_CARRITO_API_ROUTE}`);

  const { data: allUsersArray, isLoading: isLoadingUsers }: TApiResponse =
    useApiGet(`${process.env.REACT_APP_ALL_USERS}`);

  const overallSquares = [
    {
      icon: <FiPackage className="h-6 w-6" />,
      title: "Items Únicos",
      quantity: isLoadingItems ? 0 : numberWithCommas(allItemsArray.length),
      primary: "text-blue-600",
      secondary: "bg-blue-100"
    },
    {
      icon: <FiArchive className="h-6 w-6" />,
      title: "Botellas en Stock",
      quantity: isLoadingItems ? 0 : allItemsInStock(allItemsArray),
      primary: "text-green-600",
      secondary: "bg-green-100"
    },
    {
      icon: <FiShoppingCart className="h-6 w-6" />,
      title: "Carritos (activos)",
      quantity: isLoadingCars ? 0 : numberWithCommas(allCartsArray.length),
      primary: "text-purple-600",
      secondary: "bg-purple-100"
    },
    {
      icon: <FiTrendingUp className="h-6 w-6" />,
      title: "Botellas Vendidas Este año",
      quantity: isLoadingItems ? 0 : allItemsSoldYearly(allItemsArray),
      primary: "text-cyan-600",
      secondary: "bg-cyan-100"
    }
  ];

  const { userInfo } = useGlobalContext();
  return (
    <>
      <main className="p-6 sm:p-10 space-y-6">
        {userInfo ? (
          <h1 className="text-4xl text-center mt-10 font-bold pb-2 border-b-2 w-1/2 mx-auto">
            Bienvenido {userInfo.userName} !
          </h1>
        ) : null}
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2">Agave Dashboard</h1>
            <h2 className="text-gray-600 ml-0.5">
              {" "}
              Herramienta de administrador
            </h2>
          </div>
        </div>
        {isLoadingItems ? (
          <div className="w-full h-[600px] flex items-center justify-center">
            <RotatingLines
              strokeColor="gray"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </div>
        ) : (
          <>
            <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {overallSquares.map((item) => {
                return (
                  <OverallCard
                    primary={item.primary}
                    secondary={item.secondary}
                    quantity={item.quantity}
                    icon={item.icon}
                    title={item.title}
                    key={item.title}
                  />
                );
              })}
            </section>
            <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
              <BigChartContainer allItemsArray={allItemsArray} />
              {isLoadingUsers ? (
                <>Loading...</>
              ) : (
                <>
                  <OverallCard
                    primary={"text-yellow-600"}
                    secondary={"bg-yellow-100"}
                    quantity={allUsersArray.length}
                    icon={<FiUser className="w-6 h-6" />}
                    title={"Usuarios"}
                    key={"usuarios"}
                  />
                  <OverallCard
                    primary={"text-yellow-600"}
                    secondary={"bg-yellow-100"}
                    quantity={findAllAdmins(allUsersArray)}
                    icon={<FiUserPlus className="w-6 h-6" />}
                    title={"Admins"}
                    key={"admins"}
                  />
                </>
              )}

              {isLoadingItems ? (
                <div className="w-full h-[600px] flex items-center justify-center">
                  <RotatingLines
                    strokeColor="gray"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                  />
                </div>
              ) : (
                <>
                  <ScrollDownList dataArray={allItemsArray} />
                  <ScrollDownListUsers dataArray={allUsersArray} />
                </>
              )}
            </section>
          </>
        )}
      </main>
    </>
  );
}
