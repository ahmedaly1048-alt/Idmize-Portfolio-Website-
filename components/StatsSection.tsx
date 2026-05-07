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
  const borderColor = isDark ? 'border-white/5' : 'border-gray-200';
  const titleColor = isDark ? 'text-white' : 'text-gray-900';
  const prefixColor = isDark ? 'text-gray-500' : 'text-gray-400';
  const valueColor = isDark ? 'text-white' : 'text-gray-900';
  const suffixColor = isDark ? 'text-blue-400' : 'text-blue-500';
  const labelColor = isDark ? 'text-gray-400' : 'text-gray-600';

  return (
    <section className={`${bgColor} py-20 border-t ${borderColor} transition-colors duration-300`}>
      <div className="container mx-auto px-6">
        <h2 className={`text-2xl md:text-3xl font-semibold ${titleColor} mb-12 tracking-tight text-center transition-colors duration-300`}>
          Proven at Enterprise Scale
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-start gap-5 group"
            >
              {/* Vertical Bar - Same colors for both themes */}
              <div className={`w-1 h-20 rounded-full ${stat.color} group-hover:h-24 transition-all duration-300`} />

              <div className="flex flex-col justify-center">
                {stat.prefix && (
                  <span className={`${prefixColor} text-[10px] font-bold tracking-widest uppercase mb-1 transition-colors duration-300`}>
                    {stat.prefix}
                  </span>
                )}
                
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl md:text-5xl lg:text-6xl font-bold ${valueColor} leading-none tracking-tighter transition-colors duration-300`}>
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className={`text-lg md:text-xl lg:text-2xl font-bold ${suffixColor} transition-colors duration-300`}>
                      {stat.suffix}
                    </span>
                  )}
                </div>

                <p className={`${labelColor} text-sm font-medium mt-3 transition-colors duration-300`}>
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;