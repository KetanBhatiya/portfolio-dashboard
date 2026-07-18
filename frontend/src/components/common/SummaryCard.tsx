import type { ReactNode } from "react";

export interface SummaryCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  subtitle?: string;
  valueColor?: string;
}

export function SummaryCard({
  title,
  value,
  icon,
  subtitle,
  valueColor,
}: SummaryCardProps) {
  return (
    <article
      aria-label={`${title}: ${value}`}
      className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition duration-200 hover:scale-[1.02] hover:shadow-md md:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-zinc-500">{title}</p>
          {subtitle ? (
            <p className="mt-0.5 text-xs text-zinc-400">{subtitle}</p>
          ) : null}
          <p
            className={`mt-2 truncate text-xl font-semibold ${valueColor ?? "text-zinc-900"}`}
          >
            {value}
          </p>
        </div>
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-50 text-zinc-500"
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>
    </article>
  );
}
