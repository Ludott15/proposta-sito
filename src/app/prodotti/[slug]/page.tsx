import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
import { getImmaginiProdotto, getProdotti, getProdotto, site } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProdottoCard } from "@/components/prodotti/prodotto-card";
import { IllustrazioneProdotto } from "@/components/prodotti/illustrazione-prodotto";
import { PageHeader } from "@/components/layout/page-header";

export const dynamicParams = false;

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getProdotti().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const prodotto = getProdotto(slug);
  if (!prodotto) notFound();

  const foto = getImmaginiProdotto(prodotto.slug)[0];

  return {
    title: prodotto.nome,
    description: `${prodotto.uso} Tipografia Zappalà, Belpasso.`,
    alternates: { canonical: `/prodotti/${prodotto.slug}` },
    openGraph: foto ? { images: [{ url: foto.file, width: foto.w, height: foto.h, alt: foto.alt }] } : undefined,
  };
}

export default async function ProdottoPage({ params }: Props) {
  const { slug } = await params;
  const prodotto = getProdotto(slug);
  if (!prodotto) notFound();

  const foto = getImmaginiProdotto(prodotto.slug);
  const servizio = site.servizi.find((s) => s.prodotti.includes(prodotto.slug));
  const correlati = (servizio?.prodotti ?? [])
    .filter((s) => s !== prodotto.slug)
    .map((s) => getProdotto(s))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)
    .slice(0, 4);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: prodotto.nome,
    description: prodotto.uso,
    ...(foto.length > 0 ? { image: `${site.url}${foto[0].file}` } : {}),
    brand: { "@type": "Brand", name: site.nome },
    url: `${site.url}/prodotti/${prodotto.slug}`,
  };

  const scheda: [string, string][] = [
    ["Formati", prodotto.formati.join(" · ")],
    ["Carte", prodotto.carte],
    ["Grammature", prodotto.grammature],
    ["Finiture", prodotto.finiture],
    ["Tiratura minima", prodotto.tiratura],
    ["Tempi", prodotto.tempi],
  ];

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Prodotti", href: "/prodotti" }, { label: prodotto.nome }]}
        eyebrow={servizio?.titolo}
        title={prodotto.nome}
        intro={prodotto.uso}
      />

      <div className="page-wrap flex flex-col gap-16 py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-start md:gap-12">
          <div className="md:col-span-7">
            {foto.length > 0 ? (
              <ul className="grid gap-4 sm:grid-cols-2">
                {foto.map((f, i) => (
                  <li key={f.file} className="relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-surface">
                    <Image
                      src={f.file}
                      alt={f.alt}
                      fill
                      priority={i === 0}
                      sizes="(min-width: 768px) 40vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="aspect-[4/3] overflow-hidden rounded-md border border-border">
                <IllustrazioneProdotto slug={prodotto.slug} />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-8 md:sticky md:top-28 md:col-span-5">
            <dl className="grid grid-cols-[minmax(7.5rem,max-content)_1fr] gap-x-6 border-t border-border text-[15px]">
              {scheda.map(([etichetta, valore]) => (
                <div key={etichetta} className="col-span-2 grid grid-cols-subgrid border-b border-border py-3.5">
                  <dt className="label-mono pt-0.5 text-ink-muted">{etichetta}</dt>
                  <dd className="m-0 tabular-nums">{valore}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-4 rounded-md border border-border bg-surface p-6">
              <p className="text-[15px] text-ink-muted">Ti serve un preventivo su misura? Indica quantità e formato.</p>
              <ButtonLink href={`/preventivo?prodotto=${prodotto.slug}`} size="lg" className="w-full">
                Richiedi preventivo
              </ButtonLink>
              <div className="flex flex-col gap-3 border-t border-border pt-4 text-[15px]">
                <a href={site.telefonoHref} className="inline-flex items-center gap-2 font-semibold text-ink no-underline hover:underline">
                  <Phone aria-hidden="true" className="size-5 text-brand-strong" />
                  {site.telefono}
                </a>
                <Link href="/preparazione-file" className="font-semibold text-brand-strong">
                  Come preparare il file
                </Link>
              </div>
            </div>
          </div>
        </div>

        {correlati.length > 0 && (
          <section className="flex flex-col gap-10" aria-labelledby="altri-prodotti">
            <SectionHeading eyebrow={servizio?.titolo} title="Altri prodotti" as="h2" />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {correlati.map((p) => (
                <li key={p.slug}>
                  <ProdottoCard prodotto={p} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
