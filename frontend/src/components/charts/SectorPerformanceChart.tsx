"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from "recharts";

import type { SectorAllocationSummary } from "@/src/utils/groupPortfolioBySector";
import { formatCurrency } from "@/utils/format";

export interface SectorPerformanceChartProps {
  sectors: SectorAllocationSummary[];
}

function BarTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  const sector = payload[0].payload as SectorAllocationSummary;

  return (
    <div className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm">
      <p className="font-medium text-zinc-900">{label}</p>
      <p className="text-zinc-600">
        Investment: {formatCurrency(sector.totalInvestment)}
      </p>
      <p className="text-zinc-600">
        Current Value: {formatCurrency(sector.currentPortfolioValue)}
      </p>
      <p className="text-zinc-600">
        Gain/Loss: {formatCurrency(sector.totalGainLoss)}
      </p>
    </div>
  );
}

export function SectorPerformanceChart({
  sectors,
}: SectorPerformanceChartProps) {
  return (
    <div className="h-80 w-full rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-sm font-medium text-zinc-700">
        Sector Performance
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={sectors}
          margin={{ top: 8, right: 8, left: 8, bottom: 48 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis
            dataKey="sectorName"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-25}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(value: number) =>
              new Intl.NumberFormat("en-IN", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(value)
            }
          />
          <Tooltip content={<BarTooltip />} />
          <Legend />
          <Bar
            dataKey="totalInvestment"
            name="Investment"
            fill="#2563eb"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="currentPortfolioValue"
            name="Current Value"
            fill="#16a34a"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
