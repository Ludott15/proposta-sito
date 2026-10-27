import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button, ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/ui/section-heading";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const COLORI = [
  { nome: "brand", valore: "#0A9345", uso: "superfici, decoro, numeri grandi" },
  { nome: "brand-strong", valore: "#08713A", uso: "bottoni primari, link, testo verde" },
  { nome: "brand-soft", valore: "#E7F4EC", uso: "sfondi evidenziati" },
  { nome: "bg", valore: "#FBFBF9", uso: "sfondo pagina" },
  { nome: "surface", valore: "#FFFFFF", uso: "card e intestazione" },
  { nome: "surface-2", valore: "#F2F4F1", uso: "sfondi secondari" },
  { nome: "ink", valore: "#17211B", uso: "testo" },
  { nome: "ink-muted", valore: "#56615A", uso: "testo secondario" },
  { nome: "border", valore: "#DDE3DE", uso: "bordi" },
  { nome: "footer", valore: "#12261A", uso: "footer" },
  { nome: "cmyk-c", valore: "#00A0E3", uso: "barretta CMYK del footer" },
  { nome: "cmyk-m", valore: "#E5007D", uso: "barretta CMYK del footer" },
  { nome: "cmyk-y", valore: "#FFED00", uso: "barretta CMYK del footer" },
];

export default function DesignSystem() {
  return (
    <div className="page-wrap flex flex-col gap-16 py-12 md:py-16">
      <SectionHeading as="h1" eyebrow="Design system" title="Componenti e token" />

      <section className="flex flex-col gap-6" aria-labelledby="colori">
        <h2 id="colori" className="text-3xl">Colori</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COLORI.map((c) => (
            <li key={c.nome} className="flex items-center gap-4 rounded-md border border-border bg-surface p-3">
              <span className="size-12 shrink-0 rounded-md border border-border" style={{ background: c.valore }} aria-hidden="true" />
              <span className="flex flex-col text-sm">
                <span className="font-semibold">{c.nome}</span>
                <span className="label-mono text-ink-muted">{c.valore}</span>
                <span className="text-ink-muted">{c.uso}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-6" aria-labelledby="tipografia">
        <h2 id="tipografia" className="text-3xl">Tipografia</h2>
        <div className="flex flex-col gap-5 rounded-md border border-border bg-surface p-6">
          <p className="label-mono text-brand-strong">Etichetta mono · label-mono</p>
          <p className="text-h1 font-extrabold tracking-[-0.02em]">Titolo principale (h1)</p>
          <h2>Titolo di sezione (h2)</h2>
          <h3>Titolo di blocco (h3)</h3>
          <p className="max-w-[46ch] text-lead text-ink-muted">Testo introduttivo (lead), 20 px, interlinea 1.5.</p>
          <p>Testo di corpo a 17 px. Le righe restano sotto i 70 caratteri per una lettura comoda.</p>
        </div>
      </section>

      <section className="flex flex-col gap-6" aria-labelledby="navigazione">
        <h2 id="navigazione" className="text-3xl">Percorso di navigazione</h2>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Prodotti", href: "/prodotti" }, { label: "Volantini" }]} />
      </section>

      <section className="flex flex-col gap-6" aria-labelledby="bottoni">
        <h2 id="bottoni" className="text-3xl">Bottoni</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primario</Button>
          <Button variant="secondary">Secondario</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm">Piccolo</Button>
          <ButtonLink href="/preventivo" size="lg">Link come bottone</ButtonLink>
          <ButtonAnchor href="tel:+390957912472" variant="secondary">Chiama</ButtonAnchor>
        </div>
      </section>

      <section className="flex flex-col gap-6" aria-labelledby="badge">
        <h2 id="badge" className="text-3xl">Badge e card</h2>
        <div className="flex flex-wrap gap-2">
          <Badge tone="brand">Stampa</Badge>
          <Badge>Grafica</Badge>
        </div>
        <Card className="max-w-md">
          <CardBody>
            <h3>Titolo della card</h3>
            <p className="text-ink-muted">Testo di esempio dentro una card con bordo sottile e angoli a 6px.</p>
          </CardBody>
        </Card>
      </section>

      <section className="flex flex-col gap-6" aria-labelledby="campi">
        <h2 id="campi" className="text-3xl">Campi</h2>
        <form className="grid max-w-xl gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="ds-nome">Nome</Label>
            <Input id="ds-nome" name="nome" placeholder="Il tuo nome" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ds-prodotto">Prodotto</Label>
            <Select id="ds-prodotto" name="prodotto" defaultValue="">
              <option value="">Scegli un prodotto</option>
              <option value="volantini">Volantini</option>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ds-note">Note</Label>
            <Textarea id="ds-note" name="note" rows={3} />
          </div>
        </form>
      </section>
    </div>
  );
}
