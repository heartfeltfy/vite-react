import { Layout } from "antd";
import classes from "./LayoutView.module.scss";
import { Footer, Header } from "@/components";

const { Sider, Content } = Layout;

export default function LayoutView() {
  return (
    <Layout className={classes.layout_view}>
      <Header />
      <Layout className={classes.layout_section} hasSider>
        <Sider className={classes.sider}>Sider</Sider>
        <Layout className={classes.content}>
          <Content>Content</Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
}
