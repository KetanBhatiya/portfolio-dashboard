import type { ReactNode } from "react";

import { SectionHeader } from "@/src/components/common/SectionHeader";
import { SummaryCard } from "@/src/components/common/SummaryCard";
import type { PortfolioHolding } from "@/types/portfolio";
import {
  formatCurrency,
  formatNumber,
  gainLossClassName,
} from "@/utils/format";

export interface SummaryCardsProps {
  holdings: PortfolioHolding[];
}

function InvestmentIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
      />
    </svg>
  );
}

function PortfolioValueIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
      />
    </svg>
  );
}

function GainLossIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
      />
    </svg>
  );
}

function HoldingsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
      />
    </svg>
  );
}

interface SummaryItem {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
  valueColor?: string;
}

export function SummaryCards({ holdings }: SummaryCardsProps) {
  const totalInvestment = holdings.reduce(
    (sum, holding) => sum + holding.investment,
    0,
  );

  const currentPortfolioValue = holdings.reduce(
    (sum, holding) =>
      holding.presentValue === null ? sum : sum + holding.presentValue,
    0,
  );

  const totalGainLoss = holdings.reduce(
    (sum, holding) =>
      holding.gainLoss === null ? sum : sum + holding.gainLoss,
    0,
  );

  const totalHoldings = holdings.length;

  const cards: SummaryItem[] = [
    {
      title: "Total Investment",
      subtitle: "Capital deployed across holdings",
      value: formatCurrency(totalInvestment),
      icon: <InvestmentIcon />,
    },
    {
      title: "Current Portfolio Value",
      subtitle: "Marked-to-market value",
      value: formatCurrency(currentPortfolioValue),
      icon: <PortfolioValueIcon />,
    },
    {
      title: "Total Gain/Loss",
      subtitle: "Unrealized performance",
      value: formatCurrency(totalGainLoss),
      icon: <GainLossIcon />,
      valueColor: gainLossClassName(totalGainLoss),
    },
    {
      title: "Total Holdings",
      subtitle: "Stocks in portfolio",
      value: formatNumber(totalHoldings),
      icon: <HoldingsIcon />,
    },
  ];

  return (
    <section className="w-full" aria-labelledby="summary-heading">
      <SectionHeader
        id="summary-heading"
        title="Summary"
        subtitle="Key portfolio metrics at a glance"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <SummaryCard
            key={card.title}
            title={card.title}
            subtitle={card.subtitle}
            value={card.value}
            icon={card.icon}
            valueColor={card.valueColor}
          />
        ))}
      </div>
    </section>
  );
}
