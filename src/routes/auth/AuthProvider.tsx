import { ReactNode } from "react";
import { useAppSelector } from "@/store-hooks";
import { Navigate, useLocation } from "react-router-dom";
import { getStorage } from "./auth-slice";
import SkeletonLoading from "@/components/loading/SkeletonLoading";
import { UserAuthType, userAuth } from "@/App";
import RouterError from "@/views/error/RouterError";

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

  if (!hasAuthority(userAuth, authority)) {
    return <RouterError code={403} />;
  }
  return <SkeletonLoading>{children}</SkeletonLoading>;
}

// 判断界面当前用户是否有权限访问
function hasAuthority(menus: UserAuthType[], authority: string): boolean {
  for (const menu of menus) {
    if (menu.auth === authority) return true;

    if (menu.children && menu.children.length > 0) {
      return hasAuthority(menu.children, authority);
    }
  }
  return false;
}
