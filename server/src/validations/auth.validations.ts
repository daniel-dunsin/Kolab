import { object, string } from "yup";

export const CreateAccountInput = object({
  body: object({
    firstName: string().required("firstName is required"),
    email: string()
      .email("provide a valid email")
      .required("email is required"),
    lastName: string().notRequired(),
    password: string()
      .required("Password is required")
      .min(8, "Password should not be less than 8 characters"),
  }),
});

export const VerifyEmailInput = object({
  body: object({
    token: string().required("Token is required"),
  }),
});
