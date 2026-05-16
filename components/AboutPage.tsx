"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowLeft,
  Sparkles,
  Shield,
  Zap,
  Lock,
  Globe,
  CheckCircle,
  Target,
  Eye,
  Users,
  Award,
  Clock,
  TrendingUp,
  Heart,
  Building2,
  BarChart3,
  FileCheck,
  Database,
  Cloud,
  Server,
  Brain,
  Linkedin,
  Twitter,
} from "lucide-react";
import Navbar from "./Navbar";

interface AboutPageProps {
  theme?: "light" | "dark";
  onThemeToggle?: () => void;
  onNavigate?: (page: string) => void;
}

const teamMembers = [
  {
    name: "Dr. Homayoun",
    role: "Co-Founder & AI Tech Lead",
    focus: "Proprietary Core Architecture & Deep Tech",
    image: "/drH.avif",
  },
  {
    name: "Dr. Daniel",
    role: "Co-Founder & Strategic Advisor",
    focus: "AI Governance Frameworks & Market Alignment",
    image: "/DrIs.avif",
  },
  {
    name: "MOHAMMAD",
    role: "Co-Founder & Back-end Lead",
    focus: "Server-side Logic, Database Integrity, and API Infrastructure",
    image: "/M.avif",
  },
  {
    name: "HAMID",
    role: "Strategic Advisor",
    focus: "Global Compliance Strategy, and Business Development Advisor",
    image: "/H.avif",
  },
  {
    name: "Ammar",
    role: "Full-Stack Developer",
    focus: "Product Infrastructure & PWA Implementation",
    image: "/A.avif",
  },
];

const complianceItems = [
  { icon: Shield, text: "EU AI Act Integration", color: "blue" },
  { icon: Zap, text: "NIST AI RMF", color: "cyan" },
  { icon: Lock, text: "GDPR & Data Sovereignty", color: "blue" },
  { icon: Globe, text: "ISO/IEC 42001", color: "cyan" },
];

const marketStats = [
  {
    value: "88.9%",
    label: "Governance Gap",
    description: "Organizations with no automated control over AI interactions",
  },
  {
    value: "55.6%",
    label: "Executive Priority",
    description: "C-level execs prioritizing AI Governance for 2026",
  },
  {
    value: "3x",
    label: "Productivity Boost",
    description: "Average increase with automated governance",
  },
];

const AboutPage = ({
  theme = "dark",
  onThemeToggle,
  onNavigate,
}: AboutPageProps) => {
  const isDark = theme === "dark";

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  // Theme-specific styles
  const bgColor = isDark ? "bg-black" : "bg-gray-50";
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-600";
  const textMuted = isDark ? "text-gray-500" : "text-gray-400";
  const borderColor = isDark ? "border-white/10" : "border-blue-200";
  const cardBg = isDark ? "bg-white/[0.02]" : "bg-white";
  const badgeBg = isDark
    ? "bg-white/[0.02] border border-white/5"
    : "bg-white border border-blue-200 shadow-sm";
  const accentText = isDark ? "text-blue-400" : "text-blue-500";
  const iconBg = isDark ? "bg-blue-500/10" : "bg-blue-100";
  const metricBg = isDark ? "bg-blue-950/30" : "bg-blue-50";

  return (
    <main className={`min-h-screen transition-colors duration-300 ${bgColor}`}>
      <Navbar
        theme={theme}
        onThemeToggle={onThemeToggle}
        onNavigate={onNavigate}
      />

      {/* Background Grid Pattern */}
      <div
        className={`fixed inset-0 pointer-events-none ${isDark ? "opacity-[0.03]" : "opacity-[0.04]"}`}
        style={{
          backgroundImage: `linear-gradient(${isDark ? "#3b82f6" : "#60a5fa"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "#3b82f6" : "#60a5fa"} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Back Button */}
      <div className="fixed top-24 left-6 z-50">
        <button
          onClick={() => onNavigate?.("home")}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 group
            ${
              isDark
                ? "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                : "bg-white border border-blue-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 shadow-sm"
            }`}
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </button>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        {/* Header Section */}
        <motion.section {...fadeIn} className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${badgeBg} mb-4`}
          >
            <Sparkles className={`w-3 h-3 ${accentText}`} />
            <span
              className={`text-[10px] font-medium uppercase tracking-wider ${accentText}`}
            >
              About Us
            </span>
          </div>
          <h1
            className={`text-3xl md:text-4xl font-bold tracking-tight ${textPrimary} mb-3`}
          >
            About IDmize
          </h1>
          <p className={`${accentText} text-sm font-medium mb-6`}>
            Bridging the Gap Between AI Innovation and Global Regulation
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-6"
          />
          <p
            className={`${textSecondary} text-sm leading-relaxed max-w-3xl mx-auto`}
          >
            At IDmize, we believe that the rapid adoption of Artificial
            Intelligence should not come at the cost of security or legal
            integrity. As enterprises integrate LLMs into their core workflows,
            we provide the essential governance layer.
          </p>
        </motion.section>

        {/* Mission & Vision Cards - More Sleek & Prominent */}
        <motion.section
          {...fadeIn}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          <div
            className={`group relative p-6 rounded-xl border-2 ${borderColor} ${cardBg} transition-all duration-500 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1`}
          >
            {/* Decorative corner accent */}
            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-teal-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mb-4 shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform duration-300`}
            >
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className={`text-xl font-bold ${textPrimary} mb-2`}>
              Our Mission
            </h2>
            <div className="w-10 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-500 mb-3 rounded-full" />
            <p className={`text-sm ${textSecondary} leading-relaxed`}>
              To empower organizations with secure AI governance solutions that
              drive innovation while ensuring compliance, data sovereignty, and
              enterprise-grade security.
            </p>
          </div>

          <div
            className={`group relative p-6 rounded-xl border-2 ${borderColor} ${cardBg} transition-all duration-500 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1`}
          >
            {/* Decorative corner accent */}
            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blue-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300`}
            >
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h2 className={`text-xl font-bold ${textPrimary} mb-2`}>
              Our Vision
            </h2>
            <div className="w-10 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 mb-3 rounded-full" />
            <p className={`text-sm ${textSecondary} leading-relaxed`}>
              To be the global standard for AI governance, enabling every
              organization to harness the full potential of AI with absolute
              confidence and compliance.
            </p>
          </div>
        </motion.section>

        {/* Metrics Section - More Sleek & Prominent */}
        <motion.section
          {...fadeIn}
          className={`w-full rounded-2xl border-2 ${borderColor} ${metricBg} p-8 text-center mb-16 relative overflow-hidden group transition-all duration-500 hover:border-blue-500/40 hover:shadow-xl`}
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-500/5 to-transparent rounded-full blur-2xl" />

          {/* Dot pattern background */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative z-10">
            <h2
              className={`text-2xl font-bold ${textPrimary} mb-2 tracking-tight`}
            >
              Trusted by Industry Leaders
            </h2>
            <p className={`${textSecondary} text-sm mb-8 max-w-md mx-auto`}>
              Our track record speaks for itself
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {marketStats.map((stat, idx) => (
                <div key={idx} className="group/stat relative">
                  {/* Hover glow effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-cyan-500/0 rounded-xl transition-all duration-500 group-hover/stat:from-blue-500/10 group-hover/stat:via-blue-500/5 group-hover/stat:to-cyan-500/10" />

                  <div className="relative flex flex-col items-center">
                    <div
                      className={`${iconBg} ${accentText} font-bold px-4 py-2 rounded-xl text-2xl mb-3 shadow-md transition-all duration-300 group-hover/stat:scale-110 group-hover/stat:shadow-lg`}
                    >
                      {stat.value}
                    </div>
                    <div className="w-8 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-2" />
                    <h3
                      className={`text-base font-semibold ${textPrimary} mb-1`}
                    >
                      {stat.label}
                    </h3>
                    <p
                      className={`${textMuted} text-xs leading-relaxed max-w-[180px] mx-auto`}
                    >
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SECTION 2: Market Reality - Image Left, Text Right - Larger Image */}
        <motion.section {...fadeIn} className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-1 md:order-1 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <Image
                  src="/icon (2).png"
                  alt="IDmize Identity Logo"
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>
            </div>
            <div className="order-2 md:order-2">
              <h2 className={`text-xl font-semibold ${textPrimary} mb-4`}>
                The Market Reality
              </h2>
              <div className="space-y-3">
                {[
                  {
                    text: "88.9% of organizations have no automated control over AI interactions",
                    highlight: "88.9%",
                  },
                  {
                    text: "55.6% of C-level executives confirm AI Governance is their top priority for 2026",
                    highlight: "55.6%",
                  },
                  {
                    text: "Move AI from 'Shadow IT' to a 'Sanctioned Asset'",
                    highlight: "The Goal:",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <CheckCircle
                      className={`w-4 h-4 ${accentText} flex-shrink-0 mt-0.5`}
                    />
                    <p className={`text-sm ${textSecondary}`}>
                      <span className="font-semibold">{item.highlight}</span>
                      {item.text.replace(item.highlight, "")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 3: Global Compliance Framework - Image Right, Text Left - Larger Image */}
        <motion.section {...fadeIn} className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <h2 className={`text-xl font-semibold ${textPrimary} mb-4`}>
                Global Compliance Framework
              </h2>
              <p className={`${textSecondary} text-sm mb-5 leading-relaxed`}>
                IDmize is built on a "Regulatory-Neutral" architecture, ensuring
                your organization meets the most stringent standards worldwide.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {complianceItems.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 p-2 rounded-lg ${iconBg}`}
                  >
                    <item.icon className={`w-4 h-4 ${accentText}`} />
                    <span className={`text-xs font-medium ${textPrimary}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-2 flex justify-center">
              <div className="relative w-64 h-48 md:w-80 md:h-60">
                <Image
                  src="/illus1.png"
                  alt="Global Compliance Framework"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 1: Secure by Design Platform - Image Right, Text Left - Larger Image */}
        <motion.section {...fadeIn} className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <div
                className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${badgeBg} mb-4`}
              >
                <Database className={`w-3 h-3 ${accentText}`} />
                <span
                  className={`text-[9px] font-medium uppercase tracking-wider ${accentText}`}
                >
                  Architecture
                </span>
              </div>
              <h2 className={`text-xl font-semibold ${textPrimary} mb-4`}>
                Secure by Design Platform
              </h2>
              <p className={`${textSecondary} text-sm mb-5 leading-relaxed`}>
                Our zero-knowledge architecture ensures that sensitive data
                never leaves your corporate perimeter while enabling seamless AI
                integration.
              </p>
              <div className="space-y-2.5">
                {[
                  {
                    icon: Shield,
                    text: "End-to-end encryption for all AI interactions",
                  },
                  {
                    icon: Cloud,
                    text: "Multi-cloud deployment with data sovereignty",
                  },
                  {
                    icon: Server,
                    text: "On-premise option for maximum security",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <CheckCircle
                      className={`w-4 h-4 ${accentText} flex-shrink-0 mt-0.5`}
                    />
                    <p className={`text-sm ${textSecondary}`}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-2 flex justify-center">
              <div className="relative w-80 h-64 md:w-96 md:h-72">
                <Image
                  src="/illus2.png"
                  alt="Platform Architecture"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 4: Continuous Innovation & R&D - Image Left, Text Right - Larger Image */}
        <motion.section {...fadeIn} className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-1 flex justify-center">
              <div className="relative w-80 h-64 md:w-96 md:h-72">
                <Image
                  src="/illus3.png"
                  alt="Innovation & R&D"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="order-2">
              <div
                className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${badgeBg} mb-4`}
              >
                <Brain className={`w-3 h-3 ${accentText}`} />
                <span
                  className={`text-[9px] font-medium uppercase tracking-wider ${accentText}`}
                >
                  Innovation
                </span>
              </div>
              <h2 className={`text-xl font-semibold ${textPrimary} mb-4`}>
                Continuous Innovation & R&D
              </h2>
              <p className={`${textSecondary} text-sm mb-5 leading-relaxed`}>
                We invest heavily in research and development to stay ahead of
                emerging AI threats and regulatory changes.
              </p>
              <div className="space-y-2.5">
                {[
                  {
                    icon: Zap,
                    text: "Real-time threat detection and response",
                  },
                  {
                    icon: Shield,
                    text: "Advanced PII/PHI scrubbing algorithms",
                  },
                  {
                    icon: TrendingUp,
                    text: "Continuous compliance monitoring updates",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <CheckCircle
                      className={`w-4 h-4 ${accentText} flex-shrink-0 mt-0.5`}
                    />
                    <p className={`text-sm ${textSecondary}`}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Team Section - More Sleek and Prominent */}
        <section className="py-8">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`text-2xl font-semibold ${textPrimary} mb-8 text-center`}
          >
            Our Leadership Team
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`group relative flex flex-col items-center text-center p-5 rounded-xl ${cardBg} border-2 ${borderColor} transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10`}
              >
                {/* Avatar with ring */}
                <div
                  className={`relative w-28 h-28 mb-4 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-blue-500 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                <h3 className={`font-bold text-sm ${textPrimary} mb-1`}>
                  {member.name}
                </h3>
                <p
                  className={`text-[9px] font-semibold ${accentText} mb-2 text-center uppercase tracking-wide`}
                >
                  {member.role}
                </p>
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent my-2" />
                <p
                  className={`text-[8px] ${textMuted} text-center leading-relaxed`}
                >
                  {member.focus}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...fadeIn}
            className={`${textSecondary} text-sm leading-relaxed max-w-3xl mx-auto text-center`}
          >
            Our strength is built on a{" "}
            <span className={`font-semibold ${textPrimary}`}>
              hybrid and high-performance team
            </span>
            , combining global expertise with dedicated{" "}
            <span className={`font-semibold ${textPrimary}`}>
              on-site collaboration
            </span>
            . We bring together specialists in software architecture,
            cybersecurity, and product management to solve complex AI governance
            challenges.
          </motion.p>
        </section>
      </div>

      {/* Custom Scroller Styles */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: ${isDark ? "#000000" : "#f3f4f6"};
          border-left: 1px solid
            ${isDark ? "rgba(59, 130, 246, 0.15)" : "rgba(59, 130, 246, 0.1)"};
        }
        ::-webkit-scrollbar-thumb {
          background: ${isDark ? "#2563eb" : "#3b82f6"};
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? "#3b82f6" : "#2563eb"};
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: ${isDark ? "#2563eb #000000" : "#3b82f6 #f3f4f6"};
        }
      `}</style>
    </main>
  );
};

export default AboutPage;
