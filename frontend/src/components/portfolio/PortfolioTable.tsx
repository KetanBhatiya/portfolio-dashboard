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

export function PortfolioTable({ holdings }: PortfolioTableProps) {
  return (
    <section className="w-full">
      <h2 className="mb-3 text-lg font-semibold">Portfolio Holdings</h2>

      <div className="w-full overflow-x-auto">
        <table className="min-w-[1100px] w-full border-collapse text-left text-sm">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="border-b border-zinc-200">
              <th className="whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-800">
                Stock Name
              </th>
              <th className="whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-800">
                Symbol
              </th>
              <th className="whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-800">
                Sector
              </th>
              <th className="whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-800">
                Purchase Price
              </th>
              <th className="whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-800">
                Quantity
              </th>
              <th className="whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-800">
                Investment
              </th>
              <th className="whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-800">
                Portfolio %
              </th>
              <th className="whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-800">
                Current Price
              </th>
              <th className="whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-800">
                Present Value
              </th>
              <th className="whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-800">
                Gain/Loss
              </th>
              <th className="whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-800">
                P/E Ratio
              </th>
              <th className="whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-800">
                Market Cap
              </th>
            </tr>
          </thead>

          <tbody>
            {holdings.map((holding, index) => (
              <tr
                key={`${holding.symbol}-${index}`}
                className="border-b border-zinc-100"
              >
                <td className="whitespace-nowrap px-3 py-2">
                  {holding.stockName}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {holding.symbol}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {holding.sector}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {formatCurrency(holding.purchasePrice)}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {formatNumber(holding.quantity)}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {formatCurrency(holding.investment)}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {formatPercentage(holding.portfolioPercentage)}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {formatCurrency(holding.currentMarketPrice)}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {formatCurrency(holding.presentValue)}
                </td>
                <td
                  className={`whitespace-nowrap px-3 py-2 ${gainLossClassName(holding.gainLoss)}`}
                >
                  {formatCurrency(holding.gainLoss)}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {formatNumber(holding.peRatio)}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {formatMarketCap(holding.marketCap)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
