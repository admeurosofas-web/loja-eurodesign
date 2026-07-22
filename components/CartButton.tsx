"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Cart } from "@/lib/shopify/types";

function brl(amount: string | number) {
  const v = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
}

export default function CartButton({ initialCount = 0 }: { initialCount?: number }) {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const count = cart?.totalQuantity ?? initialCount;

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch("/api/cart")
      .then((r) => r.json())
      .then((data) => setCart(data))
      .catch(() => setCart(null))
      .finally(() => setLoading(false));
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const lines = cart?.lines ?? [];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-cream hover:text-marca transition-colors relative"
        aria-label={`Abrir sacola, ${count} itens`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4l1-12z" />
        </svg>
        {count > 0 && (
          <span className="absolute -top-2 -right-2 grid h-5 min-w-5 place-items-center rounded-full bg-marca text-carvao text-[11px] font-bold leading-none">
            {count}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[80] bg-carvao/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <aside
            className="glass-panel fixed inset-y-0 right-0 z-[90] flex w-[90%] max-w-md flex-col text-cream backdrop-blur-2xl backdrop-saturate-150"
            aria-label="Sua sacola"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <p className="font-serif text-2xl">Sua sacola {count > 0 && `(${count})`}</p>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar sacola"
                className="text-2xl leading-none text-cream/60 hover:text-cream"
              >
                ×
              </button>
            </div>

            {loading ? (
              <div className="flex flex-1 items-center justify-center text-sm text-cream/60">
                Carregando…
              </div>
            ) : lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="font-serif text-2xl">Sua sacola está vazia.</p>
                <Link
                  href="/produtos"
                  onClick={() => setOpen(false)}
                  className="bg-marca px-8 py-3 text-[12px] font-medium uppercase tracking-[0.2em] text-carvao transition-colors hover:bg-cream"
                >
                  Ver a coleção
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6">
                  {lines.map((line) => (
                    <div key={line.id} className="flex gap-4 border-b border-white/10 py-5">
                      <Link
                        href={`/produtos/${line.merchandise.product.handle}`}
                        onClick={() => setOpen(false)}
                        className="relative h-24 w-20 flex-none overflow-hidden bg-white/5"
                      >
                        {line.merchandise.product.featuredImage && (
                          <Image
                            src={line.merchandise.product.featuredImage.url}
                            alt={line.merchandise.product.featuredImage.altText ?? ""}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        )}
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <p className="font-serif text-lg leading-snug">
                          {line.merchandise.product.title}
                        </p>
                        <p className="mt-1 text-sm text-cream/60">
                          {line.quantity} × {brl(line.merchandise.price.amount)}
                        </p>
                        <p className="mt-auto font-serif">{brl(line.cost.totalAmount.amount)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 px-6 py-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-cream/60">Subtotal</span>
                    <span className="font-serif text-lg">
                      {cart?.cost ? brl(cart.cost.subtotalAmount.amount) : "—"}
                    </span>
                  </div>
                  {cart?.checkoutUrl && (
                    <a
                      href={cart.checkoutUrl}
                      className="mt-5 block bg-marca py-4 text-center text-[12px] font-medium uppercase tracking-[0.2em] text-carvao transition-colors hover:bg-cream"
                    >
                      Finalizar compra
                    </a>
                  )}
                  <Link
                    href="/carrinho"
                    onClick={() => setOpen(false)}
                    className="mt-3 block py-2 text-center text-[12px] uppercase tracking-[0.18em] text-cream/70 underline underline-offset-4 hover:text-marca"
                  >
                    Ver sacola completa
                  </Link>
                </div>
              </>
            )}
          </aside>
        </>
      )}
    </>
  );
}
