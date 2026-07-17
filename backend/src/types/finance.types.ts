export interface StockMarketData {
  symbol: string;
  currentMarketPrice: number | null;
  peRatio: number | null;
  marketCap: number | null;
}
