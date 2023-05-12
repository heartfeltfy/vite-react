import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./pages/error/ErrorPage";

import { SuspenseLoading, FullLoading } from "@/components";

import LayoutView from "./routes/LayoutView";
import AuthProvider from "./routes/auth/AuthProvider";

const Login = lazy(() => import("@/routes/auth/Login"));
const PowerPanel = lazy(() => import("@/pages/panel/power/PowerPanel"));
const PowerSwitch = lazy(() => import("@/pages/device/power/PowerSwitch"));
const Court = lazy(() => import("@/pages/court/Court"));
const User = lazy(() => import("@/pages/system/user/User"));
const Role = lazy(() => import("@/pages/system/role/Role"));
const Log = lazy(() => import("@/pages/log/Log"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: (
      <SuspenseLoading>
        <ErrorPage />
      </SuspenseLoading>
    ),
    children: [
      {
        path: "login",
        element: (
          <FullLoading>
            <Login />
          </FullLoading>
        )
      },
      {
        element: <LayoutView />,
        children: [
          {
            index: true,
            element: (
              <AuthProvider authority="power-penal">
                <PowerPanel />
              </AuthProvider>
            )
          },
          {
            path: "power-switch",
            element: (
              <AuthProvider authority="power-switch">
                <PowerSwitch />
              </AuthProvider>
            )
          },
          {
            path: "court",
            element: (
              <AuthProvider>
                <Court />
              </AuthProvider>
            )
          },
          {
            path: "user",
            element: (
              <AuthProvider>
                <User />
              </AuthProvider>
            )
          },
          {
            path: "role",
            element: (
              <AuthProvider>
                <Role />
              </AuthProvider>
            )
          },
          {
            path: "log",
            element: (
              <AuthProvider>
                <Log />
              </AuthProvider>
            )
          }
        ]
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
