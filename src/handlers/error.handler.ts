import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { HttpStatus, getHttpStatusName } from "../enums/http.enum.js";
import { IError } from "../models/res.error.js";
import { ApiError } from "../models/api.error.js";
/* import { IS_PRODUCTION } from "../constants.js"; */

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = getHttpStatusName(status);
  let stack: unknown = undefined;

  if (error instanceof ApiError) {
    status = error.status;
    message = error.message;
    stack = error.meta;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    message = error.message;
   /*  if (IS_PRODUCTION) {
      stack = error.meta?.cause;
    } */
  }

  const response: IError = {
    error: getHttpStatusName(status),
    message: message,
    meta: stack,
  };

  res.status(status).json(response);
};
