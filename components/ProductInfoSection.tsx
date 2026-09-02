'use client';

import { useState } from 'react';
import Link from 'next/link';
import InfoModal from './InfoModal';
import type { Dimensao } from '@/lib/shopify/types';

type SiblingProduct = {
  handle: string;
  title: string;
  dimensaoLabel?: string | null;
};

type Props = {
  productTitle: string;
  description: string;
  descriptionHtml: string;
  fichaTecnica: Record<string, string> | null;
  dimensoes: Dimensao[] | null;
  siblings: SiblingProduct[];
};

export default function ProductInfoSection({
  productTitle,
  description,
  descriptionHtml,
  fichaTecnica,
  dimensoes,
  siblings,
}: Props) {
  const [showFicha, setShowFicha] = useState(false);
  const [showDims, setShowDims] = useState(false);
  const [showConfigurations, setShowConfigurations] = useState(false);
  const [showPersonalizacao, setShowPersonalizacao] = useState(false);
  const [imagemAmpliada, setImagemAmpliada] = useState<string | null>(null);

  /*
   * CONFIGURAÇÕES POR PRODUTO
   */
  const configuracoesPorProduto: Record<
    string,
    { nome: string; imagem: string }[]
  > = {
    Chesterfield: [
      {
        nome: 'POLTRONA',
        imagem: '/configuracoes/chesterfield-poltrona.webp',
      },
      {
        nome: 'CANTO',
        imagem: '/configuracoes/chesterfield-canto.webp',
      },
      {
        nome: 'COM CHAISE',
        imagem: '/configuracoes/chesterfield-comchaise.webp',
      },
      {
        nome: 'QUADRADO',
        imagem: '/configuracoes/chesterfield-quadrado.webp',
      },
    ],

    Tokyo: [
      {
        nome: 'COM CHAISE',
        imagem: '/configuracoes/tokyo-comchaise.webp',
      },
      {
        nome: '3 LUGARES',
        imagem: '/configuracoes/tokyo-treslugares.webp',
      },
    ],

    Agatha: [
      {
        nome: 'POLTRONA',
        imagem: '/configuracoes/agatha-poltrona.webp',
      },
      {
        nome: '2 LUGARES',
        imagem: '/configuracoes/agatha-doislugares.webp',
      },
      {
        nome: 'COM CHAISE',
        imagem: '/configuracoes/agatha-comchaise.webp',
      },
    ],

    Magnus: [
      {
        nome: 'POLTRONA',
        imagem: '/configuracoes/magnus-poltrona.webp',
      },
      {
        nome: '2 LUGARES',
        imagem: '/configuracoes/magnus-doislugares.webp',
      },
    ],

    Nice: [
      {
        nome: 'COM CHAISE',
        imagem: '/configuracoes/nice-comchaise.webp',
      },
      {
        nome: '3 LUGARES',
        imagem: '/configuracoes/nice-treslugares.webp',
      },
    ],

    Gemini: [
      {
        nome: '2 LUGARES',
        imagem: '/configuracoes/gemini-doislugares.webp',
      },
      {
        nome: '3 LUGARES',
        imagem: '/configuracoes/gemini-treslugares.webp',
      },
    ],

    'F.K.': [
      {
        nome: 'POLTRONA',
        imagem: '/configuracoes/f.k.-poltrona.webp',
      },
      {
        nome: '2 LUGARES',
        imagem: '/configuracoes/f.k.-doislugares.webp',
      },
      {
        nome: '3 LUGARES',
        imagem: '/configuracoes/f.k.-treslugares.webp',
      },
    ],

    Elegance: [
      {
        nome: 'RETO',
        imagem: '/configuracoes/elegance-reto.webp',
      },
    ],
  };

  const configuracoes =
    configuracoesPorProduto[productTitle] ?? [];

  /*
   * VERIFICA SE EXISTEM DIMENSÕES
   */
  const hasDims =
    (dimensoes && dimensoes.length > 0) ||
    siblings.length > 0;

  /*
   * VERIFICA SE EXISTE FICHA TÉCNICA
   */
  const hasFicha =
    fichaTecnica &&
    Object.keys(fichaTecnica).length > 0;

  return (
    <>
      {/* ====================================================== */}
      {/* VEJA MAIS INFORMAÇÕES */}
      {/* ====================================================== */}

      {(hasFicha || descriptionHtml) && (
        <button
          type="button"
          onClick={() => setShowFicha(true)}
          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-carvao underline underline-offset-4 hover:text-ouro"
        >
          Veja mais informações

          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      )}

      {/* ====================================================== */}
      {/* VER CONFIGURAÇÕES DO MODELO */}
      {/* ====================================================== */}

      <button
        type="button"
        onClick={() => setShowConfigurations(true)}
        className="mt-5 w-full border border-black bg-white px-6 py-4 text-sm font-semibold tracking-[0.18em] text-black transition hover:bg-black hover:text-yellow-400"
      >
        VER CONFIGURAÇÕES DO MODELO
      </button>

      {/* ====================================================== */}
      {/* DIMENSÕES */}
      {/* ====================================================== */}

      {hasDims && (
        <div className="mt-8 border-t border-linha pt-6">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-lg text-carvao">
              Dimensões
            </h2>

            {dimensoes && dimensoes[0] && (
              <p className="text-sm text-carvao-soft">
                {dimensoes[0].variante} · {dimensoes[0].medidas}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowDims(true)}
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-carvao underline underline-offset-4 hover:text-ouro"
          >
            Outras dimensões

            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}

      {/* ====================================================== */}
      {/* VER PERSONALIZAÇÃO */}
      {/* ====================================================== */}

      <button
        type="button"
        onClick={() => setShowPersonalizacao(true)}
        className="mt-8 w-full rounded-lg bg-carvao px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-marca transition-opacity hover:opacity-90"
      >
        VER PERSONALIZAÇÃO
      </button>

      {/* ====================================================== */}
      {/* MODAL DE PERSONALIZAÇÃO */}
      {/* ====================================================== */}

      <InfoModal
        open={showPersonalizacao}
        onClose={() => setShowPersonalizacao(false)}
        title={`Personalização - ${productTitle}`}
        wide
      >
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={`/personalizacao/${productTitle
              .toLowerCase()
              .replace(/\s+/g, '-')}.jpg`}
            alt={`Personalização do ${productTitle}`}
            className="h-auto max-h-[82vh] w-full max-w-[95vw] object-contain"
          />
        </div>
      </InfoModal>

      {/* ====================================================== */}
      {/* MODAL FICHA TÉCNICA */}
      {/* ====================================================== */}

      <InfoModal
        open={showFicha}
        onClose={() => setShowFicha(false)}
        title={`Ficha técnica — ${productTitle}`}
        wide
      >
        {hasFicha ? (
          <dl className="divide-y divide-linha">
            {Object.entries(fichaTecnica!).map(([k, v]) => (
              <div
                key={k}
                className="grid grid-cols-[minmax(0,1fr)_2fr] gap-4 py-3"
              >
                <dt className="text-xs font-medium uppercase tracking-[0.1em] text-carvao-soft">
                  {k}
                </dt>

                <dd className="text-sm text-carvao">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <div
            className="prose-eurodesign max-w-none text-sm text-carvao-soft"
            dangerouslySetInnerHTML={{
              __html: descriptionHtml,
            }}
          />
        )}
      </InfoModal>

      {/* ====================================================== */}
      {/* MODAL DE DIMENSÕES */}
      {/* ====================================================== */}

      <InfoModal
        open={showDims}
        onClose={() => setShowDims(false)}
        title="Dimensões disponíveis"
      >
        {dimensoes && dimensoes.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-carvao-soft">
              Configurações deste modelo
            </h3>

            <ul className="divide-y divide-linha rounded-lg border border-linha">
              {dimensoes.map((d, i) => (
                <li
                  key={`${d.variante}-${i}`}
                  className="flex items-center justify-between gap-4 px-4 py-3"
                >
                  <span className="text-sm font-medium text-carvao">
                    {d.variante}
                  </span>

                  <span className="text-sm text-carvao-soft">
                    {d.medidas}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {siblings.length > 0 && (
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-carvao-soft">
              Outras versões deste sofá disponíveis na loja
            </h3>

            <ul className="flex flex-col gap-2">
              {siblings.map((s) => (
                <li key={s.handle}>
                  <Link
                    href={`/produtos/${s.handle}`}
                    className="flex items-center justify-between gap-4 rounded-lg border border-linha px-4 py-3 text-sm transition-colors hover:border-carvao"
                    onClick={() => setShowDims(false)}
                  >
                    <span className="font-medium text-carvao">
                      {s.title}
                    </span>

                    {s.dimensaoLabel && (
                      <span className="text-carvao-soft">
                        {s.dimensaoLabel}
                      </span>
                    )}

                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-carvao-soft"
                    >
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </InfoModal>

      {/* ====================================================== */}
      {/* MODAL DE CONFIGURAÇÕES */}
      {/* ====================================================== */}

      {showConfigurations && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setShowConfigurations(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-7xl overflow-y-auto bg-white p-6 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* BOTÃO FECHAR */}

            <button
              type="button"
              onClick={() => setShowConfigurations(false)}
              className="absolute right-5 top-4 text-3xl text-black"
              aria-label="Fechar"
            >
              ×
            </button>

            {/* TÍTULO */}

            <h2 className="mb-2 text-2xl font-medium">
              Configurações disponíveis
            </h2>

            <p className="mb-8 text-sm text-neutral-500">
              Veja algumas das possibilidades de composição deste modelo.
            </p>

            {/* IMAGENS DAS CONFIGURAÇÕES */}

            {configuracoes.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {configuracoes.map((config) => (
                  <div
                    key={config.imagem}
                    className="flex flex-col"
                  >
                    <img
                      src={config.imagem}
                      alt={`${productTitle} ${config.nome}`}
                      onClick={() =>
                        setImagemAmpliada(config.imagem)
                      }
                      className="h-auto max-h-[520px] w-full cursor-zoom-in object-contain"
                    />

                    <p className="mt-3 text-center text-sm font-medium">
                      {config.nome}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-neutral-500">
                Configurações adicionais em breve.
              </p>
            )}

            {/* ================================================== */}
            {/* VISUALIZAÇÃO DA IMAGEM EM TELA CHEIA */}
            {/* ================================================== */}

            {imagemAmpliada && (
              <div
                className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4"
                onClick={() => setImagemAmpliada(null)}
              >
                <button
                  type="button"
                  onClick={() => setImagemAmpliada(null)}
                  className="absolute right-6 top-6 z-[10001] text-4xl text-white"
                  aria-label="Fechar imagem"
                >
                  ×
                </button>

                <img
                  src={imagemAmpliada}
                  alt="Imagem ampliada"
                  className="max-h-[95vh] max-w-[95vw] object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}