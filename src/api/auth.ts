import { RequestConfig } from "@/hooks/useRequest";

export const getAccessToken = (data: { username: string; password: string }): RequestConfig => {
  return {
    method: "post",
    url: "/auth/login",
    data
  };
};

// 获取列表
export const getProducts = (): RequestConfig => {
  return {
    method: "get",
    url: "/products"
  };
};
