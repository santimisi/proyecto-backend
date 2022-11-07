import React, { ReactElement, useState, useEffect } from "react";
import { itemType, sortArrayDesAsc } from "../../utils/adminUtils";

export default function ScrollDownList({ allItemsArray }: any): ReactElement {
  const [items, setItems] = useState<itemType[]>(allItemsArray);

  useEffect(() => {
    setItems(sortArrayDesAsc(allItemsArray, "0"));
  }, [allItemsArray]);

  const onSelectionChange = (event: React.FormEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const sortDirection = event.currentTarget.value;
    setItems(sortArrayDesAsc(allItemsArray, sortDirection));
  };
  return (
    <div className="row-span-3 bg-white shadow rounded-lg">
      <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
        <span>Stock de Items Únicos</span>
        <select
          defaultValue={0}
          onChange={onSelectionChange}
          className="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600"
        >
          <option value={0}>Descending</option>
          <option value={1}>Ascending</option>
        </select>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
        <ul className="p-6 space-y-6">
          {items.map((item: itemType) => {
            return (
              <li className="flex items-center" key={item._id}>
                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img src={item.foto} alt="Not Found" />
                </div>
                <span className="text-gray-600">{item.nombre}</span>
                <span className="ml-auto font-semibold">{item.stock}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
