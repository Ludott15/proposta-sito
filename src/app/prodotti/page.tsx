import type { Metadata } from "next";
import Link from "next/link";
import { getProdotti, site } from "@/lib/content";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { FormatsDiagram } from "@/components/catalog/formats-diagram";
import { ProdottoCard } from "@/components/prodotti/prodotto-card";

export const metadata: Metadata = {
  title: "Prodotti di stampa: volantini, manifesti, cataloghi e altro",
  description:
    "Volantini, depliant, manifesti, poster 6×3, cataloghi, libri, riviste, calendari, timbri e stampe digitali. Tipografia Zappalà, Belpasso.",
  alternates: { canonical: "/prodotti" },
};

const chip =
  "inline-flex h-9 items-center rounded-full border border-border bg-surface px-4 text-sm font-medium text-ink no-underline transition-colors hover:border-brand-strong hover:text-brand-strong";

export default function ProdottiPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Prodotti" }]}
        eyebrow="Catalogo"
        title="Prodotti di stampa"
        intro="Undici prodotti, dal volantino al cartellone 6×3. Scegli il prodotto e richiedi un preventivo."
      />

      <div className="page-wrap flex flex-col gap-10 py-16 md:py-24">
        <nav aria-label="Filtra per servizio" className="flex flex-wrap gap-2">
          {site.servizi.map((s) => (
            <Link key={s.slug} href={`/servizi#${s.slug}`} className={chip}>
              {s.titolo}
            </Link>
          ))}
        </nav>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {getProdotti().map((p) => (
            <li key={p.slug}>
              <ProdottoCard prodotto={p} />
            </li>
          ))}
        </ul>
      </div>

      <section className="border-y border-border bg-surface" aria-labelledby="formati">
        <div className="page-wrap grid gap-10 py-16 md:grid-cols-12 md:items-center md:py-24">
          <div className="md:col-span-5">
            <SectionHeading
              eyebrow="Visualizzatore formati"
              title="Quanto è grande"
              as="h2"
              intro="Confronto dei formati più richiesti, in proporzione reale."
            />
          </div>
          <div className="max-w-xl md:col-span-7">
            <FormatsDiagram />
          </div>
        </div>
      </section>

      <section className="page-wrap flex flex-col gap-10 py-16 md:py-24" aria-labelledby="campionario">
        <SectionHeading
          eyebrow="Carte"
          title="Campionario carte"
          as="h2"
          intro="Le superfici che teniamo in laboratorio e a cosa servono."
        />
        <div className="overflow-x-auto rounded-md border border-border bg-surface">
          <table className="w-full min-w-[600px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                <th scope="col" className="label-mono px-5 py-3.5 font-normal text-ink-muted">Superficie</th>
                <th scope="col" className="label-mono px-5 py-3.5 font-normal text-ink-muted">Grammatura</th>
                <th scope="col" className="label-mono px-5 py-3.5 font-normal text-ink-muted">Disponibilità</th>
                <th scope="col" className="label-mono px-5 py-3.5 font-normal text-ink-muted">Uso tipico</th>
              </tr>
            </thead>
            <tbody>
              {site.campionario.map((c) => (
                <tr key={c.superficie} className="border-b border-border last:border-b-0">
                  <th scope="row" className="px-5 py-4 font-semibold">{c.superficie}</th>
                  <td className="px-5 py-4 tabular-nums">{c.grammatura}</td>
                  <td className="px-5 py-4">{c.disponibilita}</td>
                  <td className="px-5 py-4 text-ink-muted">{c.uso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
