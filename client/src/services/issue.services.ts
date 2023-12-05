import { createAsyncThunk } from '@reduxjs/toolkit';
import errorResolver from '../utils/error-resolver';
import { CreateIssueDTO } from '../interfaces/dto/issue.dto';
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
