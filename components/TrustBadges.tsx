import Reveal from '@/components/Reveal';

type Badge = {
  label: string;
  icon: React.ReactNode;
};

/** Selos de confiança. Ícones preenchidos (fill). */
const BADGES: Badge[] = [
  {
    label: 'Fabricação Própria',
    icon: (
      <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
        <path d="M5 42a1 1 0 0 1-1-1V22.5a1 1 0 0 1 1.5-.87L14 26.6v-4.1a1 1 0 0 1 1.5-.87L24 26.6V16a1 1 0 0 1 .2-.6l3.5-4.7a1 1 0 0 1 1.6 0L34 15.4a1 1 0 0 1 .2.6v25a1 1 0 0 1-1 1H5z" />
      </svg>
    ),
  },
  {
    label: 'Garantia de 1 ano',
    icon: (
      <svg viewBox="0 0 48 48" fill="currentColor" fillRule="evenodd" clipRule="evenodd" aria-hidden="true">
        <path d="M24 5l3.8 2.9 4.8-.9.9 4.8 4 2.8-1.9 4.6 1.9 4.6-4 2.8-.9 4.8-4.8-.9L24 38.6l-3.8-2.9-4.8.9-.9-4.8-4-2.8 1.9-4.6-1.9-4.6 4-2.8.9-4.8 4.8.9L24 5zm-2 20.8l-3.1-3.1-2.3 2.3 5.4 5.4 9.4-9.4-2.3-2.3-7.1 7.1z" />
      </svg>
    ),
  },
  {
    label: 'Design Exclusivo',
    icon: (
      <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
        <path d="M12 20v-5a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v5a5 5 0 0 0-4 4.9V27H16v-2.1A5 5 0 0 0 12 20z" />
        <path d="M10 22a4 4 0 0 1 4 4v3h20v-3a4 4 0 0 1 8 0v11a1 1 0 0 1-1 1h-2v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2H14v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2H7a1 1 0 0 1-1-1V26a4 4 0 0 1 4-4z" />
      </svg>
    ),
  },
  {
    label: 'Couro Legítimo',
    icon: (
      <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
        <path d="M13 9c-3 2-5 5-5 8 0 2 1 3 1 5s-2 3-2 6 3 5 7 5c3 0 4-2 7-2s5 3 9 3c5 0 8-3 8-7 0-3-2-4-2-7s2-4 2-7-3-6-7-6c-3 0-5 2-8 2s-4-3-10-3z" />
      </svg>
    ),
  },
];

/**
 * Card de selos flutuante, com o mesmo visual glass do Header
 * (`glass-nav` — carvão translúcido + blur + shadow, texto cream, ícone dourado).
 * Fica montado na emenda entre o hero e a seção seguinte (ver posicionamento em page.tsx).
 */
export default function TrustBadges() {
  return (
    <div className="mx-auto max-w-350 px-6 lg:px-10">
      <div className="glass-nav w-full rounded-lg border border-white/12 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xs backdrop-saturate-150">
        <div className="grid grid-cols-2 gap-y-10 px-6 py-10 md:grid-cols-4 lg:px-12 lg:py-12">
          {BADGES.map((badge, i) => (
            <Reveal key={badge.label} delay={i * 90}>
              <div className="flex flex-col items-center gap-4 text-center">
                <span className="h-12 w-12 text-marca">{badge.icon}</span>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-cream">
                  {badge.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
