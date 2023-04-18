import "./App.css";
// 引入react-router-dom
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/views/ErrorPage";
import Goods from "@/views/goods/Goods";
import Login from "./routes/auth/Login";
import Root from "@/routes/Root";
import Layout from "@/routes/Layout";
import Home from "./views/home/Home";

export const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          { path: "goods", element: <Goods /> }
        ]
      }
    ]
  },
  // 登录组件
  {
    path: "/login",
    element: <Login />
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
