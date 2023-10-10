import { Router } from "express";
import validate from "../validations";
import {
  CreateAccountInput,
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

export default router;
