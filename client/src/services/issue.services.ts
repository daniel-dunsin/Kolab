import { createAsyncThunk } from '@reduxjs/toolkit';
import errorResolver from '../utils/error-resolver';
import { CreateIssueDTO, EditIssueStatusDTO } from '../interfaces/dto/issue.dto';
import { closePreloader, openPreloader } from '../store/handlers.slice';
import uploadFile from '../utils/upload-file';
import httpInstance from '../axios.config';
import { RootState } from '../store';

export const createIssue: any = createAsyncThunk('createIssue', async (data: CreateIssueDTO, thunkApi) => {
  const dispatch = thunkApi.dispatch;

  dispatch(openPreloader('Creating Issue'));

  const images: string[] = [];

  for (const attachment of data.attachments) {
    const url = await uploadFile(attachment as File);
    await images.push(url);
  }

  data.attachments = images;

  try {
    const response = await httpInstance.post('/issue', { ...data });
    dispatch(closePreloader());
    return response?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});

export const getIssues: any = createAsyncThunk('getIssues', async (assignedToUser: boolean = false, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const workspace = state.workspaces.currentWorkspace?._id;

  try {
    const response = await httpInstance.get(
      `/issue/workspace/${workspace}${assignedToUser ? '?assignedToUser=true' : ''}`
    );
    return response?.data?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});

export const getSingleIssue: any = createAsyncThunk('getSingleIssue', async (id: string, thunkApi) => {
  try {
    const response = await httpInstance.get(`/issue/${id}`);
    return response?.data?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});

export const deleteIssue: any = createAsyncThunk('deleteIssue', async (id: string, thunkApi) => {
  const dispatch = thunkApi.dispatch;
  dispatch(openPreloader('Deleting issue'));

  try {
    const response = await httpInstance.delete(`/issue/${id}`);
    dispatch(closePreloader());
    return response?.data?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});

export const editIssueStatus: any = createAsyncThunk('editIssueStatus', async (data: EditIssueStatusDTO, thunkApi) => {
  const dispatch = thunkApi.dispatch;
  dispatch(openPreloader('Updating Status'));

  try {
    const response = await httpInstance.put(`/issue/${data.id}/status`, { status: data.status });
    dispatch(closePreloader());
    return response?.data?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});
