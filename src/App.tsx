import "./App.css";
// 引入react-router-dom
import { RouteObject, RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/views/ErrorPage";
import Root from "@/routes/Root";
import LayoutView from "@/routes/LayoutView";
import Home from "./views/home/Home";
import AuthProvider from "./routes/auth/AuthProvider";
import { ReactNode, lazy, useMemo } from "react";
import { HomeOutlined, OrderedListOutlined, EditOutlined } from "@ant-design/icons";
import { GlobalLoading } from "./components";
import { useAppSelector } from "./store-hooks";

const Login = lazy(() => import("./routes/auth/Login"));
const User = lazy(() => import("./views/system/user/Users"));
const Roles = lazy(() => import("./views/system/role/Roles"));
const AddNewUsers = lazy(() => import("./views/system/user/AddUserForm"));
const Posts = lazy(() => import("./views/posts/Posts"));

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
    label: "文章管理",
    url: "/posts",
    auth: "posts",
    icon: <EditOutlined />
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
export interface UserAuthType {
  auth: string;
  children?: UserAuthType[];
}

// 全部权限列表
export const userAuth: UserAuthType[] = [
  { auth: "posts" },
  {
    auth: "setting",
    children: [
      {
        auth: "user",
        children: [{ auth: "post_add" }]
      },
      { auth: "role" }
    ]
  }
];

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <LayoutView />,
        children: [
          { index: true, element: <Home /> },
          {
            path: "posts",
            element: (
              <AuthProvider authority="posts">
                <Posts />
              </AuthProvider>
            )
          },
          {
            path: "user",
            element: (
              <AuthProvider authority="user">
                <User />
              </AuthProvider>
            )
          },
          {
            path: "user/add",
            element: (
              <AuthProvider authority="post_add">
                <AddNewUsers />
              </AuthProvider>
            )
          },
          {
            path: "role",
            element: (
              <AuthProvider authority="role">
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
];

export const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}

export const useAuthMenus = () => {
  const authorities = useAppSelector(state => state.auth.authorities) || [];

  function getAuthMenus(menus: MenuItem[]) {
    const filterMenus: MenuItem[] = [];

    for (const menu of menus) {
      // 此菜单所有人可见，或者是当前角色拥有
      if (!menu.auth || authorities.indexOf(menu.auth) !== -1) {
        filterMenus.push(menu);
        continue;
      }

      // 递归遍历其子菜单
      if (menu.children && menu.children.length > 0) {
        const submenu = getAuthMenus(menu.children);

        if (submenu.length > 0) {
          filterMenus.push({ ...menu, children: submenu });
        }
      }
    }
    return filterMenus;
  }

  return useMemo(() => {
    return getAuthMenus(MENU_LISTS);
  }, [JSON.stringify(authorities)]);
};
