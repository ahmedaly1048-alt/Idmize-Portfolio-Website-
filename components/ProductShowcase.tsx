"use client";
import { motion } from 'framer-motion';
import { Shield, Zap, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface ProductShowcaseProps {
  theme?: 'light' | 'dark';
}

const sections = [
  {
    role: "FOR USERS",
    title: "Secure Knowledge.",
    subtitle: "Your own private vault.",
    description: "Every team member gets a Zero-Knowledge vault. Upload sensitive documents and interact with your data without ever exposing it to the public cloud.",
    tags: ["Personal Identity Vaults", "End-to-End Encryption", "Private Document Chat"],
    buttonText: "Explore User Vaults",
    icon: Shield,
    video: "/userside.mp4"
  },
  {
    role: "FOR AI AGENTS",
    title: "Autonomous Work.",
    subtitle: "Intelligence with boundaries.",
    description: "Deploy AI agents that can search, analyze, and create—all within a connected hub that enforces strict data isolation and prompt security.",
    tags: ["Agentic Guardrails", "PII Data Scrubbing", "Isolated Context Windows"],
    buttonText: "See AI in Action",
    icon: Zap,
    video: "/aiconnect.mp4"
  },
  {
    role: "FOR ADMINISTRATORS",
    title: "Global Governance.",
    subtitle: "Total institutional control.",
    description: "A master control plane to manage users, monitor AI usage, and enforce compliance with EU AI Act and global privacy standards.",
    tags: ["Institutional Audit Trails", "Group Policy Management", "Compliance Monitoring"],
    buttonText: "View Admin Controls",
    icon: Lock,
    video: "/adminside.mp4"
  }
];

const VideoCard = ({ video, theme }: { video: string; theme: 'light' | 'dark' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const playVideo = () => {
        videoElement.play().catch(error => {
          console.log("Autoplay failed, retrying:", error);
          setTimeout(() => {
            videoElement.play().catch(e => console.log("Autoplay retry failed:", e));
          }, 100);
        });
      };
      
      if (videoElement.readyState >= 2) {
        playVideo();
      } else {
        videoElement.addEventListener('loadeddata', playVideo);
        return () => videoElement.removeEventListener('loadeddata', playVideo);
      }
    }
  }, [video]);

  return (
    <div className={`relative rounded-xl overflow-hidden border ${isDark ? 'border-white/10' : 'border-gray-200'} bg-gradient-to-br ${isDark ? 'from-white/[0.02] to-transparent' : 'from-gray-50 to-white'} backdrop-blur-sm`}>
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

const ProductShowcase = ({ theme = 'dark' }: ProductShowcaseProps) => {
  const isDark = theme === 'dark';

  // Theme-specific styles
  const bgColor = isDark ? 'bg-black' : 'bg-gray-50';
  const gridColor = isDark ? '#3b82f6' : '#93c5fd';
  const gridOpacity = isDark ? 'opacity-[0.06]' : 'opacity-[0.08]';
  const orb1Bg = isDark ? 'bg-blue-600/10' : 'bg-blue-400/15';
  const orb2Bg = isDark ? 'bg-blue-500/5' : 'bg-blue-300/10';
  const badgeBg = isDark ? 'bg-white/[0.03] border border-white/10' : 'bg-white border border-gray-200 shadow-sm';
  const badgeText = isDark ? 'text-blue-400' : 'text-blue-500';
  const titleText = isDark ? 'text-white' : 'text-gray-900';
  const accentText = isDark ? 'text-blue-400' : 'text-blue-500';
  const descriptionText = isDark ? 'text-gray-400' : 'text-gray-600';
  const roleBadgeBg = isDark ? 'bg-white/[0.03] border border-white/10' : 'bg-white border border-gray-200 shadow-sm';
  const roleBadgeText = isDark ? 'text-gray-300' : 'text-gray-600';
  const tagBg = isDark ? 'bg-white/[0.02]' : 'bg-gray-50';
  const tagBorder = isDark ? 'border-blue-500' : 'border-blue-400';
  const tagText = isDark ? 'text-gray-300' : 'text-gray-700';
  const tagHoverBg = isDark ? 'hover:bg-white/[0.05]' : 'hover:bg-gray-100';
  const buttonBg = isDark ? 'from-blue-600 to-blue-500' : 'from-blue-500 to-blue-600';
  const buttonShadow = isDark ? 'shadow-blue-600/25' : 'shadow-blue-500/25';
  const buttonHoverShadow = isDark ? 'hover:shadow-blue-600/40' : 'hover:shadow-blue-500/40';
  const glowBg = isDark ? 'bg-blue-500/10' : 'bg-blue-400/15';
  const glowBg2 = isDark ? 'bg-blue-400/5' : 'bg-blue-300/10';

  return (
    <section className={`relative ${bgColor} py-16 overflow-hidden`}>
      {/* Background Grid Pattern */}
      <div 
        className={`absolute inset-0 pointer-events-none ${gridOpacity}`}
        style={{ 
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, 
          backgroundSize: '48px 48px' 
        }} 
      />
      
      {/* Subtle gradient orbs */}
      <div className={`absolute top-0 -left-48 w-80 h-80 rounded-full blur-[120px] ${orb1Bg}`} />
      <div className={`absolute bottom-0 -right-48 w-80 h-80 rounded-full blur-[120px] ${orb2Bg}`} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${badgeBg} mb-4`}>
            <span className={`text-[10px] font-medium uppercase tracking-wide ${badgeText}`}>Solutions</span>
          </div>
          <h2 className={`text-2xl md:text-3xl font-semibold ${titleText}`}>
            What{' '}
            <span className={accentText}>IDmize</span>
            {' '}Can Do For You
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-3"
          />
        </motion.div>

        {/* Product Sections - Centered with larger videos */}
        <div className="max-w-6xl mx-auto">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className={`flex flex-col lg:flex-row items-center justify-center gap-12 ${
                index !== 0 ? 'mt-24' : ''
              } ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Left Column: Text Content */}
              <div className="w-full lg:w-5/12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Role Badge */}
                  <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${roleBadgeBg} mb-3`}>
                    <section.icon className={`w-3 h-3 ${accentText}`} />
                    <span className={`text-[10px] font-medium uppercase tracking-wide ${roleBadgeText}`}>{section.role}</span>
                  </div>

                  <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${titleText} leading-[1.1] tracking-tight mb-2`}>
                    {section.title} <br />
                    <span className={`bg-gradient-to-r ${isDark ? 'from-blue-400 to-blue-500' : 'from-blue-500 to-blue-600'} bg-clip-text text-transparent`}>
                      {section.subtitle}
                    </span>
                  </h2>
                  
                  <p className={`${descriptionText} text-sm mb-5 leading-relaxed`}>
                    {section.description}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-col gap-1.5 mb-5">
                    {section.tags.map((tag, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`group flex items-center justify-between ${tagBg} border-l-2 ${tagBorder} px-3 py-2 w-full max-w-md ${tagHoverBg} transition-all duration-300`}
                      >
                        <span className={`${tagText} font-medium text-xs`}>{tag}</span>
                        <CheckCircle className={`w-3 h-3 ${accentText}`} />
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group bg-gradient-to-r ${buttonBg} text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg ${buttonShadow} ${buttonHoverShadow} transition-all duration-300`}
                  >
                    <span className="text-xs font-semibold tracking-wide uppercase">{section.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              </div>

              {/* Right Column: Video Container - Larger */}
              <div className="w-full lg:w-7/12">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative flex justify-center"
                >
                  {/* Enhanced glow behind video - Larger */}
                  <div className={`absolute -inset-10 rounded-full blur-3xl ${glowBg}`} />
                  <div className={`absolute -inset-6 rounded-full blur-2xl ${glowBg2}`} />
                  
                  {/* Video Container - Larger dimensions */}
                  <div className="relative w-full max-w-[720px]">
                    <VideoCard video={section.video} theme={theme} />
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;