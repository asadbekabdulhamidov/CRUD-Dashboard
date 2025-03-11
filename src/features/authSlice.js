import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // user: localStorage.getItem("user") || false,
  token: localStorage.getItem("access_token") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      console.log("user state", payload);
      state.token = payload.token;
    },
    logOut: () => {},
  },
});

export const { login, logOut } = authSlice.actions;
export default authSlice.reducer;
