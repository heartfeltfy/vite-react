import axios, { InternalAxiosRequestConfig } from "axios";
import NProgress from "nprogress";

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
    return config;
  },
  error => {
    return Promise.reject(error);
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

function onRunWhenInternalApi(config: InternalAxiosRequestConfig) {
  return !!config.url && config.url.startsWith(baseURL);
}
