import React from "react";
import { AppstoreOutlined, BarChartOutlined, CloudOutlined, ShopOutlined, TeamOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { MenuProps, Typography } from "antd";
import { Layout, Menu, theme } from "antd";
import { Footer, Header } from "@/components";
import { Link, Outlet } from "react-router-dom";

const { Content, Sider } = Layout;

const items: MenuProps["items"] = [UserOutlined, VideoCameraOutlined, UploadOutlined, BarChartOutlined, CloudOutlined, AppstoreOutlined, TeamOutlined, ShopOutlined].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`
}));

export default function LayoutView() {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <Layout hasSider style={{ height: "100%" }}>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", height: 32, margin: 16 }}>
          <img src="/vite.svg" alt="Vite logo" />
          <Typography.Title level={3} style={{ color: "white", marginBottom: 0 }}>
            Vite-React
          </Typography.Title>
        </Link>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]} items={items} />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
