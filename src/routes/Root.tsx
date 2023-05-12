import { Outlet } from "react-router-dom";
import { useAuthLogin, useAutoLogin, useAutoRefreshToken } from "./auth/use-auth";

export default function Root() {
  useAuthLogin();
  useAutoLogin();
  useAutoRefreshToken();
  return <Outlet />;
}
