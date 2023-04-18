import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/views/ErrorPage";
import App from "@/App";
import Login from "./auth/Login";
import Goods from "@/views/goods/Goods";
import AuthProvider from "@/routes/auth/AuthProvider";
import Layout from "./layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      // 默认路由  在此表示   父级路由应该渲染的组件
      { index: true, element: <Layout /> },
      { path: "goods", element: <Goods /> }
    ]
  },
  // 登录组件
  {
    path: "/login",
    element: <Login />
  }
]);
