import React from "react";
import { useCart } from "react-use-cart";

type Props = {
  itemData: any;
};

export default function ItemInCart({ itemData }: Props) {
  //cart hook
  const { updateItemQuantity, removeItem } = useCart();

  const handleIncremenetCount = () => {
    if (itemData.quantity < itemData.stock) {
      updateItemQuantity(itemData.id, itemData.quantity + 1);
    } else return;
  };

  const handleDecremenetQuantity = () => {
    if (itemData.quantity > 1) {
      updateItemQuantity(itemData.id, itemData.quantity - 1);
    } else return;
  };
  return (
    <li className="py-6 flex space-x-6">
      <img
        src={itemData.foto}
        alt="Front of women&#039;s basic tee in heather gray."
        className="flex-none w-24 h-24 object-center object-cover bg-gray-100 rounded-md"
      />
      <div className="flex-auto">
        <div className="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6">
          <div className="flex-auto text-sm font-medium space-y-1">
            <h3 className="text-gray-900">
              <a href="/">Mezcal {itemData.nombre}</a>
            </h3>
            <p className="text-gray-900">${itemData.price}.00 MXN</p>
            <p className="hidden text-gray-500 sm:block">{itemData.region}</p>
            <p className="hidden text-gray-500 sm:block">{itemData.type}</p>
          </div>
          <div className="flex-none flex space-x-4 items-center">
            <button
              className="text-indigo-600 font-bold"
              onClick={() => handleIncremenetCount()}
            >
              {" "}
              +{" "}
            </button>
            <p className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              {itemData.quantity}
            </p>
            <button
              className="text-indigo-600 font-bold text-lg"
              onClick={() => handleDecremenetQuantity()}
            >
              {" "}
              -{" "}
            </button>

            <div className="flex border-l border-gray-300 pl-4">
              <button
                onClick={() => removeItem(itemData.id)}
                type="button"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
