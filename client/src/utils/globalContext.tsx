import { createContext, useContext } from "react";

//global state para manejar el tipo de usuario ---
export type GlobalContent = {
  userInfo: any;
  setUserInfo: (user: any) => void;
  loadingUserInfo: boolean;
};
export const MyGlobalContext = createContext<GlobalContent>({
  userInfo: {},
  setUserInfo: () => {},
  loadingUserInfo: false
});
export const useGlobalContext = () => useContext(MyGlobalContext);
