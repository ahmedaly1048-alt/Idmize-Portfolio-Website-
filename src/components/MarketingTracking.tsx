'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { isCookieTypeAllowed } from '@/lib/cookieUtils';

/**
 * Facebook Pixel Component
 * Add your Facebook Pixel ID to .env.local:
 * NEXT_PUBLIC_FACEBOOK_PIXEL_ID=YOUR_PIXEL_ID
 */
export function FacebookPixel() {
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

  useEffect(() => {
    if (!pixelId) return;

    const isMarketingAllowed = isCookieTypeAllowed('marketing');
    if (!isMarketingAllowed) return;

    // Initialize Facebook Pixel
    (window as any).fbq?.('init', pixelId);
    (window as any).fbq?.('track', 'PageView');
  }, [pixelId]);

  if (!pixelId || !isCookieTypeAllowed('marketing')) {
    return null;
  }

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

/**
 * Google Ads Conversion Tracking Component
 * Add your Google Ads conversion ID to .env.local:
 * NEXT_PUBLIC_GOOGLE_ADS_ID=YOUR_CONVERSION_ID
 */
export function GoogleAdsTracking() {
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  useEffect(() => {
    if (!adsId) return;

    const isMarketingAllowed = isCookieTypeAllowed('marketing');
    if (!isMarketingAllowed) return;

    // Initialize Google Ads conversion tracking
    if ((window as any).gtag) {
      (window as any).gtag('config', adsId);
    }
  }, [adsId]);

  if (!adsId || !isCookieTypeAllowed('marketing')) {
    return null;
  }

  return (
    <Script
      id="google-ads-tracking"
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`}
      async
    />
  );
}

/**
 * LinkedIn Insight Tag Component
 * Add your LinkedIn Partner ID to .env.local:
 * NEXT_PUBLIC_LINKEDIN_PARTNER_ID=YOUR_PARTNER_ID
 */
export function LinkedInInsight() {
  const partnerId = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;

  useEffect(() => {
    if (!partnerId) return;

    const isMarketingAllowed = isCookieTypeAllowed('marketing');
    if (!isMarketingAllowed) return;

    // Initialize LinkedIn Insight Tag
    if ((window as any)._linkedin_data_partner_ids) {
      (window as any)._linkedin_data_partner_ids.push(partnerId);
    }
  }, [partnerId]);

  if (!partnerId || !isCookieTypeAllowed('marketing')) {
    return null;
  }

  return (
    <Script
      id="linkedin-insight"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          _linkedin_partner_id = "${partnerId}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        `,
      }}
    />
  );
}
