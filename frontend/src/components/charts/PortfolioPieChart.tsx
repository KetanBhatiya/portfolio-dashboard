"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
} from "recharts";

import { Card } from "@/src/components/common/Card";
import type { SectorAllocationSummary } from "@/src/utils/groupPortfolioBySector";
import { formatCurrency, formatPercentage } from "@/utils/format";

export interface PortfolioPieChartProps {
  sectors: SectorAllocationSummary[];
}

const CHART_COLORS = [
  "#2563eb",
  "#16a34a",
  "#ca8a04",
  "#dc2626",
  "#9333ea",
  "#0891b2",
  "#ea580c",
  "#4f46e5",
];

function PieTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  const sector = payload[0].payload as SectorAllocationSummary;

  return (
    <div className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm">
      <p className="font-medium text-zinc-900">{sector.sectorName}</p>
      <p className="text-zinc-600">
        Investment: {formatCurrency(sector.totalInvestment)}
      </p>
      <p className="text-zinc-600">
        Current Value: {formatCurrency(sector.currentPortfolioValue)}
      </p>
      <p className="text-zinc-600">
        Portfolio Weight: {formatPercentage(sector.portfolioWeight)}
      </p>
    </div>
  );
}

export function PortfolioPieChart({ sectors }: PortfolioPieChartProps) {
  return (
    <Card
      ariaLabel="Sector allocation pie chart"
      className="flex h-80 flex-col"
    >
      <h3 className="mb-2 text-sm font-medium text-zinc-700">
        Sector Allocation
      </h3>
      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sectors}
              dataKey="portfolioWeight"
              nameKey="sectorName"
              cx="50%"
              cy="50%"
              outerRadius="70%"
              label={({ sectorName, portfolioWeight }) =>
                `${sectorName} ${Number(portfolioWeight).toFixed(2)}%`
              }
            >
              {sectors.map((sector, index) => (
                <Cell
                  key={sector.sectorName}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
