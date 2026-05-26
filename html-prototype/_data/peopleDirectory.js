// peopleDirectory.js — renders family.html and network.html lists from peopleStore.
// Uses person.role directly (e.g. "Husband", "Biological Daughter", "Ex-husband").
// Mounts: [data-fm-mount] for family, [data-net-mount] for network.

(function() {
    'use strict';

    function calcAge(dob) {
        if (!dob) return '';
        const birth = new Date(dob);
        if (isNaN(birth.getTime())) return '';
        const now = new Date();
        let age = now.getFullYear() - birth.getFullYear();
        const m = now.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
        return age;
    }

    function formatDOB(dob) {
        if (!dob) return '';
        const d = new Date(dob);
        if (isNaN(d.getTime())) return '';
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    // ─── Group families by relationship type ───
    function groupFamily(people, planOwnerId) {
        const groups = {
            'Spouse / Partner':         [],
            'Former Spouse / Partners': [],
            'Children':                 [],
            'Parents':                  [],
            'Siblings':                 [],
            'Grandparents':             [],
            'Grandchildren':            [],
            'Pets':                     [],
            'Extended Family':          []
        };
        const planOwner = people.find(p => p.id === planOwnerId);
        const ownerRels = (planOwner && planOwner.relationships) || [];

        // Precompute DERIVED relationships from Plan Owner's POV (in-laws,
        // grandparents, step-relations, etc.) so cross-record additions land
        // in the right group. Violetka 2026-05-18 bug fix: previously, adding
        // a spouse to Emma's record correctly created Emma↔Marcus edges, but
        // Marcus showed up under "Spouse / Partner" in My Family because the
        // fallback to person.roleLayer1 used Emma's POV label ("Spouse").
        // Now we look up Marcus → Sarah's POV via paGetRelationshipsForPerson
        // and get derivedLayer2 = "Son-in-Law" → categorized under Extended.
        const planOwnerDerivedRels = (typeof window.paGetRelationshipsForPerson === 'function')
            ? window.paGetRelationshipsForPerson(planOwnerId) : [];
        const derivedByPersonId = {};
        planOwnerDerivedRels.forEach(function(r) {
            if (r && r.person && r.person.id) {
                derivedByPersonId[r.person.id] = r;
            }
        });

        // Determine the relationship type FROM the Plan Owner's perspective
        // for a given person. Resolution order:
        //   1. Direct edge Sarah → person (canonical bidirectional storage)
        //   2. DERIVED relationship from paGetRelationshipsForPerson (in-laws,
        //      step-relations, grandparents — POV-correct)
        //   3. Reverse edge person → Sarah (legacy fallback for old data)
        //   4. person.roleLayer1 (last-resort, may use wrong POV but better
        //      than nothing for legacy records)
        // Returns lowercase strings for case-insensitive regex matching.
        function relTypeFor(p) {
            const direct = ownerRels.find(r => r.toId === p.id);
            if (direct && direct.type) return String(direct.type).toLowerCase();
            // Use derived from Plan Owner's POV (handles Marcus as Son-in-Law)
            const derived = derivedByPersonId[p.id];
            if (derived) {
                // Prefer edgeType (canonical) → in-law-child, in-law-sibling, etc.
                if (derived.edgeType) return String(derived.edgeType).toLowerCase();
                if (derived.derivedLayer2) return String(derived.derivedLayer2).toLowerCase();
            }
            const reverse = (p.relationships || []).find(r => r.toId === planOwnerId);
            if (reverse && reverse.type) return String(reverse.type).toLowerCase();
            return String(p.roleLayer1 || '').toLowerCase();
        }

        people.forEach(p => {
            if (p.id === planOwnerId) return; // self handled separately
            // Skip in-progress create stubs and unnamed records
            if (p._isNew) return;
            if (!(p.name || '').trim() && !(p.firstName || '').trim() && !(p.familyName || '').trim()) return;
            // Network records belong in network directory, NEVER in Family
            // (Violetka 2026-05-13: "my network records have no business here").
            const isNetwork = (p.categories || []).includes('network');
            if (isNetwork) return;
            const t = relTypeFor(p);
            const role1 = String(p.roleLayer1 || '').toLowerCase();
            const isPet = /\bpet/.test(t) || /\bpet/.test(role1) || (p.categories || []).includes('pet');

            // Match BOTH new canonical Layer 1 names (Spouses / Partners,
            // Children, Parents, Siblings, Grandparents, Grandchildren, Pets,
            // Other) AND legacy/short names (spouse, child, parent, sibling,
            // grandparent, grandchild, pet).
            if (/^spouses?\s*\/\s*partners?$|^spouse|^partner|^husband|^wife|^civil partner|^fianc/.test(t)) {
                groups['Spouse / Partner'].push(p);
            }
            else if (/former|ex[- ]husband|ex[- ]wife/.test(t)) {
                groups['Former Spouse / Partners'].push(p);
            }
            else if (/^children$|^child$/.test(t)) {
                groups['Children'].push(p);
            }
            else if (/^parents$|^parent$/.test(t)) {
                groups['Parents'].push(p);
            }
            else if (/^siblings$|^sibling$/.test(t)) {
                groups['Siblings'].push(p);
            }
            else if (/^grandparents$|^grandparent$/.test(t)) {
                groups['Grandparents'].push(p);
            }
            else if (/^grandchildren$|^grandchild$/.test(t)) {
                groups['Grandchildren'].push(p);
            }
            else if (isPet || /^pets?$/.test(t)) {
                groups['Pets'].push(p);
            }
            else {
                groups['Extended Family'].push(p);
            }
        });
        return groups;
    }

    // ─── Render a Linked Summary Card ───
    function renderPersonCard(person, opts) {
        opts = opts || {};
        const isSelf = opts.isSelf || false;

        const photo = person.photo || '';
        const initials = ((person.firstName || person.name || '?').charAt(0) +
                          (person.familyName || '').charAt(0)).toUpperCase() || '??';
        const dob = formatDOB(person.dob);
        const age = calcAge(person.dob);
        const lifeDotClass = person.alive === false ? 'deceased' : 'alive';

        // Role line — Plan Owner's POV per spec. Violetka 2026-05-18: e.g. when
        // Emma's husband (Marcus) is added via Emma's record, his roleLayer2
        // is "Husband" (Emma's POV) but on Sarah's My Family directory he must
        // read "Son-in-Law" (Sarah's POV). Look up the derived relationship
        // from Plan Owner first; only fall back to person.role / roleLayer2
        // if no Plan-Owner-POV info exists (legacy data).
        let roleText = '';
        if (isSelf) {
            roleText = 'This is You';
        } else {
            // Try to resolve from Plan Owner's POV via paGetRelationshipsForPerson
            if (typeof window.paGetRelationshipsForPerson === 'function') {
                try {
                    var poRels = window.paGetRelationshipsForPerson('sj') || [];
                    var poRel  = poRels.find(function(r){ return r && r.person && r.person.id === person.id; });
                    if (poRel && poRel.derivedLayer2) {
                        roleText = poRel.derivedLayer2;
                    }
                } catch (e) {}
            }
            // Legacy / direct-edge fallback
            if (!roleText) {
                roleText = person.role || person.roleLayer2 || person.roleLayer1 || '';
            }
            // For pets, append breed
            if (person.roleLayer2 && person.roleLayer1 === 'Pet') {
                roleText = 'Pet · ' + person.roleLayer2;
            }
        }

        // "Since DATE" suffix for spouses
        let sinceText = '';
        if (!isSelf && (person.relationshipSince || person.notes)) {
            const since = person.relationshipSince
                || (person.notes && (person.notes.match(/since (\d{4})/i) || [])[1]);
            if (since && (person.role === 'Husband' || person.role === 'Wife')) {
                sinceText = '<span class="pd-since-sep">·</span><span class="pd-since">Since Sep 28, 2005</span>';
            }
        }

        // Top-right badge
        let badge = '';
        if (isSelf) {
            badge = '<div class="pd-badge pd-badge-owner">Plan Owner</div>';
        } else if (person.alive === false) {
            badge = '<div class="pd-badge pd-badge-memorial">In Memory</div>';
        } else if (person.sharedTo && person.sharedTo.length) {
            const labels = person.sharedTo.map(s => s[0].toUpperCase() + s.slice(1)).join(', ');
            badge = '<div class="pd-badge pd-badge-role">' + labels + '</div>';
        }

        // Violetka 2026-05-16: ".pd-card-menu" was just dots with NO onclick
        // and NO dropdown — clicking the dots bubbled to the card's
        // openPersonRecord handler, opening the record instead of showing
        // the menu.
        //
        // Fix: wrap .pd-card in .pd-card-host (position:relative anchor),
        // add e.stopPropagation + frOpenMenu to the dots, and emit a
        // canonical .fr-dropdown sibling OUTSIDE the .pd-card (.pd-card has
        // overflow:hidden which would clip the dropdown if it were a child).
        // Plan Owner card gets no "Remove" item — can't remove yourself.
        const idEsc = String(person.id || '').replace(/'/g, "\\'");
        /* Canonical menu icons (Violetka 2026-05-26 — "ползваме
           навсякъде тази икона" for each):
             - Update Relationship → img/users.png (20×18, ships in
               black — no filter needed)
             - Add Family          → img/user-plus.png (20×20, ships
               white-stroke for dark-bar context; filter-inverted
               to black for the light dropdown pad)
             - Update Life Status  → img/condition.svg (24×20, ships
               white-fill for dark-bar context; same filter-invert) */
        const updateRelationshipSvg = '<img src="img/users.png" srcset="img/users@2x.png 2x" width="20" height="18" alt="" class="fr-dd-icon-img" style="display:block">';
        const addFamilySvg          = '<img src="img/user-plus.png" srcset="img/user-plus@2x.png 2x" width="20" height="20" alt="" class="fr-dd-icon-img fr-dd-icon-img--invert" style="display:block">';
        const lifeStatusSvg         = '<img src="img/condition.svg" width="24" height="20" alt="" class="fr-dd-icon-img fr-dd-icon-img--invert" style="display:block">';
        const updateRelationshipItem = `
                    <div class="fr-dropdown-item" onclick="event.stopPropagation();window.frUpdateRelationship && window.frUpdateRelationship('${idEsc}')">
                        <span class="fr-dropdown-item-text">Update Relationship</span>
                        <div class="fr-dropdown-item-circle">${updateRelationshipSvg}</div>
                    </div>`;
        const addFamilyItem = `
                    <div class="fr-dropdown-item" onclick="event.stopPropagation();window.frAddFamily && window.frAddFamily('${idEsc}')">
                        <span class="fr-dropdown-item-text">Add Family</span>
                        <div class="fr-dropdown-item-circle">${addFamilySvg}</div>
                    </div>`;
        /* Life Status only applies to non-Plan-Owner records (Plan Owner
           manages their own life status via My Profile, not via the family
           card menu). */
        const lifeStatusItem = isSelf ? '' : `
                    <div class="fr-dropdown-item" onclick="event.stopPropagation();window.frUpdateLifeStatus && window.frUpdateLifeStatus('${idEsc}')">
                        <span class="fr-dropdown-item-text">Update Life Status</span>
                        <div class="fr-dropdown-item-circle">${lifeStatusSvg}</div>
                    </div>`;
        /* View-aware rendering (Violetka 2026-05-26 "ВЕРНИ list view
           на сумари картите както си бяха - казах ти да промениш само
           galery view на Family Members"). DEFAULT (List view) keeps
           the original wide 600×120 pill card untouched. The TILE
           layout (290×192, mirror of .aa-tile from Assets - All Active)
           applies ONLY when the family page is in Gallery view, gated
           by `body.fm-view-gallery` (set by the filter's View selector). */
        const isGalleryView = typeof document !== 'undefined'
            && document.body
            && document.body.classList.contains('fm-view-gallery');
        if (isGalleryView) {
            const isDeceased = person.alive === false;
            /* Top-left pill (Violetka 2026-05-26 — "1. категорията като
               Spouse/Partner, Former Spouse/Partner, Children и т.н. да
               е на самата сумари карта в горен ляв ъгъл, където в Assets
               and Liabilities в този изглед е Active/Archived etc."):
               shows the FAMILY GROUP NAME (Spouse / Partner, Children,
               etc.) passed in via opts.groupName from renderFamilyDirectory.
               Falls back to roleLayer1 if no group name available. */
            const topStatusLabel = (opts && opts.groupName)
                || person.roleLayer1
                || person.role
                || 'Family';
            const topStatusColor = '#61C553';
            /* Footer typography (Violetka 2026-05-26 reference):
                 Living   → "Date of Birth: [DOB] • Age: [N]"
                 Deceased → "In Memory: [DOB] • [DoD]"
               Labels are 12/15 #000 opacity 0.5; values are 14/18 #000
               weight 600; the • bullet matches label styling. */
            let footerHtml;
            if (isDeceased) {
                const dodFmt = person.dod ? formatDOB(person.dod) : '—';
                footerHtml = `
                    <span class="fr-tile-ftr-label">In Memory:</span>
                    <span class="fr-tile-ftr-value">${dob || '—'}</span>
                    <span class="fr-tile-ftr-bullet">•</span>
                    <span class="fr-tile-ftr-value">${dodFmt}</span>
                `;
            } else {
                const ageStr = (age !== '' && age != null) ? String(age) : '—';
                footerHtml = `
                    <span class="fr-tile-ftr-label">Date of Birth:</span>
                    <span class="fr-tile-ftr-value">${dob || '—'}</span>
                    <span class="fr-tile-ftr-bullet">•</span>
                    <span class="fr-tile-ftr-label">Age:</span>
                    <span class="fr-tile-ftr-value">${ageStr}</span>
                `;
            }
            /* Subcategory line = role + since text. The List-view's
               `sinceText` was scoped to spouses; here we keep the same
               logic so married members read "Husband · Since [date]". */
            const subRoleHtml = sinceText
                ? `${roleText}<span class="fr-tile-sub-sep">&nbsp;·&nbsp;</span><span class="fr-tile-sub-since">${(sinceText.match(/Since [^<]+/)||['Since'])[0]}</span>`
                : roleText;
            /* Avatar — person's PHOTO fills the visible circle (replacing
               the white inner placeholder). Life-status dot 10×10 overlays
               top-left of the avatar (green Living, red Deceased). */
            const avatarInner = photo
                ? `<img class="fr-tile-avatar-photo" src="${photo}" alt="${person.name || ''}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                   <div class="fr-tile-avatar-initials" style="display:none">${initials}</div>`
                : `<div class="fr-tile-avatar-initials" style="display:flex">${initials}</div>`;
            const lifeDotCls = isDeceased ? 'fr-tile-life-dot deceased' : 'fr-tile-life-dot';
            /* NOTE: do NOT add `.pd-card` class here — there's existing CSS
               (`.fm-view-gallery [data-fm-mount] .pd-card`) at line ~30260
               that ADDS a `::before` "● Living" text + forces its own grid
               layout. Adding .pd-card on tiles would re-introduce that
               conflicting markup. Tile uses .fr-tile class ONLY. */
            return `
                <div class="pd-card-host fr-tile-host">
                    <div class="fr-tile${isSelf ? ' fr-tile-self' : ''}" data-person-id="${person.id}"
                         onclick="window.openPersonRecord && window.openPersonRecord('${person.id}')">
                        <div class="fr-tile-top">
                            <span class="fr-tile-category">${topStatusLabel}</span>
                            <button class="fr-tile-menu" type="button" aria-label="Options"
                                    onclick="event.stopPropagation();window.frOpenMenu && window.frOpenMenu('${idEsc}',event)">
                                <svg viewBox="0 0 13 3" fill="currentColor"><circle cx="1.5" cy="1.5" r="1.5"/><circle cx="6.5" cy="1.5" r="1.5"/><circle cx="11.5" cy="1.5" r="1.5"/></svg>
                            </button>
                        </div>
                        <div class="fr-tile-avatar">
                            ${avatarInner}
                            <div class="${lifeDotCls}"></div>
                        </div>
                        <div class="fr-tile-info">
                            <h3 class="fr-tile-name">${person.name || ''}</h3>
                            <p class="fr-tile-sub">${subRoleHtml}</p>
                        </div>
                        <div class="fr-tile-footer">${footerHtml}</div>
                    </div>
                    <div class="fr-dropdown" id="fr-dd-${idEsc}" onclick="event.stopPropagation()">
                        <div class="fr-dropdown-trigger"><div class="fr-menu-dots"><span></span><span></span><span></span></div></div>
                        ${updateRelationshipItem}${addFamilyItem}${lifeStatusItem}
                    </div>
                </div>
            `;
        }
        /* DEFAULT (List view) — original .pd-card 600×120 pill card,
           UNCHANGED from before the tile-view experiment. */
        return `
            <div class="pd-card-host">
                <div class="pd-card${isSelf ? ' pd-card-self' : ''}" data-person-id="${person.id}"
                     onclick="window.openPersonRecord && window.openPersonRecord('${person.id}')">
                    <div class="pd-avatar-wrap">
                        ${photo ? `<img class="pd-avatar" src="${photo}" alt="${person.name || ''}"
                             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : ''}
                        <div class="pd-avatar-initials" style="display:${photo ? 'none' : 'flex'}">${initials}</div>
                        <div class="pd-life-dot ${lifeDotClass}"></div>
                    </div>
                    <div class="pd-card-info">
                        <div class="pd-card-name">${person.name || ''}</div>
                        <div class="pd-card-role">${roleText}${sinceText}</div>
                        <div class="pd-card-dob">
                            <span class="pd-dob-label">Date of Birth:</span>
                            <span class="pd-dob-value">${dob}</span>
                            <span class="pd-dot-sep"></span>
                            ${person.alive === false && person.dod
                                ? '<span class="pd-age-label">Date of Death:</span><span class="pd-age-value">' + formatDOB(person.dod) + '</span>'
                                : '<span class="pd-age-label">Age:</span><span class="pd-age-value">' + (age || '') + '</span>'}
                        </div>
                    </div>
                    <div class="pd-card-right">${badge}</div>
                    <div class="pd-card-menu" title="Options" onclick="event.stopPropagation();window.frOpenMenu && window.frOpenMenu('${idEsc}',event)">
                        <span class="pd-menu-dots"><span></span><span></span><span></span></span>
                    </div>
                </div>
                <div class="fr-dropdown" id="fr-dd-${idEsc}" onclick="event.stopPropagation()">
                    <div class="fr-dropdown-trigger"><div class="fr-menu-dots"><span></span><span></span><span></span></div></div>
                    ${updateRelationshipItem}${addFamilyItem}${lifeStatusItem}
                </div>
            </div>
        `;
    }

    // ─── Render top "My Family" overview card (avatars row) ───
    function renderFamilyOverview(people, planOwnerId) {
        const sarah = people.find(p => p.id === planOwnerId);
        const ownerRels = (sarah && sarah.relationships) || [];
        // Show: Sarah + spouse + children (max 6 total)
        const showIds = [planOwnerId];
        ownerRels.forEach(r => {
            if (r.type === 'spouse' && showIds.length < 6) showIds.push(r.toId);
        });
        ownerRels.forEach(r => {
            if (r.type === 'child' && showIds.length < 6) showIds.push(r.toId);
        });

        const html = showIds.map(id => {
            const p = people.find(x => x.id === id);
            if (!p) return '';
            const photo = p.photo || '';
            const initials = ((p.firstName || '?').charAt(0) + (p.familyName || '').charAt(0)).toUpperCase() || '??';
            return `
                <div class="pd-overview-item">
                    <div class="pd-overview-avatar">
                        <img src="${photo}" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                        <div class="pd-overview-initials" style="display:${photo ? 'none' : 'flex'}">${initials}</div>
                    </div>
                    <div class="pd-overview-name">${p.firstName || p.name}</div>
                </div>
            `;
        }).join('');

        return `
            <div class="pd-overview-card">
                <h2 class="pd-overview-title">My Family</h2>
                <div class="pd-overview-row">${html}</div>
            </div>
        `;
    }

    // ─── Render My Family page ───
    window.renderFamilyDirectory = function() {
        const mount = document.querySelector('[data-fm-mount]');
        if (!mount || !window.peopleStore) return;

        const planOwnerId = 'sj';
        const sarah = window.peopleStore.find(p => p.id === planOwnerId);
        const groups = groupFamily(window.peopleStore, planOwnerId);

        // Render overview into separate mount above tabs (if exists)
        const overviewMount = document.querySelector('[data-fm-overview-mount]');
        if (overviewMount) {
            overviewMount.innerHTML = renderFamilyOverview(window.peopleStore, planOwnerId);
        }

        let html = '';
        // "All Family Members" heading at top of mount
        html += '<h2 class="pd-section-heading">All Family Members</h2>';
        // NO Plan Owner card here (Violetka 2026-05-16: "premahni sumary card
        // na Plan ownera - sara"). Sarah appears in the avatar overview row
        // ABOVE the tabs — showing her as a card in her own directory feels
        // self-referential. The overview already represents her.
        // Groups
        /* In Gallery view, ALL family members render in a single flat
           2-column grid — no section headings between groups (each card
           already shows its category label in the top-left, so the
           grouping headings would be redundant). Matches the Assets
           "All Active" layout exactly (Violetka 2026-05-26 "в изглед
           Gallery махни категориите като заглавия и подреди картите
           една до друга 2 колони надолу като Assets and Liabilities").
           In List view (default), keep the canonical grouped headings
           with stacked .pd-card pill cards underneath. */
        const galleryGrid = (typeof document !== 'undefined'
            && document.body
            && document.body.classList.contains('fm-view-gallery'));
        if (galleryGrid) {
            html += '<div class="pd-tile-grid">';
            Object.keys(groups).forEach(groupName => {
                const ppl = groups[groupName];
                if (!ppl.length) return;
                ppl.forEach(p => { html += renderPersonCard(p, { groupName: groupName }); });
            });
            html += '</div>';
        } else {
            Object.keys(groups).forEach(groupName => {
                const ppl = groups[groupName];
                if (!ppl.length) return;
                html += `<h3 class="pd-group-heading">${groupName}</h3>`;
                ppl.forEach(p => { html += renderPersonCard(p, { groupName: groupName }); });
            });
        }

        // "Add Family Member" pseudo-card REMOVED 2026-05-16 per Violetka.
        // The header action-sidebar already has a canonical "Add Family"
        // button; a duplicate dashed-pill at the bottom of the list was
        // visual noise. (Real flow: header sidebar → opens Quick Add panel.)

        mount.innerHTML = html;
    };

    // Network subcategory mapping (Violetka 2026-05-13 spec — same as the
    // analytics card categories on network.html). Group order is canonical;
    // empty groups are skipped from the rendered output.
    const NETWORK_SUBCATEGORIES = [
        'Health Professionals',
        'Legal Professionals',
        'Financial Professionals',
        'Friends',
        'Professional',
        'Spiritual',
        'Other'
    ];
    // Heuristic role → subcategory mapping. Inspects roleLayer2 / roleLayer1
    // / role fields case-insensitively for keywords. Falls through to "Other"
    // when nothing matches.
    function getNetworkSubcategory(person) {
        const role = ((person.roleLayer2 || person.roleLayer1 || person.role || '') + '').toLowerCase();
        if (/doctor|therap|counsel|psych|nurse|physio|dentist|surgeon|pediatric|cardio|neuro|optician|optom|gp\b/.test(role)) return 'Health Professionals';
        if (/lawyer|attorney|solicitor|notary|barrister|advocate|paralegal/.test(role)) return 'Legal Professionals';
        if (/accountant|financial|banker|broker|advisor.*financ|wealth|cpa|treasurer|tax\b/.test(role)) return 'Financial Professionals';
        if (/friend|buddy|companion|neighbour|neighbor/.test(role)) return 'Friends';
        if (/priest|pastor|rabbi|imam|spiritual|monk|nun|chaplain/.test(role)) return 'Spiritual';
        if (/colleague|mentor|coach|teacher|professor|tutor|instructor|supervisor|advisor|consultant|partner.*work|associate/.test(role)) return 'Professional';
        return 'Other';
    }
    window.getNetworkSubcategory = getNetworkSubcategory;

    // ─── Render My Network page — XD-LOCKED Violetka 2026-05-13:
    // Contacts are GROUPED by subcategory (Health / Legal / Financial / Friends /
    // Professional / Spiritual / Other) with a subheading above each group.
    // No flat "All Network Contacts" list anymore. Empty groups are skipped. ───
    window.renderNetworkDirectory = function() {
        const mount = document.querySelector('[data-net-mount]');
        if (!mount || !window.peopleStore) return;
        const network = window.peopleStore.filter(p => (p.categories || []).includes('network'));
        // Group by canonical subcategory
        const groups = {};
        NETWORK_SUBCATEGORIES.forEach(cat => groups[cat] = []);
        network.forEach(p => {
            const cat = getNetworkSubcategory(p);
            (groups[cat] || groups['Other']).push(p);
        });
        let html = '';
        NETWORK_SUBCATEGORIES.forEach(cat => {
            if (!groups[cat].length) return;
            html += `<h3 class="pd-group-heading">${cat}</h3>`;
            groups[cat].forEach(p => { html += renderPersonCard(p); });
        });
        if (!network.length) html = '<div class="pd-empty">No network contacts yet.</div>';
        mount.innerHTML = html;
    };

    // ─── Auto-init ───
    function autoInit() {
        if (document.querySelector('[data-fm-mount]'))  window.renderFamilyDirectory();
        if (document.querySelector('[data-net-mount]')) window.renderNetworkDirectory();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoInit);
    else autoInit();

    // ─── openPersonRecord helper ───
    if (typeof window.openPersonRecord !== 'function') {
        window.openPersonRecord = function(personId) {
            const p = (window.peopleStore || []).find(x => x.id === personId);
            if (!p) return;
            let type = 'family';
            if ((p.categories || []).includes('network')) type = 'network';
            else if ((p.categories || []).includes('pet') || p.role === 'Pet' || (p.roleLayer1 || '').toLowerCase().includes('pet')) type = 'pet';
            location.href = `record-${type}.html#${personId}`;
        };
    }
})();
