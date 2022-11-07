import React from "react";
import { FiUser, FiUserPlus } from "react-icons/fi";
import BigChartContainer from "./BigChartContainer";
import OverallCard from "./OverallCard";
import SmallChartContainer from "./SmallChartContainer";

export default function AllCartsAdmin() {
  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6 p-5">
      <BigChartContainer />
      <OverallCard
        primary={"text-yellow-600"}
        secondary={"bg-yellow-100"}
        quantity={250}
        icon={<FiUser className="w-6 h-6" />}
        title={"Usuarios"}
        key={"usuarios"}
      />
      <OverallCard
        primary={"text-yellow-600"}
        secondary={"bg-yellow-100"}
        quantity={1}
        icon={<FiUserPlus className="w-6 h-6" />}
        title={"Admins"}
        key={"admins"}
      />
      <SmallChartContainer />
    </section>
  );
}
