import { array, object, string } from 'yup';

export const CreateIssueInput = object({
  body: object({
    title: string().required('Title is required'),
    description: string().required('Description is required'),
    userId: string().required('userId is required'),
    projectId: string().required('projectId is required'),
    attachments: array(string()).default([]),
  }),
});
