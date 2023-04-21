import { RequestConfig } from "@/hooks/useRequest";

export interface Post {
  id?: number;
  userId: number;
  title: string;
  tags: string[];
  body: string;
}

export interface GetPostsParams {
  pageSize: number;
  pageNumber: number;
}

export const getPosts = ({ pageSize, pageNumber }: GetPostsParams): RequestConfig => {
  return {
    method: "get",
    url: "/posts",
    params: {
      limit: pageSize,
      skip: pageNumber
    }
  };
};
