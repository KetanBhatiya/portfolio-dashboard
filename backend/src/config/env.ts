import path from "path";

import dotenv from "dotenv";

import { NodeEnvironment } from "../types/api.types";

dotenv.config();

const port = Number(process.env.PORT ?? 5000);

if (Number.isNaN(port)) {
  throw new Error("PORT must be a valid number");
}

const defaultPortfolioExcelPath = path.join(process.cwd(), "ED27C0F2.xlsx");

export const env = {
  port,
  nodeEnv: (process.env.NODE_ENV ?? "development") as NodeEnvironment,
  portfolioExcelPath:
    process.env.PORTFOLIO_EXCEL_PATH ?? defaultPortfolioExcelPath,
};
