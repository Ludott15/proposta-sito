import { site } from "@/lib/content";

/* Processo di lavoro: orizzontale da md in su, verticale su mobile. */
export function ProcessSteps() {
  return (
    <ol className="grid gap-8 md:grid-cols-5 md:gap-6">
      {site.processo.map((p) => (
        <li key={p.n} className="flex flex-col gap-3 border-t-2 border-brand-strong pt-5">
          <span className="label-mono text-brand-strong">{p.n}</span>
          <h3>{p.titolo}</h3>
          <p className="text-[15px] text-ink-muted">{p.testo}</p>
        </li>
      ))}
    </ol>
  );
}
