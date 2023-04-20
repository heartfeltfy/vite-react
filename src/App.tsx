import "./App.css";
// 引入react-router-dom
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/views/ErrorPage";
import Root from "@/routes/Root";
import LayoutView from "@/routes/LayoutView";
import Home from "./views/home/Home";
import AuthProvider from "./routes/auth/AuthProvider";
import { ReactNode, lazy } from "react";
import { HomeOutlined, OrderedListOutlined } from "@ant-design/icons";
import { GlobalLoading } from "./components";

const Login = lazy(() => import("./routes/auth/Login"));
const User = lazy(() => import("./views/system/user/Users"));
const Roles = lazy(() => import("./views/system/role/Roles"));
const AddNewUsers = lazy(() => import("./views/system/user/AddNewUsers"));

export interface MenuItem {
  label: string;
  url?: string;
  icon?: ReactNode;
  children?: MenuItem[];
  auth?: string;
}
// 路由列表
export const MENU_LISTS: MenuItem[] = [
  {
    label: "首页",
    url: "/",
    icon: <HomeOutlined />
  },
  {
    label: "系统设置",
    icon: <OrderedListOutlined />,
    auth: "setting",
    children: [
      {
        label: "用户管理",
        icon: <OrderedListOutlined />,
        auth: "user",
        url: "/user"
      },
      {
        label: "角色管理",
        icon: <OrderedListOutlined />,
        auth: "role",
        url: "/role"
      }
    ]
  }
];

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
            path: "user",
            element: (
              <AuthProvider>
                <User />
              </AuthProvider>
            )
          },
          {
            path: "user/add",
            element: (
              <AuthProvider>
                <AddNewUsers />
              </AuthProvider>
            )
          },
          {
            path: "role",
            element: (
              <AuthProvider>
                <Roles />
              </AuthProvider>
            )
          }
        ]
      },
      // 登录组件
      {
        path: "/login",
        element: (
          <GlobalLoading>
            <Login />
          </GlobalLoading>
        )
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
