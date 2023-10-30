import { IUser } from "./auth.interface";

export interface IWorkspace {
  name: string;
  picture?: string;
  description: string;
  director?: IUser;
  users: Array<IUser>;
  _id: string;
}

export interface IWorkspaceSlice {
  workspaces: IWorkspace[];
  currentWorkspace: IWorkspace | null;
}
