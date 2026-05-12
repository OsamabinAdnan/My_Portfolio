---
id: 007
title: portfolio-threejs-animation
stage: misc
date: 2026-03-18
surface: agent
model: claude-sonnet-4-6
feature: portfolio-website
branch: main
user: Osama
command: (add Three.js 3D animation)
labels: ["portfolio", "three.js", "3d-animation", "gsap", "lenis", "loading-screen"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/app/page.tsx
 - frontend/components/ui/ThreeDScene.tsx
 - frontend/components/ui/LoadingScreen.tsx
tests:
 - TypeScript compilation passes (npx tsc --noEmit)
---

## Prompt

where is threejs animation??

## Response snapshot

Added Three.js 3D animations to match the reference website:
1. Created ThreeDScene.tsx - A 3D background with floating particles using custom GLSL shaders, wireframe geometric shapes (icosahedron, octahedron, tetrahedron) that rotate and float, and subtle camera movement
2. Created LoadingScreen.tsx - A preloader with 3D floating spheres and connecting lines that animate, simulates loading progress (0-100%), then shows "Welcome" text before transitioning to the main content
3. Updated page.tsx to include both the 3D background scene (positioned behind all content with z-index: -1) and the loading screen that shows on initial load

The 3D scene features:
- 500 particles with custom vertex/fragment shaders for organic movement
- 5 floating wireframe geometric shapes
- Additive blending for glow effect
- Responsive resize handling

## Outcome

- ✅ Impact: Added Three.js 3D animations matching the reference website's premium feel
- 🧪 Tests: TypeScript compilation passes
- 📁 Files: 3 files created/modified - ThreeDScene.tsx, LoadingScreen.tsx, page.tsx
- 🔁 Next prompts: Add more visual refinements, custom project images, actual career data
- 🧠 Reflection: The reference uses Three.js for the loading animation with floating symbols. Now the portfolio has: Loading screen → 3D particles background → GSAP scroll animations → Lenis smooth scrolling

## Evaluation notes (flywheel)

- Failure modes observed: N/A
- Graders run and results (PASS/FAIL): TypeScript PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Add actual project screenshots, refine the 3D scene colors, add more floating elements