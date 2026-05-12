'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ThreeDScene } from '@/components/ui/ThreeDScene';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { HeroSection } from '@/components/sections/HeroSection';
import { About } from '@/components/ui/About';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';
import { WorkProjects } from '@/components/sections/WorkProjects';
import { TechStackBanner } from '@/components/ui/TechStackBanner';
import { TechStackTabs } from '@/components/ui/TechStackTabs';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';

gsap.registerPlugin(ScrollTrigger);


export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // GSAP and Lenis setup after loading
  useEffect(() => {
    if (!mounted || loading) return;

    // Initialize Lenis for smooth scrolling with GSAP integration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // GSAP Animations
    const ctx = gsap.context(() => {
      // Timeline scroll animation
      gsap.utils.toArray('.timeline-item').forEach((item: any, i: number) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
        });
      });

      // Tech stack items
      gsap.utils.toArray('.tech-item').forEach((item: any, i: number) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          delay: (i % 10) * 0.05,
        });
      });
    }, containerRef);

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, [mounted, loading]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <div ref={containerRef} className={`relative isolate min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden ${loading ? 'hidden' : ''}`}>
        {/* 3D Background Scene */}
        <ThreeDScene />

        <main className="pt-0 relative z-10">
          <HeroSection isReady={!loading} />

          <About />

          {/* Experience Section */}
          <ExperienceTimeline />

          {/* Work / Projects Section */}
          <WorkProjects />

          {/* NYPD Style Scrolling Banner */}
          <TechStackBanner />

          {/* Tech Stack Section with Tabs */}
          <TechStackTabs />
        </main>
      </div>
    </>
  );
}
