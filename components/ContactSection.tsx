"use client";
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Sparkles, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface ContactSectionProps {
  theme?: 'light' | 'dark';
}

const ContactSection = ({ theme = 'dark' }: ContactSectionProps) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setFormSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
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

  const contactInfo = [
    { icon: Mail, title: "Email Us", detail: "hello@idmize.com", sub: "We'll respond within 24 hours" },
    { icon: Phone, title: "Call Us", detail: "+1 (555) 123-4567", sub: "Mon-Fri, 9am-6pm EST" },
    { icon: MapPin, title: "Visit Us", detail: "San Francisco, CA", sub: "Remote-first company" },
    { icon: Clock, title: "Support", detail: "24/7 Enterprise Support", sub: "Dedicated account manager" }
  ];

  const bgColor = isDark ? 'bg-black' : 'bg-gray-50';
  const gridColor = isDark ? '#3b82f6' : '#60a5fa';
  const borderColor = isDark ? 'border-white/10' : 'border-gray-200';
  const cardBg = isDark ? 'bg-white/[0.02]' : 'bg-white';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-500';
  const inputBg = isDark ? 'bg-black/40 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900';
  const inputFocus = isDark ? 'focus:border-blue-500' : 'focus:border-blue-400';
  const badgeBg = isDark ? 'bg-white/[0.02] border border-white/5' : 'bg-white border border-gray-200 shadow-sm';
  const iconBg = isDark ? 'bg-blue-500/10' : 'bg-blue-100';
  const iconColor = isDark ? 'text-blue-400' : 'text-blue-500';
  const buttonBg = isDark ? 'from-blue-600 to-blue-500' : 'from-blue-500 to-blue-600';

  return (
    <section className={`relative ${bgColor} py-20 overflow-hidden transition-colors duration-300`}>
      <div 
        className={`absolute inset-0 pointer-events-none ${isDark ? 'opacity-[0.03]' : 'opacity-[0.04]'}`}
        style={{ 
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, 
          backgroundSize: '48px 48px' 
        }} 
      />
      <div className={`absolute top-20 -left-48 w-96 h-96 rounded-full blur-[140px] ${isDark ? 'bg-blue-600/8' : 'bg-blue-400/15'}`} />
      <div className={`absolute bottom-20 -right-48 w-96 h-96 rounded-full blur-[140px] ${isDark ? 'bg-blue-500/4' : 'bg-blue-300/10'}`} />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${badgeBg} mb-3`}>
            <Sparkles className={`w-3 h-3 ${iconColor}`} />
            <span className={`text-[10px] font-medium uppercase tracking-wider ${iconColor}`}>Get in Touch</span>
          </div>
          <h2 className={`text-2xl md:text-3xl font-semibold tracking-tight ${textPrimary} mb-2`}>
            Let's Talk
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-3"
          />
          <p className={`${textSecondary} text-xs max-w-xl mx-auto`}>
            Have questions about IDmize? We're here to help you transform your AI governance.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                className={`group flex items-start gap-4 p-4 rounded-xl border ${borderColor} ${cardBg} transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg`}
              >
                <div className={`p-2 rounded-lg ${iconBg} group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-4 h-4 ${iconColor}`} />
                </div>
                <div>
                  <h3 className={`text-sm font-semibold ${textPrimary} mb-0.5`}>{item.title}</h3>
                  <p className={`text-xs font-medium ${iconColor} mb-0.5`}>{item.detail}</p>
                  <p className={`text-[10px] ${textSecondary}`}>{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={`rounded-xl border ${borderColor} ${cardBg} p-5 shadow-lg`}>
              <h3 className={`text-base font-semibold ${textPrimary} mb-4 text-center`}>Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-[10px] font-medium mb-1 ${textSecondary}`}>Your Name *</label>
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
                    <label className={`block text-[10px] font-medium mb-1 ${textSecondary}`}>Email Address *</label>
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
                </div>

                <div>
                  <label className={`block text-[10px] font-medium mb-1 ${textSecondary}`}>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`w-full px-3 py-1.5 rounded-lg border text-xs transition-all duration-300 ${inputBg} ${inputFocus} focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50`}
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className={`block text-[10px] font-medium mb-1 ${textSecondary}`}>Message *</label>
                  <textarea
                    name="message"
                    rows={3}
                    required
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
                      <p className="text-green-400 text-xs font-semibold">Your message has been sent!</p>
                    </div>
                    <p className={`text-[10px] pl-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Our team will get back to you within{' '}
                      <span className="font-semibold text-green-400">24 hours</span>.
                    </p>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isLoading || formSubmitted}
                  whileHover={{ scale: isLoading || formSubmitted ? 1 : 1.01 }}
                  whileTap={{ scale: isLoading || formSubmitted ? 1 : 0.98 }}
                  className={`w-full group rounded-lg bg-gradient-to-r ${buttonBg} py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {formSubmitted ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      Message Sent!
                    </>
                  ) : isLoading ? (
                    <>
                      <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;