import Cookies from 'js-cookie';
import { CookieConsent, COOKIE_CONSENT_KEY } from './cookieConfig';

// Get all cookie consents
export const getCookieConsent = (): CookieConsent | null => {
  const consent = Cookies.get(COOKIE_CONSENT_KEY);
  if (!consent) return null;
  try {
    return JSON.parse(consent);
  } catch {
    return null;
  }
};

// Set cookie consent
export const setCookieConsent = (consent: CookieConsent): void => {
  Cookies.set(COOKIE_CONSENT_KEY, JSON.stringify(consent), {
    expires: 365,
    secure: true,
    sameSite: 'Lax',
  });
};

// Check if a specific cookie type is consented
export const isCookieTypeAllowed = (type: keyof CookieConsent): boolean => {
  const consent = getCookieConsent();
  if (!consent) return false;
  return consent[type] ?? false;
};

// Initialize essential cookies (always set)
export const initializeEssentialCookies = (): void => {
  const consent = getCookieConsent();
  if (!consent) {
    // Initialize with essential only
    setCookieConsent({
      essential: true,
      analytics: false,
      marketing: false,
    });
  }
};

// Clear all non-essential cookies
export const clearNonEssentialCookies = (): void => {
  // Remove analytics cookies
  if (!isCookieTypeAllowed('analytics')) {
    clearAnalyticsCookies();
  }
  // Remove marketing cookies
  if (!isCookieTypeAllowed('marketing')) {
    clearMarketingCookies();
  }
};

// Clear analytics cookies
export const clearAnalyticsCookies = (): void => {
  // Google Analytics cookies
  Cookies.remove('_ga');
  Cookies.remove('_ga_' + process.env.NEXT_PUBLIC_GA_ID);
  Cookies.remove('_gid');
  Cookies.remove('_gat');
};

// Clear marketing cookies
export const clearMarketingCookies = (): void => {
  // Facebook Pixel cookies
  Cookies.remove('fr');
  Cookies.remove('_fbp');
  // Google Ads cookies
  Cookies.remove('_gcl_au');
};

// Reset consent (user changes settings)
export const resetCookieConsent = (newConsent: CookieConsent): void => {
  setCookieConsent(newConsent);
  clearNonEssentialCookies();
};
