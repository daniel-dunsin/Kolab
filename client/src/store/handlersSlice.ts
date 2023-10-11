import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IHandlerSlice } from "../interfaces/handlers.interface";

const initialState: IHandlerSlice = {
  preloader: { isOpen: false, text: "" },
  errorModal: { isOpen: false, text: "" },
};

const handlerSlice = createSlice({
  name: "handlerSliice",
  initialState,
  reducers: {
    openPreloader: (state: IHandlerSlice, action: PayloadAction<string>) => {
      state.preloader = { isOpen: true, text: action.payload };
    },
    closePreloader: (state: IHandlerSlice) => {
      state.preloader = initialState.preloader;
    },
    openErrorModal: (state: IHandlerSlice, action: PayloadAction<string>) => {
      state.errorModal = { isOpen: true, text: action.payload };
    },
    closeErrorModal: (state: IHandlerSlice) => {
      state.errorModal = initialState.errorModal;
    },
  },
});

const handlerReducer = handlerSlice.reducer;
export const {
  openPreloader,
  closePreloader,
  openErrorModal,
  closeErrorModal,
} = handlerSlice.actions;

export default handlerReducer;
