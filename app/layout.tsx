import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';
import Script from "next/script";

const SITE_URL = 'https://www.eurodesign.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'Euro Design — 59 anos de excelência em estofados de couro legítimo',
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
    title: 'Euro Design — 59 anos de excelência em estofados de couro legítimo',
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
<head><link rel="preconnect" href="https://fonts.googleapis.com" /><link
  rel="preconnect"
  href="https://fonts.gstatic.com"
  crossOrigin=""
/><link
  href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Roboto:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/><script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
/></head>
    <body className="flex min-h-screen flex-col">
  <Script
    id="google-tag-manager"
    strategy="beforeInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-5XZ4LRPP');
      `,
    }}
  />

<noscript>
  <iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-5XZ4LRPP"
    height="0"
    width="0"
    style={{ display: "none", visibility: "hidden" }}
  />
</noscript>
{/* End Google Tag Manager (noscript) */}
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-carvao focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
        >
          Pular para o conteúdo
        </a>
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <main id="conteudo" className="flex-1 pt-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
