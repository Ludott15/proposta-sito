/* Illustrazioni flat di prodotto, usate quando non esiste una foto reale. SVG inline, nessuna dipendenza. */

const BRAND = "#0A9345";
const BRAND_STRONG = "#08713A";
const BRAND_SOFT = "#E7F4EC";
const INK = "#17211B";
const GRIGIO = "#DDE3DE";

const contorno = { stroke: INK, strokeWidth: 2, strokeLinejoin: "round" as const };
const righe = { stroke: BRAND_STRONG, strokeWidth: 3, strokeLinecap: "round" as const };

function Brochure() {
  return (
    <g>
      {/* tre ante */}
      <rect x="60" y="62" width="93" height="176" fill="#fff" {...contorno} />
      <rect x="153" y="62" width="94" height="176" fill="#fff" {...contorno} />
      <rect x="247" y="62" width="93" height="176" fill="#fff" {...contorno} />
      {/* anta sinistra: titolo e testo */}
      <rect x="74" y="80" width="42" height="7" fill={INK} />
      <line x1="74" y1="100" x2="126" y2="100" {...righe} strokeWidth={2} />
      <line x1="74" y1="110" x2="126" y2="110" {...righe} strokeWidth={2} />
      <line x1="74" y1="120" x2="118" y2="120" {...righe} strokeWidth={2} />
      <line x1="74" y1="130" x2="126" y2="130" {...righe} strokeWidth={2} />
      <line x1="74" y1="140" x2="110" y2="140" {...righe} strokeWidth={2} />
      {/* anta centrale: blocco immagine */}
      <rect x="165" y="80" width="70" height="92" fill={BRAND_SOFT} stroke={BRAND} strokeWidth={2} />
      <circle cx="184" cy="100" r="7" fill={BRAND} />
      <path d="M165 160 L192 128 L210 146 L220 136 L235 160 Z" fill={BRAND} />
      {/* anta destra: intestazione e righe */}
      <rect x="260" y="80" width="50" height="12" fill={BRAND_STRONG} />
      <line x1="260" y1="106" x2="326" y2="106" {...righe} strokeWidth={2} />
      <line x1="260" y1="116" x2="326" y2="116" {...righe} strokeWidth={2} />
      <line x1="260" y1="126" x2="318" y2="126" {...righe} strokeWidth={2} />
      <line x1="260" y1="136" x2="326" y2="136" {...righe} strokeWidth={2} />
      <line x1="260" y1="146" x2="304" y2="146" {...righe} strokeWidth={2} />
      <rect x="260" y="200" width="66" height="20" fill="none" stroke={BRAND_STRONG} strokeWidth={2} />
    </g>
  );
}

function Poster() {
  const x0 = 60;
  const y0 = 46;
  const w = 280;
  const h = 140;
  return (
    <g>
      {/* terreno e pali */}
      <line x1="30" y1="252" x2="370" y2="252" stroke={GRIGIO} strokeWidth={3} strokeLinecap="round" />
      <line x1="120" y1="186" x2="120" y2="252" {...contorno} strokeWidth={3} />
      <line x1="280" y1="186" x2="280" y2="252" {...contorno} strokeWidth={3} />
      {/* cartellone */}
      <rect x={x0} y={y0} width={w} height={h} fill="#fff" {...contorno} />
      {/* fogli 6 x 3 */}
      {[1, 2, 3, 4, 5].map((i) => (
        <line key={`v${i}`} x1={x0 + (w / 6) * i} y1={y0} x2={x0 + (w / 6) * i} y2={y0 + h} stroke={GRIGIO} strokeWidth={1.5} strokeDasharray="4 4" />
      ))}
      {[1, 2].map((i) => (
        <line key={`h${i}`} x1={x0} y1={y0 + (h / 3) * i} x2={x0 + w} y2={y0 + (h / 3) * i} stroke={GRIGIO} strokeWidth={1.5} strokeDasharray="4 4" />
      ))}
      {/* composizione grafica */}
      <rect x={x0 + 14} y={y0 + 14} width={110} height={112} fill={BRAND} />
      <circle cx={x0 + 69} cy={y0 + 70} r={28} fill="#fff" />
      <rect x={x0 + 140} y={y0 + 24} width={110} height={12} fill={INK} />
      <rect x={x0 + 140} y={y0 + 46} width={86} height={8} fill={BRAND_STRONG} />
      <rect x={x0 + 140} y={y0 + 100} width={70} height={18} fill="none" stroke={BRAND_STRONG} strokeWidth={2} />
    </g>
  );
}

function Riviste() {
  return (
    <g>
      {/* rivista di fondo, leggermente ruotata */}
      <g transform="rotate(-7 170 150)">
        <rect x="112" y="56" width="128" height="184" fill={BRAND_SOFT} {...contorno} />
        <rect x="112" y="56" width="128" height="34" fill={BRAND} />
        <line x1="128" y1="210" x2="224" y2="210" {...righe} strokeWidth={2} />
        <line x1="128" y1="222" x2="200" y2="222" {...righe} strokeWidth={2} />
      </g>
      {/* rivista in primo piano */}
      <g transform="rotate(3 230 150)">
        <rect x="170" y="48" width="128" height="196" fill="#fff" {...contorno} />
        <rect x="170" y="48" width="128" height="50" fill={BRAND_STRONG} />
        <rect x="186" y="62" width="82" height="14" fill="#fff" />
        <rect x="186" y="116" width="96" height="76" fill={BRAND_SOFT} stroke={BRAND} strokeWidth={2} />
        <circle cx="210" cy="140" r="9" fill={BRAND} />
        <path d="M186 192 L226 156 L250 178 L266 166 L282 192 Z" fill={BRAND} />
        <line x1="186" y1="212" x2="260" y2="212" {...righe} strokeWidth={2} />
        <line x1="186" y1="224" x2="240" y2="224" {...righe} strokeWidth={2} />
      </g>
    </g>
  );
}

function Timbro() {
  return (
    <g>
      {/* corpo del timbro */}
      <rect x="152" y="54" width="96" height="64" rx="10" fill="#fff" {...contorno} />
      <rect x="168" y="118" width="64" height="16" fill={BRAND_STRONG} />
      {/* base con impronta */}
      <rect x="136" y="134" width="128" height="14" rx="3" fill={INK} />
      <rect x="120" y="180" width="160" height="72" rx="6" fill="#fff" stroke={BRAND} strokeWidth={3} />
      <rect x="140" y="198" width="120" height="10" fill={BRAND} />
      <rect x="150" y="218" width="100" height="8" fill={INK} />
      <rect x="158" y="232" width="84" height="6" fill={INK} opacity="0.5" />
      {/* inchiostro sparso */}
      <circle cx="98" cy="214" r="3" fill={BRAND} />
      <circle cx="302" cy="196" r="2.5" fill={BRAND} />
      <circle cx="306" cy="232" r="3.5" fill={BRAND} />
      <circle cx="92" cy="240" r="2" fill={BRAND} />
    </g>
  );
}

function Fogli() {
  return (
    <g>
      <rect x="128" y="92" width="150" height="176" fill="#fff" {...contorno} transform="rotate(-6 203 180)" />
      <rect x="122" y="80" width="150" height="176" fill="#fff" {...contorno} transform="rotate(-2 197 168)" />
      <rect x="116" y="68" width="150" height="176" fill="#fff" {...contorno} />
      <rect x="132" y="92" width="86" height="10" fill={BRAND} />
      <line x1="132" y1="118" x2="250" y2="118" {...righe} strokeWidth={2} />
      <line x1="132" y1="130" x2="250" y2="130" {...righe} strokeWidth={2} />
      <line x1="132" y1="142" x2="232" y2="142" {...righe} strokeWidth={2} />
      <rect x="132" y="170" width="118" height="54" fill={BRAND_SOFT} stroke={BRAND} strokeWidth={2} />
    </g>
  );
}

const ETICHETTE: Record<string, string> = {
  brochure: "Brochure aperta a tre ante, con testo e un'immagine",
  "poster-6x3": "Cartellone 6 per 3 metri su due pali, diviso in fogli",
  riviste: "Due riviste sovrapposte con copertina e titolo",
  timbri: "Timbro autoinchiostrante con la sua impronta",
};

function Figura({ slug }: { slug: string }) {
  switch (slug) {
    case "brochure":
      return <Brochure />;
    case "poster-6x3":
      return <Poster />;
    case "riviste":
      return <Riviste />;
    case "timbri":
      return <Timbro />;
    default:
      return <Fogli />;
  }
}

/* Illustrazione 4:3 di un prodotto. Per gli slug senza disegno dedicato mostra una pila di fogli. */
export function IllustrazioneProdotto({ slug, className }: { slug: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label={ETICHETTE[slug] ?? "Pila di fogli stampati"}
      className={className ?? "block h-full w-full"}
      preserveAspectRatio="xMidYMid meet"
    >
      <rect width="400" height="300" fill={BRAND_SOFT} />
      <Figura slug={slug} />
    </svg>
  );
}
