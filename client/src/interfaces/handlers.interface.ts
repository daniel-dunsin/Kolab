export interface IHandlerSlice {
  preloader: {
    isOpen: boolean;
    text: string;
  };
  errorModal: { isOpen: boolean; text: string };
  createWorkspaceModal: { isOpen: boolean };
}

export enum IScreen {
  sm = 640,
  md = 768,
  lg = 1024,
}
