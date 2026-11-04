
"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, HTMLAttributes } from "react";

/* =========================================
   EURODESIGN — POLTRONA GEMINI
   ========================================= */

const MODEL_URL = "/models/Gemini-local.glb?v=3";
const ROOM_IMAGE = "/images/gemini-sala.png";

type ModelViewerElement = HTMLElement & {
  loaded?: boolean;
  play?: () => void;
  pause?: () => void;
  availableAnimations?: string[];
  animationName?: string;
  autoplay?: boolean;
};

type ModelViewerProps = HTMLAttributes<HTMLElement> & {
  src?: string;
  alt?: string;
  "camera-controls"?: boolean;
  "touch-action"?: string;
  "interaction-prompt"?: string;
  "shadow-intensity"?: string;
  "shadow-softness"?: string;
  exposure?: string;
  "environment-image"?: string;
  "camera-orbit"?: string;
  "field-of-view"?: string;
  "min-camera-orbit"?: string;
  "max-camera-orbit"?: string;
  loading?: "auto" | "lazy" | "eager";
  reveal?: "auto" | "interaction" | "manual";
  autoplay?: boolean;
  style?: CSSProperties;
};

const benefits = [
  {
    icon: "◆",
    title: "Couro 100% legítimo",
    description:
      "Acabamento sofisticado, toque natural e qualidade para acompanhar seus melhores momentos.",
  },
  {
    icon: "⚡",
    title: "Totalmente elétrico",
    description:
      "Sistema elétrico de reclinação que proporciona conforto com praticidade.",
  },
  {
    icon: "USB",
    title: "USB grátis",
    description:
      "Entrada USB integrada para carregar seus dispositivos enquanto você relaxa.",
  },
];

export default function GeminiExperience() {
  const viewerRef = useRef<ModelViewerElement | null>(null);

  const [viewerReady, setViewerReady] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState("");
  const [fullscreen, setFullscreen] = useState(false);

  /* =========================================
     CARREGAR MODEL VIEWER
     ========================================= */

  useEffect(() => {
    let cancelled = false;

    if (customElements.get("model-viewer")) {
      setViewerReady(true);
      return;
    }

    const scriptId = "gemini-model-viewer-script";

    let script = document.getElementById(
      scriptId
    ) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "module";
      script.src =
        "https://ajax.googleapis.com/ajax/libs/model-viewer/4.1.0/model-viewer.min.js";

      document.head.appendChild(script);
    }

    customElements.whenDefined("model-viewer").then(() => {
      if (!cancelled) {
        setViewerReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  /* =========================================
     EVENTOS DO MODELO
     ========================================= */

  useEffect(() => {
    if (!viewerReady) return;

    const viewer = viewerRef.current;

    if (!viewer) return;

    const handleLoad = () => {
      setModelLoaded(true);
      setModelError("");

      // Reproduzir animação existente no GLB,
      // caso o arquivo tenha alguma.
      if (
        viewer.availableAnimations &&
        viewer.availableAnimations.length > 0
      ) {
        viewer.animationName =
          viewer.availableAnimations[0];

        viewer.play?.();
      }
    };

    const handleError = () => {
      setModelLoaded(false);
      setModelError(
        "Não foi possível carregar Gemini-local.glb. Verifique se o arquivo está em public/models."
      );
    };

    viewer.addEventListener("load", handleLoad);
    viewer.addEventListener("error", handleError);

    if (viewer.loaded) {
      handleLoad();
    }

    return () => {
      viewer.removeEventListener("load", handleLoad);
      viewer.removeEventListener("error", handleError);
    };
  }, [viewerReady]);

  /* =========================================
     TELA CHEIA
     ========================================= */

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(
        Boolean(document.fullscreenElement)
      );
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const toggleFullscreen = async () => {
    const viewer = viewerRef.current;

    if (!viewer) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await viewer.requestFullscreen();
      }
    } catch (error) {
      console.error(
        "Erro ao alternar tela cheia:",
        error
      );
    }
  };

  /* =========================================
     COMPONENTE MODEL VIEWER
     ========================================= */

  const ModelViewer = "model-viewer" as unknown as
    React.ElementType<ModelViewerProps>;

  return (
    <section className="gemini-experience">
      <div className="gemini-container">

        {/* INFORMAÇÕES DA POLTRONA */}

        <div className="gemini-content">
          <span className="gemini-eyebrow">
            EURODESIGN · LINHA PREMIUM
          </span>

          <h1>
            Poltrona
            <span>Gemini</span>
          </h1>

          <p className="gemini-description">
            Design sofisticado, couro legítimo e
            tecnologia elétrica em uma experiência
            de conforto excepcional.
            Explore cada detalhe da Gemini em 3D.
          </p>

          {/* NOVOS DESTAQUES */}

          <div className="gemini-benefits">
            {benefits.map((benefit) => (
              <div
                className="gemini-benefit"
                key={benefit.title}
              >
                <div className="gemini-benefit-icon">
                  {benefit.icon}
                </div>

                <div className="gemini-benefit-text">
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* WHATSAPP */}

          <a
            className="gemini-button"
            href="https://wa.me/5511913371140?text=Ol%C3%A1%21%20Tenho%20interesse%20na%20Poltrona%20Gemini."
            target="_blank"
            rel="noopener noreferrer"
          >
            FALE COM UM VENDEDOR
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* VISUALIZAÇÃO 3D */}

        <div className="gemini-visual">
          <div className="gemini-scene">

            <div
              className="gemini-background"
              style={{
                backgroundImage: `url("${ROOM_IMAGE}")`,
              }}
            />

            <ModelViewer
              ref={viewerRef}
              src={MODEL_URL}
              alt="Poltrona Gemini em couro legítimo com reclinação elétrica e USB"
              camera-controls
              touch-action="pan-y"
              interaction-prompt="none"
              shadow-intensity="1"
              shadow-softness="0.8"
              exposure="1.05"
              environment-image="neutral"
              camera-orbit="35deg 75deg auto"
              field-of-view="30deg"
              min-camera-orbit="auto auto 50%"
              max-camera-orbit="auto auto 300%"
              loading="eager"
              reveal="auto"
              autoplay
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                backgroundColor: "transparent",
              }}
            />

            {/* CARREGAMENTO */}

            {!modelLoaded && !modelError && (
              <div className="gemini-loading">
                <div className="gemini-spinner" />
                <span>
                  Carregando Gemini-local.glb...
                </span>
              </div>
            )}

            {/* ERRO */}

            {modelError && (
              <div className="gemini-loading">
                <strong>Erro no modelo 3D</strong>
                <p>{modelError}</p>
              </div>
            )}

            {/* IDENTIFICAÇÃO */}

            <div className="gemini-model-badge">
              <span className="gemini-dot" />
              GEMINI 3D
            </div>

            {/* TELA CHEIA */}

            <button
              type="button"
              className="gemini-fullscreen"
              onClick={toggleFullscreen}
              aria-label={
                fullscreen
                  ? "Sair da tela cheia"
                  : "Expandir modelo 3D"
              }
              title={
                fullscreen
                  ? "Sair da tela cheia"
                  : "Expandir modelo 3D"
              }
            >
              {fullscreen ? "✕" : "⛶"}
            </button>
          </div>

          <div className="gemini-footer">
            <span>
              Explore todos os detalhes da Gemini
            </span>
            <span>
              Arraste para girar · Scroll para zoom
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gemini-experience {
          width: 100%;
          min-height: 760px;
          padding: 90px 5%;
          background: #f8f7f3;
          color: #24211c;
        }

        .gemini-container {
          max-width: 1450px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          align-items: center;
          gap: 60px;
        }

        .gemini-content {
          position: relative;
          z-index: 2;
        }

        .gemini-eyebrow {
          display: inline-block;
          margin-bottom: 22px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          color: #a48752;
        }

        .gemini-content h1 {
          margin: 0 0 25px;
          font-size: clamp(50px, 5vw, 80px);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -3px;
        }

        .gemini-content h1 span {
          display: block;
          color: #a08251;
          font-weight: 300;
        }

        .gemini-description {
          max-width: 470px;
          margin-bottom: 40px;
          color: #706b63;
          font-size: 16px;
          line-height: 1.85;
        }

        .gemini-benefits {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 42px;
        }

        .gemini-benefit {
          display: flex;
          align-items: center;
          gap: 17px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e7e1d7;
        }

        .gemini-benefit-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 52px;
          height: 52px;
          border: 1px solid #ded3bf;
          border-radius: 13px;
          background: #fffdf8;
          color: #947342;
          font-size: 17px;
          font-weight: 800;
        }

        .gemini-benefit-text h3 {
          margin: 0 0 6px;
          font-size: 17px;
          font-weight: 700;
        }

        .gemini-benefit-text p {
          margin: 0;
          color: #817b71;
          font-size: 13px;
          line-height: 1.6;
        }

        .gemini-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          padding: 19px 28px;
          background: #f2cb29;
          border-radius: 5px;
          color: #181818;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          transition: background 0.2s;
        }

        .gemini-button:hover {
          background: #ffdc4e;
        }

        .gemini-visual {
          min-width: 0;
        }

        .gemini-scene {
          position: relative;
          height: 640px;
          overflow: hidden;
          border-radius: 22px;
          background: #e8e3da;
          isolation: isolate;
        }

        .gemini-background {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-position: center;
          background-size: cover;
          opacity: 0.85;
        }

        .gemini-scene :global(model-viewer) {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          --poster-color: transparent;
        }

        .gemini-loading {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 15px;
          padding: 25px;
          text-align: center;
          background: rgba(248, 247, 243, 0.88);
          color: #5d554a;
          font-size: 14px;
        }

        .gemini-loading p {
          max-width: 320px;
          line-height: 1.6;
        }

        .gemini-spinner {
          width: 35px;
          height: 35px;
          border: 3px solid #d7cbb7;
          border-top-color: #9b7b47;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .gemini-model-badge {
          position: absolute;
          z-index: 4;
          top: 22px;
          left: 22px;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 11px 15px;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.9);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .gemini-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #69ad6e;
        }

        .gemini-fullscreen {
          position: absolute;
          z-index: 4;
          right: 20px;
          bottom: 20px;
          width: 46px;
          height: 46px;
          border: 0;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.93);
          color: #26231e;
          font-size: 25px;
          cursor: pointer;
        }

        .gemini-scene:fullscreen {
          width: 100vw;
          height: 100vh;
          border-radius: 0;
        }

        .gemini-footer {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          padding: 17px 4px;
          color: #948d83;
          font-size: 12px;
        }

        @media (max-width: 1024px) {
          .gemini-container {
            grid-template-columns: 1fr;
            gap: 45px;
          }

          .gemini-scene {
            height: 550px;
          }
        }

        @media (max-width: 600px) {
          .gemini-experience {
            padding: 45px 18px;
          }

          .gemini-content h1 {
            font-size: 52px;
          }

          .gemini-scene {
            height: 430px;
            border-radius: 16px;
          }

          .gemini-footer {
            flex-direction: column;
            gap: 5px;
          }
        }
      `}</style>
    </section>
  );
}
