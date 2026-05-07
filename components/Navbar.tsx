'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
}

const Navbar = ({ theme = 'dark', onThemeToggle }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const isDark = theme === 'dark';

  // Close mobile menu when window resizes to desktop
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Announcement Banner - Responsive */}
      <div className={`w-full py-2 px-4 text-center text-[11px] sm:text-xs font-medium backdrop-blur-sm transition-colors duration-300
        ${isDark 
          ? 'bg-blue-600/5 text-blue-400 border-b border-blue-500/10' 
          : 'bg-blue-50 text-blue-600 border-b border-blue-200'
        }`}
      >
        <span className="inline-block">
          🎉 Get an overview of what IDmize offers for AI Governance! 
          <a href="#" className={`underline ml-1 transition-colors whitespace-nowrap ${isDark ? 'hover:text-blue-300' : 'hover:text-blue-700'}`}>
            Let's go
          </a>
        </span>
      </div>

      <nav className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300
        ${isDark 
          ? 'border-white/5 bg-black/90' 
          : 'border-gray-200 bg-white/90'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3">
          {/* Brand Logo - Responsive */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer"
          >
            <div className={`h-7 w-7 sm:h-8 sm:w-8 relative overflow-hidden rounded-lg flex items-center justify-center
              ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}
            >
              <img 
                src="/icon (2).png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className={`text-lg sm:text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              IDmize
            </span>
          </motion.div>

          {/* Desktop Menu - Hidden on tablet/mobile */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            {['Products', 'Pricing', 'Solutions', 'Developers', 'Resources', 'Company'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className={`relative group transition-colors duration-200 whitespace-nowrap
                  ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300`} />
              </a>
            ))}
          </div>

          {/* Right side buttons - Responsive */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={onThemeToggle}
              className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300
                ${isDark 
                  ? 'text-gray-400 hover:text-white hover:bg-white/10' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              {isDark ? <Sun size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Moon size={16} className="sm:w-[18px] sm:h-[18px]" />}
            </button>

            {/* Sign In - Hidden on very small screens */}
            <button className={`hidden sm:block text-sm font-semibold transition-colors
              ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Sign in
            </button>
            
            {/* Get Started Button - Responsive */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-lg px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-lg transition-all duration-300
                ${isDark 
                  ? 'bg-blue-600 shadow-blue-600/20 hover:bg-blue-500' 
                  : 'bg-blue-500 shadow-blue-500/20 hover:bg-blue-600'
                }`}
            >
              Get started
            </motion.button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-1.5 rounded-lg transition-colors
                ${isDark 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-gray-900 hover:bg-gray-100'
                }`}
            >
              {isMobileMenuOpen ? <X size={18} className="sm:w-5 sm:h-5" /> : <Menu size={18} className="sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Responsive */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`lg:hidden border-t backdrop-blur-xl
              ${isDark 
                ? 'border-white/5 bg-black/95' 
                : 'border-gray-200 bg-white/95'
              }`}
          >
            <div className="px-4 sm:px-6 py-3 sm:py-4 space-y-2 sm:space-y-3">
              {['Products', 'Pricing', 'Solutions', 'Developers', 'Resources', 'Company'].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className={`block text-sm font-medium transition-colors py-2 px-2 rounded-lg hover:bg-white/5
                    ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className={`pt-2 sm:pt-3 mt-2 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                <button className={`w-full text-left text-sm font-semibold transition-colors py-2 px-2 rounded-lg hover:bg-white/5
                  ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
};

export default Navbar;