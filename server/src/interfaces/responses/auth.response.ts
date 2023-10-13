import { IUser } from "../models/user.interface";

export interface ILoginRes {
  user: IUser;
  token: string;
}
