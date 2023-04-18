import { useState, useCallback } from "react";
import { instance } from "@/utils/http";
import { AxiosError } from "axios";

import { baseURL } from "@/utils/http";

import { store } from "@/store";
import { logout } from "@/routes/auth/authSlice";

export interface RequestConfig {
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: object;
  params?: object;
}

export const useRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendHttp = useCallback(({ url, method, data, params }: RequestConfig, callback: (response: any) => void) => {
    setLoading(true);
    setError("");

    const controller = new AbortController();

    instance({ url, method, data, params, signal: controller.signal })
      .then(result => {
        callback(result.data);
      })
      .catch(error => {
        if (controller.signal.aborted) return;
        const errorConfig = error as AxiosError;

        // 鉴权失效
        authenticationFailed(errorConfig);

        const errorData: any = errorConfig.response?.data;

        if (errorData && Object.keys(errorData).length > 0) {
          setError(errorData.error || errorData.message || JSON.stringify(errorData));
          return;
        }

        setError(errorConfig.message);
      })
      .finally(() => setLoading(false));
    return controller;
  }, []);
  return { loading, error, sendHttp };
};

// 鉴权失效返回登录页面
function authenticationFailed(axios: AxiosError) {
  // 状态码 401  鉴权失效
  const status = axios.response?.status === 401;
  // 判断是否为请求接口
  const isApiRequest = axios.request.responseURL.startsWith(baseURL);

  if (status && isApiRequest) {
    store.dispatch(logout());
  }
}
