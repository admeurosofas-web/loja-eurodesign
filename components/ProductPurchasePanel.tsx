'use client';

import { useState, useTransition } from 'react';
import { addItemAction } from '@/lib/cart-actions';
import type { Product } from '@/lib/shopify/types';

/** Mapa cor → hex pro swatch. Nomes precisam bater com os valores da opção "Cor" no Shopify. */
const COLOR_HEX: Record<string, string> = {
  'Off White': '#f2ede1',
  'Off-White': '#f2ede1',
  Bege: '#d9c9a8',
  Cinza: '#8f8a83',
  'Cinza claro': '#c6c1b8',
  'Cinza escuro': '#4a4744',
  Marrom: '#5c3a24',
  Preto: '#1a1a1a',
  Azul: '#22406b',
  'Azul marinho': '#152a4a',
  Verde: '#3f5344',
  Caramelo: '#a06a3a',
  'Caramelo claro': '#c88a4e',
  'Caramelo escuro': '#5c3a1e',
  Branco: '#faf8f5',
  Vinho: '#5c1f2a',
};

function hexFor(color: string): string {
  return COLOR_HEX[color] ?? '#c6c1b8';
}

export default function ProductPurchasePanel({ product }: { product: Product }) {
  const colorOption = product.options.find(
    (o) => o.name.toLowerCase() === 'cor' || o.name.toLowerCase() === 'color',
  );
  const hasRealVariants =
    product.variants.length > 0 &&
    product.variants[0].title !== 'Default Title';

  // Estado das opções selecionadas — cada option name → value
  const initialSelected: Record<string, string> = {};
  for (const opt of product.options) {
    if (opt.name !== 'Title') initialSelected[opt.name] = opt.values[0];
  }
  const [selected, setSelected] = useState(initialSelected);

  // Encontra a variante que casa com todas as opções selecionadas
  const selectedVariant =
    hasRealVariants
      ? product.variants.find((v) =>
          v.selectedOptions.every((so) => selected[so.name] === so.value),
        ) ?? product.variants[0]
      : product.variants[0];

  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  const available = selectedVariant?.availableForSale ?? product.availableForSale;

  const handleAdd = () => {
    if (!selectedVariant) return;
    startTransition(async () => {
      await addItemAction(selectedVariant.id, 1);
      window.dispatchEvent(new CustomEvent('cart:updated'));
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Opções — cor com swatch, demais como pills */}
      {product.options
        .filter((o) => o.name !== 'Title')
        .map((opt) => {
          const isColor = opt === colorOption;
          const current = selected[opt.name];

          return (
            <div key={opt.id}>
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-medium text-carvao">{opt.name}</p>
                <p className="text-sm text-carvao-soft">{current}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                {opt.values.map((val) => {
                  const active = current === val;
                  if (isColor) {
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() =>
                          setSelected((s) => ({ ...s, [opt.name]: val }))
                        }
                        aria-label={val}
                        aria-pressed={active}
                        title={val}
                        className={`relative h-9 w-9 rounded-full border transition-all ${
                          active
                            ? 'border-carvao ring-2 ring-carvao ring-offset-2 ring-offset-cream'
                            : 'border-linha hover:border-carvao'
                        }`}
                        style={{ backgroundColor: hexFor(val) }}
                      />
                    );
                  }
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() =>
                        setSelected((s) => ({ ...s, [opt.name]: val }))
                      }
                      aria-pressed={active}
                      className={`min-w-14 rounded-lg border px-4 py-2 text-sm transition-colors ${
                        active
                          ? 'border-carvao bg-carvao text-cream'
                          : 'border-linha text-carvao hover:border-carvao'
                      }`}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

      {/* CTA */}
      {!available ? (
        <button
          disabled
          className="rounded-lg w-full cursor-not-allowed border border-linha bg-cream-2 py-4 text-[12px] uppercase tracking-[0.2em] text-carvao-soft/60"
        >
          Produto esgotado
        </button>
      ) : (
        <button
          onClick={handleAdd}
          disabled={isPending}
          className="rounded-lg w-full bg-marca py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-carvao transition-colors hover:bg-carvao hover:text-cream disabled:opacity-60"
        >
          {isPending
            ? 'Adicionando…'
            : done
              ? 'Adicionado ✓'
              : 'Adicionar à sacola'}
        </button>
      )}
    </div>
  );
}
