import { Relations } from '.';
import { IIssue } from './issue.interface';
import { IUser } from './user.interface';

export interface IComment {
  text: string;
  issueId: Relations<IIssue>;
  userId: Relations<IUser>;
  createdAt: Date;
  updatedAt: Date;
}
