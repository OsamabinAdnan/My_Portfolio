---
id: 002
title: Add Documentation First Policy to Constitution
stage: constitution
date: 2026-03-13
surface: agent
model: claude-sonnet-4-6
feature: none
branch: main
user: osamabinadnan
command: /sp.constitution
labels: [constitution, documentation, context7, best-practices]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - CLAUDE.md
  - .specify/memory/constitution.md
tests:
  - Constitution validation passed
  - Documentation policy added
---

## Prompt

ok add i think in @CLAUDE.md and @.specify\memory\constitution.md file that you should read official docs via context7 MCP server, before working on any tech

## Response snapshot

Added "Documentation First Policy" requirement to both CLAUDE.md and constitution.md files. This policy mandates reading official documentation via context7 MCP server before implementing any technology.

**Updates made:**

### CLAUDE.md Changes:
- Added new section "### 2. Documentation First Policy:" after Authoritative Source Mandate
- Specified use of `mcp__context7__resolve-library-id` and `mcp__context7__query-docs`
- Ensures up-to-date best practices and correct implementation patterns

### constitution.md Changes:
- Added to Technology Constraints section
- New requirement: "Documentation First: Before implementing any technology, MUST read official documentation via context7 MCP server"
- Included specific MCP tool names for enforcement

**Rationale:**
- Ensures all implementations follow current best practices
- Reduces errors from outdated internal knowledge
- Provides authoritative source for framework-specific patterns
- Aligns with constitution's principle of external verification

## Outcome

- ✅ Impact: Established documentation-first requirement for all technology implementations
- 🧪 Tests: Constitution validation passed, documentation policy correctly integrated
- 📁 Files: Updated CLAUDE.md and .specify/memory/constitution.md
- 🔁 Next prompts: Begin Phase 1 with documentation reading for Next.js 16, React 19, Tailwind CSS v4
- 🧠 Reflection: This policy ensures we always use current best practices and correct patterns from official sources rather than relying on potentially outdated internal knowledge.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS - All placeholders filled, policy correctly integrated
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Read Next.js 16 documentation via context7 before starting Phase 1