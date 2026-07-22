import Image from 'next/image';
import Reveal from '@/components/Reveal';

interface LeatherEditorialProps {
  product: any;
}

export default function LeatherEditorial({ product }: LeatherEditorialProps) {
  return (
    <section id="couro" className="border-y border-linha bg-cream-2">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 py-24 lg:grid-cols-2 lg:px-10">
        <Reveal>
          <p className="kicker">A matéria-prima</p>
          <h2 className="mt-5 text-4xl md:text-6xl">
            Couro de verdade envelhece{' '}
            <em className="italic text-ouro">bonito</em>.
          </h2>
          <p className="mt-7 max-w-[46ch] text-carvao-soft">
            O sintético descasca com o tempo. O couro legítimo ganha caráter —
            mais macio, mais seu, ano após ano. Cada peça EuroDesign é feita
            com couro selecionado, estrutura em madeira maciça e acabamento à
            mão.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              'Couro 100% legítimo, selecionado',
              'Estrutura em madeira maciça tratada',
              'Reclinação manual ou elétrica bivolt',
              '1 ano de garantia · direto da fábrica',
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 border-b border-linha pb-3"
              >
                <span className="text-ouro">—</span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        {product?.featuredImage && (
          <Reveal delay={120}>
            <div className="relative aspect-[4/5] overflow-hidden bg-cream">
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.altText ?? product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
