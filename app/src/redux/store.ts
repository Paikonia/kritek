import { configureStore, } from "@reduxjs/toolkit";
import userSlice from "./counter/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postAPI } from "./Posts/posts";

export const store = configureStore({
  reducer: {
    user: userSlice,
    [postAPI.reducerPath]: postAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


setupListeners(store.dispatch)