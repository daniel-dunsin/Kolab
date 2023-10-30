import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import handlerReducer from "./handlers.slice";
import workspaceReducer from "./workspace.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    handler: handlerReducer,
    workspaces: workspaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type ActionDispatch = typeof store.dispatch;

export default store;
