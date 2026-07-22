import { formatBRL } from "./shopify";

// Nº de parcelas por produto, exatamente como na lista do cliente.
// O preço no Shopify é o TOTAL (parcelas × valor); aqui derivamos a parcela
// para exibir "18x R$ 289,00" idêntico ao material de campanha.
const PARCELAS: Record<string, number> = {
  "poltrona-gemini-reclinavel-eletrica-fixa": 12, // Gemini Couro · 12x 1.490
  "sofa-turim-off-white": 18,                     // Conjunto Turim · 18x 439
  "sofa-milano-terracota": 12,                    // Milano · 12x 1.320
  "sofa-nice-02": 12,                             // Nice · 12x 869
  "sofa-dulce": 12,                               // Madson · 12x 649
  "sofa-chesterfield-04": 12,                     // Chesterfield 3 lug · 12x 768
  "sofa-gaby": 18,                                // Gaby · 18x 1.299
  "sofa-agatha": 12,                              // Agatha · 12x 479
  "sofa-majestic-1": 18,                          // Majestic · 18x 1.220
  "sofa-star": 18,                                // Conjunto Star · 18x 439
  "sofa-romeu": 12,                               // Romeu · 12x 469
  "sofa-lumin": 18,                               // Lumin · 18x 919
  "prestigie": 18,                                // Prestigie · 18x 990
  "sofa-woodback": 12,                            // Woodback · 12x 1.749
  "sofa-tokyo": 18,                               // Tokyo · 18x 549
  "sofa-magnus": 18,                              // Magnus · 18x 979
  "sofa-canto-mirage-em-couro-2-80x2-20mt": 10,   // Canto Mirage · 10x 979
};

export type Parcelamento = {
  parcelas: number;
  valorParcela: string; // "R$ 289,00"
  label: string;        // "18x R$ 289,00"
};

export function getParcelamento(
  handle: string,
  totalAmount: string | number,
  currency = "BRL",
): Parcelamento | null {
  const n = PARCELAS[handle];
  const total = typeof totalAmount === "string" ? parseFloat(totalAmount) : totalAmount;
  if (!n || !total || total <= 0) return null;

  const valor = total / n;
  const valorParcela = formatBRL(valor, currency);
  return { parcelas: n, valorParcela, label: `${n}x ${valorParcela}` };
}
