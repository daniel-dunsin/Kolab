import mongoose, { Types } from "mongoose";
import { IWorkspace } from "../interfaces/models/workspace.interface";
import { Collections } from "../constants/collections";

const WorkspaceSchema = new mongoose.Schema<IWorkspace>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: false },
  director: { type: Types.ObjectId, required: true, ref: Collections.user },
  users: { type: [{ type: Types.ObjectId, ref: Collections.user }] },
});

const Workspace = mongoose.model(Collections.workspaces, WorkspaceSchema);

export default Workspace;
