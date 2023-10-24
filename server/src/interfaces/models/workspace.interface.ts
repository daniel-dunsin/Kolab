import { Types } from "mongoose";
import { IUser } from "./user.interface";

export interface IWorkspace {
  name: string;
  picture?: string;
  description: string;
  director: string | Types.ObjectId | IUser;
  users: Array<string | Types.ObjectId | IUser>;
  _id: string;
}

export interface IWorkspaceInvitation {
  workspace: string | Types.ObjectId | IWorkspace;
  inviteeEmail: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
