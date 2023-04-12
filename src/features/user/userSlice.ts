import { AppDispatch } from "./../../app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserSlice {
  username: string;
}

const initialState = {
  username: "",
} as UserSlice;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<UserSlice>) {
      state.username = action.payload.username;
    },
  },
});

// 登录
export const signin = (userinfo: UserSlice) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setAuth(userinfo));
    localStorage.setItem("username", userinfo.username);
    // const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    // return response.json();
  };
};
// 登出
export const signout = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setAuth({ username: "" }));
    localStorage.removeItem("username");
  };
};

export const { setAuth } = userSlice.actions;

export default userSlice.reducer;
