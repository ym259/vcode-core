# Design System Rules

## Component Usage

- **Only use shadcn/ui components** for UI elements. Never create custom components for things shadcn already provides.
- Available components: Button, Card, Input, Label, Tabs, Table, Badge, Progress, Avatar, Sidebar, Dialog, Dropdown Menu, Select, Textarea, Form, Sonner (toast), Skeleton, Accordion, Separator, Sheet, Tooltip
- If a component is not installed, install it with `npx shadcn@latest add <component>`
- Compose complex UIs from these primitives (e.g., Card + CardHeader + CardContent + CardFooter)

## Color Palette

- Use **CSS variables only** from `globals.css`. Never hardcode colors (`text-[#xxx]`, `bg-[#xxx]`).
- Primary = indigo-blue (trust/education feel)
- Neutral = zinc for backgrounds and text
- Use `text-foreground` for primary text, `text-muted-foreground` for secondary text
- Use `bg-background` for page, `bg-card` for surfaces, `bg-muted` for subtle backgrounds
- Destructive actions use `destructive` variant

## Spacing

- Stick to the **8px grid**: `p-2` (8px), `p-4` (16px), `p-6` (24px), `p-8` (32px)
- Avoid odd spacing values like `p-3`, `p-5`, `p-7` unless intentionally adjusting
- Use `gap-4` or `gap-6` for flex/grid layouts
- Page padding: `p-6` or `p-8`
- Card padding: `p-6`

## Typography

- **Max 2 font weights** visible at once: `font-normal` (body) + `font-semibold` (headings)
- Never use `font-thin`, `font-light`, `font-black`, or `font-extrabold`
- Use `text-sm` for secondary/helper text, `text-base` for body, `text-lg`+ for headings
- Headings: use semantic HTML (`h1`-`h4`) with appropriate text sizes

## Layout

- **Sidebar navigation** + card-based content area is the default pattern
- Content area: `max-w-5xl` or `max-w-6xl` with `mx-auto` centering
- Use CSS Grid or Flexbox for layouts — never use absolute positioning for layout
- Responsive: mobile-first with `sm:`, `md:`, `lg:` breakpoints

## Icons

- **Lucide React only** — import from `lucide-react`
- Use consistent icon sizes: `size={16}` for inline, `size={20}` for buttons, `size={24}` for standalone
- Always pair icons with text labels for clarity (icon-only buttons need `aria-label`)

## Borders and Shadows

- Borders: use `border-border` color with `rounded-lg` radius
- Shadows: `shadow-sm` or none. **Never use heavy drop shadows** (`shadow-md`, `shadow-lg`, `shadow-xl`)
- Cards use `border` by default (shadcn Card has built-in border)

## States and Feedback

- Use `Skeleton` components for loading states
- Use `Sonner` (toast) for success/error notifications
- Disabled states: use component's `disabled` prop, never custom opacity
- Empty states: show a centered message with icon + description + action button

## Responsive Design

- All layouts must work on mobile (375px+) and desktop
- Sidebar collapses to sheet/drawer on mobile
- Tables become card lists on mobile when data is complex
- Test with `sm`, `md`, `lg` breakpoints
