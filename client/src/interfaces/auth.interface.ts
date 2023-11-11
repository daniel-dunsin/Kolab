export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
}

export interface IAuthSlice extends IUser {}
