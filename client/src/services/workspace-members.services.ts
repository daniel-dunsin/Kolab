import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import errorResolver from '../utils/error-resolver';
import httpInstance from '../axios.config';
import { EmailMemberDTO } from '../interfaces/dto/workspace-member.dto';
import { closePreloader, openPreloader } from '../store/handlers.slice';

export const getWorkspaceMembers: any = createAsyncThunk('getWorkspaceMembers', async (_, thunkApi) => {
  const state = <RootState>thunkApi.getState();
  const workspaceId = state?.workspaces.currentWorkspace?._id;

  try {
    const response = await httpInstance.get(`/member/workspace/${workspaceId}`);

    return response?.data?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});

export const emailMember: any = createAsyncThunk('emailMember', async (data: EmailMemberDTO, thunkApi) => {
  const dispatch = thunkApi.dispatch;

  dispatch(openPreloader('Sending email'));

  try {
    const response = await httpInstance.post('/member/email', data);
    dispatch(closePreloader());
    return response?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});
