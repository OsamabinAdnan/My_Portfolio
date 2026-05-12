'use client';

import { motion } from 'framer-motion';
import { Code2, Bot, BrainCircuit, ArrowRight } from 'lucide-react';
import type { Service } from '@/lib/types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const icons = {
  code: Code2,
  bot: Bot,
  brain: BrainCircuit,
};

const gradients = {
  code: 'from-primary-500 to-primary-600',
  bot: 'from-accent-500 to-accent-600',
  brain: 'from-primary-500 to-accent-500',
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = icons[service.icon as keyof typeof icons] || Code2;
  const gradient = gradients[service.icon as keyof typeof gradients] || gradients.code;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white dark:bg-neutral-800/50 rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300"
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative p-8">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg shadow-primary-500/20 group-hover:shadow-xl group-hover:shadow-primary-500/30 transition-shadow`}>
          <Icon className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Learn more link */}
        <div className="flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className={`h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
    </motion.div>
  );
}