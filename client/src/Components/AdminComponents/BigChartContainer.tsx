import React, { ReactElement } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function BigChartContainer({
  allItemsArray
}: any): ReactElement {
  return (
    <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
      <div className="px-6 py-5 font-semibold border-b border-gray-100">
        Grafica de ventas anuales
      </div>
      <div className="p-4 flex-grow">
        <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={allItemsArray}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />

              <XAxis dataKey="nombre" style={{ fontSize: "1rem" }} />
              <YAxis
                style={{
                  fontSize: ".8rem"
                }}
              />
              <Tooltip />
              <Line type="monotone" dataKey="sold" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
