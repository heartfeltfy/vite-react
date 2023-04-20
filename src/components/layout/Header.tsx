import { Link } from "react-router-dom";
import { Button, Layout, Typography } from "antd";
import { useAppDispatch } from "@/store-hooks";
import { logout } from "@/routes/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const signout = () => {
    dispatch(logout());
    // 退出登录回到不需要鉴权的首页
    navigate("/");
  };

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
        <img src="/vite.svg" alt="" />
        <Typography.Title
          level={2}
          style={{ color: "white", marginBottom: 0, whiteSpace: "nowrap" }}
        >
          Vite-React
        </Typography.Title>
      </Link>
      <Button type="primary" onClick={signout}>
        退出登录
      </Button>
    </Layout.Header>
  );
}
