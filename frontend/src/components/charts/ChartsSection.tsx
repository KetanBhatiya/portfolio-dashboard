"use client";

import { PortfolioPieChart } from "@/src/components/charts/PortfolioPieChart";
import { SectorPerformanceChart } from "@/src/components/charts/SectorPerformanceChart";
import { SectionHeader } from "@/src/components/common/SectionHeader";
import { groupPortfolioBySector } from "@/src/utils/groupPortfolioBySector";
import type { PortfolioHolding } from "@/types/portfolio";

export interface ChartsSectionProps {
  holdings: PortfolioHolding[];
}

export function ChartsSection({ holdings }: ChartsSectionProps) {
  const sectors = groupPortfolioBySector(holdings);

  return (
    <section className="w-full" aria-labelledby="analytics-heading">
      <SectionHeader
        id="analytics-heading"
        title="Portfolio Analytics"
        subtitle="Visual breakdown of allocation and sector performance"
      />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <PortfolioPieChart sectors={sectors} />
        <SectorPerformanceChart sectors={sectors} />
      </div>
    </section>
  );
}
