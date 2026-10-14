
import Link from 'next/link';
import { getProducts, getProduct, isConfigured } from '@/lib/shopify';
import Newsletter from '@/components/Newsletter';
import Reveal from '@/components/Reveal';
import ConfigNotice from '@/components/ConfigNotice';
import CollectionShowcase from '@/components/CollectionShowcase';
import LeatherEditorial from '@/components/LeatherEditorial';
import PremiumEssence from '@/components/PremiumEssence';
import ShowroomSection from '@/components/ShowroomSection';
import TrustBadges from '@/components/TrustBadges';
import GeminiExperience from '@/components/segurança';

export const revalidate = 60;

// Quantidade máxima de produtos carregados da Shopify.
const MAX_PRODUCTS = 100;

export default async function HomePage() {
  if (!isConfigured()) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24">
        <ConfigNotice />
      </div>
    );
  }

  // Busca até 100 produtos disponíveis na Shopify.
  const products = await getProducts({
    first: MAX_PRODUCTS,
  });

  // Mantém a Gemini como destaque principal.
  const destaque =
    (await getProduct('poltrona-gemini-reclinavel-eletrica-fixa')) ??
    products[0];

  const destaqueImagem =
    destaque?.images?.find((img) =>
      /fendi/i.test(img.altText ?? '')
    ) ??
    destaque?.featuredImage ??
    null;

  // Mantém o Chesterfield na seção editorial.
  const chesterfield = await getProduct('sofa-chesterfield');

  return (
    <>
      {/* HERO COM VÍDEO DE FUNDO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source
              src="/video/video-hero-ecommerce.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <section className="mx-auto max-w-350 px-6 pb-32 pt-32 lg:px-10 lg:pb-48 lg:pt-56 flex flex-col items-start justify-center min-h-[80vh]">
          <Reveal>
            <p className="kicker-marca backdrop-blur-xl bg-carvao/30 rounded-lg px-3 py-1">
              Estofados de couro legítimo · desde 1967
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-cream my-9 text-[clamp(2.75rem,6vw,5rem)] -leading-4 text-shadow-lg/20">
              O conforto que se{' '}
              <span className="text-marca">sente.</span>
              <br />
              O design que{' '}
              <span className="text-marca">permanece.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
              <Link
                href="/produtos"
                className="bg-marca/80 backdrop-blur-lg border border-marca px-9 py-4 text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-carvao rounded-lg hover:transition-colors hover:bg-marca hover:text-carvao-soft hover:duration-300 hover:ease-in-out"
              >
                Explorar o showroom
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

      {/* SELOS DE CONFIANÇA */}
      <div className="relative z-20 -mt-14 md:-mt-20">
        <TrustBadges />
      </div>

      {/* EXPERIÊNCIA 3D DA GEMINI */}
      {destaque && destaqueImagem && (
        <Reveal>
          <GeminiExperience
            title={destaque.title}
            handle={destaque.handle}
            imageUrl={destaqueImagem.url}
            imageAlt={
              destaqueImagem.altText ?? destaque.title
            }
          />
        </Reveal>
      )}

      {/* CATÁLOGO INTERATIVO
          Agora recebe até 100 produtos da Shopify.
          Mantém o layout aprovado.
      */}
      <CollectionShowcase products={products} />

      {/* EDITORIAL DE COURO */}
      <LeatherEditorial product={products[1]} />

      {/* DESTAQUE CHESTERFIELD */}
      {chesterfield && (
        <PremiumEssence product={chesterfield} />
      )}

      {/* SHOWROOM */}
      <ShowroomSection />

      {/* NEWSLETTER */}
      <Newsletter />
    </>
  );
}
