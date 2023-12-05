import { ActionReducerMapBuilder, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IWorkspace, IWorkspaceSlice } from '../interfaces/workspace.interface';
import { getMyWorkspaces, getWorkspaceByInviteId } from '../services/workspace.services';
import {
  deleteWorkspaceFromLocalStorage,
  getWorkspaceFromLocalStorage,
  saveWorkspaceToLocalStorage,
} from '../utils/workspace';

const initialState: IWorkspaceSlice = {
  workspaces: [],
  currentWorkspace: null,
};

const workspaceSlice = createSlice({
  name: 'workspace slice',
  initialState,
  reducers: {
    updateCurrentWorkspace: (state: IWorkspaceSlice, action: PayloadAction<IWorkspace | null>) => {
      state.currentWorkspace = action.payload;
      saveWorkspaceToLocalStorage(action?.payload?._id as string);
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IWorkspaceSlice>) => {
    builder
      .addCase(getMyWorkspaces.fulfilled, (state, action: PayloadAction<IWorkspace[]>) => {
        if (action.payload.length > 0) {
          state.workspaces = action.payload;
          //if a workspace is in localstorage append it straight
          const workspaceInStorage = getWorkspaceFromLocalStorage();

          if (workspaceInStorage) {
            const currentWorkspaceInPayload = action.payload.find((workspace) => workspaceInStorage === workspace._id);
            state.currentWorkspace = currentWorkspaceInPayload ? currentWorkspaceInPayload : action?.payload?.[0];
          } else {
            state.currentWorkspace = action?.payload?.[0];
            action?.payload?.[0] && saveWorkspaceToLocalStorage(action?.payload?.[0]?._id);
          }
        } else {
          state.workspaces = [];
          state.currentWorkspace = null;
          deleteWorkspaceFromLocalStorage();
        }
      })
      .addCase(getWorkspaceByInviteId.fulfilled, (state, action: PayloadAction<IWorkspace>) => {
        if (action.payload) state.currentWorkspace = action.payload;
      });
  },
});

const workspaceReducer = workspaceSlice.reducer;
export const { updateCurrentWorkspace } = workspaceSlice.actions;

export default workspaceReducer;
