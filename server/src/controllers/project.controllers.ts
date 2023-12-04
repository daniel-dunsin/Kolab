import { NextFunction, Request, Response } from 'express';
import projectServices from '../services/project.service';
import { CreateProjectDTO } from '../interfaces/dto/project.dto';

const createProject = async (req: Request<{ id: string }, {}, CreateProjectDTO>, res: Response, next: NextFunction) => {
  try {
    const data = await projectServices.createProject({ ...req.body, workspaceId: req.params.id });

    res.status(201).json({ message: 'Project Created Successfully', data });
  } catch (error) {
    return next(error);
  }
};

const deleteProject = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const data = await projectServices.deleteProject(req.params.id);

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

const getProjects = async (
  req: Request<{ id: string }, {}, {}, { search?: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await projectServices.getProjects({ workspaceId: req.params.id, search: req.query.search });

    res.status(200).json({ message: 'Projects fetched successfully', data });
  } catch (error) {
    return next(error);
  }
};

const projectControllers = {
  getProjects,
  deleteProject,
  createProject,
};

export default projectControllers;
