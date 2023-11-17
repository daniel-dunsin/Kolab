import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import handlerReducer from './handlers.slice';
import workspaceReducer from './workspace.slice';
import membersReducer from './workspace-members.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    handler: handlerReducer,
    workspaces: workspaceReducer,
    members: membersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type ActionDispatch = typeof store.dispatch;

export default store;
