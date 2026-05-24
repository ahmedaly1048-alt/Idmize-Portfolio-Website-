"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  Shield, 
  Search, 
  Zap, 
  Layers, 
  FileText, 
  GitFork,
  Sparkles,
  Lock,
  Fingerprint
} from 'lucide-react';

const FeatureCard = ({ 
  title, 
  description, 
  children, 
  icon: Icon, 
  gradient,
  badge
}: { 
  title: string; 
  description: string; 
  children: React.ReactNode; 
  icon?: any; 
  gradient: string;
  badge?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [hovered, setHovered] = React.useState(false);

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="group relative p-5 rounded-xl overflow-hidden transition-all duration-300 bg-black/40 border border-white/5 hover:border-blue-500/30"
    >
      {hovered && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(59, 130, 246, 0.08), transparent 80%)`
          }}
        />
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`p-1.5 rounded-lg bg-gradient-to-br ${gradient} bg-opacity-10 flex-shrink-0`}>
              <Icon size={14} className="text-white" />
            </div>
            <h3 className="text-sm font-semibold text-white truncate">
              {title}
            </h3>
          </div>
          {badge && (
            <span className="text-[8px] font-medium px-2 py-0.5 rounded-full border bg-blue-500/10 border-blue-500/20 text-blue-400 whitespace-nowrap flex-shrink-0">
              {badge}
            </span>
          )}
        </div>

        <div className="mb-4 h-44 rounded-lg overflow-hidden flex items-center justify-center bg-black/30">
          {children}
        </div>

        <p className="text-xs leading-relaxed mb-4 text-gray-400">
          {description}
        </p>

        <div className="pt-3 border-t border-dashed border-white/5 flex items-center justify-between">
          <span className="text-[10px] font-medium transition-colors text-gray-500 group-hover:text-gray-300">
            Learn more
          </span>
          <div className="w-7 h-7 rounded-full border border-white/10 text-gray-400 flex items-center justify-center transition-all group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:rotate-45">
            <ArrowUpRight size={11} />
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
      description: "A comprehensive toolkit to issue, manage, and govern zero-knowledge identities for both human workforces and AI entities.",
      icon: Shield,
      badge: "Zero Knowledge",
      gradient: "from-blue-600 to-indigo-600",
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
          
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute w-20 h-20 border border-dashed border-blue-500/20 rounded-full flex items-center justify-center"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="absolute w-14 h-14 border border-blue-400/10 rounded-full"
          />

          <div className="relative z-10 p-2.5 bg-gradient-to-b from-blue-600/10 to-transparent border border-blue-500/30 rounded-2xl shadow-xl backdrop-blur-md">
            <motion.div
              animate={{ scale: [0.97, 1.03, 0.97] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Fingerprint className="text-blue-500" size={22} />
            </motion.div>
            <Lock className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-slate-950 text-indigo-400 rounded-full p-0.5 border border-blue-500/30" />
          </div>

          <div className="absolute top-5 left-1/4 w-1.5 h-1.5 rounded-full bg-indigo-500/60 animate-ping" />
          <div className="absolute bottom-5 right-1/4 w-1 h-1 rounded-full bg-blue-400" />
        </div>
      )
    },
    {
      title: "Knowledge Discovery & Indexing",
      description: "Identify, map, and index corporate knowledge assets safely across open-source and proprietary enterprise intelligence networks.",
      icon: Search,
      badge: "Vector Graph",
      gradient: "from-emerald-500 to-teal-500",
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg className="w-28 h-20" viewBox="0 0 140 80" fill="none">
            <path d="M 15,40 L 45,15 L 95,15 L 125,40 L 95,65 L 45,65 Z" stroke="#10b981" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4"/>
            <line x1="15" y1="40" x2="95" y2="15" stroke="#10b981" strokeWidth="0.6" opacity="0.3"/>
            <line x1="45" y1="65" x2="125" y2="40" stroke="#10b981" strokeWidth="0.6" opacity="0.3"/>
            
            <circle cx="15" cy="40" r="3.5" className="fill-emerald-500/30 stroke-emerald-500" strokeWidth="0.8" />
            <circle cx="45" cy="15" r="2.5" className="fill-emerald-400/60" />
            <circle cx="45" cy="65" r="2.5" className="fill-emerald-400/60" />
            <circle cx="95" cy="15" r="2.5" className="fill-emerald-400/60" />
            <circle cx="95" cy="65" r="2.5" className="fill-emerald-400/60" />
            <circle cx="125" cy="40" r="3.5" className="fill-emerald-500/30 stroke-emerald-500" strokeWidth="0.8" />

            <motion.circle 
              animate={{ 
                cx: [15, 45, 95, 125, 95, 45, 15],
                cy: [40, 15, 15, 40, 65, 65, 40]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              r="1.5" 
              className="fill-emerald-400"
            />
          </svg>

          <motion.div 
            animate={{ 
              x: [-12, 12, -12],
              y: [-8, 8, -8]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute p-1 rounded-md bg-emerald-950/40 border border-emerald-400/40 backdrop-blur-sm"
          >
            <Search className="text-emerald-400" size={10} />
          </motion.div>
        </div>
      )
    },
    {
      title: "Agentic Safety Guardrails",
      description: "Deploy autonomous AI agents with context-specific guardrails. Accept API commands while enforcing strict real-time policy compliance.",
      icon: Zap,
      badge: "Real-time",
      gradient: "from-amber-500 to-orange-500",
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <div className="absolute w-40 h-40 rounded-full bg-amber-500/10 blur-3xl" />
          
          <svg className="w-full h-full p-1 max-w-[260px]" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 20,95 L 80,45 L 145,45 L 180,95 Z" fill="#1e1b4b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1" />
            <line x1="83" y1="48" x2="135" y2="48" stroke="#d97706" strokeWidth="1" />
            <line x1="70" y1="58" x2="145" y2="58" stroke="#d97706" strokeWidth="1" />
            <line x1="50" y1="73" x2="160" y2="73" stroke="#d97706" strokeWidth="1" />

            <motion.g 
              animate={{ y: [0, -1.5, 0], x: [0, 1.5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              transform="translate(45, 48)"
            >
              <rect x="15" y="12" width="44" height="18" rx="9" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <path d="M 25,12 C 25,6 45,6 45,12 Z" fill="#0284c7" fillOpacity="0.6" stroke="#38bdf8" strokeWidth="1" />
              <circle cx="50" cy="18" r="2.5" fill="#38bdf8" className="animate-pulse" />
              <circle cx="23" cy="30" r="5" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
              <circle cx="23" cy="30" r="1.5" fill="#38bdf8" />
              <circle cx="51" cy="30" r="5" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
              <circle cx="51" cy="30" r="1.5" fill="#38bdf8" />
            </motion.g>

            <g transform="translate(25, 78)">
              <polygon points="5,15 11,0 15,0 21,15" fill="#f57c00" />
              <rect x="2" y="15" width="22" height="2" rx="0.5" fill="#d84315" />
              <rect x="8" y="5" width="10" height="3" fill="#ffffff" />
            </g>

            <g transform="translate(155, 68)">
              <polygon points="4,12 9,0 12,0 17,12" fill="#f57c00" />
              <rect x="1" y="12" width="18" height="1.8" rx="0.5" fill="#d84315" />
              <rect x="6" y="4" width="8" height="2.2" fill="#ffffff" />
            </g>

            <g transform="translate(15, 12)">
              <rect x="5" y="5" width="45" height="26" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
              <rect x="5" y="5" width="45" height="7" rx="1" fill="#78350f" />
              <circle cx="10" cy="8.5" r="1" fill="#ef4444" />
              <circle cx="13" cy="8.5" r="1" fill="#eab308" />
              <circle cx="16" cy="8.5" r="1" fill="#22c55e" />
              <text x="9" y="21" fill="#f59e0b" fontSize="7" fontFamily="monospace">API OK</text>
              <path d="M 34,16 L 37,19 L 43,13" stroke="#22c55e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            <g transform="translate(140, 10)">
              <path d="M 15,2 L 2,6 V 16 C 2,22 15,28 15,28 C 15,28 28,22 28,16 V 6 L 15,2 Z" fill="#047857" fillOpacity="0.3" stroke="#10b981" strokeWidth="1.5" />
              <path d="M 10,14 L 14,18 L 21,11" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </div>
      )
    },
    {
      title: "Unified Multi-Layer Governance",
      description: "A centralized engine for enforcing granular security policies, managing group permissions, and controlling AI access across all departments.",
      icon: Layers,
      badge: "Policy Engine",
      gradient: "from-purple-500 to-pink-500",
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center px-4">
          <div className="w-full max-w-[160px] space-y-2.5">
            
            <motion.div 
              whileHover={{ x: 3 }}
              className="flex items-center justify-between px-3 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <span className="text-[7px] font-bold px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded font-mono">L3</span>
                <span className="text-[8px] font-medium text-purple-100">AI Agent Sandbox</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            </motion.div>

            <motion.div 
              whileHover={{ x: 2 }}
              className="flex items-center justify-between px-3 py-2 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <span className="text-[7px] font-bold px-1.5 py-0.5 bg-fuchsia-500/20 text-fuchsia-300 rounded font-mono">L2</span>
                <span className="text-[8px] font-medium text-fuchsia-100">Enterprise Access</span>
              </div>
              <span className="text-[6px] px-1.5 bg-fuchsia-500/20 text-fuchsia-300 rounded">Active</span>
            </motion.div>

            <motion.div 
              whileHover={{ x: 1 }}
              className="flex items-center justify-between px-3 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <span className="text-[7px] font-bold px-1.5 py-0.5 bg-indigo-500/20 text-indigo-300 rounded font-mono">L1</span>
                <span className="text-[8px] font-medium text-indigo-100">Consent Verification</span>
              </div>
              <span className="text-[6px] px-1.5 bg-emerald-500/20 text-emerald-300 rounded">On</span>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      title: "Immutable Audit Trails",
      description: "Maintain a tamper-proof cryptographic ledger of all prompt interactions and classification logs for GDPR and EU AI Act regulatory audits.",
      icon: FileText,
      badge: "Cryptographic",
      gradient: "from-rose-500 to-red-600",
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <div className="absolute w-40 h-40 rounded-full bg-rose-500/10 blur-3xl" />
          
          <svg className="w-full h-full p-2 max-w-[260px]" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(45, 45) rotate(-20)">
              <rect x="0" y="5" width="35" height="15" rx="7.5" fill="none" stroke="#f43f5e" strokeWidth="4.5" />
              <rect x="23" y="10" width="22" height="5" rx="2.5" fill="#fb7185" />
              <rect x="35" y="5" width="35" height="15" rx="7.5" fill="none" stroke="#e11d48" strokeWidth="4.5" />
              <rect x="58" y="10" width="22" height="5" rx="2.5" fill="#fb7185" />
              <rect x="70" y="5" width="35" height="15" rx="7.5" fill="none" stroke="#9f1239" strokeWidth="4.5" />
            </g>

            <g transform="translate(15, 12)">
              <rect x="5" y="5" width="38" height="28" rx="3" fill="#0f172a" stroke="#be123c" strokeWidth="1" />
              <line x1="10" y1="12" x2="28" y2="12" stroke="#fda4af" strokeWidth="1.5" />
              <line x1="10" y1="18" x2="32" y2="18" stroke="#be123c" strokeWidth="1" />
              <line x1="10" y1="23" x2="24" y2="23" stroke="#be123c" strokeWidth="1" />
              <circle cx="32" cy="11" r="2.5" fill="#f43f5e" />
            </g>

            <g transform="translate(135, 12)">
              <rect x="0" y="0" width="50" height="20" rx="4" fill="#311019" stroke="#f43f5e" strokeWidth="0.8" />
              <text x="6" y="12" fill="#fda4af" fontSize="7" fontFamily="sans-serif" fontWeight="bold">GDPR COMPLIANT</text>
            </g>

            <g transform="translate(135, 70)">
              <path d="M 20,4 L 38,12 L 20,20 L 2,12 Z" fill="#881337" stroke="#f43f5e" strokeWidth="1" />
              <path d="M 2,12 L 2,26 L 20,34 L 20,20 Z" fill="#4c0519" stroke="#f43f5e" strokeWidth="1" />
              <path d="M 20,20 L 20,34 L 38,26 L 38,12 Z" fill="#5c0620" stroke="#f43f5e" strokeWidth="1" />
              <circle cx="20" cy="22" r="3" fill="#f43f5e" />
              <line x1="20" y1="22" x2="20" y2="28" stroke="#ffffff" strokeWidth="1" />
            </g>
          </svg>
        </div>
      )
    },
    {
      title: "Model-Agnostic Routing",
      description: "Seamlessly route queries, cache recurrent prompts, and orchestrate workflows between OpenAI, Anthropic, Gemini, and local LLMs while preventing vendor lock-in.",
      icon: GitFork,
      badge: "Multi-LLM Hub",
      gradient: "from-cyan-500 to-sky-600",
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <div className="absolute w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl" />
          
          <svg className="w-full h-full p-2 max-w-[260px]" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(75, 42)">
              <rect x="0" y="0" width="50" height="36" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
              <path d="M 10,18 H 40 M 40,18 L 34,12 M 40,18 L 34,24" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 40,18 H 10 M 10,18 L 16,12 M 10,18 L 16,24" stroke="#0891b2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="25" cy="8" r="1.5" fill="#22d3ee" className="animate-ping" />
            </g>

            <g transform="translate(15, 45)">
              <circle cx="15" cy="15" r="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="1" />
              <circle cx="15" cy="15" r="8" stroke="#0891b2" strokeWidth="0.8" />
              <line x1="15" y1="3" x2="15" y2="27" stroke="#0891b2" strokeWidth="0.8" />
              <line x1="3" y1="15" x2="27" y2="15" stroke="#0891b2" strokeWidth="0.8" />
              <motion.path 
                animate={{ x: [0, 45] }} 
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                d="M 27,15 H 60" 
                stroke="#22d3ee" 
                strokeWidth="1.5" 
                strokeDasharray="3 3" 
              />
            </g>

            <g opacity="0.8" stroke="#06b6d4" strokeWidth="1">
              <path d="M 125,50 C 135,35 145,25 155,25" />
              <path d="M 125,60 H 155" />
              <path d="M 125,70 C 135,85 145,95 155,95" />
            </g>

            <g transform="translate(155, 12)">
              <rect x="0" y="0" width="30" height="20" rx="4" fill="#0f172a" stroke="#0891b2" strokeWidth="1" />
              <text x="6" y="13" fill="#22d3ee" fontSize="8" fontWeight="bold">GPT</text>
            </g>

            <g transform="translate(155, 50)">
              <rect x="0" y="0" width="30" height="20" rx="4" fill="#0f172a" stroke="#0891b2" strokeWidth="1" />
              <text x="6" y="13" fill="#22d3ee" fontSize="8" fontWeight="bold">GEM</text>
            </g>

            <g transform="translate(155, 88)">
              <rect x="0" y="0" width="30" height="20" rx="4" fill="#0f172a" stroke="#0891b2" strokeWidth="1" />
              <text x="6" y="13" fill="#22d3ee" fontSize="8" fontWeight="bold">LOC</text>
            </g>

            <g transform="translate(85, 90)">
              <rect x="2" y="2" width="26" height="16" rx="3" fill="#1e293b" stroke="#06b6d4" strokeWidth="1" />
              <line x1="6" y1="7" x2="24" y2="7" stroke="#0891b2" strokeWidth="1" />
              <line x1="6" y1="12" x2="20" y2="12" stroke="#0891b2" strokeWidth="1" />
              <circle cx="23" cy="12" r="1" fill="#22d3ee" />
            </g>
          </svg>
        </div>
      )
    }
  ];

  return (
    <section className="py-16 bg-black relative overflow-hidden">
      
      {/* Ambient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-transparent to-purple-500/[0.02] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-medium mb-4 border border-blue-500/20 bg-blue-500/5 text-blue-400"
          >
            <Sparkles size={9} />
            IDMIZE PLATFORM
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-white"
          >
            Everything you need in one
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"> platform</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs max-w-lg mx-auto text-gray-400"
          >
            Complete cryptographic ecosystem for building, verifying, and safeguarding multi-agent AI systems
          </motion.p>
        </div>

        {/* Features Grid - 3x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              gradient={feature.gradient}
              badge={feature.badge}
            >
              {feature.illustration}
            </FeatureCard>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-[11px] mb-3 text-gray-500">
            Trusted by 50+ enterprise teams worldwide
          </p>
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="text-xs font-medium px-5 py-2.5 rounded-lg transition-all inline-flex items-center gap-1.5 bg-white text-black hover:bg-gray-200"
          >
            Explore platform <ArrowUpRight size={11} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}