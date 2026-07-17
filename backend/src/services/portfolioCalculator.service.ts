import { StockMarketData } from "../types/finance.types";
import { PortfolioHolding } from "../types/portfolio-holding.types";
import { PortfolioStock } from "../types/portfolio.types";

type MarketDataMap =
  | Map<string, StockMarketData | null>
  | Record<string, StockMarketData | null | undefined>;

const roundToTwoDecimals = (value: number): number => {
  return Math.round(value * 100) / 100;
};

const getMarketData = (
  marketDataMap: MarketDataMap,
  symbol: string,
): StockMarketData | null => {
  if (marketDataMap instanceof Map) {
    return marketDataMap.get(symbol) ?? null;
  }

  return marketDataMap[symbol] ?? null;
};

/**
 * Combines portfolio stocks with market data and calculates
 * investment, present value, gain/loss, and portfolio percentage.
 */
export const calculatePortfolioHoldings = (
  portfolioStocks: PortfolioStock[],
  marketDataMap: MarketDataMap,
): PortfolioHolding[] => {
  const investments = portfolioStocks.map((stock) =>
    roundToTwoDecimals(stock.purchasePrice * stock.quantity),
  );

  const totalInvestment = investments.reduce(
    (sum, investment) => sum + investment,
    0,
  );

  return portfolioStocks.map((stock, index) => {
    const investment = investments[index];
    const portfolioPercentage =
      totalInvestment > 0
        ? roundToTwoDecimals((investment / totalInvestment) * 100)
        : 0;

    const marketData = getMarketData(marketDataMap, stock.symbol);
    const currentMarketPrice = marketData?.currentMarketPrice ?? null;

    const hasMarketPrice = typeof currentMarketPrice === "number";

    const presentValue = hasMarketPrice
      ? roundToTwoDecimals(currentMarketPrice * stock.quantity)
      : null;

    const gainLoss =
      presentValue !== null
        ? roundToTwoDecimals(presentValue - investment)
        : null;

    return {
      stockName: stock.stockName,
      symbol: stock.symbol,
      sector: stock.sector,
      purchasePrice: stock.purchasePrice,
      quantity: stock.quantity,
      investment,
      portfolioPercentage,
      currentMarketPrice: hasMarketPrice ? currentMarketPrice : null,
      presentValue,
      gainLoss,
      peRatio: marketData?.peRatio ?? null,
      marketCap: marketData?.marketCap ?? null,
    };
  });
};
