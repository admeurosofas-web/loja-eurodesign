
'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';

type ProductImage = {
  url: string;
  altText?: string | null;
};

type CatalogProduct = {
  title: string;
  handle: string;
  featuredImage?: ProductImage | null;
  images?: ProductImage[] | null;
};

type CollectionShowcaseProps = {
  products: CatalogProduct[];
};

const PRODUCT_ROUTE = '/produtos';

function getImage(product: CatalogProduct) {
  return (
    product.featuredImage?.url ||
    product.images?.[0]?.url ||
    ''
  );
}

export default function CollectionShowcase({
  products,
}: CollectionShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (!products || products.length === 0) {
    return null;
  }

  const total = products.length;

  const previousIndex =
    (activeIndex - 1 + total) % total;

  const nextIndex =
    (activeIndex + 1) % total;

  const activeProduct = products[activeIndex];
  const previousProduct = products[previousIndex];
  const nextProduct = products[nextIndex];

  function goPrevious() {
    setActiveIndex((current) =>
      (current - 1 + total) % total
    );
  }

  function goNext() {
    setActiveIndex((current) =>
      (current + 1) % total
    );
  }

  function handleTouchStart(
    event: React.TouchEvent<HTMLDivElement>
  ) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(
    event: React.TouchEvent<HTMLDivElement>
  ) {
    if (touchStartX.current === null) {
      return;
    }

    const endX = event.changedTouches[0].clientX;
    const difference = endX - touchStartX.current;

    if (Math.abs(difference) > 55) {
      if (difference < 0) {
        goNext();
      } else {
        goPrevious();
      }
    }

    touchStartX.current = null;
  }

  return (
    <section
      className="catalog-section"
      aria-label="Modelos em destaque EuroDesign"
    >
      <div className="catalog-container">

        {/* FUNDO DECORATIVO */}
        <div
          className="catalog-background"
          style={{
            backgroundImage: getImage(activeProduct)
              ? `url("${getImage(activeProduct)}")`
              : 'none',
          }}
        />

        <div className="catalog-overlay" />

        {/* CABEÇALHO */}
        <div className="catalog-heading">
          <span className="catalog-eyebrow">
            EURODESIGN COLLECTION
          </span>

          <p>
            Design exclusivo, conforto e couro legítimo.
          </p>
        </div>

        {/* CARROSSEL */}
        <div
          className="catalog-carousel"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >

          {/* MODELO ANTERIOR */}
          {total > 1 && (
            <button
              type="button"
              className="catalog-side catalog-side-left"
              onClick={goPrevious}
              aria-label={`Ver ${previousProduct.title}`}
            >
              <div className="catalog-side-circle">
                {getImage(previousProduct) && (
                  <img
                    src={getImage(previousProduct)}
                    alt={previousProduct.title}
                    draggable={false}
                  />
                )}
              </div>

              <span className="catalog-side-name">
                {previousProduct.title}
              </span>
            </button>
          )}

          {/* SETA ESQUERDA */}
          {total > 1 && (
            <button
              type="button"
              className="catalog-arrow catalog-arrow-left"
              onClick={goPrevious}
              aria-label="Modelo anterior"
            >
              ←
            </button>
          )}

          {/* MODELO CENTRAL */}
          <div
            className="catalog-main"
            key={activeProduct.handle}
          >
            <div className="catalog-main-circle">
              {getImage(activeProduct) ? (
                <img
                  src={getImage(activeProduct)}
                  alt={
                    activeProduct.featuredImage?.altText ||
                    activeProduct.title
                  }
                  draggable={false}
                />
              ) : (
                <span className="catalog-no-image">
                  Imagem indisponível
                </span>
              )}
            </div>
          </div>

          {/* SETA DIREITA */}
          {total > 1 && (
            <button
              type="button"
              className="catalog-arrow catalog-arrow-right"
              onClick={goNext}
              aria-label="Próximo modelo"
            >
              →
            </button>
          )}

          {/* PRÓXIMO MODELO */}
          {total > 1 && (
            <button
              type="button"
              className="catalog-side catalog-side-right"
              onClick={goNext}
              aria-label={`Ver ${nextProduct.title}`}
            >
              <div className="catalog-side-circle">
                {getImage(nextProduct) && (
                  <img
                    src={getImage(nextProduct)}
                    alt={nextProduct.title}
                    draggable={false}
                  />
                )}
              </div>

              <span className="catalog-side-name">
                {nextProduct.title}
              </span>
            </button>
          )}

        </div>

        {/* INFORMAÇÕES DO PRODUTO */}
        <div className="catalog-product-info">
          <span className="catalog-product-number">
            {String(activeIndex + 1).padStart(2, '0')}
            {' / '}
            {String(total).padStart(2, '0')}
          </span>

          <h3 key={activeProduct.handle}>
            {activeProduct.title}
          </h3>

          <Link
            href={`${PRODUCT_ROUTE}/${activeProduct.handle}`}
            className="catalog-cta"
            style={{
              backgroundColor: '#FFDA00',
              color: '#111111',
            }}
          >
            CONHECER MODELO
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* INDICADORES */}
        <div
          className="catalog-dots"
          aria-label="Selecionar modelo"
        >
          {products.map((product, index) => (
            <button
              key={product.handle}
              type="button"
              className={
                index === activeIndex
                  ? 'catalog-dot active'
                  : 'catalog-dot'
              }
              onClick={() => setActiveIndex(index)}
              aria-label={`Selecionar ${product.title}`}
              aria-current={
                index === activeIndex
                  ? 'true'
                  : undefined
              }
            />
          ))}
        </div>

      </div>

      <style jsx>{`
        /* ÁREA EXTERNA */
        .catalog-section {
          width: 100%;
          padding: 90px 24px;
          background: #e8e2d9;
          overflow: hidden;
        }

        /* PAINEL PRINCIPAL */
        .catalog-container {
          position: relative;
          isolation: isolate;
          width: 100%;
          max-width: 1400px;
          min-height: 850px;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 48px;
          background: #e9e6e0;
          box-shadow:
            0 24px 75px rgba(40, 31, 23, 0.12);
        }

        /* FUNDO */
        .catalog-background {
          position: absolute;
          inset: -35px;
          z-index: -2;
          background-position: center;
          background-size: cover;
          filter: blur(35px);
          opacity: 0.14;
          transform: scale(1.1);
          transition: background-image 0.5s ease;
        }

        .catalog-overlay {
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.64),
            rgba(242, 238, 232, 0.84)
          );
          pointer-events: none;
        }

        /* CABEÇALHO */
        .catalog-heading {
          position: relative;
          padding-top: 54px;
          text-align: center;
          z-index: 2;
        }

        .catalog-eyebrow {
          display: block;
          margin-bottom: 13px;
          color: #a47c00;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        .catalog-heading p {
          margin: 12px 0 0;
          color: #77716b;
          font-size: 15px;
          font-weight: 700;
        }

        /* CARROSSEL CENTRAL MAIS ALTO */
        .catalog-carousel {
          position: relative;
          width: 100%;
          height: 570px;
          margin-top: 15px;
          user-select: none;
          touch-action: pan-y;
        }

        /* SOFÁ CENTRAL */
        .catalog-main {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          max-width: 650px;
          height: 100%;
          transform: translateX(-50%);
          z-index: 3;
          animation: catalog-enter 0.45s ease both;
        }

        .catalog-main-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.52);
          box-shadow:
            inset 0 0 35px rgba(255, 255, 255, 0.42);
          overflow: hidden;
        }

        /* IMAGEM CENTRAL AMPLIADA EM 25% */
        .catalog-main-circle img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          transform: scale(1.25);
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        .catalog-no-image {
          color: #777;
          font-size: 14px;
        }

        /* LATERAIS MENORES */
        .catalog-side {
          position: absolute;
          top: 50%;
          width: 17%;
          max-width: 220px;
          padding: 0;
          border: none;
          background: transparent;
          transform: translateY(-50%);
          cursor: pointer;
          z-index: 2;
          transition:
            transform 0.3s ease,
            opacity 0.3s ease;
        }

        .catalog-side:hover {
          transform: translateY(-50%) scale(1.04);
        }

        .catalog-side-left {
          left: 3.5%;
        }

        .catalog-side-right {
          right: 3.5%;
        }

        .catalog-side-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.35);
          overflow: hidden;
        }

        .catalog-side-circle img {
          display: block;
          width: 92%;
          height: 84%;
          object-fit: contain;
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        .catalog-side-name {
          display: block;
          margin-top: 10px;
          color: #625a52;
          font-size: 13px;
          font-weight: 500;
          text-align: center;
          line-height: 1.3;
        }

        /* SETAS */
        .catalog-arrow {
          position: absolute;
          top: 50%;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          padding: 0;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.7);
          color: #242424;
          font-size: 25px;
          transform: translateY(-50%);
          cursor: pointer;
          transition:
            background 0.2s ease,
            border-color 0.2s ease;
        }

        .catalog-arrow:hover {
          background: #ffda00;
          border-color: #ffda00;
        }

        .catalog-arrow-left {
          left: 27%;
        }

        .catalog-arrow-right {
          right: 27%;
        }

        /* INFORMAÇÕES DO MODELO */
        .catalog-product-info {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 13px;
          padding: 0 20px;
          text-align: center;
        }

        .catalog-product-number {
          color: #9b8f82;
          font-size: 11px;
          letter-spacing: 0.25em;
        }

        .catalog-product-info h3 {
          max-width: 760px;
          margin: 0;
          color: #24201c;
          font-size: clamp(24px, 2.5vw, 35px);
          font-weight: 500;
          letter-spacing: -0.035em;
          line-height: 1.15;
          animation: catalog-enter 0.4s ease both;
        }

        .catalog-product-info :global(.catalog-cta) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          min-width: 245px;
          min-height: 51px;
          padding: 12px 24px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-decoration: none;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .catalog-product-info :global(.catalog-cta:hover) {
          transform: translateY(-2px);
          box-shadow:
            0 7px 18px rgba(0, 0, 0, 0.12);
        }

        /* PONTOS DE NAVEGAÇÃO */
        .catalog-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin: 24px 0 35px;
        }

        .catalog-dot {
          width: 8px;
          height: 8px;
          padding: 0;
          border: 0;
          border-radius: 999px;
          background: #c5beb5;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .catalog-dot.active {
          width: 28px;
          background: #e1b900;
        }

        @keyframes catalog-enter {
          from {
            opacity: 0.5;
            translate: 0 12px;
          }

          to {
            opacity: 1;
            translate: 0 0;
          }
        }

        /* TABLET */
        @media (max-width: 1000px) {
          .catalog-section {
            padding: 60px 16px;
          }

          .catalog-container {
            min-height: 730px;
            border-radius: 32px;
          }

          .catalog-carousel {
            height: 400px;
          }

          .catalog-main {
            width: 55%;
          }

          .catalog-side {
            width: 18%;
          }

          .catalog-arrow-left {
            left: 23%;
          }

          .catalog-arrow-right {
            right: 23%;
          }
        }

        /* CELULAR */
        @media (max-width: 700px) {
          .catalog-section {
            padding: 38px 10px;
          }

          .catalog-container {
            min-height: 590px;
            border-radius: 25px;
          }

          .catalog-heading {
            padding: 40px 14px 0;
          }

          .catalog-eyebrow {
            font-size: 22px;
            letter-spacing: 0.08em;
          }

          .catalog-heading p {
            font-size: 12px;
            padding: 0 12px;
          }

          .catalog-carousel {
            height: 280px;
            margin-top: 30px;
          }

          .catalog-main {
            width: 72%;
            max-width: none;
          }

          .catalog-side {
            width: 28%;
            opacity: 0.7;
          }

          .catalog-side-left {
            left: -17%;
          }

          .catalog-side-right {
            right: -17%;
          }

          .catalog-side-name {
            display: none;
          }

          .catalog-arrow {
            width: 34px;
            height: 34px;
            font-size: 19px;
          }

          .catalog-arrow-left {
            left: 5%;
          }

          .catalog-arrow-right {
            right: 5%;
          }

          .catalog-product-info {
            gap: 12px;
          }

          .catalog-product-info h3 {
            font-size: 23px;
          }

          .catalog-product-info :global(.catalog-cta) {
            min-width: 225px;
            min-height: 48px;
            font-size: 11px;
          }

          .catalog-dots {
            margin-bottom: 30px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .catalog-main,
          .catalog-product-info h3 {
            animation: none;
          }

          .catalog-side,
          .catalog-arrow,
          .catalog-dot {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
