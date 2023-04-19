import { Breadcrumb, Button, Layout, Menu, MenuProps } from "antd";
import classes from "./LayoutView.module.scss";
import { Footer, Header } from "@/components";
import { Dispatch, Key, ReactNode, SetStateAction, useMemo, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  SettingOutlined
} from "@ant-design/icons";

const { Sider, Content } = Layout;
export default function LayoutView() {
  const [collapsed, setCollapsed] = useState(false);
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
          <LayoutMenu />
        </Sider>
        <Layout className={classes.content}>
          <LayoutBreadcrumb collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content style={{ backgroundColor: "#fff" }}>
            <Outlet />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
}

// 面包屑组件
const items = [{ title: "home" }, { title: "goods" }];
function LayoutBreadcrumb({
  collapsed,
  setCollapsed
}: {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex align-center" style={{ marginBottom: 20, gap: "1em" }}>
      <Button type="primary" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Breadcrumb items={items}></Breadcrumb>
    </div>
  );
}

// 菜单组件

export interface MenuItem {
  label: string;
  url?: string;
  icon?: ReactNode;
  children?: MenuItem[];
}

// 路由列表
const menuLists: MenuItem[] = [
  {
    label: "首页",
    url: "/",
    icon: <HomeOutlined />
  },
  {
    label: "列表页",
    icon: <OrderedListOutlined />,
    children: [
      {
        label: "商品列表页",
        url: "/goods"
      }
    ]
  }
];

function useRouterMenu(menus: MenuItem[]) {
  return useMemo(() => {
    return menus.map(route => {
      // 如果存在url
      if (route.url) {
        return {
          label: <Link to={route.url}>{route.label}</Link>,
          key: route.url || route.label,
          icon: route.icon
        };
      }
      if (route.children && route.children.length > 0) {
        const submenus = route.children.map(item => {
          return {
            key: item.url || item.label,
            label: <Link to={item.url!}>{item.label}</Link>
          };
        });
        return {
          label: route.label,
          key: route.label,
          icon: route.icon,
          children: submenus
        };
      }
      return {
        label: route.label,
        key: route.url || route.label,
        icon: route.icon
      };
    });
  }, [JSON.stringify(menus)]);
}

function LayoutMenu() {
  return (
    <Menu
      style={{ height: "100%" }}
      mode="inline"
      items={useRouterMenu(menuLists)}
      defaultOpenKeys={["sub2"]}
    />
  );
}
