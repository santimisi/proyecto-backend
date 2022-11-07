import { createContext, useContext } from "react";

//global state para manejar el tipo de usuario ---
export type GlobalContent = {
  userInfo: any;
  setUserInfo: (user: any) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  userInfo: {},
  setUserInfo: () => {}
});
export const useGlobalContext = () => useContext(MyGlobalContext);
