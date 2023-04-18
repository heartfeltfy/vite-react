import React from "react";
import { useAppSelector } from "@/store-hooks";
import { Navigate, useLocation } from "react-router-dom";
import { getStorage } from "./authSlice";

// 鉴权组件
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const getUserInfo = getStorage();
  const userinfo = useAppSelector(state => state.auth.username) || (getUserInfo && getUserInfo.username);
  const location = useLocation();

  if (!userinfo) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
}
