'use client';

import { useState, useEffect } from 'react';
import { profile } from '@/lib/data/profile';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Handle iframe visibility and body scroll lock
  useEffect(() => {
    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      // Add class to hide all iframes (Spline/3D content)
      document.documentElement.classList.add('menu-open');
    } else {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('menu-open');
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('menu-open');
    };
  }, [isOpen]);

  const navItems = [
    { href: '#about-intro', label: 'ABOUT' },
    { href: '#experience', label: 'EXPERIENCE' },
    { href: '#work', label: 'WORK' },
    { href: '#contact', label: 'CONTACT' },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex items-center justify-center w-10 h-10 text-white hover:text-purple-400 transition-colors"
        aria-label="Toggle menu"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.div>
      </button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop - Solid black */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black"
              style={{ zIndex: 9998 }}
            />

            {/* Menu Panel - Solid #0a0a0a background */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[300px] bg-[#0a0a0a] border-l border-[#1a1a1a]"
              style={{ zIndex: 9999 }}
            >
              <div className="h-full flex flex-col">
                {/* Header - 60px to match main navbar */}
                <div className="flex items-center justify-between px-6 h-[60px] border-b border-[#1a1a1a]">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-white font-bold text-lg"
                  >
                    MENU
                  </motion.span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-purple-400 transition-colors p-1"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col p-6 gap-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.08 }}
                      className="flex items-center py-3 px-4 text-base font-semibold text-white bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:text-purple-400 hover:border-purple-500/50 transition-all"
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>

                {/* Email - Mobile Only */}
                <div className="px-6 pb-4">
                  <a
                    href={`mailto:${profile.socials.find(s => s.platform === 'email')?.url.replace('mailto:', '') || 'imosamabinadnan@gmail.com'}`}
                    className="block w-full py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white hover:text-purple-400 hover:border-purple-500/50 transition-all text-center"
                  >
                    {profile.socials.find(s => s.platform === 'email')?.label || 'imosamabinadnan@gmail.com'}
                  </a>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Resume Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="px-6 pb-6"
                >
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-button-fill w-full justify-center"
                  >
                    <FileText className="w-4 h-4" />
                    <span>RESUME</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
