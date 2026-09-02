"use client";

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
  const normalizedHandle = productHandle
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const video = VIDEOS[normalizedHandle];

  // Se o produto não tiver vídeo cadastrado, não mostra absolutamente nada.
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

      <div className="overflow-hidden rounded-lg bg-black">
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}