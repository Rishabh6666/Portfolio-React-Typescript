import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar } from 'lucide-react';
import { ExperienceData } from '../data';

interface ExperienceTimelineProps {
  experiences: ExperienceData[];
  themeId?: string;
  themeIsLight?: boolean;
}

const themeClassMap: Record<string, {
  timelineLine: string;
  nodeBorder: string;
  nodeCenter: string;
  nodeGlow: string;
  roleHover: string;
  calendarIcon: string;
  bullet: string;
}> = {
  blue: {
    timelineLine: "from-blue-300/40",
    nodeBorder: "border-blue-400",
    nodeCenter: "bg-blue-600",
    nodeGlow: "shadow-[0_0_10px_rgba(37,99,235,0.15)]",
    roleHover: "group-hover:text-blue-600",
    calendarIcon: "text-blue-600",
    bullet: "bg-blue-600"
  },
  gold: {
    timelineLine: "from-amber-400/20",
    nodeBorder: "border-amber-500",
    nodeCenter: "bg-amber-400",
    nodeGlow: "shadow-[0_0_10px_rgba(212,175,55,0.5)]",
    roleHover: "group-hover:text-amber-400",
    calendarIcon: "text-amber-400",
    bullet: "bg-amber-500"
  },
  purple: {
    timelineLine: "from-purple-500/20",
    nodeBorder: "border-purple-500",
    nodeCenter: "bg-purple-400",
    nodeGlow: "shadow-[0_0_10px_rgba(124,58,237,0.5)]",
    roleHover: "group-hover:text-purple-400",
    calendarIcon: "text-purple-400",
    bullet: "bg-purple-500"
  },
  emerald: {
    timelineLine: "from-emerald-300/40",
    nodeBorder: "border-emerald-400",
    nodeCenter: "bg-emerald-600",
    nodeGlow: "shadow-[0_0_10px_rgba(16,185,129,0.15)]",
    roleHover: "group-hover:text-emerald-600",
    calendarIcon: "text-emerald-600",
    bullet: "bg-emerald-600"
  },
  orange: {
    timelineLine: "from-orange-300/40",
    nodeBorder: "border-orange-400",
    nodeCenter: "bg-orange-600",
    nodeGlow: "shadow-[0_0_10px_rgba(249,115,22,0.15)]",
    roleHover: "group-hover:text-orange-600",
    calendarIcon: "text-orange-600",
    bullet: "bg-orange-600"
  },
  cyan: {
    timelineLine: "from-cyan-500/20",
    nodeBorder: "border-cyan-500",
    nodeCenter: "bg-cyan-405 bg-cyan-400",
    nodeGlow: "shadow-[0_0_10px_rgba(0,229,255,0.5)]",
    roleHover: "group-hover:text-cyan-400",
    calendarIcon: "text-cyan-400",
    bullet: "bg-cyan-500"
  }
};

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experiences, themeId = 'purple', themeIsLight = false }) => {
  const currentTheme = themeClassMap[themeId] || themeClassMap.purple;
  const isLight = !!themeIsLight;

  const nodeGlowColors: Record<string, string> = {
    blue: 'rgba(37, 99, 235, 0.5)',
    gold: 'rgba(217, 119, 6, 0.7)',
    purple: 'rgba(147, 51, 234, 0.7)',
    emerald: 'rgba(16, 185, 129, 0.5)',
    orange: 'rgba(249, 115, 22, 0.5)',
    cyan: 'rgba(6, 182, 212, 0.7)',
  };
  const activeGlowColor = nodeGlowColors[themeId] || nodeGlowColors.purple;

  return (
    <div className="relative pl-6 sm:pl-8 border-l border-dashed border-slate-800/80 space-y-12 max-w-4xl mx-auto py-2">
      {/* Background glow behind timeline */}
      <div className={`absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b ${currentTheme.timelineLine} via-slate-800/40 to-transparent pointer-events-none`} />

      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          className="relative group"
        >
          {/* Connector node with interactive reactive gold or theme glows */}
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false, margin: "-10px" }}
            whileHover={{ scale: 1.35, zIndex: 10 }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
            className={`absolute -left-[32px] sm:-left-[40px] top-1.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full border-2 ${currentTheme.nodeBorder} bg-slate-950 transition-all duration-305`}
            style={{
              boxShadow: `0 0 16px ${activeGlowColor}`,
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.45, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3
              }}
              className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${currentTheme.nodeCenter}`}
            />
          </motion.div>

          <div className={`relative rounded-2xl border p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-slate-700/60 space-y-4 ${isLight ? 'bg-white/95 border-slate-200 hover:bg-white/95' : 'border-slate-800/80 bg-slate-950/40 hover:bg-slate-900/10'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/40 pb-4">
              <div>
                <h3 className={`font-display text-lg sm:text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'} ${currentTheme.roleHover} transition-colors`}>
                  {exp.role}
                </h3>
                <span className={`text-xs sm:text-sm font-semibold block mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {exp.company}
                </span>
              </div>
              <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider ${isLight ? 'bg-white/60 text-slate-700 border-slate-200' : 'bg-slate-800/40 text-slate-400 border border-slate-700/40'} self-start sm:self-center`}>
                <Calendar className={`h-3.5 w-3.5 ${currentTheme.calendarIcon} shrink-0`} id={`exp-calendar-icon-${index}`} />
                <span>{exp.duration}</span>
              </div>
            </div>

            <ul className="space-y-3 pl-1">
              {exp.responsibilities.map((resp, i) => (
                <li key={i} className={`flex items-start text-xs sm:text-sm ${isLight ? 'text-slate-700' : 'text-slate-350'}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${currentTheme.bullet} shrink-0 mr-3 mt-2`} />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ExperienceTimeline;
