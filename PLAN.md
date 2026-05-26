# PlanAfter — Master Execution Plan v2

**Version:** 2.0  
**Started:** 2026-04-28  
**Updated:** 2026-04-28 (after self-critique)  
**Mandate from Violetka:**
1. Strict execution from this moment
2. Split files; small; change once → propagate everywhere (with confirmation)
3. Always keep ≥5 versions back; daily versions for last 10 days; automatic
4. Use design system memory to recover everything
5. Use chat history to restore everything Violetka requested/approved

---

## Working Rules (mandatory)

1. **No destructive operation without confirmation from Violetka.**
2. **Confirmation = explicit "да" / "go" / "одобрявам"** — not implicit.
3. After every completed phase → `git commit` with descriptive message + `git tag phase-N-complete`.
4. Before every `Edit`/`Write` in `html-prototype/*` → automatic snapshot in `_versions/hourly/`.
5. Daily snapshot of entire `html-prototype/` in `_versions/daily/YYYY-MM-DD/`.
6. Pre-commit guard: blocks files >5MB.
7. If file >50KB → flag for splitting into partials.
8. If same pattern in 2+ places → flag for extraction to shared.
9. All work is local. No git push. No cloud. No external services.
10. Session-resilient: SESSION_LOG.md keeps continuity across sessions.

---

## Stop Conditions (auto-halt + ask)

Pause and ask Violetka if any of these occur:
- File grew >5MB unexpectedly
- 3+ errors in a row from same operation
- Estimated RAM usage >2GB
- A page that worked → now broken
- Console errors increase from baseline
- File count in any folder doubles in one session

---

## Versioning Strategy (3 layers)

### Layer 1: Hourly rolling backup (Claude PreToolUse hook)
- File: `html-prototype/_versions/scripts/rolling-backup.sh`
- Trigger: every `Edit`/`Write`/`MultiEdit` on `html-prototype/*`
- Action: copy file BEFORE modification → `_versions/hourly/<filename>_<timestamp>`
- Retention: last 5 versions per file
- Size guard: blocks edit if file currently >5MB (deny)

### Layer 2: System-wide fswatch daemon
- File: `html-prototype/_versions/scripts/fswatch-daemon.sh`
- Catches ANY change (manual editor, other tools, OS, etc.) — not just Claude's
- Action: copies changed file → `_versions/hourly/<filename>_<timestamp>`
- Runs in background via `launchd` (macOS native)

### Layer 3: Daily snapshot (full folder copy)
- File: `html-prototype/_versions/scripts/daily-snapshot.sh`
- Trigger: SessionStart hook + 9am daily cron
- Action: rsync entire `html-prototype/` → `_versions/daily/YYYY-MM-DD/`
- Retention: last 10 daily snapshots
- First snapshot: 2026-04-28 ✅

### Layer 4: Git commits (infinite history)
- After every completed step
- `git tag phase-N-complete` before destructive phases (rollback point)

---

## Recovery Tools

### `restore.sh` — one-command rollback
```bash
./restore.sh _shared.js                    # restore from latest hourly backup
./restore.sh _shared.js 2026-04-27        # restore from specific daily snapshot
./restore.sh _shared.js git HEAD           # restore from last git commit
./restore.sh --list _shared.js             # list all available versions
```

---

## Architecture (target structure)

```
html-prototype/
├── PROTOTYPE_MAP.md          ← living inventory
├── ARCHITECTURE.md            ← technical spec
├── SESSION_LOG.md             ← cross-session continuity
├── _shared.css                ← single shared CSS (≤800KB)
├── _shared.js                 ← single shared JS (≤300KB)
│
├── _partials/                 ← reusable HTML fragments
│   ├── header.html
│   ├── sidebar.html
│   ├── ai-panel.html
│   ├── progress-panel.html
│   └── card-*.html (one per card type)
│
├── _modals/                   ← lazy-loaded modals
│   ├── modal-edit-essential.html
│   ├── modal-edit-medical.html
│   └── ...
│
├── _data/                     ← SSOT data stores
│   ├── peopleStore.js
│   ├── plansStore.js
│   └── partial-loader.js     ← loads partials via fetch()
│
├── _versions/
│   ├── hourly/                ← rolling backup (last 5 per file)
│   ├── daily/                 ← daily snapshots (last 10 days)
│   └── scripts/
│       ├── rolling-backup.sh
│       ├── daily-snapshot.sh
│       └── fswatch-daemon.sh
│
├── _archive/                  ← retired files
│
├── pages (top-level):
│   ├── index.html              (dashboard, ≤50KB)
│   ├── profile.html            (PlanOwner, ≤30KB shell)
│   ├── record.html             (GENERIC for family/network/pet)
│   ├── family.html, network.html, vault.html, ...
│   └── post-loss-*.html
│
├── img/, icons/, fonts/
└── print/                     ← print pages (already split) ✅
```

### How partials load
```js
// _data/partial-loader.js
async function loadPartial(name, target) {
  const res = await fetch(`/_partials/${name}.html`);
  if (!res.ok) throw new Error(`Failed: ${name}`);
  target.innerHTML = await res.text();
  // Execute any <script> inside the partial
  target.querySelectorAll('script').forEach(s => {
    const newScript = document.createElement('script');
    newScript.textContent = s.textContent;
    s.replaceWith(newScript);
  });
}
```

---

## Phases (with Definition of Done)

### Phase 0: Safety Net — `git tag phase-0-baseline`

- [x] **0.1** Restore corrupted/missing files from git
- [x] **0.2** Write PLAN.md
- [x] **0.3** Create _versions/hourly/, _versions/daily/, _versions/scripts/
- [x] **0.4** Write rolling-backup.sh + daily-snapshot.sh
- [x] **0.5** Add hooks to .claude/settings.local.json
- [x] **0.6** First daily snapshot (2026-04-28)
- [x] **0.7** Initial git commit (bd4df3d)
- [x] **0.8** Update PLAN.md to v2 ← in progress
- [x] **0.9** Create SESSION_LOG.md, ARCHITECTURE.md, PROTOTYPE_MAP.md, RECOVERY_LOG.md
- [x] **0.10** Write restore.sh
- [x] **0.11** Setup fswatch launchd daemon
- [x] **0.12** Schedule 24h health check (cron)
- [x] **0.13** End-to-end verification
- [x] **0.14** Final commit + `git tag phase-0-baseline`

**Definition of Done:**
- All scripts executable + tested
- Hook fires on test edit (verified)
- Daily snapshot folder size sane (~16MB)
- restore.sh successfully rolls back a test file
- 24h health-check task scheduled and visible
- Git tag `phase-0-baseline` created

---

### Phase 1: Read & Reconcile Design System (10 min)

- [ ] **1.1** Read `docs/design/DESIGN_SYSTEM_LIVE.md` (2058 lines)
- [ ] **1.2** Read `html-prototype/SPECS.md`
- [ ] **1.3** Read all `feedback_*.md` from memory
- [ ] **1.4** Build list of confirmed patterns (RECOVERED_PATTERNS.md)
- [ ] **1.5** Reconcile: which patterns are implemented in current code, which missing
- [ ] **1.6** Output: `RECOVERED_PATTERNS.md` with status per pattern

**Definition of Done:**
- RECOVERED_PATTERNS.md exists with table: pattern | source | implemented? | location
- Every pattern has explicit ✅/❌/⚠ status

---

### Phase 2: Test Current State (15 min)

- [ ] **2.1** Screenshot every top-level HTML page (26 pages)
- [ ] **2.2** Capture console errors per page
- [ ] **2.3** Identify missing functionality (cross-ref Phase 1 list)
- [ ] **2.4** Output: `STATE_REPORT.md` with works/broken/missing per page

**Definition of Done:**
- All 26 pages have screenshot + console error count documented
- Top 10 missing features prioritized
- Violetka has reviewed and confirmed priority order

---

### Phase 3: Architecture Documents (20 min)

- [x] **3.1** Outline ARCHITECTURE.md
- [ ] **3.2** Spec partial loader (fetch + script exec)
- [ ] **3.3** Spec data stores (peopleStore, plansStore, tasksStore)
- [ ] **3.4** Spec record.html generic shell
- [ ] **3.5** Spec modal lazy-load system

**Definition of Done:**
- ARCHITECTURE.md is reference doc Violetka can show new dev
- Each subsystem has: purpose | API | example usage | where used

---

### Phase 4: Split a SINGLE record (proof of concept)

⚠ **Stop and confirm before starting.**

- [ ] **4.1** Create `git tag before-phase-4`
- [ ] **4.2** Pick easiest record file (likely `record-pet.html`)
- [ ] **4.3** Extract header → `_partials/header.html`
- [ ] **4.4** Extract sidebar → `_partials/sidebar.html`
- [ ] **4.5** Extract AI panel → `_partials/ai-panel.html`
- [ ] **4.6** Extract overview cards → `_partials/record-overview.html`
- [ ] **4.7** Extract modals → `_modals/*`
- [ ] **4.8** Wire `record.html?type=pet` → loads correct partials
- [ ] **4.9** Verify: file size ≤30KB, page works, no console errors
- [ ] **4.10** Screenshot vs original — visual diff acceptable

**Definition of Done:**
- New record-pet experience identical to original
- Original record-pet.html size 482KB → new shell ≤30KB
- All partials individually <50KB
- Zero console errors
- Violetka has visually confirmed it looks the same
- Git tag `phase-4-pet-complete`

**Stop condition:** if any step adds >100ms perceived load delay → halt + investigate.

---

### Phase 5: Apply pattern to all records + pages

⚠ **Only after Phase 4 success and Violetka's "go".**

- [ ] **5.1** record-family.html using same partials (only data changes)
- [ ] **5.2** record-network.html same
- [ ] **5.3** profile.html (more complex — has 7 cards + tabs)
- [ ] **5.4** index.html (dashboard — has Progress panel)
- [ ] **5.5** Other pages one by one
- [ ] **5.6** Delete duplicate record-*.html files (move to _archive/)

---

### Phase 6: Recover lost functionality

⚠ Ongoing — driven by Violetka's descriptions of what's missing.

- For each item Violetka identifies as missing/broken:
  - [ ] Document in MISSING_FEATURES.md with description + priority
  - [ ] Implement
  - [ ] Verify with Violetka
  - [ ] Mark complete + commit

---

## Daily Health-Check (24h cron)

A scheduled task runs every 24 hours and reports:
1. Total project file count vs yesterday (alert if doubled)
2. Largest 5 files (alert if any >5MB)
3. Days since last commit
4. Daily snapshot status (last 10 days exist?)
5. Hourly backup health (any folder >100 files?)
6. fswatch daemon running?
7. Phase progress per PLAN.md
8. Any new errors in browser console?

Output: report message Violetka receives. If she doesn't respond in 24h, the report waits.

---

## Status Log

See SESSION_LOG.md for live updates per session.

---

## Files in this safety system

| File | Purpose |
|------|---------|
| PLAN.md | This file — master plan |
| SESSION_LOG.md | Per-session entries, last entry = where to resume |
| ARCHITECTURE.md | Technical spec for partials/modals/data stores |
| PROTOTYPE_MAP.md | Living inventory of every page |
| RECOVERY_LOG.md | Today's catastrophe + lessons |
| RECOVERED_PATTERNS.md | (Phase 1) Patterns from design system |
| STATE_REPORT.md | (Phase 2) Per-page health |
| MISSING_FEATURES.md | (Phase 6) Track recovery work |
| _versions/scripts/restore.sh | Rollback tool |
| _versions/scripts/rolling-backup.sh | PreToolUse hook |
| _versions/scripts/daily-snapshot.sh | SessionStart hook + 9am cron |
| _versions/scripts/fswatch-daemon.sh | System-wide watcher |
