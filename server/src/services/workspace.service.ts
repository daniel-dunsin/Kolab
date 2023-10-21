import { FilterQuery, Types, UpdateQuery } from "mongoose";
import { IWorkspace } from "../interfaces/models/workspace.interface";
import Workspace from "../models/workspace.model";
import { ForbiddenError, NotFoundError } from "../constants/errors";
import { IUser } from "../interfaces/models/user.interface";

const createWorkspace = async (
  body: Partial<IWorkspace>
): Promise<IWorkspace> => {
  const { name, description, picture, director } = body;

  return await Workspace.create({
    name,
    description,
    picture,
    director,
  });
};

const findMultiple = async (
  filter: FilterQuery<IWorkspace>
): Promise<IWorkspace[]> => {
  return await Workspace.find(filter);
};

const findById = async (_id: Types.ObjectId | string): Promise<IWorkspace> => {
  const workspace = await Workspace.findById(_id);

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

  workspace.users = workspace.users.filter(
    (user) => user.toString() != userId.toString()
  );

  await workspace.save();
};

const inviteUser = async () => {};

/**
 * delete workspace
 * leave workspace
 * invite user
 * join with invite
 */

/**
 * For invite user,
 * if the user exists on the db, send an invite with a lonk to join the workspace
 * if the user doesn't exist, send an invite with a link => /signup?redirect=join_workspace&workspace_id=...
 */

const workspaceServices = {};

export default workspaceServices;
