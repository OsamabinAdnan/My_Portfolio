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
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        {/* Modal Container - Fits within viewport on all screens */}
        <motion.div
          className="relative bg-[#111111] border border-[#a73dff] rounded-xl lg:rounded-2xl shadow-2xl flex flex-col w-full max-h-[85vh] max-w-6xl overflow-hidden mt-8 lg:mt-0"
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Fixed Header with Close Button */}
          <div className="shrink-0 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-[#111111] border-b border-[#a73dff]/30">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#a73dff] truncate pr-4">
              {project.title}
            </h2>
            <button
              onClick={onClose}
              className="shrink-0 p-2 bg-black/50 hover:bg-black/80 text-white/70 hover:text-white rounded-full transition-all border border-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="flex flex-col lg:flex-row min-h-full">
              {/* Left/Top Area - Image Showcase */}
              <div className="w-full lg:w-3/5 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] relative flex items-center justify-center min-h-[200px] sm:min-h-[240px] lg:min-h-[350px] border-b lg:border-b-0 lg:border-r border-[#2a2a2a] p-4 sm:p-5 lg:p-8">
                {/* Ambient glow */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                  <div className="w-64 h-64 bg-[#a73dff] rounded-full blur-[100px]" />
                </div>

                {(project.mockupImageUrl || project.imageUrl) ? (
                  <motion.div
                    className="relative w-full max-w-3xl mx-auto h-[180px] sm:h-[220px] lg:h-[330px]"
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
                    <span className="text-neutral-500 text-sm">No preview available</span>
                  </div>
                )}
              </div>

              {/* Right/Bottom Area - Details */}
              <div className="w-full lg:w-2/5 flex flex-col">
                <div className="p-4 sm:p-5 lg:p-8 flex-1">
                  {/* Category Badges */}
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    {project.categories.map((cat) => (
                      <span
                        key={cat}
                        className="inline-block px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full bg-[#a73dff]/15 text-[#a73dff] border border-[#a73dff]/20"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div className="prose prose-invert prose-sm max-w-none mb-4 sm:mb-6">
                    <p className="text-white text-sm sm:text-base leading-relaxed whitespace-pre-line line-clamp-2 lg:line-clamp-none">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-xs sm:text-sm text-[#a73dff] uppercase tracking-widest mb-2 sm:mb-3 font-semibold">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#1a1a1a] text-neutral-300 border border-[#2a2a2a] hover:border-[#a73dff]/50 hover:text-[#a73dff] transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Fixed Footer Actions */}
                <div className="shrink-0 p-4 sm:p-5 lg:p-8 border-t border-[#2a2a2a] bg-[#111111]">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {project.deploymentUrl && project.deploymentUrl !== '#' && (
                      <a
                        href={project.deploymentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#a73dff] text-white rounded-lg font-medium hover:bg-[#a73dff]/80 transition-all shadow-lg shadow-[#a73dff]/20 text-sm"
                      >
                        Visit Site
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <Link
                      href="/work"
                      onClick={onClose}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1a1a1a] text-white rounded-lg font-medium border border-[#2a2a2a] hover:border-[#a73dff] hover:bg-[#222] transition-all text-sm"
                    >
                      More Projects
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
