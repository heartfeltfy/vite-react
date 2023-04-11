import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  status: "idle" | "loading" | "failed";
}

const initialState: CounterState = {
  value: 0,
  status: "idle",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(incrementAsync.pending, state => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = "idle";
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, state => {
        state.status = "failed";
      });
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>(resolve => setTimeout(() => resolve({ data: amount }), 500));
}

export const incrementAsync = createAsyncThunk("counter/fecthCount", async (amount: number) => {
  const response = await fetchCount(amount);
  return response.data;
});

export default counterSlice.reducer;
