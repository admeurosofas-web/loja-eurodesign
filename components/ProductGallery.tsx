'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper/types';
import type { Image as ProductImage } from '@/lib/shopify/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

/** Galeria: slider com barra de progresso + zoom em modal. */
export default function ProductGallery({
  images,
  title,
}: {
  images: ProductImage[];
  title: string;
}) {
  const [zoomOpen, setZoomOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    document.body.style.overflow = zoomOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [zoomOpen]);

  if (images.length === 0) {
    return (
      <div className="grid aspect-[4/5] w-full place-items-center rounded-lg bg-cream-2 text-xs uppercase tracking-[0.2em] text-carvao-soft/50">
        Foto em breve
      </div>
    );
  }

  const openZoom = (i: number) => {
    setStartIndex(i);
    setZoomOpen(true);
  };

  return (
    <div className="flex w-full min-w-0 max-w-full flex-col gap-3 overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ type: 'progressbar' }}
        slidesPerView={1}
        spaceBetween={0}
        onSlideChange={(s) => setCurrent(s.activeIndex)}
        className="gallery-main w-full max-w-full rounded-lg"
      >
        {images.map((img, i) => (
          <SwiperSlide key={img.url}>
            <button
              type="button"
              onClick={() => openZoom(i)}
              aria-label={`Ampliar imagem ${i + 1} de ${images.length}`}
              className="relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-lg bg-cream-2"
            >
              <Image
                src={img.url}
                alt={img.altText ?? title}
                fill
                priority={i === 0}
                loading={i === 0 ? 'eager' : 'lazy'}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-carvao-soft">
        <span>
          {String(current + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
        <button
          type="button"
          onClick={() => openZoom(current)}
          className="flex items-center gap-1 hover:text-ouro"
          aria-label="Ampliar imagem"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
          </svg>
          Ampliar
        </button>
      </div>

      {zoomOpen && (
        <ZoomModal
          images={images}
          title={title}
          startIndex={startIndex}
          onClose={() => setZoomOpen(false)}
        />
      )}
    </div>
  );
}

function ZoomModal({
  images,
  title,
  startIndex,
  onClose,
}: {
  images: ProductImage[];
  title: string;
  startIndex: number;
  onClose: () => void;
}) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-carvao"
      role="dialog"
      aria-label={`Galeria ampliada — ${title}`}
    >
      <header className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-cream lg:px-8">
        <p className="font-serif text-lg">{title}</p>
        <div className="flex items-center gap-6">
          <span className="text-[11px] uppercase tracking-[0.2em] text-cream/70">
            {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar galeria"
            className="flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] hover:text-marca"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
            Fechar
          </button>
        </div>
      </header>

      <div className="relative flex-1 overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Zoom, Keyboard]}
          navigation={{
            nextEl: '.zoom-next',
            prevEl: '.zoom-prev',
          }}
          pagination={{ type: 'progressbar', el: '.zoom-progress' }}
          zoom={{ maxRatio: 3 }}
          keyboard={{ enabled: true }}
          initialSlide={startIndex}
          slidesPerView={1}
          spaceBetween={0}
          onSwiper={setSwiper}
          onSlideChange={(s) => setIndex(s.activeIndex)}
          className="zoom-swiper h-full w-full"
        >
          {images.map((img, i) => (
            <SwiperSlide key={img.url}>
              <div className="swiper-zoom-container h-full w-full">
                <div className="relative h-full w-full">
                  <Image
                    src={img.url}
                    alt={img.altText ?? `${title} — imagem ${i + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority={i === startIndex}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Controles custom */}
        <button
          type="button"
          className="zoom-prev absolute left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-carvao/70 text-cream backdrop-blur-sm transition-colors hover:border-marca hover:text-marca disabled:opacity-30 lg:h-14 lg:w-14"
          aria-label="Imagem anterior"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <button
          type="button"
          className="zoom-next absolute right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-carvao/70 text-cream backdrop-blur-sm transition-colors hover:border-marca hover:text-marca disabled:opacity-30 lg:h-14 lg:w-14"
          aria-label="Próxima imagem"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>

        {/* Toggle zoom */}
        <button
          type="button"
          onClick={() => swiper?.zoom.toggle()}
          className="absolute bottom-16 right-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-carvao/70 text-cream backdrop-blur-sm transition-colors hover:border-marca hover:text-marca"
          aria-label="Alternar zoom"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
          </svg>
        </button>
      </div>

      {/* Progress bar rodapé */}
      <div className="zoom-progress relative h-1 bg-white/10">
        {/* Swiper injeta a barra aqui */}
      </div>
    </div>
  );
}
