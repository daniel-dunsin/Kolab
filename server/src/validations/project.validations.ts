import { object, string } from 'yup';

export const CreateProjectInput = object({
  body: object({
    name: string().required('Project name is required'),
  }),
});
