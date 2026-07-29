'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function InfoModal({ open, onClose, title, children }: Props) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // dupla-frame: garante que o estado inicial (translate-y-full / translate-x-full)
      // pinta antes de trocar pra 0, senão a animação não roda
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else if (mounted) {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [open, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onEsc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = prev;
    };
  }, [mounted, onClose]);

  if (!mounted || typeof window === 'undefined') return null;

  // Portal pra document.body: evita que ancestrais com `will-change:transform` (Reveal)
  // criem containing block e quebrem o `position:fixed` do backdrop/sidebar.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className={`fixed inset-0 z-[80] flex justify-end transition-colors duration-300 ${
        visible ? 'bg-carvao/40 backdrop-blur-sm' : 'bg-transparent backdrop-blur-none'
      } items-end sm:items-stretch`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex max-h-[92vh] w-full flex-col overflow-hidden bg-cream shadow-xl transition-transform duration-300 ease-out sm:h-full sm:max-h-none sm:max-w-2xl
          rounded-t-2xl sm:rounded-none
          ${
            visible
              ? 'translate-y-0 sm:translate-x-0'
              : 'translate-y-full sm:translate-y-0 sm:translate-x-full'
          }`}
      >
        <header className="flex items-start justify-between border-b border-linha px-6 py-5">
          <h2 className="font-serif text-xl text-carvao sm:text-2xl">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="-mr-2 -mt-1 rounded-full p-2 text-carvao-soft transition-colors hover:bg-cream-2 hover:text-carvao"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
        <footer className="border-t border-linha px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-carvao py-3 text-[12px] font-medium uppercase tracking-[0.2em] text-cream transition-colors hover:bg-ouro"
          >
            Fechar
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
