import mongoose from 'mongoose';
import { IWorkspaceMember } from '../interfaces/models/workspace-member.interface';
import { Collections } from '../constants/collections';

const MemberSchema = new mongoose.Schema<IWorkspaceMember>(
  {
    userId: { type: mongoose.Types.ObjectId, ref: Collections.user, required: true },
    workspaceId: { type: mongoose.Types.ObjectId, ref: Collections.workspaces, required: true },
    isDirector: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const WorkspaceMember = mongoose.model(Collections.workspace_member, MemberSchema);

export default WorkspaceMember;
