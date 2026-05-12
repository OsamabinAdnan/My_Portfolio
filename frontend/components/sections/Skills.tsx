'use client';

import { motion } from 'framer-motion';
import { Code2, Bot } from 'lucide-react';
import { fullstackSkills, aiSkills } from '@/lib/data/skills';

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-neutral-50/50 dark:bg-neutral-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400">Expertise</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            A unique combination of traditional FullStack development and cutting-edge Agentic AI expertise
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* FullStack Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group"
          >
            <div className="relative bg-white dark:bg-neutral-800/50 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
                  <Code2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">FullStack Development</h3>
                  <p className="text-sm text-muted-foreground">Modern web technologies</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {fullstackSkills.map((skill, index) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-700/50 text-sm font-medium text-foreground hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300 transition-colors cursor-default"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Agentic AI Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group"
          >
            <div className="relative bg-white dark:bg-neutral-800/50 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700 hover:border-accent-300 dark:hover:border-accent-500 transition-all duration-300">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shadow-lg shadow-accent-500/20">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Agentic AI</h3>
                  <p className="text-sm text-muted-foreground">Autonomous AI systems</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {aiSkills.map((skill, index) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-700/50 text-sm font-medium text-foreground hover:bg-accent-100 dark:hover:bg-accent-900/30 hover:text-accent-700 dark:hover:text-accent-300 transition-colors cursor-default"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}