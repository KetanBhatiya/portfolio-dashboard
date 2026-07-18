"use client";

import { ChartsSection } from "@/src/components/charts/ChartsSection";
import { EmptyState } from "@/src/components/common/EmptyState";
import { ErrorState } from "@/src/components/common/ErrorState";
import { LoadingSkeleton } from "@/src/components/common/LoadingSkeleton";
import { PortfolioHeader } from "@/src/components/portfolio/PortfolioHeader";
import { PortfolioTable } from "@/src/components/portfolio/PortfolioTable";
import { SectorAllocation } from "@/src/components/portfolio/SectorAllocation";
import { SummaryCards } from "@/src/components/portfolio/SummaryCards";
import { usePortfolio } from "@/src/hooks/usePortfolio";

export function Dashboard() {
  const { data, loading, error, refetch } = usePortfolio();

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center p-4 md:p-6">
        <ErrorState
          message={
            error instanceof Error
              ? error.message
              : "Something went wrong while loading your portfolio."
          }
          onRetry={() => {
            void refetch();
          }}
        />
      </main>
    );
  }

  const holdings = data?.data ?? [];

  if (holdings.length === 0) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center p-4 md:p-6">
        <EmptyState />
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 bg-zinc-50 p-4 md:gap-10 md:p-6 lg:p-8">
      <PortfolioHeader />
      <SummaryCards holdings={holdings} />
      <ChartsSection holdings={holdings} />
      <SectorAllocation holdings={holdings} />
      <PortfolioTable holdings={holdings} />
    </main>
  );
}
