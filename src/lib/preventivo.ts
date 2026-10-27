import { z } from "zod";
import prodottiData from "@content/prodotti.json";

export const MAX_FILE_BYTES = 10 * 1024 * 1024;

export const ESTENSIONI_FILE = [".pdf", ".jpg", ".jpeg", ".png", ".tif", ".tiff", ".ai", ".eps", ".zip"] as const;

const slugProdotti = prodottiData.map((p) => p.slug) as [string, ...string[]];

const telefonoValido = /^[0-9+\s]+$/;

export const preventivoSchema = z.object({
  prodotto: z.enum(slugProdotti, { error: "Scegli un prodotto dall'elenco." }),
  quantita: z
    .string()
    .trim()
    .min(1, { error: "Indica la quantità." })
    .max(50, { error: "La quantità è troppo lunga (max 50 caratteri)." }),
  formato: z.string().trim().max(100, { error: "Il formato è troppo lungo (max 100 caratteri)." }).optional(),
  carta: z.string().trim().max(100, { error: "Il campo carta è troppo lungo (max 100 caratteri)." }).optional(),
  finitura: z.string().trim().max(100, { error: "Il campo finitura è troppo lungo (max 100 caratteri)." }).optional(),
  note: z.string().trim().max(2000, { error: "Le note sono troppo lunghe (max 2000 caratteri)." }).optional(),
  nome: z
    .string()
    .trim()
    .min(2, { error: "Inserisci il nome (almeno 2 caratteri)." })
    .max(100, { error: "Il nome è troppo lungo (max 100 caratteri)." }),
  email: z.email({ error: "Inserisci un'email valida." }).max(254, { error: "L'email è troppo lunga." }),
  telefono: z
    .string()
    .trim()
    .max(30, { error: "Il telefono è troppo lungo (max 30 caratteri)." })
    .refine((v) => v === "" || telefonoValido.test(v), { error: "Il telefono può contenere solo cifre, spazi e il simbolo +." })
    .optional(),
  privacy: z.literal("on", { error: "Serve il consenso per rispondere alla richiesta" }),
});

export type PreventivoInput = z.infer<typeof preventivoSchema>;
export type PreventivoField = keyof PreventivoInput | "file";
export type PreventivoState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<PreventivoField, string>>;
  values?: Partial<Record<keyof PreventivoInput, string>>;
};
export const initialPreventivoState: PreventivoState = { status: "idle" };
