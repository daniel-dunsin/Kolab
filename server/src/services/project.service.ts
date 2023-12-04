import { NotFoundError } from '../constants/errors';
import { CreateProjectDTO, GetProjectsDTO } from '../interfaces/dto/project.dto';
import { IProject } from '../interfaces/models/project.interface';
import Project from '../models/project.model';

const createProject = async (data: CreateProjectDTO): Promise<IProject> => {
  return await Project.create(data);
};

const deleteProject = async (id: string): Promise<void> => {
  const project = await Project.findByIdAndDelete(id);
  if (!project) throw new NotFoundError('Project does not exist');
};

const getProjects = async (data: GetProjectsDTO): Promise<IProject[]> => {
  if (data.search) {
    data.name = { $regex: data.search, $options: 'i' };
  }
  const query: GetProjectsDTO = { workspaceId: data.workspaceId };
  if (data.name) {
    query.name = data.name;
  }

  return await Project.find(query);
};

const projectServices = {
  deleteProject,
  getProjects,
  createProject,
};

export default projectServices;
