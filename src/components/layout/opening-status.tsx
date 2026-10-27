"use client";

import { useEffect, useState } from "react";
import type { OrarioSchema } from "@/lib/content";

const FORMATO = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Rome",
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function inMinuti(ora: string) {
  const [h, m] = ora.split(":").map(Number);
  return h * 60 + m;
}

/* Stato di apertura calcolato sull'ora di Roma. Prima dell'idratazione mostra "Orari". */
export function OpeningStatus({ schema }: { schema: OrarioSchema[] }) {
  const [stato, setStato] = useState<string | null>(null);

  useEffect(() => {
    const parti = FORMATO.formatToParts(new Date());
    const giorno = parti.find((p) => p.type === "weekday")?.value ?? "";
    const ore = Number(parti.find((p) => p.type === "hour")?.value);
    const minutiParte = Number(parti.find((p) => p.type === "minute")?.value);
    const minuti = ore * 60 + minutiParte;
    const turno = schema.find(
      (s) => s.days.includes(giorno) && minuti >= inMinuti(s.opens) && minuti < inMinuti(s.closes),
    );
    setStato(turno ? `Aperti ora, fino alle ${turno.closes}` : "Chiusi adesso");
  }, [schema]);

  return <span>{stato ?? "Orari"}</span>;
}
