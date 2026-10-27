import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getProdotti, site } from "@/lib/content";
import { Card, CardBody } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { FormPreventivo } from "@/components/preventivo/form-preventivo";

export const metadata: Metadata = {
  title: "Richiedi preventivo",
  description: "Richiedi un preventivo per la stampa: scegli il prodotto, indica quantità e formato, allega il file.",
  alternates: { canonical: "/preventivo" },
};

interface Props {
  searchParams: Promise<{ prodotto?: string }>;
}

export default async function Preventivo({ searchParams }: Props) {
  const { prodotto } = await searchParams;
  const prodotti = getProdotti();
  const prodottoIniziale = prodotti.some((p) => p.slug === prodotto) ? prodotto! : "";
  const a = site.indirizzo;

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Preventivo" }]}
        eyebrow="Preventivo"
        title="Richiedi un preventivo"
        intro="Compila il modulo e allega il file. Ti rispondiamo con un preventivo."
      />

      <div className="page-wrap grid gap-12 py-12 md:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <FormPreventivo prodotti={prodotti} prodottoIniziale={prodottoIniziale} />
        </div>

        <aside aria-labelledby="preferisci" className="lg:col-span-5">
          <Card className="lg:sticky lg:top-28">
            <CardBody className="gap-6 p-6 md:p-8">
              <h2 id="preferisci" className="text-2xl">
                Preferisci parlarne?
              </h2>
              <ul className="flex flex-col gap-5 text-[15px]">
                <li className="flex items-start gap-3">
                  <Phone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-strong" />
                  <a href={site.telefonoHref} className="font-semibold text-ink no-underline hover:underline">
                    {site.telefono}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-strong" />
                  <a href={`mailto:${site.email}`} className="break-all font-semibold text-ink no-underline hover:underline">
                    {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-strong" />
                  <ul className="flex flex-col gap-1.5 text-ink-muted">
                    {site.orari.map((o) => (
                      <li key={o.giorni} className="flex flex-wrap gap-x-2">
                        <span className="font-semibold text-ink">{o.giorni}</span>
                        <span className="tabular-nums">{o.ore}</span>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-strong" />
                  <Link href="/contatti" className="text-ink-muted no-underline hover:text-ink hover:underline">
                    {a.via}, {a.cap} {a.citta} ({a.provincia})
                  </Link>
                </li>
              </ul>
            </CardBody>
          </Card>
        </aside>
      </div>
    </>
  );
}
