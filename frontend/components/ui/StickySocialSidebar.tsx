'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Github, Instagram, Linkedin, Twitter, Facebook, AtSign } from 'lucide-react';
import { profile } from '@/lib/data/profile';

export function StickySocialSidebar() {
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const socialLinks = useMemo(
    () =>
      profile.socials.filter((s) =>
        ['github', 'linkedin', 'twitter', 'instagram', 'facebook', 'threads'].includes(s.platform)
      ),
    []
  );

  const getIcon = (platform: string) => {
    if (platform === 'github') return <Github className="w-5 h-5" />;
    if (platform === 'linkedin') return <Linkedin className="w-5 h-5" />;
    if (platform === 'twitter') return <Twitter className="w-5 h-5" />;
    if (platform === 'instagram') return <Instagram className="w-5 h-5" />;
    if (platform === 'facebook') return <Facebook className="w-5 h-5" />;
    if (platform === 'threads') return <AtSign className="w-5 h-5" />;
    return null;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:left-0 lg:top-1/2 lg:z-[60] lg:flex lg:-translate-y-1/2">
        <div
          className={`flex items-center transition-transform duration-300 ease-out ${
            isDesktopOpen ? 'translate-x-0' : '-translate-x-[calc(100%-24px)]'
          }`}
        >
          <div className="flex items-center bg-gradient-to-r from-[#0a0a0a]/95 to-[#1a1a1a]/80 backdrop-blur-xl border border-purple-500/20 rounded-r-2xl shadow-[0_0_25px_rgba(167,61,255,0.25)]">
            <div className="px-6 py-8 flex flex-col gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 flex items-center justify-center text-[#a73dff] hover:text-white bg-[#a73dff]/10 hover:bg-[#a73dff]/25 border border-[#a73dff]/30 hover:border-[#a73dff]/60 rounded-lg transition-all duration-300 hover:scale-110"
                  aria-label={social.label || social.platform}
                  style={{
                    transitionDelay: isDesktopOpen ? `${index * 50}ms` : '0ms',
                  }}
                >
                  {getIcon(social.platform)}
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#a73dff]/90 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    {social.label || social.platform}
                  </div>
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsDesktopOpen((v) => !v)}
              className="w-11 h-16 flex items-center justify-end text-white bg-gradient-to-br from-[#a73dff] to-[#a73dff] hover:from-[#a73dff]/50 hover:to-[#a73dff]/50 border-l border-[#a73dff] rounded-r-2xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(167,61,255,0.4)]"
              aria-label={isDesktopOpen ? 'Close social sidebar' : 'Open social sidebar'}
            >
              {isDesktopOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden fixed left-0 top-1/2 z-[60] flex -translate-y-1/2">
        <div
          className={`flex items-center transition-transform duration-300 ease-out ${
            isMobileOpen ? 'translate-x-0' : '-translate-x-[calc(100%-20px)]'
          }`}
        >
          <div className="flex items-center bg-gradient-to-r from-[#0a0a0a]/95 to-[#1a1a1a]/80 backdrop-blur-xl border border-purple-500/20 rounded-r-xl shadow-[0_0_25px_rgba(167,61,255,0.25)]">
            <div className="px-4 py-6 flex flex-col gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center text-[#a73dff] hover:text-white bg-[#a73dff]/10 hover:bg-[#a73dff]/25 border border-[#a73dff]/30 hover:border-[#a73dff]/60 rounded-lg transition-all duration-300 hover:scale-110"
                  aria-label={social.label || social.platform}
                >
                  {getIcon(social.platform)}
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsMobileOpen((v) => !v)}
              className="w-11 h-14 flex items-center justify-end text-white bg-gradient-to-br from-[#a73dff] to-[#a73dff] hover:from-[#a73dff]/50 hover:to-[#a73dff]/50 border-l border-[#a73dff]/50 rounded-r-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(167,61,255,0.4)]"
              aria-label={isMobileOpen ? 'Close social sidebar' : 'Open social sidebar'}
            >
              {isMobileOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
