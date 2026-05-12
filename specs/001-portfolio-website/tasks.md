---

description: "Task list for Portfolio Website implementation"
---

# Tasks: Portfolio Website

**Input**: Design documents from `/specs/001-portfolio-website/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Initialize project with required dependencies and structure

- [X] T001 Verify Next.js 16, React 19, Tailwind CSS v4 are installed in frontend/
- [X] T002 Install additional dependencies: framer-motion, zustand, headlessui, clsx, tailwind-merge
- [ ] T003 [P] Install backend dependencies: fastapi, python-dotenv, openai, uvicorn
- [X] T004 Create TypeScript type definitions in frontend/lib/types/index.ts
- [X] T005 [P] Setup Tailwind CSS v4 configuration with dark mode in frontend/app/globals.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Create Zustand theme store in frontend/lib/store/useThemeStore.ts
- [X] T007 [P] Create Zustand chat store in frontend/lib/store/useChatStore.ts
- [X] T008 Create ThemeToggle component in frontend/components/ui/ThemeToggle.tsx
- [X] T009 Create root layout with theme provider in frontend/app/layout.tsx
- [X] T010 Add global styles and CSS variables for theming in frontend/app/globals.css
- [X] T011 Setup API route proxy for AI chat in frontend/app/api/ai/chat/route.ts
- [ ] T012 [P] Configure backend AI chat endpoint in backend/main.py

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Portfolio Exploration (Priority: P1) 🎯 MVP

**Goal**: Visitor lands on site, immediately understands dual expertise (FullStack + Agentic AI), can navigate and view work

**Independent Test**: Visitor lands on homepage, sees hero with correct headline, scrolls through all sections, can click CTAs to navigate

### Implementation for User Story 1

**Hero Section**

- [X] T013 [P] [US1] Create Hero section component in frontend/components/sections/Hero.tsx
- [X] T014 [US1] Add hero headline "FullStack Developer & Agentic AI Engineer" in Hero.tsx
- [X] T015 [US1] Add CAARE subtitle in Hero.tsx
- [X] T016 [US1] Add "View Work" and "Contact Me" CTAs with smooth scroll in Hero.tsx
- [X] T017 [US1] Add framer-motion staggered text reveal animation in Hero.tsx

**About Section**

- [X] T018 [P] [US1] Create About section component in frontend/components/sections/About.tsx
- [X] T019 [US1] Add intro paragraph with developer background in About.tsx
- [X] T020 [US1] Create StatCounter component with count-up animation in frontend/components/ui/StatCounter.tsx
- [X] T021 [US1] Add 4 key stats in About.tsx

**Skills Matrix Section**

- [X] T022 [P] [US1] Create Skills section component in frontend/components/sections/Skills.tsx
- [X] T023 [US1] Add FullStack skills column with pill/tags in Skills.tsx
- [X] T024 [US1] Add Agentic AI skills column with pill/tags in Skills.tsx
- [X] T025 [US1] Add scroll-triggered fade-in animation for skills in Skills.tsx

**Projects Showcase Section**

- [X] T026 [P] [US1] Create ProjectCard component in frontend/components/ui/ProjectCard.tsx
- [X] T027 [P] [US1] Create Projects section component in frontend/components/sections/Projects.tsx
- [X] T028 [US1] Add 6 project cards with title, description, tech stack, links in Projects.tsx
- [X] T029 [US1] Add scroll-triggered staggered card entrance animation in Projects.tsx

**Services Section**

- [X] T030 [P] [US1] Create ServiceCard component in frontend/components/ui/ServiceCard.tsx
- [X] T031 [P] [US1] Create Services section component in frontend/components/sections/Services.tsx
- [X] T032 [US1] Add 3 service cards in Services.tsx
- [X] T033 [US1] Add hover lift + glow animation in ServiceCard.tsx

**Blog Section**

- [X] T034 [P] [US1] Create Blog section component in frontend/components/sections/Blog.tsx
- [X] T035 [US1] Add "coming soon" placeholder with article cards in Blog.tsx

**Contact Section**

- [X] T036 [P] [US1] Create Contact section component in frontend/components/sections/Contact.tsx
- [X] T037 [US1] Add contact form with name, email, message fields in Contact.tsx
- [X] T038 [US1] Add social links (email, LinkedIn, GitHub, Twitter) in Contact.tsx
- [X] T039 [US1] Add form validation and submit handling in Contact.tsx

**Main Page Integration**

- [X] T040 [P] [US1] Assemble all sections in frontend/app/page.tsx
- [X] T041 [US1] Add smooth scroll navigation with section IDs in page.tsx
- [X] T042 [US1] Add scroll-triggered section animations in page.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional - visitor can explore entire portfolio

---

## Phase 4: User Story 2 - Interactive AI Chat Demo (Priority: P2)

**Goal**: Visitor experiences AI capabilities firsthand through interactive chat demo

**Independent Test**: Visitor opens chat, types message, receives AI response within reasonable time

### Implementation for User Story 2

- [X] T043 [P] [US2] Create AIChatDemo component in frontend/components/ui/AIChatDemo.tsx
- [X] T044 [US2] Add chat message input and display in AIChatDemo.tsx
- [X] T045 [US2] Integrate with chat store for message state in AIChatDemo.tsx
- [X] T046 [US2] Add API call to /api/ai/chat endpoint in AIChatDemo.tsx
- [X] T047 [US2] Add loading state and typing indicator in AIChatDemo.tsx
- [X] T048 [US2] Add error handling with graceful fallback in AIChatDemo.tsx
- [X] T049 [US2] Add no-JS fallback message in AIChatDemo.tsx

**Checkpoint**: At this point, User Story 2 works - AI chat demo is interactive

---

## Phase 5: User Story 3 - Dark Mode Toggle (Priority: P2)

**Goal**: User can toggle between light/dark themes with smooth transition, preference persists

**Independent Test**: Click theme toggle, theme switches immediately, reload page, preference preserved

### Implementation for User Story 3

- [X] T050 [US3] Add localStorage persistence in useThemeStore.ts
- [X] T051 [US3] Add system preference detection in useThemeStore.ts
- [X] T052 [US3] Add smooth CSS transition for theme changes in globals.css
- [X] T053 [US3] Ensure all components respect theme in globals.css
- [X] T054 [US3] Verify dark mode text contrast meets WCAG AA in globals.css

**Checkpoint**: At this point, User Story 3 works - dark mode fully functional

---

## Phase 6: User Story 4 - Agentic AI Special Section (Priority: P2)

**Goal**: Showcase AI agents with demos/video previews and architecture explanations

**Independent Test**: Visitor scrolls to AI section, sees 3 agent showcases, can view demos

### Implementation for User Story 4

- [X] T055 [P] [US4] Create AgentCard component in frontend/components/ui/AgentCard.tsx
- [X] T056 [P] [US4] Create AgenticAI section component in frontend/components/sections/AgenticAI.tsx
- [X] T057 [US4] Add 3 AI agent showcases with name, purpose, tech, demo link in AgenticAI.tsx
- [X] T058 [US4] Add architecture explanation for each agent in AgentCard.tsx
- [X] T059 [US4] Add video/demo embed support in AgentCard.tsx
- [X] T060 [US4] Add futuristic/AI theme styling distinct from other sections in AgenticAI.tsx

**Checkpoint**: At this point, User Story 4 works - AI agents showcased prominently

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T061 [P] Add Core Web Vitals tracking and badge component
- [ ] T062 [P] Add accessibility improvements (ARIA labels, keyboard nav) across all components
- [ ] T063 Optimize images with Next.js Image component
- [ ] T064 Add semantic HTML and JSON-LD structured data for SEO
- [ ] T065 Verify mobile responsiveness (44px tap targets, no horizontal scroll)
- [ ] T066 Add loading skeletons for slow network
- [ ] T067 Test no-JS fallback content readability
- [ ] T068 Add performance optimizations (code splitting, lazy loading)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories (MVP)
- **User Story 2 (P2)**: Can start after Foundational - Independent from US1
- **User Story 3 (P2)**: Can start after Foundational - Builds on theme store (T006)
- **User Story 4 (P2)**: Can start after Foundational - Independent from US1/US2/US3

### Within Each User Story

- Components before integration
- Core implementation before animations
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- US1 section components (T013-T035) marked [P] can run in parallel
- Once Foundational phase completes, US1, US2, US3, US4 can start in parallel

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready - basic portfolio functional

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 (AI Chat) → Test independently → Deploy/Demo
4. Add User Story 3 (Dark Mode) → Test independently → Deploy/Demo
5. Add User Story 4 (AI Agents) → Test independently → Deploy/Demo
6. Polish → Final deployment

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Sections)
   - Developer B: User Story 2 (AI Chat)
   - Developer C: User Story 3 + 4 (Dark Mode + AI Agents)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence