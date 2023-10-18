import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../enums/http.enum.js";
interface IResponse<T> {
  status: HttpStatus;
  message?: string;
  data: T;
  meta?: any;
}

export const sendResponse = <T>(
  res: Response,
  status: number,
  data: T,
  message?: string,
  meta?: any
) => {
  const response: IResponse<T> = {
    status,
    message,
    data,
    meta,
  };

  res.status(status).json(response);
};
