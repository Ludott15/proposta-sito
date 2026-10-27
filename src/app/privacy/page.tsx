import type { Metadata } from "next";
import { site } from "@/lib/content";
import { TextPage, TextSection } from "@/components/layout/text-page";

export const metadata: Metadata = {
  title: "Informativa privacy",
  description: `Informativa sul trattamento dei dati personali per le richieste di preventivo di ${site.nome}.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const a = site.indirizzo;

export default function Privacy() {
  return (
    <TextPage
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Informativa privacy" }]}
      eyebrow="Privacy"
      title="Informativa privacy"
      intro="Come trattiamo i dati che ci invii con il modulo di richiesta di preventivo, ai sensi del Regolamento UE 2016/679 (GDPR)."
    >
      <TextSection id="titolare" title="Titolare del trattamento">
        <p>
          Titolare del trattamento è <strong>{site.ragioneSociale}</strong>, P.IVA {site.piva}, con sede in {a.via},{" "}
          {a.cap} {a.citta} ({a.provincia}).
        </p>
        <p>
          Per qualsiasi richiesta sui tuoi dati puoi scrivere a <a href={`mailto:${site.email}`}>{site.email}</a> o
          chiamare il {site.telefono}.
        </p>
      </TextSection>

      <TextSection id="dati" title="Dati raccolti">
        <p>
          Il modulo di preventivo raccoglie: nome, email (obbligatori); telefono, prodotto, quantità, formato, carta,
          finitura, note e il file allegato (facoltativi). Il sito non richiede altri dati.
        </p>
      </TextSection>

      <TextSection id="finalita" title="Finalità e base giuridica">
        <p>
          I dati servono a rispondere alla tua richiesta di preventivo. La base giuridica è l&apos;articolo 6, paragrafo
          1, lettera b) del GDPR: l&apos;esecuzione di misure precontrattuali adottate su tua richiesta.
        </p>
        <p>Il conferimento dei dati obbligatori è necessario: senza nome ed email non possiamo risponderti.</p>
        <p>Non è previsto alcun processo decisionale automatizzato, né profilazione.</p>
      </TextSection>

      <TextSection id="conservazione" title="Per quanto tempo li conserviamo">
        <p>
          Conserviamo le richieste per 24 mesi dalla ricezione, poi le cancelliamo. Il file allegato resta con la
          richiesta e segue lo stesso termine.
        </p>
      </TextSection>

      <TextSection id="destinatari" title="A chi comunichiamo i dati">
        <p>
          I dati non vengono diffusi. Vengono trattati dal personale della tipografia e da fornitori che ci assistono
          tecnicamente: il servizio di invio email (Resend), che consegna la richiesta nella nostra casella, e il
          fornitore di hosting del sito. Il servizio di invio può trattare dati anche fuori dall&apos;Unione Europea,
          con le garanzie previste dagli articoli 44-46 del GDPR.
        </p>
      </TextSection>

      <TextSection id="mappa" title="Mappa nella pagina Contatti">
        <p>
          La pagina Contatti mostra una mappa di OpenStreetMap. Quando la pagina si carica, il tuo browser si collega ai
          server di OpenStreetMap e questi ricevono il tuo indirizzo IP.
        </p>
      </TextSection>

      <TextSection id="cookie" title="Cookie">
        <p>Il sito non usa cookie di profilazione né strumenti pubblicitari.</p>
      </TextSection>

      <TextSection id="diritti" title="I tuoi diritti">
        <p>
          Hai diritto di accedere ai tuoi dati, di chiederne la rettifica o la cancellazione, la limitazione del
          trattamento, la portabilità e di opporti al trattamento (artt. 15-22 del GDPR). Per esercitarli scrivi a{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <p>
          Se ritieni che il trattamento non sia conforme, puoi proporre reclamo al Garante per la protezione dei dati
          personali (<a href="https://www.garanteprivacy.it" rel="noopener">garanteprivacy.it</a>).
        </p>
      </TextSection>
    </TextPage>
  );
}
