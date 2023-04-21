import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./routes/auth/auth-slice";
import postsSlice from "./views/posts/posts-slice";
import uiSlice from "./components/layout/ui-slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsSlice,
    ui: uiSlice
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
