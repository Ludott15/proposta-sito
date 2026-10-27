import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { fieldClass } from "./input";

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select className={cn(fieldClass, "h-11 pr-8", className)} {...props}>
      {children}
    </select>
  );
}
