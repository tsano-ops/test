# 2.4. NETWORK CONTACT RECORD — Updated Specification

**Source:** Original spec 2.4 + decisions made during 2026-05-11 implementation session with Violetka.
**Status:** Locked. Implemented in `html-prototype/record.html` + `html-prototype/_shared.js` + `html-prototype/_shared.css`.

---

## 2.4.1. Introduction (unchanged)

**Record Type:** Network Contact Record
**Location:** Me, My Family & My Network → My Network
**Purpose:** Dedicated, secure space for capturing the people who meaningfully support the PlanOwner's life — beyond their family circle (friends, advisors, neighbours, doctors, teachers, colleagues, caregivers).

---

## 2.4.2. Creation Methods (unchanged)

- Manual creation from My Network page ("+ Add New Contact")
- From inside other records
- From tasks / instructions / workflows
- From document linking (Quick Add)
- Lightweight creation panel in Dashboard / Legal flows / Health flows / Post-Loss Support
- Auto-suggestion when system detects new person references

---

## 2.4.3. System Role & Relationship Logic

### Role in Your Life (Layer 1) — UPDATED 2026-05-11

**Executor was REMOVED** from Layer 1 options because Executor is a **PLAN ROLE** (lives in Roles & Access card), not a **LIFE ROLE**.

**Final Layer 1 options:**

```
Friend · Business Partner · Doctor · Therapist · Lawyer ·
Accountant · Financial Advisor · Insurance Broker · Personal Banker ·
Colleague · HR Contact · Teacher · Caregiver · Mentor · Neighbor · Other
```

### "Other" Cascading Behavior — NEW 2026-05-11

When user selects "Other" in Layer 1, a free-text input field appears below the picker for them to specify the custom role type (e.g. "Yoga Teacher", "Childhood Friend"). The input is hidden by default and only shows when `Layer 1 === 'Other'`.

### Role in Your Plan (handled in Roles & Access card, NOT Essential Info)

Plan Roles are independent from Life Roles. Examples: Executor, Contributor, Beneficiary, Not assigned.

### Relationship Logic (unchanged)

Network Contacts:
- Do NOT appear in the Family Tree
- Have no biological / legal family relationship edges
- Can convert into a Family Member Record if needed
- Can be tagged in documents, flows, tasks, memories, shared access

---

## 2.4.4. My Network Record Structure — UPDATED

### Header (Part I — see Header spec below)

### Tabs (3 total)

| Tab | Visible | Notes |
|-----|---------|-------|
| **Overview** | ✅ always | Default tab |
| **Documents** | ✅ always | Centralized document entries view |
| **Memorial** | ✅ when deceased | Only revealed when `lifeStatus = Deceased` |
| ~~Album~~ | ❌ hidden | Not used on Network records |
| ~~Life Story~~ | ❌ hidden | Not used on Network records |

### Cards (5 total — final list)

| # | Card | Subtitle |
|---|------|----------|
| 1 | **Essential Info** | Identity & key details |
| 2 | **Contact Info** | Key contact details |
| 3 | **Roles & Access in Your Plan** | Roles and access permissions |
| 4 | **Tasks & Reminders** | Planning, coordination & follow-ups |
| 5 | **Shared With** | Who can access this record and what they can see |

### Cards HIDDEN on Network records (vs Family Member)

- ❌ Family & Relationships (no biological/legal edges)
- ❌ Medical Info (medical details live in their own work organisation, not user's plan)
- ❌ Education
- ❌ Employment & Affiliations
- ❌ Beliefs, Hobbies & Interests
- ❌ Routines & Care Instructions (pet-only)

---

## 🟩 ESSENTIAL INFO Card — FINAL Field Spec (Network)

### Narrative
> Keeping this information organised here helps ensure smooth coordination, clearer communication, and fewer uncertainties whenever this person appears in tasks, documents, or future workflows.

### Visible Fields (Read & Edit mode synchronized)

| # | Field | Type | Required | Notes |
|---|-------|------|----------|-------|
| 1 | **Photo** | Image + status dot | Optional | Initials fallback. Green = Living, Red = Deceased, Gray = Unknown |
| 2 | **First Name** | Text input | ✅ Required | Tooltip: "The first name as it should appear across your plan and any linked items." |
| 3 | **Middle Name** | Text input | Optional | Tooltip: "Optional. Useful when initials or middle names matter in legal documents." |
| 4 | **Family Name** | Text input | ✅ Required | Tooltip: "The family name as it should appear across your plan and any linked items." |
| 5 | **Relationship Type (Layer 1)** | Dropdown | ✅ Required | Options listed above. "Other" reveals cascading "Specify Type" input |
| 6 | **Specify Type** (cascading) | Text input | ✅ Required (if Layer 1=Other) | Hidden until Layer 1 = "Other" |
| 7 | **Specific Role (Layer 2)** | Free-text input | Optional | E.g. "Estate Planning Solicitor" / "Cardiologist" |
| 8 | **Relationship Timeline (Layer 3)** | Optional dates | Optional | "Known since…", "Service started…", custom anchor dates + per-date notes |
| 9 | **Date of Birth** | Y / M / D pickers | **❌ NOT required on Network** | Per Header 1.6 spec |
| 10 | **Organisation** | Text input | Optional | E.g. "Davis & Co. Solicitors", "City General Hospital" |
| 11 | **Professional Title** | Text input | Optional | E.g. "Partner, LL.M.", "Senior Cardiologist" |
| 12 | **Notes** | Multi-line textarea | Optional | Universal field — context, preferences, shared history |
| 13 | **Life Status** | Radio (Living/Deceased/Unknown) | ✅ Required | **Default: Living** when record created |

### Fields REMOVED from Essential Info on Network

- ❌ **Gender** — Not relevant for professional contacts
- ❌ **Place of Birth** — Not relevant
- ❌ **Citizenship(s)** — Not relevant
- ❌ **Country of Residence** — Not relevant
- ❌ **Access Level in Plan** — Moved to **Roles & Access in Your Plan** card
- ❌ **Role in Your Plan** (Executor/Contributor/Beneficiary) — Moved to **Roles & Access in Your Plan** card / **Header**

### Deceased State — ALL Death Info hidden on Network

When `lifeStatus = Deceased` on a Network record, the following Essential Info fields **stay hidden**:
- ❌ Date of Death
- ❌ Place of Death
- ❌ Cause of Death
- ❌ Burial / Cemetery Location
- ❌ Death Additional Notes

Only the **Memorial tab** and **Post-Loss Support** workflows become active — the Essential Info card itself remains identity-focused.

### Edit/Read Mode Parity

Edit mode shows the **same fields** as Read mode (no extra/missing fields between modes). Both modes adapt identically to `.pa-record-network` body class.

---

## 🎨 Plan-Strip Banner — Network Variant

| Property | Value |
|----------|-------|
| **Color** | Violet `#9B6FE8` (CSS class `.plan-gift`) |
| **Header text** | "Gift [Name] a PlanAfter trial" |
| **Title** | "3 Months Free" |
| **Subtitle** | "No payment required during trial" |
| **CTA button** | "Send Gift" |
| **Footer** | "PlanAfter · Gift Plan" |

(For comparison: Plan Owner uses blue `#007AFF` Allianz Insurance. Family Member uses green `#61C553` "Bring [Name] into your plan · Family Plan · 50% off · Add". Pet hides the banner entirely.)

---

## Part I HEADER CARD (NETWORK CONTACT RECORD) — Implementation State

| # | Element | Status |
|---|---------|--------|
| 1.1 | Back button → My Network | ✅ |
| 1.2 | Interactive Avatar (photo or initials + status dot) | ✅ |
| 1.3 | Full Name (First + Family, no Middle in header) | ✅ |
| 1.4 | Breadcrumb "My Network · [Role in Your Life]" | ✅ (e.g. "My Network · Estate Planning Solicitor") |
| 1.5 | Role in Your Life (Layer 1 — Layer 2 combined) | ✅ ("Lawyer — Estate Planning Solicitor") |
| 1.6 | Date of Birth (Age XX) — calculated from today, optional | ✅ |
| 1.7 | Date of Death — conditional, only when Deceased | ✅ |
| 1.8 | Role in Your Plan (Executor / Contributor / Beneficiary) | ✅ |
| 1.9 | Shared To (avatars) | ✅ |
| 1.10 | **Action Sidebar — 4 icons** | ✅ |

### Action Sidebar — Final 4 Icons (no Add Family on Network)

| # | Icon | Hover Label | Action |
|---|------|------------|--------|
| 1 | ♥ heart (green/red/gray) | "Update Life Status" | Opens Life Status modal |
| 2 | ↗ share | "Share This Record" | Opens record-sharing modal |
| 3 | ⬇ download | "Download as PDF" | Generates PDF of record |
| 4 | ✕ delete | "Delete" | Opens destructive-action confirmation modal |

❌ Removed for Network: **Add Family** icon (irrelevant — Network contacts are not family)
❌ Hidden for Network: **Unverified KYC pill** (no identity verification process for network contacts)

---

## Defaults & Validation Rules

| Rule | Value |
|------|-------|
| New Network record default `lifeStatus` | **Living** (changeable by user any time) |
| DoB required on Network? | ❌ No (optional) |
| Citizenship required on Network? | ❌ No (field hidden) |
| Residence required on Network? | ❌ No (field hidden) |
| Layer 1 (Relationship Type) required? | ✅ Yes |
| "Specify Type" required when Layer 1 = "Other"? | ✅ Yes |
| First Name + Family Name required? | ✅ Yes |

---

## Implementation Files

| File | Section |
|------|---------|
| `html-prototype/record.html` | DOM structure + record-init script + applyFamilyMemberSectionSubtitles |
| `html-prototype/_shared.js` | saveEssentialInfo + paUpdateEmptyState + plan-strip context |
| `html-prototype/_shared.css` | `.pa-record-network` rules + `.plan-gift` color token |
| `html-prototype/_data/peopleStore.js` | Network records have `categories: ['network']` |

## CSS Tokens Added

```css
/* New record-type tokens — palette extension 2026-05-11 */
.plan-strip-profile.plan-add-family { background: #61C553; --plan-color: #61C553; }
.plan-strip-profile.plan-gift       { background: #9B6FE8; --plan-color: #9B6FE8; }

/* Hide-on-network gate */
body.pa-record-network .pa-hide-on-network { display: none !important; }
body.pa-record-network .profile-tab.pa-hide-on-network { display: none !important; }
```

---

## Decisions Log (2026-05-11)

| Decision | Rationale |
|----------|-----------|
| Remove Executor from Layer 1 | Executor is a Plan Role, not a Life Role |
| Remove Gender from Network | Not relevant for professional contacts |
| Remove Place of Birth from Network | Not relevant |
| Remove Citizenship/Residence from Network | Not relevant |
| Make DoB optional on Network | Per Header 1.6 — "You don't have to add a date of birth" |
| Add Notes field (universal) | Useful for context across all record types |
| Add Organisation + Professional Title fields (Network only) | Captures professional identity |
| Move Access Level + Plan Role to Roles & Access card | Identity vs Permissions separation |
| Hide all Death Info fields on Network even when Deceased | Only Memorial tab + Post-Loss Support workflow remain |
| Default lifeStatus = Living | User can change any time |
| "Other" Layer 1 → cascading Specify Type input | Allow custom relationship types |
| Plan-strip Gift Plan uses #9B6FE8 violet | Existing palette token, not new color |
