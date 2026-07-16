import { Router } from "express";

import { getHealthStatus } from "../controllers/health.controller";
import { HEALTH_ROUTE_PATH } from "../constants/app.constants";

const healthRouter = Router();

healthRouter.get(HEALTH_ROUTE_PATH, getHealthStatus);

export default healthRouter;
