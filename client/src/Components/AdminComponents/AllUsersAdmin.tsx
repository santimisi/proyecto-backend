import React from "react";
import { FiUser } from "react-icons/fi";
import BigChartContainer from "./BigChartContainer";
import OverallCard from "./OverallCard";
import SmallChartContainer from "./SmallChartContainer";

export default function AllUsersAdmin() {
  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6 p-5">
      <OverallCard
        primary={"text-green-600"}
        secondary={"bg-green-100"}
        quantity={250}
        icon={<FiUser className="w-6 h-6" />}
        title={"Usuarios"}
        key={"usuarios1"}
      />
      <OverallCard
        primary={"text-purple-600"}
        secondary={"bg-purple-100"}
        quantity={250}
        icon={<FiUser className="w-6 h-6" />}
        title={"Usuarios"}
        key={"usuarios2"}
      />
      <OverallCard
        primary={"text-blue-600"}
        secondary={"bg-blue-100"}
        quantity={250}
        icon={<FiUser className="w-6 h-6" />}
        title={"Usuarios"}
        key={"usuarios3"}
      />

      <SmallChartContainer />
      <OverallCard
        primary={"text-red-600"}
        secondary={"bg-red-100"}
        quantity={250}
        icon={<FiUser className="w-6 h-6" />}
        title={"Usuarios"}
        key={"usuarios12"}
      />

      <BigChartContainer />
    </section>
  );
}
