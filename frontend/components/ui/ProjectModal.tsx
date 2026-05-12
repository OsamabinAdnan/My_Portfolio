import { X, ExternalLink, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/lib/types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-[#111111] border border-[#a73dff] rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
        >
          {/* Close button - Desktop (top right) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/80 text-white/70 hover:text-white rounded-full backdrop-blur-md transition-all border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left/Top Area - Modern Mockups Showcase */}
          <div className="w-full lg:w-3/5 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden flex items-center justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-0 border-b lg:border-b-0 lg:border-r border-[#2a2a2a] p-8">

            {/* Ambient background glow */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="w-64 h-64 bg-[#a73dff] rounded-full blur-[100px]" />
            </div>

            {(project.mockupImageUrl || project.imageUrl) ? (
              <motion.div
                className="relative w-full max-w-3xl mx-auto h-[300px] sm:h-[400px] lg:h-[500px]"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden drop-shadow-2xl">
                  <Image
                    src={project.mockupImageUrl || project.imageUrl!}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-neutral-500">No preview available</span>
              </div>
            )}
          </div>

          {/* Right/Bottom Area - Details & Actions */}
          <div className="w-full lg:w-2/5 flex flex-col h-full max-h-[50vh] lg:max-h-[90vh]">
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto custom-scrollbar">

              {/* Category Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.categories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-block px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full bg-[#a73dff]/15 text-[#a73dff] border border-[#a73dff]/20"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#a73dff] mb-6 tracking-tight">
                {project.title}
              </h2>

              <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
                <p className="text-white leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {/* Tech stack */}
              <div className="mt-8">
                <h4 className="text-sm text-[#a73dff] uppercase tracking-widest mb-4 font-semibold">Techs</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#1a1a1a] text-neutral-300 border border-[#2a2a2a] hover:border-[#a73dff]/50 hover:text-[#a73dff] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Actions Footer */}
            <div className="p-6 sm:p-8 border-t border-[#2a2a2a] bg-[#111111] shrink-0">
              <div className="flex flex-col sm:flex-row gap-3">
                {project.deploymentUrl && project.deploymentUrl !== '#' && (
                  <a
                    href={project.deploymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-[#a73dff] text-white rounded-lg font-medium hover:bg-[#a73dff]/50 transition-all shadow-lg shadow-[#a73dff]/20 text-sm"
                  >
                    Visit Site
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <Link
                  href="/work"
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1a1a1a] text-white rounded-lg font-medium border border-[#2a2a2a] hover:border-[#a73dff] hover:bg-[#222] transition-all text-sm"
                >
                  More Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
