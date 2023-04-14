import { createContext, useContext, useState } from "react";

const Context = createContext();

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const value = { modal, setModal };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useModal() {
  const context = useContext(Context);

  if (!context)
    throw new Error("To use the Modal context import it on index.js");

  return context;
}
