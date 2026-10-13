
"use client";

import { useEffect, useRef, useState } from "react";
import { createElement } from "react";

const MODEL_URL = "/models/Gemini-local.glb?v=20261008";
const ROOM_URL = "/images/gemini-sala.png";

type GeminiModelViewer = HTMLElement & {
  loaded?: boolean;
  availableAnimations?: string[];
  animationName?: string;
  play?: () => void;
};

const beneficios = [
  {
    titulo: "Couro 100% legítimo",
    descricao:
      "Qualidade, sofisticação e acabamento em couro natural.",
  },
  {
    titulo: "Totalmente elétrico",
    descricao:
      "Reclinação elétrica para proporcionar máximo conforto.",
  },
  {
    titulo: "USB grátis",
    descricao:
      "Entrada USB integrada para mais praticidade.",
  },
];

export default function GeminiExperience() {
  const viewerRef = useRef<GeminiModelViewer | null>(null);

  const [carregado, setCarregado] = useState(false);
  const [erro, setErro] = useState(false);
  const [viewerPronto, setViewerPronto] = useState(false);

  useEffect(() => {
    let ativo = true;

    const iniciar = async () => {
      if (!customElements.get("model-viewer")) {
        const id = "gemini-model-viewer-script";

        if (!document.getElementById(id)) {
          const script = document.createElement("script");
          script.id = id;
          script.type = "module";
          script.src =
            "https://ajax.googleapis.com/ajax/libs/model-viewer/4.1.0/model-viewer.min.js";

          document.head.appendChild(script);
        }

        await customElements.whenDefined("model-viewer");
      }

      if (ativo) {
        setViewerPronto(true);
      }
    };

    iniciar().catch(() => {
      if (ativo) setErro(true);
    });

    return () => {
      ativo = false;
    };
  }, []);

  useEffect(() => {
    if (!viewerPronto) return;

    const viewer = viewerRef.current;
    if (!viewer) return;

    const aoCarregar = () => {
      setCarregado(true);
      setErro(false);

      if (
        viewer.availableAnimations &&
        viewer.availableAnimations.length > 0
      ) {
        viewer.animationName =
          viewer.availableAnimations[0];

        viewer.play?.();
      }
    };

    const aoErro = () => {
      setCarregado(false);
      setErro(true);
    };

    viewer.addEventListener("load", aoCarregar);
    viewer.addEventListener("error", aoErro);

    if (viewer.loaded) {
      aoCarregar();
    }

    return () => {
      viewer.removeEventListener("load", aoCarregar);
      viewer.removeEventListener("error", aoErro);
    };
  }, [viewerPronto]);

  const abrirTelaCheia = async () => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await viewer.requestFullscreen();
      }
    } catch (error) {
      console.error("Erro na tela cheia:", error);
    }
  };

  // createElement permite utilizar model-viewer sem
  // erros de JSX.IntrinsicElements no TypeScript.
  const visualizador3D = createElement("model-viewer", {
    ref: viewerRef,
    src: MODEL_URL,
    alt: "Poltrona Gemini em couro legítimo",
    "camera-controls": true,
    "touch-action": "pan-y",
    "interaction-prompt": "none",
    "shadow-intensity": "1",
    "shadow-softness": "0.8",
    exposure: "1.05",
    "environment-image": "neutral",
    "camera-orbit": "35deg 75deg auto",
    "field-of-view": "30deg",
    loading: "eager",
    reveal: "auto",
    autoplay: true,
    style: {
      display: "block",
      width: "100%",
      height: "100%",
      backgroundColor: "transparent",
    },
  });

  return (
    <section className="gemini-experience">
      <div className="gemini-container">
        <div className="gemini-content">
          <span className="gemini-eyebrow">
            EURODESIGN · EXPERIÊNCIA 3D
          </span>

          <h1 className="gemini-title">
            Poltrona <span>Gemini</span>
          </h1>

          <p className="gemini-description">
            Design sofisticado, conforto excepcional e
            tecnologia para transformar seus momentos
            de descanso. Conheça a poltrona Gemini
            em uma experiência interativa.
          </p>

          <div className="gemini-beneficios">
            {beneficios.map((beneficio) => (
              <div
                className="gemini-beneficio"
                key={beneficio.titulo}
              >
                <span className="gemini-check">✓</span>

                <div>
                  <h3>{beneficio.titulo}</h3>
                  <p>{beneficio.descricao}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            className="gemini-button"
            href="https://wa.me/5511913371140?text=Ol%C3%A1%21%20Gostaria%20de%20saber%20mais%20sobre%20a%20Poltrona%20Gemini."
            target="_blank"
            rel="noopener noreferrer"
          >
            FALE COM UM VENDEDOR
            <span>↗</span>
          </a>
        </div>

        <div className="gemini-visual">
          <div className="gemini-scene">
            <div
              className="gemini-room"
              style={{
                backgroundImage: `url("${ROOM_URL}")`,
              }}
            />

            <div className="gemini-viewer">
              {visualizador3D}
            </div>

            {!carregado && !erro && (
              <div className="gemini-loading">
                <span className="gemini-spinner" />
                Carregando Gemini 3D...
              </div>
            )}

            {erro && (
              <div className="gemini-loading">
                Não foi possível carregar Gemini-local.glb.
                Verifique a pasta public/models.
              </div>
            )}

            <div className="gemini-tag">
              <span className="gemini-dot" />
              VISUALIZAÇÃO 3D
            </div>

            <button
              type="button"
              className="gemini-expand"
              onClick={abrirTelaCheia}
              aria-label="Expandir visualização 3D"
              title="Expandir visualização 3D"
            >
              ⛶
            </button>
          </div>

          <div className="gemini-footer">
            <span>Arraste para explorar a poltrona</span>
            <span>Use o scroll para aproximar</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gemini-experience {
          width: 100%;
          min-height: 760px;
          padding: 90px 5%;
          background: #f7f5f0;
          color: #1d1c19;
        }

        .gemini-container {
          max-width: 1440px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 55px;
          align-items: center;
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
          color: #9a7a45;
        }

        .gemini-title {
          margin: 0 0 25px;
          font-size: clamp(46px, 5vw, 76px);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -3px;
        }

        .gemini-title span {
          display: block;
          font-weight: 300;
          color: #9b7c50;
        }

        .gemini-description {
          max-width: 480px;
          margin: 0 0 38px;
          color: #66635d;
          font-size: 16px;
          line-height: 1.85;
        }

        .gemini-beneficios {
          display: flex;
          flex-direction: column;
          gap: 23px;
          margin-bottom: 42px;
        }

        .gemini-beneficio {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .gemini-check {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #d9d0bf;
          border-radius: 50%;
          color: #927347;
          font-size: 17px;
          font-weight: 700;
        }

        .gemini-beneficio h3 {
          margin: 0 0 5px;
          font-size: 16px;
          font-weight: 700;
        }

        .gemini-beneficio p {
          margin: 0;
          color: #77736d;
          font-size: 13px;
          line-height: 1.5;
        }

        .gemini-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 25px;
          padding: 19px 28px;
          background: #eac327;
          color: #151515;
          border-radius: 5px;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.8px;
          text-decoration: none;
          transition: background 0.2s;
        }

        .gemini-button:hover {
          background: #f5d646;
        }

        .gemini-visual {
          min-width: 0;
        }

        .gemini-scene {
          position: relative;
          width: 100%;
          height: 620px;
          overflow: hidden;
          border-radius: 22px;
          background: #e8e3da;
          isolation: isolate;
        }

        .gemini-room {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0.85;
          z-index: 0;
        }

        .gemini-viewer {
          position: relative;
          width: 100%;
          height: 100%;
          z-index: 2;
        }

        .gemini-loading {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 14px;
          padding: 24px;
          text-align: center;
          background: rgba(245, 242, 235, 0.85);
          color: #5b5143;
          font-size: 14px;
        }

        .gemini-spinner {
          width: 34px;
          height: 34px;
          border: 3px solid #d6c9b4;
          border-top-color: #927347;
          border-radius: 50%;
          animation: gemini-spin 0.8s linear infinite;
        }

        @keyframes gemini-spin {
          to {
            transform: rotate(360deg);
          }
        }

        .gemini-tag {
          position: absolute;
          top: 22px;
          left: 22px;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 11px 14px;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.88);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.1px;
          color: #504738;
        }

        .gemini-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #62a76a;
        }

        .gemini-expand {
          position: absolute;
          right: 20px;
          bottom: 20px;
          z-index: 4;
          width: 45px;
          height: 45px;
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.9);
          color: #27231e;
          cursor: pointer;
          font-size: 24px;
        }

        .gemini-footer {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          padding: 16px 5px;
          color: #928d85;
          font-size: 12px;
        }

        @media (max-width: 1024px) {
          .gemini-container {
            grid-template-columns: 1fr;
            gap: 45px;
          }

          .gemini-experience {
            padding: 70px 5%;
          }

          .gemini-scene {
            height: 560px;
          }
        }

        @media (max-width: 640px) {
          .gemini-experience {
            padding: 45px 18px;
          }

          .gemini-title {
            font-size: 48px;
          }

          .gemini-description {
            font-size: 14px;
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
