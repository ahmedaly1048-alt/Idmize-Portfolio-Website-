'use client';

import { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, Settings, Shield, Info, Cookie } from 'lucide-react';
import {
  getCookieConsent,
  setCookieConsent,
  resetCookieConsent,
  initializeEssentialCookies,
} from '@/lib/cookieUtils';
import { CookieConsent as ICookieConsent, cookieDescriptions } from '@/lib/cookieConfig';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cookies, setCookies] = useState<ICookieConsent>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = getCookieConsent();
    if (!consent) {
      initializeEssentialCookies();
      setShowBanner(true);
    } else {
      setCookies(consent);
    }
  }, []);

  const handleAcceptAll = () => {
    const newConsent: ICookieConsent = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    setCookieConsent(newConsent);
    setCookies(newConsent);
    setShowBanner(false);
    triggerAnalytics();
  };

  const handleRejectAll = () => {
    const newConsent: ICookieConsent = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    resetCookieConsent(newConsent);
    setCookies(newConsent);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    resetCookieConsent(cookies);
    setShowBanner(false);
    if (cookies.analytics) {
      triggerAnalytics();
    }
  };

  const handleToggleCookie = (type: keyof ICookieConsent) => {
    if (type === 'essential') return;
    setCookies((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const triggerAnalytics = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
      {/* Backdrop overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" />
      
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
          }
        }
        .banner-animate {
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .details-animate {
          animation: fadeIn 0.3s ease-out;
        }
        .glow-pulse {
          animation: pulseGlow 2s infinite;
        }
      `}</style>
      
      <div className="pointer-events-auto w-full banner-animate relative z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 mb-6 md:mb-8">
          {/* Main Banner Card */}
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-2xl border border-slate-700 shadow-2xl shadow-black/40 overflow-hidden glow-pulse">
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-20 blur-xl" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-pulse" />
            
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
              backgroundSize: '16px 16px'
            }} />
            
            <div className="relative p-6 md:p-7">
              {/* Header with icon */}
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md opacity-50" />
                    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <Cookie className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      We Value Your Privacy
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Help us improve your experience
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowBanner(false)}
                  className="text-slate-500 hover:text-slate-300 transition-all duration-200 hover:scale-110 p-1.5 hover:bg-white/10 rounded-lg"
                  aria-label="Close cookie banner"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Description - more prominent */}
              <div className="mb-5 p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-sm text-slate-300 leading-relaxed">
                  We use cookies and similar technologies to provide you with a better, faster, and safer experience. 
                  Some cookies are necessary for the website to function, while others help us understand how you use our site.
                </p>
              </div>

              {/* Expandable Details Toggle */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-xs font-medium text-blue-400 hover:text-blue-300 transition-all duration-200 mb-5 group"
              >
                <div className="p-1 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <Settings size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                </div>
                <span className="font-semibold">{showDetails ? 'Hide cookie preferences' : 'Customize your cookie preferences'}</span>
                {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {/* Details Section - enhanced styling */}
              {showDetails && (
                <div className="details-animate mb-6 space-y-3">
                  {(Object.keys(cookieDescriptions) as Array<keyof typeof cookieDescriptions>).map(
                    (type) => (
                      <label
                        key={type}
                        className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200 cursor-pointer group border border-slate-700 hover:border-slate-600"
                      >
                        <input
                          type="checkbox"
                          checked={cookies[type]}
                          onChange={() => handleToggleCookie(type)}
                          disabled={type === 'essential'}
                          className={`mt-0.5 w-4.5 h-4.5 rounded border-2 flex-shrink-0 transition-all duration-200 ${
                            type === 'essential'
                              ? 'bg-blue-600/30 border-blue-500/50 cursor-not-allowed'
                              : 'border-slate-500 bg-transparent cursor-pointer hover:border-blue-400'
                          } ${cookies[type] && type !== 'essential' ? 'bg-blue-500 border-blue-500' : ''}`}
                          style={{
                            accentColor: type === 'essential' ? '#3b82f6' : undefined,
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center flex-wrap gap-2 mb-1">
                            <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                              {cookieDescriptions[type].title}
                            </span>
                            {type === 'essential' && (
                              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-medium">
                                Always Active
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {cookieDescriptions[type].description}
                          </p>
                        </div>
                      </label>
                    )
                  )}
                </div>
              )}

              {/* Action Buttons - more prominent */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                {!showDetails ? (
                  <>
                    <button
                      onClick={handleRejectAll}
                      className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all duration-200 hover:shadow-lg border border-slate-700"
                    >
                      Reject All
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:scale-105"
                    >
                      Accept All Cookies
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setShowDetails(false)}
                      className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all duration-200 border border-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSavePreferences}
                      className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/30"
                    >
                      Save My Preferences
                    </button>
                  </>
                )}
              </div>

              {/* Footer note */}
              <div className="mt-5 pt-4 border-t border-slate-700/50">
                <p className="text-[11px] text-slate-500 flex items-center justify-center gap-2">
                  <Info size={11} />
                  You can change your cookie settings at any time from the cookie preferences link in our footer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}