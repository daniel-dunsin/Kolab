import { Relations } from '.';
import { IWorkspace } from './workspace.interface';

export interface IProject {
  _id: string;
  workspaceId: Relations<IWorkspace>;
  name: string;
  timeSpent: number;
}
