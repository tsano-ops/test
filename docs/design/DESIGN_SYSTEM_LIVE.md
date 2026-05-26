# PlanAfter — Living Design System

> This file is the persistent design memory across sessions.
> Read at the START of every session. Update after every confirmed pattern.
> Last updated: 2026-05-16 (session — F&R card canonical design + POV-correct relationship logic applied to ALL records: F&R Add X canonical form via buildContactEditFormHtml + options (hideDirectoryPill, presetDir, presetLayer1, hideRelationshipType, isPetForm, saveOnclick, extraFormAttrs); Pet form Species/Breed/Microchip/Vet/Vet Phone/Guardian; Extended Family 21 Layer-2 roles + Other (custom); POV-aware F&R Add panel title 'Adding a X to <Anchor>'; relationship engine fixes (paInverseEdgeType expanded for all in-law/foster/step/great-* pairs; skip stored in-law-* in step 1+2; NEW 6c CHILD-IN-LAW + 6d SIBLING-IN-LAW derivations; rel.derivedLayer2 priority in roleLabel; record.html VIEWER reads __paViewedPersonRealId; inLawSuffix() helper avoids 'X-in-Law In-Law'); paUpdateFamilyHeaderStats POV-aware with legal split (bio+adopted=Number of Children, separate Step+Foster); Confirm Suggestion UX flow (snapshot→re-render→restore + auto-expand); inline Edit notes textarea + frToggleMember click guard; F&R card 100px margin-left on all records. Commit 01ba5e2.)

---

## 🔒 LOCKED 2026-04-27 — System Popup Pattern (universal Delete / Unsaved Changes)

Every confirmation popup (Delete X, Remove relationship, Unsaved Changes) uses the SAME canonical layout. ONE component, parameterized by `title` + `body` + `actionLabel` + `discardLabel`. Built on `#unsavedOverlay` and called via `showSystemPopup({ ... })`.

**Layout (XD baseline 1920×1080):**
- Backdrop: full screen `#FFFFFF` + `backdrop-filter: blur(10px)`
- Pad: 400 wide × auto height, white bg, `box-shadow: 0px 10px 30px #00000029`, `border: 1px solid #FFFFFF`, `border-radius: 30px`, `backdrop-filter: blur(10px)`
- Top gradient overlay on pad: 400×127, `linear-gradient(180deg, #FFFFFF 0%, #FFFFFF00 100%)`, radius 30 30 0 0
- Header row:
  - Attention icon 50×40 `img/attention.png` border 2px solid #000
  - Title: Inter 600 20/24 #000000
  - Cancel X (top-right): 20×20 `img/Cancel.png` opacity 0.5 → 1 hover
- Body: Inter 600 16/24 #000000 — copy varies per variant
- Action button (bottom-right):
  - Label "Delete" / "Remove" / "Save": Inter normal 16/24 `#FF0000` (or `#000000` for Save), text-align right
  - Red circle 60×60 `#FF0000` r:30
  - Arrow icon 9×16 `img/arrow right.png`
- Discard (bottom-left): "Cancel" or "Don't Save" — pill button

**14 variants registered (`window.show*Popup`):**

| Variant | Title | Body |
|---------|-------|------|

---

## 🔒 LOCKED 2026-04-28 — Middle Column Card Pattern (UNIVERSAL RULE)

**Applies to:** Every card in the middle column on EVERY page of the platform.

**Critical:** Even if XD specs disagree (they often show "background: #FFFFFF" — that is XD's flattened render preview), this is the actual canonical pattern. Apply EVERYWHERE.

### Specs

```css
/* Base */
background: rgba(255, 255, 255, 0.12);   /* var(--card-bg-default) */
backdrop-filter: blur(10px);
border: 1px solid #FFFFFF;
border-radius: 60px;                      /* for 120px-tall pill cards */
box-shadow: 0px 10px 30px #00000029;

/* Top gradient overlay — ::before pseudo-element */
height: 50%;                              /* covers top half ONLY */
background: linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%);

/* Hover */
background: rgba(255, 255, 255, 0.35);   /* var(--card-bg-hover) */

/* "Self" variant (Plan Owner card etc.) */
background: rgba(255, 255, 255, 0.20);   /* var(--card-bg-self) */
```

### Why so transparent

Same opacity feel as sidebar nav items at default state. Cards must let the page background (cloud/marble texture) show through. Cards feel "weightless" not "solid card on transparent bg."

### CSS variables in `_shared.css`

```css
--card-bg-default:  rgba(255, 255, 255, 0.12);
--card-bg-self:     rgba(255, 255, 255, 0.20);
--card-bg-hover:    rgba(255, 255, 255, 0.35);
--card-border:      #FFFFFF;
--card-shadow:      0px 10px 30px #00000029;
--card-gradient:    linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%);
--card-gradient-h:  50%;
```

### Where applied
- ✅ family.html (`.pd-card`, `.pd-overview-card`, `.pd-add-card`)
- ✅ network.html (same classes)
- ⏳ vault.html, profile.html, record-*.html, dashboard cards (.dashboard-card, .person-pad, .activity-pad), Quick Actions, Articles & Resources

### Anti-patterns — DO NOT do this
- ❌ `background: #FFFFFF` (solid white)
- ❌ `background: rgba(255,255,255,0.45)` (too opaque)
- ❌ Gradient longer than 50% of card height
- ❌ Per-page opacity overrides
- ❌ Trust XD spec for card background — it's wrong

**Reference:** `CARD_RULES.md` at project root.

| `showDeleteEmailPopup` | Delete E-mail | Are you sure you want to delete this E-mail? This action cannot be undone! |
| `showDeletePhonePopup` | Delete Phone Number | Are you sure you want to delete this Phone Number? This action cannot be undone! |
| `showDeleteSocialPopup` | Delete Social Media Profile | Are you sure you want to delete this Social Media Profile? This action cannot be undone! |
| `showDeleteAddressPopup` | Delete Address | Are you sure you want to delete this Address? This action cannot be undone! |
| `showDeleteFilePopup` | Delete File | Are you sure you want to delete this file? This action cannot be undone! |
| `showDeleteDocumentPopup` | Delete Document | Are you sure you want to delete this document? This action cannot be undone! |
| `showDeleteDocumentsPopup` | Delete Documents | Are you sure you want to delete selected documents? This action cannot be undone! |
| `showDeleteEntryPopup` | Delete Entry | Are you sure you want to delete this entry? This action cannot be undone! |
| `showDeleteEntriesPopup` | Delete Entries | Are you sure you want to delete Selected Entries? This action cannot be undone! |
| `showDeleteCredentialPopup` | Delete Credential | Are you sure you want to delete this Credential? This action cannot be undone! |
| `showDeleteContactPopup` | Delete Contact | Are you sure you want to delete this Contact? This action cannot be undone! |
| `showDeleteTaskPopup` | Delete Task | Are you sure you want to delete this Task? This action cannot be undone! |
| `showRemoveRelationshipPopup` | Remove relationship | This will unlink the relationship!\nThe person's record will not be deleted. (action: Remove) |
| `showUnsavedPopup` | Unsaved Changes | You are in Edit Mode. Do you want to save changes before exit? (Don't Save / Save) |

**Rules:**
- NEVER use `confirm()` or `alert()` for any destructive action — always one of these popups.
- NEVER build a new popup variant from scratch — extend `showSystemPopup` and add a new wrapper.
- The "Remove" / "Save" / "Delete" label drives the button width via `showSystemPopup`'s width recalc.
- Popup is dismissible via X (top-right) or Cancel/Don't Save (left button).

**Implementation:** `showSystemPopup({ title, body, actionLabel, discardLabel, onAction, onDiscard, onAfter })` in `html-prototype/_shared.js`. The same `#unsavedOverlay` element renders every variant.

---

## 🔒 LOCKED 2026-04-27 — Searchable Picker Pattern (universal)

Every dropdown built on `.ee-contact-picker` is a SEARCHABLE picker — never a static list.

**Why:** Long lists (195+ countries, 15 Document Types, 30+ medical conditions) are unusable without typing-to-filter. The user must SEE that they can type — not guess.

**Behavior (LOCKED, applies to every picker on every card):**
1. **Visible affordance** — when picker opens, the input gets placeholder `Type to search…`. If author defined a custom placeholder, that one wins (preserved on `_origPlaceholder`).
2. **Auto-focus** — input is focused immediately on open so user can start typing without an extra click.
3. **Real-time filter** — typing filters `.ee-contact-option` items via `filterPickerOptions` (case-insensitive, matches name + role). Empty groups hide. The "+ Create new" CTA never hides.
4. **Reset on close** — `closeContactPicker` clears `input.value` so the next open shows the full list.
5. **Detached suggestions** — dropdown moves to `document.body` on open (escape `overflow:hidden`), repositioned on scroll/resize.

**No magnifier icon.** The placeholder text IS the affordance. Don't add a search SVG inside the picker.

**Implementation reference (canonical, do not duplicate):**
- `openContactPicker(wrapEl)` in `html-prototype/_shared.js` — sets placeholder, focuses input, wires the filter via `_searchWired` flag.
- `filterPickerOptions(picker, query)` — the filter logic.
- `closeContactPicker(picker)` — clears input value + restores suggestions.
- CSS: `.ee-contact-picker.open .ee-contact-picker-value { display:none }` + `.ee-contact-picker.open .ee-contact-picker-input { display:block }`.

**Applies to:** Document Type, Country of Issue, Allergens, Conditions, Medications, Categories, Education Country, Employment Organisation, Beliefs Affiliation, Contacts, Family Relationship Type, Locations — every picker, every card.

---

## 🔒 LOCKED 2026-04-27 — Entry-row Edit affordance: ⋯ menu only

Every entry row (Essential Info docs, Medical, Education, Employment, Memberships, Beliefs, Family, Contacts) has EXACTLY ONE entry to Edit mode: the ⋯ menu → Edit row.

**Why:** User flagged a white circle that appeared on row hover behind a secondary Edit pencil button I had added. She'd never asked for it ("никога не сум ти казвал зе иам кръг отзад"). No secondary affordance, no parallel button, no hover-circle — the LOCKED ⋯ menu pattern is the sole way to enter Edit.

**DO NOT:**
- Add `.entry-edit-pencil` or any other top-right pencil button on the row
- Add a hover-circle or hover-pad behind ⋯
- Build a "quick Edit" shortcut elsewhere on the row

**DO:**
- Use the LOCKED ⋯ menu pattern (see entry_options_menu_locked memory) — pad 150 × auto, glass r:25, dd-row Edit / Archive / Delete.
- Keep `.doc-menu` / `.entry-menu` styles untouched.

---

## 🔒 LOCKED 2026-04-27 — Identity & Vital Documents: Document Type list

Single canonical Document Type dropdown for Essential Info → Document Entries (replaces the previous 7-category split). 15 options:

```
Passport
National ID Card
Driver's License
Birth Certificate
Residence Permit
EU Blue Card
Visa
Work Permit
Social Security / National Insurance
Name Change Document
Citizenship Certificate
Refugee Status Document
Death Certificate
Marriage Certificate
Other
```

Each type has its own conditional field set (Country of Issue + relevant Number/Place/Spouse/etc.). Issue Date and Expiry Date stay in the Adaptive Timeline Builder (not in About). On Edit mode, all canonical fields for the entry's type auto-mount even if the existing entry pre-dates them — view mode still hides empty fields per XD rule.

Defined in `ANEF_CONDITIONAL` + `ESSENTIAL_CATEGORIES` in `html-prototype/_shared.js`.

---

## 🔒 LOCKED 2026-04-27 — Essential Info Card (universal across all records)

This design applies **identically** to every record's Essential Info card —
profile.html (Sarah/Plan Owner), record-family.html (any family member),
record-pet.html (any pet), record-network.html (any network contact). No
variants, no improvisation. Plan Owner adds KYC verification badge layer.

### Header
- Title "Essential Info": Inter 600 20/24, opacity 1, top:508 left:690 (128×24)
- Subtitle: "Your core identity information - the foundation of your entire plan" (HYPHEN, not em-dash). Inter normal 14/17, opacity 0.5, top:542 left:690 (422×17)
- Description paragraph: Inter normal 14/17, opacity 1, top:589 left:690 (540×85). Text:
  > All core identity details and important documents are kept here in one organised space. You no longer need to search through folders or messages - everything essential about you is always one click away. A complete profile strengthens your entire plan and ensures your loved ones can quickly find the information they may one day need.

### Edit button
- Position: top:689 left:1179, area 71×50
- Label "Edit": top:707 left:1179, 21×15, Inter normal 12/15, right-aligned, opacity 1
- Glass circle 50×50 at top:689 left:1200 (white, 1px white border, opacity 0 default → 1 on Hover-Tap-Hold transition 0.2s ease-out)
- Edit icon 20×18 at top:705 left:1215 (img/edit.png, 2px black stroke)

### Avatar
- Wrap 80×80 at top:739 left:760 (white opacity 0.33)
- Photo 60×60 at top:749 left:770
- Life dot 8×8 at top:801 left:780, color #61C553 (alive) / #FF2C55 (deceased)

### Read-mode field rows (pattern, applies to all 6 fields):
- Value: Inter 600 16/24, color #000, opacity 1, left:850, width 310, height 20
- Caption: Inter normal 12/15, opacity 0.5, left:850, width up to 121, height 15, **margin-top: 4px** below value
- Vertical gap between consecutive fields: **35px** between value-tops (=20 value + 15 between caption-bottom and next value)

Six canonical fields, in order:
1. Full Name (e.g. "Sarah Robert Johnson") — value top:760, caption top:784
2. Gender (e.g. "Female") — value top:819, caption top:843
3. Date of Birth (e.g. "July 22, 1980") — value top:878, caption top:902
4. Place of Birth (e.g. "New York, United States") — value top:937, caption top:961
5. Citizenship(s) (comma-separated) — value top:996, caption top:1020
6. Country of Residence — value top:1055, caption top:1079

### Identity & Vital Documents (data-group-title)
- White pad 600×60 at top:1124 left:660 (background #FFFFFF, opacity 1)
- Title text "Identity & Vital Documents": Inter 600 16/24, opacity 0.5, **centered**, top:1144 left:859, width 202, height 20
- **Spacing above (Country of Residence caption bottom → pad top): 30px**
- **Spacing below (pad bottom → "Add Document" label top): 20px**

### Add Document button (.emc-add-entry-btn — canonical locked)
- Container 400×80 at top:1234 left:760
- Label "Add Document": Inter 600 16/24, opacity 1, **centered**, top:1204 left:903 (114×20)
- Dashed line L + 50×50 plus circle + dashed line R

### First entry row (.doc-row)
- 600×100 white opacity 0.5 at top:1334 left:660 (extends to card edges via negative margin)
- Hover-Tap-Hold state: opacity becomes 1 (Auto-Animate, easing None, 0s)

### Universal rule (LOCKED 2026-04-27)
Every group title on the platform uses **Inter 600 16/24, opacity 0.5, centered**. Background varies by card:
- **Essential Info** (`Identity & Vital Documents`) → white 60px pad, 30px above / 20px below
- **Family & Relationships** (`Relationship & Status Documents`) → white 60px pad, 30px above / 20px below
- **Medical / Education / Employment / Beliefs** group titles → transparent (text-only), 20px above / 10px below

This styling lives in `_shared.css` under `.data-group-title` (default text-only) and `.essential-info-card .data-group-title, #fr-card .data-group-title` (white pad variant). All record HTMLs (profile.html, record-family.html, record-pet.html, record-network.html) share the same CSS, so the design propagates automatically to every person's record.

`.emc-add-entry-btn` (400×80 with dashed lines + plus circle + "Add Document" 600 16/24 label) and `.doc-row` (600×100, white opacity 0.5) entry pattern remain unchanged from earlier locks.

---

## 🐛 KNOWN BUGS — record.html (2026-04-26)

User-reported design mismatches in `record.html` vs canonical XD references for non-Plan-Owner records. Reference screenshots provided by user 2026-04-26.

**Bug #1 — Wrong cards for Network records**
- Symptom: `record.html#mdavis` (Mark Davis, Network) shows all 7 cards. Per spec a Network record has only **5 cards**: Essential Info, Contact Info, Roles & Access, Tasks & Reminders, Shared With.
- Tabs also wrong: Network records have only **Overview / Documents** (alive) or **Overview / Documents / Memorial Page** (deceased). NEVER Album or Life Story for Network.
- Root cause: record.html unconditionally loads all 7 partials regardless of record type.
- Fix scope: filter `cardLoaders` by `peopleStore[id].categories[]` in `renderPersonRecord()`. Filter tabs likewise.

**Bug #2 — Wrong action sidebar icons**
- Reference (Mark Davis, Network, alive): 4 icons → Heart (Update Life Status) / Download / Share / Delete
- Reference (Jane Doe Smith, Family, deceased): 5 icons → Heart / User+ (Add Family) / Download / Share / Delete
- Reference (Pet): 1 icon → Heart only
- Current record.html: 3 icons (Add Family / Download / Share) — wrong.
- Fix scope: per-record-type sidebar icon set in `record.html`. Plan Owner profile.html unchanged (locked).

**Bug #3 — No deceased state support**
- Reference (Jane Doe Smith, deceased): red life dot · "In Memory" indicator (red text under role) · Date of Death · Age at Passing (instead of current Age) · **Memorial Page tab** appears
- Current record.html: no deceased branch — always shows alive layout.
- Fix scope: detect `person.alive === false` → swap layout (red dot, In Memory, DOD/Age at Passing, +Memorial tab).

**Bug #4 — Medical Info card missing Emergency Medical Card snapshot**
- Reference: profile.html Medical Info has the EMC (Emergency Medical Card) snapshot at the top — Blood Type pill, Allergies bars, Conditions tags, Medical Devices badges. Each one in empty state when no entry exists, populated when entries are added. Below the EMC snapshot is the "+ Add New Entry" button.
- Current `partials/card-medical-info.html`: has `[data-mi-emc-snapshot]` mount but no rendering function populates it.
- Fix scope: implement `populateEmcSnapshot(person)` to render the same EMC snapshot UI as profile.html (locked design — Blood Type, Allergies bars, Conditions, Devices), reading from `peopleStore[id].entries.medical`.
- Reported by user: 2026-04-26 ("Medical Info — има emergency medical card с empty states и чак отдолу има add new entry")

**Bug #5 — Partials are simplified vs canonical profile.html (PLATFORM-WIDE RULE)**

**User rule (2026-04-26, RE-CONFIRMED 2026-04-27):** Every card in every record HTML MUST match the locked profile.html structure 1:1 — same sections, same sub-groups, same edit modes, same FUNCTIONALITY (edit name, add new entry, save changes, all controls). NO simplifications, NO improvisations. If user enters any record, all behaviors that work on Sarah's My Profile MUST work identically on that record.

Current `partials/` are TOO simple. Need to be rebuilt by COPYING exact markup from profile.html, not paraphrased.

**Per-card audit vs profile.html:**

| Card | Profile.html canonical structure | Current partial | Gap |
|---|---|---|---|
| Essential Info | Avatar picker + Album panel + Repo panel + 5 fields + Edit toggle | Simplified avatar wrap + 5 fields | Missing: avatar picker / album panel / repo panel / KYC integration |
| Contact Info | `.ci-section / .ci-group-title (with .ci-icon-box) / .ci-primary-card / .ci-extra-group / .ci-edit-container` for E-mails / Phones / Address / Social Media | Has ci-section mounts | Missing: edit container, dgt-dots menu, full edit forms |
| **Family & Relationships** | `.fr-sections-outer` with **collapsible sections**: Immediate Family (Spouse/Partner, Children, Parents, Siblings) / Extended (Former Partners, Grandparents, Grandchildren, Aunts/Uncles, Cousins) / Pets. Status block (Marital, Number of Children, Minors counts). Edit mode for adding new family members. | Simple flat groups by relationship type | Missing: section headers (Immediate/Extended/Pets), collapsible toggle, status block, edit mode |
| Medical Info | EMC snapshot (Blood Type pill / Allergies bars / Conditions tags / Devices badges) + entries grouped + Add New Entry below | Empty mount for snapshot + entries | Missing: EMC snapshot rendering, edit modes, entry expand pattern |
| Education | `ed-*` accordion + entries grouped (Educational Qualifications / Professional Certifications / Other) + Add New Entry | Just entries mount + Add btn | Missing: full edit modes, group section headers |
| Employment | `emp-*` accordion + Employment Entries + Memberships & Affiliations + Professional Licenses + Add | Just entries mount | Missing: section structure |
| Beliefs, Hobbies & Interests | `bel-*` accordion + Beliefs + Hobbies + Interests sections + Add | Just entries mount | Missing: section structure |

**Fix scope (Sprint 7 → multi-day rebuild):**
1. For each partial: open profile.html, copy the EXACT card markup verbatim, replace Sarah-specific IDs/values with `[data-*]` placeholders, update populate function to fill placeholders from peopleStore[id].
2. Don't improvise — every class, every nested div, every onclick must come from profile.html.
3. Verify each card visually 1:1 with profile.html before moving to next.

**Bug #6 — My Family page (family.html) missing canonical structure**

Reference (user-confirmed 2026-04-26):

**Top of page** = analytics/tool area, positioned where the record header sits on profile.html. Shows family stats (Marital status, Number of Children, Minors count, Total Family Size, etc.).

**Below header** = 3 tabs: **Family Tree** / **Family Members** / **Timeline** (canonical .profile-tabs structure) + ⋯ menu on far right (Add Family / Download / Print actions)

**Under "Family Members" tab** = collapsible sections (• bullet + minus icon on right when expanded):

```
Immediate Family (collapsible)
  Spouse / Partner
    [John Johnson card · Husband · Since Sep 28, 2005 · Executor, Beneficiary]
  Children
    [Emma, Liam, Lisa, Noah cards · Beneficiary badges]
  Parents
    [Mary Smith, Robert Smith cards · Executor, Beneficiary]
  Pets
    [Enzo card · Dog · Golden Retriever]

Extended Family (collapsible)
  Former Spouses / Partners
    [Jack Daniel card · Your Ex-husband]
  Grandparents
    [Jane Doe Smith · In Memory · Biological Grandmother (Jan 1, 1920 - Dec 6, 2000)]
    [John Smith · In Memory]
    [Ben White · In Memory]
```

**Each card uses canonical Linked Summary Card pattern:**
- Avatar with life dot (green alive / red deceased)
- Name (bold)
- Role line: "Your Husband" / "Your Biological Daughter" / "Your Dog · Golden Retriever" / "Your Ex-husband"
- Date line: DOB + Age, or DOB - DOD for deceased, "Since <date>" for current spouse
- Top-right badge: Plan Role (Executor/Beneficiary/etc.) OR **"In Memory"** in red for deceased
- ⋯ menu top-right

**Current family.html:** Simple peopleStore-driven flat list with My Family + My Network sections. Missing: analytics block, tabs, collapsible Immediate/Extended structure, group sub-headers (Spouse/Children/Parents/Pets), proper card layout with relationship-perspective ("Your Husband" not "Husband"), In Memory badge for deceased.

**Missing peopleStore records:** Jack Daniel (ex-husband), Jane Doe Smith (deceased grandmother), John Smith (deceased grandfather), Ben White (deceased grandfather). Need to add to peopleStore for full canonical demo.

**Under "Family Tree" tab** = PlanOwner-anchored visual generation tree:
- Sarah Johnson at center (anchor — "Me")
- Children above (Emma, Liam, Lisa, Noah)
- Spouse alongside (John Johnson)
- Parents below (Mary Smith, Robert Smith)
- Grandparents further below (Ben White, Jane Doe Smith, John Smith — all "In Memory")
- Each node = **Compact Linked Summary Card**: Avatar + Name + Specific Role + DOB+Age (or DOB–DOD for deceased) + "+" extend icon
- Connection lines: solid = biological, dashed = step, distinct = half
- Hover on member → highlight path to PlanOwner
- Tree controls bottom: **Center** | **Zoom +** | **Zoom -** (canonical pill control)

**Under "Timeline" tab** = milestone story cards grouped by life stage / generation: "Grandparents born" / "Parents born" / "My birth" / "Children born". Each milestone = card. ⋯ menu offers Add Family / Download / Print.

---

**Severity:** All six are structural mismatches with locked spec. No data corruption. Plan Owner profile.html (Sarah) is the source of truth — must NEVER be modified.

**Reported references (user, 2026-04-26) — full canonical matrix:**

| Record Type | Action Sidebar | Tabs | Overview Cards |
|---|---|---|---|
| **Plan Owner** (Sarah) | verify(state) → add-family → download → share | Overview / Documents / Album / Life Story | 10 (Essential, Contact, Family, Medical, Education, Employment, Beliefs, Roles, Tasks, Shared) |
| **Family Member alive** (John Johnson) | heart → add-family → download → share → delete (**5 icons**) | Overview / Documents / Album / Life Story | 10 (same as Plan Owner) |
| **Family Member deceased** (Jane Doe Smith) | heart → add-family → download → share → delete (5 icons) | Overview / Documents / Album / Life Story / **Memorial Page** | 10 + Memorial |
| **Pet** (Enzo) | heart → download → share → delete (**4 icons** — no add-family) | Overview / Documents / Album (3 tabs only) | 6 (Essential, Contact, Medical, **Routines & Care**, Tasks, Shared) |
| **Network alive** (Mark Davis) | heart → download → share → delete (4 icons) | Overview / Documents (2 tabs) | 5 (Essential, Contact, Roles & Access, Tasks, Shared) |
| **Network deceased** | heart → download → share → delete (4 icons) | Overview / Documents / **Memorial Page** (3 tabs) | 5 + Memorial |

**Header field differences:**
- Family Member alive shows: DOB · Age · Role in Your Plan · Shared To, plus **"Since <date>"** under role (relationship timeline for spouses/partners)
- Family Member deceased shows: red life dot · "In Memory" red indicator · DOB · DOD · Age at Passing · Shared To
- Pet shows: DOB · Age · Shared To (NO Role in Your Plan — pets don't have plan roles)
- Network shows: DOB · Age · Role in Your Plan · Shared To
- Plan Owner shows: DOB · Age · Role in Your Plan (always "Plan Owner") · Shared To · plus verification status

---

## 🔒 LOCKED 2026-04-26 — Records System Foundation

**Do not modify these without explicit user approval.** This is the working state at lock time:

### peopleStore (Single Source of Truth)
- Location: `_shared.js` line ~9458
- 11 records: Sarah (sj), John (jj), Emma (em), Liam (li), Lisa (ls), Noah (no), Mary Smith (ms), Robert Smith (rs), Enzo (enzo, pet), Dr. Emily White (drwhite, network), Attorney Mark Davis (mdavis, network)
- Fields per record: id, firstName, familyName, name, role, roleLayer1, roleLayer2, photo, dob, alive, lifeStatus, relationships[], categories[], sharedTo[], emails[], phones[], address{}, socials[], notes, gender, placeOfBirth, citizenships[], middleName, entries{}
- Sarah's `entries` populated for: essential (3), family (3), medical (6), education (3), employment (2), beliefs (3) = 20 entries total
- Mark Davis's contact info populated (email, phone, address, social, notes)

### partials/ directory architecture
- `partials/card-essential-info.html` — Essential Info card with read+edit modes, entries section, "+ Add New Entry"
- `partials/card-contact-info.html` — Contact Info with .ci-section mounts (emails, phones, address, socials)
- `partials/card-family-relationships.html` — Family & Relationships with grouped Linked Summary Cards
- `partials/card-medical-info.html` — Medical Info with EMC snapshot mount + entries
- `partials/card-education.html` — Education with entries
- `partials/card-employment.html` — Employment & Affiliations with entries
- `partials/card-beliefs-hobbies.html` — Beliefs, Hobbies & Interests with entries
- All headers use canonical `.accordion-section / .accordion-header / .accordion-title / .accordion-subtitle / .accordion-chevron` (no header-right wrapper)

### record.html
- Generic person record page; `record.html#<personId>` reads hash, fetches peopleStore, populates header + 7 cards via partial loader
- Mounts: `[data-mount="essential-info"]`, `[data-mount="contact-info"]`, `[data-mount="family-relationships"]`, `[data-mount="medical-info"]`, `[data-mount="education"]`, `[data-mount="employment"]`, `[data-mount="beliefs-hobbies"]`
- Tabs: Overview / Document Entries / Album / Life Story (placeholders for last 3)

### _shared.js helpers (locked)
- `loadPartial(name, mountSelector)` — fetches HTML fragment + injects (returns Promise)
- `renderPersonRecord()` — bootstraps person record from hash
- `populateEssentialInfo(p)` / `populateContactInfo(p)` / `populateFamilyRelationships(p)` / `populateMedicalInfo(p)` / `populateEducation(p)` / `populateEmployment(p)` / `populateBeliefsHobbies(p)`
- `renderCardEntries(cardKey, mountSelector, defaultGroupTitle, person)` — generic entry list renderer per card
- `openPersonRecord(personId)` — navigates to record.html#<id>
- `renderPeopleDirectory()` — populates family.html / network.html

### Linked Summary Card (4 variants — locked from earlier sessions)
- Collapsed: 400×100 pill, `::before` background opacity 0.33 default → 1 hover → 0 expanded; content always opacity 1
- Click → expand inline (email + phone + notes pad 400×60 + Hide Details footer)
- ⋯ menu: Edit / Remove
- Edit: in-place transform to edit form (600×auto white opacity 0.5, extends 100px each side via negative margin)

### Universal Entry Pattern
- Add New Entry form: 4 sections (About / Adaptive Timeline / Documentation & Storage / People & Contacts / Notes)
- Entry Row collapsed (60×60 colored ring icon, title, subcategory, date, status badge "Digital File & Location" / "Digital File" / "Location" / none)
- Click → expand inline; ⋯ menu = Edit / Archive / Delete
- Singleton enforcement (Blood Type), bidirectional cross-record sync

### Documents Tab
- Aggregated view of ALL entries across ALL cards for a record
- Grouped by category: Identity & Vital Documents / Relationship & Status Documents / Blood Type / Allergies / Medical Conditions / Medical Devices & Implants / Educational Qualifications / Professional Certifications / Other Educations / Employment Entries / Memberships & Affiliations / Beliefs / Hobbies / Interests
- Filter bar: Select All + bulk archive + bulk delete + Search input
- Same entry-row pattern as in cards
- "+ Add Document" centered (canonical inline pattern with dashed lines extending L/R)

### Status Badge Color Logic (locked, applies everywhere)
- hasFile && hasLocation → "Digital File & Location" + green dot `#61C553`
- hasFile && !hasLocation → "Digital File" + blue dot `#667EEA`
- !hasFile && hasLocation → "Location" + orange dot `#FF9500`
- neither → no badge, grey ring

---

---

## Edit Form Standards (XD-locked 2026-04-20)

These rules apply to every editable form on the platform — Contact Info (phone, address, email, social), Essential Info, Medical Info, Education, Employment, and every future section. A new form inherits them automatically when built with `.ci-edit-*` / equivalent classes.

### Input Box
- **Height:** 60px (fixed)
- **Wrapper opacity:** 0 (transparent pad — only the bottom border is visually the "input")
- **Bottom border:** 1px, `rgba(0,0,0,0.14)` default → `#000` hover/focus → `#FF2C55` error
- **Text inset:** 20px from ALL edges (left, right, top-from-border). Flag/icon content also at 20px from wrapper-left. Chevron at 20px from wrapper-right.
- **Value font:** 600 16/24 Inter, color `#000`, opacity 1
- **Placeholder:** same font, browser-default placeholder opacity

### Label (under input box)
- **Font:** 400 12/15 Inter, `#000`, opacity 0.5
- **Position:** 4px below input box (`margin-top: 4px`)
- **Alignment:** text starts at 20px inset (same x as input value above)

### Row of Input Boxes
- **Content width:** always 400px in the 600px middle-column card (100 L/R inset)
- **Gap between inputs in one row:** 20px
- **Splits:**
  - 1 input → 400 full width
  - 2 inputs (phone code+number) → 158 + 20 gap + 222 = 400
  - 2 inputs (city+zip) → 250 + 20 gap + 130 = 400
  - 3 inputs (DOB day/month/year) → 120 + 20 + 120 + 20 + 120 = 400

### Edit Pad (card background)
- **Width:** 600px
- **Primary entry:** `background: rgba(255,255,255,0.5)` (more saturated — visually dominant)
- **Additional entries:** `background: rgba(255,255,255,0.3)` (less saturated — primary stays dominant)
- **Border-radius:** 0 (sharp corners — no pill)
- **Top/bottom padding:** 20px
- **Left/right inset:** 100px (so row content = 400 centered)
- **margin-left:** -100px (when nested in 400-wide container, extends 100 left to form 600 wide)

### Vertical Gaps (inside pad)
- Input box → label: **4px**
- Label row → checkbox row: **20px**
- Checkbox row → info text: **20px**
- Info text: 360px wide (400 content - 2× 20 text-inset), 400 14/17 Inter opacity 0.5

### Section Captions (OUTSIDE the pad)
- "Primary X" / "Additional X" (12/15 Inter opacity 0.5)
- **4px top gap** from pad-bottom
- **20px bottom gap** to next entry / Add button
- Rule: the gap 1→2 equals gap 2→3 equals gap 3→4… equals gap last→Add button. All 20px.

### Universal 120px Alignment
All text-type elements align on a single vertical line at **x = 120px from card-left** (= 100 card-pad + 20 text-inset):
- Input value / placeholder
- Input label (4px below box)
- Checkbox (square itself starts at 120)
- Checkbox label ("Primary Address", "Primary Phone Number")
- Info text ("Your primary address defines...")
- Section captions ("Primary Address", "Additional Address")

### Checkbox (Primary entry selector)
- **Size:** 20×20px
- **Border:** 1px `#000`
- **Radius:** 4px
- **Default:** transparent fill
- **Checked:** inner 12×12 `#000` square, radius 3, inset 4px from each edge (per XD: checkbox at 1157, inner at 1161 = +4)
- **Label:** 600 16/20 Inter (note: 16/**20** not 16/24), `#000`, 20px gap from checkbox

### Drop Arrow / Chevron (Dropdown indicator)
- **Asset:** 8×4 PNG (`img/drop-arrow.png` + `@2x`, `img/drop-arrow-active.png` + `@2x`)
- **Position:** absolute, 20px from right edge of input wrapper
- **Default state:** `drop-arrow.png` (down-pointing)
- **Open/Expanded state:** `drop-arrow-active.png` (up-pointing) — **asset swap only, NO rotation**
- **Transition:** 0.2s ease-out on `background-image` (crossfade)
- **Rule:** every dropdown chevron on the platform uses this pattern — phone country code, address country, DOB day/month/year, accordion headers, sidebar nav. No exceptions.

### Save Button
- **Pattern:** BtnSubmit Pill-Expand-On-Hover
- **Size:** 126×60 Default → 156×60 Hover (0.2s ease-out)
- **Position:** right-aligned, right edge at 500px from card-left (= end of input content area)

### Add Entry Button (Add Phone / Add Address / Add Email…)
- **Pattern:** Glass Circle Solidifies on Hover
- **Circle wrapper:** 60×60, left-offset by -20 from content-left (so icon centers at x=120)
- **Default:** opacity 0 (transparent)
- **Hover:** white fill + border (per Glass Circle pattern)
- **Plus icon:** `img/plus-circle.png` 20×20 centered in circle
- **Text:** 600 14/17 Inter (Add Phone Number / Add Address), positioned 40px right of circle end

### Mutual Exclusion (Edit ↔ Add New)
- `enterCiEdit(sectionId)` closes any open inline-add-block in that section
- `ciAddPhoneInline` / `ciAddAddrInline` / `ciAddEmailInline` closes edit mode of its section
- Same behavior expected for future sections

### Edit Mode Rebuild
- Entering edit mode rebuilds additional entries from the view-mode data cards
- Functions: `initPhoneEditRows()` (phones), `initAddressEditRows()` (addresses). Email/social to follow same pattern.
- Parses `<br>`-separated parts from `.data-value` of `.ci-primary-card:not(.is-primary)` entries

---

---

## Tokens

| Token name | Value | Where used |
|---|---|---|
| --s | clamp(0.65, tan(atan2(100vw, 1440px)), 1) | Global scaling factor, wraps all px values |
| --color-text-primary | #000000 | All text |
| --color-white | #FFFFFF | Pill backgrounds, card fills |
| --color-transparent | #FFFFFF00 | Default circle/pill background |
| --color-border-default | #000000 | Circle border, dash |
| --color-border-input | #CCCCCC | Input bottom border (default) |
| --color-error | #FF2C55 | Error messages |
| --color-success | #61C553 | Success messages, strong password |
| --color-warning | #FF9500 | Medium password |
| --color-danger | #FF0000 | Input error border |
| --color-navy | #020B66 | AI panel background |
| --color-bg | #F8F8F8 | Page background |
| --radius-pill | 30px | Buttons, cards, pills |
| --radius-card | 30px | Auth card, dashboard cards |
| --radius-input-card | 20px | Password strength card |
| --radius-error-msg | 8px | Auth error/success messages |
| --shadow-card | 0px 10px 30px #00000029 | All cards |
| --font-heading | 600 24px/29px 'Inter', sans-serif | Auth titles |
| --font-body | 400 16px/24px 'Inter', sans-serif | Body text, button labels |
| --font-hint | 400 12px/15px 'Inter', sans-serif | Hints, small text |
| --font-input | 600 16px/24px 'Inter', sans-serif | Input text + placeholder |
| --opacity-inactive | 0.33 | Disabled elements |
| --opacity-hint | 0.5 | Hint text, subtitles |
| --transition-hover | 0.2s ease-out | Default → Hover |
| --transition-tap | 0.6s ease-out | Tap → Success |
| --arrow-size | 9×16px | ALL button arrows, everywhere in platform |
| --arrow-stroke | 1.5px, round cap, round join | ALL button arrows |
| --circle-size | 60×60px | ALL button circles |
| --circle-radius | 30px | ALL button circles |
| --dash-thickness | 1px | BtnSubmit dash |
| --btn-font | 400 16px/24px Inter | ALL button text labels |

---

## Components

### BtnSubmit
- **File:** `src/components/ui/BtnSubmit.tsx`
- **CSS:** `src/styles/globals.css` (lines 442–541)
- **States:** Default, Hover/Tap/Hold, **Inactive**, Loading
- **Used in:** SignUp.tsx, Login.tsx, ForgotPassword.tsx, KYC Verification Flow (Continue)
- **Pattern:** Pill-Expand-On-Hover
- **Props:** `label`, `onClick`, `disabled` (= Inactive), `loading`, `type`, `className`
- **Status:** ✅ Confirmed pixel-perfect (2026-03-29). Inactive state XD-confirmed 2026-04-16.

**Inactive state (XD-confirmed 2026-04-16 — Btn Submit panel):**
- The *entire* button wrapper (text + dash + circle + arrow) drops to `opacity: 0.33`
- Pad stays 60×60, background `#FFFFFF00` (transparent), `border: 1px solid #000000`, `border-radius: 30px`
- `pointer-events: none` and no hover pill expansion
- Used whenever the form/step is not yet valid to proceed (e.g. KYC Continue before a file is uploaded)

### BtnBack
- **File:** `src/components/ui/BtnBack.tsx`
- **CSS:** `.btn-back` in globals.css
- **States:** Default, Hover, Disabled
- **Used in:** SignUp.tsx, ForgotPassword.tsx
- **Pattern:** Circle-Reveal-On-Hover
- **Props:** `label`, `onClick`, `disabled`, `type`, `className`
- **Status:** ✅ Confirmed pixel-perfect (2026-03-29)

### Auth Continue Button (legacy)
- **CSS class:** `.auth-btn-continue` in globals.css
- **Status:** ⚠️ Legacy — fully replaced by BtnSubmit. CSS can be removed.

### Auth Back Button (legacy)
- **CSS class:** `.auth-btn-back` in globals.css
- **Status:** ⚠️ Legacy — fully replaced by BtnBack. CSS can be removed.

### PasswordStrength
- **File:** `src/components/ui/PasswordStrength.tsx`
- **CSS:** `.auth-pw-strength` in globals.css (lines 608–656)
- **States:** Very Weak (#FF2C55), Medium (#FF9500), Strong (#61C553)
- **Pattern:** Glow Bar Pattern
- **Status:** ✅ Confirmed pixel-perfect

### Auth Logo Pill
- **CSS class:** `.auth-logo-pill` in globals.css (lines 43–69)
- **States:** Default (glass bg + pad-outline), Hover (white bg + shadow)
- **Used in:** AuthLayout
- **Status:** ✅ Confirmed pixel-perfect

---

## Known Design Patterns

### 🔒 LOCKED 2026-04-29 — Family Tree Visualization Pattern

**Page:** `family-tree.html` (separate from `family.html` per "each tab = new HTML" rule)

**Composition (top → bottom):**
1. Family Overview analytics card (`.fan-pad`) — compact, NO avatars, pure analytics
2. 3-tab pill (Family Tree / Family Members / Timeline) — tabs are `<a href>` links
3. "Family Tree" Source-Serif title 36/44
4. Filter chips (`.ftree-filters`) — single horizontal row, 0.12 default, white when active
5. Tree canvas (`.ftree-canvas`) with golden-tree.png at 50% opacity
6. 4 generation rows: children / anchor / parents / grandparents
7. Tree controls bar (`.ftree-controls`) — fixed bottom 320×80

**Linked Summary Card (XD-exact):**
- Pad 240×80, border-radius 40, shadow `0px 10px 30px #00000029`
- Avatar pad 80×80 SOLID white (more opaque than card pad — "pop-out" effect)
- Photo 60×60 inset 10px inside avatar pad
- Life dot 8×8 at (left:20, top:62) — green alive / red deceased
- Name: Inter 600 14/17 at (left:85, top:14)
- Role: Inter normal 12/15 at (left:85, top:35)
- Date: Inter normal 10/12 at (left:85, top:54), opacity 0.5
- + button: 30×30 at top-right corner of card
- Card pad: 0.12 default → solid white on hover/tap
- + button: 0.12 default → solid white on hover/tap (matches pad transition)
- Anchor card (Plan Owner): ALWAYS solid white (no hover transition)

**User-Controlled Collapse:**
- Edge pills (`.ft-collapse-sidebar`, `.ft-collapse-ai`) toggle via body classes
- Body class `.ft-sidebar-collapsed` → `aside.sidebar-fixed { transform: translateX(-105%) }`
- Body class `.ft-ai-collapsed` → `aside#rightPanel { transform: translateX(105%) }`
- Pills are 24×60 fixed at left:300 / right:300, slide to edges when collapsed
- Arrow SVGs flip 180° when collapsed (visual feedback)

**Tree Controls Bar:**
- 320×80 white pill, br:40, shadow `0px 10px 20px #00000029`
- Position: fixed bottom 30px, transform translateX(-50%) for centering
- 3 buttons: Center / + Zoom (with label) / − (no label)
- Icons: 28×28 default → 36×36 on hover/tap (0.2s ease-out)
- Labels: Inter 14/17 opacity 0.5

**Filter Chips:**
- Row pills: 0.12 + 1px white border default → solid white when active
- Color-coded dots: Immediate (green), Extended (blue), In memory (purple), Pets (orange), Former (grey)
- Toggle hides/shows corresponding cards via canvas class

**Files:**
- `html-prototype/family-tree.html` (page, ~880 lines)
- `html-prototype/_shared.css` (`.ftree-*`, `.fan-*`, `.ft-collapse-*` classes)
- `html-prototype/img/golden-tree.png` + `@2x.png` (tree background asset)

---

### Pill-Expand-On-Hover Button
**Description:** Circle at the end of the button expands leftward into a pill on hover, covering text + dash + arrow. The text does NOT move in any state.

**Elements (left → right for forward button):**
1. Text — dynamic width, `font: 400 16px/24px Inter`, `text-align: right`, `letter-spacing: 0`, NEVER moves
2. 10px gap
3. Dash — 10px × 1px solid, same thickness as circle border
4. 10px gap
5. Circle — 60×60px, `border: 1px solid`, `border-radius: 30px`, `background: transparent`
6. Arrow — 9×16px, centered in circle, `stroke: 1.5px`, round cap/join, `path: M1 1L8 8L1 15`

**States:**

| State | Text | Dash | Circle border | Circle bg | Arrow | Pill |
|---|---|---|---|---|---|---|
| Default | static | 10px | 1px solid #000 | transparent | centered | none (circle = 60×60) |
| Hover/Tap/Hold | NO MOVE | 30px (grows right) | transparent | transparent | -5px left | circle grows left, bg #FFF, left edge = text - 30px |
| **Inactive** | opacity 0.33 | opacity 0.33 | opacity 0.33 (1px solid #000) | transparent (#FFFFFF00) | opacity 0.33 | — (no hover expand) |

**Inactive ≠ hidden.** The button is still rendered in full layout, just at `opacity: 0.33` with `pointer-events: none`. Toggled on when the current step/form is not yet valid (e.g. KYC Continue before a file is uploaded, Save before a required field is filled).

**Pill rules:**
- Height: always 60px
- Left edge: 30px before the start of the text
- Right edge: same as circle right edge (never moves)
- Arrow right edge: pill right edge - 30px

**Transitions:**
- Default → Hover: Auto-Animate, 0.2s ease-out
- Tap → Success: Auto-Animate, 0.6s ease-out

**Used in:** BtnSubmit, all forward-action buttons

### Universal Button Rules (applies to BOTH patterns)
**These rules are ABSOLUTE and apply everywhere in the platform:**

1. **Arrow icon**: ALWAYS 9×16px, `strokeWidth: 1.5`, `round cap`, `round join`. Same everywhere. Only direction changes (left `M8 1L1 8L8 15` or right `M1 1L8 8L1 15`)
2. **Circle**: ALWAYS 60×60px, `border-radius: 30px`
3. **Text**: ALWAYS `font: 400 16px/24px Inter`, `letter-spacing: 0`, dynamic width based on word
4. **Dash** (BtnSubmit only): ALWAYS 1px thick, grows 10→30px
5. **Stroke uses `currentColor`** — never hardcode color. Parent sets color via CSS
6. **Color variants**: Same structure, different colors. Examples:
   - Auth pages: `color: #000000`, pill bg `#FFFFFF`
   - Dark backgrounds (AI panel, navy): `color: #FFFFFF`, pill bg varies
   - Colored contexts: `color: [brand color]`, pill bg varies
7. **The text NEVER changes position** in BtnSubmit (forward buttons)
8. **The arrow NEVER changes position** in BtnBack (back/edit buttons)
9. **All transitions**: 0.2s ease-out for hover, 0.6s ease-out for tap→success

### Circle-Reveal-On-Hover Button
**Description:** Circle pad reveals white background on hover. Text shifts right. Arrow stays fixed. No dash. Used for Back and Edit actions.

**Elements (left → right):**
1. Pad — 60×60px, border-radius 30px, bg transparent (default), bg #FFFFFF (hover), NO border
2. Arrow — 9×16px, centered in Pad, always visible, does NOT move
3. Text — dynamic width, `font: 400 16px/24px Inter`, shifts +20px right on hover

**States:**

| State | Pad bg | Arrow | Text | Wrapper width |
|---|---|---|---|---|
| Default | transparent | visible, centered | static | auto (~97px for "Back") |
| Hover | #FFFFFF | NO MOVE | +20px right | auto (+20px) |
| Disabled | opacity 0.33 | opacity 0.33 | opacity 0.33 | — |

**Transition:** 0.2s ease-out

**Key differences from Pill-Expand-On-Hover:**
- No dash
- Reversed order: `[Pad[Arrow]] + [Text]` (vs `[Text] + [Dash] + [Circle[Arrow]]`)
- Pad has NO border — only bg reveals
- Arrow does NOT move (vs -5px shift in BtnSubmit)
- Text MOVES +20px right (vs text stays fixed in BtnSubmit)
- Pad stays 60×60 circle (vs circle grows into pill)

**Used in:** BtnBack, Edit buttons (same principle)

### Glow Bar Pattern
**Description:** Every progress bar or strength indicator uses inner glow + outer glow treatment.

- Height: 4px
- Border-radius: 4px
- Track background: rgba(0,0,0,0.08)
- Fill inner shadow: inset 0px 1px 0px rgba(255,255,255,0.47)
- Fill outer glow: 0px 0px 6px [color]80 (color at 50% opacity)
- States: Very Weak #FF2C55 / Medium #FF9500 / Strong #61C553

**Used in:** PasswordStrength, plan progress bars, section completion bars, subscription bar

### Auth Message Pattern (System Messages)
**Description:** Form-level feedback messages. 400px centered box. Two CSS classes only, never inline styles.

| Property | Error | Success |
|---|---|---|
| Class | `.auth-error-message` | `.auth-success-message` |
| Width | `calc(400px * var(--s))` | same |
| Margin | `20px auto` (top + bottom) | same |
| Background | `rgba(255,44,85,0.08)` | `rgba(97,197,83,0.08)` |
| Border | `1px solid #FF2C55` | `1px solid #61C553` |
| Border-radius | `10px` | `10px` |
| Padding | `12px 20px` | `12px 20px` |
| Font | `400 14px/20px Inter` | same |
| Color | `#FF2C55` | `#61C553` |
| Text-align | center | center |
| Links inside | `color: inherit, font-weight: 600, underline` | same |

**Used in:** Login.tsx, SignUp.tsx, ForgotPassword.tsx, VerifyEmail.tsx — all auth pages

### Digit Box Pattern
**Description:** Single-digit input box for verification codes. Component with 4 states.

- Size: 50×60px, border-radius 10px
- Digit font: `600 24px/29px Inter`, #000000, centered
- Transitions: instant (0s, None easing)

**States:**

| State | Background | Border | Shadow |
|---|---|---|---|
| Default | `#FFFFFF00` (transparent) | `1px solid #00000029` (16% black) | none |
| Hover | `#FFFFFF00` (transparent) | `1px solid #000000` (full black) | none |
| Focus | `#FFFFFF` (white) | none (transparent) | `inset 0px 2px 3px #00000029` |
| Active (filled) | `#FFFFFF` (white) | none (transparent) | `inset 0px 2px 3px #00000029` |

**Interactions:**
- Default → Hover: Auto-Animate, 0s
- Hover → Focus (Tap): Auto-Animate, 0s
- Focus → Active (Tap/input): Auto-Animate, 0s
- Active → Default (Tap): Auto-Animate, 0s

**Used in:** VerifyEmail.tsx, any future OTP/code input

### Checkbox Pattern
**Description:** Custom checkbox with black dot indicator. No browser default styling.

- Container: 20×20px, `border: 1px solid #000000`, `border-radius: 4px`, bg transparent
- Dot (checked): 12×12px, `background: #000000`, `border-radius: 3px`, centered (4px from each edge)
- Transition: instant (0s, None easing)
- Default state: checked (user unchecks if they want)
- Text: `font: 400 14px/17px Inter`, `color: #000`, `opacity: 1`
- Gap between box and text: 20px
- Alignment: same 400px centered container as inputs, padding-left 20px

**Used in:** SignUp.tsx (opt-in checkbox), will be used for all checkboxes in platform

### Auth Form Alignment Pattern
**Description:** All form content within auth cards follows the same width and alignment.

- Container: `width: calc(400px * var(--s))`, `margin: 0 auto`
- Input text starts at: `padding-left: calc(20px * var(--s))`
- All elements (titles, inputs, checkboxes, hints, terms) align to this grid
- Card inner padding: `50px top, 30px sides, 30px bottom`

**Used in:** All auth pages

### Dropdown Pattern
**Description:** Custom dropdown component used for all date selectors, country/state pickers, and any select-style input across the platform.

**Component:** `src/components/ui/Dropdown.tsx`

**Field (trigger):**
- Height: 60px
- Border: none (only border-bottom: 1px solid #CCCCCC)
- Border-bottom hover: 1px solid #000000
- Label font: `600 16px/24px Inter` (SemiBold — same as input placeholder)
- Padding: 0 20px
- Arrow icon: `drop-arrow.png` 8×4px, right-aligned
- Arrow default: points **down** (▼)
- Arrow open: rotates 180° → points **up** (▲)
- Transition: 0.2s ease-out

**Panel (expanded):**
- Position: 5px below field
- Background: #FFFFFF
- Border-radius: 10px
- Box-shadow: 0px 10px 30px #00000029
- Height: 210px fixed
- Scrollbar: hidden (content scrolls, no visible scrollbar)
- Padding: 20px top, 0 bottom
- Close on: Esc key, click outside

**Items:**
- Font: `400 16px/24px Inter` (Regular)
- Height: 20px
- Padding: 0 20px (left/right)
- Gap between items: **10px** (fixed, not scaled)
- Opacity: **0.7** default
- Opacity hover: **1**
- Opacity selected: **1**, font-weight: 600

**Widths (Date of Birth row):**
- Year: 113px
- Month: 149px
- Day: 98px
- Gap between: 20px
- Total: 113 + 20 + 149 + 20 + 98 = **400px** (matches content width)

**Country/State:** full width (400px)

**Used in:** OnboardingQ1 (Date of Birth, Country, State), will be used in all forms with selectors

### Circle Icon Button Pattern
**Description:** Header utility buttons (Search, Notifications, Settings) — 60×60px circle with icon inside. Used for all header action buttons.

**Structure:**
- Circle: 60×60px, `background: transparent url('circle-outline.png')`, opacity 1
- Icon: 20×20px, centered (20px offset from each edge), `1.5px solid #000`

**States:**

| State | Circle | Icon | Transition |
|---|---|---|---|
| Default | transparent + circle-outline | #000, 20×20 | — |
| Hover-Tap-Hold | `linear-gradient(139deg, #FFF, #FFF0, #FFF0, #FFF)` + circle-outline | #000, same | 0s None |
| Active/Tap | same as hover | same | → Expanded state, 0.3s Ease Out |

**Assets:** `circle-outline.png`, `search.png`, `notifications.png` in `/icons/`

**Used in:** Dashboard Header (search, notifications), Profile Header

### Notification Dot Pattern
**Description:** Small red indicator for unread notifications.

- Size: 6×6px, border-radius 50%
- Background: #FF0000
- Position: top-right of bell icon (17px from circle top, 40px from circle left)

**Used in:** Dashboard Header notifications button

### Dashboard Header Pattern
**Description:** Full-width transparent header with logo, greeting, utility buttons.

- Width: 1920px (full viewport), Height: 90px
- Background: **transparent** (content underneath is visible)
- Position: fixed top

| Element | Font | Position (X at 1920) |
|---|---|---|
| Logo pill | standard auth-logo-pill | X:363 Y:20 |
| Greeting "Welcome back, {name}!" | `Source Serif 4, Medium, 24px/33px`, center | X:834 Y:34 |
| Search button | Circle Icon Button 60×60 | X:1345 Y:20 |
| Notifications button | Circle Icon Button 60×60 + red dot | X:1415 Y:20 |
| Avatar button | 80×80px, bg #FFFFFF, shadow `0px 10px 20px #00000029`, blur(2px) | X:1485 Y:10 |

**Avatar photo:** 60×60px inside 80×80 circle (10px padding). If no photo → initials fallback.

**Used in:** Dashboard, Profile, all authenticated pages

### Profile Image Container Pattern
**Description:** Sidebar poster image upload area with hover animation.

**Container:** 300×275px, radius 30/30/0/0, glassmorphic `rgba(255,255,255,0.33)` blur(10px)

**Default State:**
- Text "Add or Change Your Poster Image": 220×17px, `400 14px/17px Inter`, #000 opacity 50%, centered, 30px from top
- Outer circle: 180×180px, at top:60 left:60 from container, bg #FFFFFF, opacity **33%**
- Inner circle: 100×100px, at top:100 left:100 from container, bg #FFFFFF, opacity **100%**
- Plus icon: 50×50px, centered in inner circle, `1.5px solid #000`, opacity **16%**

**Hover State (0.2s Ease Out):**
- Outer circle: unchanged (stays 180px, 33%)
- Inner circle: **grows to 140×140px**, moves to top:80 left:80
- Plus icon: opacity **100%**

**User Photo State:**
- Photo masked/clipped to container shape (300×275, radius 30/30/0/0)

**Used in:** Dashboard Sidebar, Profile Sidebar

### Two-Circle Avatar Pattern (universal rule)
**Description:** Every circular avatar in PlanAfter — any size, any location — is built from **two concentric circles** with **identical treatment everywhere**:

1. **Outer halo (gray pad)** — larger circle:
   - `background: #EDEDED` (solid light gray, reads on any background — confirmed 2026-04-15)
   - `backdrop-filter: blur(10px)` (read-mode) or `blur(2px)` (edit/picker context)
   - `box-shadow: 0px 10px 30px #00000029` (read-mode/poster) or `0px 10px 20px #00000029` (80-size avatars)
   - `border-radius: 50%`
   - `opacity: 1`
   - Hover state (interactive avatars only): `background` transitions to `#FFFFFF`, `transition: background 0.2s-0.3s ease-out`

2. **Inner circle** — smaller circle, `#FFFFFF` white, `overflow: hidden`, `border-radius: 50%`, containing **either the photo or initials**

**History:** Originally `rgba(255,255,255,0.33)`. Changed to solid `#EDEDED` on 2026-04-15 so the gray ring reads clearly on every page background (colorful poster photos, gradient page image, glass cards). The pattern stays a "two-circle" visual: distinct gray outer + white inner.

The same color and shadow apply **everywhere** — cover page, content pages, sidebar, doc-sidebar preview, profile card, family members, everywhere a circular avatar exists. No variants.

The inner circle MUST clip its content (`overflow: hidden`) so that when the photo is zoomed (transform: scale > 1), it stays inside the inner ring and the halo remains visible.

**Size ratio:** inner ≈ 75% of outer (canonical 3:4). Both circles are centered on the same axis.

**Confirmed by:** Violetka, 2026-04-14

---

#### Canonical sizes

| Context | Outer (gray) | Inner (white) | Ratio |
|---|---|---|---|
| Print cover page | 240×240 | 180×180 | 0.75 |
| Print content pages (photo block) | 220×220 | 160×160 | 0.73 |
| Print content pages (header avatar) | 80×80 | 60×60 | 0.75 |
| Profile card / Essential Info / family summary | 80×80 | 60×60 | 0.75 |
| Doc sidebar preview | 80×80 | 60×60 | 0.75 |
| Family compact card | 64×64 | 44×44 | 0.69 |
| Sidebar module-row / shared-to / mobile identity | 54×54 | 40×40 | 0.74 |

---

#### Invariants (always true)

- Outer pad background: `#EDEDED` (solid light gray, updated 2026-04-15)
- Inner circle background: `#FFFFFF`
- Inner circle `overflow: hidden` — clips scaled photos inside the boundary
- Both circles `border-radius: 50%`
- Photo fills inner 100%/100% with `object-fit: cover`
- Initials fallback sits inside inner circle, same centered layout as photo
- Both photo and initials are swappable siblings — `display: none / flex` toggles between them

---

#### When photo is zoomed/cropped

- `transform: scale(N)` applied to the img
- `object-position: X% Y%` applied for positioning
- The inner wrap's `overflow: hidden` keeps the visual content bounded
- The gray outer ring STAYS visible, always

**Never** apply scale to the wrap, the outer pad, or the container — only the img itself, inside an `overflow: hidden` wrap.

---

#### Implementation checklist

When creating any new circular avatar anywhere in the platform:

1. ☐ Outer div, size N, `#EDEDED` (solid gray), border-radius 50%, flex center
2. ☐ Inner wrap div, size ~N×0.75, `#FFFFFF`, border-radius 50%, `overflow: hidden`, position relative, flex center
3. ☐ Inside the wrap: `<img>` with width 100%, height 100%, object-fit: cover, initially `display: none`
4. ☐ Inside the wrap: initials `<span>` with 100%/100% flex center, Source Serif 4 600, `rgba(0,0,0,0.4)`, letter-spacing 0.05em
5. ☐ CSS `:has()` selector on the wrap to hide initials when photo img is visible
6. ☐ Sync target registered in `applyPlanOwnerPhoto()` in `_shared.js`
7. ☐ Optional life dot 8×8 if this avatar represents a living/deceased person

---

### Glass Sub-Panel Pattern (Essential Info avatar flows)
**Description:** Inline sub-panels that open below a picker row — Album gallery, AI Images flow, Reposition. All three share one container chrome so they feel like the same object in three states.

**Container chrome (identical across Album / AI / Reposition):**
- `background: rgba(255, 255, 255, 0.45)`
- `backdrop-filter: blur(10px)`
- `border: 1px solid #FFFFFF`
- `border-radius: 30px`
- `box-shadow: 0px 10px 30px #00000029`
- `padding: 24px`
- `margin: 20px 30px 0 30px`

**Head row:**
- Title: Source Serif 4, 500 20/28, `#000`
- Description: Inter, 400 12/18, `#000 @ 0.5`
- Close button: 40×40 Circle-Reveal-On-Hover (transparent → white on hover), two rotated 14×2 black bars forming X

**Action row:**
- `justify-content: flex-end`, gap 24px
- Secondary (Back / Cancel) — Circle-Reveal-On-Hover pattern (`.ei-btn-secondary`), 50×50 invisible circle that becomes white + shadow on hover; label text shifts 10px left on hover
- Primary (Continue / Apply / Save) — Pill-Expand-On-Hover pattern (`.ei-btn-primary`): default 50×50 navy circle with icon, expands left to reveal label on hover (min-width 130px). Background `#020B66`, shadow `0px 6px 16px rgba(2,11,102,0.25)`. Disabled state: `pointer-events:none`, `opacity:0.4`

**Used by:** `.ei-album-panel`, `.ei-ai-panel`, `.ei-repo-panel` in `html-prototype/profile.html`
**Confirmed:** 2026-04-15

---

### AI Images Flow Pattern
**Description:** 4-step guided flow to generate an avatar from a style (Oil / Watercolor / Sketch / Studio). Lives inside a Glass Sub-Panel.

**Progress indicator** — Glow Bar Pattern exactly:
- 4px height, `rgba(0,0,0,0.08)` track, 4px radius
- Fill: `#61C553` (success green), inner shadow `inset 0px 1px 0px rgba(255,255,255,0.47)`, outer glow `0px 0px 6px rgba(97,197,83,0.5)`
- Width per step: 25% (1), 50% (2), 75% (3), 100% (4)

**Step choices** — Two-Circle Avatar Pattern thumbs (80×80 outer + 60×60 inner), label below in Inter 400 12/15 `#000 @ 0.5`, opacity 1 when selected. Step 1 = Source (Current/Upload). Step 2 = Style (4 neutral tiles, `#F4F4F4` fills — never brand colors). Step 3 = Generating (progress fills 50→100%). Step 4 = Review (4 variants).

**Privacy note** — uses Auth Success Message Pattern: `rgba(97,197,83,0.08)` bg, `3px solid #61C553` left border.

**Used by:** `.ei-ai-panel` in `html-prototype/profile.html`
**Confirmed:** 2026-04-15

---

### Album Picker Panel Pattern
**Description:** Opens when the Album tile is clicked in the Essential Info photo picker. Shows every photo saved to this profile's Album tab (shared storage: `localStorage.albumProfilePictures`). Click a thumb → applies as the Plan Owner photo everywhere (via `applyPlanOwnerPhoto()`), panel closes.

**Thumb** — Two-Circle Avatar Pattern (80 outer + 60 inner), hover/selected state solidifies outer gray → white. Grid: flex-wrap, 20px gap.

**Album stack preview** on the picker tile — 3 mini circles (24×24, 2px white border, -8px overlap) showing the 3 most-recent Album photos. Fallback: neutral tints (#E8D5C4, #C4D5E8, #D4E8C4) when Album is empty.

**Storage contract:** Every photo that becomes the Plan Owner avatar is added to the Album automatically through `addToAlbumProfilePictures()` inside `applyPlanOwnerPhoto()`. The Album tab and the Album picker panel both read from the same key.

**Used by:** `.ei-album-panel` in `html-prototype/profile.html`, `#albumProfilePicturesGrid` in the Album tab
**Confirmed:** 2026-04-15

---

### Reposition Panel Pattern
**Description:** Opens automatically after Add New upload. Lets the Plan Owner pan + zoom the new photo inside the avatar boundary before saving.

**Preview** — Two-Circle Avatar (120×120 outer + 100×100 inner) showing the uploaded photo. Inner has `cursor: grab` / `grabbing` (active). Photo inside is positioned absolutely at 50%/50% with `transform: translate(-50% + Δx, -50% + Δy) scale(zoom)` — the Δ and zoom update live during drag and slider changes.

**Drag** — Pointer Events API. `pointerdown` on inner captures pointer, `pointermove` updates Δx/Δy, `pointerup` releases.

**Zoom** — native `<input type="range">` styled as Glow Bar track (4px rgba(0,0,0,0.08)) with a 20×20 white thumb (1px `rgba(0,0,0,0.08)` border, shadow `0px 4px 10px rgba(0,0,0,0.12)`). Range 100–250 (= scale 1.0–2.5).

**Used by:** `.ei-repo-panel` in `html-prototype/profile.html`
**Confirmed:** 2026-04-15

---

### Plan Owner Avatar Sync Pattern
**Description:** The Plan Owner's photo is a **single global source of truth**. All places where the Plan Owner appears — currently ~8 locations, growing as we add family tree, other people's records, and shared-to lists — render the same photo when uploaded, and the same initials fallback when not. A single sync call keeps everything in lockstep.

**Confirmed by:** Violetka, 2026-04-14

---

#### Rule
- Has photo (`window.planOwnerPhoto` set) → render the photo inside the circle
- No photo (`window.planOwnerPhoto === null`) → render initials: first letter of first name + first letter of last name, uppercase, no dots (e.g. `Sarah Johnson` → `SJ`)

---

#### Core styling — invariant across every size and location

| Property | Value |
|---|---|
| font-weight | **600** |
| color | **rgba(0,0,0,0.4)** |
| letter-spacing | **0.05em** |
| user-select | **none** |
| border-radius | **50%** |
| Alignment | flex center (both axes) |
| Life dot | 8×8px, position absolute, #61C553 (alive) / #FF2C55 (deceased) — shown regardless of photo vs initials |

---

#### Background — 2 variants by context

| Context | Background |
|---|---|
| **Plan Owner (canonical)** — header avatar, sidebar profile, profile card, dashboard poster, Essential Info, print document, any reference to the Plan Owner elsewhere | `#FFFFFF` |
| **Other people** — family members, shared-to avatars, contacts, doctors, executors | `rgba(0,0,0,0.08)` |

---

#### Size scale (font-size ≈ 40% of circle diameter)

**Font-family: Source Serif 4 everywhere — no exceptions** (confirmed 2026-04-14). Earlier Inter usage in `_shared.css` (header button, print cover XL, print content pages, family map summary/compact/list, picker chip) was all converted to Source Serif 4.

| Size | Circle | Font | Where used |
|---|---|---|---|
| XS | 40×40 | 600 14/18 Source Serif 4 | Sidebar module-row, shared-to avatars |
| S | 44×44 | 600 18/24 Source Serif 4 | Mobile identity strip, family compact card (fm-cc) |
| M | 60×60 | 600 24/33 Source Serif 4 | Profile card, Essential Info, header avatar button, print content pages, print sidebar, family map summary (fm-sum) |
| M-sm | 50×50 | 600 20/24 Source Serif 4 | Family map list (fml) |
| Picker chip | 24×24 in 60 | 600 20/24 Source Serif 4 | Essential Info photo picker |
| L | 80×80 | 600 32/40 Source Serif 4 | Profile page hero (inside 100×100 shadow pad) |
| XL | 180×180 | 600 64/72 Source Serif 4 | Print document cover page |

---

#### Shadow halo pad

Where a shadow pad surrounds the avatar (profile card, Essential Info, print cover, dashboard hero): an outer circle `diameter + 20px` wide, `background: #FFFFFF`, `opacity: 0.33`. The halo does **not** change between photo and initials state.

---

#### Hover / Edit state — PROPOSED, needs XD confirmation

**Active only on editable locations:** Essential Info avatar, Dashboard poster image.
**NOT on read-only references:** header avatar button, sidebar profile, print pages.

Proposed hover rendering:
- Overlay `rgba(0,0,0,0.4)` covering the circle
- Camera icon 20×20 centered, stroke `#FFFFFF` 1.5px, round cap, round join
- Transition 0.2s ease-out

**Action:** confirm against XD before implementing. If XD differs, update this section.

---

#### Sync implementation — `_shared.js`

**Global state (single source of truth):**
```js
window.planOwnerPhoto = null;   // DataURL string when uploaded, null otherwise
window.planOwnerName  = 'Sarah Johnson';
```

**Sync targets — currently wired:**
- `#headerAvatarImg` — top-right header
- `#profileAvatarImg` — profile header card
- `#eiReadAvatar` — Essential Info read mode
- `#eiAvatarPreview` — Essential Info edit mode
- `#identityAvatarImg` — mobile sidebar
- `#settingsAvatarImg` — settings page

**Sync targets — to add:**
- `#dashboardPosterImg` — Dashboard "Add/Change Your Poster Image" (second upload source)
- `.print-owner-avatar` — all 7 print document pages (class-based — multiple instances)
- `.avatar-plan-owner` — **universal class** for every future Plan Owner avatar reference (family tree, other people's records, etc.) — auto-syncs without needing to register new IDs

**Upload sources:**
1. Essential Info card → Edit → upload photo
2. Dashboard sidebar → "Add/Change Your Poster Image"

Both sources write to `window.planOwnerPhoto` and trigger the same sync function, which rewrites photo `src` attributes and hides/shows initials elements across all targets simultaneously.

**Remove photo:** `window.planOwnerPhoto = null` → all targets revert to initials.

**On page load:** each page's initial render reads `window.planOwnerPhoto` (persisted in localStorage) and renders the correct state from the start — no flash of wrong avatar.

---

#### Places currently using the pattern (known inventory)

- Header top-right chrome (all pages)
- Sidebar profile card (all pages, desktop)
- Mobile identity strip (all pages, mobile)
- Dashboard "Add/Change Your Poster Image" hero (index.html)
- Profile page hero card (profile.html)
- Essential Info card, read mode (profile.html)
- Essential Info card, edit mode (profile.html)
- Settings page avatar (settings.html, when present)
- Print document — cover page (print/cover.html)
- Print document — all 7 content pages (print/p2-p7, `.print-owner-avatar` class)

**Future additions (to be wired as sections are built):**
- Family tree — Plan Owner's own node
- Other family members' records — when they reference the Plan Owner in their "shared with" / relationships
- Shared-to avatars wherever Plan Owner has shared plans
- Any AI Assistant greeting with the Plan Owner's face

**Files where used:** `html-prototype/_shared.css` (~11 avatar styles), `html-prototype/_shared.js` (sync function), all prototype pages.

### Sidebar Navigation Item Pattern (3 states — XD-confirmed 2026-04-15)

**Container:** 300×50px at sidebar-relative origin.

**Anatomy (absolute positions inside the 300×50 container):**
| Element | Position | Size | Notes |
|---|---|---|---|
| Container bg `#FFFFFF` | (0, 0) | 300×50 | opacity 0 → 1 on state change |
| Left active-bar `#000` | (0, 5) | 3×40, border-radius 0/3/3/0 | **Hover state only** |
| Circle-bg `#FFFFFF` | (15, 0) | 50×50 | opacity 0 → 0.5 hover → 1 active |
| Icon PNG | (30, 16) | 20×18 | `img/users.png` for Me row (per-directory) |
| Label | (70, 15) | 166×20 | 600 16/24 Inter, #000 — shifts to left 75 on hover only |
| Chevron PNG | (272, 23) | 8×4 | `img/drop-arrow.png` → swap to `drop-arrow-active.png` in active state |

**State matrix:**
| Property | Default | Hover-Tap-Hold | Active (Me Expanded) |
|---|---|---|---|
| Container bg opacity | 0 | **1** | **1** |
| Left 3×40 black bar | hidden | **visible** | hidden |
| Circle-bg 50×50 opacity | 0 | 0.5 | **1** |
| Label left | 70 | **75** (+5 shift) | 70 (back to default) |
| Chevron image | drop-arrow.png (▼) | drop-arrow.png (▼) | **drop-arrow-active.png (▲)** |

**Transitions:** 0.1s Ease Out for Default → Hover. 0.2s Ease Out for Hover → Active (Auto-Animate in XD).

**Implementation (two-layer chevron crossfade, same pattern as icon bar):**
```html
<button class="nav-item" onclick="toggleNav(this, 'me-sub')">
  <div class="circle-bg"></div>
  <div class="active-bar"></div>
  <div class="nav-icon"><img src="img/users.png" srcset="img/users@2x.png 2x" alt="" width="20" height="18"></div>
  <span class="nav-label">Me, Family & Network</span>
  <div class="nav-chevron">
    <img class="chev-default" src="img/drop-arrow.png"        srcset="img/drop-arrow@2x.png 2x"        width="8" height="4" alt="">
    <img class="chev-active"  src="img/drop-arrow-active.png" srcset="img/drop-arrow-active@2x.png 2x" width="8" height="4" alt="" aria-hidden="true">
  </div>
</button>
```

```css
.nav-item .nav-chevron img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; transition: opacity 0.2s ease-out; display: block; }
.nav-item .nav-chevron .chev-default { opacity: 1; }
.nav-item .nav-chevron .chev-active  { opacity: 0; }
.nav-item.active .nav-chevron .chev-default { opacity: 0; }
.nav-item.active .nav-chevron .chev-active  { opacity: 1; }
```

**Auto-activation (per page):** `_shared.js → highlightActiveSidebarItem()` runs on DOMContentLoaded, detects current page from `window.location.pathname`, adds `.active` to the correct parent nav-item, opens its `.sub-items` container, and marks the matching `.module-row` as `.active`.

**Page → parent mapping:**
```js
'profile' → me-sub (My Profile)
'family'  → me-sub (My Family)
'network' → me-sub (My Network)
'assets'  → plan-sub (Assets & Liabilities)
'health'  → plan-sub (Body & Health)
'goals'   → plan-sub (Goals & Aspirations)
'legacy'  → plan-sub (Emotional Legacy)
'will'    → plan-sub (Will & Legal Actions)
```

**Files where used:** `html-prototype/_shared.css`, `_shared.js`, `profile.html` (and all section pages via shared sidebar chrome).

**Confirmed:** 2026-04-15 by Violetka ("браво").

### Plan Strip Pattern
**Description:** Subscription plan indicator bar below sidebar identity.

- Size: 300×24px
- Inner shadow: `inset 0px 0px 6px #00000029`
- Plan name: `600 14px/17px Inter`, #FFF, left-aligned, 25px padding
- "Upgrade" CTA: `400 12px/15px Inter`, #FFF, right-aligned

**Gradient per plan type:**
- Individual: `linear-gradient(270deg, #61C553 0%, #31632A 100%)`
- Family: `linear-gradient(270deg, #FF9500 0%, #804B00 100%)`
- Premium: `linear-gradient(270deg, #FF2C55 0%, #80162B 100%)`
- Sponsored: `linear-gradient(270deg, #007AFF 0%, #003E82 100%)`

**Hover:** gradient becomes solid color (e.g. Individual: solid #61C553)

**Used in:** Dashboard Sidebar, Profile Sidebar

### Glass Card Pattern
**Description:** Glassmorphic card used throughout the platform.

- Background: rgba(255,255,255,0.33) for auth, rgba(255,255,255,0.45) for dashboard
- Backdrop-filter: blur(10px)
- Border: 1px solid #FFFFFF
- Border-radius: 30px
- Box-shadow: 0px 10px 30px #00000029
- Gradient overlay (top 50%): linear-gradient(180deg, #FFFFFF 0%, #FFFFFF00 100%)

**Used in:** Auth cards, dashboard cards, profile cards, KYC Verification Flow pad, all accordion sections.

**CRITICAL — XD Export Trap (locked 2026-04-16):**
XD will often export a pad with `background: #FFFFFF 0% 0% no-repeat padding-box` (solid white). **That is the flattened render preview — NOT the real pad style.** The real style on every PlanAfter pad is always:
- `background: rgba(255,255,255,0.33)` (profile page) or `rgba(255,255,255,0.45)` (dashboard)
- `backdrop-filter: blur(10px)`
- Top-half gradient overlay `linear-gradient(180deg, #FFFFFF 0%, #FFFFFF00 100%)` (height = 50% of pad, radius 30 30 0 0)

When an XD spec says `#FFFFFF` for a pad background, **ignore it and apply the glass pattern**. Leave an inline comment in the CSS so it doesn't get "fixed" back in the future. Example in `_shared.css` `.kyc-flow-card`.

**NESTED glass pad inside another glass card (locked 2026-04-16 via XD zoomed comparison):**

When a glass pad sits INSIDE another glass card that uses `isolation: isolate` (required to keep sibling backdrop-filters from interfering), `backdrop-filter: blur(10px)` on the inner pad is broken — Chromium samples the parent's already-flattened render instead of the page background, so the inner pad renders as flat white regardless of its alpha.

The XD CSS export for a nested pad still writes `background: rgba(255,255,255,0.33)` + `backdrop-filter: blur(10px)` + `border: 1px solid #FFFFFF`. That's the spec XD thinks it exported — but it is **wrong for nested contexts**. The correct canonical nested glass pad is:

```css
background: linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 100%);
border: 1px solid #FFFFFF;
border-radius: 20px;
box-shadow: 0px 10px 20px #00000014;
/* NO backdrop-filter — the parent's isolation: isolate breaks it */
```

The linear-gradient replaces the failed blur with a static top-lighter / bottom-darker highlight that gives the pad visual volume without relying on runtime blur. This is **THE base style for every nested glass pad** going forward — the XD spec export is overridden here by direct visual comparison against the XD render.

**Used in:** `.kyc-steps-card` (Steps progress pad inside `.kyc-flow-card`). Apply this same gradient treatment to any other pad that sits inside an already-blurred glass parent.

### Arrow Icon Standard
**Description:** Chevron arrow used universally across the platform.

- Size: 9×16px (standard — exceptions will be noted per component)
- Stroke: 1.5px, round cap, round join
- Color: inherits from parent (usually #000000)
- Path: `M1 1L8 8L1 15` (right-facing), mirror for left-facing
- Always centered in its container (circle or otherwise)

**Used in:** BtnSubmit, BtnBack, navigation arrows, list items

### Print Family Member Card Pattern
**Description:** Person card used in print document for all family members — spouse, children, parents, grandparents, pets, ex-partners.

**Structure:**
- White pad: 600×120px, `background: #FFFFFF`, `border: 1px solid #FFFFFF`, `border-radius: 60px`
- Avatar outer: 80×80px, `background: #FFFFFF`, `border-radius: 50%`, `opacity: 0.33`, positioned 20px inside pad (top+20, left+20)
- Photo: 60×60px, `border-radius: 50%`, `object-fit: cover`, centered in outer (top+30, left+30 from pad)
- Life dot: 8×8px, `border-radius: 50%`, positioned at pad bottom area (left+40 from pad left)
  - Alive: `#61C553` (green)
  - Deceased: `#FF2C55` (red)
- Name: `font: 600 20px/24px Inter`, `#000000`, left:630 from page
- Role: `font: normal 12px/15px Inter`, `#000000`, +28px below name
- Date of Birth label: `font: normal 12px/15px Inter`, `#000`, `opacity: 0.5`, +19px below role
- DOB value: `font: 600 12px/15px Inter`, `#000`, left:713
- Black separator dot: 4×4px, `#000`, left:786
- Age/Death label + value after dot

**Alive variant:**
- "Age:" label (opacity 0.5) + age value (600 weight)
- Role badge: `font: 600 12px/15px Inter`, `#000`, `opacity: 0.5`, right-aligned (e.g. "Executor, Beneficiary")

**Deceased variant:**
- "Date of Death:" label (opacity 0.5) + death date value (600 weight)
- "In Memory" badge: `font: 600 12px/15px Inter`, `color: #FF0000`, `text-align: right`, top = pad_top + 10px, left:979

**Used in:** print.html pages 4-5 (Family & Relationships, Extended Family)

### Print Document Status Indicator Pattern
**Description:** Document/file cards in print document showing relationship & status documents, vault items, etc.

**Structure:**
- Status label: `font: normal 10px/12px Inter`, `#000`, `opacity: 0.5`, `text-align: right`, `white-space: nowrap`, `height: 12px`
- Status dot: 8×8px, `border-radius: 50%`, positioned right of label
- Circle container: 60×60px, `background: #FFFFFF`, `border: 1px solid [status-color]`, `border-radius: 50%`
- Document icon: 16×20px, centered in circle (`img/document.png`)
- Title: `font: 600 16px/20px Inter`, `#000`, left:610
- Type: `font: normal 12px/15px Inter`, `#000`, +24px below title
- Updated: `font: normal 12px/15px Inter`, `#000`, `opacity: 0.5`, +19px below type

**Three status variants:**

| Status | Label | Dot color | Circle border |
|---|---|---|---|
| Digital File & Location | "Digital File & Location" | `#61C553` (green) | `#61C553` |
| Digital File only | "Digital File" | `#667EEA` (blue/purple) | `#667EEA` |
| Location only | "Location" | `#FF9500` (orange) | `#FF9500` |

**Used in:** print.html page 5 (Relationship & Status Documents section)

### Print Emergency Medical Card Pattern
**Description:** Red-themed emergency section at top of Medical Info page. Contains critical health info: blood type, allergies, conditions.

**Header:**
- First-aid icon: 20×20px (`img/first-aid.png`), positioned left of title
- Title: `font: 600 20px/24px Inter`, `color: #FF2C55` (red — exception to black text)

**Blood Type display:**
- Label: `font: normal 14px/17px Inter`, `#000`, `opacity: 0.5` ("Blood Type")
- White pill: 157×40px, `background: #FFFFFF`, `border: 1px solid #FFFFFF`, `border-radius: 20px`
- Value: `font: 600 16px/20px Inter`, `color: #FF2C55`, `text-align: center` (e.g. "AB+")
- Drop icon: 16×20px (`img/drop.png`), right of value

**Used in:** print.html page 6 (Medical Info)

### Print Allergy Severity Bar Pattern
**Description:** Pill-shaped colored bars showing allergy name and severity level. Uses Glow Bar visual language but at larger scale.

**Bar structure:**
- Size: variable width × 30px, `border-radius: 15px`
- Background: severity color (e.g. `#FF2C55` for allergies)
- Box-shadow: `inset 0px 1px 0px #FFFFFF47, 0px 0px 6px [color]`
- White dot: 4×4px, `background: #FFFFFF`, `border-radius: 50%`, vertically centered (top + 13px), left + 13px
- Allergy name: `font: 600 12px/15px Inter`, `color: #FFFFFF`, left of dot + 14px
- Severity level: `font: normal 12px/15px Inter`, `color: #FFFFFF`, `opacity: 0.5`, `text-align: right`, right-aligned inside bar

**Bar width reflects severity:**
- Mild: shorter (190px)
- Severe: longer (316px)

**Used in:** print.html page 6 (Medical Info). Potentially reusable for any rated/severity indicator.

### Print Medical Field Label Pattern
**Description:** Section labels in medical info. Same pattern as other print field labels.

- Font: `normal 14px/17px Inter`, `#000`, `opacity: 0.5`
- Width: 400px, left-aligned at left:520
- Examples: "Blood Type", "Allergies", "Medical Conditions and Medications"

**Used in:** print.html page 6

### Print Page Numbering Pattern
**Description:** Page numbering in print document. Cover page is page 1 but shows NO page number. Content pages start numbering at 2.

**Footer elements (per content page):**
- Disclaimer: "This document contains personal data..." `font: normal 12px/15px Inter`, `#000`, `opacity: 0.5`
- Black dot: 4×4px at left:120
- "Document Created:" label
- Date value + "|" + time value
- Page number block (right side): dot 4×4, "Page:" label, page number (600 16px/20px), "/" (opacity 0.5), total pages (600 16px/20px)

**Used in:** All print.html pages

### Print Document — Content Page Template Pattern
**Description:** Every print content page (p2–p24) shares this exact skeleton. Only the two columns of content inside change.

**Required elements (in this order):**
1. **Logo pill** (`.print-page-pill` > `.logo-pill`) — unique gradient ID per page: `print-logo-grad-pN`
2. **Section title** — `.print-section-title` ("My Profile")
3. **Profile photo** — `.print-profile-photo` with `.print-owner-avatar` + `.print-profile-initials`
4. **Name pad** — `.print-name-pad`
5. **Name text** — `.print-name-text` "Sarah Johnson"
6. **Role** — `.print-name-role` "Plan Owner"
7. **Verified label + check badge** — `.print-verified-text` + `.print-check-badge`
8. **Plan bar** — `.print-plan-bar`
9. **LEFT COLUMN** (position:absolute, left:120, width:320):
    - Section heading at **top:672** (`font: 600 36px/44px Inter`, height auto-expands per line count: 88px=2 lines, 132px=3 lines)
    - Description at **top:790** (`font: normal 16px/24px Inter`, height varies)
    - For 3-line titles, description shifts to **top:834**
10. **RIGHT COLUMN** (position:absolute, left:520+): category headers + entry cards
11. **Footer:** disclaimer (`.print-page-disclaimer`), Document Created label/value, Page N/24

**Used in:** all `print/pN-*.html` fragments, loaded by `print-document.html`

---

### Print Document — Entry Card Pattern (universal)
**Description:** The repeating unit used for every item in every category across the print document (Educational Qualifications, Professional Certifications, Employment Entries, Memberships & Affiliations, Beliefs, Hobbies, Interests, Documents, etc.). Every entry is composed of the same six elements at the same relative offsets.

**Anchor:** each entry has a circle at `top:Y, left:540`. All other elements are positioned relative to that Y.

**Standard layout (first entry at Y=210, subsequent entries at Y+140):**

| # | Element | Position (relative to Y) | Styling |
|---|---------|--------------------------|---------|
| 1 | Status label | `top: Y-16, left: 826, width: 100, height: 12` | `font: normal 10px/12px Inter`, `color:#000`, `opacity:0.5`, `text-align:right`, `white-space:nowrap` |
| 2 | Status dot | `top: Y-14, left: 932, width: 8, height: 8, border-radius:50%` | `background:` (per status) |
| 3 | Icon circle | `top: Y, left: 540, width: 60, height: 60, border-radius:50%, border:1px solid` (per status), `box-sizing:border-box` | `background:#FFFFFF` |
| 4 | Category icon | `top: Y+20, left: 560, width: 20, height: 18-20` | `<img>` from per-category icon registry |
| 5 | Entry title | `top: Y+1, left: 610, width: 280, height: 20` | `font: 600 16px/20px Inter`, `color:#000` |
| 6a | Category label | `top: Y+25, left: 610, width: auto, height: 15` | `font: normal 12px/15px Inter`, `white-space:nowrap` |
| 6b | Separator dot | `top: Y+31, left: (after label +10px), width: 4, height: 4, border-radius:50%` | `background:#000` |
| 6c | Subtype/context | `top: Y+25, left: (after separator +14px), width: auto, height: 15` | `font: normal 12px/15px Inter`, `opacity:0.5`, `white-space:nowrap` |
| 7 | Date/metadata | `top: Y+44, left: 610, width: 280, height: 15` | `font: normal 12px/15px Inter`, `opacity:0.5` |

**Entry vertical spacing:** next entry begins at `Y + 140` (e.g. 210 → 350 → 490 → 630 → 770 ...).

**Category header (appears above first entry of each category):**
- `top: Y-50, left: 520, height: 24` (e.g. 160 for Y=210, 300 for Y=350, 440 for Y=490)
- `font: 600 20px/24px Inter`, `color:#000`, `white-space:nowrap`
- **Conditional visibility rule:** category header appears only if at least one entry exists in that category. If the category is empty, omit the header entirely (don't leave a blank block).

---

### Print Document — Status Indicator Colors
Three status variants control the color of the icon circle border (#3) AND the status dot (#2). The status label text (#1) changes its content accordingly:

| Status | Label text | Color |
|--------|-----------|-------|
| Digital File & Location | "Digital File & Location" | 🟢 `#61C553` |
| Digital File only | "Digital File" | 🔵 `#667EEA` |
| Location only | "Location" | 🟠 `#FF9500` |

---

### Print Document — Icon Registry (per category)
Each category uses **one canonical icon** for all its entries. Icons live in `html-prototype/img/` and are loaded with `../img/<name>.png` from fragment files.

| Category | Icon file | Natural size | Render size |
|----------|-----------|--------------|-------------|
| Educational Qualifications / Professional Certifications / Other Educations | `education.png` | varies | 20×20 |
| Employment Entries | `goal.png` | 22×22 | 20×20 |
| Memberships & Affiliations | `crown.png` | 24×20 | 24×20 |
| Beliefs | `heart.png` | 22×20 | 20×18 |
| Hobbies | `star.png` | varies | 20×20 |
| Interests | `puzzle.png` | varies | 20×20 |
| Documents (generic card) | `document.png` | — | 16×20 (inside circle) |

**XD export artifact rule:** XD specs often include `border: 2px solid #000000` on `<img>` elements — this represents the icon's internal stroke, NOT a CSS border. **Always ignore it** when porting to HTML.

**Background artifact rule:** XD outputs `background: transparent url('...') 0% 0% no-repeat padding-box` on icons — simplify to `<img src="...">` instead of a `div` with background.

---

### Print Section Heading Pattern
**Description:** Section dividers in print document. Two levels.

**Level 1 — Section heading (e.g. "Immediate Family", "Extended Family"):**
- Box: 600×45px, `border-bottom: 1px solid #000000`
- Text: `font: 600 20px/24px Inter`, `#000`

**Level 2 — Sub-group heading (e.g. "Spouse / Partner", "Children", "Parents", "Pets"):**
- No box/border
- Text: `font: 600 20px/24px Inter`, `#000`

**Level 3 — Document section heading (e.g. "Relationship & Status Documents"):**
- No box/border
- Text: `font: 600 20px/24px Inter`, `#000`

**Used in:** print.html pages 4-5

---

### Print Document — Labeled Frame Pattern
**Description:** A transparent, outlined pad holding a short piece of primary content, with a small caption label below the frame identifying what the content represents. Used for free-text/notes fields inside document entries.

**Frame:**
- `width: 400px`, `height: variable` (60px for 1 line, 84px for 2 lines)
- `background: rgba(255,255,255,0)` (fully transparent)
- `border: 1px solid #00000029`
- `border-radius: 20px`
- `box-sizing: border-box`

**Primary content (inside the frame):**
- Offset: `frame.top + 20px`, `frame.left + 20px`
- Width: `frame.width − 40px` (20px horizontal padding)
- Font: `600 16px/24px Inter`, `#000`

**Caption label (below the frame):**
- Offset: `frame.top + frame.height + 10px`, `frame.left + 20px`
- Font: `normal 12px/15px Inter`, `#000`, `opacity: 0.5`
- `white-space: nowrap`

**Confirmed variants:**
- **"Location Details"** caption → describes where the original is physically stored (frame: 60px, 1 line)
- **"Notes & Instructions"** caption → free-form notes, warnings, or renewal reminders (frame: 84px, 2 lines)

**Used in:** `html-prototype/print/p10-documents.html` (Home Safe location frame, Notes & Instructions frame)

**Rule:** Any future free-text content block in the print document must follow this pattern rather than inline text, so users scanning the page instantly recognise "this is free-form information entered by the Plan Owner."

---

### Print Document — File Attachment Card Pattern
**Description:** Displays a digital file uploaded to the Vault. Appears inside a document entry when status is "Digital File & Location" or "Digital File".

**Anchor slot (60×60, invisible):**
- Position: `top: Y, left: 540px`
- `width: 60px, height: 60px`
- `opacity: 0` (reserves space; no visible pad — breaks the usual Entry Card circle rule for file attachments)

**File type icon (inside anchor slot):**
- Position: `top: Y+15px, left: 557px`
- `width: 27px, height: 30px`
- Source: `../img/{TYPE}.svg` where TYPE comes from the File Type Icon Set (see below)

**Filename:**
- Position: `top: Y+11px, left: 600px`
- Font: `600 16px/20px Inter`, `#000`
- Shows the original filename including extension (e.g. `US Passport - Sarah Johnson.pdf`)

**Upload date:**
- Position: `top: Y+35px, left: 600px`
- Font: `normal 12px/15px Inter`, `#000`, `opacity: 0.5`
- Relative format: `Uploaded {n} {unit} ago` or `Uploaded on {date}`

**Used in:** `html-prototype/print/p10-documents.html`

---

### Print Document — File Type Icon Set
**Description:** A canonical set of 12 file type icons, each 27×30 px with a type-specific gradient color, used in the File Attachment Card.

**Files** (stored at `html-prototype/img/{TYPE}.svg`):
- **Documents:** PDF, DOCX, RTF, TXT
- **Spreadsheets:** XLSX
- **Images:** JPG, PNG, GIF
- **Audio:** MP3, WAV
- **Video:** MP4, MOV

**Rule:** The icon chosen must match the filename extension. Unknown extensions fall back to a generic document icon (document.png) — to be confirmed with XD.

---

### Print Document — Location in Platform Subsection Pattern
**Description:** A secondary "where does this live inside PlanAfter" block underneath the primary entry row. Signals that the entry is also visible in a specific area of the platform (sidebar section → page → subsection).

**Secondary circle (semi-transparent, smaller visual weight than primary):**
- Position: `top: Y, left: 540px`
- `60×60px`, `background: rgba(255,255,255,0.5)`, `border: 1px solid #FFFFFF`, `border-radius: 50%`

**Icon inside circle:**
- Typically `in-folder.png` at 20×16, centered (`top: Y+22, left: 560`)

**Caption label ("Location in Platform"):**
- Position: `top: Y+23, left: 620`
- Font: `normal 12px/15px Inter`, `#000`, `opacity: 0.5`

**Followed by a Breadcrumb** (see next pattern).

**Used in:** `html-prototype/print/p10-documents.html`

---

### Print Document — Breadcrumb Pattern
**Description:** A vertical stack of platform locations showing the drill-down path (Sidebar section → Page → Subsection → Field). Each level has a different bullet size and text weight to signal hierarchy.

**Level 1 (top-level destination, e.g. "Me, Family & Network"):**
- Bullet: 8×8px black CIRCLE (must have `border-radius:50%;`)
- Text: `600 14px/17px Inter`, `#000`
- Text `top` = bullet `top − 5px` (text baseline aligns with bullet center)

**Level 2+ (nested pages/sections, e.g. "My Profile" → "Essential Info"):**
- Bullet: 4×4px black CIRCLE (must have `border-radius:50%;`), centered under the level 1 bullet (`left: bullet1.left + 2`)
- Text: `normal 12px/15px Inter`, `#000`
- Text `top` = bullet `top − 6px`

**Vertical rhythm between levels:** ≈ 27px (level 2) and 25px (level 3+)

**Bullet shape rule (confirmed 2026-04-14):** Breadcrumb bullets are ALWAYS circles, never squares. Always include `border-radius:50%;` on the bullet span. The XD export often omits border-radius in the background shorthand — add it explicitly on every breadcrumb bullet.

**Used in:** `html-prototype/print/p10-documents.html` through `p23-hobbies.html`

---

### Print Document — Contact Card Pattern (compact summary)

A compact contact summary card that appears WITHIN an entry to show a person linked to that entry (e.g. lawyer holding the original document, doctor for a medical record, accountant for a financial record).

**Container:**
- Pad: 400×100px, white `#FFFFFF`, border-radius 50px
- left:540 (matches entry content column)

**Role badge (top-right):**
- Position: top:card+12 left:card-right−115 (right-aligned)
- Font: 600 10/12 Inter, color #000, opacity 1
- Width: 55px, text-align right
- Examples: Contributor, Beneficiary, Executor, Plan Owner

**Avatar (Two-Circle Pattern):**
- Outer: 80×80 glass (rgba(255,255,255,0.33), blur 10px, shadow 0px 10px 30px #00000029) at top:card+10 left:card+10
- Inner photo: 60×60 round at top:card+20 left:card+20
- Fallback initials: 600 24/33 Source Serif 4, color rgba(0,0,0,0.4), bg rgba(0,0,0,0.08), letter-spacing 0.05em

**Name (top text row):**
- Font: 600 14/17 Inter, color #000
- Position: top:card+32 left:card+95 (right of avatar)
- white-space: nowrap

**Source row (below name, inline with bullet separator):**
- Position: top:card+53 left:card+95
- Font: normal 12/15 Inter, color #000, opacity 0.5
- Format: `[Section name]` • `[Sub-category]` (e.g. "My Network • Lawyer")
- Bullet: 4×4 black, top:text-top+6 (vertically centered with 15px text line)
- Gap: 10px before bullet, 10px after bullet
- All inline elements have white-space:nowrap

**Used in:** `html-prototype/print/p12-documents-3.html` (Entry 6 — Prenuptial Agreement with John, Attorney Mark Davis contact)

**Different from Print Family Member Card:**
| Property | Family Card | Contact Card |
|---|---|---|
| Pad size | 600×120 | 400×100 |
| Border-radius | 60px | 50px |
| Name font | 600 20/24 | 600 14/17 |
| Avatar size | 80/60 | 80/60 |
| Has life dot | Yes (8×8 green/red) | No |
| Has DOB/Age row | Yes | No |
| Has source row | No | Yes (Section • Sub-category) |
| Used for | Family members | Professional contacts within entries |

---

### Print Document — People & Contacts Subsection Divider

A centered label that introduces a "People & Contacts" subsection within an entry, after the Location Details and before listing related contact cards.

**Specs:**
- Position: top varies, left:540 (matches entry content column)
- Width: 400px (full content width)
- Font: normal 14/17 Inter, color #000, opacity 0.5
- Text-align: center
- Examples: "People & Contacts", potentially "Beneficiaries", "Witnesses", etc.

**Different from:**
- **Category header** (600 20/24, left-aligned at left:520) — separates different categories of entries (e.g. "Identity Documents", "Relationship & Status Documents")
- **Field caption** (normal 12/15, opacity 0.5, left-aligned) — labels a single field below it

**Used in:** `html-prototype/print/p12-documents-3.html` (Entry 6, "People & Contacts" subsection)

---

### Two-Layer PNG Icon Crossfade Pattern (XD-exported icons with default + hover alpha variants)

**Rule:** For icons exported from XD that have **two alpha variants** — a low-alpha outline (default state) and a full-alpha solid (hover/tap/hold state) — render BOTH PNGs stacked and crossfade via opacity. Never try to fake the hover state by brightening the default PNG (CSS filter/mask cannot recover alpha that isn't in the file).

**Why this exists:** XD exports white icons with variable alpha baked into the PNG. The "default" outline version has max alpha ≈ 128/255 (≈50%) by design — it's *meant* to look muted. The "hover" version has max alpha = 255 — it's *meant* to look bright and solid white. Both files are needed.

**File naming convention:**
```
img/
├── user-plus.png          ← default (low-alpha outline)
├── user-plus@2x.png
├── user-plus-hover.png    ← hover (full-alpha solid white)
├── user-plus-hover@2x.png
├── download.png / @2x     ← same pattern
├── download-hover.png / @2x
├── share.png / @2x
└── share-hover.png / @2x
```

**HTML structure (two stacked `<img>` layers):**
```html
<div class="bar-icon-wrap bar-add-family" data-label="Add Family">
  <span class="profile-bar-icon">
    <img class="icon-default" src="img/user-plus.png"       srcset="img/user-plus@2x.png 2x"       alt="Add Family">
    <img class="icon-hover"   src="img/user-plus-hover.png" srcset="img/user-plus-hover@2x.png 2x" alt="" aria-hidden="true">
  </span>
</div>
```

**CSS (crossfade via opacity, 0.2s ease-out):**
```css
.profile-bar-icon { width: 20px; height: 20px; display: block; position: relative; cursor: pointer; }
.profile-bar-icon img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; transition: opacity 0.2s ease-out; pointer-events: none; }
.profile-bar-icon .icon-default { opacity: 1; }
.profile-bar-icon .icon-hover   { opacity: 0; }
.bar-icon-wrap:hover .profile-bar-icon .icon-default { opacity: 0; }
.bar-icon-wrap:hover .profile-bar-icon .icon-hover   { opacity: 1; }
```

**Mobile override:** Suppress the hover swap on touch devices — keep default outline visible:
```css
@media (max-width: 768px) {
  .bar-icon-wrap:hover .profile-bar-icon .icon-default { opacity: 1 !important; }
  .bar-icon-wrap:hover .profile-bar-icon .icon-hover   { opacity: 0 !important; }
}
```

**Anti-patterns (tried, don't use):**
- ❌ `filter: brightness()` / `invert()` — can't increase alpha past what's in the file
- ❌ CSS `mask-image` with `background-color: white` — mask strength is capped by PNG alpha (same dim result)
- ❌ `mask-mode: luminance` — invisible with white-on-transparent PNGs
- ❌ Python pre-processing to boost alpha — changes the file (user rejected)
- ❌ Redrawing icons as inline SVG — visually diverges from the XD export
- ✅ **Two PNGs + opacity crossfade** — exact XD fidelity, smooth transition, no alpha math

**Files where used:** `html-prototype/profile.html` (Add Family, Download, Share icons on the black right-side action bar)
**Applies to:** any icon with a default+hover pair exported from XD.

**Confirmed:** 2026-04-15 by Violetka ("браво - това е - запомни").

---

### Contact Card Integrity Rule (CRITICAL)

**Rule:** Every contact that appears as a summary card in any document, entry, or record MUST have a complete record in its corresponding section (My Network, My Family, etc.).

**Why:** A summary card is a *view* of an existing record — it is NOT a standalone element. The card is rendered by querying the canonical record. Without a record to render from, the summary cannot exist.

**Consequence:**
- If a summary card appears for a contact who has no record → this is a **bug** (data integrity violation).
- When the user references a person in any new entry/document/note, the platform must either:
  1. Link to an existing record, OR
  2. Prompt the user to create a new minimal record for that person before linking.

**Applies to:**
- Print document People & Contacts cards
- Document entry "Held by" or "Linked to" person references
- Asset/Liability beneficiary chips
- Will/Legal executor chips
- Letter recipient cards
- Plan share recipient cards
- Any place where a person's avatar + name + source-row appears

**Naming convention:** Contact photo files saved at `html-prototype/img/Profile_img_N.png` (sequential numbering, matches family member photo convention). Mark Davis = Profile_img_18.png (next available after 17).

**Confirmed:** 2026-04-14 by Violetka.

---

### Unsaved Changes Popup (System Popup Pattern)

**Purpose:** Guard any record card that has entered Edit Mode from losing unsaved changes when the user navigates away, closes the modal, or taps a different sidebar/nav target. Also reused for destructive confirmations (delete/remove).

**Trigger rules:**
- Fires whenever a user in Edit Mode attempts to exit without an explicit Save (close icon, backdrop click, back button, sidebar/nav navigation, right-panel open, browser back).
- `showSystemPopup({title, body, primaryLabel, onPrimary, onSecondary})` is the single entry point — the Unsaved Changes popup is one preset of this component.
- Only ONE card can be in Edit Mode at a time across the entire record (see Record Card State Rule below).

**XD-locked specs:**

| Element | Spec |
|---|---|
| Backdrop | `position: fixed; inset: 0; z-index: 9500; background: rgba(255,255,255,0.20); backdrop-filter: blur(10px)` |
| Modal | `400px` wide, `rgba(255,255,255,0.33)` bg, `1px solid #FFFFFF` border, `border-radius: 30px`, `box-shadow: 0 10px 30px rgba(0,0,0,0.16)`, `backdrop-filter: blur(10px)` |
| Gradient overlay (top) | 400×127px, `linear-gradient(180deg, #FFFFFF 0%, transparent 100%)`, radius 30px top corners only, `z-index: 0`, `pointer-events: none` |
| Attention icon | 50×40px, `img/attention.svg`, inline flex left of title |
| Title | "Unsaved Changes", `Source Serif 4 600 24px/32px`, color `#000` |
| Close X | 20×20px, `img/cancel.svg`, top:30 right:30, `opacity: 0.5 → 1` on hover |
| Body text | `Inter 400 16px/24px`, color `#000`, opacity 1. Copy: `"You are in Edit Mode. Do you want to save changes before exit?"` (NO exclamation — overrides XD per CLAUDE.md brand voice) |
| Don't Save button | 140×60px, `border: 1px solid rgba(0,0,0,0.16)`, `border-radius: 30px`, transparent bg, label `Inter 400 16px/24px #000` |
| Save button (default) | 126×60px overall. Red #FF0000 label left-aligned + 10px dash at left:46 + 60×60 red circle at left:66 with white arrow (`img/arrow-right.svg`, 9×16) |
| Save button (hover/touch) | Pill-Expand-On-Hover: background slides left to `-30` width `156` filling behind label, label turns `#FFFFFF`, dash grows 10→30px and turns white, circle stays red |
| Button gap | Don't Save + Save aligned in flex row, right-aligned in footer |

**Color lock:** Save button red is `#FF0000` (XD spec), NOT `#FF2C55` (error color). This is a distinct action-confirmation red — a call to commit, not an error signal.

**HTML structure:**
```html
<div class="unsaved-overlay" id="unsavedOverlay">
  <div class="unsaved-popup" role="dialog" aria-labelledby="unsavedTitle">
    <button class="unsaved-popup-close" onclick="closeUnsavedPopup()" aria-label="Close"></button>
    <div class="unsaved-popup-inner">
      <div class="unsaved-popup-header">
        <div class="unsaved-attention-icon" aria-hidden="true"></div>
        <div class="unsaved-popup-title" id="unsavedTitle">Unsaved Changes</div>
      </div>
      <div class="unsaved-popup-body">You are in Edit Mode. Do you want to save changes before exit?</div>
      <div class="unsaved-popup-actions">
        <button class="unsaved-dont-save" onclick="discardAndExit()">Don't Save</button>
        <div class="unsaved-save-btn" onclick="saveAndExit()"
             ontouchstart="this.classList.add('touching')"
             ontouchend="setTimeout(()=>this.classList.remove('touching'),300)">
          <span class="unsaved-save-label">Save</span>
          <span class="unsaved-save-dash"></span>
          <span class="unsaved-save-circle">
            <img class="unsaved-save-arrow" src="img/arrow-right.svg" alt="" width="9" height="16">
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
```

**JS wiring (in `_shared.js`):**
- `showSystemPopup(opts)` — generic entry point, dispatches to Unsaved / Delete / Remove variants
- `showUnsavedPopup(onSave, onDiscard)` — opens modal with saved callbacks
- `saveAndExit()` → calls `onSave`, then closes modal + exits edit mode
- `discardAndExit()` → reverts DOM to last saved snapshot, closes modal + exits edit mode
- `closeUnsavedPopup()` → close only (user chose to stay in Edit Mode)
- Dynamic button width calc runs after mount to measure label text and snap pill geometry

**Assets:**
- `img/attention.svg` (50×40, triangle + `!`)
- `img/cancel.svg` (21.5×21.5, circle + ×)
- `img/arrow-right.svg` (9×16, white chevron filling red circle)

**Files where used:** `html-prototype/profile.html` (Essential Info edit mode). Planned for every editable record card across the platform.

**Related patterns:**
- Pill-Expand-On-Hover (Save button slides its ::before backdrop from left:0 width:126 → left:-30 width:156)
- Arrow Icon Standard (9×16, 1.5px stroke for chevron)
- Glass Circle component (60×60 radius 30)

**Confirmed:** 2026-04-16 by Violetka end-to-end (attention icon, red #FF0000, 20×20 cancel SVG, no-exclamation body copy, Save hover state).

---

### Record Card State Rule — Single Active Edit

**Rule:** Within a single record shell (My Profile, Assets, Health, etc.), ONLY ONE card can be in Edit Mode at any time. All other cards in that record remain in View Mode.

**Why:** Prevents confusion about which card the "Save" action commits, keeps the Unsaved Changes guard unambiguous, matches XD interaction pattern.

**Behavior:**
- Default state of every card on load = **View Mode**
- **Opening a card (clicking its accordion header) always renders it in View Mode** — never auto-enters Edit Mode, even if the card was previously edited this session
- **Edit Mode is entered ONLY by explicit click on the card's Edit button** inside the opened card
- When a user enters Edit Mode on Card A → Card A shows edit controls; Cards B, C, … stay locked in View Mode (Edit button disabled/hidden or no-op until Card A exits Edit Mode)
- Attempting to enter Edit Mode on Card B while Card A is dirty → triggers `showUnsavedPopup()` from Card A first
- Saving or discarding Card A → all cards return to View Mode, then Card B can enter Edit Mode
- Page load / navigating to a record → ALL cards render in View Mode (never auto-edit)
- Closing a card (even with Don't Save) strips `.editing` state; re-opening starts fresh in View Mode

**Implementation contract:**
- A global `window.__activeEditCard` holds the id of the current edit card, or `null`
- `enterEditMode(cardId)` refuses if `__activeEditCard` is set to a different id — routes through unsaved-changes guard
- `exitEditMode(cardId, {save|discard})` clears `__activeEditCard` and calls card's renderView()
- View Mode is the authoritative default — Edit Mode is always a temporary, explicit user action

**Files where used:** `html-prototype/profile.html` Essential Info. To be extended to every editable card across My Profile and all other record shells.

**Confirmed:** 2026-04-16 by Violetka (verbatim: "so wne open the card essntial info ald nall other cards in record shell be in vuiwe mode").

---

### Global Input Underline State Machine

**Rule:** Every text input / dropdown trigger in Edit Mode follows the same border-bottom behavior.

| State | Border-bottom |
|---|---|
| Default | `1px solid rgba(0,0,0,0.33)` |
| Hover | `1px solid #000` (opacity 1) |
| Focus / open | `1px solid #000` (opacity 1) |
| Error | `1px solid #FF2C55` |

**CSS classes:** `.ei-field-input-wrap`, `.ei-dob-trigger` share this pattern. Apply to all future input wrappers.

**Confirmed:** 2026-04-16 by Violetka (0.33 default, black on hover/focus).

---

### DOB Dropdown Chev Position

**Rule:** Chev arrows on DOB (Year/Month/Day) triggers are absolutely positioned, NOT inline after the value.

- `position: absolute; right: 20px; top: 28px;`
- Size 8×4 via `img/drop-arrow.png`
- Rotates 180° via `.open` class when dropdown is open
- Trigger container is `display: block; position: relative;` (not flex)

**Why:** XD spec pins arrow to the trigger's right edge regardless of rendered text width. Flex-inline layout caused arrow to drift when value grew.

**Confirmed:** 2026-04-16 by Violetka (via measured coords Year:845, Month:1014, Day:1132 all at right:20).

---

### Primary Citizenship Click-to-Promote

**Rule:** Any multi-value chip list with a "primary" designation (citizenships, phone numbers, emails) uses click-to-promote with auto-promotion on primary removal.

**Behavior:**
- First chip added → auto-promoted to primary (gets `(Primary)` badge)
- Clicking a non-primary chip → promotes it, demotes the previous primary
- Removing the primary chip → next remaining chip auto-promotes
- Removing a non-primary chip → primary unchanged
- `.is-primary` chips have `cursor: default`; non-primary chips have `cursor: pointer` + hover state `rgba(255,255,255,0.66)`

**JS surface:** `setPrimaryCitizenship(e, chip)`, `promoteToPrimary(chip)`, `removeCitizenship(e, xEl)` — exposed on `window` for inline handlers.

**Confirmed:** 2026-04-16 by Violetka end-to-end.

---

### File Preview Modal (LOCKED 2026-05-12)

Click an attached file row in any entry expand body → opens a full-screen modal that mirrors the canonical `.doc-preview` structure from `print-document.html` (glass sidebar + dark-overlay viewer). Reuses the SAME shell, sizing, background, sidebar tokens — the only difference is the sidebar content shows file-specific metadata instead of the Document Scope tree.

**Trigger:** `<div class="file-list-row ee-view-only" onclick="paOpenFilePreview(this)">` inside `.entry-expand-body`.

**Build flow:** `paOpenFilePreview(fileRowEl)` → reads `data-entry` JSON from the parent `.entry-row` + `data-file-index` from the clicked row → calls `paBuildFilePreviewModal(entry, file)` → appends `<div id="paFpDocPreview" class="doc-preview">` to `<body>` + sets `body.classList.add('doc-preview-mode')` + tracks via `data-pa-fp-added-mode="1"`.

**Close flow:** X button, Esc key, or `paCloseFilePreview()` → removes the modal element + clears the body class. Idempotent.

**Sidebar structure (expanded, 300px):**
1. `.doc-sb-back` arrow button (40×40, top, toggles `.expanded`)
2. `.doc-sb-avatar` (60×60, plan owner / record owner avatar — clickable, calls `paFpExpandIfCollapsed`)
3. `.doc-sb-name` + `.doc-sb-role` (name + "Plan Owner" or relationship)
4. `.doc-sb-divider`
5. **`.pa-fp-filecard`** — direct child of `.doc-sidebar` (NOT inside `.doc-sb-select`). `align-self: stretch` so it spans the full sidebar width (298px between the 1px white borders) rim-to-rim as a solid `#FFFFFF` band. 60px tall, padding `0 30px`, contains PDF icon 27×30 + filename Inter 600 14/17. Click anywhere → `paFpExpandIfCollapsed`.
6. **`.doc-sb-select`** with `onclick="event.stopPropagation()"` — contains the two info sections:
   - **Location in the Platform** — `.pa-fp-section` with `.pa-fp-section-head` (60×60 glass circle `rgba(255,255,255,0.5)` + 1px white border + `in-folder.png` 20×16 inside) + label "Location in the Platform" (Inter 400 12/15, opacity 0.5) + `.pa-fp-path-list` with 3 bullets: L1 bold (e.g. "Me, Family & Network"), L2 regular ("My Profile" or "{Name}'s Record"), L3 regular (card name).
   - **Entry context** — `.pa-fp-section` with `.pa-fp-section-head` (60×60 glass circle + **entry-type icon** from `paPickEntryIcon`) + title Inter 600 16/24 + 3 `.pa-fp-entry-row` blocks (Document Type, Group/Category, Location of the Original) — value Inter 600 14/17 + label Inter 400 12/15 (opacity 0.5).
7. `.doc-sb-btn-row` × 2 (Download + Print, canonical pattern)

**Critical: Entry-type icon mapping** (`window.paPickEntryIcon(entry)`):
- Mirrors the local `pickGlyph` from the Documents tab renderer (`_shared.js:5367-5391`) — same icon as the entry row card.
- Rules: Identity/Vital Documents/Relationship/Status Documents → `document.png` (16×20) | Blood Type → `drop.svg` (16×20) | Allergies → `shield-allergy.png` (18×20) | Medical → `pill.png` (20×20) | Education → `education.png` (20×18) | Employment → `goal.png` (20×20) | Membership/Affiliation → `crown.png` (24×20) | Beliefs → `heart.png` (20×18) | Hobbies → `star.png` (20×20) | Interests → `puzzle.png` (20×20) | Fallback → `document.png` (16×20).
- Override via `entry.icon` always wins.

**No srcset for entry icons:** Several entry glyphs (`document.png`, `shield-allergy.png`, `pill.png`, `education.png`) ship WITHOUT `@2x` retina variants. Using `srcset="x.png 1x, x@2x.png 2x"` on a retina display where the `@2x` is missing causes the browser to render a broken-image placeholder. So `paBuildFilePreviewModal` uses ONLY the 1x `src` for entry icons — the upscale loss is imperceptible at 16-24px. Same rule applies anywhere else: only use srcset if the @2x variant is GUARANTEED to exist.

**Collapsed sidebar (80px) behavior:**
- All text labels, list items, entry rows, and the section title hide via `display: none !important` on `.pa-fp-filecard-name`, `.pa-fp-section-label`, `.pa-fp-section-title`, `.pa-fp-path-list`, `.pa-fp-entry-row`.
- Sections collapse to JUST the 60×60 glass circles, stacked vertically with 20px gap.
- File card becomes a 60-tall edge-to-edge white band (still `align-self: stretch`).
- ALL icons (avatar, file card, location circle, entry circle) sit on the SAME vertical centre line.
- **Click-to-expand** (`paFpExpandIfCollapsed`): clicking ANY icon circle in collapsed mode expands the sidebar to 300px. One-way only — never collapses. Bound on `.doc-sb-avatar`, `.pa-fp-filecard`, and both `.pa-fp-section-icon` instances.
- Hover state on section circles in collapsed: `rgba(255,255,255,0.6)` background.

**Edge-to-edge architecture (why the file card lives outside `.doc-sb-select`):**
- `.doc-sb-select` has `width: calc(100% - 40px); margin: 20px 20px 20px 20px; overflow: hidden;` — it's a 260px-wide content panel inside the 300px sidebar with 20px symmetric margin. The `overflow: hidden` clips any negative margins on its children.
- The file card MUST span the full 298px (rim-to-rim) → cannot live inside `.doc-sb-select`. It's a direct child of `.doc-sidebar` with `align-self: stretch` that overrides the sidebar's `align-items: center`.

**Focus ring suppression:** Browser-default orange `:focus` / `:focus-visible` outline is killed inside the modal via `outline: none !important; box-shadow: none !important;` on all `.doc-sb-btn`, `.doc-sb-back`, `.doc-sb-download`, `.doc-sb-print`, `.doc-close`, and any `button`. Keyboard a11y is preserved via the existing hover states.

**Page-content bleed-through prevention:** When `body[data-pa-fp-added-mode="1"]`, all page-level layout blocks get `visibility: hidden !important` — `.accordion-section`, `.entry-expand-body`, `.entry-row`, `.doc-row`, `.notif-panel`, `.pa-reminder-tip`, `.pa-toast`, `.system-popup`, `.dashboard-card`, `.ai-assistant-panel`, `.vault-tile`, `.progress-overview`. The modal stays visible via `#paFpDocPreview, #paFpDocPreview * { visibility: visible !important; }`. We use `visibility` (not `display`) so the page doesn't reflow when the modal closes.

**Z-index:** `#paFpDocPreview.doc-preview { z-index: 10000; }` — above profile.html stack.

**Viewer side (current state):** Static "Document Preview" placeholder (no actual PDF rendering, no page navigation). Multi-page support deferred — when implemented will reuse canonical `.print-page` pattern OR delegate to native PDF viewer via iframe.

**Files where used:** `_shared.js` (`paOpenFilePreview` / `paCloseFilePreview` / `paBuildFilePreviewModal` / `paFpToggleSidebar` / `paFpExpandIfCollapsed` / `paPickEntryIcon`) + `_shared.css` (lines ~21946-22209 file preview modal block).

**Confirmed:** 2026-05-12 by Violetka — "браво - това е запомни го".

---

## Pages Status

| Page | Design | Functionality | Notes |
|---|---|---|---|
| SignUp (step 1: source) | ✅ Done | ✅ Done | Radio options, vertical divider layout |
| SignUp (step 2: account) | ✅ Done | ✅ Done | BtnSubmit + BtnBack confirmed |
| Login | ✅ Done | ✅ Done | BtnSubmit applied |
| ForgotPassword | ✅ Done | ✅ Done | BtnSubmit + BtnBack applied (3 steps) |
| VerifyEmail | 🔄 In progress | ✅ Done | BtnSubmit + BtnBack applied, code input boxes |
| Dashboard | 🔄 In progress | 🔄 Partial | Header, Sidebar patterns documented |
| Profile (dashboard) | 🔄 In progress | 🔄 Partial | Family card photos synced |
| Print Document | 🔄 In progress | N/A | Pages 1-11 built (Cover, Personal, Contact, Family, Documents, Medical, Medical Devices, Education, Employment, Beliefs/Hobbies/Interests, Documents-shell ✅) |
| OnboardingWelcome | ✅ Done | ✅ Done | Woman + 300px card layout |
| OnboardingQ1 (Personal Info) | ✅ Done | ✅ Done | Progress bar + form + custom dropdowns |
| OnboardingQ2 | ❌ Not started | ❌ Not started | |
| Family Tree (family-tree.html) | ✅ Done | ✅ Done | Golden tree bg, 4 generations, filter chips, collapse pills, controls bar, SVG lines |

---

## Open Issues

- [x] `.auth-btn-continue` (legacy) replaced with BtnSubmit everywhere
- [x] `.auth-btn-back` (legacy) replaced with BtnBack everywhere
- [x] Checkbox rebuilt with XD specs (20×20, black dot 12×12)
- [x] Card padding-bottom corrected to 30px
- [x] Dynamic password hint (shows remaining requirements)
- [x] Checkbox default state: checked
- [x] Legacy CSS `.auth-btn-continue` and `.auth-btn-back` removed from globals.css
- [x] BtnSubmit arrow SVG now uses `currentColor` instead of hardcoded `#000000`
- [x] All `autoFocus` removed from auth pages (placeholder now visible on load)
- [x] All BtnSubmit labels are static (no "Loading..." text changes — spinner handles loading)
- [x] ForgotPassword Step 2 now uses Digit Box pattern (verify-code-card + verify-code-box)
- [x] VerifyEmail fully designed from XD specs
- [x] Auth title margin-bottom changed globally from 50px to 30px
- [x] Error/Success messages redesigned: 400px box, radius 10px, centered, 20px margin
- [x] Error and success messages are mutually exclusive (never show simultaneously)
- [ ] Password field autofill blue on some browsers (webkit fix exists but may not cover all cases)
- [ ] BtnSubmit color variants not yet implemented (white for dark backgrounds, colored for plan strips)

---

## Session Log

### 2026-04-16 (Edit Mode hardening — popup, input states, card state rule)

- Locked **Unsaved Changes Popup** pattern (XD end-to-end): 400px glass modal with top gradient overlay, 50×40 attention.svg icon, 20×20 cancel.svg close, Don't Save + Save Pill-Expand-On-Hover button with #FF0000 (not #FF2C55), white arrow on red 60×60 circle, copy overrides XD to drop exclamation per brand voice
- Copied assets `attention.svg`, `cancel.svg`, `arrow-right.svg` into `html-prototype/img/`
- Added `#unsavedOverlay` DOM to `profile.html`; wired `showSystemPopup()`, `saveAndExit()`, `discardAndExit()`, `closeUnsavedPopup()` in `_shared.js`
- Locked **Record Card State Rule** — only ONE card in Edit Mode per record shell at a time. All other cards remain in View Mode. Default on page load is View Mode for every card. Attempting to enter a second card's Edit Mode while the first is dirty routes through the Unsaved Changes guard.
- Locked **Global Input Underline State Machine** — default `rgba(0,0,0,0.33)`, hover/focus `#000`, error `#FF2C55`. Applied to `.ei-field-input-wrap` and `.ei-dob-trigger`.
- Locked **DOB Chev Position** — `position: absolute; right: 20px; top: 28px;` on all three (Year/Month/Day) regardless of rendered value width. Verified via live measurement.
- Locked **Primary Citizenship Click-to-Promote** — first chip auto-promotes, click any other to promote, removing primary auto-promotes the next chip. Non-primary chips get hover bg `rgba(255,255,255,0.66)`.
- Full Legal Name (3.2) gap analysis delivered (44 items across 8 expert domains) — not yet implemented.

### 2026-04-14 (Print Document — Pages 19–23 built; Breadcrumb bullets confirmed as circles)

**Pages built this session:**
- **p19-other-educations.html** — Other Educations: Coding Bootcamp @ Udemy entry (Digital File & Location, green, goal.png), Cloud location, JPG attachment (Coding Bootcamp.jpg), contact cards Alfred Helmerich & Luz Romero, 84px notes frame
- **p20-employment.html** — Employment Entries: Founder & CEO @ Johnson & Johnson (green, goal.png), Lawyer's Office location, PDF Founding Protocol.pdf, Mark Davis contact card WITH new "Contributor" role badge (top-right, 600 10/12, #000)
- **p21-memberships.html** — Memberships & Affiliations: Rotary Club entry (Location only, orange, crown.png), field pairs (Rotary Club/Community/Member/ROT-99283-X), Timeline pad, Home Safe location, Linda Smith contact card (Secretary, initials LS)
- **p22-beliefs.html** — Beliefs: Christian entry (green, heart.png), field pairs (Type of Belief/Affiliation/Denomination/Level of Observance), Baptism May 21 1988 + St. Peter's Cathedral, Home Safe + Red folder, PDF Baptism Certificate.pdf, David Michaels contact card (Parish Priest, initials DM)
- **p23-hobbies.html** — Hobbies: Golf entry (Location only, orange, star.png), field pairs (Golf/Hobby Name, Weekend player/Description, Intermediate/Skill Level) — IN PROGRESS (stopped mid-page)

**Pattern confirmations:**
- **Breadcrumb bullet circle rule (confirmed 2026-04-14):** All breadcrumb bullets (both 8×8 L1 and 4×4 L2+) MUST use `border-radius:50%;` to render as circles. Fixed across all print pages p10–p23. XD exports often omit this — always add it explicitly.
- **Contact Card Role Badge pattern (new):** Top-right of card, 600 10/12 Inter #000, right-aligned. Examples: Contributor (Mark Davis p20), Beneficiary, Executor, Plan Owner.
- **White-space:nowrap systematic fix:** Applied to all single-line captions/labels/names because Inter on web renders wider than XD. All names, field labels, status indicators, sub-rows, captions use `white-space:nowrap`.
- **SVG icon preference:** Use `.svg` over `.png` where both exist (PDF.svg, DOCX.svg, JPG.svg).

**Next session resume point:**
- **File:** `html-prototype/print/p23-hobbies.html`
- **Last element added:** "Intermediate" / "Skill Level" field pair at top:631 / top:655
- **Expected next:** likely Timeline & Milestones divider for Golf entry (based on pattern from p21/p22), or Location of the Original Document or File, or second hobby entry. Wait for XD specs.
- **Pages array in print-document.html:** ends at `'print/p23-hobbies.html'`. Total pages loaded: 23 + cover = 24 (matches Page N/24 footer).

### 2026-04-14 (Print Document — Entry Card Pattern + Icon Registry + pages 8-11)
- Split Medical Devices & Implants into separate page: `print/p6b-medical-devices.html`
- Reindexed p7-education.html → page 8 (was page 7)
- Built **page 9 — Employment & Affiliations** (`print/p8-employment.html`):
  - Left column: title (top:672, 2-line, 88px) + description (top:790, 164px)
  - Right column category headers: "Employment Entries" (top:160), "Memberships & Affiliations" (top:300)
  - Entry 1: Founder & CEO @ Johnson & Johnson (Digital File & Location, green, goal.png)
  - Entry 2: Rotary Club · Community (Location, orange, crown.png)
- Built **page 10 — Beliefs, Hobbies & Interests** (`print/p9-beliefs.html`):
  - Right column category headers: Beliefs (top:160), Hobbies (top:300), Interests (top:440)
  - Beliefs Entry 1: Christian · Spiritual/Religious Affiliation · Baptism May 21 1988 (Digital File & Location, green, heart.png)
  - Hobbies Entry 1: Golf · Tournament July 2023 (Location, orange, star.png)
  - Interests Entry 1: Tuscan Cuisine · Cooking · Significant Find 2022 (Digital File & Location, green, puzzle.png)
- Created **page 11 — All documents linked to this record** (`print/p10-documents.html`) — shell + title + description + first category header "Identity & Vital Documents"
- Icons added to `html-prototype/img/`: goal.png, crown.png, heart.png, star.png, puzzle.png (+@2x)
- **NEW PATTERN DOCUMENTED — Print Document — Entry Card Pattern:** universal 6-element entry unit used for every category across the print document. Anchor circle at `top:Y, left:540`. All other elements positioned relative to Y. Entries spaced `Y+140`. See "Known Design Patterns" section for full spec table.
- **NEW PATTERN DOCUMENTED — Print Document — Content Page Template Pattern:** the skeleton every content page shares (logo pill, Plan Owner card, LEFT column title+description, RIGHT column entries, footer).
- **NEW PATTERN DOCUMENTED — Print Document — Status Indicator Colors:** 3-variant color rule for icon circle border + status dot (green/blue/orange).
- **NEW PATTERN DOCUMENTED — Print Document — Icon Registry:** one canonical icon per category (goal/crown/heart/star/puzzle/document/education/shield-allergy/pill/activity).
- **XD EXPORT ARTIFACT RULES:** `border: 2px solid #000000` on img = icon internal stroke, NOT CSS border (always ignore). `background: transparent url('...')` on icons → port as `<img>` tag instead of div with background.
- **CONDITIONAL CATEGORY VISIBILITY RULE:** category headers appear only if at least one entry exists in that category. Empty categories omitted entirely.



### 2026-04-14 (Plan Owner Avatar Sync Pattern)
- Identified Plan Owner avatar as a cross-cutting pattern appearing in ~8+ locations across the prototype
- Consolidated ~11 existing avatar CSS rules in `_shared.css` into one unified pattern spec
- Confirmed invariants (font-weight 600, color rgba(0,0,0,0.4), letter-spacing 0.05em) and two background variants (Plan Owner #FFFFFF vs other people rgba(0,0,0,0.08))
- Documented 5-tier size scale (XS 40 → XL 180)
- Sync logic already partially wired in `_shared.js` (6 IDs) — identified 3 gaps to wire next: `#dashboardPosterImg`, `.print-owner-avatar`, `.avatar-plan-owner`
- Hover/edit state proposed but NOT confirmed — needs XD screenshot
- Pattern added to CLAUDE.md Known Design Patterns + full spec here
- **Next:** confirm hover state from XD, then wire remaining sync targets

### 2026-04-03 (Print Document session)
- Built print pages 4-5: Family & Relationships + Extended Family
- Family member cards: John, Emma, Liam, Lisa, Noah, Mary, Robert (parents), Enzo (pet)
- Extended Family: Jack Daniel (ex), Jane Doe Smith, John Smith, Ben White (grandparents, deceased)
- Documented Print Family Member Card Pattern (alive vs deceased variants)
- Documented Print Document Status Indicator Pattern (3 variants: green/blue/orange)
- Documented Print Page Numbering Pattern (cover=1 no number, content starts at 2)
- Documented Print Section Heading Pattern (3 levels)
- Added Relationship & Status Documents section with 3 document cards
- Synced all family photos between print.html and profile.html dashboard
- Fixed page numbering: content pages now 2,3,4,5 (cover is page 1)
- Images added: Profile_img_7-17, Profile_img_Pet, Profile_img_14, document.png
- Page 6 (Medical Info) started: Emergency Medical Card, Blood Type, Allergies with severity bars
- Documented Print Emergency Medical Card Pattern
- Documented Print Allergy Severity Bar Pattern (pill bars with glow, width reflects severity)
- Documented Print Medical Field Label Pattern
- New images: first-aid.png, drop.png
- **Key insight for autonomous page creation:** All print content pages share identical repeating elements (logo pill with unique gradient ID, section title "My Profile", profile photo with sync class, name pad, Sarah Johnson, Plan Owner, Verified + badge, green plan bar). Left column always has section heading (600 36px/44px) + description (normal 16px/24px). Right column has section-specific data starting at left:520+. Footer always at bottom with disclaimer, date/time, page number.
- Page 6 (Medical Info) completed with full content:
  - Emergency Medical Card: first-aid icon + red title (#FF2C55), blood type pill (AB+, drop icon), allergy severity bars (Milk/Mild 190px, Peanuts/Severe 316px), condition pads (Asthma, Epilepsy), device pad (Pacemaker/ICD)
  - Emergency Contacts: John Johnson card with phone number
  - Primary Doctor: Gregory House card with GH initials (Inter 600 24px, no photo)
  - Blood Type section: AB+ document card (Digital File & Location, green)
  - Allergies section: Peanuts (Location/orange, shield-allergy icon), Milk (Digital File/blue, shield-allergy icon)
  - Medical Conditions section: Asthma (Digital File & Location/green, pill icon), Epilepsy (Digital File/blue, pill icon)
  - Medical Devices & Implants: Pacemaker/ICD (activity icon)
- **Entry icon mapping confirmed:**
  - document.png → Relationship & Status Documents
  - shield-allergy.png → Allergies
  - pill.png → Medical Conditions
  - activity.png → Medical Devices & Implants
- **Allergy Severity Bar details:** width reflects severity (Mild=190px, Severe=316px), red #FF2C55, inner shadow #FFFFFF47, outer glow 6px, white dot 4×4 + name 600 + level normal opacity 0.5
- **Condition/Device Pad:** glass pad (#FFFFFF54, 1px solid #FF2C55, border-radius 25px), variable width per content, name 600 16px/24px + optional detail in parentheses (normal 12px/15px opacity 0.5)
- **Emergency Contact Card:** same as Family Member Card pattern but with Phone: label + number instead of DOB/Age
- **Doctor Card:** same structure but with initials fallback (Inter 600 24px/24px, rgba(0,0,0,0.4), centered in 80×80 circle) when no photo available
- **Red section headings:** Emergency Medical Card, Emergency Contacts, Primary Doctor all use #FF2C55 color (600 20px/24px) — exception to default black
- Page 7 (Education) built:
  - "Education" left column heading (600 36px/44px, top:672)
  - "Educational Qualifications" section (top:160): Harvard University (Bachelor's • Computer Science, Start Date: 2025, Digital File & Location/green)
  - "Professional Certifications" section (top:300): Graphic Design (Paris College of Art, Issue Date: Apr 16, 2000, Location/orange)
  - "Other Educations" section (top:440): Coding Bootcamp (Udemy, Start Date: 2023, Digital File & Location/green)
  - All entries use education.png icon in 60×60 circle with colored border matching status
- education.png icon confirmed for ALL education entries everywhere in the platform
- **Family & Relationships heading** fixed: 2 lines (width:320px, "Family &" + "Relationships"), 88px height at 36px/44px line-height
- **ARCHITECTURE CHANGE — Print document split into fragments:**
  - `print.html` is now shell only (1013 lines): header, sidebar, right panel, doc-preview wrapper, zoom/nav JS
  - Page content lives in `html-prototype/print/` subfolder as individual fragments:
    - `print/cover.html` — Cover page (page 1, no number shown)
    - `print/p2-personal.html` — Personal Details
    - `print/p3-contact.html` — Contact & Address
    - `print/p4-family.html` — Family & Relationships
    - `print/p5-documents.html` — Relationship & Status Documents
    - `print/p6-medical.html` — Medical Info
    - `print/p7-education.html` — Education
  - Fragment loader in print.html fetches pages sequentially, then calls `initAfterLoad()`
  - All img paths in fragments use `../img/` (relative to print/ subfolder)
  - To add new pages: create `print/p8-xxx.html`, add to pages array in loader
  - Total pages planned: 24 (7 built so far)

### 2026-03-29
- Confirmed BtnSubmit specs: all states (Default, Hover/Tap/Hold, Disabled) verified against XD
- Documented Pill-Expand-On-Hover pattern with full state table
- Documented Arrow Icon Standard (9×16, 1.5px stroke, round cap/join)
- Created DESIGN_SYSTEM_LIVE.md
- Dash thickness corrected: 1.5px → 1px (both .btn-submit-dash and .auth-btn-continue .btn-dash)
- Replaced all `.auth-btn-continue` with BtnSubmit in Login.tsx and ForgotPassword.tsx
- Built BtnBack component (`src/components/ui/BtnBack.tsx`) with Circle-Reveal-On-Hover pattern
- Replaced all `.auth-btn-back` with BtnBack in SignUp.tsx and ForgotPassword.tsx
- Documented Circle-Reveal-On-Hover pattern in DESIGN_SYSTEM_LIVE.md
- Replaced all legacy auth-btn-back in VerifyEmail, Onboarding, SetupComplete, InviteRegister
- Replaced all legacy auth-btn-continue in VerifyEmail, InviteRegister
- Checkbox rebuilt: 20×20, 1px solid #000, radius 4px, dot 12×12 #000, radius 3px
- Checkbox aligned to 400px auth form grid with padding-left 20px
- Checkbox default state: checked (user unchecks)
- Checkbox spacing: 30px above (from Confirm Password), 30px below (to terms)
- Card padding-bottom corrected: 20px → 30px
- Dynamic password hint: shows remaining requirements instead of static text
- Documented Checkbox Pattern, Auth Form Alignment Pattern

---

## Entry View Mode (Universal Pattern — applies to ALL entry types across all 6 cards)

**Locked 2026-05-04 by XD-spec measurement session with Violetka. Patterns
apply universally to Essential / Family / Medical / Education / Employment
/ Beliefs entries. Source: `_shared.css` + `_data/timeline.js`.**

### Collapsed entry header — `.entry-row` with `.entry-info`

| Element | CSS class | Spec |
|---------|-----------|------|
| Avatar circle | `.entry-icon` | 60×60, 1px border, white bg, status-color border (green/blue/orange) |
| Avatar glyph | `.entry-icon-glyph.glyph-20x18` | 20×18 (per-card icon, e.g. `img/education.png`) |
| Title | `.entry-title` | 600 16/20 Inter, #000 op 1 |
| Sub-line | `.entry-type` | normal 12/15 Inter, #000 op 1, format `[part1]<sep>[part2]` |
| Bullet sep | `.entry-type-sep` | 4×4 black circle, opacity 1, 8px h-margin, vertical-align middle |
| Tertiary | `.entry-sub` | 400 12/15 Inter, #000 op 0.5, margin-top 4px |
| Status indicator | `.data-badge` | normal 10/12 Inter, #000 op 0.5, text-align right, 8×8 colored dot after |
| ⋯ menu | `.doc-menu-dots span` | 3×3 dot, opacity 0.3 default → 1 hover |

**Status colors (`.data-badge.both/.digital/.location` ::after):**
- Green `#61C553` — Digital File & Location (both)
- Blue `#667EEA` — Digital File (digital)
- Orange `#FF9500` — Location only

### Group title (between entries within a card)

`.data-group-title` — 600 16/24 Inter, #000 op 0.5, text-align center, NO bg
- Hidden when group has 0 entries (via `paUpdateEmptyState`)

### Section title (inside expanded entry)

`.ee-section-title` — 400 14/17 Inter, #000 op 0.5, center, margin 30px above + 20px below

**Two title variants:**
- Edit mode: "Adaptive Timeline Builder - Timeline & Milestones" (longer, "build" intent)
- View mode: "Timeline & Milestones" (shorter, read intent)

### About-section field block (canonical value-above-label)

Each populated field renders as a stacked block:

```
[Value]              ← .data-value (600 16/24 Inter, #000 op 1)
   ↓ 4px gap          (.data-label margin-top: 4px)
[Label]              ← .data-label (400 12/15 Inter, #000 op 0.5)

   ↓ 20px gap         (.ee-field margin-bottom: 20px)

[Next Value]
```

**Locked rules:**
- View mode shows ONLY populated fields (per XD: "only populated fields displayed")
- Empty fields hidden (no placeholders)
- Padding-left: 20px from card edge
- Schema-driven from `ANEF_CONDITIONAL[subcategory]` — N populated fields → N blocks

### Edit mode contenteditable focus state

`.ee-input-value` (contenteditable) → **NO orange UA focus ring**
- `outline: none` on .ee-input-value + :focus
- `caret-color: #000`
- Active state via `.ee-input-wrap:focus-within { border-bottom-color: #000 }` (canonical PA pattern)

### Adaptive Timeline Builder — `.tl-section` + `.tl-read-item` + `.tl-read-note`

**Wide pad container `.tl-read-item`:**
- 600×variable, full-bleed via `width: calc(100% + 200px); margin-left: -100px`
- Background `rgba(255,255,255,0.33)` (NOT 0.5)
- Padding `20px 100px` (symmetric top/bottom 20)
- Multiple milestones: **10px gap** between consecutive `.tl-read-item` pads

**Milestone date head:**
- `.tl-read-date` — 600 16/24 Inter, #000 op 1, padding-left 20px
- Format: `[milestone label] - [date string]` ON ONE LINE
  - Year + Month + Day → `"Start Date - Oct 14, 2000"`
  - Month + Year → `"Start Date - Oct 2000"`
  - Year-only → `"Start Date - 2000"`
- NO `margin-bottom` unconditional (would create asymmetric pad when no notes)

**Note box (only when notes populated):**
- `.tl-read-note` — 1px solid `rgba(0,0,0,0.16)` border (= XD `#00000029`)
- Border-radius 20px, transparent bg, padding **20px equal all sides**
- 600 16/24 Inter for note text
- `margin-top: 20px` (gap from date above — only renders when note exists)
- Auto-grows by content (line-wrap → multi-line stays inside frame)

**"Details & Notes" label below note box:**
- `.tl-read-note-label` — 400 12/15 Inter, #000 op 0.5
- `margin-top: 10px` (gap from note box bottom — wider than 4px input-label gap because note is a styled container)

**Edit mode milestone block (`.tl-milestone`):**
- Same wide pad container pattern
- Year/Month/Day with own border-bottom selects (no per-select labels)
- Single hint below row (per `HINT_BY_MILESTONE` registry: "When the Education Started", "When the Document was Issued", etc.)
- X-clear circle (24×24) per milestone (resets fields without removing row)
- `+ Add Custom Date` pill button (30×30 black-bordered circle + label)

### Save → View update cycle (locked)

1. ⋯ → Edit opens expand body in editing mode
2. User modifies fields (contenteditable text, dropdown selects, milestone Year/Month/Day, file upload, picker selects)
3. Click Save → `saveEntryEdit(body)` reads values:
   - `aboutInputs` (.ee-input-row.ee-edit-only excluding pickers)
   - `tlReadValues(body)` (canonical timeline reader)
   - Location picker, file list, contact picker, notes textarea
4. Persists to `entriesStore` via `Object.assign(e, data)` + `paRenderDocumentsList()`
5. Body re-renders via `buildEntryExpandBodyHTML(data)` — EDIT class removed, view-only blocks render with new values
6. View mode shows updated values **without reload**

Both ADD (new field) and CORRECT (modify existing) work end-to-end.

### Edit pencil — present on which cards?

| Card | Card-level Edit | Reason |
|------|-----------------|--------|
| Essential Info | ✅ YES (`toggleEssentialEdit`) | Has own card fields (Name / DOB / Gender / Citizenship etc.) |
| Family & Relationships | ✅ YES (`fr-edit-btn-row` canonical) | Hybrid — relationship cards + documents |
| Contact Info | ✅ YES (own fields: emails, phones, addresses) | — |
| Education | ❌ NO | Entry-only — each entry has own ⋯ → Edit |
| Employment & Affiliations | ❌ NO | Entry-only |
| Beliefs / Hobbies / Interests | ❌ NO | Entry-only |
| Roles & Access | ❌ NO | List-only |
| Tasks & Reminders | ❌ NO | List-only |
| Shared With | ❌ NO | List-only |

### Empty-state (when card has 0 entries)

Per Violetka 2026-05-04: group titles hide when their group has 0 entries; when whole card is empty, show contextual empty-state pad:

- `paUpdateEmptyState(card)` — runs on DOMContentLoaded + after Add/Edit/Delete/Archive
- Group title `display: none` if 0 entry rows in its sibling chain
- `.emc-empty-state` pad inserted after `.emc-add-entry-btn`:
  - Heading per cardKey from `EMPTY_STATE_COPY` registry
  - Body — contextual invite to add first entry
- All cards (Essential / Family / Medical / Education / Employment / Beliefs) supported

### Hover-to-white state (entry rows)

`.entry-row:hover, .entry-row:active { background: rgba(255,255,255,1.0) }`
- Default bg: `rgba(255,255,255,0.5)`
- Hover/active: full opaque white (XD spec)
- Already locked in `_shared.css:9099`

---

### 2026-05-04 — Entry View Mode design system session (Violetka)
- 7 XD spec diffs verified + applied: `.doc-menu-dots span` opacity 0.3 (was 0.5), `.tl-read-item` bg 0.33 (was 0.5), `.tl-read-date` no unconditional margin-bottom, `.tl-read-note` border 0.16 (was 0.14), `.tl-read-note` padding 20px equal (was 16/20), `.tl-read-note-label` margin-top 10 (was 4), `.entry-type-sep` 4×4 CSS dot (replaces Unicode `·`)
- Removed orange UA focus ring on `.ee-input-value` contenteditable (canonical: outline:none + black border-bottom on focus-within)
- Save → View update cycle verified end-to-end (ADD + CORRECT both work without reload)
- Milestone view-mode label format: `[label] - [date]` ONE line (was 2 separate rows)
- Section title differs by mode: edit "Adaptive Timeline Builder - Timeline & Milestones" / view "Timeline & Milestones"
- Pad symmetric padding: 20px top + 20px bottom regardless of notes
- 10px gap between consecutive `.tl-read-item` pads
- Removed card-level Edit pencil from entry-only cards (Education / Employment / Beliefs / Roles / Tasks / Shared)
- Documented Entry View Mode universal pattern — applies across ALL 6 cards, schema-driven from ANEF_CONDITIONAL

---

### 2026-05-05 — Add New Entry form polish + Add New Contact create flow

**Add New Entry form (Documentation & Storage section):**
- Important! callout text → final spec ("All uploaded files are encrypted using AES-256 and stored securely. Access is limited strictly to individuals explicitly authorised by you, in accordance with your sharing and permission settings.")
- Location Details placeholder → "Drawer, safe, folder name…" (all 3 conditional blocks: default / cloud / other)
- "Cloud File Link" label → "Add Link" (per spec)
- "Other Location" → "Please specify" (required `*` + `required` attribute on input)
- Location (i) tooltip → STATIC text ("Use this to record where the original paper documents are stored. This may be especially useful for your loved ones if no digital scan is uploaded.")
- NEW Upload zone (i) tooltip → DYNAMIC per category (`ANEF_DOC_TOOLTIP[category]`); positioned right-aligned above the upload zone via `.anef-upload-info-row`
- ANEF_DOC_TOOLTIP entries added: Education (Educational Qualification / Professional Certification / Other Education), Employment (Employment Entry / Membership / Affiliation), Beliefs (Belief / Hobby / Interest), Medications & Supplements
- Delete File modal — `showDeleteFilePopup` (canonical Delete File flow) wired into `anefRemoveFile`
- File row card structure verified (icon + name + uploaded date + trash, `anefOpenFilePreview` opens canonical document preview modal)

**Universal selectors fix (CSS + JS):**
- `ensureAnefBuilt()` now adds `.anef-entry-form` class to every built ANEF form (essential / medical / education / employment / beliefs)
- All `#medEntryForm` CSS selectors → `.anef-entry-form` (universal across the 5 forms — was silently broken in 4/5 cards)
- `picker.closest('#medEntryForm')` → `picker.closest('.anef-entry-form')` for `data-location-type` switching
- Result: Cloud / Other conditional blocks now reveal in ALL 5 forms (was Medical-only)

**Dropdown options canonical lock:**
- `.tl-dd-option` (Year/Month/Day timeline dropdowns): NO bg hover → ONLY font-weight 400 → 600 bold (matches `.ee-contact-option` pattern)
- Selected state: font-weight 600 (no bg)
- `.tl-dd-panel` scrollbar: transparent track + glass thumb (rgba(0,0,0,0.2), 4px wide) — same spec as `.ee-contact-suggestions`
- Locked across ALL dropdowns platform-wide

**Add New Contact create flow (NEW — Phase 4 unblocked):**
- `openCreateContactFlow(el)` implemented (was Phase 4 TODO placeholder)
- Stub person pushed to `peopleStore` with `_isNew: true` flag (auto-cleanup on cancel)
- Create wrap inserted ABOVE picker in `.anef-people-section` (per XD: picker stays visible below, can still pick existing contact)
- Form structure: title "Add New Contact" + canonical `.anef-close` X (top:20 right:20) + label "* Add this person to" + segmented pill (My Network / My Family) + collapsed `.lsc-edit-fields-extra`
- Pill: 320×60 outer with 1px border (rgba 0.08), 8×8 black dot in center (initial neutral state), white sliding capsule appears on click + slides via `transform: translateX(0|100%)` — `:has()` driven, 0.3s ease-out
- Form starts COLLAPSED (CREATE mode only) — fields below pill hidden until user picks Network or Family
- DOB Year/Month/Day three dropdowns (canonical `.tl-dd-*` pattern from timeline) — only for My Family branch
- Relationship Type → canonical `.ee-contact-picker` dropdown with per-directory options:
  - Network (Education context): Teacher / Professor / Mentor / Instructor / Tutor / Supervisor / Research Advisor / Classmate / Coursemate / Training Colleague / Other
  - Family: Partner-Spouse / Former Partner-Spouse / Child / Parent / Sibling
- Specific Role → canonical `.ee-contact-picker` dropdown; Layer 2 options driven by Layer 1 selection (Family branch has predefined sub-options like Husband/Wife/Civil Partner; Network is free-text)
- Save → finalises stub, auto-links via `linkPersonToAnefSection`, renders Linked Summary Card replacing the create wrap
- Cancel → discards stub from peopleStore + removes wrap (picker remains)

**Avatar empty-state pattern (Add New Contact, no photo + no name):**
- Outer wrap 80×80 → `rgba(0,0,0,0.08)` (grey, NOT canonical white 33%)
- Inner solid white circle 40×40 (default) → 60×60 (hover/drag-over) — auto-animate 0.2s ease-out
- Plus icon → inline SVG with `stroke-width="1.5"` (XD spec says 2 → locked rule = 1.5), 20×20, opacity 0.16 → 1.0
- NO life dot in CREATE mode (no real person record yet)
- Caption: "Add Profile Image" (CREATE mode) vs "Add or Change Profile Image" (EDIT mode)
- Drag & drop file upload supported (`lscEditAvatarDragOver/Leave/Drop` → `lscApplyAvatarDataUrl`)
- Once photo uploaded: `.lsc-avatar-add-state` class stripped, life-dot conditional on mode

**Canonical input field locks (universal):**
- `.ee-input-value` as `<input>` — strip browser chrome: `border:none; background:transparent; padding:0; box-shadow:none;`
- `::placeholder` — same Inter 600 16/24 as typed value, color #000, opacity 1.0 (NOT 0.4 — XD spec) — visually IDENTICAL to typed value
- `.ee-input-row` — 25px margin-bottom canonical rhythm (every row inside entry/contact forms)

**Add New Contact CTA (red item in picker dropdown):**
- Color #FF0000 (NOT #FF2C55), Inter normal 16/24, transition 0.3s ease-out
- Always visible at bottom of picker (never filtered by search)
- Separator line above: `border-top: 1px solid rgba(0,0,0,0.14)` + 15px margin-top + 15px padding-top
- Specificity boost via `.ee-contact-option.anef-add-new-contact` (so padding survives `.ee-contact-option { padding: 0 }` cascade)

**X-clear button on milestone (canonical position):**
- `.tl-clear-btn` → `position:absolute; top:20px; right:20px` (canonical `.anef-close` / `.kyc-flow-close` position)
- Was inline at right:100 (inside 100px inner padding) — moved to outer pad edge for consistency
- Applies to all milestone blocks across all entry forms (Medical / Education / Employment / Beliefs / Family)

**peopleStore utility functions added:**
- `window.peoplePhoto(person)` — returns photo URL with Plan Owner sync (was referenced but never defined → all no-photo cases broke)
- `window.peopleInitials(person)` — returns canonical initials (`firstName[0]+familyName[0]` UPPERCASE) — locked pattern from `.lsc-avatar-monogram` (Source Serif 4 600 24/1, rgba 0.4)

**Memory updates (4 new feedback memories):**
- `feedback_anef_universal_selectors` — never `#medEntryForm`, always `.anef-entry-form`
- `feedback_dropdown_canonical_locked` — NO bg hover, ONLY font-weight bold + glass thumb scrollbar
- `feedback_input_canonical_specs` — placeholder = SAME 600 weight as value, opacity 0.4. Border 2 → 1.5 always. Apply directly without asking.


---

## Post-Loss Support Module (LOCKED 2026-05-13)

Full Post-Loss Support section built over an 8-hour autonomous session per PRD POST-LOSS SUPPORT PRD.md (2174 lines), Memorial Page.md (702 lines), Legal & Practical Steps.md (512 lines), and ForeverMissed_Competitor_Research_2026 (742 lines).

### Sidebar nav (canonical)
The 5 Post-Loss sub-items navigate to dedicated pages (replacing the old toggle-card behavior):
- **Personalized Plan** → `post-loss.html` (main dashboard)
- **Practical Support** → `post-loss-directory.html?cat=practical`
- **Emotional Support** → `post-loss-directory.html?cat=emotional`
- **Obituary** → `post-loss-obituary.html`
- **Memorial Page** → `post-loss-memorial.html`

Wiring applied to all 28 platform HTML files. Total 140 sub-items routed.

### Dashboard Hero Card (Loss Planner Tool) — 7 states
Per PRD §6.2 — primary orchestration component. All 7 states render as sibling `.pl-hero-state-*` blocks; `data-state` attribute on `.pl-hero-card` decides visibility.

States: empty / single / multiple / paused / executor / beneficiary / contributor

5 internal zones per state:
- Zone A: Identity / Context Bar (54×54 avatar + Source Serif 4 name + relation line)
- Zone B: Phase + Time Context (4-color phase badge: Immediate #FF2C55 / Early Days #FF9500 / First Weeks #667EEA / Ongoing #61C553)
- Zone C: Plan Summary / Progress (canonical 4px Glow Bar + Inter 13/17 summary @ 0.65)
- Zone D: Priority Preview (top 2-3 actions in inner rgba(255,255,255,0.5) 16px-radius pad)
- Zone E: Action Area (secondary text-link + primary save-button)

### Memorial Page — full ForeverMissed parity (10 themes × 11 sections)

**10 canonical themes:** Classic, Warm, Modern (#020B66 indigo), Nature (#3E8B70 green), Night (cosmic #0A1840→#1A2A5C with starfield), Cherry (blossom #FFF5F5→#FFE4E8 #D46C8F), Mountain (earth #DDE5DC→#B5BFAE #5C6A5A), Candle (gold on indigo #1E1A3A→#2A1F4E #FFD27D), Child (pastel #FFF6F0→#E8F4FF #A07060), Veteran (stars & stripes #0B2545→#13315C #BF0A30/#FFD27D).

**11 page sections:**
1. Memorial Hero — canonical Two-Circle Avatar (240/180) + Source Serif 4 name 40/48 + dates + italic tribute
2. Tribute Action Triplet — Lay a Flower / Light a Candle / Leave a Note (60×60 invisible→white circle pattern)
3. Life Timeline — event milestones with dots
4. LIFE chapters — chapter-by-chapter biography (admin-curated, Source Serif 4 chapter titles, contenteditable in edit)
5. STORIES collaborative wall — long-form memories from visitors (separate from Tribute Wall)
6. Tribute Wall — short condolences with hearts
7. Photo Memories gallery
8. Voices & Moments — audio/video media items
9. Background Music playlist (Premium gate) — 3 sample songs, auto-play toggle, volume slider
10. Service & Events (BETA) — funeral/memorial events with RSVP/Directions/Livestream
11. QR Memorial Link (printable)

**Memorial Settings panel (admin-only):**
- Visibility radio: Private / Invite-only / Public memorial site (Premium pill — www.<name>.RememberedAfter.com)
- Contributor roles: 4 checkboxes (link-can-post / approve-before-publish / allow-stories / allow-photo-uploads)
- Memorial Reminders: 3 checkboxes (Birthday remembrance / Day of passing / New tributes & stories)
- Action row: Reset (outline) + Save (primary)

### Record Memorial tab (LOCKED)
Per Memorial Page PRD §6 — calm dignified entry point inside the deceased person's record. Shown when `body.pa-deceased` / `body.record-deceased`.
- Memorial Hero (canonical Two-Circle Avatar 240/180, populates from peopleStore: name, photo OR initials, dob/dod date pair, deathNotes as tribute)
- Memorial Status Strip (Not started / Draft / Private / Published states with color-coded dot)
- 4-card grid: Obituary / Guest Book / Photos & Media / Service Information
- Public URL block (Premium, hidden until published live)
- Empty-state guidance copy with Create Memorial Page CTA

### Record Care Plan tab (LOCKED)
Per PRD §6.6 — person-specific execution surface. Shown via `body.pa-has-careplan` OR `body.pa-deceased`.
- Empty state with Start a Care Plan CTA → post-loss-flow.html
- Live state: context bar (phase + time-since + canonical Glow Bar progress)
- 4 filter tabs (Active / Done / Removed / All)
- 3 grouped sections per PRD: Emotional Support / Practical Support / Legal & Administrative Support
- 11 seeded step cards (Bulgarian-specific Legal/Admin: РБСС / ЦКР / Имотен регистър / НОИ помощ при смърт / Удостоверение за наследници / ЗН приемане/отказ)
- Step card: dot (Pending/Active/Done) + title + phase line + pin + done + ⋯menu
- Click row → expand inline body (description + short article preview link)

### Canonical 312px Gradient Pattern
Every glass card on the platform now uses the locked gradient overlay:
```css
background-color: rgba(255, 255, 255, 0.45);
background-image: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0) 312px);
background-repeat: no-repeat;
backdrop-filter: blur(10px);
border: 1px solid #FFFFFF;
box-shadow: 0px 10px 30px #00000029;
border-radius: 30px;
```
Applied to: Memorial card, Memorial Hero, Care Plan context bar, Care Plan empty state, Dashboard Hero Card (post-loss.html), Personalization Flow card, Memorial Wizard card.

### Tribute Action Pattern (LOCKED)
60×60 invisible→white circle on hover (canonical Glass Circle Solidifies on Hover pattern from §953). Icon centered inside. Label below in Inter 600 14/17. Count beneath label in Inter 400 11/14 @ 0.5. 30px gap between actions.

```
.tribute-action-circle {
    width: 60px; height: 60px;
    border-radius: 50%;
    background: transparent;
    border: 1px solid rgba(0,0,0,0.16);
    transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.tribute-action:hover .tribute-action-circle {
    background: #FFFFFF;
    border-color: #FFFFFF;
    box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
}
```

### Files in scope (locked)
- `post-loss.html` — main dashboard with multi-state Hero Card
- `post-loss-flow.html` — Personalization Flow Q1-Q5 (Care Plan creation)
- `post-loss-memorial-create.html` — Memorial Creation wizard scaffold (built from flow template)
- `post-loss-directory.html` — Support & Guidance hub (category-aware via ?cat= param)
- `post-loss-article.html` — single article view
- `post-loss-step.html` — single step expanded view
- `post-loss-plan.html` — legacy standalone Care Plan (now absorbed into record.html Care Plan tab)
- `post-loss-obituary.html` — Obituary Builder
- `post-loss-memorial.html` — Live memorial page (RememberedAfter.com presentation)
- `record.html` — Memorial tab + Care Plan tab content blocks
- `_shared.css` — Memorial + Care Plan + Hero Card CSS (appended at end)

### Commit history (this 8-hour session)
- 34021bb session 1: spec ingestion + sidebar wiring + Memorial tab scaffold
- 5f34d51 session 2: master plan + Care Plan tab scaffold + Memorial canonical avatar
- 0ff4d63 hour 2: Memorial Page 10 canonical themes
- fcb49d6 hour 2 close: canonical 312px gradient on .memorial-card
- 1070da3 hour 3: LIFE chapters + STORIES collaborative wall
- 3fb8fbb hour 4: Memorial Hero 3-action tribute triplet
- b2618f2 hour 5: Memorial Settings panel
- b46ff0a hour 6: Background Music + Service & Events
- 2ebb68e hour 7: Care Plan tab Bulgarian legal/practical steps
- 909f917 hour 8: Dashboard Hero Card multi-state per PRD §6.2
- ... hour 9: gradient pattern applied to wizard cards

---

## Family & Relationships System — End-to-end LOCKED (2026-05-14)

### Canonical Relationship Taxonomy — 9 Groups
Every relationship in the platform fits one of these 9 groups. The Layer 1 form value (UI-friendly) maps to a canonical edge type (lowercase singular, used in storage).

| Layer 1 (form / UI) | Canonical edge type (storage) | Group key |
|---|---|---|
| Spouses / Partners | `spouse` (Husband / Wife / Civil Partner / Fiancé) | spouse |
| Former Partner / Spouse | `former-spouse` | former-spouse |
| Children | `child` (Biological / Adopted / Step / Foster Son or Daughter) | child |
| Parents | `parent` (Biological / Adoptive / Step / Foster Mother or Father) | parent |
| Siblings | `sibling` (Biological / Half / Step Brother or Sister) | sibling |
| Grandparents | `grandparent` (Biological / Step Grandmother or Grandfather) | grandparent |
| Grandchildren | `grandchild` (Granddaughter / Grandson) | grandchild |
| Pets | `pet-of` (Dog / Cat / etc.) | pet |
| Other / Extended | `aunt-uncle` / `niece-nephew` / `cousin` / `in-law-*` / free text | extended |

**Data-model rule (canonical Option B):** `person.relationships[].type` describes what `toId` IS to `person` (from `person`'s POV). E.g. on Sarah's record `{toId:'em', type:'child'}` reads "Emma is my child". On Emma's record `{toId:'sj', type:'parent'}` reads "Sarah is my parent".

### Helper functions (single source of truth)
- `window.paNormalizeRelType(layer1)` — converts form Layer 1 ('Children', 'Spouses / Partners', 'Former Partner / Spouse') → canonical edge type ('child', 'spouse', 'former-spouse'). Idempotent.
- `window.paComputeInverseRel(type, specificRole, fromGender)` — given a relationship from one side, returns the inverse for the other side. Returns canonical lowercase singular types so consumers and migrations stay aligned. E.g. ('Children', 'Biological Son', 'female') → `{type: 'parent', specificRole: 'Biological Mother'}`.

### saveContactEdit — Dual-write pattern (CRITICAL)
When a new family record is created via Add New Contact:
1. Sarah gets `{toId: newId, type: canonicalForSarah, specificRole: layer2}` (Sarah's POV)
2. New person gets `{toId: 'sj', type: inverseType, specificRole: inverseRole}` (their POV)

Both records can then be read directly without runtime flipping. paSaveAll() runs synchronously so localStorage is durable before navigation.

### paRelationshipEngine — Tier A + Tier B (idempotent, fires on every save/load/delete)
**Migration pass (one-time per record):** Detects family rels with old buggy direction (rel.type uppercase Title-Case Layer-1 value like 'Children' stored on the family member's record toId='sj'). Force-corrects Sarah's row + replaces family member's row with proper canonical inverse.

**Normalize pass:** Converts any uppercase Title-Case Layer-1 type in Sarah's relationships to canonical lowercase singular ('child', 'spouse', etc.) so paGroupRelationships + paInverseEdgeType handle them.

**Stale Tier B cleanup:** Drops every non-rejected suggestion before re-deriving. Rejected suggestions stay (user-confirmed-no) so they don't re-appear.

**Tier A — auto-create (bidirectional inverse):** For each family record with `relationships[].toId='sj'`, computes and ensures the inverse on Sarah's row.

**Tier B — auto-suggest (needs user confirmation):**
- Sarah's current spouse + Sarah's children → Children suggestion on spouse, Parent suggestion on child (could be step/biological/adopted)
- Sarah's children ↔ Sarah's children → Sibling suggestion (could be half/full/step)
- Sarah's parents + Sarah's children → Grandparent ⇄ Grandchild suggestion

Regex filters are ANCHORED (`^child$|^children$|...`) so substring matches don't leak (earlier bug: `/parent/` matched `grandparent`).

### paGetRelationshipsForPerson (peopleStore.js)
- Walks viewed.relationships (direct)
- Reverse lookup (other persons pointing to viewed)
- Sibling derivation (shared biological parent → half/full sibling)
- In-law derivation (spouse's parents → in-law-parent)
- **Merge step:** Walks `viewed.suggestedRelationships[]` and adds non-rejected ones as `isDerived=true` entries. De-dupes against already-derived persons (keeps the more specific entry, e.g. `half-sibling` over `sibling`).

### Refresh chain (fires on every save / delete / DOMContentLoaded)
1. paLoadAll (called explicitly first in DOMContentLoaded to guarantee localStorage merge)
2. paRelationshipEngine (migration → normalize → cleanup → Tier A → Tier B)
3. paInjectFamilyMembersIntoFRCard (Sarah's hardcoded F&R card on profile.html)
4. paUpdateFamilyAnalytics (family.html My Family stats card — 9 groups)
5. paUpdateFamilyHeaderStats (profile.html F&R header: Marital + Children count + Minors count)
6. paRecomputeFamilyTreeAnalytics (family-tree.html My Family stats card — 9 groups)
7. paInjectNewFamilyMembersIntoTree (family-tree.html Family Tree row placement — Sarah's POV)
8. renderFamilyDirectory + renderNetworkDirectory (directory pages)

### Family Tree row placement rule
`rowForType(p)` reads `planOwner.relationships.find(r => r.toId === p.id).type` (Sarah's POV — what is this person TO Sarah). NOT the family member's own row. So if Sarah says "Victor is my child" → Victor goes in Children row regardless of what Victor's own record says.

### F&R header live stats (profile.html)
- `#fr-marital-status` — "Married" / "Civil Partnership" / "Engaged" / "Divorced" / "Single" (derived from Sarah's spouse + former-spouse rels)
- `#fr-num-children` — total count of every type matching child/step-child/adopted-child
- `#fr-num-minors` — children with full age < 18 (full date math, not just year diff)

### Suggested pill UI (Tier B)
- CSS classes: `.fr-card-suggested`, `.fr-suggested-badge`, `.fr-suggested-actions`, `.fr-suggested-confirm`, `.fr-suggested-reject`, `.fr-card-suggested-reason`
- Dashed warm-amber background with Confirm / Reject pill buttons
- Reason text italic 11/15 Inter, rgba(0,0,0,0.55), max-width 270px
- `paConfirmSuggestion(viewerId, fromId)` moves suggestion → confirmed relationship + adds inverse on from-person + re-runs engine
- `paRejectSuggestion(viewerId, fromId)` marks `sug.rejected = true` so engine skips on future runs

### Files in scope (locked 2026-05-14)
- `html-prototype/_shared.js` — saveContactEdit, paRelationshipEngine, paInjectFamilyMembersIntoFRCard, paInjectNewFamilyMembersIntoTree, paUpdateFamilyAnalytics, paUpdateFamilyHeaderStats, paNormalizeRelType, paComputeInverseRel, paConfirmSuggestion, paRejectSuggestion
- `html-prototype/_data/peopleStore.js` — paGetRelationshipsForPerson (with suggestedRelationships merge), paGroupRelationships, paInverseEdgeType, paDeriveLayer2
- `html-prototype/_data/persistence.js` — paLoadAll, paSaveAll
- `html-prototype/_data/peopleDirectory.js` — renderFamilyDirectory, renderNetworkDirectory
- `html-prototype/profile.html` — hardcoded F&R card with `#fr-marital-status` / `#fr-num-children` / `#fr-num-minors` IDs; `.fr-group-label` sections (Spouse / Partner, Children, Siblings, Pets, Parents, Former Spouses / Partners, Grandparents)
- `html-prototype/family-tree.html` — recomputeFamilyMode (9-group analytics), 4 safety-net retries, `paRecomputeFamilyTreeAnalytics` window export
- `html-prototype/record.html` — paRenderFamilyRelationships (dynamic F&R card per viewed person)

### LOCKED RULE — Suggested ≠ Confirmed in Statistics (2026-05-14)
Tier B Suggested Relationships (`person.suggestedRelationships[]`) NEVER enter any statistical aggregation. They live in a SEPARATE array from confirmed relationships and are visualised in a dedicated "Suggested Relationship" pad. Only after user Accept (paConfirmSuggestion) — which splices the entry into `person.relationships[]` — does the relationship count in stats.

Affected stats (all confirmed-only, verified 2026-05-14):
- paUpdateFamilyHeaderStats (Marital / Number of Children / Minors on profile.html)
- paUpdateFamilyAnalytics (My Family card on family.html)
- recomputeFamilyMode (My Family card on family-tree.html, 9-group bar)
- paInjectNewFamilyMembersIntoTree (Family Tree row placement reads from Sarah's POV → confirmed only)
- Sarah's F&R card group injection (Pass 1 = confirmed; Pass 2 = suggested rendered in separate "Suggested Relationship" pad, NOT counted)

Implications for future Phases:
- Phase 2B (Suggested Relationship section UI): cards there are pending — header stays accurate; Accept moves to confirmed → header recomputes; Reject stays as rejected, never counted.
- Phase 2C (Add Relationship flow): user-Save in Step 2 writes DIRECTLY to confirmed rels (not via suggestions) → counts immediately.
- Phase 2D (Remove / Unlink): removes from confirmed rels → header decrements.

### Commit history (this session)
- 5aa9886 feat: re-enable Relationship Engine (Tier A + Tier B) with idempotent helpers
- c90b4ad fix: refresh My Family analytics + directories on family-relationship remove
- 31c2200 feat: inject confirmed + Tier B suggested family members into hardcoded F&R card
- a5515dd fix: store family rels in correct direction on both Sarah + new contact
- 82b8e93 feat: make F&R injector viewer-agnostic (per-record Suggested pills)
- 878d056 fix: normalize Sarah's relationship types to canonical edge-type format
- 718b420 fix: Tier B regex anchored to prevent substring matches
- 908b9ae fix: merge suggestedRelationships into paGetRelationshipsForPerson + de-dup
- 702ff35 fix: remove duplicate Victor/тетсут cards on Sarah's profile.html F&R
- 4f91ebd fix: live family tree row placement + live F&R header + live analytics card
- cd690fe fix: full Layer-1 coverage in F&R injector + family-tree analytics

---

## 🔒 LOCKED 2026-05-15 — F&R Card Expanded Panel: TWO CANONICAL DESIGNS (View + Edit)

**Violetka 2026-05-15 directive:** "View mode timeline design needs to be DIFFERENT from Edit mode timeline design — they are TWO separate canonical components. Lock both. Never mix or unify them."

The F&R card expanded panel has TWO distinct, locked designs — one per mode. Each is its own canonical component. Renderers, classes, CSS, and behaviors are isolated. NEVER cross-contaminate.

### View Mode — `paRenderReadExpandPanel(memberId)` → `.fr-expand-panel`

**Purpose:** Read-only summary of the relationship — no inputs, no chevrons, no X-close.

**Fields (Relationship Type + Specific Role):**
- Container: `<div class="fr-expand-fields">` (padding 20px all sides)
- Each field: `<div class="fr-expand-field">` (display:flex column, no gap, margin-bottom:18)
- Value: `<div class="fr-expand-field-value">` — Inter 600 16/24 #000 — **plain text, NO 60h wrap container**
- Label: `<div class="fr-expand-field-label">` — Inter 400 12/15 #000 op 0.5, mt:4

**Timeline:**
- Header: `<div class="fr-timeline-label">Relationship Timeline</div>` — Inter 400 14/17 op 0.5, text-align center, padding 14 20
- Milestone item: `<div class="fr-timeline-item">` — bg rgba(255,255,255,0.5), padding 20 100, **BLEED pattern** `width: calc(100% + 200px); margin-left: -100px`, 5px margin-top between siblings
- Date title: `<div class="fr-timeline-date">` — Inter 600 16/24 #000, padding-left 20, format `<label> - <date>`
- Note (rounded box): `<div class="fr-timeline-note">` — width 100%, transparent bg, **1px border rgba(0,0,0,0.14) + border-radius 20**, padding 16 20, Inter 600 16/24
- Note label: `<div class="fr-timeline-note-label">` — Inter 400 12/15 op 0.5, mt:4, padding-left 20

**Footer:**
- `<div class="fr-hide-btn">` — black 60×4 line + "Hide Details" Inter 600 14/17

**Custom milestones:** Auto-discovered from `dates['custom_<ts>']` keys, rendered with `dates['custom_<ts>Label']` as the date title.

### Edit Mode — `paRenderEditExpandPanel(memberId)` → `.fr-edit-panel`

**Purpose:** Interactive editing — dropdowns, Y/M/D selects, Notes inputs, X-close, Save.

**Panel pad:** `.fr-card-wrap.expanded.edit-open` becomes 600w (max), bg rgba(255,255,255,0.3), border-radius 30, unified glass pad covering summary card (stays 400w centered) + edit fields.

**Fields (Relationship Type + Specific Role):**
- Container: `<div class="ee-input-row fr-ep-field">` — canonical .ee-input-row + .fr-ep-field 100px L/R column inset, margin-bottom 20, gap 4
- Wrap: `<div class="ee-input-wrap fr-ep-select-row fr-ep-type-wrap" data-options='[...]'>` — canonical 60h × 20px padding all sides, position relative, bottom border rgba(0,0,0,0.14) (#000 on hover/focus)
- Click → `eeOpenFieldDropdown(wrap)` opens canonical glass white popover `.ee-field-dropdown` (radius 10, options 16/24 hover bold)
- Value: `<span class="ee-input-value fr-ep-type">` — Inter 600 16/20 #000
- Chevron: `<span class="ee-input-chevron fr-ep-chevron">` — 8×4 drop-arrow.png at right:20, **asset-swap on .open** (NEVER CSS rotate)
- Label: `<div class="ee-input-label fr-ep-label">` — Inter 400 12/15 op 0.5, padding 0 20, `<span class="fr-req">` red asterisk
- Type onchange → refilter Layer 2 options + rebuild Timeline. Pet hides Role field.

**Timeline:**
- Section: `<div class="tl-section fr-timeline-section">` — display flex column, gap 10 (in F&R scope), padding 0 (no double inset)
- Label: `.fr-timeline-label` — same Inter 400 14/17 centered, but in F&R Edit scope: flex-basis 100%, padding 0 100, text-align center
- Milestone: `<div class="tl-milestone" data-key="...">` — bg rgba(255,255,255,0.5), padding 20 100, **width 100% margin-left 0** (NO bleed in F&R Edit scope — pad fills 600w panel exactly), 10px gap via parent
- Title: `<div class="tl-milestone-title">` — Inter 600 16/20
- X-close: `<button class="tl-clear-btn" onclick="event.stopPropagation();frDeleteMilestone(this,event)">` — absolute top:20 right:20, 20×20 cancel.svg, MUST have stopPropagation (otherwise closes entire F&R card)
- Y/M/D row: `<div class="tl-date-row">` with three `.tl-date-sel-wrap` (sel-year 113, sel-month flex, sel-day 90) containing native `<select class="fr-tl-select">` — canonical 60h with drop-arrow.png at right:20
- Hint: `<div class="tl-date-hint">` — Inter 400 12/15 op 0.5 (e.g. "When the Relationship Started")
- Notes (editable): `<div class="ee-input-row">` + `<div class="ee-input-wrap">` + `<input class="ee-input-value fr-ms-notes">` + canonical label "Details & Notes"

**+ Add Custom Date:**
- `<button class="tl-add-btn fr-add-custom-pill" onclick="paFRAddCustomMilestone(this, event)">` — inline-flex 50h pill, white-33 bg, 1px white border, 25 radius, 8×8 plus.png + label 600 16/20, margin-left 100 in F&R scope (column 100 alignment)
- Click → inserts `.tl-milestone.tl-milestone-custom` with editable Event Label input (`.tl-custom-label-input` — required), Y/M/D, Notes

**Save:** `<div class="ei-save-btn-wrap">` canonical PA save pattern (label + dash + arrow circle, right-aligned in `.fr-panel-actions`).

**Custom milestones (persisted):** `paFRBuildTimelineBlocks` auto-renders any `dates['custom_<ts>']` key with the editable Event Label input pre-filled from `dates['custom_<ts>Label']`. Same shape as freshly-added custom milestones — so frSaveMember reads/writes them via the same DOM querySelector path.

### Save flow (Edit only) — `frSaveMember(memberId)`

1. Read Type/Role from `.fr-ep-type` / `.fr-ep-role` `.ee-input-value` textContent (canonical)
2. Resolve canonical edgeType via `paFRRoleToType[specificRole] || paFRLayer1ToType[layer1]`
3. Compose Y/M/D ISO dates + Notes + Custom labels from every `.tl-milestone[data-key]` block
4. Write to `anchor.relationships` (Sarah on profile.html, viewed person on record.html)
5. **Inverse mirror** on `person.relationships` with `paInverseEdgeType(edgeType)` — bidirectional spec 2.4.1
6. Persist: `paAutoSave()` → localStorage
7. Engine pass: `paRelationshipEngine()` — orphan cleanup, dedupe, Tier B suggestions for in-laws/grandparents
8. Re-render: `paInjectFamilyMembersIntoFRCard()` + `paRenderFamilyRelationships(anchorId)`
9. Auto-reopen card in Read mode so user sees saved data

### Critical isolation rules

- **NEVER unify** `.fr-timeline-item` (View) and `.tl-milestone` (Edit) — they are different components with different parent contexts (View panel narrower, Edit panel 600w)
- **NEVER use** `.ee-input-wrap` 60h container for Read mode fields — Read fields are plain text
- **NEVER use** `.fr-expand-field-value` plain text for Edit mode — Edit fields are interactive wraps
- **NEVER skip** `event.stopPropagation()` on `.tl-clear-btn onclick` — without it, the click bubbles to `.fr-card-wrap.onclick` and closes the whole card
- **NEVER add** `.fr-timeline-section { padding: 0 100px }` — this double-insets milestone titles (must stay `padding: 0` in F&R Edit scope)

### Files
- `_shared.js` (~21500 lines):
  - `paRenderReadExpandPanel` ≈ line 20572 — VIEW mode render
  - `paRenderEditExpandPanel` ≈ line 20680 — EDIT mode render
  - `paFRBuildTimelineBlocks` — shared timeline blocks for Edit (called by Render + Role change)
  - `paFRAddCustomMilestone` — + Add Custom Date click handler
  - `frDeleteMilestone(btn, evt)` — X-close handler with stopPropagation
  - `frSaveMember(memberId)` — Save flow
- `_shared.css` (~15500 lines):
  - View design: lines 10450-10530 (`.fr-expand-*` / `.fr-timeline-*` / `.fr-hide-btn`)
  - Edit design: lines 10160-10220 (`.fr-card-wrap.expanded.edit-open`), 10590-11200 (`.fr-edit-panel` / `.fr-ep-*`), 14942-15055 (canonical `.ee-input-*`), 13270-13550 (canonical `.tl-*`)
- `peopleStore.js` — relationship data with `dates['custom_<ts>']` + `Notes` + `Label` suffixes

### Cache version anchor
Asset version `?v=20260515fr5` on `_shared.css` + `_shared.js` (record.html + profile.html). Bump when changing F&R rendering.

---

## 🔒 LOCKED 2026-05-15 — Save Button Universal Canonical (every card with Save)

**Violetka 2026-05-15 directive:** Save button position is identical across every card that has a Save action (Essential Info, F&R Edit mode, Contact Info Edit, Medical Edit, and all future cards). One canonical component, one canonical position. Pixel-exact match required.

### XD canonical spec
```
top: <varies by card>
left: <varies by card content width>
width: 126px
height: 60px
right edge sits 30px from OUTER card edge (after .accordion-inner padding bleed)
```

### Canonical CSS (DO NOT override per-card)
```css
.ei-save-btn-wrap {
    position: relative;
    width: 126px; height: 60px;
    margin-top: 28px;
    margin-left: auto;            /* right-align in flex/block parent */
    margin-right: 30px;           /* 30px gap to parent right edge */
    margin-bottom: 30px;
    cursor: pointer; flex-shrink: 0;
}
```

Internal anatomy (NEVER change):
- `.ei-save-btn-label` — "Save" text, Inter 400 16/24, abs left:0 vCenter
- `.ei-save-btn-dash` — 10×1.5 black bar, abs left:46 vCenter (grows to 30 on hover)
- `.ei-save-btn-circle` — 60×60 circle, 1px solid #000, abs left:66 vCenter (border becomes transparent on hover)
- `.ei-save-btn-arrow` — 9×16 chevron SVG, inside circle (translateX -5 on hover)
- `.ei-save-btn-wrap::before` — invisible pill that grows left:-30 width:156 on hover (white background reveals)

### CRITICAL: Parent context must allow bleed to outer card edge

`.accordion-inner` has `padding: 0 30px 28px;` — i.e. the inner content area is 60px narrower than the outer card. If Save sits directly inside `.accordion-inner`, the `margin-right: 30px` produces a gap of **60px from the outer card edge** (30 padding + 30 margin) — TOO FAR LEFT.

To make Save sit at the **canonical 30px from outer card right edge**, the Save's immediate parent must BLEED back across the inner padding. Two canonical patterns:

#### Pattern A — `.ei-edit-mode` bleed (used in Essential Info)
```css
.ei-edit-mode {
    width: calc(100% + 60px);   /* +30 each side */
    margin-left: -30px;          /* shift back to outer card left */
}
```
Save is a direct child of `.ei-edit-mode`. Wrap's `margin-right: 30` → 30 from outer card right ✓

#### Pattern B — `.fr-save-row` bleed (used in F&R Edit mode)
```css
.fr-save-row {
    display: flex;
    justify-content: flex-end;
    width: calc(100% + 60px);
    margin-left: -30px;
}
```
Save inside `.fr-save-row`. Same wrap canonical applies → identical pixel column as Essential Info Save ✓

### Anti-patterns — NEVER do these

❌ `padding: 0 100px` on Save row → double-stacks with wrap margin-right (60px gap)
❌ Override `.ei-save-btn-wrap margin-right: 0` per-card → breaks canonical hover behavior + visual consistency
❌ Wrap Save in a container that has its own padding-right or margin-right → breaks the bleed pattern
❌ Position Save absolutely with `right: <pixels>` → breaks responsive layout + departs from canonical

### Verification math (1260w card example)

| Layer | Value |
|---|---|
| Outer card right edge | 1260 |
| `.accordion-inner` content right (after padding-right 30) | 1230 |
| `.ei-edit-mode` OR `.fr-save-row` right (bleeds 30 outward) | 1260 |
| `.ei-save-btn-wrap` right (margin-right 30 from parent right) | 1230 |
| Visual gap from Save right to outer card right | **30** ✓ |

Same math for every card width — works because the bleed always +30 each side and the wrap always margin-right:30.

### Files
- `_shared.css` line 9347-9402 — canonical `.ei-save-btn-wrap` rules
- `_shared.css` line 7753 — `.ei-edit-mode` bleed (Essential Info)
- `_shared.css` line ~11242 — `.fr-save-row` bleed (F&R)
- `record.html` + `profile.html` — Save markup at `<div class="fr-save-row fr-edit-only">` after `</fr-sections-outer>`

### Current usage status (Violetka 2026-05-15)
- ✅ **Essential Info card** — canonical, via `.ei-edit-mode` bleed
- ✅ **F&R card (Edit mode)** — canonical, via `.fr-save-row` bleed
- ⚠️ **Contact Info card** — has Save buttons (saveCiEmails, saveCiPhones, saveCiAddresses, saveCiSocial) but they sit in `.ci-edit-container { padding: 0; }` (no bleed). Currently at 60px from outer card right (NOT canonical 30px). Needs `width: calc(100% + 60px); margin-left: -30px` on the wrap's parent OR on `.ci-edit-container` to match canon. Future audit.
- 🔜 **All future cards with Save** — must apply Pattern A OR Pattern B (parent bleeds via `width: calc(100% + 60px); margin-left: -30px`). Never override `.ei-save-btn-wrap margin-right` per-card — the 30 is global canon.

---

## 🔒 LOCKED 2026-05-15 — Life Status canonical pixel positioning (every form)

**Violetka 2026-05-15 directive:** "Life Status кругатет за опции трябва да почват от 100 пиксел, а самият лейбъл Life Status от 120 пиксел да започва — точно като в Essential Info card, и така е навсякъде в всички форми като Essential Info card."

### Canonical visual position (from CARD EDGE)

| Element | Position from card edge |
|---------|-------------------------|
| Pill outer edge (`.ei-radio-item` left) | **100px** |
| Radio circle (`.ei-radio-circle`, inside pill 20px padding) | **120px** |
| Label "Life Status" (`.ei-field-label` text) | **120px** |
| Pill outer right edge | 100 + 215 (item width) = **315px** |

### Where applied
- `record.html` line 1526-1541 — Essential Info Life Status (canonical source)
- `_shared.js` `buildContactEditFormHtml` — entry People & Contacts (Add New Contact + Edit existing) across ALL cards (Medical / Education / Employment / Beliefs / Essential / Vault)
- `_shared.js` `paFRAddRenderCreateNewPanel` — F&R Step 3 Create New Profile

### Canonical markup (identical in both Essential Info AND my forms)
```html
<div class="ei-radio-group lsc-edit-life-status-group" style="margin-top:20px;">
    <div class="ei-radio-item selected" data-life-status="Living" onclick="lscEditPickLifeStatus(this)">
        <div class="ei-radio-circle"><div class="ei-radio-dot"></div></div>
        <span class="ei-radio-label">Living</span>
    </div>
    <div class="ei-radio-item" data-life-status="Deceased" onclick="lscEditPickLifeStatus(this)">...</div>
    <div class="ei-radio-item" data-life-status="Unknown" onclick="lscEditPickLifeStatus(this)">...</div>
</div>
<input type="hidden" class="lsc-edit-life-status-value" value="Living">
<div class="ei-field-label" style="padding-left:20px; margin-bottom:20px;">Life Status</div>
```

### Two padding contexts (CRITICAL — different inline values per context)

**Context A — Essential Info card (record.html):**
- Parent is `.accordion-inner` (NO field-level padding-left)
- `.ei-radio-group` CSS `padding-left:100` → pill at parent + 100
- `.ei-field-label` inline `padding-left:120px` → label at parent + 120
- Result: pill at 100, label at 120 ✓

**Context B — My forms (`.lsc-edit-form` inside `.linked-summary-wrap[data-edit-mode]`):**
- Parent `.linked-summary-wrap` provides `padding: 30 100 30 100` → form content edge at wrap-edge + 100
- Scoped override: `.lsc-edit-form .ei-radio-group { padding-left:0; padding-right:0 }` (NO doubling)
- `.ei-field-label` inline `padding-left:20px` (NOT 120) → label at form-left + 20 = wrap-edge + 120
- Result: pill at wrap-edge + 100, label at wrap-edge + 120 ✓ (SAME visual position as Essential Info)

### Why two different inline values?

Because `.linked-summary-wrap[data-edit-mode]` already gives `padding-left:100`. If we use canonical inline `padding-left:120` here, total becomes 100 + 120 = **220** from card edge — wrong. By writing `padding-left:20`, total = 100 + 20 = **120** from card edge — matches canonical.

Same logic for `.ei-radio-group`: its CSS `padding-left:100` would compound to 200 from wrap edge. Scoped override `.lsc-edit-form .ei-radio-group { padding-left:0 }` cancels it so radios land at wrap + 100 (the canonical "100 from card edge").

### Top spacing (margin-top above radio group)

**Canonical: `style="margin-top:20px"` on `.ei-radio-group`** — NOT 40px. Source: `record.html` line 1526. The 20px collapses with previous element's margin-bottom (e.g. `.ee-input-row` mb:20) to give 20px gap above the radio group. Same in `.lsc-edit-form`.

### Pill highlight state (selected)

`.ei-radio-item.selected` (canonical CSS line 8619):
- Background: `rgba(255,255,255,0.33)` — visible pill on selected only, NOT on hover
- Inside circle: bg `#FFFFFF` + border `#000`
- Dot scale 0 → 1 (10×10 #000)
- Label font-weight: 400 → 600

Hover state (canonical line 8618-8620):
- NO pill (background transparent — locked per `feedback_radio_no_white_pad`)
- Only ring border darkens to `#000`
- Label weight 400 → 500

### Click handlers (functional parity)

| Form | Handler | Hidden input class | Save flow |
|------|---------|--------------------|-----------|
| Essential Info | `selectLifeStatus(this, value)` | `#eiLifeStatus` | Mutates `peopleStore` + `paAutoSave` |
| buildContactEditFormHtml | `lscEditPickLifeStatus(this)` | `.lsc-edit-life-status-value` | `saveContactEdit` reads hidden input → `person.lifeStatus` + `person.alive` |
| paFRAddRenderCreateNewPanel | `paFRAddPickLifeStatus(this)` | `.fr-create-life-status-value` | `paFRAddSaveCreateNew` reads hidden input → `newPerson` with `lifeStatus` + `livingStatus` + `alive` |

All three handlers do the same thing: toggle `.selected` class on the clicked item (clearing siblings) + write value to hidden input.

### Pre-populate on edit (existing contact)

`buildContactEditFormHtml` uses IIFE to read `person.lifeStatus` (with fallback to `person.alive === false ? 'Deceased' : 'Living'`) and apply `.selected` class to the correct radio item + write to hidden input. So editing an existing contact shows their actual life status.

### Files
- CSS: `_shared.css` line 8603 (canonical `.ei-radio-group`), line ~24913 (scoped override `.lsc-edit-form .ei-radio-group`)
- JS: `_shared.js` `buildContactEditFormHtml` (~line 14193), `paFRAddRenderCreateNewPanel` (~line 9583)
- HTML: `record.html` line 1526-1541 (canonical Essential Info)

### Anti-patterns (don't do)

- ❌ Inline `padding-left:120` on the label inside `.lsc-edit-form` — would double to 220 from card edge
- ❌ Custom CSS class with padding-left override — use scoped `.lsc-edit-form .ei-radio-group` instead
- ❌ `margin-top:40` — canonical is 20 (Essential Info)
- ❌ White pill bg on hover — only on `.selected` (locked per `feedback_radio_no_white_pad`)
- ❌ Different radios markup per form — always use `.ei-radio-group` + `.ei-radio-item` + `.ei-radio-circle` + `.ei-radio-dot` + `.ei-radio-label`

---

## 🔒 LOCKED 2026-05-15 — F&R Add X canonical form (Add Spouse/Sibling/Parent/Child/Pet/Extended/Former)

**Violetka 2026-05-15 directive — CONFIRMED ("да - това е дизайна"):** Every "+ Add X" button on the F&R card opens the SAME canonical form as Add New Contact / Edit existing contact (entry People & Contacts) — `buildContactEditFormHtml`. Only differences:
- Network/Family directory pill is HIDDEN (locked Family)
- Relationship Type is PRE-FILLED based on which button was clicked
- Save creates the new person AND a bidirectional F&R relationship edge

### Implementation pattern

**1. `buildContactEditFormHtml(person, options = {})` — options-driven:**
| Option | Purpose |
|--------|---------|
| `hideDirectoryPill` | Skip "Add This Person to" + Network/Family pill |
| `presetDir` | `'family'` or `'network'` — locks branch |
| `presetLayer1` | Pre-fill Relationship Type dropdown |
| `startExpanded` | Skip CREATE-mode `.collapsed` lock |
| `saveOnclick` | Override Save click handler |
| `extraFormAttrs` | Extra attrs on `.lsc-edit-form` (e.g. `data-fr-create-type`) |

**2. `paFRAddRenderCreateNewPanel(type)`:**
- Creates stub person (`_isNew: true`, `categories: ['family']` or `['family','pet']`)
- Maps `type` → `presetLayer1` via FR_TO_LSC_LAYER1 (CRITICAL — singular→plural)
- Calls `buildContactEditFormHtml(stub, { hideDirectoryPill:true, presetDir:'family', presetLayer1, startExpanded:true, saveOnclick:'paFRAddSaveCreateNewCanonical(type,this)', extraFormAttrs:'data-fr-create-type=...' })`
- Wraps output in `<div class="fr-add-canonical-wrap">` (provides 100px L/R padding)
- After render: `lscEditDir(familyBtn, 'family')` + `lscEditPopulateRoleLayer2(form, presetLayer1)`

**3. `paFRAddSaveCreateNewCanonical(type, btn)`:**
- Calls `saveContactEdit(btn)` — validates + writes person fields
- Creates bidirectional F&R edge: anchor.relationships + person.relationships
- Reads relationship dates from `.lsc-edit-rel-date-pad`
- Persist + engine pass + re-render F&R card + close panel

### CRITICAL: FR_TYPE_META → LSC_EDIT_LAYER2_FAMILY mapping (singular → plural)

`FR_TYPE_META` uses SINGULAR Layer 1 values, canonical `LSC_EDIT_LAYER2_FAMILY` uses PLURAL keys. Without mapping → Specific Role picker stays hidden (no options).

```js
const FR_TO_LSC_LAYER1 = {
    'Spouse / Partner':         'Spouses / Partners',
    'Former Partner / Spouse':  'Former Partner / Spouse',
    'Child':                    'Children',
    'Parent':                   'Parents',
    'Sibling':                  'Siblings',
    'Pet':                      'Pets',
    'Extended Family':          'Other'
};
```

### CRITICAL: 100px L/R padding wrapper

The canonical buildContactEditFormHtml is designed to live inside `.linked-summary-wrap[data-edit-mode]` which provides `padding: 30 100 30 100`. In F&R Add X context (`.fr-add-panel`), this wrap is absent → fields stick to edge. **Solution:** wrap formHtml in `.fr-add-canonical-wrap { padding: 0 100px }`.

### isCreate / startCollapsed split (CRITICAL fix)

Two separate concepts that USED to be conflated as one flag:
- `isCreate = !!person._isNew` — controls avatar caption ("Add Profile Image"), `.lsc-avatar-add-state` (two-circle pattern), life-dot hide
- `startCollapsed = isCreate && !startExpanded` — controls only `.collapsed` class

F&R Add X needs CREATE-mode visuals (avatar two-circle, "Add Profile Image", no life-dot) BUT skip collapsed (no pill to click to expand). Hence the split.

### Visual confirmation (XD-locked)

- ✅ Avatar: outer 80×80 white-33% rgba + inner 40×40 solid white (`.lsc-avatar-add-state`) + plus icon 20×20 opacity 0.16 → 1 on hover/drag-over
- ✅ Caption: "Add Profile Image" (NOT "Add or Change...")
- ✅ No life-dot until person is saved (first save flips `_isNew` to false)
- ✅ Avatar + fields at **100px from card edge** (via `.fr-add-canonical-wrap`)
- ✅ Relationship Type PRE-FILLED based on button: Add Sibling → "Siblings", Add Parent → "Parents", etc.
- ✅ Specific Role picker visible with role-specific options
- ✅ Life Status pill at 100, label at 120 (canonical)
- ✅ All sections present: Avatar, First/Family Name, DOB, Life Status, Relationship Type, Specific Role, Relationship Timeline (after role pick), E-mails, Phone Numbers, Social Media Profiles, Notes, Save

### Files
- `_shared.js` `paFRAddRenderCreateNewPanel` (~line 9495) — F&R Add X entry
- `_shared.js` `paFRAddSaveCreateNewCanonical` (~line 9840) — save + edge creation
- `_shared.js` `buildContactEditFormHtml(person, options)` (~line 14260) — canonical form with options
- `_shared.css` `.fr-add-canonical-wrap` (~line 10632) — 100px L/R padding wrapper
- `_shared.css` `.lsc-avatar-wrap.lsc-avatar-add-state` (~line 14402) — two-circle pattern
- `_shared.css` `.lsc-edit-form .ei-radio-group { padding-left:0 }` (~line 24925) — scoped Life Status canonical fix

### Anti-patterns

- ❌ Custom F&R-only field markup (`.fr-create-*`, `.fr-ep-*`) — always use canonical `.ee-input-row` / `.lsc-edit-*`
- ❌ Singular Layer 1 keys without mapping — FR_TYPE_META is singular, LSC_EDIT is plural
- ❌ Conflating `isCreate` and `startCollapsed` — they're different concerns
- ❌ Skipping the `.fr-add-canonical-wrap` — fields will stick to card edge
- ❌ Hardcoding presetLayer1 inline — derive from `FR_TYPE_META[type].layer1` via FR_TO_LSC_LAYER1 mapping


---

## 🔒 LOCKED 2026-05-25 — AI Assistant card (dashboard variant `.ai-card`)

User confirmation: "страхотно — това — запомни го до тук" (Violetka 2026-05-25).
Source of truth: live XD inspector specs provided by Violetka over multiple
turns on 2026-05-24 → 2026-05-25.

### Card shell
- **Size**: 600 × 400 (min-height 400)
- **Background**: `#020B66` (dark navy, XD "unnamed-color-020b66")
- **Border-radius**: 30
- **Shadow**: `0px 10px 30px #00000029`
- **Overflow**: hidden (layers clipped to radius)

### Layer stack (z-order, all positioned inside the card)
| z | Layer | Treatment |
|---|-------|-----------|
| 1 | `.ai-bg` | Solid navy `#020B66` (base) |
| 2 | `.ai-image-bg` | `img/ai-image.png` mountains photo, `inset:0`, `center bottom / cover`, `mix-blend-mode: screen`, opacity 0.8, `filter: brightness(0.95) saturate(1.4) contrast(1.05)` |
| 2b | `.ai-image-bg::after` | Same image, mask gradient for bottom-half emphasis, screen blend |
| 3 | `.ai-video` | `img/ai-particles.mp4` loop muted playsinline autoplay, `top:50%; transform:translateY(-50%)`, 270px tall, screen blend, **z:25 above header** |
| 5 | `.ai-vignette` | Linear-gradient for text readability |
| 20 | `.ai-header` | Frosted glass (navy 92% → transparent, `backdrop-filter: blur(15px)`), masks bubbles scrolling under |
| 25 | (video sits above header per XD) | — |
| 30+ | `.ai-chat`, `.ai-input-area`, `.ai-resize` | Foreground UI |

**Universal injector**: `paInjectAiVideo()` in `_shared.js` finds every
`.ai-card` / `.ai-card-col4` and inserts `.ai-image-bg` + `.ai-video`
markup. Runs on DOMContentLoaded + 100 ms + 500 ms ticks so it works
on dynamically-loaded variants.

### Typography
- **Title** `.ai-title` — Inter 600 20/24 `#FFFFFF` letter-spacing 0
- **Subtitle** `.ai-subtitle` — Inter 400 12/15 `#FFFFFF` opacity 0.5 letter-spacing 0

### Bubbles (`.ai-bubble`, `.user-bubble`, `.ai-rec-card`) — LOCKED 2026-05-25
Final canonical spec after multi-round iteration with Violetka. The XD
`Rectangle:Pad` spec of 16% fill + blur(10) didn't read as plump enough
on the dashboard because the video sphere's bright particles bled
through. Border was rejected ("нямат обаче рамка"), so opacity was
bumped to compensate.

```css
background:       rgba(255,255,255,0.25);             /* 25% white fill — denser than XD 16% */
backdrop-filter:  blur(20px) brightness(0.85);        /* blur + dim bright particles */
box-shadow:       0px 10px 20px #00000014;            /* canonical Drop Shadow */
border-radius:    20px 20px 20px 0;                   /* AI-pointer corner — same for both AI and user bubbles */
padding:          20px;                                /* 20 on all 4 sides — XD inspector guides */
border:           0;                                   /* NO border */
flex:             0 1 auto;                            /* content-sized, can shrink */
max-width:        100%;                                /* respect .ai-message max-width:85% */
min-width:        0;
```

- Text Inter 400 14/17 `#FFFFFF`
- User bubble has SAME radius `20 20 20 0` as AI (NOT mirrored — alignment via flex `justify-content: flex-end` differentiates)
- Bubble↔bubble gap: **14 px** (margin-top, via gap:0 + per-element margin)
- Timestamp 4 px below bubble: Inter 400 10/13 `rgba(255,255,255,0.5)` left-aligned (right for user)

### Status dots — LOCKED 2026-05-25
- AI dot: **`#667EEA`** brand purple-blue + soft glow `0 0 6px rgba(102,126,234,0.6)` (was green; changed to match attach-badge color for AI brand consistency)
- User dot: `#FFFFFF`
- Same `#667EEA` used for `.ai-attach-badge` (file count) and `.ai-scroll-btn .new-dot`

### Critical animation fix — LOCKED 2026-05-25
`@keyframes aiMsgIn` MUST end with `transform: none` (NOT `translateY(0) scale(1)`).
Any non-`none` transform on the message wrapper creates a new containing
block which breaks the bubble's backdrop-filter (it samples only the empty
wrapper instead of the card behind). Bug from Violetka: "за секунда е
правилно после прозрачно — bug was the `scale(1)` at keyframe 100%".

### Video z-index fix — LOCKED 2026-05-25
`.ai-video` z-index is **3** (NOT 25). Must be BELOW chat (z:5) so bubble's
backdrop-filter can blur the particles. Earlier z:25 painted particles ON
TOP of bubbles via screen blend, defeating the frosting.

### Resize (Violetka 2026-05-24/25)
- `.ai-resize` handle bar at card bottom, 48 × 4 / 72 × 4 on hover/active
- JS: universal `mousedown`/`touchstart` delegation, `applyResize(card, dy)`
- Min height 400 (XD baseline), max 85–90% viewport
- **Video stays centered** via `top: 50%; transform: translateY(-50%)` as card grows
- Image stretches with card via `inset: 0` + `center bottom / cover`

### Smooth animations (Violetka 2026-05-25 "по плавно да се движат")
- New `@keyframes aiMsgIn`: opacity 0→1 + 8 px slide-up + 0.97→1 scale,
  0.42 s cubic-bezier(0.22, 1, 0.36, 1)
- `transform-origin: bottom left` for AI bubbles, `bottom right` for user
- Helper `paAiScrollSmooth(chat)` replaces all 9 instant
  `chat.scrollTop = chat.scrollHeight` with smooth `scrollTo` in rAF
- Typing → response swap: fade-out (opacity 0 + 4 px up, 180 ms) before
  removal; response uses entrance keyframe — one continuous beat

### Input Pad (`.ai-input` inside `.ai-input-composite`) — THREE STATES

| State | Background | Border | Caret / Text / Placeholder |
|-------|------------|--------|----------------------------|
| **Default** | `rgba(255,255,255,0.16)` glass | `1px rgba(255,255,255,0.33)` | placeholder Inter 400 14/17 `#FFFFFF` op 0.5 |
| **Hover (Hover-Tap-Hold)** | same glass | `1px rgba(255,255,255,0.80)` denser | unchanged |
| **Focus (Input text / Click)** | solid `#FFFFFF` | `1px #FFFFFF` | text `#000`, caret `#333366` (XD 1 px × 24 px), placeholder TRANSPARENT |

- Default → Hover: 0.3 s ease-out (XD Auto-Animate)
- Hover → Focus: 0 s instant (XD Auto-Animate)
- Width 480 in XD is illustrative — flex sizing in code shares the row with attach button
- Placeholder !important rules applied across `.ai-input-composite .ai-input`, `.ai-card .ai-input`, `.ai-card-col4 .ai-input`

### Send + Attach buttons — IDENTICAL 3-STATE PATTERN

Scoped to `.ai-card .ai-send` and `.ai-card .ai-attach` (col4 unaffected).

| State | Background | Border | Icon |
|-------|------------|--------|------|
| **Default** | `rgba(255,255,255,0.16)` glass | `1px rgba(255,255,255,0.20)` **paler than input** (Violetka: "очертанията са малко по бледи накрая") | `send-white.png` / paperclip 60% white |
| **Hover** | same glass | `1px rgba(255,255,255,0.80)` matches input hover | white / 100% white |
| **:active (Click/Tap)** | solid `#FFFFFF` | `1px #FFFFFFB0` | **`send-black.png`** / paperclip `#000` |

- Size: 50 × 50 (both buttons)
- Shadow: `0px 10px 20px #00000014`
- Backdrop-filter: `blur(30px)`
- Default ↔ Hover: 0.6 s ease-out (XD Auto-Animate)
- Hover ↔ Active: 0 s on press, smooth fade-back on release
- Both buttons also accept `.is-pressed` class for JS-driven press states

### Send icon naming convention (LOCKED — Violetka 2026-05-25)
"Запомни го с правилните имена — за да знаеш кога какво да позваш"

| File | Use |
|------|-----|
| `img/send-white.png` + `@2x` | Default + Hover (idle look on glass) |
| `img/send-black.png` + `@2x` | :active / Pressed (visible on solid white) |
| `img/send-blue.png` *(reserved)* | Future variant — designer hasn't exported yet |

### Two-Layer PNG Icon Crossfade (icon swap mechanism)
- `::before` = `send-white.png`, opacity 1 default → 0 on `:active`
- `::after` = `send-black.png`, opacity 0 default → 1 on `:active`
- Both absolute-centered, 20 × 20, opacity transition 0.6 s ease-out
- Retina swap via `@media (-webkit-min-device-pixel-ratio: 2)`
- Legacy inline SVG inside `.ai-send` hidden via `display: none`

### Files where this lives
- `html-prototype/_shared.css` (lines ~1130–1770, 2150–2380 for col4)
- `html-prototype/_shared.js` — `paInjectAiVideo()`, `paAiScrollSmooth()`,
  AI resize IIFE, `sendAiMsg()`, `showAiTypingResponse()`
- `html-prototype/img/` — `ai-image.png` + `@2x`, `ai-particles.mp4`,
  `send-white.png` + `@2x`, `send-black.png` + `@2x`
- `html-prototype/index.html`, `contribute.html`, `profile.html` — `.ai-card` / `.ai-card-col4` markup

### Anti-patterns
- ❌ Solid white Send/Attach button by default — they're GLASS until clicked
- ❌ Hardcoded `caret-color: #000000` — must be `#333366` per XD Input-text state
- ❌ Hiding text via `color: rgba(255,255,255,0.0)` — broke text visibility after blur, now white
- ❌ Reusing send-arrow.svg as the dashboard icon — that was the legacy SVG; PNGs are canonical
- ❌ Reading specs as literal `width: 480px` — flex sizing handles attach button row-share
- ❌ Letting `adaptSphereToHeight()` set CSS vars no rule reads — dead code, removed
- ❌ Duplicate mobile-only `.ai-resize` handler — caused double-resize on touch, removed

### Pending (Violetka: "имам няколко детайла, които ще променим още")
- `send-blue.png` variant — not yet exported
- col4 (36 × 36) Send + Attach button specs — pending
- Possible additional Input Pad fine-tuning


---

## Profile Tabs Pad — LOCKED 2026-05-18

User confirmation: "ей така е супер" / "браво - това е за пиловет- запомни го" / "това е за табовтет - запомни и да продължим"

### Container (.profile-tabs)
- `height: 50px` / `border-radius: 30px` / `width: fit-content`
- `padding: 0` (ZERO — the breathing room comes from per-tab margins, NOT container padding)
- `gap: 20px` between tabs
- `background: var(--card-bg-default)` + standard card shadow + 1px border + `backdrop-filter: blur(10px)`
- `margin-bottom: 10px` (10px gap to next stacked card — canonical)
- `align-self: center` + `margin: 0 auto` so it never stretches to parent's full width

### Active Pill (.profile-tab.active)
- `padding: 0 30px` — text + 30px each side = pill is always 60px wider than its word
- `font-weight: 600` (Inter)
- Pill itself rendered by `.profile-tabs-pill` (absolute, behind text, transition `left + width 0.3s ease-out`)
- **No transition on the tab** (`.profile-tab { transition: none }`) so padding + weight snap instantly and `movePill()` reads the correct `offsetWidth` on the very first click

### Inactive Tabs
- `padding: 0` (text-only)
- `font-weight: 400` (Inter), `color: #000`, `opacity: 1`

### Edge Margins — THE KEY RULE
"когато имам пил, не ни трябва доп. 20px защото те са в пила; когато не е селектирана думата — трябат 20 пиксла"

- **First visible tab INACTIVE** → 20px breathing margin on the left
- **First visible tab ACTIVE** → 0px (pill flushes the container's left edge — the 30px internal padding IS the spacing)
- **Last visible tab INACTIVE** → 20px breathing margin on the right
- **Last visible tab ACTIVE** → 0px (pill flushes the container's right edge)

### Implementation (CRITICAL — pure-CSS won't work)

`.profile-tabs-pill` is the literal first DOM child (absolutely positioned overlay), so `:first-child` does NOT match the visible first tab. Also `:last-child` matches a hidden Memorial Page on non-deceased records.

Solution: **JS-applied edge classes** via `paUpdateTabEdges()` (in `_shared.js`):
```js
function paUpdateTabEdges() {
    var visible = Array.from(tabsContainer.querySelectorAll('.profile-tab'))
        .filter(t => getComputedStyle(t).display !== 'none');
    // clear all, then apply to first/last visible
    tabsContainer.querySelectorAll('.profile-tab').forEach(t => {
        t.classList.remove('pa-tab-edge-first', 'pa-tab-edge-last');
    });
    if (visible.length > 0) {
        visible[0].classList.add('pa-tab-edge-first');
        visible[visible.length - 1].classList.add('pa-tab-edge-last');
    }
}
window.paUpdateTabEdges = paUpdateTabEdges;
```

CSS rules:
```css
.profile-tab.pa-tab-edge-first { margin-left: 20px; }
.profile-tab.pa-tab-edge-last  { margin-right: 20px; }
.profile-tab.pa-tab-edge-first.active { margin-left: 0; }
.profile-tab.pa-tab-edge-last.active  { margin-right: 0; }
```

### movePill() — first-click correctness

```js
// Click handler — defer offsetWidth read 2 rAFs so the browser has rendered
// the final bold-weight + 30px-padding width before we snap the pill.
requestAnimationFrame(() => {
    requestAnimationFrame(() => { movePill(self); });
});
```

Without the deferral, the FIRST click on a tab would set pill width 1-2px short of the final value (font-weight transition produces a tiny width delta). The double-rAF guarantees the layout has settled.

### Verified measurements (Jane deceased record — 5 visible tabs)

| State | containerW | pillL | pillW | firstMarginL | lastMarginR |
|-------|-----------|-------|-------|--------------|-------------|
| Memorial Page active (last) | 506 | 343 | 161 | **20** (Overview inactive) | **0** (Memorial active) |
| Overview active (first)     | 506 | 0   | 124 | **0** (Overview active)    | **20** (Memorial inactive) |
| Documents active (middle)   | 526 | 103 | 137 | **20** (both inactive)     | **20** (both inactive) |

### Files
- `_shared.css` ~line 5595-5685 — `.profile-tabs`, `.profile-tab`, `.profile-tabs-pill`, edge-margin rules
- `_shared.js` ~line 10938-11020 — IIFE with `movePill`, `paUpdateTabEdges`, click handler

---

## pd-card Avatar Pattern — LOCKED 2026-05-18

User confirmation: "браво за аватарите с букви - така трябва да са, запомни ги"

### Two-Circle Avatar Pattern (no-photo variant)

In Family Directory + Network Directory + similar 600×120 summary pill cards:

```
.pd-avatar-wrap (80×80)         ← outer translucent glass circle
  └── [conditional] <img>       ← ONLY if photo exists
  OR
  └── .pd-avatar-initials (60×60) ← solid white circle centered inside outer
        └── "MA" 600 22/24 Source Serif 4, rgba(0,0,0,0.4)
  └── .pd-life-dot (absolute, doesn't affect flex)
```

### The Bug That Triggered The Lock

`<div class="pd-avatar-wrap">` uses `display: flex; align-items: center; justify-content: center;`.

If we ALWAYS render `<img>` even with empty src:
- `<img src="">` still takes its CSS `width: 60px; height: 60px` slot in the flex row
- Then `<div class="pd-avatar-initials">` is the **second flex child** sitting NEXT to the empty img
- Visual result: white initials circle pushed **30px to the right** of center → escapes outer circle on the right side

### The Fix

Render the `<img>` tag **conditionally** — only when photo exists:

```js
${photo ? `<img class="pd-avatar" src="${photo}" alt="..."
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : ''}
<div class="pd-avatar-initials" style="display:${photo ? 'none' : 'flex'}">${initials}</div>
```

### Lock Rule (UNIVERSAL — apply to ANY two-circle avatar component)

When the outer wrap uses flex centering, NEVER render BOTH a placeholder `<img src="">` AND an initials div. Either:

1. **Conditional render** (PREFERRED) — only emit `<img>` if `photo` is truthy
2. **Absolute positioning** — both children `position: absolute; top: 10px; left: 10px;` (then flex doesn't apply)

Files where this pattern is locked:
- `_data/peopleDirectory.js` `renderPersonCard` (pd-card) — Family Directory + Network Directory
- (Apply same fix wherever else you spot the pattern: avatar wraps with flex centering + always-rendered img.)

### Canonical Initials Styling (LOCKED — never invent variants)
- White solid background `#FFFFFF`
- 60×60 circle (`border-radius: 50%`)
- Font: `600 22px/24px 'Source Serif 4', serif`
- Color: `rgba(0,0,0,0.4)`
- Letter-spacing: `0.05em`
- `user-select: none`
- Initials: First letter of firstName + first letter of familyName, UPPERCASE, no dots (e.g. "Marcus Anderson" → "MA")

Same canonical rule as `.lsc-avatar-monogram`, `.ee-person-monogram`, `.emc-avatar-initials`, `.fr-avatar-initials` everywhere.

---

## SESSION 2026-05-18 — Comprehensive Session Lock

User confirmation: "сега запомни всичко до тук и започвам да работим по фемили трее"

All fixes from this session in chronological cache versions:

### Tabs Pad — fr94 (LOCKED earlier in document)
- 20px breathing margin on first/last VISIBLE tab when inactive (.pa-tab-edge-first/.pa-tab-edge-last via JS)
- 0px margin when that tab is active (pill flushes container edge)
- JS `paUpdateTabEdges()` runs at init + after any visibility change
- Container `padding: 0`, `gap: 20px`
- Active pill: `padding: 0 30px`, `font-weight: 600`, `transition: none` (no padding/weight animation — snaps so movePill reads final width on 1st click)
- Click handler defers movePill via `requestAnimationFrame × 2`

### Family Directory ⋯ Menu — fr88
- `.pd-card-menu` hit area: 13×3 → **40×40** (touch-friendly)
- Visual dots stay at 13×3 with opacity 0.3 → 1 on hover (canonical)
- z-index: 3

### F&R ⋯ Menu Scroll-into-View — fr89
- `frOpenMenu` now scroll-checks dropdown viewport position after opening
- Handles both window scroll AND `.scroll-container` (platform's custom container)
- Without this, the dropdown opened BELOW the viewport on long pages and looked like "nothing happened"

### Full-Refresh Chain on Confirm/Reject/Add — fr90-fr91
**Bug**: `paConfirmSuggested` in record.html only updated local F&R; Sarah's profile / Family Directory / Family Tree didn't see the change.

**Fix**: New `paFrFullRefresh()` helper called everywhere. Chain:
1. `paSaveAll()` — persist
2. `paRelationshipEngine()` — Tier A bidirectional + derived in-laws/grandparents
3. `paRenderFamilyRelationships(viewedId)` — local F&R re-render
4. `paInjectFamilyMembersIntoFRCard()` — profile.html hardcoded F&R injection
5. `paUpdateFamilyAnalytics()` — counters card
6. `paUpdateFamilyHeaderStats()` — Marital / Children / Minors
7. `renderFamilyDirectory()` — My Family directory pd-cards
8. `renderNetworkDirectory()` — My Network
9. `paRecomputeFamilyTreeAnalytics()` — tree analytics
10. `paInjectNewFamilyMembersIntoTree()` — tree nodes
11. `paSyncPersonAvatars()` — every avatar in DOM gets the right photo+crop

Same chain runs after `paFRAddSaveCreateNewCanonical` (when user adds a spouse/child/parent through +Add UI).

### Subsection-Doesn't-Close-on-Confirm — fr94-fr95
**Bug**: After Confirm, Immediate/Extended subsection auto-closed because:
1. `section.click()` → calls `frToggleSection` 
2. `frToggleSection` early-returns if `frEditMode` is true (sections are locked open in edit mode)
3. So subsection body stays `.collapsed` after re-inject

**Fix**: Bypass guarded helper — directly `body.classList.remove('collapsed')` + sync header indicator. Also made restore-logic GENERIC for record.html ID variants (`fr-imm-dyn` / `fr-ext-dyn` vs profile's `fr-imm` / `fr-ext`).

### window.paRenderFamilyRelationships Export — fr96
**Bug**: function defined locally inside record.html scope, NOT on window. Cross-file callers (`paFRAddSaveCreateNewCanonical`, `paConfirmSuggestion`) checked `typeof window.paRenderFamilyRelationships === 'function'` → undefined → silently skipped.

**Fix**: `window.paRenderFamilyRelationships = paRenderFamilyRelationships;` at end of record.html script. Result: adding a spouse on Emma's record now triggers full re-render including Sarah's profile F&R (when she navigates there).

### Plan Owner POV in Family Directory — fr97-fr98
**Bug**: When adding a spouse to Emma's record (Marcus), Marcus's `roleLayer2 = "Husband"` (Emma's POV). The pd-card directory grouping fell back to `roleLayer1` ("Spouse / Partner") and put Marcus in **Sarah's Spouse / Partner group** alongside John.

**Fix in `groupFamily()`**: precompute `paGetRelationshipsForPerson('sj')` derived rels lookup. For each person, resolution order:
1. Direct edge Sarah → person
2. Derived rel from Plan Owner POV (e.g. `in-law-child` → Extended Family)
3. Reverse edge person → Sarah
4. `person.roleLayer1` (last resort)

**Fix in `renderPersonCard()`**: same lookup chain for the role label. Marcus now shows as **Extended Family / Son-in-Law** instead of Spouse/Partner / Husband.

### Year/Month/Day Dropdowns — fr99-fr101
**Bug**: F&R Edit panel timeline section used native HTML `<select>` for Year/Month/Day. Browsers render native selects as huge OS-level popovers (130+ years extending past viewport) — completely unstyled, can't be contained inline.

**Fix — converted THREE places** to canonical `.tl-dd-trigger` + `.tl-dd-panel` pattern (same as Essential Info DOB picker):
1. `paFRBuildTimelineBlocks` canonical milestones (line 22297+)
2. `paFRBuildTimelineBlocks` existing custom milestones (line 22393+)
3. `paFRAddCustomMilestone` "+ Add Custom Date" pill builder (line 22474+)

Each Year/Month/Day now produces:
```html
<div class="tl-date-sel-wrap tl-sel-year">
  <div class="tl-dd-trigger" onclick="tlOpenDateDD(this)">
    <span class="tl-dd-value is-placeholder">Year</span>
    <span class="tl-req">*</span>
    <span class="tl-dd-chevron"></span>
  </div>
  <div class="tl-dd-panel" role="listbox">
    <div class="tl-dd-option" data-val="2025" onclick="tlPickDate(this)">2025</div>
    ...
  </div>
  <input type="hidden" class="fr-ms-year tl-year" value="">
</div>
```

### pd-avatar Misalignment — fr100
**Bug**: empty `<img src="">` still took its CSS 60×60 flex slot, pushing initials circle to the right.
**Fix**: render `<img>` conditionally (only when photo exists). See locked pattern above.

### Year Asterisk Position — fr102
**Bug**: `.tl-dd-value` had `flex: 1` stretching to fill, so `*` floated next to chevron instead of after "Year".
**Fix**: CSS `:has()` selector:
```css
.tl-dd-trigger:has(.tl-req) .tl-dd-value   { flex: 0 0 auto; }
.tl-dd-trigger:has(.tl-req) .tl-dd-chevron { margin-left: auto; }
```
Now "Year *" reads as a unit with 4px gap between word and star, chevron pinned far right.

---

## Next Session — Family Tree

Two requested changes (pending):

1. **Direction lock**: Parents/Grandparents/Great-grandparents UP → Children/Grandchildren/Great-grandchildren DOWN (canonical genealogy direction, consistent across every view of the tree).

2. **Click-to-recenter feature**: clicking any small card in the tree → that person becomes center → tree re-renders showing THEIR family (parents up, partners horizontal, children/grandchildren down). Pattern matches F&R card POV-aware behavior. Like a "navigation through generations" experience.

Implementation notes when we start:
- Tree renderer is `paInjectNewFamilyMembersIntoTree` (likely in `_shared.js` or `family-tree.html`)
- Center person currently hardcoded to Plan Owner (`sj`)
- Need to introduce `window.__paTreeFocusId` similar to `__paViewedPersonRealId`
- Re-render should animate smoothly (smooth pan + fade) rather than jump-cut
- Breadcrumb / "Back to Sarah" affordance for navigation

---

## Session 2026-05-22 — Family Tree Add-Child Flow + Tree Connections

### Add Child / New Other Parent — Canonical Flow LOCKED

When user clicks `+` on a tree card → relmode picker (4 options: Add Child / Partner / Sibling / Parent) → form opens BELOW anchor card.

**Form structure (canonical):**
- Anchor preview at top (small pill, same canonical .ftree-card style)
- Form pad below with title "Adding a [Role] for [Anchor First Name]"
- Specific Role picker
- Add Profile Image (canonical 2-circle pattern)
- First Name + Family Name (canonical .ee-input-row with sub-labels)
- Year/Month/Day DOB (canonical .fr-tl-select with bottom-line + drop-arrow chevron)
- Living/Deceased/Unknown Life Status (canonical .ei-radio-item pills)
- E-mail field + Add E-mail button
- Other Parent picker (canonical .ee-contact-picker)
- Save button

**Other Parent picker — 3-section canonical:**
1. **Partners** group — current spouses + ex-spouses of anchor (Inter 16/24 name + Inter 12/15 role in parens below)
2. **From Contact List →** action — toggles expanded view with My Family + My Network groups + Back action
3. **+ Create new record** — RED (#FF2C55) bold, separated with 1px border-top (canonical .fr-add-picker-create pattern)

**+ Create new record inline expansion:**
- Smart header "Adding [Role] for [Child First Name]" (live-updates from child's First Name input)
- Same canonical fields as main form (avatar 2-circle, First Name, Family Name, DOB Y/M/D, Life Status pills)
- Auto-creates partnership edge to anchor (spouse if no current partner, ex-spouse otherwise)
- Sets newParent.roleLayer1 = "Spouses / Partners" so directory derives proper "Daughter-in-Law" / "Son-in-Law" role

### Family Tree — Descendant Spouses + Connection Lines

**Three new features added to tree renderer:**

1. **Grandchildren role labels** — descendant walk in `roleForCard` mirrors the ancestor walk. From Sarah's POV: TestChild reads "Biological Grandson" not "Biological Son".

2. **descendantSpouses collection** — `layout.descendantSpouses[]` collects partners of anchor's children + deeper. They render INLINE in the children's row next to their partner. Same canonical .ftree-card with `data-couple-type="current|ex"`.

3. **Descendant fork drawing** — mirror of ancestors fork loop. For each generation in descendants[], find married pairs (including descendantSpouses) and draw fork UP to next-deeper generation's shared children.

4. **Solo fork for paired parents' unshared children** — when a paired parent has a bio child NOT shared with current partner (e.g., Sarah has Emma from previous marriage with Jack, while paired with John), draw an additional solo fork from that parent to those children. Counts ONLY `type === 'child'` (bio) edges, ignoring step/adopted/foster.

### Name Marquee Spacing — LOCKED

`.ftree-info { right: 34px }` — leaves 4px gap before the +button at top-right of card. Names truncate cleanly with `text-overflow: clip` (since `data-overflow` is set) and animate via `ftreeNameMarquee` keyframes on card hover.



---

## 🔒 LOCKED 2026-05-25 — Assets & Liabilities page patterns

User confirmation: "запомни го това в дизайн системата" (Violetka 2026-05-25).
Source: XD inspector specs delivered live during build of `assets.html`.

### Assets/Liabilities Twin Tile (`.aa-mini-tile`)
Used on Assets & Liabilities page below the Net Worth card.
Two stacked tiles — Assets (left) and Liabilities (right).

```css
.aa-mini-tile {
    width: 290px;
    height: 120px;
    background: rgba(255,255,255,0.30);    /* Default — translucent */
    border: 1px solid #FFFFFF;
    border-radius: 30px;
    box-shadow: 0px 10px 30px #00000029;
    backdrop-filter: blur(10px);
    opacity: 1;
    transition: none;                       /* XD: Duration 0s — instant */
}
.aa-mini-tile:hover,
.aa-mini-tile:active {
    background: #FFFFFF;                    /* Hover-Tap-Hold — solid white */
}
```

**XD interaction spec (verbatim):**
- Trigger: Hover
- Action: Transition
- Destination: State: Hover-Tap-Hold
- Animation: Auto-Animate
- Easing: None
- **Duration: 0 s** ← `transition: none` in CSS

### Net Worth bar — `.vault-bar` + `.vault-bar-seg`
XD spec ("bar net"):
- W: 477, **H: 8**, border-radius: **10px** (fully rounded pill)
- Background: `#61C553` (canonical green)
- Inner shadow: `inset 0px 1px 0px #FFFFFF47` ← **hex alpha 0x47 = 28% white**
  (NOT 47% — common confusion; `#FFFFFF47` = `rgba(255,255,255,0.278)`)
- Drop shadow: `0px 0px 6px #61C55380` ← **NO spread** (just blur)
- `--seg-glow: ${color}80` per segment (color at hex alpha 0x80 ≈ 50%)
- `.vault-bar { overflow: visible }` — so seg radius + glow can escape
- ALL segments fully rounded (`border-radius: 10px`) — each is its own pill

### Status dot color — BRAND PURPLE-BLUE
`.ai-status-dot` is `#667EEA` with soft glow `0 0 6px rgba(102,126,234,0.6)`.
Was green `#61C553` — changed for consistent AI brand cue with the attach-badge.
Green remains semantic for "alive" / "success" only.

### Task bullet dot — ALWAYS BLACK
`.task-pad .task-dot { background: #000000 !important }` everywhere — overrides
the inline `style="background:#FF2D55"` etc. in markup. Priority color stays
ONLY on the `.priority-bar` (thin left edge).

### Recent Activity / Documents — "Invisible Circle Reveals on Hover"
`.activity-pad`:
- Default: bare icon, NO background, NO border, NO shadow on `.act-icon`
- Hover: `.hover-circle` 50×50 fades to `opacity: 0.5` (white circle), `.hover-bar` (3px black, 40h) appears on left edge
- Per XD inspector: `background: #FFFFFF; opacity: 0.5`

### % superscript — universal
Any percentage display (`.dir-progress-value`, `.cat-percent`, `.aaht-percent`,
`.pa-pct`) auto-wraps the `%` sign in `<sup>` via JS. CSS sup styling:
`font-size: 0.7em; vertical-align: top; line-height: 1`.
Per XD inspector "Format: Superscript".

### Marquee-on-Hover pattern — universal
Auto-tagged elements: `.task-label`, `.act-title`, `.person-name`, `.dd-title`,
`.ee-row-title`, `.ee-row-value`, `.dir-card-name`. JS sets `--marquee-distance`
to actual overflow distance. Hover triggers `paMarqueeSlide` keyframe:
- 0–8% pause at start
- 42–58% pause at end (full text visible)
- 92–100% pause back at start
- Cycle: 6s, ease-in-out, 0.4s start delay
- Respects `prefers-reduced-motion`

### Button hover transitions — 0.3s (was 0.6s)
Send + Attach buttons (`.ai-send`, `.ai-attach`):
- bg/border/shadow: 0.3s ease-out (was 0.6s — felt slow)
- transform: 0.15s ease-out
- PNG icon crossfade: 0.3s ease-out
- Attach SVG color: 0.2s ease-out

### Pattern Recognition Protocol — confirmed
All patterns above followed the protocol: identify in XD → check vs LOCKED
patterns → apply 1:1 → confirm with user → lock in DESIGN_SYSTEM_LIVE.md.



---

## 🔒 LOCKED 2026-05-25 — Analytics Tool Canonical (`.vault-header`)

Used on EVERY page with an analytics tool: Family Tree, Assets &
Liabilities, Vault, and all future analytics sections. The XD inspector
specs below are CANONICAL — same values everywhere.

### Tab row (`.vault-header-tabs > .vault-htab`)

```css
/* Container */
.vault-header-tabs {
    display: flex;
    align-items: baseline;       /* Active 20/24 + inactive 14/17 share baseline */
    gap: 20px;                    /* XD: Assets@807 - NetWorth-end@787 */
    margin-bottom: 30px;
}

/* Inactive tab */
.vault-htab {
    font: normal normal 400 14px/17px 'Inter', sans-serif;
    color: #000000;
    opacity: 1;
    transition: none;             /* XD: Duration 0s, Easing None */
    cursor: pointer;
}

/* Active tab */
.vault-htab.active {
    font: normal normal 600 20px/24px 'Inter', sans-serif;
}
```

### XD-confirmed coordinates (1920 canvas)
- **"Net Worth"** (active): top: 130, left: 690, W: 97, H: 24 — Inter 600 20/24
- **"Assets"** (inactive): top: 135, left: 807, W: 44, H: 17 — Inter normal 14/17
- Gap = 807 − (690+97) = **20px**
- Baseline alignment: both texts settle on the same visual baseline despite
  different sizes (active text is taller but starts higher → baselines line up)

### Interaction state (per XD inspector)
- Trigger: **Hover**
- Action: Transition
- Destination: State: Hover-Tap-Hold
- Animation: Auto-Animate
- Easing: **None**
- Duration: **0 s** (instant snap — `transition: none` in CSS)

### Anti-patterns
- ❌ Hover changing opacity (only switches active class)
- ❌ Transition >0s (XD strict: instant snap, no easing)
- ❌ Different font/size per analytics-tool instance — these values apply UNIVERSALLY


---

## 🔒 LOCKED 2026-05-25 — TOGGLE PATTERNS (universal)

Per Violetka 2026-05-25 "всички toggles в системата трябва да имат
дизайн като тук — разстояния, шрифтове, логика, дизайн на линните %".
There are TWO canonical toggle patterns. EVERY toggle across the platform
must follow ONE of them — no inventing per-page variants.

### A) Analytics Tool Tab Group (3-tab "title-like" pattern)

Used where one tab becomes the SECTION TITLE and the others are
navigational. Examples: Net Worth / Assets / Liabilities,
Family Tree / Network / Timeline, Vault category tabs.

```css
.vault-header-tabs {
    display: flex;
    align-items: baseline;       /* active 20/24 + inactive 14/17 share baseline */
    gap: 20px;                    /* canonical — strict */
    margin-bottom: 32px;          /* gap to metric/content below */
}
.vault-htab {                    /* inactive */
    font: normal normal 400 14px/17px 'Inter', sans-serif;
    color: #000000;
    opacity: 1;
    transition: font-size 0.3s ease-out, font-weight 0.3s ease-out, line-height 0.3s ease-out;
    cursor: pointer;
}
.vault-htab:hover {              /* Hover-Tap-Hold = preview of active */
    font-weight: 600;
}
.vault-htab.active {
    font: normal normal 600 20px/24px 'Inter', sans-serif;
}
```

Key rules:
- Baseline alignment (active is bigger but baseline matches inactive)
- Gap **20 px** between every pair
- Hover triggers font-weight preview to 600 (smooth 0.3 s ease-out)
- Active = SemiBold 20/24, inactive = Regular 14/17
- Color always #000, opacity always 1 (no fading)
- Transition: smooth 0.3 s on size + weight + line-height

### B) Two-State Pill Toggle (segmented control)

Used for binary view filters. Examples: List View / All Active.

```css
.profile-tabs {
    /* PAD container */
    width: 320px;                          /* XD canonical */
    height: 60px;                          /* XD canonical */
    background: rgba(255,255,255,0.45);    /* translucent */
    border: 1px solid #FFFFFF;
    border-radius: 30px;
    box-shadow: 0px 10px 30px #00000029;
    backdrop-filter: blur(10px);
    display: flex; position: relative;
}
.profile-tab {
    flex: 1 1 0;                           /* split 50/50 — each half 160 wide */
    height: 60px;
    padding: 0;
    font: normal normal 400 16px/20px 'Inter', sans-serif;
    color: #000;
    display: flex; align-items: center; justify-content: center;
    gap: 20px;                              /* icon → text */
    cursor: pointer;
    transition: font-weight 0.3s ease-out;
}
.profile-tab:hover { font-weight: 600; }
.profile-tab.active { font-weight: 600; }
.profile-tabs-pill {                      /* the sliding white half */
    position: absolute; top: 0; left: 0;
    height: 60px;
    background: #FFFFFF;
    border-radius: 30px;
    box-shadow: 0px 4px 12px rgba(0,0,0,0.08);
    transition: left 0.3s ease-out, width 0.3s ease-out;
}
.pt-icon {
    flex-shrink: 0;
    width: 20px;                            /* List icon: 20×14 */
    height: 14px;
    /* Grid icon: 20×20 — overridden per-icon class */
    margin-right: 20px;                    /* canonical icon→text gap */
}
```

Key rules:
- Pad: 320×60, translucent rgba(255,255,255,0.45), radius 30, shadow + blur
- Active pill: 160×60 solid white, slides via JS `positionAaPill()`
- Both halves: icon + label inline, 20 px gap between
- Hover-Tap-Hold = weight preview to 600
- Active = SemiBold; inactive = Regular
- Color #000 always; opacity 1 always
- Pill transition: 0.3 s ease-out (left + width)

### Where to apply (existing + future):
- ✅ Assets/Liabilities analytics (LOCKED)
- ✅ Family Tree analytics (already follows A — confirm and align if needed)
- ✅ Family pages (Members / Network / Timeline) — follows A
- ✅ Vault category tabs — follows A
- 🔄 Profile page tabs (Overview / Documents / Album / Life Story) — should align with A
- 🔄 Person record tabs — should align with A
- 🔄 Any future filter toggles — pick A (3+ tabs) or B (2 tabs)

### Anti-patterns
- ❌ Custom font sizes per-page toggle (always 14/17 ↔ 20/24 for A, 16/20 for B)
- ❌ Different gaps (always 20 px for A's between-tabs, B's icon→text)
- ❌ Color tint changes on hover (only weight changes)
- ❌ Opacity fades (always op 1; size/weight do the work)
- ❌ Transitions other than 0.3 s ease-out
- ❌ Pill in solid bg pad (translucent pad + solid pill for contrast — never solid on solid)

---

## 🔒 LOCKED 2026-05-25 — Asset/Liability Tile Card (`.aa-tile`)

**FINAL LOCKED SPEC (Violetka 2026-05-25 — "запомни това са падовете за дефолд и хожер - така са в дизайн системата"). XD inspector confirmed both states share identical CSS export properties; only the XD Background Blur Fill Opacity varies between states — XD does not export that value to CSS, so we encode it as `background: rgba(255,255,255,X)` in CSS.**

**Identical between Default and Hover (per XD CSS export):**
- `width: 290px; height: 192px`
- `border: 1px solid #FFFFFF`
- `border-radius: 25px`
- `box-shadow: 0px 10px 30px #00000029`
- `opacity: 1`
- `backdrop-filter: blur(10px)` + `-webkit-backdrop-filter: blur(10px)`

**Varies between states (XD Background Blur → Fill Opacity):**
- **Default** state Fill Opacity → `background: rgba(255,255,255,0.33)` (translucent glass, matches `.ee-person-card` summary-card level)
- **Hover-Tap-Hold** state Fill Opacity 80% → `background: rgba(255,255,255,0.80)` (mostly opaque, still slightly translucent)
- Transition: `background 0.2s ease-out`

**Three distinct hover affordances on the same card:**
1. Hover ANYWHERE on tile EXCEPT dots-zone → bg `0.33 → 0.80` (whole tile lightens)
2. Hover ONLY on the dots-zone (50×50 invisible hit area around ⋯) → bg STAYS at `0.33`, ONLY dots opacity raises `0.3 → 1` (target is the dots specifically, not the tile)
3. Dropdown open → bg STAYS at `0.33`, dots locked at opacity `1`

The dots-zone hit-test exclusion is implemented via `:has()`:
```css
.aa-tile:hover                          { background: rgba(255,255,255,0.80); }
.aa-tile:has(.aa-tile-menu:hover)       { background: rgba(255,255,255,0.33); }
.aa-tile.is-options-open                { background: rgba(255,255,255,0.33); }
.aa-tile-menu::before                   { /* invisible 50×50 hit zone, centered on dots */ }
```

### Dimensions
- Width: 290 px
- Height: 192 px
- Border-radius: 25 px (corner radius — not 30 like full glass pads)
- Border: 1 px solid `#FFFFFF`
- Box-shadow: `0px 10px 30px #00000029`
- Backdrop-filter: `blur(10px)`
- Overflow: `visible` (so the Options dropdown can extend past the tile bottom into the grid below)

### Two-layer rendering stack
1. **Tile background:** `rgba(255, 255, 255, 0.30)` — translucent glass, ALWAYS ON in every state
2. **`::before` top highlight gradient:** 50% height, `linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0) 100%)`, border-radius `25 25 0 0` — gives glassmorphic depth, ALWAYS ON

NO `::after` white overlay. NO hover-to-white state transition. The pad is glass at every state — Default, Hover, Options-open, Favorite, Archived.

```css
.aa-tile {
    position: relative;
    width: 290px;
    height: 192px;
    background: rgba(255,255,255,0.30);
    border: 1px solid #FFFFFF;
    border-radius: 25px;
    box-shadow: 0px 10px 30px #00000029;
    backdrop-filter: blur(10px);
    overflow: visible;     /* dropdown extends past tile bottom */
    cursor: pointer;
}
.aa-tile::before {  /* top highlight — always on */
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 50%;
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0) 100%);
    border-radius: 25px 25px 0 0;
    pointer-events: none;
    z-index: 0;
}
/* NO ::after — tile pad never turns solid white. */

/* All children sit above the gradient */
.aa-tile-top, .aa-tile-avatar, .aa-tile-info,
.aa-tile-footer, .aa-tile-options, .aa-tile-star { z-index: 2; }

/* Dots menu — only DIRECT hover on the dots raises opacity to 1.
   Tile pad hover does NOT trigger this. */
.aa-tile-menu { opacity: 0.3; transition: opacity 0.3s ease-out; }
.aa-tile-menu:hover { opacity: 1; }
.aa-tile.is-options-open .aa-tile-menu { opacity: 1; }  /* stays at 1 while open */
```

### Internal layout (absolute positions from tile origin)
- **Top row (status dot + Active + ⋯):** `top: 20`, `left/right: 16` (flex space-between)
  - Status dot 8×8 `#61C553`
  - "Active" Inter 400 10/12 `#61C553`
  - Dots-menu 13×3, opacity 0.3 default → 1 on tile hover (Hover-Tap-Hold)
- **Avatar (two-circle):** `top: 42 left: 6` outer 80×80 white@33%, inner ::before 60×60 solid white (10 px each side)
- **Info column:** `top: 72 left: 96 right: 16`
  - Name: Inter 600 16/20 #000, ellipsis on overflow
  - Subcategory: Inter 400 12/15 #000 opacity 0.5, margin-top 5
- **Footer strip (Value/Balance):** `top: 132`, full-width 290×40, solid `#FFFFFF`, padding `0 16`, flex space-between
  - Label: Inter 400 12/15 #000 opacity 0.5
  - Amount: Inter 600 16/20 #000 right-aligned
- **20 px gap** below footer strip to tile bottom (172 → 192)

### Star (Favorite) variant — `.aa-tile-starred` or `.aa-tile-star`
- Red 5-point star (placeholder ★ character or PNG `img/star.png` + @2x)
- Color `#FF2D55`
- Appears to the LEFT of the status pill in the top row when present

### Options dropdown (state: `.is-options-open`) — LOCKED 2026-05-25

**XD inspector spec:** canvas `top: 692 left: 800 width: 150 height: 270`. Anchor tile is at canvas (660, 702), so the dropdown lives at tile-local:
- `top: -10` (extends 10 px ABOVE the tile top)
- `right: 0` (right-aligned with tile right edge)
- `width: 150` × `height: 270`
- Requires `.aa-tile { overflow: visible }` so the panel can escape the tile vertically (both above the top and below the bottom into the next grid row)

## 🔒 UNIVERSAL CANONICAL — ALL Dropdown Menu Pads (`.doc-dropdown`)

**Violetka 2026-05-25 LOCKED:** "ето това е - навсякъде това е подложката за тези менута" — THIS is the canonical pad for ALL dropdown menus across the entire platform.

### The 7 values
```css
.<any-dropdown-menu-pad> {
    position: fixed;                                   /* MUST be fixed, NOT absolute */
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid #FFFFFF;
    border-radius: 25px;
    box-shadow: 0px 10px 20px #00000014;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}
```

### The critical implementation detail — APPEND TO BODY
The dropdown MUST be appended to `document.body` (via JS) on open, NOT rendered as a child of a backdrop-filtered element. If the dropdown lives inside a parent that has its own `backdrop-filter` (e.g. `.aa-tile`), the child's blur sees the parent's already-filtered output instead of the page, and the frosted-glass effect degrades to "white-transparent overlay". By appending to `<body>` and using `position: fixed`, the dropdown's `backdrop-filter` sees the clean page background and produces the proper "diffuse outlines but no readable detail" effect.

### Reference implementations
- **`.doc-dropdown`** — Photo Dots Menu (Change Photo / Reposition / Delete Photo) on profile records — the original canonical
- **`.aa-tile-options`** — Asset / Liability tile Options menu (Favorite / Share / Archive / Delete) — uses the SAME 7 values + body-append strategy

### Item row pattern (`.dd-row` / `.aa-tile-opt`) — also universal
- Flex row, 50 tall, `justify-content: flex-end`
- Label: `margin-right: 5px → 15px` on hover (text pulls 10 px LEFT, transition `0.2s ease-out`)
- Icon container: 50×50 with `::before` pseudo creating the white hover circle (`opacity: 0 → 1`, transition `0.2s ease-out`)
- Both animations fire together as one combined motion

### Failed iterations — DO NOT REPEAT
- `rgba(0.45)` — too see-through, panel reads as hollow
- `rgba(0.80)` — too solid, kills the glass effect
- `rgba(0.33) + blur(10)` from sidebar — too see-through for menu use
- `rgba(0.5) + blur(30) saturate(180%)` — over-frosted
- `rgba(0.7) + blur(40)` — looks white-transparent, not frosted (visible text bleed)
- Anything with the dropdown as a child of `.aa-tile` (or any backdrop-filtered parent) — breaks the glass effect

**Rule of thumb:** Before building any new dropdown menu, check `.doc-dropdown` and use those 7 values + the body-append strategy. No exceptions, no reinvention.

**Dots indicator at top of panel** — mirrors the tile's own dots-menu visually (the panel "replaces" the tile dots as the active surface). Same 13×3 SVG. Position panel-local `top: 34 right: 24`, color `#000` opacity `1` (active state, dropdown open).

**Menu items** — use the canonical `.dd-row` pattern from the design system (Violetka 2026-05-25 "ти трябва да вземеш от дизайн системата ни — когато в оптион меню ховърна върху бутон — излиза кръг за иконата но и текста се отмества"). This pattern is shared with `.doc-dropdown` (Change Photo / Reposition / Delete Photo menu).

**Structure per row (4 items: Favorite / Share / Archive / Delete):**
```html
<button class="aa-tile-opt">
    <span class="aa-tile-opt-label">Favorite</span>
    <span class="aa-tile-opt-icon"><svg>...</svg></span>
</button>
```

**Layout (flex row, NOT absolute positioning):**
- `display: flex; align-items: center; justify-content: flex-end`
- `height: 50px`
- Items stack vertically in the panel's flex column

**Label behavior — `margin-right` animates on hover (canonical `.dd-row-label`):**
```css
.aa-tile-opt-label {
    font: normal 12px/15px 'Inter';
    color: #000;
    margin-right: 5px;                    /* default: 5 px gap to icon */
    transition: margin-right 0.2s ease-out;
}
.aa-tile-opt:hover .aa-tile-opt-label {
    margin-right: 15px;                   /* hover: pulls text 10 px LEFT */
}
```

**Icon — `::before` pseudo creates the white hover circle (canonical `.dd-row-icon`):**
```css
.aa-tile-opt-icon {
    position: relative;
    width: 50px; height: 50px;
    display: flex; align-items: center; justify-content: center;
}
.aa-tile-opt-icon::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 50px; height: 50px;
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s ease-out;
}
.aa-tile-opt:hover .aa-tile-opt-icon::before { opacity: 1; }
.aa-tile-opt-icon svg { position: relative; z-index: 1; }
```

**The hover effect is TWO simultaneous animations:**
1. White circle reveals around icon (`opacity: 0 → 1` via `::before`)
2. Label shifts 10 px to the LEFT (`margin-right: 5 → 15`)

Both transitions are `0.2s ease-out` so they animate together as one smooth interaction.

**Panel layout — `padding: 10px 0` + flex column. Trigger row at top mirrors the tile's ⋯ position:**
- Trigger row: 50 tall, holds the dots indicator at right (panel-local right:0)
- 4 × `.aa-tile-opt` rows: each 50 tall
- Total: 10 (top pad) + 50 (trigger) + 4×50 (items) + 10 (bottom pad) = 270 ✓

**Icon assets — IMPORTANT distinction:**
- The on-disk `img/share.svg`, `img/trash.svg` have `stroke="#fff" opacity="0.5"` because they're shared with the dark-bar `.emc-menu` context. Here on a LIGHT glass dropdown, we need black icons.
- Solution: inline SVG paths extracted from those files, with `stroke="#000"` and `opacity="1"` baked in. See `SVG_FAVORITE`, `SVG_SHARE`, `SVG_ARCHIVE`, `SVG_DELETE` constants in `paAaTileMenu` (`_shared.js`).
- `img/archive.svg` already has `stroke="#000"` — could be used as `<img>` directly, but for consistency we inline all 4.

**Padding & spacing:**
- Panel padding: `70px 24px 30px` (top extra to leave room for dots header, sides 24, bottom 30)
- Content height after padding: 270 - 70 - 30 = 170 px
- 4 items distributed evenly via `justify-content: space-between` ≈ 42 px per item

**Close triggers:**
- ESC key
- Click outside the panel (anywhere not inside `.aa-tile-options` or `.aa-tile-menu`)
- Click on another tile's dots-menu (closes any other open dropdown first)

**State while open:**
- Tile pad: **stays translucent** (NO white overlay, NO bg shift)
- Tile dots-menu: opacity 1 (locked while open)
- Dropdown panel: fades in via `opacity 0 → 1` over 0.3 s ease-out

### Anti-patterns
- ❌ Don't add a white-overlay `::after` and trigger it on `:hover` or `.is-options-open` — the tile pad is ALWAYS translucent (Violetka 2026-05-25 explicit correction)
- ❌ Don't trigger the dots-menu opacity from tile hover (`.aa-tile:hover .aa-tile-menu`) — ONLY direct hover on the 13×3 dots themselves raises opacity to 1
- ❌ Don't change radius on hover (25 stays 25)
- ❌ Don't transition the tile background — it's static glass
- ❌ Don't put status text or amount inside the `::before` zone (z-index 0) — children must use z-index 2
- ❌ Don't use a separate hover-only border class — border 1 px white is always on
- ❌ Don't redraw the dots SVG per-tile — single canonical 13×3 SVG with 3 circles
- ❌ Don't approximate the avatar — use the canonical Two-Circle Avatar Pattern (80/60, 33%/100%)
- ❌ Don't use `overflow: hidden` on `.aa-tile` — the Options dropdown must extend past the tile bottom into the grid below

### Where to apply
- ✅ Assets All Active grid view (LOCKED)
- ✅ Liabilities All Active grid view (same pattern, swap label/colors)
- 🔄 Vault item grids (when built) — follow this pattern
- 🔄 Any future record-card grid — follow this pattern

### Favorite state — `.aa-tile-starred` (LOCKED 2026-05-25, XD inspector spec)

User-supplied XD inspector spec:
- Star: 12 × 12 at canvas (676, 924) → tile-local (16, 20)
- Green dot: 8 × 8 at canvas (702, 926) → tile-local (42, 22)
- "Active" text: at canvas (716, 924) → tile-local (56, 20), Inter 10/12 #61C553
- Gap star ↔ dot = 14 px (14 = 702 - 676 - 12)
- Gap dot ↔ text = 6 px (6 = 716 - 702 - 8) — canonical, inside `.aa-tile-status`

**Top-row layout (works for both Default + Favorite tiles)**
```css
.aa-tile-top {
    position: absolute;
    top: 20px; left: 16px; right: 16px;
    display: flex; align-items: center;
    gap: 14px;          /* XD spec — between star ↔ status pill */
    z-index: 3;
}
.aa-tile-menu { margin-left: auto; }   /* pushes dots to right edge */
```
- Removes `justify-content: space-between` (which would put Active in the middle and break star+status grouping).
- `margin-left: auto` on the dots-menu handles right-alignment regardless of how many siblings precede it (Default = 1 sibling status pill, Favorite = 2 siblings star + status).

**Star indicator — XD-supplied solid red PNG (`img/star-favorite.png`)**
```html
<span class="aa-tile-star" aria-label="Favorite"></span>
```
```css
.aa-tile-star {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
    background-image: image-set(
        url('img/star-favorite.png') 1x,
        url('img/star-favorite@2x.png') 2x);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 12px 12px;
}
```

**Two star assets — strict disambiguation:**
- `img/star.png` + `@2x` → **outline** 5-point star, BLACK STROKE. Used ONLY in the Options dropdown as the "Favorite" action icon (representing the action of favoriting).
- `img/star-favorite.png` + `@2x` → **solid filled** red 5-point star, 12×12. Used ONLY on the tile top-row as the favorite-state indicator (representing "this tile IS favorited").
- NEVER swap them. Outline = action button. Solid = state indicator.

**Toggle behavior (JS):** clicking "Favorite" in the Options dropdown calls `toggleFavorite(tile)` which:
1. If `.aa-tile-star` exists in `.aa-tile-top` → remove it + remove `.aa-tile-starred` class
2. Else → insert SVG star as `.aa-tile-top.firstChild` + add `.aa-tile-starred` class

The class is informational/styling-hook only; the actual visual state lives in the presence of the star markup itself.

### Archived state — `.aa-tile.is-archived` (LOCKED 2026-05-25 — "идеално, запомни това")

**Trigger:** click `Archive` in the Options dropdown. **Reverse:** click `Unarchive` (same dropdown item, label swaps based on state).

**Tile visual changes** (all transitions `0.2s ease-out`):
| Element | Active | Archived |
|---|---|---|
| Status text | "Active" green `#61C553` | "Archived" orange `#FF9500` |
| Status dot | green `#61C553` | orange `#FF9500` |
| Avatar (2-circle) | opacity 1 | opacity 0.4 |
| Name + subcategory | opacity 1 | opacity 0.4 |
| Footer (Value/Balance + amount) | opacity 1 | opacity 0.4 |
| Favorite star (if any) | opacity 1 | opacity 0.4 — but see auto-clear rule below |

**Status text JS spec (Violetka 2026-05-25 XD):**
- Position: canvas top:712 left:690 (relative to tile-local 16, 20 — same row as Active)
- Color: `#FF9500`
- Font: Inter 10/12 normal, letter-spacing 0
- Status dot: 8×8, bg `#FF9500`, at canvas top:714 left:676 (= tile-local 22, 16)

**Auto-clear favorite rule (locked):**
When a tile is archived, the favorite star is automatically removed. Archived items CANNOT be favorited — Archive wins. Implemented in `toggleArchive(tile)` — checks `aa-tile-starred` first and calls `toggleFavorite(tile)` before applying `is-archived`. Reverse (Unarchive) does NOT auto-restore the favorite; user must re-favorite manually if desired.

**Dropdown panel transformation (`.aa-tile-options.is-archived`):**
- **Panel height:** 270 → **170** (XD spec: top:692 left:800 width:150 height:170). Math: 10 (top pad) + 50 (trigger) + 2×50 (items) + 10 (bottom pad) = 170.
- **Hidden items:** `Favorite`, `Share` (`display: none`) — archived items can't be favorited or shared
- **Visible items:** `Archive` slot + `Delete`
- **Archive slot label:** text swaps `"Archive"` (black, action) → `"Unarchive"` (orange `#FF9500`, action verb). Matches existing platform pattern — `/^(Archive|Unarchive)$/` regex used by entry-row dropdowns. Past-tense "Archived" was tested and rejected as confusing — action verb is clearer.
- **Archive slot icon:** inline SVG (black stroke 1.5) → `img/archive-orange.png` (20×18, XD-supplied asset). Retina `@2x` variant auto-loaded on 2× displays.
- Label color override: `.aa-tile-options.is-archived .aa-tile-opt[data-opt="archive"] .aa-tile-opt-label { color: #FF9500 }`

**Asset naming convention (LOCKED):**
- `img/archive.svg` — outline black-stroke 1.5 action icon (default state)
- `img/archive-orange.png` + `@2x` — XD-supplied pre-colored orange variant (archived state, locked 2026-05-25 "ето иконата оранжева от менюто когато е архивирана")
- `img/unarchive.svg` — exists but unused in tile dropdown context (orange stroke variant, used elsewhere); kept for compat with other dropdowns

**State transition diagram:**
```
[Active]           Click Archive          [Archived]
 ┌─ Favorite                              ┌─ Unarchive (orange)
 ├─ Share          ─────────────►         └─ Delete
 ├─ Archive
 └─ Delete         Click Unarchive
                   ◄─────────────
```

If tile was favorited at moment of Archive:
```
[Active + Favorited]    ──Archive──►     [Archived]    (star auto-removed)
```

---

## Accordion Sub-Row Pad Transparency Pattern — LOCKED 2026-05-26

**Source of truth:** Violetka 2026-05-26 video reference from XD — "когато се отвори сабкатегорията цвета изчезва както при entry row, ако го отвориш". Same UX language as entry rows in Profile.

**Where it applies:**
- `.aa-sec-subcat` (subcategory rows inside expanded `.aa-sec` — Bank Accounts, Investments, Retirement Accounts, etc.)
- Universal for any future two-level accordion where a section has sub-rows that themselves open/close.

**Behavior:**
| State | Background | Visual |
|---|---|---|
| **Closed** | `rgba(255,255,255,0.5)` | Visible white pad (full card width edge-to-edge, 60 px tall) |
| **Open** | `transparent` | No pad — content sits directly on parent card background |

**Transition:** `background 0.3s ease-out` — pad fades in/out smoothly when the row opens or closes.

**Why:** when a sub-row opens, its tile grid + "+ Add X" button + any internal content needs to read against the parent section card's gradient surface, not against an extra white plate. The 0.5 pad is only there to delineate CLOSED rows from each other when stacked.

**Inter-row spacing:** `.aa-sec-subcat-list { gap: 2px }` — 2 px gap between rows shows the parent card gradient through. The list itself breaks out of `.aa-sec` 30 px padding via `margin-left/right: -30px` so pads reach card edges (per XD canonical "left:660 width:600" → full card width).

**CSS (locked):**
```css
.aa-sec-subcat {
    background: rgba(255,255,255,0.5);
    transition: background 0.3s ease-out;
}
.aa-sec-subcat.is-open {
    background: transparent;
}
```

**Files where used:** `_shared.css` `.aa-sec-subcat` block.

**Universal rule:** any future two-level accordion (sections → sub-rows) follows the same logic. Do not invent a new pattern.

---

## Canonical "+ Add X" Inline Button — LOCKED 2026-05-26

**Source of truth:** Violetka 2026-05-26 — "бутоните също трябва да са канонични... имаш иконите имаш всичко - това си е в дизайн системата не си измисляй бутони". Pattern was already established as `.lsc-add-inline-btn` (Life Status Card) per `feedback_add_new_inline_btn_pattern` memory.

**Where it applies:**
- "+ Add Bank Account" / "+ Add Investment" / "+ Add Medication" / "+ Add Contact" / "+ Add Phone" / "+ Add Email" / "+ Add Spouse" / any "+ Add X" inline trigger inside a card body.
- NOT for primary CTA buttons (those use a different canonical pattern — `.ei-save-btn-wrap` etc.).

**Structure (locked HTML):**
```html
<button class="aa-sec-add-btn" type="button">
    <span class="aa-sec-add-btn-icon">
        <img src="img/plus-circle.png" alt="" width="20" height="20">
    </span>
    <span>Add Bank Account</span>
</button>
```

**Visual breakdown:**
| Element | Default | Hover |
|---|---|---|
| Outer wrap (`.aa-sec-add-btn`) | `display:flex`, `height:60px`, `width:fit-content`, transparent | (no change) |
| Icon circle (`.aa-sec-add-btn-icon`) | 60×60, `border-radius:50%`, `background:transparent` | `background:#FFFFFF` (solid white) |
| Plus icon (`img`) | 20×20 `img/plus-circle.png` (centered, `z-index:1`) | (no change — sits on top of the white circle) |
| Text label (`<span>`) | Inter 600 14/17, `#000`, sits flush against icon | `transform:translateX(10px)` — shifts +10 px right |

**Transition:** `background 0.2s ease-out` on the circle + `transform 0.2s ease-out` on the text. Both animate together when the button is hovered.

**Pattern name in CSS:** `.aa-sec-add-btn` (Assets & Liabilities context) — but the visual contract is identical to `.lsc-add-inline-btn` (Life Status). Future "+ Add X" buttons in new contexts can reuse either class or introduce a new namespaced one as long as the contract matches.

**CSS (locked):**
```css
.aa-sec-add-btn {
    display: flex;
    width: fit-content;
    align-items: center;
    gap: 0;
    height: 60px;
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    cursor: pointer;
    font: 600 14px/17px 'Inter', sans-serif;
    color: #000;
}
.aa-sec-add-btn-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s ease-out;
    position: relative;
}
.aa-sec-add-btn:hover .aa-sec-add-btn-icon { background: #FFFFFF; }
.aa-sec-add-btn-icon img {
    width: 20px;
    height: 20px;
    display: block;
    position: relative;
    z-index: 1;
}
.aa-sec-add-btn > span:last-child {
    transition: transform 0.2s ease-out;
}
.aa-sec-add-btn:hover > span:last-child { transform: translateX(10px); }
```

**Assets (locked):**
- `img/plus-circle.png` — 20×20 black-stroke outline plus inside a circle
- `img/plus-circle@2x.png` — retina variant (auto-loaded on 2× displays)

**Anti-patterns (do NOT do):**
- ❌ Custom 40×40 glass-fill circle with own background
- ❌ Inline SVG plus icon — use `img src="img/plus-circle.png"`
- ❌ Different hover colors (must be solid `#FFFFFF`, no glass, no opacity)
- ❌ Different text shift (must be `+10 px`)
- ❌ Different transition duration (must be `0.2s ease-out`)
- ❌ Reinventing the wrapper as a `div` with onclick — use `<button type="button">` for semantic correctness

**Files where used:** `_shared.css` `.aa-sec-add-btn` block + `.lsc-add-inline-btn` block (same contract, different namespace).

**Rule:** Before adding any new "+ Add X" trigger, check this pattern first. Never invent a new button shape. If the design requires a variant, document it here first and get confirmation.

---

## Section Accordion Card Geometry — LOCKED 2026-05-26

**Source of truth:** Violetka 2026-05-26 measurement overlay screenshots from XD + "трябва да са с точната големина на картите в My Profile - 600 на 113 пиксела". Same dimensions as Profile `.accordion-section` (canonical card pattern).

**Where it applies:**
- `.aa-sec` (Assets/Liabilities section accordion — Financial Accounts, Crypto & Blockchain, Real Estate, Vehicles, Digital & Online, Personal Property, Business Interests, Intellectual Property, Other)
- Universal contract for any future top-level accordion card on a value-tracking page.

**Canonical dimensions (collapsed state):**
| Property | Value |
|---|---|
| Width | **600 px** (fixed) |
| Height | **113 px** (fixed — `height: 113px` + `box-sizing: border-box`) |
| Border-radius | 30 px |
| Padding | 30 px all sides |
| Background | `var(--card-bg-default)` = `rgba(255,255,255,0.12)` |
| Border | `1 px solid var(--card-border)` = `#FFFFFF` |
| Box-shadow | `var(--card-shadow)` = `0px 10px 30px #00000029` |
| Backdrop-filter | `blur(10px)` |
| Inter-card gap | 10 px (via `.aa-section-list { gap: 10px }`) |

**Open state:**
- `height: auto` (content-driven — title + value/balance row + description + subcategory rows + info box)
- Same width, padding, border, background, shadow, blur
- `::before` gradient extends from 50% (collapsed) to 670 px (open) — same Profile `.accordion-section.open` pattern
- 0.3 s ease-out transition on `height`

**Internal layout (XD measurement overlay):**
| Element | Spec | Position |
|---|---|---|
| **Title** | 600 20/24 Inter, `#000` opacity 1 | 30 from card top + 30 from card left (line-box bottom at 54 from top) |
| **Chevron** | 8×4 `img/drop-arrow.png` (asset swap → `drop-arrow-active.png` on `.is-open`) | 40 from card top (vertically centered on title), 30 from card right edge |
| **Value/Balance summary row** | `display: flex; align-items: center; gap: 20px; margin-top: 10px` | Row top 64 from card top (= 30 + 24 + 10 — gap title bottom ↔ row top is **10 px**) |
| **Section dot** | 8×8 solid colour per category (Financial #AF52DE, Crypto #6366F1, Real Estate #3B82F6, Vehicles #22C55E, Digital #FBBF24, Personal Property #F97316, Business #EF4444, IP #DC2626, Other #9CA3AF) | Aligned with row start, 30 from card left |
| **"Value/Balance:" label** | `400 14/17 Inter`, `#000` opacity 0.5 | 20 px right of dot |
| **Value €X,XXX** | `600 20/24 Inter`, `#000`, `text-align: right`, `margin-left: auto` | Right edge 30 from card right edge |

**Hover (collapsed only):**
- `.aa-sec::after { opacity: 0 → 1 }` — entire card surface becomes solid `#FFFFFF` (Profile `.accordion-section:hover::after` pattern)
- 0.2 s ease-out

**Open state visual:** `::before` gradient height grows to 670 px, `::after` stays at 0 (no hover overlay over open card). Background base remains glass 0.12.

**CSS (locked):**
```css
.aa-sec {
    position: relative;
    width: 600px;
    background: var(--card-bg-default);
    border: 1px solid var(--card-border);
    border-radius: 30px;
    box-shadow: var(--card-shadow);
    backdrop-filter: blur(10px);
    padding: 30px;
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;
    transition: padding 0.2s ease-out, height 0.3s ease-out;
}
.aa-sec:not(.is-open) {
    height: 113px;       /* Fixed collapsed height — matches Profile .accordion-section */
}
.aa-sec-title {
    font: normal normal 600 20px/24px 'Inter', sans-serif;
    color: #000;
}
.aa-sec-summary {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 10px;   /* Gap title bottom ↔ summary row top */
}
.aa-sec-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--aa-sec-color);   /* per-category color */
}
.aa-sec-label {
    font: normal normal 400 14px/17px 'Inter', sans-serif;
    color: #000;
    opacity: 0.5;
}
.aa-sec-value {
    margin-left: auto;
    font: normal normal 600 20px/24px 'Inter', sans-serif;
    color: #000;
    text-align: right;
}
```

**Files where used:** `_shared.css` `.aa-sec` block (Assets/Liabilities); same contract as `.accordion-section` (Profile).

**Anti-patterns:**
- ❌ Reinventing card dimensions (must be 600×113 collapsed)
- ❌ Using a different bg opacity than 0.12 in collapsed (it's the canonical Profile value)
- ❌ Larger gap than 10 between title and summary row (32 was wrong — superseded 2026-05-26)
- ❌ Solid white open background (must stay glass with extended ::before gradient — matches Profile)
- ❌ Different inter-card gap than 10 px

**Universal rule:** any future accordion card on a value-tracking page (Liabilities, Vault summary, etc.) reuses this exact geometry. Don't invent variants.

---

## Centerpiece "Add X" Button — LOCKED 2026-05-26

**Source of truth:** Violetka 2026-05-26 — "това е и бутона за Add Family or Add Contact - каноничен е". Universal pattern for the BIG centered "+ Add Asset" / "+ Add Family Member" / "+ Add Contact" buttons sitting at the bottom of a grid/list. NOT the same as the inline "+ Add X" pattern (which is the small `60×60` invisible-circle inline button used inside expanded subcategories).

**Where it applies (current):**
- `.aa-add-cta` (Assets/Liabilities) — "Add Asset" / "Add Liability"
- Family — "Add Family Member" (bottom of My Family list)
- Network — "Add Contact" (bottom of My Network list)
- Any future "section-end add" trigger (Pets, Letters, Vault items, etc.)

**Structure (locked HTML):**
```html
<div class="aa-add-cta">
    <h3 class="aa-add-cta-title">Add Asset</h3>
    <div class="aa-add-cta-line">
        <button class="aa-add-cta-btn" type="button" aria-label="Add Asset">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                 stroke="#000" stroke-width="1.5" stroke-linecap="round"
                 stroke-linejoin="round">
                <line x1="10" y1="4"  x2="10" y2="16"/>
                <line x1="4"  y1="10" x2="16" y2="10"/>
            </svg>
        </button>
    </div>
</div>
```

**Visual breakdown (default state):**
| Element | Spec |
|---|---|
| **Title** ("Add X") | `600 20/24 Inter`, `#000`, centered, `margin-bottom: 10 px` |
| **Outer circle** | 80×80, `border-radius: 50%`, `background: rgba(255,255,255,0.33)` |
| **Inner circle** (`::before`) | 40×40, solid `#FFFFFF`, centered in outer via `translate(-50%, -50%)` |
| **Plus icon** | 20×20 SVG (or `img/plus.png`), `opacity: 0.16` |
| **Dashed lines** (`::before` + `::after`) | each 150 px wide, `2px dashed #000`, `opacity: 0.16`, **10 px gap** from outer circle on each side |

**Hover state:**
| Element | Default → Hover |
|---|---|
| Inner circle | 40×40 → **60×60** (grows to fill more of outer 80 pad) |
| Plus icon | opacity 0.16 → **1.0** (fully visible) |
| Outer 80×80, dashed lines, title | unchanged |
| Transition | `0.2s ease-out` on both width/height (inner) + opacity (plus) |

**Math for dashed line positioning (so any reuse keeps the 10 px gap):**
- Outer radius = 40 (since outer is 80 wide)
- Gap = 10 → line start at 50 from button center
- Line width = 150 → line ends at 200 from button center
- `::before` (left line) → `left: 50%; margin-left: -200px;` (from -200 to -50)
- `::after` (right line) → `left: 50%; margin-left: +50px;` (from +50 to +200)

**CSS (locked, reusable):**
```css
.aa-add-cta {
    text-align: center;
    margin-top: 40px;
    padding-bottom: 30px;
}
.aa-add-cta-title {
    font: normal normal 600 20px/24px 'Inter', sans-serif;
    color: #000;
    letter-spacing: 0;
    margin: 0 0 10px;
    text-align: center;
}
.aa-add-cta-line {
    position: relative;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.aa-add-cta-line::before,
.aa-add-cta-line::after {
    content: '';
    width: 150px;
    border-top: 2px dashed #000;
    opacity: 0.16;
    position: absolute;
    top: 50%;
    transform: translateY(-1px);
}
.aa-add-cta-line::before { left: 50%; margin-left: -200px; }
.aa-add-cta-line::after  { left: 50%; margin-left:  50px;  }
.aa-add-cta-btn {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(255,255,255,0.33);
    border: 0;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease-out;
    position: relative;
}
.aa-add-cta-btn::before {
    content: '';
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #FFFFFF;
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.2s ease-out, height 0.2s ease-out;
}
.aa-add-cta-btn svg,
.aa-add-cta-btn img {
    position: relative;
    z-index: 1;
    width: 20px;
    height: 20px;
    opacity: 0.16;
    transition: opacity 0.2s ease-out;
}
.aa-add-cta-btn:hover::before { width: 60px; height: 60px; }
.aa-add-cta-btn:hover svg,
.aa-add-cta-btn:hover img { opacity: 1; }
```

**Anti-patterns:**
- ❌ Different title font (must be 600 20/24 Inter — NOT Source Serif 4, NOT 24/33)
- ❌ Single-circle button (must be 2-circle: outer 80 @ 0.33 + inner 40 solid)
- ❌ Plus icon at full opacity by default (must be 0.16 default → 1 on hover)
- ❌ Dashed lines flush against outer circle (must have 10 px gap)
- ❌ Different line opacity than 0.16 (consistent across platform)
- ❌ Different hover bump than 40→60 (don't use 50 — too subtle)
- ❌ Reusing the inline `.lsc-add-inline-btn` / `.aa-sec-add-btn` pattern here (those are for INLINE adds, not centerpieces)

**Rule:** every "Add X" centerpiece at the bottom of a list/grid uses THIS pattern. Title font + spacings + dashed-line gaps are universal across Family, Network, Assets, Liabilities, Pets, Letters, and any future similar context.
