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

  // Theme-specific styles
  const bgColor = isDark ? 'bg-black' : 'bg-gray-50';
  const gridColor = isDark ? '#3b82f6' : '#60a5fa';
  const gridOpacity = isDark ? 'opacity-[0.06]' : 'opacity-[0.08]';
  const titleColor = isDark ? 'text-white' : 'text-gray-900';
  const accentColor = isDark ? 'text-blue-400' : 'text-blue-600';
  const descriptionColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDark ? 'bg-white/[0.03]' : 'bg-white';
  const cardBorder = isDark ? 'border-white/10' : 'border-gray-200';
  const cardHoverBg = isDark ? 'hover:bg-white/[0.05]' : 'hover:bg-gray-50';
  const cardHoverBorder = isDark ? 'hover:border-blue-500/30' : 'hover:border-blue-300';
  const iconBg = isDark ? 'bg-blue-500/10' : 'bg-blue-100';
  const iconColor = isDark ? 'text-blue-400' : 'text-blue-500';
  const glowBg = isDark ? 'bg-blue-500/10' : 'bg-blue-400/15';
  const orb1Bg = isDark ? 'bg-blue-600/8' : 'bg-blue-400/12';
  const orb2Bg = isDark ? 'bg-blue-500/4' : 'bg-blue-300/8';

  return (
    <section className={`relative ${bgColor} py-20 overflow-hidden transition-colors duration-300`}>
      {/* Background Grid Pattern */}
      <div 
        className={`absolute inset-0 pointer-events-none ${gridOpacity}`}
        style={{ 
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, 
          backgroundSize: '48px 48px' 
        }} 
      />
      
      {/* Subtle gradient orbs */}
      <div className={`absolute top-20 -left-48 w-96 h-96 rounded-full blur-[140px] ${orb1Bg}`} />
      <div className={`absolute bottom-20 -right-48 w-96 h-96 rounded-full blur-[140px] ${orb2Bg}`} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Section Header - Centered */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${isDark ? 'bg-white/[0.02] border border-white/5' : 'bg-white border border-gray-200 shadow-sm'} mb-4 mx-auto`}>
            <Sparkles className={`w-3 h-3 ${accentColor}`} />
            <span className={`text-[10px] font-medium uppercase tracking-wider ${accentColor}`}>Architecture</span>
          </div>
          <h2 className={`text-2xl md:text-3xl font-semibold tracking-tight ${titleColor} mb-3`}>
            Enterprise-Grade{' '}
            <span className={accentColor}>AI Architecture</span>
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-4"
          />
          <p className={`${descriptionColor} max-w-2xl mx-auto text-sm leading-relaxed`}>
            IDmize provides a secure intermediary layer between your organization and 
            powerful Large Language Models, ensuring data sovereignty at every step.
          </p>
        </motion.div>

        {/* Content - Centered */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Left Side: Image Container - Centered */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex justify-center w-full lg:w-1/2"
          >
            {/* Ambient glow behind the image */}
            <div className={`absolute inset-0 rounded-full blur-[100px] ${glowBg}`} />
            
            <div className={`relative rounded-xl overflow-hidden border ${isDark ? 'border-white/10' : 'border-gray-200'} bg-gradient-to-br ${isDark ? 'from-white/[0.02] to-transparent' : 'from-gray-50 to-white'} backdrop-blur-sm p-4 max-w-md mx-auto`}>
              <img 
                src="/flow.png" 
                alt="IDmize Architecture Core"
                className="relative z-10 w-full h-auto block drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Right Side: Feature Highlights - Centered */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`group relative ${cardBg} border ${cardBorder} p-5 rounded-xl ${cardHoverBg} ${cardHoverBorder} transition-all duration-300`}
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute -inset-px bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-blue-500/5 rounded-xl transition-all duration-500 pointer-events-none`} />
                  
                  <div className="relative">
                    <div className={`mb-3 ${iconBg} w-8 h-8 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                      <div className={`${iconColor}`}>
                        {feature.icon}
                      </div>
                    </div>
                    <h4 className={`${titleColor} font-semibold text-sm mb-1 group-hover:${accentColor} transition-colors duration-300`}>
                      {feature.title}
                    </h4>
                    <p className={`${descriptionColor} text-xs leading-relaxed`}>
                      {feature.text}
                    </p>
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