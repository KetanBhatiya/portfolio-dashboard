import { SectionHeader } from "@/src/components/common/SectionHeader";

interface PortfolioHeaderProps {
  title?: string;
  subtitle?: string;
}

export function PortfolioHeader({
  title = "Portfolio Dashboard",
  subtitle = "Track holdings, sector allocation, and performance in one place.",
}: PortfolioHeaderProps) {
  return (
    <header className="w-full">
      <SectionHeader title={title} subtitle={subtitle} as="h1" />
    </header>
  );
}
