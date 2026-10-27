import Link from "next/link";
import { getProdotti, site } from "@/lib/content";

const azienda = [
  { href: "/servizi", label: "Servizi" },
  { href: "/lavori", label: "Lavori" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/preparazione-file", label: "Preparazione file" },
  { href: "/contatti", label: "Contatti" },
  { href: "/preventivo", label: "Richiedi preventivo" },
  { href: "/privacy", label: "Privacy" },
];

const linkClass = "text-white/75 no-underline hover:text-white hover:underline underline-offset-4";

/* Footer verde-nero: marchio, prodotti, azienda, contatti e orari. Una sola barretta CMYK in cima. */
export function SiteFooter() {
  const a = site.indirizzo;
  const anno = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-footer text-white/85">
      <div className="flex h-1" aria-hidden="true">
        <span className="flex-1 bg-cmyk-c" />
        <span className="flex-1 bg-cmyk-m" />
        <span className="flex-1 bg-cmyk-y" />
      </div>

      <div className="page-wrap grid gap-10 py-14 md:grid-cols-4 md:gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-xl font-bold text-white font-stretch-[75%]">{site.nome}</p>
          <p className="max-w-[32ch] text-[15px] leading-relaxed">
            Stampa e finitura in laboratorio a Belpasso. Grafica e pubblicità.
          </p>
        </div>

        <nav aria-label="Prodotti del footer" className="flex flex-col gap-3 text-[15px]">
          <p className="label-mono text-white">Prodotti</p>
          <ul className="grid grid-cols-1 gap-2">
            {getProdotti().map((p) => (
              <li key={p.slug}>
                <Link href={`/prodotti/${p.slug}`} className={linkClass}>
                  {p.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Azienda" className="flex flex-col gap-3 text-[15px]">
          <p className="label-mono text-white">Azienda</p>
          <ul className="flex flex-col gap-2">
            {azienda.map((v) => (
              <li key={v.href}>
                <Link href={v.href} className={linkClass}>
                  {v.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 text-[15px]">
          <p className="label-mono text-white">Contatti</p>
          <p>
            {a.via}
            <br />
            {a.cap} {a.citta} ({a.provincia})
          </p>
          <p>
            <a href={site.telefonoHref} className={linkClass}>
              {site.telefono}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className={linkClass}>
              {site.email}
            </a>
          </p>
          <ul className="mt-2 flex flex-col gap-1">
            {site.orari.map((o) => (
              <li key={o.giorni} className="flex justify-between gap-4">
                <span>{o.giorni}</span>
                <span className="tabular-nums">{o.ore}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="page-wrap flex flex-col gap-2 py-6 text-sm text-white/65 md:flex-row md:justify-between">
          <p>
            © {anno} {site.nome} · {site.ragioneSociale} · P.IVA {site.piva}
          </p>
          <p>
            <a href={site.facebook} rel="noopener" className={linkClass}>
              Facebook
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
