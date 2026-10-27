import type { ReactNode } from "react";
import { Breadcrumb, type Crumb } from "@/components/ui/breadcrumb";

interface Props {
  breadcrumb: Crumb[];
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
}

/* Intestazione uniforme delle pagine interne: percorso, etichetta, H1 e testo introduttivo su fondo chiaro. */
export function PageHeader({ breadcrumb, eyebrow, title, intro }: Props) {
  return (
    <header className="border-b border-border bg-surface-2">
      <div className="page-wrap flex flex-col gap-6 py-10 md:py-14">
        <Breadcrumb items={breadcrumb} />
        <div className="flex flex-col gap-4">
          {eyebrow && <p className="label-mono text-brand-strong">{eyebrow}</p>}
          <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.04]">{title}</h1>
          {intro && <div className="max-w-[60ch] text-lead text-ink-muted">{intro}</div>}
        </div>
      </div>
    </header>
  );
}
