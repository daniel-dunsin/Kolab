import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITodo } from '../interfaces/todo.interface';
import { getTodos } from '../services/todo.services';

const initialState: ITodo[] = [];

const todoSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
      return action.payload;
    });
  },
});

const todoReducer = todoSlice.reducer;
export const {} = todoSlice.actions;
export default todoReducer;
