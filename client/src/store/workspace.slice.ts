import { IUser } from "../interfaces/auth.interface";

export interface IWorkspace {
  name: string;
  picture?: string;
  description: string;
  director?: IUser;
  users: Array<IUser>;
  _id: string;
}
