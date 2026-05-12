'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { projects } from '@/lib/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ProjectTabs } from '@/components/ui/ProjectTabs';
import { ProjectModal } from '@/components/ui/ProjectModal';
import type { Project, ProjectCategory } from '@/lib/types';

export default function WorkPage() {
  const [activeTab, setActiveTab] = useState<ProjectCategory | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeTab === 'all'
    ? projects
    : projects.filter((p) => p.categories.includes(activeTab));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#1a1a1a]">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-white hover:text-[#a73dff] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-5xl uppercase font-bold text-white">Projects</h1>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-[1600px] mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase">
              All <span className="text-[#a73dff]">My</span> Works
            </h2>
            <p className="text-neutral-400 max-w-2xl">
              Explore all of my projects, from frontend interfaces to fullstack applications and AI-integrated systems.
            </p>
          </div>

          {/* Tabs */}
          <ProjectTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Project Count */}
          <p className="text-sm text-neutral-500 mb-8">
            Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}
            {activeTab !== 'all' && ` in ${tabs.find(t => t.key === activeTab)?.label}`}
          </p>

          {/* Project Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-neutral-500 text-lg">No projects found in this category yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const tabs: { key: ProjectCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'ALL' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'fullstack', label: 'FullStack' },
  { key: 'ai', label: 'AI Integrated' },
];
