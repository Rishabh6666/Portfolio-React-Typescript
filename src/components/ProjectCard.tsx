import React from 'react';
import { motion } from 'motion/react';
import { Github, ArrowUpRight } from 'lucide-react';
import { ProjectData } from '../data';

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  themeId?: string;
  themeIsLight?: boolean;
}

const themeClassMap: Record<string, {
  hoverBorder: string;
  glow: string;
  sweep: string;
  titleHover: string;
  githubHover: string;
  iconHover: string;
}> = {
  blue: {
    hoverBorder: "hover:border-blue-400",
    glow: "hover:shadow-[0_15px_30px_rgba(37,99,235,0.06)]",
    sweep: "from-blue-100/20",
    titleHover: "group-hover:text-blue-600",
    githubHover: "hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700",
    iconHover: "group-hover:text-blue-600"
  },
  gold: {
    hoverBorder: "hover:border-amber-500/40",
    glow: "hover:shadow-[0_15px_30px_-15px_rgba(212,175,55,0.2)]",
    sweep: "from-amber-500/5",
    titleHover: "group-hover:text-amber-400",
    githubHover: "hover:border-amber-500/40 hover:bg-amber-500/5 hover:text-amber-400",
    iconHover: "group-hover:text-amber-400"
  },
  purple: {
    hoverBorder: "hover:border-purple-500/45",
    glow: "hover:shadow-[0_15px_30px_-15px_rgba(124,58,237,0.2)]",
    sweep: "from-purple-500/5",
    titleHover: "group-hover:text-purple-400",
    githubHover: "hover:border-purple-500/40 hover:bg-purple-500/5 hover:text-purple-400",
    iconHover: "group-hover:text-purple-400"
  },
  emerald: {
    hoverBorder: "hover:border-emerald-300",
    glow: "hover:shadow-[0_15px_30px_rgba(16,185,129,0.06)]",
    sweep: "from-emerald-100/20",
    titleHover: "group-hover:text-emerald-600",
    githubHover: "hover:border-emerald-350 hover:bg-emerald-50/50 hover:text-emerald-700",
    iconHover: "group-hover:text-emerald-600"
  },
  orange: {
    hoverBorder: "hover:border-orange-300",
    glow: "hover:shadow-[0_15px_30px_rgba(249,115,22,0.06)]",
    sweep: "from-orange-100/20",
    titleHover: "group-hover:text-orange-600",
    githubHover: "hover:border-orange-355 hover:bg-orange-50 hover:text-orange-700",
    iconHover: "group-hover:text-orange-600"
  },
  cyan: {
    hoverBorder: "hover:border-cyan-500/45",
    glow: "hover:shadow-[0_15px_30px_-15px_rgba(0,229,255,0.22)]",
    sweep: "from-cyan-500/5",
    titleHover: "group-hover:text-cyan-400",
    githubHover: "hover:border-cyan-500/40 hover:bg-cyan-500/5 hover:text-cyan-400",
    iconHover: "group-hover:text-cyan-400"
  }
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, themeId = 'purple', themeIsLight = false }) => {
  const currentTheme = themeClassMap[themeId] || themeClassMap.purple;
  const isLight = !!themeIsLight;
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [coords, setCoords] = React.useState({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Position of cursor relative to card center
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Tilt angle calculations (max 8 degrees for clean professional subtle play)
    const rotateX = -(y / (height / 2)) * 8;
    const rotateY = (x / (width / 2)) * 8;

    // Shine reflection percentages (0 to 100)
    const shineX = ((e.clientX - rect.left) / width) * 100;
    const shineY = ((e.clientY - rect.top) / height) * 100;

    setCoords({ rotateX, rotateY, shineX, shineY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-55px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 sm:p-8 backdrop-blur-md cursor-pointer ${isLight ? 'bg-white/95 border-slate-200' : 'border-slate-800/80 bg-slate-900/20'}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: isHovered
          ? `perspective(1000px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) scale3d(1.025, 1.025, 1.025)`
          : `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: isHovered
          ? 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)'
          : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        boxShadow: isHovered
          ? `0 20px 40px rgba(0, 0, 0, 0.35)`
          : `0 4px 15px rgba(0, 0, 0, 0.1)`
      }}
    >
      {/* Dynamic Skeuomorphic Glass Glow Reflection on Hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle 180px at ${coords.shineX}% ${coords.shineY}%, rgba(255, 255, 255, 0.04), transparent)`
        }}
      />

      {/* Light sweep on hover */}
      <div className={`absolute inset-0 bg-gradient-to-tr ${currentTheme.sweep} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

      <div className="relative z-20" style={{ transform: 'translateZ(15px)' }}>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className={`px-2.5 py-1 text-[10px] font-mono font-medium tracking-wider uppercase rounded ${isLight ? 'bg-white/50 text-slate-700 border-slate-200' : 'bg-slate-800/60 text-slate-400 border border-slate-700/30'}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className={`font-display text-2xl font-bold tracking-tight mb-3 ${isLight ? 'text-slate-900' : 'text-white'} ${currentTheme.titleHover} transition-colors flex items-center justify-between`}>
          <span>{project.title}</span>
          <ArrowUpRight className={`h-5 w-5 text-slate-500 ${currentTheme.iconHover} transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0 ml-2`} />
        </h3>
        <p className={`text-sm leading-relaxed mb-6 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          {project.description}
        </p>
      </div>

      <div className="flex items-center space-x-4 border-t border-slate-800/60 pt-6 relative z-20" style={{ transform: 'translateZ(10px)' }}>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center space-x-2 text-xs font-mono font-semibold tracking-wider uppercase px-4 py-2.5 rounded-lg transition-all duration-300 shadow-md ${isLight ? 'border-slate-200 bg-white/60 text-slate-900 hover:text-slate-900' : 'border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white'} ${currentTheme.githubHover}`}
        >
          <Github className="h-4 w-4" id={`project-github-icon-${index}`} />
          <span>View on GitHub</span>
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
