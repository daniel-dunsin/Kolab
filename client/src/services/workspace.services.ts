import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import errorResolver from '../utils/error-resolver';
import { useDispatch } from 'react-redux';
import { closePreloader, openPreloader } from '../store/handlers.slice';
import httpInstance from '../axios.config';
import { RootState } from '../store';

export const createWorkspace: any = createAsyncThunk('create-workspace', async (name: string, thunkApi) => {
  const dispatch = thunkApi.dispatch;

  dispatch(openPreloader('Creating Workspace'));

  try {
    const response = await httpInstance.post('/workspace', { name });

    dispatch(closePreloader());

    return response?.data?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});

export const getMyWorkspaces: any = createAsyncThunk('get-my-workspace', async (_, thunkApi) => {
  try {
    const response = await httpInstance.get('/workspace');

    return response?.data?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});

export const getSingleWorkspace: any = createAsyncThunk('get-single-workspace', async (id: string, thunkApi) => {
  try {
    const response = await httpInstance.get(`/workspace/${id}`);

    return response.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});

export const deleteWorkspace: any = createAsyncThunk('delete-workspace', async (id: string, thunkApi) => {
  try {
    const response = await httpInstance.delete(`/workspace/${id}`);

    return response?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});

export const inviteUserToWorkspace: any = createAsyncThunk(
  'invite user to workspace',
  async (email: string, thunkApi) => {
    const dispatch = thunkApi.dispatch;
    dispatch(openPreloader('Sending invitation link'));
    const state = <RootState>thunkApi.getState();
    const workspace_id = state.workspaces.currentWorkspace?._id;

    try {
      const response = await httpInstance.post(`/workspace/${workspace_id}/invite`, { email: email });
      dispatch(closePreloader());
      return response?.data;
    } catch (error) {
      return errorResolver(thunkApi, error);
    }
  }
);

export const acceptWorkspaceInvitation: any = createAsyncThunk(
  'acceptWorkspaceInvitation',
  async (invite_id: string, thunkApi) => {
    const dispatch = thunkApi.dispatch;
    dispatch(openPreloader('Accepting Invite'));

    try {
      const response = await httpInstance.post('/workspace/join', {
        invite_id,
      });
      dispatch(closePreloader());
      return response?.data;
    } catch (error) {
      return errorResolver(thunkApi, error);
    }
  }
);

export const getWorkspaceByInviteId: any = createAsyncThunk(
  'getWorkspaceyInviteId',
  async (invite_id: string, thunkApi) => {
    try {
      const response = await httpInstance.get('/workspace/invite_id/' + invite_id);

      return response?.data?.data;
    } catch (error) {
      return errorResolver(thunkApi, error);
    }
  }
);
