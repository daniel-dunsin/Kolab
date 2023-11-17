import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IWorkspaceMember } from '../interfaces/workspace-members.interface';
import { getWorkspaceMembers } from '../services/workspace-members.services';

const initialState: IWorkspaceMember[] = [];

const membersSlice = createSlice({
  name: 'membersSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWorkspaceMembers.fulfilled, (state, action: PayloadAction<IWorkspaceMember[]>) => {
      return action.payload;
    });
  },
});

const membersReducer = membersSlice.reducer;
export const {} = membersSlice.actions;
export default membersReducer;
