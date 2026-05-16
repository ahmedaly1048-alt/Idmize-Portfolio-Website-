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
}

const Navbar = ({ theme = 'dark', onThemeToggle, onNavigate }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const isDark = theme === 'dark';
  
  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Pricing', id: 'pricing' }
  ];

  const [activeItem, setActiveItem] = React.useState('home');

  const handleNavigation = (pageId: string) => {
    setActiveItem(pageId);
    if (onNavigate) {
      onNavigate(pageId);
    }
    setIsMobileMenuOpen(false);
  };

  const handleBookDemo = () => {
    setActiveItem('pricing');
    if (onNavigate) {
      onNavigate('pricing');
    }
    setIsMobileMenuOpen(false);
  };

  // Theme-specific styles
  const bgColor = isDark ? 'bg-black/80 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl';
  const borderColor = isDark ? 'border-white/5' : 'border-gray-100';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-500';
  const textHover = isDark ? 'hover:text-white' : 'hover:text-gray-900';
  const activeTextColor = isDark ? 'text-white' : 'text-gray-900';
  const underlineColor = isDark ? 'bg-blue-500' : 'bg-blue-500';
  const buttonBg = isDark ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600';
  const mobileMenuBg = isDark ? 'bg-black/95 backdrop-blur-xl' : 'bg-white/95 backdrop-blur-xl';
  const socialIconColor = isDark ? 'text-gray-500' : 'text-gray-400';

  return (
    <nav className={`w-full ${bgColor} border-b ${borderColor} sticky top-0 z-50 transition-all duration-300`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 md:h-16 items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-6 lg:gap-10">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleNavigation('home')}
            >
              <span className={`text-lg md:text-xl font-bold tracking-tight ${textColor} transition-colors duration-300`}>
                IDmize
              </span>
              <div className={`${isDark ? 'bg-blue-600' : 'bg-blue-500'} p-1 rounded-md transition-all duration-300 group-hover:scale-105`}>
                <img src="/icon (2).png" alt="ID" className="w-4 h-4 md:w-5 md:h-5 object-contain" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.id)}
                  className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300
                    ${activeItem === item.id 
                      ? `${activeTextColor} bg-white/5` 
                      : `${textSecondary} ${textHover} hover:bg-white/5`
                    }`}
                >
                  {item.name}
                  {activeItem === item.id && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Theme Toggle, Socials & CTA */}
          <div className="flex items-center gap-3 lg:gap-5">
            {/* Theme Toggle Button */}
            <button
              onClick={onThemeToggle}
              className={`p-1.5 rounded-lg transition-all duration-300
                ${isDark 
                  ? 'text-gray-400 hover:text-white hover:bg-white/10' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Social Icons - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <FaFacebook 
                size={14} 
                className={`cursor-pointer transition-all duration-300 ${socialIconColor} hover:text-blue-500 hover:scale-110`} 
              />
              <FaInstagram 
                size={14} 
                className={`cursor-pointer transition-all duration-300 ${socialIconColor} hover:text-pink-500 hover:scale-110`} 
              />
              <FaLinkedin 
                size={14} 
                className={`cursor-pointer transition-all duration-300 ${socialIconColor} hover:text-blue-600 hover:scale-110`} 
              />
              <div className={`cursor-pointer transition-all duration-300 ${socialIconColor} hover:text-white hover:scale-110`}>
                <XIcon />
              </div>
            </div>

            {/* Book a Demo Button */}
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
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Sleek */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`lg:hidden ${mobileMenuBg} border-t ${borderColor} shadow-xl backdrop-blur-xl`}
        >
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button 
                key={item.name} 
                onClick={() => handleNavigation(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${activeItem === item.id 
                    ? `${activeTextColor} bg-white/10` 
                    : `${textSecondary} ${textHover} hover:bg-white/5`
                  }`}
              >
                {item.name}
              </button>
            ))}
            
            {/* Social Icons - Mobile */}
            <div className="flex gap-5 pt-4 mt-2 border-t border-white/10">
              <FaFacebook size={16} className={`cursor-pointer transition-all duration-300 ${socialIconColor} hover:text-blue-500`} />
              <FaInstagram size={16} className={`cursor-pointer transition-all duration-300 ${socialIconColor} hover:text-pink-500`} />
              <FaLinkedin size={16} className={`cursor-pointer transition-all duration-300 ${socialIconColor} hover:text-blue-600`} />
              <div className={`cursor-pointer transition-all duration-300 ${socialIconColor} hover:text-white`}>
                <XIcon />
              </div>
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