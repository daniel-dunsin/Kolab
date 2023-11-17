import { Relations } from '.';
import { IUser } from './user.interface';
import { IWorkspace } from './workspace.interface';

export interface IWorkspaceMember {
  userId: Relations<IUser>;
  workspaceId: Relations<IWorkspace>;
  isDirector: boolean;
}
