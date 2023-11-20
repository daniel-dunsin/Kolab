import { ActionReducerMapBuilder, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IWorkspace, IWorkspaceSlice } from '../interfaces/workspace.interface';
import { getMyWorkspaces, getWorkspaceByInviteId } from '../services/workspace.services';

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
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IWorkspaceSlice>) => {
    builder
      .addCase(getMyWorkspaces.fulfilled, (state, action: PayloadAction<IWorkspace[]>) => {
        if (action.payload.length > 0) {
          // if a workspace has been previously selected, leave it selected, else, append the first item in the array as the current workspace
          state.workspaces = action.payload;

          const currentWorkspaceInPayload = action.payload.find(
            (workspace) => state.currentWorkspace?._id === workspace._id
          );

          if (state.currentWorkspace)
            state.currentWorkspace = currentWorkspaceInPayload ? currentWorkspaceInPayload : action?.payload?.[0];
          else state.currentWorkspace = action?.payload?.[0];
        } else {
          state.workspaces = [];
          state.currentWorkspace = null;
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
