'use client';

import { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

interface SplineAvatarProps {
  className?: string;
}

export function SplineAvatar({ className }: SplineAvatarProps) {
  const [SplineComponent, setSplineComponent] = useState<any>(null);

  useEffect(() => {
    // Only import on client side
    import('@splinetool/react-spline').then((mod) => {
      setSplineComponent(() => mod.default);
    });
  }, []);

  if (!SplineComponent) {
    return (
      <div className={`relative ${className}`} style={{ width: '100%', height: '100%' }}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <SplineComponent
      className={className}
      scene="https://prod.spline.design/Hr547szMcoHidkSB/scene.splinecode"
    />
  );
}
