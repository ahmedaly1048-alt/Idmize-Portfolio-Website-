'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Zap, Lock, Sparkles } from 'lucide-react';

interface ArchitectureSectionProps {
  theme?: 'light' | 'dark';
}

const ArchitectureSection = ({ theme = 'dark' }: ArchitectureSectionProps) => {
  const isDark = theme === 'dark';

  const features = [
    {
      icon: <Lock className="w-5 h-5" />,
      title: "PII Masking",
      text: "Automatic sanitization of sensitive data before LLM processing."
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Compliance Shield",
      text: "Real-time enforcement of cybersecurity and governance policies."
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      title: "Multi-LLM Core",
      text: "Seamlessly connect with Gemini, ChatGPT, and Private AIs."
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Agentic Identity",
      text: "Unified identity management for organizations and AI agents."
    }
  ];

  const bgColor = isDark ? 'bg-black' : 'bg-gray-50';
  const gridColor = isDark ? '#3b82f6' : '#60a5fa'; // Reverted to Blue
  const gridOpacity = isDark ? 'opacity-[0.06]' : 'opacity-[0.08]';
  const titleColor = isDark ? 'text-white' : 'text-gray-900';
  const accentColor = isDark ? 'text-blue-400' : 'text-blue-600'; // Reverted to Blue
  const descriptionColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDark ? 'bg-white/[0.03]' : 'bg-white';
  const cardBorder = isDark ? 'border-white/10' : 'border-gray-200';
  const cardHoverBg = isDark ? 'hover:bg-white/[0.05]' : 'hover:bg-gray-50';
  const cardHoverBorder = isDark ? 'hover:border-blue-500/30' : 'hover:border-blue-300'; // Reverted to Blue
  const iconBg = isDark ? 'bg-blue-500/10' : 'bg-blue-100'; // Reverted to Blue
  const iconColor = isDark ? 'text-blue-400' : 'text-blue-500'; // Reverted to Blue
  const glowBg = isDark ? 'bg-blue-500/10' : 'bg-blue-400/15'; // Reverted to Blue

  // Custom inline SVG texture mimicking an emerald rubber stamp ink bleed
  const stampGrungeStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`,
    mixBlendMode: isDark ? 'screen' as const : 'multiply' as const,
  };

  return (
    <section className={`relative ${bgColor} py-20 overflow-hidden transition-colors duration-300`}>
      {/* Background Grid - Blue */}
      <div 
        className={`absolute inset-0 pointer-events-none ${gridOpacity}`}
        style={{ 
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, 
          backgroundSize: '48px 48px' 
        }} 
      />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${isDark ? 'bg-white/[0.02] border border-white/5' : 'bg-white border border-gray-200 shadow-sm'} mb-6 mx-auto`}>
            <Sparkles className={`w-3 h-3 ${accentColor}`} />
            <span className={`text-[10px] font-medium uppercase tracking-wider ${accentColor}`}>Architecture</span>
          </div>

          <div className="flex flex-row flex-nowrap items-center justify-center gap-6 md:gap-10">
            {/* Header text on single line (Blue accent) */}
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight ${titleColor} whitespace-nowrap`}>
              Enterprise-Grade <span className={accentColor}>AI Architecture</span>
            </h2>

            {/* ── ISOLATED EMERALD PATENT PENDING STAMP ────────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -15 }}
              whileInView={{ opacity: 0.85, scale: 1, rotate: -8 }}
              whileHover={{ scale: 1.03, rotate: -5, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              className={`
                relative select-none pointer-events-auto cursor-default shrink-0
                w-[140px] h-[70px] rounded-[100%/50%] border-[2.5px] p-0.5 flex items-center justify-center
                ${isDark 
                  ? 'border-emerald-500/50 text-emerald-400 bg-emerald-950/5 shadow-[0_0_20px_rgba(16,185,129,0.05)]' 
                  : 'border-emerald-600/70 text-emerald-600 bg-transparent'
                }
              `}
            >
              <div className={`
                w-full h-full rounded-[100%/50%] border border-dashed flex flex-col items-center justify-center relative overflow-hidden
                ${isDark ? 'border-emerald-500/40' : 'border-emerald-600/50'}
              `}>
                <div className="absolute inset-0 opacity-30 pointer-events-none" style={stampGrungeStyle} />
                <span className="absolute top-[4px] text-[5px] font-black tracking-[0.22em] uppercase opacity-90">All Rights Reserved</span>
                <div className="text-center transform scale-y-110 relative z-10">
                  <h3 className="text-lg font-black tracking-wide leading-none uppercase">PATENT</h3>
                  <p className="text-[6px] font-black tracking-[0.3em] uppercase leading-none mt-0.5">PENDING</p>
                </div>
                <span className="absolute bottom-[4px] text-[5px] font-black tracking-[0.22em] uppercase opacity-90">All Rights Reserved</span>
              </div>
            </motion.div>
          </div>

          <p className={`${descriptionColor} max-w-2xl mx-auto text-sm leading-relaxed mt-8`}>
            IDmize provides a secure intermediary layer between your organization and 
            powerful Large Language Models, ensuring data sovereignty at every step.
          </p>
        </motion.div>

        {/* Features Content Block */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Left Flow graphic area */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex justify-center w-full lg:w-1/2"
          >
            <div className={`absolute inset-0 rounded-full blur-[100px] ${glowBg}`} />
            <div className={`relative rounded-xl overflow-hidden border ${isDark ? 'border-white/10' : 'border-gray-200'} bg-gradient-to-br ${isDark ? 'from-white/[0.02] to-transparent' : 'from-gray-50 to-white'} backdrop-blur-sm p-4 max-w-md mx-auto`}>
              <img src="/flow.png" alt="IDmize Architecture" className="relative z-10 w-full h-auto block drop-shadow-2xl" />
            </div>
          </motion.div>

          {/* Right Cards grid (Blue highlights restored) */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className={`group relative ${cardBg} border ${cardBorder} p-5 rounded-xl ${cardHoverBg} ${cardHoverBorder} transition-all duration-300`}
                >
                  <div className="relative">
                    <div className={`mb-3 ${iconBg} w-8 h-8 flex items-center justify-center rounded-lg ${iconColor}`}>
                      {feature.icon}
                    </div>
                    <h4 className={`${titleColor} font-semibold text-sm mb-1`}>{feature.title}</h4>
                    <p className={`${descriptionColor} text-xs leading-relaxed`}>{feature.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;