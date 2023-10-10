import { BadRequestError, NotFoundError } from "../constants/errors";
import sendMail from "../helpers/mailer";
import { IAuth, ITokenTypes, IUser } from "../interfaces/models/user.interface";
import Auth from "../models/auth.model";
import User from "../models/user.model";
import { verifyEmailHtml } from "../templates/verificationEmail";
import tokenService from "./token.service";

const createAccount = async (body: Partial<IUser & IAuth>) => {
  const { firstName, lastName, email, password } = body;

  await User.create({ firstName, lastName, email });
  await Auth.create({ email, password });

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

const authService = {
  createAccount,
  verifyEmail,
};

export default authService;
