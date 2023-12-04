import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProject, IProjectSlice } from '../interfaces/project.interface';
import { getProject } from '../services/project.services';

const initialState: IProjectSlice = {
  projects: [],
};

const projectSlice = createSlice({
  name: 'projectSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProject.fulfilled, (state, action: PayloadAction<IProject[]>) => {
      state.projects = action.payload;
    });
  },
});

const projectReducer = projectSlice.reducer;
export default projectReducer;
export const {} = projectSlice.actions;
