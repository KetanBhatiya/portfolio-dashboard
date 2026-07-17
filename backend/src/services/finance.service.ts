import YahooFinance from "yahoo-finance2";

import { StockMarketData } from "../types/finance.types";
import { logger } from "../utils/logger";

const YAHOO_QUOTE_FIELDS = [
  "symbol",
  "regularMarketPrice",
  "trailingPE",
  "marketCap",
] as const;

export class FinanceService {
  private readonly yahooFinance = new YahooFinance();

  private buildYahooTicker(symbol: string): string {
    const trimmed = symbol.trim();

    if (/^\d+$/.test(trimmed)) {
      return `${trimmed}.BO`;
    }

    return `${trimmed}.NS`;
  }

  async getStockMarketData(symbol: string): Promise<StockMarketData | null> {
    const originalSymbol = symbol.trim();

    if (!originalSymbol) {
      logger.warn("Skipping market data fetch for empty symbol");
      return null;
    }

    const yahooTicker = this.buildYahooTicker(originalSymbol);

    try {
      const quote = await this.yahooFinance.quote(yahooTicker, {
        fields: [...YAHOO_QUOTE_FIELDS],
      });

      if (!quote) {
        logger.warn("No market data returned for symbol", {
          symbol: yahooTicker,
        });
        return null;
      }

      const currentMarketPrice = quote.regularMarketPrice;

      if (typeof currentMarketPrice !== "number") {
        logger.warn("Market data response missing current price", {
          symbol: originalSymbol,
        });
        return null;
      }

      return {
        symbol: originalSymbol,
        currentMarketPrice,
        peRatio: typeof quote.trailingPE === "number" ? quote.trailingPE : null,
        marketCap: typeof quote.marketCap === "number" ? quote.marketCap : null,
      };
    } catch (error) {
      logger.error(
        `Failed to fetch market data for symbol: ${originalSymbol}`,
        error,
        { symbol: yahooTicker },
      );
      return null;
    }
  }
}

export const financeService = new FinanceService();
