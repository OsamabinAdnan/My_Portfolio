---
id: 016
title: Chatbot buckets retry and image paths
stage: general
date: 2026-05-15
surface: agent
model: kiro-and-openai[1m]
feature: none
branch: main
user: Osama bin Adnan
command: for now just commit and push changes to github
labels: ["chatbot","fastapi","openrouter","vercel","context","reliability","assets"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/app/api.py
 - backend/app/agent.py
 - frontend/lib/data/data.json
tests:
 - N/A (user validated behavior on deployed frontend/backend)
---

## Prompt

for now just commit and push changes to github

## Response snapshot

Committed and pushed backend chatbot improvements: intent-based context slicing (keyword buckets), retry-on-echo and missing project URLs, and enforced OBIN-first ordering for identity questions. Also fixed CarPoint image path casing in data.json for Vercel/Linux deployments.

## Outcome

- ✅ Impact: Faster and more reliable chatbot responses with reduced prompt size; projects list includes URLs; identity answers start with OBIN; CarPoint images load on deployed site.
- 🧪 Tests: User manually tested on deployed frontend/backend and observed quicker, correct answers.
- 📁 Files: Updated backend agent instructions and chat pipeline; fixed frontend data.json asset paths.
- 🔁 Next prompts: Add retry/backoff for provider 502 idle timeouts; consider paid fast model; optionally remove legacy _portfolio_context function.
- 🧠 Reflection: Reducing injected context to relevant sections improves latency and reduces provider timeouts while keeping non-hallucination guarantees.

## Evaluation notes (flywheel)

- Failure modes observed: Model sometimes echoed instructions or omitted deployment URLs; provider sometimes returns 502 idle timeout.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Catch ModelBehaviorError (502) and retry once with backoff.
