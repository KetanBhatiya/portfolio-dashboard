import { Card } from "@/src/components/common/Card";
import { SectionHeader } from "@/src/components/common/SectionHeader";
import type { PortfolioHolding } from "@/types/portfolio";
import {
  formatCurrency,
  formatMarketCap,
  formatNumber,
  formatPercentage,
  gainLossClassName,
} from "@/utils/format";

export interface PortfolioTableProps {
  holdings: PortfolioHolding[];
}

const headerCellClass =
  "whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-800";

const bodyCellClass = "whitespace-nowrap px-4 py-3 text-zinc-900";

export function PortfolioTable({ holdings }: PortfolioTableProps) {
  return (
    <section className="w-full" aria-labelledby="holdings-heading">
      <SectionHeader
        id="holdings-heading"
        title="Portfolio Holdings"
        subtitle="Detailed view of every stock in your portfolio"
      />

      <Card className="overflow-hidden p-0 md:p-0">
        <div
          className="w-full overflow-x-auto"
          tabIndex={0}
          aria-label="Portfolio holdings table"
        >
          <table className="min-w-[1100px] w-full border-collapse text-left text-sm">
            <thead className="sticky top-0 z-20">
              <tr className="border-b border-zinc-200">
                <th
                  className={`${headerCellClass} sticky left-0 z-30 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)]`}
                >
                  Stock Name
                </th>
                <th className={headerCellClass}>Symbol</th>
                <th className={headerCellClass}>Sector</th>
                <th className={headerCellClass}>Purchase Price</th>
                <th className={headerCellClass}>Quantity</th>
                <th className={headerCellClass}>Investment</th>
                <th className={headerCellClass}>Portfolio %</th>
                <th className={headerCellClass}>Current Price</th>
                <th className={headerCellClass}>Present Value</th>
                <th className={headerCellClass}>Gain/Loss</th>
                <th className={headerCellClass}>P/E Ratio</th>
                <th className={headerCellClass}>Market Cap</th>
              </tr>
            </thead>

            <tbody>
              {holdings.map((holding, index) => {
                const isEven = index % 2 === 0;
                const rowBg = isEven ? "bg-white" : "bg-zinc-50";

                return (
                  <tr
                    key={`${holding.symbol}-${index}`}
                    className={`group border-b border-zinc-100 ${rowBg} transition-colors hover:bg-blue-50/70`}
                  >
                    <td
                      className={`${bodyCellClass} sticky left-0 z-10 font-medium text-zinc-900 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.06)] ${rowBg} group-hover:bg-blue-50`}
                    >
                      {holding.stockName}
                    </td>
                    <td className={bodyCellClass}>{holding.symbol}</td>
                    <td className={bodyCellClass}>{holding.sector}</td>
                    <td className={bodyCellClass}>
                      {formatCurrency(holding.purchasePrice)}
                    </td>
                    <td className={bodyCellClass}>
                      {formatNumber(holding.quantity)}
                    </td>
                    <td className={bodyCellClass}>
                      {formatCurrency(holding.investment)}
                    </td>
                    <td className={bodyCellClass}>
                      {formatPercentage(holding.portfolioPercentage)}
                    </td>
                    <td className={bodyCellClass}>
                      {formatCurrency(holding.currentMarketPrice)}
                    </td>
                    <td className={bodyCellClass}>
                      {formatCurrency(holding.presentValue)}
                    </td>
                    <td
                      className={`${bodyCellClass} ${gainLossClassName(holding.gainLoss)}`}
                    >
                      {formatCurrency(holding.gainLoss)}
                    </td>
                    <td className={bodyCellClass}>
                      {formatNumber(holding.peRatio)}
                    </td>
                    <td className={bodyCellClass}>
                      {formatMarketCap(holding.marketCap)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}
