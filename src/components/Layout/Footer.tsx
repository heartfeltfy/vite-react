import { Layout, Typography } from "antd";

export default function Footer() {
  return (
    <Layout.Footer style={{ padding: "6px 12px", textAlign: "center" }}>
      <Copyright />
    </Layout.Footer>
  );
}

const DEFAULT_MESSAGE = `${new Date().toLocaleString()}---Vite-React`;

function Copyright({ message = DEFAULT_MESSAGE }: { message?: string }) {
  return (
    <>
      <Typography.Text type="secondary">{message}</Typography.Text>
    </>
  );
}
