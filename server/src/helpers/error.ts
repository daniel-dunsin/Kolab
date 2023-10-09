import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class CustomError extends Error {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const routeNotFound = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(StatusCodes.NOT_FOUND).json({ error: "Route does not exist" });
};

export const errorHandler = async (
  error: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
};
