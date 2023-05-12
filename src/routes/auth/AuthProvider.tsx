import { ReactNode } from "react";
import { useAppSelector } from "@/store/store-hook";
import { useLocation, Navigate } from "react-router-dom";
import { SuspenseLoading, RouterError } from "@/components";
import { MenuItem, useAuthMenu } from "@/menu-item";

export default function AuthProvider({ children, authority }: { children: ReactNode; authority?: string }) {
  const username = useAppSelector((state) => state.auth.username);
  const location = useLocation();
  const menus = useAuthMenu();

  // 若没有用户信息则返回登陆页面
  if (!username) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (authority && !hasAuthority(menus, authority)) {
    return <RouterError code={403} message="抱歉！您没有访问该页面的权限 :(" />;
  }

  // 否则放行
  return <SuspenseLoading>{children}</SuspenseLoading>;
}

/**
 * 判断当前角色有没有访问该页面的权限
 * @param menus 用户菜单
 * @param authroity 菜单拥有的权限
 * @returns boolean
 */

function hasAuthority(menus: MenuItem[], authroity: string): boolean {
  return (
    menus.filter((menu) => {
      if (menu.auth === authroity) return true;

      if (menu.children && menu.children.length > 0) {
        return hasAuthority(menu.children, authroity);
      }
    }).length !== 0
  );
}
