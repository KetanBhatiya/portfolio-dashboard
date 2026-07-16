import cors from "cors";
import express from "express";

import { API_BASE_PATH } from "./constants/app.constants";
import { globalErrorHandler } from "./middlewares/error.middleware";
import { notFoundHandler } from "./middlewares/not-found.middleware";
import apiRoutes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(API_BASE_PATH, apiRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
