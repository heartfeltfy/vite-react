import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/store/store.ts";

import App from "./App.tsx";

import AndDesign from "./AntDesign.tsx";

import "./index.scss";
import "./nprogress.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AndDesign>
        <App />
      </AndDesign>
    </Provider>
  </React.StrictMode>
);
