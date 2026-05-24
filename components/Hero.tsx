"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";

interface HeroProps {
  theme?: "light" | "dark";
  onGetStarted?: () => void;
}

const Hero = ({ theme = "dark", onGetStarted }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = theme === "dark";

  const avatars = ["/av1.jpg", "/av2.jpg", "/av3.jpg"];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 40 });

  const gridX = useTransform(springX, [-300, 300], [20, -20]);
  const gridY = useTransform(springY, [-300, 300], [10, -10]);
  const orb1X = useTransform(springX, [-300, 300], [-30, 30]);
  const orb1Y = useTransform(springY, [-300, 300], [-20, 20]);
  const orb2X = useTransform(springX, [-300, 300], [25, -25]);
  const orb2Y = useTransform(springY, [-300, 300], [15, -15]);
  const gradientX = useTransform(springX, [-300, 300], [10, -10]);
  const gradientY = useTransform(springY, [-300, 300], [5, -5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Theme colors
  const bgColor = isDark ? "bg-black" : "bg-gray-50";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";
  const textMuted = isDark ? "text-gray-500" : "text-gray-400";
  const badgeBg = isDark
    ? "bg-white/[0.03] border border-white/10"
    : "bg-white border border-gray-200 shadow-sm";
  const badgeText = isDark ? "text-gray-300" : "text-gray-600";
  const avatarBorder = isDark ? "border-white" : "border-gray-300";
  const orb1Bg = isDark ? "bg-blue-600/15" : "bg-blue-400/20";
  const orb2Bg = isDark ? "bg-blue-500/8" : "bg-blue-300/15";
  const gridColor = isDark ? "#3b82f6" : "#60a5fa";
  const gridOpacity = isDark ? "opacity-[0.09]" : "opacity-[0.17]";
  const shadowBlur = isDark ? "bg-blue-500/20" : "bg-blue-400/15";
  const imageBg = isDark ? "bg-black/40" : "bg-white";
  const imageBorder = isDark ? "border-white/80" : "border-blue-500";
  const decorativeBlur = isDark ? "bg-blue-500/8" : "bg-blue-400/15";
  const imageGlow = isDark
    ? "shadow-[0_0_40px_rgba(59,130,246,0.3)]"
    : "shadow-[0_0_40px_rgba(37,99,235,0.2)]";
  const socialBg = isDark
    ? "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
    : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900";

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative min-h-[85vh] flex items-center overflow-hidden cursor-default transition-colors duration-300 ${bgColor}`}
    >
      {/* Orbs */}
      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        className={`absolute top-1/4 -left-48 w-[500px] h-[500px] rounded-full blur-[120px] ${orb1Bg}`}
      />
      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className={`absolute bottom-0 -right-48 w-[400px] h-[400px] rounded-full blur-[100px] ${orb2Bg}`}
      />

      {/* Grid */}
      <motion.div
        style={{
          x: gridX,
          y: gridY,
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
        className={`absolute inset-0 pointer-events-none ${gridOpacity}`}
      />

      <motion.div
        style={{ x: gradientX, y: gradientY }}
        className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/3 to-transparent pointer-events-none"
      />

      <div className="container mx-auto max-w-7xl px-6 lg:px-8 relative z-10 py-16 lg:py-0">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 ${badgeBg}`}
            >
              <Sparkles
                className={`w-3.5 h-3.5 ${isDark ? "text-blue-400" : "text-blue-500"}`}
              />
              <span className={`text-xs font-medium ${badgeText}`}>
                Introducing AI Governance Suite
              </span>
            </motion.div>

            {/* Heading - Compact & Sleek */}
            <div className="space-y-2">
              <h1
                className={`text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight ${textColor}`}
              >
                AI Identity & Governance
                <span
                  className={`block ${isDark ? "text-blue-400" : "text-blue-500"}`}
                >
                  Layer For Enterprises
                </span>
              </h1>

              {/* Updated description */}
              <p
                className={`text-xs sm:text-sm leading-relaxed max-w-md ${textSecondary}`}
              >
                Eliminate <span className="font-medium">'Shadow AI'</span> &
                guarantee data sovereignty. Securely bridge with any LLM,
                protect IP, and automate compliance in one console.
              </p>
            </div>

            {/* Updated CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              {/* Primary: Request Early Access — emerald glow */}
              <motion.button
                onClick={onGetStarted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative rounded-lg px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white 
                  bg-emerald-600 hover:bg-emerald-500 
                  shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:shadow-[0_0_30px_rgba(16,185,129,0.7)] 
                  transition-all duration-300"
              >
                Request Early Access
                <ArrowRight className="inline-block ml-2 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>

              {/* Secondary: Go to Console — subtle outline */}
              <motion.button
                onClick={() =>
                  window.open("https://console.idmize.com/", "_blank")
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`rounded-lg px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-medium transition-all duration-300
                  ${
                    isDark
                      ? "border border-white/15 bg-transparent text-white hover:bg-white/5 hover:border-white/30"
                      : "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                  }`}
              >
                Go to Console
              </motion.button>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-1.5">
                {avatars.map((avatar, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full overflow-hidden border ${avatarBorder} bg-cover bg-center`}
                    style={{ backgroundImage: `url(${avatar})` }}
                  >
                    <div className="w-full h-full" />
                  </div>
                ))}
              </div>
              <p className={`text-xs ${textMuted}`}>
                Trusted by{" "}
                <span
                  className={`font-medium ${isDark ? "text-white" : "text-gray-700"}`}
                >
                  50+
                </span>{" "}
                enterprise teams
              </p>
            </div>
          </motion.div>

          {/* Right: Image Stack */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="relative w-full mt-8 lg:mt-0 flex justify-center lg:block"
          >
            <div
              className={`absolute -inset-6 rounded-2xl blur-3xl ${shadowBlur}`}
            />
            <div
              className={`absolute -inset-8 rounded-full blur-3xl ${decorativeBlur}`}
            />

            {/* Main Video */}
            <div
              className={`relative rounded-xl overflow-hidden ${imageBg} ${imageGlow} lg:-left-12 w-full max-w-[95vw] lg:max-w-none`}
            >
              <div
                className={`absolute inset-0 rounded-xl border-2 shadow-[0_0_30px_rgba(59,130,246,0.4)] z-10 pointer-events-none ${imageBorder}`}
              />
              <div
                className="relative w-full"
                style={{ aspectRatio: "1950/1400" }}
              >
                <video
                  src="/hero3.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover brightness-105 contrast-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Card - Desktop only */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
              className="absolute -bottom-5 -left-58 z-20 hidden lg:block"
            >
              <div
                className={`relative w-52 rounded-lg overflow-hidden ${imageBg} shadow-2xl`}
              >
                <div
                  className={`absolute inset-0 rounded-lg border-2 shadow-[0_0_20px_rgba(59,130,246,0.5)] z-10 pointer-events-none ${imageBorder}`}
                />
                <div className="relative" style={{ aspectRatio: "800/700" }}>
                  <Image
                    src="/i3.png"
                    alt="Data Sanitization Flow"
                    fill
                    className="object-cover brightness-105"
                    quality={95}
                  />
                </div>
                <div className="absolute inset-0 ring-1 ring-blue-500/40 rounded-lg pointer-events-none" />
              </div>
            </motion.div>

            {/* Vertical Overlay - XL only */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
              className="absolute top-65 -translate-y-1/2 -right-21 z-20 hidden xl:block"
            >
              <div
                className={`relative w-46 h-100 md:w-36 md:h-84 rounded-lg overflow-hidden border-2 ${imageBorder} ${imageBg} shadow-2xl`}
              >
                <Image
                  src="/admind.png"
                  alt="Vertical overlay"
                  fill
                  className="object-fill brightness-105"
                  quality={95}
                />
              </div>
            </motion.div>

            <div
              className={`absolute -top-4 -right-4 w-16 h-16 lg:w-24 lg:h-24 rounded-full blur-xl ${decorativeBlur}`}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
