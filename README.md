# vcode-template

Vibe coding template for building web apps with Claude Code. Clone, run `/start`, and start building.

## Quick Start

```bash
git clone https://github.com/ym259/vcode-core.git my-app
cd my-app && npm install
# Open Claude Code and type /start
```

## Stack

- **Next.js 16** (App Router, Server Components)
- **Firebase** (Auth, Firestore, Storage)
- **shadcn/ui** + Tailwind CSS v4 (New York style, Zinc base, indigo-blue primary)
- **Lucide React** icons
- **react-hook-form** + **zod** for forms
- **Vercel** for deployment

## Repo Structure

```
.claude/
├── CLAUDE.md              # Main instructions for Claude Code
├── rules/
│   ├── design-system.md   # UI component & styling constraints
│   ├── firebase.md        # Firebase patterns & security rules
│   ├── japanese-text.md   # Japanese typography & text handling
│   ├── nextjs.md          # Next.js App Router conventions
│   └── deployment.md      # Vercel deployment checklist
├── commands/
│   ├── start.md           # /start — onboarding flow
│   ├── firebase-setup.md  # /firebase-setup — Firebase project setup guide
│   ├── design-check.md    # /design-check — UI consistency review
│   ├── deploy.md          # /deploy — Vercel deployment guide
│   └── fix.md             # /fix — common issue debugger
└── settings.json          # Claude Code permissions

src/
├── app/
│   ├── layout.tsx         # Root layout (Inter + Noto Sans JP fonts, Toaster, TooltipProvider)
│   ├── page.tsx           # Landing page (placeholder with /start instructions)
│   └── globals.css        # Tailwind v4 + shadcn CSS variables + JP text optimizations
├── components/ui/         # 22 pre-installed shadcn/ui components
├── hooks/                 # Custom hooks (use-mobile.ts)
├── lib/
│   ├── firebase.ts        # Firebase client SDK (with getApps() guard)
│   └── utils.ts           # cn() utility
└── types/
    └── index.ts           # Shared TypeScript types

.mcp.json                  # Firebase MCP server config
.env.example               # Environment variable template
components.json            # shadcn/ui config
```

## Pre-installed shadcn/ui Components

button, card, input, label, tabs, table, badge, progress, avatar, sidebar, dialog, dropdown-menu, select, textarea, form, sonner, skeleton, accordion, separator, sheet, tooltip

## Slash Commands

| Command | Description |
|---------|-------------|
| `/start` | Onboarding — asks what to build, creates PROJECT.md, starts coding |
| `/firebase-setup` | Step-by-step Firebase project creation guide |
| `/design-check` | Reviews all UI for design system consistency |
| `/deploy` | Vercel deployment walkthrough |
| `/fix` | Diagnoses common errors (hydration, Firebase perms, build failures) |
