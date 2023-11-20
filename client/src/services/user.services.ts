import { createAsyncThunk } from '@reduxjs/toolkit';
import { EditProfileDTO } from '../interfaces/dto/auth.dto';
import { closePreloader, openPreloader } from '../store/handlers.slice';
import uploadFile from '../utils/upload-file';
import httpInstance from '../axios.config';
import errorResolver from '../utils/error-resolver';

export const editProfile: any = createAsyncThunk('editProfile', async (data: EditProfileDTO, thunkApi) => {
  const dispatch = thunkApi.dispatch;
  dispatch(openPreloader('Editing Profile'));

  if (data.profilePicture && typeof data.profilePicture != 'string') {
    data.profilePicture = await uploadFile(<File>data.profilePicture);
  }

  try {
    const response = await httpInstance.put('/user', { ...data });
    dispatch(closePreloader());
    return response?.data?.data;
  } catch (error) {
    return errorResolver(thunkApi, error);
  }
});
