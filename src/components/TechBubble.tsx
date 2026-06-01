import React, { useState } from 'react';
import { motion } from 'motion/react';
import TechLogo from './TechLogo';

interface TechBubbleProps {
  name: string;
  index: number;
  themeColor: string; // Dynamic highlight color from state
  themeGlow: string; // Glow styling
  accentGradient: string; // Accent color gradient
  isLight?: boolean;
}

export const TechBubble: React.FC<TechBubbleProps> = ({ 
  name, 
  index, 
  themeColor,
  themeGlow,
  accentGradient,
  isLight = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Generate random floating offsets for custom 2D organic pathways (oval/circular drift)
  const floatDuration = 5 + (index % 4) * 1.5;
  const floatDelay = (index % 5) * 0.3;
  
  // Custom 2D movement offsets so bubbles drift asynchronously
  const xDrift = [
    0, 
    index % 2 === 0 ? 12 : -12, 
    index % 3 === 0 ? -16 : 16, 
    index % 4 === 0 ? 8 : -8, 
    0
  ];
  const yDrift = [
    0, 
    index % 2 === 0 ? -16 : 16, 
    index % 3 === 0 ? 14 : -14, 
    index % 4 === 0 ? -10 : 10, 
    0
  ];

  // Derive specialized colors for standard logos
  const logoColors: Record<string, string> = {
    'html5': '#f06529',
    'css3': '#2965f1',
    'javascript': '#f0db4f',
    'typescript': '#007acc',
    'react': '#61dbfb',
    'tailwind css': '#38b2ac',
    'python': '#306998',
    'django': '#092e20',
    'flask': isLight ? '#0f172a' : '#ffffff',
    'node.js': '#6cc24a',
    'node': '#6cc24a',
    'php': '#777bb4',
    'java': '#f89820',
    'mysql': '#00758f',
    'postgresql': '#336791',
    'mongodb': '#4db33d',
    'git': '#f05032',
    'github': isLight ? '#0f172a' : '#ffffff',
    'vs code': '#007acc',
    'vscode': '#007acc',
    'figma': '#f24e1e',
    'postman': '#ff6c37'
  };

  const myLogoColor = logoColors[name.toLowerCase().trim()] || '#818cf8';

  // Tech details mapping for premium glassmorphic tooltips
  const techDetailsMap: Record<string, { proficiency: string; exp: string; citation?: string }> = {
    'react': { proficiency: 'Expert • 95%', exp: '2+ Years', citation: 'Built 10+ custom SPAs' },
    'typescript': { proficiency: 'Expert • 90%', exp: '1.5+ Years', citation: 'Type-safe React applets' },
    'javascript': { proficiency: 'Expert • 95%', exp: '3+ Years', citation: 'Dynamic interactive engines' },
    'node.js': { proficiency: 'Advanced • 85%', exp: '1+ Year', citation: 'Express REST APIs & proxies' },
    'node': { proficiency: 'Advanced • 85%', exp: '1+ Year', citation: 'Express REST APIs & proxies' },
    'tailwind css': { proficiency: 'Expert • 95%', exp: '2+ Years', citation: 'Fluid responsive layouts' },
    'python': { proficiency: 'Advanced • 80%', exp: '1+ Year', citation: 'Automation scripts & backend' },
    'django': { proficiency: 'Intermediate • 75%', exp: '1 Year', citation: 'Robust secure servers' },
    'flask': { proficiency: 'Advanced • 80%', exp: '1+ Year', citation: 'Microservices & AI gateways' },
    'git': { proficiency: 'Advanced • 90%', exp: '2+ Years', citation: 'Version control branch strategies' },
    'github': { proficiency: 'Advanced • 90%', exp: '2+ Years', citation: 'CI/CD pipeline integrations' },
    'mysql': { proficiency: 'Advanced • 85%', exp: '1.5+ Years', citation: 'Database optimization index' },
    'postgresql': { proficiency: 'Advanced • 80%', exp: '1 Year', citation: 'Relational data structures' },
    'mongodb': { proficiency: 'Advanced • 85%', exp: '1+ Year', citation: 'NoSQL document stores' },
    'vscode': { proficiency: 'Expert • 95%', exp: '3+ Years', citation: 'Power IDE productivity setup' },
    'vs code': { proficiency: 'Expert • 95%', exp: '3+ Years', citation: 'Power IDE productivity setup' },
    'figma': { proficiency: 'Advanced • 85%', exp: '2+ Years', citation: 'Interactive UI pixel mockup' },
    'postman': { proficiency: 'Advanced • 90%', exp: '1.5+ Years', citation: 'API endpoint test automation' },
  };

  const currentDetails = techDetailsMap[name.toLowerCase().trim()] || { 
    proficiency: 'Highly Skilled • 85%', 
    exp: '1.5+ Years', 
    citation: 'Built premium projects' 
  };

  // Responsive bubble dimensions (mix different sizes for a natural unstructured cluster)
  const sizes = [
    'h-14 w-14 sm:h-16 sm:w-16',
    'h-16 w-16 sm:h-18 sm:w-18',
    'h-15 w-15 sm:h-17 sm:w-17'
  ];
  const bubbleSizeClass = sizes[index % sizes.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ 
        type: 'spring', 
        stiffness: 60, 
        damping: 15,
        delay: index * 0.02 
      }}
      className="relative"
    >
      {/* 2D Oval float drift animation */}
      <motion.div
        animate={{
          x: xDrift,
          y: yDrift,
        }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay
        }}
        whileHover={{ 
          scale: 1.18,
          transition: { type: 'spring', stiffness: 350, damping: 15 }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative flex items-center justify-center ${bubbleSizeClass} rounded-full border cursor-pointer transition-all duration-300`}
        style={isLight ? {
          backgroundColor: isHovered ? `${myLogoColor}18` : '#ffffff',
          borderColor: isHovered ? myLogoColor : 'rgba(0,0,0,0.08)',
          boxShadow: isHovered ? `0 8px 25px ${myLogoColor}20` : `0 4px 12px rgba(0, 0, 0, 0.04)`
        } : {
          backgroundColor: isHovered ? 'rgba(15,23,42,0.6)' : 'rgba(15,23,42,0.25)',
          borderColor: isHovered ? myLogoColor : 'rgba(30,41,59,0.8)',
          boxShadow: isHovered ? `0 8px 25px ${myLogoColor}30` : `0 4px 20px rgba(0, 0, 0, 0.4)`
        }}
      >
        {/* Glow halo behind active bubble matching brand logo color */}
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-350 bg-radial -z-10 pointer-events-none blur-md"
          style={{
            background: `radial-gradient(circle, ${myLogoColor}2A 0%, transparent 70%)`
          }}
        />

        {/* Dynamic color-changing border underline reflection inside bubble */}
        <div 
          className="absolute inset-x-3 bottom-1.5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            backgroundImage: `linear-gradient(to right, transparent, ${myLogoColor}80, transparent)`
          }}
        />

        {/* Brand visual containing SVG */}
        <div 
          className="flex items-center justify-center group-hover:scale-110 transition-all duration-300 transform group-hover:rotate-6 text-glow"
          style={{
            color: myLogoColor,
            filter: `drop-shadow(0 2px 8px ${myLogoColor}30)`
          }}
        >
          <TechLogo 
            name={name} 
            className="h-7 w-7 sm:h-8 sm:w-8" 
            themeColor={myLogoColor}
          />
        </div>

        {/* Curved highlight line for real glassmorphic bubble depth */}
        <div className={`absolute right-3.5 top-1.5 w-3 h-2 rounded-full rotate-12 pointer-events-none ${isLight ? 'bg-slate-900/5' : 'bg-white/5'}`} />

        {/* ELEGANT GLASSMORPHIC MULTI-LINE TOOLTIP */}
        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none z-50 w-52 sm:w-60">
          <div className={`${
            isLight 
              ? 'bg-white/95 border-slate-250 text-slate-800' 
              : 'bg-slate-950/95 border-slate-800/90 text-slate-200'
          } border backdrop-blur-lg p-3 rounded-xl shadow-2xl flex flex-col space-y-2 text-left relative z-50`}>
            {/* Header: Title and Dot */}
            <div className="flex items-center space-x-2 border-b border-slate-800/40 pb-1.5">
              <span className="h-2 w-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor: myLogoColor, boxShadow: `0 0 6px ${myLogoColor}` }} />
              <span className="font-display font-black text-xs uppercase tracking-wider">{name}</span>
            </div>
            
            {/* Stats Area */}
            <div className="space-y-1 text-[10px] font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Proficiency:</span>
                <span className="font-semibold" style={{ color: myLogoColor }}>{currentDetails.proficiency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Exp:</span>
                <span className="text-slate-300 font-medium">{currentDetails.exp}</span>
              </div>
            </div>

            {/* Project citation / description */}
            {currentDetails.citation && (
              <div className={`text-[10px] sm:text-[11px] leading-relaxed border-t border-slate-850 pt-1.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {currentDetails.citation}
              </div>
            )}
          </div>
          {/* Tooltip caret with theme-aware colors */}
          <div className={`w-2 h-2 rotate-45 transform left-1/2 -translate-x-1/2 -mt-1.5 border-r border-b ${
            isLight ? 'bg-white border-slate-250' : 'bg-slate-950 border-slate-800/95'
          }`} />
        </div>

      </motion.div>
    </motion.div>
  );
};

export default TechBubble;
