# Middle Column Card — Canonical Rule

**LOCKED 2026-04-28 by Violetka.**
**Applies to:** Every card in the middle column on EVERY page of the platform.

> **Rule:** Even if XD specs disagree, this is the canonical pattern. XD specs are inconsistent — this is the source of truth going forward.

---

## Visual specification

### Base layer (the card itself)

```css
background: rgba(255, 255, 255, 0.12);   /* very transparent, like sidebar nav default */
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
border: 1px solid #FFFFFF;
border-radius: 60px;                      /* full pill for 120px-tall cards */
box-shadow: 0px 10px 30px #00000029;
```

**Why so transparent:** the page background (cloud/marble texture) shows through. Cards feel "weightless" — like the sidebar nav items at default state.

### Top gradient overlay (`::before`)

```css
content: '';
position: absolute;
top: 0; left: 0;
width: 100%;
height: 50%;                              /* EXACTLY half the card height */
background: linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%);
border-radius: <same-top-radius> <same-top-radius> 0 0;
pointer-events: none;
```

**Key facts:**
- Gradient covers ONLY the top half (50% of card height)
- Goes from 70% white at top → fully transparent at the middle
- `border-radius` matches the card's top corners only

### Hover state

```css
background: rgba(255, 255, 255, 0.35);   /* moderate reveal — still see-through */
transition: background 0.2s ease-out;
```

### Self / "active" variant (e.g. Plan Owner card on My Family page)

```css
background: rgba(255, 255, 255, 0.20);   /* slightly more visible than other cards */
```

---

## CSS variables (to be added to `_shared.css`)

```css
:root {
    --card-bg-default:  rgba(255, 255, 255, 0.12);
    --card-bg-self:     rgba(255, 255, 255, 0.20);
    --card-bg-hover:    rgba(255, 255, 255, 0.35);
    --card-border:      #FFFFFF;
    --card-shadow:      0px 10px 30px #00000029;
    --card-blur:        blur(10px);
    --card-gradient:    linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%);
    --card-gradient-h:  50%;   /* gradient covers top 50% of card height */
}
```

---

## Where this is applied — IMPORTANT NUANCE

**The 0.12 opacity ONLY works when the card sits DIRECTLY on the page background** (cloud/marble texture). When cards are nested inside other contexts (dashboard with multiple stacked cards, profile accordion with multiple sections), 0.12 makes them invisible.

### Tier 1: Top-level cards (use `var(--card-bg-default)` = 0.12)
Cards that sit directly on the page background:

| Page | Card class | Status |
|------|-----------|--------|
| family.html | `.pd-card`, `.pd-overview-card`, `.pd-add-card` | ✅ Done |
| network.html | `.pd-card`, `.pd-overview-card` | ✅ Done |
| Tabs containers (any page) | `.profile-tabs` | ✅ Done (no gradient) |

### Tier 2: Profile / record accordion cards (0.33 — XD-confirmed)
Cards inside record pages (My Profile, record-family, record-network, record-pet):

| Card class | Opacity | Source |
|-----------|---------|--------|
| `.accordion-section` (Essential Info, Contact Info, Family & Relationships, Medical Info, Education, Employment, Beliefs) | **0.33** | XD spec confirmed 2026-04-28 (Fill Opacity 33% on Pad rectangle) |
| `.essential-info-card` | 0.33 | (uses .accordion-section style) |
| `.ci-section` | 0.33 | Inside Contact Info card |

XD spec for these:
```css
background: rgba(255, 255, 255, 0.33);   /* "Fill Opacity 33%" in XD Background Blur panel */
backdrop-filter: blur(10px);
box-shadow: 0px 10px 30px #00000029;
border: 1px solid #FFFFFF;
border-radius: 30px;
```

**Note:** XD's `background: #FFFFFF 0% 0% no-repeat padding-box` is the appearance.color → that's NOT the real fill. The real fill is in **Background Blur panel: Fill Opacity 33%**. Check that panel for the actual transparency.

### Tier 3: Dashboard nested cards (0.45)
Cards stacked tightly on the dashboard need slightly more contrast:

| Card class | Opacity | Status |
|-----------|---------|--------|
| `.dashboard-card` (Today's Tasks, Recent Activity, Key People, etc.) | 0.45 | ✅ Keep |
| `.activity-pad`, `.task-pad`, `.person-pad` (inner items) | 0.50 / transparent | ✅ Keep |
| `.kyc-flow-card`, `.kyc-steps-card` | varies | ✅ Keep |

### How to decide
- Card sits ALONE on page bg → use 0.12
- Card sits AMONG other cards → use 0.45 (or original)
- Tabs (any context) → 0.12 + NO gradient

### Lesson learned (2026-04-28)
Tried to migrate ALL cards to 0.12 in batch. Result: dashboard / profile pages became unreadable (text barely visible against barely-visible card). Reverted. Pattern is **selective, not universal.**

---

## Anti-patterns — DO NOT do this

- ❌ Hardcoded `background: #FFFFFF` (solid white)
- ❌ `background: rgba(255,255,255,0.45)` or 0.5 (too opaque)
- ❌ Gradient covering more than top 50%
- ❌ Gradient starting from below the top
- ❌ Per-page card opacity overrides
- ❌ "XD says solid white" — XD is wrong, follow this rule

---

## Migration plan (existing pages)

1. **Now:** family.html, network.html ✅
2. **Next:** Replace `background: rgba(255,255,255,0.45)` everywhere with `var(--card-bg-default)` (or 0.12)
3. **Verify:** screenshot each page — cards should look "lighter" (more transparent)
4. **Lock:** add this rule to DESIGN_SYSTEM_LIVE.md so future agents don't break it

---

## Reference

This rule was established by Violetka 2026-04-28 after reviewing XD reference and confirming the family.html implementation matches her vision. The XD specs (e.g. "background: #FFFFFF 0% 0% no-repeat padding-box") describe XD's flattened render preview, NOT the real intended pad style. Follow THIS rule, not the XD spec for backgrounds.


---

## Exception: Tab containers (`.profile-tabs`)

**Tabs use the same semi-transparent base BUT NO GRADIENT.**

```css
.profile-tabs {
    background: var(--card-bg-default);   /* same 0.12 transparency */
    box-shadow: var(--card-shadow);
    border: 1px solid var(--card-border);
    border-radius: 30px;
    backdrop-filter: blur(10px);
    /* NO ::before gradient — tabs are short pills, gradient would dominate */
}
```

**Why:** Tabs are 50px tall pills. A gradient covering 50% (25px) would be visually dominant over the small height. Tabs stay clean — just the transparent base.

This applies to tab pills on every page (My Family, My Network, profile records, etc.).


---

## 🔒 UNIVERSAL RECORD RULE (Locked 2026-04-28)

**The same card pattern applies to EVERY record type in the platform:**

- **People records**: profile.html (Sarah), record-family.html (John, Emma, etc.), record-network.html (Mark Davis, Dr. Emily), record-pet.html (Enzo)
- **Asset records**: record cards for each asset (bank account, property, vehicle, crypto, etc.)
- **Liability records**: each liability (mortgage, loan, credit card)
- **Future record types**: anything that has a Record (header card + tabs + accordion sections)

### The single canonical pattern (for ALL of the above)

**Header card** (top of every record page):
- 600×308 (or appropriate height per record type)
- background: var(--card-bg-default) = rgba(255,255,255,0.12)
- ::before gradient: 50% top half, #FFFFFF → transparent
- box-shadow: var(--card-shadow), border: 1px solid #FFFFFF, border-radius: 30px
- backdrop-filter: blur(10px)

**Tab pill** (Overview / Documents / Album / Life Story / etc.):
- Same 0.12 background, NO gradient (locked exception)
- height: 50px, border-radius: 30px
- width: fit-content (auto-adjusts to number of tabs)

**Accordion cards inside Overview tab** (Essential Info, Contact, Family, Medical, etc.):
- Same canonical pattern as header card
- background: var(--card-bg-default), gradient at 50% top
- When .open class added, gradient height grows to 670px (per XD spec for expanded state)

**Action bar icons** (right side of header card):
- 20×20 PNG icons (user-plus, download, share) — outline default + white hover
- visible at full opacity by default (not hidden)
- hover label appears to left at Inter 600 14/17

**Right-side black bar** (50px wide, on header card):
- background: #000
- contains action icons + (i) info icon at top (Unverified red)

### Why this is universal
A user opening record-bank-account.html should see THE SAME card chrome as record-family.html. Only the data differs. Future agents (Claude or human) building new record types MUST use this pattern. NEVER reinvent.

### Locked by Violetka 2026-04-28 (this session).
