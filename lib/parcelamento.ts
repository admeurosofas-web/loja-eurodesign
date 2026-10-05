import { formatBRL } from "./shopify";

// Nº de parcelas específicas por produto.
//
// REGRA:
// - Produtos cadastrados abaixo usam o parcelamento informado.
// - Qualquer produto que NÃO esteja nesta lista usa automaticamente 12x.
//
// Dessa forma, nenhum produto da coleção ficará exibindo apenas o preço total.
const PARCELAS: Record<string, number> = {
  "poltrona-gemini-reclinavel-eletrica-fixa": 18, // Gemini
  "conjunto-turim": 18,                           // Turim
  "sofa-milano-terracota": 12,                    // Milano
  "sofa-nice-02": 12,                             // Nice
  "sofa-dulce": 12,                               // Madson
  "sofa-chesterfield": 12,                        // Chesterfield
  "sofa-gaby": 18,                                // Gaby
  "sofa-agatha": 12,                              // Agatha
  "sofa-majestic-1": 18,                          // Majestic
  "star": 18,                                     // Star
  "stylo": 18,                                    // Stylo
  "sofa-romeu": 12,                               // Romeu
  "sofa-lumin": 18,                               // Lumin
  "prestige": 18,                                 // Prestige
  "woodback": 12,                                 // Woodback
  "tokyo": 18,                                    // Tokyo
  "sofa-magnus": 18,                              // Magnus
  "sofa-canto-mirage-em-couro-2-80x2-20mt": 12,   // Mirage
  "f-k": 12,                                      // F.K.
  "sofa-runo": 18,                                // Runo
  "sofa-bellatrix": 18,                           // Bellatrix
  "elegance": 12,                                 // Elegance
  "sofa-romeu-02": 12,                            // Romeu
  "sofa-milano-terracota-02": 12,                 // Milano
  "sofa-nice-02-02": 12,                          // Nice
  "sofa-dulce-02": 12,                            // Madson
  "oxford": 12,                                   // Oxford
};

export type Parcelamento = {
  parcelas: number;
  valorParcela: string;
  label: string;
};

export function getParcelamento(
  handle: string,
  totalAmount: string | number,
  currency = "BRL",
): Parcelamento | null {
  // Se o produto não estiver cadastrado acima, usa 12x automaticamente.
  const n = PARCELAS[handle] ?? 12;

  const total =
    typeof totalAmount === "string"
      ? parseFloat(totalAmount)
      : totalAmount;

  if (!total || total <= 0) return null;

  const valor = total / n;
  const valorParcela = formatBRL(valor, currency);

  return {
    parcelas: n,
    valorParcela,
    label: `${n}x ${valorParcela}`,
  };
}