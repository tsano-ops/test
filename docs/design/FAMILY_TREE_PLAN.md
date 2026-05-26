# Family Tree Plan — PlanAfter Design × MyHeritage Logic

Date: 2026-05-18
Status: PLANNING — awaiting user approval before implementation

---

## 🎯 Vision

A family tree that **reads like an interactive genealogy book** — clear vertical generations, smart relationship lines, click-to-explore navigation through anyone's family — while looking unmistakably **PlanAfter** (glass cards, Source Serif 4 + Inter, life-status dots, smooth ease-out transitions).

---

## 📊 Current State (what exists)

`family-tree.html` has a **hardcoded** tree with 4 generations. Anchor = Sarah (Plan Owner).

```
Gen 1 (top, on canopy):    Emma · Liam · Lisa · Noah          ← CHILDREN
Gen 2 (anchor row):        Jack(ex) · John(husband) · Sarah   ← SARAH + spouses
Gen 3 (mid-trunk):         Mary · Robert                       ← PARENTS
Gen 4 (roots, bottom):     [+]Grandma · Ben · Jane · John Smith ← GRANDPARENTS (deceased)
```

**Problems:**
1. ❌ Reversed direction — children on top, ancestors at bottom (opposite of canonical genealogy + opposite of every major platform)
2. ❌ Hardcoded HTML — not data-driven from `peopleStore`
3. ❌ Sarah always center — can't focus on anyone else
4. ❌ Marcus (Emma's new husband) doesn't appear in proper position
5. ❌ Connecting lines drawn imperfectly relative to glassmorphic card edges
6. ❌ No multi-marriage UX (Jack as ex-husband uses dashed line, but the layout doesn't show his branch independently)

---

## ✨ Target Behavior (MyHeritage logic + PlanAfter design)

### Tree-metaphor generation direction (LOCKED 2026-05-18)

Violetka: "корените са предците, клоните децата, внуци и правнуци" —
the golden-tree.png background literally shows roots at the bottom and
branches at the top, and the layout MUST match this visual metaphor.

```
TOP (canopy / branches) : Great-grandchildren → Grandchildren → Children (descendants)
CENTER                  : FOCUSED PERSON (anchor) + Spouses + Siblings
BOTTOM (roots)          : Parents → Grandparents → Great-grandparents (ancestors)
```

**Descendants reach UP (canopy), ancestors anchor DOWN (roots).**
This is the OPPOSITE of canonical Western genealogy charts (where parents
are above children) — but matches the actual TREE metaphor: a tree grows
new branches upward and is rooted in older generations below.

### Click-to-recenter ("Navigate to anyone's family")

Click ANY card in the tree → that person becomes the new focused anchor:
- Tree smoothly animates: pan + cross-fade
- New tree builds around them — THEIR parents up, THEIR spouses horizontal, THEIR children down
- Same canonical direction always
- Breadcrumb appears: `← Back to Sarah` (or back-stack of last 3 focused persons)
- Bottom-right pill: **"Currently viewing: Emma Johnson's family"** with avatar
- Click breadcrumb → animates back to Sarah

### Multi-marriage: ex-spouses + current spouse + new spouse

Mirror MyHeritage's pattern:
- Current spouse → solid line, on the **right** of anchor
- Ex-spouse → **dashed line**, on the **left** of anchor (or above if multiple)
- Each marriage's children are visually grouped under their parent couple
- Future ex-spouses/extra marriages extend left or stack vertically

### Generation depth (zoom-out for big trees)

Default view: 5 generations visible (2 up, anchor, 2 down). User can zoom out to see 7+ generations via toolbar.

### Card design (PlanAfter language)

```
┌─────────────────────────────┐
│ ┌───┐                       │   ← 140w × 64h glass card (border-radius 32)
│ │ MA│  Marcus Anderson      │
│ │ ● │  Husband              │   ← 56×56 outer avatar (two-circle) + life dot
│ └───┘  1995                 │
└─────────────────────────────┘
```

- Background: `rgba(255,255,255,0.45)` + `backdrop-filter: blur(10px)`
- Border: `1px solid rgba(255,255,255,0.6)`
- Shadow: `0 10px 30px rgba(0,0,0,0.16)`
- Border-radius: `32px`
- Name: `600 14/17 Inter`
- Role (Husband/Daughter/Son/Mother): `400 12/15 Inter`, `rgba(0,0,0,0.5)`
- Year: `400 12/15 Inter`, `rgba(0,0,0,0.4)`
- Life dot: 8×8 absolute on avatar (green alive / red deceased / grey unknown)
- Two-circle avatar: outer 56×56 `rgba(255,255,255,0.33)`, inner 40×40 (photo or initials)
- Gender accent border (subtle 2px on outer avatar): male `#3B82F6` 20% / female `#EC4899` 20% / unknown none
- Deceased: avatar `filter: grayscale(0.4)`, name `color: rgba(0,0,0,0.6)`, year range `1918 — 2000`

### Connection lines (smart routing)

- **Couple line**: horizontal solid line connecting spouse cards (between them, at mid-height)
- **Couple bracket**: small horizontal line **below** the couple, dropping down to children row
- **Sibling line**: horizontal line connecting siblings at the bracket level
- **Generation line**: vertical line from couple bracket → siblings line → individual sibling
- **Adoption / step**: dashed line variant
- **Ex-marriage**: dashed couple line + dashed couple bracket
- All lines: `1px solid rgba(0,0,0,0.25)` with 0.5px clean stroke
- SVG-based (existing `.ftree-lines` overlay) — recomputed on layout change

### Card actions (canonical ⋯ menu, same as F&R)

Hover/touch any card → ⋯ menu appears top-right of card:
- **Open Profile** → navigate to record.html#id
- **Set as Center** → make this person the anchor (same as clicking, but explicit)
- **Add Parent** → opens canonical Add form, parents above
- **Add Spouse** → opens Add form, spouse beside
- **Add Sibling** → opens Add form, sibling same row
- **Add Child** → opens Add form, child below
- **Remove Relationship** (not for Plan Owner)
- **Delete record** (not for Plan Owner)

Same pattern as F&R card ⋯ menu — reuse `frOpenMenu`, `frOpenProfile`, etc.

### Toolbar (bottom-center floating glass bar)

```
┌──────────────────────────────────────────────────────────┐
│  ⊕ Fit to screen  │  🔍─⊙─🔎  │  ⓘ Legend  │  📥 Export  │
└──────────────────────────────────────────────────────────┘
```
- **Fit to screen**: auto-zoom + center
- **Zoom slider** (10% → 200%) + plus/minus
- **Legend**: toggle the line-type legend overlay
- **Export**: print-friendly view + PDF

### Top-right floating chip (current focus)

```
┌────────────────────────────────────────┐
│ ← Back  Viewing: Emma Johnson's family │
└────────────────────────────────────────┘
```

When focused on someone other than Plan Owner. Click ← Back → animate back to Sarah.

---

## 🏗️ Implementation Plan (Phased)

### **Phase 1 — Data-driven foundation** (1-2 sessions)

Goal: Replace hardcoded HTML with renderer that reads from `peopleStore`.

1. **Tree layout engine** — `paBuildTreeForAnchor(anchorId)` returns:
   ```js
   {
     anchor: {person, x, y},
     ancestors: {parents: [...], grandparents: [...], greatGrandparents: [...]},
     descendants: {children: [...], grandchildren: [...], greatGrandchildren: [...]},
     spouses: [current, ...ex], siblings: [...],
     couples: [{p1, p2, type: 'current'|'ex'|'former'}],
     bracketLines: [{from, to, kind}]
   }
   ```
2. **Renderer** — `paRenderTree(layout, container)` emits glass cards + computes positions
3. **Connection line renderer** — `paRenderTreeLines(layout, svg)` draws coupled bracket lines into existing `<svg id="ftreeLines">`
4. **Default anchor** = Plan Owner (Sarah)
5. **Canonical direction** — ancestors UP, descendants DOWN, generation gap 120px, sibling gap 20px, couple gap 40px

### **Phase 2 — Click-to-recenter + animation** (1 session)

1. **State** — `window.__paTreeFocusId` (default `'sj'`)
2. **Click handler** on each card → set focus to that person → re-render with smooth pan/fade
3. **Animation** — fade out old cards (`opacity: 0`, 250ms) + pan canvas to new center (`transform: translate`, 350ms ease-out) + fade in new cards (250ms)
4. **Back stack** — last 3 focused persons stored; breadcrumb shows them
5. **Top-right chip** — appears when focus ≠ Plan Owner; shows current focus + back button

### **Phase 3 — Multi-marriage + advanced relations** (1 session)

1. **Couple lines** — solid for current, dashed for ex
2. **Mixed-parent children** — group Emma/Liam/Lisa/Noah under (Sarah, John); if Sarah-Jack had a child, show that child under (Sarah, Jack) with their own bracket
3. **Marcus** — show under (Emma) couple bracket (Emma + Marcus) → if they had children, those go under their bracket
4. **Step / Adopted** — dashed parent-child line, "step" badge on connection
5. **In-laws** — visible 1 step out from each spouse (Marcus's parents would show as cards above Marcus when he's focused)

### **Phase 4 — Card actions + add flow** (1 session)

1. ⋯ menu on each card (same as F&R)
2. **Add Parent/Sibling/Spouse/Child** buttons → open `paFRAddRenderCreateNewPanel` in modal — saves persist immediately, tree re-renders
3. **Quick-add inline** — clicking a `[+]` add-circle placeholder (empty parent slot, e.g. "Add Father") opens a quick form
4. **Plan-owner-only** — protect Plan Owner card from "Remove" / "Delete"

### **Phase 5 — Toolbar + polish** (1 session)

1. Fit-to-screen / Zoom slider / +/-
2. Legend toggle
3. Print / Export PDF
4. Search bar (filter by name)
5. Mini-map overview (corner thumbnail)
6. Touch gestures (pinch zoom, drag pan)

---

## 🎨 PlanAfter Design Tokens Used

| Component | Spec |
|-----------|------|
| Card bg | `rgba(255,255,255,0.45)` + `backdrop-filter: blur(10px)` |
| Card border | `1px solid rgba(255,255,255,0.6)` |
| Card shadow | `0 10px 30px rgba(0,0,0,0.16)` |
| Card radius | `32px` |
| Card padding | `8px 12px 8px 8px` |
| Avatar outer | 56×56 `rgba(255,255,255,0.33)` glass |
| Avatar inner | 40×40 solid white (with photo or initials) |
| Initials | `600 14/17 'Source Serif 4'`, `rgba(0,0,0,0.4)` |
| Life dot | 8×8, green `#61C553` / red `#FF2C55` / grey `#9C9C9C` |
| Name | `600 14/17 'Inter'`, `#000` |
| Role | `400 12/15 'Inter'`, `rgba(0,0,0,0.5)` |
| Year | `400 12/15 'Inter'`, `rgba(0,0,0,0.4)` |
| Line | `1px solid rgba(0,0,0,0.25)` |
| Dashed line | `1px dashed rgba(0,0,0,0.25)` |
| Generation gap | `120px` vertical |
| Sibling gap | `20px` horizontal |
| Couple gap | `40px` horizontal |
| Background | Existing `golden-tree.png` artwork OR clean glass |
| Transitions | `transform 350ms ease-out, opacity 250ms ease-out` |
| Pan canvas | `transform: translate(x, y)` with will-change |

---

## ✅ Confirmed Design Choices (Violetka 2026-05-18)

1. **Background**: Keep `golden-tree.png` artwork ✓
2. **Card size**: Compact **140×64** ✓
3. **Generations**: User-selectable via toolbar control (5 / 7 / 9 / "All", MyHeritage-style depth selector)
4. **Gender accent**: **NO** — keep PlanAfter design, life-dot only (no gender border tint)
5. **In-laws**: Always shown as **ghost cards** (when Emma is focused, Marcus's parents appear above Marcus)
6. **Ex-spouse position**: **Stacked vertically** — current spouse beside anchor, ex stacked above with dashed line (NOT MyHeritage-style left-of-anchor)
7. **Add flow**: **Per-card ⋯ menu** → Add Parent / Add Spouse / Add Sibling / Add Child (replaces lower-left cross form)
8. **Phase order**: Start with **Phase 1 — Data-driven foundation**

---

## 🚀 Implementation Begins

Phase 1 work starts now. Scope:
- `paBuildTreeForAnchor(anchorId, opts)` — graph traversal of peopleStore
- `paRenderTree(layout, container)` — emit glass cards in canonical direction (ancestors UP, descendants DOWN)
- Replace hardcoded HTML in family-tree.html with single mount point
- Default anchor = Sarah, default depth = 5 generations
- SVG-based connection lines computed post-layout
- In-laws as ghost cards (lower opacity, dashed border)
- Ex-spouses stacked vertically with dashed couple line
