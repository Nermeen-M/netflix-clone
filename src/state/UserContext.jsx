import { createContext, useContext, useState } from "react";

const Context = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(loadUser("user-data"));

  const value = { user, setUser, saveUser };

  function loadUser(storagekey) {
    const stringData = localStorage.getItem(storagekey);
    const data = JSON.parse(stringData) || {};
    return data;
  }

  async function saveUser(user) {
    const key = "user-data";
    const data = JSON.stringify(user);
    localStorage.setItem(key, data);
  }

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useUser() {
  const context = useContext(Context);

  if (!context) throw new Error("useUser() must be used within <UserProvider>");

  return context;
}
