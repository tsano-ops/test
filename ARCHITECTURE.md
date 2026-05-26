# PlanAfter Prototype — Architecture Spec

**Version:** 1.0  
**Status:** Target architecture (current code is being migrated towards this)  
**Audience:** Whoever picks up this prototype next (Claude, dev, designer)

---

## 0. Why this architecture exists

The prototype today has problems:
- `profile.html` = 482KB single file
- `record-family.html` / `record-network.html` / `record-pet.html` = 3 IDENTICAL 482KB copies
- One bug in `_shared.js` corrupts the whole prototype
- Browser slow to load big files; impossible to tell what changed

**Goal:** Many small files. Change one place → propagates everywhere. No file >50KB except shared assets.

---

## 1. Folder structure

```
html-prototype/
│
├── (top-level entry pages — thin shells)
│   ├── index.html              ← Dashboard,    ~50KB
│   ├── profile.html            ← PlanOwner,    ~30KB shell
│   ├── record.html             ← GENERIC for family/network/pet, ~30KB shell
│   ├── family.html             ← list of family records
│   ├── network.html            ← list of network records
│   ├── vault.html, assets.html, health.html, goals.html, will.html, ...
│   ├── tasks.html, marketplace.html, settings.html, shared.html, legacy.html
│   └── post-loss-*.html        ← post-loss flows
│
├── _partials/                  ← reusable HTML fragments (small, focused)
│   ├── header.html             ← top bar with logo, search, bell, avatar
│   ├── sidebar.html            ← left navigation (300px)
│   ├── ai-panel.html           ← AI Assistant card (right panel inner page)
│   ├── progress-panel.html     ← Progress bars (right panel dashboard)
│   ├── card-essential-info.html
│   ├── card-contact-info.html
│   ├── card-medical-info.html
│   ├── card-education.html
│   ├── card-employment.html
│   ├── card-beliefs.html
│   ├── card-family-relationships.html
│   ├── card-tasks-reminders.html
│   ├── card-shared-with.html
│   ├── card-roles-access.html
│   ├── tabs-record.html        ← Overview/Documents/Album/Life Story/Memorial
│   └── footer.html
│
├── _modals/                    ← lazy-loaded modal dialogs
│   ├── modal-edit-essential.html
│   ├── modal-edit-medical.html
│   ├── modal-edit-allergy.html
│   ├── modal-edit-medication.html
│   ├── modal-edit-employment.html
│   ├── modal-edit-education.html
│   ├── modal-document-preview.html
│   └── modal-share-grant.html
│
├── _data/                      ← single source of truth for data + loaders
│   ├── peopleStore.js          ← all Person records (PlanOwner + family + network)
│   ├── plansStore.js           ← Plan data (assets, tasks, etc.)
│   ├── tasksStore.js           ← Tasks & reminders
│   ├── partial-loader.js       ← fetch + insert + execute scripts
│   └── modal-loader.js         ← lazy-load modals on demand
│
├── _shared.css                 ← shared CSS (cap 800KB; split if larger)
├── _shared.js                  ← shared JS (cap 300KB; split if larger)
│
├── _versions/                  ← version control safety net
│   ├── hourly/                 ← rolling backup (last 5 per file)
│   ├── daily/                  ← daily snapshots (last 10 days)
│   └── scripts/
│       ├── rolling-backup.sh
│       ├── daily-snapshot.sh
│       ├── fswatch-daemon.sh
│       └── restore.sh
│
├── _archive/                   ← retired files (don't delete, archive)
│
├── img/                        ← raster images (PNG, JPG)
├── icons/                      ← SVG icons
├── fonts/                      ← custom fonts
└── print/                      ← print preview pages (already split ✅)
```

---

## 2. Partial loader

### Purpose
Replace inline header/sidebar/cards in every page with a single source.  
Change the header in one file → updates everywhere.

### Implementation: `_data/partial-loader.js`

```js
/**
 * Load an HTML partial into a DOM target.
 * Executes any <script> tags inside the partial after insertion.
 *
 * @param {string} name   Partial name (without .html). E.g. 'header', 'card-essential-info'
 * @param {Element|string} target  DOM element or selector
 * @returns {Promise<void>}
 */
async function loadPartial(name, target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) throw new Error(`Target not found for partial: ${name}`);

  const res = await fetch(`/_partials/${name}.html`);
  if (!res.ok) throw new Error(`Failed to load partial ${name}: ${res.status}`);
  const html = await res.text();
  el.innerHTML = html;

  // Re-execute scripts inside the partial (innerHTML doesn't run them)
  el.querySelectorAll('script').forEach(oldScript => {
    const s = document.createElement('script');
    if (oldScript.src) s.src = oldScript.src;
    else s.textContent = oldScript.textContent;
    oldScript.replaceWith(s);
  });
}

/**
 * Auto-load all partials marked with data-partial="<name>"
 * Use case: <div data-partial="header"></div>
 */
async function autoLoadPartials() {
  const targets = document.querySelectorAll('[data-partial]');
  await Promise.all([...targets].map(t => loadPartial(t.dataset.partial, t)));
}

document.addEventListener('DOMContentLoaded', autoLoadPartials);
```

### Usage in any page

```html
<!doctype html>
<html>
<head>
  <link rel="stylesheet" href="/_shared.css">
</head>
<body>
  <div data-partial="header"></div>
  <div data-partial="sidebar"></div>

  <main class="middle-col">
    <!-- page-specific content -->
  </main>

  <aside class="rightpanel-fixed">
    <div data-partial="ai-panel"></div>
  </aside>

  <script src="/_data/partial-loader.js"></script>
  <script src="/_shared.js"></script>
</body>
</html>
```

That's a 30-line top-level page that **doesn't** repeat any header/sidebar/AI-panel HTML.

---

## 3. Modal loader (lazy)

### Purpose
Modals exist in their own files. They load only when opened.  
Result: page initial bytes drop dramatically; modals are hot-swappable.

### Implementation: `_data/modal-loader.js`

```js
/**
 * Open a modal lazily. Fetches the modal HTML on first open, caches in DOM.
 *
 * @param {string} name        Modal name (e.g. 'edit-essential')
 * @param {Object} [data={}]   Data passed to modal's init function
 */
async function openModal(name, data = {}) {
  let modal = document.getElementById(`modal-${name}`);
  if (!modal) {
    const res = await fetch(`/_modals/modal-${name}.html`);
    if (!res.ok) throw new Error(`Modal not found: ${name}`);
    const wrap = document.createElement('div');
    wrap.innerHTML = await res.text();
    modal = wrap.firstElementChild;
    modal.id = `modal-${name}`;
    document.body.appendChild(modal);

    // Run scripts inside
    modal.querySelectorAll('script').forEach(oldScript => {
      const s = document.createElement('script');
      s.textContent = oldScript.textContent;
      oldScript.replaceWith(s);
    });
  }

  modal.classList.add('open');
  // Each modal can expose a global `init<Name>` function
  const initFn = window[`init${name.replace(/(?:^|-)(\w)/g, (_, c) => c.toUpperCase())}`];
  if (typeof initFn === 'function') initFn(data);
}

function closeModal(name) {
  const modal = document.getElementById(`modal-${name}`);
  if (modal) modal.classList.remove('open');
}
```

### Usage

```js
// From anywhere
openModal('edit-essential', { recordId: 42 });
```

---

## 4. Generic record.html

### Purpose
Replace 3 identical 482KB record-family/network/pet files with ONE thin shell.  
Type and ID come from URL: `record.html?type=family&id=42`.

### record.html (target ~30KB, mostly markup)

```html
<!doctype html>
<html>
<head>
  <link rel="stylesheet" href="/_shared.css">
  <title id="recordTitle">Record — PlanAfter</title>
</head>
<body>
  <div data-partial="header"></div>
  <div data-partial="sidebar"></div>

  <main class="middle-col">
    <div data-partial="record-header"></div>     <!-- name, photo, age, role -->
    <div data-partial="tabs-record"></div>       <!-- Overview/Documents/Album/Life Story -->

    <section id="tab-overview" class="active">
      <div data-partial="card-essential-info"></div>
      <div data-partial="card-contact-info"></div>
      <div data-partial="card-medical-info"></div>
      <div data-partial="card-family-relationships"></div>
      <div data-partial="card-education"></div>
      <div data-partial="card-employment"></div>
      <div data-partial="card-beliefs"></div>
    </section>

    <section id="tab-documents"></section>       <!-- lazy-loaded on click -->
    <section id="tab-album"></section>           <!-- lazy-loaded on click -->
    <section id="tab-lifestory"></section>       <!-- lazy-loaded on click -->
    <section id="tab-memorial" hidden></section> <!-- only if deceased -->
  </main>

  <aside class="rightpanel-fixed">
    <div data-partial="ai-panel"></div>
  </aside>

  <script src="/_data/peopleStore.js"></script>
  <script src="/_data/partial-loader.js"></script>
  <script src="/_data/modal-loader.js"></script>
  <script src="/_shared.js"></script>
  <script>
    // Boot record-specific behavior based on URL
    const params = new URLSearchParams(location.search);
    const type = params.get('type') || 'family';
    const id = parseInt(params.get('id') || '1', 10);
    document.body.classList.add(`record-${type}`);
    window.currentRecord = peopleStore.get(id);
  </script>
</body>
</html>
```

### Migration plan

- Phase 4.2: pick `record-pet.html` (smallest, most isolated)
- Convert it to use partials
- Verify visually identical to current
- Delete `record-pet.html` → archive it
- Apply same approach to `record-family.html`, `record-network.html`
- Add type-specific cards as needed (e.g. pets don't have employment)

---

## 5. Data stores

### `_data/peopleStore.js`

```js
window.peopleStore = (() => {
  // Single source of truth — every Person record across the prototype
  const people = {
    1: { id: 1, type: 'plan-owner', name: 'Sarah Johnson', dob: '1980-07-22',
         role: 'Plan Owner', photo: '/img/Profile_img.png', alive: true },
    2: { id: 2, type: 'family',     name: 'Emma Johnson',  role: 'Daughter', ... },
    3: { id: 3, type: 'network',    name: 'Dr. Emily White', role: 'Executor', ... },
    // ...
  };

  return {
    get: id => people[id],
    listByType: type => Object.values(people).filter(p => p.type === type),
    update: (id, data) => Object.assign(people[id], data),
    add: data => { const id = Math.max(...Object.keys(people).map(Number)) + 1;
                   people[id] = { id, ...data }; return id; },
    remove: id => delete people[id],
  };
})();
```

### Persistence
For the prototype: `localStorage` writeback. For real app: API calls.
The store hides this — pages call `peopleStore.get(id)`, never localStorage directly.

### Plan Owner avatar sync (per CLAUDE.md)
peopleStore.get(1) is the canonical Plan Owner. Every avatar across the prototype reads from there. Photo change in one place → updates everywhere.

---

## 6. CSS organization

`_shared.css` is currently 597KB. Approach:

1. **Now:** keep as one file (it works).
2. **When >800KB:** split into:
   - `_shared.css` — tokens, reset, typography (≤150KB)
   - `_components.css` — buttons, inputs, cards (≤300KB)
   - `_pages.css` — page-specific overrides (≤300KB)
3. **Inline base64 images** are eating size. Move to `/img/` and reference via `url('/img/...')`.

---

## 7. JS organization

`_shared.js` after restore is 215KB. Headroom OK. When >300KB:

1. Extract record-specific logic to `_data/recordController.js`
2. Extract dashboard-specific logic to `_data/dashboardController.js`
3. Keep `_shared.js` for cross-page utilities only

---

## 8. Print pages (already split ✅)

`print/p2-personal.html` ... `print/p26-linked-people.html` already follow this pattern (one file per page, small, focused). This is the model for the rest of the prototype.

---

## 9. Conventions

- File names: `kebab-case.html`, `camelCase.js`
- Each partial has at most ONE top-level element
- Each modal has class `.modal` and follows `_modals/modal-<name>.html` naming
- Each page sets `<body class="page-<name>">` for page-scoped CSS
- All `<a href>` use absolute paths from `/` for portability
- Comments in HTML/CSS/JS in English (consistent with codebase)

---

## 10. Definition of Done for migration

A page is migrated when:

- [ ] Top-level file ≤50KB (or ≤30KB for record/profile shells)
- [ ] Header/sidebar/AI panel are partials, not inline HTML
- [ ] Modals load via `openModal()`, not inline
- [ ] No console errors on load
- [ ] Visually matches the original (Violetka confirmed)
- [ ] Git commit `migrate: <page>` exists

---

## 11. Anti-patterns (do not do this)

- ❌ Copy-paste HTML between pages
- ❌ Inline modal HTML in main page
- ❌ Hardcode person data in HTML (use peopleStore)
- ❌ Edit one of `record-family.html` / `record-network.html` / `record-pet.html` (they should be deleted; only `record.html` exists)
- ❌ Create a new HTML page without using partials
- ❌ Add a CSS rule without checking `tokens.css` first

---

## 12. Open questions / decisions to make

- [ ] Should partials use `<template>` tags or raw HTML? (Currently raw, simpler)
- [ ] Service Worker for offline cache? (Out of scope for prototype)
- [ ] Multi-language support? (Out of scope for prototype)
- [ ] Should `_shared.css` be moved to `tokens.css` + `components.css` + `layout.css`? (When >800KB)
