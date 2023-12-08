import { NotFoundError } from '../constants/errors';
import { CreateCommentDTO } from '../interfaces/dto/comment.dto';
import { IComment } from '../interfaces/models/comments.interface';
import Comment from '../models/comment.model';

const createComment = async (data: CreateCommentDTO): Promise<IComment> => {
  return await Comment.create({ ...data });
};

const deleteComment = async (id: string): Promise<void> => {
  const comment = await Comment.findByIdAndDelete(id);
  if (!comment) throw new NotFoundError('Comment does not exist');
};

const getComments = async (issueId: string): Promise<IComment[]> => {
  return await Comment.find({ issueId }).populate('issueId').populate('userId');
};

const commentServices = { createComment, deleteComment, getComments };
export default commentServices;
