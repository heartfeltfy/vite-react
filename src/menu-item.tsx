import { ReactNode, useMemo } from "react";
import { TbDeviceHeartMonitor } from "react-icons/tb";
import { FaSolarPanel } from "react-icons/fa";
import { useAppSelector } from "@/store/store-hook";

export interface MenuItem {
  label: string;
  url?: string;
  icon?: ReactNode;
  children?: MenuItem[];
  auth?: string; //权限
}

// 路由列表
const MENU_LISTS: MenuItem[] = [
  {
    label: "控制面板",
    icon: <FaSolarPanel />,
    auth: "penal",
    children: [
      {
        label: "电源面板",
        url: "/",
        auth: "power-penal"
        // url: "/power-panel"
      }
    ]
  },
  {
    label: "设备管理",
    icon: <TbDeviceHeartMonitor />,
    auth: "device",
    children: [
      {
        label: "电源开关",
        auth: "power-switch",
        url: "/power-switch"
      }
    ]
  },
  {
    label: "法庭管理",
    url: "/court",
    icon: <TbDeviceHeartMonitor />
  },
  {
    label: "系统管理",
    auth: "system",
    icon: <TbDeviceHeartMonitor />,
    children: [
      {
        label: "用户管理",
        auth: "user",
        url: "/user"
      },
      {
        label: "角色管理",
        auth: "role",
        url: "/role"
      }
    ]
  },
  {
    label: "日志管理",
    auth: "log",
    url: "/log",
    icon: <TbDeviceHeartMonitor />
  }
];

export const useAuthMenu = () => {
  const authorities = JSON.stringify(useAppSelector((state) => state.auth.authorities) || []);

  return useMemo(() => {
    return getAuthMenu(MENU_LISTS);

    function getAuthMenu(menus: MenuItem[]) {
      const filterMenus: MenuItem[] = [];

      for (const menu of menus) {
        // 此菜单所有人可见或者是当前角色拥有
        if (!menu.auth || JSON.parse(authorities).indexOf(menu.auth) !== -1) {
          filterMenus.push(menu);
          continue;
        }

        // 次级菜单循环
        if (menu.children && menu.children.length > 0) {
          const submenu = getAuthMenu(menu.children);

          if (submenu.length > 0) {
            filterMenus.push({ ...menu, children: submenu });
          }
        }
      }
      return filterMenus;
    }
  }, [authorities]);
};
