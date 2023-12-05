import { IUser } from './auth.interface';
import { IProject } from './project.interface';

export enum IssueStatus {
  done = 'done',
  pending = 'pending',
}

export interface IIssue {
  _id: string;
  attachments: string[];
  title: string;
  description: string;
  projectId: IProject;
  userId: IUser;
  assignedBy: IUser;
  status: IssueStatus;
}

export interface IssuesSlice {
  issues: IIssue[];
  currentIssue?: IIssue;
}
