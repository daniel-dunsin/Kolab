import { CustomError } from "../helpers/error";
import { StatusCodes } from "http-status-codes";

export class UnAuthorizedError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
    this.name = "UnAuthorizedError";
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
    this.name = "NotFoundError";
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
    this.name = "ForbiddenError";
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
    this.name = "BadRequestError";
  }
}
