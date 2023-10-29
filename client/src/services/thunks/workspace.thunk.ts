import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import errorResolver from "../../utils/errorResolver";
import { useDispatch } from "react-redux";
import { closePreloader, openPreloader } from "../../store/handlers.slice";
import httpInstance from "../../axios.config";

export const createWorkspace: any = createAsyncThunk(
  "create-workspace",
  async (name: string, thunkApi) => {
    const dispatch = useDispatch();

    dispatch(openPreloader("Creating Workspace"));

    try {
      const response = await httpInstance.post("/workspace", { name });

      dispatch(closePreloader());

      console.log(response);

      return response?.data?.data;
    } catch (error) {
      return errorResolver(thunkApi, error);
    }
  }
);

export const getMyWorkspaces: any = createAsyncThunk(
  "get-my-workspace",
  async (_, thunkApi) => {
    try {
      const response = await httpInstance.get("/workspace");

      return response?.data?.data;
    } catch (error) {
      return errorResolver(thunkApi, error);
    }
  }
);

export const getSingleWorkspace: any = createAsyncThunk(
  "get-single-workspace",
  async (id: string, thunkApi) => {
    try {
      const response = await httpInstance.get(`/workspace/${id}`);

      return response.data;
    } catch (error) {
      return errorResolver(thunkApi, error);
    }
  }
);

export const deleteWorkspace: any = createAsyncThunk(
  "delete-workspace",
  async (id: string, thunkApi) => {
    try {
      const response = await httpInstance.delete(`/workspace/${id}`);

      return response?.data;
    } catch (error) {
      return errorResolver(thunkApi, error);
    }
  }
);
