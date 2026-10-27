import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const fieldClass =
  "w-full min-w-0 rounded-md border border-border-control bg-surface px-3.5 text-base text-ink placeholder:text-ink-muted transition-colors focus-visible:border-brand-strong focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-strong/20 disabled:opacity-50";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(fieldClass, "h-11", className)} {...props} />;
}
