'use client';

import { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, Settings, Cookie } from 'lucide-react';
import {
  getCookieConsent,
  setCookieConsent,
  resetCookieConsent,
  initializeEssentialCookies,
} from '../lib/cookieUtils';
import { CookieConsent as ICookieConsent, cookieDescriptions } from '../lib/cookieConfig';

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
    <div className="fixed inset-0 z-[10002] flex items-center justify-center pointer-events-none p-4 sm:p-6">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" />

      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
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
        .banner-animate {
          animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .details-animate {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>

      <div className="pointer-events-auto w-full max-w-md banner-animate relative z-10">
        {/* Main Card - Sleek IDmize Style */}
        <div className="relative bg-black/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

          <div className="relative p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Cookie className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Cookie Preferences
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="text-gray-500 hover:text-gray-300 transition-all p-1 rounded-lg hover:bg-white/5"
              >
                <X size={14} />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              We use cookies to enhance your experience. Essential cookies are always active,
              while optional cookies help us improve our site.
            </p>

            {/* Toggle Details Button */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-2 text-[10px] font-medium text-blue-400 hover:text-blue-300 transition-colors mb-4 group"
            >
              <Settings size={10} />
              <span>{showDetails ? 'Hide preferences' : 'Customize preferences'}</span>
              {showDetails ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
            </button>

            {/* Details Section */}
            {showDetails && (
              <div className="details-animate mb-5 space-y-2">
                {(Object.keys(cookieDescriptions) as Array<keyof typeof cookieDescriptions>).map(
                  (type) => (
                    <label
                      key={type}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer group border border-white/5 hover:border-white/10"
                    >
                      <input
                        type="checkbox"
                        checked={cookies[type]}
                        onChange={() => handleToggleCookie(type)}
                        disabled={type === 'essential'}
                        className={`mt-0.5 w-3.5 h-3.5 rounded border-2 flex-shrink-0 transition-all ${
                          type === 'essential'
                            ? 'bg-blue-500/20 border-blue-500/40 cursor-not-allowed'
                            : 'border-gray-500 bg-transparent cursor-pointer hover:border-blue-400'
                        } ${cookies[type] && type !== 'essential' ? 'bg-blue-500 border-blue-500' : ''}`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[11px] font-medium text-gray-300">
                            {cookieDescriptions[type].title}
                          </span>
                          {type === 'essential' && (
                            <span className="text-[7px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-[9px] text-gray-500 leading-relaxed">
                          {cookieDescriptions[type].description}
                        </p>
                      </div>
                    </label>
                  )
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end">
              {!showDetails ? (
                <>
                  <button
                    onClick={handleRejectAll}
                    className="px-3 py-1.5 text-[10px] font-medium text-gray-300 bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10"
                  >
                    Reject
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 py-1.5 text-[10px] font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all shadow-lg shadow-blue-600/20"
                  >
                    Accept All
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-3 py-1.5 text-[10px] font-medium text-gray-300 bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="px-4 py-1.5 text-[10px] font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all"
                  >
                    Save
                  </button>
                </>
              )}
            </div>

            {/* Footer Note */}
            <div className="mt-4 pt-3 border-t border-white/5">
              <p className="text-[8px] text-gray-600 text-center">
                You can change these settings anytime from our footer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}