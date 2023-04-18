import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store-hooks";
import { durableInfo } from "@/routes/auth/authSlice";

export default function Root() {
  authLogin();

  return <Outlet />;
}

// 限制已登录用户等到登录页面
export function authLogin() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      durableInfo(() => {
        console.log(pathname);

        if (pathname === "/login") {
          navigate("/", { replace: true });
          return;
        }
        navigate(pathname, { replace: true });
      })
    );
  }, []);
}
