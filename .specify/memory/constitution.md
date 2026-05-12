# Agentic AI Developer Portfolio Constitution

<!--
Sync Impact Report:
- Version change: 1.0.0 → 2.0.0
- Modified principles: All principles restructured to follow declarative format with rationale
- Added sections: Error Handling, Component Standards, AI Integration Standards
- Removed sections: None (restructured existing)
- Templates requiring updates:
  ✅ .specify/templates/plan-template.md - aligned with component architecture
  ✅ .specify/templates/spec-template.md - updated AI integration requirements
  ✅ .specify/templates/tasks-template.md - added AI testing tasks
- Follow-up TODOs: None
-->

## Architecture Principles

- Every component begins as a standalone module before integration into the application
- Components communicate through explicit TypeScript interfaces—no cross-component internal imports
- All async operations use consistent error handling: Result types, never raw throws
- State management through Zustand only—no prop drilling beyond two levels

## Technology Constraints

- Frontend Framework: Next.js 16 with React 19 and TypeScript strict mode
- Styling: Tailwind CSS v4 with CSS-first configuration—no separate config files
- Animations: Framer Motion for component transitions, GSAP for scroll-triggered animations
- UI Components: Headless UI and Radix UI for accessibility—no custom implementations of existing patterns
- AI Integration: OpenAI API via backend proxy—no direct API calls from frontend
- State Management: Zustand with TypeScript—no Redux, no Context API for global state
- Backend: Python FastAPI for AI services—no Express.js alternatives
- Documentation First: Before implementing any technology, MUST read official documentation via context7 MCP server using `mcp__context7__resolve-library-id` and `mcp__context7__query-docs`

## Code Quality Standards

- No React component longer than 100 lines—extract subcomponents rather than extending
- All components must have TypeScript interfaces defined—no `any` types except explicit fallbacks
- Minimum 80% coverage on utility functions; 100% on AI integration layer
- Tests written for AI responses before chatbot implementation—mock responses required
- All public components exported through barrel files (index.ts)
- JSDoc comments on all exported functions and components

## Security Requirements

- No API keys, tokens, or credentials in frontend code—environment variables only
- Input validation at every form boundary using Zod schemas
- Rate limiting enforced on all AI chatbot endpoints—maximum 10 requests per minute per IP
- No logging of user messages to AI assistant—only metadata for analytics
- All external links use `rel="noopener noreferrer"`—no exceptions
- Content Security Policy headers required on all routes

## Component Standards

All components follow a consistent structure with explicit prop interfaces.

This applies to: page components, reusable UI components, layout components.

# DO THIS

```typescript
interface HeroSectionProps {
  title: string;
  subtitle?: string;
  animated?: boolean;
}

export function HeroSection({ title, subtitle, animated = true }: HeroSectionProps) {
  // Implementation
}
```

# NOT THIS

```typescript
export function HeroSection(props: any) {
  // No type safety, unclear prop shape
}
```

Why: TypeScript interfaces make component contracts explicit at the call site and enable IDE autocompletion.

## Error Handling

All functions that can fail return a Result type rather than raising exceptions.
This applies to: API calls, AI assistant responses, form submissions.

# DO THIS

```typescript
type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };

async function sendMessage(message: string): Promise<Result<AIResponse>> {
  try {
    const response = await aiService.send(message);
    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}
```

# NOT THIS

```typescript
async function sendMessage(message: string): Promise<AIResponse> {
  // throws on error
}
```

Why: Exceptions create implicit control flow. Result types make failure handling visible at the call site and prevent silent propagation.

## AI Integration Standards

All AI assistant functionality must go through a backend proxy service.
This applies to: chat messages, project queries, skill explanations.

# DO THIS

```typescript
// Frontend: Call backend API
const response = await fetch('/api/ai/chat', {
  method: 'POST',
  body: JSON.stringify({ message, context }),
});

// Backend: Python FastAPI proxy to OpenAI
@app.post("/api/ai/chat")
async def chat_endpoint(request: ChatRequest):
    return await ai_service.process_message(request.message, request.context)
```

# NOT THIS

```typescript
// Frontend: Direct OpenAI call
import OpenAI from 'openai';
const response = await openai.chat.completions.create({
  messages: [{ role: 'user', content: message }],
});
```

Why: Backend proxy allows rate limiting, request validation, API key security, and response caching. Frontend should never have direct access to API keys.

## Performance Requirements

- First Contentful Paint (FCP) < 1.5 seconds
- Largest Contentful Paint (LCP) < 2.5 seconds
- Cumulative Layout Shift (CLS) < 0.1
- Time to Interactive (TTI) < 3.5 seconds
- All images must use Next.js Image component with proper sizing
- No client-side data fetching blocking initial render—use server components

## Animation Guidelines

All animations must enhance user experience without impacting performance.

# DO THIS

```typescript
// Use Framer Motion for component transitions
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  {children}
</motion.div>
```

# NOT THIS

```typescript
// Heavy animations blocking main thread
useEffect(() => {
  // Synchronous animation calculations during render
  for (let i = 0; i < 1000; i++) {
    animateParticle(i);
  }
}, []);
```

Why: GPU-accelerated animations through Framer Motion maintain 60fps. Heavy JavaScript animations block the main thread and degrade performance.

## Workflow Rules

- When a design decision is ambiguous, ask one clarifying question before proceeding
- Propose three implementation options for architectural decisions, then wait for selection
- Commit after each completed component with message format: `type(scope): description`
- When you identify a pattern violation against this constitution, flag it explicitly
- All AI assistant responses must be testable with mock data—no live API calls in tests
- Performance testing required for all animations—measure FPS and memory impact

## Governance

This constitution supersedes all other development practices. Amendments require documentation, approval, and migration plan. All pull requests must verify compliance with these principles. Complexity must be justified by measurable user benefit. Use `.specify/memory/constitution.md` for runtime development guidance.

**Version**: 2.0.0 | **Ratified**: 2026-03-13 | **Last Amended**: 2026-03-13

---

## Rationale for Version 2.0.0

This is a MAJOR version bump from 1.0.0 because:
- Complete restructure of all principles to follow declarative format
- Added new mandatory sections: Error Handling, Component Standards, AI Integration Standards, Animation Guidelines
- Changed error handling approach from implicit exceptions to explicit Result types
- Added concrete code examples with "DO THIS / NOT THIS" patterns
- Added performance requirements with specific metrics
- Expanded security requirements with specific implementation patterns