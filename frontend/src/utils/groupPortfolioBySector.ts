import type { PortfolioHolding } from "@/types/portfolio";

export interface SectorAllocationSummary {
  sectorName: string;
  holdingsCount: number;
  totalInvestment: number;
  currentPortfolioValue: number;
  totalGainLoss: number;
  portfolioWeight: number;
}

export function groupPortfolioBySector(
  holdings: PortfolioHolding[],
): SectorAllocationSummary[] {
  const totalInvestment = holdings.reduce(
    (sum, holding) => sum + holding.investment,
    0,
  );

  const sectorMap = new Map<
    string,
    {
      holdingsCount: number;
      totalInvestment: number;
      currentPortfolioValue: number;
      totalGainLoss: number;
    }
  >();

  for (const holding of holdings) {
    const existing = sectorMap.get(holding.sector) ?? {
      holdingsCount: 0,
      totalInvestment: 0,
      currentPortfolioValue: 0,
      totalGainLoss: 0,
    };

    existing.holdingsCount += 1;
    existing.totalInvestment += holding.investment;

    if (holding.presentValue !== null) {
      existing.currentPortfolioValue += holding.presentValue;
    }

    if (holding.gainLoss !== null) {
      existing.totalGainLoss += holding.gainLoss;
    }

    sectorMap.set(holding.sector, existing);
  }

  return [...sectorMap.entries()]
    .map(([sectorName, aggregates]) => ({
      sectorName,
      holdingsCount: aggregates.holdingsCount,
      totalInvestment: aggregates.totalInvestment,
      currentPortfolioValue: aggregates.currentPortfolioValue,
      totalGainLoss: aggregates.totalGainLoss,
      portfolioWeight:
        totalInvestment === 0
          ? 0
          : (aggregates.totalInvestment / totalInvestment) * 100,
    }))
    .sort((a, b) => b.portfolioWeight - a.portfolioWeight);
}
