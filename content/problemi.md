# Problemi rilevati - tipografiazappala.it

Evidenze da: HTML statico (`idx.html`), bundle `main.*.js`, CSS, DOM renderizzato, API `api/page/99204/*`.

## SEO
- **Rendering solo client:** l'HTML statico ha `<body><app-root></app-root>` vuoto. Testi, contatti e immagini sono caricati via API dopo il JS. Crawler senza JS vedono solo il titolo.
- **Titolo statico errato:** `<title>SwiteFrontendNg</title>` nell'HTML iniziale. Il titolo "Tipografia Zappalà" compare solo dopo l'esecuzione del JS.
- **Nessun H1:** nel DOM renderizzato `h1` = 0. Le sezioni hanno solo H2 ("Info", "Lavori", "Foto", "Video", "Contattami").
- **Nessun JSON-LD:** nessun schema `LocalBusiness`/`PrintShop` con indirizzo, telefono, orari.
- **Nessun og:title / og:image** rilevato nel DOM: anteprime social povere.
- **Meta description** presente e corretta, ma il testo è generico ("si occupa di pubblicità").
- **Keyword assenti:** nessuna parola chiave locale (es. "tipografia Belpasso", "stampa Catania") nei titoli o nei testi.
- **Contenuto scarso:** circa 3.300 caratteri di testo visibile in tutta la pagina.

## Performance
- **Font Awesome da CDN:** `cdnjs.cloudflare.com/.../font-awesome/6.1.1/css/all.min.css` (CSS completo) per circa 11 icone sul DOM. Sono presenti anche Font Awesome 5 nel CSS principale: duplicazione.
- **Bundle grande:** `main.076d916f2fbb8f0d.js` = 2.99 MB non compresso, `styles.*.css` = 858 KB. Il CSS contiene regole di molti template, non solo quello usato.
- **Webfont multipli:** Open Sans caricato da Google Fonts con molti subset (unicode-range), più ProximaNova via webfont.js da ajax.googleapis.com, più Font Awesome. Tre fornitori esterni per i font.
- **Script di terze parti:** Google Analytics, Facebook Pixel, Cookiebot, Google Maps API (caricata solo per la mappa, non presente in pagina), tinymce referenziato nel bundle.
- **Chiamate API a cascata:** la home esegue circa 10 chiamate sequenziali (`page/d:`, `page/tipografiazappala`, `domains`, `style`, `data`, `widget/*/content`) prima di mostrare i contenuti.
- **Immagini non ottimizzate:** le immagini dei lavori arrivano dallo storage Swite in JPG a risoluzione variabile (fino a 1654x1437 per le foto, 350x350 per alcuni lavori). Nessun formato moderno (WebP/AVIF) né `srcset` rilevato.

## Accessibilità
- **Immagini senza alt:** 9 immagini su 12 nel DOM senza attributo `alt`.
- **Link social senza testo:** l'icona Facebook è un link senza testo accessibile.
- **Contrasto:** testi bianchi/grigi su sfondi chiari da verificare (es. "Facebook Page" su sfondo grigio): da misurare.
- **Lingua:** `lang="en"` nell'HTML statico (`<html lang="en">`), mentre il sito è in italiano. Errore grave per screen reader e SEO.
- **Form contatti:** campo "INVIA" senza label visibili verificate: da controllare.

## Testi
- **Refuso:** "La Tipografia Zappalà sà bene" (dovrebbe essere "sa").
- **Testo lungo e generico:** il blocco Info è un unico paragrafo di circa 900 caratteri, in grassetto, senza struttura. Termini vaghi ("soluzioni personalizzate", "massima professionalità") senza prove.
- **Testo "Lavori" senza titoli:** le immagini dei lavori non hanno didascalie né descrizioni: nessun contenuto informativo.
- **Nome incoerente:** "Tipografia Zappalà" nella intestazione, ma "Zappala" senza accento nel dominio e nell'email. Da uniformare.
- **Email generica:** grafiche.zappala@gmail.com (dominio gratuito) per un'attività commerciale: impatta sulla credibilità.
- **Placeholder / vuoti:** blocchi "Servizi", "Partner", "Eventi", "Recensioni", "Team" presenti nel template ma vuoti (non visibili, ma indicano contenuti mancanti).

## Link e tecnica
- **Policy mancanti:** `policy/cookie` e `policy/privacy` restituiscono 404 dall'API. Nessuna pagina privacy/cookie pubblica: problema di conformità GDPR.
- **Link footer/menu:** solo ancore interne (`#cover`, `#info`, ...) e un link Facebook. Nessun link a pagine di servizio o di dettaglio.
- **Link "Facebook Page" duplicato** in più sezioni (contacts, places, footer): ridondante.
- **Dipendenza dalla piattaforma:** il footer riporta "FATTO CON DA SWITE": branding della piattaforma visibile.

## Gerarchia e contenuti
- **Nessun CTA principale:** non c'è un pulsante "Richiedi preventivo" o "Chiama ora" nella prima schermata. Il form è in fondo alla pagina.
- **Gerarchia piatta:** sezioni con stesso peso visivo; i servizi (stampa) sono una lista di testo nella copertina, non una sezione dedicata.
- **Nessun prezzo, nessun tempo di consegna, nessun formato:** l'utente non può capire cosa e come si ordina.
- **Galleria senza filtro:** lavori e foto mescolati, senza categorie (volantini, poster, brochure, ecc.).

## Mobile
- **Viewport presente** (`width=device-width`), ma la verifica del layout a 375 px non è stata eseguita: da controllare con emulazione.
- **Dipendenza da JS:** su browser senza JS la pagina è vuota.

## Dati da confermare (non problemi, ma mancano)
- Anno di fondazione esatto, P.IVA, PEC, persone del team, formati e prezzi dei prodotti, logo vettoriale ufficiale.
