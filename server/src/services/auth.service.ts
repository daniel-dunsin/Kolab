import { v4 } from "uuid";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../constants/errors";
import JwtHelper from "../helpers/jwt";
import sendMail from "../helpers/mailer";
import { IAuth, ITokenTypes, IUser } from "../interfaces/models/user.interface";
import { ILoginRes } from "../interfaces/responses/auth.response";
import Auth from "../models/auth.model";
import User from "../models/user.model";
import { verifyEmailHtml } from "../templates/verification-email";
import tokenService from "./token.service";

const createAccount = async (body: Partial<IUser & IAuth>) => {
  const { firstName, lastName, email, password } = body;

  await User.create({ firstName, lastName, email });
  await Auth.create({ email, password, isVerified: false });

  const token = await tokenService.createToken({
    email: email as string,
    tokenType: ITokenTypes.verifyAccountToken,
  });

  //   send verification email
  await sendMail({
    to: email,
    subject: "Account Verification Email",
    html: verifyEmailHtml({ firstName }, token.value),
  });
};

const resendVerificationEmail = async (email: string) => {
  const auth = await Auth.findOne({ email });

  if (!auth) throw new NotFoundError("User does not exist");
  if (auth.isVerified) throw new BadRequestError("Account is already verified");
  const user = await User.findOne<IUser>({ email });

  let newToken;

  const token = await tokenService.findToken({
    email,
    tokenType: ITokenTypes.verifyAccountToken,
  });

  if (token) {
    newToken = await tokenService.updateToken(
      { _id: token._id },
      { value: v4() }
    );
  } else {
    newToken = await tokenService.createToken({
      email,
      value: v4(),
      tokenType: ITokenTypes.verifyAccountToken,
    });
  }

  await sendMail({
    to: email,
    subject: "Account verification email",
    html: verifyEmailHtml({ firstName: user?.firstName }, newToken?.value),
  });
};

const verifyEmail = async (token: string) => {
  const tokenInDb = await tokenService.findToken({
    tokenType: ITokenTypes.verifyAccountToken,
    value: token,
  });

  if (!tokenInDb)
    throw new NotFoundError("Token does not exist or has expired");

  const auth = await Auth.findOne({ email: tokenInDb.email });

  if (!auth) throw new NotFoundError("User does not exist");

  if (auth.isVerified)
    throw new BadRequestError("User account is already verified");

  auth.isVerified = true;

  await auth.save();
};

const signIn = async (body: Partial<IAuth>): Promise<ILoginRes> => {
  const email = <string>body.email;
  const password = <string>body.password;

  const authInDb = await Auth.findOne({ email });

  if (!authInDb) throw new NotFoundError("User does not exist");

  if (!authInDb.isVerified) throw new ForbiddenError("Account is not verified");

  const user = <IUser>await User.findOne<IUser>({ email: authInDb.email });

  const isPasswordMatch = await authInDb.confirmPassword(password);

  if (!isPasswordMatch)
    throw new NotFoundError("Unable to login with provided credentials");

  const token = await JwtHelper.sign(user?._id as string);

  return {
    token,
    user,
  };
};

const authService = {
  createAccount,
  verifyEmail,
  signIn,
  resendVerificationEmail,
};

export default authService;
