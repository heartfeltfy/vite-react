import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Navigate, useLocation } from "react-router-dom";

// 鉴权组件
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const userinfo = useAppSelector(state => state.user.username) || localStorage.getItem("username");
  let location = useLocation();

  if (!userinfo) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
