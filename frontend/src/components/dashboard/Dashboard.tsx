"use client";

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
    <main>
      <PortfolioHeader />
      <SummaryCards holdings={holdings} />
      <SectorAllocation holdings={holdings} />
      <PortfolioTable holdings={holdings} />
    </main>
  );
}
