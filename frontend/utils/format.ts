const NULL_DISPLAY = "--";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

export function formatCurrency(value: number | null): string {
  if (value === null) return NULL_DISPLAY;
  return currencyFormatter.format(value);
}

export function formatPercentage(value: number | null): string {
  if (value === null) return NULL_DISPLAY;
  return `${value.toFixed(2)}%`;
}

export function formatNumber(value: number | null): string {
  if (value === null) return NULL_DISPLAY;
  return numberFormatter.format(value);
}

export function formatMarketCap(value: number | null): string {
  if (value === null) return NULL_DISPLAY;

  const CRORE = 10_000_000;
  const LAKH = 100_000;

  if (Math.abs(value) >= CRORE) {
    return `₹${numberFormatter.format(value / CRORE)} Cr`;
  }

  if (Math.abs(value) >= LAKH) {
    return `₹${numberFormatter.format(value / LAKH)} L`;
  }

  return currencyFormatter.format(value);
}

export function gainLossClassName(value: number | null): string {
  if (value === null) return "text-zinc-500";
  if (value > 0) return "text-green-600";
  if (value < 0) return "text-red-600";
  return "text-zinc-500";
}
