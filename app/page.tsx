import Image from 'next/image';
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
  // Na home usamos a foto ambientada (Fendi); nos cards/coleção fica o FUNDO
  // BRANCO (featuredImage). Fallback: featuredImage se a Fendi não existir.
  const destaqueImagem =
    destaque?.images?.find((img) => /fendi/i.test(img.altText ?? '')) ??
    destaque?.featuredImage ??
    null;
  // Seção "A Essência do Alto Padrão" usa o Chesterfield (fundo branco).
  const chesterfield = await getProduct('sofa-chesterfield');

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

      {/* Selos de confiança — card flutuante montado na emenda hero/próxima seção */}
      <div className="relative z-20 -mt-14 md:-mt-20">
        <TrustBadges />
      </div>

      {/* Produto em destaque — imagem com respiro (cartão arredondado, não full-bleed) */}
      {destaque && destaqueImagem && (
        <Reveal>
          <section className="mx-auto max-w-350 px-6 py-10 lg:px-10 lg:py-16">
            <Reveal className="mb-14 flex items-end justify-between">
              <div>
                <p className="kicker">EM DESTAQUE</p>
                <h2 className="mt-4 text-4xl md:text-5xl">{destaque.title}</h2>
                <p className="mt-2 text-lg md:text-xl text-carvao-soft">
  O fim do dia começa aqui.
</p>
              </div>
            </Reveal>
            <Link
  href={`/produtos/${destaque.handle}`}
  className="group block"
  aria-label={`Ver detalhes de ${destaque.title}`}
>
  <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg bg-cream-2 md:aspect-16/7 cursor-pointer">
    <Image
      src={destaqueImagem.url}
      alt={destaqueImagem.altText ?? destaque.title}
      fill
      priority
      sizes="(max-width: 1400px) 100vw, 1400px"
      className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent" />
    <p className="absolute bottom-5 left-6 right-6 text-white/70 text-base md:text-lg font-medium leading-relaxed">
  Reclinação elétrica, couro legítimo e o conforto que só a EuroDesign entrega.
</p>
  </div>
</Link>
          </section>
        </Reveal>
      )}

      <CollectionShowcase products={products} />

      <LeatherEditorial product={products[1]} />

      {chesterfield && <PremiumEssence product={chesterfield} />}

      <ShowroomSection />

      <Newsletter />
    </>
  );
}
