import React from "react";
// import { IoIosCart } from "react-icons/io";
import { RotatingLines } from "react-loader-spinner";
import { cartType } from "../../utils/adminUtils";

import { TApiResponse, useApiGet } from "../../utils/fetchProducts";
// import OverallCard from "./OverallCard";
import SmallChartContainer from "./SmallChartContainer";

export default function AllCartsAdmin() {
  // fetch al api para traer todos los carritos
  const { data: allCartsArray, isLoading: isLoadingCars }: TApiResponse =
    useApiGet(`${process.env.REACT_APP_CARRITO_API_ROUTE}`);
  return (
    <>
      <div className="px-6 py-5 font-semibold border-b border-gray-200 text-3xl text-center mb-4">
        Ordenes Existentes
      </div>
      <section className="px-5">
        {isLoadingCars ? (
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
            {/* <div className="flex w-full md:flex-row justify-around flex-col gap-5 border-b-2 border-gray-200 pb-10">
            <OverallCard
              primary={"text-yellow-600"}
              secondary={"bg-yellow-100"}
              quantity={allCartsArray.length}
              icon={<IoIosCart className="w-6 h-6" />}
              title={"Ordenes Activas"}
              key={"carritos"}
              />
              <OverallCard
              primary={"text-yellow-600"}
              secondary={"bg-yellow-100"}
              quantity={1}
              icon={<IoIosCart className="w-6 h-6" />}
              title={"Carritos en espera"}
              key={"carritos-espera"}
              />
            </div> */}
            <div className="p-10 flex flex-wrap justify-evenly gap-5">
              {allCartsArray.map((item: cartType) => {
                return <SmallChartContainer item={item} key={item._id} />;
              })}
            </div>
          </>
        )}
      </section>
    </>
  );
}
