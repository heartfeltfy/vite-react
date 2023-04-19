import { Link } from "react-router-dom";
import { Layout, Typography } from "antd";

export default function Header() {
  return (
    <Layout.Header style={{ display: "flex", alignItems: "center" }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <img src="/vite.svg" alt="" />
        <Typography.Title level={2} style={{ color: "white", marginBottom: 0, whiteSpace: "nowrap" }}>
          Vite-React
        </Typography.Title>
      </Link>
    </Layout.Header>
  );
}
