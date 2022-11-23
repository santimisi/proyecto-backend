import React, { ReactNode } from "react";

type Props = {
  primary: string;
  secondary: string;
  icon: ReactNode;
  quantity: number | string;
  title: string;
};

export default function OverallCard({
  primary,
  secondary,
  icon,
  quantity,
  title
}: Props) {
  return (
    <div className="flex items-center p-8 bg-white shadow rounded-lg">
      <div
        className={`inline-flex flex-shrink-0 items-center justify-center h-16 w-16 ${primary} ${secondary} rounded-full mr-6`}
      >
        {icon}
      </div>
      <div>
        <span className="block text-2xl font-bold">{quantity}</span>
        <span className="block text-gray-500">{title}</span>
      </div>
    </div>
  );
}
