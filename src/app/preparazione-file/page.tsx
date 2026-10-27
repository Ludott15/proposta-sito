import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";
import { site } from "@/lib/content";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { TextPage, TextSection } from "@/components/layout/text-page";

export const metadata: Metadata = {
  title: "Preparazione file",
  description: "Come preparare il file per la stampa: abbondanza, CMYK, risoluzione 300 dpi, font vettorializzati e PDF/X.",
  alternates: { canonical: "/preparazione-file" },
};

/* Spiegazioni delle voci tecniche, indicizzate per nome voce di site.json. */
const SPIEGAZIONI: Record<string, string> = {
  Abbondanza:
    "Aggiungi 3 mm oltre la misura finale su ogni lato. Dopo il taglio questa parte sparisce e non restano bordi bianchi.",
  Colore:
    "Stampiamo in CMYK. Un file in RGB cambia colore in conversione: convertilo prima tu, oppure chiedici una verifica.",
  Risoluzione:
    "Le immagini devono essere a 300 dpi alla dimensione di stampa. Un'immagine scaricata dal web di solito non basta.",
  Font: "Converti i testi in tracciati o incorpora i font. Così il file si vede uguale su ogni computer.",
  Formato: "Esporta in PDF/X, il formato standard per la stampa.",
};

const CHECKLIST = [
  "Abbondanza di 3 mm per lato, oltre il formato finale",
  "Colori in CMYK, non in RGB",
  "Immagini a 300 dpi alla dimensione di stampa",
  "Font convertiti in tracciati o incorporati",
  "File esportato in PDF/X",
];

/* Schema dell'abbondanza: area di abbondanza di 3 mm attorno alla linea di taglio. Scala 1 unità = 0,1 mm. */
function SchemaAbbondanza() {
  return (
    <figure className="flex flex-col gap-3">
      <svg
        viewBox="0 0 480 300"
        role="img"
        aria-labelledby="schema-abbondanza-titolo"
        className="h-auto w-full max-w-lg"
      >
        <title id="schema-abbondanza-titolo">
          Schema dell&apos;abbondanza: 3 mm oltre la linea di taglio su ogni lato
        </title>
        <rect x="40" y="30" width="400" height="240" className="fill-brand-soft stroke-brand-strong" strokeWidth="2" strokeDasharray="6 4" />
        <rect x="70" y="60" width="340" height="180" className="fill-surface stroke-ink" strokeWidth="2" />
        <text x="60" y="48" className="fill-brand-strong text-[13px] font-semibold">Area di abbondanza (3 mm)</text>
        <text x="90" y="92" className="fill-ink text-[13px] font-semibold">Formato finito</text>
        <text x="90" y="112" className="fill-ink-muted text-[12px]">Linea di taglio</text>
      </svg>
      <figcaption className="text-sm text-ink-muted">
        Il file va disegnato fino al bordo esterno verde. Il taglio avviene sulla linea interna.
      </figcaption>
    </figure>
  );
}

export default function PreparazioneFile() {
  return (
    <>
      <TextPage
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Preparazione file" }]}
        eyebrow="File"
        title="Prepara il file per la stampa"
        intro="Cinque controlli prima di inviarci il file. Se hai dubbi, mandalo lo stesso: lo controlliamo noi e ti mandiamo una bozza."
      >
        <TextSection id="controlli" title="I cinque controlli">
          <ul className="flex flex-col gap-4">
            {site.preparazioneFile.map((r) => (
              <li key={r.voce} className="text-ink-muted">
                <strong className="text-ink">
                  {r.voce}: {r.valore}.
                </strong>{" "}
                {SPIEGAZIONI[r.voce] ?? ""}
              </li>
            ))}
          </ul>
        </TextSection>

        <TextSection id="abbondanza" title="Abbondanza, in figura">
          <SchemaAbbondanza />
        </TextSection>

        <TextSection id="checklist" title="Checklist prima dell'invio">
          <ul className="flex flex-col gap-3">
            {CHECKLIST.map((voce) => (
              <li key={voce} className="flex items-start gap-3 text-[15px]">
                <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-strong" />
                <span>{voce}</span>
              </li>
            ))}
          </ul>
        </TextSection>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonAnchor href="/guida-preparazione-file.txt" download variant="secondary">
            Scarica la guida (.txt)
          </ButtonAnchor>
          <ButtonLink href="/preventivo">Richiedi preventivo</ButtonLink>
        </div>
      </TextPage>
    </>
  );
}
