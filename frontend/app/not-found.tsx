"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const glitchRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!glitchRef.current) return;

    const ctx = gsap.context(() => {
      // Glitch animation for 404
      gsap.to(".glitch-text", {
        textShadow:
          "2px 2px #a73dff, -2px -2px #00ffff",
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.5,
      });

      // Floating animation
      gsap.to(".float-element", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, glitchRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#a73dff]/10 via-black to-black" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(167,61,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(167,61,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Content */}
      <div ref={glitchRef} className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* 404 Text */}
          <div className="float-element">
            <h1 className="glitch-text text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#a73dff] to-[#8b2fd9] leading-none">
              404
            </h1>
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Page Not Found
            </h2>
            <p className="text-lg text-white/60 max-w-md mx-auto">
              Oops! The page you're looking for seems to have wandered off into the digital void.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#a73dff] to-[#8b2fd9] text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-[#a73dff]/30 hover:scale-105"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group flex items-center gap-2 px-8 py-4 border border-[#a73dff]/30 text-white font-semibold rounded-lg transition-all hover:bg-[#a73dff]/10 hover:border-[#a73dff]/60 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a73dff]/5 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </div>
  );
}
