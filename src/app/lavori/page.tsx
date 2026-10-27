import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getImmagini, getProdotto } from "@/lib/content";
import { PageHeader } from "@/components/layout/page-header";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Lavori",
  description: "Esempi di stampa e grafica realizzati dalla Tipografia Zappalà a Belpasso: volantini, depliant, libri, calendari.",
  alternates: { canonical: "/lavori" },
};

const CATEGORIE: Record<string, string> = {
  lavoro: "Lavori",
  prodotto: "Prodotti",
  laboratorio: "Laboratorio",
  altro: "Altro",
};

interface Props {
  searchParams: Promise<{ categoria?: string; prodotto?: string }>;
}

function chipClass(attivo: boolean) {
  return cn(
    "label-mono inline-flex h-9 items-center rounded-full border px-4 no-underline transition-colors",
    attivo
      ? "border-brand-strong bg-brand-strong text-white"
      : "border-border bg-surface text-ink-muted hover:border-brand-strong hover:text-ink",
  );
}

export default async function LavoriPage({ searchParams }: Props) {
  const { categoria, prodotto } = await searchParams;
  const tutte = getImmagini();

  const categoriePresenti = Object.keys(CATEGORIE).filter((c) => tutte.some((i) => i.categoria === c));
  const prodottiPresenti = [...new Set(tutte.map((i) => i.prodotto).filter((p): p is string => Boolean(p)))];

  const catAttiva = categoriePresenti.includes(categoria ?? "") ? categoria! : undefined;
  const prodAttivo = prodottiPresenti.includes(prodotto ?? "") ? prodotto! : undefined;

  const foto = tutte.filter(
    (i) => (!catAttiva || i.categoria === catAttiva) && (!prodAttivo || i.prodotto === prodAttivo),
  );

  const linkFiltro = (cat?: string, prod?: string) => {
    const q = new URLSearchParams();
    if (cat) q.set("categoria", cat);
    if (prod) q.set("prodotto", prod);
    const s = q.toString();
    return s ? `/lavori?${s}` : "/lavori";
  };

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Lavori" }]}
        eyebrow="Portfolio"
        title="Lavori"
        intro="Stampati e progettati in laboratorio. Ogni foto si apre nella dimensione originale."
      />

      <div className="page-wrap flex flex-col gap-10 py-12 md:py-16">
        <div className="flex flex-col gap-4">
          <nav aria-label="Filtra per categoria" className="flex flex-wrap gap-2">
            <Link href={linkFiltro(undefined, prodAttivo)} className={chipClass(!catAttiva)} aria-current={!catAttiva ? "true" : undefined}>
              Tutte
            </Link>
            {categoriePresenti.map((c) => (
              <Link
                key={c}
                href={linkFiltro(c, prodAttivo)}
                className={chipClass(catAttiva === c)}
                aria-current={catAttiva === c ? "true" : undefined}
              >
                {CATEGORIE[c]}
              </Link>
            ))}
          </nav>

          {prodottiPresenti.length > 0 && (
            <nav aria-label="Filtra per prodotto" className="flex flex-wrap gap-2">
              <Link href={linkFiltro(catAttiva, undefined)} className={chipClass(!prodAttivo)} aria-current={!prodAttivo ? "true" : undefined}>
                Tutti i prodotti
              </Link>
              {prodottiPresenti.map((p) => (
                <Link
                  key={p}
                  href={linkFiltro(catAttiva, p)}
                  className={chipClass(prodAttivo === p)}
                  aria-current={prodAttivo === p ? "true" : undefined}
                >
                  {getProdotto(p)?.nome ?? p}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {foto.length === 0 ? (
          <p className="text-ink-muted">
            Nessun lavoro per questo filtro. <Link href="/lavori" className="font-semibold">Mostra tutti i lavori</Link>.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {foto.map((f) => (
              <li key={f.file}>
                <a
                  href={f.file}
                  target="_blank"
                  rel="noopener"
                  className="group relative block aspect-square overflow-hidden rounded-md border border-border bg-surface-2 transition duration-200 hover:border-brand-strong motion-safe:hover:translate-y-0.5"
                >
                  <Image
                    src={f.file}
                    alt={f.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                    className="object-contain p-3 sm:p-5"
                  />
                </a>
              </li>
            ))}
          </ul>
        )}

        <p className="text-sm text-ink-muted">Foto dal profilo Facebook della tipografia.</p>
      </div>
    </>
  );
}
