// Cookie configuration for different consent types
export enum CookieType {
  ESSENTIAL = 'essential',
  ANALYTICS = 'analytics',
  MARKETING = 'marketing',
}

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const COOKIE_CONSENT_KEY = 'idmize_cookie_consent';
export const COOKIE_CONSENT_VERSION = '1.0';

export const cookieDescriptions = {
  essential: {
    title: 'Essential Cookies',
    description:
      'Essential cookies help make a website usable by enabling basic functions like page navigation and access to secure areas. The website cannot function properly without these cookies.',
    required: true,
  },
  analytics: {
    title: 'Analytics Cookies',
    description:
      'Analytics cookies help us understand how visitors interact with our website. This information helps us improve our services and optimize user experience.',
    required: false,
  },
  marketing: {
    title: 'Marketing Cookies',
    description:
      'Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.',
    required: false,
  },
};
