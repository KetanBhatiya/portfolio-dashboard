import { Response } from "express";

import { ApiErrorDetails, ApiSuccessResponse } from "../types/api.types";

export const sendSuccessResponse = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode = 200,
) => {
  const payload: ApiSuccessResponse<T> = data === undefined
    ? { success: true, message }
    : { success: true, message, data };

  return res.status(statusCode).json(payload);
};

export const sendErrorResponse = (
  res: Response,
  message: string,
  statusCode = 500,
  details?: ApiErrorDetails,
  stack?: string,
) => {
  const payload = stack
    ? { success: false, message, details, stack }
    : { success: false, message, details };

  return res.status(statusCode).json(payload);
};
