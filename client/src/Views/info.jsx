import React, { useEffect, useState } from "react";
import axios from "axios";

function Info() {

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const { data: response } = await axios.get(
            "http://localhost:8000/api/info"
          );
          setData(response);
          console.log(data);
        } catch (e) {
          console.error(e);
        }
        setIsLoading(false);
      };
      fetchData();
    }, []);
  
    console.log(data);
  
    return (
      <div>
        <h1> Info</h1>
        {isLoading ? (
          <> Loading...</>
        ) : (
          <div>
            <ul>
              <li>
                Argumentos de entrada por CLI{" "}
                {JSON.stringify(data.data.arguments)}
              </li>
              <li>
                {" "}
                Nombre de Plataforma (Sistema Operativo): {data.data.system}{" "}
              </li>
              <li> Version de Node: {data.data.version} </li>
              <li> Memoria Total: {data.data.memory.rss} </li>
              <li> Path de Ejecucion: {data.data.title}</li>
              <li> Id de proceso: {data.data.process} </li>
              <li> Carpeta del proyecto: {data.data.location} </li>
              <li> Número de CPU's: {data.data.numCPUs} </li>
            </ul>
          </div>
        )}
      </div>
    );
}

export default Info;