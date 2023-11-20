import { FilterQuery, Types, UpdateQuery } from 'mongoose';
import { IWorkspace, IWorkspaceInvitation } from '../interfaces/models/workspace.interface';
import Workspace from '../models/workspace.model';
import { BadRequestError, NotFoundError } from '../constants/errors';
import { IUser } from '../interfaces/models/user.interface';
import User from '../models/user.model';
import sendMail from '../helpers/mailer';
import { joinWorkspaceHTML } from '../templates/join-workspace';
import settings from '../constants/settings';
import WorkspaceInvitation from '../models/workspace-invitation.model';
import WorkspaceMember from '../models/workspace-member.model';
import { CreateWorkspaceDTO } from '../interfaces/dto/workspace.dto';

const createWorkspace = async (body: CreateWorkspaceDTO): Promise<IWorkspace> => {
  const { name, director } = body;

  const workspace = await Workspace.create({
    name,
    director,
  });

  await WorkspaceMember.create({
    userId: director,
    isDirector: true,
    workspaceId: workspace?._id,
  });

  return workspace;
};

const findMultiple = async (filter: FilterQuery<IWorkspace>): Promise<IWorkspace[]> => {
  return await Workspace.find(filter).populate('director');
};

const findUserWorkspaces = async (userId: string): Promise<IWorkspace[]> => {
  const _isMemberWorkspace = await WorkspaceMember.find({ userId });

  const workspaces: IWorkspace[] = [];

  for (const isMember of _isMemberWorkspace) {
    const workspace = await Workspace.findById<IWorkspace>(isMember.workspaceId).populate('director');

    workspaces.push(workspace as IWorkspace);
  }

  return workspaces;
};

const findById = async (_id: Types.ObjectId | string): Promise<IWorkspace> => {
  const workspace = await Workspace.findById(_id).populate('director');

  if (!workspace) throw new NotFoundError('Workspace does not exist');

  return workspace;
};

const updateOne = async (
  _id: Types.ObjectId | string,
  initiator: Types.ObjectId | string,
  update: UpdateQuery<IWorkspace>
): Promise<IWorkspace> => {
  const workspace = await Workspace.findOne({ _id });

  if (!workspace) throw new NotFoundError('Workspace does not exist');

  if (workspace.director.toString() != initiator.toString())
    throw new BadRequestError('Workspace does not belong to you');

  return (await Workspace.findOneAndUpdate({ _id }, update, {
    new: true,
  })) as IWorkspace;
};

const leave = async (userId: string, workspaceId: string) => {
  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) throw new NotFoundError('Workspace does not exist');

  // if the director leaves, delete the organization
  if (workspace.director.toString() != userId.toString()) {
    await WorkspaceMember.deleteOne({ userId, workspaceId: workspace?._id });
    await workspace.save();
  } else {
    await WorkspaceMember.deleteMany({ workspaceId: workspace?._id });
    await workspace.deleteOne();
  }
};

const findByInviteId = async (invite_id: string) => {
  const invitation = await WorkspaceInvitation.findById<IWorkspaceInvitation>(invite_id);

  const workspace = await Workspace.findById(invitation?.workspace).populate('director');

  return workspace;
};

const inviteUser = async (email: string, workspace_id: string, user_id: string) => {
  /**
   * if the user exists on the db, send an invite with a lonk to join the workspace
   * if the user doesn't exist, send an invite with a link => /signup?redirect=join_workspace&workspace_id=...
   */

  const workspace = await Workspace.findOne({ _id: workspace_id }).populate('director');

  if (!workspace) throw new NotFoundError('Workspace does not exist');

  if ((workspace.director as IUser)._id.toString() != user_id.toString())
    throw new BadRequestError('You are not the director of this organization');

  // check if the user already exist in the workspace
  const user = await User.findOne({ email });

  const _userInWorkspace = await WorkspaceMember.findOne({ userId: user?._id, workspaceId: workspace?._id });

  if (_userInWorkspace) throw new BadRequestError('User already belongs to this workspace');

  // check if the user as already been invited

  const prevWorkspaceInvite = await WorkspaceInvitation.findOne({
    workspace: workspace._id,
    inviteeEmail: email,
  });

  if (prevWorkspaceInvite) throw new BadRequestError('This user has already been invited to this workspace');

  const newWorkspaceInvite = await WorkspaceInvitation.create({
    workspace: workspace._id,
    inviteeEmail: email,
  });

  await sendMail({
    to: email,
    subject: 'Workspace Invitation',
    html: joinWorkspaceHTML(
      user?.firstName || '',
      workspace,
      `${settings?.frontendUrl}/login?redirect=join-workspace&invite_id=${newWorkspaceInvite._id.toString()}`
    ),
  });
};

const joinWithInvite = async (invite_id: string) => {
  const invitation = await WorkspaceInvitation.findById(invite_id);

  if (!invitation) throw new NotFoundError('Invitation link has expired');

  const workspace = await Workspace.findById(invitation.workspace);

  if (!workspace) throw new NotFoundError('Workspace does not exist');

  const user = await User.findOne({ email: invitation.inviteeEmail });

  if (!user) throw new NotFoundError('User has not created an account');

  await WorkspaceMember.create({ workspaceId: workspace._id, userId: user._id });
  await invitation.deleteOne();
};

const deleteWorkspace = async (workspaceId: string, userId: string) => {
  const workspace = await Workspace.findOne({ _id: workspaceId });

  if (!workspace) throw new NotFoundError('Workspace does not exist');
  if (workspace.director.toString() != userId.toString())
    throw new BadRequestError("You're not the director of this workspace");

  await WorkspaceMember.deleteMany({ workspaceId });
  await WorkspaceInvitation.deleteMany({ workspace: workspaceId });
  await workspace.deleteOne();
};

const workspaceServices = {
  createWorkspace,
  leave,
  findByInviteId,
  joinWithInvite,
  findUserWorkspaces,
  inviteUser,
  deleteWorkspace,
  updateOne,
  findById,
  findMultiple,
};

export default workspaceServices;
