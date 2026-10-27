"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import type { Prodotto } from "@/lib/content";
import { inviaPreventivo } from "@/app/preventivo/actions";
import { ESTENSIONI_FILE, MAX_FILE_BYTES, initialPreventivoState, type PreventivoField } from "@/lib/preventivo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  prodotti: Prodotto[];
  prodottoIniziale?: string;
}

const MAX_MB = Math.round(MAX_FILE_BYTES / 1024 / 1024);
const ERR = "text-sm font-semibold text-red-700";

/* Richiesta di preventivo: invio al server con errori per campo e messaggio globale. */
export function FormPreventivo({ prodotti, prodottoIniziale = "" }: Props) {
  const [state, formAction, isPending] = useActionState(inviaPreventivo, initialPreventivoState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  const errore = (campo: PreventivoField) => state.fieldErrors?.[campo];
  const valore = (campo: keyof NonNullable<typeof state.values>) => state.values?.[campo] ?? "";
  const idErrore = (campo: PreventivoField) => (errore(campo) ? `${campo}-errore` : undefined);
  const invalido = (campo: PreventivoField) => (errore(campo) ? true : undefined);

  return (
    <form ref={formRef} action={formAction} encType="multipart/form-data" noValidate className="grid gap-5 md:grid-cols-2">
      {state.message && (
        <div
          role={state.status === "error" ? "alert" : "status"}
          className={
            state.status === "error"
              ? "rounded-md border border-red-300 bg-red-50 p-4 text-[15px] text-red-800 md:col-span-2"
              : "rounded-md border border-brand-strong bg-brand-soft p-4 text-[15px] text-brand-strong md:col-span-2"
          }
        >
          {state.message}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="prodotto">Prodotto</Label>
        <Select
          id="prodotto"
          name="prodotto"
          defaultValue={valore("prodotto") || prodottoIniziale}
          aria-invalid={invalido("prodotto")}
          aria-describedby={idErrore("prodotto")}
          aria-required="true"
        >
          <option value="">Scegli un prodotto</option>
          {prodotti.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.nome}
            </option>
          ))}
        </Select>
        {errore("prodotto") && <p id="prodotto-errore" className={ERR}>{errore("prodotto")}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="quantita">Quantità</Label>
        <Input
          id="quantita"
          name="quantita"
          type="text"
          inputMode="numeric"
          defaultValue={valore("quantita")}
          aria-invalid={invalido("quantita")}
          aria-describedby={idErrore("quantita")}
          aria-required="true"
        />
        {errore("quantita") && <p id="quantita-errore" className={ERR}>{errore("quantita")}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="formato">Formato</Label>
        <Input
          id="formato"
          name="formato"
          type="text"
          placeholder="es. A4, A5, 70×100 cm"
          defaultValue={valore("formato")}
          aria-invalid={invalido("formato")}
          aria-describedby={idErrore("formato")}
        />
        {errore("formato") && <p id="formato-errore" className={ERR}>{errore("formato")}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="carta">Carta</Label>
        <Input
          id="carta"
          name="carta"
          type="text"
          placeholder="es. Patinata opaca"
          defaultValue={valore("carta")}
          aria-invalid={invalido("carta")}
          aria-describedby={idErrore("carta")}
        />
        {errore("carta") && <p id="carta-errore" className={ERR}>{errore("carta")}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="finitura">Finitura</Label>
        <Input
          id="finitura"
          name="finitura"
          type="text"
          defaultValue={valore("finitura")}
          aria-invalid={invalido("finitura")}
          aria-describedby={idErrore("finitura")}
        />
        {errore("finitura") && <p id="finitura-errore" className={ERR}>{errore("finitura")}</p>}
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <Label htmlFor="file">File</Label>
        <input
          id="file"
          name="file"
          type="file"
          accept={ESTENSIONI_FILE.join(",")}
          aria-invalid={invalido("file")}
          aria-describedby={errore("file") ? "file-nota file-errore" : "file-nota"}
          className="h-11 w-full text-sm text-ink-muted file:mr-3 file:h-11 file:rounded-md file:border file:border-border file:bg-surface file:px-4 file:text-ink"
        />
        <p id="file-nota" className="text-sm text-ink-muted">
          Formati ammessi: {ESTENSIONI_FILE.join(", ")}. Dimensione massima {MAX_MB} MB.
        </p>
        {errore("file") && <p id="file-errore" className={ERR}>{errore("file")}</p>}
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <Label htmlFor="note">Note</Label>
        <Textarea
          id="note"
          name="note"
          rows={4}
          defaultValue={valore("note")}
          aria-invalid={invalido("note")}
          aria-describedby={idErrore("note")}
        />
        {errore("note") && <p id="note-errore" className={ERR}>{errore("note")}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="nome">Nome</Label>
        <Input
          id="nome"
          name="nome"
          type="text"
          autoComplete="name"
          defaultValue={valore("nome")}
          aria-invalid={invalido("nome")}
          aria-describedby={idErrore("nome")}
          aria-required="true"
        />
        {errore("nome") && <p id="nome-errore" className={ERR}>{errore("nome")}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={valore("email")}
          aria-invalid={invalido("email")}
          aria-describedby={idErrore("email")}
          aria-required="true"
        />
        {errore("email") && <p id="email-errore" className={ERR}>{errore("email")}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="telefono">Telefono</Label>
        <Input
          id="telefono"
          name="telefono"
          type="tel"
          autoComplete="tel"
          defaultValue={valore("telefono")}
          aria-invalid={invalido("telefono")}
          aria-describedby={idErrore("telefono")}
        />
        {errore("telefono") && <p id="telefono-errore" className={ERR}>{errore("telefono")}</p>}
      </div>

      {/* Campo anti-spam: nascosto a chi usa il sito, non va compilato. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="sito">Sito web (lasciare vuoto)</label>
        <input id="sito" name="sito" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="flex items-start gap-3 text-[15px]">
          <input
            type="checkbox"
            name="privacy"
            value="on"
            defaultChecked={valore("privacy") === "on"}
            aria-invalid={invalido("privacy")}
            aria-describedby={idErrore("privacy")}
            aria-required="true"
            className="mt-1 size-4 accent-brand-strong"
          />
          <span>
            Ho letto l&apos;
            <Link href="/privacy" className="font-semibold text-brand-strong underline underline-offset-4">
              informativa privacy
            </Link>
          </span>
        </label>
        {errore("privacy") && <p id="privacy-errore" className={ERR}>{errore("privacy")}</p>}
      </div>

      <div className="md:col-span-2">
        <Button type="submit" variant="primary" size="lg" disabled={isPending} className="w-full md:w-auto">
          {isPending ? "Invio…" : "Invia richiesta"}
        </Button>
      </div>
    </form>
  );
}
