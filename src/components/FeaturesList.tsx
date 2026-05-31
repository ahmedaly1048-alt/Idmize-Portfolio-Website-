"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Bot, 
  Target, 
  Binary, 
  Shovel, 
  BarChart3, 
  DatabaseZap, 
  LockKeyhole, 
  FileCheck2, 
  Handshake 
} from 'lucide-react';

interface FeaturesListProps {
  theme?: 'light' | 'dark';
}

const FeaturesList = ({ theme = 'dark' }: FeaturesListProps) => {
  const isDark = theme === 'dark';
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const features = [
    {
      title: "EU AI Act Integration",
      description: "Human-in-the-Loop control indicators and accountability to represent their auditable performance management.",
      IconSet: () => (
        <div className="relative flex items-center justify-center p-2 rounded-xl bg-blue-950/30 border border-blue-900/50">
          <Bot size={36} className="text-cyan-400 stroke-[1]" />
          <div className="absolute bottom-1 right-1 p-1 rounded-full bg-black/50 border border-cyan-800">
            <Target size={16} className="text-cyan-500" />
          </div>
          <div className="absolute top-1/2 left-[-15%] flex items-center gap-1 opacity-60">
            <Binary size={14} className="text-blue-600" />
            <div className="w-5 h-[1px] bg-blue-700" />
          </div>
        </div>
      )
    },
    {
      title: "NIST AI Risk Management",
      description: "Risk Management Framework (RMF) augmented and preventive native risk, safety, and security management.",
      IconSet: () => (
        <div className="relative flex items-center justify-center p-2 rounded-xl bg-blue-950/30 border border-blue-900/50">
          <Shovel size={32} className="text-cyan-500 opacity-80" />
          <BarChart3 size={28} className="absolute -left-1 text-cyan-400 stroke-[1]" />
          <div className="absolute bottom-[-10px] left-[15%] flex items-center gap-1 opacity-60">
            <Binary size={12} className="text-blue-600" />
            <div className="w-5 h-[1px] bg-blue-700" />
          </div>
        </div>
      )
    },
    {
      title: "GDPR & Data Sovereignty",
      description: "Data pipeline filter to categorize data based on sensitivity lines and into a closed corporate database silo.",
      IconSet: () => (
        <div className="relative flex items-center justify-center p-2 rounded-xl bg-blue-950/30 border border-blue-900/50 gap-1.5">
          <DatabaseZap size={30} className="text-cyan-400 stroke-[1]" />
          <LockKeyhole size={20} className="text-blue-500" />
          <div className="absolute top-[-8px] right-[10%] flex items-center gap-1 opacity-60">
            <div className="w-2 h-2 rounded-full bg-blue-700" />
            <Binary size={12} className="text-blue-600" />
          </div>
        </div>
      )
    },
    {
      title: "ISO/IEC 42001 Standard",
      description: "ISO/IEC 42001 architectural standard and ethical deployment.",
      IconSet: () => (
        <div className="relative flex items-center justify-center p-2 rounded-xl bg-blue-950/30 border border-blue-900/50">
          <FileCheck2 size={32} className="text-cyan-400 stroke-[1.5]" />
          <Handshake size={24} className="absolute -right-1 text-blue-500 opacity-90" />
          <div className="absolute top-[-10px] left-[30%] flex items-center gap-1 opacity-60">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-800" />
            <div className="w-4 h-[1px] bg-blue-700" />
          </div>
        </div>
      )
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredIndex(index);
  };

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
    <section className={`relative py-16 overflow-hidden ${bgColor}`}>
      {/* Blue Paint Splash Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[80px] animate-pulse-slow ${isDark ? 'bg-blue-500/5' : 'bg-blue-400/8'}`} />
        <div className={`absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] animate-pulse-slow-delayed ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/6'}`} />
        <div className={`absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full blur-[90px] ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-400/5'}`} />
        
        <div className={`absolute top-20 left-[15%] w-32 h-32 rounded-full blur-[40px] ${isDark ? 'bg-blue-500/10' : 'bg-blue-400/15'}`} />
        <div className={`absolute bottom-40 right-[20%] w-48 h-48 rounded-full blur-[50px] ${isDark ? 'bg-blue-600/8' : 'bg-blue-500/10'}`} />
        <div className={`absolute top-1/3 right-[10%] w-24 h-24 rounded-full blur-[35px] ${isDark ? 'bg-cyan-500/8' : 'bg-cyan-400/10'}`} />
        
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
        
        <div className={`absolute top-1/3 left-[20%] w-4 h-16 ${isDark ? 'bg-cyan-500/50' : 'bg-cyan-400/60'}`} />
        <div className={`absolute bottom-1/3 right-[15%] w-8 h-8 ${isDark ? 'bg-blue-500/50' : 'bg-blue-400/60'}`} />
        <div className={`absolute top-[15%] right-[45%] w-10 h-2 ${isDark ? 'bg-blue-400/50' : 'bg-blue-400/60'}`} />
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-12">
          
          {/* Left: Branding - Sticky Content */}
          <div className="lg:sticky lg:top-32 self-start pt-2 w-full lg:w-5/12">
            <div className="flex gap-1 mb-4">
              <div className={`w-2 h-10 bg-blue-500 ${pixelBlockShadow} rounded-sm`} />
              <div className={`w-8 h-2 mt-4 ${isDark ? 'bg-blue-500/50' : 'bg-blue-400/50'} rounded-full`} />
            </div>

            <h2 className={`text-3xl md:text-4xl font-extrabold leading-tight tracking-tighter ${textPrimary}`}>
              Innovate with <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-blue-400 to-blue-600' : 'from-blue-500 to-blue-700'} animate-pulse-slow`}>
                Authority.
              </span>
            </h2>
            <p className={`mt-3 text-sm max-w-sm leading-relaxed ${textSecondary}`}>
              Bridging the gap between rapid AI innovation and global regulatory mandates.
            </p>
            
            <div className={`mt-6 w-16 h-16 flex items-center justify-center rounded-lg ${decorativeBlockBorder}`}>
              <div className={`w-3 h-3 animate-pulse rounded ${pulseBlockBg}`} />
            </div>
          </div>

          {/* Right: Feature List - With Interactive Effects & New Icons */}
          <div className="w-full lg:w-7/12">
            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  className={`group relative border rounded-xl p-5 transition-all duration-300 ${borderColor} ${cardBorderHover} ${cardBg} ${cardHoverBg} cursor-pointer overflow-hidden`}
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 transition-all duration-500 ${glowEffect}`} />
                  
                  {/* Interactive cursor follower effect */}
                  {hoveredIndex === index && (
                    <div 
                      className="absolute pointer-events-none rounded-full transition-transform duration-150 ease-out"
                      style={{
                        width: '150px',
                        height: '150px',
                        transform: 'translate(-50%, -50%)',
                        top: mousePosition.y,
                        left: mousePosition.x,
                        background: `radial-gradient(circle, ${isDark ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)'}, transparent 70%)`,
                      }}
                    />
                  )}
                  
                  <div className="flex items-start gap-4">
                    {/* Icon Container */}
                    <div className="flex-shrink-0">
                      <feature.IconSet />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`text-base md:text-lg font-bold mb-2 transition-all duration-300 ${textPrimary} ${titleHover} ${hoveredIndex === index ? 'translate-x-1' : ''}`}>
                        {feature.title}
                      </h3>
                      
                      <div className="flex gap-2 items-start">
                        <motion.div 
                          animate={{ 
                            x: hoveredIndex === index ? 4 : 0,
                            width: hoveredIndex === index ? 28 : 24
                          }}
                          transition={{ duration: 0.2 }}
                          className="mt-1 flex-shrink-0 flex items-center"
                        >
                          <div className={`w-6 h-[1.5px] transition-all duration-300 ${arrowColor}`} />
                          <div className={`w-1.5 h-1.5 border-t-2 border-r-2 rotate-45 -ml-1 transition-all duration-300 ${arrowBorderColor}`} />
                        </motion.div>
                        
                        <motion.p 
                          animate={{ 
                            x: hoveredIndex === index ? 2 : 0
                          }}
                          transition={{ duration: 0.2 }}
                          className={`leading-relaxed text-xs transition-colors ${textMuted} ${descriptionHover}`}
                        >
                          {feature.description}
                        </motion.p>
                      </div>
                    </div>
                  </div>

                  {/* Scan line effect on hover */}
                  <div className={`absolute inset-0 pointer-events-none overflow-hidden rounded-xl`}>
                    <div 
                      className={`absolute inset-0 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out bg-gradient-to-b from-transparent via-blue-500/5 to-transparent`}
                      style={{ height: '100%' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
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
        .group {
          position: relative;
          overflow: hidden;
        }
        .group:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};

export default FeaturesList;