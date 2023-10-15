import { NextFunction, Request } from "express";
import { UnAuthorizedError } from "../constants/errors";
import JwtHelper from "../helpers/jwt";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnAuthorizedError(
        "Provide auth header in this format => `Bearer {accessToken}`"
      );
    }

    const authToken = authHeader?.split(" ")[1];

    if (!authToken) {
      throw new UnAuthorizedError("Provide auth token after Bearer ");
    }

    const decoded = await JwtHelper.verify<{ userId: string }>(authToken);

    if (!decoded) {
      throw new UnAuthorizedError("Invalid/expired token");
    }

    req.userId = decoded?.userId;

    next();
  } catch (error) {
    return next(error);
  }
};

export default isAuth;
