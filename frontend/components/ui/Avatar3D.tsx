'use client';

import { useEffect, useState } from 'react';

interface Avatar3DProps {
  className?: string;
}

export function Avatar3D({ className }: Avatar3DProps) {
  const [Spline, setSpline] = useState<any>(null);

  useEffect(() => {
    // Only import on client side
    import('@splinetool/react-spline').then((mod) => {
      setSpline(() => mod.default);
    });
  }, []);

  if (!Spline) {
    return (
      <div className={`relative ${className}`} style={{ width: '100%', height: '100%' }}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative ${className}`} 
      style={{ 
        width: '100vw', 
        height: '100vh',
        pointerEvents: 'auto',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      {/* Top lighting effect */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,240,221,0.15) 0%, transparent 70%)',
          zIndex: 1,
        }}
      />
      
      {/* Purple rim light from sides */}
      <div 
        className="absolute top-1/4 left-0 w-[300px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.1) 0%, transparent 70%)',
          zIndex: 1,
        }}
      />
      <div 
        className="absolute top-1/4 right-0 w-[300px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.1) 0%, transparent 70%)',
          zIndex: 1,
        }}
      />

      {/* Hide Spline watermark */}
      <style jsx global>{`
        [class*="watermark"],
        [data-testid="watermark"],
        .spline-watermark,
        iframe[src*="spline"] + div,
        div[class*="SplineWatermark"],
        [class*="logo"],
        [class*="Logo"] {
          display: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
          visibility: hidden !important;
        }
      `}</style>
      <Spline 
        scene="https://prod.spline.design/9OzN5Sh9TyqaOiVr/scene.splinecode"
        className="w-full h-full"
        style={{ pointerEvents: 'auto' }}
      />
    </div>
  );
}
