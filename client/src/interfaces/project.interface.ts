import { IWorkspace } from './workspace.interface';

export interface IProject {
  name: string;
  _id: string;
  workspaceId: IWorkspace;
}

export interface IProjectSlice {
  projects: IProject[];
}
