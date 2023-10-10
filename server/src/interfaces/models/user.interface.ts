import { Types } from "mongoose";

export enum ITokenTypes {
  verifyAccountToken = "verifyAccountToken",
}

export enum ILoginTypes {
  email = "email",
  google = "google",
}

export interface IUser {
  _id: string | Types.ObjectId;
  firstName: string;
  lastName: string;
  profilePicture: string;
  email: string;
}

export interface IAuth {
  _id: string | Types.ObjectId;
  email: string;
  password: string;
  isVerified: boolean;
  loginType: ILoginTypes;
  confirmPassword(password: string): boolean;
}

export interface IToken {
  tokenType: ITokenTypes;
  value: string;
  email: string;
  _id: string | Types.ObjectId;
  expireAt: Date;
}
