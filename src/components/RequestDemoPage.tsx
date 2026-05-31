"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle, Send, Shield, Clock, Building, Briefcase,
  Users, Sparkles, ChevronDown, ArrowLeft, AlertCircle,
  Zap, Lock, Globe, Star, ArrowUpRight, Server, Database, Brain
} from "lucide-react";

interface RequestDemoPageProps {
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
  onClose?: () => void;
  onNavigate?: (page: string) => void;
}

const RequestDemoPage = ({ theme = 'dark', onClose }: RequestDemoPageProps) => {
  const isDark = theme === 'dark';
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    company: '', 
    role: '', 
    service: '',
    message: '' 
  });

  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/demo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setFormSubmitted(true);
        setFormData({ name: "", email: "", company: "", role: "", service: "", message: "" });
        setTimeout(() => setFormSubmitted(false), 8000);
      } else {
        setErrorMsg(data.errors?.[0]?.message || "Something went wrong. Please try again.");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const bgColor       = isDark ? 'bg-black'    : 'bg-gray-50';
  const gridColor     = isDark ? '#3b82f6'     : '#60a5fa';
  const borderColor   = isDark ? 'border-white/10' : 'border-gray-200';
  const cardBg        = isDark ? 'bg-white/[0.02]' : 'bg-white';
  const textPrimary   = isDark ? 'text-white'  : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-500';
  const textMuted     = isDark ? 'text-gray-500' : 'text-gray-400';
  const inputBg       = isDark ? 'bg-black/60 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900';
  const badgeBg       = isDark ? 'bg-white/[0.02] border border-white/5' : 'bg-white border border-gray-200 shadow-sm';

  const pricingTiers = [
    {
      tier: "Tier 1", title: "Design Partner", subtitle: "Validate AI governance within a specific department.",
      price: "Custom Onboarding", icon: Shield, iconColor: "text-blue-400",
      iconBg: isDark ? "bg-blue-500/10" : "bg-blue-50",
      features: ["Model-Agnostic Core Access", "Real-Time Data Masking (Baseline)", "Identity-Aware Policy Engine", "Single-Department Deployment"],
      cta: "Apply for Pilot", ctaStyle: isDark ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-blue-500 hover:bg-blue-600 text-white",
    },
    {
      tier: "Tier 2", title: "Scale & Compliance", subtitle: "Automated data protection and regulatory compliance.",
      price: "Contact Sales", highlight: true, icon: Zap, iconColor: "text-emerald-400",
      iconBg: isDark ? "bg-emerald-500/10" : "bg-emerald-50",
      features: ["All Tier 1 Features", "Automated Multi-Layer Sanitization", "Active EU AI Act & GDPR Guardrails", "Shared Identity-Linked Knowledge Vaults", "Real-Time Compliance Audit Trails"],
      cta: "Contact Sales", ctaStyle: "bg-emerald-600 hover:bg-emerald-500 text-white",
    },
    {
      tier: "Tier 3", title: "Enterprise Sovereign", subtitle: "Absolute data sovereignty & decentralized control.",
      price: "Custom Enterprise SLA", icon: Lock, iconColor: "text-purple-400",
      iconBg: isDark ? "bg-purple-500/10" : "bg-purple-50",
      features: ["All Scale & Compliance Features", "Decentralized Architecture Deployment", "Zero-Trust Data Infrastructure", "Advanced Agentic Safety Guardrails", "24/7 Enterprise Security Support"],
      cta: "Request Briefing", ctaStyle: isDark ? "bg-white/5 border border-white/10 text-white hover:bg-white/10" : "bg-gray-900 text-white hover:bg-gray-800",
    },
  ];

  const serviceOptions = [
    { value: "design-partner", label: "Tier 1: Design Partner Pilot", icon: Shield, description: "Validate AI governance within a specific department" },
    { value: "scale-compliance", label: "Tier 2: Scale & Compliance", icon: Zap, description: "Automated data protection and regulatory compliance" },
    { value: "enterprise-sovereign", label: "Tier 3: Enterprise Sovereign", icon: Lock, description: "Absolute data sovereignty & decentralized control" },
    { value: "custom-solution", label: "Custom Enterprise Solution", icon: Server, description: "Tailored architecture for specific needs" },
    { value: "security-audit", label: "AI Security Audit", icon: Database, description: "Comprehensive governance assessment" },
    { value: "consultation", label: "Strategic Consultation", icon: Brain, description: "Expert guidance on AI governance" },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bgColor} overflow-y-auto`}>
      {/* Background grid */}
      <div
        className={`fixed inset-0 pointer-events-none ${isDark ? 'opacity-[0.03]' : 'opacity-[0.04]'}`}
        style={{
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Network SVG Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="networkPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              {[{cx:20,cy:20,r:1.5},{cx:60,cy:20,r:1},{cx:100,cy:20,r:1.5},{cx:20,cy:60,r:1},{cx:60,cy:60,r:2},{cx:100,cy:60,r:1},{cx:20,cy:100,r:1.5},{cx:60,cy:100,r:1},{cx:100,cy:100,r:1.5}].map((c,i) => (
                <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={isDark ? "rgba(59,130,246,0.15)" : "rgba(59,130,246,0.1)"} />
              ))}
              {[[20,20,60,20],[60,20,100,20],[20,20,20,60],[60,20,60,60],[100,20,100,60],[20,60,60,60],[60,60,100,60],[20,60,20,100],[60,60,60,100],[100,60,100,100],[20,100,60,100],[60,100,100,100]].map(([x1,y1,x2,y2],i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={isDark ? "rgba(59,130,246,0.08)" : "rgba(59,130,246,0.05)"} strokeWidth="0.5"/>
              ))}
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#networkPattern)"/>
        </svg>
      </div>

      {/* Back button */}
      <div className="sticky top-16 z-40 pointer-events-none">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 pointer-events-auto">
          <button
            onClick={onClose}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 group
              ${isDark
                ? 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'
              }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center mb-8">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3 ${badgeBg}`}>
            <Sparkles className={`w-3 h-3 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
            <span className={`text-[9px] font-medium uppercase tracking-wider ${isDark ? 'text-blue-400' : 'text-blue-500'}`}>Enterprise Pricing</span>
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${textPrimary} mb-2`}>
            Institutional{' '}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Onboarding Tiers</span>
          </h1>
          <p className={`${textSecondary} text-xs max-w-2xl mx-auto`}>Enterprise onboarding model — governed, high-value AI security partnership</p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8 mb-12">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`relative flex flex-col rounded-xl border p-5 transition-all duration-300 min-h-[400px]
                ${tier.highlight
                  ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                  : isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-blue-300'
                } ${cardBg}`}
            >
              {tier.highlight && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[8px] font-bold uppercase">
                    <Star className="w-2 h-2" />Popular
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[9px] font-bold uppercase tracking-wider ${textMuted}`}>{tier.tier}</span>
                <div className={`w-7 h-7 rounded-lg ${tier.iconBg} flex items-center justify-center`}>
                  <tier.icon className={`w-3.5 h-3.5 ${tier.iconColor}`} />
                </div>
              </div>
              <h2 className={`text-base font-bold ${textPrimary} mb-1`}>{tier.title}</h2>
              <p className={`text-[10px] ${textSecondary} leading-relaxed mb-3`}>{tier.subtitle}</p>
              <div className={`rounded-lg p-2.5 mb-4 border ${isDark ? 'bg-white/[0.02] border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                <p className={`text-xs font-bold ${textPrimary}`}>{tier.price}</p>
              </div>
              <div className="space-y-3 flex-1 mb-3">
                {tier.features.slice(0, 4).map((feature, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <CheckCircle className={`w-2.5 h-2.5 shrink-0 mt-0.5 ${tier.highlight ? 'text-emerald-400' : index === 2 ? 'text-purple-400' : 'text-blue-400'}`} />
                    <span className={`text-[10px] ${textSecondary}`}>{feature}</span>
                  </div>
                ))}
                {tier.features.length > 4 && (
                  <div className="flex items-start gap-1.5">
                    <CheckCircle className="w-2.5 h-2.5 shrink-0 mt-0.5 text-emerald-400" />
                    <span className={`text-[10px] ${textSecondary}`}>+{tier.features.length - 4} more</span>
                  </div>
                )}
              </div>
              <motion.button
                onClick={scrollToForm} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                className={`w-full py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 ${tier.ctaStyle}`}
              >
                {tier.cta}<ArrowUpRight className="w-2.5 h-2.5" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center mb-10">
          <div className={`inline-flex items-center gap-4 px-4 py-2 rounded-xl border ${isDark ? 'border-white/5 bg-white/[0.01]' : 'border-gray-200 bg-white'}`}>
            {[{ icon: Shield, text: "UK Patent Pending" }, { icon: Globe, text: "EU AI Act Compliant" }, { icon: Lock, text: "Zero Data Retention" }].map((item, i) => (
              <div key={i} className="flex items-center gap-1">
                <item.icon className={`w-2.5 h-2.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <span className={`text-[8px] font-medium ${textMuted}`}>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-8">
          <div className={`flex-1 h-px ${isDark ? 'bg-white/5' : 'bg-gray-200'}`} />
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${badgeBg}`}>
            <Sparkles className={`w-2.5 h-2.5 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
            <span className={`text-[8px] font-medium uppercase tracking-wider ${isDark ? 'text-blue-400' : 'text-blue-500'}`}>Start Onboarding</span>
          </div>
          <div className={`flex-1 h-px ${isDark ? 'bg-white/5' : 'bg-gray-200'}`} />
        </div>

        {/* Demo Form - Updated with Service Selection, Left Column Removed */}
        {/* Demo Form - Sleek & Simple */}
<div ref={formRef} className="max-w-2xl mx-auto">
  <motion.div 
    initial={{ opacity: 0, y: 15 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }} 
    transition={{ duration: 0.5 }} 
    className="text-center mb-8"
  >
    <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${textPrimary} mb-2`}>
      Ready to get started?
    </h2>
    <p className={`${textSecondary} text-sm max-w-md mx-auto`}>
      Tell us about yourself and we'll get back to you within 24 hours
    </p>
  </motion.div>

  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }} 
    transition={{ duration: 0.5, delay: 0.1 }}
  >
    <div className={`rounded-2xl border ${borderColor} ${cardBg} p-8 shadow-xl backdrop-blur-sm`}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name & Company - Side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="group">
            <label className={`block text-[11px] font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Full name
            </label>
            <input 
              type="text" 
              name="name" 
              required 
              value={formData.name} 
              onChange={handleChange} 
              disabled={isLoading}
              className={`w-full px-4 py-2.5 rounded-xl border transition-all duration-200 text-sm
                ${inputBg} 
                focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:border-blue-400/50`}
              placeholder="John Doe" 
            />
          </div>
          <div className="group">
            <label className={`block text-[11px] font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Company name
            </label>
            <input 
              type="text" 
              name="company" 
              required 
              value={formData.company} 
              onChange={handleChange} 
              disabled={isLoading}
              className={`w-full px-4 py-2.5 rounded-xl border transition-all duration-200 text-sm
                ${inputBg} 
                focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:border-blue-400/50`}
              placeholder="Acme Inc." 
            />
          </div>
        </div>

        {/* Email - Full width */}
        <div className="group">
          <label className={`block text-[11px] font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Work email
          </label>
          <input 
            type="email" 
            name="email" 
            required 
            value={formData.email} 
            onChange={handleChange} 
            disabled={isLoading}
            className={`w-full px-4 py-2.5 rounded-xl border transition-all duration-200 text-sm
              ${inputBg} 
              focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:border-blue-400/50`}
            placeholder="john@acme.com" 
          />
        </div>

        {/* Role & Service - Side by side with rounded dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`block text-[11px] font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Your role
            </label>
            <div className="relative">
              <select 
                name="role" 
                value={formData.role} 
                onChange={handleChange} 
                disabled={isLoading}
                className={`w-full px-4 py-2.5 rounded-xl border transition-all duration-200 text-sm appearance-none cursor-pointer
                  ${inputBg} 
                  focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                  disabled:opacity-50 disabled:cursor-not-allowed
                  hover:border-blue-400/50
                  [&>option]:rounded-xl [&>option]:py-2 [&>option]:px-3`}
                style={{
                  borderRadius: '0.75rem',
                }}
              >
                <option value="" className={isDark ? "bg-black rounded-xl" : "bg-white rounded-xl"} style={{ borderRadius: '0.75rem' }}>Select role</option>
                <option value="C-Level" className={isDark ? "bg-black rounded-xl" : "bg-white rounded-xl"} style={{ borderRadius: '0.75rem' }}>C-Level Executive</option>
                <option value="Director" className={isDark ? "bg-black rounded-xl" : "bg-white rounded-xl"} style={{ borderRadius: '0.75rem' }}>Director</option>
                <option value="Manager" className={isDark ? "bg-black rounded-xl" : "bg-white rounded-xl"} style={{ borderRadius: '0.75rem' }}>Manager</option>
                <option value="Engineer" className={isDark ? "bg-black rounded-xl" : "bg-white rounded-xl"} style={{ borderRadius: '0.75rem' }}>Engineer</option>
                <option value="Other" className={isDark ? "bg-black rounded-xl" : "bg-white rounded-xl"} style={{ borderRadius: '0.75rem' }}>Other</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-gray-400" />
            </div>
          </div>

          <div>
            <label className={`block text-[11px] font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Interested in
            </label>
            <div className="relative">
              <select 
                name="service" 
                required 
                value={formData.service} 
                onChange={handleChange} 
                disabled={isLoading}
                className={`w-full px-4 py-2.5 rounded-xl border transition-all duration-200 text-sm appearance-none cursor-pointer
                  ${inputBg} 
                  focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                  disabled:opacity-50 disabled:cursor-not-allowed
                  hover:border-blue-400/50
                  [&>option]:rounded-xl [&>option]:py-2 [&>option]:px-3`}
                style={{
                  borderRadius: '0.75rem',
                }}
              >
                <option value="" className={isDark ? "bg-black rounded-xl" : "bg-white rounded-xl"} style={{ borderRadius: '0.75rem' }}>Select service</option>
                {serviceOptions.map((service) => (
                  <option key={service.value} value={service.value} className={isDark ? "bg-black rounded-xl" : "bg-white rounded-xl"} style={{ borderRadius: '0.75rem' }}>
                    {service.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-gray-400" />
            </div>
          </div>
        </div>

        {/* Service Description - Clean pill design */}
        {formData.service && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border ${
              isDark ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-200'
            }`}
          >
            {React.createElement(serviceOptions.find(s => s.value === formData.service)!.icon, {
              className: `w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-500'} shrink-0`
            })}
            <span className={`text-xs ${textSecondary} flex-1`}>
              {serviceOptions.find(s => s.value === formData.service)?.description}
            </span>
          </motion.div>
        )}

        {/* Message - Optional */}
        <div>
          <label className={`block text-[11px] font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Anything else? <span className="text-[10px] opacity-60">(optional)</span>
          </label>
          <textarea 
            name="message" 
            rows={3} 
            value={formData.message} 
            onChange={handleChange} 
            disabled={isLoading}
            className={`w-full px-4 py-2.5 rounded-xl border transition-all duration-200 text-sm resize-none
              ${inputBg} 
              focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:border-blue-400/50`}
            placeholder="Tell us about your needs, timeline, or any specific questions..." 
          />
        </div>

        {/* Error Message */}
        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2.5"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <p className="text-xs">{errorMsg}</p>
          </motion.div>
        )}

        {/* Success Message */}
        {formSubmitted && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${
              isDark ? 'bg-green-500/10 border-green-500/30' : 'bg-green-50 border-green-200'
            }`}
          >
            <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-green-400 text-sm font-semibold mb-0.5">Request sent successfully!</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Our team will respond within 24 hours.
              </p>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button 
          type="submit" 
          disabled={isLoading || formSubmitted}
          whileHover={{ scale: isLoading || formSubmitted ? 1 : 1.01 }}
          whileTap={{ scale: isLoading || formSubmitted ? 1 : 0.99 }}
          className="w-full group rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {formSubmitted ? (
            <><CheckCircle className="w-4 h-4" />Request Sent</>
          ) : isLoading ? (
            <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>Submitting...</>
          ) : (
            <>Submit Request <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" /></>
          )}
        </motion.button>

        {/* Trust Note */}
        <p className={`text-center text-[10px] ${textSecondary} flex items-center justify-center gap-1.5`}>
          <Lock className="w-2.5 h-2.5" />
          No commitment • Secure • We'll never share your data
        </p>
      </form>
    </div>
  </motion.div>
</div>
      </div>
    </div>
  );
};

export default RequestDemoPage;