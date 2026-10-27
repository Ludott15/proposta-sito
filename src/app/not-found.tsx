import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="page-wrap flex flex-col items-start gap-6 py-24 md:py-32">
      <p className="label-mono text-brand-strong">Errore 404</p>
      <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.04]">Pagina non trovata</h1>
      <p className="max-w-[60ch] text-lead text-ink-muted">
        Il link potrebbe essere cambiato. Puoi tornare alla home o vedere i prodotti.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Torna alla home</ButtonLink>
        <ButtonLink href="/prodotti" variant="secondary">
          Vedi i prodotti
        </ButtonLink>
      </div>
    </section>
  );
}
