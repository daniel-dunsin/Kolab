import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../constants/errors";
import { IAuth, IUser } from "../interfaces/models/user.interface";
import authService from "../services/auth.service";

const register = async (
  req: Request<{}, {}, Partial<IUser & IAuth>>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, lastName, firstName } = req.body;

    await authService.createAccount({ email, password, lastName, firstName });

    res.status(200).json({
      message: "Account created successfully, check verification email",
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return next(new BadRequestError("A user with this email already exists"));
    }

    return next(error);
  }
};

const verifyAccount = async (
  req: Request<{}, {}, { token: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;

    await authService.verifyEmail(token);

    res.status(200).json({ message: "Account verified successfully" });
  } catch (error) {
    return next(error);
  }
};

const authControllers = {
  verifyAccount,
  register,
};
export default authControllers;
