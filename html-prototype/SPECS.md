# PlanAfter HTML Prototype — Design & Logic Specs
## Single source of truth for pixel-perfect replication

> **Rule:** Every pattern here is confirmed by Violetka.
> Before adding a new pattern → detect → report → wait for "yes".
> Before changing an existing pattern → ask first.
> Work element by element, component by component.

---

## ═══════════════════════════════════════
## WORKING RULES — READ BEFORE EVERY SESSION
## ═══════════════════════════════════════

### Rule 1 — XD specs are always desktop
All specs from Violetka are for the **large screen (desktop)**.
Implement exactly as given — no responsive adjustments during desktop implementation.
Desktop = done → only then propose responsive.

### Rule 2 — Responsive is a separate step
After desktop is confirmed and locked:
1. Propose how to make it responsive (breakpoints, changes per breakpoint)
2. Wait for confirmation → "yes" / "ok"
3. Only then implement responsive styles
Never mix desktop + responsive in the same implementation pass.

### Rule 3 — Confirm before writing
Sending a spec = permission to implement desktop.
"Yes" / "ok" after Preview = permission to lock.
Detecting a new pattern = report it, wait for "yes" before documenting or using.

### Rule 4 — Versions
Before modifying any file, save current state to `_versions/`.
Keep last 5 versions per file.
Version naming: `[filename]_v[N]_[YYYY-MM-DD].html`
Auto-rotate: when 6th version is added, delete the oldest.

### Rule 5 — Never touch locked components
Confirmed component = locked forever.
Only unlocked by explicit instruction from Violetka.
If about to touch a locked component → warn first, wait for "yes".

---

## ═══════════════════════════════════════
## VERSION LOG
## ═══════════════════════════════════════

```
_versions/ — last 5 versions of each file
Naming: [filename]_v[N]_[YYYY-MM-DD].[ext]
Rotate: when 6th version added, delete oldest for that file

v1  2026-04-02  index.html, profile.html, _shared.css, _shared.js
                Initial build: dashboard content extracted, profile extracted,
                photo system unified, greeting font locked (Source Serif 4)
```

**Before every file edit:**
```
cp [file] _versions/[file]_v[N]_[date].[ext]
# Count versions for that file → if > 5, delete oldest
```

---

## ═══════════════════════════════════════
## 1. DESIGN TOKENS
## ═══════════════════════════════════════

### Scaling
```css
--s: clamp(0.65, tan(atan2(100vw, 1440px)), 1);
/* Apply to EVERY px value — no exceptions */
/* 1920px target = scale 1.0 (XD baseline 1440px) */
```

### Colors
```
#000000   — primary text, borders, icons
#FFFFFF   — white, card borders, glass
#F8F8F8   — page background
#020B66   — navy (AI panel, placeholder titles)
#FF2C55   — error, high priority, danger
#61C553   — success, verified, health
#FF9500   — warning, medium priority
#FF0000   — notification dot, unverified
#CCCCCC   — input border default
```

### Glass Surfaces
```
Card default:    rgba(255,255,255,0.33)  blur(10px)  border 1px #FFF
Card active:     rgba(255,255,255,0.45)  blur(10px)  border 1px #FFF
Sidebar mobile:  rgba(245,245,248,0.92)  blur(24px)
Input default:   rgba(255,255,255,0.18)  blur(10px)
Input focus:     rgba(255,255,255,0.92)
```

### Shadows
```
Card primary:    0px 10px 30px #00000029
Card mobile:     0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)
Avatar/button:   0px 10px 20px #00000029
Dropdown panel:  0px 10px 20px #00000014
Edit circle:     0 4px 15px rgba(0,0,0,0.10)
Inset avatar:    inset -1px -1px 2px #FFFFFF
Inset plan strip:inset 0px 0px 6px #00000029
```

### Border Radius
```
30px  — cards, pills, sidebar photo, most containers
20px  — cards on mobile, tab pill
14px  — tag pills
8px   — small badges, error messages
50%   — all avatar circles
```

### Typography
```
Font family: 'Inter', sans-serif (always)

Heading:   600  24px/29px
Card title:600  20px/24px
Body:      400  16px/24px
Label:     600  16px/24px  (inputs, buttons)
Small:     400  14px/17px  (sidebar labels, subtitles)
Hint:      400  12px/15px  (metadata, captions)
Micro:     400  10px/12px  (badges)
```

### Transitions
```
Default hover:   all 0.2s ease-out
Tap/success:     all 0.6s ease-out
Sidebar nav:     all 0.1s ease-out  (faster)
Sub-items expand:all 0.6s cubic-bezier(0.4, 0, 0.2, 1)
Accordion:       max-height 0.3s ease-out
Sidebar slide:   transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)
Tab pill:        left 0.3s ease-out, width 0.3s ease-out
```

---

## ═══════════════════════════════════════
## 2. LAYOUT — Pattern: Layout.ThreeColumn
## ═══════════════════════════════════════

```
Desktop ≥1280px:
  [Sidebar 300px] [Middle 600px] [Right Panel 300px]
  Gaps: 10px between columns
  ALL THREE COLUMNS start at top: 100px from viewport:
    - sidebar-fixed:    top: 100px, height: calc(100vh - 100px)
    - rightpanel-fixed: top: 100px
    - scroll-inner:     padding-top: 100px (first card at y=100)
  Greeting zone: fixed at top: 34px (inside header area, see Typography.GreetingHeading)
  Header: fixed 100px, pointer-events:none shell
  Header left col:  width 300px, left: calc(50% - 640px)
  Header right col: width 300px, left: calc(50% + 340px)

Tablet 960px–1279px:
  Sidebar: calc((100vw - 20px) * 0.2381)  proportional
  Right panel: same width as sidebar
  Middle: fills remaining space
  Header: rgba(240,240,240,0.65) backdrop-filter blur(24px)
           border-bottom 1px solid rgba(255,255,255,0.4)

Mobile Landscape 768px–959px:
  Sidebar: off-canvas (hamburger), 300px, slides from left
  Right panel: calc((100vw - 10px) * 0.33), max-width 300px
  Middle: remaining width

Mobile Portrait ≤767px:
  Sidebar: hidden — hamburger in bottom nav
  Right panel: hidden
  Middle: 100% width
  Scroll padding: 110px top, 80px bottom, 6px sides
  Bottom nav: fixed, height 56px
```

---

## ═══════════════════════════════════════
## 3. HEADER
## ═══════════════════════════════════════

```
Container: fixed top:0 left:0, width:100%, height:100px, z-index:9999
           pointer-events:none (shell only — children are clickable)

Logo Pill:
  Size: 215×60px   Mobile: 172×48px
  BG: rgba(255,255,255,0.33)  blur(2px)
  Radius: 30px     Shadow: 0px 10px 20px rgba(0,0,0,0.16)
  Logo SVG: 155×20px, centered
  Hover: no change

Utility Buttons (search, bell):
  Size: 60×60px    Radius: 50%
  BG: rgba(255,255,255,0.33)  blur(10px)
  Shadow: 0px 10px 20px rgba(0,0,0,0.08)
  Hover: BG rgba(255,255,255,1.0)
  Active: scale(0.95)
  Transition: all 0.3s ease-out

Avatar Button:
  Outer: 80×80px   BG #FFF opacity:0.33 → 1 on hover
  Inner: 60×60px, photo or initials (600 18px Inter, rgba(0,0,0,0.4))
  Shadow: 0px 10px 20px #00000029
  Notification dot: 6×6px, #FF0000, top:17px left:40px

Mobile (≤767px): utility 40×40px, avatar 48×48px (inner 36×36px)
```

---

## ═══════════════════════════════════════
## 4. SIDEBAR
## ═══════════════════════════════════════

### Photo Container
```
Size: 300×275px, radius 30/30/0/0
BG: rgba(255,255,255,0.33) blur(10px)
Placeholder text: 220×17px, 400 14px/17px, #000 opacity:50%, center top:30px
Outer circle: 180×180px at (60,60), BG #FFF opacity:33%
Inner circle: 100×100px at (100,100), BG #FFF opacity:100%
Plus icon: 50×50px centered, 1.5px solid #000 opacity:16%
Hover: inner circle → 140×140px at (80,80), plus opacity:100%
Photo present: shows reposition bar + zoom slider + dots menu
```

### Navigation Items (.nav-item)
```
Size: 300×50px
Active bar: 3×40px, left edge, #000, radius 0/3/3/0
Icon: 20×20px, left:30px, 1.5px solid #000
Label: 600 16px/24px Inter, left:70px, top:15px
Hover: label shifts right to 75px (+5px)
Active: label stays at 70px
Chevron: 8×4px, right:28px, top:23px
Transition: all 0.1s ease-out
```

### Module Rows (.module-row)
```
Size: 300×40px   With-avatar: 300×60px
Dot: 8×8px, left:36px, #FFF → currentColor on hover/active
Label: 400 14px/17px, left:70px
Hover/Active: font-weight:600, color:#000
Toggle btn: 48×40px right-aligned, chevron 8×4px
Expanded: BG rgba(255,255,255,0.33)
Transition: all 0.6s ease-out
```

### Identity Strip (Mobile Sidebar)
```
Avatar: 50×50px circle
Name: 600 16px/20px Inter
Role/Plan: 400 12px/15px, opacity:0.5
```

---

## ═══════════════════════════════════════
## 5. SURFACE PATTERNS
## ═══════════════════════════════════════

### Pattern: Surface.Glass.Card
```css
background: rgba(255,255,255,0.33);
backdrop-filter: blur(10px);
border: 1px solid #FFFFFF;
border-radius: 30px;
box-shadow: 0px 10px 30px #00000029;
/* Mobile: border-radius 20px, shadow layered */
```

### Pattern: Surface.Glass.CardActive
```css
background: rgba(255,255,255,0.45);
/* Everything else same as Surface.Glass.Card */
/* Used when: card is expanded, hovered, or selected */
```

### Pattern: Surface.Glass.Sidebar (mobile only)
```css
background: rgba(245,245,248,0.92);
backdrop-filter: blur(24px);
border-radius: 0 30px 30px 0;
```

### Pattern: Shadow.LayeredMobile
```css
/* Use instead of card primary shadow on mobile ≤767px */
box-shadow: 0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06);
```

---

## ═══════════════════════════════════════
## 6. COMPONENT: Profile Header Card
## ═══════════════════════════════════════

### Pattern: Component.ProfileHeaderCard
```
Container: 600×308px  radius:30px  Surface.Glass.Card
Inner padding: 48px 60px 28px 30px

Top gradient overlay (::before):
  position: absolute top:0 left:0
  width:100% height:50%
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0) 100%)
  radius: 30px 30px 0 0   z-index:0

Black status bar (::after):
  position: absolute top:0 right:0
  width:50px height:100%
  background: #000000
  radius: 0 30px 30px 0   z-index:2

Avatar:
  Outer wrap: 80×80px, radius:50%, BG #FFF opacity:0.33
  Photo: 60×60px at (10,10), object-fit:cover, inset shadow
  Life dot: 8×8px #61C553, bottom:62px left:16px

Name: 600 20px/24px Inter, #000
Path: 400 12px/15px Inter, #000 opacity:0.5, margin-top:10px
Path dots: 4×4px radius:50%, margin:0 10px

Verification badge (top-right of card):
  Unverified: #FF0000
  Pending:    #FF9500
  Verified:   #000000
  Font: 400 12px/15px Inter

Shared-to avatars: 40×40px, radius:50%, border:2px #FFF, margin-left:-8px
Back button: top-left, navigateTo('dashboard')
```

---

## ═══════════════════════════════════════
## 7. COMPONENT: Accordion Section
## ═══════════════════════════════════════

### Pattern: Component.AccordionSection
```
Container: 600px wide  Surface.Glass.Card  margin-bottom:16px
Header: padding 30px, cursor:pointer
  Hover: BG rgba(255,255,255,0.2)
  Title: 600 20px/24px Inter, #000
  Subtitle: 400 14px/17px Inter, #000 opacity:0.5, margin-top:10px
  Chevron: 8×4px, #000, transition:transform 0.3s
    Closed: rotate(0deg)
    Open:   rotate(180deg)
Body: max-height:0 overflow:hidden → max-height:6000px
  Transition: max-height 0.3s ease-out
Inner: padding 0 30px 28px

Mobile ≤767px:
  Header padding: 18px 22px
  Title: 16px/20px
  Subtitle: 12px/15px, white-space:nowrap
  Inner: padding 0 20px 18px
```

---

## ═══════════════════════════════════════
## 8. COMPONENT: Profile Tabs
## ═══════════════════════════════════════

### Pattern: Component.ProfileTabs
```
Desktop:
  display:flex  gap:20px  align-items:baseline  margin-bottom:24px
  Tab: 600 16px/24px Inter, #000, opacity:0.7 hover → 1 active
  Pill indicator: absolute, bg rgba(255,255,255,0.85), radius:20px
    shadow: 0 2px 10px rgba(0,0,0,0.08), border: 1px solid rgba(255,255,255,0.7)
    Transition: left 0.3s ease-out, width 0.3s ease-out
    Moves dynamically to follow active tab

Mobile ≤767px:
  display:inline-flex  height:42px  border-radius:20px
  BG: rgba(255,255,255,0.45)
  Shadow: 0px 6px 20px rgba(0,0,0,0.08)
  Border: 1px solid #FFFFFF
  Tab: 14px/42px Inter 600, padding:0 14px, flex-shrink:0, border-radius:20px
  Active tab: pill covers the active tab
```

---

## ═══════════════════════════════════════
## 9. COMPONENT: Dashboard Card
## ═══════════════════════════════════════

### Pattern: Component.DashboardCard
```
Container: Surface.Glass.Card  position:relative  overflow:hidden
  Width: varies per card (290px, 600px)
  Height: varies per card

Gradient overlay (.card-gradient):
  position:absolute top:0 left:0  width:100%  height: varies
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0) 100%)
  radius: 30px 30px 0 0   z-index:0

Content (.card-content):
  position:relative  z-index:10
  display:flex  flex-direction:column  height:100%

Title (.card-title): 600 20px/24px Inter, #000, margin-bottom:15px

Card footer strip:
  .footer-bg: absolute bottom overlay, BG rgba(255,255,255,0.9) blur(4px)
  .handle: 30×3px, BG rgba(0,0,0,0.12), radius:2px, centered
  .footer-label: 600 13px/16px Inter, #000 opacity:0.5

Mobile ≤767px:
  border-radius: 20px
  Width: 100%
```

---

## ═══════════════════════════════════════
## 10. COMPONENT: AI Card (Dashboard)
## ═══════════════════════════════════════

### Pattern: Component.AICard
```
Container: width:600px  BG navy (#020B66)  radius:30px
  overflow:hidden  position:relative

Layers (bottom to top):
  .ai-bg:       absolute fill, gradient/image bg
  .ai-particles: animated floating dots (8 total, --dur/--del/--mx CSS vars)
  .ai-vignette: absolute fill, dark overlay
  .ai-header:   title "PlanAfter AI Assistant" + subtitle
  .ai-chat:     scrollable message area
  .ai-input-area: fixed bottom, glass input

Input area:
  Attach button: 40×40px circle, BG rgba(255,255,255,0.1)
  Textarea: Surface glass input pattern (see §Inputs)
  Send button (.ai-send): 50×50px circle
    Disabled: BG rgba(255,255,255,0.10), opacity:0.35
    Active: BG rgba(255,255,255,0.92), hover scale(1.05), active scale(0.93)
  Hint text: 400 11px Inter, rgba(255,255,255,0.35)

Resize handle: bottom center, 30×4px bar

AI message bubble:
  BG: rgba(255,255,255,0.12)  radius:16px  padding:14px 18px
  Font: 400 14px/22px Inter, #FFF
  Status dot: 8×8px #61C553

Typing indicator: 3 dots, bounce animation 1.3s ease-in-out staggered
```

---

## ═══════════════════════════════════════
## 11. BUTTON PATTERNS
## ═══════════════════════════════════════

### BtnSubmit — Pill-Expand-On-Hover
```
Circle: 60×60px, border:1px solid #000, radius:30px, BG transparent
Arrow: 9×16px SVG, stroke:1.5px round, path M1 1L8 8L1 15
Text: 400 16px/24px Inter, text-align:right
Dash: 1px height, width:10px default → 30px hover, gap:10px

States:
  Default: dash:10px, arrow centered in circle
  Hover:   dash grows to 30px, circle expands LEFT covering all
           Circle BG: #FFFFFF, arrow shifts -5px left
  Disabled: opacity:0.33
Transition: all 0.2s ease-out
```

### BtnBack — Circle-Reveal-On-Hover
```
Pad: 60×60px, radius:30px, no border
Arrow: 9×16px SVG centered in pad — NEVER moves
Text: 400 16px/24px Inter

States:
  Default: pad BG transparent, text static
  Hover:   pad BG #FFFFFF, text shifts +20px right
Transition: all 0.2s ease-out
```

### Edit Button (.edit-btn)
```
Circle wrap: 50×50px, radius:50%, BG #FFFFFF
Shadow: 0 4px 15px rgba(0,0,0,0.10)  — appears on hover only
Icon: 20×18px SVG, stroke:#000 stroke-width:2
Text: 400 12px/15px Inter
  Default: margin-right:0
  Hover:   margin-right:10px
Transition: opacity 0.2s ease-out, margin-right 0.2s ease-out
```

### Action Button (.action-btn)
```
Height: 50px, auto width
BG: transparent → #FFFFFF hover
Icon: rgba(0,0,0,0.4) → #000 hover
Label: 400 16px/24px Inter
Transition: all 0.2s ease-out
```

---

## ═══════════════════════════════════════
## 12. INPUT PATTERNS
## ═══════════════════════════════════════

### Essential Info Field (.ei-field-input-wrap)
```
Border-bottom: 1px solid #CCCCCC
Hover:         border-bottom-color #000
Focus-within:  border-bottom-color #000
Error:         border-bottom-color #FF2C55
Input font: 400 16px/24px Inter, color:#000
Placeholder: rgba(0,0,0,0.3)
```

### AI Input Textarea
```
Height: 50px (mobile: 34px)
BG: rgba(255,255,255,0.18)  blur(10px)
Border: 1px solid rgba(255,255,255,0.4), radius:25px
Padding: 15px 20px
Font: 500 13px/20px Inter
Placeholder: rgba(255,255,255,0.7)
Focus: BG rgba(255,255,255,0.92), border rgba(255,255,255,0.8)
       color #000, -webkit-text-fill-color #000
Max-height: 120px, resize:none, overflow-y:hidden
```

---

## ═══════════════════════════════════════
## 13. BADGE & PILL PATTERNS
## ═══════════════════════════════════════

### Tag Pill
```
display:inline-flex  padding:5px 14px  radius:14px  font:500 12px
Green:  BG rgba(76,175,80,0.12)   color #2E7D32
Red:    BG rgba(229,57,53,0.08)   color #E53935
Blue:   BG rgba(33,150,243,0.1)   color #1565C0
Orange: BG rgba(255,152,0,0.12)   color #E65100
```

### Notification Badge
```
Size: 30×30px (mobile: 22×22px)
BG: #FF0000  radius:50%
Font: 600 14px/17px Inter, #FFF
```

### Placeholder Page Badge
```
BG: #F5F5F5  border: 1px solid #E0E0E0  radius:20px
Padding: 5px 18px
Font: 600 11px/20px Inter, #AAAAAA, letter-spacing:1px, uppercase
```

---

## ═══════════════════════════════════════
## 14. COLORS — Plan Strips
## ═══════════════════════════════════════

### Pattern: Color.PlanStrips
```
Individual: linear-gradient(270deg, #61C553 0%, #31632A 100%)  hover→#61C553
Family:     linear-gradient(270deg, #FF9500 0%, #804B00 100%)  hover→#FF9500
Premium:    linear-gradient(270deg, #FF2C55 0%, #80162B 100%)  hover→#FF2C55
Sponsored:  linear-gradient(270deg, #007AFF 0%, #003E82 100%)  hover→#007AFF
Shadow: inset 0px 0px 6px #00000029
```

---

## ═══════════════════════════════════════
## 15. ANIMATIONS
## ═══════════════════════════════════════

### Pattern: Animation.SidebarFadeIn
```css
@keyframes sidebarFadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* Duration: 0.4s ease-out */
/* Applied to: sidebar nav items on open */
```

### AI Typing Dots
```css
/* 3 dots, each: bounce 1.3s ease-in-out infinite */
/* Delays: 0s, -0.2s, -0.4s (staggered) */
```

### Form Chip Entry
```css
@keyframes fchipIn {
  from { opacity: 0; transform: scale(0.92) translateY(4px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
/* Duration: 0.2s ease-out */
```

---

## ═══════════════════════════════════════
## 16. TYPOGRAPHY — Mobile Scale
## ═══════════════════════════════════════

### Pattern: Typography.GreetingHeading
```
Used on: every page, in header area but SCROLLS with middle column content
Position: relative (in-flow), margin-top: -66px pulls up from padding-top:100px to y=34px
          margin-bottom: 33px ensures next card starts at y=100px
Box:      width: 252px, height: 33px (XD: top:34px, left:834px @ 1920px = centered)
          margin: -66px auto 33px auto (centered via auto margins)
z-index:  10000 (above header z:9999)
pointer-events: none
Scroll:   SCROLLS with content — when user scrolls, greeting moves up behind header
Font:     Source Serif 4, weight 500 (medium)
Size:     24px / 33px line-height
Color:    #000000
Align:    center
Spacing:  letter-spacing 0px
CSS:      width: 252px; height: 33px; margin: -66px auto 33px auto;
          position: relative; z-index: 10000; pointer-events: none;
          font: normal normal 500 24px/33px 'Source Serif 4', serif;
          letter-spacing: 0px; color: #000000; text-align: center;
Font load: Google Fonts — family=Source+Serif+4:wght@400;500;600
           Must be added to <head> of every HTML file alongside Inter
```

### Pattern: Typography.MobileScale (≤767px)
```
24px → 20px
20px → 16px
18px → 16px
16px → 14px
14px → 12px
13px → 11px
12px → 10px
11px →  9px
10px →  9px
```

---

## ═══════════════════════════════════════
## 17. PHOTO SYSTEM — Logic
## ═══════════════════════════════════════

### Unified Plan Owner Photo
```
Storage: localStorage keys:
  planOwnerPhoto   — base64 data URL
  planOwnerCropX   — objectPosition X %
  planOwnerCropY   — objectPosition Y %
  planOwnerScale   — zoom scale value

Triggers (any of these fires applyPlanOwnerPhoto()):
  - Sidebar photo container upload
  - Essential Info edit mode avatar upload (fires on file select, not on Save)
  - Save in Essential Info edit mode

applyPlanOwnerPhoto() syncs to:
  - #sidebarPhotoImg          sidebar poster
  - #headerAvatarImg          top-right header avatar
  - #profileAvatarImg         profile header card avatar
  - #eiReadAvatar             Essential Info read mode
  - #eiAvatarPreview          Essential Info edit mode
  - #identityAvatarImg        mobile sidebar identity strip
  - #settingsAvatarImg        settings page (if present)
  - .plan-owner-photo         any summary card (querySelectorAll)
  - Album → Profile Pictures  localStorage 'albumProfilePictures' array

Page load: DOMContentLoaded reads localStorage → applyPlanOwnerPhoto()
Cross-page: photo persists via localStorage across all 14 HTML files

Album > Profile Pictures:
  Array in localStorage, newest first
  Deduplicated (no duplicate consecutive entries)
  Rendered in #albumProfilePicturesGrid (if element exists)
  Latest photo shows "Current" badge
```

---

## ═══════════════════════════════════════
## 18. NAVIGATION — Logic
## ═══════════════════════════════════════

```javascript
// navigateTo(page) — cross-file routing
pageMap = {
  'dashboard':   'index.html',
  'profile':     'profile.html',
  'family':      'family.html',
  'network':     'network.html',
  'assets':      'assets.html',
  'health':      'health.html',
  'goals':       'goals.html',
  'legacy':      'legacy.html',
  'will':        'will.html',
  'tasks':       'tasks.html',
  'vault':       'vault.html',
  'marketplace': 'marketplace.html',
  'shared':      'shared.html',
  'settings':    'settings.html'
}
// If page is in pageMap → window.location.href = pageMap[page]
// If page is local (sub-pages) → show/hide .page elements on same HTML file
```

---

## ═══════════════════════════════════════
## 19. PLACEHOLDER PAGE — Pattern
## ═══════════════════════════════════════

```html
<div class="page-placeholder">
  <div class="placeholder-icon">[SVG 72×72px opacity:0.18]</div>
  <h2 class="placeholder-title">[Section Name]</h2>
  <p class="placeholder-desc">[One-line description, max-width:380px]</p>
  <div class="placeholder-badge">COMING SOON</div>
</div>
```

```css
.page-placeholder:
  display:flex  flex-direction:column  align-items:center
  justify-content:center  gap:18px  padding:100px 40px 80px
  text-align:center  min-height:60vh

.placeholder-title:  600 26px/34px Inter, #020B66
.placeholder-desc:   400 15px/24px Inter, #888
.placeholder-badge:  BG #F5F5F5, border:1px solid #E0E0E0
                     radius:20px, padding:5px 18px
                     600 11px/20px Inter, #AAAAAA
                     letter-spacing:1px, uppercase
```

---

## ═══════════════════════════════════════
## 20. FILE STRUCTURE
## ═══════════════════════════════════════

```
html-prototype/
├── SPECS.md              ← this file
├── _shared.css           ← all CSS (extracted + placeholder styles appended)
├── _shared.js            ← all JS (navigateTo updated for all 14 pages)
├── index.html            ← Dashboard (full content from source)
├── profile.html          ← My Profile (full content from source)
├── family.html           ← My Family & Network (placeholder)
├── network.html          ← My Network (placeholder)
├── assets.html           ← Assets & Liabilities (placeholder)
├── health.html           ← Body & Health (placeholder)
├── goals.html            ← Goals & Aspirations (placeholder)
├── legacy.html           ← Emotional Legacy (placeholder)
├── will.html             ← Will & Legal (placeholder)
├── tasks.html            ← Tasks & Reminders (placeholder)
├── vault.html            ← Vault (placeholder)
├── marketplace.html      ← Marketplace (placeholder)
├── shared.html           ← Plans Shared With Me (placeholder)
└── settings.html         ← Settings (placeholder)
```

---

## ═══════════════════════════════════════
## PATTERN LOG — confirmed by Violetka
## ═══════════════════════════════════════

| # | Pattern Name                  | Status    | First Seen         |
|---|-------------------------------|-----------|--------------------|
| 1 | Layout.ThreeColumn            | ✅ locked | index.html         |
| 2 | Surface.Glass.Card            | ✅ locked | all cards          |
| 3 | Surface.Glass.CardActive      | ✅ locked | expanded cards     |
| 4 | Surface.Glass.Sidebar         | ✅ locked | sidebar mobile     |
| 5 | Layout.Header                 | ✅ locked | all pages          |
| 6 | Component.ProfileHeaderCard   | ✅ locked | profile.html       |
| 7 | Component.AccordionSection    | ✅ locked | profile.html       |
| 8 | Component.ProfileTabs         | ✅ locked | profile.html       |
| 9 | Component.DashboardCard       | ✅ locked | index.html         |
|10 | Animation.SidebarFadeIn       | ✅ locked | sidebar            |
|11 | Color.PlanStrips              | ✅ locked | sidebar            |
|12 | Typography.MobileScale        | ✅ locked | all pages          |
|13 | Shadow.LayeredMobile          | ✅ locked | mobile cards       |
|14 | Component.AICard              | ✅ locked | index.html         |
|15 | Typography.GreetingHeading    | ✅ locked | all pages          |
|16 | Layout.ColumnTop100           | ✅ locked | all pages          |
|17 | Layout.DocPreview             | ✅ locked | print.html         |
|18 | Surface.Glass.DocSidebar      | ✅ locked | print.html         |
|19 | Surface.DocViewer             | ✅ locked | print.html         |
|20 | Component.DocSidebarArrow     | ✅ locked | print.html         |
|21 | Component.ProfileImageCircle  | ✅ locked | print.html         |
|22 | Pattern.GlassCircleSolidifiesOnHover | ✅ locked | print.html    |
|23 | Component.DocZoomBar                | ✅ locked | print.html    |

---

### Pattern #17 — Layout.DocPreview
Document preview mode: body.doc-preview-mode hides sidebar, right panel, mobile nav, greeting.
Container .doc-preview: fixed, top: 100px (XD 30px + 70px header offset), left: 0, right: 0, bottom: 0.
Padding: max(0px, calc((100vw - 1280px) / 2)) — symmetric, 320px at 1920px, shrinks to 0 at ≤1280px.
Content = sidebar(80/300) + gap(40) + viewer(flex) = 1280px.

### Pattern #18 — Surface.Glass.DocSidebar
Collapsed: 80×stretch, rgba(255,255,255,0.33), border 1px solid #FFFFFF, border-radius 30px, blur(10px).
Expanded: 300px wide. Transition: width 0.3s ease-out. Tap to toggle.

### Pattern #19 — Surface.DocViewer
flex:1 width, #3A3045, border 1px solid #3A3045, border-radius 30px, blur(10px), margin-left 40px.
Close button (×) top-right → navigates back to profile.html.

### Pattern #20 — Component.DocSidebarArrow
arrow-s.svg, 12×10px, stroke #000 1.5px round cap/round join. No hover background.
Collapsed: points right (→), x=354, 20px from pad top. Tap expands sidebar.
Expanded: points left (←) via scaleX(-1), x=588 (align-self: flex-end, margin-right 18px). Tap collapses.
Transition: transform 0.3s ease-out.

### Pattern #21 — Component.ProfileImageCircle
Container: 80×80px circle, rgba(255,255,255,0.33), 50px from pad top. Overflow visible.
With photo: 60×60px circular img, object-fit cover, opacity 1, centered (10px inset).
Without photo: 60×60px white circle (#FFFFFF) with initials, font 600 24px/33px 'Source Serif 4', color rgba(0,0,0,0.4).
Tap: expands sidebar (auto-animate, 0.3s ease-out).

### Pattern #22 — Pattern.GlassCircleSolidifiesOnHover ✅ LOCKED
Reusable pattern for all sidebar icon buttons.
Default: 60×60px circle, rgba(255,255,255,0.33), border 1px solid rgba(255,255,255,0.33).
Hover: background #FFFFFF solid, border-color #FFFFFF, transition 0.3s ease-out. XD: opacity 1.
Icon: 20×20px, stroke #000 1.5px, round cap/round join, centered in circle.
Gap between buttons: 20px. Bottom button: 20px from pad bottom edge.
Layout: flex row (circle + label) with margin-top: auto on first row (pushes to bottom). align-self: stretch.
Collapsed: padding-left 10px (centered in 80px). Expanded: padding-left 20px (10px shift right, same as avatar).
Label: display none → block on expand. Font: 600 16px/20px Inter, #000000, gap 20px from circle.
Expanded hover: circle expands to pill 260×60px, border-radius 30px, #FFFFFF solid, extends right only.
Left edge + icon stay in place. Text centers in full pill width (260px). Transition: 0.2s ease-out.
Pill has 20px margin from both sides of pad (20 + 260 + 20 = 300px).
Implementation: ::before pseudo-element width 60→260px, label position absolute + text-align center on hover.
Used in: doc-sb-download (download.svg), doc-sb-print (print.svg).
Applies to: all future sidebar icon buttons.

### Pattern #23 — Component.DocZoomBar ✅ LOCKED
Zoom controls bar at bottom center of doc-viewer.
Background: rgba(0,0,0,0.6), backdrop-filter blur(10px), border-radius 20px, padding 6px 16px.
Controls: − button, % label, + button, Fit button.
Zoom steps: 400/600/800/1000/1200px (33%/50%/67%/83%/100% of 1200px XD doc).
Default: 800px (67%). Fit: viewer width − 80px.
Buttons: 28px circle, rgba(255,255,255,0.15), hover rgba(255,255,255,0.3).
Document pages scroll vertically inside doc-viewer (overflow-y: auto).
Page aspect-ratio: 1200/1920, border-radius 8px, box-shadow 0 4px 30px rgba(0,0,0,0.12).
Behavior: auto-hide on idle. Hidden by default (opacity 0, pointer-events none).
Shows on mouse move in viewer, hides after 3s idle. Stays visible while hovering bar.
Ctrl+scroll (or Cmd+scroll) zooms in/out and reveals bar.
Bar stays visible 1.5s after mouse leaves it.
