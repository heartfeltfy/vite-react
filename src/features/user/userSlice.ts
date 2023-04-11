import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserSlice {
  username: string;
}

const initialState = {
  username: "chenmf1003@email.com",
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
export const { setAuth } = userSlice.actions;
export default userSlice.reducer;
