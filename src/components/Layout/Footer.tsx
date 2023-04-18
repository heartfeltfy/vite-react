import { CopyrightOutlined } from "@ant-design/icons";
import { Layout, Typography } from "antd";

export default function Footer() {
  return (
    <Layout.Footer>
      <Copyright />
    </Layout.Footer>
  );
}

const DEFAULT_MESSAGE = `演示项目`;

function Copyright({ message = DEFAULT_MESSAGE }: { message?: string }) {
  return (
    <>
      <Typography.Text type="secondary">
        <CopyrightOutlined /> {message}
      </Typography.Text>
    </>
  );
}
