"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Scale, 
  CheckSquare, 
  Activity, 
  AlertTriangle, 
  Database, 
  ShieldAlert, 
  Award, 
  FileText 
} from 'lucide-react';

interface FeaturesListProps {
  theme?: 'light' | 'dark';
}

export default function FeaturesList({ theme = 'dark' }: FeaturesListProps) {
  const isDark = theme === 'dark';
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const features = [
    {
      title: "EU AI Act Integration",
      description: "Human-in-the-Loop control indicators and accountability to represent their auditable performance management.",
      renderIcon: () => (
        <div className="relative flex items-center justify-center p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 w-14 h-14">
          {/* Legal compliance scale as base */}
          <Scale size={24} className="text-blue-400 stroke-[1.5]" />
          {/* Auditable Human Checkpoint badge */}
          <div className="absolute -bottom-1 -right-1 p-1 rounded-md bg-black border border-blue-500/30 shadow-md">
            <CheckSquare size={12} className="text-cyan-400" />
          </div>
        </div>
      )
    },
    {
      title: "NIST AI Risk Management",
      description: "Risk Management Framework (RMF) augmented and preventive native risk, safety, and security management.",
      renderIcon: () => (
        <div className="relative flex items-center justify-center p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 w-14 h-14">
          {/* Live system diagnostic telemetry */}
          <Activity size={24} className="text-blue-400 stroke-[1.5]" />
          {/* Proactive hazard mitigation metric badge */}
          <div className="absolute -bottom-1 -right-1 p-1 rounded-md bg-black border border-blue-500/30 shadow-md">
            <AlertTriangle size={12} className="text-amber-400 animate-pulse" />
          </div>
        </div>
      )
    },
    {
      title: "GDPR & Data Sovereignty",
      description: "Data pipeline filter to categorize data based on sensitivity lines and into a closed corporate database silo.",
      renderIcon: () => (
        <div className="relative flex items-center justify-center p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 w-14 h-14">
          {/* Enterprise localized asset silo */}
          <Database size={24} className="text-blue-400 stroke-[1.5]" />
          {/* Perimeter border boundary firewall badge */}
          <div className="absolute -bottom-1 -right-1 p-1 rounded-md bg-black border border-blue-500/30 shadow-md">
            <ShieldAlert size={12} className="text-emerald-400" />
          </div>
        </div>
      )
    },
    {
      title: "ISO/IEC 42001 Standard",
      description: "ISO/IEC 42001 architectural standard and ethical deployment.",
      renderIcon: () => (
        <div className="relative flex items-center justify-center p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 w-14 h-14">
          {/* Formal structure specification sheet */}
          <FileText size={24} className="text-blue-400 stroke-[1.5]" />
          {/* Governance excellence seal badge */}
          <div className="absolute -bottom-1 -right-1 p-1 rounded-md bg-black border border-blue-500/30 shadow-md">
            <Award size={12} className="text-cyan-400" />
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

  const bgColor = isDark ? 'bg-black' : 'bg-gray-50';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';
  const borderColor = isDark ? 'border-white/10' : 'border-gray-200';
  const cardBg = isDark ? 'bg-white/[0.02]' : 'bg-white';
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
      {/* Background Painted Atmosphere Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[80px] animate-[pulse_4s_ease-in-out_infinite] ${isDark ? 'bg-blue-500/5' : 'bg-blue-400/8'}`} />
        <div className={`absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] animate-[pulse_5s_ease-in-out_infinite] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/6'}`} />
        <div className={`absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full blur-[90px] ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-400/5'}`} />
        
        <div className={`absolute top-20 left-[15%] w-32 h-32 rounded-full blur-[40px] ${isDark ? 'bg-blue-500/10' : 'bg-blue-400/15'}`} />
        <div className={`absolute bottom-40 right-[20%] w-48 h-48 rounded-full blur-[50px] ${isDark ? 'bg-blue-600/8' : 'bg-blue-500/10'}`} />
      </div>

      {/* Decorative Structural Blocks */}
      <div className={`absolute inset-0 pointer-events-none ${isDark ? 'opacity-20' : 'opacity-10'}`}>
        <div className={`absolute top-10 left-[10%] w-6 h-20 bg-blue-500 ${pixelBlockShadow}`} />
        <div className={`absolute top-40 left-[45%] w-10 h-10 bg-blue-600 ${pixelBlockShadow}`} />
        <div className={`absolute bottom-20 left-[5%] w-16 h-8 bg-blue-700 ${pixelBlockShadow}`} />
        <div className={`absolute top-1/2 right-[10%] w-6 h-28 bg-blue-500 ${pixelBlockShadow}`} />
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-12">
          
          {/* Left Block: Corporate Branding Header */}
          <div className="lg:sticky lg:top-32 self-start pt-2 w-full lg:w-5/12">
            <div className="flex gap-1 mb-4">
              <div className={`w-2 h-10 bg-blue-500 ${pixelBlockShadow} rounded-sm`} />
              <div className={`w-8 h-2 mt-4 ${isDark ? 'bg-blue-500/50' : 'bg-blue-400/50'} rounded-full`} />
            </div>

            <h2 className={`text-3xl md:text-4xl font-extrabold leading-tight tracking-tighter ${textPrimary}`}>
              Innovate with <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-blue-400 to-blue-600' : 'from-blue-500 to-blue-700'} animate-[pulse_4s_ease-in-out_infinite]`}>
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

          {/* Right Block: Fully Interactive Features Array */}
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
                  className={`group relative border rounded-xl p-5 transition-all duration-300 transform hover:-translate-y-0.5 ${borderColor} ${cardBorderHover} ${cardBg} ${isDark ? 'hover:bg-white/[0.04]' : 'hover:bg-gray-100/50'} cursor-pointer overflow-hidden`}
                >
                  {/* Spotlight Tracking Glow */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 transition-all duration-500 ${glowEffect}`} />
                  
                  {hoveredIndex === index && (
                    <div 
                      className="absolute pointer-events-none rounded-full transition-transform duration-150 ease-out z-0"
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
                  
                  <div className="flex items-start gap-4 relative z-10">
                    {/* Rebuilt Meaningful Icons */}
                    <div className="flex-shrink-0">
                      {feature.renderIcon()}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-base md:text-lg font-bold mb-2 transition-all duration-300 ${textPrimary} ${titleHover} ${hoveredIndex === index ? 'translate-x-1' : ''}`}>
                        {feature.title}
                      </h3>
                      
                      <div className="flex gap-2 items-start">
                        {/* Interactive Text Arrow Layout */}
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
                          animate={{ x: hoveredIndex === index ? 2 : 0 }}
                          transition={{ duration: 0.2 }}
                          className={`leading-relaxed text-xs transition-colors ${textMuted} ${descriptionHover}`}
                        >
                          {feature.description}
                        </motion.p>
                      </div>
                    </div>
                  </div>

                  {/* Laser Scan Surface Overlay */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl z-0">
                    <div 
                      className="absolute inset-0 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"
                      style={{ height: '100%' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}