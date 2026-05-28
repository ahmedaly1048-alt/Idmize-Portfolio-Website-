# Cookie Management Setup Guide

This project now includes a comprehensive cookie management system with consent banner, analytics tracking, and marketing cookie support.

## Features

✅ **Essential Cookies** - Site functionality (always enabled)
✅ **Analytics Cookies** - Google Analytics tracking
✅ **Marketing Cookies** - Ad tracking (Facebook Pixel, Google Ads)

## Setup Instructions

### 1. Environment Configuration

Copy `.env.local.example` to `.env.local` and add your Google Analytics ID:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Get your Google Analytics ID from: https://analytics.google.com/

### 2. Files Created

- **src/lib/cookieConfig.ts** - Cookie configuration and types
- **src/lib/cookieUtils.ts** - Cookie management utilities
- **src/components/CookieConsent.tsx** - Cookie consent banner UI
- **src/components/GoogleAnalytics.tsx** - Google Analytics integration
- **src/types/cookies.d.ts** - TypeScript type definitions

### 3. How It Works

1. **First Visit**: Users see a cookie consent banner
2. **Essential Cookies**: Always enabled (required for site functionality)
3. **Analytics**: Optional - tracks site usage with Google Analytics
4. **Marketing**: Optional - enables ad tracking cookies

### 4. Cookie Types

#### Essential (Required)
- Session management
- Site security
- User preferences
- Form submissions

#### Analytics
- Google Analytics (_ga, _gid, _gat)
- User behavior tracking
- Performance metrics
- Anonymized usage data

#### Marketing
- Facebook Pixel (fr, _fbp)
- Google Ads (_gcl_au)
- Retargeting campaigns
- Ad performance tracking

### 5. User Controls

Users can:
- Accept all cookies
- Reject non-essential cookies
- Customize individual cookie preferences
- View detailed cookie descriptions

### 6. Storing User Preferences

Preferences are stored in browser cookies and persist for 1 year. Users can change preferences anytime by:
- Clearing the `idmize_cookie_consent` cookie
- Using browser settings to manage cookies

### 7. Integration with Backend

To access consent status in your code:

```typescript
import { isCookieTypeAllowed } from '@/lib/cookieUtils';

// Check if analytics is allowed
if (isCookieTypeAllowed('analytics')) {
  // Send analytics data
}

// Check if marketing is allowed
if (isCookieTypeAllowed('marketing')) {
  // Enable marketing pixels
}
```

### 8. Adding More Analytics Services

To add more tracking services (e.g., Mixpanel, Segment):

1. Update `cookieConfig.ts` to add new cookie types
2. Create conditional scripts in components based on consent
3. Check consent before tracking: `isCookieTypeAllowed('analytics')`

### 9. GDPR Compliance

This setup helps with:
- Explicit consent collection
- Cookie transparency
- User control over data
- Easy opt-out mechanism
- Consent preference storage

### 10. Next Steps

- [ ] Set up Google Analytics ID
- [ ] Test cookie banner on first visit
- [ ] Add Facebook Pixel if needed
- [ ] Customize banner styling to match your brand
- [ ] Add cookie policy page link
- [ ] Set up privacy policy (required by GDPR/CCPA)

## Notes

- Essential cookies cannot be disabled
- Cookie preferences are stored for 365 days
- Non-essential cookies are cleared if consent is withdrawn
- Analytics only loads if user consents
