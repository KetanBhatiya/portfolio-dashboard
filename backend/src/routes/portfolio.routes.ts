import { Router } from "express";

import { getPortfolio } from "../controllers/portfolio.controller";
import { PORTFOLIO_ROUTE_PATH } from "../constants/app.constants";

const portfolioRouter = Router();

portfolioRouter.get(PORTFOLIO_ROUTE_PATH, getPortfolio);

export default portfolioRouter;
