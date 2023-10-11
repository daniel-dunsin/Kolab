export interface IHandlerSlice {
  preloader: {
    isOpen: boolean;
    text: string;
  };
  errorModal: { isOpen: boolean; text: string };
}
