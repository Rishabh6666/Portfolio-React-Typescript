import React from 'react';
import { motion } from 'motion/react';

interface TechMarqueeProps {
  items: string[];
  themeColor?: string;
}

export const TechMarquee: React.FC<TechMarqueeProps> = ({ items, themeColor }) => {
  // Double the items for seamless infinite scroll
  const doubledItems = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden bg-slate-900/40 border-y border-slate-800/60 py-6 backdrop-blur-sm">
      {/* Left/Right masks for smooth fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none marquee-gradient-left" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none marquee-gradient-right" />

      <div className="flex select-none">
        <motion.div
          className="flex whitespace-nowrap gap-12 text-sm sm:text-base font-mono font-medium text-slate-400"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
        >
          {doubledItems.map((tech, index) => (
            <div key={index} className="flex items-center space-x-2 shrink-0">
              <span className="text-lg" style={{ color: themeColor || '#818cf8' }}>✦</span>
              <span className="hover:text-white transition-colors">{tech}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
export default TechMarquee;
