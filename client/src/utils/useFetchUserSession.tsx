import axios from "axios";
import { useEffect, useState } from "react";

export type TApiResponse = {
  data: any;
  isLoading: Boolean;
};

export default function useFetchUserSession(urlToBeFetched: string) {
  const [data, setData] = useState<TApiResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchRandomItems = async () => {
      setIsLoading(true);
      try {
        const { data: response } = await axios.get(urlToBeFetched);
        console.log(response);
        setData(response);
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    };
    fetchRandomItems();
  }, [urlToBeFetched]);
  return { data, isLoading };
}
