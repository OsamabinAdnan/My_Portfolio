'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { profile } from '@/lib/data/profile';
import { Avatar3D } from '@/components/ui/Avatar3D';

interface HeroSectionProps {
  isReady?: boolean;
}

const ROLES = ['AGENTIC AI DEV', 'WEB DEVELOPER', 'DIGITAL MARKETER'] as const;

type RoleIndex = 0 | 1 | 2;

export function HeroSection({ isReady = true }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState<RoleIndex>(0);

  useEffect(() => {
    if (!heroRef.current || !isReady) return;

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.hero-hello', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
      });

      gsap.from('.hero-name', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.7,
      });

      // Animate right-side titles
      gsap.from('.hero-titles', {
        y: -75,
        opacity: 0,
        duration: 1,
        delay: 0.9,
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isReady]);

  useEffect(() => {
    if (!isReady) return;

    const interval = window.setInterval(() => {
      setRoleIndex((prev) => ((prev + 1) % ROLES.length) as RoleIndex);
    }, 2400);

    return () => window.clearInterval(interval);
  }, [isReady]);

  useEffect(() => {
    if (!isReady) return;

    const activeSelector = `.role-line-${roleIndex}`;
    const othersSelector = `.role-line:not(${activeSelector})`;

    // Smooth crossfade + subtle slide
    gsap.to(othersSelector, {
      opacity: 0.26,
      y: -4,
      filter: 'blur(1.5px)',
      duration: 0.55,
      ease: 'power3.out',
      overwrite: true,
    });

    gsap.fromTo(
      activeSelector,
      { opacity: 0.35, y: 6, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.75,
        ease: 'power3.out',
        overwrite: true,
      }
    );
  }, [isReady, roleIndex]);

  useEffect(() => {
    if (!isReady) return;

    // Ensure initial state is consistent before first cycle
    gsap.set('.role-line', { y: 0 });
  }, [isReady]);


  useEffect(() => {
    if (!isReady) return;

    gsap.to('.role-aurora', {
      opacity: 0.8,
      duration: 0.9,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });
  }, [isReady]);


  const isActive = (idx: RoleIndex) => idx === roleIndex;

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center px-6 py-20 relative overflow-hidden"
    >
      {/* 3D Avatar - Fullscreen */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'auto' }}>
        <Avatar3D className="w-[100vw] h-[100vh]" />
      </div>

      {/* Purple glow behind avatar */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1600px] mx-auto w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left - Name */}
          <div className="text-center lg:text-left lg:col-span-1">
            <h2 className="hero-hello text-xl md:text-2xl lg:text-3xl text-[#a73dff] mb-2 font-bold">
              Hello! I&apos;m
            </h2>
            <h1 className="hero-name text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {profile.name.toUpperCase()}
            </h1>
          </div>

          {/* Center - Avatar space (empty for spacing) */}
          <div className="hidden lg:block"></div>

          {/* Right - Title */}
          <div className="text-center lg:text-right lg:col-span-1">
            <div className="hero-titles flex flex-col items-center lg:items-end">
              <span className="text-lg md:text-xl lg:text-2xl text-[#a73dff]/70 mb-1 font-bold">
                I&apos;m
              </span>
              <div className="relative space-y-2">
                {/* subtle "aurora" glow behind the stack */}
                <div className="role-aurora pointer-events-none absolute -inset-x-6 -inset-y-6 bg-[#a73dff]/10 blur-3xl" />

                <h2
                  className={`role-line role-line-0 text-3xl md:text-4xl lg:text-5xl font-bold transition-colors duration-300 ${
                    isActive(0)
                      ? 'text-[#a73dff] drop-shadow-[0_0_16px_rgba(167,61,255,0.35)]'
                      : 'text-white/60'
                  }`}
                >
                  {ROLES[0]}
                </h2>
                <h2
                  className={`role-line role-line-1 text-3xl md:text-4xl lg:text-5xl font-bold transition-colors duration-300 ${
                    isActive(1)
                      ? 'text-[#a73dff] drop-shadow-[0_0_16px_rgba(167,61,255,0.35)]'
                      : 'text-white/60'
                  }`}
                >
                  {ROLES[1]}
                </h2>
                <h2
                  className={`role-line role-line-2 text-3xl md:text-4xl lg:text-5xl font-bold transition-colors duration-300 ${
                    isActive(2)
                      ? 'text-[#a73dff] drop-shadow-[0_0_16px_rgba(167,61,255,0.35)]'
                      : 'text-white/60'
                  }`}
                >
                  {ROLES[2]}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
