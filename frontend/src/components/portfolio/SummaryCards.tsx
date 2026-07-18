import type { PortfolioHolding } from "@/types/portfolio";

export interface SummaryCardsProps {
  holdings: PortfolioHolding[];
}

export function SummaryCards({ holdings }: SummaryCardsProps) {
  return (
    <section>
      <h2>Summary</h2>
      <p>{holdings.length} holdings</p>
    </section>
  );
}
