import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, getPosts, GetPostsParams } from "./api";
import { sendRequest, uiReset } from "@/components/layout/ui-slice";
import { AppDispatch } from "@/store";

export interface InitialState {
  posts: Post[];
  pageSize: number;
  pageNumber: number;
  total: number;
}

const initialState = {
  posts: [],
  pageNumber: 1,
  pageSize: 10,
  total: 0
} as InitialState;
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<InitialState>) {
      state.posts = action.payload.posts;
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
      state.total = action.payload.total;
    },
    resetPostSlice(state) {
      state.posts = [];
    }
  }
});

export const { setPosts, resetPostSlice } = postsSlice.actions;
export default postsSlice.reducer;

// 获取posts数据
export const getPostsHttp = ({ pageNumber, pageSize }: GetPostsParams) => {
  return (dispatch: AppDispatch) => {
    return dispatch(
      sendRequest(getPosts({ pageNumber, pageSize }), data =>
        dispatch(
          setPosts({
            total: data.total,
            pageNumber: pageNumber,
            pageSize: pageSize,
            posts: data.posts
          })
        )
      )
    );
  };
};

// 重置数据
export const reset = () => {
  return (dispatch: AppDispatch) => {
    dispatch(uiReset());
    dispatch(resetPostSlice());
  };
};
