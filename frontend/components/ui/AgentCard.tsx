'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Cpu, BrainCircuit, Zap } from 'lucide-react';
import type { AIAgent } from '@/lib/types';

interface AgentCardProps {
  agent: AIAgent;
  index: number;
}

export function AgentCard({ agent, index }: AgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl border border-neutral-700/50 hover:border-accent-500/50 transition-all duration-300 overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 via-transparent to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />

      {/* Glowing orb */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-500/20 rounded-full blur-3xl group-hover:bg-accent-500/30 transition-colors" />

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center shadow-lg shadow-accent-500/25 group-hover:shadow-accent-500/40 transition-shadow">
            <BrainCircuit className="w-7 h-7 text-white" />
          </div>
          {agent.demoUrl && agent.demoUrl !== '#' && (
            <a
              href={agent.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-accent-400 hover:text-accent-300 hover:bg-accent-500/10 rounded-lg transition-all"
            >
              <Zap className="w-4 h-4" />
              Demo
            </a>
          )}
        </div>

        {/* Name & Purpose */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-400 transition-colors">
          {agent.name}
        </h3>
        <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
          {agent.purpose}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {agent.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800/80 border border-neutral-700 text-neutral-300 group-hover:border-accent-500/30 group-hover:text-accent-300 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Architecture */}
        <div className="p-4 rounded-xl bg-neutral-800/50 border border-neutral-700/50 group-hover:border-accent-500/20 transition-colors">
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-accent-500" />
            <span className="text-accent-400">Architecture</span>
          </h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {agent.architecture}
          </p>
        </div>
      </div>
    </motion.div>
  );
}