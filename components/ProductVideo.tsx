
"use client";

import { useState } from "react";

type ProductVideoProps = {
  productHandle: string;
  title?: string;
};

const VIDEOS: Record<string, string> = {
  gemini: "/videos/gemini.mp4",
  chesterfield: "/videos/chesterfield.mp4",
  tokyo: "/videos/tokyo.mp4",
  turim: "/videos/turim.mp4",
  bellatrix: "/videos/nice.mp4",
  elegance: "/videos/turim.mp4",
};

export default function ProductVideo({
  productHandle,
  title = "Veja o produto em detalhes",
}: ProductVideoProps) {
  const [playing, setPlaying] = useState(false);

  const normalizedHandle = productHandle
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const video = VIDEOS[normalizedHandle];

  // Não renderiza a seção quando não existe vídeo.
  if (!video) {
    return null;
  }

  return (
    <section className="mt-10">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.2em] text-[#9a7b2f]">
          Conheça o produto
        </p>

        <h2 className="mt-2 text-2xl font-medium">
          {title}
        </h2>
      </div>

      <div className="relative overflow-hidden rounded-lg bg-black">
        {!playing ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Reproduzir vídeo: ${title}`}
            className="group relative flex aspect-video w-full items-center justify-center bg-gradient-to-br from-[#24201b] via-[#151515] to-black text-white"
          >
            <div className="flex flex-col items-center gap-4">
              <span className="flex h-20 w-20 items-center justify-center rounded-full border border-[#9a7b2f] bg-black/50 transition-transform duration-300 group-hover:scale-110">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M8 5V19L19 12L8 5Z"
                    fill="#c6a65b"
                  />
                </svg>
              </span>

              <span className="text-sm font-medium tracking-wide text-white/90">
                Assistir ao vídeo
              </span>
            </div>
          </button>
        ) : (
          <video
            key={video}
            src={video}
            autoPlay
            controls
            playsInline
            preload="metadata"
            className="h-auto w-full"
          >
            Seu navegador não suporta reprodução de vídeo.
          </video>
        )}
      </div>
    </section>
  );
}
