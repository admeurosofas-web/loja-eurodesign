'use client';

import { useEffect } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function InfoModal({ open, onClose, title, children }: Props) {
  useEffect(() => {
    if (!open) return;
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
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-carvao/40 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-cream shadow-xl sm:max-w-2xl sm:rounded-2xl"
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
        <div className="overflow-y-auto px-6 py-6">{children}</div>
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
    </div>
  );
}
