'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa6';

// Custom X (Twitter) Icon
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.134l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface NavbarProps {
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
  onNavigate?: (page: string) => void;
  /**
   * The currently active page — passed in from the parent so the
   * Navbar never has to guess. Values: 'home' | 'about' | 'pricing'
   */
  activePage?: 'home' | 'about' | 'pricing';
}

const Navbar = ({
  theme = 'dark',
  onThemeToggle,
  onNavigate,
  activePage = 'home',
}: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const isDark = theme === 'dark';

  const navItems = [
    { name: 'Home',    id: 'home'    },
    { name: 'About',   id: 'about'   },
    { name: 'Pricing', id: 'pricing' },
  ] as const;

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/company/idmize/',
      hoverColor: 'hover:text-blue-600',
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: 'https://www.facebook.com/share/1AjAgNbG2u/',
      hoverColor: 'hover:text-blue-500',
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://www.instagram.com/idmize.co?igsh=aXIybjEzbXFqZzVm',
      hoverColor: 'hover:text-pink-500',
    },
    {
      name: 'X (Twitter)',
      icon: XIcon,
      url: '#',
      hoverColor: 'hover:text-white',
    },
  ];

  const handleNavigation = (pageId: string) => {
    setIsMobileMenuOpen(false);
    onNavigate?.(pageId);
  };

  const handleBookDemo = () => {
    setIsMobileMenuOpen(false);
    onNavigate?.('pricing');
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // ─── Theme-derived style tokens ───────────────────────────────────────────
  const bgColor       = isDark ? 'bg-black/80 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl';
  const borderColor   = isDark ? 'border-white/5'               : 'border-gray-100';
  const textColor     = isDark ? 'text-white'                   : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400'                : 'text-gray-500';
  const textHover     = isDark ? 'hover:text-white'             : 'hover:text-gray-900';
  const buttonBg      = isDark ? 'bg-blue-600 hover:bg-blue-500': 'bg-blue-500 hover:bg-blue-600';
  const mobileMenuBg  = isDark ? 'bg-black/95 backdrop-blur-xl' : 'bg-white/95 backdrop-blur-xl';
  const socialIconColor = isDark ? 'text-gray-500'              : 'text-gray-400';
  // ──────────────────────────────────────────────────────────────────────────

  return (
    <nav
      className={`w-full ${bgColor} border-b ${borderColor} sticky top-0 z-50 transition-all duration-300`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 md:h-16 items-center justify-between">

          {/* ── Logo + Desktop Nav ────────────────────────────────────────── */}
          <div className="flex items-center gap-6 lg:gap-10">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleNavigation('home')}
            >
              <span
                className={`text-lg md:text-xl font-bold tracking-tight ${textColor} transition-colors duration-300`}
              >
                IDmize
              </span>
              <div
                className={`${isDark ? 'bg-blue-600' : 'bg-blue-500'} p-1 rounded-md transition-all duration-300 group-hover:scale-105`}
              >
                <img
                  src="/icon (2).png"
                  alt="ID"
                  className="w-4 h-4 md:w-5 md:h-5 object-contain"
                />
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.id)}
                    className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300
                      ${isActive
                        ? `${textColor} bg-white/5`
                        : `${textSecondary} ${textHover} hover:bg-white/5`
                      }`}
                  >
                    {item.name}

                    {/* Animated underline indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Right side: theme toggle, socials, CTA, mobile toggle ──────── */}
          <div className="flex items-center gap-3 lg:gap-5">
            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className={`p-1.5 rounded-lg transition-all duration-300
                ${isDark
                  ? 'text-gray-400 hover:text-white hover:bg-white/10'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Social Icons — Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              {socialLinks.map((social) => (
                <button
                  key={social.name}
                  onClick={() => handleSocialClick(social.url)}
                  className={`cursor-pointer transition-all duration-300 ${socialIconColor} ${social.hoverColor} hover:scale-110`}
                  aria-label={`Visit our ${social.name} page`}
                >
                  <social.icon size={14} />
                </button>
              ))}
            </div>

            {/* Book a Demo CTA */}
            <button
              onClick={handleBookDemo}
              className={`${buttonBg} text-white px-4 md:px-5 py-1.5 md:py-2 rounded-lg font-medium text-xs md:text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95`}
            >
              Book a Demo
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-1.5 rounded-lg transition-all duration-300 ${textColor} hover:bg-white/10`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ─────────────────────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`lg:hidden ${mobileMenuBg} border-t ${borderColor} shadow-xl backdrop-blur-xl`}
        >
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    ${isActive
                      ? `${textColor} bg-white/10`
                      : `${textSecondary} ${textHover} hover:bg-white/5`
                    }`}
                >
                  {/* Active dot indicator for mobile */}
                  <span className="flex items-center gap-2">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                    )}
                    {item.name}
                  </span>
                </button>
              );
            })}

            {/* Social Icons — Mobile */}
            <div className="flex gap-5 pt-4 mt-2 border-t border-white/10">
              {socialLinks.map((social) => (
                <button
                  key={social.name}
                  onClick={() => handleSocialClick(social.url)}
                  className={`cursor-pointer transition-all duration-300 ${socialIconColor} ${social.hoverColor}`}
                  aria-label={`Visit our ${social.name} page`}
                >
                  <social.icon size={16} />
                </button>
              ))}
            </div>

            <button
              onClick={handleBookDemo}
              className={`w-full ${buttonBg} text-white py-2 rounded-lg font-medium text-sm mt-3 transition-all duration-300`}
            >
              Book a Demo
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;