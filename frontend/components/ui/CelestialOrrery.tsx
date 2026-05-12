'use client';

import React from 'react';

export const CelestialOrrery = () => {
  return (
    <main className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none z-0">
      <div className="glyph-field">
        <div className="glyph-container glyph-1">
          <div className="glyph-part part-1"></div>
          <div className="glyph-part part-2"></div>
          <div className="glyph-part part-3"></div>
        </div>
        <div className="glyph-container glyph-2">
          <div className="glyph-part part-1"></div>
          <div className="glyph-part part-2"></div>
        </div>
        <div className="glyph-container glyph-3">
          <div className="glyph-part part-1"></div>
          <div className="glyph-part part-2"></div>
          <div className="glyph-part part-3"></div>
        </div>
      </div>

      <div className="orrery-field">
        <div className="orbit orbit-1">
          <div className="planet"></div>
        </div>
        <div className="orbit orbit-2">
          <div className="planet"></div>
        </div>
        <div className="orbit orbit-3">
          <div className="planet"></div>
        </div>
        <div className="orbit orbit-4">
          <div className="planet"></div>
        </div>
      </div>
    </main>
  );
};

