import { createContext, useContext, useReducer } from "react";
import { appReducer, initialState } from "./appReducer";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppStore = () => useContext(AppContext);