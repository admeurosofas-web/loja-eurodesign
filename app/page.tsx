import Image from 'next/image';
import Link from 'next/link';
import { getProducts, getProduct, isConfigured } from '@/lib/shopify';
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
  // Produto em destaque: Poltrona Gemini (fallback para o primeiro da coleção)
  const destaque =
    (await getProduct('poltrona-gemini-reclinavel-eletrica-fixa')) ??
    products[0];

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
        <section className="mx-auto max-w-350 px-6 pb-32 pt-32 lg:px-10 lg:pb-48 lg:pt-56 flex flex-col items-start justify-center min-h-[80vh]">
          <Reveal>
            <p className="kicker-marca backdrop-blur-xl bg-carvao/30 rounded-lg px-3 py-1">
              Estofados de couro legítimo · desde 1967
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-cream my-9 text-[clamp(2.75rem,6vw,5rem)] -leading-4 text-shadow-lg/20">
              O conforto que se <span className="text-marca">sente.</span>
              <br />O design que <span className="text-marca">permanece.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
              <Link
                href="/produtos"
                className="bg-marca/80 backdrop-blur-lg border border-marca px-9 py-4 text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-carvao rounded-lg hover:transition-colors hover:bg-marca hover:text-carvao-soft hover:duration-300 hover:ease-in-out"
              >
                Explorar a coleção
              </Link>
              <a
                href="https://wa.me/5511913371140"
                target="_blank"
                rel="noopener"
                className="font-medium uppercase border-b border-cream-2 pb-1 text-[13px] tracking-wide text-cream-2 transition-colors hover:border-marca hover:text-marca"
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
          <section className="relative aspect-16/10 w-full overflow-hidden bg-cream-2 md:aspect-16/7">
            <Image
              src={destaque.featuredImage.url}
              alt={destaque.featuredImage.altText ?? destaque.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-cream lg:p-14 backdrop-blur-[1px] bg-carvao/30 rounded-tr-lg px-4 py-4">
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-cream/80">
                Em destaque
              </p>
              <h2 className="mt-3 text-2xl text-cream md:text-5xl">
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
