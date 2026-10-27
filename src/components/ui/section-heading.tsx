import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
}

/* Intestazione di sezione: etichetta mono, titolo, testo introduttivo. */
export function SectionHeading({ eyebrow, title, intro, as: Tag = "h2", align = "left", className }: Props) {
  return (
    <header className={cn("flex flex-col gap-3", align === "center" && "items-center text-center", className)}>
      {eyebrow && <p className="label-mono text-brand-strong">{eyebrow}</p>}
      <Tag>{title}</Tag>
      {intro && <div className="max-w-[60ch] text-lead text-ink-muted">{intro}</div>}
    </header>
  );
}
