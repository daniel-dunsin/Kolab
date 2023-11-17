import { object, string } from 'yup';

export const TodoInput = object({
  body: object({
    text: string().required('Text is required'),
  }),
});
