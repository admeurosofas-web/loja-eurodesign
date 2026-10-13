import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Logo from '@/components/Logo';

export const metadata: Metadata = {
  title: 'Sobre a EuroDesign',
  description:
    'Conheça a história da EuroDesign, fabricante de estofados fundada em São Paulo em 1966, unindo design, conforto e fabricação artesanal.',
};

const PROCESSO = [
  {
    numero: '01',
    titulo: 'Seleção',
    texto:
      'Materiais selecionados e uma ampla variedade de acabamentos para cada projeto.',
  },
  {
    numero: '02',
    titulo: 'Corte',
    texto:
      'O couro é preparado e cortado com precisão para compor cada peça.',
  },
  {
    numero: '03',
    titulo: 'Costura',
    texto:
      'Costuras e detalhes são trabalhados com atenção ao acabamento.',
  },
  {
    numero: '04',
    titulo: 'Estofamento',
    texto:
      'Almofadas, enchimentos, botões e componentes são preparados cuidadosamente.',
  },
  {
    numero: '05',
    titulo: 'Acabamento',
    texto:
      'A etapa final reúne conforto, qualidade e o cuidado artesanal da EuroDesign.',
  },
];

const PAISES = [
  'Brasil',
  'Suécia',
  'Dinamarca',
  'Noruega',
  'França',
  'Estados Unidos',
];

export default function SobrePage() {
  return (
    <main className="overflow-hidden bg-cream text-carvao">

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative min-h-[78vh] border-b border-linha">

        {/* Número decorativo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-0.04em] top-16 hidden select-none font-serif text-[20rem] leading-none text-carvao/[0.035] lg:block"
        >
          66
        </div>

        <div className="relative mx-auto flex min-h-[78vh] max-w-[1400px] items-end px-6 pb-20 pt-36 lg:px-10 lg:pb-24">
          <div className="grid w-full gap-12 lg:grid-cols-[1.55fr_0.65fr] lg:items-end">

            <Reveal>
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-12 bg-ouro" />

                  <p className="text-[11px] uppercase tracking-[0.28em] text-carvao-soft">
                    São Paulo · Brasil · Desde 1966
                  </p>
                </div>

                <h1 className="mt-8 max-w-5xl font-serif text-[clamp(4rem,9vw,9rem)] leading-[0.82] tracking-[-0.045em]">
                  Sobre a
                  <br />

                  <span className="italic text-ouro">
                    EuroDesign.
                  </span>
                </h1>
              </div>
            </Reveal>

            <Reveal>
              <div className="border-l border-linha pl-7">

                <p className="max-w-sm text-lg leading-8 text-carvao-soft">
                  Uma história construída entre design europeu, fabricação
                  brasileira e cuidado artesanal.
                </p>

                <div className="mt-10 flex items-end gap-4">

                  <span className="font-serif text-6xl leading-none">
                    1966
                  </span>

                  <span className="pb-1 text-[10px] uppercase leading-5 tracking-[0.2em] text-carvao-soft">
                    início de
                    <br />
                    uma história
                  </span>

                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* =========================================================
          HISTÓRIA
      ========================================================== */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-36">

        <div className="grid gap-16 lg:grid-cols-[0.55fr_1.45fr] lg:gap-24">

          <Reveal>
            <div className="lg:sticky lg:top-32 lg:self-start">

              <p className="text-[11px] uppercase tracking-[0.25em] text-ouro">
                01 / Nossa história
              </p>

              <div className="mt-6 h-px w-16 bg-carvao" />

            </div>
          </Reveal>

          <Reveal>
            <div>

              <h2 className="max-w-4xl font-serif text-4xl leading-[1.08] tracking-[-0.025em] md:text-6xl lg:text-7xl">
                Uma história de sucesso
                <span className="italic text-ouro">
                  {' '}no Brasil.
                </span>
              </h2>

              <div className="mt-14 grid gap-8 border-t border-linha pt-10 md:grid-cols-2">

                <p className="text-base leading-8 text-carvao-soft md:text-lg">
                  A EuroDesign foi estabelecida em São Paulo, Brasil, em
                  <strong className="font-medium text-carvao">
                    {' '}1966
                  </strong>
                  , trazendo como referência o melhor do design europeu.
                  Ao longo de sua história, especializou-se na fabricação
                  e venda de sofás, poltronas, cadeiras, mesas de café,
                  sofás de canto, salas de jantar e outros móveis.
                </p>

                <p className="text-base leading-8 text-carvao-soft md:text-lg">
                  Trabalhamos com couro de alta qualidade e uma variedade
                  de acabamentos, combinando matéria-prima selecionada,
                  conforto, precisão e atenção aos detalhes em cada etapa
                  da fabricação.
                </p>

              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* =========================================================
          1966 — FAIXA EDITORIAL
      ========================================================== */}
      <section className="relative overflow-hidden bg-carvao text-cream">

        <div
          aria-hidden="true"
          className="absolute -bottom-16 -right-8 select-none font-serif text-[15rem] leading-none text-white/[0.025] md:text-[25rem]"
        >
          1966
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">

          <Reveal>
            <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">

              <div>

                <p className="text-[11px] uppercase tracking-[0.28em] text-marca">
                  Mais que mobiliário
                </p>

                <h2 className="mt-7 max-w-4xl font-serif text-5xl leading-[0.98] tracking-[-0.03em] md:text-7xl">
                  Design pensado para
                  <span className="italic text-marca">
                    {' '}atravessar gerações.
                  </span>
                </h2>

              </div>

              <div className="border-t border-white/20 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">

                <p className="text-lg leading-8 text-cream/65">
                  A EuroDesign prevê conforto com durabilidade, unindo
                  conhecimento de fabricação, trabalho manual e materiais
                  selecionados.
                </p>

              </div>

            </div>
          </Reveal>

        </div>
      </section>

      {/* =========================================================
          INTERNACIONAL
      ========================================================== */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-36">

        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28">

          <Reveal>
            <div>

              <p className="text-[11px] uppercase tracking-[0.25em] text-ouro">
                02 / Do Brasil para o mundo
              </p>

              <h2 className="mt-7 font-serif text-5xl leading-[1.02] tracking-[-0.03em] md:text-6xl">
                São Paulo.
                <br />
                Europa.
                <br />

                <span className="italic text-ouro">
                  Estados Unidos.
                </span>
              </h2>

            </div>
          </Reveal>

          <Reveal>
            <div>

              <p className="max-w-2xl text-lg leading-8 text-carvao-soft">
                Com fábrica em Itaquera, São Paulo, a EuroDesign também
                construiu sua trajetória nos mercados competitivos dos
                Estados Unidos e da Europa, exportando estofados para
                empresas como Mio Group, da Suécia; Ilva e Idemobler, da
                Dinamarca; Bo-Hus, da Noruega; e Carrefour, da França.
              </p>

              <div className="mt-12 grid grid-cols-2 border-l border-t border-linha md:grid-cols-3">

                {PAISES.map((pais, index) => (
                  <div
                    key={pais}
                    className="border-b border-r border-linha px-5 py-7"
                  >

                    <p className="text-[10px] tracking-[0.2em] text-ouro">
                      0{index + 1}
                    </p>

                    <p className="mt-3 font-serif text-xl">
                      {pais}
                    </p>

                  </div>
                ))}

              </div>

            </div>
          </Reveal>

        </div>
      </section>

      {/* =========================================================
          FABRICAÇÃO
      ========================================================== */}
      <section className="border-y border-linha bg-cream-2">

        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-36">

          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr]">

              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-ouro">
                  03 / Fabricação
                </p>
              </div>

              <div>

                <h2 className="max-w-4xl font-serif text-5xl leading-[1.02] tracking-[-0.03em] md:text-7xl">
                  A qualidade começa
                  <br />

                  <span className="italic text-ouro">
                    antes do acabamento.
                  </span>
                </h2>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-carvao-soft">
                  Corte, costura do couro, preparação das almofadas,
                  enchimentos, estofamento e botões fazem parte de um
                  processo em que o trabalho manual continua tendo papel
                  fundamental.
                </p>

              </div>

            </div>
          </Reveal>

          {/* Processo */}
          <div className="mt-20 border-t border-carvao">

            {PROCESSO.map((item) => (
              <Reveal key={item.numero}>

                <div className="group grid gap-5 border-b border-linha py-7 transition-all duration-300 hover:pl-3 md:grid-cols-[0.25fr_0.65fr_1.1fr] md:items-center">

                  <p className="text-[11px] tracking-[0.2em] text-ouro">
                    {item.numero}
                  </p>

                  <h3 className="font-serif text-3xl transition-colors group-hover:text-ouro md:text-4xl">
                    {item.titulo}
                  </h3>

                  <p className="max-w-xl text-sm leading-7 text-carvao-soft md:text-base">
                    {item.texto}
                  </p>

                </div>

              </Reveal>
            ))}

          </div>

        </div>
      </section>

      {/* =========================================================
          MATÉRIA-PRIMA
      ========================================================== */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-36">

        <Reveal>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">

            <div>

              <p className="text-[11px] uppercase tracking-[0.25em] text-ouro">
                04 / Matéria-prima
              </p>

              {/* Logo EuroDesign no lugar do BR */}
              <div
                aria-hidden="true"
                className="mt-12 flex items-center opacity-20"
              >
                <Logo height={180} />
              </div>

            </div>

            <div className="lg:pt-10">

              <h2 className="font-serif text-4xl leading-[1.08] tracking-[-0.02em] md:text-6xl">
                Produção brasileira.
                <br />

                <span className="italic text-ouro">
                  Vocação internacional.
                </span>
              </h2>

              <p className="mt-9 text-lg leading-8 text-carvao-soft">
                Como o Brasil é um importante produtor e exportador de couro
                e produtos de madeira, a disponibilidade dessas matérias-primas
                contribui para uma cadeia produtiva capaz de atender da
                fabricação à logística de exportação.
              </p>

            </div>

          </div>

        </Reveal>
      </section>

      {/* =========================================================
          FRASE FINAL
      ========================================================== */}
      <section className="border-y border-linha">

        <div className="mx-auto max-w-[1400px] px-6 py-24 text-center lg:px-10 lg:py-36">

          <Reveal>

            <p className="mx-auto max-w-5xl font-serif text-4xl leading-[1.12] tracking-[-0.025em] md:text-6xl lg:text-7xl">
              “Conforto, durabilidade e precisão

              <span className="italic text-ouro">
                {' '}em cada detalhe.”
              </span>
            </p>

            <div className="mx-auto mt-10 h-px w-16 bg-ouro" />

            <p className="mt-6 text-[10px] uppercase tracking-[0.28em] text-carvao-soft">
              EuroDesign · São Paulo · Desde 1966
            </p>

          </Reveal>

        </div>
      </section>

      {/* =========================================================
          CTA FINAL
      ========================================================== */}
      <section className="bg-carvao text-cream">

        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-28">

          <Reveal>

            <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">

              <div>

                <p className="text-[11px] uppercase tracking-[0.28em] text-marca">
                  Conheça de perto
                </p>

                <h2 className="mt-6 max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.03em] md:text-7xl">
                  Venha conhecer
                  <br />

                  <span className="italic text-marca">
                    nossa loja.
                  </span>
                </h2>

              </div>

              <div>

                <p className="mb-8 max-w-md leading-7 text-cream/65">
                  Conheça nossos sofás, acabamentos e possibilidades de
                  personalização.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">

                  <Link
                    href="/produtos"
                    className="flex items-center justify-between rounded-lg bg-marca px-6 py-4 text-sm font-medium text-carvao transition-all hover:opacity-90"
                  >
                    <span>Conhecer o Showroom</span>
                    <span aria-hidden="true">→</span>
                  </Link>

                  <a
                    href="https://wa.me/5511913371140"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-cream/25 px-6 py-4 text-sm text-cream transition-colors hover:border-marca hover:text-marca"
                  >
                    <span>Falar com um vendedor</span>
                    <span aria-hidden="true">↗</span>
                  </a>

                </div>

              </div>

            </div>

          </Reveal>

        </div>
      </section>

    </main>
  );
}