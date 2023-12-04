import { createAsyncThunk } from '@reduxjs/toolkit';
import errorResolver from '../utils/error-resolver';
import { GetProjectDTO } from '../interfaces/dto/project.dto';
import { RootState } from '../store';
import httpInstance from '../axios.config';
import { closePreloader, openPreloader } from '../store/handlers.slice';

export const getProject: any = createAsyncThunk('getProject', async (data: GetProjectDTO, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const id = state.workspaces.currentWorkspace?._id;

  let link = `/project/workspace/${id}`;
  if (data.search) {
    link += `?search=${data.search}`;
  }

  try {
    const response = await httpInstance.get(link);

    return response?.data?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});

export const createProject: any = createAsyncThunk('createProject', async (name: string, thunkApi) => {
  const dispatch = thunkApi.dispatch;

  dispatch(openPreloader('Creating Project'));

  const state = thunkApi.getState() as RootState;
  const id = state.workspaces.currentWorkspace?._id;

  try {
    const response = await httpInstance.post(`/project/workspace/${id}`, { name });
    dispatch(closePreloader());
    return response?.data?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});

export const deleteProject: any = createAsyncThunk('deleteProject', async (id: string, thunkApi) => {
  const dispatch = thunkApi.dispatch;
  dispatch(openPreloader('Deleting Project'));

  try {
    const response = await httpInstance.delete(`/project/${id}`);
    dispatch(closePreloader());
    return response?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});
