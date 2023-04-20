import "./App.css";
// 引入react-router-dom
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/views/ErrorPage";
import Goods from "@/views/goods/Goods";
import Root from "@/routes/Root";
import LayoutView from "@/routes/LayoutView";
import Home from "./views/home/Home";
import AuthProvider from "./routes/auth/AuthProvider";
import { lazy } from "react";

const Login = lazy(() => import("./routes/auth/Login"));

export const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <LayoutView />,
        children: [
          { path: "/", element: <Home /> },
          {
            path: "goods",
            element: (
              <AuthProvider>
                <Goods />
              </AuthProvider>
            )
          }
        ]
      },
      // 登录组件
      { path: "/login", element: <Login /> }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
