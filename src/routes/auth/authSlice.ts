import { AppDispatch } from "./../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthInitialState {
  accessToken: string;
  username: string;
}
const initialState = {
  accessToken: "",
  username: "",
} as AuthInitialState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 设置权限信息
    setAuth(state, action: PayloadAction<AuthInitialState>) {
      state.accessToken = action.payload.accessToken;
      state.username = action.payload.username;
    },
    // 清除权限信息
    clearAuth(state) {
      state.accessToken = "";
      state.username = "";
    },
  },
});

const USER_INFO = "auth";

// 用户登录
export const login = (userInfo: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setAuth({ username: "chenmf1003@gmail.com", accessToken: "accessToken" }));
    setStorage(userInfo);
  };
};
// 用户注销
export const logout = () => {
  return async (dispatch: AppDispatch) => {
    clearStorage();
    dispatch(clearAuth());
  };
};

// 用户鉴权信息持久化
function setStorage(auth: any) {
  localStorage.setItem(USER_INFO, JSON.stringify(auth));
}
// 清除用户信息
function clearStorage() {
  localStorage.removeItem(USER_INFO);
}

export function getStorage() {
  return localStorage.getItem(USER_INFO) && JSON.parse(localStorage.getItem(USER_INFO) as string);
}
export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
