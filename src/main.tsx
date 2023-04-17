import React from "react";
import ReactDOM from "react-dom/client";

// 引入react-router-dom
import { RouterProvider } from "react-router-dom";
// 路由列表
import { router } from "./routes";

import { Provider } from "react-redux";
// react-redux  仓库
import { store } from "./store";

// 引入css样式
import "antd/dist/reset.css";
import "./index.css";
import "./styles/flex.scss";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* 使用react-redux */}
    <Provider store={store}>
      {/* 使用react-router-dom */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
