import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import handlerReducer from "./handlersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    handler: handlerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type ActionDispatch = typeof store.dispatch;

export default store;
