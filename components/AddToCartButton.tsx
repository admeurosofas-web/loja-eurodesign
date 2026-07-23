'use client';

import { useState, useTransition } from 'react';
import { addItemAction } from '@/lib/cart-actions';

export default function AddToCartButton({
  variantId,
  available,
}: {
  variantId: string;
  available: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  if (!available) {
    return (
      <button
        disabled
        className="rounded-lg w-full cursor-not-allowed border border-linha bg-cream-2 py-4 text-[12px] uppercase tracking-[0.2em] text-carvao-soft/60"
      >
        Produto esgotado
      </button>
    );
  }

  const label = isPending
    ? 'Adicionando…'
    : done
      ? 'Adicionado ✓'
      : 'Adicionar à sacola';

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await addItemAction(variantId, 1);
          window.dispatchEvent(new CustomEvent('cart:updated'));
          setDone(true);
          setTimeout(() => setDone(false), 2000);
        })
      }
      disabled={isPending}
      className="rounded-lg w-full bg-marca py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-carvao transition-colors hover:bg-carvao hover:text-cream disabled:opacity-60"
    >
      {label}
    </button>
  );
}
