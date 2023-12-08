import { createAsyncThunk } from '@reduxjs/toolkit';
import errorResolver from '../utils/error-resolver';
import httpInstance from '../axios.config';
import { CreateCommentDTO } from '../interfaces/dto/comment.dto';
import { closePreloader, openPreloader } from '../store/handlers.slice';

export const createComment: any = createAsyncThunk('createComment', async (data: CreateCommentDTO, thunkApi) => {
  const dispatch = thunkApi.dispatch;

  dispatch(openPreloader('Adding comment'));

  try {
    const response = await httpInstance.post(`/comment/issue/${data.issueId}`, { text: data.text });
    dispatch(closePreloader());
    return response?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});

export const getComments: any = createAsyncThunk('getComments', async (issueId: string, thunkApi) => {
  try {
    const response = await httpInstance.get(`/comment/issue/${issueId}`);
    return response?.data?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});

export const deleteComment: any = createAsyncThunk('deleteComment', async (id: string, thunkApi) => {
  const dispatch = thunkApi.dispatch;

  dispatch(openPreloader('Deleting comment'));

  try {
    const response = await httpInstance.delete(`/comment/${id}`);
    dispatch(closePreloader());
    return response?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});
