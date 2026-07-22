import Link from 'next/link';
import Logo from '@/components/Logo';

const COLUNAS = [
  {
    titulo: 'Coleção',
    links: [
      { href: '/produtos', label: 'Todos os modelos' },
      { href: '/produtos?q=couro', label: 'Couro legítimo' },
      { href: '/produtos?q=reclinável', label: 'Reclináveis elétricos' },
      { href: '/produtos?q=poltrona', label: 'Poltronas' },
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

export default function Footer() {
  return (
    <footer className="border-t border-linha bg-carvao">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo height={150} />
            <p className="mt-5 max-w-[34ch] text-sm text-cream">
              Estofados de couro legítimo, feitos para durar. Design, conforto e
              tecnologia — direto da fábrica.
            </p>
            <a
              href="https://wa.me/5511913371140"
              target="_blank"
              rel="noopener"
              className="mt-6 inline-block border-b border-marca pb-1 text-sm tracking-wide text-marca hover:transition-colors hover:border-ouro hover:text-ouro"
            >
              (11) 91337-1140 · WhatsApp
            </a>
          </div>

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

        <div className="mt-14 flex flex-col gap-3 border-t border-ouro-l pt-8 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} EuroDesign Sofás. Todos os direitos
            reservados.
          </p>
          <p>Couro 100% legítimo · 1 ano de garantia · Pagamento seguro</p>
        </div>
      </div>
    </footer>
  );
}
