import mongoose, { Types } from 'mongoose';
import { IIssue, IssueStatus } from '../interfaces/models/issue.interface';
import { Collections } from '../constants/collections';

const IssueSchema = new mongoose.Schema<IIssue>(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    attachments: { type: [{ type: String }], default: [] },
    userId: { type: Types.ObjectId, ref: Collections.user, required: true },
    projectId: { type: Types.ObjectId, ref: Collections.project, required: true },
    status: { type: String, enum: Object.values(IssueStatus), default: IssueStatus.pending },
  },
  { timestamps: true, virtuals: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Issue = mongoose.model(Collections.issue, IssueSchema);

export default Issue;
