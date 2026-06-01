export interface Service {
  title: string;
  description: string;
  features: string[];
  badge?: string;
}

export interface ProjectData {
  title: string;
  tags: string[];
  description: string;
  githubUrl: string;
}

export interface ExperienceData {
  role: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Rishabh Barhate",
    title: "Web Developer in Mumbai & Dombivli",
    email: "rishabhedu6@gmail.com",
    whatsappUrl: "https://wa.me/919372789216?text=Hi%20Rishabh%2C%20I%20saw%20your%20portfolio%20and%20I%20would%20like%20to%20discuss%20a%20project",
    linkedinUrl: "https://www.linkedin.com/in/rishabh-barhate-1a6602218/",
    githubUrl: "https://github.com/Rishabh6666",
    instagramUrl: "https://www.instagram.com/_rishabh.6"
  },
  marqueeTechs: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React",
    "Python",
    "Django",
    "Flask",
    "MySQL",
    "MongoDB",
    "REST APIs",
    "Git",
    "PHP",
    "Java",
    "Tailwind CSS",
    "Node.js"
  ],
  services: [
    {
      title: "Full-Stack Web Development",
      description: "End-to-end web applications built with modern frameworks. Scalable, secure, and built to perform under real traffic.",
      features: [
        "Custom web apps (Django, Flask, Node)",
        "REST API design & integration",
        "Database architecture (MySQL, MongoDB)",
        "Authentication & user management"
      ],
      badge: "Most Popular"
    },
    {
      title: "Landing Pages & Business Sites",
      description: "High-converting landing pages and business websites that look great and turn visitors into leads.",
      features: [
        "Pixel-perfect responsive design",
        "SEO-ready HTML structure",
        "Fast load times (<2s)",
        "Contact forms & integrations"
      ]
    },
    {
      title: "Responsive UI / UX",
      description: "Interfaces that feel great on every device. I translate designs into clean, interactive front-end code.",
      features: [
        "HTML5, CSS3, JavaScript",
        "Smooth animations & transitions",
        "Cross-browser compatibility",
        "Accessibility (WCAG basics)"
      ]
    },
    {
      title: "AI-Powered Features",
      description: "Add intelligent features to your product — from data dashboards to ML-backed recommendations.",
      features: [
        "Sentiment analysis integration",
        "Data visualization dashboards",
        "Python ML model deployment",
        "Automated reporting tools"
      ]
    }
  ] as Service[],
  projects: [
    {
      title: "WealthWise",
      tags: ["AI", "Python", "Web App"],
      description: "AI-powered stock analyst with real-time market data, sentiment analysis from news, and interactive charts. Published in IEEE ICETEG 2025.",
      githubUrl: "https://github.com/Rishabh6666/WealthWise"
    },
    {
      title: "Doctor Appointment System",
      tags: ["PHP", "MySQL", "Full-Stack"],
      description: "Full-stack PHP web app for booking and managing doctor-patient appointments with admin dashboard.",
      githubUrl: "https://github.com/Rishabh6666/Doctor-Patient-Appointment-System"
    },
    {
      title: "College Management System",
      tags: ["Django", "Python", "Web App"],
      description: "Django-based web application for managing college records, students, and faculty with role-based access.",
      githubUrl: "https://github.com/Rishabh6666/College-Management-System"
    },
    {
      title: "Pharmacy Management System",
      tags: ["Java", "MySQL", "Desktop App"],
      description: "Java-MySQL desktop application for inventory tracking, billing, and records management for pharmacies.",
      githubUrl: "https://github.com/Rishabh6666/Pharmacy-Management-System"
    }
  ] as ProjectData[],
  process: [
    {
      step: "01",
      title: "Discovery",
      description: "We talk about your goals, audience, and what success looks like. I ask the right questions so nothing gets built twice."
    },
    {
      step: "02",
      title: "Plan & Design",
      description: "I map out the structure, pages, and user flow. You get a clear picture before a single line of code is written."
    },
    {
      step: "03",
      title: "Build",
      description: "Clean, fast, and well-structured code. I keep you updated at every milestone so there are no surprises."
    },
    {
      step: "04",
      title: "Launch & Support",
      description: "I handle deployment, testing, and handover. Post-launch support included so you're never left stranded."
    }
  ] as ProcessStep[],
  techStack: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React",
    "Tailwind CSS",
    "Python",
    "Django",
    "Flask",
    "Node.js",
    "PHP",
    "Java",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Git",
    "GitHub",
    "VS Code",
    "Figma",
    "Postman"
  ],
  about: {
    title: "Rishabh Barhate - Top Web Developer & Website Developer",
    p1: "I'm Rishabh Barhate — a full-stack web developer in Dombivli, Thane and an Electronics & Computer Science graduate from Mumbai. As a highly skilled website developer in Mumbai, I have built real-world web solutions, cooperating with modern tech companies like Graphene Industries and Hexaphase Technologies.",
    p2: "I don't just write code — I build products that rank well and convert visitors into clients. Whether you are looking for a freelance website developer in Dombivli, custom UI dashboards, or high-performance landing pages, I combine optimized speed, visual charm, and flawless SEO parameters.",
    achievements: [
      "B.E. Electronics & Computer Science — CGPA 8.62",
      "2× IEEE Published Researcher (ICCCNT & ICETEG 2025)",
      "Smart India Hackathon — Zonal Finalist",
      "Experience at 3 tech companies"
    ]
  },
  experience: [
    {
      role: "Technical Developer",
      company: "Graphene Industries Pvt. Ltd.",
      duration: "Oct – Dec 2025",
      responsibilities: [
        "Developed features for the CAREKIT healthcare platform",
        "Built intuitive UI components for early product milestones",
        "Collaborated cross-functionally to resolve technical and UX challenges"
      ]
    },
    {
      role: "Web Developer",
      company: "Hexaphase Technologies LLP",
      duration: "Jul – Sep 2025",
      responsibilities: [
        "Contributed to end-to-end web development using modern best practices",
        "Built responsive, interactive interfaces to enhance user experience",
        "Optimized performance and ensured cross-browser compatibility"
      ]
    },
    {
      role: "Software Developer Intern",
      company: "Prodigy Infotech",
      duration: "Sep – Oct 2024",
      responsibilities: [
        "Built full-stack projects using HTML, CSS, JavaScript, and Python",
        "Gained hands-on experience with real-world SDLC processes"
      ]
    }
  ] as ExperienceData[]
};
