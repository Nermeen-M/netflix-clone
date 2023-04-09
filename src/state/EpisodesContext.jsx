import { createContext, useContext, useReducer } from "react";

import itemsReducer from "./itemsReducer";

const Context = createContext(null);

export function EpisodesProvider({ children }) {
  const [episodes, dispatch] = useReducer(itemsReducer, []);

  const value = { episodes, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useEpisodes() {
  const context = useContext(Context);
  const errorMessage = "To use the episodes context import it on index.js";

  if (!context) throw new Error(errorMessage);

  return context;
}
