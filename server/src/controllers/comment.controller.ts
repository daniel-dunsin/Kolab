import { NextFunction, Request, Response } from 'express';
import commentServices from '../services/comment.service';

const createComment = async (req: Request<{ id: string }, {}, { text: string }>, res: Response, next: NextFunction) => {
  try {
    const data = await commentServices.createComment({
      text: req.body.text,
      issueId: <string>req.params.id,
      userId: <string>req.userId,
    });

    res.status(200).json({ message: 'Comment Added', data });
  } catch (error) {
    return next(error);
  }
};

const getComments = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const data = await commentServices.getComments(req.params.id);

    res.status(200).json({ message: 'comments fetched successfully', data });
  } catch (error) {
    return next(error);
  }
};

const deleteComment = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    await commentServices.deleteComment(req.params.id);

    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    return next(error);
  }
};

const commentControllers = { createComment, getComments, deleteComment };
export default commentControllers;
