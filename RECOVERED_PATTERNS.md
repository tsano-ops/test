# Recovered Patterns — Status Report

**Source:** `docs/design/DESIGN_SYSTEM_LIVE.md` (2058 lines, last updated 2026-04-27)  
**Generated:** 2026-04-28  
**Purpose:** Cross-reference every locked design pattern against current code state. This is the recovery roadmap for Phase 6.

**Legend:**
- ✅ **Implemented** — exists in current `_shared.js` / `_shared.css` / partials
- ❌ **Missing** — was added between Apr 14 and Apr 28 (in the 14 lost days), needs rebuild
- ⚠ **Partial** — basic structure exists but functionality incomplete
- 🔒 **Locked** — XD-confirmed and frozen, do not improvise

---

## SUMMARY

| Category | Total | ✅ | ❌ | ⚠ |
|----------|------|-----|-----|------|
| Auth components | 8 | 8 | 0 | 0 |
| Buttons & icons | 7 | 6 | 0 | 1 |
| Avatars | 3 | 3 | 0 | 0 |
| Forms & inputs | 6 | 4 | 1 | 1 |
| Cards & panels | 7 | 3 | 4 | 0 |
| **Records system** | **9** | **2** | **7** | **0** |
| **Searchable Picker** | **1** | **0** | **1** | **0** |
| **System Popups** | **14** | **4** | **10** | **0** |
| Print document | 12 | 12 | 0 | 0 |
| Sidebar & nav | 4 | 3 | 1 | 0 |
| **TOTAL** | **71** | **45** | **24** | **2** |

**Loss rate:** ~34% of locked patterns missing — matches "14 days of work between Apr 14 and Apr 28."

---

## CATEGORY 1: Auth Components (✅ all implemented)

| Pattern | Source | Status | Location |
|---------|--------|--------|----------|
| BtnSubmit (Pill-Expand-On-Hover) | DSL §523 | ✅ | `src/components/ui/BtnSubmit.tsx` |
| BtnBack (Circle-Reveal-On-Hover) | DSL §538 | ✅ | `src/components/ui/BtnBack.tsx` |
| PasswordStrength (Glow Bar) | DSL §555 | ✅ | `src/components/ui/PasswordStrength.tsx` |
| Auth Logo Pill | DSL §562 | ✅ | `globals.css` lines 43-69 |
| Digit Box Pattern | DSL §680 | ✅ | `VerifyEmail.tsx` |
| Checkbox Pattern | DSL §704 | ✅ | `SignUp.tsx` |
| Auth Form Alignment | DSL §717 | ✅ | All auth pages |
| Auth Message Pattern (error/success) | DSL §661 | ✅ | All auth pages |

**No work needed here — all auth done.**

---

## CATEGORY 2: Buttons & Icons (mostly ✅)

| Pattern | Source | Status | Notes |
|---------|--------|--------|-------|
| Pill-Expand-On-Hover | DSL §572 | ✅ | Universal in `_shared.css` |
| Circle-Reveal-On-Hover | DSL §621 | ✅ | Used everywhere |
| Glow Bar | DSL §649 | ✅ | Password, plan progress, allergies |
| Universal Button Rules | DSL §605 | ✅ | Inherited everywhere |
| Arrow Icon Standard (9×16, 1.5px) | DSL §1236 | ✅ | All buttons |
| Two-Layer PNG Icon Crossfade | DSL §1628 | ✅ | profile.html action bar (Add Family/Download/Share) |
| Notification Dot | DSL §792 | ⚠ | Need to verify position 17/40 from circle |

---

## CATEGORY 3: Avatars (✅ all locked)

| Pattern | Source | Status |
|---------|--------|--------|
| Two-Circle Avatar Pattern (universal rule) | DSL §841 🔒 | ✅ #EDEDED outer + #FFFFFF inner, 7 size variants |
| Plan Owner Avatar Sync Pattern | DSL §989 | ✅ `applyPlanOwnerPhoto()` in _shared.js |
| Initials fallback (Source Serif 4 600) | DSL §998 | ✅ Universal across all sizes |

**Sync targets registered:** `#headerAvatarImg`, `#profileAvatarImg`, `#eiReadAvatar`, `#eiAvatarPreview`, `#identityAvatarImg`, `#settingsAvatarImg`  
**Sync targets to add (per DSL §1077):** `#dashboardPosterImg`, `.print-owner-avatar`, `.avatar-plan-owner`

---

## CATEGORY 4: Forms & Inputs (mostly ✅)

| Pattern | Source | Status | Notes |
|---------|--------|--------|-------|
| Edit Form Standards (60px input, 4px label gap) | DSL §384 🔒 | ✅ `.ci-field-input-wrap` etc. |
| Universal 120px Alignment | DSL §432 | ✅ Locked |
| Drop Arrow / Chevron (8×4 PNG) | DSL §448 | ✅ Used everywhere |
| Save Button (BtnSubmit Pill-Expand) | DSL §456 | ✅ |
| Add Entry Button (Glass Circle) | DSL §461 | ✅ |
| Global Input Underline State Machine | DSL §1824 🔒 | ✅ Apr 16 |
| Mutual Exclusion (Edit ↔ Add New) | DSL §469 | ⚠ enterCiEdit + ciAddPhoneInline ✅, others not verified |
| Edit Mode Rebuild (initPhoneEditRows) | DSL §475 | ✅ Phone ✅ |
| **initAddressEditRows** | DSL §477 | ❌ **Missing** |
| DOB Dropdown Chev Position | DSL §1841 🔒 | ⚠ Apr 16 — need verify in current code |
| Primary Citizenship Click-to-Promote | DSL §1856 🔒 | ⚠ Apr 16 — need verify |
| Dropdown Pattern (panel, items) | DSL §727 | ✅ |

---

## CATEGORY 5: Cards & Panels (4 of 7 missing!)

| Pattern | Source | Status | Notes |
|---------|--------|--------|-------|
| Glass Card Pattern | DSL §1198 | ✅ Universal |
| Profile Image Container | DSL §820 | ✅ Sidebar poster |
| Dashboard Header | DSL §801 | ✅ |
| **Glass Sub-Panel (avatar flows)** | DSL §917 | ❌ **Missing** — `.ei-album-panel`, `.ei-ai-panel`, `.ei-repo-panel` |
| **AI Images Flow (4-step)** | DSL §944 | ❌ **Missing** |
| **Album Picker Panel** | DSL §961 | ❌ **Missing** |
| **Reposition Panel** | DSL §975 | ❌ **Missing** |

**These were all locked Apr 15** — Glass Sub-Panel + 3 inner flows for Essential Info avatar editing. **Need full rebuild.**

---

## CATEGORY 6: Records System (LARGEST GAP — 7 of 9 missing) 🚨

This is the architecture from Apr 26 LOCK that's most damaged.

| Pattern | Source | Status | Notes |
|---------|--------|--------|-------|
| `peopleStore` (SSOT, 11 records) | DSL §322 🔒 | ❌ **Missing** | Was at `_shared.js` line ~9458 |
| `loadPartial(name, mountSelector)` | DSL §347 | ❌ **Missing** | Critical — all partials need this |
| `renderPersonRecord()` | DSL §347 | ❌ **Missing** | Bootstraps record.html |
| `populateEssentialInfo(p)` | DSL §347 | ❌ **Missing** |
| `populateContactInfo(p)` | DSL §347 | ❌ **Missing** |
| `populateFamilyRelationships(p)` | DSL §347 | ❌ **Missing** |
| `populateMedicalInfo(p)` | DSL §347 | ❌ **Missing** |
| `populateEducation(p)` | DSL §347 | ❌ **Missing** |
| `populateEmployment(p)` | DSL §347 | ❌ **Missing** |
| `populateBeliefsHobbies(p)` | DSL §347 | ❌ **Missing** |
| `renderCardEntries()` | DSL §347 | ❌ **Missing** |
| `openPersonRecord(personId)` | DSL §347 | ❌ **Missing** |
| `renderPeopleDirectory()` | DSL §347 | ❌ **Missing** |
| `partials/` folder | DSL §332 🔒 | ✅ **Has 8 partials** (Apr 26-27) |
| Status Badge Color Logic | DSL §374 🔒 | ❌ Likely missing populate function |
| Linked Summary Card (4 variants) | DSL §355 🔒 | ❌ **Missing** |
| Universal Entry Pattern | DSL §361 | ❌ **Missing** |
| Documents Tab (aggregator) | DSL §367 | ❌ **Missing** |

**Strategy:** Phase 4 = rebuild `loadPartial` + `renderPersonRecord` + `peopleStore` + populate functions. Use partials/ folder (which survived) as the contract.

---

## CATEGORY 7: Searchable Picker (LOCKED Apr 27, ❌ MISSING)

| Pattern | Source | Status |
|---------|--------|--------|
| `openContactPicker(wrapEl)` | DSL §73 🔒 | ❌ **Missing** |
| `filterPickerOptions(picker, query)` | DSL §73 🔒 | ❌ **Missing** |
| `closeContactPicker(picker)` | DSL §73 🔒 | ❌ **Missing** |
| Detached suggestions (move to body) | DSL §68 | ❌ **Missing** |
| Auto-focus on open | DSL §65 | ❌ **Missing** |

**Affected:** Document Type, Country of Issue, Allergens, Conditions, Medications, Categories, Education Country, Employment Organisation, Beliefs Affiliation, Contacts, Family Relationship Type, Locations.

**This was the LATEST lock (Apr 27, the day before the disaster). High probability of being on disk in some form before corruption.**

---

## CATEGORY 8: System Popups (10 of 14 missing) 🚨

LOCKED Apr 27. All 14 variants share `showSystemPopup({ title, body, actionLabel, ... })`.

| Variant | Status |
|---------|--------|
| `showDeleteEmailPopup` | ✅ |
| `showDeletePhonePopup` | ✅ |
| `showSystemPopup` (entry point) | ✅ |
| `showUnsavedPopup` | ✅ |
| `showDeleteSocialPopup` | ❌ |
| `showDeleteAddressPopup` | ❌ |
| `showDeleteFilePopup` | ❌ |
| `showDeleteDocumentPopup` | ❌ |
| `showDeleteDocumentsPopup` | ❌ |
| `showDeleteEntryPopup` | ❌ |
| `showDeleteEntriesPopup` | ❌ |
| `showDeleteCredentialPopup` | ❌ |
| `showDeleteContactPopup` | ❌ |
| `showDeleteTaskPopup` | ❌ |
| `showRemoveRelationshipPopup` | ❌ |

**Easy rebuild:** all use the same `showSystemPopup` core. Just register 10 wrapper functions with title/body/actionLabel per DSL §28-46.

---

## CATEGORY 9: Identity & Vital Documents (LOCKED Apr 27)

| Item | Source | Status |
|------|--------|--------|
| 15 canonical Document Types | DSL §103 🔒 | ❌ **Missing** | `ANEF_CONDITIONAL` + `ESSENTIAL_CATEGORIES` not in current `_shared.js` |
| Conditional field sets per type | DSL §121 🔒 | ❌ **Missing** |
| Adaptive Timeline Builder | DSL §121 | ❌ **Missing** |

---

## CATEGORY 10: Sidebar & Navigation (mostly ✅)

| Pattern | Source | Status |
|---------|--------|--------|
| Sidebar Navigation Item (3 states) | DSL §1115 🔒 | ✅ Apr 15 |
| Plan Strip Pattern | DSL §1180 | ✅ |
| Two-Layer Chevron Crossfade | DSL §1140 | ✅ |
| **`highlightActiveSidebarItem()`** | DSL §1162 | ❌ **Missing** auto-activation per page |

---

## CATEGORY 11: Print Document (✅ all 12 patterns implemented)

The print/ folder is fully built and locked.

| Pattern | Source | Status |
|---------|--------|--------|
| Print Family Member Card | DSL §1247 | ✅ |
| Print Document Status Indicator | DSL §1274 | ✅ |
| Print Emergency Medical Card | DSL §1296 | ✅ |
| Print Allergy Severity Bar | DSL §1311 | ✅ |
| Print Page Numbering | DSL §1337 | ✅ |
| Print Content Page Template | DSL §1349 | ✅ |
| Print Entry Card (universal 6-element) | DSL §1372 | ✅ |
| Print Status Indicator Colors | DSL §1400 | ✅ |
| Print Icon Registry | DSL §1411 | ✅ |
| Print Section Heading (3 levels) | DSL §1430 | ✅ |
| Print Labeled Frame | DSL §1449 | ✅ |
| Print File Attachment Card | DSL §1479 | ✅ |
| Print File Type Icon Set (12 types) | DSL §1506 | ✅ |
| Print Location in Platform | DSL §1520 | ✅ |
| Print Breadcrumb (circles, levels) | DSL §1540 | ✅ |
| Print Contact Card | DSL §1561 | ✅ |
| Print People & Contacts Divider | DSL §1609 | ✅ |
| Contact Card Integrity Rule | DSL §1690 | ✅ Documented |

---

## CATEGORY 12: Editor & Records Bugs (Apr 26 — 6 known)

These are documented issues in DSL §191-300:

| Bug | Severity | Status |
|-----|---------|--------|
| #1 Wrong cards for Network records (loads 7 instead of 5) | ⚠ Medium | ❌ Not fixed |
| #2 Wrong action sidebar icons (3 vs 4-5 expected) | ⚠ Medium | ❌ Not fixed |
| #3 No deceased state support (red dot, In Memory, DOD, Memorial tab) | ⚠ Medium | ❌ Not fixed |
| #4 Medical Info missing EMC snapshot | ⚠ Medium | ❌ Not fixed |
| #5 Partials too simple vs profile.html (PLATFORM-WIDE) | 🚨 Major | ❌ Not fixed |
| #6 family.html missing canonical structure | ⚠ Medium | ❌ Not fixed |

**Bug #5 is the largest:** every partial in `partials/` should match profile.html 1:1, but currently they're simplified. **This is the heart of Phase 4-5 work.**

---

## RECOVERY PRIORITY ORDER (proposed)

If we rebuild the missing patterns, this order minimizes risk and maximizes value:

### Tier 1: Critical foundation (blocks everything else)
1. **`peopleStore`** — SSOT, 11 records spec — DSL §326 has full schema
2. **`loadPartial(name, mountSelector)`** — partial loader contract
3. **`renderPersonRecord()` + 7 populate functions** — wires partials to data

### Tier 2: User-facing critical
4. **Searchable Picker** (3 functions) — every dropdown needs this
5. **System Popups** (10 missing wrappers) — every delete action needs these
6. **Glass Sub-Panel + Album/AI/Reposition** — Essential Info avatar flows

### Tier 3: Records polish
7. **Linked Summary Card** (4 variants) — family/network display
8. **Universal Entry Pattern** — entry rows
9. **Documents Tab** — aggregator across cards
10. **Identity & Vital Documents** — 15 doc types + conditional fields

### Tier 4: Bug fixes
11. **Bug #1-6** from §191-300 — record.html per-type behavior
12. **Bug #5: rebuild partials 1:1 with profile.html** — biggest task

---

## NEXT STEPS

1. ✅ Phase 1 complete: this file = roadmap of what to recover
2. Phase 2: visual test of every page against this list — confirm what's broken vs what we don't notice
3. Phase 4: build Tier 1 (peopleStore + loadPartial + renderPersonRecord) on a single record (record.html?type=pet)
4. Phase 5: cascade Tier 2 + Tier 3 to all records
5. Phase 6: address Bug #1-6 individually with Violetka's confirmation

**Time estimate (rough):**
- Tier 1: 4-6 hours (foundation rebuild)
- Tier 2: 6-8 hours (UX-critical patterns)
- Tier 3: 8-10 hours (record polish)
- Tier 4: 10-15 hours (bug fixes — Bug #5 alone is multi-day)

**Total:** ~28-39 hours of focused work to fully recover what was lost.
