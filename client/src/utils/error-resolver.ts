import { GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { Axios, AxiosError } from "axios";
import thunk from "redux-thunk";
import { closePreloader, openErrorModal } from "../store/handlers.slice";

const errorResolver = (thunkApi: GetThunkAPI<{}>, error: any) => {
  const dispatch = thunkApi.dispatch;

  if (error?.response?.data?.error?.errors) {
    error = error.response.data.error.errors?.[0];
  } else {
    error = <string>error.response?.data.error;
  }
  dispatch(openErrorModal(error));
  dispatch(closePreloader());

  return thunkApi.rejectWithValue(error);
};

export default errorResolver;
