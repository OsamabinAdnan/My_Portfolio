'use client';

import { motion } from 'framer-motion';
import { profile } from '@/lib/data/profile';
import { StatCounter } from '@/components/ui/StatCounter';

export function About() {
  return (
    <section id="about" className="py-24 px-6 bg-neutral-50 dark:bg-neutral-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know the developer behind the code
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-500/10 rounded-full blur-2xl" />

              <div className="relative bg-white dark:bg-neutral-800/50 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700 backdrop-blur-sm">
                <p className="text-lg text-foreground leading-relaxed mb-6">
                  {profile.about}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I specialize in building modern web applications with cutting-edge technologies
                  and creating autonomous AI agents that streamline workflows and deliver real business value.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {profile.stats.map((stat, index) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                label={stat.label}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}