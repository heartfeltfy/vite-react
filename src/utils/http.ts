import axios from "axios";
import NProgress from "nprogress";
import { store } from "../store";

export const baseURL = window?._CONFIG?.baseURL || window.location.origin;

export const instance = axios.create({
  timeout: 10_000,
  baseURL
});

instance.interceptors.request.use(
  config => {
    NProgress.start();
    // 添加 Authorization 以验证用户身份
    const { accessToken } = store.getState().auth;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    NProgress.done();
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    NProgress.done();
    return response;
  },
  error => {
    NProgress.done();
    return Promise.reject(error);
  }
);
