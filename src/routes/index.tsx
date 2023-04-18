import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/pages/ErrorPage";
import App from "@/App";
import Login from "./auth/Login";
import Goods from "@/pages/goods/Goods";
import AuthProvider from "@/routes/auth/AuthProvider";
import Layout from "./layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // 默认路由  在此表示   父级路由应该渲染的组件
      {
        index: true,
        element: (
          <AuthProvider>
            <Layout />
          </AuthProvider>
        ),
      },
      {
        path: "goods",
        element: (
          <AuthProvider>
            <Goods />
          </AuthProvider>
        ),
      },
    ],
  },
  // 登录组件
  { path: "/login", element: <Login /> },
]);
