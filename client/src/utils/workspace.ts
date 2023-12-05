import { ILocalStorageItem } from '../interfaces/local-storage.interface';

export const saveWorkspaceToLocalStorage = (_id: string) => {
  localStorage.setItem(ILocalStorageItem.currentWorkspace, _id);
};

export const getWorkspaceFromLocalStorage = (): string | null => {
  return localStorage.getItem(ILocalStorageItem.currentWorkspace);
};

export const deleteWorkspaceFromLocalStorage = () => {
  return localStorage.removeItem(ILocalStorageItem.currentWorkspace);
};
