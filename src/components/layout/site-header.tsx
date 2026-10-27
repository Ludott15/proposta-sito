import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { getProdotti, site } from "@/lib/content";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { SiteNav } from "./site-nav";

/* Intestazione sticky: marchio, navigazione desktop, telefono e richiesta di preventivo. */
export function SiteHeader() {
  const prodotti = getProdotti().map((p) => ({ slug: p.slug, nome: p.nome }));

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/95 shadow-header backdrop-blur">
      <div className="page-wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 text-ink no-underline" aria-label={`${site.nome}, home`}>
          <Image
            src="/originali/logo-profilo-facebook.jpg"
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-md"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-[17px] font-bold font-stretch-[75%]">{site.nome}</span>
            <span className="label-mono text-ink-muted">Belpasso · CT</span>
          </span>
        </Link>

        <SiteNav prodotti={prodotti} />

        <div className="flex items-center gap-2">
          <ButtonAnchor
            href={site.telefonoHref}
            variant="ghost"
            size="sm"
            className="hidden lg:inline-flex"
          >
            <Phone aria-hidden="true" className="size-4" />
            {site.telefono}
          </ButtonAnchor>
          <ButtonLink href="/preventivo" size="sm" className="hidden md:inline-flex">
            Richiedi preventivo
          </ButtonLink>
          <ButtonAnchor
            href={site.telefonoHref}
            variant="secondary"
            size="sm"
            aria-label={`Chiama ${site.nome}`}
            className="size-9 px-0 md:hidden"
          >
            <Phone aria-hidden="true" className="size-4" />
          </ButtonAnchor>
        </div>
      </div>
    </header>
  );
}
