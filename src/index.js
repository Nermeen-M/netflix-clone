import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ModalProvider } from "./state/ModalContext";
import { UserProvider } from "./state/UserContext";
import { ItemsProvider } from "./state/ItemsContext";
import { EpisodesProvider } from "./state/EpisodesContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ModalProvider>
      <UserProvider storageKey="user-uid">
        <ItemsProvider>
          <EpisodesProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </EpisodesProvider>
        </ItemsProvider>
      </UserProvider>
    </ModalProvider>
  </React.StrictMode>
);
