"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Lock, ArrowRight, Sparkles, Database, Cloud, Server, Users, Eye, BarChart, Globe, CheckCircle } from "lucide-react";
import Image from "next/image";

interface TrustPlatformProps {
  theme?: 'light' | 'dark';
}

const tabs = [
  {
    id: "user-vault",
    label: "ENTERPRISE VAULT",
    badge: "COMMAND THE MISSION",
    title: "Secure Institutional Knowledge with AI",
    description:
      "Map sensitive data once, secure it everywhere, and stay continuously audit-ready. IDmize automates the scrubbing of PII, ensuring your internal knowledge remains private even during AI interactions.",
    cta: "Deploy Secure Vault",
    stat: "3x",
    statText: "Increased productivity with automated data scrubbing",
    icon: Shield,
    image: "/user1 (2).png",
    features: [
      { icon: Shield, text: "Zero-Knowledge Encryption", color: "blue" },
      { icon: Database, text: "Secure Data Storage", color: "cyan" },
      { icon: Users, text: "Team Access Control", color: "blue" },
    ]
  },
  {
    id: "admin-control",
    label: "GOVERNANCE HUB",
    badge: "SECURE PERIMETER",
    title: "Master Control Plane for Global Policies",
    description:
      "A centralized hub to standardize governance, strengthen accountability, and reduce risk. Monitor every AI prompt and response against your specific corporate guardrails in real-time.",
    cta: "Explore Governance Hub",
    stat: "100%",
    statText: "Full visibility into data lineage and AI interactions",
    icon: Lock,
    image: "/admin (2).png",
    features: [
      { icon: Shield, text: "Policy Enforcement", color: "blue" },
      { icon: BarChart, text: "Real-time Analytics", color: "cyan" },
      { icon: Globe, text: "Global Compliance", color: "blue" },
    ]
  },
];

const TrustPlatform = ({ theme = 'dark' }: TrustPlatformProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const isDark = theme === 'dark';

  // Theme-specific styles
  const bgColor = isDark ? 'bg-black' : 'bg-gray-50';
  const gridColor = isDark ? '#3b82f6' : '#60a5fa';
  const gridOpacity = isDark ? 'opacity-[0.06]' : 'opacity-[0.08]';
  const orb1Bg = isDark ? 'bg-blue-600/8' : 'bg-blue-400/15';
  const orb2Bg = isDark ? 'bg-blue-500/4' : 'bg-blue-300/10';
  const badgeBg = isDark ? 'bg-white/[0.02] border border-white/5' : 'bg-white border border-gray-200 shadow-sm';
  const badgeText = isDark ? 'text-blue-400' : 'text-blue-500';
  const titleText = isDark ? 'text-white' : 'text-gray-900';
  const tabActiveText = isDark ? 'text-white' : 'text-gray-900';
  const tabInactiveText = isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600';
  const roleBadgeBg = isDark ? 'bg-white/[0.02] border border-white/5' : 'bg-white border border-gray-200 shadow-sm';
  const roleBadgeText = isDark ? 'text-gray-400' : 'text-gray-500';
  const descriptionText = isDark ? 'text-gray-500' : 'text-gray-600';
  const ctaText = isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-500';
  const statCardBg = isDark ? 'bg-white/[0.02]' : 'bg-white';
  const statCardBorder = isDark ? 'border-blue-500' : 'border-blue-400';
  const statCardDivider = isDark ? 'bg-white/10' : 'bg-gray-200';
  const statText = isDark ? 'text-gray-400' : 'text-gray-500';
  const mainMockupBg = isDark ? 'bg-gradient-to-br from-white/[0.02] to-transparent border border-white/10' : 'bg-white border border-gray-200 shadow-sm';
  const glowBg = isDark ? 'bg-blue-500/5' : 'bg-blue-400/10';

  return (
    <section className={`relative ${bgColor} py-20 overflow-hidden transition-colors duration-300`}>
      {/* Background Grid Pattern */}
      <div
        className={`absolute inset-0 pointer-events-none ${gridOpacity}`}
        style={{
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Subtle gradient orbs */}
      <div className={`absolute top-20 -left-48 w-96 h-96 rounded-full blur-[140px] ${orb1Bg}`} />
      <div className={`absolute bottom-20 -right-48 w-96 h-96 rounded-full blur-[140px] ${orb2Bg}`} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${badgeBg} mb-3`}>
            <Sparkles className={`w-3 h-3 ${badgeText}`} />
            <span className={`text-[10px] font-medium uppercase tracking-wider ${badgeText}`}>
              Platform
            </span>
          </div>
          <h2 className={`text-2xl md:text-3xl font-semibold tracking-tight ${titleText}`}>
            The Agentic Trust Management Platform
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-3"
          />
        </motion.div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center items-center gap-1 mb-12">
          {tabs.map((tab) => (
            <div key={tab.id} className="relative">
              <button
                onClick={() => setActiveTab(tab)}
                className={`
                  relative px-5 py-2 text-[10px] font-medium tracking-[0.2em] transition-all duration-300
                  ${activeTab.id === tab.id ? tabActiveText : tabInactiveText}
                `}
              >
                {tab.label}
                
                {activeTab.id === tab.id && (
                  <motion.div
                    layoutId="activeTabLine"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-10 items-center"
          >
            {/* Left Content */}
            <div className="space-y-5">
              <div className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full ${roleBadgeBg}`}>
                <activeTab.icon className={`w-3 h-3 ${badgeText}`} />
                <span className={`text-[9px] font-medium uppercase tracking-wider ${roleBadgeText}`}>
                  {activeTab.badge}
                </span>
              </div>

              <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${titleText} leading-tight tracking-tight`}>
                {activeTab.title}
              </h3>

              <p className={`${descriptionText} text-sm leading-relaxed`}>
                {activeTab.description}
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group inline-flex items-center gap-2 text-xs font-medium ${ctaText} transition-colors duration-300`}
              >
                <span className="tracking-wide uppercase">{activeTab.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Mini Stat Card */}
              <div className={`${statCardBg} border-l-2 ${statCardBorder} p-4 rounded-r-lg max-w-md`}>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-blue-400">
                    {activeTab.stat}
                  </span>
                  <div className={`h-6 w-px ${statCardDivider}`} />
                  <p className={`text-[10px] leading-relaxed ${statText}`}>
                    {activeTab.statText}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Main Mockup + Text/Icon Features Below */}
            <div className="relative">
              {/* Main Mockup Container */}
              <div className={`relative rounded-xl overflow-hidden ${mainMockupBg} backdrop-blur-sm`}>
                <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                  {activeTab.image ? (
                    <img
                      src={activeTab.image}
                      alt={activeTab.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-6">
                      <activeTab.icon className="w-8 h-8 text-blue-400/20" />
                      <div className="text-center">
                        <p className="text-[9px] text-gray-500 font-mono uppercase tracking-wider">
                          {activeTab.label} Mockup
                        </p>
                        <p className="text-[7px] text-gray-600 mt-1">
                          16:9 Recommended
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Features Below the Mockup - Text + Icons */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                {activeTab.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (idx * 0.1), duration: 0.5, ease: "easeOut" }}
                    className="text-center group"
                  >
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-2 mx-auto transition-all duration-300 group-hover:scale-110
                      ${isDark 
                        ? `bg-${feature.color}-500/20 border border-${feature.color}-500/30` 
                        : `bg-${feature.color}-100 border border-${feature.color}-200`}`}
                    >
                      <feature.icon className={`w-5 h-5 ${isDark ? `text-${feature.color}-400` : `text-${feature.color}-600`}`} />
                    </div>
                    <p className={`text-xs font-medium ${descriptionText}`}>{feature.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* Subtle ambient glow */}
              <div className={`absolute -inset-6 rounded-full blur-3xl -z-10 ${glowBg}`} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </section>
  );
};

export default TrustPlatform;