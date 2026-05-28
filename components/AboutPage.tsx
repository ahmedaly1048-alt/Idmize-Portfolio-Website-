"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Sparkles, Shield, Zap, Lock, Globe,
  CheckCircle, Target, Eye, TrendingUp, Database,
  Cloud, Server, Brain, ExternalLink,
} from "lucide-react";
import { FaLinkedin } from 'react-icons/fa';

interface AboutPageProps {
  theme?: "light" | "dark";
  onNavigate?: (page: string) => void;
}

// Premium cyber avatars — SVG based, no photos
const CyberAvatar = ({ index, isDark }: { index: number; isDark: boolean }) => {
  const configs = [
    {
      // Dr. Homayoun — neural network / AI architect
      accent: isDark ? "#10b981" : "#059669",
      shape: (
        <g>
          <circle cx="50" cy="35" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
          <circle cx="50" cy="35" r="10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
          <circle cx="50" cy="35" r="3" fill="currentColor" opacity="0.8"/>
          {[[30,20],[70,20],[25,45],[75,45],[35,60],[65,60]].map(([x,y],i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="2.5" fill="currentColor" opacity="0.5"/>
              <line x1="50" y1="35" x2={x} y2={y} stroke="currentColor" strokeWidth="0.5" opacity="0.25"/>
            </g>
          ))}
          <circle cx="50" cy="75" r="12" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
          <line x1="38" y1="75" x2="62" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
          <line x1="50" y1="63" x2="50" y2="87" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
        </g>
      ),
    },
    {
      // Dr. Daniel — shield / security
      accent: isDark ? "#3b82f6" : "#2563eb",
      shape: (
        <g>
          <path d="M50 15 L72 25 L72 50 Q72 68 50 78 Q28 68 28 50 L28 25 Z" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
          <path d="M50 22 L65 30 L65 50 Q65 62 50 70 Q35 62 35 50 L35 30 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
          <path d="M43 47 L48 52 L58 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" fill="none"/>
          <circle cx="50" cy="80" r="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
          {[0,60,120,180,240,300].map((deg,i) => (
            <circle key={i} cx={50 + 14*Math.cos(deg*Math.PI/180)} cy={80 + 14*Math.sin(deg*Math.PI/180)} r="1.5" fill="currentColor" opacity="0.3"/>
          ))}
        </g>
      ),
    },
    {
      // Muhammad — server / backend infrastructure
      accent: isDark ? "#8b5cf6" : "#7c3aed",
      shape: (
        <g>
          {[15,30,45].map((y,i) => (
            <g key={i}>
              <rect x="25" y={y} width="50" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" opacity={0.6 - i*0.1}/>
              <circle cx="32" cy={y+5} r="2" fill="currentColor" opacity="0.5"/>
              <circle cx="40" cy={y+5} r="2" fill="currentColor" opacity="0.3"/>
              <line x1="47" y1={y+5} x2="68" y2={y+5} stroke="currentColor" strokeWidth="0.8" opacity="0.25"/>
            </g>
          ))}
          <line x1="50" y1="60" x2="50" y2="72" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
          <line x1="35" y1="72" x2="65" y2="72" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
          {[35,50,65].map((x,i) => (
            <circle key={i} cx={x} cy="78" r="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
          ))}
          <rect x="20" y="82" width="60" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.2"/>
        </g>
      ),
    },
    {
      // Hamid — business / strategy globe
      accent: isDark ? "#f59e0b" : "#d97706",
      shape: (
        <g>
          <circle cx="50" cy="45" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
          <ellipse cx="50" cy="45" rx="14" ry="28" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
          <line x1="22" y1="45" x2="78" y2="45" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
          <line x1="26" y1="32" x2="74" y2="32" stroke="currentColor" strokeWidth="0.8" opacity="0.2"/>
          <line x1="26" y1="58" x2="74" y2="58" stroke="currentColor" strokeWidth="0.8" opacity="0.2"/>
          <circle cx="50" cy="45" r="4" fill="currentColor" opacity="0.6"/>
          <line x1="50" y1="78" x2="50" y2="88" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
          <line x1="38" y1="85" x2="62" y2="85" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
        </g>
      ),
    },
    {
      // Ammar — code / product engineering
      accent: isDark ? "#06b6d4" : "#0891b2",
      shape: (
        <g>
          <rect x="20" y="18" width="60" height="50" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
          <line x1="20" y1="28" x2="80" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
          <circle cx="28" cy="23" r="2" fill="currentColor" opacity="0.5"/>
          <circle cx="35" cy="23" r="2" fill="currentColor" opacity="0.35"/>
          <circle cx="42" cy="23" r="2" fill="currentColor" opacity="0.25"/>
          <text x="27" y="42" fontSize="7" fill="currentColor" opacity="0.5" fontFamily="monospace">{"<AI/>"}</text>
          <text x="27" y="52" fontSize="6" fill="currentColor" opacity="0.3" fontFamily="monospace">{"fn secure()"}</text>
          <text x="27" y="61" fontSize="6" fill="currentColor" opacity="0.2" fontFamily="monospace">{"  return true"}</text>
          <line x1="40" y1="75" x2="40" y2="85" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
          <line x1="60" y1="75" x2="60" y2="85" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
          <line x1="32" y1="85" x2="68" y2="85" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
        </g>
      ),
    },
  ];

  const config = configs[index] || configs[0];

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Outer ring - removed pulse animation for sleeker look */}
      <div
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: `${config.accent}30` }}
      />
      {/* Inner background */}
      <div
        className="absolute inset-1 rounded-full"
        style={{ background: isDark ? `${config.accent}08` : `${config.accent}10` }}
      />
      {/* SVG icon */}
      <svg
        viewBox="0 0 100 100"
        className="relative z-10 w-16 h-16"
        style={{ color: config.accent }}
      >
        {config.shape}
      </svg>
      {/* Corner accent dot - removed for sleeker look */}
    </div>
  );
};

const teamMembers = [
  {
    name: "Dr. Homayoun Afra",
    role: "Co-Founder & Chief AI Architect",
    focus: "Former Senior AI/ML Research Scientist at Nokia and Sony AI. Expert in decentralized machine learning architectures and holder of multiple US Patents in federated learning.",
    linkedin: "https://www.linkedin.com/in/homayun-afrabandpey-2b4b4180/",
  },
  {
    name: "Dr. Dan Rad",
    role: "Co-Founder & Cybersecurity Lead",
    focus: "25+ years of enterprise security infrastructure experience. Former Head of IT at NEB Bank and CEO at Target Technology Group.",
    linkedin: "https://www.linkedin.com/in/daniel-rb-24962b1/",
  },
  {
    name: "Muhammad Ali Farajian",
    role: "Co-Founder & Backend Lead",
    focus: "15+ years of experience in enterprise data infrastructure. Former core researcher at the AIT (Austrian Institute of Technology).",
    linkedin: "https://www.linkedin.com/in/mohammad-ali-farajian-b39246104/",
  },
  {
    name: "Hamid Gharehbaghi",
    role: "Strategic Adviser",
    focus: "20+ years of expertise as an Enterprise Business Strategist and data compliance lead. 1st Place Winner at Hospiton 2024 and Baltic Sandbox Incubator alumnus.",
    linkedin: "https://www.linkedin.com/in/hamidgharehbaghi/",
  },
  {
    name: "Ammar Haider",
    role: "Lead Product Engineer",
    focus: "Specialist in secure product infrastructure, scalable web architecture, and PWA implementation for enterprise AI platforms.",
    linkedin: "https://www.linkedin.com/in/ammarhaiderak/",
  },
];

const complianceItems = [
  { icon: Shield, text: "EU AI Act Integration" },
  { icon: Zap, text: "NIST AI RMF" },
  { icon: Lock, text: "GDPR & Data Sovereignty" },
  { icon: Globe, text: "ISO/IEC 42001" },
];

const marketStats = [
  { value: "88.9%", label: "Governance Gap", description: "Organizations with no automated control over AI interactions" },
  { value: "55.6%", label: "Executive Priority", description: "C-level execs prioritizing AI Governance for 2026" },
  { value: "3x", label: "Productivity Boost", description: "Average increase with automated governance" },
];

const AboutPage = ({ theme = "dark", onNavigate }: AboutPageProps) => {
  const isDark = theme === "dark";

  const bgColor       = isDark ? "bg-black"               : "bg-gray-50";
  const textPrimary   = isDark ? "text-white"              : "text-gray-900";
  const textSecondary = isDark ? "text-gray-400"           : "text-gray-600";
  const textMuted     = isDark ? "text-gray-500"           : "text-gray-400";
  const borderColor   = isDark ? "border-white/10"         : "border-blue-200";
  const cardBg        = isDark ? "bg-white/[0.02]"         : "bg-white";
  const badgeBg       = isDark ? "bg-white/[0.02] border border-white/5" : "bg-white border border-blue-200 shadow-sm";
  const accentText    = isDark ? "text-blue-400"           : "text-blue-500";
  const iconBg        = isDark ? "bg-blue-500/10"          : "bg-blue-100";
  const metricBg      = isDark ? "bg-blue-950/30"          : "bg-blue-50";

  const handleLinkedInClick = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bgColor}`}>
      {/* Background Grid - reduced opacity for sleeker look */}
      <div
        className={`fixed inset-0 pointer-events-none ${isDark ? "opacity-[0.02]" : "opacity-[0.03]"}`}
        style={{
          backgroundImage: `linear-gradient(${isDark ? "#3b82f6" : "#60a5fa"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "#3b82f6" : "#60a5fa"} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Network SVG pattern - removed for sleeker look */}
      
      {/* Back Button - more refined */}
      <div className="sticky top-16 z-40 pointer-events-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pointer-events-auto">
          <button
            onClick={() => onNavigate?.("home")}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 group
              ${isDark
                ? "bg-white/[0.03] border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20"
                : "bg-white/80 border border-gray-200 text-gray-600 hover:bg-white hover:border-blue-200 shadow-sm"
              }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-14">

        {/* Header - cleaner spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${badgeBg} mb-4`}>
            <Sparkles className={`w-3 h-3 ${accentText}`} />
            <span className={`text-[10px] font-medium uppercase tracking-wider ${accentText}`}>About Us</span>
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold tracking-tight ${textPrimary} mb-4`}>About IDmize</h1>
          <p className={`${accentText} text-base font-medium mb-6`}>Bridging the Gap Between AI Innovation and Global Regulation</p>
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}
            className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-6"
          />
          <p className={`${textSecondary} text-base leading-relaxed max-w-2xl mx-auto`}>
            At IDmize, we believe that the rapid adoption of Artificial Intelligence should not come at the cost of security or legal integrity.
            As enterprises integrate LLMs into their core workflows, we provide the essential governance layer.
          </p>
        </motion.div>

        {/* Mission & Vision - refined cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {[
            { icon: Target, grad: "from-teal-400 to-cyan-500", shadow: "shadow-teal-500/20", title: "Our Mission", divGrad: "from-teal-400 to-cyan-500", body: "To empower organizations with secure AI governance solutions that drive innovation while ensuring compliance, data sovereignty, and enterprise-grade security." },
            { icon: Eye,    grad: "from-cyan-400 to-blue-500", shadow: "shadow-blue-500/20", title: "Our Vision",  divGrad: "from-cyan-400 to-blue-500", body: "To be the global standard for AI governance, enabling every organization to harness the full potential of AI with absolute confidence and compliance." },
          ].map((card, i) => (
            <div key={i} className={`group relative p-8 rounded-2xl border ${borderColor} ${cardBg} transition-all duration-300 hover:border-blue-500/30 hover:-translate-y-1`}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.grad} flex items-center justify-center mb-5 shadow-lg ${card.shadow} group-hover:scale-105 transition-transform duration-300`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <h2 className={`text-2xl font-bold ${textPrimary} mb-3`}>{card.title}</h2>
              <div className={`w-12 h-0.5 bg-gradient-to-r ${card.divGrad} mb-4 rounded-full`} />
              <p className={`text-base ${textSecondary} leading-relaxed`}>{card.body}</p>
            </div>
          ))}
        </motion.div>

        {/* Market Stats - cleaner design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className={`w-full rounded-2xl border ${borderColor} ${metricBg} p-10 text-center mb-20 relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-500/5 to-transparent rounded-full blur-2xl" />
          <div className="relative z-10">
            <h2 className={`text-2xl font-bold ${textPrimary} mb-3`}>The Enterprise AI Governance Gap</h2>
            <p className={`${textSecondary} text-base mb-10 max-w-md mx-auto`}>Critical challenges facing organizations today</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {marketStats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className={`${iconBg} ${accentText} font-bold px-5 py-2 rounded-xl text-3xl mb-4`}>{stat.value}</div>
                  <div className="w-10 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-3" />
                  <h3 className={`text-lg font-semibold ${textPrimary} mb-2`}>{stat.label}</h3>
                  <p className={`${textMuted} text-sm leading-relaxed max-w-[200px] mx-auto`}>{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Market Reality - cleaner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <h2 className={`text-2xl font-semibold ${textPrimary} mb-6`}>The Market Reality</h2>
          <div className="space-y-4">
            {[
              { text: "88.9% of organizations have no automated control over AI interactions", highlight: "88.9%" },
              { text: "55.6% of C-level executives confirm AI Governance is their top priority for 2026", highlight: "55.6%" },
              { text: "Move AI from 'Shadow IT' to a 'Sanctioned Asset'", highlight: "The Goal:" },
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle className={`w-5 h-5 ${accentText} flex-shrink-0 mt-0.5`} />
                <p className={`text-base ${textSecondary}`}>
                  <span className="font-semibold">{item.highlight}</span>{item.text.replace(item.highlight, "")}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Global Compliance - refined */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <h2 className={`text-2xl font-semibold ${textPrimary} mb-4`}>Global Compliance Framework</h2>
          <p className={`${textSecondary} text-base mb-6 leading-relaxed max-w-2xl`}>
            IDmize is built on a &quot;Regulatory-Neutral&quot; architecture, ensuring your organization meets the most stringent standards worldwide.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {complianceItems.map((item, i) => (
              <div key={i} className={`flex items-center gap-3 p-4 rounded-xl border ${borderColor} ${cardBg} hover:border-blue-500/30 transition-all duration-300`}>
                <item.icon className={`w-5 h-5 ${accentText} shrink-0`} />
                <span className={`text-sm font-medium ${textPrimary}`}>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Secure by Design - streamlined */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${badgeBg} mb-5`}>
            <Database className={`w-3 h-3 ${accentText}`} />
            <span className={`text-[10px] font-medium uppercase tracking-wider ${accentText}`}>Architecture</span>
          </div>
          <h2 className={`text-2xl font-semibold ${textPrimary} mb-4`}>Secure by Design Platform</h2>
          <p className={`${textSecondary} text-base mb-6 leading-relaxed max-w-2xl`}>
            Our zero-knowledge architecture ensures that sensitive data never leaves your corporate perimeter while enabling seamless AI integration.
          </p>
          <div className="space-y-3">
            {[
              { icon: Shield, text: "End-to-end encryption for all AI interactions" },
              { icon: Cloud,  text: "Multi-cloud deployment with data sovereignty" },
              { icon: Server, text: "On-premise option for maximum security" },
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle className={`w-5 h-5 ${accentText} flex-shrink-0 mt-0.5`} />
                <p className={`text-base ${textSecondary}`}>{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Continuous Innovation - streamlined */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${badgeBg} mb-5`}>
            <Brain className={`w-3 h-3 ${accentText}`} />
            <span className={`text-[10px] font-medium uppercase tracking-wider ${accentText}`}>Innovation</span>
          </div>
          <h2 className={`text-2xl font-semibold ${textPrimary} mb-4`}>Continuous Innovation & R&D</h2>
          <p className={`${textSecondary} text-base mb-6 leading-relaxed max-w-2xl`}>
            We invest heavily in research and development to stay ahead of emerging AI threats and regulatory changes.
          </p>
          <div className="space-y-3">
            {[
              { text: "Real-time threat detection and response" },
              { text: "Advanced PII/PHI & IP scrubbing algorithms" },
              { text: "Continuous compliance monitoring updates" },
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle className={`w-5 h-5 ${accentText} flex-shrink-0 mt-0.5`} />
                <p className={`text-base ${textSecondary}`}>{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team Section - Sleeker Cards */}
        <div className="py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl font-bold ${textPrimary} mb-3`}>Leadership Team</h2>
            <p className={`text-sm ${textMuted} max-w-lg mx-auto`}>
              A distributed, high-performance team combining global expertise in AI architecture, cybersecurity, and enterprise governance.
            </p>
            <motion.div
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}
              className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-5"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: index * 0.08 }}
                whileHover={{ y: -2 }}
                className={`group relative flex flex-col items-center text-center p-5 rounded-xl
                  ${cardBg} border ${borderColor}
                  transition-all duration-300
                  hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5`}
              >
                {/* Cyber Avatar - sleeker */}
                <div className="mb-4">
                  <CyberAvatar index={index} isDark={isDark} />
                </div>

                {/* Name */}
                <h3 className={`font-semibold text-sm ${textPrimary} mb-1 leading-tight`}>
                  {member.name}
                </h3>

                {/* Role - cleaner */}
                <p className={`text-[10px] font-medium ${accentText} mb-3 uppercase tracking-wide`}>
                  {member.role}
                </p>

                <div className="w-10 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent my-2" />

                {/* Bio - cleaner */}
                <p className={`text-[11px] ${textSecondary} mb-4 text-center line-clamp-3`}>
                  {member.focus}
                </p>

                {/* LinkedIn button - sleeker */}
                <button
                  onClick={() => handleLinkedInClick(member.linkedin)}
                  className={`mt-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-300
                    ${isDark
                      ? "bg-white/5 text-gray-400 hover:bg-blue-500/10 hover:text-blue-400"
                      : "bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  aria-label={`Connect with ${member.name} on LinkedIn`}
                >
                  <FaLinkedin className="w-3 h-3" />
                  Connect
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;