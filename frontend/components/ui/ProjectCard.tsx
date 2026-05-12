'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, Layers, BrainCircuit } from 'lucide-react';
import type { Project, ProjectCategory } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick?: () => void;
}

const categoryConfig: Record<ProjectCategory, { label: string; gradient: string; icon: React.ReactNode; ringClass: string }> = {
  frontend: {
    label: 'Frontend',
    gradient: 'from-[#a73dff]/70 to-[#a73dff]',
    icon: <Code2 className="w-3 h-3" />,
    ringClass: 'ring-1 ring-[#A32CC4]/30',
  },
  fullstack: {
    label: 'FullStack',
    gradient: 'from-[#a73dff]/50 to-[#a73dff]',
    icon: <Layers className="w-3 h-3" />,
    ringClass: 'ring-1 ring-[#311432]/50',
  },
  ai: {
    label: 'AI Integrated',
    gradient: 'from-[#a73dff]/30 to-[#a73dff]',
    icon: <BrainCircuit className="w-3 h-3" />,
    ringClass: 'ring-1 ring-[#710193]/30',
  },
};

const categoryIcons: Record<ProjectCategory, React.ReactNode> = {
  frontend: <Code2 className="w-6 h-6 text-[#a73dff]" />,
  fullstack: <Layers className="w-6 h-6 text-[#a73dff]" />,
  ai: <BrainCircuit className="w-6 h-6 text-[#a73dff]" />,
};

const techClasses: Record<ProjectCategory, string> = {
  frontend: 'border-[#a73dff]/70 bg-[#a73dff]/10 text-[#a73dff]',
  fullstack: 'border-[#a73dff]/50 bg-[#a73dff]/10 text-[#a73dff]',
  ai: 'border-[#a73dff]/30 bg-[#a73dff]/10 text-[#a73dff]',
};

const getTechClasses = (category: ProjectCategory) => techClasses[category];

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const primaryCategory = project.categories[0] || 'frontend';
  const config = categoryConfig[primaryCategory];
  const hasImage = project.imageUrl && project.imageUrl.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className={`group relative bg-[#111111] rounded-xl border border-[#1a1a1a] overflow-hidden hover:border-[#a73dff] transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 cursor-pointer ${config.ringClass}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity z-[1]" />

      {/* Project Image */}
      <div className="aspect-video relative overflow-hidden">
        {hasImage ? (
          <Image
            src={project.imageUrl!}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]" />
        )}
        <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} ${hasImage ? 'opacity-10 group-hover:opacity-20' : 'opacity-5 group-hover:opacity-10'} transition-opacity`} />
        {!hasImage && (
          <div className="absolute top-4 left-4 text-4xl font-bold text-neutral-800 group-hover:text-neutral-700 transition-colors">
            {String(index + 1).padStart(2, '0')}
          </div>
        )}
        {/* Category Badges */}
        <div className="absolute top-4 right-4 z-10 flex flex-wrap gap-1.5 justify-end">
          {project.categories.map((cat) => (
            <span
              key={cat}
              className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-gradient-to-r ${categoryConfig[cat].gradient} text-white shadow-lg`}
            >
              {categoryConfig[cat].icon}
              {categoryConfig[cat].label}
            </span>
          ))}
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-[2]">
          <ArrowUpRight className="w-8 h-8 text-white/80 group-hover:scale-110 transition-transform" />
        </div>
      </div>

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-[#2a2a2a] flex items-center justify-center">
            {categoryIcons[primaryCategory]}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-neutral-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-neutral-400 mb-4 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border ${getTechClasses(primaryCategory)}`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
