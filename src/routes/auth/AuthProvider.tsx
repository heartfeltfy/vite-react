import { ReactNode } from "react";
import { useAppSelector } from "@/store-hooks";
import { Navigate, useLocation } from "react-router-dom";
import { getStorage } from "./auth-slice";
import SkeletonLoading from "@/components/loading/SkeletonLoading";

// 鉴权组件
export default function AuthProvider({
  children,
  authority
}: {
  children: ReactNode;
  authority: string;
}) {
  const getUserInfo = getStorage();

  const accessToken = getUserInfo && getUserInfo.accessToken;

  const userInfo = useAppSelector(state => state.auth.accessToken) || accessToken;

  const location = useLocation();

  // 未登录返回登录页面
  if (!userInfo) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <SkeletonLoading>{children}</SkeletonLoading>;
}
