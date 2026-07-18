import type { ReactNode } from "react";

export interface SummaryCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  valueColor?: string;
}

export function SummaryCard({
  title,
  value,
  icon,
  valueColor,
}: SummaryCardProps) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-zinc-500">{title}</p>
          <p
            className={`mt-1 truncate text-xl font-semibold ${valueColor ?? "text-zinc-900"}`}
          >
            {value}
          </p>
        </div>
        <div className="shrink-0 text-zinc-400" aria-hidden="true">
          {icon}
        </div>
      </div>
    </article>
  );
}
