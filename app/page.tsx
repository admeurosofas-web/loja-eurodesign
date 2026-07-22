import Image from 'next/image';
import Link from 'next/link';
import { getProducts, isConfigured } from '@/lib/shopify';
import Newsletter from '@/components/Newsletter';
import Reveal from '@/components/Reveal';
import ConfigNotice from '@/components/ConfigNotice';
import CollectionShowcase from '@/components/CollectionShowcase';
import LeatherEditorial from '@/components/LeatherEditorial';
import ShowroomSection from '@/components/ShowroomSection';

export const revalidate = 60;

export default async function HomePage() {
  if (!isConfigured()) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24">
        <ConfigNotice />
      </div>
    );
  }

  const products = await getProducts({ first: 8 });
  const destaque = products[0];

  return (
    <>
      {/* HERO com Vídeo Background */}
      <div className="relative overflow-hidden">
        {/* Vídeo Background (apenas na seção hero) */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/video/video-hero-ecommerce.mp4" type="video/mp4" />
          </video>
        </div>
        {/* HERO — tipográfico editorial */}
        <section className="mx-auto max-w-[1400px] px-6 pb-32 pt-32 lg:px-10 lg:pb-48 lg:pt-48 flex flex-col items-start justify-center min-h-[80vh]">
          <Reveal>
            <p className="kicker">Estofados de couro legítimo · desde 1967</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-cream mt-8 max-w-[15ch] text-[clamp(2.75rem,8vw,7rem)] leading-[0.98]">
              O conforto que se <em className="italic text-ouro">sente</em>. O
              design que <em className="italic text-ouro">permanece</em>.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
              <Link
                href="/produtos"
                className="bg-marca px-9 py-4 text-center text-[12px] font-medium uppercase tracking-[0.2em] text-carvao rounded-lg hover:transition-colors hover:bg-carvao hover:text-cream hover:duration-300 hover:ease-in-out"
              >
                Explorar a coleção
              </Link>
              <a
                href="https://wa.me/5511913371140"
                target="_blank"
                rel="noopener"
                className="font-medium border-b border-carvao pb-1 text-[13px] tracking-wide text-carvao transition-colors hover:border-ouro hover:text-ouro"
              >
                Falar com um especialista
              </a>
            </div>
          </Reveal>
        </section>
      </div>

      {/* Imagem full-bleed do produto em destaque */}
      {destaque?.featuredImage && (
        <Reveal>
          <section className="relative aspect-[16/10] w-full overflow-hidden bg-cream-2 md:aspect-[16/7]">
            <Image
              src={destaque.featuredImage.url}
              alt={destaque.featuredImage.altText ?? destaque.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-cream lg:p-14">
              <p className="text-[11px] uppercase tracking-[0.3em] text-cream/80">
                Em destaque
              </p>
              <h2 className="mt-3 text-4xl text-cream md:text-5xl">
                {destaque.title}
              </h2>
              <Link
                href={`/produtos/${destaque.handle}`}
                className="mt-5 inline-block border-b border-cream/60 pb-1 text-sm tracking-wide transition-colors hover:border-ouro-l hover:text-ouro-l"
              >
                Ver detalhes
              </Link>
            </div>
          </section>
        </Reveal>
      )}

      <CollectionShowcase products={products} />

      <LeatherEditorial product={products[1]} />

      <ShowroomSection />

      <Newsletter />
    </>
  );
}
