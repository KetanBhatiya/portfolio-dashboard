import { NextFunction, Request, Response } from "express";

import { APP_MESSAGES } from "../constants/app.constants";
import { portfolioService } from "../services/portfolio.service";
import { sendSuccessResponse } from "../utils/api-response";

export const getPortfolio = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const holdings = await portfolioService.getPortfolio();

    return sendSuccessResponse(res, APP_MESSAGES.PORTFOLIO_FETCHED, holdings);
  } catch (error) {
    return next(error);
  }
};
