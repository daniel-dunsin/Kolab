import mongoose, { Types } from 'mongoose';
import { IWorkspace } from '../interfaces/models/workspace.interface';
import { Collections } from '../constants/collections';

const WorkspaceSchema = new mongoose.Schema<IWorkspace>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  picture: {
    type: String,
    required: false,
    default: 'https://cdn.dribbble.com/users/294225/screenshots/15292899/wrkspace-1.png',
  },
  director: { type: Types.ObjectId, required: true, ref: Collections.user },
});

const Workspace = mongoose.model(Collections.workspaces, WorkspaceSchema);

export default Workspace;
