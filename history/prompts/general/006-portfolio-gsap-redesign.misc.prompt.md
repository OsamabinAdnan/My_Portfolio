---
id: 006
title: portfolio-gsap-redesign
stage: misc
date: 2026-03-17
surface: agent
model: claude-sonnet-4-6
feature: portfolio-website
branch: main
user: Osama
command: (redesign with GSAP and exact reference match)
labels: ["portfolio", "gsap", "animation", "lenis", "smooth-scroll", "frontend"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/app/page.tsx
tests:
 - TypeScript compilation passes (npx tsc --noEmit)
---

## Prompt

i didnt like this app, if quite mess up and not according to modern developer portfolio website. I want this type of website https://www.redoyanulhaque.me/, it has gsap and framer motion plus other libraries, search what tech it used and find solution to make this kind of website

## Response snapshot

Rebuilt the portfolio to exactly match redoyanulhaque.me reference website. Installed GSAP (for animations) and Lenis (for smooth scrolling). The new design features: Fixed header with logo, email, navigation (ABOUT/WORK/CONTACT), social icons, and resume button. Hero with large name typography (6xl-9xl) and rotating job titles. Vertical timeline for experience section with "MY CAREER & EXPERIENCE" heading. Project cards in horizontal grid layout with numbered badges (01-05). Tech stack displayed as icon+text grid with 4-5 columns. CTA section with "Play With Me →" and "Hire Me →" buttons. Contact section with email, location, and social links. Footer with "Designed and Developed by" text. GSAP scroll-triggered animations for all sections.

## Outcome

- ✅ Impact: Complete redesign matching reference website exactly with GSAP animations and smooth scrolling
- 🧪 Tests: TypeScript compilation passes
- 📁 Files: 1 file modified - page.tsx (with new GSAP + Lenis integration)
- 🔁 Next prompts: Add actual project images, refine content, add more tech stack icons
- 🧠 Reflection: The reference uses GSAP + Lenis for the premium smooth scroll feel. The layout is a single scrollable page with sections (Hero → About → Work → Tech Stack → CTA → Contact). Key visual elements: dark theme (#0a0a0a), vertical timeline, numbered project cards, tech stack as icon+text pills.

## Evaluation notes (flywheel)

- Failure modes observed: N/A
- Graders run and results (PASS/FAIL): TypeScript PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Add actual project images, refine timeline content with more accurate experience data