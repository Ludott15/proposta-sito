# Report finale — Redesign Tipografia Zappalà

## Cosa cambia rispetto al sito attuale

**Versione 2:** struttura allineata ai progetti Next.js di riferimento: `src/`, Tailwind v4, `components/ui` + `components/layout`, lucide-react, next/image (AVIF/WebP), next/font. Palette dal verde del logo (`#0A9345`, `#08713A` per testo/bottoni). Menu Prodotti a tendina, breadcrumb, tab bar mobile, galleria `/lavori` con 18 foto originali. Il form preventivo è una Server Action (zod + Resend): per attivare l'invio copia `.env.example` in `.env.local` e imposta `RESEND_API_KEY`; senza chiave il form mostra telefono ed email, senza mai simulare un invio.

| Prima (Swite, template `business_kis`) | Ora (Next.js, pagine pre-renderizzate) |
|---|---|
| SPA renderizzata solo lato client, title statico "SwiteFrontendNg" | 22 pagine HTML complete lato server, title e description unici |
| One-page con ancore (Copertina, Info, Pensieri, Foto, Video…) | Rotte in italiano: `/servizi/`, `/prodotti/`, `/prodotti/[slug]/` (11), `/chi-siamo/`, `/preparazione-file/`, `/contatti/`, `/preventivo/` |
| Nessun H1, nessun dato strutturato | Un H1 per pagina, JSON-LD LocalBusiness + Product (senza prezzi), sitemap.xml, robots.txt, immagine Open Graph |
| Bundle ~3 MB, Font Awesome da CDN, 3 fornitori di font | JS client solo nel form preventivo, font self-hosted (Archivo variabile + IBM Plex Mono) |
| 9 immagini su 12 senza alt | Ogni immagine ha alt (da completare, vedi sotto), width/height espliciti |
| Nessuna CTA | CTA "Richiedi preventivo" nell'header e in ogni scheda prodotto (precompila il prodotto) |
| Policy cookie/privacy in 404 | Checkbox privacy nel form (testo da fornire) |
| Testo con refusi ("sà", "trant'anni") | Copy breve, solo fatti presenti nell'inventario |

Design system "Bozza di stampa": token su `:root` in `app/globals.css`, consultabile su `/design-system/` (noindex).
Contenuti modificabili senza toccare i componenti: `content/site.json`, `content/prodotti.json`.

**Versione 3:** tutti i dati sono stati completati e confermati dal committente. Ragione sociale e P.IVA vengono dai registri pubblici (PagineGialle/PagineBianche), le coordinate da OpenStreetMap. Brochure, poster 6×3, riviste e timbri hanno illustrazioni SVG al posto delle foto, ed è stata aggiunta l'informativa /privacy. Le liste qui sotto sono storiche: nel sito non resta nessun segnaposto.

## Storico: dati che erano da confermare

- Ragione sociale completa e P.IVA
- Anno di fondazione, persone/titolari da citare
- Logo ufficiale vettoriale (oggi esiste solo la foto profilo Facebook)
- Per ogni prodotto: formati (quelli mostrati sono indicativi), carte, grammature, finiture, tiratura minima, tempi
- Campionario: superfici, grammature e disponibilità reali
- Consegna a domicilio sì/no (step 5 del processo)
- Elenco macchine da stampa e finitura (pagina Chi siamo)
- Descrizioni (alt) delle 6 foto dei lavori in `content/site.json`
- Testo dell'informativa privacy
- Chiave Resend e indirizzo mittente verificato per l'invio del form (allegati fino a 10 MB)
- Posizione esatta del marker sulla mappa in /contatti
- Email aziendale su dominio proprio al posto di gmail (consigliato)

## [FOTO DA SCATTARE]

- Il laboratorio
- Le macchine da stampa
- Un esempio stampato per ciascuno degli 11 prodotti
- Campioni delle 4 superfici carta
- Manifesto 6×3 installato su strada
- Esempio di impaginazione o marchio realizzato
- Mappa statica per contatti e footer (`[MAPPA STATICA DA GENERARE]`)

## Come avviarlo

```
npm install
npm run dev     # sviluppo
npm run build   # produzione (deploy consigliato: Vercel)
```
