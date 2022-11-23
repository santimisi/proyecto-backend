import React, { ReactElement } from "react";
import { RotatingLines } from "react-loader-spinner";
import { TApiResponse, useApiGet } from "../../utils/fetchProducts";
import AddItemModal from "./AddItemModal";
import AdminItemList from "./AdminItemList";

export default function AllItemsAdmin(): ReactElement {
  const { data: allItemsArray, isLoading: isLoadingItems }: TApiResponse =
    useApiGet(`${process.env.REACT_APP_PRODUCT_API_ROUTE}`);
  return (
    <>
      <section className="flex gap-6 p-5 w-full">
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
          <AdminItemList
            allItemsArray={allItemsArray}
            isLoading={isLoadingItems}
          />
        )}
      </section>
      <AddItemModal title={"Agregar un Item a Inventario"} />
    </>
  );
}
