/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  twitter?: string;
  resumeUrl?: string;
  avatarUrl: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  url?: string;
  githubUrl?: string;
  image: string;
  tags: string[];
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  logo?: string;
  period: string; // e.g. "2024 - Present"
  description: string;
  tech: string[];
}

export interface SkillGroup {
  id: string;
  category: string;
  items: string[];
}

export interface ClientMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  gpa?: string;
  achievements?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  projects: Project[];
  experiences: Experience[];
  skills: SkillGroup[];
  education: Education[];
  certifications: Certification[];
  theme: 'slate' | 'cyberpunk' | 'emerald' | 'amber' | 'rose' | 'minimalist' | 'sleek';
  layout: 'standard' | 'bento' | 'split';
}
