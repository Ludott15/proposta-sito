"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, House, Images, Phone, Printer, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const voci: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Home", icon: House },
  { href: "/prodotti", label: "Prodotti", icon: Printer },
  { href: "/lavori", label: "Lavori", icon: Images },
  { href: "/preventivo", label: "Preventivo", icon: FileText },
  { href: "/contatti", label: "Contatti", icon: Phone },
];

/* Barra in basso su mobile: cinque destinazioni principali. Su md e oltre non compare. */
export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigazione rapida"
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      {voci.map(({ href, label, icon: Icon }) => {
        const attivo = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={attivo ? "page" : undefined}
            className={cn(
              "flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold no-underline",
              attivo ? "text-brand-strong" : "text-ink-muted",
            )}
          >
            <Icon aria-hidden="true" className="size-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
