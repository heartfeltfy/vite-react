import { Layout } from "antd";
import classes from "./LayoutView.module.scss";
import { Footer, Header } from "@/components";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const { Sider, Content } = Layout;
export default function LayoutView() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className={classes.layout_view}>
      <Header />
      <Layout className={classes.layout_section} hasSider>
        <Sider
          className={classes.sider}
          width={260}
          collapsedWidth={60}
          collapsed={collapsed}
          onClick={() => setCollapsed(!collapsed)}
        >
          Sider
          <br />
        </Sider>
        <Layout className={classes.content}>
          <Content>
            <Outlet />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
}
