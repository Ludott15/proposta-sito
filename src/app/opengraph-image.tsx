import { ImageResponse } from "next/og";

export const alt = "Tipografia Zappalà, stampa a Belpasso";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Colori hex: Satori non legge le variabili CSS. */
const BRAND = "#0A9345";
const INK = "#17211B";
const BG = "#FBFBF9";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: 80,
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 2, color: BRAND, textTransform: "uppercase" }}>
          Belpasso · CT
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 800,
            color: INK,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          Tipografia Zappalà: stampa e grafica a Belpasso
        </div>
        <div style={{ display: "flex", width: "100%", height: 16, background: BRAND }} />
      </div>
    ),
    { ...size },
  );
}
