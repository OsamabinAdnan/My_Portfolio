'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getTechStackByCategory } from '@/lib/data/techStack';
import type { TechStackCategory, TechStackItem } from '@/lib/types';
import { CelestialOrrery } from './CelestialOrrery';

type ActiveTab = 'all' | TechStackCategory;

const tabs: { key: ActiveTab; label: string }[] = [
  { key: 'all', label: 'ALL' },
  { key: 'frontend', label: 'FRONTEND' },
  { key: 'backend', label: 'BACKEND' },
  { key: 'devops', label: 'DEV-OPS' },
  { key: 'digital-marketing', label: 'DIGITAL MARKETING' },
  { key: 'ai', label: 'AI' },
  { key: 'others', label: 'OTHERS' },
];

const tabColors: Record<ActiveTab, { bg: string; border: string }> = {
  all: { bg: 'bg-[#a73dff]', border: 'border-[#a73dff]' },
  frontend: { bg: 'bg-[#a73dff]', border: 'border-[#a73dff]' },
  backend: { bg: 'bg-[#a73dff]', border: 'border-[#a73dff]' },
  devops: { bg: 'bg-[#a73dff]', border: 'border-[#a73dff]' },
  'digital-marketing': { bg: 'bg-[#a73dff]', border: 'border-[#a73dff]' },
  ai: { bg: 'bg-[#a73dff]', border: 'border-[#a73dff]' },
  others: { bg: 'bg-[#a73dff]', border: 'border-[#a73dff]' },
};

export function TechStackTabs() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');

  const filteredTechStack = getTechStackByCategory(activeTab);
  const colors = tabColors[activeTab];

  return (
    <section className="py-24 px-5 sm:px-7 md:px-8 lg:px-12 xl:px-16 relative bg-[#0a0a0a] min-h-[900px] md:min-h-[980px]">
      {/* Celestial Orrery Background */}
      <CelestialOrrery />

      <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#a73dff] to-transparent" />
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            TECH<span className="text-[#a73dff]">/</span>STACK
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#a73dff] to-transparent" />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                activeTab === tab.key
                  ? 'text-white'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {activeTab === tab.key && (
                <motion.div
                  layoutId="activeTechTab"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className={`absolute inset-0 ${colors.bg} ${colors.border} border rounded-full`}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tech Stack Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6"
        >
          {filteredTechStack.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredTechStack.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-400 text-lg">No technologies found in this category.</p>
          </div>
        )}

      </div>
    </section>
  );
}

interface TechCardProps {
  tech: TechStackItem;
  index: number;
}

function TechCard({ tech, index }: TechCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="group relative flex flex-col items-center gap-3 p-5 bg-linear-to-b from-[#111111] to-[#0f0f0f] border border-[#a73dff]/30 rounded-xl hover:border-[#a73dff] transition-all duration-300 hover:scale-105"
    >
      {/* Tech Logo */}
      <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#a73dff]/25 to-[#a73dff]/15 flex items-center justify-center border border-[#a73dff]/30 group-hover:border-[#a73dff]/60 group-hover:shadow-[0_0_25px_rgba(167,61,255,0.7)] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 overflow-hidden">
        {tech.logo ? (
          <Image
            src={tech.logo}
            alt={tech.name}
            width={48}
            height={48}
            className="w-12 h-12 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        ) : (
          <span className="text-2xl font-bold text-purple-400">{tech.name.charAt(0)}</span>
        )}
      </div>
      <span className="text-sm text-neutral-300 group-hover:text-white font-medium transition-colors text-center">
        {tech.name}
      </span>
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#a73dff]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
