import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Linkedin,
  Github,
  Instagram,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  Download,
  Send,
  Check,
  ChevronRight,
  ChevronDown,
  ArrowUp,
  Code,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  Paintbrush,
  Briefcase,
  GraduationCap,
  Award,
  Wifi,
  Battery,
  Play,
  Pause,
  Sun,
  Music,
  Heart,
  Flame,
  MessageSquare,
  Terminal
} from 'lucide-react';
import { PORTFOLIO_DATA } from './data';
import TechMarquee from './components/TechMarquee';
import ServiceCard from './components/ServiceCard';
import ProjectCard from './components/ProjectCard';
import ExperienceTimeline from './components/ExperienceTimeline';
import TechBubble from './components/TechBubble';
import AmbientGlowParticles from './components/AmbientGlowParticles';
import Magnetic from './components/Magnetic';
import { getLofiAudioEngine } from './utils/audioEngine';

interface ThemeStyle {
  id: string;
  name: string;
  colorName: string;
  bgGrid: string;
  dotColor: string;
  accentTextGradient: string;
  accentTextHighlight: string;
  logoSuffix: string;
  bgGlowBlob1: string;
  bgGlowBlob2: string;
  ctaBg: string;
  badgeBorder: string;
  dividerBg: string;
  cardHighlightBorder: string;
  strengthIconBg: string;
  themeBg: string;
  isLight?: boolean;
}

const THEMES: ThemeStyle[] = [
  {
    id: 'purple',
    name: 'Modern Purple AI',
    colorName: 'purple',
    bgGrid: 'opacity-[0.25]',
    dotColor: '#7C3AED',
    accentTextGradient: 'from-violet-400 via-purple-500 to-fuchsia-500',
    accentTextHighlight: 'text-violet-400',
    logoSuffix: 'text-purple-500',
    bgGlowBlob1: 'bg-violet-600/5',
    bgGlowBlob2: 'bg-purple-500/5',
    ctaBg: 'bg-violet-600 hover:bg-violet-500 hover:shadow-violet-500/30 text-white',
    badgeBorder: 'border-violet-500/30 bg-violet-500/5 text-violet-400',
    dividerBg: 'bg-violet-500',
    cardHighlightBorder: 'border-violet-500/10 hover:border-violet-500/20 bg-violet-500/5',
    strengthIconBg: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    themeBg: '#0B1120',
    isLight: false
  },
  {
    id: 'blue',
    name: 'Professional Blue',
    colorName: 'blue',
    bgGrid: 'opacity-[0.14]',
    dotColor: '#2563EB',
    accentTextGradient: 'from-blue-600 via-blue-700 to-indigo-800',
    accentTextHighlight: 'text-blue-600',
    logoSuffix: 'text-blue-600',
    bgGlowBlob1: 'bg-blue-400/5',
    bgGlowBlob2: 'bg-indigo-400/5',
    ctaBg: 'bg-blue-600 hover:bg-blue-500 hover:shadow-blue-600/20 text-white',
    badgeBorder: 'border-blue-200/50 bg-blue-50/50 text-blue-700',
    dividerBg: 'bg-blue-600',
    cardHighlightBorder: 'border-slate-200 hover:border-blue-300 bg-white/50',
    strengthIconBg: 'bg-blue-50 text-blue-600 border-blue-100',
    themeBg: '#F8FAFC',
    isLight: true
  },
  {
    id: 'gold',
    name: 'Premium Dark Gold',
    colorName: 'gold',
    bgGrid: 'opacity-[0.22]',
    dotColor: '#D4AF37',
    accentTextGradient: 'from-amber-300 via-yellow-500 to-yellow-650',
    accentTextHighlight: 'text-amber-400',
    logoSuffix: 'text-amber-500',
    bgGlowBlob1: 'bg-amber-600/5',
    bgGlowBlob2: 'bg-yellow-500/5',
    ctaBg: 'bg-amber-600 hover:bg-amber-555 bg-amber-600 hover:bg-amber-500 hover:shadow-amber-500/20 text-white',
    badgeBorder: 'border-amber-500/30 bg-amber-500/5 text-amber-400',
    dividerBg: 'bg-amber-500',
    cardHighlightBorder: 'border-amber-500/10 hover:border-amber-500/25 bg-amber-500/5',
    strengthIconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    themeBg: '#0F0F0F',
    isLight: false
  },
  {
    id: 'emerald',
    name: 'Emerald Green',
    colorName: 'emerald',
    bgGrid: 'opacity-[0.15]',
    dotColor: '#10B981',
    accentTextGradient: 'from-emerald-600 via-emerald-700 to-teal-800',
    accentTextHighlight: 'text-emerald-600',
    logoSuffix: 'text-emerald-600',
    bgGlowBlob1: 'bg-emerald-400/5',
    bgGlowBlob2: 'bg-teal-400/5',
    ctaBg: 'bg-emerald-600 hover:bg-emerald-500 hover:shadow-emerald-600/20 text-white',
    badgeBorder: 'border-emerald-200/50 bg-emerald-50/50 text-emerald-800',
    dividerBg: 'bg-emerald-600',
    cardHighlightBorder: 'border-slate-200 hover:border-emerald-300 bg-white/50',
    strengthIconBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    themeBg: '#F0FDF4',
    isLight: true
  },
  {
    id: 'orange',
    name: 'Sunset Orange',
    colorName: 'orange',
    bgGrid: 'opacity-[0.15]',
    dotColor: '#F97316',
    accentTextGradient: 'from-orange-600 via-orange-700 to-rose-800',
    accentTextHighlight: 'text-orange-600',
    logoSuffix: 'text-orange-600',
    bgGlowBlob1: 'bg-orange-400/5',
    bgGlowBlob2: 'bg-rose-400/5',
    ctaBg: 'bg-orange-600 hover:bg-orange-500 hover:shadow-orange-600/20 text-white',
    badgeBorder: 'border-orange-200/50 bg-orange-50/50 text-orange-900',
    dividerBg: 'bg-orange-600',
    cardHighlightBorder: 'border-slate-200 hover:border-orange-300 bg-white/50',
    strengthIconBg: 'bg-orange-50 text-orange-900 border-orange-100',
    themeBg: '#FFF7ED',
    isLight: true
  },
  {
    id: 'cyan',
    name: 'Black & Neon Cyan',
    colorName: 'cyan',
    bgGrid: 'opacity-[0.28]',
    dotColor: '#00E5FF',
    accentTextGradient: 'from-cyan-400 via-cyan-500 to-sky-500',
    accentTextHighlight: 'text-cyan-400',
    logoSuffix: 'text-cyan-400',
    bgGlowBlob1: 'bg-cyan-600/5',
    bgGlowBlob2: 'bg-sky-500/5',
    ctaBg: 'bg-cyan-600 hover:bg-cyan-500 hover:shadow-cyan-600/30 text-slate-950 font-bold',
    badgeBorder: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400',
    dividerBg: 'bg-cyan-500',
    cardHighlightBorder: 'border-cyan-500/10 hover:border-cyan-500/20 bg-cyan-500/5',
    strengthIconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    themeBg: '#050816',
    isLight: false
  }
];

const PERSONAL_PHOTOS = [
  {
    src: "/input_file_0.jpeg",
    alt: "Rishabh Barhate in professional suit",
    category: "Professional Profile",
    title: "Corporate & Tech",
    desc: "ECS Engineer & Full-Stack Web Developer."
  },
  {
    src: "/input_file_1.jpeg",
    alt: "Rishabh Barhate in casual wear mirror selfie",
    category: "Lifestyle",
    title: "Casual & Expressive",
    desc: "Embracing daily confidence and a modern style."
  },
  {
    src: "/input_file_2.jpeg",
    alt: "Rishabh Barhate SIES GST graduation",
    category: "Academic Milestone",
    title: "SIES GST Graduate",
    desc: "B.E. Graduate in Electronics & Computer Science."
  },
  {
    src: "/input_file_3.jpeg",
    alt: "Rishabh Barhate travel lake views",
    category: "Exploration",
    title: "Scenic Udaipur",
    desc: "Seeking inspiring outlooks and creative travel stories."
  }
];

export const App: React.FC = () => {
  // Photos slider state
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % PERSONAL_PHOTOS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Custom cursor states
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [cursorHidden, setCursorHidden] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Touch device detection check
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    setIsTouchDevice(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorHidden(false);

      const target = e.target as HTMLElement;
      if (target) {
        // Track interactive/clickable tags
        const isClickable = target.closest('a, button, [role="button"], .cursor-pointer, input, select, textarea, [onClick], iframe');
        setCursorHovered(!!isClickable);
      }
    };

    const handleMouseLeave = () => setCursorHidden(true);
    const handleMouseEnter = () => setCursorHidden(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Theme option states
  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('rishabh_portfolio_theme') || 'purple';
  });
  const [themeOpen, setThemeOpen] = useState(false);
  const [showThemeNudge, setShowThemeNudge] = useState(() => !sessionStorage.getItem('theme_nudge_seen'));

  // Navigation active state
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Hero interactive console tilt state
  const hConsoleRef = useRef<HTMLDivElement>(null);
  const [hConsoleTilt, setHConsoleTilt] = useState({ rX: 0, rY: 0, sX: 50, sY: 50 });
  const [isHConsoleHovered, setIsHConsoleHovered] = useState(false);

  // Dynamic device clock
  const [deviceTime, setDeviceTime] = useState("12:00 pm");

  // Phone simulation states
  const [phoneScreenState, setPhoneScreenState] = useState<'widgets' | 'music' | 'terminal' | 'weather' | 'profile'>('widgets');
  const [phoneMusicPlaying, setPhoneMusicPlaying] = useState(false);
  const [phoneMusicLiked, setPhoneMusicLiked] = useState(false);
  const [phoneMusicTrack, setPhoneMusicTrack] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "rishabh@dev-machine:~$ system_status",
    "● STATUS       : READY",
    "● HOST         : 127.0.0.1:3000",
    "● ENVIRONMENT  : PRODUCTIONS_STABLE",
    "● PROJECT_ID   : rishabhbarhate.dev",
    "● TECHS_LOADED : React 18, TypeScript, Tailwind",
    "Try running cool dev actions below! 👇"
  ]);
  const [isTerminalRunning, setIsTerminalRunning] = useState(false);

  const PHONE_TRACKS = [
    { title: "Neo Cosmic Dreams", artist: "Rishabh Barhate", duration: "2:45" },
    { title: "Dynamic Flow", artist: "Lofi Developer", duration: "3:12" },
    { title: "Vaporwave Grid", artist: "Tailwind Beats", duration: "1:58" }
  ];

  // Sync state between React UI controls and virtual Web Audio Synth Engine
  useEffect(() => {
    const engine = getLofiAudioEngine();
    engine.setTrack(phoneMusicTrack);
    if (phoneMusicPlaying) {
      engine.start();
    } else {
      engine.stop();
    }
  }, [phoneMusicPlaying, phoneMusicTrack]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      setDeviceTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Terminal Runner Simulation for the Interactive Mobile Screen
  const runTerminalCommand = (command: 'build' | 'git' | 'dev' | 'clear') => {
    if (isTerminalRunning) return;
    if (command === 'clear') {
      setTerminalLogs(["rishabh@dev-machine:~$ clear", "Console cleared. Try actions below! 🚀"]);
      return;
    }

    setIsTerminalRunning(true);
    let lines: string[] = [];
    if (command === 'build') {
      lines = [
        "rishabh@dev-machine:~$ npm run build",
        "⚙️ compiling assets via vite...",
        "⚡ chunk sizes:",
        "  └─ dist/assets/index.js  (232.4 kB)",
        "  └─ dist/assets/index.css (64.8 kB)",
        "✨ compiled safely in 482ms!",
        "🚀 applet has been deployed successfully!"
      ];
    } else if (command === 'git') {
      lines = [
        "rishabh@dev-machine:~$ git status",
        "On branch main • up-to-date with remote",
        "Changes to be committed:",
        "  (use 'git restore --staged <file>...' to unstage)",
        "   modified   src/App.tsx",
        "   modified   src/utils/audioEngine.ts",
        "✨ working tree pristine | code-coverage 100%"
      ];
    } else if (command === 'dev') {
      lines = [
        "rishabh@dev-machine:~$ npm run dev",
        "🔥 [vite] hot-reload server start sequence...",
        "📡 local: http://localhost:3000/",
        "📡 reverse-proxy ingress activated",
        "⚡ sandbox mode listening for client traffic",
        "● HMR running on background thread"
      ];
    }

    setTerminalLogs([`rishabh@dev-machine:~$ ${command === 'build' ? 'npm run build' : command === 'git' ? 'git status' : 'npm run dev'}`]);

    let currentLineIndex = 1;
    const logInterval = setInterval(() => {
      if (currentLineIndex < lines.length) {
        setTerminalLogs(prev => [...prev, lines[currentLineIndex]]);
        currentLineIndex++;
      } else {
        clearInterval(logInterval);
        setIsTerminalRunning(false);
      }
    }, 180);
  };

  // Progressive typing hero accent state
  const TYPING_PHRASES = [
    "Available for new projects",
    "[ SYSTEM_CORE_READY ] ● Dombivli, IN",
    "Tailored Modern Web Development"
  ];
  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: any;
    const activePhrase = TYPING_PHRASES[currentPhraseIdx];

    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText(activePhrase.slice(0, currentText.length + 1));
        if (currentText.length === activePhrase.length) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
        } else {
          timer = setTimeout(handleTyping, 50);
        }
      } else {
        setCurrentText(activePhrase.slice(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentPhraseIdx((prev) => (prev + 1) % TYPING_PHRASES.length);
        } else {
          timer = setTimeout(handleTyping, 30);
        }
      }
    };

    if (currentText.length === activePhrase.length && !isDeleting) {
      // Keep pausing
    } else {
      timer = setTimeout(handleTyping, isDeleting ? 30 : 50);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIdx]);

  const handleHConsoleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hConsoleRef.current) return;
    const rect = hConsoleRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Position of cursor relative to card center
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Tilt calculations (max 7 degrees for subtle elegance)
    const rX = -(y / (height / 2)) * 7;
    const rY = (x / (width / 2)) * 7;

    // Shine reflection percentages
    const sX = ((e.clientX - rect.left) / width) * 100;
    const sY = ((e.clientY - rect.top) / height) * 100;

    setHConsoleTilt({ rX, rY, sX, sY });
  };

  // Active theme configuration helper
  const actThemeObj = THEMES.find(t => t.id === activeTheme) || THEMES[0];

  // Handle scroll detection for sticky header change and active state tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Track active menu item on scroll
      const sections = ['home', 'services', 'projects', 'process', 'tech-stack', 'about', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !projectType) return;

    setIsSubmitting(true);

    // Simulate API delivery
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset fields
      setName('');
      setEmail('');
      setProjectType('');
      setMessage('');

      // Auto-fade success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Trigger Resume download
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Rishabh Barhate_CV.pdf';
    link.setAttribute('download', 'Rishabh Barhate_CV.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // Create alert banner in visual response rather than window.alert
    const notify_card = document.getElementById('resume-download-notification');
    if (notify_card) {
      notify_card.classList.remove('opacity-0', 'translate-y-2');
      notify_card.classList.add('opacity-100', 'translate-y-0');
      setTimeout(() => {
        notify_card.classList.remove('opacity-100', 'translate-y-0');
        notify_card.classList.add('opacity-0', 'translate-y-2');
      }, 4000);
    }
  };

  return (
    <div
      className={`relative min-h-screen ${actThemeObj.isLight ? 'theme-light text-slate-900' : 'theme-dark text-slate-100'} font-sans antialiased overflow-x-hidden bg-grid-pattern transition-colors duration-700`}
      style={{ backgroundColor: actThemeObj.themeBg }}
    >

      {/* DYNAMIC SITE-WIDE THEME INJECTION */}
      <style>{`
        ::selection {
          background-color: ${actThemeObj.dotColor}dd !important;
          color: #ffffff !important;
        }
        /* Custom scrollbar matching active theme color */
        ::-webkit-scrollbar-thumb {
          background-color: ${actThemeObj.dotColor}44 !important;
          border-radius: 9999px;
          border: 2px solid ${actThemeObj.themeBg};
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: ${actThemeObj.dotColor}77 !important;
        }
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
          background-color: ${actThemeObj.themeBg};
        }
        /* Style standard form focus ring dynamically */
        input:focus, select:focus, textarea:focus {
          border-color: ${actThemeObj.dotColor}80 !important;
          box-shadow: 0 0 0 2px ${actThemeObj.dotColor}25 !important;
        }
        /* Background grid custom tint based on theme tint */
        .bg-grid-pattern {
          background-image: linear-gradient(to right, ${actThemeObj.dotColor}0b 1px, transparent 1px),
                            linear-gradient(to bottom, ${actThemeObj.dotColor}0b 1px, transparent 1px) !important;
        }

        /* Dynamic marquee overlay overrides */
        .marquee-gradient-left {
          background-image: linear-gradient(to right, ${actThemeObj.themeBg} 10%, transparent) !important;
        }
        .marquee-gradient-right {
          background-image: linear-gradient(to left, ${actThemeObj.themeBg} 10%, transparent) !important;
        }

        /* Light Theme Color Overrides */
        .theme-light {
          color: #334155 !important; /* Premium Slate-700 readable body */
        }
        .theme-light h1,
        .theme-light h2,
        .theme-light h3,
        .theme-light h4,
        .theme-light h5,
        .theme-light h6 {
          color: #0f172a !important; /* Deep solid black-slate for headings */
        }
        .theme-light .text-slate-50 {
          color: #1a202c !important;
        }
        .theme-light .text-slate-100 {
          color: #0f172a !important;
        }
        .theme-light .text-slate-200 {
          color: #1e293b !important;
        }
        .theme-light .text-slate-300 {
          color: #334155 !important;
        }
        .theme-light .text-slate-350,
        .theme-light .text-slate-400 {
          color: #475569 !important; /* Clean contrasting dark gray */
        }
        .theme-light .text-slate-500 {
          color: #64748b !important; /* Clean contrasting medium gray */
        }
        
        /* High Contrast Card Overrides in Light Theme */
        .theme-light .bg-slate-[89]00\/5,
        .theme-light .bg-slate-[89]00\/10,
        .theme-light .bg-slate-[89]00\/20,
        .theme-light .bg-slate-[89]00\/30,
        .theme-light .bg-slate-[89]00\/40,
        .theme-light .bg-slate-[89]00\/60,
        .theme-light .bg-slate-900\/5,
        .theme-light .bg-slate-900\/10,
        .theme-light .bg-slate-900\/20,
        .theme-light .bg-slate-900\/30,
        .theme-light .bg-slate-900\/40,
        .theme-light .bg-slate-900\/60,
        .theme-light .bg-slate-850\/40,
        .theme-light .bg-slate-950\/45,
        .theme-light .bg-slate-950\/30,
        .theme-light .bg-slate-950\/40,
        .theme-light .bg-slate-950\/80,
        .theme-light .bg-slate-950\/85,
        .theme-light .bg-slate-950\/90,
        .theme-light .bg-slate-950\/95,
        .theme-light .bg-slate-950 {
          background-color: #ffffff !important;
          border-color: #edf2f7 !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.02), 0 8px 10px -6px rgba(0, 0, 0, 0.02) !important;
          backdrop-filter: blur(12px) !important;
        }
        
        /* Dark sub-pills, badges, and icon frames */
        .theme-light .bg-slate-800,
        .theme-light .bg-slate-800\/80,
        .theme-light .bg-slate-800\/85,
        .theme-light .bg-slate-800\/60,
        .theme-light .bg-slate-800\/40 {
          background-color: #f1f5f9 !important;
          color: #475569 !important;
          border-color: #e2e8f0 !important;
        }

        /* Solid theme backgrounds */
        .theme-light .bg-slate-900 {
          background-color: #ffffff !important;
          border-color: #edf2f7 !important;
        }

        /* Hover background overrides inside light themed sections */
        .theme-light .group:hover,
        .theme-light .group:hover .bg-slate-900\/30,
        .theme-light .group:hover .bg-slate-950\/40,
        .theme-light .hover\:bg-slate-900\/45:hover,
        .theme-light .hover\:bg-slate-900\/50:hover,
        .theme-light .hover\:bg-slate-800:hover,
        .theme-light .hover\:bg-slate-900:hover {
          background-color: ${actThemeObj.id === 'blue' ? '#f3f8ff' : actThemeObj.id === 'emerald' ? '#edfbf5' : '#fffaf2'} !important;
          border-color: ${actThemeObj.dotColor}35 !important;
        }

        /* Sub decorative backgrounds overrides */
        .theme-light .bg-white\/5 {
          background-color: ${actThemeObj.id === 'blue' ? '#f0f6ff' : actThemeObj.id === 'emerald' ? '#edfbf6' : '#fff9f0'} !important;
        }
        .theme-light .bg-slate-950\/20 {
          background-color: ${actThemeObj.id === 'blue' ? '#f8fafc' : actThemeObj.id === 'emerald' ? '#f4fbf7' : '#fffcf8'} !important;
        }

        /* Borders of cards and components */
        .theme-light .border-slate-800\/60,
        .theme-light .border-slate-800\/80,
        .theme-light .border-slate-800,
        .theme-light .border-slate-700\/30,
        .theme-light .border-slate-700\/40,
        .theme-light .border-slate-700\/60,
        .theme-light .border-slate-900\/60,
        .theme-light .border-slate-900,
        .theme-light .border-white\/10 {
          border-color: #e2e8f0 !important;
        }
        .theme-light .text-glow {
          text-shadow: none !important;
        }
        .theme-light .shadow-glow {
          box-shadow: none !important;
        }
        /* Target and beautify cards under light mode */
        .theme-light .bg-slate-900\/20 {
          background-color: ${actThemeObj.id === 'blue' ? '#ffffff' : actThemeObj.id === 'emerald' ? '#f4fbf7' : '#fffcf9'} !important;
          border-color: ${actThemeObj.id === 'blue' ? 'rgba(37, 99, 235, 0.08)' : actThemeObj.id === 'emerald' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(249, 115, 22, 0.12)'} !important;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.04) !important;
        }
        /* Inputs/forms theme-specific dynamic colors */
        .theme-light input,
        .theme-light textarea,
        .theme-light select {
          background-color: #ffffff !important;
          color: #0f1115 !important;
          border-color: ${actThemeObj.id === 'blue' ? 'rgba(37, 99, 235, 0.15)' : actThemeObj.id === 'emerald' ? 'rgba(16, 185, 129, 0.18)' : 'rgba(249, 115, 22, 0.18)'} !important;
        }
        /* Mobile menu layout light theme overlay */
        .theme-light .mobile-menu-container {
          background-color: ${actThemeObj.themeBg} !important;
        }
        /* Ensure centered phone time remains visible in both themes */
        #phone-center-time {
          color: #ffffff !important;
          opacity: 1 !important;
        }
        /* Dynamic scroll down hover color mapping */
        .theme-light .group:hover .scroll-down-text {
          color: ${actThemeObj.dotColor} !important;
        }
      `}</style>

      {/* BACKGROUND GLOW PARTICLES */}
      <div className={`absolute top-[10%] left-[5%] w-[400px] h-[400px] ${actThemeObj.bgGlowBlob1} rounded-full blur-[120px] pointer-events-none transition-all duration-700`} />
      <div className={`absolute top-[40%] right-[5%] w-[450px] h-[450px] ${actThemeObj.bgGlowBlob2} rounded-full blur-[140px] pointer-events-none transition-all duration-700`} />
      <div className={`absolute bottom-[15%] left-[20%] w-[500px] h-[500px] ${actThemeObj.bgGlowBlob1} rounded-full blur-[150px] pointer-events-none transition-all duration-700`} />

      {/* FLOATING HEADER */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
          ? actThemeObj.isLight
            ? 'bg-white/90 border-b border-slate-200/60 backdrop-blur-md py-3 shadow-md'
            : 'bg-slate-950/85 border-b border-slate-900/80 backdrop-blur-md py-3.5 shadow-xl'
          : 'bg-transparent py-5 lg:py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            className={`font-display text-xl sm:text-2xl font-black tracking-tight transition-colors shrink-0 ${actThemeObj.isLight ? 'text-slate-900' : 'text-white'}`}
          >
            Rishabh<span className={`transition-colors duration-500 ${actThemeObj.logoSuffix}`}>.dev</span>
          </a>

          {/* Desktop Navigation - Capsule Pill Rail */}
          <nav className={`hidden lg:flex items-center space-x-1 border px-3 py-1.5 rounded-full backdrop-blur-sm shadow-inner relative ${actThemeObj.isLight ? 'bg-white/75 border-slate-200' : 'bg-slate-950/55 border-slate-900'}`}>
            {[
              { id: 'services', label: 'Services' },
              { id: 'projects', label: 'Projects' },
              { id: 'process', label: 'Process' },
              { id: 'tech-stack', label: 'Skills' },
              { id: 'about', label: 'About' },
              { id: 'experience', label: 'Journey' }
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                  className={`px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold tracking-wide transition-all relative ${isActive
                    ? (actThemeObj.isLight ? 'text-slate-900 font-bold' : 'text-white')
                    : (actThemeObj.isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white')
                    }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 border rounded-full z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      style={{
                        borderColor: actThemeObj.isLight ? `${actThemeObj.dotColor}25` : `${actThemeObj.dotColor}33`,
                        backgroundColor: actThemeObj.isLight ? `${actThemeObj.dotColor}09` : `${actThemeObj.dotColor}12`
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center shrink-0">
            {/* Desktop Theme Selection Popover */}
            <div className="relative inline-block text-left mr-4 z-50">
              <button
                onClick={() => setThemeOpen(!themeOpen)}
                className={`flex items-center justify-center space-x-2 px-3.5 py-2 rounded-xl border transition-all cursor-pointer text-xs font-mono font-bold ${actThemeObj.isLight
                  ? 'bg-white/80 border-slate-200 text-slate-705 text-slate-700 hover:bg-slate-50/80 hover:text-slate-950'
                  : 'bg-slate-950/60 border-slate-900 text-slate-350 hover:text-white hover:bg-slate-900'
                  }`}
              >
                <Paintbrush className="h-3.5 w-3.5 shrink-0 animate-pulse" style={{ color: actThemeObj.dotColor }} />
                <span>Theme</span>
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: actThemeObj.dotColor }} />
              </button>

              <AnimatePresence>
                {themeOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setThemeOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className={`absolute right-0 mt-2.5 w-64 origin-top-right rounded-2xl border p-3.5 shadow-2xl backdrop-blur-md z-50 overflow-hidden ${actThemeObj.isLight ? 'bg-white/95 border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.06)]' : 'bg-slate-950/95 border-slate-800/80 shadow-[0_10px_50px_rgba(0,0,0,0.5)]'
                        }`}
                    >
                      <div className={`text-[10px] uppercase font-mono font-extrabold tracking-widest px-2 py-1.5 border-b mb-2.5 ${actThemeObj.isLight ? 'text-slate-400 border-slate-100' : 'text-slate-500 border-slate-900'
                        }`}>
                        🎨 Theme Presets
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {THEMES.map((t) => (
                          <button
                            key={t.id}
                            onClick={() => {
                              setActiveTheme(t.id);
                              localStorage.setItem('rishabh_portfolio_theme', t.id);
                              setThemeOpen(false);
                            }}
                            className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold font-mono transition-all border ${activeTheme === t.id
                              ? actThemeObj.isLight ? 'bg-slate-100/80 border-slate-200 text-slate-950' : 'bg-slate-900/80 border-slate-850 text-white'
                              : actThemeObj.isLight ? 'bg-transparent border-transparent text-slate-500 hover:text-slate-950 hover:bg-slate-50' : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-slate-900/40'
                              }`}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="h-3 w-3 rounded-full shrink-0 shadow-inner" style={{ backgroundColor: t.dotColor }} />
                              <span>{t.name}</span>
                            </div>
                            {activeTheme === t.id && <Check className="h-4 w-4 shrink-0" style={{ color: t.dotColor }} />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* General Action CTA Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-bold text-white rounded-xl group transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              style={{
                boxShadow: `0 4px 15px ${actThemeObj.dotColor}15`
              }}
            >
              <span className="absolute inset-0 w-full h-full transition-all duration-500 scale-100 group-hover:scale-105"
                style={{
                  background: `linear-gradient(to right, ${actThemeObj.dotColor}, #8b5cf6)`
                }} />
              <span className={`relative px-4.5 py-2 transition-all ease-in duration-500 rounded-[10px] group-hover:bg-opacity-0 ${actThemeObj.isLight ? 'bg-white text-slate-900 font-bold' : 'bg-slate-950 text-white'
                }`}>
                {actThemeObj.isLight ? <span className="group-hover:text-white relative z-10">Hire Me</span> : 'Hire Me'}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button - Styled beautifully based on active theme */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2.5 transition-colors border rounded-xl relative cursor-pointer ${actThemeObj.isLight
              ? 'text-slate-700 hover:text-slate-950 bg-white/80 border-slate-200 hover:bg-slate-50'
              : 'text-slate-400 hover:text-white bg-slate-900/60 border-slate-800/80 hover:bg-slate-900'
              }`}
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
          </button>
        </div>
      </header>

      {/* MOBILE NAV PANEL - Custom Floating Glass Capsule */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`fixed top-[74px] inset-x-4 max-w-lg md:mx-auto z-45 lg:hidden border rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-xl z-50 overflow-hidden ${actThemeObj.isLight
              ? 'bg-white/95 border-slate-200 text-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.06)]'
              : 'bg-slate-950/95 border-slate-900 text-slate-100'
              }`}
          >
            <div className="space-y-4">
              <span className={`text-[10px] font-mono font-black uppercase tracking-widest block px-2.5 ${actThemeObj.isLight ? 'text-slate-400' : 'text-slate-500'
                }`}>
                🧭 NAVIGATE
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'services', label: 'Services', icon: Layers },
                  { id: 'projects', label: 'Projects', icon: Code },
                  { id: 'process', label: 'Process', icon: Sparkles },
                  { id: 'tech-stack', label: 'Skills', icon: Cpu },
                  { id: 'about', label: 'About', icon: Linkedin },
                  { id: 'experience', label: 'Journey', icon: Briefcase }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                      className={`flex items-center space-x-3 px-3.5 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all border ${isActive
                        ? actThemeObj.isLight
                          ? 'bg-slate-100 border-slate-200 text-slate-950 shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-white'
                        : actThemeObj.isLight
                          ? 'bg-transparent border-transparent text-slate-500 hover:text-slate-950 hover:bg-slate-50'
                          : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-slate-900/40'
                        }`}
                      style={{
                        borderLeftColor: isActive ? actThemeObj.dotColor : undefined,
                        borderLeftWidth: isActive ? '3px' : undefined
                      }}
                    >
                      <Icon className="h-4 w-4 shrink-0 opacity-70" style={{ color: isActive ? actThemeObj.dotColor : undefined }} />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </div>

              {/* Mobile Theme Switcher list */}
              <div className={`border-t pt-4 ${actThemeObj.isLight ? 'border-slate-100' : 'border-slate-900'}`}>
                <span className={`text-[10px] font-mono font-black uppercase tracking-widest block mb-2 px-2.5 ${actThemeObj.isLight ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                  🎨 Theme Presets
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setActiveTheme(t.id);
                        localStorage.setItem('rishabh_portfolio_theme', t.id);
                      }}
                      className={`flex items-center space-x-2 px-3 py-2.5 rounded-2xl text-[11px] font-mono font-bold border transition-all ${activeTheme === t.id
                        ? actThemeObj.isLight ? 'bg-slate-100 border-slate-250 border-slate-200 text-slate-950 shadow-sm' : 'bg-slate-900 border-slate-800 text-white'
                        : actThemeObj.isLight ? 'bg-transparent border-slate-100 text-slate-500 hover:bg-slate-50' : 'bg-transparent border-slate-900/60 text-slate-400 hover:bg-slate-900/40'
                        }`}
                    >
                      <span className="h-2.5 w-2.5 rounded-full shrink-0 shadow-inner" style={{ backgroundColor: t.dotColor }} />
                      <span className="truncate">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full text-center text-white font-bold py-3 rounded-2xl shadow-lg transition-all active:scale-98 cursor-pointer text-xs uppercase tracking-wider"
                  style={{
                    backgroundColor: actThemeObj.dotColor,
                    boxShadow: `0 4px 15px ${actThemeObj.dotColor}25`
                  }}
                >
                  Start a Project
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative pt-32 pb-24 md:pt-36 md:pb-28 lg:pt-0 lg:pb-0 lg:h-screen lg:min-h-0 flex flex-col justify-center px-6 sm:px-8 lg:px-12 overflow-x-hidden overflow-y-visible lg:overflow-y-hidden"
      >
        {/* Dynamic ambient drifting sparks & glow */}
        <AmbientGlowParticles color={actThemeObj.dotColor} isLight={actThemeObj.isLight} />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center w-full relative z-10 pt-4 lg:pt-10">

          {/* Hero Left Info */}
          <div className="lg:col-span-7 space-y-4 md:space-y-5 lg:space-y-4 xl:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full border text-xs font-semibold tracking-wider uppercase text-glow transition-all duration-300 min-h-[34px] ${actThemeObj.badgeBorder}`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono tracking-wide text-slate-300 lowercase sm:normal-case">
                {currentText}
                <span className="animate-pulse font-bold ml-0.5" style={{ color: actThemeObj.dotColor }}>|</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-4xl xl:text-5xl font-black tracking-tight text-white leading-[1.1] lg:leading-[1.1]"
            >
              Build Websites That <span className={`inline-block pb-1 pr-2 text-transparent bg-clip-text bg-gradient-to-r ${actThemeObj.accentTextGradient}`}>Win Clients</span> For Your Business
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-400 text-sm xl:text-base leading-relaxed max-w-2xl"
            >
              Freelance web developer specializing in fast, modern, and conversion-focused websites. From landing pages to full web apps — I turn your vision into a product that works.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1"
            >
              <Magnetic range={80} strength={0.4}>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`inline-flex items-center justify-center space-x-2 font-bold px-6 py-3 lg:px-6 lg:py-3 xl:px-8 xl:py-3.5 rounded-xl shadow-lg transition-all active:scale-98 cursor-pointer w-full sm:w-auto ${actThemeObj.ctaBg}`}
                >
                  <span>Start a Project</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Magnetic>

              <Magnetic range={80} strength={0.4}>
                <button
                  onClick={() => scrollToSection('projects')}
                  className={`inline-flex items-center justify-center space-x-2 font-semibold px-6 py-3 lg:px-6 lg:py-3 xl:px-8 xl:py-3.5 rounded-xl active:scale-98 transition-all cursor-pointer w-full sm:w-auto ${actThemeObj.isLight ? 'bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200' : 'bg-slate-900/80 hover:bg-slate-800 text-slate-350 hover:text-white border border-slate-800/80'}`}
                >
                  <span>See Projects</span>
                </button>
              </Magnetic>
            </motion.div>

            {/* Stats section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 lg:gap-5 border-t border-slate-800/60 pt-5 lg:pt-4 xl:pt-6"
            >
              <div>
                <span className={`block font-display text-2xl sm:text-3xl lg:text-2xl xl:text-3xl font-extrabold ${actThemeObj.isLight ? 'text-slate-900' : 'text-white'} text-glow`}>1+</span>
                <span className="block text-[10px] xl:text-[11px] text-slate-500 uppercase tracking-widest mt-1">Years Experience</span>
              </div>
              <div>
                <span className={`block font-display text-2xl sm:text-3xl lg:text-2xl xl:text-3xl font-extrabold ${actThemeObj.isLight ? 'text-slate-900' : 'text-white'} text-glow`}>5+</span>
                <span className="block text-[10px] xl:text-[11px] text-slate-500 uppercase tracking-widest mt-1">Projects Built</span>
              </div>
              <div>
                <span className={`block font-display text-2xl sm:text-3xl lg:text-2xl xl:text-3xl font-extrabold ${actThemeObj.isLight ? 'text-slate-900' : 'text-white'} text-glow`}>100%</span>
                <span className="block text-[10px] xl:text-[11px] text-slate-500 uppercase tracking-widest mt-1">On-Time Delivery</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Right Visual Column */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <motion.div
              ref={hConsoleRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              onMouseMove={handleHConsoleMouseMove}
              onMouseEnter={() => setIsHConsoleHovered(true)}
              onMouseLeave={() => {
                setIsHConsoleHovered(false);
                setHConsoleTilt({ rX: 0, rY: 0, sX: 50, sY: 50 });
              }}
              className="relative min-h-[460px] sm:min-h-[490px] lg:min-h-[420px] xl:min-h-[500px] lg:h-[420px] xl:h-[500px] w-full max-w-[280px] sm:max-w-[310px] lg:max-w-[270px] xl:max-w-[320px] mx-auto rounded-[46px] border-[8px] border-slate-950 ring-[2px] ring-slate-800/80 bg-slate-950 pt-9 px-4 pb-4 overflow-hidden flex flex-col justify-between cursor-pointer shadow-3xl shadow-black/95 select-none theme-dark text-slate-100"
              style={{
                transformStyle: 'preserve-3d',
                transform: isHConsoleHovered
                  ? `perspective(1000px) rotateX(${hConsoleTilt.rX}deg) rotateY(${hConsoleTilt.rY}deg) scale3d(1.03, 1.03, 1.03)`
                  : `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
                transition: isHConsoleHovered
                  ? 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)'
                  : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                boxShadow: isHConsoleHovered
                  ? `0 35px 60px rgba(0, 0, 0, 0.75)`
                  : `0 12px 30px rgba(0, 0, 0, 0.45)`
              }}
            >
              {/* Vibrant Cosmic Neon Wallpaper Backdrop Layer */}
              <div className="absolute inset-0 z-0 bg-slate-950 overflow-hidden pointer-events-none">
                {/* Flowing warm/cool neon gradient blobs */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-600/35 rounded-full blur-2xl animate-pulse" />
                <div className="absolute top-1/3 -left-12 w-40 h-40 bg-pink-600/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-12 -right-6 w-36 h-36 bg-blue-600/25 rounded-full blur-2xl" />
                {/* Additional overlay for color vibrancy */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-900/60 to-purple-950/30 backdrop-blur-[1px]" />
              </div>

              {/* Realistic Dynamic Island / Camera Punchhole */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[85px] h-[17px] bg-slate-950 rounded-full flex items-center justify-between px-2.5 z-40 border border-slate-900 shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-950 border border-indigo-900/40" />
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_4px_#10b981]" />
              </div>

              {/* Physical phone ear speaker line */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-1 bg-slate-900 rounded-full z-45" />

              {/* Top Dynamic Status Bar */}
              <div className="absolute top-1.5 inset-x-0 h-6 flex items-center justify-between px-5 text-[9px] font-mono font-bold text-slate-350 select-none z-30 pointer-events-none">
                <span className="text-white">{deviceTime}</span>
                <div className="flex items-center space-x-1">
                  <span className="text-[7.5px] opacity-75">5G</span>
                  <Wifi className="h-2.5 w-2.5 opacity-80" />
                  <div className="flex items-center space-x-0.5">
                    <span className="text-[7.5px] opacity-75">98%</span>
                    <Battery className="h-3 w-3 opacity-95 text-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Dynamic Skeuomorphic Lens Reflection Flare on Hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-35"
                style={{
                  background: `radial-gradient(circle 200px at ${hConsoleTilt.sX}% ${hConsoleTilt.sY}%, rgba(255, 255, 255, 0.05), transparent)`
                }}
              />

              {/* Outer glass highlight border decoration */}
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent z-10" />
              <div className="absolute inset-y-0 -left-px w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent z-10" />

              {/* MAIN SMARTPHONE OS CONTENT */}
              <div className="flex-1 flex flex-col justify-between pt-1 relative z-10 h-full pb-9">
                <AnimatePresence mode="wait">
                  {phoneScreenState === 'widgets' && (
                    <motion.div
                      key="widgets"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 flex flex-col justify-start space-y-3 pt-2"
                    >
                      {/* Interactive Time display widget */}
                      <div className="text-center pt-2">
                        <h2 id="phone-center-time" style={{ color: '#ffffff' }} className="text-2xl font-light font-display text-white tracking-tight -mb-0.5 text-shadow-sm">{deviceTime.split(' ')[0]}</h2>
                        <span className="text-[8px] uppercase tracking-widest text-[var(--dot-color,rgba(168,85,247,1))] font-mono font-bold">SUNDAY, MAY 31</span>
                      </div>

                      {/* Dynamic Compact Weather Glassmorphic Widget */}
                      <div
                        onClick={() => setPhoneScreenState('weather')}
                        className="bg-slate-900/40 hover:bg-slate-900/60 transition-all border border-slate-800/60 p-2.5 rounded-2xl flex items-center justify-between shadow-lg backdrop-blur-md cursor-pointer hover:border-slate-700 hover:scale-[1.02] active:scale-98"
                      >
                        <div className="flex items-center space-x-2.5">
                          <Sun className="h-6 w-6 text-amber-500 animate-[spin_12s_linear_infinite]" />
                          <div className="text-left leading-tight">
                            <span className="text-[10px] block text-white font-black uppercase tracking-wide">DOMBIVLI, IN</span>
                            <span className="text-[8px] text-slate-400">Sunny • PM Breeze</span>
                          </div>
                        </div>
                        <span className="font-display font-medium text-xs text-amber-300">32°C</span>
                      </div>

                      {/* Rotating Mini Music Widget */}
                      <div
                        onClick={() => setPhoneScreenState('music')}
                        className="bg-slate-900/40 hover:bg-slate-900/60 border border-slate-800/60 p-2.5 rounded-2xl flex items-center justify-between shadow-lg backdrop-blur-md cursor-pointer hover:border-slate-700 hover:scale-[1.02] active:scale-98"
                      >
                        <div className="flex items-center space-x-2.5 min-w-0 flex-1 text-left">
                          <div className={`h-6 w-6 rounded-full bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center p-1 relative overflow-hidden ${phoneMusicPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                            <div className="h-2 w-2 rounded-full bg-slate-950" />
                          </div>
                          <div className="min-w-0 text-left leading-tight">
                            <span className="text-[9.5px] block font-bold text-white truncate">{PHONE_TRACKS[phoneMusicTrack].title}</span>
                            <span className="text-[8px] text-slate-400 truncate block">Playing • {PHONE_TRACKS[phoneMusicTrack].artist}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1.5 pl-2 shrink-0">
                          {phoneMusicPlaying && (
                            <span className="flex space-x-0.5 items-end h-2">
                              <span className="w-0.5 h-1.5 bg-indigo-400 animate-[pulse_0.6s_ease-in-out_infinite]" />
                              <span className="w-0.5 h-2.5 bg-indigo-400 animate-[pulse_0.8s_ease-in-out_infinite_delay-100]" />
                              <span className="w-0.5 h-1 bg-indigo-400 animate-[pulse_0.5s_ease-in-out_infinite_delay-200]" />
                            </span>
                          )}
                          <Play className="h-3 w-3 text-slate-300" />
                        </div>
                      </div>

                      {/* Small Quick Core Spec widget */}
                      <div className="grid grid-cols-2 gap-2 text-left">
                        <div className="p-2 bg-slate-900/40 border border-slate-800/60 rounded-xl">
                          <Code className="h-3 w-3 text-indigo-400 mb-1" />
                          <span className="text-[8px] text-slate-500 block uppercase font-bold">FRONTEND</span>
                          <span className="text-[10px] font-mono font-bold text-white">REACT 18+</span>
                        </div>
                        <div className="p-2 bg-slate-900/40 border border-slate-800/60 rounded-xl">
                          <Cpu className="h-3 w-3 text-emerald-400 mb-1" />
                          <span className="text-[8px] text-slate-500 block uppercase font-bold">API STACK</span>
                          <span className="text-[10px] font-mono font-bold text-white">NODE JS</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {phoneScreenState === 'music' && (
                    <motion.div
                      key="music"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 flex flex-col justify-between pt-2 px-1"
                    >
                      {/* Header row */}
                      <div className="flex items-center justify-between pb-1">
                        <button onClick={() => setPhoneScreenState('widgets')} className="text-xs text-indigo-400 font-bold flex items-center">&larr; Home</button>
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">COSMIC TUNES</span>
                      </div>

                      {/* Dynamic interactive vinyl cover record */}
                      <div className="relative my-auto py-2">
                        <div className="relative w-24 h-24 mx-auto bg-slate-900 rounded-full flex items-center justify-center border-4 border-slate-950 shadow-2xl overflow-hidden ring-2 ring-slate-800">
                          {/* Inner colorful visual art vinyl cover */}
                          <div className={`absolute inset-1 rounded-full bg-gradient-to-tr from-fuchsia-500 via-purple-600 to-indigo-700 ${phoneMusicPlaying ? 'animate-[spin_6s_linear_infinite]' : ''}`}>
                            <div className="absolute inset-4 rounded-full bg-slate-950 flex items-center justify-center border-2 border-slate-900">
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                            </div>
                          </div>
                        </div>

                        {/* Interactive soundwave equalizer animation that glows */}
                        <div className="flex justify-center items-end space-x-0.5 h-6 mt-4">
                          {[1, 2, 3, 4, 5, 6, 7].map((bar, i) => (
                            <motion.div
                              key={i}
                              animate={phoneMusicPlaying ? {
                                height: [
                                  i % 2 === 0 ? "4px" : "8px",
                                  i % 3 === 0 ? "20px" : "14px",
                                  i % 2 === 0 ? "10px" : "4px"
                                ]
                              } : { height: "4px" }}
                              transition={{ duration: 0.8 + (i * 0.1), repeat: Infinity, ease: "easeInOut" }}
                              className="w-1 bg-gradient-to-t from-fuchsia-500 to-indigo-400 rounded-full"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Media controls & Title details */}
                      <div className="space-y-2 text-center pb-1">
                        <div>
                          <h3 className="text-xs font-bold text-white truncate">{PHONE_TRACKS[phoneMusicTrack].title}</h3>
                          <p className="text-[9px] text-slate-400">{PHONE_TRACKS[phoneMusicTrack].artist}</p>
                        </div>

                        {/* Time duration bar */}
                        <div className="space-y-1">
                          <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                            <motion.div
                              animate={phoneMusicPlaying ? { width: ["0%", "100%"] } : {}}
                              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                              className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                            />
                          </div>
                          <div className="flex justify-between text-[7px] text-slate-500 font-mono">
                            <span>1:12</span>
                            <span>{PHONE_TRACKS[phoneMusicTrack].duration}</span>
                          </div>
                        </div>

                        {/* Interactivity Buttons */}
                        <div className="flex items-center justify-around">
                          {/* Like button has nice reactive spring pulse */}
                          <motion.button
                            whileTap={{ scale: 1.4 }}
                            onClick={() => setPhoneMusicLiked(!phoneMusicLiked)}
                            className="p-1 focus:outline-none"
                          >
                            <Heart className={`h-4.5 w-4.5 transition-colors ${phoneMusicLiked ? 'text-rose-500 fill-rose-500 shadow-glow' : 'text-slate-500'}`} />
                          </motion.button>

                          {/* Play pause trigger */}
                          <button
                            onClick={() => setPhoneMusicPlaying(!phoneMusicPlaying)}
                            className="bg-indigo-600 hover:bg-indigo-500 p-2 rounded-full text-white shadow-xl flex items-center justify-center"
                          >
                            {phoneMusicPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </button>

                          {/* Skip button cycles track index */}
                          <button
                            onClick={() => setPhoneMusicTrack((prev) => (prev + 1) % PHONE_TRACKS.length)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {phoneScreenState === 'weather' && (
                    <motion.div
                      key="weather"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 flex flex-col justify-between pt-2 px-1 text-left"
                    >
                      <div className="flex items-center justify-between pb-1">
                        <button onClick={() => setPhoneScreenState('widgets')} className="text-xs text-indigo-400 font-bold flex items-center">&larr; Home</button>
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">LIVE CLIMATE</span>
                      </div>

                      {/* Dombivli specific colorful sky cards */}
                      <div className="bg-gradient-to-br from-amber-500/20 via-pink-600/10 to-indigo-900/40 border border-slate-800/80 p-3 rounded-2xl relative overflow-hidden my-auto space-y-3">
                        <div className="flex justify-between items-start z-10 relative">
                          <div>
                            <h3 className="text-sm font-black text-white uppercase tracking-wide">Dombivli</h3>
                            <span className="text-[8px] font-mono text-pink-300">PM SUNSET • IN</span>
                          </div>
                          <Sun className="h-10 w-10 text-amber-400 animate-[spin_20s_linear_infinite] shadow-glow" />
                        </div>

                        <div className="flex items-baseline space-x-1 z-10 relative">
                          <span className="text-3xl font-light font-display text-white">32</span>
                          <span className="text-sm font-bold text-amber-300">°C</span>
                        </div>

                        <div className="border-t border-slate-800/60 pt-2 grid grid-cols-3 gap-1 text-[8px] font-mono text-center text-slate-400">
                          <div>
                            <span className="block text-[7px] text-slate-500">HUMIDITY</span>
                            <span className="font-bold text-white">62%</span>
                          </div>
                          <div>
                            <span className="block text-[7px] text-slate-500">WIND</span>
                            <span className="font-bold text-white">14 km/h</span>
                          </div>
                          <div>
                            <span className="block text-[7px] text-slate-500">UV INDEX</span>
                            <span className="font-bold text-white">Low</span>
                          </div>
                        </div>
                      </div>

                      {/* Small Weekly forecast indicator */}
                      <div className="space-y-1 text-[8.5px] font-mono text-slate-400">
                        <div className="flex justify-between border-b border-slate-900 pb-1">
                          <span>Mon</span>
                          <span>🌦 31° / 24°</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-900 pb-1">
                          <span>Tue</span>
                          <span>🌧 29° / 23°</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Wed</span>
                          <span>⛈ 28° / 23°</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {phoneScreenState === 'profile' && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 flex flex-col justify-between pt-2 px-1 text-left"
                    >
                      <div className="flex items-center justify-between pb-1">
                        <button onClick={() => setPhoneScreenState('widgets')} className="text-xs text-indigo-400 font-bold flex items-center">&larr; Home</button>
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">CREATOR SPEC</span>
                      </div>

                      {/* Rishabh specific interactive stats sheet */}
                      <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-2xl my-auto space-y-2.5">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-fuchsia-500 flex items-center justify-center text-[8px] text-white font-mono font-black">R</div>
                          <div>
                            <h4 className="text-[10px] font-black text-white uppercase tracking-wider">Rishabh Barhate</h4>
                            <span className="text-[7.5px] font-mono text-slate-400">Full-Stack Innovator</span>
                          </div>
                        </div>

                        {/* Interactive dynamic meters */}
                        <div className="space-y-2 text-[8px] font-mono">
                          <div className="space-y-0.5">
                            <div className="flex justify-between text-slate-400">
                              <span>Frontend Proficiency</span>
                              <span className="text-indigo-400">95%</span>
                            </div>
                            <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500 rounded-full w-[95%]" />
                            </div>
                          </div>

                          <div className="space-y-0.5">
                            <div className="flex justify-between text-slate-400">
                              <span>API Cloud Delivery</span>
                              <span className="text-fuchsia-400">90%</span>
                            </div>
                            <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                              <div className="h-full bg-fuchsia-500 rounded-full w-[90%]" />
                            </div>
                          </div>

                          <div className="space-y-0.5">
                            <div className="flex justify-between text-slate-400">
                              <span>Code Solid Coverage</span>
                              <span className="text-emerald-400">98%</span>
                            </div>
                            <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full w-[98%]" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Small badge group */}
                      <div className="flex justify-around items-center pt-1">
                        <div className="flex items-center space-x-1 text-[8px] text-indigo-300 font-mono">
                          <Flame className="h-3 w-3 text-orange-500 fill-orange-500 animate-pulse" />
                          <span>Active 24/7</span>
                        </div>
                        <div className="text-[8px] text-emerald-300 font-mono">
                          <span>● Freelance Opt-in</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {phoneScreenState === 'terminal' && (
                    <motion.div
                      key="terminal"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 flex flex-col justify-between pt-2 px-1 text-left"
                    >
                      <div className="flex items-center justify-between pb-1">
                        <button onClick={() => setPhoneScreenState('widgets')} className="text-xs text-indigo-400 font-bold flex items-center">&larr; Home</button>
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">LIVE SH-CONSOLE</span>
                      </div>

                      {/* Interactive Terminal Screen */}
                      <div className="bg-slate-950/95 border border-slate-900 p-2.5 rounded-xl h-44 flex flex-col justify-between font-mono text-[8.5px] text-left leading-relaxed relative shadow-inner">
                        <div className="flex-1 overflow-y-auto space-y-1.5 max-h-36 pr-1 custom-scrollbar">
                          {terminalLogs.map((log, index) => {
                            if (!log || typeof log !== 'string') return null;
                            const safeLog = log.replace(/[\r\n]/g, ' ');
                            let colorClass = "text-slate-350";
                            // amazonq-ignore-next-line
                            if (log.startsWith("● STATUS") || log.includes("safely") || log.includes("successfully") || log.includes("pristine")) {
                              colorClass = "text-emerald-400 font-semibold";
                              // amazonq-ignore-next-line
                            } else if (log.startsWith("rishabh@")) {
                              colorClass = "text-indigo-400";
                            } else if (log.includes("chunks") || log.includes("chunk")) {
                              colorClass = "text-slate-500";
                            } else if (log.includes("⚙️") || log.includes("compiling")) {
                              colorClass = "text-amber-400";
                            } else if (log.includes("🚀") || log.includes("🔥")) {
                              colorClass = "text-indigo-300 font-bold animate-[pulse_1.5s_infinite]";
                            } else if (log.includes("modified")) {
                              colorClass = "text-rose-450 text-rose-400";
                            }
                            return (
                              <p key={index} className={`${colorClass} whitespace-pre-wrap break-all`}>
                                {safeLog}
                              </p>
                            );
                          })}
                          <span className="inline-block w-1.5 h-3 bg-indigo-400 animate-[bounce_1.2s_infinite] ml-0.5 align-middle" />
                        </div>

                        {/* Interactive mini live processing light indicator */}
                        <div className="flex items-center justify-between border-t border-slate-900 pt-1.5 mt-1 text-[7.5px] text-slate-500">
                          <span>SYSTEM: {isTerminalRunning ? "COMPILING" : "IDLE"}</span>
                          <span className={`h-1.5 w-1.5 rounded-full ${isTerminalRunning ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
                        </div>
                      </div>

                      {/* Cool Console Action Buttons */}
                      <div className="grid grid-cols-2 gap-1.5 pb-1">
                        <button
                          disabled={isTerminalRunning}
                          onClick={() => runTerminalCommand('build')}
                          className="py-1.5 px-2 bg-slate-900 border border-slate-800 rounded-lg text-[8px] font-mono font-bold text-slate-200 text-center flex items-center justify-center space-x-1 hover:bg-slate-850 active:scale-[0.97] disabled:opacity-50 transition-all cursor-pointer"
                        >
                          <span className="text-indigo-400">&gt;_</span> <span>build</span>
                        </button>
                        <button
                          disabled={isTerminalRunning}
                          onClick={() => runTerminalCommand('git')}
                          className="py-1.5 px-2 bg-slate-900 border border-slate-800 rounded-lg text-[8px] font-mono font-bold text-slate-200 text-center flex items-center justify-center space-x-1 hover:bg-slate-850 active:scale-[0.97] disabled:opacity-50 transition-all cursor-pointer"
                        >
                          <span className="text-emerald-400">&gt;_</span> <span>git status</span>
                        </button>
                        <button
                          disabled={isTerminalRunning}
                          onClick={() => runTerminalCommand('dev')}
                          className="py-1.5 px-2 bg-slate-900 border border-slate-800 rounded-lg text-[8px] font-mono font-bold text-slate-200 text-center flex items-center justify-center space-x-1 hover:bg-slate-850 active:scale-[0.97] disabled:opacity-50 transition-all cursor-pointer"
                        >
                          <span className="text-amber-400">&gt;_</span> <span>dev serve</span>
                        </button>
                        <button
                          onClick={() => runTerminalCommand('clear')}
                          className="py-1.5 px-2 bg-slate-950 border border-slate-900 rounded-lg text-[8px] font-mono font-medium text-slate-400 text-center flex items-center justify-center hover:bg-slate-900 active:scale-[0.97] transition-all cursor-pointer"
                        >
                          <span>clear-log</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* BOTTOM SMARTPHONE GLASS DOCK BAR */}
                <div className="absolute bottom-[-18px] inset-x-0 h-10 bg-slate-950/80 border border-slate-800/80 backdrop-blur-md rounded-2xl flex items-center justify-around px-2 py-1 shadow-2xl z-30">
                  <button
                    onClick={() => setPhoneScreenState('widgets')}
                    className={`p-1.5 rounded-lg transition-all ${phoneScreenState === 'widgets' ? 'bg-indigo-600/30 text-indigo-400 scale-110 shadow-[0_0_8px_rgba(99,102,241,0.2)]' : 'text-slate-400 hover:text-white'}`}
                  >
                    <Layers className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setPhoneScreenState('music')}
                    className={`p-1.5 rounded-lg transition-all ${phoneScreenState === 'music' ? 'bg-fuchsia-600/30 text-fuchsia-400 scale-110 shadow-[0_0_8px_rgba(217,70,239,0.2)]' : 'text-slate-400 hover:text-white'}`}
                  >
                    <Music className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setPhoneScreenState('terminal')}
                    className={`p-1.5 rounded-lg transition-all ${phoneScreenState === 'terminal' ? 'bg-violet-600/30 text-violet-400 scale-110 shadow-[0_0_8px_rgba(139,92,246,0.2)]' : 'text-slate-400 hover:text-white'}`}
                  >
                    <Terminal className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setPhoneScreenState('weather')}
                    className={`p-1.5 rounded-lg transition-all ${phoneScreenState === 'weather' ? 'bg-amber-600/30 text-amber-400 scale-110 shadow-[0_0_8px_rgba(245,158,11,0.2)]' : 'text-slate-400 hover:text-white'}`}
                  >
                    <Sun className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setPhoneScreenState('profile')}
                    className={`p-1.5 rounded-lg transition-all ${phoneScreenState === 'profile' ? 'bg-emerald-600/30 text-emerald-400 scale-110 shadow-[0_0_8px_rgba(16,185,129,0.2)]' : 'text-slate-400 hover:text-white'}`}
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Sleek physical iOS home bar safe indicator */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-slate-800 rounded-full z-35 opacity-60" />
            </motion.div>
          </div>

        </div>

        {/* ANIMATED SCROLL DOWN ARROWS */}
        <div
          className="absolute bottom-4 md:bottom-5 lg:bottom-6 xl:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center cursor-pointer z-20 group"
          onClick={() => scrollToSection('services')}
        >
          <span className={`font-mono text-[9px] uppercase tracking-[0.25em] transition-colors duration-300 mb-1 ${actThemeObj.isLight
            ? 'text-slate-500 group-hover:text-slate-900'
            : 'text-slate-500 group-hover:text-white'
            }`}>
            Scroll Down
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex flex-col items-center -space-y-1.5"
          >
            <ChevronDown className="h-3.5 w-3.5" style={{ color: actThemeObj.dotColor }} />
            <ChevronDown className="h-3.5 w-3.5 opacity-50" style={{ color: actThemeObj.dotColor }} />
          </motion.div>
        </div>

      </section>

      {/* TECHNOLOGIES MARQUEE */}
      <TechMarquee items={PORTFOLIO_DATA.marqueeTechs} themeColor={actThemeObj.dotColor} />

      {/* SERVICES SECTION */}
      <section
        id="services"
        className="py-24 sm:py-32 border-t border-slate-900/80 scroll-mt-20 px-6 sm:px-8 lg:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 space-y-4 font-sans">
            <span className={`text-xs font-bold uppercase tracking-widest text-glow block ${actThemeObj.accentTextHighlight}`}>
              Core Capabilities
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Services Built to <span className={`text-transparent bg-clip-text bg-gradient-to-r ${actThemeObj.accentTextGradient}`}>Grow Your Business</span>
            </h2>
            <div className={`h-1 w-16 mx-auto rounded ${actThemeObj.dividerBg}`} />
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Every service is designed with one goal: results for you and your customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {PORTFOLIO_DATA.services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} themeId={activeTheme} />
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section
        id="projects"
        className="py-24 sm:py-32 border-t border-slate-900/80 scroll-mt-20 px-6 sm:px-8 lg:px-12 bg-slate-950/20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 space-y-4">
            <span className={`text-xs font-bold uppercase tracking-widest text-glow block ${actThemeObj.accentTextHighlight}`}>
              Selected Projects
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Recent <span className={`text-transparent bg-clip-text bg-gradient-to-r ${actThemeObj.accentTextGradient}`}>Projects</span>
            </h2>
            <div className={`h-1 w-16 mx-auto rounded ${actThemeObj.dividerBg}`} />
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              A selection of work that demonstrates what I can build for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {PORTFOLIO_DATA.projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} themeId={activeTheme} themeIsLight={actThemeObj.isLight} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section
        id="process"
        className="py-24 sm:py-32 border-t border-slate-900/80 scroll-mt-20 px-6 sm:px-8 lg:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24 space-y-4">
            <span className={`text-xs font-bold uppercase tracking-widest text-glow block ${actThemeObj.accentTextHighlight}`}>
              Direct Collaboration
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              From Idea to <span className={`text-transparent bg-clip-text bg-gradient-to-r ${actThemeObj.accentTextGradient}`}>Live Product</span>
            </h2>
            <div className={`h-1 w-16 mx-auto rounded ${actThemeObj.dividerBg}`} />
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              A clear, collaborative process so you always know what's happening.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative pt-4">
            {PORTFOLIO_DATA.process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/10 p-6 backdrop-blur-md hover:border-slate-700/60 transition-all duration-300"
              >
                {/* Horizontal progress accent line indicator for wider viewports */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(100%+8px)] w-[calc(100%-48px)] h-px border-t border-dashed border-slate-800 pointer-events-none" />
                )}

                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="font-display text-3xl font-black text-slate-800 group-hover:text-slate-700 transition-colors">
                    {step.step}
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: actThemeObj.dotColor }} />
                </div>

                <h3 className={`font-display text-lg font-bold text-white group-hover:${actThemeObj.accentTextHighlight} transition-colors mb-2`}>
                  {step.title}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK VISUAL SECTION */}
      <section
        id="tech-stack"
        className="py-24 sm:py-32 border-t border-slate-900/80 scroll-mt-20 px-6 sm:px-8 lg:px-12 bg-slate-950/20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative font-sans">

          <div className="absolute top-[30%] left-[50%] -translate-x-[50%] w-[380px] h-[380px] rounded-full blur-[140px] pointer-events-none -z-10"
            style={{ backgroundColor: `${actThemeObj.dotColor}12` }} />

          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
            <span className={`text-xs font-bold uppercase tracking-widest text-glow block ${actThemeObj.accentTextHighlight}`}>
              Skill Matrix
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Tools I Build <span className={`text-transparent bg-clip-text bg-gradient-to-r ${actThemeObj.accentTextGradient}`}>With</span>
            </h2>
            <div className={`h-1 w-16 mx-auto rounded ${actThemeObj.dividerBg}`} />
            <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
              Hover and slide on these beautiful dynamic floating skill capsules to witness high density vector styling.
            </p>
          </div>

          {/* SASS-styled Bubble Layout containing gorgeous circular vector bubbles */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 max-w-5xl mx-auto py-10 relative px-2">
            {PORTFOLIO_DATA.techStack.map((tech, index) => (
              <TechBubble
                key={tech}
                name={tech}
                index={index}
                themeColor={actThemeObj.dotColor}
                themeGlow={actThemeObj.accentTextHighlight}
                accentGradient={actThemeObj.accentTextGradient}
                isLight={actThemeObj.isLight}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section
        id="about"
        className="py-24 sm:py-32 border-t border-slate-900/80 scroll-mt-20 px-6 sm:px-8 lg:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left side column: Photo Carousel with smooth 3s sliding loop */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-3xl border border-slate-800/80 bg-slate-950/40 backdrop-blur-md overflow-hidden shadow-2xl group flex flex-col justify-end h-[450px] sm:h-[540px] md:h-[580px] lg:h-[550px]"
                style={{ borderColor: `${actThemeObj.dotColor}25` }}
              >
                {/* Image sliding viewport */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <div
                    className="flex w-full h-full transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${photoIndex * 100}%)` }}
                  >
                    {PERSONAL_PHOTOS.map((photo, idx) => (
                      <div key={idx} className="w-full h-full shrink-0 relative">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover select-none"
                          referrerPolicy="no-referrer"
                        />
                        {/* Theme-aware vignette overlay for metadata legibility */}
                        <div className={`absolute inset-x-0 bottom-0 h-2/3 pointer-events-none ${actThemeObj.isLight ? 'bg-gradient-to-t from-white/40 via-white/12 to-transparent' : 'bg-gradient-to-t from-slate-950/40 via-slate-950/12 to-transparent'}`} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ambient glow accent */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: `${actThemeObj.dotColor}20` }} />

                {/* Elegant overlay: Metadata and Controls at the bottom */}
                <div className="relative mt-auto w-full p-6 z-10 pointer-events-none">
                  <div className="space-y-1 mb-4">
                    <span
                      className={`text-[9px] font-mono tracking-widest uppercase font-bold p-1 px-2.5 rounded-full select-none mb-1.5 ${actThemeObj.isLight ? 'bg-white/80 border-slate-200' : 'bg-slate-950/70 border'} `}
                      style={{
                        color: actThemeObj.dotColor,
                        borderColor: actThemeObj.isLight ? `${actThemeObj.dotColor}33` : `${actThemeObj.dotColor}33`
                      }}
                    >
                      {PERSONAL_PHOTOS[photoIndex].category}
                    </span>
                    <h4 className={`text-lg font-display font-bold leading-tight ${actThemeObj.isLight ? 'text-slate-900' : 'text-white'}`}>
                      {PERSONAL_PHOTOS[photoIndex].title}
                    </h4>
                    <p className={`text-xs mt-1 leading-relaxed ${actThemeObj.isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      {PERSONAL_PHOTOS[photoIndex].desc}
                    </p>
                  </div>

                  {/* Indicators / Manual Slide Controllers */}
                  <div className="flex items-center space-x-2 pointer-events-auto">
                    {PERSONAL_PHOTOS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPhotoIndex(idx)}
                        className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                        style={{
                          width: idx === photoIndex ? '20px' : '6px',
                          backgroundColor: idx === photoIndex ? actThemeObj.dotColor : '#475569'
                        }}
                        aria-label={`Show slide xl ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right side info column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4 font-sans">
                <span className={`text-xs font-bold uppercase tracking-widest text-glow block ${actThemeObj.accentTextHighlight}`}>
                  A Professional Mindset
                </span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                  {PORTFOLIO_DATA.about.title}
                </h2>
                <div className={`h-1 w-16 mx-auto sm:mx-0 rounded ${actThemeObj.dividerBg}`} />
              </div>

              <div className="space-y-5 text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
                <p>{PORTFOLIO_DATA.about.p1}</p>
                <p>{PORTFOLIO_DATA.about.p2}</p>
              </div>

              {/* Education & Achievements Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-start space-x-3.5 p-4 rounded-2xl bg-slate-900/30 border border-slate-800/60 hover:border-slate-700/60 transition-all duration-300"
                >
                  <div className={`h-9 w-9 shrink-0 rounded-xl flex items-center justify-center border ${actThemeObj.strengthIconBg}`}>
                    <GraduationCap className="h-5 w-5" style={{ color: actThemeObj.dotColor }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider">Education</h4>
                    <span className="block font-semibold text-slate-200 text-[13px] mt-1">B.E. Electronics & Computer Science</span>
                    <span className="block text-slate-400 text-xs mt-0.5">University of Mumbai • CGPA 8.62</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-start space-x-3.5 p-4 rounded-2xl bg-slate-900/30 border border-slate-800/60 hover:border-slate-700/60 transition-all duration-300"
                >
                  <div className={`h-9 w-9 shrink-0 rounded-xl flex items-center justify-center border ${actThemeObj.strengthIconBg}`}>
                    <Award className="h-5 w-5" style={{ color: actThemeObj.dotColor }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider">Research</h4>
                    <span className="block font-semibold text-slate-200 text-[13px] mt-1">2× IEEE Published Researcher</span>
                    <span className="block text-slate-400 text-xs mt-0.5">ICCCNT & ICETEG 2025 Milestones</span>
                  </div>
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`inline-flex items-center justify-center space-x-2 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all active:scale-98 cursor-pointer ${actThemeObj.ctaBg}`}
                >
                  <span>Work With Me</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={handleDownloadCV}
                  className="inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold px-6 py-3.5 rounded-xl border border-slate-800/80 active:scale-98 transition-all cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download CV</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* EXPERIENCE TIMELINE SECTION */}
      <section
        id="experience"
        className="py-24 sm:py-32 border-t border-slate-900/80 scroll-mt-20 px-6 sm:px-8 lg:px-12 bg-slate-950/20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 space-y-4">
            <span className={`text-xs font-bold uppercase tracking-widest text-glow block ${actThemeObj.accentTextHighlight}`}>
              Professional Journey
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Where I've <span className={`text-transparent bg-clip-text bg-gradient-to-r ${actThemeObj.accentTextGradient}`}>Worked</span>
            </h2>
            <div className={`h-1 w-16 mx-auto rounded ${actThemeObj.dividerBg}`} />
          </div>

          <ExperienceTimeline experiences={PORTFOLIO_DATA.experience} themeId={activeTheme} themeIsLight={actThemeObj.isLight} />
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="py-24 sm:py-32 border-t border-slate-900/80 scroll-mt-20 px-6 sm:px-8 lg:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Left Column info */}
            <div className="lg:col-span-5 space-y-8 flex flex-col justify-between py-2 font-sans">
              <div className="space-y-6">
                <span className={`text-xs font-bold uppercase tracking-widest text-glow block ${actThemeObj.accentTextHighlight}`}>
                  Let's Collaborate
                </span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                  Ready to Build <span className={`text-transparent bg-clip-text bg-gradient-to-r ${actThemeObj.accentTextGradient}`}>Something Great?</span>
                </h2>
                <div className={`h-1 w-16 rounded ${actThemeObj.dividerBg}`} />
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  Have a project in mind? I'd love to hear about it. Drop me a message and I'll get back to you within 24 hours with a clear plan and quote.
                </p>
              </div>

              {/* Verified channels cards */}
              <div className="space-y-4">

                {/* Email channel card */}
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="flex items-center space-x-4 p-4 rounded-xl border border-slate-800/80 bg-slate-900/10 backdrop-blur-sm hover:border-slate-700/65 transition-all duration-300"
                >
                  <div className="h-10 w-10 shrink-0 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${actThemeObj.dotColor}12`, border: `1px solid ${actThemeObj.dotColor}33`, color: actThemeObj.dotColor }}>
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">Email</span>
                    <strong className="block text-slate-200 text-sm">{PORTFOLIO_DATA.personal.email}</strong>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-600 ml-auto" />
                </a>

                {/* WhatsApp channel card */}
                <a
                  href={PORTFOLIO_DATA.personal.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-xl border border-slate-800/80 bg-slate-900/10 backdrop-blur-sm hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300"
                >
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                    <span className="font-bold text-sm">WA</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">WhatsApp</span>
                    <strong className="block text-emerald-400 text-sm">Quickest Response</strong>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-600 ml-auto" />
                </a>

                {/* LinkedIn channel card */}
                <a
                  href={PORTFOLIO_DATA.personal.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-xl border border-slate-800/80 bg-slate-900/10 backdrop-blur-sm hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300"
                >
                  <div className="h-10 w-10 shrink-0 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${actThemeObj.dotColor}12`, border: `1px solid ${actThemeObj.dotColor}33`, color: actThemeObj.dotColor }}>
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">LinkedIn</span>
                    <strong className="block text-slate-200 text-sm">Connect Professionally</strong>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-600 ml-auto" />
                </a>

              </div>

              <p className="text-[11px] font-mono text-slate-500 leading-relaxed font-sans">
                📢 <span className="text-slate-400 font-semibold">Typical response time:</span> under 2 hours on WhatsApp
              </p>
            </div>

            {/* Right Column Form */}
            <div className="lg:col-span-12 xl:col-span-7 mt-6 xl:mt-0 font-sans">
              <div className="rounded-3xl border border-slate-850 bg-slate-950/45 p-6 sm:p-10 backdrop-blur-md relative overflow-hidden">

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">Send a Message</h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-8 font-sans">Fill in the details and I'll come back with a tailored proposal.</p>

                <form onSubmit={handleFormSubmit} className="space-y-6">

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Carter"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full bg-slate-900/60 border border-slate-800 focus:border-opacity-100 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 transition-all outline-none focus:ring-1`}
                      style={{
                        borderColor: `${actThemeObj.dotColor}25`
                      }}
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full bg-slate-900/60 border border-slate-800 focus:border-opacity-100 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 transition-all outline-none focus:ring-1`}
                      style={{
                        borderColor: `${actThemeObj.dotColor}25`
                      }}
                    />
                  </div>

                  {/* Project Type choice */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">Project Type</label>
                    <select
                      required
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className={`w-full bg-slate-900/60 border border-slate-800 focus:border-opacity-100 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-400 transition-all outline-none focus:ring-1`}
                      style={{
                        borderColor: `${actThemeObj.dotColor}25`
                      }}
                    >
                      <option value="" disabled className="bg-slate-950 text-slate-500">Pick a project type...</option>
                      <option value="Landing Page/Business Site" className="bg-slate-950 text-slate-100">Landing Page / Business Site</option>
                      <option value="Full-Stack Web App" className="bg-slate-950 text-slate-100">Full-Stack Web App</option>
                      <option value="AI-Powered Platform" className="bg-slate-950 text-slate-100">AI-Powered Platform</option>
                      <option value="Other Consulting" className="bg-slate-950 text-slate-100">Other Custom Project</option>
                    </select>
                  </div>

                  {/* Message (Optional detail support) */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">Project Details (Optional)</label>
                    <textarea
                      rows={4}
                      placeholder="Tell me briefly about alignment, timeline scope, or target designs..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`w-full bg-slate-900/60 border border-slate-800 focus:border-opacity-100 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 transition-all outline-none resize-none focus:ring-1`}
                      style={{
                        borderColor: `${actThemeObj.dotColor}25`
                      }}
                    />
                  </div>

                  {/* Action row / Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full inline-flex items-center justify-center space-x-2 disabled:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-98 text-sm cursor-pointer ${actThemeObj.ctaBg}`}
                  >
                    {isSubmitting ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  {/* Submission Toast Alert Overlay */}
                  <AnimatePresence>
                    {submitSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="my-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs text-center font-semibold text-glow flex items-center justify-center space-x-2"
                      >
                        <CheckCircle className="h-4 w-4 shrink-0" />
                        <span>Thank you! Your message was delivered. Typical response under 2h.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 py-12 px-6 sm:px-8 lg:px-12 bg-slate-950/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            className="font-display text-xl font-extrabold text-white"
          >
            Rishabh<span className={`transition-colors duration-500 ${actThemeObj.logoSuffix}`}>.dev</span>
          </a>

          <p className={`text-xs ${actThemeObj.isLight ? 'text-slate-700' : 'text-slate-500'} text-center md:text-left font-mono`}>
            © 2025 Rishabh Barhate. Built with care. All rights reserved.
          </p>

          {/* Social Icons links */}
          <div className="flex items-center space-x-5 md:pr-20 lg:pr-24">
            <Magnetic range={50} strength={0.4}>
              <a
                href={PORTFOLIO_DATA.personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${actThemeObj.isLight ? 'text-slate-700 hover:text-slate-900' : 'text-slate-500 hover:text-white'} transition-colors block p-1`}
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>
            </Magnetic>
            <Magnetic range={50} strength={0.4}>
              <a
                href={PORTFOLIO_DATA.personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${actThemeObj.isLight ? 'text-slate-700 hover:text-slate-900' : 'text-slate-500 hover:text-white'} transition-colors block p-1`}
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Magnetic>
            <Magnetic range={50} strength={0.4}>
              <a
                href={PORTFOLIO_DATA.personal.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${actThemeObj.isLight ? 'text-slate-700 hover:text-slate-900' : 'text-slate-500 hover:text-white'} transition-colors block p-1`}
                aria-label="Instagram Profile"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </Magnetic>
            <Magnetic range={50} strength={0.4}>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className={`${actThemeObj.isLight ? 'text-slate-700 hover:text-slate-900' : 'text-slate-500 hover:text-white'} transition-colors block p-1`}
                aria-label="Send Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </Magnetic>
          </div>

        </div>
      </footer>

      {/* THEME NUDGE FLOATING PILL */}
      <AnimatePresence>
        {showThemeNudge && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ delay: 1.5, duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full border shadow-2xl backdrop-blur-md cursor-pointer select-none"
            style={{
              backgroundColor: actThemeObj.isLight ? 'rgba(255,255,255,0.95)' : 'rgba(15,23,42,0.95)',
              borderColor: `${actThemeObj.dotColor}50`,
              boxShadow: `0 8px 32px ${actThemeObj.dotColor}25`
            }}
            onClick={() => {
              setThemeOpen(true);
              setShowThemeNudge(false);
              sessionStorage.setItem('theme_nudge_seen', '1');
            }}
          >
            <motion.div
              animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
              transition={{ delay: 2, duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
            >
              <Paintbrush className="h-4 w-4" style={{ color: actThemeObj.dotColor }} />
            </motion.div>
            <span className="text-xs font-bold" style={{ color: actThemeObj.isLight ? '#0f172a' : '#f1f5f9' }}>
              Try a theme — 6 styles available!
            </span>
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="h-2 w-2 rounded-full shrink-0"
              style={{ backgroundColor: actThemeObj.dotColor }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowThemeNudge(false);
                sessionStorage.setItem('theme_nudge_seen', '1');
              }}
              className="ml-1 opacity-50 hover:opacity-100 transition-opacity"
              style={{ color: actThemeObj.isLight ? '#64748b' : '#94a3b8' }}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOAT BACK TO TOP BUTTON */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('home')}
            className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full border shadow-2xl backdrop-blur-md hover:cursor-pointer group select-none flex items-center justify-center transition-all bg-slate-950/80 hover:bg-slate-900 border-slate-800"
            style={{
              borderColor: `${actThemeObj.dotColor}30`,
              boxShadow: `0 8px 30px ${actThemeObj.dotColor}10`
            }}
            aria-label="Back to Top"
          >
            <ArrowUp
              className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
              style={{ color: actThemeObj.dotColor }}
            />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;
