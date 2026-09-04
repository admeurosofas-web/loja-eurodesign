'use client';

import { useState } from 'react';
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
  descriptionHtml,
  fichaTecnica,
}: Props) {
  const [showFicha, setShowFicha] = useState(false);
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
   * VERIFICA SE EXISTE FICHA TÉCNICA
   */
  const hasFicha =
    fichaTecnica &&
    Object.keys(fichaTecnica).length > 0;

  return (
    <>
      {/* ====================================================== */}
      {/* MAIS INFORMAÇÕES */}
      {/* ====================================================== */}

      {(hasFicha || descriptionHtml) && (
        <button
          type="button"
          onClick={() => setShowFicha(true)}
          className="group mt-3 flex w-full items-center justify-between rounded-xl border border-[#e6ddcf] bg-[#faf8f3] px-5 py-4 text-carvao transition-all duration-200 hover:border-ouro hover:bg-white hover:shadow-sm"
        >
          <span className="flex items-center gap-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e6ddcf] bg-white text-carvao transition-colors group-hover:border-ouro group-hover:text-ouro">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2h9l5 5v15H6z" />
                <path d="M14 2v6h6" />
                <path d="M9 13h6" />
                <path d="M9 17h6" />
              </svg>
            </span>

            <span className="text-left text-[12px] font-extrabold uppercase tracking-[0.16em]">
              MAIS INFORMAÇÕES
            </span>
          </span>

          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </button>
      )}

      {/* ====================================================== */}
      {/* CONFIGURAÇÕES DO MODELO */}
      {/* ====================================================== */}

      <button
        type="button"
        onClick={() => setShowConfigurations(true)}
        className="group mt-3 flex w-full items-center justify-between rounded-xl border border-[#e6ddcf] bg-[#faf8f3] px-5 py-4 text-carvao transition-all duration-200 hover:border-ouro hover:bg-white hover:shadow-sm"
      >
        <span className="flex items-center gap-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e6ddcf] bg-white text-carvao transition-colors group-hover:border-ouro group-hover:text-ouro">
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21h-4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H3v-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V3h4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1H21v4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
            </svg>
          </span>

          <span className="text-left text-[12px] font-extrabold uppercase tracking-[0.16em]">
            CONFIGURAÇÕES DO MODELO
          </span>
        </span>

        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      </button>

      {/* ====================================================== */}
      {/* PERSONALIZAÇÃO */}
      {/* ====================================================== */}

      <button
        type="button"
        onClick={() => setShowPersonalizacao(true)}
        className="group mt-3 flex w-full items-center justify-between rounded-xl border border-[#e6ddcf] bg-[#faf8f3] px-5 py-4 text-carvao transition-all duration-200 hover:border-ouro hover:bg-white hover:shadow-sm"
      >
        <span className="flex items-center gap-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e6ddcf] bg-white text-carvao transition-colors group-hover:border-ouro group-hover:text-ouro">
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m14.7 6.3 3 3" />
              <path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10Z" />
              <path d="M13 7 17 11" />
              <path d="M5 5l4 4" />
              <path d="M3 7l4-4" />
            </svg>
          </span>

          <span className="text-left text-[12px] font-extrabold uppercase tracking-[0.16em]">
            PERSONALIZAÇÃO
          </span>
        </span>

        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
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