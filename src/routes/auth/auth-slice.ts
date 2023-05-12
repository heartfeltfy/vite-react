import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@/store/store";
import { instance } from "@/utils/http";
import { updateAccessToken } from "@/api/auth";
import { AxiosError } from "axios";
import { authenticationFailed } from "@/hooks/useRequest";

export interface AuthState {
  accessToken: string;
  username: string;
  authorities: string[];
  expiresIn: number;
  refreshToken: string;
}
const initialState: AuthState = {
  accessToken: "",
  username: "",
  authorities: [],
  expiresIn: 0,
  refreshToken: ""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, payload: PayloadAction<AuthState>) {
      state.accessToken = payload.payload.accessToken;
      state.username = payload.payload.username;
      state.authorities = payload.payload.authorities;
      state.expiresIn = payload.payload.expiresIn;
      state.refreshToken = payload.payload.refreshToken;
    },
    clearAuth(state) {
      state.accessToken = "";
      state.username = "";
      state.authorities = [];
      state.expiresIn = -1;
      state.refreshToken = "";
    }
  }
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;

// 登录
export function login(auth: AuthState) {
  return (dispatch: AppDispatch) => {
    dispatch(setAuth(auth));
    setStorage(auth);
  };
}
/**
 * 刷新token
 * @returns
 */
export function autoRefreshToken() {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const { expiresIn, refreshToken } = getState().auth;

    const currentSounds = Math.floor(new Date().getTime() / 1000);

    const interTime = expiresIn - currentSounds;
    // 控制提前刷新token阀门
    const valveTime = 300;

    if (interTime <= valveTime) {
      // 此处刷新时间先写死
      const expiresInSeconds = 1800;
      const intervalTime = Math.floor(new Date().getTime() / 1000);

      instance(updateAccessToken(refreshToken))
        .then((res) => {
          const { token: accessToken, username } = res.data;
          dispatch(
            login({
              accessToken,
              refreshToken: accessToken,
              username,
              authorities: ["penal", "device"],
              expiresIn: expiresInSeconds + intervalTime
            })
          );
        })
        .catch((error) => {
          const errorConfig = error as AxiosError;
          authenticationFailed(dispatch, errorConfig);
        });
    }
  };
}
// 登出
export function logout() {
  return (dispatch: AppDispatch) => {
    dispatch(clearAuth());
    clearStorage();
  };
}

// 用于持久化仓库数据
export const durableInfo = (callback: VoidFunction) => {
  return (dispatch: AppDispatch) => {
    const info = getStorage();
    if (!info) return;

    dispatch(login(info));
    callback();
  };
};

// 持久化用户信息
const PERMISSION = "auth";

function setStorage(auth: AuthState) {
  localStorage.setItem(PERMISSION, JSON.stringify(auth));
}

export function clearStorage() {
  localStorage.removeItem(PERMISSION);
}

function getStorage() {
  const getJson = localStorage.getItem(PERMISSION);
  if (!getJson) return null;

  return JSON.parse(getJson) as AuthState;
}
