import { useState, useEffect } from "react";
import axios from "axios";
//se planea usar fetch para que el app pueda funcionar en todos los browsers y tambien obtener el URL

export type TApiResponse = {
  data: any;
  isLoading: Boolean;
};

export const useApiGet = (url: string): TApiResponse => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data: response } = await axios.get(url);
        setData(response);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, isLoading };
};
