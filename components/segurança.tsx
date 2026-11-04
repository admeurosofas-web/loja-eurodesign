
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type GeminiExperienceProps = {
  title?: string;
  handle?: string;
  imageUrl?: string;
  imageAlt?: string;
};

type GeminiView = {
  label: string;
  image: string;
  thumbnail: string;
  atelier?: boolean;
};

const views: GeminiView[] = [
  {
    label: 'Frente',
    image: '/images/gemini-atelier/gemini-atelier-frente.png',
    thumbnail: '/images/gemini-fotos/gemini-frente.png',
    atelier: true,
  },
  {
    label: 'Lateral esquerda',
    image: '/images/gemini-fotos/gemini-lateral-esquerda.png',
    thumbnail: '/images/gemini-fotos/gemini-lateral-esquerda.png',
  },
  {
    label: 'Lateral direita',
    image: '/images/gemini-fotos/gemini-lateral-direita.png',
    thumbnail: '/images/gemini-fotos/gemini-lateral-direita.png',
  },
  {
    label: 'Traseira',
    image: '/images/gemini-fotos/gemini-traseira.png',
    thumbnail: '/images/gemini-fotos/gemini-traseira.png',
  },
  {
    label: 'Mecanismo',
    image: '/images/gemini-fotos/gemini-mecanismo.png',
    thumbnail: '/images/gemini-fotos/gemini-mecanismo.png',
  },
  {
    label: 'Reclinada',
    image: '/images/gemini-aberta/gemini-aberta-lateral-direita.png',
    thumbnail: '/images/gemini-aberta/gemini-aberta-lateral-direita.png',
  },
];

const benefits = [
  {
    icon: '✧',
    title: 'Couro 100% legítimo',
    description: 'Qualidade e durabilidade.',
  },
  {
    icon: 'ϟ',
    title: 'Totalmente elétrica',
    description: 'Reclinação personalizada.',
  },
  {
    icon: '✦',
    title: 'USB grátis',
    description: 'Praticidade no seu dia a dia.',
  },
];

export default function GeminiExperience({
  title = 'Poltrona Gemini',
  handle = 'poltrona-gemini-reclinavel-eletrica-fixa',
  imageUrl = '',
  imageAlt = 'Poltrona Gemini',
}: GeminiExperienceProps) {
  const [selectedView, setSelectedView] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const productName =
    title.replace(/poltrona/gi, '').trim() || 'Gemini';

  const currentView = views[selectedView];
  const imageFailed = failedImages.includes(currentView.image);

  const displayImage =
    imageFailed && imageUrl ? imageUrl : currentView.image;

  const showError = imageFailed && !imageUrl;

  useEffect(() => {
    if (!fullscreen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setFullscreen(false);
      }
    }

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [fullscreen]);

  function changeView(index: number) {
    setSelectedView(index);
    setZoom(1);
  }

  function resetView() {
    setSelectedView(0);
    setZoom(1);
  }

  function markImageFailed(path: string) {
    setFailedImages((previous) =>
      previous.includes(path) ? previous : [...previous, path],
    );
  }

  return (
    <section
      className="gemini-experience"
      aria-label="Experiência interativa da Poltrona Gemini"
    >
      <div className="gemini-container">
        {/* INFORMAÇÕES */}
        <div className="gemini-information">
          <div className="gemini-kicker">
            EURODESIGN · EXPERIÊNCIA INTERATIVA
          </div>

          <h2>
            Poltrona <span>{productName}</span>
          </h2>

          <p className="gemini-description">
            Design sofisticado, conforto excepcional e tecnologia
            para transformar seus momentos de descanso.
            Conheça a Poltrona Gemini por diferentes ângulos.
          </p>

          <div className="gemini-benefits">
            {benefits.map((benefit) => (
              <div className="gemini-benefit" key={benefit.title}>
                <span className="gemini-benefit-check">✓</span>

                <div>
                  <strong>{benefit.title}</strong>
                  <p>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="gemini-actions">
            <a
              className="gemini-whatsapp"
              href="https://wa.me/5511913371140?text=Ol%C3%A1%21%20Quero%20saber%20mais%20sobre%20a%20Poltrona%20Gemini."
              target="_blank"
              rel="noopener noreferrer"
            >
              FALE COM UM VENDEDOR
              <span aria-hidden="true">↗</span>
            </a>

            <Link
              href={`/produtos/${handle}`}
              className="gemini-product-link"
            >
              Ver detalhes do produto →
            </Link>
          </div>
        </div>

        {/* GALERIA */}
        <div className="gemini-visuals">
          <div className="gemini-gallery">
            <div
              className={`gemini-stage ${
                currentView.atelier ? 'atelier' : 'studio'
              } ${fullscreen ? 'fullscreen' : ''}`}
            >
              {/* IMAGEM PRINCIPAL */}
              <div className="gemini-photo-area">
                {!currentView.atelier && (
                  <div className="gemini-floor-shadow" />
                )}

                {showError ? (
                  <div className="gemini-image-error" role="status">
                    Fotografia indisponível.
                    <span>{currentView.image}</span>
                  </div>
                ) : (
                  <img
                    key={displayImage}
                    src={displayImage}
                    alt={
                      imageFailed && imageUrl
                        ? imageAlt
                        : `Poltrona Gemini — ${currentView.label}`
                    }
                    className={
                      currentView.atelier && !imageFailed
                        ? 'gemini-photo gemini-atelier-photo'
                        : 'gemini-photo'
                    }
                    style={{
                      transform: `scale(${zoom})`,
                    }}
                    onError={() =>
                      markImageFailed(currentView.image)
                    }
                  />
                )}
              </div>

              <div className="gemini-stage-label">
                <span className="gemini-status-dot" />
                GALERIA INTERATIVA
              </div>

              {/* CONTROLES */}
              <div className="gemini-tools">
                <button
                  type="button"
                  onClick={resetView}
                  title="Restaurar visualização"
                  aria-label="Restaurar visualização"
                >
                  ⟳
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setZoom((value) =>
                      Math.min(2, value + 0.2),
                    )
                  }
                  title="Aproximar"
                  aria-label="Aproximar"
                >
                  +
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setZoom((value) =>
                      Math.max(1, value - 0.2),
                    )
                  }
                  title="Afastar"
                  aria-label="Afastar"
                >
                  −
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFullscreen((value) => !value)
                  }
                  title="Tela cheia"
                  aria-label={
                    fullscreen
                      ? 'Sair da tela cheia'
                      : 'Abrir tela cheia'
                  }
                >
                  {fullscreen ? '×' : '⛶'}
                </button>
              </div>
            </div>
          </div>

          {/* MINIATURAS */}
          <div
            className="gemini-thumbnails"
            aria-label="Selecionar ângulo da Poltrona Gemini"
          >
            {views.map((view, index) => (
              <button
                key={view.label}
                type="button"
                className={
                  selectedView === index
                    ? 'gemini-thumb active'
                    : 'gemini-thumb'
                }
                onClick={() => changeView(index)}
                aria-pressed={selectedView === index}
                aria-label={`Visualizar ${view.label}`}
              >
                <img
                  src={view.thumbnail}
                  alt=""
                  loading="lazy"
                />
                <span>{view.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAIXA INFERIOR */}
      <div className="gemini-benefit-bar">
        {benefits.map((benefit) => (
          <div
            className="gemini-benefit-bar-item"
            key={benefit.title}
          >
            <span className="gemini-feature-icon" aria-hidden="true">
              {benefit.icon}
            </span>

            <div>
              <strong>{benefit.title}</strong>
              <p>{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CORES */}
      <div className="gemini-footer">
        <button
          type="button"
          className="gemini-colors-button"
          onClick={() =>
            setShowColors((value) => !value)
          }
          aria-expanded={showColors}
        >
          Ver opções de cores {showColors ? '−' : '+'}
        </button>

        <span>
          Selecione uma imagem para explorar a Gemini
        </span>
      </div>

      {showColors && (
        <div className="gemini-colors-panel">
          {imageUrl && (
            <img src={imageUrl} alt={imageAlt} />
          )}

          <p>
            Consulte um vendedor para conhecer as opções
            de couro e personalização.
          </p>
        </div>
      )}

      <style jsx>{`
        .gemini-experience {
          width: 100%;
          padding: 64px max(28px, 4vw) 58px;
          background: #f7f5f0;
          color: #24211c;
        }

        .gemini-container {
          max-width: 1600px;
          margin: 0 auto;
          display: grid;
          grid-template-columns:
            minmax(260px, 0.74fr)
            minmax(0, 2.26fr);
          gap: 32px;
          align-items: center;
        }

        .gemini-information {
          min-width: 0;
        }

        .gemini-kicker {
          margin-bottom: 28px;
          color: #a58b5b;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2.3px;
        }

        .gemini-information h2 {
          margin: 0 0 24px;
          font-size: clamp(44px, 5vw, 78px);
          font-weight: 400;
          letter-spacing: -3px;
          line-height: 1.04;
        }

        .gemini-information h2 span {
          display: block;
          color: #a58b5b;
          font-weight: 300;
        }

        .gemini-description {
          max-width: 340px;
          margin: 0 0 32px;
          color: #5e5b55;
          font-size: 15px;
          line-height: 1.8;
        }

        .gemini-benefits {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-bottom: 35px;
        }

        .gemini-benefit {
          display: flex;
          align-items: flex-start;
          gap: 13px;
        }

        .gemini-benefit-check {
          display: flex;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border: 1px solid #d9c7a6;
          border-radius: 50%;
          color: #b18d4b;
          font-size: 18px;
        }

        .gemini-benefit strong {
          font-size: 14px;
          font-weight: 700;
        }

        .gemini-benefit p {
          margin: 4px 0 0;
          color: #928b80;
          font-size: 12px;
          line-height: 1.4;
        }

        .gemini-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 18px;
        }

        .gemini-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 26px;
          padding: 19px 22px;
          background: #f2cd16;
          border-radius: 7px;
          color: #181818;
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
          transition: background 0.2s;
        }

        .gemini-whatsapp:hover {
          background: #ffdf3a;
        }

        .gemini-product-link {
          color: #38332c;
          font-size: 13px;
          text-decoration: none;
        }

        .gemini-product-link:hover {
          text-decoration: underline;
        }

        /* GALERIA */

        .gemini-visuals {
          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            minmax(168px, 24%);
          gap: 18px;
          min-width: 0;
          align-items: stretch;
        }

        .gemini-gallery {
          min-width: 0;
        }

        .gemini-stage {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 470px;
          overflow: hidden;
          isolation: isolate;
          border-radius: 20px;
          transition: background 0.25s ease;
        }

        /* FUNDO DO ATELIER: SOMENTE FRENTE */

        .gemini-stage.atelier {
          background: #c9aa8d;
        }

        /* FUNDO BRANCO: TODOS OS OUTROS ÂNGULOS */

        .gemini-stage.studio {
          background:
            radial-gradient(
              ellipse at 50% 42%,
              #ffffff 0%,
              #ffffff 58%,
              #f4f3f1 100%
            );
        }

        .gemini-stage.fullscreen {
          position: fixed;
          inset: 0;
          z-index: 9999;
          width: 100vw;
          height: 100dvh;
          min-height: 0;
          border-radius: 0;
        }

        .gemini-photo-area {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          pointer-events: none;
        }

        .gemini-photo {
          position: relative;
          z-index: 2;
          display: block;
          width: 94%;
          height: 90%;
          object-fit: contain;
          filter: drop-shadow(
            0 18px 13px rgba(30, 24, 18, 0.13)
          );
          transition: transform 0.25s ease;
        }

        .gemini-atelier-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: none;
        }

        .gemini-floor-shadow {
          position: absolute;
          z-index: 1;
          bottom: 9%;
          left: 18%;
          width: 64%;
          height: 9%;
          border-radius: 50%;
          background: rgba(45, 39, 33, 0.12);
          filter: blur(24px);
        }

        .gemini-image-error {
          position: relative;
          z-index: 3;
          max-width: 280px;
          padding: 18px;
          border-radius: 12px;
          background: #fffdf6;
          color: #5d4d3a;
          font-size: 12px;
          line-height: 1.6;
          text-align: center;
        }

        .gemini-image-error span {
          display: block;
          margin-top: 8px;
          overflow-wrap: anywhere;
        }

        .gemini-stage-label {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 17px;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.95);
          color: #24211c;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.6px;
          box-shadow:
            0 4px 14px rgba(0, 0, 0, 0.06);
        }

        .gemini-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #56ac6e;
        }

        .gemini-tools {
          position: absolute;
          right: 14px;
          bottom: 15px;
          z-index: 4;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .gemini-tools button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 39px;
          height: 39px;
          border: 0;
          border-radius: 9px;
          background: #fff;
          color: #2e2b26;
          font-size: 21px;
          cursor: pointer;
          box-shadow:
            0 3px 12px rgba(0, 0, 0, 0.06);
        }

        .gemini-tools button:hover {
          background: #f2cd16;
        }

        /* MINIATURAS */

        .gemini-thumbnails {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          grid-template-rows:
            repeat(3, minmax(0, 1fr));
          gap: 12px;
          min-width: 0;
        }

        .gemini-thumb {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
          min-height: 0;
          overflow: hidden;
          border: 1px solid #e2d5c5;
          border-radius: 17px;
          background: #e9e0d5;
          cursor: pointer;
          transition:
            border-color 0.2s,
            transform 0.2s;
        }

        .gemini-thumb:hover {
          transform: translateY(-2px);
        }

        .gemini-thumb.active {
          border: 2px solid #a87917;
          background: #fffdf9;
        }

        .gemini-thumb img {
          position: absolute;
          inset: 4% 3% 18%;
          width: 94%;
          height: 78%;
          object-fit: contain;
          filter: drop-shadow(
            0 8px 6px rgba(47, 30, 18, 0.13)
          );
        }

        .gemini-thumb span {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          max-width: 96%;
          padding: 7px 9px;
          border-radius: 22px;
          background: rgba(255, 253, 249, 0.95);
          color: #3d342a;
          font-size: 10px;
          line-height: 1.2;
          white-space: nowrap;
        }

        /* BENEFÍCIOS */

        .gemini-benefit-bar {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));
          max-width: 1600px;
          margin: 24px auto 0;
          padding: 22px 16px;
          border-radius: 17px;
          background: #f0e9df;
        }

        .gemini-benefit-bar-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          padding: 0 20px;
          border-right: 1px solid #d4c3aa;
        }

        .gemini-benefit-bar-item:last-child {
          border: 0;
        }

        .gemini-feature-icon {
          color: #b28b37;
          font-size: 43px;
          line-height: 1;
        }

        .gemini-benefit-bar-item strong {
          font-size: 14px;
        }

        .gemini-benefit-bar-item p {
          margin: 3px 0 0;
          color: #81796f;
          font-size: 12px;
        }

        /* CORES */

        .gemini-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          max-width: 1600px;
          margin: 16px auto 0;
        }

        .gemini-footer span {
          font-size: 11px;
          color: #928b80;
        }

        .gemini-colors-button {
          padding: 8px 0;
          border: 0;
          background: transparent;
          color: #8b754f;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .gemini-colors-panel {
          max-width: 1600px;
          margin: 10px auto 0;
          padding: 18px;
          border: 1px solid #e1d5c6;
          border-radius: 12px;
          background: #fffdf9;
        }

        .gemini-colors-panel img {
          display: block;
          max-height: 230px;
          max-width: 100%;
          margin: 0 auto 12px;
          object-fit: contain;
        }

        .gemini-colors-panel p {
          margin: 0;
          color: #746e65;
          font-size: 12px;
        }

        /* TABLET */

        @media (max-width: 1200px) {
          .gemini-container {
            grid-template-columns:
              minmax(230px, 0.8fr)
              minmax(0, 2.2fr);
            gap: 22px;
          }

          .gemini-visuals {
            grid-template-columns:
              minmax(0, 1fr)
              minmax(145px, 25%);
            gap: 10px;
          }

          .gemini-stage {
            min-height: 390px;
          }

          .gemini-thumb span {
            font-size: 9px;
            padding: 6px 7px;
          }
        }

        @media (max-width: 950px) {
          .gemini-experience {
            padding: 55px 5%;
          }

          .gemini-container {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .gemini-description {
            max-width: 620px;
          }

          .gemini-benefits {
            display: grid;
            grid-template-columns:
              repeat(3, 1fr);
            gap: 12px;
          }

          .gemini-stage {
            min-height: 460px;
          }

          .gemini-visuals {
            grid-template-columns:
              minmax(0, 1fr)
              minmax(170px, 25%);
          }
        }

        /* CELULAR */

        @media (max-width: 620px) {
          .gemini-experience {
            padding: 42px 18px;
          }

          .gemini-kicker {
            font-size: 9px;
            letter-spacing: 1.5px;
            margin-bottom: 16px;
          }

          .gemini-information h2 {
            font-size: 52px;
          }

          .gemini-description {
            font-size: 14px;
            margin-bottom: 24px;
          }

          .gemini-benefits {
            grid-template-columns: 1fr;
            gap: 12px;
            margin-bottom: 24px;
          }

          .gemini-visuals {
            grid-template-columns: 1fr;
          }

          .gemini-stage {
            height: auto;
            min-height: 0;
            aspect-ratio: 1 / 0.94;
            border-radius: 16px;
          }

          .gemini-thumbnails {
            grid-template-columns:
              repeat(3, minmax(0, 1fr));
            grid-template-rows:
              repeat(2, 110px);
            gap: 8px;
          }

          .gemini-thumb {
            border-radius: 12px;
          }

          .gemini-thumb span {
            font-size: 9px;
            padding: 5px 7px;
          }

          .gemini-stage-label {
            top: 11px;
            left: 11px;
            padding: 9px 11px;
            font-size: 9px;
          }

          .gemini-tools {
            right: 10px;
            bottom: 10px;
          }

          .gemini-tools button {
            width: 34px;
            height: 34px;
          }

          .gemini-benefit-bar {
            grid-template-columns: 1fr;
            gap: 14px;
            padding: 18px;
          }

          .gemini-benefit-bar-item {
            justify-content: flex-start;
            padding: 0 8px 14px;
            border-right: 0;
            border-bottom: 1px solid #d4c3aa;
          }

          .gemini-benefit-bar-item:last-child {
            padding-bottom: 0;
            border-bottom: 0;
          }

          .gemini-feature-icon {
            font-size: 32px;
          }

          .gemini-footer {
            align-items: flex-start;
            flex-direction: column;
            gap: 2px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gemini-photo,
          .gemini-thumb {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
