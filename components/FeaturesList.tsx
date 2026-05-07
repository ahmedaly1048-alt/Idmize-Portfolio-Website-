"use client";
import { motion } from 'framer-motion';

interface FeaturesListProps {
  theme?: 'light' | 'dark';
}

const FeaturesList = ({ theme = 'dark' }: FeaturesListProps) => {
  const isDark = theme === 'dark';

  const features = [
    {
      title: "EU AI Act Integration",
      description: "Ensuring Human-in-the-Loop accountability (Art. 14) and robust transparency for enterprise workflows.",
    },
    {
      title: "NIST AI Risk Management",
      description: "Implementing US-standard frameworks for safety measurement and risk mitigation in Large Language Models.",
    },
    {
      title: "GDPR & Data Sovereignty",
      description: "Real-time PII/PHI scrubbing to ensure sensitive data never leaves your corporate perimeter.",
    },
    {
      title: "ISO/IEC 42001 Standard",
      description: "Adhering to the international gold standard for AI Management Systems and ethical deployment.",
    },
  ];

  // Theme-specific styles
  const bgColor = isDark ? 'bg-black' : 'bg-gray-50';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';
  const borderColor = isDark ? 'border-white/10' : 'border-gray-200';
  const cardBg = isDark ? 'bg-white/[0.02]' : 'bg-white';
  const cardHoverBg = isDark ? 'hover:bg-white/[0.04]' : 'hover:bg-gray-50';
  const cardBorderHover = isDark ? 'hover:border-blue-500/50' : 'hover:border-blue-400';
  const titleHover = isDark ? 'group-hover:text-blue-400' : 'group-hover:text-blue-500';
  const descriptionHover = isDark ? 'group-hover:text-gray-300' : 'group-hover:text-gray-700';
  const arrowColor = isDark ? 'bg-blue-500' : 'bg-blue-400';
  const arrowBorderColor = isDark ? 'border-blue-500' : 'border-blue-400';
  const glowEffect = isDark 
    ? 'group-hover:from-blue-500/5 group-hover:via-blue-500/5' 
    : 'group-hover:from-blue-400/5 group-hover:via-blue-400/5';
  const pixelBlockShadow = isDark ? 'shadow-lg shadow-blue-500/30' : 'shadow-md shadow-blue-400/20';
  const decorativeBlockBorder = isDark ? 'border-2 border-blue-500/30 bg-blue-500/5 shadow-lg shadow-blue-500/20' : 'border-2 border-blue-400/30 bg-blue-400/5 shadow-md shadow-blue-400/10';
  const pulseBlockBg = isDark ? 'bg-blue-500' : 'bg-blue-400';

  return (
    <section className={`relative py-20 overflow-hidden ${bgColor}`}>
      {/* Blue Paint Splash Background - Light theme version */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main paint splashes */}
        <div className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[80px] animate-pulse-slow ${isDark ? 'bg-blue-500/5' : 'bg-blue-400/8'}`} />
        <div className={`absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] animate-pulse-slow-delayed ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/6'}`} />
        <div className={`absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full blur-[90px] ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-400/5'}`} />
        
        {/* Paint drip effects */}
        <div className={`absolute top-20 left-[15%] w-32 h-32 rounded-full blur-[40px] ${isDark ? 'bg-blue-500/10' : 'bg-blue-400/15'}`} />
        <div className={`absolute bottom-40 right-[20%] w-48 h-48 rounded-full blur-[50px] ${isDark ? 'bg-blue-600/8' : 'bg-blue-500/10'}`} />
        <div className={`absolute top-1/3 right-[10%] w-24 h-24 rounded-full blur-[35px] ${isDark ? 'bg-cyan-500/8' : 'bg-cyan-400/10'}`} />
        
        {/* Splatter dots */}
        <div className={`absolute top-[30%] left-[5%] w-2 h-2 rounded-full blur-[2px] ${isDark ? 'bg-blue-400/30' : 'bg-blue-400/40'}`} />
        <div className={`absolute top-[60%] left-[8%] w-3 h-3 rounded-full blur-[3px] ${isDark ? 'bg-blue-500/20' : 'bg-blue-400/30'}`} />
        <div className={`absolute top-[20%] right-[15%] w-4 h-4 rounded-full blur-[4px] ${isDark ? 'bg-blue-400/25' : 'bg-blue-400/35'}`} />
        <div className={`absolute bottom-[25%] right-[5%] w-2 h-2 rounded-full blur-[2px] ${isDark ? 'bg-cyan-400/30' : 'bg-cyan-400/40'}`} />
        <div className={`absolute top-[70%] right-[25%] w-3 h-3 rounded-full blur-[3px] ${isDark ? 'bg-blue-500/20' : 'bg-blue-400/30'}`} />
      </div>

      {/* Background Pixel Decorations */}
      <div className={`absolute inset-0 pointer-events-none ${isDark ? 'opacity-20' : 'opacity-10'}`}>
        <div className={`absolute top-10 left-[10%] w-6 h-20 bg-blue-500 ${pixelBlockShadow}`} />
        <div className={`absolute top-40 left-[45%] w-10 h-10 bg-blue-600 ${pixelBlockShadow}`} />
        <div className={`absolute bottom-20 left-[5%] w-16 h-8 bg-blue-700 ${pixelBlockShadow}`} />
        <div className={`absolute top-1/2 right-[10%] w-6 h-28 bg-blue-500 ${pixelBlockShadow}`} />
        <div className={`absolute top-20 right-[30%] w-12 h-12 bg-blue-400 ${pixelBlockShadow}`} />
        <div className={`absolute bottom-10 right-[40%] w-20 h-4 bg-blue-800 ${pixelBlockShadow}`} />
        
        {/* Additional pixel blocks */}
        <div className={`absolute top-1/3 left-[20%] w-4 h-16 ${isDark ? 'bg-cyan-500/50' : 'bg-cyan-400/60'}`} />
        <div className={`absolute bottom-1/3 right-[15%] w-8 h-8 ${isDark ? 'bg-blue-500/50' : 'bg-blue-400/60'}`} />
        <div className={`absolute top-[15%] right-[45%] w-10 h-2 ${isDark ? 'bg-blue-400/50' : 'bg-blue-400/60'}`} />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start relative">
        
        {/* Left: Branding - Sticky Content */}
        <div className="lg:sticky lg:top-32 self-start pt-2">
          {/* Accent Pixel Block Group */}
          <div className="flex gap-1 mb-6">
            <div className={`w-3 h-12 bg-blue-500 ${pixelBlockShadow}`} />
            <div className={`w-10 h-3 ${isDark ? 'bg-blue-500/50' : 'bg-blue-400/50'}`} />
          </div>

          <h2 className={`text-4xl md:text-5xl font-extrabold leading-tight tracking-tighter ${textPrimary}`}>
            Innovate with <br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-blue-400 to-blue-600' : 'from-blue-500 to-blue-700'} animate-pulse-slow`}>
              Authority.
            </span>
          </h2>
          <p className={`mt-4 text-base max-w-sm leading-relaxed ${textSecondary}`}>
            Bridging the gap between rapid AI innovation and global regulatory mandates.
          </p>
          
          {/* Additional decorative block */}
          <div className={`mt-8 w-20 h-20 flex items-center justify-center rounded-lg ${decorativeBlockBorder}`}>
             <div className={`w-4 h-4 animate-pulse rounded ${pulseBlockBg}`} />
          </div>
        </div>

        {/* Right: Feature List */}
        <div className="space-y-0">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative border rounded-xl p-6 mb-4 transition-all duration-300 ${borderColor} ${cardBorderHover} ${cardBg} ${cardHoverBg}`}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 transition-all duration-500 ${glowEffect}`} />
              
              <h3 className={`text-xl md:text-2xl font-bold mb-3 transition-colors ${textPrimary} ${titleHover}`}>
                {feature.title}
              </h3>
              
              <div className="flex gap-3 items-start">
                {/* Visual Arrow */}
                <div className="mt-1.5 flex-shrink-0 flex items-center">
                   <div className={`w-6 h-[2px] group-hover:w-8 transition-all duration-300 ${arrowColor}`} />
                   <div className={`w-2 h-2 border-t-2 border-r-2 rotate-45 -ml-0.5 group-hover:translate-x-0.5 transition-all duration-300 ${arrowBorderColor}`} />
                </div>
                
                <p className={`leading-relaxed text-sm transition-colors ${textMuted} ${descriptionHover}`}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes pulse-slow-delayed {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-pulse-slow-delayed {
          animation: pulse-slow-delayed 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default FeaturesList;