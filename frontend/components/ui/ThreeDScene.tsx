'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeDScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width === 0 || height === 0) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 500;
    const posArray = new Float32Array(particleCount * 3);
    const randomArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    for (let i = 0; i < particleCount; i++) {
      randomArray[i] = Math.random();
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('random', new THREE.BufferAttribute(randomArray, 1));

    // Custom shader material for particles
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#ffffff') },
      },
      vertexShader: `
        uniform float uTime;
        attribute float random;
        varying float vRandom;

        void main() {
          vRandom = random;
          vec3 pos = position;
          pos.y += sin(uTime * 0.5 + random * 10.0) * 0.3;
          pos.x += cos(uTime * 0.3 + random * 10.0) * 0.2;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = (3.0 + random * 2.0) * (10.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vRandom;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          float alpha = 1.0 - (dist * 2.0);
          alpha *= 0.5 + vRandom * 0.5;

          gl_FragColor = vec4(uColor, alpha * 0.6);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add floating geometric shapes
    const shapes: THREE.Mesh[] = [];
    const geometries = [
      new THREE.IcosahedronGeometry(0.3, 0),
      new THREE.OctahedronGeometry(0.3, 0),
      new THREE.TetrahedronGeometry(0.3, 0),
    ];

    for (let i = 0; i < 5; i++) {
      const geo = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: 0x444444,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });
      const mesh = new THREE.Mesh(geo, material);
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      scene.add(mesh);
      shapes.push(mesh);
    }

    // Animation
    let startTime = performance.now();
    let animationId: number = 0;
    let isRunning = true;

    const animate = () => {
      if (!isRunning) return;

      const elapsedTime = (performance.now() - startTime) / 1000;

      // Update particles
      particlesMaterial.uniforms.uTime.value = elapsedTime;
      particles.rotation.y = elapsedTime * 0.05;

      // Animate shapes
      shapes.forEach((shape, i) => {
        shape.rotation.x += 0.005 * (i + 1);
        shape.rotation.y += 0.007 * (i + 1);
        shape.position.y += Math.sin(elapsedTime + i) * 0.002;
      });

      // Subtle camera movement
      camera.position.x = Math.sin(elapsedTime * 0.1) * 0.3;
      camera.position.y = Math.cos(elapsedTime * 0.1) * 0.2;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
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
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      geometries.forEach(g => g.dispose());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}