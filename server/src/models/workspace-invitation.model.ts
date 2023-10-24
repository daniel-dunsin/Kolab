import mongoose, { Types } from "mongoose";
import { IWorkspaceInvitation } from "../interfaces/models/workspace.interface";
import { Collections } from "../constants/collections";

const WorkspaceInvitationSchema = new mongoose.Schema<IWorkspaceInvitation>(
  {
    workspace: {
      type: Types.ObjectId,
      ref: Collections.workspaces,
      required: true,
    },
    inviteeEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const WorkspaceInvitation = mongoose.model(
  Collections.workspace_invitation,
  WorkspaceInvitationSchema
);

export default WorkspaceInvitation;
