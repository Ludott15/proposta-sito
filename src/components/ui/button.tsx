import type { ComponentProps } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold no-underline whitespace-nowrap transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-strong text-white hover:bg-brand-strong/90",
  secondary: "bg-surface text-ink border border-border hover:bg-surface-2",
  ghost: "bg-transparent text-brand-strong hover:bg-brand-soft",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-13 px-6 text-lg",
};

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type Common = { variant?: ButtonVariant; size?: ButtonSize };

export function Button({ variant, size, className, type = "button", ...props }: Common & ComponentProps<"button">) {
  return <button type={type} className={buttonClass(variant, size, className)} {...props} />;
}

/* Link interno con lo stile di un bottone. */
export function ButtonLink({ variant, size, className, ...props }: Common & ComponentProps<typeof Link>) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}

/* Link esterno o telefono con lo stile di un bottone. */
export function ButtonAnchor({ variant, size, className, ...props }: Common & ComponentProps<"a">) {
  return <a className={buttonClass(variant, size, className)} {...props} />;
}
