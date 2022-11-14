import React from "react";
import useGetItems from "../Utils/useGetItems";
import ItemList from "./ItemList";
import { TApiResponse } from "../Utils/useGetItems";
import { ClipLoader } from "react-spinners";

export interface ItemTypes {
  id: string;
  price: string;
  thumbnail: string;
  title: string;
}

export default function ProductList() {
  const { allItems, isLoading }: TApiResponse = useGetItems(
    "http://localhost:8080/api/productos-test"
  );

  return (
    <div className="flex flex-col">
      <div className="container flex justify-center mx-auto">
        <div className="flex flex-col">
          <div className="w-full">
            <div className="border-b border-gray-200 shadow">
              <table className="divide-y divide-gray-300 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-xs text-gray-500">ID</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Nombre</th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Thumbanil
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">Precio</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {isLoading ? (
                    <tr>
                      <td>
                        {" "}
                        <div className="flex items-center justify-center h-full w-full">
                          {" "}
                          <ClipLoader
                            color="#4e59e9"
                            loading={true}
                            size={150}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {allItems.map((item: ItemTypes) => {
                        return (
                          <ItemList
                            key={item.id}
                            price={item.price}
                            thumbnail={item.thumbnail}
                            title={item.title}
                            id={item.id}
                          />
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
