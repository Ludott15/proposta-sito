import siteData from "@content/site.json";
import prodottiData from "@content/prodotti.json";
import immaginiData from "@content/immagini.json";

export interface Orario {
  giorni: string;
  ore: string;
}

export interface OrarioSchema {
  days: string[];
  opens: string;
  closes: string;
}

export interface Indirizzo {
  via: string;
  cap: string;
  citta: string;
  provincia: string;
  paese: string;
}

export interface Servizio {
  slug: string;
  numero: string;
  titolo: string;
  testo: string;
  prodotti: string[];
}

export interface Prodotto {
  slug: string;
  nome: string;
  uso: string;
  formati: string[];
  carte: string;
  grammature: string;
  finiture: string;
  tiratura: string;
  tempi: string;
}

export interface PassoProcesso {
  n: string;
  titolo: string;
  testo: string;
}

export interface VoceFile {
  voce: string;
  valore: string;
}

export interface CartaCampionario {
  superficie: string;
  grammatura: string;
  disponibilita: string;
  uso: string;
}

export interface Persona {
  nome: string;
  ruolo: string;
}

export interface Coordinate {
  lat: number;
  lon: number;
}

export interface Immagine {
  file: string;
  w: number;
  h: number;
  alt: string;
  categoria: "lavoro" | "prodotto" | "altro" | "laboratorio" | "logo";
  prodotto: string | null;
}

export interface Site {
  nome: string;
  ragioneSociale: string;
  piva: string;
  url: string;
  citta: string;
  provincia: string;
  indirizzo: Indirizzo;
  telefono: string;
  telefonoHref: string;
  email: string;
  facebook: string;
  mappaUrl: string;
  orari: Orario[];
  orariSchema: OrarioSchema[];
  esperienza: string;
  storia: string;
  persone: Persona[];
  servizi: Servizio[];
  processo: PassoProcesso[];
  preparazioneFile: VoceFile[];
  campionario: CartaCampionario[];
  coordinate: Coordinate;
}

export const site: Site = siteData as Site;

const prodotti: Prodotto[] = prodottiData as Prodotto[];
const immagini: Immagine[] = immaginiData as Immagine[];

export function getProdotti(): Prodotto[] {
  return prodotti;
}

export function getProdotto(slug: string): Prodotto | undefined {
  return prodotti.find((p) => p.slug === slug);
}

/* Tutte le foto del sito, logo escluso. */
export function getImmagini(): Immagine[] {
  return immagini.filter((i) => i.categoria !== "logo");
}

/* Foto collegate a un prodotto (es. "volantini"). Può essere vuoto. */
export function getImmaginiProdotto(slug: string): Immagine[] {
  return getImmagini().filter((i) => i.prodotto === slug);
}

/* Foto di lavoro, ordinate come nel file. */
export function getLavori(): Immagine[] {
  return getImmagini().filter((i) => i.categoria === "lavoro");
}

/* Foto per la hero: il lavoro di area più grande (il file più dettagliato). */
export function getCopertina(): Immagine {
  return getLavori().reduce((a, b) => (b.w * b.h > a.w * a.h ? b : a));
}
