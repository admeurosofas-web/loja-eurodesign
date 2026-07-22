"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Logo from "@/components/Logo";

const LINKS = [
  { href: "/produtos", label: "Coleção" },
  { href: "/produtos?q=couro", label: "Couro legítimo" },
  { href: "/produtos?q=reclinável", label: "Reclináveis elétricos" },
  { href: "/produtos?q=poltrona", label: "Poltronas" },
  { href: "/produtos?q=chesterfield", label: "Chesterfield" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isActive = (href: string) => {
    const [hrefPath, hrefQuery = ""] = href.split("?");
    if (hrefPath !== pathname) return false;
    const hrefParams = new URLSearchParams(hrefQuery);
    const currentParams = new URLSearchParams(searchParams.toString());
    if (hrefParams.toString() === "") return currentParams.toString() === "";
    for (const [k, v] of hrefParams.entries()) {
      if (currentParams.get(k) !== v) return false;
    }
    return true;
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
        className="flex items-center gap-2 text-[13px] uppercase tracking-[0.16em] text-cream hover:text-marca"
      >
        <span className="flex flex-col gap-[5px]">
          <span className="h-px w-5 bg-current" />
          <span className="h-px w-5 bg-current" />
        </span>
        Menu
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-carvao/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <nav
            className="glass-panel fixed inset-y-0 left-0 z-[70] flex w-[86%] max-w-sm flex-col px-7 py-6 backdrop-blur-2xl backdrop-saturate-150"
            aria-label="Menu principal"
          >
            <div className="flex items-center justify-between border-b border-linha pb-5">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="text-2xl leading-none text-carvao-soft"
              >
                ×
              </button>
            </div>

            <ul className="mt-2 flex flex-col divide-y divide-linha">
              {LINKS.map((l) => {
                const active = isActive(l.href);
                return (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 py-4 font-serif text-2xl transition-colors ${
                        active
                          ? "text-marca"
                          : "text-carvao hover:text-ouro"
                      }`}
                    >
                      {active && (
                        <span
                          aria-hidden
                          className="inline-block h-[2px] w-6 bg-marca"
                        />
                      )}
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto border-t border-linha pt-6 text-sm text-carvao-soft">
              <a href="https://wa.me/5511913371140" className="block py-1 hover:text-ouro">
                WhatsApp (11) 91337-1140
              </a>
              <p className="mt-3 text-xs leading-relaxed">
                Rod. Anchieta, 1113 — Sacomã, SP
                <br />
                Seg–Sáb 9h–18h · Dom 10h–17h
              </p>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
