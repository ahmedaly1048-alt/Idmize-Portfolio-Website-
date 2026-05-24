"use client";

import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import LogoWall from "../../components/Logowall";
import FeaturesList from "../../components/FeaturesList";
import { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ChevronUp, Sparkles, ArrowRight, Sun, Moon } from "lucide-react";
import ProductShowcase from "../../components/ProductShowcase";
import StatsSection from "../../components/StatsSection";
import JourneyPath from "../../components/JourneyPath";
import ArchitectureSection from "../../components/ImageDisplaySection";
import IDmizePlatform from "../../components/IDmizePlatform";
import RequestDemoPage from "../../components/RequestDemoPage";
import AboutPage from "../../components/AboutPage";
import ContactSection from "../../components/ContactSection";
import Footer from "../../components/Footer";

type Page = 'home' | 'about' | 'pricing';

export default function LandingPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    }
  }, []);

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Single navigate handler — always updates currentPage
  const handleNavigate = useCallback((pageId: string) => {
    if (pageId === 'home' || pageId === 'about' || pageId === 'pricing') {
      setCurrentPage(pageId as Page);
    }
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const isDark = theme === 'dark';

  if (!isMounted) return null;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* ── Scroll Progress Bar ─────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 z-[10000] origin-left"
        style={{ scaleX }}
      />

      {/* ── SINGLE SHARED NAVBAR — always mounted, always correct ────────── */}
      <Navbar
        theme={theme}
        onThemeToggle={toggleTheme}
        onNavigate={handleNavigate}
        activePage={currentPage}          // ← drives the active indicator
      />

      {/* ── Page Content ────────────────────────────────────────────────── */}
      {currentPage === 'about' && (
        <AboutPage theme={theme} onNavigate={handleNavigate} />
      )}

      {currentPage === 'pricing' && (
        <RequestDemoPage
          theme={theme}
          onThemeToggle={toggleTheme}
          onClose={() => handleNavigate('home')}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'home' && (
        <main>
          <Hero theme={theme} onGetStarted={() => handleNavigate('pricing')} />
          <LogoWall theme={theme} />
          <FeaturesList theme={theme} />
          <ArchitectureSection theme={theme} />
          <ProductShowcase theme={theme} />
          <JourneyPath theme={theme} />
          <StatsSection theme={theme} />
          <IDmizePlatform theme={theme} />
          <ContactSection theme={theme} />

          {/* CTA Section */}
          <section className={`relative py-24 overflow-hidden transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            <div className="container mx-auto px-6 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 transition-colors duration-300
                  ${isDark ? 'bg-white/[0.02] border border-white/5' : 'bg-white border border-gray-200 shadow-sm'}`}>
                  <Sparkles className={`w-3 h-3 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                  <span className={`text-[10px] font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Get Started
                  </span>
                </div>
                <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-[1.2] ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Ready to{' '}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Transform
                  </span>
                  {' '}Your AI Governance?
                </h2>
                <p className={`max-w-xl mx-auto text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Join leading enterprises using IDmize to secure their AI infrastructure
                </p>
                <div className="mt-8 flex flex-wrap gap-3 justify-center">
                  <motion.button
                    onClick={() => handleNavigate('pricing')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group rounded-lg px-6 py-2.5 text-xs font-semibold text-white shadow-lg bg-gradient-to-r from-blue-600 to-blue-500 shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300"
                  >
                    Request Demo
                    <ArrowRight className="inline-block ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </section>

          <Footer theme={theme} onNavigate={handleNavigate} />
        </main>
      )}

      {/* ── Floating UI ─────────────────────────────────────────────────── */}
      {/* Theme Toggle */}
      <motion.button
        onClick={toggleTheme}
        className={`fixed bottom-6 right-6 z-[10000] backdrop-blur-md rounded-full p-2.5 border shadow-lg transition-all duration-300 group
          ${isDark
            ? 'bg-black/80 border-blue-500/30 hover:bg-blue-600/20'
            : 'bg-white/80 border-gray-200 hover:bg-gray-100'}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        {isDark
          ? <Sun className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
          : <Moon className="w-4 h-4 text-blue-500 group-hover:text-blue-600 transition-colors" />}
      </motion.button>

      {/* Scroll % */}
      <motion.div
        className={`fixed bottom-6 left-6 z-[10000] backdrop-blur-md rounded-full px-3 py-1.5 border shadow-lg
          ${isDark ? 'bg-black/80 border-blue-500/30' : 'bg-white/80 border-gray-200'}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className={`text-xs font-mono ${isDark ? 'text-blue-400' : 'text-blue-500'}`}>
          {Math.round(scrollProgress)}%
        </span>
      </motion.div>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className={`fixed bottom-24 left-6 z-[10000] backdrop-blur-md rounded-full p-2.5 border shadow-lg group
              ${isDark
                ? 'bg-black/80 border-blue-500/30 hover:bg-blue-600/20'
                : 'bg-white/80 border-gray-200 hover:bg-gray-100'}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ChevronUp className={`w-4 h-4 ${isDark ? 'text-blue-400 group-hover:text-blue-300' : 'text-blue-500 group-hover:text-blue-600'}`} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Grain Overlay */}
      <div
        className={`fixed inset-0 pointer-events-none z-[9999] ${isDark ? 'opacity-[0.02]' : 'opacity-[0.01]'}`}
        style={{ backgroundImage: "url('/grain.png')", backgroundRepeat: 'repeat' }}
      />

      <style jsx global>{`
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${isDark ? '#000' : '#f3f4f6'}; border-left: 1px solid ${isDark ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)'}; }
        ::-webkit-scrollbar-thumb { background: ${isDark ? '#2563eb' : '#3b82f6'}; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: ${isDark ? '#3b82f6' : '#2563eb'}; box-shadow: 0 0 6px rgba(59,130,246,0.4); }
        * { scrollbar-width: thin; scrollbar-color: ${isDark ? '#2563eb #000' : '#3b82f6 #f3f4f6'}; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(37,99,235,0.3); color: white; }
        button:focus-visible, a:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }
        button:focus:not(:focus-visible), a:focus:not(:focus-visible) { outline: none; }
      `}</style>
    </div>
  );
}