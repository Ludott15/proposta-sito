import type { Metadata } from "next";
import { Clock, ExternalLink, Globe, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/content";
import { PageHeader } from "@/components/layout/page-header";
import { ButtonAnchor } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contatti",
  description: `Indirizzo, telefono, email e orari di ${site.nome} a ${site.indirizzo.via}, ${site.citta} (${site.provincia}).`,
  alternates: { canonical: "/contatti" },
};

/* Riquadro della mappa centrato sul laboratorio: ±0,004° di longitudine e latitudine. */
const { lat: LAT, lon: LON } = site.coordinate;
const D = 0.004;
const MAPPA_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${LON - D}%2C${LAT - D}%2C${LON + D}%2C${LAT + D}&layer=mapnik&marker=${LAT}%2C${LON}`;

const iconClass = "size-5 shrink-0 text-brand-strong";

export default function Contatti() {
  const a = site.indirizzo;

  const recapiti = [
    {
      icona: MapPin,
      titolo: "Indirizzo",
      contenuto: (
        <>
          {a.via}
          <br />
          {a.cap} {a.citta} ({a.provincia})
        </>
      ),
    },
    {
      icona: Phone,
      titolo: "Telefono",
      contenuto: (
        <a href={site.telefonoHref} className="font-semibold text-ink no-underline hover:underline">
          {site.telefono}
        </a>
      ),
    },
    {
      icona: Mail,
      titolo: "Email",
      contenuto: (
        <a href={`mailto:${site.email}`} className="break-all font-semibold text-ink no-underline hover:underline">
          {site.email}
        </a>
      ),
    },
    {
      icona: Globe,
      titolo: "Facebook",
      contenuto: (
        <a href={site.facebook} rel="noopener" className="font-semibold text-ink no-underline hover:underline">
          Tipografia Zappalà su Facebook
        </a>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contatti" }]}
        eyebrow="Contatti"
        title="Vieni a trovarci o scrivici"
        intro="Siamo in laboratorio a Belpasso. Telefona o scrivi, oppure passa durante gli orari."
      />

      <div className="page-wrap flex flex-col gap-16 py-16 md:py-24">
        <ul className="grid gap-4 sm:grid-cols-2">
          {recapiti.map(({ icona: Icona, titolo, contenuto }) => (
            <li key={titolo}>
              <Card className="h-full">
                <CardBody className="flex-row gap-4">
                  <Icona aria-hidden="true" className={iconClass} />
                  <div className="flex flex-col gap-1">
                    <h2 className="label-mono text-ink-muted">{titolo}</h2>
                    <p className="text-[16px]">{contenuto}</p>
                  </div>
                </CardBody>
              </Card>
            </li>
          ))}
        </ul>

        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <section aria-labelledby="orari" className="flex flex-col gap-4 md:col-span-5">
            <h2 id="orari" className="flex items-center gap-3 text-2xl">
              <Clock aria-hidden="true" className={iconClass} />
              Orari
            </h2>
            <table className="w-full border-collapse text-[15px]">
              <tbody>
                {site.orari.map((o) => (
                  <tr key={o.giorni} className="border-b border-border">
                    <th scope="row" className="py-3.5 pr-4 text-left font-semibold">
                      {o.giorni}
                    </th>
                    <td className="py-3.5 text-ink-muted tabular-nums">{o.ore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section aria-labelledby="mappa" className="flex flex-col gap-4 md:col-span-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 id="mappa" className="flex items-center gap-3 text-2xl">
                <MapPin aria-hidden="true" className={iconClass} />
                Dove siamo
              </h2>
              <ButtonAnchor href={site.mappaUrl} rel="noopener" target="_blank" variant="secondary" size="sm">
                Apri in Google Maps
                <ExternalLink aria-hidden="true" className="size-4" />
              </ButtonAnchor>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-border bg-surface-2 md:aspect-[16/10]">
              <iframe
                src={MAPPA_EMBED}
                title={`Mappa di ${site.nome}, ${a.via}, ${a.citta}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0"
              />
            </div>
            <p className="text-sm text-ink-muted">Mappa di OpenStreetMap.</p>
          </section>
        </div>

        <p className="label-mono text-ink-muted">
          {site.ragioneSociale} · P.IVA {site.piva}
        </p>
      </div>
    </>
  );
}
