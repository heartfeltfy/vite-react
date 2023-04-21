import React, { Suspense } from "react";
import { useAppSelector } from "@/store-hooks";
import { Navigate, useLocation } from "react-router-dom";
import { getStorage } from "./auth-slice";
import SkeletonLoading from "@/components/loading/SkeletonLoading";

// 鉴权组件
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const getUserInfo = getStorage();

  const username = getUserInfo && getUserInfo.username;

  const userinfo = useAppSelector(state => state.auth.username) || username;

  const location = useLocation();

  if (!userinfo) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <SkeletonLoading>{children}</SkeletonLoading>;
}
