import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { autoRefreshToken, durableInfo, logout } from "./auth-slice";
import { useAppDispatch, useAppSelector } from "@/store/store-hook";

// 限制用户返回登录页面
export const useAuthLogin = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      durableInfo(() => {
        if (pathname === "/login") {
          navigate("/", { replace: true });
          return;
        }
        navigate(pathname, { replace: true });
      })
    );
  }, [dispatch, navigate, pathname]);
};

/**
 * 过期前自动返回登录页面
 */
export const useAutoLogin = () => {
  const expiresIn = useAppSelector((state) => state.auth.expiresIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (expiresIn === -1) {
      navigate("/login", { replace: true });
      return;
    }
    if (expiresIn === 0) return;

    const currentTime = new Date().getTime();
    const interSounds = expiresIn * 1000 - currentTime;
    const timeout = window.setTimeout(() => {
      dispatch(logout());
    }, interSounds);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [expiresIn, navigate, dispatch]);
};

/**
 * 自动刷新token
 */

export const useAutoRefreshToken = () => {
  const { pathname } = useLocation();
  const { expiresIn, refreshToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pathname === "/login") return;

    if (!expiresIn || !refreshToken) return;

    dispatch(autoRefreshToken());
  }, [pathname, refreshToken, expiresIn, dispatch]);
};
