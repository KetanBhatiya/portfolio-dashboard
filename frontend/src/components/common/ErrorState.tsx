export interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export function ErrorState({
  message = "Something went wrong while loading your portfolio.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className="mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-4 rounded-xl border border-red-100 bg-white p-8 text-center shadow-sm"
      role="alert"
      aria-live="assertive"
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600"
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
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-zinc-900">
          Unable to load portfolio
        </h2>
        <p className="mt-1 text-sm text-zinc-500">{message}</p>
      </div>

      <button
        type="button"
        onClick={onRetry}
        aria-label="Retry loading portfolio data"
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
      >
        Retry
      </button>
    </div>
  );
}
