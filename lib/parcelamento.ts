import { formatBRL } from "./shopify";

// Nº de parcelas por produto, exatamente como na lista do cliente.
// O preço no Shopify é o TOTAL (parcelas × valor); aqui derivamos a parcela
// para exibir "18x R$ 289,00" idêntico ao material de campanha.
const PARCELAS: Record<string, number> = {
  "poltrona-gemini-reclinavel-eletrica-fixa": 18, // Gemini · 18x 299 (total 5.382)
  "conjunto-turim": 18,                           // Conjunto Turim · 18x 439 (total)
  "sofa-milano-terracota": 12,                    // Milano · 12x 1.320 (total 15.840)
  "sofa-nice-02": 12,                             // Nice · 12x 869 (total 10.428)
  "sofa-dulce": 12,                               // Madson · 12x 649 (total 7.788)
  "sofa-chesterfield": 12,                        // Chesterfield 3 lug · 12x 768 (total 9.216)
  "sofa-gaby": 18,                                // Gaby · 18x 1.299 (total 23.382)
  "sofa-agatha": 12,                              // Agatha · 12x 479 (total 5.748)
  "sofa-majestic-1": 18,                          // Majestic · 18x 1.220 (total 21.960)
  "sofa-star": 18,                                // Conjunto Star · 18x 439 (total 7.902)
  "sofa-romeu": 12,                               // Romeu · 12x 469 (total 5.628)
  "sofa-lumin": 18,                               // Lumin · 18x 919 (total 16.542)
  "prestige": 18,                                // Prestigie · 18x 990 (total 17.820)
  "woodback": 12,                            // Woodback · 12x 1.749 (total 20.988)   
  "tokyo": 18,                               // Tokyo · 18x 549 (total 9.882)
  "sofa-magnus": 18,                              // Magnus · 18x 979 (total 17.622) 
  "sofa-canto-mirage-em-couro-2-80x2-20mt": 10,   // Canto Mirage · 10x 979 (total 9.790)
  "f-k": 12,                                // F.K. · 12x 800 (total 9.600)
  "bellatrix": 18,                           // Bellatrix · 18x 1.099 (total 19.782)
  "elegance": 18,                            // Elegance · 18x 1.099 (total 19.782)
  "sofa-romeu-02": 12,                            // Romeu · 12x 469 (total 5.628)
  "sofa-milano-terracota-02": 12,                 // Milano · 12x 1.320 (total 15.840)
  "sofa-nice-02-02": 12,                          // Nice · 12x 869 (total 10.428)
  "sofa-dulce-02": 12,                            // Madson · 12x 649 (total 7.788) 
  "oxford": 12,                           // Oxford · 12x 778 (total 9.336)
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
