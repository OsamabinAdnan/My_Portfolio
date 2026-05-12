// ============================================
// Type Definitions for Portfolio Website
// ============================================

// --------------------------------------------
// Theme Types
// --------------------------------------------

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

// --------------------------------------------
// Chat Types
// --------------------------------------------

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearMessages: () => void;
}

// --------------------------------------------
// Project Types
// --------------------------------------------

export type ProjectCategory = 'frontend' | 'fullstack' | 'ai';

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  deploymentUrl?: string;
  imageUrl?: string;
  mockupImageUrl?: string;
  categories: ProjectCategory[];
}

// --------------------------------------------
// Skill Types
// --------------------------------------------

export interface Skill {
  name: string;
  category: 'fullstack' | 'agentic-ai';
}

export type TechStackCategory = 'frontend' | 'backend' | 'devops' | 'digital-marketing' | 'ai' | 'others';

export interface TechStackItem {
  name: string;
  category: TechStackCategory;
  logo: string;
}

// --------------------------------------------
// Service Types
// --------------------------------------------

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// --------------------------------------------
// AI Agent Types
// --------------------------------------------

export interface AIAgent {
  id: string;
  name: string;
  purpose: string;
  technologies: string[];
  demoUrl?: string;
  videoUrl?: string;
  architecture: string;
}

// --------------------------------------------
// Blog Types
// --------------------------------------------

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime?: string;
  slug?: string;
  isPublished?: boolean;
}

// --------------------------------------------
// Contact Types
// --------------------------------------------

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// --------------------------------------------
// Profile Types
// --------------------------------------------

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  about: string;
  stats: ProfileStat[];
  socials: SocialLink[];
}

export interface ProfileStat {
  label: string;
  value: string;
  suffix?: string;
}

export interface SocialLink {
  platform: 'email' | 'linkedin' | 'github' | 'twitter';
  url: string;
  label: string;
}

// --------------------------------------------
// Experience Types
// --------------------------------------------

export interface Experience {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
}