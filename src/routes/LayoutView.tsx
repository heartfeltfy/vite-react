import { Key, ReactNode, useEffect, useMemo, useState } from "react";
import { FooterView, HeaderView } from "@/components";
import { Layout, Menu, MenuProps } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./layout.module.scss";
import { MenuItem, useAuthMenu } from "@/menu-item";

export default function LayoutView() {
  const menus = useAuthMenu();

  return (
    <Layout className={styles.layout}>
      <HeaderView />
      <Layout className={styles.layout__main} hasSider>
        <Layout.Sider width={200 + 8 * 6} collapsedWidth={8 * 8} className={styles.section__sider}>
          <LayoutMenu menus={menus} />
        </Layout.Sider>
        <Layout className={styles.section__section}>
          <Layout.Content
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              overflowY: "auto"
            }}
          >
            <Outlet />
          </Layout.Content>
          <FooterView />
        </Layout>
      </Layout>
    </Layout>
  );
}
/**
 *
 * @param 处理权限过后的菜单列表
 * @returns 完全体的菜单列表
 */
function LayoutMenu({ menus }: { menus: MenuItem[] }) {
  const selectedKeys = useDefaultMenuPath(menus);
  const { openKeys, setOpenKeys } = useOpenKeys(selectedKeys);

  const items = useRouteMenu(menus);
  // 默认展开一个
  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    setOpenKeys(keys);
    // const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    // if (items.map((v) => v.label).indexOf(latestOpenKey!) === -1) {
    //   setOpenKeys(keys);
    // } else {
    //   setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    // }
  };
  return (
    <>
      <Menu
        items={items}
        style={{ height: "100%" }}
        mode="inline"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={onOpenChange}
      />
    </>
  );
}

interface ItemType {
  label: string | ReactNode;
  icon: ReactNode;
  key?: Key;
  children?: ItemType[];
}

// 处理路由菜单
function useRouteMenu(menus: MenuItem[]) {
  return useMemo(() => {
    return menus.map((route) => {
      // 如果存在url
      if (route.url) {
        return {
          label: <Link to={route.url}>{route.label}</Link>,
          key: route.url,
          icon: route.icon
        };
      }

      // 处理多级菜单
      if (route.children && route.children.length > 0) {
        const submenus = handleMenu(route.children);
        return {
          label: route.label,
          key: route.label,
          icon: route.icon,
          children: submenus
        };
      }
      return {
        label: route.label,
        key: route.label,
        icon: route.icon
      };
    });
    function handleMenu(menus: MenuItem[]): ItemType[] {
      return menus.map((route) => {
        if (route.children && route.children.length > 0) {
          return {
            label: <Link to={route.url!}>{route.label}</Link>,
            key: route.url,
            icon: route.icon,
            children: handleMenu(route.children)
          };
        }
        return {
          label: <Link to={route.url!}>{route.label}</Link>,
          key: route.url,
          icon: route.icon
        };
      });
    }
  }, [menus]);
}

/**
 * 处理菜单默认选中
 */

function useDefaultMenuPath(menus: MenuItem[]) {
  const { pathname } = useLocation();

  return useMemo(() => {
    return getSelectKeys(menus);

    function getSelectKeys(menus: MenuItem[]) {
      const selectedKeys: string[] = [];

      for (const menu of menus) {
        if (menu.url && menu.url === pathname) {
          selectedKeys.push(menu.url);
          continue;
        }

        if (menu.children && menu.children.length > 0) {
          const subSelectedKeys = getSelectKeys(menu.children);

          if (subSelectedKeys.length > 0) {
            selectedKeys.push(menu.label, ...subSelectedKeys);
          }
        }
      }

      return selectedKeys;
    }
  }, [menus, pathname]);
}

/**
 * 处理默认展开菜单
 */
function useOpenKeys(selectedKeys: string[]) {
  const [openKeys, setOpenKeys] = useState(selectedKeys);

  useEffect(() => {
    setOpenKeys((prev) => {
      if (prev.length < selectedKeys.length) {
        return selectedKeys;
      }
      return prev;
    });
  }, [selectedKeys]);

  return { openKeys, setOpenKeys };
}
