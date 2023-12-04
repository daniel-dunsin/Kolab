import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import handlerReducer from './handlers.slice';
import workspaceReducer from './workspace.slice';
import membersReducer from './workspace-members.slice';
import todoReducer from './todo.slice';
import projectReducer from './project.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    handler: handlerReducer,
    workspaces: workspaceReducer,
    members: membersReducer,
    todos: todoReducer,
    projects: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type ActionDispatch = typeof store.dispatch;

export default store;
