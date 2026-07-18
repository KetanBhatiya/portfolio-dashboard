"use client";

import { PortfolioPieChart } from "@/src/components/charts/PortfolioPieChart";
import { SectorPerformanceChart } from "@/src/components/charts/SectorPerformanceChart";
import type { PortfolioHolding } from "@/types/portfolio";
import { groupPortfolioBySector } from "@/src/utils/groupPortfolioBySector";

export interface ChartsSectionProps {
  holdings: PortfolioHolding[];
}

export function ChartsSection({ holdings }: ChartsSectionProps) {
  const sectors = groupPortfolioBySector(holdings);

  return (
    <section className="w-full">
      <h2 className="mb-3 text-lg font-semibold">Portfolio Analytics</h2>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <PortfolioPieChart sectors={sectors} />
        <SectorPerformanceChart sectors={sectors} />
      </div>
    </section>
  );
}
