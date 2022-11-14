import React, { useState, useEffect } from "react";
import axios from "axios";
import Chat from "../Components/Chat";
import ProductList from "../Components/ProductList";
// import useFetchUserSession from "../Utils/useFetchUserSession";

export default function Home() {
  const [user, setUser] = useState<any>({});
  const [userLoading, setUserLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLooggedUser = async () => {
      setUserLoading(true);
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_CHEKAUTH_URL}`,
          {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
          }
        );
        setUser(response.userName);
        setUserLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchLooggedUser();
  }, []);

  return (
    <>
      {userLoading ? (
        <div className="w-full border-b-2 font-bold text-3xl flex items-center justify-center py-10 text-white">
          Loading...
        </div>
      ) : (
        <h1 className="w-full border-b-2 font-bold text-3xl flex items-center justify-center py-10 text-white">
          {" "}
          Hola! {user}
        </h1>
      )}
      <section className="p-4 flex justify-center">
        <ProductList />
      </section>
      <section className="p-4 flex justify-center">
        <Chat />
      </section>
    </>
  );
}
