import type { MetadataRoute } from "next";
import { site, getProdotti } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const rotte = [
    "/",
    "/servizi",
    "/prodotti",
    ...getProdotti().map((p) => `/prodotti/${p.slug}`),
    "/lavori",
    "/chi-siamo",
    "/preparazione-file",
    "/contatti",
    "/preventivo",
    "/privacy",
  ];

  return rotte.map((rotta) => ({
    url: `${base}${rotta}`,
  }));
}
