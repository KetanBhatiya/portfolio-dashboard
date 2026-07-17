import path from "path";

import { env } from "../config/env";
import { StockMarketData } from "../types/finance.types";
import { PortfolioHolding } from "../types/portfolio-holding.types";
import { PortfolioStock } from "../types/portfolio.types";
import { AppError } from "../utils/app-error";
import { logger } from "../utils/logger";
import { parsePortfolioExcel } from "./excelParser.service";
import { financeService } from "./finance.service";
import { calculatePortfolioHoldings } from "./portfolioCalculator.service";

export class PortfolioService {
  async getPortfolio(): Promise<PortfolioHolding[]> {
    try {
      const filePath = this.resolveExcelFilePath();

      logger.info("Resolving portfolio Excel file", { filePath });

      const portfolioStocks = parsePortfolioExcel(filePath);

      logger.info("Parsed portfolio stocks from Excel", {
        count: portfolioStocks.length,
      });

      const marketDataMap = await this.buildMarketDataMap(portfolioStocks);

      logger.info("Fetched market data for portfolio symbols", {
        requested: portfolioStocks.length,
        available: [...marketDataMap.values()].filter(Boolean).length,
      });

      const holdings = calculatePortfolioHoldings(
        portfolioStocks,
        marketDataMap,
      );

      logger.info("Calculated portfolio holdings", {
        count: holdings.length,
      });

      return holdings;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      logger.error("Unexpected error while building portfolio", error);
      throw new AppError("Failed to build portfolio", 500);
    }
  }

  private resolveExcelFilePath(): string {
    return path.resolve(env.portfolioExcelPath);
  }

  private async buildMarketDataMap(
    portfolioStocks: PortfolioStock[],
  ): Promise<Map<string, StockMarketData | null>> {
    const uniqueSymbols = [
      ...new Set(portfolioStocks.map((stock) => stock.symbol)),
    ];

    const marketDataEntries = await Promise.all(
      uniqueSymbols.map(async (symbol) => {
        const marketData = await financeService.getStockMarketData(symbol);
        return [symbol, marketData] as const;
      }),
    );

    return new Map<string, StockMarketData | null>(marketDataEntries);
  }
}

export const portfolioService = new PortfolioService();
