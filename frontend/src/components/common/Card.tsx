import type { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function Card({ children, className = "", ariaLabel }: CardProps) {
  return (
    <div
      aria-label={ariaLabel}
      className={`rounded-xl border border-zinc-200 bg-white p-4 shadow-sm md:p-5 ${className}`}
    >
      {children}
    </div>
  );
}
