'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '@/lib/data/profile';
import { Brain, Code, Rocket, Users } from 'lucide-react';
import { SplineAvatar } from '@/components/ui/SplineAvatar';

const statsIcons = [Brain, Code, Rocket, Users];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="about-intro" ref={containerRef} className="py-24 px-6 lg:px-12 xl:px-16 relative z-10 bg-[#0a0a0a]">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-purple-900/10 pointer-events-none" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              scale: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -200 - 100],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity, 
              delay: Math.random() * 2 
            }}
          />
        ))}
      </div>

      <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#a73dff] to-transparent" />
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              ABOUT <span className="text-[#a73dff]">ME</span>
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#a73dff] to-transparent" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
          {/* Left - About Text */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              className="text-lg md:text-xl text-white leading-relaxed mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {profile.about}
            </motion.p>
            
            {/* Animated Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {profile.stats.map((stat, index) => {
                const Icon = statsIcons[index % statsIcons.length];
                return (
                  <motion.div
                    key={index}
                    className="text-center sm:text-left group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <motion.div
                      className="inline-block mb-2 text-[#a73dff] group-hover:text-[#a73dff]/80 transition-colors"
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-6 h-6 md:w-8 md:h-8 mx-auto sm:mx-0 lg:mx-0" />
                    </motion.div>
                    <motion.div
                      className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a73dff] to-purple-600 mb-1"
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + 0.1 * index }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs md:text-sm text-neutral-500">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right - 3D Spline Avatar - Desktop */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 80, rotateY: -30 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ y }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-purple-400/20 to-transparent rounded-3xl blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Spline 3D Avatar - Desktop */}
            <div className="relative w-full h-[600px] xl:h-[700px]">
              <SplineAvatar className="absolute right-0 top-[-20%] lg:top-0 lg:right-[-12%] xl:right-[-18%] 2xl:right-[-24%]" />
            </div>
          </motion.div>

          {/* Spline Avatar - Mobile (simplified) */}
          <motion.div
            className="relative lg:hidden block h-[400px] mt-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-full h-full">
              <SplineAvatar className="w-full h-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
