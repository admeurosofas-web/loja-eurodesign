import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  getProduct,
  getProducts,
  isConfigured,
  formatBRL,
} from '@/lib/shopify';

import { getParcelamento } from '@/lib/parcelamento';

import ProductPurchasePanel from '@/components/ProductPurchasePanel';
import ProductInfoSection from '@/components/ProductInfoSection';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import DeliveryEstimate from '@/components/DeliveryEstimate';
import ProductActions from '@/components/ProductActions';
import Reveal from '@/components/Reveal';
import ConfigNotice from '@/components/ConfigNotice';
import ProductVideo from '@/components/ProductVideo';

export const revalidate = 60;

const SITE_URL = 'https://www.eurodesign.com.br';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  if (!isConfigured()) {
    return {
      title: 'Produto',
    };
  }

  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    return {
      title: 'Produto não encontrado',
    };
  }

  const desc = (
    product.description ||
    `${product.title} em couro legítimo EuroDesign.`
  ).slice(0, 155);

  return {
    title: product.title,

    description: desc,

    alternates: {
      canonical: `${SITE_URL}/produtos/${handle}`,
    },

    openGraph: {
      title: product.title,
      description: desc,

      images: product.featuredImage
        ? [
            {
              url: product.featuredImage.url,
            },
          ]
        : [],
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

  if (!product) {
    notFound();
  }

  const variant = product.variants[0];

  const price =
    variant?.price ??
    product.priceRange.minVariantPrice;

  const isFree =
    parseFloat(price.amount) === 0;

  const parc = getParcelamento(
    product.handle,
    price.amount,
    price.currencyCode,
  );

  /* ====================================================== */
  /* GALERIA */
  /* ====================================================== */

  const galleryImages = product.featuredImage
    ? [
        product.featuredImage,

        ...product.images.filter(
          (i) =>
            i.url !==
            product.featuredImage!.url,
        ),
      ]
    : product.images;

  /* ====================================================== */
  /* PRODUTOS */
  /* ====================================================== */

  const allProducts = await getProducts({
    first: 50,
  });

  /* ====================================================== */
  /* OUTRAS VERSÕES DO MESMO PRODUTO */
  /* ====================================================== */

  const siblings = allProducts
    .filter(
      (p) =>
        p.title === product.title &&
        p.handle !== handle,
    )
    .map((p) => ({
      handle: p.handle,

      title: p.title,

      dimensaoLabel:
        p.dimensoes &&
        p.dimensoes[0]
          ? `${p.dimensoes[0].variante} · ${p.dimensoes[0].medidas}`
          : null,
    }));

  /* ====================================================== */
  /* PRODUTOS RELACIONADOS */
  /* ====================================================== */

  const relacionados = allProducts
    .filter(
      (p) =>
        p.handle !== handle &&
        p.title !== product.title &&
        parseFloat(
          p.priceRange.minVariantPrice.amount,
        ) > 0,
    )
    .slice(0, 4);

  /* ====================================================== */
  /* DESCRIÇÃO CURTA */
  /* ====================================================== */

  const shortDescription = product.description
    ? product.description.length > 170
      ? product.description
          .slice(0, 170)
          .replace(/\s\S*$/, '') + '…'
      : product.description
    : `${product.title} em couro legítimo EuroDesign. Peça artesanal produzida sob encomenda.`;

  /* ====================================================== */
  /* SEO */
  /* ====================================================== */

  const jsonLd = {
    '@context': 'https://schema.org',

    '@type': 'Product',

    name: product.title,

    image: product.images.map(
      (i) => i.url,
    ),

    description:
      product.description ||
      `${product.title} em couro legítimo.`,

    brand: {
      '@type': 'Brand',
      name: 'EuroDesign Sofás',
    },

    ...(isFree
      ? {}
      : {
          offers: {
            '@type': 'Offer',

            priceCurrency:
              price.currencyCode,

            price: parseFloat(
              price.amount,
            ).toFixed(2),

            availability:
              product.availableForSale
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',

            url: `${SITE_URL}/produtos/${handle}`,
          },
        }),
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-10 pt-20 lg:px-10 lg:pb-16 lg:pt-24">

      {/* ================================================== */}
      {/* SEO */}
      {/* ================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* ================================================== */}
      {/* NAVEGAÇÃO */}
      {/* ================================================== */}

      <nav
        aria-label="Trilha"
        className="text-xs tracking-wide text-carvao-soft"
      >
        <Link
          href="/"
          className="hover:text-ouro"
        >
          Início
        </Link>

        <span className="mx-3 text-linha">
          /
        </span>

        <Link
          href="/produtos"
          className="hover:text-ouro"
        >
          Coleção
        </Link>

        <span className="mx-3 text-linha">
          /
        </span>

        <span className="text-carvao">
          {product.title}
        </span>
      </nav>

      {/* ================================================== */}
      {/* PRODUTO */}
      {/* ================================================== */}

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">

        {/* ================================================== */}
        {/* GALERIA */}
        {/* ================================================== */}

        <div className="min-w-0">
          <ProductGallery
            images={galleryImages}
            title={product.title}
          />
        </div>

        {/* ================================================== */}
        {/* COLUNA DE INFORMAÇÕES */}
        {/* ================================================== */}

        <div className="min-w-0">
          <div className="lg:sticky lg:top-28">
            <div>

              <Reveal>

                {/* ======================================== */}
                {/* CABEÇALHO DO PRODUTO */}
                {/* ======================================== */}

                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0">

                    {/* CATEGORIA */}

                    <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-ouro">
                      {product.familia
                        ? product.familia
                        : 'Couro 100% legítimo'}
                    </p>

                    {/* NOME */}

                    <h1 className="mt-1 text-[46px] font-black uppercase leading-[0.88] tracking-[-0.055em] text-carvao sm:text-[52px] md:text-[58px]">
                      {product.title}
                    </h1>

                    {/* TIPO */}

                    {product.tipoProduto && (
                      <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.17em] text-carvao-soft">
                        {product.tipoProduto}
                      </p>
                    )}

                    {/* DETALHE DOURADO */}

                    <div className="mt-3 h-[3px] w-14 bg-ouro" />

                  </div>

                  {/* COMPARTILHAR / FAVORITAR */}

                  <ProductActions
                    productHandle={
                      product.handle
                    }
                    productTitle={
                      product.title
                    }
                  />

                </div>

                {/* ======================================== */}
                {/* PREÇO */}
                {/* ======================================== */}

                <div className="mt-4">

                  {isFree ? (

                    <p className="text-lg font-black text-carvao-soft">
                      Preço sob consulta
                    </p>

                  ) : parc ? (

                    <p className="text-[34px] font-black leading-none tracking-[-0.045em] text-carvao md:text-[40px]">
                      {parc.label}
                    </p>

                  ) : (

                    <p className="text-[34px] font-black leading-none tracking-[-0.045em] text-carvao md:text-[40px]">
                      {formatBRL(
                        price.amount,
                        price.currencyCode,
                      )}
                    </p>

                  )}

                  <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.19em] text-carvao-soft">
                    1 ano de garantia · Direto da fábrica
                  </p>

                </div>

                {/* ======================================== */}
                {/* BENEFÍCIOS COMPACTOS */}
                {/* ======================================== */}

                <ul className="mt-4 grid grid-cols-3 overflow-hidden rounded-xl border border-[#eee9df] bg-[#faf8f3]">

                  {/* COURO */}

                  <li className="flex min-h-[58px] items-center justify-center gap-2 border-r border-[#e5ddcf] px-2">

                    <span className="text-base text-ouro">
                      ◆
                    </span>

                    <span className="text-[9px] font-extrabold uppercase leading-[1.25] tracking-[0.06em] text-carvao">
                      Couro
                      <br />
                      legítimo
                    </span>

                  </li>

                  {/* FÁBRICA */}

                  <li className="flex min-h-[58px] items-center justify-center gap-2 border-r border-[#e5ddcf] px-2">

                    <span className="text-base text-ouro">
                      ◆
                    </span>

                    <span className="text-[9px] font-extrabold uppercase leading-[1.25] tracking-[0.06em] text-carvao">
                      Direto da
                      <br />
                      fábrica
                    </span>

                  </li>

                  {/* GARANTIA */}

                  <li className="flex min-h-[58px] items-center justify-center gap-2 px-2">

                    <span className="text-base text-ouro">
                      ◆
                    </span>

                    <span className="text-[9px] font-extrabold uppercase leading-[1.25] tracking-[0.06em] text-carvao">
                      1 ano de
                      <br />
                      garantia
                    </span>

                  </li>

                </ul>

                
                {/* ======================================== */}
                {/* COMPRA */}
                {/* ======================================== */}

                <div className="mt-5 flex flex-col gap-3">

                  {/* SOB ENCOMENDA */}

                  <DeliveryEstimate
                    status="made-to-order"
                  />

                  {/* MATERIAL + CORES */}

                  <ProductPurchasePanel
                    product={product}
                  />

                  {/* FALE COM UM VENDEDOR */}

                  <a
                    href={`https://wa.me/5511913371140?text=${encodeURIComponent(
                      `Olá! Tenho interesse no ${product.title}.`,
                    )}`}
                    target="_blank"
                    rel="noopener"
                    className="w-full rounded-lg border border-marca bg-marca py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.2em] text-carvao transition-all hover:opacity-90"
                  >
                    FALE COM UM VENDEDOR!
                  </a>

                </div>

                {/* ======================================== */}
                {/* INFORMAÇÕES / CONFIGURAÇÕES */}
                {/* ======================================== */}

                <ProductInfoSection
                  productTitle={
                    product.title
                  }
                  description={
                    product.description
                  }
                  descriptionHtml={
                    product.descriptionHtml
                  }
                  fichaTecnica={
                    product.fichaTecnica
                  }
                  dimensoes={
                    product.dimensoes
                  }
                  siblings={
                    siblings
                  }
                />

                {/* ======================================== */}
                {/* VÍDEO */}
                {/* ======================================== */}

                <ProductVideo
                  productHandle={
                    product.title
                  }
                />

                {/* ======================================== */}
                {/* ENTREGA / GARANTIA / PAGAMENTO */}
                {/* ======================================== */}

                <div className="mt-8">

                  <h2 className="sr-only">
                    Entrega e garantia
                  </h2>

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
                      className="group border-t border-linha py-3.5"
                    >

                      <summary className="flex cursor-pointer items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-carvao marker:content-['']">

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
        </div>
      </div>

      {/* ================================================== */}
      {/* PRODUTOS RELACIONADOS */}
      {/* ================================================== */}

      {relacionados.length > 0 && (

        <section className="mt-24 border-t border-linha pt-16">

          <h2 className="mb-10 text-3xl md:text-4xl">
            Combina com
          </h2>

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">

            {relacionados.map((p) => (

              <ProductCard
                key={p.id}
                product={p}
              />

            ))}

          </div>

        </section>

      )}

    </div>
  );
}