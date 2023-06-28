import { configureStore } from "@reduxjs/toolkit";
import themeConfigSlice from "../features/theme/themeConfigSlice";

import authReducer from "../features/auth/authSlice";
// import utilsReducer from "../features/utils/utilsSlice";
import { apiSlice } from "../features/api/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    themeConfig: themeConfigSlice,
    auth: authReducer,
  },

  devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

export default store;
