import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getProduct,
  getProducts,
  isConfigured,
  formatBRL,
} from '@/lib/shopify';
import { getParcelamento } from '@/lib/parcelamento';
import AddToCartButton from '@/components/AddToCartButton';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import Reveal from '@/components/Reveal';
import ConfigNotice from '@/components/ConfigNotice';

export const revalidate = 60;

const SITE_URL = 'https://www.eurodesign.com.br';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  if (!isConfigured()) return { title: 'Produto' };
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: 'Produto não encontrado' };
  const desc = (
    product.description || `${product.title} em couro legítimo EuroDesign.`
  ).slice(0, 155);
  return {
    title: product.title,
    description: desc,
    alternates: { canonical: `${SITE_URL}/produtos/${handle}` },
    openGraph: {
      title: product.title,
      description: desc,
      images: product.featuredImage ? [{ url: product.featuredImage.url }] : [],
    },
  };
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  if (!isConfigured()) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24">
        <ConfigNotice />
      </div>
    );
  }

  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const variant = product.variants[0];
  const price = variant?.price ?? product.priceRange.minVariantPrice;
  const isFree = parseFloat(price.amount) === 0;
  const parc = getParcelamento(
    product.handle,
    price.amount,
    price.currencyCode,
  );

  const galleryImages = product.featuredImage
    ? [
        product.featuredImage,
        ...product.images.filter((i) => i.url !== product.featuredImage!.url),
      ]
    : product.images;

  const relacionados = (await getProducts({ first: 8 }))
    .filter(
      (p) =>
        p.handle !== handle &&
        parseFloat(p.priceRange.minVariantPrice.amount) > 0,
    )
    .slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.images.map((i) => i.url),
    description: product.description || `${product.title} em couro legítimo.`,
    brand: { '@type': 'Brand', name: 'EuroDesign Sofás' },
    ...(isFree
      ? {}
      : {
          offers: {
            '@type': 'Offer',
            priceCurrency: price.currencyCode,
            price: parseFloat(price.amount).toFixed(2),
            availability: product.availableForSale
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
            url: `${SITE_URL}/produtos/${handle}`,
          },
        }),
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav
        aria-label="Trilha"
        className="text-xs tracking-wide text-carvao-soft"
      >
        <Link href="/" className="hover:text-ouro">
          Início
        </Link>
        <span className="mx-2 text-linha">/</span>
        <Link href="/produtos" className="hover:text-ouro">
          Coleção
        </Link>
        <span className="mx-2 text-linha">/</span>
        <span className="text-carvao">{product.title}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* Galeria */}
        <div className="min-w-0">
          <ProductGallery images={galleryImages} title={product.title} />
        </div>

        {/* Info */}
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="kicker">Couro 100% legítimo</p>
            <h1 className="mt-4 text-4xl md:text-5xl">{product.title}</h1>

            <div className="mt-6 border-y border-linha py-6">
              {isFree ? (
                <p className="text-lg text-carvao-soft">Preço sob consulta</p>
              ) : parc ? (
                <p className="font-serif text-4xl text-carvao">{parc.label}</p>
              ) : (
                <p className="font-serif text-4xl text-carvao">
                  {formatBRL(price.amount, price.currencyCode)}
                </p>
              )}
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-carvao-soft">
                1 ano de garantia · Direto da fábrica
              </p>
            </div>

            <ul className="mt-6 grid grid-cols-3 gap-3 border-b border-linha pb-6 text-center text-[11px] uppercase tracking-[0.12em] text-carvao-soft">
              <li className="flex flex-col items-center gap-1">
                <span className="text-ouro">✦</span>Couro legítimo
              </li>
              <li className="flex flex-col items-center gap-1">
                <span className="text-ouro">✦</span>Direto da fábrica
              </li>
              <li className="flex flex-col items-center gap-1">
                <span className="text-ouro">✦</span>1 ano garantia
              </li>
            </ul>

            {product.description && (
              <div className="mt-8">
                <h2 className="font-serif text-2xl text-carvao">Descrição</h2>
                <div
                  className="prose-eurodesign mt-4 max-w-none text-sm leading-relaxed text-carvao-soft [&_h1]:mt-4 [&_h1]:font-serif [&_h1]:text-xl [&_h1]:text-carvao [&_h2]:mt-4 [&_h2]:font-serif [&_h2]:text-lg [&_h2]:text-carvao [&_strong]:text-carvao [&_summary]:cursor-pointer [&_summary]:py-2 [&_summary]:font-medium [&_summary]:text-carvao"
                  dangerouslySetInnerHTML={{
                    __html: product.descriptionHtml || product.description,
                  }}
                />
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3">
              {variant && (
                <AddToCartButton
                  variantId={variant.id}
                  available={product.availableForSale}
                />
              )}
              <a
                href={`https://wa.me/5511913371140?text=${encodeURIComponent(
                  `Olá! Tenho interesse no ${product.title}.`,
                )}`}
                target="_blank"
                rel="noopener"
                className="rounded-lg border border-carvao/25 py-4 text-center text-[12px] uppercase tracking-[0.2em] text-carvao font-medium hover:transition-colors hover:border-ouro hover:text-ouro"
              >
                Tirar dúvidas no WhatsApp
              </a>
            </div>

            <div className="mt-10">
              <h2 className="sr-only">Entrega e garantia</h2>
              {[
                {
                  q: 'Entrega',
                  a: 'Fabricação e envio direto da fábrica para todo o Brasil. Prazo e frete confirmados no atendimento via WhatsApp.',
                },
                {
                  q: 'Garantia',
                  a: '1 ano de garantia contra defeitos de fabricação. Couro 100% legítimo selecionado.',
                },
                {
                  q: 'Formas de pagamento',
                  a: 'Parcelamento no cartão e condições especiais à vista. Pagamento seguro processado pelo Shopify.',
                },
              ].map((item) => (
                <details
                  key={item.q}
                  className="group border-t border-linha py-4"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-sm uppercase tracking-[0.14em] text-carvao marker:content-['']">
                    {item.q}
                    <span className="text-ouro transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-carvao-soft">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="mt-24 border-t border-linha pt-16">
          <h2 className="mb-10 text-3xl md:text-4xl">Combina com</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {relacionados.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
