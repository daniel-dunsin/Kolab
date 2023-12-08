import mongoose, { Types } from 'mongoose';
import { IComment } from '../interfaces/models/comments.interface';
import { Collections } from '../constants/collections';

const CommentSchema = new mongoose.Schema<IComment>(
  {
    text: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: Collections.user, required: true },
    issueId: { type: Types.ObjectId, ref: Collections.issue, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model(Collections.comment, CommentSchema);
export default Comment;
