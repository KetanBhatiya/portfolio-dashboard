import type { PortfolioHolding } from "@/types/portfolio";
import { groupPortfolioBySector } from "@/src/utils/groupPortfolioBySector";
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
  gainLossClassName,
} from "@/utils/format";

export interface SectorAllocationProps {
  holdings: PortfolioHolding[];
}

function formatGainLoss(value: number): string {
  const formatted = formatCurrency(value);
  if (value > 0) return `+${formatted}`;
  return formatted;
}

export function SectorAllocation({ holdings }: SectorAllocationProps) {
  const sectors = groupPortfolioBySector(holdings);

  return (
    <section className="w-full">
      <h2 className="mb-3 text-lg font-semibold">Sector Allocation</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sectors.map((sector) => (
          <article
            key={sector.sectorName}
            className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
          >
            <h3 className="text-base font-semibold text-zinc-900">
              {sector.sectorName}
            </h3>

            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-zinc-500">Holdings</dt>
                <dd className="font-medium text-zinc-900">
                  {formatNumber(sector.holdingsCount)}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-3">
                <dt className="text-zinc-500">Investment</dt>
                <dd className="font-medium text-zinc-900">
                  {formatCurrency(sector.totalInvestment)}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-3">
                <dt className="text-zinc-500">Current Value</dt>
                <dd className="font-medium text-zinc-900">
                  {formatCurrency(sector.currentPortfolioValue)}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-3">
                <dt className="text-zinc-500">Gain/Loss</dt>
                <dd
                  className={`font-medium ${gainLossClassName(sector.totalGainLoss)}`}
                >
                  {formatGainLoss(sector.totalGainLoss)}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-3">
                <dt className="text-zinc-500">Portfolio Weight</dt>
                <dd className="font-medium text-zinc-900">
                  {formatPercentage(sector.portfolioWeight)}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
