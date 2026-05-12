'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { FileText } from 'lucide-react';
import { profile } from '@/lib/data/profile';
import { MobileMenu } from '@/components/ui/MobileMenu';
import { HoverLink } from '@/components/ui/HoverLink';

export function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Simulate a small delay to ensure DOM is ready, then trigger animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 5000); // 3 second delay to ensure DOM is fully mounted

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const ctx = gsap.context(() => {
      // Header content slide down
      gsap.from('.header-content', {
        y: -50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      });

      // Nav items staggered
      gsap.from('.nav-item', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.3,
      });

      // Resume button
      gsap.from('.resume-btn', {
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
      });
    }, headerRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#1a1a1a]">
      <div className="max-w-[1600px] mx-auto px-6 py-4">
        <div className="header-content flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group relative">
            <div className="flex items-center">
              <span className="font-orbitron font-black text-2xl lg:text-3xl tracking-wider transition-all duration-300">
                <span className="text-white">OSAMABINADNAN</span><span className="text-[#a73dff]">.</span>
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#a73dff] group-hover:w-full transition-all duration-300"></div>
            </div>
          </Link>

          {/* Email - Desktop Only */}
          <a
            href={`mailto:${profile.socials.find(s => s.platform === 'email')?.url.replace('mailto:', '') || 'imosamabinadnan@gmail.com'}`}
            className="!hidden lg:!block hover-link text-white text-sm"
          >
            <span className="hover-in">
              <span>{profile.socials.find(s => s.platform === 'email')?.label || 'imosamabinadnan@gmail.com'}</span>
              <div>Get In Touch</div>
            </span>
          </a>

          {/* Navigation - Desktop Only */}
          <nav className="hidden lg:flex items-center gap-8">
            <div className="nav-item">
              <HoverLink href="#about-intro" text="ABOUT" />
            </div>
            <div className="nav-item">
              <HoverLink href="#experience" text="EXPERIENCE" />
            </div>
            <div className="nav-item">
              <HoverLink href="#work" text="WORK" />
            </div>
            <div className="nav-item">
              <HoverLink href="#contact" text="CONTACT" />
            </div>
          </nav>

          {/* Resume & Mobile Menu */}
          <div className="hidden lg:flex items-center">
            <a
              href="/OsamabinAdnan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-btn resume-button-fill"
            >
              <FileText className="w-4 h-4" />
              <span>RESUME</span>
            </a>
          </div>
            
          <div>

            {/* Mobile Menu Button */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
