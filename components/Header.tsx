'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

type SearchProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
};

const POPULAR_SEARCHES = [
  'Chesterfield',
  'Reclinável',
  'Poltrona',
  'Couro legítimo',
  'Conjunto',
];

const CATEGORIAS = [
  { href: '/produtos', label: 'Toda a Coleção', destaque: true },
  { href: '/produtos?q=sofá', label: 'Sofás' },
  { href: '/produtos?q=poltrona', label: 'Poltronas' },
  { href: '/produtos?q=reclinável', label: 'Reclináveis Elétricos' },
  { href: '/produtos?q=chesterfield', label: 'Chesterfield' },
  { href: '/produtos?q=conjunto', label: 'Conjuntos' },
  { href: '/produtos?q=couro', label: 'Couro Legítimo' },
  { href: '/produtos?ordenar=recentes', label: 'Novidades' },
  { href: '/produtos?q=outlet', label: 'Outlet', destaque: true },
];

const INSTITUCIONAL: { href: string; label: string; external?: boolean }[] = [
  {
    href: 'https://wa.me/5511913371140',
    label: 'Atendimento WhatsApp',
    external: true,
  },
  { href: '/showroom', label: 'Nosso Showroom' },
  { href: '/sobre', label: 'Sobre a EuroDesign' },
  { href: '/contato', label: 'Contato' },
];

function IconSearch() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
function IconBag() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 8h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isActive = (href: string) => {
    const [hrefPath, hrefQuery = ''] = href.split('?');
    if (hrefPath !== pathname) return false;
    const hrefParams = new URLSearchParams(hrefQuery);
    const currentParams = new URLSearchParams(searchParams.toString());
    if (hrefParams.toString() === '') return currentParams.toString() === '';
    for (const [k, v] of hrefParams.entries()) {
      if (currentParams.get(k) !== v) return false;
    }
    return true;
  };

  useEffect(() => {
    const refresh = () => {
      fetch('/api/cart')
        .then((r) => r.json())
        .then((c) => setCount(c?.totalQuantity ?? 0))
        .catch(() => {});
    };
    refresh();
    const onUpdate = () => refresh();
    const onFocus = () => refresh();
    window.addEventListener('cart:updated', onUpdate);
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('cart:updated', onUpdate);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open || searchOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, searchOpen]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    inputRef.current?.focus();
    setSearchLoading(true);
    const t = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((r) => r.json())
        .then((p: SearchProduct[]) => setProducts(Array.isArray(p) ? p : []))
        .catch(() => setProducts([]))
        .finally(() => setSearchLoading(false));
    }, 220);
    return () => clearTimeout(t);
  }, [query, searchOpen]);

  const submitSearch = (term: string) => {
    const t = term.trim();
    if (!t) return;
    setSearchOpen(false);
    setQuery('');
    router.push(`/produtos?q=${encodeURIComponent(t)}`);
  };

  const brl = (v: string) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(parseFloat(v));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Barra principal — glass */}
      <div className="glass-nav backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-16 max-w-350 items-center justify-between gap-4 px-5 lg:px-10">
          {/* Esquerda: hamburger */}
          <div className="flex flex-1 items-center">
            <button
              onClick={() => setOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={open}
              className="flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-cream transition-colors hover:text-marca"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="h-px w-6 bg-current" />
                <span className="h-px w-6 bg-current" />
                <span className="h-px w-4 bg-current" />
              </span>
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>

          {/* Centro: wordmark */}
          <Link
            href="/"
            className="flex flex-none items-center justify-center"
            aria-label="EuroDesign — início"
          >
            <Logo height={44} />
          </Link>

          {/* Direita: ícones */}
          <div className="flex flex-1 items-center justify-end gap-5 text-cream">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar produtos"
              aria-expanded={searchOpen}
              className="transition-colors hover:text-marca"
            >
              <IconSearch />
            </button>
            <Link
              href="/carrinho"
              aria-label={`Sacola, ${count} itens`}
              className="relative flex items-center transition-colors hover:text-marca"
            >
              <IconBag />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-marca px-1 text-[10px] font-medium leading-none text-carvao">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Drawer lateral com categorias */}
      {open && (
        <>
          <button
            className="fixed inset-0 z-[60] bg-carvao/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          />
          <aside
            className="glass-panel fixed inset-y-0 left-0 z-[70] flex w-[92%] max-w-md flex-col text-cream backdrop-blur-2xl backdrop-saturate-150"
            aria-label="Menu principal"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-7 py-5">
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-cream hover:text-marca"
              >
                <IconClose />
                Fechar
              </button>
              <Link href="/" onClick={() => setOpen(false)} aria-label="Início">
                <Logo height={40} />
              </Link>
            </div>

            <div className="px-7 pt-7">
              <p className="text-[11px] uppercase tracking-[0.22em] text-ouro-l">
                EuroDesign Sofás
              </p>
              <p className="mt-2 font-serif text-3xl">A Coleção</p>
            </div>

            <nav className="mt-4 flex-1 overflow-y-auto px-7">
              <ul className="flex flex-col divide-y divide-white/10">
                {CATEGORIAS.map((c) => {
                  const active = isActive(c.href);
                  return (
                    <li key={c.label}>
                      <Link
                        href={c.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={`flex items-center justify-between py-4 font-serif text-2xl transition-colors ${
                          active
                            ? 'text-marca'
                            : c.destaque
                              ? 'text-marca hover:text-cream'
                              : 'text-cream hover:text-marca'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {active && (
                            <span
                              aria-hidden
                              className="inline-block h-[2px] w-6 bg-marca"
                            />
                          )}
                          {c.label}
                        </span>
                        <span
                          aria-hidden
                          className={
                            active
                              ? 'text-lg text-marca'
                              : 'text-lg text-cream/40'
                          }
                        >
                          ›
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <ul className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] tracking-wide text-cream/80">
                {INSTITUCIONAL.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener"
                        className="hover:text-marca"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="hover:text-marca"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-white/10 px-7 py-6 text-xs leading-relaxed text-cream/60">
              <p className="uppercase tracking-[0.2em] text-ouro-l">Showroom</p>
              <p className="mt-2">
                Rod. Anchieta, 1113 — Sacomã, São Paulo
                <br />
                Seg–Sáb 9h–18h · Dom 10h–17h
              </p>
            </div>
          </aside>
        </>
      )}

      {/* Overlay de busca — estilo Arteriors */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[80] flex flex-col bg-cream text-carvao"
          role="dialog"
          aria-label="Buscar produtos"
        >
          {/* Barra superior: input + close */}
          <div className="border-b border-linha">
            <div className="mx-auto flex h-[80px] max-w-[1400px] items-center gap-4 px-5 lg:px-10">
              <label className="flex flex-1 items-center gap-3">
                <span className="text-carvao-soft" aria-hidden>
                  <IconSearch />
                </span>
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') submitSearch(query);
                  }}
                  placeholder="Procuro por..."
                  className="w-full bg-transparent py-2 text-lg placeholder:text-carvao-soft focus:outline-none"
                  aria-label="Campo de busca"
                />
              </label>
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setQuery('');
                }}
                className="flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-carvao hover:text-ouro"
              >
                <IconClose />
                Fechar
              </button>
            </div>
          </div>

          {/* Corpo: sidebar + grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-5 py-10 lg:grid-cols-[220px_1fr] lg:gap-14 lg:px-10 lg:py-14">
              {/* Popular Searches */}
              <aside>
                <p className="text-xl text-carvao-soft">Buscas populares</p>
                <ul className="mt-6 flex flex-col gap-4 text-[15px]">
                  {POPULAR_SEARCHES.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => submitSearch(s)}
                        className="text-left text-carvao hover:text-ouro"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Trending / Results */}
              <section>
                <p className="text-xl text-carvao-soft">
                  {query.trim() ? 'Resultados' : 'Em destaque'}
                </p>
                {searchLoading ? (
                  <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square animate-pulse rounded-lg bg-cream-2"
                      />
                    ))}
                  </div>
                ) : products.length === 0 ? (
                  <p className="mt-10 text-carvao-soft">
                    Nenhum produto encontrado para “{query}”.
                  </p>
                ) : (
                  <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((p) => (
                      <Link
                        key={p.id}
                        href={`/produtos/${p.handle}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery('');
                        }}
                        className="group block"
                      >
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-cream-2">
                          {p.featuredImage && (
                            <Image
                              src={p.featuredImage.url}
                              alt={p.featuredImage.altText ?? p.title}
                              fill
                              sizes="(min-width: 1024px) 240px, 45vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          )}
                          <span className="absolute left-3 top-3 bg-cream px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-carvao">
                            Novo
                          </span>
                        </div>
                        <p className="mt-4 font-serif text-[17px] leading-snug text-carvao">
                          {p.title}
                        </p>
                        <p className="mt-1 text-sm text-carvao-soft">
                          {brl(p.priceRange.minVariantPrice.amount)}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
