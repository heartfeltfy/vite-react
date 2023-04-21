import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
// react-redux  仓库
import { store } from "./store";

// 引入css样式
import "antd/dist/reset.css";
import "./index.css";
import "./styles/flex.scss";

import "dayjs/locale/zh-cn";
import locale from "antd/locale/zh_CN";
import { ConfigProvider } from "antd";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import App from "./App";

NProgress.configure({ showSpinner: false });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={locale}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
