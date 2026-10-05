import Link from 'next/link';
import Logo from '@/components/Logo';

const COLUNAS = [
  {
    titulo: 'Showroom',
    links: [
      { href: '/produtos', label: 'Todos os modelos' },
      { href: '/produtos?q=reclinável', label: 'Reclináveis' },
      { href: '/produtos?q=poltrona', label: 'Poltronas' },
      { href: '/produtos?q=conjunto', label: 'Conjuntos' },
    ],
  },
  {
    titulo: 'A EuroDesign',
    links: [
      { href: '/#historia', label: 'Nossa história' },
      { href: '/#couro', label: 'Por que couro legítimo' },
      { href: '/#showroom', label: 'Showroom' },
    ],
  },
];

const REDES_SOCIAIS = [
  {
    nome: 'Instagram',
    href: 'https://www.instagram.com/eurodesigncouro/',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    nome: 'Facebook',
    href: 'https://www.facebook.com/euromoveisdesign',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13.5 22v-9h3l.45-3.5H13.5V7.25c0-1.01.28-1.7 1.73-1.7H17V2.42A23.5 23.5 0 0 0 14.42 2C11.87 2 10.1 3.56 10.1 6.43V9.5H7.2V13h2.9v9h3.4Z" />
      </svg>
    ),
  },
  {
    nome: 'YouTube',
    href: 'https://www.youtube.com/@eurodesignmoveis',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12s0-4-1-5.5c-.55-.82-1.3-1-2.1-1.1C16.1 5.2 12 5.2 12 5.2s-4.1 0-5.9.2c-.8.1-1.55.28-2.1 1.1C3 8 3 12 3 12s0 4 1 5.5c.55.82 1.3 1 2.1 1.1 1.8.2 5.9.2 5.9.2s4.1 0 5.9-.2c.8-.1 1.55-.28 2.1-1.1C21 16 21 12 21 12Z" />
        <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    nome: 'TikTok',
    href: 'https://www.tiktok.com/@eurodesign_',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M15.5 3c.35 1.95 1.48 3.13 3.5 3.5v3.1a9.2 9.2 0 0 1-3.45-.8v6.1a6.05 6.05 0 1 1-5.22-5.99v3.18a2.95 2.95 0 1 0 2.12 2.81V3h3.05Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-linha bg-carvao">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Logo + descrição */}
          <div>
            <Logo height={150} />

            <p className="mt-5 max-w-[34ch] text-sm text-cream">
              Estofados de couro legítimo, feitos para durar. Design, conforto e
              tecnologia — direto da fábrica.
            </p>

            <a
              href="https://wa.me/5511913371140"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block border-b border-marca pb-1 text-sm tracking-wide text-marca transition-colors hover:border-ouro hover:text-ouro"
            >
              (11) 91337-1140 · WhatsApp
            </a>

            {/* Redes sociais */}
            <div className="mt-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-cream/60">
                Siga a EuroDesign
              </p>

              <div className="mt-4 flex items-center gap-3">
                {REDES_SOCIAIS.map((rede) => (
                  <a
                    key={rede.nome}
                    href={rede.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`EuroDesign no ${rede.nome}`}
                    title={rede.nome}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream transition-all duration-300 hover:border-marca hover:bg-marca hover:text-carvao"
                  >
                    <span className="h-[18px] w-[18px]">
                      {rede.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Colunas */}
          {COLUNAS.map((col) => (
            <nav key={col.titulo} aria-label={col.titulo}>
              <p className="text-[12px] uppercase tracking-[0.2em] text-cream">
                {col.titulo}
              </p>

              <ul className="mt-5 space-y-3 text-sm text-cream">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="transition-colors hover:text-marca"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Endereço */}
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-cream">
              Endereço / Atendimento
            </p>

            <address className="mt-5 space-y-2 text-sm not-italic text-cream">
              <p>Rod. Anchieta, 1113</p>
              <p>Sacomã — São Paulo, SP</p>
              <p className="pt-2">Seg–Sáb: 9h às 18h</p>
              <p>Domingo: 10h às 17h</p>
            </address>
          </div>
        </div>

        {/* Linha inferior */}
        <div className="mt-14 flex flex-col gap-3 border-t border-ouro-l pt-8 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} EuroDesign Sofás. Todos os direitos
            reservados.
          </p>

          <p>
            Couro 100% legítimo · 1 ano de garantia · Pagamento seguro
          </p>
        </div>
      </div>
    </footer>
  );
}