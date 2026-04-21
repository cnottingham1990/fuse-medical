# Fuse Medical Website — Design Spec
**Date:** 2026-04-21
**Status:** Approved

## Overview

Redesign of fusemedical.org. The design is fully realized in `Fuse Medical v4.html` — a single-file HTML/CSS/JS prototype. This project ports that prototype into a production Next.js application, deploys it to Vercel via GitHub, and establishes the foundation for future integrations (scheduling API, contact form backend).

---

## Architecture

- **Framework:** Next.js 15, App Router, TypeScript
- **Styling:** Single `styles/globals.css` — v4's CSS variables, keyframes, and all component classes ported directly. No Tailwind, no CSS Modules.
- **Fonts:** Loaded via `next/font/google` — Instrument Serif, Inter Tight, JetBrains Mono. Applied to `<html>` via CSS variables in layout.
- **Images:** Downloaded from fusemedical.org and committed to `/public/images/`. Served via Next.js `<Image>` component for optimization. Placeholder CSS slots in v4 that have no real counterpart stay as styled CSS backgrounds for now.
- **No backend:** Contact form is UI-only (no submission handler). Schedule page is a placeholder multi-step UI (no real booking logic).
- **Book Appointment:** Nav button links to `/schedule`. No external scheduler wired yet — integration TBD with client.

---

## Deployment

- **GitHub account:** `cnottingham1990`
- **Repo:** `fuse-medical` (new public or private repo under cnottingham1990)
- **Vercel:** Connected to cnottingham1990's Vercel account. Auto-deploys on push to `main`.
- **Domain:** Not assigned yet — Vercel preview URL used during development. Current domain (fusemedical.org) replaced later.

---

## Project Structure

```
fuse-medical/
├── app/
│   ├── layout.tsx                  # Root layout: Nav, fonts, globals.css import
│   ├── page.tsx                    # Home
│   ├── team/
│   │   └── page.tsx                # Team
│   ├── restoration-living/
│   │   └── page.tsx                # Restoration Living
│   └── schedule/
│       └── page.tsx                # Schedule (Book Appointment)
├── components/
│   ├── Nav.tsx                     # Fixed nav — links + Book Appointment button
│   ├── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx                # Split hero with floating spheres
│   │   ├── Ticker.tsx              # Scrolling services ticker
│   │   ├── Services.tsx            # Horizontal scroll service cards
│   │   ├── Story.tsx               # Why choose / four pillars
│   │   ├── Feature.tsx             # Dark quote block
│   │   └── Contact.tsx             # Placeholder contact form
│   ├── team/
│   │   ├── TeamHero.tsx            # Large team page header
│   │   └── TeamDirectory.tsx       # Sticky list + detail panel (client component)
│   ├── restoration-living/
│   │   ├── RestHero.tsx            # Split dark/light hero with door graphic
│   │   ├── Mission.tsx             # Mission two-column section
│   │   ├── Values.tsx              # Numbered values accordion rows
│   │   ├── NonDiscrimination.tsx   # Dark non-discrimination block with tags
│   │   └── Testimonials.tsx        # Patient testimonial grid
│   └── schedule/
│       └── ScheduleFlow.tsx        # Multi-step booking UI (client component, placeholder)
├── public/
│   └── images/                     # Assets pulled from fusemedical.org
├── styles/
│   └── globals.css                 # Full v4 CSS ported here
└── next.config.ts
```

---

## Pages

### Home (`/`)
Sections in order: Hero → Ticker → Services → Story → Feature → Contact → Footer

### Team (`/team`)
Sections: TeamHero → TeamDirectory (sticky list left / detail panel right, JS-interactive)

### Restoration Living (`/restoration-living`)
Sections: RestHero → Mission → Values → NonDiscrimination → Testimonials → Footer

### Schedule (`/schedule`)
Sections: Schedule hero + multi-step booking flow (ScheduleFlow client component)
- Step 1: Select reason for visit (tile grid)
- Step 2: Select provider (tile grid)
- Step 3: Pick date/time (calendar UI)
- Step 4: Confirm (summary card)
All steps are UI-only. No submission, no API calls. A "Coming Soon" or "Call to schedule" fallback CTA is acceptable at this stage.

---

## Navigation

The `Nav` component is a fixed header shared across all pages via `layout.tsx`. It contains:
- Brand mark + "Fuse / Family & Behavioral Medicine"
- Links: Home, Team, Restoration Living
- Right side: location + phone (mono text) + blinking dot
- **Book Appointment** button → links to `/schedule`

Active link state is determined by current pathname (`usePathname`).

---

## Content & Images

Real photos pulled from fusemedical.org:
- Team headshots → `/public/images/team/`
- Any clinic/location photos → `/public/images/`

Any v4 CSS placeholder slots (striped gradient backgrounds) that don't have a real photo counterpart remain as-is for now. Content (bios, service descriptions, testimonials) is ported from v4's placeholder text and updated with real copy from fusemedical.org where available.

---

## Client vs Server Components

- Most components are React Server Components (no interactivity needed).
- **Client components** (`"use client"`): Nav (usePathname), TeamDirectory (click to select member), ScheduleFlow (multi-step state), Ticker (CSS animation is fine server-side, but JS scroll controls if any need client).

---

## Future Integration Points

- **Scheduling API:** `/schedule` page and `ScheduleFlow` component are the integration target. Wired up once the client selects a scheduling platform.
- **Contact form:** `Contact.tsx` will need a server action or API route + email provider (e.g. Resend) when ready.
- **Environment variables:** `.env.local` pattern established from the start so API keys can be added without restructuring.
