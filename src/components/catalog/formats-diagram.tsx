/* Dimensioni reali in mm. Il formato 70x100 cm equivale a 700x1000 mm. */
const FORMATI = [
  { label: "70×100 cm", w: 700, h: 1000 },
  { label: "A3", w: 297, h: 420 },
  { label: "A4", w: 210, h: 297 },
  { label: "A5", w: 148, h: 210 },
  { label: "A6", w: 105, h: 148 },
  { label: "85×55 mm", w: 85, h: 55 },
];

const BASE_Y = 1030;
const BASE_X = 10;
const VB_W = 720;
const VB_H = 1040;

/* Rettangoli sovrapposti in proporzione reale, allineati in basso a sinistra. */
export function FormatsDiagram() {
  return (
    <figure className="flex flex-col gap-3">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        role="img"
        aria-label="Confronto dei formati di stampa in proporzione reale"
        className="mx-auto h-auto w-full max-w-[360px]"
      >
        {FORMATI.map((f) => (
          <g key={f.label}>
            <rect
              x={BASE_X}
              y={BASE_Y - f.h}
              width={f.w}
              height={f.h}
              style={{ fill: "var(--brand-soft)", stroke: "var(--brand-strong)" }}
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <text x={BASE_X + 12} y={BASE_Y - f.h + 30} fontSize="26" style={{ fontFamily: "var(--font-mono)", fill: "var(--ink)" }}>
              {f.label}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="label-mono text-ink-muted">
        Dimensioni in mm, in proporzione reale.
      </figcaption>
    </figure>
  );
}
