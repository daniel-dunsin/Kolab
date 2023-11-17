import { IUser } from './auth.interface';

export interface ITodo {
  text: string;
  _id?: string;
  userId: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}
