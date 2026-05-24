"use client";
import { motion } from 'framer-motion';

interface StatsSectionProps {
  theme?: 'light' | 'dark';
}

const stats = [
  {
    prefix: "AVERAGE",
    value: "40 – 60%",
    label: "Lower LLM TCO",
    sublabel: "Via corporate prompt caching layer",
    color: "bg-emerald-500"
  },
  {
    prefix: "UP TO",
    value: "80%",
    label: "Less Compliance Ops Overhead",
    sublabel: "Automated sanitization vs. manual IT audits",
    color: "bg-blue-500"
  },
  {
    prefix: "AS LOW AS",
    value: "< 15ms",
    label: "Prompt Sanitization Latency",
    sublabel: "Zero-Trust layer, zero productivity loss",
    color: "bg-blue-400"
  },
  {
    prefix: "GUARANTEED",
    value: "100%",
    label: "Automated PII & IP Leak Protection",
    sublabel: "End-to-end data sovereignty enforcement",
    color: "bg-emerald-400"
  }
];

const StatsSection = ({ theme = 'dark' }: StatsSectionProps) => {
  const isDark = theme === 'dark';

  const bgColor = isDark ? 'bg-black' : 'bg-gray-50';
  const gridColor = isDark ? '#3b82f6' : '#60a5fa';
  const gridOpacity = isDark ? 'opacity-[0.06]' : 'opacity-[0.08]';
  const orb1Bg = isDark ? 'bg-blue-600/8' : 'bg-blue-400/15';
  const orb2Bg = isDark ? 'bg-blue-500/4' : 'bg-blue-300/10';
  const borderColor = isDark ? 'border-white/5' : 'border-gray-200';
  const titleColor = isDark ? 'text-white' : 'text-gray-900';
  const prefixColor = isDark ? 'text-gray-500' : 'text-gray-400';
  const valueColor = isDark ? 'text-white' : 'text-gray-900';
  const labelColor = isDark ? 'text-gray-300' : 'text-gray-700';
  const sublabelColor = isDark ? 'text-gray-500' : 'text-gray-400';
  const cardBg = isDark ? 'bg-white/[0.02] hover:bg-white/[0.04] border-white/5 hover:border-white/10' : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300';

  return (
    <section className={`relative ${bgColor} py-20 border-t ${borderColor} overflow-hidden transition-colors duration-300`}>
      {/* Background Grid */}
      <div 
        className={`absolute inset-0 pointer-events-none ${gridOpacity}`}
        style={{ 
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, 
          backgroundSize: '48px 48px' 
        }} 
      />

      <div className={`absolute top-20 -left-48 w-96 h-96 rounded-full blur-[140px] ${orb1Bg}`} />
      <div className={`absolute bottom-20 -right-48 w-96 h-96 rounded-full blur-[140px] ${orb2Bg}`} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 ${isDark ? 'bg-white/[0.02] border border-white/5' : 'bg-white border border-gray-200 shadow-sm'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} />
            <span className={`text-[10px] font-medium uppercase tracking-wider ${isDark ? 'text-blue-400' : 'text-blue-500'}`}>
              Performance Benchmarks
            </span>
          </div>
          <h2 className={`text-2xl md:text-3xl font-semibold ${titleColor} tracking-tight`}>
            Proven at{' '}
            <span className={isDark ? 'text-blue-400' : 'text-blue-500'}>Enterprise Scale</span>
          </h2>
          <p className={`text-xs mt-2 ${sublabelColor} max-w-md mx-auto`}>
            Technical performance benchmarks based on platform efficiency and ROI analysis.
          </p>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-3"
          />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group relative rounded-xl border p-6 transition-all duration-300 ${cardBg}`}
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-6 right-6 h-px ${stat.color} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Prefix */}
              {stat.prefix && (
                <span className={`${prefixColor} text-[8px] font-bold tracking-widest uppercase block mb-2`}>
                  {stat.prefix}
                </span>
              )}

              {/* Value */}
              <div className={`text-3xl md:text-4xl font-bold ${valueColor} leading-none tracking-tighter mb-2`}>
                {stat.value}
              </div>

              {/* Divider */}
              <div className={`w-8 h-px ${stat.color} mb-3 group-hover:w-16 transition-all duration-500`} />

              {/* Label */}
              <p className={`${labelColor} text-xs font-semibold leading-snug mb-1`}>
                {stat.label}
              </p>

              {/* Sublabel */}
              <p className={`${sublabelColor} text-[10px] leading-relaxed`}>
                {stat.sublabel}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className={`text-center text-[9px] mt-8 ${sublabelColor}`}
        >
          * Benchmarks based on internal platform efficiency analysis and projected ROI modeling. Results may vary based on deployment configuration.
        </motion.p>
      </div>
    </section>
  );
};

export default StatsSection;