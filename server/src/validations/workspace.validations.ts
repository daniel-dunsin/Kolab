import { object, string } from "yup";

export const CreateWorkspaceInput = object({
  body: object({
    name: string().required("Workspace name is required"),
    description: string().required("Description is required"),
    picture: string().notRequired(),
  }),
});

export const EditWorkspaceInput = object({
  body: object({
    name: string().notRequired(),
    description: string().notRequired(),
    picture: string().notRequired(),
  }),
  params: object({
    id: string().required(),
  }),
});

export const JoinWorkspaceInput = object({
  body: object({
    invite_id: string().required("Invite Id is required"),
  }),
});

export const InviteUserInput = object({
  body: object({
    email: string().required("Email is required"),
  }),
});
