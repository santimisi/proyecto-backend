import React from "react";
import { formatDate } from "../../utils/adminUtils";
import { TApiResponse, useApiGet } from "../../utils/fetchProducts";

export default function AllLogs() {
  const { data: activityLogs, isLoading: isLoadingLogs }: TApiResponse =
    useApiGet(`${process.env.REACT_APP_GET_ALL_LOGS}`);
  console.log();
  return (
    <>
      <div className="px-6 py-5 font-semibold border-b border-gray-200 text-3xl text-center mb-4">
        Registro de Movimientos
      </div>
      <div className="overflow-x-auto relative sm:rounded-lg p-5">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="py-3 px-6">
                Título
              </th>
              <th scope="col" className="py-3 px-6">
                Descripción
              </th>
              <th scope="col" className="py-3 px-6">
                Timestamp
              </th>
              <th scope="col" className="py-3 px-6">
                Url
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoadingLogs ? (
              <tr>
                <td>Loading</td>
              </tr>
            ) : (
              <>
                {activityLogs.map((log: any) => {
                  return (
                    <tr className="bg-white border-b" key={log._id}>
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {log.title}:
                      </th>
                      <td className="py-4 px-6">{log.descripcion}</td>
                      <td className="py-4 px-6">{formatDate(log.timestamp)}</td>
                      <td className="py-4 px-6">
                        <a
                          href={`/${log.url}`}
                          className="text-blue-500 underline "
                        >
                          Click Here
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
