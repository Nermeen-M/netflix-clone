import { createContext, useContext, useReducer } from "react";

import itemsReducer from "./itemsReducer";

const Context = createContext(null);

export function ItemsProvider({ children }) {
  const [items, dispatch] = useReducer(itemsReducer, []);

  const value = { items, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useItems() {
  const context = useContext(Context);
  const errorMessage = "To use the items context import it on index.js";

  if (!context) throw new Error(errorMessage);

  return context;
}
