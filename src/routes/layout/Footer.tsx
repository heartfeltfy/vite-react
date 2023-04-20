import { Layout, Typography } from "antd";

export default function Footer() {
  return (
    <Layout.Footer style={{ padding: "6px 12px", textAlign: "center" }}>
      <Copyright />
    </Layout.Footer>
  );
}

function Copyright({ message = `${new Date().toLocaleString()}---Vite-React` }) {
  return (
    <>
      <Typography.Text type="secondary">{message}</Typography.Text>
    </>
  );
}
