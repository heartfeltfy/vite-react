import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, getPosts, GetPostsParams } from "./api";
import { sendRequest, uiReset } from "@/components/layout/ui-slice";
import { AppDispatch } from "@/store";

export interface InitialState {
  posts: Post[];
}

const initialState = {
  posts: []
} as InitialState;
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
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
      sendRequest(getPosts({ pageNumber, pageSize }), result => dispatch(setPosts(result.posts)))
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
