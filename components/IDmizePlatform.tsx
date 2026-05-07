"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Shield, Search, Zap, Lock, Globe, Database, Sparkles } from 'lucide-react';

interface IDmizePlatformProps {
  theme?: 'light' | 'dark';
}

const FeatureCard = ({ title, description, children, icon: Icon, theme }: {
  title: string;
  description: string;
  children: React.ReactNode;
  icon?: any;
  theme: 'light' | 'dark';
}) => {
  const isDark = theme === 'dark';

  return (
    <div className={`group relative ${isDark ? 'bg-black' : 'bg-white'} border ${isDark ? 'border-white/10' : 'border-blue-200'} p-8 flex flex-col h-full transition-all duration-500 hover:border-blue-500/40`}>
      <div className={`mb-12 relative h-48 w-full ${isDark ? 'bg-black/40' : 'bg-gray-100'} rounded-xl border ${isDark ? 'border-white/10' : 'border-blue-200'} overflow-hidden flex items-center justify-center`}>
        {children}
      </div>
      <div className="mt-auto">
        <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} text-2xl font-bold mb-3 flex items-center gap-2`}>
          {Icon && <Icon size={20} className="text-blue-400" />}
          {title}
        </h3>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm leading-relaxed mb-6`}>
          {description}
        </p>
        <button className={`w-10 h-10 rounded-full border ${isDark ? 'border-white/10' : 'border-blue-300'} flex items-center justify-center transition-all duration-300 ${isDark ? 'group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600' : 'group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500'}`}>
          <ArrowUpRight size={18} />
        </button>
      </div>
    </div>
  );
};

const IDmizePlatform = ({ theme = 'dark' }: IDmizePlatformProps) => {
  const isDark = theme === 'dark';

  return (
    <section className={`${isDark ? 'bg-black' : 'bg-gray-50'} py-24 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className={`${isDark ? 'text-white' : 'text-gray-900'} text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight transition-colors duration-300`}>
          Everything you need in one platform
        </h2>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-px ${isDark ? 'bg-white/10' : 'bg-blue-200'} border ${isDark ? 'border-white/10' : 'border-blue-200'}`}>
          {/* Feature 1: Zero-Knowledge Vault */}
          <FeatureCard 
            title="Secure Identity Foundation"
            description="A comprehensive toolkit to create, launch, and manage Zero-Knowledge identity vaults for your entire enterprise workforce."
            theme={theme}
          >
            <img 
              src="/B1 (3)-Photoroom.png" 
              alt="Identity Vault" 
              className="w-full h-full object-contain p-6 opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </FeatureCard>

          {/* Feature 2: Context-Aware Indexing */}
          <FeatureCard 
            title="Knowledge Discovery & Indexing"
            description="Identify and index your knowledge assets with context-aware AI. Bridge the gap between siloed data and agentic intelligence."
            theme={theme}
          >
            <img 
              src="/b6-Photoroom.png" 
              alt="Knowledge Discovery" 
              className="w-full h-full object-contain p-6 opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </FeatureCard>

          {/* Feature 3: Agentic Guardrails */}
          <FeatureCard 
            title="Safe Automation Guardrails"
            description="Deploy AI agents with context-specific guardrails. Accept HTTP and agentic commands while ensuring full policy compliance."
            theme={theme}
          >
            <img 
              src="/b5-Photoroom.png" 
              alt="Agentic Guardrails" 
              className="w-full h-full object-contain p-6 opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </FeatureCard>

          {/* Feature 4: Global Governance */}
          <FeatureCard 
            title="Unified Multi-Layer Governance"
            description="Powerful API specialized for enforcing multi-layer policies across groups, apps, and autonomous agents globally."
            theme={theme}
          >
            <img 
              src="/chatbox-Photoroom.png" 
              alt="Global Governance" 
              className="w-full h-full object-contain p-6 opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </FeatureCard>

          {/* Feature 5: Enterprise Identity Vault */}
          <FeatureCard 
            title="Enterprise Identity Vault"
            description="A comprehensive toolkit to create, launch, and manage Zero-Knowledge identity vaults for your entire enterprise."
            icon={Lock}
            theme={theme}
          >
            <img 
              src="/b1 (2)-Photoroom.png" 
              alt="Enterprise Vault" 
              className="w-full h-full object-contain p-6 opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </FeatureCard>

          {/* Feature 6: Agentic Safety Guardrails */}
          <FeatureCard 
            title="Agentic Safety Guardrails"
            description="Deploy AI agents with context-specific guardrails. Accept HTTP and agentic commands while ensuring compliance."
            icon={Zap}
            theme={theme}
          >
            <img 
              src="/b9-Photoroom.png" 
              alt="Safety Guardrails" 
              className="w-full h-full object-contain p-6 opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </FeatureCard>
        </div>

        {/* Case Studies Footer */}
        <div className="mt-24 text-center">
           <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} text-3xl font-bold mb-4 transition-colors duration-300`}>Trusted by the best</h3>
           <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mb-8 transition-colors duration-300`}>Powering secure AI workflows across verticals — from fintech to enterprise SaaS.</p>
           <button className={`${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-blue-500 text-white hover:bg-blue-600'} px-8 py-3 rounded-full font-bold transition-colors inline-flex items-center gap-2`}>
             View all case studies <ArrowUpRight size={20} />
           </button>
        </div>
      </div>
    </section>
  );
};

export default IDmizePlatform;