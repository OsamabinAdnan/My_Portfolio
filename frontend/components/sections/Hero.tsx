'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Code2, Bot } from 'lucide-react';

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-100 via-transparent to-transparent dark:from-primary-900/30 dark:via-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent-100 via-transparent to-transparent dark:from-accent-900/20 dark:via-transparent" />

      {/* Animated orbs */}
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-primary-400/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-accent-400/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-200/50 dark:border-primary-700/50 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-8 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-accent-500" />
          <span>CAARE Certified</span>
          <div className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl/tight font-bold mb-6"
        >
          <span className="text-foreground">FullStack</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 dark:from-primary-400 dark:via-primary-400 dark:to-accent-400">
            Developer
          </span>
          <span className="text-foreground"> & </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 via-accent-400 to-primary-500 dark:from-accent-400 dark:via-accent-400 dark:to-primary-400">
            Agentic AI Engineer
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Building intelligent systems that code, automate, and deliver results.
          <span className="block mt-2 text-sm text-primary-600 dark:text-primary-400 font-medium">
            Certification of Agentic AI and Robotic Engineering
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary-500/25"
          >
            <Code2 className="w-5 h-5" />
            View Work
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-transparent border-2 border-neutral-300 dark:border-neutral-600 hover:border-accent-500 dark:hover:border-accent-400 text-foreground font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent-500/10"
          >
            <Bot className="w-5 h-5 text-accent-500" />
            Contact Me
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12"
        >
          {[
            { value: '5+', label: 'Years Experience' },
            { value: '30+', label: 'Projects Delivered' },
            { value: '20+', label: 'AI Agents Deployed' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 rounded-full border-2 border-neutral-400/50 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-neutral-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}