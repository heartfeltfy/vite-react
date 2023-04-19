import { Layout, Typography } from "antd";

export default function Footer() {
  return (
    <Layout.Footer style={{ padding: "12px 24px" }}>
      <Copyright />
    </Layout.Footer>
  );
}

const DEFAULT_MESSAGE = `${new Date().toLocaleString()}react`;

function Copyright({ message = DEFAULT_MESSAGE }: { message?: string }) {
  return (
    <>
      <Typography.Text type="secondary">{message}</Typography.Text>
    </>
  );
}
