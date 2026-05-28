# Marketing & Ad Tracking Setup Guide

This guide explains how to set up additional marketing and advertising tracking services beyond the basic analytics.

## Available Marketing Tracking Components

### 1. Facebook Pixel

Track user actions on your website and create custom audiences for retargeting.

**Setup Steps:**
1. Go to https://business.facebook.com/
2. Create/access your Business Account
3. Navigate to Events Manager
4. Create a new Web pixel
5. Copy your Pixel ID
6. Add to `.env.local`:
   ```
   NEXT_PUBLIC_FACEBOOK_PIXEL_ID=YOUR_PIXEL_ID
   ```

**Track Events:**
```typescript
// Track purchase
(window as any).fbq?.('track', 'Purchase', {value: '0.00', currency: 'USD'});

// Track lead
(window as any).fbq?.('track', 'Lead');

// Track custom event
(window as any).fbq?.('track', 'CustomEvent');
```

### 2. Google Ads Conversion Tracking

Track conversions and create remarketing audiences for Google Ads campaigns.

**Setup Steps:**
1. Go to https://ads.google.com/
2. Navigate to Tools → Conversions
3. Create a new conversion action
4. Get your Conversion ID
5. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_ADS_ID=YOUR_CONVERSION_ID
   ```

**Track Conversions:**
```typescript
// In your conversion page/component
(window as any).gtag?.('event', 'conversion', {
  'value': 0.0,
  'currency': 'USD'
});
```

### 3. LinkedIn Insight Tag

Track website visitors and create audiences for LinkedIn ad campaigns.

**Setup Steps:**
1. Go to https://business.linkedin.com/
2. Navigate to Campaign Manager
3. Go to Accounts → Account Assets → Insight Tag
4. Copy your Partner ID
5. Add to `.env.local`:
   ```
   NEXT_PUBLIC_LINKEDIN_PARTNER_ID=YOUR_PARTNER_ID
   ```

## Adding Marketing Tracking to Your Layout

Once you have your IDs configured, add the marketing components to your layout:

**src/app/layout.tsx:**

```typescript
import MarketingTracking from '@/components/MarketingTracking';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics />
        <CookieConsent />
        <MarketingTracking />
      </body>
    </html>
  );
}
```

Or import individual components:

```typescript
import { FacebookPixel, GoogleAdsTracking, LinkedInInsight } from '@/components/MarketingTracking';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics />
        <CookieConsent />
        <FacebookPixel />
        <GoogleAdsTracking />
        <LinkedInInsight />
      </body>
    </html>
  );
}
```

## Common Marketing Events to Track

### Purchase/Conversion
```typescript
// Facebook
(window as any).fbq?.('track', 'Purchase', {
  value: amount,
  currency: 'USD'
});

// Google Ads
(window as any).gtag?.('event', 'conversion', {
  value: amount,
  currency: 'USD'
});
```

### Lead/Sign Up
```typescript
// Facebook
(window as any).fbq?.('track', 'Lead', {
  currency: 'USD',
  value: value
});

// Google Ads
(window as any).gtag?.('event', 'lead', {
  value: value,
  currency: 'USD'
});
```

### Custom Events
```typescript
// Facebook
(window as any).fbq?.('track', 'ViewContent', {
  content_ids: ['123', '456'],
  content_type: 'product'
});

// Google
(window as any).gtag?.('event', 'view_item', {
  items: [
    {
      item_id: '123',
      item_name: 'Product Name',
      price: 29.99
    }
  ]
});
```

## Consent Integration

All marketing tracking respects user consent:
- Marketing pixels only load if `NEXT_PUBLIC_FACEBOOK_PIXEL_ID`, etc. are set AND user has consented to marketing cookies
- Cookies are automatically cleared when user withdraws consent
- No data is sent to marketing platforms without explicit permission

## Audience Creation & Retargeting

Once tracking is set up, you can create audiences:

**Facebook:**
1. Go to Audiences in Ads Manager
2. Create Custom Audience → Website Traffic
3. Select your pixel and create rules
4. Use in campaigns for retargeting

**Google Ads:**
1. Go to Audiences
2. Create Remarketing List
3. Select Website Visitors
4. Configure list settings
5. Use in campaigns

**LinkedIn:**
1. Go to Account Assets → Matched Audiences
2. Create Website Audience
3. Use your insight tag
4. Configure parameters
5. Use for targeting

## Privacy Considerations

- All marketing tracking respects user cookie consent
- Use anonymized data where possible
- Comply with GDPR, CCPA, and local regulations
- Provide clear privacy policy
- Offer easy opt-out mechanism
- Don't track children under 13 (COPPA)

## Testing & Validation

1. **Chrome DevTools:**
   - Open DevTools → Network
   - Look for calls to pixel/tracking domains
   - Verify IDs are correct

2. **Pixel Helper Extensions:**
   - Facebook Pixel Helper
   - Google Analytics Debugger
   - LinkedIn Insight Tag Helper

3. **Verify Events:**
   - Use platform dashboards
   - Check if events are being tracked
   - Review event parameters

## Troubleshooting

### Events not showing in Facebook Ads Manager:
- Verify pixel ID is correct
- Check consent is given (check cookie_consent in browser storage)
- Wait 15 minutes for data to appear
- Use Pixel Helper to debug

### Google Ads conversions not tracking:
- Verify conversion ID is correct
- Ensure cookies are enabled
- Check browser privacy settings
- Wait 24 hours for data to appear

### LinkedIn data not showing:
- Verify Partner ID is correct
- Wait up to 48 hours for data
- Check Account Filters in Matched Audiences
- Verify pixel is firing in DevTools
