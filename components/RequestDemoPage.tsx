"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Send, Shield, Clock, Building, Briefcase, Users, Sparkles, ChevronDown, ArrowLeft, AlertCircle } from "lucide-react";
import Navbar from "./Navbar";

interface RequestDemoPageProps {
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
  onClose?: () => void;
}

const RequestDemoPage = ({ theme = 'dark', onThemeToggle, onClose }: RequestDemoPageProps) => {
  const isDark = theme === 'dark';
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    message: ''
  });

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
    } catch (err) {
      setErrorMsg("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const bgColor = isDark ? 'bg-black' : 'bg-gray-50';
  const gridColor = isDark ? '#3b82f6' : '#60a5fa';
  const borderColor = isDark ? 'border-white/10' : 'border-blue-200';
  const cardBg = isDark ? 'bg-white/[0.02]' : 'bg-white';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-500';
  const inputBg = isDark ? 'bg-black/40 border-white/10 text-white' : 'bg-gray-50 border-blue-200 text-gray-900';
  const inputFocus = isDark ? 'focus:border-blue-500' : 'focus:border-blue-500';
  const badgeBg = isDark ? 'bg-white/[0.02] border border-white/5' : 'bg-white border border-blue-200 shadow-sm';
  const avatarBorder = isDark ? 'border-white' : 'border-blue-300';
  const testimonialBg = isDark ? 'bg-blue-500/5' : 'bg-blue-50';
  const testimonialBorder = isDark ? 'border-blue-500' : 'border-blue-500';
  const selectBg = isDark ? 'bg-black/40 border-white/10 text-white' : 'bg-white border-blue-200 text-gray-900';
  const selectOptionBg = isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';

  return (
    <main className={`min-h-screen transition-colors duration-300 ${bgColor} overflow-y-auto`}>
      <Navbar theme={theme} onThemeToggle={onThemeToggle} />
      
      <div 
        className={`fixed inset-0 pointer-events-none ${isDark ? 'opacity-[0.03]' : 'opacity-[0.04]'}`}
        style={{ 
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, 
          backgroundSize: '48px 48px' 
        }} 
      />

      <div className="fixed top-24 left-6 z-50">
        <button
          onClick={onClose}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 group
            ${isDark 
              ? 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white' 
              : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 shadow-sm'
            }`}
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </button>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 min-h-[calc(100vh-64px)] flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 ${badgeBg}`}>
            <Sparkles className={`w-3 h-3 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
            <span className={`text-[10px] font-medium uppercase tracking-wider ${isDark ? 'text-blue-400' : 'text-blue-500'}`}>Request Demo</span>
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${textPrimary} mb-2`}>
            See IDmize in{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
              Action
            </span>
          </h1>
          <p className={`${textSecondary} text-xs max-w-xl mx-auto`}>
            Get a personalized demo of our AI governance platform.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-5">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-3"
          >
            <div className={`rounded-lg border ${borderColor} ${cardBg} p-4`}>
              <h2 className={`text-sm font-semibold ${textPrimary} mb-3`}>What to expect</h2>
              <div className="space-y-2.5">
                {[
                  { icon: Users, text: "Live walkthrough of the IDmize platform" },
                  { icon: Building, text: "Tailored solutions for your industry" },
                  { icon: Shield, text: "Q&A with our product experts" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <item.icon className="w-3.5 h-3.5 text-blue-400" />
                    <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-lg border ${borderColor} ${cardBg} p-4`}>
              <h2 className={`text-sm font-semibold ${textPrimary} mb-2`}>Why choose IDmize?</h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: Shield, text: "Enterprise-grade security" },
                  { icon: Clock, text: "30-minute setup" },
                  { icon: Building, text: "Custom deployment" },
                  { icon: Briefcase, text: "Team collaboration" }
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <benefit.icon className="w-3 h-3 text-blue-400" />
                    <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-lg border-l-2 ${testimonialBorder} ${testimonialBg} p-3`}>
              <p className={`text-[10px] italic ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                "IDmize transformed our AI governance. The demo gave us complete confidence in the platform."
              </p>
              <p className={`text-[9px] font-medium ${textPrimary}`}>— CTO, Enterprise Tech Company</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${badgeBg}`}>
                <div className="flex -space-x-1.5">
                  {avatars.map((avatar, i) => (
                    <div 
                      key={i} 
                      className={`w-8 h-8 rounded-full overflow-hidden border ${avatarBorder} bg-cover bg-center`}
                      style={{ backgroundImage: `url(${avatar})` }}
                    >
                      <div className="w-full h-full" />
                    </div>
                  ))}
                </div>
                <p className={`text-[10px] ${textSecondary}`}>
                  Trusted by <span className={`font-medium ${textPrimary}`}>500+</span> companies worldwide
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className={`rounded-lg border ${borderColor} ${cardBg} p-5 shadow-lg`}>
              <div className="text-center mb-4">
                <h2 className={`text-base font-semibold ${textPrimary}`}>Schedule Your Demo</h2>
                <p className={`text-[10px] ${textSecondary} mt-0.5`}>Fill out the form and we'll get back to you within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-[10px] font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`w-full px-3 py-1.5 rounded-lg border text-xs transition-all duration-300 ${inputBg} ${inputFocus} focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50`}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className={`block text-[10px] font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Company *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`w-full px-3 py-1.5 rounded-lg border text-xs transition-all duration-300 ${inputBg} ${inputFocus} focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50`}
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-[10px] font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`w-full px-3 py-1.5 rounded-lg border text-xs transition-all duration-300 ${inputBg} ${inputFocus} focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50`}
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className={`block text-[10px] font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your Role
                  </label>
                  <div className="relative">
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`w-full px-3 py-1.5 rounded-lg border text-xs transition-all duration-300 appearance-none cursor-pointer ${selectBg} ${inputFocus} focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50`}
                      style={{ backgroundColor: isDark ? '#1a1a1a' : '#ffffff', color: isDark ? '#ffffff' : '#1a1a1a' }}
                    >
                      <option value="" className={selectOptionBg}>Select your role</option>
                      <option value="C-Level" className={selectOptionBg}>C-Level Executive</option>
                      <option value="Director" className={selectOptionBg}>Director</option>
                      <option value="Manager" className={selectOptionBg}>Manager</option>
                      <option value="Engineer" className={selectOptionBg}>Engineer</option>
                      <option value="Other" className={selectOptionBg}>Other</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className={`block text-[10px] font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Additional Notes
                  </label>
                  <textarea
                    name="message"
                    rows={2}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`w-full px-3 py-1.5 rounded-lg border text-xs transition-all duration-300 resize-none ${inputBg} ${inputFocus} focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50`}
                    placeholder="Tell us about your AI governance needs..."
                  />
                </div>

                {/* Error Message */}
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2"
                  >
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <p className="text-[10px]">{errorMsg}</p>
                  </motion.div>
                )}

                {/* Success Message */}
                {formSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-lg border px-4 py-3 ${isDark ? 'bg-green-500/10 border-green-500/30' : 'bg-green-50 border-green-300'}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                      <p className="text-green-400 text-xs font-semibold">Your response has been sent!</p>
                    </div>
                    <p className={`text-[10px] pl-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Thank you for reaching out. Our team will review your request and get back to you within{' '}
                      <span className="font-semibold text-green-400">24 hours</span>.
                    </p>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isLoading || formSubmitted}
                  whileHover={{ scale: isLoading || formSubmitted ? 1 : 1.01 }}
                  whileTap={{ scale: isLoading || formSubmitted ? 1 : 0.98 }}
                  className="w-full group rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formSubmitted ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      Response Sent!
                    </>
                  ) : isLoading ? (
                    <>
                      <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Request Demo
                      <Send className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>

              <p className={`text-[8px] text-center mt-3 ${textSecondary}`}>
                No commitment. Your data is secure with us.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${isDark ? '#000000' : '#f3f4f6'}; border-left: 1px solid ${isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)'}; }
        ::-webkit-scrollbar-thumb { background: ${isDark ? '#2563eb' : '#3b82f6'}; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: ${isDark ? '#3b82f6' : '#2563eb'}; box-shadow: 0 0 6px rgba(59, 130, 246, 0.4); }
        * { scrollbar-width: thin; scrollbar-color: ${isDark ? '#2563eb #000000' : '#3b82f6 #f3f4f6'}; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(37, 99, 235, 0.3); color: white; }
        select option { background-color: ${isDark ? '#1a1a1a' : '#ffffff'}; color: ${isDark ? '#ffffff' : '#1a1a1a'}; }
      `}</style>
    </main>
  );
};

export default RequestDemoPage;