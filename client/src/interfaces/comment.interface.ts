import { IUser } from './auth.interface';
import { IIssue } from './issues.interface';

export interface IComment {
  _id: string;
  text: string;
  userId: IUser;
  issueId: IIssue;
}

export interface ICommentSlice {
  comments: IComment[];
  handlers: { isLoading: boolean };
}
