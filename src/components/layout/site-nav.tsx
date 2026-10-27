"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { iconaProdotto } from "@/components/catalog/product-icons";

interface Voce {
  slug: string;
  nome: string;
}

const voci = [
  { href: "/servizi", label: "Servizi" },
  { href: "/lavori", label: "Lavori" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/contatti", label: "Contatti" },
];

function isAttivo(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/* Navigazione desktop. Il menu Prodotti è CSS puro (hover e focus) e mostra un'icona per voce. */
export function SiteNav({ prodotti }: { prodotti: Voce[] }) {
  const pathname = usePathname();
  const prodottiAttivi = isAttivo(pathname, "/prodotti");

  return (
    <nav aria-label="Principale" className="hidden h-full items-center gap-8 md:flex">
      <div className="group relative flex h-full items-center">
        <Link
          href="/prodotti"
          aria-current={prodottiAttivi ? "page" : undefined}
          className={cn(
            "inline-flex h-full items-center gap-1.5 border-b-2 text-[15px] font-medium no-underline transition-colors hover:text-brand-strong",
            prodottiAttivi ? "border-brand-strong text-brand-strong" : "border-transparent text-ink",
          )}
        >
          Prodotti
          <ChevronDown aria-hidden="true" className="size-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
        </Link>
        <div className="invisible absolute left-1/2 top-full z-40 w-[560px] -translate-x-1/2 pt-2 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
          <div className="rounded-md border border-border bg-surface p-3 shadow-header">
            <ul className="grid grid-cols-2 gap-1">
              {prodotti.map((p) => {
                const Icona = iconaProdotto(p.slug);
                return (
                  <li key={p.slug}>
                    <Link
                      href={`/prodotti/${p.slug}`}
                      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-[15px] text-ink no-underline hover:bg-brand-soft hover:text-brand-strong"
                    >
                      <Icona aria-hidden="true" className="size-5 shrink-0 text-brand-strong" strokeWidth={1.6} />
                      {p.nome}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-2 border-t border-border pt-2">
              <Link
                href="/prodotti"
                className="flex items-center justify-between rounded-md px-3 py-2.5 text-[15px] font-semibold text-brand-strong no-underline hover:bg-brand-soft"
              >
                Tutti i prodotti
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {voci.map((v) => {
        const attivo = isAttivo(pathname, v.href);
        return (
          <Link
            key={v.href}
            href={v.href}
            aria-current={attivo ? "page" : undefined}
            className={cn(
              "inline-flex h-full items-center border-b-2 text-[15px] font-medium no-underline transition-colors hover:text-brand-strong",
              attivo ? "border-brand-strong text-brand-strong" : "border-transparent text-ink",
            )}
          >
            {v.label}
          </Link>
        );
      })}
    </nav>
  );
}
