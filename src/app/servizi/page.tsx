import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getImmagini, getProdotto, site } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { IllustrazioneProdotto } from "@/components/prodotti/illustrazione-prodotto";

export const metadata: Metadata = {
  title: "Servizi: stampa e finitura, timbri, grafica e pubblicità",
  description: `Stampa e finitura in laboratorio a Belpasso, timbri, grafica e design, campagne pubblicitarie. ${site.nome}, ${site.esperienza}.`,
  alternates: { canonical: "/servizi" },
};

/* Foto per servizio, solo file presenti in immagini.json. Dove manca, si usa l'illustrazione del primo prodotto. */
const FOTO_SERVIZIO: Record<string, string> = {
  stampa: "/originali/foto-11.jpg",
  grafica: "/originali/lavoro-04.jpg",
  pubblicita: "/originali/foto-17.jpg",
};

export default function ServiziPage() {
  const immagini = getImmagini();

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Servizi" }]}
        eyebrow="Servizi"
        title="Cosa facciamo a Belpasso"
        intro={site.storia}
      />

      <div className="page-wrap py-8 md:py-12">
        {site.servizi.map((s, i) => {
          const prodotti = s.prodotti
            .map((slug) => getProdotto(slug))
            .filter((p): p is NonNullable<typeof p> => p !== undefined);
          const fileFoto = FOTO_SERVIZIO[s.slug];
          const foto = fileFoto ? immagini.find((img) => img.file === fileFoto) : undefined;
          const invertita = i % 2 === 1;

          return (
            <section
              key={s.slug}
              id={s.slug}
              aria-labelledby={`servizio-${s.slug}`}
              className="scroll-mt-24 grid gap-10 border-t border-border py-14 md:grid-cols-12 md:items-center md:gap-12 md:py-24"
            >
              <div className={`flex flex-col gap-6 md:col-span-6 ${invertita ? "md:order-2 md:col-start-7" : ""}`}>
                <span className="text-6xl font-bold text-brand font-stretch-[75%] tabular-nums">{s.numero}</span>
                <h2 id={`servizio-${s.slug}`} className="text-3xl">
                  {s.titolo}
                </h2>
                <p className="max-w-[60ch] text-lead text-ink-muted">{s.testo}</p>

                {prodotti.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {prodotti.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/prodotti/${p.slug}`}
                          className="inline-flex h-9 items-center rounded-full border border-border bg-surface px-4 text-sm font-medium text-ink no-underline transition-colors hover:border-brand-strong hover:text-brand-strong"
                        >
                          {p.nome}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                <div>
                  <ButtonLink href="/preventivo" variant="secondary">
                    Richiedi preventivo
                  </ButtonLink>
                </div>
              </div>

              <div className={`md:col-span-5 ${invertita ? "md:col-start-1 md:row-start-1" : "md:col-start-8"}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-brand-soft">
                  {foto ? (
                    <Image src={foto.file} alt={foto.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                  ) : (
                    <IllustrazioneProdotto slug={s.prodotti[0] ?? "generico"} />
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
