import dotenv from "dotenv";

import { NodeEnvironment } from "../types/api.types";

dotenv.config();

const port = Number(process.env.PORT ?? 5000);

if (Number.isNaN(port)) {
  throw new Error("PORT must be a valid number");
}

export const env = {
  port,
  nodeEnv: (process.env.NODE_ENV ?? "development") as NodeEnvironment,
};
