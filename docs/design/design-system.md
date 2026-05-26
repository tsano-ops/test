# PlanAfter — Design System

_Last updated: 2026-03-24_

## Design Philosophy

| Principle | Description |
|-----------|-------------|
| **Calm authority** | The platform should feel like a trusted advisor — competent, reassuring, never alarming |
| **Emotional intelligence** | Every screen considers the user's emotional state; grief-sensitive language and pacing throughout |
| **Zero cognitive overload** | Information is revealed progressively; no screen overwhelms the user with too many choices |
| **Hierarchical clarity** | Clear visual hierarchy guides the eye; primary actions are unmistakable |
| **Security-first UX** | Security features are visible and reassuring without being intrusive or frightening |
| **Action-oriented minimalism** | Every element serves a purpose; no decorative clutter; clear calls to action |

---

## Visual Style

**Glassmorphic** — frosted glass effects, translucent layers, soft shadows, and depth through blur. Creates a feeling of openness and clarity that aligns with the cloud/sky imagery used throughout the brand.

---

## Source of Truth: Adobe XD Prototypes

All prototypes are password-protected: `PA@w49_20251201`

| Prototype | URL |
|-----------|-----|
| My Profile | https://xd.adobe.com/view/b64d24e4-9f36-4932-8caf-bff7baa9c6a5-e31e/ |
| Onboarding | https://xd.adobe.com/view/fa887128-6445-45ab-988f-0796a65e579e-afdb/ |
| Assets & Liabilities | https://xd.adobe.com/view/f080e5bc-46da-4977-b2c7-72ea62221c58-a5d3/ |
| Emotional Legacy | https://xd.adobe.com/view/ee32d13b-8624-4094-8238-52d338d42e7e-bb61/ |

---

## Typography

| Usage | Font Family | Details |
|-------|-------------|---------|
| Headings | Source Serif 4 | Serif font for warmth and authority |
| Body text | Inter 18pt | Clean sans-serif for readability |

---

## Auth Screen Design System (LOCKED)

Auth and onboarding screens use **custom CSS classes only**. Never use Tailwind classes on auth pages.

### Layout

- Full-screen background photo: `/public/images/onboarding-bg.png`
- PlanAfter logo centered at top: `/public/icons/planafter-logo.svg`
- White rounded glass card containing form content
- Business woman figure (Sarah) at bottom right: `/public/images/sarah-fullbody.png`

### CSS Classes (defined in `apps/web/src/styles/globals.css`)

| Class | Element | Specification |
|-------|---------|---------------|
| `.auth-input` | Text input field | 60px tall, white background, #CCCCCC border, box-shadow 0 3px 6px rgba(0,0,0,0.06) |
| `.auth-input-wrap` | Input wrapper | Contains label + input, handles spacing and layout |
| `.auth-btn-continue` | Primary CTA button | Text + dash + circle with right arrow icon |
| `.auth-btn-back` | Back navigation button | Circle with left arrow icon + text |
| `.auth-source-option` | Radio pill selector | Rounded pill for selecting options (e.g., plan source) |
| `.auth-title` | Page heading | Main title of auth screen |
| `.auth-subtitle` | Page subtitle | Supporting text below title |

### Auth Assets

| Asset | Path |
|-------|------|
| Background image | `/public/images/onboarding-bg.png` |
| Sarah full body | `/public/images/sarah-fullbody.png` |
| Logo | `/public/icons/planafter-logo.svg` |

---

## Dashboard Design

Dashboard and all post-auth screens use **Tailwind CSS** normally. Custom utilities are defined in `apps/web/src/styles/dashboard.css`.

### Dashboard Card Style

```
background:     rgba(255, 255, 255, 0.45)
backdrop-filter: blur(10px)
box-shadow:     0px 10px 30px #00000029
border:         1px solid #FFFFFF
border-radius:  30px
```

### Gradient Overlay

Used at the top of cards or sections to create a fade-to-transparent effect:

```
height:     312px
background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)
```

### Avatar Style

```
size:        48x48px
border:      2px solid white
box-shadow:  0 4px 12px rgba(0, 0, 0, 0.15)
shape:       circle
```

### Hover State

```
background: rgba(255, 255, 255, 0.6)
transition: smooth (200-300ms)
```

---

## Card States

| State | Behavior |
|-------|----------|
| **Default** | Standard glassmorphic card with content displayed |
| **Loading** | Skeleton placeholder with pulsing animation matching card layout |
| **Empty** | Guidance message explaining what this section is for and how to start |
| **Error** | Error message with retry action; calm, non-alarming language |
| **Disabled** | Reduced opacity; shown when user lacks permission (permission-based gating) |

---

## Responsive Design

### Breakpoints

| Device | Behavior |
|--------|----------|
| **Desktop** | Full layout — sidebar navigation + main content + right panel |
| **Tablet** | Sidebar collapses to icons; right panel moves below main content |
| **Mobile** | Single column layout; reduced paddings; bottom navigation replaces sidebar |

### Persistent Elements

- Header: sticky at top across all breakpoints
- Sidebar: sticky on desktop; collapsible on tablet; hidden on mobile (replaced by bottom nav)

---

## Brand Identity

### Logo

- **Symbol:** Infinity sign — represents legacy, continuity, what lives on
- **Wordmark:** "PlanAfter" in clean sans-serif
- **File:** `/apps/web/public/icons/planafter-logo.svg`

### Tone of Visual Design

Calm. Trustworthy. Human. Like a private bank meets a caring friend.

- Cloud/sky imagery — openness, clarity, peace
- White-heavy palette — clean, safe, uncluttered
- Soft shadows — depth without harshness
- Rounded corners (30px on cards) — approachable, not corporate

---

## Colors

| Role | Value | Usage |
|------|-------|-------|
| Background | `#F5F7FA` | Page backgrounds |
| White | `#FFFFFF` | Cards, inputs, overlays |
| Border | `#CCCCCC` | Input borders, dividers |
| Text primary | `#1A1A1A` | Headings, body text |
| Text secondary | `#666666` | Subtitles, hints, labels |
| Card shadow | `#00000029` | Dashboard card box-shadow |
| Input shadow | `rgba(0,0,0,0.06)` | Auth input box-shadow |
| Card background | `rgba(255,255,255,0.45)` | Glassmorphic card fill |
| Hover background | `rgba(255,255,255,0.6)` | Card/element hover state |
| Avatar shadow | `rgba(0,0,0,0.15)` | Avatar drop shadow |

---

## Emotional Design Guidelines

### Grief-Sensitive UX

- Never use alarming or urgent language when discussing death, loss, or end-of-life topics
- Use progressive disclosure — reveal sensitive topics gradually, not all at once
- Provide "skip for now" options on emotionally heavy sections
- Holding screens for beneficiaries waiting for delivery should be warm and reassuring
- Error messages should be calm and solution-oriented, never blaming

### Tone of Voice in UI

- Direct but warm
- Professional but not clinical
- Supportive without being patronizing
- Action-oriented: always tell the user what they can do next

---

## Icons

All icons stored in `/apps/web/public/icons/`:

| Icon | Filename | Usage |
|------|----------|-------|
| Brand logo | `planafter-logo.svg` | Header, auth screens |
| Pill/pad shape | `pad-outline.svg` | Background decorative element |
| Forward arrow | `arrow-right.svg` | Navigation, continue buttons |
| Back arrow | `arrow-left.svg` | Back navigation |
| Clock | `clock.svg` | Time, scheduling, reminders |
| Info | `info.svg` | Tooltips, information callouts |
| Task | `task-big.svg` | Task section, task cards |

---

## Images

All images stored in `/apps/web/public/images/`:

| Image | Filename | Usage |
|-------|----------|-------|
| Cloud sky background | `onboarding-bg.png` | Auth/onboarding screen background |
| Business woman (Sarah) | `sarah-fullbody.png` | Auth screens, right side |
| Country flags | `flag-*.png` | Country selection (italy, usa, canada, france, germany, spain, uk, belgium, bulgaria, netherlands) |

---

## UI Components

Reusable components in `apps/web/src/components/ui/`:

| Component | Variants | Notes |
|-----------|----------|-------|
| `Button.tsx` | Primary, secondary | Standard button component |
| `Input.tsx` | Standard form input | For dashboard/post-auth screens |
| `PasswordStrength.tsx` | Password strength indicator | Used during registration |

Always reuse existing components before creating new ones. Auth screens use CSS classes, not these components.
