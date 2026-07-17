export interface PortfolioHolding {
  stockName: string;
  symbol: string;
  sector: string;
  purchasePrice: number;
  quantity: number;
  investment: number;
  portfolioPercentage: number;
  currentMarketPrice: number | null;
  presentValue: number | null;
  gainLoss: number | null;
  peRatio: number | null;
  marketCap: number | null;
}
