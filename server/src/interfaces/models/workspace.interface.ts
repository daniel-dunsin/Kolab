import { Types } from 'mongoose';
import { IUser } from './user.interface';
import { Relations } from '.';

export interface IWorkspace {
  name: string;
  picture?: string;
  description: string;
  director: Relations<IUser>;
  _id: string;
}

export interface IWorkspaceInvitation {
  workspace: Relations<IWorkspace>;
  inviteeEmail: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
