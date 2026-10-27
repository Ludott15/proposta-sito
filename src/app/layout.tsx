import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { JsonLd } from "@/components/ui/json-ld";
import { site } from "@/lib/content";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} · Stampa e grafica a ${site.citta}`,
    template: "%s · Tipografia Zappalà",
  },
  description: `${site.nome}, ${site.esperienza} a ${site.citta} (${site.provincia}). Stampa e finitura in laboratorio, grafica e pubblicità.`,
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: site.nome,
  },
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.nome,
  legalName: site.ragioneSociale,
  vatID: site.piva,
  url: site.url,
  image: `${site.url}/originali/logo-profilo-facebook.jpg`,
  telephone: site.telefono,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.indirizzo.via,
    postalCode: site.indirizzo.cap,
    addressLocality: site.indirizzo.citta,
    addressRegion: site.indirizzo.provincia,
    addressCountry: site.indirizzo.paese,
  },
  openingHoursSpecification: site.orariSchema.map((o) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: o.days,
    opens: o.opens,
    closes: o.closes,
  })),
  geo: { "@type": "GeoCoordinates", latitude: site.coordinate.lat, longitude: site.coordinate.lon },
  sameAs: [site.facebook],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it" className={`${archivo.variable} ${plexMono.variable} h-full antialiased`}>
      {/* Su mobile la barra in basso (56px più l'area sicura) copre il fondo: lo spazio lo riserva il body. */}
      <body className="flex min-h-full flex-col pb-[calc(56px+env(safe-area-inset-bottom))] md:pb-0">
        <a href="#contenuto" className="skip-link">
          Vai al contenuto
        </a>
        <SiteHeader />
        <main id="contenuto" className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
        <MobileTabBar />
        <JsonLd data={localBusiness} />
      </body>
    </html>
  );
}
