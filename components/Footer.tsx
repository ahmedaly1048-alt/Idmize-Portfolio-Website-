"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Sparkles,  Mail, Phone, MapPin, 
  Shield, Zap, Lock, Globe 
} from 'lucide-react';
import { FaFacebook, FaInstagram , FaTwitter , FaLinkedin } from 'react-icons/fa6';

interface FooterProps {
  theme?: 'light' | 'dark';
  onNavigate?: (page: string) => void;
}

const Footer = ({ theme = 'dark', onNavigate }: FooterProps) => {
  const isDark = theme === 'dark';
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Contact', id: 'contact' }
  ];

  const resources = [
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'Status', href: '#' }
  ];

  const legal = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'GDPR', href: '#' }
  ];

  const socialIcons = [
    { icon: FaFacebook, href: '#', color: 'hover:text-blue-600' },
    { icon: FaInstagram, href: '#', color: 'hover:text-pink-500' },
    { icon: FaTwitter, href: '#', color: 'hover:text-sky-500' },
    { icon: FaLinkedin, href: '#', color: 'hover:text-blue-700' }
  ];

  // Theme-specific styles
  const bgColor = isDark ? 'bg-black' : 'bg-gray-50';
  const borderColor = isDark ? 'border-white/5' : 'border-gray-200';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-500';
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-400';
  const linkHover = isDark ? 'hover:text-white' : 'hover:text-blue-600';
  const iconBg = isDark ? 'bg-white/5 hover:bg-blue-600/20' : 'bg-gray-100 hover:bg-blue-100';
  const inputBg = isDark ? 'bg-black/40 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900';
  const buttonBg = isDark ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600';
  const dividerBg = isDark ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-300 to-transparent';

  return (
    <footer className={`relative ${bgColor} border-t ${borderColor} transition-colors duration-300 overflow-hidden`}>
      {/* Subtle background gradient */}
      <div className={`absolute inset-0 pointer-events-none ${isDark ? 'bg-gradient-to-b from-transparent via-blue-500/3 to-transparent' : 'bg-gradient-to-b from-transparent via-blue-400/5 to-transparent'}`} />
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 py-12 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <div className={`${isDark ? 'bg-blue-600' : 'bg-blue-500'} p-1.5 rounded-lg`}>
                  <img src="/icon (2).png" alt="ID" className="w-5 h-5 object-contain" />
                </div>
                <span className={`text-xl font-bold tracking-tight ${textPrimary}`}>IDmize</span>
              </div>
              <p className={`text-xs ${textSecondary} leading-relaxed max-w-xs`}>
                Enterprise-grade AI governance platform securing your organization's AI infrastructure with zero-knowledge architecture.
              </p>
              <div className="flex gap-3">
                {socialIcons.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className={`p-1.5 rounded-lg transition-all duration-300 ${iconBg} ${social.color}`}
                  >
                    <social.icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className={`text-sm font-semibold ${textPrimary}`}>Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => onNavigate?.(link.id)}
                      className={`text-xs ${textSecondary} ${linkHover} transition-colors duration-300 flex items-center gap-1.5 group`}
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0" />
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className={`text-sm font-semibold ${textPrimary}`}>Resources</h3>
              <ul className="space-y-2">
                {resources.map((resource) => (
                  <li key={resource.name}>
                    <a
                      href={resource.href}
                      className={`text-xs ${textSecondary} ${linkHover} transition-colors duration-300 flex items-center gap-1.5 group`}
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0" />
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className={`text-sm font-semibold ${textPrimary}`}>Stay Updated</h3>
              <p className={`text-xs ${textSecondary}`}>
                Get the latest updates on AI governance and security.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className={`flex-1 px-3 py-2 rounded-lg border text-xs transition-all duration-300 ${inputBg} focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
                <button className={`${buttonBg} text-white px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95`}>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className={`text-[9px] ${textMuted}`}>
                No spam. Unsubscribe anytime.
              </p>
            </motion.div>
          </div>

          {/* Divider */}
          <div className={`my-8 h-px ${dividerBg}`} />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              {legal.map((item, idx) => (
                <React.Fragment key={item.name}>
                  <a href={item.href} className={`text-[10px] ${textMuted} ${linkHover} transition-colors duration-300`}>
                    {item.name}
                  </a>
                  {idx < legal.length - 1 && <span className={`text-[10px] ${textMuted}`}>•</span>}
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Shield className={`w-3 h-3 ${textMuted}`} />
              <p className={`text-[10px] ${textMuted}`}>
                © {currentYear} IDmize. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;