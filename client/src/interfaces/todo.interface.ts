import { IUser } from "./auth.interface";

export interface ITodo {
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
  createdBy?: IUser;
}
