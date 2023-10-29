import { FilterQuery, Types, UpdateQuery } from "mongoose";
import { IWorkspace } from "../interfaces/models/workspace.interface";
import Workspace from "../models/workspace.model";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../constants/errors";
import { IUser } from "../interfaces/models/user.interface";
import User from "../models/user.model";
import sendMail from "../helpers/mailer";
import { joinWorkspaceHTML } from "../templates/join-workspace";
import settings from "../constants/settings";
import WorkspaceInvitation from "../models/workspace-invitation.model";

const createWorkspace = async (
  body: Partial<IWorkspace>
): Promise<IWorkspace> => {
  const { name, director } = body;

  const workspace = await Workspace.create({
    name,
    director,
  });

  return workspace;
};

const findMultiple = async (
  filter: FilterQuery<IWorkspace>
): Promise<IWorkspace[]> => {
  return await Workspace.find(filter).populate("director");
};

const findById = async (_id: Types.ObjectId | string): Promise<IWorkspace> => {
  const workspace = await Workspace.findById(_id).populate("director");

  if (!workspace) throw new NotFoundError("Workspace does not exist");

  return workspace;
};

const updateOne = async (
  _id: Types.ObjectId | string,
  initiator: Types.ObjectId | string,
  update: UpdateQuery<IWorkspace>
): Promise<IWorkspace> => {
  const workspace = await Workspace.findOne({ _id });

  if (!workspace) throw new NotFoundError("Workspace does not exist");

  if (workspace.director.toString() != initiator.toString())
    throw new ForbiddenError("Workspace does not belong to you");

  return (await Workspace.findOneAndUpdate({ _id }, update, {
    new: true,
  })) as IWorkspace;
};

const deleteOne = async (
  _id: Types.ObjectId | string,
  initiator: Types.ObjectId | string
) => {
  const workspace = await Workspace.findOneAndDelete({
    _id,
    director: initiator,
  });

  if (!workspace)
    throw new NotFoundError(
      "Workspace does not exist or does not belong to you"
    );
};

const leave = async (userId: string, workspaceId: string) => {
  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) throw new NotFoundError("Workspace does not exist");

  // if the director leaves, delete the organization

  if (workspace.director.toString() != userId.toString()) {
    workspace.users = workspace.users.filter(
      (user) => user.toString() != userId.toString()
    );

    await workspace.save();
  } else {
    await workspace.deleteOne();
  }
};

const inviteUser = async (
  email: string,
  workspace_id: string,
  user_id: string
) => {
  /**
   * if the user exists on the db, send an invite with a lonk to join the workspace
   * if the user doesn't exist, send an invite with a link => /signup?redirect=join_workspace&workspace_id=...
   */

  const workspace = await Workspace.findOne({ _id: workspace_id }).populate(
    "users"
  );
  if (!workspace) throw new NotFoundError("Workspace does not exist");

  if (workspace.director.toString() != user_id.toString())
    throw new ForbiddenError("You are not the director of this organization");

  // check if the user already exist in the workspace

  const _userInWorkspace = workspace.users.find(
    (user) => (user as IUser).email === email
  );

  if (_userInWorkspace)
    throw new ForbiddenError("User already belongs to this workspace");

  // check if the user as already been invited

  const prevWorkspaceInvite = await WorkspaceInvitation.findOne({
    workspace: workspace._id,
    inviteeEmail: email,
  });

  if (prevWorkspaceInvite)
    throw new BadRequestError(
      "This user has already been invited to this workspace"
    );

  const newWorkspaceInvite = await WorkspaceInvitation.create({
    workspace: workspace._id,
    inviteeEmail: email,
  });

  // check if the user gangan exist without being in the workspace
  const user = await User.findOne({ email });

  if (!user) {
    await sendMail({
      to: email,
      subject: "Workspace Invitation",
      html: joinWorkspaceHTML(
        "",
        workspace,
        `${
          settings?.frontendUrl
        }/signup?redirect=join-workspace?invite_id=${newWorkspaceInvite._id.toString()}`
      ),
    });
  } else {
    await sendMail({
      to: email,
      subject: "Workspace Invitation",
      html: joinWorkspaceHTML(
        user.firstName,
        workspace,
        `${
          settings?.frontendUrl
        }/join-workspace?invite_id=${newWorkspaceInvite._id.toString()}`
      ),
    });
  }
};

const joinWithInvite = async (invite_id: string) => {
  const invitation = await WorkspaceInvitation.findById(invite_id);

  if (!invitation) throw new NotFoundError("Invitation link has expired");

  const workspace = await Workspace.findById(invitation.workspace);

  if (!workspace) throw new NotFoundError("Workspace does not exist");

  const user = await User.findOne({ email: invitation.inviteeEmail });

  if (!user) throw new NotFoundError("User does not exist");

  workspace.users = [...workspace.users, user._id.toString()];

  await workspace.save();
  await invitation.deleteOne();
};

const workspaceServices = {
  createWorkspace,
  leave,
  joinWithInvite,
  inviteUser,
  deleteOne,
  updateOne,
  findById,
  findMultiple,
};

export default workspaceServices;
