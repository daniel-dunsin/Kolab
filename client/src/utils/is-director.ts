import { IWorkspace } from '../interfaces/workspace.interface';
import { getUserFromLocalStorage } from './tokens';

const checkIsDirector = (currentWorkspace?: IWorkspace | null): boolean => {
  const user = getUserFromLocalStorage();

  return currentWorkspace?.director?._id?.toString() === user._id?.toString();
};

export default checkIsDirector;
