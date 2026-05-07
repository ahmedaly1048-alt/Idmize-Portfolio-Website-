"use client";
import { motion } from 'framer-motion';

interface StatsSectionProps {
  theme?: 'light' | 'dark';
}

const stats = [
  {
    prefix: "UP TO",
    value: "70%",
    label: "Less Ops Overhead",
    color: "bg-blue-500"
  },
  {
    prefix: "OVER",
    value: "220",
    suffix: "Billion",
    label: "Identity Interactions Secured",
    color: "bg-blue-400"
  },
  {
    prefix: "",
    value: "67%",
    label: "Average Lower TCO",
    color: "bg-blue-600"
  },
  {
    prefix: "OVER",
    value: "500+",
    label: "Enterprise Deployments",
    color: "bg-blue-500"
  }
];

const StatsSection = ({ theme = 'dark' }: StatsSectionProps) => {
  const isDark = theme === 'dark';

  // Theme-specific styles
  const bgColor = isDark ? 'bg-black' : 'bg-gray-50';
  const gridColor = isDark ? '#3b82f6' : '#60a5fa';
  const gridOpacity = isDark ? 'opacity-[0.06]' : 'opacity-[0.08]';
  const orb1Bg = isDark ? 'bg-blue-600/8' : 'bg-blue-400/15';
  const orb2Bg = isDark ? 'bg-blue-500/4' : 'bg-blue-300/10';
  const borderColor = isDark ? 'border-white/5' : 'border-gray-200';
  const titleColor = isDark ? 'text-white' : 'text-gray-900';
  const prefixColor = isDark ? 'text-gray-500' : 'text-gray-400';
  const valueColor = isDark ? 'text-white' : 'text-gray-900';
  const suffixColor = isDark ? 'text-blue-400' : 'text-blue-500';
  const labelColor = isDark ? 'text-gray-400' : 'text-gray-600';

  return (
    <section className={`relative ${bgColor} py-20 border-t ${borderColor} overflow-hidden transition-colors duration-300`}>
      {/* Background Grid Pattern */}
      <div 
        className={`absolute inset-0 pointer-events-none ${gridOpacity}`}
        style={{ 
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, 
          backgroundSize: '48px 48px' 
        }} 
      />

      {/* Subtle gradient orbs */}
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
            <span className={`text-[10px] font-medium uppercase tracking-wider ${isDark ? 'text-blue-400' : 'text-blue-500'}`}>Stats</span>
          </div>
          <h2 className={`text-2xl md:text-3xl font-semibold ${titleColor} tracking-tight transition-colors duration-300`}>
            Proven at Enterprise Scale
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-3"
          />
        </motion.div>

        {/* Stats Grid - Centered */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center justify-start gap-5 group"
              >
                {/* Vertical Bar */}
                <div className={`w-1 h-16 rounded-full ${stat.color} group-hover:h-20 transition-all duration-300`} />

                <div className="flex flex-col">
                  {stat.prefix && (
                    <span className={`${prefixColor} text-[9px] font-bold tracking-widest uppercase mb-1 transition-colors duration-300`}>
                      {stat.prefix}
                    </span>
                  )}
                  
                  <div className="flex items-baseline gap-1">
                    <span className={`text-3xl md:text-4xl lg:text-5xl font-bold ${valueColor} leading-none tracking-tighter transition-colors duration-300`}>
                      {stat.value}
                    </span>
                    {stat.suffix && (
                      <span className={`text-base md:text-lg lg:text-xl font-bold ${suffixColor} transition-colors duration-300`}>
                        {stat.suffix}
                      </span>
                    )}
                  </div>

                  <p className={`${labelColor} text-xs font-medium mt-2 transition-colors duration-300`}>
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;