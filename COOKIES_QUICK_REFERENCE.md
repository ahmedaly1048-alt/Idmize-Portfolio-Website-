# Cookie Management System - Quick Reference

## What's Been Set Up

Your Idmize website now has a complete cookie management system with:

### ✅ Essential Cookies (Auto-enabled)
- Site functionality
- Security
- User preferences
- Form data

### ✅ Analytics Cookies (Optional - User Controlled)
- Google Analytics integration
- User behavior tracking
- Performance metrics

### ✅ Marketing Cookies (Optional - User Controlled)
- Facebook Pixel support
- Google Ads conversion tracking
- LinkedIn Insight Tag
- Remarketing capability

## Files Created

### Core System
- `src/lib/cookieConfig.ts` - Cookie types and configuration
- `src/lib/cookieUtils.ts` - Cookie management functions
- `src/components/CookieConsent.tsx` - Consent banner UI
- `src/components/GoogleAnalytics.tsx` - Google Analytics integration
- `src/components/MarketingTracking.tsx` - Optional marketing trackers

### Configuration
- `.env.local.example` - Environment variable template
- `src/types/cookies.d.ts` - TypeScript definitions

### Documentation
- `COOKIE_SETUP.md` - Basic setup guide (this file)
- `MARKETING_TRACKING_SETUP.md` - Advanced marketing setup
- `PRIVACY_POLICY_TEMPLATE.md` - Legal templates

## Quick Start (5 Minutes)

1. **Set up Google Analytics ID:**
   ```bash
   # Copy environment template
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
   
   Get your ID from: https://analytics.google.com/

2. **Test it:**
   ```bash
   npm run dev
   ```
   
   Visit http://localhost:3000 in a new browser or incognito window

3. **Verify:**
   - See cookie banner on first visit
   - Try accepting/rejecting cookies
   - Check browser DevTools → Application → Cookies

## Usage Examples

### Check if user consented to analytics:
```typescript
import { isCookieTypeAllowed } from '@/lib/cookieUtils';

if (isCookieTypeAllowed('analytics')) {
  // Send analytics data
  console.log('User consented to analytics');
}
```

### Get all user's cookie preferences:
```typescript
import { getCookieConsent } from '@/lib/cookieUtils';

const consent = getCookieConsent();
console.log('Essential:', consent?.essential);
console.log('Analytics:', consent?.analytics);
console.log('Marketing:', consent?.marketing);
```

### Manually update preferences:
```typescript
import { setCookieConsent } from '@/lib/cookieUtils';

setCookieConsent({
  essential: true,
  analytics: true,
  marketing: false
});
```

## Adding Marketing Services (Optional)

### Facebook Pixel:
1. Get Pixel ID from Facebook Business Manager
2. Add to `.env.local`:
   ```
   NEXT_PUBLIC_FACEBOOK_PIXEL_ID=YOUR_PIXEL_ID
   ```
3. Import in layout:
   ```typescript
   import { FacebookPixel } from '@/components/MarketingTracking';
   ```

### Google Ads:
1. Get Conversion ID from Google Ads
2. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_ADS_ID=YOUR_CONVERSION_ID
   ```
3. Import in layout:
   ```typescript
   import { GoogleAdsTracking } from '@/components/MarketingTracking';
   ```

See `MARKETING_TRACKING_SETUP.md` for detailed instructions.

## How Users See It

1. **First Visit:**
   - Banner appears at bottom of screen
   - User can see cookie categories
   - Three actions: Reject All, Save Preferences, Accept All

2. **Returning Visits:**
   - No banner (preferences remembered)
   - User can change settings anytime

3. **Cookie Details:**
   - Click "Cookie Details" to expand
   - See required vs optional
   - Toggle individual preferences
   - View descriptions

## Testing Checklist

- [ ] Banner shows on new/incognito browser
- [ ] Cookies are set correctly (DevTools → Application)
- [ ] Rejecting clears non-essential cookies
- [ ] Accepting enables all cookies
- [ ] Preferences persist across visits
- [ ] Google Analytics initializes when consented
- [ ] Console shows no errors

## Common Tasks

### Track a custom event:
```typescript
// In a component
(window as any).gtag?.('event', 'button_click', {
  'button_name': 'CTA Button'
});
```

### Track a conversion:
```typescript
// When user completes action
(window as any).gtag?.('event', 'conversion', {
  'value': 99.99,
  'currency': 'USD'
});
```

### Programmatically show consent again:
```typescript
// Force banner to show
localStorage.removeItem('idmize_cookie_consent');
location.reload();
```

## Browser Compatibility

- Chrome/Edge: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported
- IE 11: ⚠️ Requires polyfills

## Performance Impact

- Banner: ~5 KB
- Core utils: ~2 KB
- Google Analytics: ~50 KB (only if enabled)
- Total: ~60 KB (gzipped: ~15 KB)

## GDPR/CCPA Compliance

✅ Explicit consent before non-essential cookies
✅ Easy to access and change preferences
✅ Essential cookies explained as required
✅ Third-party services disclosed
✅ Cookies cleared when consent withdrawn
✅ User data not sold

See `PRIVACY_POLICY_TEMPLATE.md` for legal compliance.

## Troubleshooting

### Banner not showing:
1. Clear browser cache
2. Use incognito window
3. Check `idmize_cookie_consent` in DevTools

### Google Analytics not tracking:
1. Verify GA ID is correct
2. Check if analytics cookie is consented
3. Wait 24 hours for data
4. Use Google Analytics Debugger extension

### Cookies not persisting:
1. Check if 3rd-party cookies enabled
2. Browser privacy mode may block cookies
3. Verify cookie settings in utils

## Next Steps

1. ✅ **Immediate:** Set up Google Analytics ID
2. ✅ **Soon:** Customize banner styling
3. ✅ **Soon:** Add privacy policy page
4. ⭐ **Optional:** Add marketing services (Facebook, LinkedIn)
5. ⭐ **Optional:** Custom tracking events

## Support Resources

- [js-cookie docs](https://github.com/js-cookie/js-cookie)
- [Google Analytics help](https://support.google.com/analytics)
- [GDPR.eu guide](https://gdpr.eu/)
- [CCPA FAQ](https://oag.ca.gov/privacy/ccpa)

## Questions?

Refer to:
- `COOKIE_SETUP.md` - Technical setup
- `MARKETING_TRACKING_SETUP.md` - Ad tracking
- `PRIVACY_POLICY_TEMPLATE.md` - Legal/compliance
- Code comments - Implementation details
