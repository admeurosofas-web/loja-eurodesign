'use client';

import Image from 'next/image';
import { useTransition } from 'react';
import { updateItemAction, removeItemAction } from '@/lib/cart-actions';
import { formatBRL } from '@/lib/shopify';
import type { CartLine } from '@/lib/shopify/types';

export default function CartLineItem({ line }: { line: CartLine }) {
  const [isPending, startTransition] = useTransition();
  const img = line.merchandise.product.featuredImage;
  const variantTitle = line.merchandise.title;
  const hasVariant = variantTitle && variantTitle !== 'Default Title';

  return (
    <div
      className={`flex gap-5 border-b border-linha py-8 sm:gap-8 ${
        isPending ? 'opacity-50' : ''
      }`}
    >
      {/* Imagem grande */}
      <div className="relative aspect-[4/5] w-40 flex-none overflow-hidden rounded-lg bg-cream-2 sm:w-56">
        {img && (
          <Image
            src={img.url}
            alt={img.altText ?? ''}
            fill
            sizes="(min-width: 640px) 224px, 160px"
            className="object-cover"
          />
        )}
      </div>

      {/* Info + controles */}
      <div className="relative flex flex-1 flex-col">
        {/* X remover no canto superior direito */}
        <button
          onClick={() => startTransition(() => removeItemAction(line.id))}
          className="absolute right-0 top-0 -m-1 p-1 text-carvao-soft transition-colors hover:text-carvao"
          aria-label={`Remover ${line.merchandise.product.title}`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <p className="pr-8 font-serif text-lg text-carvao sm:text-xl">
          {line.merchandise.product.title}
        </p>

        {hasVariant && (
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-carvao-soft">
            {variantTitle.split(' / ').map((v, i, arr) => (
              <span key={i} className="flex items-center gap-3">
                {v}
                {i < arr.length - 1 && (
                  <span className="text-linha">|</span>
                )}
              </span>
            ))}
          </p>
        )}

        <p className="mt-2 text-base text-carvao">
          {formatBRL(line.merchandise.price.amount)}
        </p>

        {/* Quantidade + status */}
        <div className="mt-auto flex flex-wrap items-center gap-6 pt-6">
          <label className="flex items-center gap-3 text-sm text-carvao-soft">
            <span className="sr-only">Quantidade</span>
            <select
              value={line.quantity}
              onChange={(e) =>
                startTransition(() =>
                  updateItemAction(line.id, parseInt(e.target.value, 10)),
                )
              }
              className="rounded-lg border border-linha bg-cream px-3 py-1.5 text-sm text-carvao focus:border-carvao focus:outline-none"
              aria-label="Quantidade"
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </label>

          <span className="flex items-center gap-1.5 text-sm text-emerald-700">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12l4 4L19 6" />
            </svg>
            Em estoque
          </span>
        </div>
      </div>
    </div>
  );
}
