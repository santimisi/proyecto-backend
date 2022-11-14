import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction
} from "react";

export interface GlobalStateInterface {
  userName: string;
  password: string;
}

const GlobalStateContext = createContext({
  user: {} as Partial<GlobalStateInterface>,
  setUser: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>
});

const GlobalStateProvider = ({
  children,
  value = {} as GlobalStateInterface
}: {
  children: React.ReactNode;
  value?: Partial<GlobalStateInterface>;
}) => {
  const [user, setUser] = useState(value);
  return (
    <GlobalStateContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateContext");
  }
  return context;
};

export { GlobalStateProvider, useGlobalState };
