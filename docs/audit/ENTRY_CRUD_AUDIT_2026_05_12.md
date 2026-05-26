# Entry CRUD Audit — 2026-05-12

Full audit of entry create / edit / save / archive / delete / link flows across every record, every card, every tab, every page.

Per Violetka: "имам 7 часа — прави и потаряш непрекъснато докато не сте спра"

## Status legend
- ✅ Verified working (code review)
- ⚠️ Suspected broken (needs test)
- ❌ Confirmed broken (with fix)
- 🔄 Fixed in this session

---

## Surfaces where entries appear

| # | Surface | URL | Renders via | Card scope |
|---|---|---|---|---|
| 1 | profile.html — Essential Info card | `/profile.html` | paInjectEntryRowFromStore | essential |
| 2 | profile.html — Family & Relationships card | `/profile.html` | paInjectEntryRowFromStore | family |
| 3 | profile.html — Medical Info card | `/profile.html` | paInjectEntryRowFromStore | medical |
| 4 | profile.html — Education card | `/profile.html` | paInjectEntryRowFromStore | education |
| 5 | profile.html — Employment & Affiliations card | `/profile.html` | paInjectEntryRowFromStore | employment |
| 6 | profile.html — Beliefs/Hobbies/Interests card | `/profile.html` | paInjectEntryRowFromStore | beliefs |
| 7 | profile.html — Documents tab (centralised list) | `/profile.html#documents` | paRenderDocumentsList | all |
| 8 | profile.html — Vault tab | `/profile.html#vault` | paRenderVaultList | all |
| 9 | record.html#<personId> — Essential Info | `/record.html#jj` | paRenderOverviewEntriesForPerson | essential |
| 10 | record.html#<personId> — All cards | `/record.html#<id>` | paRenderOverviewEntriesForPerson | all 6 cards |
| 11 | record.html#<personId> — Documents tab | `/record.html#<id>` | paRenderDocumentsList (hash-aware) | all |
| 12 | print-document.html | `/print-document.html` | paRenderPrintEntries + paInsertDocumentPages | all (filtered) |

## Entry creation entry points

| Card | UI trigger | Handler | Builder fn | Status |
|---|---|---|---|---|
| Essential | `.emc-add-entry-btn` in card | `addNewEntry('essential')` → opens `#esEntryForm` | `saveEssentialEntry` → `saveCanonicalEntry({cardKey:'essential', groupTitle:'Identity & Vital Documents', requireFileOrLocation:true})` | ⚠️ |
| Education | `.emc-add-entry-btn` | `addNewEntry('education')` → `#educationEntryForm` | `saveCanonicalEntry({cardKey:'education'})` | ⚠️ |
| Employment | `.emc-add-entry-btn` | `addNewEntry('employment')` → `#employmentEntryForm` | `saveCanonicalEntry({cardKey:'employment'})` | ⚠️ |
| Beliefs/Hobbies | `.emc-add-entry-btn` | `addNewEntry('beliefs')` → `#beliefsEntryForm` | `saveCanonicalEntry({cardKey:'beliefs'})` | ⚠️ |
| Medical | `.emc-add-entry-btn` | `addNewEntry('medical')` → `#medEntryForm` | Custom medical handlers (`emcMedicationSave`, `emcDeviceSave`, etc.) | ⚠️ |
| Family | (separate flow — Person record creation) | `addContact` / family tree builders | TBD | ⚠️ |
| Documents tab | (entries created from cards, not from tab) | — | — | N/A |
| Vault tab | (vault folders, separate from entry CRUD) | — | — | N/A |

All saves push to `window.entriesStore` via `window.addEntry(partial)` (SSOT API in `_data/entriesStore.js:632`).

## Entry edit entry points

| Origin | Click target | Handler | Notes |
|---|---|---|---|
| Body pencil | `.ee-edit-trigger` (inline onclick) | `handleEntryEditTrigger(this)` | ✅ Always works — element lives inside the body, not in detached dropdown |
| ⋯ dropdown (.doc-dropdown, dynamic injected, line 16199) | `.dd-row.dd-row-edit` (inline onclick) | 🔄 **NEW:** `paDocDropdownEditClick(this)` (was: `handleEntryEditTrigger(this.closest('.entry-row').querySelector('.ee-edit-trigger') || this.closest('.entry-row'))`) | **FIXED 2026-05-12** — old code threw TypeError when dropdown was detached to body by `toggleDD` (closest returned null → null.querySelector). |
| ⋯ dropdown (.doc-dropdown, NEW entries via saveCanonicalEntry, line 13428) | `.dd-row.dd-row-edit` (NO inline onclick) | Document-level capture-phase listener at line 5737 | ✅ Uses `dropdown._trigger` fallback to resolve row. |
| ⋯ dropdown (.doc-dropdown, Documents tab, line 7404) | `.dd-row.dd-row-edit` (NO inline onclick) | Same delegated listener at 5737 | ✅ |
| ⋯ dropdown (.doc-dropdown, paRenderDocumentsList, line 5478) | `.dd-row.dd-row-edit` (NO inline onclick) | Same delegated listener | ✅ |
| ⋯ dropdown (.entry-menu-dropdown, legacy upgrade, line 6700) | `.entry-menu-item` Edit (inline onclick `handleEntryAction('edit',this)`) | `handleEntryAction('edit', itemEl)` — has dropdown._trigger fallback line 9548 | ✅ |

## Entry save flow

`saveEntryEdit(body)` reads from body's editable inputs:
- `.ee-edit-entry-name` → entry.title
- `.ee-input-row.ee-edit-only` (non-picker, non-location) → entry.fields[]
- `tlReadValues(body)` → entry.timeline[]
- `.anef-people-section data-linked-ids` → entry.relatedTo[]
- `.ee-location-picker` + Other input → entry.location, entry.otherLocation
- `.ee-files-edit-list data-files` → entry.files[], entry.file
- last `.ee-pad-textarea-input` → entry.notes
- previous textarea (if 2) → entry.locationDetails

Then:
1. `row.setAttribute('data-entry', JSON.stringify(data))`
2. `body.innerHTML = buildEntryExpandBodyHTML(data)` — rebuild view-mode HTML
3. `body.classList.remove('editing')` + row's editing class
4. SSOT sync — find entry in `window.entriesStore` by `id` (fallback: `title + ownerId`), Object.assign new values + `dateUpdated`
5. Re-render `paRenderDocumentsList()` + `paRenderVaultList()`
6. Re-render `.anef-people-section` (stacked summary cards)
7. `paAutoSave()` to localStorage (debounced)
8. Show "Saved" toast on success

🔄 2026-05-12 — Added: try/catch around DOM rebuild, ID fallback by title+ownerId, accept `doc-row` OR `entry-row` (previously only entry-row), visible success toast, console warnings at silent failure points.

## Entry archive flow

`paArchiveEntryRow(rowMenuEl)` (line ~ TBD verify):
1. Resolves entry from `data-entry` JSON on parent row
2. Finds entry in `entriesStore` by id
3. Sets `entry.archived = true`
4. Mirrors in `peopleStore[ownerId].entries` (paSyncToPeopleStoreEntries)
5. Re-renders Documents/Vault/Cards (cascade)

`handleEntryAction('archive', itemEl)` — alt path for legacy entry-menu-dropdown

## Entry delete flow

`paDeleteEntryRow(rowMenuEl)` (line ~ TBD):
1. Opens `showDeleteEntryPopup(callback)` confirmation modal
2. On confirm:
   - Read entry from data-entry
   - Owner-vs-linked rule: if `entry.ownerId === currentRecordId` → FULL delete (filter from entriesStore + peopleStore via paRemoveFromPeopleStoreEntries). If not → UNLINK only (remove currentRecordId from linkedContactIds/relatedTo).
3. Cascade re-render same as archive

## Entry link flow

Links established at create/edit time:
- ANEF form's `.anef-people-section` carries `data-linked-ids` attribute
- saveCanonicalEntry reads it → entry.linkedContactIds
- `window.addEntry` auto-maps `linkedContactIds → relatedTo[]` if relatedTo is empty
- saveEntryEdit reads from `.anef-people-section data-linked-ids` → entry.relatedTo

Visibility on linked records:
- paRenderOverviewEntriesForPerson filters by `relatedTo.indexOf(personId) !== -1` for linked entries
- Renders under "Linked Entries" subtitle (separate `.data-group-linked-subtitle` separator)
- Linked entries use `.is-linked` modifier class
- Linked row menu has only "View Source" action (Edit/Archive/Delete hidden via CSS)

---

## Known issues & fixes log

### 🔄 2026-05-12 — Edit click from ⋯ dropdown broken on dynamic entries

**Root cause:** `paInjectEntryRowFromStore` (line 16199) had inline onclick:
```html
handleEntryEditTrigger(this.closest('.entry-row').querySelector('.ee-edit-trigger') || this.closest('.entry-row'))
```

`toggleDD` moves `.doc-dropdown` to `document.body` via appendChild. After detachment, `this.closest('.entry-row')` returns `null` because the dropdown is no longer inside the entry-row DOM tree. Then `null.querySelector(...)` throws TypeError → click handler dies silently → Edit appears to do nothing.

**Fix:** Replaced inline onclick with wrapper function `paDocDropdownEditClick(this)` which:
1. Tries `closest('.entry-row')` first (works if dropdown still inline)
2. Falls back to `dropdown._trigger.closest('.entry-row')` (resolves via toggleDD's stored trigger reference)
3. Closes the dropdown via `closeAllDD()`
4. Calls `handleEntryEditTrigger` with the resolved trigger element

Commit cache: `?v=20260512fo`. Files modified: `_shared.js`.

### 🔄 2026-05-12 — Orphan modal flag could hide entry rows

If File Preview Modal closed uncleanly (browser back, script error), body kept `data-pa-fp-added-mode` + `doc-preview-mode` class. CSS rule `body[data-pa-fp-added-mode="1"] .entry-row, .entry-expand-body, .accordion-section, ... { visibility: hidden !important; }` then permanently hid the page UI even though the modal was gone.

**Fix:** Added `paFpCleanupStaleModalState` IIFE at script load + defensive check inside `handleEntryEditTrigger` that strips the orphan flag if no `#paFpDocPreview` element exists.

### 🔄 2026-05-12 — saveEntryEdit silent failures

`saveEntryEdit` had multiple silent return paths:
- Returned without saving if row was `.doc-row` (only checked `.entry-row`)
- No console output on JSON parse error
- No fallback when `data.id` empty (legacy seed entries)
- DOM rebuild errors swallowed silently

**Fix:**
- Accept both `entry-row` AND `doc-row` classes
- console.warn/error at every failure point
- Fallback: match by `title + ownerId` when id missing
- try/catch around `body.innerHTML = buildEntryExpandBodyHTML(...)`
- Show user "Saved" toast on success, "Save failed" toast on error

### 🔄 2026-05-12 — File Preview Modal entry icons broken on retina

`paBuildFilePreviewModal` used `srcset="x.png 1x, x@2x.png 2x"` for entry icons. But `document.png`, `shield-allergy.png`, `pill.png`, `education.png` ship WITHOUT @2x variants. On retina displays browser failed to load → broken-image placeholder.

**Fix:** Removed srcset from entry icon in modal, use only 1x src. Icon is 16-24px so upscale loss is imperceptible.

---

## Verification checklist (manual testing)

For each surface (1-12), verify each action works without console errors.

| Surface | Create | Edit | Save | Archive | Delete | Link |
|---|---|---|---|---|---|---|
| profile.html Essential | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| profile.html Family | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| profile.html Medical | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| profile.html Education | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| profile.html Employment | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| profile.html Beliefs | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| profile.html Documents tab | N/A | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| profile.html Vault tab | N/A | ⬜ | ⬜ | ⬜ | ⬜ | N/A |
| record.html#jj Essential | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| record.html#em Essential | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| record.html#li Essential | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| record.html#ls Essential | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| record.html#no Essential | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| record.html#ms Essential | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| record.html#rs Essential | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| record.html#enzo (pet) | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| print-document.html | N/A | N/A | N/A | N/A | N/A | N/A |

---

## Next audit steps

- [ ] Verify Add Document Entry form for each card creates entry visible in entriesStore + visible on row
- [ ] Verify Edit on each row enters edit mode (after my paDocDropdownEditClick fix)
- [ ] Verify Save persists to entriesStore + localStorage + survives page reload
- [ ] Verify Archive moves entry to archived state + hides from main lists
- [ ] Verify Delete (full + unlink) cascades correctly per owner-vs-linked rule
- [ ] Verify cross-record link makes entry visible on linked person's record under "Linked Entries" subtitle
- [ ] Verify print-document includes all entries + their file preview pages
