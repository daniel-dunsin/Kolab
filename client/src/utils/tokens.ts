import { IUser } from "../interfaces/auth.interface";
import { ILocalStorageItem } from "../interfaces/local-storage.interface";

export const getAccessToken = (): string => {
  const token = localStorage.getItem(ILocalStorageItem.token) as string;

  return token;
};

export const storeUserInLocalStorage = (user: IUser) => {
  localStorage.setItem(ILocalStorageItem.user, JSON.stringify(user));
};

export const getUserFromLocalStorage = (): IUser => {
  const user = <IUser>(
    JSON.parse(localStorage.getItem(ILocalStorageItem.user) as string)
  );

  return user;
};

export const storeAccessToken = (token: string) => {
  localStorage.setItem(ILocalStorageItem.token, token);
};

export const deleteAccessToken = () => {
  localStorage.removeItem(ILocalStorageItem.token);
};

export const deleteUser = () => {
  localStorage.removeItem(ILocalStorageItem.user);
};
