---
id: 001
title: Create Agentic AI Portfolio Constitution
stage: constitution
date: 2026-03-13
surface: agent
model: claude-sonnet-4-6
feature: none
branch: main
user: osamabinadnan
command: /sp.constitution
labels: [constitution, architecture, governance, setup]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - Constitution validation passed
  - Version bump applied correctly
  - All templates checked for consistency
---

## Prompt

Write constitution of this project by following below sample

# Project Constitution

## Architecture Principles

- Every feature begins as a standalone module before integration into the application
- Modules communicate through explicit interfaces—no cross-module internal imports
- All async operations use consistent error handling: Result types, never raw throws
- Database access through the repository layer only—no direct queries in services

## Technology Constraints

- Language: Python 3.12 with strict type checking enabled
- Framework: FastAPI for all API surfaces
- Database: PostgreSQL via SQLAlchemy ORM—no raw SQL except in migrations
- Auth: JWT with refresh token rotation—no sessions, no cookies

## Code Quality Standards

- No function longer than 40 lines—extract helpers rather than extending
- All public functions and classes have docstrings
- Type hints on every parameter and return value—no `Any` types
- Minimum 80% coverage on business logic; 100% on utility functions
- Tests written before implementation (TDD)—the test file is the first commit

## Security Requirements

- No secrets, tokens, or credentials in code or committed files—environment variables only
- Input validation at every API boundary using Pydantic models
- All state-changing operations write to the audit log
- Never log request bodies—only request metadata

## Workflow Rules

- When a spec is ambiguous, ask one clarifying question before proceeding
- Propose three implementation options for architectural decisions, then wait for selection
- Commit after each completed task with a message in this format: type(scope): description
- When you identify a pattern violation against this constitution, flag it explicitly

## Good constitution entry — shows not just the rule, but why and how

## Error Handling

All functions that can fail return a Result type rather than raising exceptions.
This applies to: database operations, external API calls, file system operations.

# DO THIS

def fetch_user(user_id: str) -> Result[User, NotFoundError]:
...

# NOT THIS

def fetch_user(user_id: str) -> User: # raises KeyError on miss
...

Why: Exceptions create implicit control flow. Result types make
failure handling visible at the call site and prevent silent propagation.

## Response snapshot

Created comprehensive constitution for Agentic AI Developer Portfolio project with version 2.0.0. The constitution follows the provided sample format with:

**Architecture Principles**: Component-first development, explicit interfaces, Result types for error handling, Zustand state management

**Technology Constraints**: Next.js 16, React 19, TypeScript strict mode, Tailwind CSS v4, Framer Motion, GSAP, Headless UI, Radix UI, OpenAI API via backend proxy, Zustand, Python FastAPI

**Code Quality Standards**: 100-line component limit, TypeScript interfaces required, 80% test coverage minimum, mock responses for AI testing, barrel exports, JSDoc comments

**Security Requirements**: No frontend API keys, Zod validation, rate limiting (10 req/min), no user message logging, Content Security Policy

**Component Standards**: Explicit prop interfaces with TypeScript, Result types for all operations

**Error Handling**: Result types instead of exceptions, visible failure handling

**AI Integration Standards**: Backend proxy required for all AI calls, no direct frontend API access

**Performance Requirements**: FCP < 1.5s, LCP < 2.5s, CLS < 0.1, TTI < 3.5s, Next.js Image component, server components

**Animation Guidelines**: Framer Motion for transitions, GSAP for scroll, GPU-accelerated animations, no blocking main thread

**Workflow Rules**: Single clarifying question, three implementation options, commit format, pattern violation flagging, mock data testing, performance testing

## Outcome

- ✅ Impact: Established foundational architecture and governance rules for portfolio project
- 🧪 Tests: Constitution validation passed, version bump correctly applied to 2.0.0
- 📁 Files: Updated `.specify/memory/constitution.md` with comprehensive rules
- 🔁 Next prompts: Begin portfolio component development following constitution principles
- 🧠 Reflection: Constitution provides clear, testable rules with concrete examples. MAJOR version bump (2.0.0) chosen due to complete restructure and addition of new mandatory sections.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS - All placeholders filled, version correct, principles declarative
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin implementing Hero component following Component Standards principle