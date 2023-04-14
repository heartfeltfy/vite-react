import axios from "axios";

export const instance = axios.create({
  timeout: 10_000,
});

instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  config => config,
  error => {
    return Promise.reject(error);
  },
);
