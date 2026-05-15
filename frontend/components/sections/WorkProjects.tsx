'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FolderOpen, ArrowRight } from 'lucide-react';
import { projects } from '@/lib/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { ProjectTabs } from '@/components/ui/ProjectTabs';
import type { Project, ProjectCategory } from '@/lib/types';

const HOMEPAGE_LIMIT = 6;

export function WorkProjects() {
  const [activeTab, setActiveTab] = useState<ProjectCategory | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeTab === 'all'
    ? projects
    : projects.filter((p) => p.categories.includes(activeTab));

  const displayProjects = filtered.slice(0, HOMEPAGE_LIMIT);

  return (
    <>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    <section id="work" className="py-24 px-6 lg:px-12 xl:px-16 relative z-10 bg-[#0a0a0a]">
      <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#a73dff] to-transparent" />
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            WORK<span className="text-[#a73dff]">/</span>PROJECTS
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#a73dff] to-transparent" />
        </div>

        {/* Tabs */}
        <ProjectTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Project Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {displayProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Explore All Button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/work"
            className="swipe-button"
          >
            <FolderOpen className="w-5 h-5" />
            <span>Explore All Works</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
    </>
  );
}
