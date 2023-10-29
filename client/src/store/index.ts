import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import handlerReducer from "./handlers.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    handler: handlerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type ActionDispatch = typeof store.dispatch;

export default store;
