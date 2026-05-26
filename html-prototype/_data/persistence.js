// PlanAfter prototype persistence layer.
// Mirrors window.peopleStore + window.entriesStore + window.planOwnerPhoto to
// localStorage so data survives a full page reload. No backend yet — purely
// client-side. Storage namespace: planafter:<store>:v1 — bump version when
// shape changes incompatibly.
//
// Load order (in profile.html): peopleStore.js → entriesStore.js → persistence.js
// On script load: read localStorage and OVERRIDE the in-memory defaults from
// peopleStore.js / entriesStore.js when persisted data exists.
//
// After each mutation, callers invoke window.paAutoSave() (debounced ~500ms).
// Or window.paSaveAll() / paSavePeople() / paSaveEntries() / paSavePhoto()
// for explicit immediate save.
(function() {
    'use strict';

    const KEY_PEOPLE  = 'planafter:peopleStore:v2';   // bumped 2026-05-18 — grandparent links swapped (Jane+John Smith → Robert's parents, Ben White → Mary's father). Old v1 cache forced to clear.
    // Bumped to v2 on 2026-05-11 — seed data for Sarah's Essential Info entries
    // was overhauled with full canonical fields/timeline/notes per pragmatic
    // schema. Old localStorage v1 cache is ignored so fresh seed loads.
    const KEY_ENTRIES = 'planafter:entriesStore:v6';
    const KEY_PHOTO   = 'planafter:planOwnerPhoto:v1';

    function loadJSON(key) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) {
            console.warn('[PA persistence] load failed for', key, e);
            return null;
        }
    }

    function saveJSON(key, val) {
        try {
            localStorage.setItem(key, JSON.stringify(val));
            return true;
        } catch (e) {
            // QuotaExceededError or serialization error — surface to user
            console.warn('[PA persistence] save failed for', key, e);
            if (e && e.name === 'QuotaExceededError') {
                console.error('[PA persistence] localStorage quota exceeded — data NOT saved. Consider clearing old uploaded files.');
            }
            return false;
        }
    }

    // ── Public API ────────────────────────────────────────────────────────
    window.paLoadAll = function paLoadAll() {
        // Capture the in-memory seed BEFORE overwriting with localStorage so
        // we can run a non-destructive merge below (preserves user edits but
        // ensures any new seed-side relationship-date fields like custom
        // milestones get added).
        const seedSnapshot = (window.peopleStore || []).map(p => ({
            id: p.id,
            relationships: Array.isArray(p.relationships) ? p.relationships.map(r => ({ toId: r.toId, dates: r.dates ? Object.assign({}, r.dates) : null })) : []
        }));
        const people = loadJSON(KEY_PEOPLE);
        if (Array.isArray(people) && people.length) {
            // Mutate in place so any module that captured a reference to the
            // original array still sees the loaded data.
            window.peopleStore.length = 0;
            people.forEach(p => window.peopleStore.push(p));
            console.log('[PA persistence] loaded peopleStore:', people.length, 'records');
            // ── Non-destructive seed merge (Violetka 2026-05-15) ──
            // For each seed person/relationship, add any rel.dates keys that
            // the seed has but localStorage doesn't. Existing localStorage
            // values WIN (user edits preserved). New custom milestones or
            // canonical date additions get injected without losing data.
            try {
                seedSnapshot.forEach(seedP => {
                    const loadedP = window.peopleStore.find(x => x && x.id === seedP.id);
                    if (!loadedP || !Array.isArray(loadedP.relationships)) return;
                    seedP.relationships.forEach(seedRel => {
                        if (!seedRel || !seedRel.dates) return;
                        const loadedRel = loadedP.relationships.find(r => r && r.toId === seedRel.toId);
                        if (!loadedRel) return;        // skip if loaded data doesn't have this rel
                        loadedRel.dates = loadedRel.dates || {};
                        Object.keys(seedRel.dates).forEach(key => {
                            if (loadedRel.dates[key] === undefined || loadedRel.dates[key] === null || loadedRel.dates[key] === '') {
                                loadedRel.dates[key] = seedRel.dates[key];
                            }
                        });
                    });
                });
            } catch (e) { console.warn('[PA persistence] seed merge failed', e); }
        }
        const entries = loadJSON(KEY_ENTRIES);
        if (entries && typeof entries === 'object') {
            // entriesStore is an object keyed by record id (e.g. 'sj') with
            // categorised arrays inside. Replace top-level keys in place.
            if (window.entriesStore && typeof window.entriesStore === 'object') {
                Object.keys(window.entriesStore).forEach(k => delete window.entriesStore[k]);
                Object.keys(entries).forEach(k => { window.entriesStore[k] = entries[k]; });
            } else {
                window.entriesStore = entries;
            }
            console.log('[PA persistence] loaded entriesStore');
        }
        const photo = loadJSON(KEY_PHOTO);
        if (typeof photo === 'string' && photo) {
            window.planOwnerPhoto = photo;
            console.log('[PA persistence] loaded planOwnerPhoto');
        }
    };

    window.paSavePeople  = function() { return saveJSON(KEY_PEOPLE,  window.peopleStore  || []); };
    window.paSaveEntries = function() { return saveJSON(KEY_ENTRIES, window.entriesStore || {}); };
    window.paSavePhoto   = function() { return saveJSON(KEY_PHOTO,   window.planOwnerPhoto || ''); };

    window.paSaveAll = function paSaveAll() {
        const okP = window.paSavePeople();
        const okE = window.paSaveEntries();
        const okI = window.paSavePhoto();
        return okP && okE && okI;
    };

    // Debounced auto-save — call freely after any mutation. Coalesces multiple
    // mutations within ~500ms into a single localStorage write.
    let saveTimer = null;
    window.paAutoSave = function paAutoSave() {
        if (saveTimer) clearTimeout(saveTimer);
        saveTimer = setTimeout(() => { window.paSaveAll(); saveTimer = null; }, 500);
    };

    // ── Dev utilities ─────────────────────────────────────────────────────
    // Wipe all PA data and reload (full reset to seed defaults).
    window.paClearStorage = function paClearStorage() {
        if (!confirm('Clear all PlanAfter prototype data and reload?\n\nThis cannot be undone (no backup).')) return;
        localStorage.removeItem(KEY_PEOPLE);
        localStorage.removeItem(KEY_ENTRIES);
        localStorage.removeItem(KEY_PHOTO);
        location.reload();
    };

    // Export current state as JSON file (downloadable backup).
    window.paExportJson = function paExportJson() {
        const dump = {
            version: 1,
            exportedAt: new Date().toISOString(),
            peopleStore:    window.peopleStore    || [],
            entriesStore:   window.entriesStore   || {},
            planOwnerPhoto: window.planOwnerPhoto || ''
        };
        const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `planafter-backup-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 0);
    };

    // Import JSON backup (replaces in-memory state + localStorage). Triggers
    // a full reload so all UI re-renders from fresh state.
    window.paImportJson = function paImportJson() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json,.json';
        input.onchange = (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                try {
                    const dump = JSON.parse(ev.target.result);
                    if (Array.isArray(dump.peopleStore)) saveJSON(KEY_PEOPLE, dump.peopleStore);
                    if (dump.entriesStore && typeof dump.entriesStore === 'object') saveJSON(KEY_ENTRIES, dump.entriesStore);
                    if (typeof dump.planOwnerPhoto === 'string') saveJSON(KEY_PHOTO, dump.planOwnerPhoto);
                    alert('Backup imported. Reloading…');
                    location.reload();
                } catch (err) {
                    alert('Invalid backup file: ' + err.message);
                }
            };
            reader.readAsText(file);
        };
        input.click();
    };

    // Storage size in KB (rough — JSON length).
    window.paStorageInfo = function paStorageInfo() {
        const p = (localStorage.getItem(KEY_PEOPLE)  || '').length;
        const e = (localStorage.getItem(KEY_ENTRIES) || '').length;
        const i = (localStorage.getItem(KEY_PHOTO)   || '').length;
        return {
            peopleStoreKB:  Math.round(p / 1024 * 10) / 10,
            entriesStoreKB: Math.round(e / 1024 * 10) / 10,
            photoKB:        Math.round(i / 1024 * 10) / 10,
            totalKB:        Math.round((p + e + i) / 1024 * 10) / 10
        };
    };

    // ── Initial load ──────────────────────────────────────────────────────
    // Fire immediately if document is already past loading (this script may be
    // included with `defer` or at end of body); otherwise wait for DOM ready
    // so peopleStore.js / entriesStore.js have run their default seeds first.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.paLoadAll);
    } else {
        window.paLoadAll();
    }
})();
