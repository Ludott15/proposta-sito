import Link from "next/link";
import { site } from "@/lib/content";
import { JsonLd } from "./json-ld";

export interface Crumb {
  label: string;
  href?: string;
}

/* Percorso di navigazione con dati strutturati BreadcrumbList. L'ultima voce è la pagina corrente. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  const base = site.url.replace(/\/$/, "");
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${base}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Percorso" className="text-sm text-ink-muted">
      <JsonLd data={schema} />
      <ol className="flex flex-wrap gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex gap-x-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="text-ink-muted no-underline hover:text-ink hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
