import { object, string } from 'yup';

export const EmailMemberInput = object({
  body: object({
    email: string().email('Enter a valid email').required('Email is required'),
    message: string().required('Enter message'),
    subject: string().required('Enter subject'),
  }),
});
