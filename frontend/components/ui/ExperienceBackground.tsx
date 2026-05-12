'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ExperienceBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let animationId: number;
    let isRunning = true;

    const init = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (width === 0 || height === 0) {
        if (isRunning) requestAnimationFrame(init);
        return;
      }

      // Scene
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 80;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Small, subtle particles
      const particleCount = 120;
      const particlesGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 160;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
        velocities[i * 3] = (Math.random() - 0.5) * 0.08;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.08;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particlesMaterial = new THREE.PointsMaterial({
        color: 0x8b5cf6,
        size: 0.4,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      // Subtle connecting lines
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.06,
        blending: THREE.AdditiveBlending,
      });

      const linesGeometry = new THREE.BufferGeometry();
      const lines = new THREE.LineSegments(linesGeometry, lineMaterial);
      scene.add(lines);

      // Animation
      let startTime = performance.now();

      const animate = () => {
        if (!isRunning) return;

        const elapsedTime = (performance.now() - startTime) / 1000;

        // Update particle positions
        const pos = particlesGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          pos[i * 3] += velocities[i * 3];
          pos[i * 3 + 1] += velocities[i * 3 + 1];
          pos[i * 3 + 2] += velocities[i * 3 + 2];

          if (Math.abs(pos[i * 3]) > 80) velocities[i * 3] *= -1;
          if (Math.abs(pos[i * 3 + 1]) > 50) velocities[i * 3 + 1] *= -1;
          if (Math.abs(pos[i * 3 + 2]) > 30) velocities[i * 3 + 2] *= -1;
        }
        particlesGeometry.attributes.position.needsUpdate = true;

        // Update lines - shorter connection distance for fewer lines
        const linePositions: number[] = [];
        const connectionDistance = 25;
        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const dx = pos[i * 3] - pos[j * 3];
            const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
            const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < connectionDistance) {
              linePositions.push(
                pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
                pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
              );
            }
          }
        }
        linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

        particles.rotation.y = elapsedTime * 0.01;

        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      };

      animate();

      // Resize
      const handleResize = () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        isRunning = false;
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        linesGeometry.dispose();
        lineMaterial.dispose();
      };
    };

    const cleanup = init();
    return () => {
      cleanup?.();
      isRunning = false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ zIndex: 0 }}
    />
  );
}
