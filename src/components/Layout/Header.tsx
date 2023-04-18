import { useAppDispatch, useAppSelector } from "../../store-hooks";
import { Link, useNavigate } from "react-router-dom";
import { getStorage, logout } from "@/routes/auth/authSlice";
import { Layout, Typography } from "antd";

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getUserInfo = getStorage();
  const username = useAppSelector(state => state.auth.username) || (getUserInfo && getUserInfo.username);

  const signout = async () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };
  return (
    <Layout.Header style={{ display: "flex", alignItems: "center", backgroundColor: "#fff" }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Typography.Title level={2} style={{ color: "black", marginBottom: 0 }}>
          Vite-React
        </Typography.Title>
      </Link>
    </Layout.Header>
  );
}
