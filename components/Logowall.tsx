"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const logos = [
  { icon: "/l1.png" },
  { icon: "/l2.png" },
  { icon: "/l3.png" },
  { icon: "/l4.png" },
  { icon: "/l5.png" },
  { icon: "/l6.png" },
  { icon: "/l7.png" },
];

const LogoWall = () => {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % logos.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const currentLogo = logos[currentLogoIndex];

  return (
    <section className="bg-black border-y border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-5 items-stretch">
        
        {/* Label Cell */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 md:p-12 flex items-center border-b md:border-b-0 md:border-r border-white/10"
        >
          <p className="text-sm font-medium text-gray-400 leading-snug max-w-[180px]">
            Trusted by fast-growing companies around the world.
          </p>
        </motion.div>

        {/* Wipe Animation Cell */}
        <div className="p-8 md:p-12 flex items-center justify-center border-b md:border-b-0 border-white/10 md:border-r overflow-hidden">
          <div className="relative w-full flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLogoIndex}
                initial={{ 
                  clipPath: "inset(0 100% 0 0)",
                  opacity: 0 
                }}
                animate={{ 
                  clipPath: "inset(0 0% 0 0)",
                  opacity: 1 
                }}
                exit={{ 
                  clipPath: "inset(0 0 0 100%)",
                  opacity: 0 
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="relative w-22 h-22 md:w-25 md:h-25"
              >
                <Image 
                  src={currentLogo.icon}
                  alt="Company logo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Static Logo Cells */}
        {logos.slice(3, 6).map((logo, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className={`hidden md:flex p-8 md:p-12 items-center justify-center border-r border-white/10 transition-all duration-300 ${
              index === 2 ? 'md:border-r-0' : ''
            }`}
          >
            <div className="relative w-22 h-22 md:w-25 md:h-25 cursor-pointer">
              <Image 
                src={logo.icon}
                alt="Company logo"
                fill
                className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LogoWall;