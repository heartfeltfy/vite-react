import { Layout } from "antd";
import { HeaderView, FooterView } from "@/components";
import RouteError from "@/components/error/RouteError";
export default function ErrorPage() {
  return (
    <Layout style={{ height: "100%" }}>
      <HeaderView />
      <Layout.Content style={{ display: "flex" }}>
        <RouteError />
      </Layout.Content>
      <FooterView />
    </Layout>
  );
}
