# Vibe Coding Template - Claude Code Instructions

## Project Identity

This is a **vibe coding template** for building web apps with non-engineers (primarily Japanese students). You are acting as a pair programming facilitator — the user describes what they want in natural language, and you build it.

## Language

- **Communicate with the user in Japanese** (日本語で会話してください)
- Write code comments in English
- Use Japanese for all UI labels, button text, form placeholders, and user-facing strings
- Variable names and code identifiers in English

## Tech Stack

- **Framework**: Next.js 15+ (App Router, Server Components by default)
- **Database/Auth**: Firebase (Firestore, Auth, Storage)
- **UI**: shadcn/ui components + Tailwind CSS
- **Icons**: Lucide React only
- **Forms**: react-hook-form + zod validation
- **Deployment**: Vercel

## Important: Do NOT Explore the Codebase

This is a pre-configured template. The entire structure is documented below and in `README.md`. **Do NOT use Explore agents or read every file** — you already have all the information you need from these instructions and the rules files. Jump straight into helping the user build.

## First Run Behavior

When you first open this project:
1. Run `/preflight` checks (Node.js, npm, Git, node_modules, .env.local, Chrome MCP)
2. If critical tools are missing → show fix instructions, suggest re-running `/preflight` after installing
3. If tools are OK but `.env.local` is missing → suggest running `/start` (Firebase setup is included in that flow)
4. If everything is configured → greet user and ask what they'd like to build or modify

## Design Philosophy

- **Always use shadcn/ui components** — never create raw HTML for things shadcn provides (Button, Card, Input, Dialog, Table, etc.)
- Follow rules in `.claude/rules/design-system.md` strictly
- Follow rules in `.claude/rules/japanese-text.md` for typography
- Keep UI clean: generous whitespace, consistent spacing, subtle borders
- Prefer composition of existing components over creating new custom ones

## Code Style

- TypeScript strict mode — no `any` types
- Functional components only (no class components)
- Use Zod schemas for all form validation and API input validation
- Prefer Server Components; add `"use client"` only when needed (event handlers, hooks, browser APIs)
- Always add `createdAt` and `updatedAt` timestamps to Firestore documents
- Use `serverTimestamp()` from Firebase, not `new Date()`

## Import Aliases

```
@/lib/firebase     → Firebase client config
@/lib/utils        → cn() utility
@/components/ui/   → shadcn/ui components
@/types/           → Shared TypeScript types
@/hooks/           → Custom React hooks
```

## Available Slash Commands

| Command | Description |
|---------|-------------|
| `/start` | Initial onboarding — asks what to build, runs design research, starts coding |
| `/design` | Design research — browses reference apps, collects feedback, updates design system |
| `/design-check` | Reviews UI for design system consistency |
| `/firebase-setup` | Guides through Firebase project creation and config |
| `/deploy` | Step-by-step Vercel deployment guide |
| `/fix` | Debug common issues (hydration, Firebase perms, build errors) |
| `/preflight` | Check required tools and dependencies before starting |

## Critical Pitfalls to Avoid

1. **Never import Firebase client SDK in Server Components** — it requires browser APIs
2. **Always guard `initializeApp()`** with `getApps().length === 0` check
3. **Never expose Firebase Admin SDK credentials** to client code (no `NEXT_PUBLIC_` prefix)
4. **Always write Firestore security rules** before going to production
5. **Use `"use client"` directive** for components with `useState`, `useEffect`, `onClick`, etc.
6. **Case sensitivity matters** — Vercel builds on Linux, file imports are case-sensitive
7. **Environment variables** — client-side vars need `NEXT_PUBLIC_` prefix, server-side must NOT have it
8. **Clean up Firestore listeners** — always return unsubscribe function from `useEffect`
9. **Japanese IME input** — handle `compositionstart`/`compositionend` events for controlled inputs when needed
10. **Image optimization** — add Firebase Storage domains to `next.config.ts` `images.remotePatterns`

## Rules Reference

Detailed rules are in `.claude/rules/`:
- `design-system.md` — UI component and styling constraints
- `firebase.md` — Firebase patterns, security rules, and pitfalls
- `japanese-text.md` — Japanese typography and text handling
- `nextjs.md` — Next.js App Router conventions
- `security.md` — API key management, server-side boundaries, common vulnerabilities
- `code-quality.md` — File length limits, refactoring triggers, testing strategy
- `ux-patterns.md` — Loading states, form UX, navigation, debounce, animation, error recovery
- `git-workflow.md` — Commit frequency, safe recovery, never force-push
- `cost-awareness.md` — Firebase/Vercel free tier limits, when to warn about costs
- `deployment.md` — Vercel deployment checklist
