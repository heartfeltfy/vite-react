import { useAppDispatch, useAppSelector } from "@/store-hooks";
import { useEffect } from "react";
import { getPostsHttp, reset } from "./posts-slice";
import { Spin } from "antd";
import { SpinStyles } from "@/components/loading/SkeletonLoading";

export default function Posts() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.posts.posts);
  const loading = useAppSelector(state => state.ui.loading);

  useEffect(() => {
    const controller = dispatch(getPostsHttp({ pageNumber: 1, pageSize: 150 }));

    return () => {
      controller.abort();
      dispatch(reset());
    };
  }, []);
  return (
    <>
      {!loading ? (
        posts.map(v => {
          return <p key={v.id}>{v.body}</p>;
        })
      ) : (
        <Spin style={SpinStyles} />
      )}
    </>
  );
}
