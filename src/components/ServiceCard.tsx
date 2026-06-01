import React from 'react';
import { motion } from 'motion/react';
import { Laptop, Paintbrush, Smartphone, Brain, Check } from 'lucide-react';
import { Service } from '../data';

interface ServiceCardProps {
  service: Service;
  index: number;
  themeId?: string;
}

const ICONS = [Laptop, Paintbrush, Smartphone, Brain];

const themeClassMap: Record<string, {
  text: string;
  badge: string;
  accentBorder: string;
  iconBg: string;
  glow: string;
  featureCheck: string;
}> = {
  blue: {
    text: "text-blue-600",
    badge: "bg-blue-50 text-blue-700 border-blue-200/50",
    accentBorder: "via-blue-400/50",
    iconBg: "group-hover:text-blue-600 group-hover:border-blue-400/40 group-hover:bg-blue-50/50",
    glow: "hover:shadow-[0_15px_30px_rgba(37,99,235,0.08)]",
    featureCheck: "text-blue-600"
  },
  gold: {
    text: "text-amber-400",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/25",
    accentBorder: "via-amber-500/50",
    iconBg: "group-hover:text-amber-300 group-hover:border-amber-500/30 group-hover:bg-amber-500/5",
    glow: "hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.15)]",
    featureCheck: "text-amber-400"
  },
  purple: {
    text: "text-violet-400",
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/25",
    accentBorder: "via-violet-500/50",
    iconBg: "group-hover:text-violet-300 group-hover:border-violet-500/30 group-hover:bg-purple-500/5",
    glow: "hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.15)]",
    featureCheck: "text-violet-400"
  },
  emerald: {
    text: "text-emerald-600",
    badge: "bg-emerald-50 text-emerald-800 border-emerald-200/50",
    accentBorder: "via-emerald-400/50",
    iconBg: "group-hover:text-emerald-600 group-hover:border-emerald-400/40 group-hover:bg-emerald-50/50",
    glow: "hover:shadow-[0_15px_30px_rgba(16,185,129,0.08)]",
    featureCheck: "text-emerald-600"
  },
  orange: {
    text: "text-orange-600",
    badge: "bg-orange-50 text-orange-900 border-orange-200/50",
    accentBorder: "via-orange-400/50",
    iconBg: "group-hover:text-orange-600 group-hover:border-orange-400/40 group-hover:bg-orange-50/50",
    glow: "hover:shadow-[0_15px_30px_rgba(249,115,22,0.08)]",
    featureCheck: "text-orange-600"
  },
  cyan: {
    text: "text-cyan-400",
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/25",
    accentBorder: "via-cyan-500/50",
    iconBg: "group-hover:text-cyan-300 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/5",
    glow: "hover:shadow-[0_0_30px_-5px_rgba(0,229,255,0.18)]",
    featureCheck: "text-cyan-400"
  }
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, themeId = 'purple' }) => {
  const IconComponent = ICONS[index % ICONS.length] || Laptop;
  const currentTheme = themeClassMap[themeId] || themeClassMap.purple;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative rounded-2xl border border-slate-800/80 bg-slate-900/30 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-slate-700/60 hover:bg-slate-900/50 ${currentTheme.glow} flex flex-col justify-between`}
    >
      {/* Accent glow on card hover */}
      <div className={`absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent ${currentTheme.accentBorder} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl`} />
      
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/40 ${currentTheme.iconBg} text-slate-400 transition-all duration-300`}>
            <IconComponent className="h-6 w-6" id={`service-icon-${index}`} />
          </div>
          {service.badge && (
            <span className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide text-glow border ${currentTheme.badge}`}>
              {service.badge}
            </span>
          )}
        </div>

        <h3 className={`font-display text-xl font-bold tracking-tight text-white mb-3 group-hover:${currentTheme.text} transition-colors`}>
          {service.title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {service.description}
        </p>
      </div>

      <ul className="space-y-2.5 border-t border-slate-800/60 pt-6">
        {service.features.map((feature, i) => (
          <li key={i} className="flex items-start text-xs text-slate-300">
            <Check className={`h-4 w-4 shrink-0 mr-2.5 mt-0.5 ${currentTheme.featureCheck}`} id={`service-feature-check-${index}-${i}`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ServiceCard;
