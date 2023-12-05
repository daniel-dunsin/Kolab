import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IIssue, IssuesSlice } from '../interfaces/issues.interface';
import { getIssues, getSingleIssue } from '../services/issue.services';
import { stat } from 'fs';

const initialState: IssuesSlice = {
  issues: [],
  currentIssue: undefined,
};

const issueSlice = createSlice({
  name: 'issuesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIssues.fulfilled, (state, action: PayloadAction<IIssue[]>) => {
      state.issues = action.payload;
    });
    builder.addCase(getSingleIssue.fulfilled, (state, action: PayloadAction<IIssue>) => {
      state.currentIssue = action.payload;
    });
  },
});

const issueReducer = issueSlice.reducer;
export const {} = issueSlice.actions;
export default issueReducer;
