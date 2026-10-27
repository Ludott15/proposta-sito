import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { fieldClass } from "./input";

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(fieldClass, "py-3", className)} {...props} />;
}
