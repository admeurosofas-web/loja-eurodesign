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

  const subtotal = parseFloat(cart.cost.subtotalAmount.amount);
  const total = parseFloat(cart.cost.totalAmount.amount);
  const parcelas = 12;
  const valorParcela = total / parcelas;

  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-24 lg:px-10 lg:pt-32">
      <h1 className="text-4xl font-medium md:text-5xl">Sua sacola</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
        {/* Coluna esquerda — itens */}
        <div className="border-t border-linha">
          {cart.lines.map((line) => (
            <CartLineItem key={line.id} line={line} />
          ))}

          <Link
            href="/produtos"
            className="mt-6 inline-block text-[12px] uppercase tracking-[0.18em] text-carvao-soft underline underline-offset-4 hover:text-ouro"
          >
            ← Continuar comprando
          </Link>
        </div>

        {/* Coluna direita — resumo */}
        <aside className="h-fit rounded-2xl bg-cream-2 p-8 lg:sticky lg:top-28">
          <h2 className="text-xl font-medium text-carvao">Resumo do pedido</h2>

          <dl className="mt-8 space-y-5 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-carvao-soft">Subtotal</dt>
              <dd className="text-carvao">{formatBRL(subtotal)}</dd>
            </div>

            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1.5 text-carvao-soft">
                Frete
                <span
                  className="grid h-4 w-4 place-items-center rounded-full bg-carvao-soft/25 text-[10px] text-carvao"
                  title="Calculado no checkout com base no CEP"
                  aria-hidden
                >
                  ?
                </span>
              </dt>
              <dd className="text-carvao-soft">
                Calculado no checkout
              </dd>
            </div>

            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1.5 text-carvao-soft">
                Parcelamento
                <span
                  className="grid h-4 w-4 place-items-center rounded-full bg-carvao-soft/25 text-[10px] text-carvao"
                  title="Em até 12x no cartão de crédito"
                  aria-hidden
                >
                  ?
                </span>
              </dt>
              <dd className="text-carvao">
                Até {parcelas}x de {formatBRL(valorParcela)}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex items-center justify-between border-t border-linha pt-6">
            <span className="text-base font-medium text-carvao">Total</span>
            <span className="font-serif text-2xl text-carvao">
              {formatBRL(total)}
            </span>
          </div>

          <a
            href={cart.checkoutUrl}
            className="mt-8 block rounded-lg bg-marca py-4 text-center text-[12px] font-medium uppercase tracking-[0.2em] text-carvao transition-colors duration-300 ease-in-out hover:bg-carvao hover:text-cream"
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
