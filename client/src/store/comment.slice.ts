import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IComment, ICommentSlice } from '../interfaces/comment.interface';
import { getComments } from '../services/comment.services';

const initialState: ICommentSlice = {
  comments: [],
  handlers: { isLoading: false },
};

const commentSlice = createSlice({
  name: 'commentSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.handlers.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action: PayloadAction<IComment[]>) => {
        state.comments = action.payload;
        state.handlers.isLoading = false;
      })
      .addCase(getComments.rejected, (state) => {
        state.handlers.isLoading = false;
      });
  },
});

const commentReducer = commentSlice.reducer;
export const {} = commentSlice.actions;
export default commentReducer;
