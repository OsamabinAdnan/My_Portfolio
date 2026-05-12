'use client';

import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';

interface LoadingScreenProps {
  onComplete: () => void;
}

const CODE_LINES = [
  "import { Agent } from '@/core/agent'",
  "const smoke = createFluidField('#a73dff')",
  "await agent.initialize({ mode: 'creative' })",
  "render(scene, { accent: '#a73dff' })",
  'status: boot sequence complete',
];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Fluid/smoke-like purple particle field
    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 12;
      positions[i3 + 1] = (Math.random() - 0.5) * 7;
      positions[i3 + 2] = (Math.random() - 0.5) * 5;
      scales[i] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#a73dff') },
      },
      vertexShader: `
        uniform float uTime;
        attribute float aScale;
        varying float vAlpha;

        void main() {
          vec3 p = position;
          float t = uTime * 0.18;

          p.x += sin(t + p.y * 0.8 + aScale * 6.2831) * 0.55;
          p.y += cos(t * 1.2 + p.x * 0.9 + aScale * 6.2831) * 0.45;
          p.z += sin(t * 0.9 + p.x * 0.5) * 0.3;

          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = (5.0 + aScale * 8.0) * (8.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;

          vAlpha = 0.2 + aScale * 0.8;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;

        void main() {
          vec2 c = gl_PointCoord - vec2(0.5);
          float d = length(c);
          if (d > 0.5) discard;

          float edge = smoothstep(0.5, 0.0, d);
          float alpha = edge * vAlpha * 0.28;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const smoke = new THREE.Points(geometry, material);
    scene.add(smoke);

    // Progress simulation
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 11 + 2;

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
        setTimeout(() => setShowWelcome(true), 280);
        setTimeout(onComplete, 1500);
      }

      setProgress(Math.floor(currentProgress));
    }, 110);

    let startTime = performance.now();
    let animationId = 0;

    const animate = () => {
      const elapsedTime = (performance.now() - startTime) / 1000;
      material.uniforms.uTime.value = elapsedTime;
      smoke.rotation.y = elapsedTime * 0.06;
      smoke.rotation.x = Math.sin(elapsedTime * 0.25) * 0.08;

      camera.position.x = Math.sin(elapsedTime * 0.2) * 0.18;
      camera.position.y = Math.cos(elapsedTime * 0.17) * 0.12;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(progressInterval);
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [mounted, onComplete]);


  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0a] z-[100] flex items-center justify-center">
        <div className="text-white text-xl font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] z-[100] overflow-hidden">
      {/* Three.js canvas container */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Loading bar container */}
        <div className="relative z-10 w-full max-w-md mx-auto px-6">
          {/* Logo or title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Booting System
            </h2>
            <p className="text-[#a73dff]/80 text-sm font-mono">Initializing...</p>
          </div>

          {/* Loading bar */}
          <div className="relative w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#a73dff]/20">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#a73dff] to-[#c99bff] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#a73dff] blur-sm opacity-50" />
            </div>
          </div>

          {/* Progress percentage */}
          <div className="text-center mt-4">
            <span className="text-[#a73dff] text-lg font-mono font-semibold">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Welcome overlay */}
      {showWelcome && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-sm">
          <h1 className="text-5xl md:text-7xl font-bold text-white animate-fade-in">
            Welcome
          </h1>
        </div>
      )}
    </div>
  );
}
