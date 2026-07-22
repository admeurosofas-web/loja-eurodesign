import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';

interface CollectionShowcaseProps {
  products: any[];
}

export default function CollectionShowcase({ products }: CollectionShowcaseProps) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10">
      <Reveal className="mb-14 flex items-end justify-between">
        <div>
          <p className="kicker">Seleção</p>
          <h2 className="mt-4 text-4xl md:text-5xl">Modelos em destaque</h2>
        </div>
        <Link
          href="/produtos"
          className="hidden border-b border-carvao/40 pb-1 text-[13px] tracking-wide transition-colors hover:border-ouro hover:text-ouro sm:inline"
        >
          Ver tudo
        </Link>
      </Reveal>

      <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
        {products.slice(0, 8).map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 90}>
            <ProductCard product={p} priority={i < 4} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
