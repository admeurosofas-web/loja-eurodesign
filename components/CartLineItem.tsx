"use client";

import Image from "next/image";
import { useTransition } from "react";
import { updateItemAction, removeItemAction } from "@/lib/cart-actions";
import { formatBRL } from "@/lib/shopify";
import type { CartLine } from "@/lib/shopify/types";

export default function CartLineItem({ line }: { line: CartLine }) {
  const [isPending, startTransition] = useTransition();
  const img = line.merchandise.product.featuredImage;

  return (
    <div className={`flex gap-5 border-b border-linha py-6 ${isPending ? "opacity-50" : ""}`}>
      <div className="relative h-28 w-24 flex-none overflow-hidden bg-cream-2">
        {img && <Image src={img.url} alt={img.altText ?? ""} fill sizes="96px" className="object-cover" />}
      </div>

      <div className="flex flex-1 flex-col">
        <p className="font-serif text-lg leading-snug">{line.merchandise.product.title}</p>
        <p className="mt-1 text-sm text-carvao-soft">{formatBRL(line.merchandise.price.amount)}</p>

        <div className="mt-auto flex items-center gap-5">
          <div className="flex items-center border border-linha">
            <button
              onClick={() => startTransition(() => updateItemAction(line.id, line.quantity - 1))}
              className="px-3 py-1.5 text-carvao-soft transition-colors hover:text-ouro"
              aria-label="Diminuir"
            >
              −
            </button>
            <span className="w-8 text-center text-sm">{line.quantity}</span>
            <button
              onClick={() => startTransition(() => updateItemAction(line.id, line.quantity + 1))}
              className="px-3 py-1.5 text-carvao-soft transition-colors hover:text-ouro"
              aria-label="Aumentar"
            >
              +
            </button>
          </div>
          <button
            onClick={() => startTransition(() => removeItemAction(line.id))}
            className="text-xs uppercase tracking-[0.15em] text-carvao-soft/70 transition-colors hover:text-ouro"
          >
            Remover
          </button>
        </div>
      </div>

      <div className="flex-none font-serif text-lg text-carvao">
        {formatBRL(line.cost.totalAmount.amount)}
      </div>
    </div>
  );
}
