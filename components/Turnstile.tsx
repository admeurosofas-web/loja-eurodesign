'use client';

import { useEffect, useRef } from 'react';

type Props = {
  onSuccess?: (token: string) => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
        }
      ) => string;
      remove?: (widgetId: string) => void;
    };
  }
}

export default function Turnstile({ onSuccess }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    if (!siteKey) {
      console.error('NEXT_PUBLIC_TURNSTILE_SITE_KEY não configurada');
      return;
    }

const validSiteKey = siteKey;
    function renderWidget() {
      if (
        window.turnstile &&
        containerRef.current &&
        !widgetIdRef.current
      ) {
        widgetIdRef.current = window.turnstile.render(
          containerRef.current,
          {
         sitekey: validSiteKey, 
            theme: 'light',

            callback: (token: string) => {
              onSuccess?.(token);
            },

            'error-callback': () => {
              console.error('Erro no Cloudflare Turnstile');
              onSuccess?.('');
            },

            'expired-callback': () => {
              onSuccess?.('');
            },
          }
        );
      }
    }

    const existingScript = document.querySelector(
      'script[src*="challenges.cloudflare.com/turnstile"]'
    );

    if (existingScript) {
      if (window.turnstile) {
        renderWidget();
      } else {
        existingScript.addEventListener('load', renderWidget);
      }
    } else {
      const script = document.createElement('script');

      script.src =
        'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

      script.async = true;
      script.defer = true;
      script.onload = renderWidget;

      document.head.appendChild(script);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [onSuccess]);

  return <div ref={containerRef} />;
}