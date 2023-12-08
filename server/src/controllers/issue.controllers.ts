import { NextFunction, Request, Response } from 'express';
import { CreateIssueDTO } from '../interfaces/dto/issues.dto';
import issueServices from '../services/issue.service';
import { IssueStatus } from '../interfaces/models/issue.interface';

const createIssue = async (req: Request<{}, {}, CreateIssueDTO>, res: Response, next: NextFunction) => {
  try {
    const assignedBy = <string>req.userId;
    const data = await issueServices.createIssue({ ...req.body, assignedBy });

    res.status(201).json({ message: 'Issue created successfully', data });
  } catch (error) {
    return next(error);
  }
};

const getIssues = async (
  req: Request<{ id: string }, {}, {}, { assignedToUser?: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.query.assignedToUser ? req.userId : undefined;

    const data = await issueServices.getIssues(req.params.id, userId);

    res.status(200).json({ message: 'Issues fetched successfully', data });
  } catch (error) {
    return next(error);
  }
};

const getSingleIssue = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const data = await issueServices.getSingleIssue(req.params.id);
    res.status(200).json({ message: 'Single issue fetched successfully', data });
  } catch (error) {
    return next(error);
  }
};

const deleteIssue = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    await issueServices.deleteIssue(req.params.id);
    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    return next(error);
  }
};

const updateIssueStatus = async (
  req: Request<{ id: string }, {}, { status: IssueStatus }>,
  res: Response,
  next: NextFunction
) => {
  try {
    await issueServices.updateIssueStatus(req.params.id, req.body.status);
    res.status(200).json({ message: 'Status updated' });
  } catch (error) {
    return next(error);
  }
};

const issueControllers = {
  createIssue,
  deleteIssue,
  getSingleIssue,
  getIssues,
  updateIssueStatus,
};
export default issueControllers;
