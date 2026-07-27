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

  const hasDims = (dimensoes && dimensoes.length > 0) || siblings.length > 0;
  const hasFicha = fichaTecnica && Object.keys(fichaTecnica).length > 0;

  const shortDescription = description
    ? description.length > 260
      ? description.slice(0, 260).replace(/\s\S*$/, '') + '…'
      : description
    : `${productTitle} em couro legítimo EuroDesign. Peça artesanal produzida sob encomenda.`;

  return (
    <>
      {/* Descrição curta + link modal */}
      <div className="mt-8">
        <h2 className="font-serif text-2xl text-carvao">Descrição</h2>
        <p className="prose-eurodesign mt-4 max-w-none text-sm leading-relaxed text-carvao-soft">
          {shortDescription}
        </p>
        {(hasFicha || descriptionHtml) && (
          <button
            type="button"
            onClick={() => setShowFicha(true)}
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-carvao underline underline-offset-4 hover:text-ouro"
          >
            Veja mais informações
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        )}
      </div>

      {/* Dimensões */}
      {hasDims && (
        <div className="mt-8 border-t border-linha pt-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-lg text-carvao">Dimensões</h2>
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
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}

      {/* Aviso de personalização — sempre visível */}
      <div className="mt-8 rounded-lg border border-ouro/30 bg-ouro/5 p-4 text-xs leading-relaxed text-carvao">
        <p className="font-medium text-carvao">Produto personalizado.</p>
        <p className="mt-1 text-carvao-soft">
          Verifique com a loja os prazos de entrega e quando o produto fica pronto, para que
          não haja nenhum problema com a entrega e o tempo de espera.
        </p>
      </div>

      {/* Modal — Ficha técnica */}
      <InfoModal
        open={showFicha}
        onClose={() => setShowFicha(false)}
        title={`Ficha técnica — ${productTitle}`}
      >
        {hasFicha ? (
          <dl className="divide-y divide-linha">
            {Object.entries(fichaTecnica!).map(([k, v]) => (
              <div key={k} className="grid grid-cols-[minmax(0,1fr)_2fr] gap-4 py-3">
                <dt className="text-xs font-medium uppercase tracking-[0.1em] text-carvao-soft">
                  {k}
                </dt>
                <dd className="text-sm text-carvao">{v}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <div
            className="prose-eurodesign max-w-none text-sm text-carvao-soft"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        )}
      </InfoModal>

      {/* Modal — Dimensões */}
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
                  <span className="text-sm text-carvao-soft">{d.medidas}</span>
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
                    <span className="font-medium text-carvao">{s.title}</span>
                    {s.dimensaoLabel && (
                      <span className="text-carvao-soft">{s.dimensaoLabel}</span>
                    )}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-carvao-soft">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </InfoModal>
    </>
  );
}
