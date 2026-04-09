@AGENTS.md

# ChurroStack Landing Page

Marketing landing page for ChurroStack — an open-source platform to deploy and manage applications, LLMs, and MCP tools on private bare-metal hardware (Kubernetes).

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 + shadcn-style UI components (manually built, no registry)
- **i18n**: next-intl v4 — English (`en`) and Spanish (`es`)
- **Theme**: next-themes — light/dark mode via `.dark` CSS class
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **State**: Zustand (available but minimal usage currently)
- **Icons**: lucide-react

## Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (passthrough, no html/body)
│   ├── page.tsx                # Root redirect → /en
│   ├── globals.css             # Tailwind + CSS variables (light/dark)
│   └── [locale]/
│       ├── layout.tsx          # Locale layout (fonts, ThemeProvider, NextIntlClientProvider)
│       └── page.tsx            # Main page — assembles all sections
├── components/
│   ├── ui/                     # Reusable shadcn-style components (Button, Card, Badge, etc.)
│   ├── sections/               # Page sections (hero, features, pricing, etc.)
│   ├── scroll-animation.tsx    # Framer Motion viewport fade/slide wrapper
│   └── theme-provider.tsx      # next-themes client wrapper
├── i18n/
│   ├── routing.ts              # Locale config (en, es)
│   ├── navigation.ts           # createNavigation exports (Link, useRouter, usePathname)
│   └── request.ts              # Server-side message loading
├── lib/
│   └── utils.ts                # cn() utility (clsx + tailwind-merge)
├── store/                      # Zustand stores
└── middleware.ts                # next-intl locale detection middleware
messages/
├── en.json                     # English translations
└── es.json                     # Spanish translations
public/
└── logo.png                    # ChurroStack logo (black on transparent)
```

## Architecture Conventions

### i18n

- All user-facing text lives in `messages/en.json` and `messages/es.json`
- Components use `useTranslations('sectionName')` from `next-intl`
- Array items accessed via `t('items.${index}.title')` pattern
- Locale switching uses `useRouter`/`usePathname` from `@/i18n/navigation`
- Middleware handles Accept-Language detection and routing

### Components

- Section components are in `src/components/sections/` — each is a `"use client"` component
- UI primitives are in `src/components/ui/` — built manually following shadcn patterns (CVA for variants, forwardRef, cn() for class merging)
- Use `ScrollAnimation` wrapper for viewport-triggered fade/slide animations
- Section IDs match nav anchor links: `features`, `how-it-works`, `use-cases`, `pricing`, `faq`, `contact`, `workspace-mode`, `llm-hub`

### Styling

- Black/white premium aesthetic — primary buttons use `bg-foreground text-background`
- CSS variables defined in `globals.css` using HSL format (`:root` for light, `.dark` for dark)
- Dotted architect-plan background via `.dotted-bg` class on body
- Spotlight radial gradient via `.spotlight` class
- Logo needs `dark:invert` class in dark mode
- Footer inverts: `bg-foreground text-background` with `invert dark:invert-0` on logo

### Adding a New Section

1. Create `src/components/sections/my-section.tsx` ("use client")
2. Add translation keys to both `messages/en.json` and `messages/es.json`
3. Import and place in `src/app/[locale]/page.tsx`
4. Add nav link in `navbar.tsx` NAV_LINKS array if needed

### Adding a New UI Component

1. Create `src/components/ui/my-component.tsx`
2. Follow shadcn patterns: forwardRef, CVA for variants, cn() for merging
3. Use `"use client"` directive if it uses hooks or browser APIs
