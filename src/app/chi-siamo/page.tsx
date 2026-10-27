import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { getImmagini, site } from "@/lib/content";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { TextPage, TextSection } from "@/components/layout/text-page";
import { ProcessSteps } from "@/components/catalog/process-steps";

export const metadata: Metadata = {
  title: "Chi siamo",
  description: `Chi siamo: ${site.esperienza} di stampa e finitura in laboratorio a ${site.citta} (${site.provincia}).`,
  alternates: { canonical: "/chi-siamo" },
};

export default function ChiSiamo() {
  const laboratorio = site.servizi.find((s) => s.slug === "stampa")?.testo;
  const foto = getImmagini().filter((i) => i.categoria === "laboratorio");
  const a = site.indirizzo;

  return (
    <TextPage
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Chi siamo" }]}
      eyebrow="Chi siamo"
      title={`Trent'anni di esperienza, a ${site.citta}`}
      intro={site.storia}
    >
      <TextSection id="storia" title="La nostra storia">
        <p className="text-ink-muted">
          La tipografia ha {site.esperienza}. Progetta, stampa e finisce i lavori nello stesso laboratorio.
        </p>
      </TextSection>

      <TextSection id="laboratorio" title="Il laboratorio">
        <p className="text-ink-muted">{laboratorio}</p>
        <p className="label-mono text-ink-muted">
          {a.via}, {a.cap} {a.citta} ({a.provincia})
        </p>
        {foto.map((f) => (
          <figure key={f.file} className="overflow-hidden rounded-md border border-border bg-surface">
            <Image
              src={f.file}
              alt={f.alt}
              width={f.w}
              height={f.h}
              sizes="(min-width: 768px) 68ch, 100vw"
              className="h-auto w-full"
            />
          </figure>
        ))}
      </TextSection>

      <TextSection id="processo" title="Dal file alla consegna">
        <ProcessSteps />
      </TextSection>

      <TextSection id="persone" title="Chi lavora da noi">
        <ul className="grid gap-4 sm:grid-cols-2">
          {site.persone.map((p) => (
            <li key={p.nome}>
              <Card>
                <CardBody className="gap-1">
                  <p className="text-xl font-bold">{p.nome}</p>
                  <p className="label-mono text-ink-muted">{p.ruolo}</p>
                </CardBody>
              </Card>
            </li>
          ))}
        </ul>
      </TextSection>

      <Card>
        <CardBody className="gap-5 p-6 md:p-8">
          <h2 className="text-2xl">Hai un lavoro da stampare?</h2>
          <p className="text-ink-muted">Mandaci il file o raccontaci cosa ti serve: ti rispondiamo con un preventivo.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/preventivo" size="lg">
              Richiedi preventivo
              <ArrowRight aria-hidden="true" className="size-5" />
            </ButtonLink>
            <ButtonAnchor href={site.telefonoHref} variant="secondary" size="lg">
              <Phone aria-hidden="true" className="size-5" />
              {site.telefono}
            </ButtonAnchor>
          </div>
        </CardBody>
      </Card>
    </TextPage>
  );
}
