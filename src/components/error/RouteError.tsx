import { Space, Typography } from "antd";

interface Props {
  code?: number;
  message?: string;
}

export default function RouteError({ code = 404, message = "糟糕！未找到您要访问的页面 :(" }: Props) {
  return (
    <Space
      direction="vertical"
      style={{ width: "100%", justifyContent: "center", alignItems: "center", overflow: "hidden auto" }}
    >
      <Typography.Title type="warning" style={{ marginBottom: "2rem", fontSize: "10rem" }}>
        {code}
      </Typography.Title>
      <Typography.Title level={2} style={{ fontSize: "4rem" }}>
        {message}
      </Typography.Title>
    </Space>
  );
}
