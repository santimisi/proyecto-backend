import React, { ReactElement } from "react";
interface ItemListProps {
  id: string;
  title: string;
  thumbnail: string;
  price: string;
}

export default function ItemList({
  id,
  title,
  thumbnail,
  price
}: ItemListProps): ReactElement {
  return (
    <tr className="whitespace-nowrap">
      <td className="px-6 py-4 text-sm text-gray-500">{id}</td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">{title}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-500">
          <img src={thumbnail} alt="not found" width={40} height={40} />
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">${price}</td>
    </tr>
  );
}
