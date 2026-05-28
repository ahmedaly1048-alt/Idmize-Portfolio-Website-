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
        <div ref={formRef} className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-center mb-6">
            <h2 className={`text-xl md:text-2xl font-bold tracking-tight ${textPrimary} mb-1`}>
              Request Access or{' '}
              <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">Schedule a Demo</span>
            </h2>
            <p className={`${textSecondary} text-[11px] max-w-md mx-auto`}>Fill out the form — our enterprise team will respond within 24 hours</p>
          </motion.div>

          {/* Single column form - centered */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            <div className={`rounded-lg border ${borderColor} ${cardBg} p-6 shadow-lg`}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-[9px] font-medium mb-0.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Full Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} disabled={isLoading}
                      className={`w-full px-2.5 py-1.5 rounded-lg border text-[10px] transition-all duration-300 ${inputBg} focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50`}
                      placeholder="John Doe" />
                  </div>
                  <div>
                    <label className={`block text-[9px] font-medium mb-0.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Company *</label>
                    <input type="text" name="company" required value={formData.company} onChange={handleChange} disabled={isLoading}
                      className={`w-full px-2.5 py-1.5 rounded-lg border text-[10px] transition-all duration-300 ${inputBg} focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50`}
                      placeholder="Your Company" />
                  </div>
                </div>

                <div>
                  <label className={`block text-[9px] font-medium mb-0.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} disabled={isLoading}
                    className={`w-full px-2.5 py-1.5 rounded-lg border text-[10px] transition-all duration-300 ${inputBg} focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50`}
                    placeholder="john@company.com" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-[9px] font-medium mb-0.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Your Role</label>
                    <div className="relative">
                      <select name="role" value={formData.role} onChange={handleChange} disabled={isLoading}
                        className={`w-full px-2.5 py-1.5 rounded-lg border text-[10px] transition-all duration-300 appearance-none cursor-pointer bg-black/60 border-white/10 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50`}
                      >
                        <option value="" className="bg-black text-gray-400">Select role</option>
                        <option value="C-Level" className="bg-black text-white">C-Level Executive</option>
                        <option value="Director" className="bg-black text-white">Director</option>
                        <option value="Manager" className="bg-black text-white">Manager</option>
                        <option value="Engineer" className="bg-black text-white">Engineer</option>
                        <option value="Other" className="bg-black text-white">Other</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-gray-400" />
                    </div>
                  </div>

                  {/* Service Selection - New Field */}
                  <div>
                    <label className={`block text-[9px] font-medium mb-0.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Service Interested In *</label>
                    <div className="relative">
                      <select name="service" required value={formData.service} onChange={handleChange} disabled={isLoading}
                        className={`w-full px-2.5 py-1.5 rounded-lg border text-[10px] transition-all duration-300 appearance-none cursor-pointer bg-black/60 border-white/10 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50`}
                      >
                        <option value="" className="bg-black text-gray-400">Select a service</option>
                        {serviceOptions.map((service) => (
                          <option key={service.value} value={service.value} className="bg-black text-white">
                            {service.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Service Description - Shows when service is selected */}
                {formData.service && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-lg p-2.5 border ${isDark ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        {React.createElement(serviceOptions.find(s => s.value === formData.service)!.icon, {
                          className: `w-3 h-3 ${isDark ? 'text-blue-400' : 'text-blue-500'}`
                        })}
                      </div>
                      <div>
                        <p className={`text-[9px] font-medium ${textPrimary}`}>
                          {serviceOptions.find(s => s.value === formData.service)?.label}
                        </p>
                        <p className={`text-[8px] ${textSecondary} mt-0.5`}>
                          {serviceOptions.find(s => s.value === formData.service)?.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div>
                  <label className={`block text-[9px] font-medium mb-0.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Additional Notes</label>
                  <textarea name="message" rows={2} value={formData.message} onChange={handleChange} disabled={isLoading}
                    className={`w-full px-2.5 py-1.5 rounded-lg border text-[10px] transition-all duration-300 resize-none ${inputBg} focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50`}
                    placeholder="Tell us about your AI governance needs, use case, or any specific requirements..." />
                </div>

                {errorMsg && (
                  <motion.div initial={{ opacity: 0, y: -2 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-2 py-1.5">
                    <AlertCircle className="w-2.5 h-2.5 shrink-0" />
                    <p className="text-[8px]">{errorMsg}</p>
                  </motion.div>
                )}

                {formSubmitted && (
                  <motion.div initial={{ opacity: 0, y: -2 }} animate={{ opacity: 1, y: 0 }}
                    className={`rounded-lg border px-3 py-2 ${isDark ? 'bg-green-500/10 border-green-500/30' : 'bg-green-50 border-green-300'}`}>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <CheckCircle className="w-3 h-3 text-green-400 shrink-0" />
                      <p className="text-green-400 text-[10px] font-semibold">Request Sent Successfully!</p>
                    </div>
                    <p className={`text-[8px] pl-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Our team will respond within 24 hours.</p>
                  </motion.div>
                )}

                <motion.button type="submit" disabled={isLoading || formSubmitted}
                  whileHover={{ scale: isLoading || formSubmitted ? 1 : 1.01 }}
                  whileTap={{ scale: isLoading || formSubmitted ? 1 : 0.99 }}
                  className="w-full group rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 py-2 text-[10px] font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 flex items-center justify-center gap-1.5 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formSubmitted ? (<><CheckCircle className="w-3 h-3" />Request Sent!</>)
                    : isLoading ? (<><svg className="w-2.5 h-2.5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Submitting...</>)
                    : (<>Submit Request<Send className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" /></>)}
                </motion.button>
              </form>
              <p className={`text-[7px] text-center mt-2.5 ${textSecondary}`}>No commitment. Your data is secure. We'll never share your information.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RequestDemoPage;