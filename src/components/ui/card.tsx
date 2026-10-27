import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col overflow-hidden rounded-md border border-border bg-surface", className)}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-3 p-5 md:p-6", className)} {...props} />;
}
