import { AppDispatch } from "./../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthInitialState {
  accessToken: string;
  username: string;
  authorities: string[];
}
const initialState = {
  accessToken: "",
  username: "",
  authorities: []
} as AuthInitialState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 设置权限信息
    setAuth(state, action: PayloadAction<AuthInitialState>) {
      state.accessToken = action.payload.accessToken;
      state.username = action.payload.username;
      state.authorities = action.payload.authorities;
    },
    // 清除权限信息
    clearAuth(state) {
      state.accessToken = "";
      state.username = "";
      state.authorities = [];
    }
  }
});

const USER_INFO = "auth";

// 用户登录
export const login = (userInfo: AuthInitialState) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAuth(userInfo));
    setStorage(userInfo);
  };
};
// 用户注销
export const logout = () => {
  return (dispatch: AppDispatch) => {
    clearStorage();
    dispatch(clearAuth());
  };
};

// 用于持久化仓库数据
export const durableInfo = (callback: VoidFunction) => {
  return (dispatch: AppDispatch) => {
    const info = getStorage();

    if (!info) return;

    dispatch(login(info));
    callback();
  };
};

// 用户鉴权信息持久化
function setStorage(auth: AuthInitialState) {
  localStorage.setItem(USER_INFO, JSON.stringify(auth));
}
// 清除用户信息
function clearStorage() {
  localStorage.removeItem(USER_INFO);
}
// 获取用户信息
export function getStorage(): AuthInitialState | null {
  const userInfo = localStorage.getItem(USER_INFO);
  if (!userInfo) return null;

  return JSON.parse(userInfo);
}
export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
