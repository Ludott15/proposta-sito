import Image from "next/image";
import Link from "next/link";
import type { Prodotto } from "@/lib/content";
import { getImmaginiProdotto } from "@/lib/content";
import { Card, CardBody } from "@/components/ui/card";
import { IllustrazioneProdotto } from "@/components/prodotti/illustrazione-prodotto";

/* Card di un prodotto: foto reale se presente, altrimenti illustrazione. Proporzione fissa 4:3. */
export function ProdottoCard({ prodotto }: { prodotto: Prodotto }) {
  const foto = getImmaginiProdotto(prodotto.slug)[0];

  return (
    <Link href={`/prodotti/${prodotto.slug}`} className="group block h-full text-ink no-underline">
      <Card className="h-full transition duration-200 group-hover:border-brand-strong motion-safe:group-hover:translate-y-0.5">
        <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-brand-soft">
          {foto ? (
            <Image
              src={foto.file}
              alt={foto.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <IllustrazioneProdotto slug={prodotto.slug} />
          )}
        </div>
        <CardBody className="gap-2">
          <h3 className="text-[1.2rem] font-bold">{prodotto.nome}</h3>
          <p className="text-[15px] leading-relaxed text-ink-muted">{prodotto.uso}</p>
        </CardBody>
      </Card>
    </Link>
  );
}
