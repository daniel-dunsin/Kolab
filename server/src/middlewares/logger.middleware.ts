import { NextFunction, Request, Response } from "express";
import logger from "../helpers/logger";

const loggerMiddleware = (req: Request, _: Response, next: NextFunction) => {
  logger.info(
    `@route=>${req.url}, @method=>${req.method}, @timestamp=>${Date.now()}`
  );
  next();
};

export default loggerMiddleware;
