import axios, { InternalAxiosRequestConfig } from "axios";
import NProgress from "nprogress";
import { store } from "../store";

export const baseURL = window?._CONFIG?.baseURL || window.location.origin;

export const instance = axios.create({
  timeout: 10_000,
  baseURL,
});

instance.interceptors.request.use(
  config => {
    NProgress.start();
    return config;
  },
  error => {
    NProgress.done();
    return Promise.reject(error);
  },
);

instance.interceptors.request.use(
  config => {
    // 添加 Authorization 以验证用户身份
    const { accessToken } = store.getState().auth;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
  {
    runWhen: onRunWhenInternalApi,
  },
);

instance.interceptors.response.use(
  response => {
    NProgress.start();
    return response;
  },
  error => {
    NProgress.done();
    return Promise.reject(error);
  },
);

// 用于
function onRunWhenInternalApi(config: InternalAxiosRequestConfig) {
  return !!config.url && config.url.startsWith(baseURL);
}
