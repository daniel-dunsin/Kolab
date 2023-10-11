import { GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { Axios, AxiosError } from "axios";
import thunk from "redux-thunk";
import { closePreloader, openErrorModal } from "../store/handlersSlice";

const errorResolver = (
  thunkApi: GetThunkAPI<{}>,
  error: AxiosError<any> | string
) => {
  const dispatch = thunkApi.dispatch;

  error = <string>(error as AxiosError<any>).response?.data.error;

  dispatch(openErrorModal(error));
  dispatch(closePreloader());

  return thunkApi.rejectWithValue(error);
};

export default errorResolver;
