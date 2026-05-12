'use client';

import { motion } from 'framer-motion';
import { ExperienceBackground } from '@/components/ui/ExperienceBackground';
import { experiences } from '@/lib/data/experience';

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 px-6 relative bg-[#0a0a0a]">
      {/* Three.js Cyber Particle Background */}
      <ExperienceBackground />
      
      {/* Purple gradient overlay - matching About section */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#a73dff]/10 via-transparent to-[#a73dff]/10 pointer-events-none z-[1]" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#a73dff] to-transparent" />
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            CAREER <span className="text-[#a73dff]">&</span> EXPERIENCE
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#a73dff] to-transparent" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#a73dff]/50 via-[#a73dff]/20 to-transparent" />

          {/* Timeline items */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative group">
                <div className="flex flex-col md:flex-row gap-6 md:gap-0">
                  {/* Year column */}
                  <div className="md:w-1/2 md:pr-16 md:text-right pl-8 md:pl-0">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="inline-flex items-center gap-3 px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full group-hover:border-[#a73dff]/50 transition-colors"
                    >
                      <span className="text-lg font-bold text-[#a73dff]">{exp.year}</span>
                    </motion.div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-8 w-3 h-3 bg-[#a73dff] rounded-full -translate-x-1.5 md:-translate-x-1.5 border-4 border-[#0a0a0a] group-hover:scale-150 group-hover:bg-[#a73dff] transition-all duration-300 z-10" />
                  <div className="absolute left-0 md:left-1/2 top-8 w-3 h-3 bg-[#a73dff]/30 rounded-full -translate-x-1.5 md:-translate-x-1.5 blur-sm group-hover:scale-200 transition-all duration-500 z-0" />

                  {/* Content card */}
                  <div className="md:w-1/2 md:pl-16 pl-8">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.15 }}
                      className="relative p-6 bg-[#111111] border border-[#1a1a1a] rounded-xl group-hover:border-purple-500/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/5"
                    >
                      {/* Accent line */}
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#a73dff] to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#a73dff] transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-medium text-[#a73dff]/70 mb-3">
                        {exp.company}
                      </p>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {exp.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
