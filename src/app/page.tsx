import type { Metadata } from "next";
import Image from "next/image";
import { Clock, MapPin, Phone } from "lucide-react";
import { getCopertina, getLavori, getProdotti, site } from "@/lib/content";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { OpeningStatus } from "@/components/layout/opening-status";
import { ProdottoCard } from "@/components/prodotti/prodotto-card";
import { ProcessSteps } from "@/components/catalog/process-steps";

export const metadata: Metadata = {
  title: { absolute: "Tipografia Zappalà · Stampa, grafica e pubblicità a Belpasso" },
  description: `Tipografia con ${site.esperienza}. Stampa e finitura in laboratorio a Belpasso (CT): volantini, manifesti, cataloghi, poster 6×3.`,
  alternates: { canonical: "/" },
};

const SECTION = "py-16 md:py-24";

export default function Home() {
  const copertina = getCopertina();
  const secondarie = getLavori()
    .filter((i) => i.file !== copertina.file)
    .slice(0, 2);
  const galleria = getLavori().slice(0, 6);
  const prodotti = getProdotti();
  const a = site.indirizzo;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="page-wrap grid gap-14 py-14 md:grid-cols-12 md:items-center md:gap-12 md:py-24">
          <div className="flex flex-col gap-7 md:col-span-6">
            <p className="label-mono text-brand-strong">Tipografia a Belpasso (CT)</p>
            <h1>Stampa, grafica e pubblicità a Belpasso</h1>
            <p className="max-w-[46ch] text-lead text-ink-muted">
              Trent&apos;anni di esperienza. Stampa e finitura in laboratorio, senza passaggi esterni.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/preventivo" size="lg">
                Richiedi preventivo
              </ButtonLink>
              <ButtonLink href="/prodotti" variant="secondary" size="lg">
                Guarda i prodotti
              </ButtonLink>
            </div>
            <ul className="flex flex-col gap-3 border-t border-border pt-6 text-[15px] text-ink-muted">
              <li className="flex items-center gap-3">
                <MapPin aria-hidden="true" className="size-5 shrink-0 text-brand-strong" />
                <span>
                  {a.via}, {a.cap} {a.citta} ({a.provincia})
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock aria-hidden="true" className="size-5 shrink-0 text-brand-strong" />
                <span>
                  <OpeningStatus schema={site.orariSchema} /> · {site.orari[0].giorni} {site.orari[0].ore}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone aria-hidden="true" className="size-5 shrink-0 text-brand-strong" />
                <a href={site.telefonoHref} className="font-semibold text-ink no-underline hover:underline">
                  {site.telefono}
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 md:col-span-6">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-md border border-border bg-brand-soft">
              <Image
                src={copertina.file}
                alt={copertina.alt}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            {secondarie.map((f) => (
              <div key={f.file} className="relative aspect-[3/4] overflow-hidden rounded-md border border-border bg-brand-soft">
                <Image src={f.file} alt={f.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prodotti */}
      <section className={SECTION} aria-labelledby="prodotti">
        <div className="page-wrap flex flex-col gap-12">
          <SectionHeading
            eyebrow="Prodotti"
            title="Cosa stampiamo"
            intro="Volantini, manifesti, cataloghi, poster 6×3 e altro: tutto dalla stessa tipografia."
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {prodotti.map((p) => (
              <li key={p.slug}>
                <ProdottoCard prodotto={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Servizi */}
      <section className={`${SECTION} border-y border-border bg-surface`} aria-labelledby="servizi">
        <div className="page-wrap flex flex-col gap-12">
          <SectionHeading eyebrow="Servizi" title="Quattro servizi, un unico laboratorio" as="h2" />
          <ul className="divide-y divide-border border-y border-border">
            {site.servizi.map((s) => (
              <li key={s.slug} className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline md:gap-8">
                <span className="text-5xl font-bold text-brand font-stretch-[75%] tabular-nums md:col-span-2">{s.numero}</span>
                <div className="flex flex-col gap-2 md:col-span-10">
                  <h3 className="text-2xl">{s.titolo}</h3>
                  <p className="max-w-[60ch] text-ink-muted">{s.testo}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Lavori recenti */}
      <section className={SECTION} aria-labelledby="lavori">
        <div className="page-wrap flex flex-col gap-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Lavori" title="Dal nostro banco" />
            <ButtonLink href="/lavori" variant="secondary">
              Tutti i lavori
            </ButtonLink>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {galleria.map((f) => (
              <li key={f.file} className="relative aspect-square overflow-hidden rounded-md border border-border bg-surface-2">
                <Image
                  src={f.file}
                  alt={f.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-contain p-3 sm:p-5"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Processo */}
      <section className={`${SECTION} border-t border-border bg-surface`} aria-labelledby="processo">
        <div className="page-wrap flex flex-col gap-14">
          <SectionHeading eyebrow="Come lavoriamo" title="Dal file alla consegna" />
          <ProcessSteps />
        </div>
      </section>

      {/* Prepara il file */}
      <section className={SECTION} aria-labelledby="file">
        <div className="page-wrap">
          <Card>
            <CardBody className="grid gap-10 p-6 md:grid-cols-12 md:p-12">
              <div className="flex flex-col gap-5 md:col-span-5">
                <SectionHeading eyebrow="Prima di inviare" title="Prepara il tuo file" as="h2" />
                <p className="text-ink-muted">
                  Cinque controlli prima di mandarci il file. Se hai dubbi, invialo lo stesso: lo controlliamo noi.
                </p>
                <div>
                  <ButtonLink href="/preparazione-file" variant="secondary">
                    Guida alla preparazione
                  </ButtonLink>
                </div>
              </div>
              <dl className="grid grid-cols-[max-content_1fr] content-start gap-x-8 gap-y-0 self-center text-[15px] md:col-span-7">
                {site.preparazioneFile.map((r) => (
                  <div key={r.voce} className="col-span-2 grid grid-cols-subgrid border-b border-border py-3.5 first:border-t">
                    <dt className="label-mono self-center text-ink-muted">{r.voce}</dt>
                    <dd className="m-0 self-center">{r.valore}</dd>
                  </div>
                ))}
              </dl>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* CTA finale */}
      <section className="bg-brand-strong text-white" aria-labelledby="finale">
        <div className="page-wrap flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <h2 id="finale" className="max-w-[24ch] text-white">
            Hai già il file? Mandacelo.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/preventivo" size="lg" className="bg-white text-brand-strong hover:bg-brand-soft">
              Richiedi preventivo
            </ButtonLink>
            <ButtonAnchor
              href={site.telefonoHref}
              size="lg"
              className="border border-white/50 text-white hover:bg-white/10"
            >
              <Phone aria-hidden="true" className="size-5" />
              {site.telefono}
            </ButtonAnchor>
          </div>
        </div>
      </section>
    </>
  );
}
