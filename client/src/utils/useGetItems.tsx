import axios from "axios";
import { useEffect, useState } from "react";

export type TApiResponse = {
  allItems: any;
  isLoading: Boolean;
};

export default function useGetItems(urlToBeFetched: string) {
  const [allItems, setAllItems] = useState<Array<object>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchRandomItems = async () => {
      setIsLoading(true);
      try {
        const { data: response } = await axios.get(urlToBeFetched);
        setAllItems(response);
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    };
    fetchRandomItems();
  }, [urlToBeFetched]);
  return { allItems, isLoading };
}
