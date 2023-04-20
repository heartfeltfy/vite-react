import { RequestConfig } from "@/hooks/useRequest";

export const postsLists = (): RequestConfig => {
  return {
    url: "/posts",
    method: "post"
  };
};
