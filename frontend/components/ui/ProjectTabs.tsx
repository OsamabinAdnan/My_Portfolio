'use client';

import { motion } from 'framer-motion';
import type { ProjectCategory } from '@/lib/types';

interface ProjectTabsProps {
  activeTab: ProjectCategory | 'all';
  onTabChange: (tab: ProjectCategory | 'all') => void;
}

const tabs: { key: ProjectCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'ALL' },
  { key: 'frontend', label: 'FRONTEND' },
  { key: 'fullstack', label: 'FULLSTACK' },
  { key: 'ai', label: 'AI INTEGRATED' },
];

const tabColors: Record<ProjectCategory | 'all', { bg: string; border: string }> = {
  all: { bg: 'bg-[#a73dff]', border: 'border-[#a73dff]' },
  frontend: { bg: 'bg-[#a73dff]', border: 'border-[#a73dff]' },
  fullstack: { bg: 'bg-[#a73dff]', border: 'border-[#a73dff]' },
  ai: { bg: 'bg-[#a73dff]', border: 'border-[#a73dff]' },
};

export function ProjectTabs({ activeTab, onTabChange }: ProjectTabsProps) {
  const colors = tabColors[activeTab];

  return (
    <div className="flex flex-wrap gap-3 mb-12">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
            activeTab === tab.key
              ? 'text-white'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          {activeTab === tab.key && (
            <motion.div
              layoutId="activeTab"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`absolute inset-0 ${colors.bg} ${colors.border} border rounded-full`}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
