import { NotFoundError } from '../constants/errors';
import { CreateIssueDTO } from '../interfaces/dto/issues.dto';
import { IIssue } from '../interfaces/models/issue.interface';
import { IProject } from '../interfaces/models/project.interface';
import Issue from '../models/issues.model';
import Project from '../models/project.model';

const createIssue = async (data: CreateIssueDTO): Promise<IIssue> => {
  return await Issue.create(data);
};

const getIssues = async (workspaceId: string, userId?: string): Promise<IIssue[]> => {
  const projects = await Project.find({ workspaceId });

  const query = projects.map((project) => ({ projectId: project._id }));

  return await Issue.find({ $or: query, ...(userId ? { userId } : {}) })
    .populate('userId')
    .populate('projectId');
};

const getSingleIssue = async (id: string): Promise<IIssue> => {
  return (await Issue.findById(id).populate('userId').populate('projectId').populate('assignedBy')) as IIssue;
};

const deleteIssue = async (id: string): Promise<void> => {
  const issue = await Issue.findByIdAndDelete(id);
  if (!issue) throw new NotFoundError('Issue does not exist');
};

const issueServices = {
  createIssue,
  getSingleIssue,
  getIssues,
  deleteIssue,
};
export default issueServices;
