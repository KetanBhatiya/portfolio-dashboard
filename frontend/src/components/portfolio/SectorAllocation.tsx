import type { PortfolioHolding } from "@/types/portfolio";

export interface SectorAllocationProps {
  holdings: PortfolioHolding[];
}

export function SectorAllocation({ holdings }: SectorAllocationProps) {
  return (
    <section>
      <h2>Sector Allocation</h2>
      <p>{holdings.length} holdings</p>
    </section>
  );
}
