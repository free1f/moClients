import { createContext, ReactNode, useContext } from "react";
import useMainState, { MainState, GlobalAction } from "./useMainState";

export const { Provider, Consumer } = createContext({});

type GlobalProviderProps = { children: ReactNode };

export const GlobalContext = createContext<
  | {
      globalState: MainState;
      dispatchGlobal: (action: GlobalAction) => void;
    }
  | undefined
>(undefined);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [globalState, dispatchGlobal] = useMainState();
  const value = { globalState, dispatchGlobal };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
