import { NextFunction, Request, Response } from "express";

import { APP_MESSAGES } from "../constants/app.constants";
import { env } from "../config/env";
import { sendErrorResponse } from "../utils/api-response";
import { AppError } from "../utils/app-error";

export const globalErrorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return sendErrorResponse(
      res,
      error.message,
      error.statusCode,
      error.details,
      env.nodeEnv === "development" ? error.stack : undefined,
    );
  }

  // Unexpected errors are intentionally normalized so clients always receive
  // the same response shape.
  return sendErrorResponse(
    res,
    APP_MESSAGES.INTERNAL_SERVER_ERROR,
    500,
    undefined,
    env.nodeEnv === "development" ? error.stack : undefined,
  );
};
