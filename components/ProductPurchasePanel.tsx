'use client';

import { useEffect, useState, useTransition } from 'react';
import { addItemAction } from '@/lib/cart-actions';
import type { Product } from '@/lib/shopify/types';
import InfoModal from './InfoModal';

/** Mapa cor → hex pro swatch. Nomes precisam bater com os valores da opção "Cor" no Shopify. */
const COLOR_HEX: Record<string, string> = {
  // Base
  'Off White': '#f2ede1',
  'Off-White': '#f2ede1',
  Branco: '#faf8f5',
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
  Vinho: '#5c1f2a',
  // Paleta AGATHA (jul/2026)
  'Azul Bebê': '#a3c1d8',
  'Azul Royal': '#1e3a8a',
  Burgundy: '#4a1220',
  Camel: '#b08858',
  'Cinza Grafite': '#3a3a3a',
  Fendi: '#a89a80',
  Havana: '#6e4a2e',
  'Mostarda Claro': '#d4a860',
  Taupe: '#7c6c60',
  // Expansão (jul/2026): adicionadas a partir das fotos por cor no Drive
  Areia: '#d8c8a8',
  'Verde Jade': '#3a7259',
  Vermelho: '#a32424',
  'Amarelo Mostarda': '#d4a860', // sinônimo de Mostarda Claro
  'Amarelo Caramelo': '#c9862b',
};

function hexFor(color: string): string {
  return COLOR_HEX[color] ?? '#c6c1b8';
}

const MAX_VISIBLE_COLORS = 99;

export default function ProductPurchasePanel({ product }: { product: Product }) {
  const colorOption = product.options.find(
    (o) => o.name.toLowerCase() === 'cor' || o.name.toLowerCase() === 'color',
  );
  const hasRealVariants =
    product.variants.length > 0 &&
    product.variants[0].title !== 'Default Title';

  const initialSelected: Record<string, string> = {};
  for (const opt of product.options) {
    if (opt.name !== 'Title') initialSelected[opt.name] = opt.values[0];
  }
  const [selected, setSelected] = useState(initialSelected);
  const [showAllColors, setShowAllColors] = useState(false);

  const selectedVariant = hasRealVariants
    ? product.variants.find((v) =>
        v.selectedOptions.every((so) => selected[so.name] === so.value),
      ) ?? product.variants[0]
    : product.variants[0];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const color = colorOption ? selected[colorOption.name] : null;
    window.dispatchEvent(
      new CustomEvent('product:variant-changed', {
        detail: { image: selectedVariant?.image ?? null, color },
      }),
    );
  }, [selectedVariant, selected, colorOption]);

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
      {product.options
        .filter((o) => o.name !== 'Title')
        .map((opt) => {
          const isColor = opt === colorOption;
          const current = selected[opt.name];
          const isLongName = opt.name.length > 10;

          if (isColor) {
            const total = opt.values.length;
            const hasOverflow = total > MAX_VISIBLE_COLORS;
            const visibleValues = hasOverflow
              ? opt.values.slice(0, MAX_VISIBLE_COLORS - 1)
              : opt.values;
            const hiddenCount = total - visibleValues.length;

            return (
              <div key={opt.id}>
                <div className="flex items-baseline gap-2">
                  <p className="text-sm font-medium text-carvao">Cor :</p>
                  <p className="text-sm text-carvao-soft">{current}</p>
                  {product.tipoProduto && (
                    <span className="ml-auto text-xs uppercase tracking-[0.14em] text-carvao-soft">
                      {product.tipoProduto}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {visibleValues.map((val) => {
                    const active = current === val;
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
                  })}
                  {hasOverflow && (
                    <button
                      type="button"
                      onClick={() => setShowAllColors(true)}
                      aria-label={`Ver todas as ${total} cores`}
                      className="flex h-9 min-w-9 items-center justify-center rounded-full border border-linha px-2 text-xs text-carvao hover:border-carvao"
                    >
                      +{hiddenCount}
                    </button>
                  )}
                </div>
          
                <InfoModal
                  open={showAllColors}
                  onClose={() => setShowAllColors(false)}
                  title={`Cores disponíveis (${total})`}
                >
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {opt.values.map((val) => {
                      const active = current === val;
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() =>
                            setSelected((s) => ({ ...s, [opt.name]: val }))
                          }
                          className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors ${
                            active
                              ? 'border-carvao bg-cream-2'
                              : 'border-linha hover:border-carvao'
                          }`}
                        >
                          <span
                            className="h-12 w-12 rounded-full border border-linha"
                            style={{ backgroundColor: hexFor(val) }}
                          />
                          <span className="text-xs text-carvao">{val}</span>
                        </button>
                      );
                    })}
                  </div>
                </InfoModal>
              </div>
            );
          }

          return (
            <div key={opt.id}>
              <div className="flex items-baseline justify-between">
                <p className={`font-medium text-carvao ${isLongName ? 'text-xs' : 'text-sm'}`}>
                  {opt.name} :
                </p>
                <p className="text-sm text-carvao-soft">{current}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {opt.values.map((val) => {
                  const active = current === val;
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


    </div>
  );
}
