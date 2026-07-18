import type { PortfolioHolding } from "@/types/portfolio";

export interface PortfolioTableProps {
  holdings: PortfolioHolding[];
}

export function PortfolioTable({ holdings }: PortfolioTableProps) {
  return (
    <section>
      <h2>Portfolio Holdings</h2>
      <table>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Symbol</th>
            <th>Sector</th>
            <th>Quantity</th>
            <th>Purchase Price</th>
            <th>Investment</th>
            <th>Portfolio %</th>
            <th>CMP</th>
            <th>Present Value</th>
            <th>Gain/Loss</th>
            <th>P/E</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding) => (
            <tr key={holding.symbol}>
              <td>{holding.stockName}</td>
              <td>{holding.symbol}</td>
              <td>{holding.sector}</td>
              <td>{holding.quantity}</td>
              <td>{holding.purchasePrice}</td>
              <td>{holding.investment}</td>
              <td>{holding.portfolioPercentage}</td>
              <td>{holding.currentMarketPrice ?? "—"}</td>
              <td>{holding.presentValue ?? "—"}</td>
              <td>{holding.gainLoss ?? "—"}</td>
              <td>{holding.peRatio ?? "—"}</td>
              <td>{holding.marketCap ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
