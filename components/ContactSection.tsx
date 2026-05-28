"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Sparkles, Clock, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

interface ContactSectionProps {
  theme?: 'light' | 'dark';
}

export default function ContactSection({ theme = 'dark' }: ContactSectionProps) {
  const isDark = theme === 'dark';
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setFormSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setFormSubmitted(false), 6000);
      } else {
        setErrorMsg(data.errors?.[0]?.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    { 
      icon: Mail, 
      title: "Enterprise Inquiries", 
      detail: "info@idmize.com", 
      href: "mailto:info@idmize.com",
      sub: "Response within 24 hours" 
    },
    { 
      icon: Phone, 
      title: "Direct Hotline", 
      detail: "+370 686 67554", 
      href: "tel:+37068667554",
      sub: "Mon-Fri, 9am-6pm EET" 
    },
    { 
      icon: MapPin, 
      title: "EU Headquarters", 
      detail: "Kauno g. 16, Vilnius", 
      href: "https://maps.app.goo.gl/nHPqeL2MVU2RHhF26",
      sub: "03218 Vilniaus m. sav, Lithuania" 
    },
    { 
      icon: Clock, 
      title: "Support Desk", 
      detail: "24/7 Enterprise SLA", 
      sub: "Dedicated infrastructure routing" 
    }
  ];

  // Refined Aesthetic Variables (Sleek Dark / Minimal Light)
  const styles = {
    bg: isDark ? 'bg-[#030303]' : 'bg-gray-50/50',
    border: isDark ? 'border-white/[0.06]' : 'border-gray-200/80',
    card: isDark ? 'bg-white/[0.01] backdrop-blur-md' : 'bg-white shadow-sm',
    textPrimary: isDark ? 'text-zinc-100' : 'text-zinc-900',
    textSecondary: isDark ? 'text-zinc-400' : 'text-zinc-500',
    input: isDark 
      ? 'bg-zinc-950 border-white/[0.08] text-white focus:border-blue-500/80 focus:ring-blue-500/10' 
      : 'bg-white border-zinc-200 text-zinc-900 focus:border-blue-500 focus:ring-blue-500/5',
    badge: isDark ? 'bg-zinc-900 border-white/[0.08] text-zinc-400' : 'bg-zinc-100 border-zinc-200 text-zinc-600',
    iconContainer: isDark ? 'bg-zinc-900 border border-white/[0.06] text-blue-400' : 'bg-zinc-50 border border-zinc-200/60 text-blue-600'
  };

  return (
    <section className={`relative ${styles.bg} py-24 overflow-hidden transition-colors duration-300`}>
      {/* Premium Ambient Lighting effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] transform -translate-y-1/2 ${isDark ? 'bg-blue-600/10' : 'bg-blue-400/5'}`} />
        <div className={`absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px] transform translate-y-1/3 ${isDark ? 'bg-zinc-800/20' : 'bg-blue-200/10'}`} />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Header Block */}
        <div className="max-w-xl mb-16">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${styles.badge} mb-4`}>
            <Sparkles className="w-3 h-3 text-blue-500" />
            <span className="text-[10px] font-medium tracking-wider uppercase">Contact Engineering</span>
          </div>
          <h2 className={`text-3xl font-medium tracking-tight ${styles.textPrimary} mb-3`}>
            Let's build securely.
          </h2>
          <p className={`${styles.textSecondary} text-sm leading-relaxed`}>
            Have operational or integration questions about IDmize? Connect with our technical team to explore modern identity architecture.
          </p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Information Column */}
          <div className="lg:col-span-5 space-y-3">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className={`flex gap-4 p-4 rounded-xl border ${styles.border} ${styles.card} transition-all duration-300 hover:border-zinc-700/50`}
              >
                <div className={`p-2.5 h-10 w-10 shrink-0 rounded-lg flex items-center justify-center ${styles.iconContainer}`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h3 className={`text-xs font-medium opacity-60 ${styles.textPrimary}`}>{item.title}</h3>
                  {item.href ? (
                    <a 
                      href={item.href}
                      target={item.title === "EU Headquarters" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {item.detail}
                      {item.title === "EU Headquarters" && <ExternalLink className="w-3 h-3 opacity-40 group-hover/link:opacity-100 transition-opacity" />}
                    </a>
                  ) : (
                    <p className={`text-sm font-medium ${styles.textPrimary}`}>{item.detail}</p>
                  )}
                  <p className={`text-xs ${styles.textSecondary}`}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form Interactivity Column */}
          <div className="lg:col-span-7">
            <div className={`rounded-xl border ${styles.border} ${styles.card} p-6 sm:p-8`}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-[11px] font-medium mb-1.5 ${styles.textSecondary}`}>Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isLoading || formSubmitted}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all duration-200 outline-none focus:ring-4 ${styles.input}`}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className={`block text-[11px] font-medium mb-1.5 ${styles.textSecondary}`}>Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading || formSubmitted}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all duration-200 outline-none focus:ring-4 ${styles.input}`}
                      placeholder="john@idmize.com"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-[11px] font-medium mb-1.5 ${styles.textSecondary}`}>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isLoading || formSubmitted}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all duration-200 outline-none focus:ring-4 ${styles.input}`}
                    placeholder="Vault architecture implementation"
                  />
                </div>

                <div>
                  <label className={`block text-[11px] font-medium mb-1.5 ${styles.textSecondary}`}>Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isLoading || formSubmitted}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all duration-200 resize-none outline-none focus:ring-4 ${styles.input}`}
                    placeholder="Briefly describe your environment or security use-case..."
                  />
                </div>

                {/* Status Banners container */}
                <AnimatePresence mode="wait">
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3 overflow-hidden"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <p className="text-xs font-medium">{errorMsg}</p>
                    </motion.div>
                  )}

                  {formSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className={`rounded-lg border p-4 flex gap-3 overflow-hidden ${isDark ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 type-y-0.5" />
                      <div className="space-y-0.5">
                        <p className="text-emerald-500 text-xs font-semibold">Transmission successful</p>
                        <p className={`text-xs ${styles.textSecondary}`}>
                          An infrastructure partner will be in touch within 24 hours.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isLoading || formSubmitted}
                  className="w-full relative h-11 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 overflow-hidden shadow-sm active:scale-[0.99] disabled:pointer-events-none"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : formSubmitted ? (
                    "Thank You"
                  ) : (
                    <>
                      <span>Transmit Request</span>
                      <Send className="w-3.5 h-3.5 opacity-80" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}