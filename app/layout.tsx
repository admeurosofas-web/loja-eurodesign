import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const SITE_URL = 'https://www.eurodesign.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'EuroDesign Sofás — Estofados de couro legítimo',
    template: '%s · EuroDesign Sofás',
  },
  description:
    'Sofás e poltronas em couro 100% legítimo, direto da fábrica. Reclinação total, versões manual e elétrica, 1 ano de garantia. Showroom em São Paulo.',
  keywords: [
    'sofá de couro legítimo',
    'poltrona reclinável elétrica',
    'estofados de couro',
    'sofá direto da fábrica',
    'EuroDesign Sofás',
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'EuroDesign Sofás',
    title: 'EuroDesign Sofás — Estofados de couro legítimo',
    description:
      'Sofás e poltronas em couro 100% legítimo, direto da fábrica. Design, conforto e tecnologia.',
    url: SITE_URL,
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FurnitureStore',
  name: 'EuroDesign Sofás',
  image: `${SITE_URL}/og.jpg`,
  url: SITE_URL,
  telephone: '+55-11-91337-1140',
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rod. Anchieta, 1113',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    addressCountry: 'BR',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '10:00',
      closes: '17:00',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-carvao focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="flex-1 pt-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
