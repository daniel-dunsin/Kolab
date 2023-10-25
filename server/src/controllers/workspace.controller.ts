import { NextFunction, Request, Response } from "express";
import { IWorkspace } from "../interfaces/models/workspace.interface";
import workspaceServices from "../services/workspace.service";
import { IUser } from "../interfaces/models/user.interface";

const createWorkspace = async (
  req: Request<{}, {}, Partial<IWorkspace>>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, picture, description } = req.body;

    const userId = <string>req.userId;

    const data = await workspaceServices.createWorkspace({
      director: userId,
      name,
      picture,
      description,
    });

    res.status(201).json({ message: "Workspace created successfully", data });
  } catch (error) {
    return next(error);
  }
};

const editWorkspace = async (
  req: Request<{ id: string }, {}, Partial<IWorkspace>>,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.id;
    const { name, description, picture } = req.body;

    const updateQuery: Partial<IWorkspace> = {};

    if (name) updateQuery.name = name;
    if (description) updateQuery.description = description;
    if (picture) updateQuery.picture = picture;

    const data = await workspaceServices.updateOne(
      _id,
      req.userId as string,
      updateQuery
    );

    res.status(200).json({ message: "Workspace edited successfully", data });
  } catch (error) {
    return next(error);
  }
};

const deleteWorkspace = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const workspace_id = req.params.id;

    await workspaceServices.deleteOne(workspace_id, req.userId as string);

    res.status(200).json({ message: "Workspace deleted successfullly" });
  } catch (error) {
    return next(error);
  }
};

const leaveWorkspace = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const workspace_id = req.params.id;

    await workspaceServices.leave(req.userId as string, workspace_id);

    res
      .status(200)
      .json({ message: "You have successfully left this organization" });
  } catch (error) {
    return next(error);
  }
};

const getMyWorkspaces = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await workspaceServices.findMultiple({
      $or: [{ director: req.userId }, { users: req.userId }],
    });

    res.status(200).json({ message: "Workspaces fetched successfully", data });
  } catch (error) {
    return next(error);
  }
};

const getOneWorkspace = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const workspace_id = req.params.id;

    const data = await workspaceServices.findById(workspace_id);

    res.status(200).json({ message: "Workspace fetched successfully", data });
  } catch (error) {
    return next(error);
  }
};

const inviteUserToWorkspace = async (
  req: Request<{ id: string }, {}, { email: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const workspace_id = req.params.id;

    await workspaceServices.inviteUser(
      req.body.email as string,
      workspace_id,
      req.userId as string
    );

    res.status(200).json({
      message: "You have successfully invited this user to your workspace",
    });
  } catch (error) {
    return next(error);
  }
};

const joinWorkspace = async (
  req: Request<{}, {}, { invite_id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const invite_id = req.body.invite_id;

    await workspaceServices.joinWithInvite(invite_id);

    res
      .status(200)
      .json({ message: "You have successfully joined this workspace" });
  } catch (error) {
    return next(error);
  }
};

const workspaceControllers = {
  leaveWorkspace,
  createWorkspace,
  editWorkspace,
  deleteWorkspace,
  joinWorkspace,
  getMyWorkspaces,
  getOneWorkspace,
  inviteUserToWorkspace,
};

export default workspaceControllers;
