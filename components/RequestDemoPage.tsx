"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle, Send, Shield, Clock, Building, Briefcase,
  Users, Sparkles, ChevronDown, ArrowLeft, AlertCircle,
  Zap, Lock, Globe, Star, ArrowUpRight
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
  const [formData, setFormData] = useState({ name: '', email: '', company: '', role: '', message: '' });

  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const avatars = ["/av1.jpg", "/av2.jpg", "/av3.jpg"];

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
        setFormData({ name: "", email: "", company: "", role: "", message: "" });
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
  const inputBg       = isDark ? 'bg-black/40 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900';
  const badgeBg       = isDark ? 'bg-white/[0.02] border border-white/5' : 'bg-white border border-gray-200 shadow-sm';
  const avatarBorder  = isDark ? 'border-white' : 'border-gray-300';

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

  return (
    // No <main> or <Navbar> — LandingPage owns both
    <div className={`min-h-screen transition-colors duration-300 ${bgColor} overflow-y-auto`}>
      {/* Background grid */}
      <div
        className={`fixed inset-0 pointer-events-none ${isDark ? 'opacity-[0.03]' : 'opacity-[0.04]'}`}
        style={{
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Back button — sits just below the shared Navbar */}
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

        {/* Demo Form */}
        <div ref={formRef} className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-center mb-6">
            <h2 className={`text-xl md:text-2xl font-bold tracking-tight ${textPrimary} mb-1`}>
              Request Access or{' '}
              <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">Schedule a Demo</span>
            </h2>
            <p className={`${textSecondary} text-[11px] max-w-md mx-auto`}>Fill out the form — our enterprise team will respond within 24 hours</p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-4">
            {/* Left info column */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }} className="lg:col-span-2 space-y-2.5">
              <div className={`rounded-lg border ${borderColor} ${cardBg} p-3`}>
                <h3 className={`text-xs font-semibold ${textPrimary} mb-2`}>What to expect</h3>
                <div className="space-y-1.5">
                  {[{ icon: Users, text: "Live platform walkthrough" }, { icon: Building, text: "Tailored industry solutions" }, { icon: Shield, text: "Q&A with product experts" }].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <item.icon className="w-3 h-3 text-blue-400" />
                      <span className={`text-[9px] ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-lg border ${borderColor} ${cardBg} p-3`}>
                <h3 className={`text-xs font-semibold ${textPrimary} mb-1.5`}>Why IDmize?</h3>
                <div className="grid grid-cols-2 gap-1.5">
                  {[{ icon: Shield, text: "Enterprise-grade" }, { icon: Clock, text: "30-min setup" }, { icon: Building, text: "Custom deploy" }, { icon: Briefcase, text: "Team collab" }].map((b, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <b.icon className="w-2.5 h-2.5 text-blue-400" />
                      <span className={`text-[8px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{b.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-lg border-l-2 border-blue-500 ${isDark ? 'bg-blue-500/5' : 'bg-blue-50'} p-2.5`}>
                <p className={`text-[8px] italic ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-0.5`}>
                  "IDmize transformed our AI governance. The demo gave us complete confidence."
                </p>
                <p className={`text-[7px] font-medium ${textPrimary}`}>— CTO, Enterprise Company</p>
              </div>

              <div className="text-center">
                <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${badgeBg}`}>
                  <div className="flex -space-x-1">
                    {avatars.map((avatar, i) => (
                      <div key={i} className={`w-5 h-5 rounded-full overflow-hidden border ${avatarBorder} bg-cover bg-center`} style={{ backgroundImage: `url(${avatar})` }} />
                    ))}
                  </div>
                  <p className={`text-[8px] ${textSecondary}`}>Trusted by <span className={`font-medium ${textPrimary}`}>500+</span> companies</p>
                </div>
              </div>
            </motion.div>

            {/* Right form column */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }} className="lg:col-span-3">
              <div className={`rounded-lg border ${borderColor} ${cardBg} p-4 shadow-lg`}>
                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2.5">
                    {[{ name: "name", label: "Full Name *", type: "text", placeholder: "John Doe", required: true },
                      { name: "company", label: "Company *", type: "text", placeholder: "Your Company", required: true }].map((f) => (
                      <div key={f.name}>
                        <label className={`block text-[9px] font-medium mb-0.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{f.label}</label>
                        <input type={f.type} name={f.name} required={f.required} value={(formData as any)[f.name]} onChange={handleChange} disabled={isLoading}
                          className={`w-full px-2.5 py-1.5 rounded-lg border text-[10px] transition-all duration-300 ${inputBg} focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50`}
                          placeholder={f.placeholder} />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className={`block text-[9px] font-medium mb-0.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email Address *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} disabled={isLoading}
                      className={`w-full px-2.5 py-1.5 rounded-lg border text-[10px] transition-all duration-300 ${inputBg} focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50`}
                      placeholder="john@company.com" />
                  </div>

                  <div>
                    <label className={`block text-[9px] font-medium mb-0.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Your Role</label>
                    <div className="relative">
                      <select name="role" value={formData.role} onChange={handleChange} disabled={isLoading}
                        className={`w-full px-2.5 py-1.5 rounded-lg border text-[10px] transition-all duration-300 appearance-none cursor-pointer ${inputBg} focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50`}>
                        <option value="">Select role</option>
                        <option value="C-Level">C-Level Executive</option>
                        <option value="Director">Director</option>
                        <option value="Manager">Manager</option>
                        <option value="Engineer">Engineer</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-[9px] font-medium mb-0.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Additional Notes</label>
                    <textarea name="message" rows={2} value={formData.message} onChange={handleChange} disabled={isLoading}
                      className={`w-full px-2.5 py-1.5 rounded-lg border text-[10px] transition-all duration-300 resize-none ${inputBg} focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50`}
                      placeholder="Tell us about your AI governance needs..." />
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
                        <p className="text-green-400 text-[10px] font-semibold">Response sent!</p>
                      </div>
                      <p className={`text-[8px] pl-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Our team will respond within 24 hours.</p>
                    </motion.div>
                  )}

                  <motion.button type="submit" disabled={isLoading || formSubmitted}
                    whileHover={{ scale: isLoading || formSubmitted ? 1 : 1.01 }}
                    whileTap={{ scale: isLoading || formSubmitted ? 1 : 0.99 }}
                    className="w-full group rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 py-2 text-[10px] font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 flex items-center justify-center gap-1.5 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formSubmitted ? (<><CheckCircle className="w-3 h-3" />Response Sent!</>)
                      : isLoading ? (<><svg className="w-2.5 h-2.5 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Submitting...</>)
                      : (<>Request Demo<Send className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" /></>)}
                  </motion.button>
                </form>
                <p className={`text-[7px] text-center mt-2.5 ${textSecondary}`}>No commitment. Your data is secure.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDemoPage;