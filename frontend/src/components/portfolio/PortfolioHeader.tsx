interface PortfolioHeaderProps {
  title?: string;
}

export function PortfolioHeader({
  title = "Portfolio Dashboard",
}: PortfolioHeaderProps) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}
