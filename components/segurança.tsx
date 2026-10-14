
'use client';

import Link from 'next/link';
import Script from 'next/script';
import {
  createElement,
  useEffect,
  useRef,
  useState,
} from 'react';

type GeminiExperienceProps = {
  title?: string;
  handle?: string;
  imageUrl?: string;
  imageAlt?: string;
};

type ModelViewerElement = HTMLElement & {
  cameraOrbit: string;
  fieldOfView: string;
  autoRotate: boolean;
  loaded?: boolean;
  jumpCameraToGoal?: () => void;
  availableAnimations?: string[];
  animationName?: string;
  play?: () => void;
};

// URL do modelo 3D.
// Na Vercel, configure NEXT_PUBLIC_GEMINI_MODEL_URL
// com a URL pública do arquivo hospedado no Cloudflare R2.
const MODEL_URL =
  process.env.NEXT_PUBLIC_GEMINI_MODEL_URL?.trim() ||
  '/models/Gemini-local.glb?v=20261009';

const views = [
  { label: 'Frente', orbit: '0deg 75deg auto' },
  { label: 'Lateral esquerda', orbit: '-90deg 75deg auto' },
  { label: 'Traseira', orbit: '180deg 75deg auto' },
  { label: 'Lateral direita', orbit: '90deg 75deg auto' },
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
  const [isRotating, setIsRotating] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [viewerReady, setViewerReady] = useState(false);

  const viewerRef = useRef<ModelViewerElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const productName =
    title.replace(/poltrona/gi, '').trim() || 'Gemini';

  useEffect(() => {
    if (!viewerReady) return;

    const viewer = viewerRef.current;
    if (!viewer) return;

    const handleLoad = () => {
      setModelLoaded(true);
      setModelError(false);

      if (
        viewer.availableAnimations &&
        viewer.availableAnimations.length > 0
      ) {
        viewer.animationName = viewer.availableAnimations[0];
        viewer.play?.();
      }
    };

    const handleError = () => {
      setModelLoaded(false);
      setModelError(true);
    };

    viewer.addEventListener('load', handleLoad);
    viewer.addEventListener('error', handleError);

    if (viewer.loaded) handleLoad();

    return () => {
      viewer.removeEventListener('load', handleLoad);
      viewer.removeEventListener('error', handleError);
    };
  }, [viewerReady]);

  function setCamera(orbit: string, index: number) {
    const viewer = viewerRef.current;

    if (viewer) {
      viewer.autoRotate = false;
      viewer.cameraOrbit = orbit;
      viewer.jumpCameraToGoal?.();
    }

    setIsRotating(false);
    setSelectedView(index);
  }

  function toggleRotation() {
    const next = !isRotating;
    const viewer = viewerRef.current;

    if (viewer) {
      viewer.autoRotate = next;
    }

    setIsRotating(next);
  }

  function zoomIn() {
    const viewer = viewerRef.current;
    if (!viewer) return;

    viewer.fieldOfView = '22deg';
    viewer.jumpCameraToGoal?.();
  }

  function zoomOut() {
    const viewer = viewerRef.current;
    if (!viewer) return;

    viewer.fieldOfView = '38deg';
    viewer.jumpCameraToGoal?.();
  }

  async function openFullscreen() {
    if (!stageRef.current) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await stageRef.current.requestFullscreen();
      }
    } catch (error) {
      console.error(
        'Não foi possível abrir a tela cheia:',
        error
      );
    }
  }

  const modelViewer = createElement('model-viewer', {
    ref: viewerRef,
    src: MODEL_URL,
    alt: `Modelo 3D da ${title}`,
    'camera-controls': true,
    'touch-action': 'pan-y',
    'interaction-prompt': 'none',
    'shadow-intensity': '1',
    'shadow-softness': '0.8',
    exposure: '1',
    'environment-image': 'neutral',
    'camera-orbit': views[0].orbit,
    'field-of-view': '30deg',
    loading: 'eager',
    reveal: 'auto',
    style: {
      display: 'block',
      width: '100%',
      height: '100%',
      background: 'transparent',
    },
  });

  return (
    <section className="gemini-experience">
      <Script
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.1.0/model-viewer.min.js"
        type="module"
        strategy="afterInteractive"
        onReady={() => {
          customElements
            .whenDefined('model-viewer')
            .then(() => setViewerReady(true));
        }}
      />

      <div className="gemini-container">
        <div className="gemini-information">
          <div className="gemini-kicker">
            EURODESIGN · EXPERIÊNCIA 3D
          </div>

          <h2>
            Poltrona <span>{productName}</span>
          </h2>

          <p className="gemini-description">
            Design sofisticado, conforto excepcional e
            tecnologia para transformar seus momentos de
            descanso. Conheça a poltrona Gemini em uma
            experiência interativa.
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
          <div className="gemini-stage" ref={stageRef}>
            <div className="gemini-room" />

            <div className="gemini-model">
              {modelViewer}
            </div>

            {!modelLoaded && !modelError && (
              <div className="gemini-loading">
                <span className="gemini-spinner" />
                Carregando poltrona Gemini...
              </div>
            )}

            {modelError && (
              <div className="gemini-loading gemini-error">
                Não foi possível carregar o modelo 3D
                da Gemini. Verifique a URL do arquivo GLB.
              </div>
            )}

            <div className="gemini-stage-label">
              <span className="gemini-status-dot" />
              VISUALIZAÇÃO 3D
            </div>

            <div className="gemini-tools">
              <button
                type="button"
                onClick={toggleRotation}
                title={
                  isRotating
                    ? 'Parar rotação'
                    : 'Girar automaticamente'
                }
                aria-label={
                  isRotating
                    ? 'Parar rotação'
                    : 'Girar automaticamente'
                }
              >
                {isRotating ? 'Ⅱ' : '⟳'}
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
                onClick={openFullscreen}
                title="Tela cheia"
                aria-label="Tela cheia"
              >
                ⛶
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
                onClick={() =>
                  setCamera(view.orbit, index)
                }
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
              Arraste para explorar a poltrona ·
              Use o scroll para aproximar
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
          background: #e8dfd2;
        }

        .gemini-stage:fullscreen {
          width: 100vw;
          height: 100vh;
          aspect-ratio: auto;
          border-radius: 0;
        }

        .gemini-room {
          position: absolute;
          inset: 0;
          z-index: -1;
          background-image: url('/images/gemini-room.webp');
          background-position: center;
          background-size: cover;
          background-color: #e7d6c2;
        }

        .gemini-model {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .gemini-loading {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 30px;
          background: rgba(248, 246, 240, 0.76);
          color: #746c62;
          text-align: center;
          font-size: 13px;
        }

        .gemini-spinner {
          width: 28px;
          height: 28px;
          border: 3px solid #ded6c8;
          border-top-color: #a58b5b;
          border-radius: 50%;
          animation: gemini-spin 0.9s linear infinite;
        }

        .gemini-error {
          background: rgba(248, 246, 240, 0.85);
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

        @keyframes gemini-spin {
          to {
            transform: rotate(360deg);
          }
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
        }

        @media (prefers-reduced-motion: reduce) {
          .gemini-spinner {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
