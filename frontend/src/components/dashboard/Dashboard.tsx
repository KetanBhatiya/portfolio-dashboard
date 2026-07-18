"use client";

import { ChartsSection } from "@/src/components/charts/ChartsSection";
import { PortfolioHeader } from "@/src/components/portfolio/PortfolioHeader";
import { PortfolioTable } from "@/src/components/portfolio/PortfolioTable";
import { SectorAllocation } from "@/src/components/portfolio/SectorAllocation";
import { SummaryCards } from "@/src/components/portfolio/SummaryCards";
import { usePortfolio } from "@/src/hooks/usePortfolio";

export function Dashboard() {
  const { data, loading, error } = usePortfolio();

  if (loading) {
    return <p>Loading portfolio...</p>;
  }

  if (error) {
    return (
      <p>
        Failed to load portfolio:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </p>
    );
  }

  const holdings = data?.data ?? [];

  if (holdings.length === 0) {
    return <p>No portfolio holdings available.</p>;
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-6">
      <PortfolioHeader />
      <SummaryCards holdings={holdings} />
      <ChartsSection holdings={holdings} />
      <SectorAllocation holdings={holdings} />
      <PortfolioTable holdings={holdings} />
    </main>
  );
}
