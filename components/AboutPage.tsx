"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowLeft, Sparkles, Shield, Zap, Lock, Globe,
  CheckCircle, Target, Eye, TrendingUp, Database,
  Cloud, Server, Brain,
} from "lucide-react";
import { FaLinkedin } from 'react-icons/fa';

interface AboutPageProps {
  theme?: "light" | "dark";
  onNavigate?: (page: string) => void;
}

const teamMembers = [
  { name: "Dr. Homayoun", role: "Co-Founder & AI Tech Lead", focus: "Proprietary Core Architecture & Deep Tech", image: "/drH.avif", linkedin: "https://www.linkedin.com/in/homayun-afrabandpey-2b4b4180/" },
  { name: "Dr. Daniel", role: "Co-Founder & Strategic Advisor", focus: "AI Governance Frameworks & Market Alignment", image: "/DrIs.avif", linkedin: "https://www.linkedin.com/in/daniel-rb-24962b1/" },
  { name: "MOHAMMAD", role: "Co-Founder & Back-end Lead", focus: "Server-side Logic, Database Integrity, and API Infrastructure", image: "/M.avif", linkedin: "https://www.linkedin.com/in/mohammad-ali-farajian-b39246104/" },
  { name: "HAMID", role: "Co-Founder & Chief Sustainability Architect", focus: "Global Compliance Strategy, and Business Development Advisory", image: "/H.avif", linkedin: "https://www.linkedin.com/in/hamidgharehbaghi/" },
  { name: "Ammar", role: "Lead Product Engineer", focus: "Product Infrastructure & PWA Implementation", image: "/A.avif", linkedin: "https://www.linkedin.com/in/ammarhaiderak/" },
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

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

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
    // No <main> wrapper with Navbar — LandingPage owns the Navbar
    <div className={`min-h-screen transition-colors duration-300 ${bgColor}`}>
      {/* Background Grid Pattern */}
      <div
        className={`fixed inset-0 pointer-events-none ${isDark ? "opacity-[0.03]" : "opacity-[0.04]"}`}
        style={{
          backgroundImage: `linear-gradient(${isDark ? "#3b82f6" : "#60a5fa"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "#3b82f6" : "#60a5fa"} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Networking SVG pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="networkPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              {[{cx:20,cy:20,r:1.5},{cx:60,cy:20,r:1},{cx:100,cy:20,r:1.5},{cx:20,cy:60,r:1},{cx:60,cy:60,r:2},{cx:100,cy:60,r:1},{cx:20,cy:100,r:1.5},{cx:60,cy:100,r:1},{cx:100,cy:100,r:1.5}].map((c,i) => (
                <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={isDark ? "rgba(59,130,246,0.15)" : "rgba(59,130,246,0.1)"} />
              ))}
              {[[20,20,60,20],[60,20,100,20],[20,20,20,60],[60,20,60,60],[100,20,100,60],[20,60,60,60],[60,60,100,60],[20,60,20,100],[60,60,60,100],[100,60,100,100],[20,100,60,100],[60,100,100,100]].map(([x1,y1,x2,y2],i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={isDark ? "rgba(59,130,246,0.08)" : "rgba(59,130,246,0.05)"} strokeWidth="0.5" />
              ))}
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#networkPattern)" />
        </svg>
      </div>

      {/* Floating animated nodes */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[
          { top:"10%", left:"5%", size:"w-1 h-1", dur:"3s", delay:"0s" },
          { top:"30%", right:"8%", size:"w-1.5 h-1.5", dur:"4s", delay:"1s" },
          { bottom:"20%", left:"10%", size:"w-1 h-1", dur:"3.5s", delay:"0.5s" },
          { top:"60%", right:"15%", size:"w-0.5 h-0.5", dur:"2.5s", delay:"2s" },
          { bottom:"40%", left:"20%", size:"w-1.5 h-1.5", dur:"4.5s", delay:"1.5s" },
        ].map((node, i) => (
          <div key={i} className={`absolute ${node.size} rounded-full bg-blue-400/30 animate-pulse`}
            style={{ top: node.top, left: node.left, right: (node as any).right, bottom: (node as any).bottom, animationDuration: node.dur, animationDelay: node.delay }} />
        ))}
      </div>

      {/* Back Button — offset from top to sit just below the shared Navbar */}
      <div className="sticky top-16 z-40 pointer-events-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pointer-events-auto">
          <button
            onClick={() => onNavigate?.("home")}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 group
              ${isDark
                ? "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                : "bg-white border border-blue-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 shadow-sm"
              }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-14">

        {/* Header */}
        <motion.section {...fadeIn} className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${badgeBg} mb-4`}>
            <Sparkles className={`w-3 h-3 ${accentText}`} />
            <span className={`text-[10px] font-medium uppercase tracking-wider ${accentText}`}>About Us</span>
          </div>
          <h1 className={`text-3xl md:text-4xl font-bold tracking-tight ${textPrimary} mb-3`}>About IDmize</h1>
          <p className={`${accentText} text-sm font-medium mb-6`}>Bridging the Gap Between AI Innovation and Global Regulation</p>
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}
            className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-6"
          />
          <p className={`${textSecondary} text-sm leading-relaxed max-w-3xl mx-auto`}>
            At IDmize, we believe that the rapid adoption of Artificial Intelligence should not come at the cost of security or legal integrity.
            As enterprises integrate LLMs into their core workflows, we provide the essential governance layer.
          </p>
        </motion.section>

        {/* Mission & Vision */}
        <motion.section {...fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            { icon: Target, grad: "from-teal-400 to-cyan-500", shadow: "shadow-teal-500/20", title: "Our Mission", divGrad: "from-teal-400 to-cyan-500", body: "To empower organizations with secure AI governance solutions that drive innovation while ensuring compliance, data sovereignty, and enterprise-grade security." },
            { icon: Eye,    grad: "from-cyan-400 to-blue-500", shadow: "shadow-blue-500/20", title: "Our Vision",  divGrad: "from-cyan-400 to-blue-500", body: "To be the global standard for AI governance, enabling every organization to harness the full potential of AI with absolute confidence and compliance." },
          ].map((card, i) => (
            <div key={i} className={`group relative p-6 rounded-xl border-2 ${borderColor} ${cardBg} transition-all duration-500 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1`}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.grad} flex items-center justify-center mb-4 shadow-lg ${card.shadow} group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <h2 className={`text-xl font-bold ${textPrimary} mb-2`}>{card.title}</h2>
              <div className={`w-10 h-0.5 bg-gradient-to-r ${card.divGrad} mb-3 rounded-full`} />
              <p className={`text-sm ${textSecondary} leading-relaxed`}>{card.body}</p>
            </div>
          ))}
        </motion.section>

        {/* Market Stats */}
        <motion.section {...fadeIn} className={`w-full rounded-2xl border-2 ${borderColor} ${metricBg} p-8 text-center mb-16 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-500/5 to-transparent rounded-full blur-2xl" />
          <div className="relative z-10">
            <h2 className={`text-2xl font-bold ${textPrimary} mb-2`}>The Enterprise AI Governance Gap</h2>
            <p className={`${textSecondary} text-sm mb-8 max-w-md mx-auto`}>Critical challenges facing organizations today</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {marketStats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className={`${iconBg} ${accentText} font-bold px-4 py-2 rounded-xl text-2xl mb-3 shadow-md`}>{stat.value}</div>
                  <div className="w-8 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-2" />
                  <h3 className={`text-base font-semibold ${textPrimary} mb-1`}>{stat.label}</h3>
                  <p className={`${textMuted} text-xs leading-relaxed max-w-[180px] mx-auto`}>{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Market Reality */}
        <motion.section {...fadeIn} className="mb-20">
          <h2 className={`text-xl font-semibold ${textPrimary} mb-4`}>The Market Reality</h2>
          <div className="space-y-3">
            {[
              { text: "88.9% of organizations have no automated control over AI interactions", highlight: "88.9%" },
              { text: "55.6% of C-level executives confirm AI Governance is their top priority for 2026", highlight: "55.6%" },
              { text: "Move AI from 'Shadow IT' to a 'Sanctioned Asset'", highlight: "The Goal:" },
            ].map((item, i) => (
              <div key={i} className="flex gap-2">
                <CheckCircle className={`w-4 h-4 ${accentText} flex-shrink-0 mt-0.5`} />
                <p className={`text-sm ${textSecondary}`}>
                  <span className="font-semibold">{item.highlight}</span>{item.text.replace(item.highlight, "")}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Global Compliance */}
        <motion.section {...fadeIn} className="mb-20">
          <h2 className={`text-xl font-semibold ${textPrimary} mb-4`}>Global Compliance Framework</h2>
          <p className={`${textSecondary} text-sm mb-5 leading-relaxed`}>
            IDmize is built on a "Regulatory-Neutral" architecture, ensuring your organization meets the most stringent standards worldwide.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {complianceItems.map((item, i) => (
              <div key={i} className={`flex items-center gap-2 p-2 rounded-lg ${iconBg}`}>
                <item.icon className={`w-4 h-4 ${accentText}`} />
                <span className={`text-xs font-medium ${textPrimary}`}>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Secure by Design */}
        <motion.section {...fadeIn} className="mb-20">
          <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${badgeBg} mb-4`}>
            <Database className={`w-3 h-3 ${accentText}`} />
            <span className={`text-[9px] font-medium uppercase tracking-wider ${accentText}`}>Architecture</span>
          </div>
          <h2 className={`text-xl font-semibold ${textPrimary} mb-4`}>Secure by Design Platform</h2>
          <p className={`${textSecondary} text-sm mb-5 leading-relaxed`}>
            Our zero-knowledge architecture ensures that sensitive data never leaves your corporate perimeter while enabling seamless AI integration.
          </p>
          <div className="space-y-2.5">
            {[
              { icon: Shield, text: "End-to-end encryption for all AI interactions" },
              { icon: Cloud,  text: "Multi-cloud deployment with data sovereignty" },
              { icon: Server, text: "On-premise option for maximum security" },
            ].map((item, i) => (
              <div key={i} className="flex gap-2">
                <CheckCircle className={`w-4 h-4 ${accentText} flex-shrink-0 mt-0.5`} />
                <p className={`text-sm ${textSecondary}`}>{item.text}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Continuous Innovation */}
        <motion.section {...fadeIn} className="mb-20">
          <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${badgeBg} mb-4`}>
            <Brain className={`w-3 h-3 ${accentText}`} />
            <span className={`text-[9px] font-medium uppercase tracking-wider ${accentText}`}>Innovation</span>
          </div>
          <h2 className={`text-xl font-semibold ${textPrimary} mb-4`}>Continuous Innovation & R&D</h2>
          <p className={`${textSecondary} text-sm mb-5 leading-relaxed`}>
            We invest heavily in research and development to stay ahead of emerging AI threats and regulatory changes.
          </p>
          <div className="space-y-2.5">
            {[
              { text: "Real-time threat detection and response" },
              { text: "Advanced PII/PHI scrubbing algorithms" },
              { text: "Continuous compliance monitoring updates" },
            ].map((item, i) => (
              <div key={i} className="flex gap-2">
                <CheckCircle className={`w-4 h-4 ${accentText} flex-shrink-0 mt-0.5`} />
                <p className={`text-sm ${textSecondary}`}>{item.text}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Team */}
        <section className="py-8">
          <motion.h2
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className={`text-2xl font-semibold ${textPrimary} mb-8 text-center`}
          >
            Our Leadership Team
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: index * 0.1 }} whileHover={{ y: -5 }}
                className={`group relative flex flex-col items-center text-center p-5 rounded-xl ${cardBg} border-2 ${borderColor} transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10`}
              >
                <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-blue-500 transition-all duration-300 shadow-lg">
                  <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-105 transition-all duration-500" />
                </div>
                <h3 className={`font-bold text-sm ${textPrimary} mb-1`}>{member.name}</h3>
                <p className={`text-[9px] font-semibold ${accentText} mb-2 uppercase tracking-wide`}>{member.role}</p>
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent my-2" />
                <p className={`text-[8px] ${textMuted} leading-relaxed mb-3`}>{member.focus}</p>
                <button
                  onClick={() => handleLinkedInClick(member.linkedin)}
                  className={`absolute bottom-3 right-3 p-1.5 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100
                    ${isDark ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400" : "bg-blue-100 hover:bg-blue-200 text-blue-600"}`}
                  aria-label={`Connect with ${member.name} on LinkedIn`}
                >
                  <FaLinkedin className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeIn} className={`${textSecondary} text-sm leading-relaxed max-w-3xl mx-auto text-center`}>
            Our strength is built on a{" "}
            <span className={`font-semibold ${textPrimary}`}>distributed, high-performance team</span>,
            combining global expertise in software architecture, cybersecurity, and regulatory AI governance to solve enterprise challenges.
          </motion.p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;