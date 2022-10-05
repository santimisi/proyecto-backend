import { createContext, useContext } from "react";

//global state para manejar el tipo de usuario ---
export type GlobalContent = {
  userTypeState: string;
  setUserTypeState: (c: string) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  userTypeState: "", // set a default value
  setUserTypeState: () => {}
});
export const useGlobalContext = () => useContext(MyGlobalContext);
