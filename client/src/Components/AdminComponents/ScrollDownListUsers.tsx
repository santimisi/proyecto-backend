import React, { ReactElement, useState, useEffect } from "react";
import { Usertype } from "../../utils/adminUtils";

interface Props {
  dataArray: Usertype[];
}

export default function ScrollDownListUsers({
  dataArray
}: Props): ReactElement {
  const [users, setUsers] = useState<Usertype[]>(dataArray);
  // creo que esta de mas pero aun asi lo voy a dejar por si luego lo ocupo
  useEffect(() => {
    setUsers(dataArray);
  }, [dataArray]);

  return (
    <div className="row-span-3 bg-white shadow rounded-lg">
      <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
        <span>Usuarios</span>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
        <ul className="p-6 space-y-6">
          {users.map((user: Usertype) => {
            return (
              <li className="flex items-center" key={user._id}>
                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img src={user.profilePicture} alt="Not Found" />
                </div>
                <span className="text-gray-600">{user.userName}</span>
                <span className="ml-auto font-semibold">
                  isAdmin: {user.isAdmin ? "true" : "false"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
