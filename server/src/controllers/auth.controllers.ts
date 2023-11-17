import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../constants/errors';
import { IAuth, IUser } from '../interfaces/models/user.interface';
import authService from '../services/auth.service';
import { CreateAccountDTO, SignInDTO } from '../interfaces/dto/auth.dto';

const register = async (req: Request<{}, {}, CreateAccountDTO>, res: Response, next: NextFunction) => {
  try {
    const { email, password, lastName, firstName } = req.body;

    await authService.createAccount({ email, password, lastName, firstName });

    res.status(200).json({
      message: 'Account created successfully, check verification email',
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return next(new BadRequestError('A user with this email already exists'));
    }

    return next(error);
  }
};

const resendVerificationEmail = async (req: Request<{}, {}, { email: string }>, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    await authService.resendVerificationEmail(email);

    res.status(200).json({ message: 'verification email sent' });
    ``;
  } catch (error) {
    return next(error);
  }
};

const verifyAccount = async (req: Request<{}, {}, { token: string }>, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;

    await authService.verifyEmail(token);

    res.status(200).json({ message: 'Account verified successfully' });
  } catch (error) {
    return next(error);
  }
};

const signIn = async (req: Request<{}, {}, SignInDTO>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const data = await authService.signIn({ email, password });

    res.status(200).json({
      message: 'Log in successful',
      data: { user: data.user, accessToken: data.token },
    });
  } catch (error) {
    return next(error);
  }
};

const authControllers = {
  verifyAccount,
  register,
  signIn,
  resendVerificationEmail,
};
export default authControllers;
