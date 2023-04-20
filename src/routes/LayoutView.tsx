import { Breadcrumb, Button, Layout, Menu, MenuProps } from "antd";
import classes from "./LayoutView.module.scss";
import { Footer, Header } from "./index";
import { Dispatch, ReactNode, SetStateAction, useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { MenuItem, useAuthMenus } from "@/App";

const { Sider, Content } = Layout;

export default function LayoutView() {
  const [collapsed, setCollapsed] = useState(false);
  const menus = useAuthMenus();
  const items = useAuthMenusPath(menus);
  return (
    <Layout className={classes.layout_view}>
      <Header />
      <Layout className={classes.layout_section} hasSider>
        <Sider
          className={classes.sider}
          width={200 + 8 * 6}
          collapsedWidth={8 * 8}
          collapsed={collapsed}
        >
          <LayoutMenu menus={menus} />
        </Sider>
        <Layout className={classes.content}>
          <LayoutBreadcrumb paths={items} collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content style={{ backgroundColor: "#fff", padding: "20px" }}>
            <Outlet />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
}

// 面包屑组件

function LayoutBreadcrumb({
  collapsed,
  setCollapsed,
  paths
}: {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  paths: PathType[];
}) {
  const items = itemRender(paths);
  return (
    <div className="flex align-center" style={{ marginBottom: 20, gap: "1em" }}>
      <Button type="primary" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Breadcrumb items={items}></Breadcrumb>
    </div>
  );
}
interface PathType {
  title: string;
  url: string;
}

function useAuthMenusPath(menus: MenuItem[]): PathType[] {
  const { pathname } = useLocation();

  function getCurrentTitle(menus: MenuItem[], toUrlTitle: string): string | null {
    for (const menu of menus) {
      // 如果当前路由
      if (menu.url === toUrlTitle) {
        return menu.label;
      }
      if (menu.children && menu.children.length > 0) {
        return getCurrentTitle(menu.children, toUrlTitle);
      }
    }
    return null;
  }

  return useMemo(() => {
    // 首页
    if (pathname === "/") return [{ url: "/", title: "首页" }];

    const currentPath = pathname.split("/").filter(v => v);

    return currentPath.map((path, index) => {
      const url = `/${currentPath.slice(0, index + 1).join("/")}`;
      const title = getCurrentTitle(menus, url) ?? path;

      return { url, title };
    });
  }, [menus, pathname]);
}
// 处理面包屑组件可点击跳转
function itemRender(paths: PathType[]) {
  return useMemo(() => {
    const nextItemRender = paths
      .map(({ title, url }) => {
        return {
          title: <Link to={url}>{title}</Link>
        };
      })
      .filter(v => v.title.props.to !== "/");

    return [{ title: <Link to="/">首页</Link> }].concat(nextItemRender);
  }, [JSON.stringify(paths)]);
}

// 菜单组件

function LayoutMenu({ menus }: { menus: MenuItem[] }) {
  const selectedKeys = ["用户管理", "/user"];
  const [openKeys, setOpenKeys] = useState<string[]>(selectedKeys);
  const items = useRouterMenu(menus);

  // 默认展开一个
  const onOpenChange: MenuProps["onOpenChange"] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);

    if (items.map(v => v.label).indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      style={{ height: "100%" }}
      mode="inline"
      items={items}
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={onOpenChange}
    />
  );
}

// 处理菜单
function useRouterMenu(menus: MenuItem[]) {
  // 处理多级菜单
  function handleMenu(menus: MenuItem[]): { label: string | ReactNode }[] {
    return menus.map(route => {
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
  return useMemo(() => {
    return menus.map(route => {
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
  }, [JSON.stringify(menus)]);
}

function useDefaultMenuPath(menus: MenuItem[], paths: PathType[]) {}
