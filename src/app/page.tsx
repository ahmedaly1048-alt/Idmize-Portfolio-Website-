"use client";

import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import LogoWall from "../../components/Logowall";
import FeaturesList from "../../components/FeaturesList";
import { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronUp, Sparkles, ArrowRight, Sun, Moon } from "lucide-react";
import ProductShowcase from "../../components/ProductShowcase";
import TrustPlatform from "../../components/TrustPlatform";
import StatsSection from "../../components/StatsSection";
import JourneyPath from "../../components/JourneyPath";
import ArchitectureSection from "../../components/ImageDisplaySection";
import IDmizePlatform from "../../components/IDmizePlatform";
import RequestDemoPage from "../../components/RequestDemoPage";
import AboutPage from "../../components/AboutPage";
import ContactSection from "../../components/ContactSection";
import Footer from "../../components/Footer";

export default function LandingPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'pricing'>('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Load theme from localStorage after mount
  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (pageId: string) => {
    if (pageId === 'pricing') {
      setCurrentPage('pricing');
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (pageId === 'about') {
      setCurrentPage('about');
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (pageId === 'home') {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const closeDemoPage = () => {
    setCurrentPage('home');
  };

  const isDark = theme === 'dark';

  // Don't render theme-dependent UI until after mount to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  // Show About Page
  if (currentPage === 'about') {
    return <AboutPage theme={theme} onThemeToggle={toggleTheme} onNavigate={handleNavigate} />;
  }

  // Show Pricing/Demo Page
  if (currentPage === 'pricing') {
    return <RequestDemoPage theme={theme} onThemeToggle={toggleTheme} onClose={closeDemoPage} />;
  }

  // Show Main Landing Page
  return (
    <main className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 z-[10000] origin-left"
        style={{ scaleX }}
      />
      
      {/* Theme Toggle Button - Floating */}
      <motion.button
        onClick={toggleTheme}
        className={`fixed bottom-6 right-6 z-[10000] backdrop-blur-md rounded-full p-2.5 border shadow-lg transition-all duration-300 group
          ${isDark 
            ? 'bg-black/80 border-blue-500/30 shadow-blue-500/10 hover:bg-blue-600/20' 
            : 'bg-white/80 border-gray-200 shadow-gray-200/50 hover:bg-gray-100'
          }`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        ) : (
          <Moon className="w-4 h-4 text-blue-500 group-hover:text-blue-600 transition-colors" />
        )}
      </motion.button>

      {/* Scroll Progress Percentage */}
      <motion.div
        className={`fixed bottom-6 left-6 z-[10000] backdrop-blur-md rounded-full px-3 py-1.5 border shadow-lg transition-colors duration-300
          ${isDark 
            ? 'bg-black/80 border-blue-500/30 shadow-blue-500/10' 
            : 'bg-white/80 border-gray-200 shadow-gray-200/50'
          }`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className={`text-xs font-mono ${isDark ? 'text-blue-400' : 'text-blue-500'}`}>
          {Math.round(scrollProgress)}%
        </span>
      </motion.div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-24 left-6 z-[10000] backdrop-blur-md rounded-full p-2.5 border shadow-lg transition-all duration-300 group
          ${isDark 
            ? 'bg-black/80 border-blue-500/30 shadow-blue-500/10 hover:bg-blue-600/20' 
            : 'bg-white/80 border-gray-200 shadow-gray-200/50 hover:bg-gray-100'
          }`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.9 }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronUp className={`w-4 h-4 transition-colors ${isDark ? 'text-blue-400 group-hover:text-blue-300' : 'text-blue-500 group-hover:text-blue-600'}`} />
      </motion.button>

      {/* Global Grain/Noise Overlay */}
      <div className={`fixed inset-0 pointer-events-none z-[9999] bg-[url('/grain.png')] ${isDark ? 'opacity-[0.02]' : 'opacity-[0.01]'}`} />
      
      <Navbar theme={theme} onThemeToggle={toggleTheme} onNavigate={handleNavigate} />
      <Hero theme={theme} onGetStarted={() => handleNavigate('pricing')} />
      <LogoWall theme={theme} />
      <FeaturesList theme={theme} />
      <ArchitectureSection theme={theme} />
      <ProductShowcase theme={theme} />
      <JourneyPath theme={theme} />
      <StatsSection theme={theme} />
      <IDmizePlatform theme={theme}/>
      <TrustPlatform theme={theme} />
      <ContactSection  theme={theme}/>

      {/* CTA Section */}
      <section className={`relative py-24 overflow-hidden transition-colors duration-300
        ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
        {/* Background effects */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent`} />
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent`} />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 transition-colors duration-300
              ${isDark 
                ? 'bg-white/[0.02] border border-white/5' 
                : 'bg-white border border-gray-200 shadow-sm'}`}>
              <Sparkles className={`w-3 h-3 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
              <span className={`text-[10px] font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Get Started
              </span>
            </div>
            
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-[1.2] transition-colors duration-300
              ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Ready to{' '}
              <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                Transform
              </span>
              {' '}Your AI Governance?
            </h2>
            
            <p className={`max-w-xl mx-auto text-sm transition-colors duration-300
              ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Join leading enterprises using IDmize to secure their AI infrastructure
            </p>
            
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <motion.button
                onClick={() => handleNavigate('pricing')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group rounded-lg px-6 py-2.5 text-xs font-semibold text-white shadow-lg transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-500 shadow-blue-600/25 hover:shadow-blue-600/40"
              >
                Request Demo
                <ArrowRight className="inline-block ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`rounded-lg px-6 py-2.5 text-xs font-semibold backdrop-blur-sm transition-all duration-300
                  ${isDark 
                    ? 'border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20' 
                    : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                  }`}
              >
                Contact Sales
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer theme={theme} />

      {/* Footer
      <footer className={`py-8 transition-colors duration-300
        ${isDark ? 'border-t border-white/5 bg-black/30' : 'border-t border-gray-200 bg-gray-100/50'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-[8px]">ID</span>
              </div>
              <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>IDmize</span>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className={`text-[10px] transition-colors ${isDark ? 'text-gray-500 hover:text-blue-400' : 'text-gray-400 hover:text-blue-500'}`}>Privacy</a>
              <a href="#" className={`text-[10px] transition-colors ${isDark ? 'text-gray-500 hover:text-blue-400' : 'text-gray-400 hover:text-blue-500'}`}>Terms</a>
              <a href="#" className={`text-[10px] transition-colors ${isDark ? 'text-gray-500 hover:text-blue-400' : 'text-gray-400 hover:text-blue-500'}`}>Security</a>
              <a href="#" className={`text-[10px] transition-colors ${isDark ? 'text-gray-500 hover:text-blue-400' : 'text-gray-400 hover:text-blue-500'}`}>Status</a>
            </div>
            
            <p className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              © 2026 IDmize. All rights reserved.
            </p>
          </div>
        </div>
      </footer> */}

      {/* Custom Scroller Styles */}
      <style jsx global>{`
        /* Width */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          background: ${isDark ? '#000000' : '#f3f4f6'};
          border-left: 1px solid ${isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)'};
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: ${isDark ? '#2563eb' : '#3b82f6'};
          border-radius: 10px;
          transition: all 0.2s ease;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? '#3b82f6' : '#2563eb'};
          box-shadow: 0 0 6px rgba(59, 130, 246, 0.4);
        }

        /* Corner */
        ::-webkit-scrollbar-corner {
          background: ${isDark ? '#000000' : '#f3f4f6'};
        }

        /* Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: ${isDark ? '#2563eb #000000' : '#3b82f6 #f3f4f6'};
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Selection color */
        ::selection {
          background: rgba(37, 99, 235, 0.3);
          color: white;
        }
        
        ::-moz-selection {
          background: rgba(37, 99, 235, 0.3);
          color: white;
        }

        /* Hide scrollbar for Edge/IE */
        body {
          -ms-overflow-style: none;
        }

        /* Section gradient dividers */
        section {
          position: relative;
        }
        
        section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, ${isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.15)'}, transparent);
          pointer-events: none;
        }
      `}</style>
    </main>
  );
}