import { RequestConfig } from "@/hooks/useRequest";

export const getAllUsers = (): RequestConfig => {
  return {
    method: "get",
    url: "users"
  };
};
