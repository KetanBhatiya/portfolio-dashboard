export interface LoadingSkeletonProps {
  className?: string;
}

function SkeletonBlock({ className = "" }: LoadingSkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-zinc-200 ${className}`}
      aria-hidden="true"
    />
  );
}

export function LoadingSkeleton() {
  return (
    <div
      className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-6"
      role="status"
      aria-label="Loading portfolio dashboard"
      aria-live="polite"
    >
      <div className="space-y-2">
        <SkeletonBlock className="h-8 w-64" />
        <SkeletonBlock className="h-4 w-80 max-w-full" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonBlock key={index} className="h-28 w-full rounded-xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SkeletonBlock className="h-80 w-full rounded-xl" />
        <SkeletonBlock className="h-80 w-full rounded-xl" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonBlock key={index} className="h-48 w-full rounded-xl" />
        ))}
      </div>

      <SkeletonBlock className="h-64 w-full rounded-xl" />

      <span className="sr-only">Loading portfolio data…</span>
    </div>
  );
}
