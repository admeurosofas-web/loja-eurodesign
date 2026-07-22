import Image from 'next/image';
import Link from 'next/link';
import { formatBRL } from '@/lib/shopify';
import { getParcelamento } from '@/lib/parcelamento';
import type { Product } from '@/lib/shopify/types';

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const price = product.priceRange.minVariantPrice;
  const isFree = parseFloat(price.amount) === 0;
  const parc = getParcelamento(
    product.handle,
    price.amount,
    price.currencyCode,
  );

  return (
    <Link href={`/produtos/${product.handle}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-2 rounded-lg">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="grid h-full place-items-center text-xs uppercase tracking-[0.2em] text-carvao-soft/50">
            Foto em breve
          </div>
        )}
        {!product.availableForSale && (
          <span className="absolute left-4 top-4 bg-cream/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-carvao-soft">
            Esgotado
          </span>
        )}
      </div>

      <div className="pt-5">
        <h3 className="font-serif text-lg leading-snug text-carvao break-words transition-colors group-hover:text-ouro sm:text-xl">
          {product.title}
        </h3>
        <div className="mt-1.5 flex items-center gap-3 text-sm text-carvao-soft">
          {isFree ? (
            <span>Sob consulta</span>
          ) : parc ? (
            <span>{parc.label}</span>
          ) : (
            <span>{formatBRL(price.amount, price.currencyCode)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
