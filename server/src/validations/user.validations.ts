import { object, string } from 'yup';

export const EditProfileInput = object({
  body: object({
    firstName: string().required('Firstname is required'),
    lastName: string().required('Lastname is required'),
    profilePicture: string(),
  }),
});
