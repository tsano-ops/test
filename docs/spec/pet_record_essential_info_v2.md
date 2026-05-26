# Card I — Essential Information (Pet Record)

**Source:** User-provided spec, May 2026
**Location in product:** Me, My Family & My Network → My Family → Pets → Pet Record → Overview Tab → Card 1
**Title:** Essential Info
**Subtitle:** Identity & key details
**Record applies to:** Enzo (id: `enzo`) and any future pet records

---

## Narrative
> All key identity details and important documents for your pet can be found here. No more searching through folders, vet emails or paper booklets — everything you need is easy to find when it matters. A complete record helps caregivers, vets and future guardians quickly access the right information to keep your pet safe, healthy and well supported at every stage of life.

---

## Field-by-field (Pet variation)

| Field | Type | Required? | Notes |
|-------|------|-----------|-------|
| Avatar + Photo + Life Status Dot | Visual | — | Same canonical pattern as Family Member |
| **Pet Name** | Single text input | ✅ Required | 1–80 chars; no emojis in stored SSOT |
| **Species** | Dropdown (single) | ✅ Required | Dog / Cat / Bird / Parrot / Horse / Rabbit / Hamster / Guinea Pig / Turtle / Fish / Snake / Lizard / Ferret / Other (free text 1–60 chars when Other) |
| **Breed** | Text input or searchable dropdown | Optional | Only after Species selected; cleared on Species change; max 60 chars |
| **Timeline in Our Family** | Conditional date fields | Optional | "Joined Our Family" + canonical 3-part picker; family-history timeline (not biological) |
| **Notes & Instructions** | Free text | Optional | Free-form context, preferences, instructions |
| **Sex** | Optional | Optional | Replaces "Gender" terminology for pet records |
| **Date of Birth** | Canonical 3-part picker (Year/Month/Day) | Optional | Age auto-calculated; same display as Family Member ("Jan 05, 1991") |
| **Place of Birth** | Text | Optional | Only shown when **Deceased** (per spec) |
| **Life Status** | Radio | Required | Living / Deceased / Unknown — same canonical pattern as Family Member |
| **Document Entries** (sub-section) | Card section | — | List of pet identity / travel / ownership docs (passport, microchip cert, insurance) |

---

## Key differences from Family Member Essential Info

1. **Species** replaces "Citizenship" + "Country of Residence" (pets don't have legal nationality in plan logic)
2. **Sex** replaces "Gender" (pet-appropriate terminology)
3. **No Relationship Type / Specific Role** section (pet's relationship to PlanOwner is implicit; guardian can be set in care-continuity workflow but not in EI card)
4. **Timeline in Our Family** is a NEW field type — a "Joined Our Family" date; replaces partnership-timeline / adoption-date logic
5. **Place of Birth** shown ONLY when deceased (vs. always shown for family members)
6. **No "former" status** (pets don't become "ex" — only Living/Deceased/Unknown)

---

## Pet-specific Tasks & Reminders triggered from this card
- Vaccinations
- Microchip renewal
- Insurance renewal
- Pet passport expiry
- Vet check-up cycle (species-specific)

## Memorial Tab activation
When Life Status = Deceased → Memorial Tab visible (same trigger pattern as Family Member)

---

## Implementation status
- ☑ peopleStore enrichment for `enzo`: `breed`, `microchipId`, `primaryVet`, `vetPhone`, `guardianContact`
- ☐ Pet-specific EI fields in record.html (Species dropdown / Breed / Sex / Timeline in Our Family)
- ☐ Hide Citizenship + Country of Residence rows when `categories.includes('pet')`
- ☐ Hide Relationship Type + Specific Role section for pet records
- ☐ Place of Birth conditional on Deceased

## Implementation plan
This Pet variation is implemented AFTER the Family Member EI is fully working (Death Info Block, Relationship Type+Role complete). Then we add a `body.pa-pet-record` class flag and CSS rules to:
- Hide `[data-pa-not-pet]` elements (Citizenship/Residence/Relationship)
- Show `[data-pa-pet-only]` elements (Species/Breed/Timeline in Our Family)

Rather than a separate `record-pet.html`, the same `record.html` handles all variations via CSS class gates — single source of truth for design.
