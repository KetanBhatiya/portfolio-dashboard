import { Request, Response } from "express";

import { APP_MESSAGES } from "../constants/app.constants";
import { sendSuccessResponse } from "../utils/api-response";

export const getHealthStatus = async (_req: Request, res: Response) => {
  return sendSuccessResponse(res, APP_MESSAGES.HEALTH_OK);
};
