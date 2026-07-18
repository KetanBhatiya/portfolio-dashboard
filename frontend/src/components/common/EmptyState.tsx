export interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = "No portfolio data available",
  description = "Once holdings are added to your portfolio, they will appear here.",
}: EmptyStateProps) {
  return (
    <div
      className="mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-4 rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm"
      role="status"
      aria-live="polite"
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-500"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
          />
        </svg>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      </div>
    </div>
  );
}
