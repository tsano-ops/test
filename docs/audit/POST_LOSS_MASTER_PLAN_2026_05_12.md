# Post-Loss Support — Master Implementation Plan

**Confirms:** Full grasp of scope, depth, logic, design system compliance.
**Source documents read:**
- `docs/spec/PlanAfter_EPICS_March_2026.md` — Epic 11 + 5.1 + 5.2.1 + 7.3 + 17.4
- `docs/spec/post-loss/POST-LOSS SUPPORT PRD.md` (2174 lines)
- `docs/spec/post-loss/Memorial Page.md` (702 lines)
- `docs/spec/post-loss/Legal & Practical Steps.md` (512 lines, Bulgarian-specific)
- `docs/spec/post-loss/ForeverMissed_Competitor_Research_2026.docx.md` (742 lines, 10+ platforms)
- `docs/spec/post-loss/CM_Emotional_Support.csv` (1187 rows of articles)
- `docs/spec/post-loss/CM_Practical_Support.csv` (104 rows)
- `docs/spec/post-loss/CM_Legal_and_Admin_Support.csv` (1116 rows)
- Plus original `docs/design/DESIGN_SYSTEM_LIVE.md` and `MEMORY.md` canonical rules

---

## 1. Module position & boundaries

Post-Loss Support is a **TOP-LEVEL sidebar section** (alongside Me Family & Network / My Plan / Vault / Tasks & Reminders / Plans Shared With Me). NOT nested under My Plan. Has its own dedicated directory page + local navigation, just like Assets & Liabilities.

### 1.1 Two entry contexts (per PRD §3.1)

**Path A — Personal Loss (Plan Owner during life):** Plan Owner has experienced a loss in their personal network. Marks a person record as deceased, gets a Personalized Care Plan, accesses support tools. May maintain MULTIPLE parallel plans (one per deceased person).

**Path B — Activated Plan (post-Plan-Owner-death):** Executors / Beneficiaries / Contributors enter the activated environment. Pre-configured by Plan Owner, tailored by Executor through context questionnaire.

### 1.2 Anchoring rule

Every Personalized Post-Loss Care Plan is **person-based, NEVER abstract**. Each plan must be anchored to a deceased Person Record (or one created inline through the flow).

---

## 2. Role-based visibility matrix

| Capability | Plan Owner | Executor (post-act.) | Beneficiary | Contributor | Public (future) |
|---|---|---|---|---|---|
| Create plan | ✅ | ❌ | ❌ | ❌ | ❌ |
| Edit plan | ✅ | ✅ (scope) | ❌ | suggest only | ❌ |
| Assign tasks | ✅ | ✅ | ❌ | ❌ | ❌ |
| Use Obituary | ✅ | ✅ | view only | suggest | ❌ |
| Use Memorial Page | ✅ | ✅ | view if shared | suggest | view public memorial |
| Access resource library | ✅ | ✅ | ✅ | ✅ | ❌ |

---

## 3. Section architecture (PRD §5 — 5 primary zones)

### Zone I — Greeting Line (PRD §6.1)
**Non-interactive emotional opener** at top of page. State-aware text:
- Empty / No plan: "We're here to help you through this, [Name]."
- Active plan: "You're not alone in this, [Name]."
- Invited user: "[Deceased Name] prepared some things for you."
- Tone rules: NO exclamation marks, NO urgent verbs, NO badges/counters/CTAs.

### Zone II — Hero Card / Loss Planner Tool (PRD §6.2)
**Primary orchestration component.** 7 states:
1. Empty — no plan yet (CTA: "Start →" → Personalization Flow)
2. Single Active Plan — phase + progress + top 2-3 priorities + Continue
3. Multiple Plans — compact multi-plan overview (max 3-4 rows visible)
4. Paused / Incomplete — Resume Setup
5. Executor Post-Activation — operational view within scope
6. Beneficiary Restricted — simplified relevant content only
7. Contributor Restricted — assigned scope only

**5 internal zones (A-E) within Hero Card:**
- A: Identity / Context Bar (deceased person name + relationship)
- B: Phase + Time Context (Immediate / Early Days / First Weeks / Ongoing)
- C: Plan Summary / Progress (N of N steps, calm not productivity-pressure)
- D: Priority Preview (top 2-3 next actions)
- E: Action Area (1 primary CTA per state)

### Zone III — Active Loss Plans (PRD §6.3)
Dynamic list. Each row → click takes user to that person's **Care Plan tab** on their Person Record. Sort by urgency: Red Immediate → Amber First Weeks → Green Ongoing → Grey Completed.

### Zone IV — Quick Actions (PRD §6.4)
- **Obituary Creation** (PRD §6.4.4) — structured formal announcement builder
- **Memorial Page Creation & Management** (PRD §6.4.5 + Memorial Page.md) — living remembrance surface

### Zone V — Resources & Learning Hub (PRD §6.5)
**Grief Support Directory** with Guided Mode (single resource at a time, calm) + Browse Mode (filtered category grid). Articles from the Content Matrix CSVs (Emotional 1187 / Practical 104 / Legal 1116).

---

## 4. Care Plan tab (PRD §6.6) — lives on Person Record

Tab appears on the deceased Person Record AFTER a Care Plan has been created. Layout:
- Introductory header + utility row (search + Active/Done/Removed/All filter tabs)
- 3 grouped sections (auto-routed):
  - **Emotional Support**
  - **Practical Support**
  - **Legal & Administrative Support**
- Each section contains **Single Step Cards**

### 4.1 Single Step Card (PRD §6.6.3)
Each card has:
- Status dot (Pending grey / Active orange / Done green)
- Step title
- Phase line (e.g. "0–72 hours")
- Pin + Done icons
- Action menu (Mark done / Pin / Remove / Assign / Add reminder)

### 4.2 Expanded Step (PRD §6.6.3.5)
On click, expands INLINE within the Care Plan tab (NOT a new page). 3 layers:
1. Step description (always shown when expanded)
2. Optional sub-steps (collapsible rows)
3. **Short article + links** (per Violetka 2026-05-12)
4. Add New Entry flow (Location of original / Storage details / Upload Dropzone / Notes)

---

## 5. Memorial tab (Memorial Page.md) — lives on Person Record

Tab appears on the deceased Person Record. Inside the tab — full memorial management surface:
- **Hero Header:** main photo (canonical Two-Circle Avatar 240/180), "In memory of" eyebrow, full name, dates, optional tribute
- **Primary Actions:** Add a Memory / Sign Guest Book / Share / Follow / Add Photos / Donate
- **Obituary section** (linked from Obituary tool)
- **Guest Book / Memory Wall** (short condolences + longer memories)
- **Photos & Media gallery**
- **Service / Event info**
- **Contribution & Moderation layer**
- **Follow / Share / Donate / Support actions**

### 5.1 8-step Creation Flow (Memorial Page.md §12-)
0. Access validation (signed in + verified + role + plan)
1. Identify / confirm deceased person (1A: First/Last + DoB → 1B: existing record check)
2. Memorial person details + setup fields
3. Choose plan (Basic vs Premium — conditional, only if Basic)
4. Privacy & Publishing (Private / Invite-only / Public)
5. Theme & design (Premium only)
6. Memorial ready state
7. First-run memorial onboarding

### 5.2 Basic vs Premium

| Capability | Basic | Premium |
|---|---|---|
| Create memorial | ✅ | ✅ |
| Private memorial | ✅ | ✅ |
| Invite-only | ✅ | ✅ |
| Public memorial | ❌ | ✅ |
| Theme selection | default only | 100+ themes |
| Public URL `www.<name>.rememberafter.com` | ❌ | ✅ |

---

## 6. Personalization Flow (PRD §6.2.7) — Q1 → Q5 → Confirmation

Q1: Who did you lose? (Partner/Child/Parent/Sibling/Friend/Pet)
Q2: Select specific person (searchable + Create New inline)
Q3: Date of death (calendar + manual)
Q4: What happened? (Illness expected / Sudden / Still preparing)
Q5: How are you feeling? (multi-select chips, affects emphasis)
→ Confirmation: "Your Care Plan is ready"
→ Output: Care Plan attached to person record, phase set, support profile, dashboard updated

---

## 7. Design system compliance (CANONICAL / LOCKED)

### 7.1 Typography
- **Headings:** Source Serif 4 (variable weights). Memorial hero name 40/48 with -0.01em letter-spacing. Section titles 18/22 or 20/24.
- **Body:** Inter (canonical). 14/22 for body, 12/15 for labels, 16/24 for value, 18/24 for emphasis.
- **Italic for memorial tribute:** Source Serif 4 italic 16/26 — adds emotional weight.

### 7.2 Glassmorphic Card (canonical dashboard rule)
- Background: `rgba(255,255,255,0.45)`
- Border: `1px solid #FFFFFF`
- `backdrop-filter: blur(10px)`
- Border-radius: `30px`
- Box-shadow: `0px 10px 30px #00000029`
- Gradient overlay: `linear-gradient(180deg, #FFFFFF 0%, #FFFFFF00 100%)` height 312px

### 7.3 Two-Circle Avatar Pattern (LOCKED — DESIGN_SYSTEM_LIVE.md §953)
**Outer halo:** solid `#EDEDED` + `blur(10px)` + shadow `0px 10px 30px #00000029`
**Inner:** `#FFFFFF` + overflow hidden, contains photo OR canonical initials
**Initials:** Source Serif 4 600, color `rgba(0,0,0,0.4)`, letter-spacing `0.05em`, size ≈ 40% of inner diameter

Sizes: cover 240/180 · content 220/160 · header 80/60 · profile 80/60 · doc-sidebar 80/60 · family 64/44 · sidebar 54/40

### 7.4 Status colors (canonical)
- Pending grey: `rgba(0,0,0,0.18-0.25)`
- Active / Early Days orange: `#FF9500`
- First Weeks blue: `#667EEA`
- Active / Ongoing green: `#61C553`
- Immediate / Urgent red: `#FF2C55`

### 7.5 Glow Bar Pattern (LOCKED for progress bars)
Height 4px (bare, not scaled — exception), radius 4px, track `rgba(0,0,0,0.08)`, fill inner shadow `inset 0px 1px 0px rgba(255,255,255,0.47)`, outer glow `0px 0px 6px [color]80`.

### 7.6 Add Inline button pattern (LOCKED)
60×60 invisible→white circle on hover + `plus-circle.svg` 20×20 + label 600 14/17, text shifts +10px right on hover.

### 7.7 Hover-Tap-Hold button label (LOCKED)
12/15 Inter normal #000, transparent bg, right-aligned, right:60 from icon, 0.2s ease-out fade. NO pill, NO border, NO bold.

### 7.8 Save button pattern
Label + dash + circle with arrow. Hover solidifies the circle to white. 0.2s ease-out transition.

---

## 8. Implementation status (this session — 2026-05-12)

| # | Item | Status |
|---|---|---|
| 1 | Sidebar nav (28 files × 5 sub-items) wired to canonical pages | ✅ Done |
| 2 | post-loss-directory.html category-aware title | ✅ Done |
| 3 | Memorial tab in record.html (hero + status + 4-card grid + empty state) | ✅ Done |
| 4 | Memorial tab uses LOCKED Two-Circle Avatar Pattern 240/180 | ✅ Done |
| 5 | Memorial tab populates from peopleStore for deceased records | ✅ Done |
| 6 | Care Plan tab structure + 3-section grouping + filter tabs | ✅ Done |
| 7 | Care Plan empty state + "Start a Care Plan" CTA → post-loss-flow.html | ✅ Done |
| 8 | Personalization Flow Q1-Q5 audit — all 5 questions EXIST in flow | ✅ Verified |
| 9 | Hero Card 7 states wiring (post-loss.html) | 🔄 In progress |
| 10 | Step Card expand-inline pattern (description + sub-steps + article + entry) | ⏳ Pending |
| 11 | Article view wired to Content Matrix CSV | ⏳ Pending |
| 12 | Obituary Builder refined per PRD §6.4.4 A-F | ⏳ Pending |
| 13 | Memorial Page builder 8-step flow per Memorial Page.md §12 | ⏳ Pending |
| 14 | Care Plan content seed from Legal & Practical Steps.md (Bulgaria-specific) | ⏳ Pending |
| 15 | Document pattern in DESIGN_SYSTEM_LIVE.md | ⏳ Pending |

---

## 9. Files in scope (DO NOT touch outside this list)

Touch:
- `post-loss.html` — main dashboard
- `post-loss-flow.html` — Personalization Flow (Q1-Q5)
- `post-loss-directory.html` — Support & Guidance hub
- `post-loss-article.html` — Single Article view
- `post-loss-step.html` — Single Step (expanded view)
- `post-loss-plan.html` — Care Plan (legacy standalone — being absorbed into record.html Care Plan tab)
- `post-loss-obituary.html` — Obituary Builder
- `post-loss-memorial.html` — Memorial Page Builder + Public Page
- `record.html` — Memorial tab + Care Plan tab content blocks
- `profile.html` — sidebar wiring only (already done)
- `_shared.css` — Memorial + Care Plan CSS (append at end)
- `_shared.js` — only if absolutely required

DO NOT touch (per Violetka 2026-05-12):
- Anything already built in profile.html main content area
- Existing record.html overview / documents / album / life-story tabs
- Vault / Tasks / Assets / Family / etc. pages
- Existing CSS sections OTHER than the appended Memorial / Care Plan

---

## 10. Hourly commit discipline (per user instruction)

Every ~1 hour:
1. Verify in browser (or static check) what just shipped
2. Commit with detailed message
3. Plan next hour's slice
4. Read more spec / parse more CSV as needed

Cache versioning: `?v=20260512XX` bump on each session of changes.

---

**Confirmed understanding — this plan is the binding contract.** All subsequent work must reference this document.
