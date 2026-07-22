import Link from 'next/link';
import { getCurrentCart } from '@/lib/cart-actions';
import { isConfigured, formatBRL } from '@/lib/shopify';
import CartLineItem from '@/components/CartLineItem';
import ConfigNotice from '@/components/ConfigNotice';

export const metadata = { title: 'Sacola' };

export default async function CarrinhoPage() {
  if (!isConfigured()) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24">
        <ConfigNotice />
      </div>
    );
  }

  const cart = await getCurrentCart();

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <p className="kicker">Sua sacola</p>
        <h1 className="mt-5 text-4xl md:text-5xl">Ainda vazia.</h1>
        <p className="mt-4 text-carvao-soft">
          Descubra nossos estofados em couro legítimo.
        </p>
        <Link
          href="/produtos"
          className="rounded-lg mt-8 inline-block bg-marca px-9 py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-carvao hover:duration-300 hover:ease-in-out hover:transition-colors hover:bg-carvao hover:text-cream"
        >
          Ver a coleção
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
      <h1 className="border-b border-linha pb-8 text-4xl md:text-5xl">
        Sua sacola
      </h1>

      <div className="grid gap-14 pt-8 lg:grid-cols-[1fr_360px]">
        <div>
          {cart.lines.map((line) => (
            <CartLineItem key={line.id} line={line} />
          ))}
        </div>

        <aside className="rounded-lg glass-panel h-fit p-8 backdrop-blur-2xl backdrop-saturate-150 lg:sticky lg:top-28">
          <h2 className="font-serif text-2xl text-cream">Resumo</h2>
          <div className="mt-6 flex justify-between text-sm text-cream">
            <span>Subtotal</span>
            <span>{formatBRL(cart.cost.subtotalAmount.amount)}</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-linha pt-4 text-base">
            <span className="text-cream">Total</span>
            <span className="font-serif text-xl text-cream">
              {formatBRL(cart.cost.totalAmount.amount)}
            </span>
          </div>

          <a
            href={cart.checkoutUrl}
            className="mt-8 block bg-marca py-4 text-center text-[12px] font-medium uppercase tracking-[0.2em] text-carvao rounded-lg hover:transition-colors hover:bg-carvao hover:text-cream hover:duration-300 hover:ease-in-out"
          >
            Finalizar compra
          </a>
          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.15em] text-carvao-soft/70">
            Pagamento seguro · Shopify
          </p>
        </aside>
      </div>
    </div>
  );
}
