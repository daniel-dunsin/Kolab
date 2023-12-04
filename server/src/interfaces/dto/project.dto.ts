import { SearchDTO } from '.';

export interface CreateProjectDTO {
  name: string;
  workspaceId: string;
}

export interface GetProjectsDTO {
  search?: string;
  name?: SearchDTO;
  workspaceId: string;
}
