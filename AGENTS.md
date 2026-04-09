<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Guidelines

## Critical Rules

- **Never modify `messages/en.json` without also updating `messages/es.json`** (and vice versa). Both files must have identical key structures at all times.
- **Never add text directly in components** — all user-facing strings go through `useTranslations()`.
- **Never use `next/navigation`** for locale-aware routing — use `@/i18n/navigation` instead (provides `Link`, `useRouter`, `usePathname`).
- **Never use media queries for dark mode** — use the `.dark` CSS class (controlled by next-themes with `attribute="class"`).
- **Do not install shadcn via CLI** — UI components are manually built in `src/components/ui/`. The shadcn registry is not used.

## Before Writing Code

1. Run `npm run build` to confirm the project compiles before and after changes.
2. Check that TypeScript passes: `npx tsc --noEmit`.
3. If adding framer-motion `motion.div` with `{...props}` spread, be aware of `onDrag`/`onAnimationStart` type conflicts between React DOM events and framer-motion. Filter those props out.

## Component Patterns

```tsx
// Every section component follows this pattern:
"use client";

import { useTranslations } from "next-intl";
import { ScrollAnimation } from "@/components/scroll-animation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function MySection() {
  const t = useTranslations("mySection");
  
  return (
    <section id="my-section" className="relative py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <ScrollAnimation>
          {/* content using t("key") for all text */}
        </ScrollAnimation>
      </div>
    </section>
  );
}
```

## CSS Variable System

Colors use HSL values without the `hsl()` wrapper in CSS variables, then wrapped in `globals.css`:
```css
:root { --background: 0 0% 100%; }
@theme inline { --color-background: hsl(var(--background)); }
```

This means Tailwind classes like `bg-background`, `text-foreground`, `border-border` all work automatically.

## i18n Array Access

next-intl doesn't support `.map()` on message arrays directly. Use index-based access:
```tsx
{Array.from({ length: 4 }, (_, i) => (
  <div key={i}>{t(`items.${i}.title`)}</div>
))}
```

When the array length is known, hardcode it or define a constant.

## File Responsibilities

| File | Purpose |
|------|---------|
| `src/middleware.ts` | Locale detection + redirect |
| `src/i18n/routing.ts` | Locale list + default locale |
| `src/i18n/navigation.ts` | Locale-aware Link, useRouter, usePathname |
| `src/i18n/request.ts` | Server-side message loading |
| `src/app/[locale]/layout.tsx` | HTML shell, fonts, providers |
| `src/app/[locale]/page.tsx` | Section assembly |
| `src/app/globals.css` | Theme variables, Tailwind config, utility classes |
| `src/components/scroll-animation.tsx` | Reusable viewport animation wrapper |
| `src/components/theme-provider.tsx` | next-themes client wrapper |
