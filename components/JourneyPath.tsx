"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Shield, Search, Bot, Settings, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

interface JourneyPathProps {
  theme?: 'light' | 'dark';
}

const steps = [
  { 
    id: "step-1", 
    icon: Shield, 
    title: "Secure Foundation", 
    heading: "Integrate IDmize Vault", 
    description: "Implement the IDmize Vault. Up and running in minutes with Zero-Knowledge security.",
    stepNumber: "01",
    highlight: "Zero-Knowledge Security"
  },
  { 
    id: "step-2", 
    icon: Search, 
    title: "Knowledge Discovery", 
    heading: "Identify and Index", 
    description: "Identify and index your knowledge assets with context-aware AI.",
    stepNumber: "02",
    highlight: "Context-Aware AI"
  },
  { 
    id: "step-3", 
    icon: Bot, 
    title: "Safe Automation", 
    heading: "Deploy Agents", 
    description: "Deploy AI agents with context-specific guardrails. Focus on work, not compliance.",
    stepNumber: "03",
    highlight: "Context-Specific Guardrails"
  },
  { 
    id: "step-4", 
    icon: Settings, 
    title: "Unified Governance", 
    heading: "Enforce Policies", 
    description: "Enforce multi-layer policies across groups, apps, and agents cleanly.",
    stepNumber: "04",
    highlight: "Multi-Layer Policies"
  },
  { 
    id: "step-5", 
    icon: CheckCircle, 
    title: "Enterprise Assurance", 
    heading: "Regulatory Compliance", 
    description: "Ensure complete data sovereignty, full audit trails, and global regulatory compliance.",
    stepNumber: "05",
    highlight: "Complete Data Sovereignty"
  }
];

const JourneyPath = ({ theme = 'dark' }: JourneyPathProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 40, 
    damping: 25,
    restDelta: 0.001
  });

  const activeStepFloat = useTransform(scrollYProgress, [0, 1], [0, steps.length - 1]);

  // Theme-specific styles
  const bgColor = isDark ? 'bg-black' : 'bg-gray-50';
  const gridColor = isDark ? '#3b82f6' : '#60a5fa';
  const gridOpacity = isDark ? 'opacity-[0.06]' : 'opacity-[0.08]';
  const pathBgColor = isDark ? '#1e3a5f' : '#bfdbfe';
  const pathActiveColor = isDark ? '#3b82f6' : '#2563eb';
  const orb1Bg = isDark ? 'bg-blue-600/8' : 'bg-blue-400/15';
  const orb2Bg = isDark ? 'bg-blue-500/4' : 'bg-blue-300/10';
  const badgeBg = isDark ? 'bg-white/[0.02] border border-white/5' : 'bg-white border border-gray-200 shadow-sm';
  const badgeText = isDark ? 'text-blue-400' : 'text-blue-500';
  const titleText = isDark ? 'text-white' : 'text-gray-900';
  const cardBg = isDark ? 'bg-white/[0.04]' : 'bg-white';
  const cardBorderDefault = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)';
  const cardBorderActive = isDark ? 'rgba(59,130,246,1)' : 'rgba(37,99,235,1)';
  const stepNumberBg = isDark ? 'bg-blue-600/20 border-blue-500/30' : 'bg-blue-100 border-blue-300';
  const stepNumberText = isDark ? 'text-blue-400' : 'text-blue-600';
  const iconBg = isDark ? 'from-blue-600/30 to-blue-500/20' : 'from-blue-100 to-blue-50';
  const iconText = isDark ? 'text-blue-400' : 'text-blue-500';
  const headingText = isDark ? 'text-blue-400' : 'text-blue-500';
  const cardTitle = isDark ? 'text-white' : 'text-gray-900';
  const cardTitleHover = isDark ? 'group-hover:text-blue-400' : 'group-hover:text-blue-500';
  const descriptionText = isDark ? 'text-gray-300' : 'text-gray-600';
  const highlightBg = isDark ? 'bg-blue-600/15 border-blue-500/30' : 'bg-blue-100 border-blue-300';
  const highlightText = isDark ? 'text-blue-400' : 'text-blue-600';
  const arrowColor = isDark ? 'text-blue-400' : 'text-blue-500';
  const hoverGlow = isDark 
    ? 'group-hover:from-blue-500/15 group-hover:via-blue-500/10' 
    : 'group-hover:from-blue-400/15 group-hover:via-blue-400/10';

  return (
    <section ref={containerRef} className={`relative ${bgColor} py-20 overflow-hidden transition-colors duration-300`}>
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
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${badgeBg} mb-3`}>
            <Sparkles className={`w-3 h-3 ${badgeText}`} />
            <span className={`text-[10px] font-medium uppercase tracking-wider ${badgeText}`}>Journey</span>
          </div>
          <h2 className={`text-2xl md:text-3xl font-semibold tracking-tight ${titleText}`}>
            The IDmize Trust Platform Journey
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-3"
          />
        </motion.div>

        {/* Timeline Layout - Centered */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Path SVG */}
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none" className="overflow-visible">
              <path
                d="M 250,0 C 250,150 750,50 750,250 C 750,450 250,350 250,500 C 250,650 750,550 750,750 C 750,950 250,850 250,1000"
                fill="transparent"
                stroke={pathBgColor}
                strokeWidth="2"
                strokeDasharray="8 8"
                className="opacity-30"
              />
              <motion.path
                d="M 250,0 C 250,150 750,50 750,250 C 750,450 250,350 250,500 C 250,650 750,550 750,750 C 750,950 250,850 250,1000"
                fill="transparent"
                stroke={pathActiveColor}
                strokeWidth="2"
                strokeDasharray="8 8"
                style={{ pathLength }}
                className="opacity-70"
              />
            </svg>
          </div>

          {/* Steps - Centered Cards */}
          <div className="space-y-20">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              
              const opacity = useTransform(
                activeStepFloat,
                [index - 0.6, index, index + 0.6],
                [0.4, 1, 0.4]
              );

              const scale = useTransform(
                activeStepFloat,
                [index - 0.6, index, index + 0.6],
                [0.96, 1.03, 0.96]
              );

              const borderColor = useTransform(
                activeStepFloat,
                [index - 0.5, index, index + 0.5],
                [cardBorderDefault, cardBorderActive, cardBorderDefault]
              );

              return (
                <div 
                  key={step.id} 
                  className={`flex w-full ${isEven ? 'justify-start' : 'justify-end'} relative items-center`}
                >
                  <motion.div 
                    style={{ opacity, scale }}
                    className="group relative w-full md:w-[45%]"
                  >
                    <div className={`absolute -inset-px bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 rounded-xl transition-all duration-500 ${hoverGlow}`} />
                    
                    <motion.div 
                      style={{ borderColor }}
                      className={`relative ${cardBg} border rounded-xl p-5 backdrop-blur-sm transition-colors duration-500 shadow-lg`}
                    >
                      {/* Step Number */}
                      <div className="absolute -top-3 -right-3">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-110 ${stepNumberBg}`}>
                          <span className={`text-[10px] font-bold ${stepNumberText}`}>{step.stepNumber}</span>
                        </div>
                      </div>

                      {/* Icon & Title */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <step.icon className={`w-5 h-5 ${iconText}`} />
                        </div>
                        <div>
                          <p className={`text-[9px] font-bold uppercase tracking-wider ${headingText}`}>{step.heading}</p>
                          <h3 className={`text-base font-semibold ${cardTitle} ${cardTitleHover} transition-colors duration-300`}>
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      
                      <p className={`${descriptionText} text-xs leading-relaxed mb-2`}>{step.description}</p>
                      
                      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border-2 ${highlightBg}`}>
                        <Sparkles className={`w-2 h-2 ${highlightText}`} />
                        <span className={`text-[8px] font-medium uppercase tracking-wider ${highlightText}`}>
                          {step.highlight}
                        </span>
                      </div>

                      <div className={`absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0 ${arrowColor}`}>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-16"
        >
          <div className={`inline-flex items-center gap-2 text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>End-to-end AI governance journey</span>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneyPath;