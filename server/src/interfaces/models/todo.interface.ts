import { Relations } from '.';
import { IUser } from './user.interface';

export interface ITodo {
  userId: Relations<IUser>;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
