
import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Sobre a EuroDesign',
  description:
    'Conheça a história da EuroDesign, fundada em São Paulo em 1966, unindo design europeu, fabricação brasileira e cuidado artesanal.',
};

const processo = [
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

const diferenciais = [
  {
    simbolo: '✧',
    titulo: 'Couro 100% legítimo',
    texto: 'Beleza, resistência e longa vida útil.',
  },
  {
    simbolo: '◇',
    titulo: 'Personalização sob medida',
    texto: 'Modelos, medidas e acabamentos exclusivos.',
  },
  {
    simbolo: '▱',
    titulo: 'Conforto excepcional',
    texto: 'Ergonomia e bem-estar em cada detalhe.',
  },
  {
    simbolo: '♡',
    titulo: 'Atendimento especializado',
    texto: 'Suporte completo, do projeto à entrega.',
  },
];

const valores = [
  {
    simbolo: '◇',
    titulo: 'Qualidade',
    texto: 'Materiais selecionados e acabamento superior.',
  },
  {
    simbolo: '♢',
    titulo: 'Confiança',
    texto: 'Mais de 55 anos de tradição no Brasil.',
  },
  {
    simbolo: '♧',
    titulo: 'Durabilidade',
    texto: 'Móveis feitos para acompanhar gerações.',
  },
];

export default function SobrePage() {
  return (
    <main className="overflow-hidden bg-cream text-carvao">

      {/* 01 — ABERTURA COM CHESTERFIELD */}
      <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-[#21140f] text-white lg:min-h-[760px]">
        <img
          src="/images/sobre/sobre-chesterfield.jpg"
          alt="Sofá Chesterfield em couro em ambiente clássico"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#160d09]/95 via-[#160d09]/70 to-transparent" />

        <div className="mx-auto w-full max-w-[1400px] px-6 py-28 lg:px-10">
          <Reveal>
            <div className="max-w-[620px]">
              <h1 className="font-serif text-[clamp(4.2rem,8vw,8rem)] leading-[0.87] tracking-[-0.045em]">
                Sobre a
                <br />
                <span className="italic text-[#d7aa48]">
                  EuroDesign.
                </span>
              </h1>

              <p className="mt-9 max-w-md text-base leading-8 text-white/90 md:text-lg">
                Uma história construída entre design europeu,
                fabricação brasileira e cuidado artesanal.
              </p>

              <div className="mt-7 h-px w-16 bg-[#d7aa48]" />

              <div className="mt-6 flex items-center gap-5">
                <span className="font-serif text-6xl">
                  1966
                </span>

                <span className="border-l border-white/40 pl-5 text-[10px] uppercase leading-5 tracking-[0.2em]">
                  Início de
                  <br />
                  uma história
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 — HISTÓRIA COM FACHADA VERTICAL À ESQUERDA */}
      <section className="bg-[#faf6f0]">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20 lg:px-10 lg:py-32">
          <Reveal>
            <div className="overflow-hidden rounded-[22px] bg-[#e8dfd3] shadow-xl">
              <img
                src="/images/sobre/sobre-fachada.jpg"
                alt="Fachada real da loja EuroDesign"
                className="block aspect-[3/4] w-full object-cover object-center"
              />
            </div>
          </Reveal>

          <Reveal>
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-ouro">
                01 / Nossa história
              </p>

              <div className="mt-5 h-px w-14 bg-ouro" />

              <h2 className="mt-9 font-serif text-5xl leading-[1.05] tracking-[-0.035em] md:text-6xl xl:text-7xl">
                Uma história de sucesso
                <span className="italic text-ouro">
                  {' '}no Brasil.
                </span>
              </h2>

              <div className="mt-10 grid gap-7 border-t border-linha pt-9 md:grid-cols-2">
                <p className="text-base leading-8 text-carvao-soft">
                  A EuroDesign foi estabelecida em São Paulo,
                  Brasil, em{' '}
                  <strong className="font-medium text-carvao">
                    1966
                  </strong>
                  , trazendo como referência o melhor do design
                  europeu. Ao longo de sua história, especializou-se
                  na fabricação e venda de sofás, poltronas,
                  cadeiras, mesas de café, sofás de canto,
                  salas de jantar e outros móveis.
                </p>

                <p className="text-base leading-8 text-carvao-soft">
                  Trabalhamos com couro de alta qualidade e uma
                  variedade de acabamentos, combinando matéria-prima
                  selecionada, conforto, precisão e atenção aos
                  detalhes em cada etapa da fabricação.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — DESIGN, CONFORTO E QUALIDADE */}
      <section className="relative bg-[#faf6f0] pb-12">
        <div
          className="relative bg-[#25170f] bg-cover bg-center text-white"
          style={{
            backgroundImage:
              "linear-gradient(90deg,rgba(25,12,6,.55),rgba(25,12,6,.94)),url('/images/sobre/textura-couro.jpg')",
          }}
        >
          <div className="mx-auto grid max-w-[1400px] gap-10 px-6 pb-36 pt-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-20 lg:px-10 lg:pb-40 lg:pt-24">
            <Reveal>
              <h2 className="font-serif text-5xl italic leading-[1.04] tracking-[-0.035em] md:text-7xl">
                Design, conforto
                <br />
                e{' '}
                <span className="text-[#e0b448]">
                  qualidade.
                </span>
              </h2>
            </Reveal>

            <Reveal>
              <p className="border-l border-[#c89b45] pl-8 text-base leading-8 text-white/85">
                Sofás de couro que unem estética, ergonomia e
                durabilidade, para transformar o seu ambiente em
                um espaço único e acolhedor.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="relative z-10 mx-auto -mt-28 max-w-[1400px] px-6 lg:px-10">
          <div className="grid overflow-hidden rounded-[18px] border border-[#e9d7bf] bg-[#faf4eb] shadow-[0_18px_45px_rgba(55,30,12,0.12)] md:grid-cols-4">
            {diferenciais.map((item) => (
              <div
                key={item.titulo}
                className="flex flex-col items-center border-b border-[#dfcbb1] px-7 py-9 text-center last:border-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <span
                  aria-hidden="true"
                  className="mb-4 font-serif text-5xl leading-none text-[#a4761c]"
                >
                  {item.simbolo}
                </span>

                <h3 className="max-w-[190px] text-base font-semibold leading-5 text-[#211912]">
                  {item.titulo}
                </h3>

                <p className="mt-3 max-w-[200px] text-sm leading-6 text-[#655a50]">
                  {item.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — TRADIÇÃO E FABRICAÇÃO PRÓPRIA */}
      <section className="bg-[#faf6f0] py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <Reveal>
            <img
              src="/images/sobre/artesanato-couro.jpg"
              alt="Trabalho artesanal de costura em couro"
              className="block aspect-[5/3] w-full rounded-[18px] object-cover shadow-lg"
            />
          </Reveal>

          <Reveal>
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-ouro">
                02 / Artesanalidade
              </p>

              <div className="mt-5 h-px w-14 bg-ouro" />

              <h2 className="mt-8 font-serif text-5xl leading-[1.05] md:text-6xl">
                Tradição e{' '}
                <span className="italic text-ouro">
                  fabricação própria.
                </span>
              </h2>

              <p className="mt-7 max-w-xl text-lg leading-8 text-carvao-soft">
                Cada peça EuroDesign é desenvolvida com rigor
                técnico, processos artesanais e um alto padrão
                de qualidade, garantindo design, conforto e
                exclusividade em cada detalhe.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 05 — NOSSOS VALORES */}
      <section className="relative overflow-hidden bg-[#f5eee4] py-20 lg:py-28">
        <div className="pointer-events-none absolute bottom-0 right-0 hidden w-[27%] lg:block">
          <img
            src="/images/sobre/chesterfield-valores.png"
            alt=""
            className="w-full object-contain"
          />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.25em] text-ouro">
              03 / Nossa essência
            </p>

            <h2 className="mt-6 font-serif text-5xl leading-[1.05] md:text-6xl">
              Nossos valores
              <br />
              <span className="italic text-ouro">
                em cada detalhe.
              </span>
            </h2>
          </Reveal>

          <div className="mt-12 grid max-w-[900px] gap-8 md:grid-cols-3">
            {valores.map((item) => (
              <div
                key={item.titulo}
                className="border-[#dfcbb1] pr-5 md:border-r md:last:border-r-0"
              >
                <span
                  aria-hidden="true"
                  className="font-serif text-4xl text-ouro"
                >
                  {item.simbolo}
                </span>

                <h3 className="mt-3 font-semibold">
                  {item.titulo}
                </h3>

                <p className="mt-2 text-sm leading-6 text-carvao-soft">
                  {item.texto}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/produtos"
            className="mt-12 inline-flex items-center gap-4 rounded-lg bg-[#bb850d] px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Conheça nossa coleção
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* 06 — ETAPAS DA FABRICAÇÃO */}
      <section className="border-y border-linha bg-cream-2">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-36">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr]">
              <p className="text-[11px] uppercase tracking-[0.25em] text-ouro">
                04 / Fabricação
              </p>

              <div>
                <h2 className="font-serif text-5xl leading-[1.02] md:text-7xl">
                  A qualidade começa
                  <br />
                  <span className="italic text-ouro">
                    antes do acabamento.
                  </span>
                </h2>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-carvao-soft">
                  Corte, costura do couro, preparação das almofadas,
                  enchimentos, estofamento e botões fazem parte de um
                  processo em que o trabalho manual continua tendo
                  papel fundamental.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-20 border-t border-carvao">
            {processo.map((item) => (
              <Reveal key={item.numero}>
                <div className="grid gap-5 border-b border-linha py-7 md:grid-cols-[0.25fr_0.65fr_1.1fr] md:items-center">
                  <p className="text-[11px] tracking-[0.2em] text-ouro">
                    {item.numero}
                  </p>

                  <h3 className="font-serif text-3xl md:text-4xl">
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

      {/* 07 — FRASE FINAL */}
      <section className="border-y border-linha">
        <div className="mx-auto max-w-[1400px] px-6 py-24 text-center lg:px-10 lg:py-36">
          <Reveal>
            <p className="mx-auto max-w-5xl font-serif text-4xl leading-[1.12] md:text-6xl lg:text-7xl">
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

      {/* 08 — CONHEÇA NOSSA LOJA */}
      <section className="bg-carvao text-cream">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-28">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-marca">
                  Conheça de perto
                </p>

                <h2 className="mt-6 font-serif text-5xl leading-[0.98] md:text-7xl">
                  Venha conhecer
                  <br />
                  <span className="italic text-marca">
                    nossa loja.
                  </span>
                </h2>
              </div>

              <div>
                <p className="mb-8 max-w-md leading-7 text-cream/65">
                  Conheça nossos sofás, acabamentos e possibilidades
                  de personalização.
                </p>

                <div className="flex flex-col gap-3">
                  <Link
                    href="/produtos"
                    className="flex items-center justify-between rounded-lg bg-marca px-6 py-4 text-sm font-medium text-carvao"
                  >
                    <span>Conhecer o Showroom</span>
                    <span aria-hidden="true">→</span>
                  </Link>

                  <a
                    href="https://wa.me/5511913371140"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-cream/25 px-6 py-4 text-sm text-cream"
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
