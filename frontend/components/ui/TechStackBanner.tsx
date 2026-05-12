'use client';

import { techStack } from '@/lib/data/techStack';

export function TechStackBanner() {
  const frontendTechs = techStack.filter(t => t.category === 'frontend').map(s => s.name);
  const backendTechs = techStack.filter(t => t.category === 'backend').map(s => s.name);

  return (
    <div className="relative z-10 py-8 sm:py-12 md:py-16 lg:py-24 bg-[#0a0a0a] overflow-hidden">
      {/* Frontend Banner (Top) - z-20 to be on top */}
      <div className="relative z-20 w-[110vw] sm:w-[115vw] md:w-[120vw] transform -rotate-1 sm:-rotate-2 md:-rotate-3 lg:-rotate-5 -translate-x-[3%] sm:-translate-x-[4%] md:-translate-x-[5%] -translate-y-1 sm:-translate-y-2 md:-translate-y-3 lg:-translate-y-4 px-2 sm:px-4 md:px-6 lg:px-8" style={{ backfaceVisibility: 'visible', perspective: '1000px' }}>
        <div
          className="relative bg-[#111111] border-y border-[#a73dff]/40 sm:border-[#a73dff]/45 md:border-[#a73dff]/50 py-2 sm:py-3 md:py-4 lg:py-5 shadow-[0_0_15px_rgba(167,61,255,0.3),inset_0_0_10px_rgba(167,61,255,0.08)] sm:shadow-[0_0_20px_rgba(167,61,255,0.4),inset_0_0_15px_rgba(167,61,255,0.1)] md:shadow-[0_0_30px_rgba(167,61,255,0.45),inset_0_0_18px_rgba(167,61,255,0.12)] lg:shadow-[0_0_40px_rgba(167,61,255,0.5),inset_0_0_20px_rgba(167,61,255,0.15)] backdrop-blur-md"
          style={{ backfaceVisibility: 'visible', perspective: '1000px' }}
        >
          <div className="flex animate-scroll-left whitespace-nowrap">
            {/* First copy */}
            {frontendTechs.map((tech, index) => (
              <div key={`f1-${tech}-${index}`} className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-1.5 sm:px-2 md:px-3 lg:px-4 shrink-0">
                <span
                  className={`font-black text-base sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl uppercase tracking-tight sm:tracking-normal md:tracking-wide lg:tracking-wider ${
                    index % 2 === 0
                      ? 'text-white'
                      : 'text-transparent stroke-text'
                  }`}
                >
                  {tech}
                </span>
                <span className="text-[#a73dff] text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl drop-shadow-[0_0_4px_rgba(167,61,255,0.7)] sm:drop-shadow-[0_0_6px_rgba(167,61,255,0.8)] md:drop-shadow-[0_0_8px_rgba(167,61,255,0.8)]">✦</span>
              </div>
            ))}
            {/* Duplicate copy */}
            {frontendTechs.map((tech, index) => (
              <div key={`f2-${tech}-${index}`} className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-1.5 sm:px-2 md:px-3 lg:px-4 shrink-0">
                <span
                  className={`font-black text-base sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl uppercase tracking-tight sm:tracking-normal md:tracking-wide lg:tracking-wider ${
                    index % 2 === 0
                      ? 'text-white'
                      : 'text-transparent stroke-text'
                  }`}
                >
                  {tech}
                </span>
                <span className="text-[#a73dff] text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl drop-shadow-[0_0_4px_rgba(167,61,255,0.7)] sm:drop-shadow-[0_0_6px_rgba(167,61,255,0.8)] md:drop-shadow-[0_0_8px_rgba(167,61,255,0.8)]">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Backend Banner (Bottom) - z-10 to be behind */}
      <div className="relative z-10 w-[110vw] sm:w-[115vw] md:w-[120vw] transform rotate-1 sm:rotate-2 md:rotate-3 lg:rotate-5 -translate-x-[3%] sm:-translate-x-[4%] md:-translate-x-[5%] -mt-4 sm:-mt-6 md:-mt-10 lg:-mt-16 px-2 sm:px-4 md:px-6 lg:px-8" style={{ backfaceVisibility: 'visible', perspective: '1000px' }}>
        <div
          className="relative bg-[#111111] border-y border-[#a73dff]/40 sm:border-[#a73dff]/45 md:border-[#a73dff]/50 py-2 sm:py-3 md:py-4 lg:py-5 shadow-[0_0_15px_rgba(167,61,255,0.3),inset_0_0_10px_rgba(167,61,255,0.08)] sm:shadow-[0_0_20px_rgba(167,61,255,0.4),inset_0_0_15px_rgba(167,61,255,0.1)] md:shadow-[0_0_30px_rgba(167,61,255,0.45),inset_0_0_18px_rgba(167,61,255,0.12)] lg:shadow-[0_0_40px_rgba(167,61,255,0.5),inset_0_0_20px_rgba(167,61,255,0.15)] backdrop-blur-md"
          style={{ backfaceVisibility: 'visible', perspective: '1000px' }}
        >
          <div className="flex animate-scroll-right whitespace-nowrap">
            {/* First copy */}
            {backendTechs.map((tech, index) => (
              <div key={`b1-${tech}-${index}`} className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-1.5 sm:px-2 md:px-3 lg:px-4 shrink-0">
                <span
                  className={`font-black text-base sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl uppercase tracking-tight sm:tracking-normal md:tracking-wide lg:tracking-wider ${
                    index % 2 === 0
                      ? 'text-white'
                      : 'text-transparent stroke-text'
                  }`}
                >
                  {tech}
                </span>
                <span className="text-[#a73dff] text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl drop-shadow-[0_0_4px_rgba(167,61,255,0.7)] sm:drop-shadow-[0_0_6px_rgba(167,61,255,0.8)] md:drop-shadow-[0_0_8px_rgba(167,61,255,0.8)]">✦</span>
              </div>
            ))}
            {/* Duplicate copy */}
            {backendTechs.map((tech, index) => (
              <div key={`b2-${tech}-${index}`} className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-1.5 sm:px-2 md:px-3 lg:px-4 shrink-0">
                <span
                  className={`font-black text-base sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl uppercase tracking-tight sm:tracking-normal md:tracking-wide lg:tracking-wider ${
                    index % 2 === 0
                      ? 'text-white'
                      : 'text-transparent stroke-text'
                  }`}
                >
                  {tech}
                </span>
                <span className="text-[#a73dff] text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl drop-shadow-[0_0_4px_rgba(167,61,255,0.7)] sm:drop-shadow-[0_0_6px_rgba(167,61,255,0.8)] md:drop-shadow-[0_0_8px_rgba(167,61,255,0.8)]">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
