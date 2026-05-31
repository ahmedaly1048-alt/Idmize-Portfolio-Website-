"use client";
import React from 'react';
import { motion } from "framer-motion";
import { SiGoogle, SiMeta, SiOpenai, SiClaude, SiX } from "react-icons/si";

interface LogoWallProps {
  theme?: "light" | "dark";
}

const aiModels = [
  { name: "OpenAI", label: "GPT-4o", icon: SiOpenai, hoverBg: "hover:border-emerald-500/50 hover:bg-emerald-500/5", iconHover: "group-hover:text-emerald-400" },
  { name: "Claude", label: "Claude 3.5", icon: SiClaude, hoverBg: "hover:border-amber-500/50 hover:bg-amber-500/5", iconHover: "group-hover:text-amber-400" },
  { name: "Google", label: "Gemini Pro", icon: SiGoogle, hoverBg: "hover:border-blue-500/50 hover:bg-blue-500/5", iconHover: "group-hover:text-blue-400" },
  { name: "Meta", label: "Llama 3", icon: SiMeta, hoverBg: "hover:border-blue-600/50 hover:bg-blue-600/5", iconHover: "group-hover:text-blue-500" },
  { name: "xAI", label: "Grok-1", icon: SiX, hoverBg: "hover:border-gray-500/50 hover:bg-gray-500/5", iconHover: "group-hover:text-gray-300" },
];

const duplicatedModels = [...aiModels, ...aiModels, ...aiModels];

const LogoWall = ({ theme = "dark" }: LogoWallProps) => {
  const isDark = theme === "dark";

  const bgColor = isDark ? "bg-black" : "bg-white";
  const borderColor = isDark ? "border-white/10" : "border-gray-100";
  const labelColor = isDark ? "text-gray-500" : "text-gray-400";
  const cardBg = isDark ? "bg-white/[0.03]" : "bg-gray-50";
  const cardBorder = isDark ? "border-white/10" : "border-gray-200";
  const nameColor = isDark ? "text-gray-200" : "text-gray-700";
  const tagColor = isDark ? "text-gray-500" : "text-gray-400";

  return (
    <section className={`${bgColor} border-y ${borderColor} transition-colors duration-300 relative overflow-hidden py-6 lg:py-10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 xl:gap-8">
          
          {/* Label Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:w-48 shrink-0 text-center lg:text-left"
          >
            <div className="flex flex-col gap-1.5">
              <p className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${labelColor}`}>
                Multi-LLM Orchestration
              </p>
              <p className={`text-[10px] sm:text-xs font-medium leading-relaxed max-w-xs mx-auto lg:mx-0 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Securing and automating compliance across:
              </p>
            </div>
          </motion.div>

          {/* Dividers */}
          <div className={`hidden lg:block w-px h-10 ${isDark ? "bg-white/10" : "bg-gray-200"}`} />
          <div className={`lg:hidden w-full h-px ${isDark ? "bg-white/10" : "bg-gray-200"}`} />

          {/* Sliding Track Wrap */}
          {/* Added py-1 to prevent container boundaries from clipping raised layout borders */}
          <div className="flex-1 overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] lg:[mask-image:none]">
            
            {/* MOBILE/TABLET SLIDER */}
            <motion.div 
              className="flex gap-3 w-max lg:hidden"
              animate={{ x: [0, -50 / 3 + "%"] }}
              transition={{
                ease: "linear",
                duration: 15,
                repeat: Infinity,
              }}
            >
              {duplicatedModels.map((model, index) => {
                const Icon = model.icon;
                return (
                  <div
                    key={`${model.name}-slide-${index}`}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border w-36 sm:w-40 shrink-0 ${cardBg} ${cardBorder}`}
                  >
                    <Icon size={16} className={isDark ? "text-gray-400" : "text-gray-500"} />
                    <div className="flex flex-col min-w-0">
                      <span className={`text-[11px] font-semibold truncate ${nameColor}`}>{model.name}</span>
                      <span className={`text-[8px] font-mono truncate ${tagColor}`}>{model.label}</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* DESKTOP STATIC GRID */}
            <div className="hidden lg:grid lg:grid-cols-5 gap-2.5 relative">
              {aiModels.map((model, index) => {
                const Icon = model.icon;
                return (
                  <motion.div
                    key={model.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                    // Added zIndex layer elevations explicitly inside states to ensure active border layers sit on top
                    whileHover={{ 
                      y: -2,
                      zIndex: 20,
                    }}
                    className={`group flex items-center gap-2.5 px-3 py-2.5 rounded-lg border transition-all duration-300 cursor-pointer relative z-10 ${cardBg} ${cardBorder} ${model.hoverBg} shadow-sm hover:shadow-md`}
                  >
                    <Icon size={18} className={`transition-all duration-300 ${isDark ? "text-gray-400" : "text-gray-500"} ${model.iconHover} group-hover:scale-110`} />
                    <div className="flex flex-col min-w-0">
                      <span className={`text-[11px] font-semibold truncate ${nameColor}`}>{model.name}</span>
                      <span className={`text-[8px] font-mono truncate ${tagColor}`}>{model.label}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoWall;