import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Tone = "brand" | "neutral";

const tones: Record<Tone, string> = {
  brand: "bg-brand-soft text-brand-strong",
  neutral: "bg-surface-2 text-ink-muted",
};

export function Badge({ tone = "neutral", className, ...props }: ComponentProps<"span"> & { tone?: Tone }) {
  return (
    <span
      className={cn("label-mono inline-flex items-center rounded-full px-3 py-1", tones[tone], className)}
      {...props}
    />
  );
}
