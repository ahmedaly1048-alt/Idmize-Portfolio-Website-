"use client";

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Shield, 
  Search, 
  Zap, 
  Layers, 
  FileText, 
  GitFork,
  Sparkles,
  Lock
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
          background: `radial-gradient(250px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.035), transparent 80%)`,
          opacity: hovered ? 1 : 0
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Header row */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-white group-hover:border-zinc-700 transition-colors duration-300">
                <Icon size={15} strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-medium tracking-tight text-zinc-200">
                {title}
              </h3>
            </div>
            {badge && (
              <span className="text-[10px] font-mono tracking-tight px-2 py-0.5 rounded-md border bg-zinc-900 border-zinc-800 text-zinc-400">
                {badge}
              </span>
            )}
          </div>

          {/* Interactive Graphic Container */}
          <div className="mb-6 h-36 rounded-lg overflow-hidden flex items-center justify-center bg-zinc-950 border border-zinc-900 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.01),transparent_70%)]" />
            {children}
          </div>
        </div>

        <div>
          <p className="text-xs leading-relaxed text-zinc-400 font-normal mb-5">
            {description}
          </p>

          <div className="pt-4 border-t border-zinc-900/80 flex items-center justify-between group-hover:border-zinc-800 transition-colors duration-500">
            <span className="text-[11px] font-medium tracking-tight text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300">
              Explore Architecture
            </span>
            <motion.div 
              animate={{ x: hovered ? 2 : 0, y: hovered ? -2 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="text-zinc-500 group-hover:text-white"
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
      title: "Secure Identity Foundation",
      description: "A comprehensive toolkit to issue, manage, and govern zero-knowledge identities for both human workforces and autonomous AI entities.",
      icon: Shield,
      badge: "ZKP-Auth",
      illustration: (
        <div className="relative flex items-center justify-center w-full h-full">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="w-20 h-20 border border-dashed border-zinc-800 rounded-full flex items-center justify-center"
          />
          <div className="absolute w-12 h-12 rounded-xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm flex items-center justify-center shadow-2xl">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Lock className="text-zinc-400 w-4 h-4" strokeWidth={1.5} />
            </motion.div>
          </div>
          <span className="absolute bottom-4 text-[9px] font-mono text-zinc-600">0x71C...84B</span>
        </div>
      )
    },
    {
      title: "Knowledge Discovery & Indexing",
      description: "Identify, map, and index corporate knowledge assets safely across open-source and proprietary enterprise intelligence networks.",
      icon: Search,
      badge: "Vector Graph",
      illustration: (
        <div className="flex flex-col gap-2 w-36">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-6 rounded border border-zinc-900 bg-zinc-900/30 flex items-center justify-between px-2.5 relative overflow-hidden">
              <div className="flex items-center gap-2">
                <div className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-blue-500 animate-pulse' : 'bg-zinc-700'}`} />
                <div className="h-1.5 w-16 bg-zinc-800 rounded-sm" />
              </div>
              <div className="h-1 w-6 bg-zinc-800 rounded-sm" />
              {i === 0 && (
                <motion.div 
                  layoutId="activeLine" 
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-zinc-700" 
                />
              )}
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Agentic Safety Guardrails",
      description: "Deploy autonomous AI agents with context-specific guardrails. Accept API commands while enforcing strict real-time policy compliance.",
      icon: Zap,
      badge: "Real-time",
      illustration: (
        <div className="relative flex items-center justify-center w-full h-full gap-2">
          <div className="flex flex-col gap-1 items-end">
            <div className="w-10 h-1.5 bg-zinc-900 rounded-sm" />
            <div className="w-14 h-1.5 bg-zinc-800 rounded-sm" />
          </div>
          <motion.div 
            animate={{ scale: [1, 1.08, 1], borderColor: ["#27272a", "#52525b", "#27272a"] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="p-2 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 z-10 font-mono text-[9px]"
          >
            GUARD
          </motion.div>
          <div className="flex flex-col gap-1 items-start">
            <div className="w-12 h-1.5 bg-zinc-800 rounded-sm" />
            <div className="w-8 h-1.5 bg-zinc-900 rounded-sm" />
          </div>
        </div>
      )
    },
    {
      title: "Unified Multi-Layer Governance",
      description: "A centralized engine for enforcing granular security policies, managing group permissions, and controlling AI access across all ecosystems.",
      icon: Layers,
      badge: "Engine",
      illustration: (
        <div className="relative flex flex-col items-center justify-center w-full h-full space-y-[-8px]">
          {[0, 1, 2].map((layer) => (
            <motion.div
              key={layer}
              style={{ zIndex: 3 - layer }}
              whileHover={{ y: -4 }}
              className="w-32 h-7 rounded-md border border-zinc-800 bg-zinc-950/90 backdrop-blur-md flex items-center px-3 shadow-xl justify-between"
            >
              <div className="h-1.5 w-12 bg-zinc-800 rounded-sm" />
              <div className={`w-1.5 h-1.5 rounded-full ${layer === 0 ? 'bg-emerald-500' : 'bg-zinc-800'}`} />
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: "Immutable Audit Trails",
      description: "Maintain a tamper-proof cryptographic ledger of all prompt interactions and classification logs for GDPR and compliance audits.",
      icon: FileText,
      badge: "Ledger",
      illustration: (
        <div className="flex gap-1.5 items-center justify-center w-full h-full">
          {[0, 1, 2].map((b) => (
            <motion.div 
              key={b}
              animate={{ y: [0, b % 2 === 0 ? -3 : 3, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: b * 0.2, ease: "easeInOut" }}
              className="w-10 h-12 rounded border border-zinc-900 bg-zinc-900/20 p-1.5 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="h-1 w-full bg-zinc-800 rounded-sm" />
                <div className="h-1 w-2/3 bg-zinc-800 rounded-sm" />
              </div>
              <div className="h-1 w-full bg-zinc-900 rounded-sm" />
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: "Model-Agnostic Routing",
      description: "Seamlessly route queries, cache recurrent prompts, and orchestrate workflows between OpenAI, Gemini, and local weights architecture.",
      icon: GitFork,
      badge: "Multi-LLM",
      illustration: (
        <div className="relative w-40 h-16 flex items-center justify-between">
          <div className="w-5 h-5 rounded-md border border-zinc-800 bg-zinc-900 flex items-center justify-center text-[8px] font-mono text-zinc-400">IN</div>
          
          <div className="absolute inset-x-5 top-1/2 h-[1px] bg-zinc-900 -translate-y-1/2 dotted-track">
            <motion.div 
              animate={{ left: ["0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-zinc-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="text-[8px] font-mono px-1.5 py-0.5 rounded border border-zinc-900 bg-zinc-950 text-zinc-500">GPT</div>
            <div className="text-[8px] font-mono px-1.5 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-zinc-300">GEM</div>
            <div className="text-[8px] font-mono px-1.5 py-0.5 rounded border border-zinc-900 bg-zinc-950 text-zinc-500">LOC</div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden selection:bg-zinc-800 selection:text-white">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090b_1px,transparent_1px),linear-gradient(to_bottom,#09090b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Minimal Header */}
        <div className="max-w-2xl mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -5 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-2 py-0.5 rounded border border-zinc-900 bg-zinc-900/30 text-[10px] font-mono tracking-tight mb-4 text-zinc-400"
          >
            <Sparkles size={10} className="text-zinc-500" />
            CORE CONTEXT ENGINE
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-normal tracking-tight mb-4 text-zinc-100"
          >
            Cryptographic orchestration for <span className="text-zinc-400">multi-agent systems.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs text-zinc-500 max-w-md font-normal leading-relaxed"
          >
            Complete architectural layer for deploying, validating, and protecting high-frequency enterprise intelligence pipelines.
          </motion.p>
        </div>

        {/* 3x2 Grid */}
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

        {/* Bottom Actions */}
        <div className="mt-16 pt-8 border-t border-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-mono text-zinc-600">
            // STATUS: PRODUCTION READY SECURE INFRASTRUCTURE
          </p>
          <motion.button 
            whileHover={{ scale: 1.01, backgroundColor: "#f4f4f5" }}
            whileTap={{ scale: 0.99 }}
            className="text-xs font-medium px-4 py-2 rounded-md transition-colors bg-zinc-100 text-black inline-flex items-center gap-1.5"
          >
            Initialize Platform <ArrowUpRight size={13} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}