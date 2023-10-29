import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthSlice } from "../../interfaces/auth.interface";
import { closePreloader, openPreloader } from "../../store/handlers.slice";
import errorResolver from "../../utils/errorResolver";
import httpInstance from "../../axios.config";
import { deleteAccessToken, deleteUser } from "../../utils/tokens";

export const loginUser: any = createAsyncThunk(
  "auth/loginUser",
  async (data: Partial<IAuthSlice & { password: string }>, thunkApi) => {
    const dispatch = thunkApi.dispatch;

    dispatch(openPreloader("Logging you in"));

    try {
      const response = await httpInstance.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      dispatch(closePreloader());
      return response?.data?.data;
    } catch (error: any) {
      return errorResolver(thunkApi, error);
    }
  }
);

export const signUpUser: any = createAsyncThunk(
  "authSlice/signUpUser",
  async (data: Partial<IAuthSlice & { password: string }>, thunkApi) => {
    const dispatch = thunkApi.dispatch;
    dispatch(openPreloader("Creating Acccount"));

    try {
      const response = await httpInstance.post("/auth/register", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      dispatch(closePreloader());

      return response?.data;
    } catch (error: any) {
      return errorResolver(thunkApi, error);
    }
  }
);

export const resendVerificationEmail: any = createAsyncThunk(
  "authSlice/resendVerificationEmail",
  async (email: string, thunkApi) => {
    const dispatch = thunkApi.dispatch;

    dispatch(openPreloader("Resending email"));

    try {
      const response = await httpInstance.post(
        "/auth/verify-account/resend-email",
        {
          email,
        }
      );

      dispatch(closePreloader());

      return response?.data;
    } catch (error: any) {
      return errorResolver(thunkApi, error);
    }
  }
);

export const verifyAccount: any = createAsyncThunk(
  "authSlice/verifyAccount",
  async (token: string, thunkApi) => {
    const dispatch = thunkApi.dispatch;

    try {
      const response = await httpInstance.post("/auth/verify-account", {
        token,
      });

      return response?.data;
    } catch (error: any) {
      return errorResolver(thunkApi, error);
    }
  }
);

export const logOut = async () => {
  deleteUser();
  deleteAccessToken();
  window.location.replace("/login");
};
