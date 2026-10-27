"use server";

import { getProdotto, site } from "@/lib/content";
import {
  ESTENSIONI_FILE,
  MAX_FILE_BYTES,
  preventivoSchema,
  type PreventivoField,
  type PreventivoInput,
  type PreventivoState,
} from "@/lib/preventivo";

const CAMPI_TESTO = [
  "prodotto",
  "quantita",
  "formato",
  "carta",
  "finitura",
  "note",
  "nome",
  "email",
  "telefono",
  "privacy",
] as const satisfies readonly (keyof PreventivoInput)[];

const RESEND_URL = "https://api.resend.com/emails";

// Rimuove a capo e tabulazioni: evita header injection in oggetto, nomi e reply-to.
function riga(valore: string): string {
  return valore.replace(/[\r\n\t]+/g, " ").trim();
}

function nomeFileSicuro(nome: string): string {
  return riga(nome).replace(/[^\w.\-]+/g, "_").slice(0, 120) || "allegato";
}

function fallbackContatti(): string {
  return `Invio online non ancora attivo. Chiamaci al ${site.telefono} o scrivi a ${site.email}.`;
}

function fallbackErrore(): string {
  return `Non siamo riusciti a inviare la richiesta. Chiamaci al ${site.telefono} o scrivi a ${site.email}.`;
}

export async function inviaPreventivo(prev: PreventivoState, formData: FormData): Promise<PreventivoState> {
  // Honeypot: il campo "sito" è nascosto al cliente. Se valorizzato è un bot: successo silenzioso, nessun invio.
  if (String(formData.get("sito") ?? "").trim() !== "") {
    return { status: "success", message: "Richiesta inviata. Ti rispondiamo appena possibile." };
  }

  const values: Partial<Record<keyof PreventivoInput, string>> = {};
  const raw: Record<string, unknown> = {};
  for (const campo of CAMPI_TESTO) {
    const valore = formData.get(campo);
    if (typeof valore === "string") {
      values[campo] = valore;
      raw[campo] = valore;
    }
  }

  const fieldErrors: Partial<Record<PreventivoField, string>> = {};

  const parsed = preventivoSchema.safeParse(raw);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const campo = issue.path[0];
      if (typeof campo === "string" && !fieldErrors[campo as PreventivoField]) {
        fieldErrors[campo as PreventivoField] = issue.message;
      }
    }
  }

  // Allegato opzionale: controllato a parte, non viene mai ripopolato nel form.
  const file = formData.get("file");
  let allegato: File | null = null;
  if (file instanceof File && file.size > 0) {
    const estensione = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (file.size > MAX_FILE_BYTES) {
      fieldErrors.file = "Il file supera i 10 MB.";
    } else if (!(ESTENSIONI_FILE as readonly string[]).includes(estensione)) {
      fieldErrors.file = `Formato non supportato. Usa: ${ESTENSIONI_FILE.join(", ")}.`;
    } else {
      allegato = file;
    }
  }

  if (!parsed.success || Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Controlla i campi evidenziati.", fieldErrors, values };
  }

  const dati = parsed.data;
  const prodotto = getProdotto(dati.prodotto)?.nome ?? dati.prodotto;
  const nome = riga(dati.nome);
  const email = riga(dati.email);

  const righe: [string, string | undefined][] = [
    ["Prodotto", prodotto],
    ["Quantità", dati.quantita],
    ["Formato", dati.formato],
    ["Carta", dati.carta],
    ["Finitura", dati.finitura],
    ["Nome", nome],
    ["Email", email],
    ["Telefono", dati.telefono],
    ["Note", dati.note],
    ["File allegato", allegato ? nomeFileSicuro(allegato.name) : undefined],
  ];
  const testo = righe
    .filter(([, valore]) => valore !== undefined && valore !== "")
    .map(([etichetta, valore]) => `${etichetta}: ${valore}`)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { status: "error", message: fallbackContatti(), values };
  }

  const body: Record<string, unknown> = {
    from: process.env.PREVENTIVO_FROM || "Sito Tipografia Zappalà <onboarding@resend.dev>",
    to: [process.env.PREVENTIVO_TO || site.email],
    reply_to: email,
    subject: riga(`Preventivo: ${prodotto} — ${nome}`),
    text: testo,
  };
  if (allegato) {
    const contenuto = Buffer.from(await allegato.arrayBuffer()).toString("base64");
    body.attachments = [{ filename: nomeFileSicuro(allegato.name), content: contenuto }];
  }

  try {
    const res = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error("Invio preventivo fallito: Resend ha risposto con status", res.status);
      return { status: "error", message: fallbackErrore(), values };
    }
  } catch {
    console.error("Invio preventivo fallito: errore di rete verso Resend");
    return { status: "error", message: fallbackErrore(), values };
  }

  return { status: "success", message: "Richiesta inviata. Ti rispondiamo appena possibile." };
}
