import {
  BookMarked,
  BookOpen,
  Calendar,
  FileText,
  Layers,
  Megaphone,
  Newspaper,
  Printer,
  RectangleHorizontal,
  Stamp,
  type LucideIcon,
} from "lucide-react";

/* Icona per ogni prodotto di content/prodotti.json, usata quando manca una foto. */
const ICONE: Record<string, LucideIcon> = {
  volantini: Megaphone,
  depliant: Layers,
  manifesti: Newspaper,
  "poster-6x3": RectangleHorizontal,
  cataloghi: BookMarked,
  brochure: FileText,
  libri: BookOpen,
  riviste: Newspaper,
  calendari: Calendar,
  timbri: Stamp,
  "stampe-digitali": Printer,
};

export function iconaProdotto(slug: string): LucideIcon {
  return ICONE[slug] ?? FileText;
}
