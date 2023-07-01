import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: undefined,
  user: null,
  registrationInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      //   set auth info to the local storage when logged in
      localStorage.setItem(
        "auth",
        JSON.stringify({
          accessToken: action.payload.accessToken,
          user: action.payload.user,
        })
      );
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
      // remove auth info from localStorage when loggedOut
      localStorage.removeItem("auth");
    },
    setRegistrationInfo: (state, action) => {
      state.registrationInfo = action.payload;
    },
  },
});

export const { userLoggedIn, userLoggedOut, setRegistrationInfo } =
  authSlice.actions;
export default authSlice.reducer;
