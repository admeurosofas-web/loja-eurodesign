
'use client';

import Link from 'next/link';
import { useState } from 'react';

type GeminiExperienceProps = {
  title?: string;
  handle?: string;
  imageUrl?: string;
  imageAlt?: string;
};

const views = [
  {
    label: 'Frente',
    image: '/images/gemini-fotos/gemini-frente.png',
    shadowWidth: '62%',
    shadowLeft: '19%',
  },
  {
    label: 'Lateral esquerda',
    image: '/images/gemini-fotos/gemini-lateral-esquerda.png',
    shadowWidth: '66%',
    shadowLeft: '17%',
  },
  {
    label: 'Traseira',
    image: '/images/gemini-fotos/gemini-traseira.png',
    shadowWidth: '62%',
    shadowLeft: '19%',
  },
  {
    label: 'Lateral direita',
    image: '/images/gemini-fotos/gemini-lateral-direita.png',
    shadowWidth: '66%',
    shadowLeft: '17%',
  },
];

const benefits = [
  {
    title: 'Couro 100% legítimo',
    description:
      'Qualidade, sofisticação e acabamento em couro natural.',
  },
  {
    title: 'Totalmente elétrico',
    description:
      'Reclinação elétrica para proporcionar máximo conforto.',
  },
  {
    title: 'USB grátis',
    description:
      'Entrada USB integrada para mais praticidade.',
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
  const [showColors, setShowColors] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const productName =
    title.replace(/poltrona/gi, '').trim() || 'Gemini';

  const currentView = views[selectedView];

  function changeView(index: number) {
    setSelectedView(index);
    setZoom(1);
    setImageError(false);
  }

  function zoomIn() {
    setZoom((current) => Math.min(current + 0.2, 2));
  }

  function zoomOut() {
    setZoom((current) => Math.max(current - 0.2, 1));
  }

  function resetView() {
    setSelectedView(0);
    setZoom(1);
    setImageError(false);
  }

  return (
    <section className="gemini-experience">
      <div className="gemini-container">
        <div className="gemini-information">
          <div className="gemini-kicker">
            EURODESIGN · EXPERIÊNCIA INTERATIVA
          </div>

          <h2>
            Poltrona <span>{productName}</span>
          </h2>

          <p className="gemini-description">
            Design sofisticado, conforto excepcional e
            tecnologia para transformar seus momentos de
            descanso. Conheça a poltrona Gemini por
            diferentes ângulos.
          </p>

          <div className="gemini-benefits">
            {benefits.map((benefit) => (
              <div
                className="gemini-benefit"
                key={benefit.title}
              >
                <span className="gemini-benefit-check">
                  ✓
                </span>

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

        <div className="gemini-showcase">
          <div
            className={
              fullscreen
                ? 'gemini-stage fullscreen'
                : 'gemini-stage'
            }
          >
            <div className="gemini-room" />

            <div className="gemini-photo-area">
              <div
                className="gemini-floor-shadow"
                style={{
                  width: currentView.shadowWidth,
                  left: currentView.shadowLeft,
                  transform: `scaleX(${zoom})`,
                }}
              />

              {imageError && imageUrl ? (
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="gemini-photo"
                  style={{
                    transform: `scale(${zoom})`,
                  }}
                />
              ) : (
                <img
                  key={currentView.image}
                  src={currentView.image}
                  alt={`Poltrona Gemini - ${currentView.label}`}
                  className="gemini-photo"
                  style={{
                    transform: `scale(${zoom})`,
                  }}
                  onError={() => setImageError(true)}
                />
              )}
            </div>

            <div className="gemini-stage-label">
              <span className="gemini-status-dot" />
              GALERIA INTERATIVA
            </div>

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
                onClick={zoomIn}
                title="Aproximar"
                aria-label="Aproximar"
              >
                +
              </button>

              <button
                type="button"
                onClick={zoomOut}
                title="Afastar"
                aria-label="Afastar"
              >
                −
              </button>

              <button
                type="button"
                onClick={() => setFullscreen(!fullscreen)}
                title="Tela cheia"
                aria-label="Tela cheia"
              >
                {fullscreen ? '×' : '⛶'}
              </button>
            </div>
          </div>

          <div className="gemini-view-selector">
            {views.map((view, index) => (
              <button
                key={view.label}
                type="button"
                className={
                  selectedView === index
                    ? 'gemini-view active'
                    : 'gemini-view'
                }
                onClick={() => changeView(index)}
              >
                {view.label}
              </button>
            ))}
          </div>

          <div className="gemini-bottom-row">
            <button
              type="button"
              className="gemini-colors-button"
              onClick={() =>
                setShowColors((current) => !current)
              }
            >
              Ver opções de cores{' '}
              {showColors ? '−' : '+'}
            </button>

            <span>
              Selecione um ângulo para explorar a poltrona
            </span>
          </div>

          {showColors && (
            <div className="gemini-colors-panel">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="gemini-color-image"
                />
              )}

              <p>
                Consulte um vendedor para conhecer
                as opções de couro e personalização.
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .gemini-experience {
          width: 100%;
          padding: 90px 5%;
          background: #f7f5f0;
          color: #24211c;
        }

        .gemini-container {
          max-width: 1480px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 55px;
          align-items: center;
        }

        .gemini-kicker {
          margin-bottom: 24px;
          color: #a58b5b;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
        }

        .gemini-information h2 {
          margin: 0 0 26px;
          font-size: clamp(46px, 5vw, 76px);
          font-weight: 400;
          letter-spacing: -3px;
          line-height: 1.05;
        }

        .gemini-information h2 span {
          display: block;
          color: #a58b5b;
          font-weight: 300;
        }

        .gemini-description {
          max-width: 480px;
          margin-bottom: 34px;
          color: #706c64;
          font-size: 16px;
          line-height: 1.85;
        }

        .gemini-benefits {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 35px;
        }

        .gemini-benefit {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .gemini-benefit-check {
          width: 30px;
          height: 30px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #d8ccb7;
          border-radius: 50%;
          color: #987746;
          font-weight: 700;
        }

        .gemini-benefit strong {
          display: block;
          margin-bottom: 4px;
          font-size: 15px;
        }

        .gemini-benefit p {
          margin: 0;
          color: #898176;
          font-size: 13px;
          line-height: 1.5;
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
          justify-content: center;
          gap: 22px;
          padding: 19px 27px;
          border-radius: 5px;
          background: #edc92c;
          color: #161616;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
          transition: background 0.2s;
        }

        .gemini-whatsapp:hover {
          background: #f9d94a;
        }

        .gemini-product-link {
          color: #7e6a4b;
          font-size: 13px;
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .gemini-showcase {
          min-width: 0;
        }

        .gemini-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 1.22;
          overflow: hidden;
          isolation: isolate;
          border-radius: 22px;
          background: #c8b8a6;
        }

        .gemini-stage.fullscreen {
          position: fixed;
          inset: 0;
          z-index: 9999;
          width: 100vw;
          height: 100dvh;
          aspect-ratio: auto;
          border-radius: 0;
        }

        .gemini-room {
          position: absolute;
          inset: 0;
          z-index: 0;

          background-color: #c8b8a6;

          background-image:
            linear-gradient(
              rgba(65, 48, 35, 0.17),
              rgba(65, 48, 35, 0.17)
            ),
            url('/images/gemini-microcimento.png');

          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;

          pointer-events: none;
        }

        .gemini-photo-area {
          position: absolute;
          inset: 0;
          z-index: 1;

          display: flex;
          align-items: center;
          justify-content: center;

          overflow: hidden;
          pointer-events: none;
        }

        .gemini-floor-shadow {
          position: absolute;
          bottom: 5%;
          height: 13%;

          border-radius: 50%;
          background: rgba(40, 31, 23, 0.42);
          filter: blur(24px);

          z-index: 0;
          pointer-events: none;

          transition:
            width 0.3s ease,
            left 0.3s ease,
            transform 0.3s ease;
        }

        .gemini-photo {
          position: relative;
          z-index: 1;

          display: block;
          width: 85%;
          height: 85%;

          object-fit: contain;

          filter: drop-shadow(
            0 20px 17px rgba(35, 27, 20, 0.26)
          );

          transition:
            transform 0.3s ease,
            filter 0.3s ease;
        }

        .gemini-stage-label {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 13px 18px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.92);
          color: #625a50;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          pointer-events: none;
        }

        .gemini-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #58a66a;
        }

        .gemini-tools {
          position: absolute;
          right: 17px;
          bottom: 17px;
          z-index: 4;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .gemini-tools button {
          width: 39px;
          height: 39px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.92);
          color: #24211c;
          font-size: 20px;
          cursor: pointer;
        }

        .gemini-tools button:hover {
          background: #edc92c;
        }

        .gemini-view-selector {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 16px;
        }

        .gemini-view {
          padding: 9px 13px;
          border: 1px solid #ded8ce;
          border-radius: 999px;
          background: transparent;
          color: #746e65;
          font-size: 11px;
          cursor: pointer;
        }

        .gemini-view.active {
          border-color: #a58b5b;
          background: #f0e8d8;
          color: #5d4b30;
        }

        .gemini-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-top: 18px;
        }

        .gemini-colors-button {
          border: 0;
          background: transparent;
          color: #8b754f;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .gemini-bottom-row > span {
          color: #aaa39a;
          font-size: 11px;
          text-align: right;
        }

        .gemini-colors-panel {
          margin-top: 15px;
          padding: 18px;
          border: 1px solid #e3dbcf;
          border-radius: 12px;
          background: #fffdf9;
        }

        .gemini-color-image {
          display: block;
          max-width: 100%;
          max-height: 250px;
          margin: 0 auto 12px;
          object-fit: contain;
        }

        .gemini-colors-panel p {
          margin: 0;
          color: #746e65;
          font-size: 12px;
          line-height: 1.6;
        }

        @media (max-width: 1000px) {
          .gemini-experience {
            padding: 65px 5%;
          }

          .gemini-container {
            grid-template-columns: 1fr;
            gap: 38px;
          }

          .gemini-information h2 {
            font-size: 56px;
          }

          .gemini-description {
            max-width: 650px;
          }

          .gemini-stage {
            aspect-ratio: 1.35;
          }
        }

        @media (max-width: 600px) {
          .gemini-experience {
            padding: 45px 20px;
          }

          .gemini-kicker {
            font-size: 9px;
            letter-spacing: 2px;
          }

          .gemini-information h2 {
            font-size: 48px;
          }

          .gemini-description {
            font-size: 14px;
          }

          .gemini-stage {
            aspect-ratio: 0.9;
            border-radius: 16px;
          }

          .gemini-stage-label {
            top: 12px;
            left: 12px;
            padding: 10px 12px;
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

          .gemini-view {
            font-size: 10px;
            padding: 8px 10px;
          }

          .gemini-bottom-row {
            align-items: flex-start;
            flex-direction: column;
          }

          .gemini-bottom-row > span {
            text-align: left;
          }

          .gemini-floor-shadow {
            bottom: 8%;
            filter: blur(18px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gemini-photo,
          .gemini-floor-shadow {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
