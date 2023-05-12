import { RequestConfig } from "@/hooks/useRequest";

// 获取token
export const getAccessToken = (data: { password: string; username: string }): RequestConfig => {
  return {
    method: "post",
    url: "/auth/login",
    data
  };
};
// 刷新token
export const updateAccessToken = (refreshToken: string): RequestConfig => {
  return {
    method: "post",
    url: "/auth/login",
    headers: {
      Authorization: `Bearer ${refreshToken}`
    },
    data: { password: "0lelplR", username: "kminchelle" }
  };
};
