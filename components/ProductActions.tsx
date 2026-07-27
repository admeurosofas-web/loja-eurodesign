'use client';

import { useEffect, useState } from 'react';

type Props = {
  productHandle: string;
  productTitle: string;
};

const STORAGE_KEY = 'eurodesign:favoritos';

function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setFavorites(list: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent('favoritos:updated'));
}

export default function ProductActions({ productHandle, productTitle }: Props) {
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    setSaved(getFavorites().includes(productHandle));
    function refresh() {
      setSaved(getFavorites().includes(productHandle));
    }
    window.addEventListener('favoritos:updated', refresh);
    return () => window.removeEventListener('favoritos:updated', refresh);
  }, [productHandle]);

  function toggleSave() {
    const list = getFavorites();
    const next = list.includes(productHandle)
      ? list.filter((h) => h !== productHandle)
      : [...list, productHandle];
    setFavorites(next);
    setSaved(!saved);
  }

  async function handleShare() {
    const url =
      typeof window !== 'undefined'
        ? window.location.href
        : `https://www.eurodesign.com.br/produtos/${productHandle}`;
    const shareData = {
      title: `${productTitle} · EuroDesign`,
      text: `Confira o ${productTitle} na EuroDesign`,
      url,
    };
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // usuário cancelou — fallback abaixo
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(`${shareData.text}: ${url}`)}`,
        '_blank',
      );
    }
  }

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={handleShare}
        aria-label="Compartilhar produto"
        className="relative rounded-full p-2 text-carvao-soft transition-colors hover:bg-cream-2 hover:text-carvao"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
          <line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
        </svg>
        {shared && (
          <span className="pointer-events-none absolute -bottom-8 right-0 whitespace-nowrap rounded-md bg-carvao px-2 py-1 text-[10px] uppercase tracking-wider text-cream">
            Link copiado
          </span>
        )}
      </button>
      <button
        type="button"
        onClick={toggleSave}
        aria-label={saved ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
        aria-pressed={saved}
        className={`rounded-full p-2 transition-colors hover:bg-cream-2 ${
          saved ? 'text-ouro' : 'text-carvao-soft hover:text-carvao'
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    </div>
  );
}
