import { ActionReducerMapBuilder, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthSlice, IUser } from '../interfaces/auth.interface';
import { loginUser } from '../services/auth.services';
import { storeAccessToken, storeUserInLocalStorage } from '../utils/tokens';
import { editProfile } from '../services/user.services';

const initialState: IAuthSlice = {
  _id: '',
  email: '',
  firstName: '',
  lastName: '',
  profilePicture: '',
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IAuthSlice>) => {
    builder.addCase(
      loginUser.fulfilled,
      (state: IAuthSlice, action: PayloadAction<{ accessToken: string; user: IUser }>) => {
        storeUserInLocalStorage(action.payload.user);
        storeAccessToken(action.payload.accessToken);

        return { ...state, ...action.payload.user };
      }
    );

    builder.addCase(editProfile.fulfilled, (state, action: PayloadAction<IUser>) => {
      storeUserInLocalStorage(action.payload);

      return { ...state, ...action.payload };
    });
  },
});

const authReducer = authSlice.reducer;
export const {} = authSlice.actions;

export default authReducer;
