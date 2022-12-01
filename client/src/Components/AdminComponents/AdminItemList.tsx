import React, { ReactElement } from "react";
import { itemType } from "../../utils/adminUtils";
import ItemCard from "./ItemCard";

export default function AdminItemList({ allItemsArray }: any): ReactElement {
  return (
    <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg w-full">
      <div className="px-6 py-5 font-semibold border-b border-gray-100">
        Items en invetario
      </div>
      <div className="p-4 flex-grow">
        <div className="flex items-center justify-center h-full px-4">
          <div className="w-full rounded-lg flex flex-wrap justify-around py-5 gap-5">
            {allItemsArray.map((item: itemType) => {
              return <ItemCard item={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
