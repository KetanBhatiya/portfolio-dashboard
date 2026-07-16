import { NextFunction, Request, Response } from "express";

import { APP_MESSAGES } from "../constants/app.constants";
import { AppError } from "../utils/app-error";

export const notFoundHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  next(new AppError(APP_MESSAGES.ROUTE_NOT_FOUND, 404));
};
