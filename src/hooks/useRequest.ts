import { useState, useCallback } from "react";
import { instance } from "@/utils/http";
import { AxiosError } from "axios";
import { baseURL } from "@/utils/http";

import { AppDispatch, store } from "@/store/store";

import { logout } from "@/routes/auth/auth-slice";
import { message } from "antd";

export interface RequestConfig {
  url: string;
  method: "get" | "post" | "put" | "delete" | "GET" | "POST" | "DELETE" | "PUT";
  data?: object;
  params?: object;
  headers?: object;
}

export const useRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendHttp = useCallback(({ url, method, data, params }: RequestConfig, callback: (response: any) => any) => {
    setLoading(true);
    setError("");
    const controller = new AbortController();

    instance({ url, method, data, params, signal: controller.signal })
      .then((res) => {
        callback && callback(res);
      })
      .catch((error) => {
        if (controller.signal.aborted) return;

        const errorConfig = error as AxiosError;

        // 鉴权失效
        authenticationFailed(store.dispatch, errorConfig);
        // 异常提示信息
        message.error(getErrorMessage(errorConfig));

        setError(getErrorMessage(errorConfig));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { loading, error, sendHttp };
};

// 鉴权失效返回登录页面
export function authenticationFailed(dispatch: AppDispatch, axios: AxiosError) {
  // 状态码 401  鉴权失效
  const status = axios.response?.status === 401;
  // 判断是否为请求接口
  const isApiRequest = axios.request.responseURL.startsWith(baseURL);

  if (status && isApiRequest) {
    dispatch(logout());
  }
}
// 服务可能被拦截请检查网络

export function getErrorMessage(error: AxiosError): string {
  const errorData: any = error.response?.data;
  if (errorData && Object.keys(errorData).length > 0) {
    return errorData.error || errorData.message || JSON.stringify(errorData);
  }
  return error.message;
}
