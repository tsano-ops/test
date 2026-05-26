# PlanAfter — Master Analysis & Roadmap (v3, May 2026)

**Scope:** End-to-end review of Person Records system + Family Tree + per-record completeness, plus the prioritised implementation roadmap to make every page render perfectly with the existing canonical design system.

**Boundaries:**
- ZERO new visual design — only canonical components from `_shared.css`.
- ZERO new file structure — single `record.html` for all person types, gated via body classes.
- Single source of truth = `peopleStore.js` + `entriesStore.js`. Summary cards never own data.

---

## Part 1 — Current State Audit (what works today)

### 1.1 — Relationship Engine ✅ COMPLETE
Tested on all 15 records via `paGetRelationshipsForPerson()`. Output is per-spec:

| Person | Visible relationships | Notable derivations |
|---|---|---|
| Sarah | 12 (full + Enzo + 3 grandparents) | All canonical |
| John | 7 (Wife + 4 kids + 2 in-laws) | Step-Daughter for Emma ✓ |
| Jack | 4 (Ex-Wife + Emma + 2 in-laws) | Biological Daughter for Emma ✓ |
| Emma | 8 (3 parents + 3 half-siblings + 2 grandparents) | **Half-Sister/Brother** for Liam/Lisa/Noah ✓ |
| Liam/Lisa/Noah | 7 each | **Half-Sister** for Emma ✓ |
| Mary | 10 (Husband + child + 2 parents + Enzo + 4 grandkids + 1 in-law) | All canonical |
| Robert | 9 (Wife + child + Ben + 4 grandkids + 2 in-laws) | All canonical |
| Enzo | 2 (2 Guardian / Owner) | Pet semantics correct |
| Jane Doe Smith (✝) | 3 (Husband + daughter + granddaughter) | Spouse of John Smith ✓ |
| John Smith (✝) | 3 (Wife + daughter + granddaughter) | Spouse of Jane ✓ |
| Ben White (✝) | 2 (granddaughter + son) | All canonical |
| Dr. Emily White | 0 (network — no family) | Correct (no relationship edges) |
| Mark Davis | 0 (network — no family) | Correct |

**Auto-derived layers working:**
- Layer 2 perspective-aware (Wife from John's view ↔ Husband from Sarah's view)
- In-laws derived from spouse's parents (Mary as Mother-in-Law to John ✓)
- Grandparents from parent's parents (Mary as Grandmother to Emma ✓)
- Grandchildren from child's children (Sarah's kids as grandkids to Mary ✓)
- **Half-siblings auto-detected** (sharing one bio parent, not both)
- Spousal symmetry (Mary↔Robert, Jane↔John Smith both work)

### 1.2 — Photo / Avatar Sync ✅ COMPLETE
- `applyPlanOwnerPhoto()` syncs `img.avatar-plan-owner` / `img.plan-owner-photo` / `[data-person-id="sj"] img` universally
- `paSyncPersonAvatars()` walks all `[data-person-id]` / `[data-person]` and sets img.src from peopleStore
- Recovery: if Sarah's localStorage `planOwnerPhoto` was corrupted with another person's `img/Profile_img_N.png`, it auto-clears on next load
- Gate: localStorage writes are blocked on record-view pages (no more cross-person leakage)

### 1.3 — Essential Info Card on record.html ✅ COMPLETE
- View-as-person bootstrap (peopleById('sj') monkey-patch returns viewed person)
- Field order corrected per spec 2.2: Avatar → Names → Relationship Section → Gender → DoB → PoB → Citizenships → Country of Residence → Life Status → Death Info Block
- Life Status radio (Living / Deceased / Unknown) — canonical .ei-radio-group
- Death Info Block — empathy banner (.ee-upload-callout) + 3-part DoD picker (.ei-dob-row clone) + Place / Cause / Burial / Notes — all canonical
- Relationship Type + Specific Role — canonical .lsc-edit-rolelayer1-picker / lsc-edit-rolelayer2-host

### 1.4 — Family & Relationships Card ✅ MOSTLY COMPLETE
- `paRenderFamilyRelationships()` wipes Sarah's hardcoded F&R cards and injects viewed person's relationships
- Marital status + children count + minors count are now dynamic (no more "Married 4 children" on Emma)
- Grouped per spec into Immediate Family / Extended Family layers
- Each card uses canonical .fr-card-wrap / .fr-member-card / .fr-avatar-wrap / .fr-life-dot
- Layer 2 derived per perspective; in-law badge displayed

### 1.5 — Cross-Record Linked Entries ✅ COMPLETE
- `paInjectEntryRowFromStore()` injects entries into Overview cards based on cardKey matching .data-group-title
- `paRenderOverviewEntriesForPerson()` filters entriesStore by ownerId
- 11 cross-linked Sarah-owned entries (Marriage Cert → John, Birth Certs → kids, Death Certs → grandparents, Will → 8 people)
- Empty-state messaging refreshes after injection

### 1.6 — Entry Engine Data ✅ COMPLETE
- 39 seed entries with canonical ANEF_CONDITIONAL labels
- Smart Gender autofill from Specific Role (Husband → Male, Wife → Female)
- Entry save uses paGetCurrentOwnerId() so new entries get correct ownerId on record-view

---

## Part 2 — Family Tree Visualization Spec

### 2.1 — Spec requirements (from 2.2 master spec)
1. PlanOwner-anchored view (Me in middle)
2. Generations:
   - Children ABOVE PlanOwner
   - Parents BELOW
   - Grandparents further below
   - Partner alongside
3. **Visual relationship lines:**
   - **Solid lines** = biological
   - **Dashed lines** = step
   - **Distinct style** = half (e.g. dotted or striped)
4. **On hover** — line/path to PlanOwner highlights in different color
5. Each node = compact Linked Summary Card (avatar + name + Layer 2 + key date + age)

### 2.2 — Implementation strategy

#### A. Geometry / layout
**Use absolute-positioned cards inside an SVG-overlay container.**

```
container
  ├── svg.fr-tree-lines (absolute, z:0, full viewport, pointer-events:none)
  │     ├── <path class="line line-bio" d="M{p1.x},{p1.y} L{p2.x},{p2.y}"/>
  │     ├── <path class="line line-step" d="..."/>
  │     └── <path class="line line-half" d="..."/>
  └── div.fr-tree-nodes (absolute, z:1)
        ├── card[data-person-id="sj"]
        ├── card[data-person-id="jj"]
        └── ...
```

Cards positioned via:
```css
.fr-tree-card { position: absolute; transform: translate(-50%, -50%); }
```

with x/y computed from a layout pass (described below).

#### B. Layout algorithm (vertical generations, anchored on viewedPersonId)

```
Generations (relative to anchor):
   +2 = Great-Grandparents
   +1 = Grandparents
    0 = Anchor + Spouse (+ siblings horizontally)
   -1 = Children
   -2 = Grandchildren
```

Layout pass:
1. Place anchor at (centerX, centerY).
2. Place spouse at (centerX + 200, centerY).
3. Place children spaced horizontally at y = centerY - 200.
4. Place parents at y = centerY + 200, mom + dad symmetric.
5. Place grandparents at y = centerY + 400, with maternal/paternal subgrouping.
6. Place siblings at y = centerY, x = centerX - 200 - i*180 (left of anchor).
7. Pets at y = centerY + 100, x = centerX + 350 (alongside spouse, slightly down).
8. In-laws follow spouse-side (not displayed in tree by default; available in F&R card).

#### C. Line drawing — SVG paths

For each relationship between two cards, draw a path:

```javascript
function drawConnection(fromCard, toCard, type) {
    // type ∈ {'bio', 'step', 'half', 'spouse', 'pet'}
    const x1 = fromCard.centerX, y1 = fromCard.bottomY;
    const x2 = toCard.centerX,   y2 = toCard.topY;
    // Smooth orthogonal path: down → right → up
    const midY = (y1 + y2) / 2;
    return `M${x1},${y1} L${x1},${midY} L${x2},${midY} L${x2},${y2}`;
}
```

CSS classes for line types:
```css
.fr-tree-line { stroke-width: 2; fill: none; stroke-linecap: round; }
.fr-tree-line.line-bio    { stroke: #1B252E; }                          /* solid black */
.fr-tree-line.line-step   { stroke: #1B252E; stroke-dasharray: 6 4; }   /* dashed */
.fr-tree-line.line-half   { stroke: #1B252E; stroke-dasharray: 2 4; }   /* dotted */
.fr-tree-line.line-spouse { stroke: #C04D00; stroke-width: 2.5; }       /* horizontal husband-wife link in distinct color */
.fr-tree-line.line-pet    { stroke: #61C553; stroke-dasharray: 4 4; }   /* green dashed */
.fr-tree-line.highlight   { stroke: #1E5BCC; stroke-width: 3; }         /* on hover — path to PlanOwner */
```

#### D. Hover-highlight path-to-anchor

On `.fr-tree-card:hover`:
1. Compute path from hovered person back to PlanOwner (graph BFS).
2. For each edge in the path, add `.highlight` to the corresponding line.
3. Remove on mouseleave.

#### E. Connections to draw per anchor

For Sarah (anchor) the lines to draw:
- Sarah ↔ John (line-spouse, horizontal)
- Sarah ↔ Mary (line-bio, downward to parent)
- Sarah ↔ Robert (line-bio, downward to parent)
- Sarah ↔ Jack Daniel (line-spouse-former, horizontal-dashed)
- Sarah ↔ Emma/Liam/Lisa/Noah (line-bio, upward to children)
- John ↔ Emma (line-step, dashed — Emma is John's step-daughter)
- John ↔ Liam/Lisa/Noah (line-bio, upward — biological children)
- Jack ↔ Emma (line-bio, upward to Emma — Emma is Jack's bio daughter)
- Mary ↔ Robert (line-spouse, horizontal)
- Mary ↔ Jane (line-bio downward — Jane is Mary's mother)
- Mary ↔ John Smith (line-bio downward — JS is Mary's father)
- Robert ↔ Ben (line-bio downward — Ben is Robert's father)
- Jane ↔ John Smith (line-spouse, horizontal)
- Sarah ↔ Enzo (line-pet)
- Mary ↔ Enzo (line-pet, secondary guardian, dashed)

This reveals the visual encoding:
- Solid = biological parent/child OR spouse (+ horizontal)
- Dashed = step OR former
- Dotted = half
- Green dashed = pet relationship

### 2.3 — Three view modes (per spec)

`family.html` already has the structure for 3 modes:
1. **Family Tree** — visual generational layout (this section)
2. **Family Members** — structured list (PlanOwner / Spouse / etc.)
3. **Timeline** — narrative milestones ("Grandparents born" / "Parents born" / "My birth" / "Children born")

Implementation order: Tree first (P0), Members list (P1 — already partially exists), Timeline (P2).

---

## Part 3 — Per-Record Field Audit (data completeness)

### 3.1 — Family records (12 + Sarah)

| ID | Name | Essential complete? | Contact complete? | Entries count | Cross-linked from Sarah | Gaps |
|---|---|:---:|:---:|---:|---:|---|
| sj | Sarah | ✅ | ✅ | hardcoded + 11 owned | n/a | — |
| jj | John | ✅ | ✅ | 4 | 2 (marriage, will) | — |
| em | Emma | ✅ | ✅ | 3 | 2 (birth cert, will) | — |
| li | Liam | ✅ | ✅ | 2 (school + hobby) | 2 | — |
| ls | Lisa | ✅ | ✅ | 3 (school + allergy + hobby) | 2 | — |
| no | Noah | ✅ | ✅ | 3 (school + allergy + hobby) | 2 (birth + EpiPen) | — |
| ms | Mary | ✅ | ✅ | 4 (2 conditions + 1 belief + 1 medication) | 1 (will) | — |
| rs | Robert | ✅ | ✅ | 3 (employment + condition + medication) | 1 (will) | — |
| enzo | Enzo (pet) | partial — needs Pet variation render | n/a | 3 (rabies + microchip + hip dysplasia) | 0 | Pet UI variation NOT yet implemented |
| jd | Jack | ✅ | ✅ | 2 (employment + education) | 1 (divorce cert) | — |
| jds | Jane Doe Smith (✝) | ✅ | partial (no email/phone — deceased) | 2 (edu + employment) | 1 (death cert) | — |
| jsm | John Smith (✝) | ✅ | partial (deceased) | 2 (Royal Navy + marriage cert) | 1 (death cert) | — |
| bw | Ben White (✝) | ✅ | partial (deceased, Bulgaria) | 2 (carpentry + Sunday tradition) | 1 (death cert) | — |

### 3.2 — Network records (2)

| ID | Name | Essential | Contact | Entries | Access Level field | Gaps |
|---|---|:---:|:---:|---:|:---:|---|
| drwhite | Dr. Emily White | ✅ | ✅ | 3 (PhD + employment + Law Society) | data exists, not rendered | Network UI variation needed |
| mdavis | Mark Davis | ✅ | ✅ | 2 (LL.M. + SRA) | data exists, not rendered | Network UI variation needed |

### 3.3 — Total entries

- Owned by Sarah (Plan Owner): 11 cross-linked + ~5 hardcoded = ~16
- Owned by 14 non-Sarah persons: 31 entries
- **Grand total: ~47 entries**, all using canonical ANEF_CONDITIONAL labels

---

## Part 4 — Universal Patterns (canonical components catalogue)

### 4.1 — Summary Card variants (per spec 3.x)

| Variant | Density | Used where | CSS classes |
|---|---|---|---|
| Record Header | High | Top of opened record | `.profile-header-card`, `.identity-card-XL` |
| Linked Summary Card | Medium | Cross-references, contact pickers | `.lsc-shell`, `.lsc-avatar-wrap`, `.lsc-name`, `.lsc-meta` |
| Extended Linked Summary Card | Medium+ | Inline expandable (shows Contact Info on expand) | `.lsc-shell.lsc-extended` |
| Compact Linked Summary Card | Low | Family tree nodes, dense lists | `.fr-card-wrap`, `.fr-member-card`, `.fr-tree-card` |

### 4.2 — Field components (per ANEF spec)

| Component | CSS class | Used for |
|---|---|---|
| Searchable picker | `.ee-contact-picker` | Country, Relationship, Cause of Death |
| 3-part date picker | `.ei-dob-row` | DoB, DoD, Marriage Date, Adoption Date |
| Text input row | `.ee-input-row` + `.ee-input-wrap` + `.ee-input-value` + `.ee-input-label` | Place of Birth, Burial Location, etc. |
| Notes pad | `.ee-pad-textarea` | Death notes, additional info |
| Radio group (pill) | `.ei-radio-group` + `.ei-radio-item` | Gender, Life Status |
| Empathy callout | `.ee-upload-callout` | Death Info banner |
| Adaptive timeline | `.tl-section` + `.tl-dd-trigger` | Entry timeline (employment dates etc.) |
| Card icon menu (...) | `.entry-menu`, `.doc-menu` | Edit/Archive/Delete on entries |

### 4.3 — Body class flags (driving visibility per record-type)

| Class | Set when | Reveals/Hides |
|---|---|---|
| `body.pa-record-view` | record.html opens with non-Sarah id | `.pa-record-only` blocks |
| `body.pa-deceased` | viewed person's lifeStatus = Deceased | `.pa-deceased-only` blocks (Death Info) |
| `body.pa-record-pet` | viewed.categories includes 'pet' | `.pa-pet-only` shows; `.pa-hide-on-pet` hides |
| `body.pa-record-network` | viewed.categories includes 'network' | `.pa-network-only` shows (Access Level) |

---

## Part 5 — Implementation Roadmap (sequenced)

### Phase A — Family Tree connecting lines (P0)
**Why first:** User flagged this directly. Spec says lines are required; tree is currently visually disconnected boxes.

**Files:** `family.html`, `family-tree.html`, `_shared.css`, `_shared.js`

**Tasks:**
1. Audit current tree markup — find existing `.ftree-card` positions (per generation lane)
2. Wrap tree in `<svg class="fr-tree-lines">` overlay
3. Compute card positions in JS (post-layout) — read each `.ftree-card` `getBoundingClientRect()` relative to container
4. Generate path `<path>` elements per relationship per spec encoding (solid bio / dashed step / dotted half / orange spouse / green pet)
5. Add hover handler — on `.ftree-card:hover`, BFS the relationship graph back to PlanOwner, add `.highlight` to those paths
6. Test: hover Mary → highlights Mary→Sarah path in blue
7. Add view-mode toggle — Family Tree / Family Members / Timeline buttons (already exist in markup; just needs wiring)

### Phase B — Perspective-aware Family Tree (P0)
**Why:** Currently family.html is anchored on Sarah only. Per spec, when on John's record, his "tree" should center on him.

**Tasks:**
1. Add bootstrap to family-tree.html similar to record.html (read `?id=` param, set anchor)
2. Recompute positions based on anchor instead of Sarah
3. Quick Add only allows direct relations to anchor (Parent / Child / Sibling / Partner)

### Phase C — Bidirectional sync (P0)
**Why:** When user edits Layer 1+2 on John's record, Sarah's record should update reciprocal edge.

**Tasks:**
1. Hook into `paPickRelationshipLayer1` / `paPickRelationshipLayer2` save handlers
2. After mutating viewed person's edge, also write inverse edge on the other person's `relationships` array
3. Use `paInverseEdgeType()` (already exists) for the type
4. Tier A auto-create per spec

### Phase D — Layer 3 Conditional Timeline Dates (P0)
**Why:** Spec says edges carry shared timeline dates (Marriage, Divorce, Adoption, Joined Our Family).

**Tasks:**
1. Extend each edge schema: `{toId, type, dates: {marriageDate, divorceDate, adoptionDate, joinedDate, ...}}`
2. Add canonical 3-part date picker per role (per role spec 2.2.3.1 table)
3. Store dates on the edge itself (NOT on the person), so both perspectives see identical values

### Phase E — Memorial Page tab (P1)
**Why:** Spec says deceased records get Memorial tab visible.

**Tasks:**
1. Add `.profile-tab-memorial` markup if not present (already exists I believe)
2. CSS: `body.pa-deceased .profile-tab-memorial { display: inline-flex; }` else hidden
3. Memorial tab content: photos / tributes / messages

### Phase F — Pet variation (P1)
**Why:** Enzo is a pet — needs different EI fields (Species/Breed/Sex/Joined Our Family) per spec.

**Tasks:**
1. Add `body.pa-record-pet` flag in bootstrap
2. Add pet-specific fields markup with `data-pa-pet-only`
3. Hide non-pet fields (Citizenship, Country of Residence, Relationship Section) with `data-pa-hide-on-pet`
4. Pet F&R card shows only Owner/Guardian relationships

### Phase G — Network Access Level (P1)
**Why:** Dr. Emily White and Mark Davis need explicit Access Level field per spec 2.4.

**Tasks:**
1. Add Access Level row in EI markup (read + edit)
2. Conditional via `body.pa-record-network`
3. Wire to peopleStore.accessLevel

### Phase H — Three view modes on family.html (P2)
1. **Family Members tab:** structured list grouped by relationship type (already partially exists in `_shared.js` — needs full wiring)
2. **Timeline tab:** narrative milestones — render life events chronologically

### Phase I — Final polish (P3)
1. Add great-grandparent derivation (2 levels deep)
2. Add household-pet derivation (Enzo on Emma's view)
3. Add former in-law cleanup (Jack should NOT show Mary/Robert as in-laws)
4. Add Tier B auto-suggest with confirmation modal
5. Add sibling type confirmation prompt (per spec 2.2.3.2 §4 — done logically, UI prompt missing)

---

## Part 6 — Open Decisions (need user input)

1. **Sibling type (Emma's case):** Currently auto-derived as Half-Sibling. ✅ confirmed correct after Jack-as-bio-father correction.
2. **Former in-laws:** Should Jack's record show Mary/Robert as in-laws? **Recommend: NO** (he's divorced, they're former in-laws — sensitive case). Currently shows. **Action:** strip in-law derivation when only edge type is `former-spouse`.
3. **Household pets:** Should Emma/Liam/Lisa/Noah see Enzo on their record? Per spec, Enzo belongs to PlanOwner. **Recommend: yes, derive as "Family Pet"** since they all live together. **Action:** add household-pet derivation rule.
4. **Great-grandparents from kids' view:** Should Emma see Jane/JS/Ben as Great-Grandmother/Father? **Recommend: yes** (2-level traversal) — kids are old enough to know them (Emma met JS, Jane).
5. **Memorial tab content:** What should it show? Per spec 3.5: photos, tributes, messages, candles. Need to scope V1 vs full.
6. **Family tree line color encoding:** Currently proposing black (bio), orange (spouse), dashed for step. **Recommend: confirm color palette** before implementation.

---

## Part 7 — Time estimates

Each phase, given the single-page-clone architecture and canonical components:

| Phase | Estimated time | Risk |
|---|---|---|
| A — Tree connecting lines | 2-3h | Medium (geometry math) |
| B — Perspective-aware tree | 1h | Low |
| C — Bidirectional sync | 1.5h | Low |
| D — Layer 3 timeline dates | 2h | Medium (date picker generic component) |
| E — Memorial tab | 0.5h | Low |
| F — Pet variation | 1h | Low |
| G — Network Access Level | 0.5h | Low |
| H — 3 view modes | 1.5h | Low |
| I — Final polish | 1h | Low |

**Total: ~11-12h of focused work.** With the user's 6h budget, can complete Phases A + B + C + D + E + F + G in a single session (the core 80%); polish (H, I) in a follow-up.

---

## Recommendation for THIS session (next 6h)

**Sequence:**
1. **Phase A** (Family Tree lines) — 2-3h
2. **Phase E** (Memorial tab) — 0.5h
3. **Phase F** (Pet variation) — 1h
4. **Phase C** (Bidirectional sync) — 1.5h
5. **Phase D** (Layer 3 timeline dates if time remains) — 2h

This delivers the most visible features: tree with lines + memorial + pet variation. Bidirectional + dates round out the mechanical correctness.

Phases B (perspective tree), G (Network access level), H (view modes), I (polish) can happen in next session.

---

**Awaiting:** Your ✅ on this plan + decisions on the 6 open questions in Part 6. Then I start Phase A.
