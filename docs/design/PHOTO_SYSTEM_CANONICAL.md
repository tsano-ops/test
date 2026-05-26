# Photo System — Canonical Spec (LOCKED 2026-05-13)

**Per Violetka:** "повече не ги променяй и губиш"
Single source of truth for how avatar photos, albums, and crop/zoom work
across PlanAfter. Every photo-related behavior on EVERY record page must
follow this exactly.

---

## 1. Two Owner Contexts

### 1A. Plan Owner (Sarah — id `sj`)
- Page: `profile.html`
- Photo:       `localStorage.planOwnerPhoto`
- Crop:        `localStorage.planOwnerCropX/Y/Scale`
- Album:       `localStorage.albumProfilePictures` (JSON array)
- Persistence: `_data/persistence.js` paAutoSave (debounced 500ms)

### 1B. Any Other Person (John, Mary, Robert, Jane Doe Smith, etc.)
- Page: `record.html#<personId>`
- Photo:       `peopleStore[p].photo`
- Crop:        `peopleStore[p].cropX / cropY / scale`
- Album:       `peopleStore[p].album` (JS array)
- Persistence: `_data/persistence.js` paAutoSave debounced → `planafter:peopleStore:v1`

**Isolation rule (LOCKED):** the two contexts NEVER cross-pollute.
Sarah's album never contains John's photos. John's record never reads
Sarah's localStorage album.

---

## 2. Album = "Profile Pictures" Folder

Every record has its own album folder called **Profile Pictures**.

### Rules (LOCKED)
- Every new photo upload is appended to the album
- The XD design seed photo (e.g. `img/Profile_jj.png`) is ALWAYS at
  album index 0 — see §5 PA_XD_SEED_PHOTOS
- Album persists indefinitely — until manually deleted via × button
- Selecting an album photo never removes it from the album
- AI-baked variants are appended to the album
- The currently displayed photo (`p.photo`) is ALWAYS in the album
  (enforced by paEnforcePhotoAlbumInvariant)

---

## 3. Operations

### 3.1 Upload new photo
- Trigger: avatar → photo picker → Add New → file picker
- Handler: `handleAvatarUpload(input)`
- Effect: push to album → set p.photo = new → reset crop → open
  Reposition panel → persist via canonical debounced paAutoSave

### 3.2 Select from album
- Trigger: click an album tile
- Handler: `selectAlbumPhoto(src)`
- Effect: set as current photo (album unchanged) → reset crop →
  re-sync all avatar surfaces → persist

### 3.3 Reposition / Zoom
- Profile.html sidebar pad: dropdown menu → "Reposition" → drag + zoom slider
- Profile.html Essential Info: picker → "Reposition" tile → opens eiRepoPanel
- Record.html: picker → "Reposition" tile → opens eiRepoPanel
- Save writes cropX/Y/scale to the owner's slot AND to peopleStore['sj']
  (for Sarah) so paSyncPersonAvatars picks it up across every avatar.
- Drag-pixel-to-percent conversion uses container width — 1 container width
  drag = 100% position change.
- `parseFloat() || N` falsy coercion bug is FIXED everywhere with `isNaN()` guard.
- Free movement (clamps preserved 0-100% in object-position) — extreme zoom
  + the avatar clipping wrapper (§6) ensure photo never leaks past circle.

### 3.4 Delete from album (× button)
- Trigger: hover album tile → × button → confirm
- Handler: `paRemoveAlbumPhoto(url)`
- Effect: splice from album → if removed was current, fall back to
  most recent remaining (or clear if empty)
- XD seed photos: removable, but RE-ADDED on next page refresh by
  paInjectXdSeedsIntoAlbums (per Violetka: "always be able to revert
  to XD sample")

### 3.5 Clear current photo (× on avatar — record-view only)
- Handler: `paClearViewedPhoto()`
- Effect: clears p.photo only; album is UNTOUCHED
- The cleared photo remains in album, can be re-selected

---

## 4. Sync Targets (every place photo appears)

When current photo changes, `applyPlanOwnerPhoto()` + `paSyncPersonAvatars()`
update ALL avatar surfaces:

### Plan Owner sync
- `#sidebarPhotoImg` (sidebar pad)
- `#headerAvatarImg` (top-right header)
- `#profileAvatarImg` (profile card)
- `#eiReadAvatar` / `#eiAvatarPreview` / `#eiPickerCurrentImg`
- `#identityAvatarImg` / `#settingsAvatarImg`
- `.plan-owner-photo` (any class-marked)
- Print covers / Print content / Print sidebar / Print owner-avatar
- Drop-zone preview

### Record-view extra targets
- `#dashboardPosterImg`
- `.avatar-plan-owner`

### Per-person via `[data-person-id]` / `[data-person]`
- `.ftree-avatar img` (family tree node)
- `.fr-avatar` (family relationships)
- `.lsc-avatar-photo` (linked summary card)
- `.emc-contact-avatar-photo` (entry contact)
- ANY other element matching `[data-person-id="<id>"]` containing imgs

---

## 5. XD Design Seed Photos (LOCKED)

Hardcoded canonical paths — every record's album ALWAYS contains its XD
seed photo at index 0. User can always revert to it.

Constant: `PA_XD_SEED_PHOTOS` in `_shared.js`:

| ID | Person | Photo Path |
|---|---|---|
| sj | Sarah Johnson (Plan Owner) | `img/Profile_img.png` |
| jj | John Johnson | `img/Profile_jj.png` |
| em | Emma Johnson | `img/Profile_em.png` |
| li | Liam Johnson | `img/Profile_li.png` |
| ls | Lisa Johnson | `img/Profile_ls.png` |
| no | Noah Johnson | `img/Profile_no.png` |
| ms | Mary Smith | `img/Profile_ms.png` |
| rs | Robert Smith | `img/Profile_rs.png` |
| enzo | Enzo | `img/Profile_enzo.png` |
| jd | Jack Daniel | `img/Profile_jd.png` |
| jds | Jane Doe Smith | `img/Profile_jds.png` |
| jsm | John Smith | `img/Profile_jsm.png` |
| bw | Ben White | `img/Profile_bw.png` |
| drwhite | Dr. Emily White | `img/Profile_drwhite.png` |
| mdavis | Attorney Mark Davis | `img/Profile_mdavis.png` |

Adding a new person to `_data/peopleStore.js` requires also adding
their seed path to `PA_XD_SEED_PHOTOS` so the invariant picks it up.

---

## 6. Avatar Circle Clipping (LOCKED)

Per Violetka: **"снимката трябва да се вижда само в границите на
малкия кръг на всеки аватар, независимо колко е зумната"**.

### Problem
`border-radius:50%` on an `<img>` clips the IMG's content to a circle
BEFORE transforms are applied. `transform: scale(>1)` then scales the
output AFTER clipping — scaled circle paints OUTSIDE the IMG box.
Result: zoomed photo leaks past the small inner circle on every surface.

### Solution
JS-injected `.pa-avatar-clip` wrapper around every canonical avatar
IMG. The wrapper is:
- Same size as the IMG (60×60 typically)
- `overflow: hidden` (clips scaled content)
- `border-radius: 50%` (circular clip)
- Preserves the IMG's original position (absolute/relative inherited)

IMG inside the wrapper:
- `position: absolute; top:0; left:0; width:100%; height:100%`
- `object-fit: cover` (already)
- `transform: scale(N)` and `object-position: X% Y%` operate freely
- WRAPPER bounds the visible output to the 50% circle

### Implementation
- CSS: `.pa-avatar-clip` rule in `_shared.css` (auto-styles injected wrapper)
- JS: `paEnsureAvatarClipping(scope)` in `_shared.js`
  - Walks `.profile-avatar`, `.ftree-avatar > img`, `.fr-avatar`,
    `.lsc-avatar-photo`, `.emc-contact-avatar-photo`
  - For each unwrapped IMG: create `.pa-avatar-clip` div, adopt IMG's
    layout (position, top/left/right/bottom, margin, zIndex), insert
    in IMG's place, reparent IMG inside, reset IMG to fill wrap
  - Idempotent: only wraps if not already wrapped
  - Called at bootstrap + after `paSyncPersonAvatars`

### NOT applied to
- `.sidebar-photo` (240×240 pad — its own visual style, scale always within bounds)
- `.album-photo-tile` (square tile, already has `overflow:hidden`)
- Two-Circle Pattern outer wrappers (`.profile-avatar-wrap` 80×80,
  `.ftree-avatar` 80×80) — those are the GREY pads, not the photo circle

---

## 7. Persistence Layer (LOCKED)

### Canonical (in `_data/persistence.js`)
- `window.paAutoSave()` — debounced 500ms, saves to
  `planafter:peopleStore:v1`, `planafter:entriesStore:v6`,
  `planafter:planOwnerPhoto:v1`
- `window.paLoadAll()` — runs on DOMContentLoaded, replaces in-memory
  seed with persisted state
- `window.paSavePeople()` / `paSaveEntries()` / `paSavePhoto()` —
  explicit immediate save (rarely needed)
- `window.paClearStorage()` — full wipe + reload (dev tool)
- `window.paExportJson()` / `paImportJson()` — backup/restore

### Helpers (in `_shared.js`)
- `window.paResolvePersonById(id)` — direct peopleStore lookup
  (bypasses peopleById monkey-patch on record.html)
- `window.paGetCurrentOwnerId()` — `__paViewedPersonRealId` on
  record.html, `'sj'` on profile.html
- `window.paRemoveAlbumPhoto(url)` — × delete from album
- `window.paEnforcePhotoAlbumInvariant()` — ensures p.photo in p.album
- `window.paEnsureAvatarClipping(scope)` — wraps avatar IMGs

### NEVER duplicate
- `_shared.js` MUST NOT define its own `paAutoSave` — it would override
  the canonical debounced one and block the main thread (causing the
  whole page to freeze). Bug fixed 2026-05-13 commit `f0e5a0b`.

---

## 8. Cross-Record Isolation Rules (NEVER violate)

1. **Photo isolation** — Sarah's photo in `localStorage.planOwnerPhoto`;
   every other person's photo in `peopleStore[p].photo`.
2. **Album isolation** — Sarah's album in
   `localStorage.albumProfilePictures`; every other person's album in
   `peopleStore[p].album`. Routing via `__paIsRecordView`.
3. **NEVER** write to `localStorage.albumProfilePictures` while on
   `record.html` — that leaks viewed-person photos to Sarah's album.
4. **NEVER** use `peopleById('sj')` to look up actual Sarah on
   `record.html` — it returns the VIEWED person (monkey-patch). Use
   `paResolvePersonById('sj')`.

---

## 9. Bugs Fixed in This Session (2026-05-13)

| # | Bug | Fix |
|---|---|---|
| 1 | No persistence — `paAutoSave` undefined → calls no-op | Found existing `_data/persistence.js` provides it; removed duplicates |
| 2 | No album delete UI | Added × button + `paRemoveAlbumPhoto()` |
| 3 | XD seed not in album | `PA_XD_SEED_PHOTOS` constant + `paInjectXdSeedsIntoAlbums()` |
| 4 | AI bake leaked to Sarah's album | Routed by `__paIsRecordView` |
| 5 | `parseFloat \|\| 50` reverted 0% to center | `isNaN()` guard everywhere (7 sites) |
| 6 | Drag pixel-vs-percent unit mismatch | Convert via container width |
| 7 | Drag-drop record-view unaware | Per-person routing same as upload |
| 8 | Reposition tile missing on profile.html | Added canonical picker tile |
| 9 | Sidebar reposition didn't sync to peopleStore['sj'] | Added writes + `paSyncPersonAvatars` call |
| 10 | EI Reposition didn't sync to peopleStore['sj'] | Same fix |
| 11 | Self-linking allowed (owner ↔ owner) | 3-point guard (picker filter + link guard + render guard) |
| 12 | Document Number required (`*`) | Set `required:false` on Passport/ID/Licence/SSN |
| 13 | 18 HTML files had no `?v=` cache version | Forced versioning on all 30 files |
| 14 | `paBootstrapPhotoSystem` was microtask (ran BEFORE peopleStore.js) | Defer via DOMContentLoaded (task) |
| 15 | DUPLICATE `paAutoSave` blocked main thread → page frozen | Removed my version; use canonical debounced one |
| 16 | Scaled photo leaked past avatar circle | JS-injected `.pa-avatar-clip` wrapper |
| 17 | `paResolvePersonById` for cross-person reads | Added + applied at 6 sites |

---

## 10. Testing Checklist (verify on every release)

- [ ] Sarah's profile: upload new photo → album shows it + becomes current
- [ ] Sarah's profile: refresh → photo + album persist
- [ ] John's record: upload new photo → John's album shows it + becomes current
- [ ] John's record: refresh → photo + album persist (no leak to Sarah)
- [ ] John's record: album shows Profile_jj.png at index 0 (XD seed)
- [ ] Open Mary's record: Mary's album shows Profile_ms.png at index 0
- [ ] All other records same: every album has XD seed at index 0
- [ ] Click XD seed in album → avatar reverts to design photo
- [ ] Click uploaded album photo → becomes current
- [ ] Delete an album photo via × → disappears + persists across refresh
- [ ] Delete the current → falls back to next most recent
- [ ] Delete all → fallback to initials, empty state shown
- [ ] Reposition Sarah → crop persists across refresh + syncs to all
      Sarah avatars (sidebar, header, profile card, family tree, family members)
- [ ] Reposition John → same, only John's avatars (no Sarah leak)
- [ ] AI bake on John → bake in John's album, not Sarah's
- [ ] Zoom photo to scale 2-3 → photo stays INSIDE avatar small circle
      (clipped by `.pa-avatar-clip` wrapper)
- [ ] Drag freely left/right/up/down → photo moves smoothly within
      clipped bounds
- [ ] Save reposition → exact crop persists, no `0% → 50%` reset bug
- [ ] All sidebar nav items clickable, hover works
- [ ] No console errors

---

## 11. The 10 Rules — NEVER VIOLATE

1. Never write to `localStorage.albumProfilePictures` on record-view
2. Never write to `localStorage.planOwnerPhoto` on record-view
3. Never use `peopleById('sj')` to look up Sarah specifically — use
   `paResolvePersonById('sj')` to bypass monkey-patch
4. Never define `window.paAutoSave` in `_shared.js` — it would override
   canonical debounced version and block main thread
5. Never auto-purge album entries — only manual × delete
6. Never let `parseFloat() || N` coerce — always `isNaN()` guard
7. Never add overflow:hidden to Two-Circle wrappers (80×80) — kills
   the canonical Pattern. Clip in dedicated `.pa-avatar-clip` 60×60.
8. Never block on synchronous localStorage writes — large data URLs
   freeze the main thread. Use debounced canonical paAutoSave.
9. Never forget the XD seed photo when adding a new person —
   add to `PA_XD_SEED_PHOTOS` in `_shared.js`.
10. Never run rehydration BEFORE peopleStore.js loads — defer via
    DOMContentLoaded (task), NOT Promise.then (microtask).
