import type { ReactNode } from "react";
import type { Crumb } from "@/components/ui/breadcrumb";
import { PageHeader } from "./page-header";

/* Pagina di testo: intestazione di pagina e colonna di lettura da 68ch circa. */
export function TextPage({
  breadcrumb,
  eyebrow,
  title,
  intro,
  children,
}: {
  breadcrumb: Crumb[];
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader breadcrumb={breadcrumb} eyebrow={eyebrow} title={title} intro={intro} />
      <article className="page-wrap py-16 md:py-24">
        <div className="mx-auto flex max-w-[68ch] flex-col gap-12">{children}</div>
      </article>
    </>
  );
}

export function TextSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4">
      <h2 id={id} className="text-2xl">
        {title}
      </h2>
      <div className="flex flex-col gap-4 text-[16px] leading-[1.65]">{children}</div>
    </section>
  );
}
