# PlanAfter — Records System Architecture

> Master reference for how every Record (PlanOwner, Family Member, Pet, Network Contact) is structured, created, related, and rendered. All record-related work in the prototype must follow this spec.

## Core principle: Single Source of Truth (SSOT)

A **Record** is the single authoritative data object representing one real-world entity (person, pet, asset). All information about that entity is:
- stored once
- governed by clear ownership rules
- edited only inside the Record
- referenced everywhere else via **read-only Summary Card projections**

> A Summary Card exists somewhere ⇔ a Record exists for that entity. No summary card owns data.

---

## Record Types

| Type | Location | Spec ref |
|------|----------|----------|
| **PlanOwner Record** (My Profile) | Me, My Family & My Network → My Profile | §2.1 |
| **Family Member Record** | Me, My Family & My Network → My Family → [category] | §2.2 |
| **Pet Record** (subcategory of Family Member) | My Family → Pets | §2.3 |
| **Network Contact Record** | Me, My Family & My Network → My Network | §2.4 |

PlanOwner is the legal anchor of the whole account graph — KYC verification, jurisdiction, inheritance engine all derive from it.

---

## Standard structure of every record

### 1. Header (always-visible top section)
The "business card" of the record: identity + status + access. Identical logic across all record types (PlanOwner adds KYC layer).

**Elements:** Back button, Avatar, Life Status dot, Full Legal Name, Breadcrumb, Specific Role, Relationship Timeline (conditional), DOB+Age, DOD (conditional), Role in Your Plan, Shared With avatars.

**Action sidebar:**
- Add Family (User+) → opens Quick Add Family form
- Update Life Status (rosette) → Living/Deceased/Unknown modal
- Share Record (curved arrow) → permissions modal
- Download PDF (tray) → generates PDF
- Delete Record (×) → confirmation modal

### 2. Tabs
| Tab | PlanOwner | Family | Pet | Network |
|---|---|---|---|---|
| Overview | ✓ | ✓ | ✓ | ✓ |
| Document Entries | ✓ | ✓ | ✓ | ✓ |
| Album / Media Files | ✓ | ✓ | ✓ | – |
| Life Story | ✓ | ✓ | – | – |
| Memorial (when deceased) | ✓ | ✓ | ✓ | ✓ |

### 3. Cards (Overview tab) — the only place data is created/edited

**Personal records (PlanOwner / Family Member):**
1. 🟩 Essential Info — core identity
2. 🟧 Contact Info — email, phone, address, social
3. 🟦 Family & Relationships — structure, partners, children
4. 🔴 Medical Info — health records
5. 🟣 Education — qualifications, certificates
6. 🟫 Employment & Affiliations — work history, memberships
7. 🟨 Beliefs, Hobbies & Interests — values, interests
8. 🔵 Roles & Access in Your Plan — executor/beneficiary/contributor
9. 🟢 Tasks & Reminders — renewals, follow-ups
10. 🟫 Shared With — visibility & permissions

**Pet record cards:** Essential Info / Contact Info (vet, groomer, sitter) / Medical Info / Routines & Care Instructions / Tasks & Reminders / Shared With.

**Network Contact cards:** Essential Info / Contact Info / Roles & Access / Tasks & Reminders / Shared With.

---

## Summary Card variants (read-only projections)

| Card | Density | Purpose |
|---|---|---|
| **Record Header Summary Card** | High | Full identity + lifecycle context (only when record is open) |
| **Linked Summary Card** | Medium | Recognition & navigation (default elsewhere) |
| **Expanded Linked Summary Card** | Medium+ | Inline-expand to show contact info |
| **Compact Linked Summary Card** | Low | Structural visualization (Family Tree, dense lists) |

**Rules:** No summary card owns data. Specific Role (Layer 2) is always the visible truth. Same record → same data → everywhere.

---

## Relationship engine — system rules

### 1. Bidirectional relationships
Creating a link from A → B auto-creates the inverse on B. Same relationship, displayed differently from each side's perspective.

Example:
- From Maria's record: "Your Biological Son" [Peter]
- From Peter's record: "Peter's Biological Mother" [Maria]

### 2. Three layers
- **Layer 1: Relationship Type** — system classification (Parent, Child, Sibling, Spouse, Pet). Edit Mode only.
- **Layer 2: Specific Role** — user-facing term (Mother, Daughter, Husband, Aunt). Always displayed.
- **Layer 3: Timeline** — conditional dates (marriage, civil partnership, divorce, etc.). Adaptive precision (Day/Month/Year, Month/Year, or Year-only).

### 3. Recalculation tiers
- **Tier A (auto-create, no confirmation):** logically certain (e.g., Husband ↔ Wife).
- **Tier B (auto-suggest, requires confirmation):** plausible but not guaranteed (e.g., spouse-of-parent → step-parent? bio? adoptive?).

### 4. Children: spouse-aware capture, never assumed
When the anchor adds a child + already has a spouse → child is added to spouse's record AND user is prompted: bio / adoptive / step. Until answered, treated as "needs clarification."

### 5. Siblings: prompt for type
Initial sibling link is generic "Sibling — needs clarification" → user prompted later for biological / half / step.

### 6. Conflict handling
Block impossible states (two current spouses in monogamous mode). Upgrade specificity as data accumulates (Sibling → Half → Full once parents are added).

---

## Family Tree visualisation

**PlanOwner-anchored** view of the family graph. Generations:
- Children appear above PlanOwner
- Parents appear below
- Grandparents further below
- Partner alongside

**Quick Add (from tree):** Only direct connections to PlanOwner — Parent, Child, Sibling, Partner. Extended relatives (cousins, aunts, grandparents) require their connecting node first.

**Visual conventions:** solid line = biological, dashed = step, distinct style = half. Hovering a member highlights the path back to PlanOwner.

**Three views:** Family Tree / Family Members (list) / Timeline.

---

## Relationship categories (Family Member roles)

| Group | Type | Specific Role | Timeline fields |
|---|---|---|---|
| Immediate / Spouses | Husband, Wife, Partner, Civil Partner, Fiancé/e | – | Relationship Start, Marriage/Civil/Engagement Date |
| Extended / Former Partner | Ex-Husband, Ex-Wife, Former Partner | – | Start, Marriage, Divorce / End |
| Immediate / Children | Bio Son/Daughter, Step-, Adopted | – | Step → Relationship Start; Adopted → Adoption Date |
| Immediate / Parents | Bio Mother/Father, Adoptive, Step- | – | Adoptive → Adoption Date; Step → Relationship Start |
| Immediate / Siblings | Bio, Half, Step- (Brother/Sister) | – | Step → Relationship Start |
| Extended / Grandparents | Bio, Step, Adoptive Grand-mother/father | – | Step/Adoptive → Relationship Start |
| Extended / Grandchildren | Bio, Step, Adoptive Grandson/daughter | – | Step/Adoptive → Relationship Start |
| Extended | Aunt, Uncle, Cousin, Niece, Nephew, In-Law | – | In-Law → Relationship Start |
| Pets | Dog, Cat, Bird, Parrot, Horse, Rabbit, Hamster, Guinea Pig, Turtle, Fish, Snake, Lizard, Ferret, Other | – | Joined Our Family |

---

## Creation methods (cross-cutting)

1. **Onboarding placeholders** — system creates skeleton records based on user answers ("How many children?" → N empty Child records).
2. **Manual creation:**
   - Add Family button (Header of any record)
   - Family & Relationships card
   - My Family page (+ Add Family Member)
   - Family Tree (+ on a node)
   - Link Record flow
3. **Auto-suggestions:** uploading a child's medical doc → "Create record for this child?"; mentioning a guardian in a Will → prompt to create.

---

## Action menu patterns

### Plan Owner card (in lists/tree)
- Add Family

### Living family member
- Update Relationship → Essential Info / Edit Mode / Role in Your Life
- Add Family → Quick Add flow
- Update Life Status → Essential Info / Edit Mode / Life Status (Deceased opens Unified Death Block)

### Pet
- Update Life Status only

---

## Implementation notes for prototype

- All records live in `window.peopleStore` (already scaffolded in `_shared.js`).
- Each record has `id`, `name`, `role`, `photo`, `dob`, `alive`, `relationships[]`, `categories[]`, `sharedTo[]`.
- Render functions read from peopleStore — `renderFamilyList`, `renderNetworkList`, `renderFamilyTree`, `renderSharedTo`, `renderHeader`.
- Bidirectional relationships handled in a single `addRelationship(fromId, toId, type)` that writes both sides.
- Layer 2 Specific Role computed dynamically from anchor's perspective (e.g., "Aunt" when viewing from grandchild's record, "Daughter" when viewing from grandmother's).
- Document Preview owner-identity reads `peopleById(record.ownerId)`.
- Add Family form pushes new entry into peopleStore + triggers re-render across all attached views.

---

## Source
This spec was provided in full by the user (Violetka) on 2026-04-26 and represents the canonical Records architecture for PlanAfter. Last sections cover Pet Records and Network Contact Records — same logic, fewer cards.
