import { Relations } from '.';
import { IProject } from './project.interface';
import { IUser } from './user.interface';

export enum IssueStatus {
  pending = 'pending',
  done = 'done',
}

export interface IIssue {
  title: string;
  description: string;
  attachments: string[];
  assignedBy: Relations<IUser>;
  userId: Relations<IUser>;
  projectId: Relations<IProject>;
  status: IssueStatus;
}
