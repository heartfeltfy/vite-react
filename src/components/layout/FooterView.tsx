import { Layout, Typography } from "antd";
export default function Footer() {
  return (
    <Layout.Footer style={{ padding: "6px 12px", textAlign: "center" }}>
      <Copyright />
    </Layout.Footer>
  );
}

// 默认信息
const DEFAULT_MESSAGE = "Copyright © 2023 浙江乾冠信息安全研究院 all right reserved";

function Copyright({ message = DEFAULT_MESSAGE }: { message?: string }) {
  return (
    <>
      <Typography.Text type="secondary">{message}</Typography.Text>
    </>
  );
}
