import { Router } from "express";

import healthRouter from "./health.routes";
import portfolioRouter from "./portfolio.routes";

const router = Router();

router.use(healthRouter);
router.use(portfolioRouter);

export default router;
