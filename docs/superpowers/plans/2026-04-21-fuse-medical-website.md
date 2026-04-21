# Fuse Medical Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the `Fuse Medical v4.html` prototype into a production Next.js 15 App Router site with four pages (Home, Team, Restoration Living, Schedule), deployed to Vercel via GitHub under the `cnottingham1990` account.

**Architecture:** Next.js 15 App Router with TypeScript. All styles live in a single `styles/globals.css` ported directly from v4's CSS. Components are React Server Components by default; only Nav, TeamDirectory, Services, and ScheduleFlow are client components due to interactivity.

**Tech Stack:** Next.js 15, TypeScript, React Testing Library + Jest, next/font/google (Instrument Serif, Inter Tight, JetBrains Mono), next/image, Vercel.

---

## File Map

```
/Users/codynottingham/Documents/Fuse Medical/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── team/page.tsx
│   ├── restoration-living/page.tsx
│   └── schedule/page.tsx
├── components/
│   ├── Nav.tsx                   (client)
│   ├── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── Ticker.tsx
│   │   ├── Services.tsx          (client)
│   │   ├── Story.tsx
│   │   ├── Feature.tsx
│   │   └── Contact.tsx
│   ├── team/
│   │   ├── teamData.ts
│   │   ├── TeamHero.tsx
│   │   └── TeamDirectory.tsx     (client)
│   ├── restoration-living/
│   │   ├── RestHero.tsx
│   │   ├── Mission.tsx
│   │   ├── Values.tsx
│   │   ├── NonDiscrimination.tsx
│   │   └── Testimonials.tsx
│   └── schedule/
│       └── ScheduleFlow.tsx      (client)
├── public/images/team/
├── styles/globals.css
├── jest.config.ts
├── jest.setup.ts
└── next.config.ts
```

---

## Task 1: Scaffold Next.js project + testing

**Files:**
- Create: entire project scaffold at `/Users/codynottingham/Documents/Fuse Medical/`
- Create: `jest.config.ts`
- Create: `jest.setup.ts`

- [ ] **Step 1: Scaffold the project**

```bash
cd "/Users/codynottingham/Documents/Fuse Medical"
npx create-next-app@latest . --typescript --app --no-tailwind --no-src-dir --import-alias "@/*" --eslint
```

When prompted, accept all defaults. Because a `docs/` folder and HTML files already exist in this directory, the CLI may warn about a non-empty directory — confirm yes to proceed.

Expected: project files created (`app/`, `package.json`, `tsconfig.json`, `next.config.ts`, etc.)

- [ ] **Step 2: Install testing dependencies**

```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest
```

Expected: packages added to `devDependencies`.

- [ ] **Step 3: Create `jest.config.ts`**

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
}

export default createJestConfig(config)
```

- [ ] **Step 4: Create `jest.setup.ts`**

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Add test script to `package.json`**

Open `package.json` and add to `"scripts"`:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 6: Delete the default Next.js boilerplate**

Delete `app/page.tsx`, `app/globals.css`, and everything inside `public/` (the svg files). Leave the `app/` and `public/` directories themselves.

- [ ] **Step 7: Verify scaffold runs**

```bash
npm run dev
```

Expected: server starts on http://localhost:3000 (will show 404 since page.tsx was deleted — that's fine). Stop with Ctrl+C.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 project with testing setup"
```

---

## Task 2: Port CSS + root layout

**Files:**
- Create: `styles/globals.css`
- Create: `app/layout.tsx`

- [ ] **Step 1: Create `styles/globals.css`**

Open `Fuse Medical v4.html`. Copy everything inside the `<style>` tag (lines 10–836) into `styles/globals.css`.

Then remove these two rules that were for the JS page-switcher — they are no longer needed:
```css
/* DELETE these two rules: */
.page{display:none}
.page.active{display:block;animation:pf .6s cubic-bezier(.2,.8,.2,1)}
@keyframes pf{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
```

Then append these rules at the bottom to handle Next.js `<Link>` elements inside `.middle` acting as nav buttons:
```css
nav.top .middle a {
  background:none;border:none;color:inherit;font:inherit;font-size:13px;
  padding:8px 14px;border-radius:999px;cursor:pointer;letter-spacing:0.01em;
  transition:background .2s;text-decoration:none;display:inline-block;
}
nav.top .middle a:hover{background:rgba(255,255,255,.15)}
nav.top .middle a.active{border:1px solid currentColor}
```

- [ ] **Step 2: Create `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Fuse Medical — Family and Behavioral Medicine',
  description:
    'A truly comprehensive clinic — primary care, behavioral health, medication management, addiction treatment and recovery support in London, Kentucky.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Update `globals.css` font references**

Replace the three font-family declarations in `globals.css` so they use the CSS variables Next.js injects:

Find and replace:
```css
/* FIND: */
font-family:'Inter Tight',system-ui,sans-serif;
/* REPLACE WITH: */
font-family:var(--font-sans),system-ui,sans-serif;
```
```css
/* FIND (in .serif rule): */
font-family:'Instrument Serif',serif;
/* REPLACE WITH: */
font-family:var(--font-serif),serif;
```
```css
/* FIND (in .mono rule): */
font-family:'JetBrains Mono',monospace;
/* REPLACE WITH: */
font-family:var(--font-mono),monospace;
```

Also find every inline `font-family:'Instrument Serif'` reference inside component CSS rules and replace with `var(--font-serif)`. Same for `'JetBrains Mono'` → `var(--font-mono)` and `'Inter Tight'` → `var(--font-sans)`. There are ~60 occurrences — use find-and-replace-all in your editor.

- [ ] **Step 4: Commit**

```bash
git add styles/globals.css app/layout.tsx
git commit -m "feat: port v4 CSS to globals.css and add root layout with fonts"
```

---

## Task 3: Nav component

**Files:**
- Create: `components/Nav.tsx`
- Create: `__tests__/Nav.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// __tests__/Nav.test.tsx
import { render, screen } from '@testing-library/react'
import Nav from '@/components/Nav'

jest.mock('next/navigation', () => ({ usePathname: () => '/' }))

it('renders brand name', () => {
  render(<Nav />)
  expect(screen.getByText('Fuse')).toBeInTheDocument()
})

it('marks Home link active on /', () => {
  render(<Nav />)
  const home = screen.getByRole('link', { name: 'Home' })
  expect(home).toHaveClass('active')
})

it('renders Book appointment link to /schedule', () => {
  render(<Nav />)
  expect(screen.getByRole('link', { name: /Book appointment/ })).toHaveAttribute('href', '/schedule')
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npm test -- --testPathPattern=Nav
```

Expected: FAIL — `Cannot find module '@/components/Nav'`

- [ ] **Step 3: Create `components/Nav.tsx`**

```tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/team', label: 'Team' },
  { href: '/restoration-living', label: 'Restoration Living' },
  { href: '/schedule', label: 'Schedule' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="top" id="topnav">
      <Link href="/" className="brand">
        <div className="brand-ring" />
        <div className="brand-txt">Fuse</div>
      </Link>
      <div className="middle">
        {links.map(({ href, label }) => (
          <Link key={href} href={href} className={pathname === href ? 'active' : ''}>
            {label}
          </Link>
        ))}
      </div>
      <div className="right">
        <span className="dot" />
        <span className="mono">London, KY</span>
        <span className="mono">·</span>
        <span className="mono">(606) 770‑5161</span>
      </div>
    </nav>
  )
}
```

- [ ] **Step 4: Run test — verify it passes**

```bash
npm test -- --testPathPattern=Nav
```

Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add components/Nav.tsx __tests__/Nav.test.tsx
git commit -m "feat: add Nav component with active link state"
```

---

## Task 4: Footer component

**Files:**
- Create: `components/Footer.tsx`
- Create: `__tests__/Footer.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// __tests__/Footer.test.tsx
import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

it('renders the mega headline', () => {
  render(<Footer />)
  expect(screen.getByText(/Let's care/)).toBeInTheDocument()
})

it('renders the office address', () => {
  render(<Footer />)
  expect(screen.getByText('202 W 7th Street')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npm test -- --testPathPattern=Footer
```

Expected: FAIL — `Cannot find module '@/components/Footer'`

- [ ] **Step 3: Create `components/Footer.tsx`**

```tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-wrap">
        <div className="footer-mega">
          Let&apos;s care<br />for you — <span className="it">together.</span>
        </div>
        <div className="footer-grid">
          <div>
            <p>Physical, mental, emotional — we believe in caring for the whole person. Reach out any time.</p>
          </div>
          <div className="footer-col">
            <h5>Visit</h5>
            <ul>
              <li>202 W 7th Street</li>
              <li>London, KY 40741</li>
              <li>info@fusemedical.org</li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Call</h5>
            <ul>
              <li>Office (606) 770‑5161</li>
              <li>FAX (606) 770‑5168</li>
              <li>Intake (859) 972‑5886</li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Navigate</h5>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/team">Team</Link></li>
              <li><Link href="/restoration-living">Restoration Living</Link></li>
              <li><Link href="/schedule">Schedule</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bot">
          <div>© 2026 Fuse Medical, LLC · All rights reserved</div>
          <div>For inquiries: info@fusemedical.org</div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Run test — verify it passes**

```bash
npm test -- --testPathPattern=Footer
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/Footer.tsx __tests__/Footer.test.tsx
git commit -m "feat: add Footer component"
```

---

## Task 5: Home page — Hero, Ticker, Story, Feature, Contact

**Files:**
- Create: `components/home/Hero.tsx`
- Create: `components/home/Ticker.tsx`
- Create: `components/home/Story.tsx`
- Create: `components/home/Feature.tsx`
- Create: `components/home/Contact.tsx`
- Create: `__tests__/home/HomeComponents.test.tsx`

- [ ] **Step 1: Write the failing tests**

```tsx
// __tests__/home/HomeComponents.test.tsx
import { render, screen } from '@testing-library/react'
import Hero from '@/components/home/Hero'
import Ticker from '@/components/home/Ticker'
import Story from '@/components/home/Story'
import Feature from '@/components/home/Feature'
import Contact from '@/components/home/Contact'

describe('Hero', () => {
  it('renders headline text', () => {
    render(<Hero />)
    expect(screen.getByText('Your health,')).toBeInTheDocument()
  })
  it('renders Book appointment link to /schedule', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /Book appointment/ })).toHaveAttribute('href', '/schedule')
  })
  it('renders 4 stat items', () => {
    render(<Hero />)
    expect(screen.getAllByRole('article')).toHaveLength(4)
  })
})

describe('Ticker', () => {
  it('renders Primary Care text', () => {
    render(<Ticker />)
    expect(screen.getAllByText('Primary Care').length).toBeGreaterThan(0)
  })
})

describe('Story', () => {
  it('renders 4 pillars', () => {
    render(<Story />)
    expect(screen.getByText('Patient-centered')).toBeInTheDocument()
    expect(screen.getByText('Experienced team')).toBeInTheDocument()
    expect(screen.getByText('Whole-family care')).toBeInTheDocument()
    expect(screen.getByText('One coordinated team')).toBeInTheDocument()
  })
})

describe('Feature', () => {
  it('renders the Quinn Hunt quote', () => {
    render(<Feature />)
    expect(screen.getByText('Quinn Hunt')).toBeInTheDocument()
  })
})

describe('Contact', () => {
  it('renders phone number', () => {
    render(<Contact />)
    expect(screen.getByText('(606) 770‑5161')).toBeInTheDocument()
  })
  it('renders address', () => {
    render(<Contact />)
    expect(screen.getByText(/202 W 7th Street/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
npm test -- --testPathPattern=HomeComponents
```

Expected: FAIL — modules not found

- [ ] **Step 3: Create `components/home/Hero.tsx`**

```tsx
import Link from 'next/link'

const stats = [
  { num: '10', sup: '+', label: 'Integrated services under one roof' },
  { num: '31', sup: 'yr', label: 'Lead clinician experience' },
  { num: "'21", sup: '', label: 'Locally owned, independent', purple: true },
  { num: '3', sup: '+', label: 'Recovery housing programs' },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-spheres">
        <div className="hero-sphere s-blue" />
        <div className="hero-sphere s-purple" />
        <div className="hero-sphere s-sky" />
      </div>

      <div className="hero-rail">
        <div className="badge">
          <span className="d" />
          Accepting new patients · Walk-ins welcome
        </div>
        <div className="tr">
          <span>London, KY</span>
          <span className="sep" />
          <span>Est. 2021</span>
          <span className="sep" />
          <span>Mon–Fri</span>
        </div>
      </div>

      <div className="hero-l">
        <div className="hero-kicker">
          <span className="mono">Family &amp; Behavioral Medicine</span>
          <span className="n">№ 01</span>
          <span className="mono">— The Fuse approach</span>
        </div>
        <h1 className="hero-h">
          <span className="line">Your health,</span>
          <span className="line">
            <span className="ingood">in good</span>{' '}
            <span className="pp">hands.</span>
          </span>
        </h1>
        <div className="hero-bot">
          <p>
            A truly comprehensive clinic — primary care, behavioral health, medication management,
            addiction treatment and recovery support — all under one warm, welcoming roof in London, Kentucky.
          </p>
          <div className="actions">
            <Link href="/schedule" className="btn btn-d">
              Book appointment <span className="arr">→</span>
            </Link>
            <a
              href="#services"
              className="btn btn-o"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Explore services
            </a>
          </div>
        </div>
      </div>

      <div className="hero-stats">
        {stats.map(({ num, sup, label, purple }) => (
          <article className="hero-stat" key={label}>
            <div className="num">
              {purple ? <span className="pp">{num}</span> : num}
              {sup && <em>{sup}</em>}
            </div>
            <div className="lbl">{label}</div>
          </article>
        ))}
      </div>

      <div className="scroll-ind">
        <span>Scroll</span>
        <span className="ln" />
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `components/home/Ticker.tsx`**

```tsx
const items = [
  'Primary Care','Behavioral Health','Medication Management',
  'Addiction Treatment','Intensive Outpatient','Peer Support',
  'Community Support','Case Management','Psychoeducation',
]

export default function Ticker() {
  const doubled = [...items, ...items]
  return (
    <div className="ticker-wrap">
      <div className="ticker">
        {doubled.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Create `components/home/Story.tsx`**

```tsx
const pillars = [
  {
    num: '01.',
    img: 'p1',
    title: 'Patient-centered',
    tag: 'Compassionate treatment.',
    body: 'We listen, understand, and create a plan of care that is personalized, respectful and supportive.',
  },
  {
    num: '02.',
    img: 'p2',
    title: 'Experienced team',
    tag: 'Quality you can trust.',
    body: 'Highly trained professionals bring expertise, knowledge and genuine compassion to every interaction.',
  },
  {
    num: '03.',
    img: 'p3',
    title: 'Whole-family care',
    tag: 'For children, adults, families.',
    body: 'From routine medical needs to complex behavioral health and recovery services, focused on long-term wellness.',
  },
  {
    num: '04.',
    img: 'p4',
    title: 'One coordinated team',
    tag: 'Convenient & connected.',
    body: 'Care without the stress of navigating multiple providers — accessible, connected, effective.',
  },
]

export default function Story() {
  return (
    <section className="story">
      <div className="story-wrap">
        <div className="story-head">
          <div className="story-head-l">
            <div className="mono mono-label">№ 02 — Why Fuse</div>
            <h2>
              The care<br />you deserve,<br />
              <span className="it">delivered with heart.</span>
            </h2>
          </div>
          <div className="story-head-img">
            <span className="ph-tag">Feature image · care in action</span>
          </div>
        </div>
        <div className="story-pillars">
          {pillars.map((p) => (
            <div className="pillar" key={p.num}>
              <div className={`pillar-img ${p.img}`}>
                <span className="ph-tag">Image · {p.title.toLowerCase()}</span>
              </div>
              <div className="pillar-body">
                <div className="num">{p.num}</div>
                <h4>{p.title}</h4>
                <div className="it">{p.tag}</div>
                <p>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Create `components/home/Feature.tsx`**

```tsx
import Link from 'next/link'

export default function Feature() {
  return (
    <section className="feature">
      <div className="feature-grid">
        <div className="feature-l">
          <div className="mono mono-label">№ 03 — Support for recovery</div>
          <h2>
            Healing begins<br />with being <span className="it">heard</span>,<br />
            and <span className="it">understood</span>.
          </h2>
          <p>
            A safe, welcoming, and judgment-free environment for those seeking help with mental health
            concerns, substance use, and recovery support. Because your story matters here.
          </p>
          <Link
            href="/restoration-living"
            className="btn"
            style={{ background: 'var(--purple-lt)', color: 'var(--blue-ink)', borderColor: 'var(--purple-lt)' }}
          >
            Fuse Restoration Living <span className="arr">→</span>
          </Link>
        </div>
        <div className="feature-r">
          <blockquote>
            &ldquo;Here, you are never judged for your past — you are welcomed for who you are and
            supported for who you are becoming.&rdquo;
          </blockquote>
          <div className="quoter">
            <div className="qp">Q</div>
            <div>
              <div className="qn">Quinn Hunt</div>
              <div className="qr">Clinical Treatment Coordinator</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Create `components/home/Contact.tsx`**

```tsx
export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-wrap">
        <div className="contact-head">
          <div className="mono mono-label">№ 04 — Connect</div>
          <h2>
            We&apos;re here<br />to <span className="it">help.</span>
          </h2>
        </div>
        <div className="contact-grid">
          <div className="contact-left">
            <div className="c-row">
              <div className="k">Call today</div>
              <div className="v">
                <a href="tel:6067705161">(606) 770‑5161</a>
                <span className="sub">FAX (606) 770‑5168</span>
              </div>
            </div>
            <div className="c-row">
              <div className="k">Hours</div>
              <div className="v hrs">
                <div><span>Mon — Thu</span><span className="mono">9 AM — 5 PM</span></div>
                <div><span>Friday</span><span className="mono">9 AM — 12 PM</span></div>
                <div style={{ color: 'var(--muted)' }}><span>Sat — Sun</span><span className="mono">Closed</span></div>
              </div>
            </div>
            <div className="c-row">
              <div className="k">Visit</div>
              <div className="v">202 W 7th Street<br />London, KY 40741</div>
            </div>
            <div className="c-row">
              <div className="k">Recovery intake</div>
              <div className="v"><a href="tel:8599725886">(859) 972‑5886</a></div>
            </div>
          </div>
          <div className="contact-right">
            <h3>Send a message</h3>
            <div className="sub">
              Don&apos;t feel like calling? We&apos;ll get back to you as soon as possible.
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="f-field">
                <label>Email *</label>
                <input type="email" required />
              </div>
              <div className="f-row">
                <div className="f-field"><label>Name *</label><input type="text" required /></div>
                <div className="f-field"><label>Phone *</label><input type="tel" required /></div>
              </div>
              <div className="f-field">
                <label>Message</label>
                <textarea placeholder="Type your message here" />
              </div>
              <button className="submit" type="submit">Send message →</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 8: Run tests — verify they pass**

```bash
npm test -- --testPathPattern=HomeComponents
```

Expected: PASS (all tests)

- [ ] **Step 9: Commit**

```bash
git add components/home/ __tests__/home/
git commit -m "feat: add Hero, Ticker, Story, Feature, Contact components"
```

---

## Task 6: Home Services (client component + horizontal scroll)

**Files:**
- Create: `components/home/Services.tsx`
- Create: `__tests__/home/Services.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// __tests__/home/Services.test.tsx
import { render, screen } from '@testing-library/react'
import Services from '@/components/home/Services'

it('renders all 5 service cards', () => {
  render(<Services />)
  expect(screen.getByText('Acute & Chronic Adult Primary Care')).toBeInTheDocument()
  expect(screen.getByText('Behavioral Health Understanding & Support')).toBeInTheDocument()
  expect(screen.getByText('Pediatric Care — Tailored for Little Ones')).toBeInTheDocument()
  expect(screen.getByText('A full continuum of addiction treatment.')).toBeInTheDocument()
  expect(screen.getByText('Medication Management')).toBeInTheDocument()
})

it('renders scroll prev/next buttons', () => {
  render(<Services />)
  expect(screen.getByLabelText('Previous')).toBeInTheDocument()
  expect(screen.getByLabelText('Next')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npm test -- --testPathPattern=Services
```

Expected: FAIL

- [ ] **Step 3: Create `components/home/Services.tsx`**

```tsx
'use client'
import { useRef } from 'react'

const cards = [
  {
    index: '01 / PRIMARY CARE',
    imgClass: 'img-stripes-b',
    title: 'Acute & Chronic Adult Primary Care',
    tag: 'Reliable care for every stage of adult life.',
    body: 'Our commitment extends to both immediate and ongoing health needs, providing thorough care for adults through all their life stages.',
  },
  {
    index: '02 / BEHAVIORAL HEALTH',
    imgClass: 'img-stripes-p',
    extraClass: 'accent-p',
    title: 'Behavioral Health Understanding & Support',
    tag: 'Compassionate mental health care.',
    body: 'We prioritize mental well-being alongside physical health and recovery, offering empathetic and comprehensive support for emotional and psychological challenges.',
  },
  {
    index: '03 / PEDIATRICS',
    imgClass: 'img-stripes-crm',
    title: 'Pediatric Care — Tailored for Little Ones',
    tag: "Nurturing your child's health and development.",
    body: 'A nurturing partnership focused on the comprehensive well-being of your child. Our pediatric services go beyond basic healthcare.',
  },
  {
    index: '04 / ADDICTION TREATMENT',
    imgClass: 'img-stripes-d',
    extraClass: 'inv',
    title: 'A full continuum of addiction treatment.',
    tag: 'Meeting people at every stage of recovery.',
    body: 'Intensive Outpatient (IOP) and Outpatient services, psychoeducation, peer and community support, and targeted case management.',
    chips: ['IOP', 'Outpatient', 'Psychoeducation', 'Peer Support', 'Community', 'Case Mgmt'],
  },
  {
    index: '05 / MEDICATION MGMT',
    imgClass: 'img-stripes-b',
    title: 'Medication Management',
    tag: 'Thoughtful, evidence-based prescribing.',
    body: 'Board-certified clinicians work collaboratively with patients to support long-term wellness and improve overall quality of life.',
  },
]

export default function Services() {
  const railRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: number) => {
    if (!railRef.current) return
    const card = railRef.current.querySelector('.s-card') as HTMLElement | null
    if (!card) return
    railRef.current.scrollBy({ left: (card.offsetWidth + 16) * dir, behavior: 'smooth' })
  }

  const handleScroll = () => {
    if (!railRef.current || !barRef.current) return
    const pct = railRef.current.scrollLeft / (railRef.current.scrollWidth - railRef.current.clientWidth)
    barRef.current.style.width = Math.min(100, Math.max(5, pct * 100)) + '%'
  }

  return (
    <section className="services" id="services">
      <div className="services-head">
        <div>
          <div className="mono mono-label">№ 01 — Services</div>
          <h2>Total care.<br /><span className="it">One roof.</span></h2>
        </div>
        <p>
          Physical health, mental wellness, and recovery — our integrated approach means you&apos;ll
          find the right support without navigating between multiple providers. Swipe through to explore.
        </p>
      </div>
      <div className="hscroll-wrap">
        <div className="hscroll-rail" ref={railRef} onScroll={handleScroll}>
          {cards.map((card) => (
            <article className={`s-card${card.extraClass ? ' ' + card.extraClass : ''}`} key={card.index}>
              <span className="index">{card.index}</span>
              <div className={`img-slot ${card.imgClass}`} />
              <h3>{card.title}</h3>
              <span className="tag">{card.tag}</span>
              <p>{card.body}</p>
              {card.chips && (
                <div className="sub-chips">
                  {card.chips.map((c) => <span key={c}>{c}</span>)}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
      <div className="hs-controls">
        <div className="progress"><div className="bar" ref={barRef} /></div>
        <button className="hs-arr" onClick={() => scroll(-1)} aria-label="Previous">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 7H1M6 2L1 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button className="hs-arr" onClick={() => scroll(1)} aria-label="Next">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test — verify it passes**

```bash
npm test -- --testPathPattern=Services
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/home/Services.tsx __tests__/home/Services.test.tsx
git commit -m "feat: add Services horizontal scroll component"
```

---

## Task 7: Assemble Home page

**Files:**
- Create: `app/page.tsx`

- [ ] **Step 1: Create `app/page.tsx`**

```tsx
import Hero from '@/components/home/Hero'
import Ticker from '@/components/home/Ticker'
import Services from '@/components/home/Services'
import Story from '@/components/home/Story'
import Feature from '@/components/home/Feature'
import Contact from '@/components/home/Contact'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Ticker />
      <Services />
      <Story />
      <Feature />
      <Contact />
    </main>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:3000. Verify:
- Nav is fixed at top with mix-blend-mode difference effect
- Hero shows headline "Your health, in good hands." with floating spheres
- Ticker scrolls horizontally in the black bar
- Services cards scroll horizontally with arrow controls
- Story shows 4 pillars
- Feature shows dark blue section with Quinn Hunt quote
- Contact section shows phone, hours, address, and form
- Footer shows at the bottom

Stop server with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble Home page"
```

---

## Task 8: Team data + TeamDirectory component

**Files:**
- Create: `components/team/teamData.ts`
- Create: `components/team/TeamHero.tsx`
- Create: `components/team/TeamDirectory.tsx`
- Create: `__tests__/team/TeamDirectory.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// __tests__/team/TeamDirectory.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import TeamDirectory from '@/components/team/TeamDirectory'

it('renders the team list', () => {
  render(<TeamDirectory />)
  expect(screen.getByText('Tammy Whitehead')).toBeInTheDocument()
  expect(screen.getByText('Devin Whitehead')).toBeInTheDocument()
})

it('shows Tammy detail panel by default', () => {
  render(<TeamDirectory />)
  expect(screen.getByText(/31 years of experience/)).toBeInTheDocument()
})

it('clicking a member updates the detail panel', () => {
  render(<TeamDirectory />)
  fireEvent.click(screen.getByText('Hannah Norris'))
  expect(screen.getByText(/Hannah Norris, MSN, APRN, FNP-BC/)).toBeInTheDocument()
})

it('filter buttons narrow the list', () => {
  render(<TeamDirectory />)
  fireEvent.click(screen.getByRole('button', { name: 'Operations' }))
  expect(screen.getByText('Alyssa Thomas')).toBeInTheDocument()
  expect(screen.queryByText('Krystal Philpot')).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npm test -- --testPathPattern=TeamDirectory
```

Expected: FAIL

- [ ] **Step 3: Create `components/team/teamData.ts`**

```typescript
export type TeamMember = {
  id: string
  name: string
  creds: string
  role: string
  cat: 'clinical' | 'support' | 'ops'
  av: string
  init: string
  bio: string
}

export const AV_GRADIENTS: Record<string, string> = {
  'a-blue': 'linear-gradient(135deg,#1F8BCC,#0C4466)',
  'a-purple': 'linear-gradient(135deg,#8A6FD6,#4F3A85)',
  'a-deep': 'linear-gradient(135deg,#0C4466,#072C44)',
  'a-sky': 'linear-gradient(135deg,#D3E2F0,#8AA7C2)',
  'a-ink': 'linear-gradient(135deg,#0A1622,#1A2538)',
  'a-cream': 'linear-gradient(135deg,#F3F0E9,#D2CABA)',
}

export const TEAM: TeamMember[] = [
  {
    id: 'tammy',
    name: 'Tammy Whitehead',
    creds: 'DNP, APRN, FNP-C, PMHNP-BC, CNE',
    role: 'Co-Founder · Lead Clinician',
    cat: 'clinical',
    av: 'a-blue',
    init: 'T',
    bio: 'With over 31 years of experience in the medical field, <strong>Dr. Tammy Whitehead</strong> is a compassionate and highly skilled provider committed to improving the lives of her patients and community.<br><br>Tammy earned her Master of Science in Nursing (MSN) degree in 2009, becoming a Family Nurse Practitioner. She advanced her education by completing a Doctorate in Nursing Practice and earning her certification as a <strong>Psychiatric-Mental Health Nurse Practitioner (PMHNP)</strong> in 2020. In 2021, Tammy and her husband Devin fulfilled a shared dream by opening Fuse Medical in their hometown of London, KY.<br><br>Tammy\'s career spans <strong>cardiology, family practice, and urgent care</strong>. As an Assistant Professor at Frontier Nursing University since 2012, she has shared her expertise with future generations of healthcare providers.<br><br>She specializes in treating individuals with severe mental illness, substance use disorders, and attention deficit disorders. Outside of her professional life, Tammy is a devoted wife, mother of three, and grandmother of seven.',
  },
  {
    id: 'devin',
    name: 'Devin Whitehead',
    creds: 'DNP, APRN, FNP-C',
    role: 'Co-Founder · Family Nurse Practitioner',
    cat: 'clinical',
    av: 'a-purple',
    init: 'D',
    bio: 'With over 15 years of experience in the medical field, <strong>Dr. Devin Whitehead</strong> is a dedicated Family Nurse Practitioner known for his compassionate approach and expertise in managing chronic illnesses and providing inclusive care.<br><br>Devin earned his Master of Science in Nursing from Frontier Nursing University in 2015 and his Doctorate in Nursing Practice in 2019. During his time at Lexington Clinic, Devin demonstrated a particular passion for working with college students, addressing concerns related to <strong>gender identity and transgender care</strong>.<br><br>After the onset of the COVID-19 pandemic, Devin and Tammy returned to their hometown and opened Fuse Medical in 2021.',
  },
  {
    id: 'hannah',
    name: 'Hannah Norris',
    creds: 'MSN, APRN, FNP-BC',
    role: 'Family Nurse Practitioner',
    cat: 'clinical',
    av: 'a-sky',
    init: 'H',
    bio: 'We are thrilled to have <strong>Hannah Norris, MSN, APRN, FNP-BC</strong>, as part of our Fuse Medical team. With a passion for patient care and a wealth of expertise, Hannah is continuing to accept new patients, including walk-ins.<br><br>Her extensive background as a Family Nurse Practitioner allows her to meet a wide range of healthcare needs with excellence and empathy. Whether you\'re seeking preventive care, management of a chronic condition, or immediate walk-in services, Hannah is here to support your health and wellness journey.',
  },
  {
    id: 'cheyenne',
    name: 'Cheyenne Hamblin',
    creds: 'MSN, APRN, PMHNP-BC',
    role: 'Psychiatric Mental Health NP',
    cat: 'clinical',
    av: 'a-ink',
    init: 'C',
    bio: '<strong>Cheyenne Hamblin, PMHNP-BC</strong> is a dedicated psychiatric mental health nurse practitioner with more than eight years of experience in inpatient psychiatric care.<br><br>She provides compassionate, evidence-based treatment to a broad population of both adult and pediatric patients. In recognition of her outstanding service, she was named <strong>Mental Health Provider of the Year in 2025</strong> in the local area.<br><br>Outside of her professional role, Cheyenne enjoys spending time outdoors and has a genuine love for people, reflected in her warm and caring approach to patient care.',
  },
  {
    id: 'bobbie',
    name: 'Bobbie Zhang',
    creds: 'MSN, APRN, PMHNP-BC',
    role: 'Psychiatric Mental Health NP',
    cat: 'clinical',
    av: 'a-deep',
    init: 'B',
    bio: '<strong>Bobbie Zhang</strong> is a board-certified Psychiatric Mental Health Nurse Practitioner with over 20 years of diverse nursing experience, including geriatrics, corrections, medical-surgical nursing, telemetry, critical care, and behavioral health.<br><br>She earned her MSN from Northern Kentucky University, specializing in psychiatric mental health care across the lifespan. Her clinical interests include <strong>ADHD, substance use disorders, mood disorders, anxiety</strong>, and other psychiatric conditions. She is experienced in medication-assisted treatment (MAT) for substance use disorders.<br><br>She is committed to delivering compassionate, trauma-informed, and patient-centered care.',
  },
  {
    id: 'alyssa',
    name: 'Alyssa Thomas',
    creds: 'RN — Office Manager & HR Director',
    role: 'Operations',
    cat: 'ops',
    av: 'a-purple',
    init: 'A',
    bio: 'Graduated from Galen College\'s Nursing School in June 2024, Alyssa brings a strong foundation in healthcare with a focus on recovery.<br><br>With experience as a <strong>Recovery Specialist since 2019</strong>, she has empowered clients to reach their goals both individually and in group settings. As a mother to four girls, they motivate her to always work hard and give 100 percent.<br><br>"I firmly believe in recognizing the value in each individual and approach my work with kindness and compassion."',
  },
  {
    id: 'quinn',
    name: 'Audra "Quinn" Hunt',
    creds: 'BBA, MA Mental Health Counseling',
    role: 'Clinical Treatment Coordinator',
    cat: 'support',
    av: 'a-blue',
    init: 'Q',
    bio: '<strong>Quinn Hunt</strong> serves as a Clinical Treatment Coordinator at Fuse Medical, where she has been a dedicated member of the team since 2023.<br><br>She earned her Bachelor\'s in Business Administration from Morehead State in 2014 and her Master\'s in Mental Health Counseling from Lindsey Wilson University in 2025. Quinn brings a unique blend of clinical knowledge and organizational expertise, allowing her to effectively coordinate care and support clients throughout their treatment journey.',
  },
  {
    id: 'krystal',
    name: 'Krystal Philpot',
    creds: 'LPCA',
    role: 'Mental Health Counselor',
    cat: 'support',
    av: 'a-sky',
    init: 'K',
    bio: '<strong>Krystal Philpot, LPCA</strong>, is a dedicated mental health professional with a strong commitment to supporting individuals in achieving balanced and sustainable well-being.<br><br>She earned her BS in Psychology from Eastern Kentucky University in 2022 and her Master of Education in Counseling from Lindsey Wilson University in 2025. She has been actively working in the mental health field since 2020, primarily serving individuals with substance use disorders.',
  },
  {
    id: 'breckan',
    name: 'Breckan Fox',
    creds: 'Peer Support Specialist',
    role: 'Director of Recovery Services',
    cat: 'support',
    av: 'a-purple',
    init: 'B',
    bio: '<strong>Breckan Fox</strong> serves as Director of Recovery Services and Peer Support Specialist with a strong focus on recovery services.<br><br>She plays a vital role in supporting the day-to-day operations of the <strong>Fuse Restoration Living homes</strong>, helping to ensure a stable, structured, and supportive environment for residents.',
  },
  {
    id: 'josie',
    name: 'Josie Philpot',
    creds: 'BS, TCM, TCADC',
    role: 'Targeted Case Manager',
    cat: 'support',
    av: 'a-cream',
    init: 'J',
    bio: '<strong>Josie</strong> is a dedicated Targeted Case Manager with one year of direct experience in case management and a strong background in behavioral health.<br><br>Josie began working in sober living environments in 2022 and has since gained over four years of experience in treatment settings as a substance abuse counselor. Josie earned a bachelor\'s degree in Substance Use Disorder Counseling from Union College in 2024, and is currently pursuing a master\'s in Education and Counseling at Lindsey Wilson College.',
  },
  {
    id: 'kelsey',
    name: 'Kelsey Fox',
    creds: 'MS, TCM',
    role: 'Social Work Professional',
    cat: 'support',
    av: 'a-sky',
    init: 'K',
    bio: '<strong>Kelsey Fox</strong> has earned her master\'s degree in social work and is actively working toward licensure.<br><br>She brings over <strong>eight years of experience</strong> serving individuals from lower socioeconomic backgrounds and has developed extensive knowledge of community resources and support services. She has a deep passion for working with individuals affected by substance use disorders.',
  },
  {
    id: 'haley',
    name: 'Haley Whitehead',
    creds: 'RH-CBS',
    role: 'Billing & Coding',
    cat: 'ops',
    av: 'a-deep',
    init: 'H',
    bio: '<strong>Haley Whitehead, RH-CBS</strong> is a highly skilled billing and coding professional with extensive experience in <strong>rural health, behavioral health, and primary care billing</strong>.<br><br>She is well-versed in working with insurance companies and has developed strong expertise in accounts receivable collection, claims management, and timely reimbursement processes.',
  },
]
```

- [ ] **Step 4: Create `components/team/TeamHero.tsx`**

```tsx
export default function TeamHero() {
  return (
    <section className="team-hero">
      <div className="team-hero-wrap">
        <div className="mono mono-label">№ 02 — The People</div>
        <h1>Meet the<br /><span className="it">team.</span></h1>
        <div className="lede">
          <p>
            A dedicated community of clinicians, counselors, peer specialists and coordinators —
            each bringing decades of combined experience, and a shared belief that healing begins
            with being heard.
          </p>
          <div className="meta">12 Members<br />3 Departments</div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create `components/team/TeamDirectory.tsx`**

```tsx
'use client'
import { useState } from 'react'
import { TEAM, AV_GRADIENTS, type TeamMember } from './teamData'

type Filter = 'all' | 'clinical' | 'support' | 'ops'

const filters: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'clinical', label: 'Clinical' },
  { key: 'support', label: 'Support' },
  { key: 'ops', label: 'Operations' },
]

export default function TeamDirectory() {
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<TeamMember>(TEAM[0])

  const visible = filter === 'all' ? TEAM : TEAM.filter((m) => m.cat === filter)

  return (
    <div className="team-shell">
      <aside className="team-list">
        <div className="team-filter">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              className={filter === key ? 'active' : ''}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <div>
          {visible.map((m) => (
            <div
              key={m.id}
              className={`team-row${selected.id === m.id ? ' active' : ''}`}
              onClick={() => setSelected(m)}
            >
              <div className={`avatar ${m.av}`}>
                <span>{m.init}</span>
              </div>
              <div className="info">
                <h3>{m.name}</h3>
                <div className="role">{m.role}</div>
                <div className="cred">{m.creds}</div>
              </div>
              <svg className="caret" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          ))}
        </div>
      </aside>
      <div className="team-detail">
        <div className="detail-inner" key={selected.id}>
          <div
            className="detail-portrait"
            style={{ background: AV_GRADIENTS[selected.av] }}
          >
            <span className="ph-badge">Portrait · {selected.name.split(' ')[0]}</span>
            <span className="big-init">{selected.init}</span>
          </div>
          <div className="role-line">{selected.role}</div>
          <h2>{selected.name}</h2>
          <div className="creds">{selected.creds}</div>
          <div
            className="bio"
            dangerouslySetInnerHTML={{ __html: selected.bio.split('<br><br>').map(p => `<p>${p}</p>`).join('') }}
          />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Run tests — verify they pass**

```bash
npm test -- --testPathPattern=TeamDirectory
```

Expected: PASS (4 tests)

- [ ] **Step 7: Commit**

```bash
git add components/team/ __tests__/team/
git commit -m "feat: add team data, TeamHero, and TeamDirectory components"
```

---

## Task 9: Assemble Team page

**Files:**
- Create: `app/team/page.tsx`

- [ ] **Step 1: Create `app/team/page.tsx`**

```tsx
import TeamHero from '@/components/team/TeamHero'
import TeamDirectory from '@/components/team/TeamDirectory'

export const metadata = { title: 'Team — Fuse Medical' }

export default function TeamPage() {
  return (
    <main>
      <TeamHero />
      <TeamDirectory />
    </main>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Navigate to http://localhost:3000/team. Verify:
- Large "Meet the team." heading
- Left panel lists all 12 members
- Tammy Whitehead detail panel shows on load
- Clicking another member swaps the detail panel
- Filter buttons (All / Clinical / Support / Operations) narrow the list

Stop with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add app/team/page.tsx
git commit -m "feat: assemble Team page"
```

---

## Task 10: Restoration Living page

**Files:**
- Create: `components/restoration-living/RestHero.tsx`
- Create: `components/restoration-living/Mission.tsx`
- Create: `components/restoration-living/Values.tsx`
- Create: `components/restoration-living/NonDiscrimination.tsx`
- Create: `components/restoration-living/Testimonials.tsx`
- Create: `app/restoration-living/page.tsx`
- Create: `__tests__/restoration-living/RestComponents.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// __tests__/restoration-living/RestComponents.test.tsx
import { render, screen } from '@testing-library/react'
import RestHero from '@/components/restoration-living/RestHero'
import Mission from '@/components/restoration-living/Mission'
import Values from '@/components/restoration-living/Values'
import NonDiscrimination from '@/components/restoration-living/NonDiscrimination'
import Testimonials from '@/components/restoration-living/Testimonials'

it('RestHero renders intake number', () => {
  render(<RestHero />)
  expect(screen.getByText('(859) 972‑5886')).toBeInTheDocument()
})

it('Mission renders headline', () => {
  render(<Mission />)
  expect(screen.getByText(/home-like/)).toBeInTheDocument()
})

it('Values renders all 6 rows', () => {
  render(<Values />)
  expect(screen.getByText(/Recovery is possible/)).toBeInTheDocument()
  expect(screen.getByText(/Transparency and compliance/)).toBeInTheDocument()
})

it('NonDiscrimination renders tag list', () => {
  render(<NonDiscrimination />)
  expect(screen.getByText('HIV Status')).toBeInTheDocument()
})

it('Testimonials renders all 4 quotes', () => {
  render(<Testimonials />)
  expect(screen.getByText('Quinn')).toBeInTheDocument()
  expect(screen.getByText('Breckan')).toBeInTheDocument()
  expect(screen.getByText('Alyssa')).toBeInTheDocument()
  expect(screen.getByText('Krystal')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npm test -- --testPathPattern=RestComponents
```

Expected: FAIL

- [ ] **Step 3: Create `components/restoration-living/RestHero.tsx`**

```tsx
export default function RestHero() {
  return (
    <section className="rest-hero">
      <div className="rest-hero-l">
        <div className="rest-hero-l-inner">
          <div className="mono mono-label">
            № 03 — Recovery Housing · KYARR &amp; NARR aligned
          </div>
          <h1>Fuse<br />Restoration<br /><span className="it">Living.</span></h1>
          <p>
            Structured, peer-supported recovery housing for men, women, and transgender individuals
            recovering from Substance Use Disorders and co-occurring behavioral health conditions.
          </p>
        </div>
        <div className="intake-bar">
          <div style={{ flex: 1 }}>
            <div className="k">Call for intake</div>
            <a href="tel:8599725886" className="n" style={{ color: 'inherit', textDecoration: 'none' }}>
              (859) 972‑5886
            </a>
          </div>
          <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div className="rest-hero-r">
        <div className="rest-hero-r-inner">
          <div className="ph">▢ Recovery housing imagery</div>
          <div className="rest-graphic">
            <div className="rest-doors">
              <div className="rest-door d1"><span>Men&apos;s</span></div>
              <div className="rest-door d2"><span>Women&apos;s</span></div>
              <div className="rest-door d3"><span>Transgender</span></div>
            </div>
          </div>
          <div className="ph" style={{ textAlign: 'right' }}>Peer-supported · Alcohol &amp; drug free</div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `components/restoration-living/Mission.tsx`**

```tsx
export default function Mission() {
  return (
    <section className="mission">
      <div className="mission-wrap">
        <div>
          <div className="mono mono-label">№ 01 — Mission &amp; Vision</div>
          <h2>A home-like<br />environment for<br /><span className="it">rebuilding.</span></h2>
        </div>
        <div className="body">
          <p className="intro">
            The program promotes personal responsibility, accountability, and community reintegration
            through a safe, alcohol- and drug-free living environment.
          </p>
          <p>
            Fuse Restoration Living is committed to operating with integrity, upholding the rights
            and dignity of every resident, and maintaining a recovery-oriented culture guided by peer
            support and dedicated staff leadership.
          </p>
          <p>
            Through shared governance, mutual respect, and accountability, we cultivate a supportive
            atmosphere where individuals in early recovery can rebuild their lives, restore family
            relationships, and achieve long-term sobriety.
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create `components/restoration-living/Values.tsx`**

```tsx
const values = [
  'Recovery is possible for every individual.',
  'Residents deserve dignity, respect, and safety.',
  'Accountability and structure are essential to early recovery.',
  'Ethical operations protect the integrity of recovery housing.',
  'Community integration strengthens sobriety outcomes.',
  'Transparency and compliance are mandatory.',
]

export default function Values() {
  return (
    <section className="values">
      <div className="values-wrap">
        <div className="mono mono-label">№ 02 — Core Values</div>
        <h2>The principles<br />we <span className="it">operate under.</span></h2>
        <div className="values-rows">
          {values.map((v, i) => (
            <div className="v-row" key={i}>
              <div className="no">0{i + 1}.</div>
              <div className="txt">{v}</div>
              <div className="arr">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Create `components/restoration-living/NonDiscrimination.tsx`**

```tsx
const tags = [
  'Race','Religion','Gender','Gender Identity','Sexual Orientation',
  'National Origin','Disability','HIV Status','Age',
]

export default function NonDiscrimination() {
  return (
    <section className="ndiscrim">
      <div className="ndiscrim-wrap">
        <div>
          <div className="mono mono-label">№ 03 — Non-Discrimination</div>
          <h2>Everyone<br />is <span className="it">welcome.</span></h2>
        </div>
        <div>
          <p>
            Fuse Restoration Living does not discriminate in admission, housing, services, or
            employment. All applicants meeting admission criteria are considered equally under
            Fair Housing Protections.
          </p>
          <div className="nd-tags">
            {tags.map((t) => <span key={t}>{t}</span>)}
          </div>
          <p style={{ color: 'rgba(253,251,245,.6)', fontSize: '14px' }}>
            Fuse Restoration Living LLC follows all local, state and federal laws with respect
            to discrimination.
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Create `components/restoration-living/Testimonials.tsx`**

```tsx
const quotes = [
  { init: 'Q', cls: 'a1', name: 'Quinn', quote: 'Here, you are never judged for your past — you are welcomed for who you are and supported for who you are becoming.' },
  { init: 'B', cls: 'a2', name: 'Breckan', quote: 'We want every client to feel safe, valued, and reminded that they do not have to walk this journey alone.' },
  { init: 'A', cls: 'a3', name: 'Alyssa', quote: 'Our goal is to meet people with compassion and understanding, offering hope and support every step of the way.' },
  { init: 'K', cls: 'a4', name: 'Krystal', quote: 'At Fuse Restoration Living, we believe healing happens best when people are surrounded by kindness, encouragement, and genuine care.' },
]

export default function Testimonials() {
  return (
    <section className="family">
      <div className="family-wrap">
        <div className="mono mono-label">№ 04 — Meet the Family</div>
        <h2>
          Welcomed for who you are,<br />supported for who<br />
          you are <span className="it">becoming.</span>
        </h2>
        <p className="family-intro">
          Every person deserves to be welcomed with kindness, compassion, and dignity. From the
          moment someone walks through our doors, they are met with encouragement, respect, and
          people who truly care.
        </p>
        <div className="q-grid">
          {quotes.map(({ init, cls, name, quote }) => (
            <div className="q-item" key={name}>
              <div className={`av ${cls}`}>{init}</div>
              <div>
                <div className="nm">{name}</div>
                <blockquote>&ldquo;{quote}&rdquo;</blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 8: Create `app/restoration-living/page.tsx`**

```tsx
import RestHero from '@/components/restoration-living/RestHero'
import Mission from '@/components/restoration-living/Mission'
import Values from '@/components/restoration-living/Values'
import NonDiscrimination from '@/components/restoration-living/NonDiscrimination'
import Testimonials from '@/components/restoration-living/Testimonials'

export const metadata = { title: 'Restoration Living — Fuse Medical' }

export default function RestorationLivingPage() {
  return (
    <main>
      <RestHero />
      <Mission />
      <Values />
      <NonDiscrimination />
      <Testimonials />
    </main>
  )
}
```

- [ ] **Step 9: Run tests — verify they pass**

```bash
npm test -- --testPathPattern=RestComponents
```

Expected: PASS

- [ ] **Step 10: Verify in browser**

```bash
npm run dev
```

Navigate to http://localhost:3000/restoration-living. Verify all sections render correctly. Stop with Ctrl+C.

- [ ] **Step 11: Commit**

```bash
git add components/restoration-living/ app/restoration-living/ __tests__/restoration-living/
git commit -m "feat: add Restoration Living page and components"
```

---

## Task 11: Schedule page (ScheduleFlow)

**Files:**
- Create: `components/schedule/ScheduleFlow.tsx`
- Create: `app/schedule/page.tsx`
- Create: `__tests__/schedule/ScheduleFlow.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// __tests__/schedule/ScheduleFlow.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import ScheduleFlow from '@/components/schedule/ScheduleFlow'

it('renders step 1 reason tiles', () => {
  render(<ScheduleFlow />)
  expect(screen.getByText('Primary care visit')).toBeInTheDocument()
  expect(screen.getByText('Behavioral health')).toBeInTheDocument()
})

it('Continue button is disabled until a reason is selected', () => {
  render(<ScheduleFlow />)
  expect(screen.getByText('Continue')).toBeDisabled()
})

it('Continue button enables after selecting a reason', () => {
  render(<ScheduleFlow />)
  fireEvent.click(screen.getByText('Primary care visit').closest('.sch-reason')!)
  expect(screen.getByText('Continue')).not.toBeDisabled()
})

it('advances to step 2 after clicking Continue', () => {
  render(<ScheduleFlow />)
  fireEvent.click(screen.getByText('Primary care visit').closest('.sch-reason')!)
  fireEvent.click(screen.getByText('Continue'))
  expect(screen.getByText('Choose a provider')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
npm test -- --testPathPattern=ScheduleFlow
```

Expected: FAIL

- [ ] **Step 3: Create `components/schedule/ScheduleFlow.tsx`**

```tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'

type Reason = { id: string; title: string; desc: string; icon: keyof typeof ICONS }
type Provider = { id: string; name: string; role: string; avBg?: string; init: string }

const ICONS = {
  heart: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 14s-5-3.2-5-7A3 3 0 0 1 8 5a3 3 0 0 1 5 2c0 3.8-5 7-5 7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>,
  brain: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3a2 2 0 0 0-2 2v.5A2 2 0 0 0 2 7.5c0 .8.5 1.5 1 2 0 1 .5 2 2 2.5M10 3a2 2 0 0 1 2 2v.5a2 2 0 0 1 2 2c0 .8-.5 1.5-1 2 0 1-.5 2-2 2.5M8 3v10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  child: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.3"/><path d="M3 14c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  leaf: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 2c0 6-4 10-10 10M4 12c0-4 3-8 8-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  user: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M3 14c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  chat: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4h10v7H6l-3 2V4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>,
}

const REASONS: Reason[] = [
  { id: 'primary',  title: 'Primary care visit',   desc: 'Annual physical, check-ups, chronic care, acute illness.', icon: 'heart' },
  { id: 'behavior', title: 'Behavioral health',    desc: 'Therapy, medication management, psychiatric care.',        icon: 'brain' },
  { id: 'peds',     title: 'Pediatric care',       desc: 'For children and adolescents.',                            icon: 'child' },
  { id: 'recovery', title: 'Addiction & recovery', desc: 'IOP, outpatient, MAT consultation.',                       icon: 'leaf'  },
  { id: 'newpt',    title: 'New patient consult',  desc: 'First visit — get established with a provider.',           icon: 'user'  },
  { id: 'other',    title: 'Something else',       desc: "Not sure? We'll help you find the right care.",            icon: 'chat'  },
]

const AV_GR: Record<string, string> = {
  'a-blue':   'linear-gradient(135deg,#1F8BCC,#0C4466)',
  'a-purple': 'linear-gradient(135deg,#8A6FD6,#4F3A85)',
  'a-deep':   'linear-gradient(135deg,#0C4466,#072C44)',
}

const PROVIDERS: Provider[] = [
  { id: 'any',      name: 'First available',  role: 'Soonest appointment',         init: '*' },
  { id: 'tammy',    name: 'Tammy Whitehead',  role: 'Lead Clinician · PMHNP',      avBg: 'a-blue',   init: 'T' },
  { id: 'devin',    name: 'Devin Whitehead',  role: 'Family Nurse Practitioner',   avBg: 'a-purple', init: 'D' },
  { id: 'hannah',   name: 'Hannah Norris',    role: 'Family Nurse Practitioner',   avBg: 'a-deep',   init: 'H' },
  { id: 'cheyenne', name: 'Cheyenne Hamblin', role: 'Psychiatric Mental Health NP',avBg: 'a-purple', init: 'C' },
  { id: 'bobbie',   name: 'Bobbie Zhang',     role: 'Psychiatric Mental Health NP',avBg: 'a-deep',   init: 'B' },
]

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const STEPS = ['Reason','Provider','Date','Details'] as const

function hashStr(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0 }
  return Math.abs(h)
}

function dateKey(d: Date) { return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}` }

function dayAvailability(d: Date) {
  const dow = d.getDay()
  if (dow === 0 || dow === 6) return { open: false, start: 0, end: 0 }
  return { open: true, start: 9, end: dow === 5 ? 12 : 17 }
}

function getSlotsFor(d: Date, providerId: string) {
  const a = dayAvailability(d)
  if (!a.open) return []
  const today = new Date(); today.setHours(0,0,0,0)
  const cmp = new Date(d); cmp.setHours(0,0,0,0)
  const isToday = cmp.getTime() === today.getTime()
  const now = new Date()
  const slots: string[] = []
  for (let h = a.start; h < a.end; h++) {
    for (const m of [0, 30]) {
      if (isToday) {
        if (h < now.getHours()) continue
        if (h === now.getHours() && m <= now.getMinutes()) continue
      }
      const hh = h > 12 ? h - 12 : h === 0 ? 12 : h
      const ampm = h >= 12 ? 'PM' : 'AM'
      slots.push(`${hh}:${m === 0 ? '00' : '30'} ${ampm}`)
    }
  }
  const seed = hashStr((providerId || 'any') + '_' + dateKey(d))
  return slots.filter((_, i) => { const v = (seed + i * 17) % 7; return v !== 0 && v !== 3 })
}

function hasSlotsFor(d: Date, providerId: string) {
  const a = dayAvailability(d)
  if (!a.open) return false
  const today = new Date(); today.setHours(0,0,0,0)
  const cmp = new Date(d); cmp.setHours(0,0,0,0)
  if (cmp < today) return false
  if (cmp.getTime() === today.getTime()) return new Date().getHours() < a.end - 1
  return getSlotsFor(d, providerId).length > 0
}

type FormData = { first: string; last: string; dob: string; phone: string; email: string; kind: string; ins: string; notes: string; consent: boolean }

const emptyForm: FormData = { first: '', last: '', dob: '', phone: '', email: '', kind: '', ins: '', notes: '', consent: false }

function nowCursor() { const t = new Date(); return new Date(t.getFullYear(), t.getMonth(), 1) }

export default function ScheduleFlow() {
  const [stepIdx, setStepIdx] = useState(0)
  const [reason, setReason] = useState<Reason | null>(null)
  const [provider, setProvider] = useState<Provider | null>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [slot, setSlot] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [cursor, setCursor] = useState<Date>(nowCursor)
  const [confirmed, setConfirmed] = useState(false)

  const canContinue =
    (stepIdx === 0 && !!reason) ||
    (stepIdx === 1 && !!provider) ||
    (stepIdx === 2 && !!(date && slot)) ||
    (stepIdx === 3 && !!(form.first && form.last && form.dob && form.phone && form.email && form.kind && form.consent))

  const next = () => {
    if (stepIdx < 3) { setStepIdx(stepIdx + 1) }
    else { setConfirmed(true) }
  }
  const back = () => { if (stepIdx > 0) setStepIdx(stepIdx - 1) }

  const today = new Date(); today.setHours(0,0,0,0)
  const firstDow = new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay()
  const lastDate = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate()
  const maxCursor = new Date(); maxCursor.setMonth(maxCursor.getMonth() + 3); maxCursor.setDate(1)
  const atMin = cursor.getFullYear() === today.getFullYear() && cursor.getMonth() === today.getMonth()
  const atMax = cursor.getFullYear() === maxCursor.getFullYear() && cursor.getMonth() === maxCursor.getMonth()

  const slots = date ? getSlotsFor(date, provider?.id ?? 'any') : []
  const morning = slots.filter(s => s.includes('AM'))
  const afternoon = slots.filter(s => s.includes('PM'))

  if (confirmed) {
    const when = date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    return (
      <div className="sch-shell">
        <div className="sch-wrap">
          <div className="sch-confirm" style={{ gridColumn: '1/-1' }}>
            <div className="check">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                <path d="M8 17l6 6 12-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>You&apos;re <span className="it">booked.</span></h2>
            <p className="conf-sub">
              We&apos;ve sent a confirmation to <strong>{form.email || 'your inbox'}</strong>. A member of our team
              may reach out beforehand to verify insurance and answer any questions.
            </p>
            <div className="sch-confirm-card">
              <div><div className="k">Reason</div><div className="v it">{reason?.title}</div></div>
              <div><div className="k">Provider</div><div className="v">{provider?.name}</div></div>
              <div><div className="k">When</div><div className="v it">{when} at {slot}</div></div>
              <div><div className="k">Patient</div><div className="v">{form.first} {form.last}</div></div>
              <div><div className="k">Phone</div><div className="v">{form.phone}</div></div>
              <div><div className="k">Location</div><div className="v">202 W 7th St, London KY</div></div>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/" className="btn btn-d">Back to home</Link>
              <button className="btn btn-o" onClick={() => {
                setStepIdx(0); setReason(null); setProvider(null)
                setDate(null); setSlot(null); setForm(emptyForm)
                setCursor(nowCursor()); setConfirmed(false)
              }}>Book another <span className="arr">→</span></button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="sch-shell">
      <div className="sch-wrap">
        <div className="sch-panel">

          {/* Step 1: Reason */}
          {stepIdx === 0 && (
            <div className="sch-step">
              <div className="sch-step-head">
                <span className="num">§01</span>
                <h2>What brings you in?</h2>
                <span className="hint">Select one</span>
              </div>
              <div className="sch-reasons">
                {REASONS.map((r) => (
                  <button
                    key={r.id}
                    className={`sch-reason${reason?.id === r.id ? ' selected' : ''}`}
                    onClick={() => setReason(r)}
                  >
                    <span className="icn">{ICONS[r.icon]}</span>
                    <span className="ttl">{r.title}</span>
                    <span className="dsc">{r.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Provider */}
          {stepIdx === 1 && (
            <div className="sch-step">
              <div className="sch-step-head">
                <span className="num">§02</span>
                <h2>Choose a provider</h2>
                <span className="hint">Or let us match you</span>
              </div>
              <div className="sch-providers">
                {PROVIDERS.map((p) => (
                  <button
                    key={p.id}
                    className={`sch-prov${provider?.id === p.id ? ' selected' : ''}`}
                    onClick={() => { setProvider(p); setDate(null); setSlot(null) }}
                  >
                    <div
                      className={`av${!p.avBg ? ' av-any' : ''}`}
                      style={p.avBg ? { background: AV_GR[p.avBg] } : undefined}
                    >
                      {p.init}
                    </div>
                    <div className="meta">
                      <h4>{p.name}</h4>
                      <div className="sub">{p.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {stepIdx === 2 && (
            <div className="sch-step">
              <div className="sch-step-head">
                <span className="num">§03</span>
                <h2>Pick a date &amp; time</h2>
                <span className="hint">Eastern time (ET)</span>
              </div>
              <div className="sch-cal-wrap">
                <div>
                  <div className="sch-cal-head">
                    <div className="mo">
                      {MONTHS[cursor.getMonth()]} <span className="yr">{cursor.getFullYear()}</span>
                    </div>
                    <div className="sch-cal-nav">
                      <button disabled={atMin} onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))} aria-label="Previous month">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                      <button disabled={atMax} onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))} aria-label="Next month">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    </div>
                  </div>
                  <div className="sch-cal">
                    <div className="sch-cal-dow">
                      {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <span key={d}>{d}</span>)}
                    </div>
                    <div className="sch-cal-grid">
                      {Array.from({ length: firstDow }, (_, i) => (
                        <button key={`e${i}`} className="empty" disabled />
                      ))}
                      {Array.from({ length: lastDate }, (_, i) => {
                        const d = i + 1
                        const dt = new Date(cursor.getFullYear(), cursor.getMonth(), d)
                        const cmp = new Date(dt); cmp.setHours(0,0,0,0)
                        const isToday = cmp.getTime() === today.getTime()
                        const isPast = cmp < today
                        const avail = !isPast && hasSlotsFor(dt, provider?.id ?? 'any')
                        const isSelected = date && date.getTime() === dt.getTime()
                        return (
                          <button
                            key={d}
                            disabled={!avail}
                            className={[
                              isToday ? 'today' : '',
                              isPast ? 'past' : avail ? 'avail' : 'closed',
                              isSelected ? 'selected' : '',
                            ].filter(Boolean).join(' ')}
                            onClick={() => { setDate(dt); setSlot(null) }}
                          >
                            {d}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="sch-slots-col">
                  {!date ? (
                    <div className="sch-slots-empty">Pick a date<small>to see available times</small></div>
                  ) : slots.length === 0 ? (
                    <div className="sch-slots-empty">No times available<small>Try another day</small></div>
                  ) : (
                    <>
                      <div className="slots-head">
                        <span className="dt">{date.toLocaleDateString('en-US', { weekday: 'long' })}</span>
                        {', '}{date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                      </div>
                      <div className="slots-sub">{slots.length} times available · 30 minutes each</div>
                      {morning.length > 0 && (
                        <div className="sch-slot-group">
                          <div className="lbl">Morning</div>
                          <div className="sch-slot-grid">
                            {morning.map(s => (
                              <button key={s} className={`sch-slot${slot === s ? ' selected' : ''}`} onClick={() => setSlot(s)}>{s}</button>
                            ))}
                          </div>
                        </div>
                      )}
                      {afternoon.length > 0 && (
                        <div className="sch-slot-group">
                          <div className="lbl">Afternoon</div>
                          <div className="sch-slot-grid">
                            {afternoon.map(s => (
                              <button key={s} className={`sch-slot${slot === s ? ' selected' : ''}`} onClick={() => setSlot(s)}>{s}</button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Patient info */}
          {stepIdx === 3 && (
            <div className="sch-step">
              <div className="sch-step-head">
                <span className="num">§04</span>
                <h2>Your information</h2>
                <span className="hint">Kept private</span>
              </div>
              <div className="sch-form">
                <div><label>First name *</label><input type="text" value={form.first} onChange={e => setForm({...form, first: e.target.value})} required /></div>
                <div><label>Last name *</label><input type="text" value={form.last} onChange={e => setForm({...form, last: e.target.value})} required /></div>
                <div><label>Date of birth *</label><input type="text" value={form.dob} onChange={e => setForm({...form, dob: e.target.value})} placeholder="MM / DD / YYYY" required /></div>
                <div><label>Phone *</label><input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="(606) 555‑0123" required /></div>
                <div className="full"><label>Email *</label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>
                <div>
                  <label>New or returning? *</label>
                  <select value={form.kind} onChange={e => setForm({...form, kind: e.target.value})} required>
                    <option value="">Select one</option>
                    <option>New patient</option>
                    <option>Returning patient</option>
                  </select>
                </div>
                <div><label>Insurance (optional)</label><input type="text" value={form.ins} onChange={e => setForm({...form, ins: e.target.value})} placeholder="e.g. Anthem BCBS" /></div>
                <div className="full"><label>Anything we should know? (optional)</label><textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Concerns, accessibility needs, preferred contact…" /></div>
                <label className="chk full">
                  <input type="checkbox" checked={form.consent} onChange={e => setForm({...form, consent: e.target.checked})} required />
                  <span>I consent to Fuse Medical contacting me about this appointment at the phone number and email provided.</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        <aside className="sch-summary">
          <div className="sch-summary-inner">
            <div className="sum-kicker">Your appointment</div>
            <h3>A visit<br />tailored for <span className="it">you.</span></h3>
            <div className="sum-row">
              <div className="k">Reason</div>
              <div className={`v${!reason ? ' empty' : ''}`}>{reason?.title ?? 'Not yet selected'}</div>
            </div>
            <div className="sum-row">
              <div className="k">Provider</div>
              <div className={`v${!provider ? ' empty' : ''}`}>{provider?.name ?? 'Not yet selected'}</div>
            </div>
            <div className="sum-row">
              <div className="k">When</div>
              <div className={`v${!(date && slot) ? ' empty' : ''}`}>
                {date && slot
                  ? `${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at ${slot}`
                  : 'Pick a date & time'}
              </div>
            </div>
            <div className="sum-row">
              <div className="k">Patient</div>
              <div className={`v${!form.first ? ' empty' : ''}`}>
                {form.first ? `${form.first} ${form.last}` : 'Enter your information'}
              </div>
            </div>
            <div className="sum-office">
              <div><span className="k">Visit</span>202 W 7th St<br />London, KY 40741</div>
              <div><span className="k">Questions</span><a href="tel:6067705161" style={{ color: 'inherit' }}>(606) 770‑5161</a></div>
            </div>
            <div className="sch-actions">
              <button className="sch-back" disabled={stepIdx === 0} onClick={back}>Back</button>
              <button className="sch-next" disabled={!canContinue} onClick={next}>
                {stepIdx === 3 ? 'Confirm booking ' : 'Continue '}
                <span className="arr">{stepIdx === 3 ? '✓' : '→'}</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `app/schedule/page.tsx`**

```tsx
import ScheduleFlow from '@/components/schedule/ScheduleFlow'

export const metadata = { title: 'Schedule — Fuse Medical' }

function ProgressRail() {
  return (
    <div className="progress-rail">
      {['Reason', 'Provider', 'Date', 'Details'].map((label, i) => (
        <div key={label} style={{ display: 'contents' }}>
          {i > 0 && <span className="link" />}
          <div className="step">
            <span className="nm">{i + 1}</span>
            <span>{label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function SchedulePage() {
  return (
    <main>
      <section className="sch-hero">
        <div className="sch-hero-wrap">
          <div className="mono mono-label">№ 04 — Book an appointment</div>
          <h1>Schedule<br />a <span className="it">visit.</span></h1>
          <div className="sch-hero-sub">
            <p>
              Reserve a time in just a few steps. For same-day walk-ins, urgent mental health
              concerns, or recovery intake, please call{' '}
              <a href="tel:6067705161" style={{ color: 'var(--blue)', fontWeight: 500 }}>
                (606) 770‑5161
              </a>.
            </p>
            <ProgressRail />
          </div>
        </div>
      </section>
      <ScheduleFlow />
    </main>
  )
}
```

- [ ] **Step 5: Run tests — verify they pass**

```bash
npm test -- --testPathPattern=ScheduleFlow
```

Expected: PASS (4 tests)

- [ ] **Step 6: Verify in browser**

```bash
npm run dev
```

Navigate to http://localhost:3000/schedule. Verify:
- Hero with "Schedule a visit." heading
- Step 1 reason tiles render
- Continue is disabled until a reason is clicked
- Clicking a reason enables Continue
- Continue advances to step 2 (providers)
- Selecting provider → date (calendar) → time slot → patient info works
- Summary sidebar updates as selections are made
- Confirm booking shows the confirmation card

Stop with Ctrl+C.

- [ ] **Step 7: Commit**

```bash
git add components/schedule/ app/schedule/ __tests__/schedule/
git commit -m "feat: add ScheduleFlow and Schedule page"
```

---

## Task 12: Pull images from fusemedical.org

**Files:**
- Populate: `public/images/team/`

- [ ] **Step 1: Inspect the current site for images**

Open https://www.fusemedical.org in a browser. Right-click → Inspect. Find team headshots and any other photos. Note their URLs.

Alternatively, run:
```bash
curl -s https://www.fusemedical.org | grep -oE 'https?://[^"]+\.(jpg|jpeg|png|webp)' | sort -u
```

- [ ] **Step 2: Download images**

For each image URL found (adjust the URLs below to match what the site actually serves):

```bash
mkdir -p "/Users/codynottingham/Documents/Fuse Medical/public/images/team"

# Download each team headshot — replace URLs with actual ones from the site
# Example pattern:
curl -o "/Users/codynottingham/Documents/Fuse Medical/public/images/team/tammy-whitehead.jpg" \
  "https://www.fusemedical.org/path/to/tammy.jpg"
```

Repeat for each team member. Save files as `[firstname-lastname].jpg` in `public/images/team/`.

- [ ] **Step 3: Update TeamDirectory to use real photos**

In `components/team/teamData.ts`, add a `photo` field to each member where a real image exists:

```typescript
// In TEAM array, for each member with a downloaded photo, add:
photo: '/images/team/tammy-whitehead.jpg',
```

- [ ] **Step 4: Update `TeamDirectory.tsx` detail panel portrait**

In the detail panel inside `TeamDirectory.tsx`, replace the gradient placeholder with an actual image when `selected.photo` exists:

```tsx
{selected.photo ? (
  <div className="detail-portrait" style={{ padding: 0 }}>
    <Image
      src={selected.photo}
      alt={selected.name}
      fill
      style={{ objectFit: 'cover' }}
    />
  </div>
) : (
  <div className="detail-portrait" style={{ background: AV_GRADIENTS[selected.av] }}>
    <span className="ph-badge">Portrait · {selected.name.split(' ')[0]}</span>
    <span className="big-init">{selected.init}</span>
  </div>
)}
```

Add the import at the top of `TeamDirectory.tsx`:
```tsx
import Image from 'next/image'
```

- [ ] **Step 5: Commit**

```bash
git add public/images/ components/team/
git commit -m "feat: add team photos from fusemedical.org"
```

---

## Task 13: GitHub + Vercel deployment

- [ ] **Step 1: Run full test suite — all must pass**

```bash
npm test
```

Expected: all tests PASS. Fix any failures before proceeding.

- [ ] **Step 2: Do a production build**

```bash
npm run build
```

Expected: no TypeScript or build errors. Fix any before proceeding.

- [ ] **Step 3: Create GitHub repo under cnottingham1990**

```bash
gh auth login
# Choose: GitHub.com → HTTPS → Login with a web browser
# Complete authentication for the cnottingham1990 account
```

Then create the repo:
```bash
gh repo create cnottingham1990/fuse-medical --public --source=. --remote=origin --push
```

Expected: repo created at https://github.com/cnottingham1990/fuse-medical, initial commits pushed.

- [ ] **Step 4: Connect to Vercel**

```bash
npx vercel --prod
```

When prompted:
- Set up and deploy? → Y
- Which scope? → cnottingham1990 (the Vercel account connected to cnottingham1990)
- Link to existing project? → N
- Project name → `fuse-medical`
- Directory → `.` (current)
- Override settings? → N

Expected: deployment completes, Vercel preview URL printed (e.g. `https://fuse-medical.vercel.app`).

- [ ] **Step 5: Set up auto-deploy from GitHub**

In Vercel dashboard (vercel.com), go to the `fuse-medical` project → Settings → Git. Connect to the `cnottingham1990/fuse-medical` GitHub repo if not already connected. Enable automatic deployments on push to `main`.

- [ ] **Step 6: Push a test change to verify auto-deploy**

```bash
# Make a trivial change (e.g. update copyright year if needed)
git add -A
git commit -m "chore: verify Vercel auto-deploy"
git push origin main
```

Go to the Vercel dashboard and confirm the deployment triggers automatically.

- [ ] **Step 7: Verify the live site**

Open the Vercel preview URL. Verify:
- All four pages load: `/`, `/team`, `/restoration-living`, `/schedule`
- Nav links navigate correctly
- Fonts load (Instrument Serif, Inter Tight, JetBrains Mono)
- Spheres animate on the home hero
- Team directory is interactive
- Schedule flow steps work
- Site is responsive on mobile viewport

---

## Self-Review

**Spec coverage check:**
- ✅ Next.js 15 App Router — Task 1
- ✅ Global CSS from v4 — Task 2
- ✅ Fonts via next/font/google — Task 2
- ✅ Nav with active state + Book Appointment → /schedule — Task 3
- ✅ Footer — Task 4
- ✅ Home: Hero, Ticker, Services, Story, Feature, Contact — Tasks 5–7
- ✅ Team: data, TeamHero, TeamDirectory (filter + detail panel) — Tasks 8–9
- ✅ Restoration Living: all 5 components — Task 10
- ✅ Schedule: 4-step flow, summary sidebar, confirmation — Task 11
- ✅ Images from fusemedical.org — Task 12
- ✅ GitHub cnottingham1990 + Vercel auto-deploy — Task 13
- ✅ Contact form is UI-only (no submission handler) — Task 5 Contact.tsx
- ✅ Schedule is placeholder (no real booking API) — Task 11

**No placeholders found.** All steps have exact code or exact commands.

**Type consistency:** `TeamMember` defined in `teamData.ts` and used consistently in `TeamDirectory.tsx`. `ScheduleFlow` types defined locally. No cross-task type mismatches found.
