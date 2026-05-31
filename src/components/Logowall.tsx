"use client";
import { motion } from "framer-motion";
import { SiGoogle, SiMeta, SiOpenai, SiClaude, SiX } from "react-icons/si";

interface LogoWallProps {
  theme?: "light" | "dark";
}

const aiModels = [
  {
    name: "OpenAI",
    label: "GPT-4o",
    icon: SiOpenai,
    brandColor: "#10a37f",
    hoverBg: "hover:border-emerald-500/50 hover:bg-emerald-500/5",
    iconHover: "group-hover:text-emerald-400",
  },
  {
    name: "Claude",
    label: "Claude 3.5",
    icon: SiClaude,
    brandColor: "#d97757",
    hoverBg: "hover:border-amber-500/50 hover:bg-amber-500/5",
    iconHover: "group-hover:text-amber-400",
  },
  {
    name: "Google",
    label: "Gemini Pro",
    icon: SiGoogle,
    brandColor: "#4285f4",
    hoverBg: "hover:border-blue-500/50 hover:bg-blue-500/5",
    iconHover: "group-hover:text-blue-400",
  },
  {
    name: "Meta",
    label: "Llama 3",
    icon: SiMeta,
    brandColor: "#1877f2",
    hoverBg: "hover:border-blue-600/50 hover:bg-blue-600/5",
    iconHover: "group-hover:text-blue-500",
  },
  {
    name: "xAI",
    label: "Grok-1",
    icon: SiX,
    brandColor: "#000000",
    hoverBg: "hover:border-gray-500/50 hover:bg-gray-500/5",
    iconHover: "group-hover:text-gray-300",
  },
];

const LogoWall = ({ theme = "dark" }: LogoWallProps) => {
  const isDark = theme === "dark";

  const bgColor = isDark ? "bg-black" : "bg-white";
  const borderColor = isDark ? "border-white/8" : "border-gray-100";
  const labelColor = isDark ? "text-gray-500" : "text-gray-400";
  const cardBg = isDark ? "bg-white/[0.03]" : "bg-gray-50";
  const cardBorder = isDark ? "border-white/10" : "border-gray-200";
  const nameColor = isDark ? "text-gray-200" : "text-gray-700";
  const tagColor = isDark ? "text-gray-500" : "text-gray-400";

  return (
    <section
      className={`${bgColor} border-y ${borderColor} transition-colors duration-300 relative overflow-hidden py-6 sm:py-8 lg:py-10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6 xl:gap-8">
          
          {/* Label Section - Responsive */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:w-48 shrink-0 text-center lg:text-left"
          >
            <div className="flex flex-col gap-1.5">
              <div className="inline-flex lg:block justify-center">
                <p
                  className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${labelColor}`}
                >
                  Multi-LLM Orchestration
                </p>
              </div>
              <p
                className={`text-[10px] sm:text-xs font-medium leading-relaxed max-w-xs mx-auto lg:mx-0 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Securing and automating compliance across:
              </p>
            </div>
          </motion.div>

          {/* Vertical Divider - Hidden on mobile/tablet, visible on desktop */}
          <div
            className={`hidden lg:block w-px h-10 ${isDark ? "bg-white/8" : "bg-gray-200"}`}
          />

          {/* Horizontal Divider - Visible on mobile/tablet */}
          <div
            className={`lg:hidden w-full h-px ${isDark ? "bg-white/8" : "bg-gray-200"}`}
          />

          {/* AI Model Tags Grid - Fully Responsive */}
          <div className="flex-1">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5">
              {aiModels.map((model, index) => {
                const Icon = model.icon;
                return (
                  <motion.div
                    key={model.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="group w-full"
                  >
                    <div
                      className={`
                        flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg
                        border transition-all duration-300 cursor-pointer w-full
                        ${cardBg} ${cardBorder} ${model.hoverBg}
                        shadow-sm hover:shadow-md
                      `}
                    >
                      {/* Icon with responsive sizing */}
                      <div
                        className={`
                          relative transition-all duration-300 shrink-0
                          ${isDark ? "text-gray-400" : "text-gray-500"}
                          ${model.iconHover}
                          group-hover:scale-110 group-hover:rotate-3
                          transition-transform duration-300
                        `}
                      >
                        <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </div>

                      {/* Text Content - Responsive */}
                      <div className="flex flex-col flex-1 min-w-0">
                        <span
                          className={`
                            text-[10px] sm:text-[11px] font-semibold leading-tight 
                            transition-all duration-300 truncate
                            ${nameColor} group-hover:tracking-wide
                          `}
                        >
                          {model.name}
                        </span>
                        <span
                          className={`
                            text-[7px] sm:text-[8px] leading-tight mt-0.5 font-mono 
                            transition-all duration-300 truncate tracking-wide
                            ${tagColor} group-hover:opacity-80
                          `}
                        >
                          {model.label}
                        </span>
                      </div>

                      {/* Subtle shine effect on hover */}
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Add responsive styles for extra small screens */}
      <style jsx>{`
        @media (min-width: 480px) {
          .xs\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  );
};

export default LogoWall;