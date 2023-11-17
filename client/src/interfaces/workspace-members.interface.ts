import { IUser } from './auth.interface';
import { IWorkspace } from './workspace.interface';

export interface IWorkspaceMember {
  userId: IUser;
  workspaceId: IWorkspace;
}
