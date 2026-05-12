'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Featured <span className="text-primary-600 dark:text-primary-400">Projects</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            A selection of my recent work, ranging from FullStack applications to autonomous AI agents
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}