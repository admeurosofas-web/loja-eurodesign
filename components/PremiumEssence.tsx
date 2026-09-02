import Image from 'next/image';
import Reveal from '@/components/Reveal';

interface PremiumEssenceProps {
  product: any;
}

type Feature = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const FEATURES: Feature[] = [
  {
    title: 'Couro Legítimo Premium',
    desc: 'Seleção rigorosa do melhor couro, tratado para oferecer toque macio, resistência e um envelhecimento mais elegante.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 3h12l3 6-9 12L3 9z" />
        <path d="M3 9h18" />
        <path d="M9 3 7 9l5 12 5-12-2-6" />
      </svg>
    ),
  },
  {
    title: 'Fabricação Própria e sob medida',
    desc: 'Mestres artesãos e tecnologia de ponta garantem precisão e controle de qualidade irrestrito em todas as etapas.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 15 15 4l5 5L9 20z" />
        <path d="M8 8l2 2M11 5l2 2M5 11l2 2M14 8l2 2" />
      </svg>
    ),
  },
  {
    title: 'Estrutura Nobre e Reforçada',
    desc: 'Uso de madeiras de reflorestamento e estruturas metálicas que asseguram máxima estabilidade e longevidade do seu móvel.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18" />
        <path d="M5 21V8l7-4 7 4v13" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: 'Garantia Real de 1 Ano',
    desc: 'Sua tranquilidade é nossa prioridade. Oferecemos garantia total de 1 ano sobre a estrutura e os materiais.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

const WHATSAPP =
  'https://wa.me/5511913371140?text=' +
  encodeURIComponent('Olá! Gostaria de solicitar uma proposta.');

export default function PremiumEssence({ product }: PremiumEssenceProps) {
  return (
    <section className="border-t border-linha bg-cream">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
        {/* Imagem — Chesterfield fundo branco */}
        {product?.featuredImage && (
          <Reveal>
            <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-cream-2 lg:aspect-4/5">
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.altText ?? product.title}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-4 lg:p-8"
              />
            </div>
          </Reveal>
        )}

        {/* Conteúdo */}
        <Reveal delay={120}>
          <p className="kicker">Por que EuroDesign</p>
          <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl">
            A Essência do Alto Padrão em Cada{' '}
            <em className="italic text-ouro">Detalhe</em>.
          </h2>
          <p className="mt-6 max-w-[52ch] text-carvao-soft">
            A EuroDesign trabalha apenas com a matéria-prima mais nobre,
            combinada com a precisão da nossa fabricação própria.
          </p>

          <ul className="mt-10 space-y-7">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-ouro/10 text-ouro">
                  <span className="h-6 w-6">{f.icon}</span>
                </span>
                <div>
                  <p className="font-medium text-carvao">{f.title}</p>
                  <p className="mt-1 max-w-[46ch] text-sm text-carvao-soft">
                    {f.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener"
            className="mt-10 inline-block rounded-lg bg-carvao px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-ouro"
          >
            Solicitar proposta
          </a>
        </Reveal>
      </div>
    </section>
  );
}
