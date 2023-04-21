import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { instance } from "@/utils/http";
import { RequestConfig, getErrorMessage } from "@/hooks/useRequest";
import { AppDispatch } from "@/store";
import { AxiosError } from "axios";

interface UiState {
  loading: boolean;
  error: string;
}

const initialState = {
  loading: false,
  error: ""
} as UiState;

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    uiReset(state) {
      state.loading = false;
      state.error = "";
    }
  }
});

export const { setLoading, setError, uiReset } = uiSlice.actions;
export default uiSlice.reducer;

export const sendRequest = (
  { method, url, data, params }: RequestConfig,
  callback: (data: any) => void
) => {
  return (dispatch: AppDispatch) => {
    // 请求开始，loading动画开始
    dispatch(setLoading(true));
    dispatch(setError(""));

    const controller = new AbortController();

    instance({ url, method, params, data, signal: controller.signal })
      .then(response => {
        callback && callback(response.data);
      })
      .catch(error => {
        if (controller.signal.aborted) return;

        const errorConfig = error as AxiosError;
        dispatch(setError(getErrorMessage(errorConfig)));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });

    return controller;
  };
};
