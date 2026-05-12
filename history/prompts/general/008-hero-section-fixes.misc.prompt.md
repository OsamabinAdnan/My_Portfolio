---
id: 008
title: hero-section-layout-fixes
stage: misc
date: 2026-03-18
surface: agent
model: claude-sonnet-4-6
feature: portfolio-website
branch: main
user: Osama
command: (fix hero section layout issues)
labels: ["portfolio", "layout", "hero-section", "threejs", "styling"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/app/page.tsx
 - frontend/components/ui/ThreeDScene.tsx
tests:
 - TypeScript compilation passes (npx tsc --noEmit)
---

## Prompt

There is certainly issue in Hero section, design destorted, it not smooth transition, see both images @hero1.png and @hero2.png

## Response snapshot

Fixed the hero section layout issues:
1. Adjusted 3D scene layering - changed from z-index: -1 to z-index: 0 and made it fixed positioned to properly render behind content
2. Improved hero text layout:
   - Increased name font size to lg:text-[10rem] for better visibility
   - Improved vertical spacing with mb-2 and mt-4 classes
   - Added leading-none for tighter text rendering
   - Fixed section padding and z-index stacking (main z-10, footer z-20)
3. Fixed background transparency issues:
   - Changed all section backgrounds from bg-[#0a0a0a]/90 to bg-[#0a0a0a] for solid backgrounds
   - Ensured proper z-index ordering so 3D scene stays behind content
4. Improved text hierarchy and readability in the hero section

## Outcome

- ✅ Impact: Fixed hero section layout distortion and improved visual hierarchy
- 🧪 Tests: TypeScript compilation passes
- 📁 Files: 2 files modified - page.tsx (hero layout fixes) and ThreeDScene.tsx (z-index fix)
- 🔁 Next prompts: Continue improving other sections (About, Work, Footer, Tech Stack)
- 🧠 Reflection: The issue was caused by improper z-index stacking between 3D scene and content layers. The 3D scene was interfering with text rendering due to layering problems.

## Evaluation notes (flywheel)

- Failure modes observed: N/A
- Graders run and results (PASS/FAIL): TypeScript PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Work on the other sections mentioned in the feedback (About, Work, Footer, Tech Stack)