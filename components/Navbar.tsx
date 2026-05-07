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

  return (
    <>
      {/* Announcement Banner */}
      <div className={`w-full py-2 text-center text-xs font-medium backdrop-blur-sm transition-colors duration-300
        ${isDark 
          ? 'bg-blue-600/5 text-blue-400 border-b border-blue-500/10' 
          : 'bg-blue-50 text-blue-600 border-b border-blue-200'
        }`}
      >
        🎉 Get an overview of what IDmize offers for AI Governance! 
        <a href="#" className={`underline ml-1 transition-colors ${isDark ? 'hover:text-blue-300' : 'hover:text-blue-700'}`}>
          Let's go
        </a>
      </div>

      <nav className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300
        ${isDark 
          ? 'border-white/5 bg-black/90' 
          : 'border-gray-200 bg-white/90'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          {/* Brand Logo */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className={`h-8 w-8 relative overflow-hidden rounded-lg flex items-center justify-center
              ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}
            >
              <img 
                src="/icon (2).png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              IDmize
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {['Products', 'Pricing', 'Solutions', 'Developers', 'Resources', 'Company'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className={`relative group transition-colors duration-200
                  ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300`} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={onThemeToggle}
              className={`p-2 rounded-lg transition-all duration-300
                ${isDark 
                  ? 'text-gray-400 hover:text-white hover:bg-white/10' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button className={`hidden sm:block text-sm font-semibold transition-colors
              ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Sign in
            </button>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-lg px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300
                ${isDark 
                  ? 'bg-blue-600 shadow-blue-600/20 hover:bg-blue-500' 
                  : 'bg-blue-500 shadow-blue-500/20 hover:bg-blue-600'
                }`}
            >
              Get started
            </motion.button>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-1.5 rounded-lg transition-colors
                ${isDark 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-gray-900 hover:bg-gray-100'
                }`}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
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
            <div className="px-6 py-4 space-y-3">
              {['Products', 'Pricing', 'Solutions', 'Developers', 'Resources', 'Company'].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className={`block text-sm font-medium transition-colors py-2
                    ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {item}
                </a>
              ))}
              <div className={`pt-3 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                <button className={`w-full text-left text-sm font-semibold transition-colors py-2
                  ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
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