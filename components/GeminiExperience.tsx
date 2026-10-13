
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
  title: string;
  handle: string;
  imageUrl: string;
  imageAlt: string;
};

type ModelViewerElement = HTMLElement & {
  cameraOrbit: string;
  loaded?: boolean;
  getCameraOrbit?: () => {
    theta: number;
    phi: number;
    radius: number;
  };
  jumpCameraToGoal?: () => void;
};

const MODEL_URL = '/models/Gemini-local.glb?v=6';
const ROOM_URL = '/images/gemini-sala.png';

// Aumente para diminuir ainda mais a poltrona.
// 1.8 = câmera 80% mais distante que o enquadramento inicial.
const CAMERA_DISTANCE_MULTIPLIER = 1.8;

const views = [
  {
    label: 'Traseira',
    orbit: '180deg 75deg',
    image: '/images/gemini-fotos/gemini-traseira.png',
  },
  {
    label: 'Lateral esquerda',
    orbit: '-90deg 75deg',
    image: '/images/gemini-fotos/gemini-lateral-esquerda.png',
  },
  {
    label: 'Lateral direita',
    orbit: '90deg 75deg',
    image: '/images/gemini-fotos/gemini-lateral-direita.png',
  },
  {
    label: 'Frente',
    orbit: '0deg 75deg',
    image: '/images/gemini-fotos/gemini-frente.png',
  },
  {
    label: 'Parte superior',
    orbit: '0deg 35deg',
    image: '/images/gemini-fotos/gemini-inferior.png',
  },
];

function FeatureIcon({
  kind,
}: {
  kind: 'leather' | 'electric' | 'usb';
}) {
  if (kind === 'electric') {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M27 3 11 26h12l-3 19 18-26H26L27 3Z" />
      </svg>
    );
  }

  if (kind === 'leather') {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m13 5 8 3 6-3 8 5-3 8 6 7-6 8 1 9-9-4-10 4 1-9-6-8 6-7-2-13Z" />
        <path d="m21 8-2 8 5 8-4 9 4 5M32 18l-8 6" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="10" y="5" width="28" height="38" rx="6" />
      <path d="M24 13v17m0-17-5 5m5-5 5 5M17 30h14M24 30v5" />
    </svg>
  );
}

export default function GeminiExperience({
  title,
  handle,
}: GeminiExperienceProps) {
  const viewerRef = useRef<ModelViewerElement | null>(null);
  const baseDistanceRef = useRef<number | null>(null);

  const [viewerReady, setViewerReady] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [selectedView, setSelectedView] = useState(3);

  const productName =
    title.replace(/poltrona/gi, '').trim() || 'Gemini';

  useEffect(() => {
    if (!viewerReady) return;

    const viewer = viewerRef.current;
    if (!viewer) return;

    const onLoad = () => {
      setModelLoaded(true);
      setModelError(false);

      const orbit = viewer.getCameraOrbit?.();

      if (
        orbit &&
        Number.isFinite(orbit.radius) &&
        orbit.radius > 0
      ) {
        // Calcula a distância uma única vez por carregamento.
        const distance =
          orbit.radius * CAMERA_DISTANCE_MULTIPLIER;

        baseDistanceRef.current = distance;

        viewer.cameraOrbit = `0deg 75deg ${distance}m`;
        viewer.jumpCameraToGoal?.();
      }
    };

    const onError = () => {
      setModelLoaded(false);
      setModelError(true);
    };

    viewer.addEventListener('load', onLoad);
    viewer.addEventListener('error', onError);

    if (viewer.loaded) {
      onLoad();
    }

    return () => {
      viewer.removeEventListener('load', onLoad);
      viewer.removeEventListener('error', onError);
    };
  }, [viewerReady]);

  function setCamera(index: number) {
    const viewer = viewerRef.current;

    if (viewer) {
      const distance = baseDistanceRef.current;

      viewer.cameraOrbit =
        distance !== null
          ? `${views[index].orbit} ${distance}m`
          : `${views[index].orbit} auto`;

      viewer.jumpCameraToGoal?.();
    }

    setSelectedView(index);
  }

  const modelViewer = createElement('model-viewer', {
    ref: viewerRef,
    src: MODEL_URL,
    alt: `Poltrona ${productName} em 3D`,

    'camera-controls': true,
    'disable-pan': true,

    // Limita a rotação vertical.
    'min-camera-orbit': 'auto 35deg auto',
    'max-camera-orbit': 'auto 90deg auto',

    'camera-orbit': '0deg 75deg auto',
    'camera-target': 'auto auto auto',

    'touch-action': 'pan-y',
    'interaction-prompt': 'none',

    'shadow-intensity': '0.25',
    'shadow-softness': '1',
    'environment-image': 'neutral',
    exposure: '0.9',

    'field-of-view': '38deg',
    loading: 'eager',

    style: {
      display: 'block',
      width: '100%',
      height: '100%',
      background: 'transparent',
    },
  });

  return (
    <section
      className="gemini-hero"
      aria-label={`Experiência 3D ${productName}`}
    >
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

      <div className="gemini-stage">
        <div className="gemini-room" />
        <div className="gemini-left-shade" />

        {/* MODELO 3D REDUZIDO */}
        <div className="gemini-viewer">
          {modelViewer}
        </div>

        {/* CONTEÚDO À ESQUERDA */}
        <div className="gemini-copy">
          <p className="gemini-eyebrow">
            EM DESTAQUE
          </p>

          <h1>{productName}</h1>

          <p className="gemini-tagline">
            O fim do dia começa aqui.
          </p>

          <p className="gemini-description">
            Reclinação elétrica, couro legítimo e o
            conforto que só a EuroDesign entrega.
          </p>

          <div className="gemini-features">
            <div className="gemini-feature">
              <span className="gemini-feature-circle">
                <FeatureIcon kind="leather" />
              </span>

              <span>
                Couro 100%
                <br />
                legítimo
              </span>
            </div>

            <div className="gemini-feature">
              <span className="gemini-feature-circle">
                <FeatureIcon kind="electric" />
              </span>

              <span>
                Totalmente
                <br />
                elétrico
              </span>
            </div>

            <div className="gemini-feature">
              <span className="gemini-feature-circle">
                <FeatureIcon kind="usb" />
              </span>

              <span>
                USB
                <br />
                grátis
              </span>
            </div>
          </div>

          {/* BOTÃO AMARELO */}
          <Link
            href={`/products/${handle}`}
            className="gemini-cta"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 'min(100%, 390px)',
              padding: '21px 32px 21px 42px',
              borderRadius: '999px',
              backgroundColor: '#FFDA00',
              color: '#111111',
              fontSize: 'clamp(17px, 1.23vw, 24px)',
              fontWeight: 700,
              textDecoration: 'none',
              boxSizing: 'border-box',
            }}
          >
            Conhecer a Gemini

            <span
              aria-hidden="true"
              style={{
                fontSize: '30px',
                lineHeight: 1,
              }}
            >
              →
            </span>
          </Link>
        </div>

        {/* FOTOGRAFIAS NA DIREITA */}
        <div
          className="gemini-thumbnails"
          aria-label="Ângulos de visualização"
        >
          {views.map((view, index) => (
            <button
              type="button"
              key={view.label}
              className={
                selectedView === index
                  ? 'gemini-thumb active'
                  : 'gemini-thumb'
              }
              onClick={() => setCamera(index)}
              aria-pressed={selectedView === index}
            >
              <span
                className="gemini-thumb-photo"
                style={{
                  backgroundImage: `url("${view.image}")`,
                }}
                role="img"
                aria-label={view.label}
              />

              <span className="gemini-thumb-label">
                {view.label}
              </span>
            </button>
          ))}
        </div>

        {!modelLoaded && !modelError && (
          <div className="gemini-model-status">
            Carregando Gemini 3D...
          </div>
        )}

        {modelError && (
          <div className="gemini-model-status">
            Não foi possível carregar o modelo 3D.
          </div>
        )}
      </div>

      <style jsx>{`
        .gemini-hero {
          width: 100%;
          background: #e6d8c8;
          color: #080808;
          font-family: inherit;
        }

        .gemini-stage {
          position: relative;
          width: 100%;
          min-height: 720px;
          height: min(56.25vw, 900px);
          overflow: hidden;
          isolation: isolate;
          background: #d5b99b;
        }

        .gemini-room {
          position: absolute;
          inset: 0;
          background: url('${ROOM_URL}') center / cover no-repeat;
          z-index: 0;
        }

        .gemini-left-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 250, 242, 0.83) 0%,
            rgba(255, 250, 242, 0.72) 25%,
            rgba(255, 250, 242, 0.12) 49%,
            rgba(255, 250, 242, 0) 72%
          );
          z-index: 1;
          pointer-events: none;
        }

        /* ÁREA DO MODELO 3D */
        .gemini-viewer {
          position: absolute;
          top: 9%;
          bottom: 9%;
          left: 37%;
          width: 48%;
          z-index: 2;
        }

        .gemini-copy {
          position: absolute;
          left: 7.65%;
          top: 14%;
          width: 35%;
          z-index: 4;
        }

        .gemini-eyebrow {
          color: #e3ad00;
          letter-spacing: 0.36em;
          font-weight: 700;
          font-size: clamp(12px, 1.15vw, 20px);
          margin: 0 0 16px;
        }

        .gemini-copy h1 {
          margin: 0;
          font-size: clamp(62px, 5vw, 100px);
          font-weight: 500;
          line-height: 1.03;
          letter-spacing: -0.055em;
        }

        .gemini-tagline {
          font-size: clamp(21px, 1.8vw, 33px);
          line-height: 1.2;
          margin: 10px 0 28px;
          color: #373534;
        }

        .gemini-description {
          max-width: 490px;
          font-size: clamp(16px, 1.12vw, 21px);
          line-height: 1.32;
          color: #3e3b38;
          margin: 0 0 28px;
        }

        .gemini-features {
          display: flex;
          align-items: flex-start;
          gap: clamp(20px, 2.7vw, 60px);
          margin: 0 0 60px;
        }

        .gemini-feature {
          display: flex;
          align-items: center;
          flex-direction: column;
          gap: 12px;
          text-align: center;
          min-width: 90px;
          font-size: clamp(13px, 0.91vw, 17px);
          line-height: 1.18;
          font-weight: 500;
        }

        .gemini-feature-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(66px, 4.9vw, 94px);
          height: clamp(66px, 4.9vw, 94px);
          border: 1.5px solid #1e1b19;
          border-radius: 50%;
        }

        .gemini-feature-circle :global(svg) {
          width: 49%;
          height: 49%;
        }

        .gemini-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: min(100%, 390px);
          padding: 21px 32px 21px 42px;
          border-radius: 999px;
          background-color: #ffda00;
          color: #111111;
          font-size: clamp(17px, 1.23vw, 24px);
          font-weight: 700;
          text-decoration: none;
          box-sizing: border-box;
          transition: transform 0.2s;
        }

        .gemini-cta:hover {
          transform: translateY(-2px);
        }

        .gemini-cta span {
          font-size: 30px;
          line-height: 1;
        }

        /* FOTOGRAFIAS À DIREITA */
        .gemini-thumbnails {
          position: absolute;
          right: 2.5%;
          top: 50%;
          transform: translateY(-50%);
          width: 9.5%;
          z-index: 5;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .gemini-thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 1.25;
          padding: 0;
          overflow: hidden;
          border: 2px solid rgba(255, 255, 255, 0.85);
          border-radius: 12px;
          background: #d4bba0;
          cursor: pointer;
        }

        .gemini-thumb.active {
          border-color: #ffda00;
          box-shadow: 0 0 0 1px #ffda00;
        }

        .gemini-thumb-photo {
          display: block;
          position: absolute;
          inset: 0;
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          background-color: #f5f0e8;
        }

        .gemini-thumb-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 12px 3px 6px;
          background: linear-gradient(
            transparent,
            rgba(0, 0, 0, 0.85)
          );
          color: #fff;
          font-size: clamp(9px, 0.68vw, 12px);
          font-weight: 600;
          text-align: center;
        }

        .gemini-model-status {
          position: absolute;
          bottom: 3%;
          right: 3%;
          z-index: 6;
          background: rgba(255, 255, 255, 0.9);
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
        }

        @media (max-width: 1100px) {
          .gemini-stage {
            height: 760px;
          }

          .gemini-copy {
            left: 5%;
            width: 43%;
            top: 17%;
          }

          .gemini-viewer {
            left: 39%;
            width: 47%;
          }

          .gemini-features {
            gap: 12px;
          }

          .gemini-thumbnails {
            right: 2%;
            width: 11%;
          }
        }

        @media (max-width: 700px) {
          .gemini-stage {
            height: 930px;
            min-height: 930px;
          }

          .gemini-room {
            background-position: 58% center;
          }

          .gemini-left-shade {
            background: linear-gradient(
              180deg,
              rgba(255, 250, 242, 0.88),
              rgba(255, 250, 242, 0.58) 42%,
              rgba(255, 250, 242, 0) 70%
            );
          }

          .gemini-copy {
            top: 35px;
            left: 6%;
            width: 88%;
          }

          .gemini-eyebrow {
            font-size: 12px;
            margin-bottom: 10px;
          }

          .gemini-copy h1 {
            font-size: 64px;
          }

          .gemini-tagline {
            font-size: 23px;
            margin: 7px 0 13px;
          }

          .gemini-description {
            font-size: 15px;
            max-width: 350px;
            margin-bottom: 18px;
          }

          .gemini-features {
            margin-bottom: 22px;
            gap: 15px;
          }

          .gemini-feature {
            min-width: 70px;
            font-size: 12px;
            gap: 7px;
          }

          .gemini-feature-circle {
            width: 60px;
            height: 60px;
          }

          .gemini-cta {
            width: 285px;
            padding: 15px 20px;
            font-size: 16px;
          }

          .gemini-viewer {
            left: 1%;
            top: 39%;
            bottom: 12%;
            width: 86%;
          }

          .gemini-thumbnails {
            top: 65%;
            right: 2%;
            transform: translateY(-50%);
            width: 19%;
            gap: 7px;
          }

          .gemini-thumb {
            border-radius: 8px;
          }

          .gemini-thumb-label {
            font-size: 8px;
            padding: 8px 2px 4px;
          }
        }
      `}</style>
    </section>
  );
}
