'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Image as ProductImage } from '@/lib/shopify/types';

type Props = {
  initial: ProductImage;
  title: string;
};

export default function VariantHero({ initial, title }: Props) {
  const [img, setImg] = useState<ProductImage>(initial);
  const [colorName, setColorName] = useState<string | null>(null);

  useEffect(() => {
    function onChange(e: Event) {
      const detail = (e as CustomEvent).detail as {
        image: ProductImage | null;
        color: string | null;
      };
      if (detail?.image) setImg(detail.image);
      if (detail?.color) setColorName(detail.color);
    }
    window.addEventListener('product:variant-changed', onChange);
    return () => window.removeEventListener('product:variant-changed', onChange);
  }, []);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-cream-2">
      <Image
        key={img.url}
        src={img.url}
        alt={img.altText ?? `${title} — ${colorName ?? 'imagem principal'}`}
        fill
        sizes="(min-width: 1024px) 55vw, 100vw"
        className="object-cover transition-opacity duration-300"
        priority
      />
      {colorName && (
        <span className="absolute bottom-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-carvao backdrop-blur">
          {colorName}
        </span>
      )}
    </div>
  );
}
