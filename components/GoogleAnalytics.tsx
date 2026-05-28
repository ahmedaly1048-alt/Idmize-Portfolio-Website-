'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { isCookieTypeAllowed } from '@/lib/cookieUtils';

declare global {
  interface Window {
    gtag: Function;
    dataLayer: any[];
  }
}

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (!gaId) return;

    const isAnalyticsAllowed = isCookieTypeAllowed('analytics');

    // Set initial consent state
    window.gtag?.('consent', 'default', {
      analytics_storage: isAnalyticsAllowed ? 'granted' : 'denied',
    });
  }, [gaId]);

  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
        async
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
            });
          `,
        }}
      />
    </>
  );
}
