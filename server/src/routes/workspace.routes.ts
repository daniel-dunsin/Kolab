import { Router } from "express";
import isAuth from "../middlewares/auth.middleware";
import validate from "../validations";
import {
  CreateWorkspaceInput,
  EditWorkspaceInput,
  InviteUserInput,
  JoinWorkspaceInput,
} from "../validations/workspace.validations";
import workspaceControllers from "../controllers/workspace.controller";

const router = Router();

router
  .route("/")
  .post(
    isAuth,
    validate(CreateWorkspaceInput),
    workspaceControllers.createWorkspace
  )
  .get(isAuth, workspaceControllers.getMyWorkspaces);
router
  .route("/:id")
  .put(isAuth, validate(EditWorkspaceInput), workspaceControllers.editWorkspace)
  .delete(isAuth, workspaceControllers.deleteWorkspace);
router.post(
  "/join",
  isAuth,
  validate(JoinWorkspaceInput),
  workspaceControllers.joinWorkspace
);
router.post(
  "/:id/invite",
  isAuth,
  validate(InviteUserInput),
  workspaceControllers.inviteUserToWorkspace
);
router.post("/:id/leave", isAuth, workspaceControllers.leaveWorkspace);
router.get(
  "/invite_id/:id",
  isAuth,
  workspaceControllers.getWorkspaceByInviteId
);

export default router;
