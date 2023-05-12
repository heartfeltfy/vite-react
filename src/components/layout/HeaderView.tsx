import { Button, Layout, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/store-hook";
import { logout } from "@/routes/auth/auth-slice";

export default function Header() {
  return (
    <Layout.Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 24
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Typography.Title level={2} style={{ color: "white", marginBottom: 0, whiteSpace: "nowrap" }}>
          数字法庭运维管控系统
        </Typography.Title>
      </Link>
      <Logout />
    </Layout.Header>
  );
}

function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signUp = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };
  return (
    <>
      <Button type="primary" onClick={signUp}>
        退出登录
      </Button>
    </>
  );
}
