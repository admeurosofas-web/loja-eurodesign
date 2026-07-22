'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper/types';
import type { Image as ProductImage } from '@/lib/shopify/types';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

/** Galeria de produto: slider principal (swipe) + miniaturas sincronizadas. */
export default function ProductGallery({
  images,
  title,
}: {
  images: ProductImage[];
  title: string;
}) {
  const [thumbs, setThumbs] = useState<SwiperClass | null>(null);

  if (images.length === 0) {
    return (
      <div className="grid aspect-[4/5] w-full place-items-center bg-cream-2 text-xs uppercase tracking-[0.2em] text-carvao-soft/50">
        Foto em breve
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 max-w-full flex-col gap-3 overflow-hidden">
      <Swiper
        modules={[Navigation, Thumbs]}
        thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : undefined }}
        navigation
        slidesPerView={1}
        spaceBetween={0}
        className="gallery-main w-full max-w-full rounded-lg"
      >
        {images.map((img, i) => (
          <SwiperSlide key={img.url}>
            <div className="relative aspect-[4/5] w-full bg-cream-2">
              <Image
                src={img.url}
                alt={img.altText ?? title}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbs}
          modules={[FreeMode, Thumbs]}
          watchSlidesProgress
          freeMode
          slidesPerView={4}
          spaceBetween={10}
          className="gallery-thumbs w-full max-w-full"
        >
          {images.map((img) => (
            <SwiperSlide key={img.url} className="cursor-pointer">
              <div className="relative aspect-square w-full bg-cream-2">
                <Image
                  src={img.url}
                  alt=""
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
