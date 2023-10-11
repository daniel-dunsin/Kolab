import { createSlice } from "@reduxjs/toolkit";
import { IAuthSlice } from "../interfaces/auth.interface";

const initialState: IAuthSlice = {
  _id: "",
  email: "",
  firstName: "",
  lastName: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
});

const authReducer = authSlice.reducer;
export const {} = authSlice.actions;

export default authReducer;
