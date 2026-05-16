---
id: 017
title: Update AI Engineer wording
stage: general
date: 2026-05-16
surface: agent
model: kiro-and-openai[1m]
feature: none
branch: main
user: Osama bin Adnan
command: proceed
labels: ["copy","branding","seo","nextjs","chatbot"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/lib/data/data.json
 - frontend/app/layout.tsx
 - frontend/app/api/ai/chat/route.ts
 - frontend/components/sections/HeroSection.tsx
 - README.md
tests:
 - N/A
---

## Prompt

In these files:
frontend/lib/data/data.json
frontend/app/layout.tsx
frontend/app/api/ai/chat/route.ts
README.md

Change `AI Engineer` to `Agentic AI Developer`

## Response snapshot

Updated portfolio profile title, Next.js metadata/openGraph, chat fallback responses, hero roles label, and root README to replace "AI Engineer" with "Agentic AI Developer" and remove LangChain/CrewAI/AutoGen mentions.

## Outcome

- ✅ Impact: Consistent branding across UI, SEO metadata, fallback chat route, and documentation.
- 🧪 Tests: N/A
- 📁 Files: Updated 5 files.
- 🔁 Next prompts: Redeploy Vercel so Hero/About reflect new wording.
- 🧠 Reflection: Prefer using OpenAI Agents SDK wording aligned with project tech stack.

## Evaluation notes (flywheel)

- Failure modes observed: Deployed site can show old wording until Vercel rebuild completes.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Add CI check to prevent reintroducing banned frameworks (LangChain/CrewAI/AutoGen).
