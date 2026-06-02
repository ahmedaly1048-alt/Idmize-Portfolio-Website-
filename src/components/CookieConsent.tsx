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
    // Initialize or read state records
    const consent = getCookieConsent();
    if (!consent) {
      initializeEssentialCookies();
    } else {
      setCookies(consent);
    }
    
    // Explicit Override: Force banner visibility on every single initialization/page load
    setShowBanner(true);
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
    <div className="fixed bottom-0 left-0 right-0 z-[10002] pointer-events-none sm:bottom-4 sm:left-auto sm:right-4">
      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.99);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .banner-animate {
          animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .details-animate {
          animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (max-width: 640px) {
          .banner-animate {
            animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
        }
      `}</style>

      <div className="pointer-events-auto w-full sm:max-w-md mx-auto sm:mx-0 sm:ml-auto banner-animate relative px-3 sm:px-0 pb-4 sm:pb-0">
        {/* Main Governance Layer Panel */}
        <div className="relative bg-zinc-950/95 backdrop-blur-xl rounded-t-xl sm:rounded-xl border border-zinc-800 shadow-[0_0_50px_0_rgba(0,0,0,0.8)] sm:shadow-[0_0_50px_0_rgba(0,0,0,0.8)]">
          {/* Cryptographic Top Accent Scanning Strip */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

          <div className="relative p-4 sm:p-6">
            {/* Header Identity Row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-4 h-4 text-blue-400 stroke-[1.5]" />
                </div>
                <div>
                  <h2 className="text-xs font-semibold tracking-wide uppercase font-mono text-zinc-200">
                    Data Privacy & Cookies
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors p-1.5 rounded-lg hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800 flex-shrink-0"
              >
                <X size={14} />
              </button>
            </div>

            {/* Scrollable content area - only this part scrolls if needed */}
            <div className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto mb-4">
              {/* Platform Intent Copy */}
              <p className="text-xs text-zinc-400 leading-relaxed mb-5 font-normal">
                IDmize platform instances utilize identity primitives. Essential data state components remain permanently active inside your local environment, while telemetry parameters require permission verification.
              </p>

              {/* Preference Configuration Activation Switch */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors mb-5 group w-full sm:w-auto justify-center sm:justify-start"
              >
                <Settings size={11} className="animate-[spin_4s_linear_infinite] flex-shrink-0" />
                <span className="text-[9px] sm:text-[10px]">{showDetails ? 'Conceal Preferences' : 'Configure Granular Preferences'}</span>
                {showDetails ? <ChevronUp size={11} className="flex-shrink-0" /> : <ChevronDown size={11} className="flex-shrink-0" />}
              </button>

              {/* Granular Framework Parameters Checklist */}
              {showDetails && (
                <div className="details-animate mb-5 space-y-2 max-h-[190px] overflow-y-auto pr-1 selection:bg-zinc-800">
                  {(Object.keys(cookieDescriptions) as Array<keyof typeof cookieDescriptions>).map(
                    (type) => (
                      <label
                        key={type}
                        className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/40 hover:bg-zinc-900/80 transition-all cursor-pointer group border border-zinc-900 hover:border-zinc-800"
                      >
                        <input
                          type="checkbox"
                          checked={cookies[type]}
                          onChange={() => handleToggleCookie(type)}
                          disabled={type === 'essential'}
                          className={`mt-0.5 w-3.5 h-3.5 rounded border transition-all flex-shrink-0 ${
                            type === 'essential'
                              ? 'bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed'
                              : 'border-zinc-700 bg-transparent cursor-pointer hover:border-blue-500'
                          } ${cookies[type] && type !== 'essential' ? 'bg-blue-600 border-blue-500' : ''}`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-[11px] font-medium text-zinc-300 group-hover:text-zinc-200 transition-colors">
                              {cookieDescriptions[type].title}
                            </span>
                            {type === 'essential' && (
                              <span className="text-[8px] font-mono tracking-wider bg-blue-500/10 text-blue-400 px-1.5 py-0.5 border border-blue-500/20 rounded whitespace-nowrap">
                                SYSTEM_MANDATORY
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-zinc-500 group-hover:text-zinc-400 transition-colors leading-relaxed">
                            {cookieDescriptions[type].description}
                          </p>
                        </div>
                      </label>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Fixed bottom section - always visible */}
            <div>
              {/* Transaction Execution Actions */}
              <div className="flex gap-2 pt-2 flex-col sm:flex-row">
                {!showDetails ? (
                  <>
                    <button
                      onClick={handleRejectAll}
                      className="flex-1 px-3.5 py-2.5 sm:py-2 text-[10px] font-mono uppercase tracking-wider text-zinc-400 bg-zinc-900/50 hover:bg-zinc-900 hover:text-zinc-200 rounded-md transition-all border border-zinc-800 hover:border-zinc-700"
                    >
                      Reject
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="flex-1 px-4 py-2.5 sm:py-2 text-[10px] font-mono uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-all shadow-md shadow-blue-600/10"
                    >
                      Accept All
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setShowDetails(false)}
                      className="flex-1 px-3.5 py-2.5 sm:py-2 text-[10px] font-mono uppercase tracking-wider text-zinc-400 bg-zinc-900/50 hover:bg-zinc-900 rounded-md transition-all border border-zinc-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSavePreferences}
                      className="flex-1 px-4 py-2.5 sm:py-2 text-[10px] font-mono uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-all"
                    >
                      Save Matrix
                    </button>
                  </>
                )}
              </div>

              {/* Audit Status Footer Ledger Indicator */}
              <div className="mt-5 pt-3 border-t border-zinc-900 flex items-center justify-center">
                <p className="text-[8px] font-mono text-zinc-600 tracking-wider text-center px-2">
                  // OVERRIDE ACTIVE: DISPLAY STATE RECORDED AS ALWAYS ON_OPEN
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}