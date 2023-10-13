import { Router } from "express";
import validate from "../validations";
import {
  CreateAccountInput,
  LoginInput,
  ResendVerificationEmailInput,
  VerifyEmailInput,
} from "../validations/auth.validations";
import authControllers from "../controllers/auth.controllers";

const router = Router();

router.post(
  "/register",
  validate(CreateAccountInput),
  authControllers.register
);
router.post(
  "/verify-account",
  validate(VerifyEmailInput),
  authControllers.verifyAccount
);

router.post(
  "/verify-account/resend-email",
  validate(ResendVerificationEmailInput),
  authControllers.resendVerificationEmail
);

router.post("/login", validate(LoginInput), authControllers.signIn);

export default router;
