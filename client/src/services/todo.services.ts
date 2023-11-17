import { createAsyncThunk } from '@reduxjs/toolkit';
import errorResolver from '../utils/error-resolver';
import { closePreloader, openPreloader } from '../store/handlers.slice';
import httpInstance from '../axios.config';
import { UpdateTodoDTO } from '../interfaces/dto/todo.dto';

export const createTodo: any = createAsyncThunk('createTodo', async (text: string, thunkApi) => {
  const dispatch = thunkApi.dispatch;
  dispatch(openPreloader('Creating todo'));

  try {
    const response = await httpInstance.post('/todo', { text });
    dispatch(closePreloader());
    return response?.data?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});

export const getTodos: any = createAsyncThunk('getTodos', async (_, thunkApi) => {
  try {
    const response = await httpInstance.get('/todo');

    return response?.data?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});

export const updateTodo: any = createAsyncThunk('updateTodo', async (data: UpdateTodoDTO, thunkApi) => {
  const dispatch = thunkApi.dispatch;
  dispatch(openPreloader('Updating todo'));

  try {
    const response = await httpInstance.put(`/todo/${data._id}`, { text: data.text });
    dispatch(closePreloader());
    return response?.data?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});

export const deleteTodo: any = createAsyncThunk('deleteTodo', async (id: string, thunkApi) => {
  const dispatch = thunkApi.dispatch;

  dispatch(openPreloader('Deleting todo'));

  try {
    const response = await httpInstance.delete(`/todo/${id}`);
    dispatch(closePreloader());
    return response?.data?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});
