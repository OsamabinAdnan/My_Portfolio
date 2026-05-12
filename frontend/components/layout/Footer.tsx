'use client';

import { useEffect, useRef } from 'react';
import { Mail, MapPin, Heart, Github, Linkedin, Twitter, Instagram, Facebook, AtSign } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '@/lib/data/profile';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate footer elements on scroll
      gsap.from('.footer-name', {
        scrollTrigger: {
          trigger: '.footer-name',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.footer-col', {
        scrollTrigger: {
          trigger: '.footer-col',
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      });

      gsap.from('.footer-bottom', {
        scrollTrigger: {
          trigger: '.footer-bottom',
          start: 'top 90%',
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = profile.socials.filter((s) => s.platform !== 'email') as Array<{
    platform: string;
    url: string;
    label: string;
  }>;

  return (
    <section
      id="contact"
      ref={footerRef}
      className="relative py-20 px-6 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#a73dff]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#a73dff]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Top border with gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#a73dff] to-transparent mb-16" />

        {/* Large animated name */}
        <div className="footer-name mb-16">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight relative inline-block group">
            {profile.name.toUpperCase()}
            <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-[#a73dff] to-purple-600 group-hover:w-full transition-all duration-700 ease-out" />
          </h2>
        </div>

        {/* 3 columns grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
          {/* Left column - Contact Info */}
          <div className="footer-col space-y-8">
            <div className="group">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-5 h-5 text-[#a73dff]" />
                <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Email</h4>
              </div>
              <a
                href={`mailto:${profile.socials.find(s => s.platform === 'email')?.url.replace('mailto:', '') || 'imosamabinadnan@gmail.com'}`}
                className="text-white text-lg hover:text-[#a73dff] transition-colors duration-300 block relative w-fit"
              >
                {profile.socials.find(s => s.platform === 'email')?.label || 'imosamabinadnan@gmail.com'}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#a73dff] group-hover:w-full transition-all duration-300" />
              </a>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-[#a73dff]" />
                <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Location</h4>
              </div>
              <p className="text-white text-lg">Pakistan</p>
            </div>
          </div>

          {/* Center column - Social Icons */}
          <div className="footer-col">
            <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-6">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label || social.platform}
                  title={social.label || social.platform}
                  className="group relative w-12 h-12 flex items-center justify-center text-[#a73dff] hover:text-white bg-[#a73dff]/10 hover:bg-[#a73dff]/25 border border-[#a73dff]/30 hover:border-[#a73dff]/60 rounded-lg transition-all duration-300 hover:scale-110"
                >
                  {social.platform === 'github' && <Github className="w-5 h-5" />}
                  {social.platform === 'linkedin' && <Linkedin className="w-5 h-5" />}
                  {social.platform === 'twitter' && <Twitter className="w-5 h-5" />}
                  {social.platform === 'instagram' && <Instagram className="w-5 h-5" />}
                  {social.platform === 'facebook' && <Facebook className="w-5 h-5" />}
                  {social.platform === 'threads' && <AtSign className="w-5 h-5" />}

                  {/* Hover tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#a73dff]/90 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {social.label || social.platform}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right column - About */}
          <div className="footer-col md:text-right space-y-6">
            <div className="flex md:justify-end">
              <Link href="/work" className="swipe-button">
                <span>Explore All Work</span>
              </Link>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">Crafted With</h4>
              <p className="text-white text-base leading-relaxed">
                Designed and Developed<br />
                with <Heart className="inline w-4 h-4 text-[#a73dff] fill-[#a73dff] animate-pulse" /> by{' '}
                <span className="text-[#a73dff] font-semibold">{profile.name}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="footer-bottom border-t border-[#1a1a1a] pt-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <p className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
