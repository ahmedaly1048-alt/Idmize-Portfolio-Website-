"use client";

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  UserCheck, 
  ShieldAlert, 
  Fingerprint, 
  FileCheck, 
  Lock, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  icon: React.ComponentType<any>;
  badge?: string;
  index: number;
}

const FeatureCard = ({ 
  title, 
  description, 
  children, 
  icon: Icon, 
  badge,
  index
}: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-6 rounded-xl overflow-hidden bg-zinc-950/40 border border-zinc-900 transition-colors duration-500 hover:bg-zinc-950/60 hover:border-zinc-800"
    >
      {/* Premium Minimal Spotlight Effect */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 raw-spotlight"
        style={{
          background: `radial-gradient(250px circle at ${coords.x}px ${coords.y}px, rgba(59, 130, 246, 0.04), transparent 80%)`,
          opacity: hovered ? 1 : 0
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Header row */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-colors duration-300">
                <Icon size={15} strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-medium tracking-tight text-zinc-200">
                {title}
              </h3>
            </div>
            {badge && (
              <span className="text-[10px] font-mono tracking-tight px-2 py-0.5 rounded-md border bg-zinc-900 border-zinc-800 text-zinc-400 group-hover:text-zinc-300 group-hover:border-zinc-700 transition-colors duration-300">
                {badge}
              </span>
            )}
          </div>

          {/* Clean Functional Graphic Container */}
          <div className="mb-6 h-36 rounded-lg overflow-hidden flex items-center justify-center bg-zinc-950 border border-zinc-900 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.005),transparent_70%)]" />
            {children}
          </div>
        </div>

        <div>
          <p className="text-xs leading-relaxed text-zinc-400 font-normal mb-5">
            {description}
          </p>

          <div className="pt-4 border-t border-zinc-900/80 flex items-center justify-between group-hover:border-zinc-800 transition-colors duration-500">
            <span className="text-[11px] font-medium tracking-tight text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300">
              Explore Layer Specs
            </span>
            <motion.div 
              animate={{ x: hovered ? 2 : 0, y: hovered ? -2 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="text-zinc-500 group-hover:text-blue-400"
            >
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function IDmizePlatform() {
  const features = [
    {
      title: "EU AI Act Integration",
      description: "Human-in-the-Loop control indicators and absolute framework accountability to enforce auditable alignment and real-time performance tracking.",
      icon: UserCheck,
      badge: "HITL Control",
      illustration: (
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          {/* Active human verification pipeline visualization */}
          <div className="flex items-center gap-3 relative z-10">
            <div className="h-1.5 w-12 bg-zinc-900 rounded-sm overflow-hidden relative">
              <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="w-1/2 h-full bg-zinc-700" />
            </div>
            <motion.div 
              animate={{ scale: [1, 1.05, 1], borderColor: ["#27272a", "#3b82f6", "#27272a"] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm text-cyan-400 shadow-xl"
            >
              <UserCheck size={20} strokeWidth={1.5} />
            </motion.div>
            <div className="h-1.5 w-12 bg-zinc-900 rounded-sm overflow-hidden relative">
              <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 1 }} className="w-1/2 h-full bg-zinc-700" />
            </div>
          </div>
          <span className="absolute bottom-4 text-[9px] font-mono text-zinc-600 tracking-wider">AUDIT STATE: VALIDATED</span>
        </div>
      )
    },
    {
      title: "NIST AI RMF",
      description: "A continuous native risk management framework deployment that aggressively monitors, measures, and mitigates systemic vulnerabilities.",
      icon: ShieldAlert,
      badge: "Risk Mitigation",
      illustration: (
        <div className="relative flex items-center justify-center w-full h-full">
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="w-20 h-20 border border-dashed border-zinc-900 rounded-full flex items-center justify-center"
          />
          <div className="absolute w-12 h-12 rounded-xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm flex items-center justify-center shadow-xl">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-amber-400"
            >
              <ShieldAlert size={18} strokeWidth={1.5} />
            </motion.div>
          </div>
          <span className="absolute bottom-4 text-[9px] font-mono text-zinc-600 tracking-wider">PREVENTIVE MONITORING</span>
        </div>
      )
    },
    {
      title: "GDPR & Data Sovereignty",
      description: "Automated classification pipelines separating personal or enterprise data based on strict compliance boundaries into safe silos.",
      icon: Fingerprint,
      badge: "Privacy Layer",
      illustration: (
        <div className="flex flex-col gap-2 w-40">
          {[0, 1].map((i) => (
            <div key={i} className="h-8 rounded-lg border border-zinc-900 bg-zinc-900/20 flex items-center justify-between px-3 relative overflow-hidden">
              <div className="flex items-center gap-2.5">
                <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-800'}`} />
                <span className="text-[10px] font-mono text-zinc-500">{i === 0 ? "PII_SCRUBBED" : "IP_PROTECTED"}</span>
              </div>
              <Fingerprint size={12} className={i === 0 ? "text-emerald-500/70" : "text-zinc-700"} strokeWidth={1.5} />
              {i === 0 && (
                <motion.div 
                  layoutId="activePipeline" 
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-emerald-500/30" 
                />
              )}
            </div>
          ))}
        </div>
      )
    },
    {
      title: "ISO/IEC 42001 Standard",
      description: "Systemic execution of organizational AI ethics and deployment standard requirements mapped across business operational logic.",
      icon: FileCheck,
      badge: "Ethical Blueprint",
      illustration: (
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <div className="w-28 border border-zinc-900 bg-zinc-900/30 rounded-lg p-2.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-2 w-16 bg-zinc-800 rounded-sm" />
              <FileCheck size={12} className="text-blue-400" strokeWidth={1.5} />
            </div>
            <div className="h-1 w-full bg-zinc-900 rounded-xs" />
            <div className="h-1 w-5/6 bg-zinc-900 rounded-xs" />
          </div>
          <span className="absolute bottom-3 text-[9px] font-mono text-zinc-600 tracking-wider">STANDARD COMPLIANT</span>
        </div>
      )
    },
    {
      title: "Secure by Design Platform",
      description: "A secure cryptographic environment housing end-to-end interactions inside multi-cloud and on-premise barriers with zero data leaks.",
      icon: Lock,
      badge: "Zero-Knowledge",
      illustration: (
        <div className="relative w-44 h-16 flex items-center justify-between px-4">
          <div className="w-7 h-7 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center text-[9px] font-mono text-zinc-400">CORE</div>
          
          <div className="absolute inset-x-11 top-1/2 h-[1px] bg-zinc-900 -translate-y-1/2">
            <motion.div 
              animate={{ left: ["0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            />
          </div>

          <motion.div 
            animate={{ borderColor: ["#27272a", "#10b981", "#27272a"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-8 rounded-xl border border-zinc-800 bg-zinc-950 flex items-center justify-center text-emerald-400"
          >
            <Lock size={14} strokeWidth={1.5} />
          </motion.div>
          
          <div className="w-7 h-7 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center text-[9px] font-mono text-zinc-400">LLM</div>
        </div>
      )
    },
    {
      title: "Continuous R&D Innovation",
      description: "Automated real-time regulatory ingestion, updating protection algorithms to respond instantly to emerging AI threat environments.",
      icon: RefreshCw,
      badge: "Threat Telemetry",
      illustration: (
        <div className="relative flex items-center justify-center w-full h-full">
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="text-zinc-700"
            >
              <RefreshCw size={36} strokeWidth={1} />
            </motion.div>
            <div className="absolute text-purple-400">
              <Sparkles size={14} strokeWidth={1.5} />
            </div>
          </div>
          <span className="absolute bottom-4 text-[9px] font-mono text-zinc-600 tracking-wider">LIVE RE-OPTIMIZATION</span>
        </div>
      )
    }
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden selection:bg-zinc-800 selection:text-white">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090b_1px,transparent_1px),linear-gradient(to_bottom,#09090b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block aligned to newly parsed IDmize core mission */}
        <div className="max-w-2xl mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -5 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-2 py-0.5 rounded border border-zinc-900 bg-zinc-900/30 text-[10px] font-mono tracking-tight mb-4 text-zinc-400"
          >
            <Sparkles size={10} className="text-zinc-500" />
            REGULATORY-NEUTRAL ARCHITECTURE
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-normal tracking-tight mb-4 text-zinc-100"
          >
            Bridging the gap between <span className="text-zinc-400">AI innovation and global regulation.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs text-zinc-500 max-w-md font-normal leading-relaxed"
          >
            Empowering enterprise systems to completely transition dynamic LLM instances from unmanaged Shadow IT into fully sanctioned corporate assets.
          </motion.p>
        </div>

        {/* 3x2 High-Impact Compliance Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              index={idx}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              badge={feature.badge}
            >
              {feature.illustration}
            </FeatureCard>
          ))}
        </div>

        
      </div>
    </section>
  );
}