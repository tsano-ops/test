# PlanAfter Person Records — Comprehensive Build Plan

**Source of Truth specs:**
- `2.2_family_member_record_v2_FULL.md` — Family Member spec
- `pet_record_essential_info_v2.md` — Pet variation
- `2.4_network_contact_record.md` — Network role spec
- `3.5_memorial_page_prd.md` — Memorial tab

**Constraint:** ZERO new design — only canonical PlanAfter components from `_shared.css`.

---

## 1. Current State Audit (May 2026)

### What works ✅
- record.html = full clone of profile.html (3982+ lines)
- View-as-person bootstrap (peopleById('sj') monkey-patch returns viewed person)
- peopleStore enriched: 14 persons with `gender`, `placeOfBirth`, `citizenships`, `lifeStatus`, full death info for 3 deceased, pet-specific fields for Enzo, professional fields for 2 network roles
- Photo sync universal (applyPlanOwnerPhoto + paSyncPersonAvatars catches `.avatar-plan-owner` / `.plan-owner-photo` / `[data-person-id="sj"]` / `#ftreeSarahAvatar`)
- Life Status radio (Living/Deceased/Unknown) under Gender — canonical .ei-radio-group pattern
- Death Information Block: empathy banner (.ee-upload-callout) + canonical 3-part DoD picker (.ei-dob-row clone) + Place/Cause/Burial/Notes — all canonical
- Relationship Type + Specific Role markup added (.lsc-edit-rolelayer1-picker / .lsc-edit-rolelayer2-host) — needs wire-up testing
- entriesStore: 30 realistic entries with canonical ANEF_CONDITIONAL labels (Education / Employment / Medical / Beliefs)
- paInjectEntryRowFromStore + paRenderOverviewEntriesForPerson — entries inject into Overview cards
- paUpdateAllEmptyStates re-runs after injection so empty-state hides when entries exist

### What's missing ❌
| Priority | Item | Spec |
|---|---|---|
| P0 | **Family & Relationships card render** with derived Layer 2 (perspective-aware) | 2.2.3 |
| P0 | **Bidirectional relationship sync** (mutate one → reverse link auto-updates) | 2.2.3.2 |
| P0 | **Layer 3 Timeline Conditional Dates** (Marriage / Divorce / Adoption / Joined Our Family) | 2.2.3.1 table |
| P1 | **Memorial tab visibility** when deceased | 2.2.4 |
| P1 | **Pet variation** (Species / Breed / Sex / Joined Our Family; hide Citizenship/Residence/Relationship) | pet spec |
| P1 | **Network Access Level** field for executor / lawyer roles | 2.4 |
| P2 | Smart Gender autofill (Husband → Male) — partly done, needs full table | 2.2.3 |
| P2 | Smart role transformation (Husband ↔ Ex-Husband on group change) | 2.2.3 |
| P2 | Tier A auto-create (Husband on John ↔ Wife on Sarah) | 2.2.3.2 |
| P2 | Tier B auto-suggest with prompt | 2.2.3.2 |
| P2 | Sibling type confirmation prompt | 2.2.3.2 |
| P3 | Family Tree perspective-aware (centered on viewed person) | tree spec |
| P3 | 4 summary card variants (Header / Linked / Extended / Compact) | 3.x |
| P3 | Solid/dashed/half line styles in tree | tree spec |
| P3 | Three view modes — Tree / Members / Timeline | tree spec |

---

## 2. Architectural decisions

### 2.1 — Single record.html for ALL person types
DON'T fork into record-family.html / record-pet.html / record-network.html. Instead:
- ALL person types use record.html
- Body class flags drive visibility:
  - `body.pa-record-view` (always when viewing non-Sarah)
  - `body.pa-deceased` (when lifeStatus='Deceased')
  - `body.pa-record-pet` (when categories.includes('pet'))
  - `body.pa-record-network` (when categories.includes('network'))
- CSS rules: `.pa-record-pet [data-pa-not-pet] { display: none }` etc.
- Single source of truth = peopleStore + bootstrap

### 2.2 — Layer 2 is DERIVED at render time, never stored as anchor's role from another perspective
Storage model: relationship is a directed edge `{toId, type}` where `type` is Layer 1 (system: 'spouse', 'child', 'parent', 'sibling', 'grandparent', 'pet-of').

Derived Layer 2 mapping (per spec table):

```
function deriveLayer2(viewedPerson, otherPerson, edgeType) {
    // edgeType = "this person's relationship FROM viewedPerson's perspective"
    // Examples (from John's record):
    //   { toId: 'sj', type: 'spouse' } + Sarah(F) → "Wife"
    //   { toId: 'em', type: 'child' } + Emma(F) → "Biological Daughter" (default)
    //   { toId: 'li', type: 'child' } + Liam(M) → "Biological Son"

    const otherG = otherPerson.gender || '';
    switch(edgeType) {
        case 'spouse':
            return otherG === 'Female' ? 'Wife'
                 : otherG === 'Male'   ? 'Husband'
                 : 'Spouse';
        case 'former-spouse':
            return otherG === 'Female' ? 'Ex-Wife'
                 : otherG === 'Male'   ? 'Ex-Husband'
                 : 'Former Spouse';
        case 'child':
            // Default biological — can be upgraded to Step / Adopted later via flag
            return otherG === 'Female' ? 'Biological Daughter'
                 : otherG === 'Male'   ? 'Biological Son'
                 : 'Child';
        case 'parent':
            return otherG === 'Female' ? 'Biological Mother'
                 : otherG === 'Male'   ? 'Biological Father'
                 : 'Parent';
        case 'sibling':
            return otherG === 'Female' ? 'Biological Sister'
                 : otherG === 'Male'   ? 'Biological Brother'
                 : 'Sibling';
        case 'grandparent':
            return otherG === 'Female' ? 'Biological Grandmother'
                 : otherG === 'Male'   ? 'Biological Grandfather'
                 : 'Grandparent';
        case 'grandchild':
            return otherG === 'Female' ? 'Biological Granddaughter'
                 : otherG === 'Male'   ? 'Biological Grandson'
                 : 'Grandchild';
        case 'pet-of':   return 'Owner / Guardian';
        case 'guardian': return 'Guardian';
        default: return otherPerson.role || 'Family Member';
    }
}
```

In-law derivation (NOT in stored edges; computed from spouse's relationships):
- Spouse's parent → "Mother-in-Law" / "Father-in-Law"
- Spouse's sibling → "Sister-in-Law" / "Brother-in-Law"

### 2.3 — One renderer for ALL summary cards
`paRenderLinkedSummaryCard(person, options)` produces the same .lsc-* markup with:
- options.density: 'compact' | 'default' | 'extended' | 'header'
- options.deriveRoleFor: viewedPersonId (so Layer 2 derives correctly per perspective)
- options.actions: ['open', 'updateRelationship', 'updateLifeStatus', 'addFamily']

This single function powers Family & Relationships card cells AND family tree nodes AND ee-person-card on entries — same data, same look.

### 2.4 — Memorial tab visibility
`body.pa-deceased` toggles `.profile-tab-memorial` visibility:
```css
.profile-tab-memorial { display: none; }
body.pa-deceased .profile-tab-memorial { display: inline-flex; }
```

### 2.5 — Pet variation
peopleStore[X].categories.includes('pet') → bootstrap adds `body.pa-record-pet`. CSS:
```css
.pa-record-pet [data-pa-hide-on-pet] { display: none; }
.pa-record-pet [data-pa-pet-only] { display: ... }
```
Mark: Citizenship, Country of Residence, Relationship Type/Specific Role rows with `data-pa-hide-on-pet`. Add Species/Breed/Joined Our Family rows with `data-pa-pet-only`.

---

## 3. Implementation order (next sessions)

### Session 1 — THIS TURN
✅ **Save this plan to docs**
🔨 **Execute P0 #1: Family & Relationships card with derived Layer 2**
- Add `paDeriveLayer2(viewed, other, edgeType)` to _shared.js
- Add `paGetRelationshipsForPerson(personId)` that walks peopleStore (own.relationships + reverse-lookup) and returns array of `{ person, edgeType, derivedLayer2, isInLaw }`
- Render Family & Relationships card on record.html — for each related person, output Linked Summary Card pattern
- Test on `?id=jj` (John): should show Sarah (Wife) + 4 children + Mary/Robert (in-laws)

### Session 2
🔨 **P0 #2: Bidirectional relationship sync**
- When user picks Layer 1 + Layer 2 on John's record → write to John's relationships array AND inverse edge to Sarah's relationships
- When user changes Layer 2 from "Husband" → "Ex-Husband" → flip both records simultaneously
- Tier A auto-create

### Session 3
🔨 **P0 #3: Layer 3 Timeline Conditional Dates**
- Per spec table: Marriage Date for Husband/Wife, Adoption Date for Adopted, Joined Our Family for Pet, etc.
- Reuse the canonical 3-part date picker (paInjectDatePicker — generic version)
- Save dates on the relationship edge (so they appear identically from both sides)

### Session 4
🔨 **P1: Memorial tab + Pet variation + Network Access Level**

### Session 5+
🔨 **P2 / P3 items**

---

## 4. Per-person data verification matrix (DONE column = ready to display)

| ID | Name | Role | Status | Photo | EI fields | Death info | Relationships defined |
|----|------|------|--------|-------|-----------|------------|----------------------|
| sj | Sarah | Plan Owner | Living | ✅ | ✅ | n/a | 12 |
| jj | John | Husband | Living | ✅ | ✅ | n/a | 5 |
| em | Emma | Daughter | Living | ✅ | ✅ | n/a | 2 |
| li | Liam | Son | Living | ✅ | ✅ | n/a | 2 |
| ls | Lisa | Daughter | Living | ✅ | ✅ | n/a | 2 |
| no | Noah | Son | Living | ✅ | ✅ | n/a | 2 |
| ms | Mary | Mother | Living | ✅ | ✅ | n/a | 3 (sj + jds + jsm) |
| rs | Robert | Father | Living | ✅ | ✅ | n/a | 2 (sj + bw) |
| enzo | Enzo | Pet | Living | ✅ | ✅ + pet fields | n/a | 2 |
| jd | Jack | Ex-husband | Living | ✅ | ✅ | n/a | 1 |
| jds | Jane Doe Smith | Grandmother | **Deceased** | ✅ | ✅ | ✅ | 2 |
| jsm | John Smith | Grandfather | **Deceased** | ✅ | ✅ | ✅ | 2 |
| bw | Ben White | Grandfather | **Deceased** | ✅ | ✅ | ✅ | 2 |
| drwhite | Dr. Emily White | Executor | Living | ✅ | ✅ + professional | n/a | 0 (network) |
| mdavis | Mark Davis | Lawyer | Living | ✅ | ✅ + professional | n/a | 0 (network) |

All 15 records ready for rendering. Now we build the renderers.
