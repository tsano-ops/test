/* =============================================================
 * familyTree.js — PlanAfter Family Tree Renderer (Phase 1)
 * =============================================================
 * Builds and renders a multi-generation family tree from peopleStore.
 *
 * Canonical direction (LOCKED Violetka 2026-05-18):
 *   TOP    : Great-grandparents → Grandparents → Parents (ancestors UP)
 *   CENTER : Anchor + Spouses (horizontal) + Siblings (same row)
 *   BOTTOM : Children → Grandchildren → Great-grandchildren (descendants DOWN)
 *
 * Default anchor = Plan Owner ('sj'). Click-to-recenter (Phase 2) will
 * change anchor via window.__paTreeFocusId state.
 *
 * Public API:
 *   window.paBuildTreeForAnchor(anchorId, opts) → layout object
 *   window.paRenderTree(layout, container)       → mutates container
 *   window.paFamilyTreeMount(anchorId, opts)     → convenience init
 *
 * Layout output shape:
 *   {
 *     anchor: { person, x, y },
 *     ancestors:    [[gen1=parents], [gen2=grandparents], ...],
 *     descendants:  [[gen1=children], [gen2=grandchildren], ...],
 *     spouses:      [{ person, type: 'current'|'ex', dates }],
 *     siblings:     [person, ...],
 *     inLaws:       [{ person, throughSpouseId }],
 *     couples:      [{ p1Id, p2Id, type, childrenIds }],
 *     ghosts:       [person, ...]   // in-laws + placeholder slots
 *   }
 */
(function () {
    'use strict';

    // ────────────────────────────────────────────────────────────
    // Layout constants — PlanAfter spec, Violetka 2026-05-18
    // ────────────────────────────────────────────────────────────
    var CARD_W = 140;
    var CARD_H = 64;
    var GEN_GAP = 120;       // vertical gap between generations
    var SIBLING_GAP = 20;    // horizontal gap between siblings
    var COUPLE_GAP = 40;     // horizontal gap inside a couple
    var GHOST_OPACITY = 0.5; // in-law / placeholder cards

    // ────────────────────────────────────────────────────────────
    // Helpers
    // ────────────────────────────────────────────────────────────
    function peopleById(id) {
        if (!id || !Array.isArray(window.peopleStore)) return null;
        return window.peopleStore.find(function (p) { return p && p.id === id; }) || null;
    }

    function relsOf(person) {
        return (person && Array.isArray(person.relationships)) ? person.relationships : [];
    }

    function isParentType(t) {
        return /^(parent|step-parent|adoptive-parent|foster-parent|mother|father)$/i.test(String(t || ''));
    }
    function isChildType(t) {
        return /^(child|step-child|adopted-child|foster-child|son|daughter|stepson|stepdaughter)$/i.test(String(t || ''));
    }
    function isSpouseType(t) {
        return /^(spouse|husband|wife|partner|civil-partner|fianc)/i.test(String(t || ''));
    }
    function isFormerSpouseType(t) {
        return /^(former-|ex-|ex)/i.test(String(t || ''));
    }
    function isSiblingType(t) {
        return /^(sibling|brother|sister|half-sibling|step-sibling)$/i.test(String(t || ''));
    }

    // ────────────────────────────────────────────────────────────
    // Graph traversal — build layout from anchor outward
    // ────────────────────────────────────────────────────────────
    function paBuildTreeForAnchor(anchorId, opts) {
        opts = opts || {};
        var depthUp = (opts.depthUp != null ? opts.depthUp : 2);     // generations of ancestors
        var depthDown = (opts.depthDown != null ? opts.depthDown : 2); // generations of descendants
        var includeInLaws = (opts.includeInLaws !== false);

        var anchor = peopleById(anchorId);
        if (!anchor) return null;

        var layout = {
            anchor: anchor,
            ancestors: [],       // index 0 = parents, 1 = grandparents, 2 = great-grandparents
            descendants: [],     // index 0 = children, 1 = grandchildren, 2 = great-grandchildren
            spouses: [],         // current spouses
            exSpouses: [],       // former spouses
            siblings: [],
            inLaws: [],
            descendantSpouses: [],
            couples: [],
            ghosts: []
        };

        // ── 1. Spouses & ex-spouses (immediate-family row, same gen as anchor) ──
        var seenSpouseIds = {};
        relsOf(anchor).forEach(function (r) {
            if (!r || !r.toId || seenSpouseIds[r.toId]) return;
            var p = peopleById(r.toId);
            if (!p) return;
            if (isFormerSpouseType(r.type)) {
                layout.exSpouses.push({ person: p, type: 'ex', dates: r.dates || {} });
                seenSpouseIds[r.toId] = true;
            } else if (isSpouseType(r.type)) {
                layout.spouses.push({ person: p, type: 'current', dates: r.dates || {} });
                seenSpouseIds[r.toId] = true;
            }
        });

        // ── 2. Parents (gen 1 up) ──
        var parents = [];
        var parentIds = {};
        relsOf(anchor).forEach(function (r) {
            if (!r || !r.toId) return;
            if (isParentType(r.type)) {
                var p = peopleById(r.toId);
                if (p && !parentIds[p.id]) {
                    parents.push(p);
                    parentIds[p.id] = true;
                }
            }
        });
        if (parents.length) layout.ancestors.push(parents);

        // ── 3. Grandparents+ (recursive walk up) ──
        for (var lvl = 1; lvl < depthUp; lvl++) {
            var prevGen = layout.ancestors[lvl - 1] || [];
            if (!prevGen.length) break;
            var thisGen = [];
            var thisGenIds = {};
            prevGen.forEach(function (parent) {
                relsOf(parent).forEach(function (r) {
                    if (!r || !r.toId || !isParentType(r.type)) return;
                    var gp = peopleById(r.toId);
                    if (gp && !thisGenIds[gp.id] && gp.id !== anchorId) {
                        thisGen.push(gp);
                        thisGenIds[gp.id] = true;
                    }
                });
            });
            if (!thisGen.length) break;
            layout.ancestors.push(thisGen);
        }

        // ── 4. Siblings (same gen as anchor) — share a parent with anchor ──
        if (parents.length) {
            var siblingIds = {};
            parents.forEach(function (parent) {
                relsOf(parent).forEach(function (r) {
                    if (!r || !r.toId || !isChildType(r.type)) return;
                    if (r.toId === anchorId) return; // skip anchor itself
                    var sib = peopleById(r.toId);
                    if (sib && !siblingIds[sib.id]) {
                        layout.siblings.push(sib);
                        siblingIds[sib.id] = true;
                    }
                });
            });
        }

        // ── 5. Children (gen 1 down) ──
        var children = [];
        var childIds = {};
        relsOf(anchor).forEach(function (r) {
            if (!r || !r.toId) return;
            if (isChildType(r.type)) {
                var c = peopleById(r.toId);
                if (c && !childIds[c.id]) {
                    children.push(c);
                    childIds[c.id] = true;
                }
            }
        });
        if (children.length) layout.descendants.push(children);

        // ── 6. Grandchildren+ (recursive walk down) ──
        for (var dlvl = 1; dlvl < depthDown; dlvl++) {
            var prevDescGen = layout.descendants[dlvl - 1] || [];
            if (!prevDescGen.length) break;
            var thisDescGen = [];
            var thisDescGenIds = {};
            prevDescGen.forEach(function (parent) {
                relsOf(parent).forEach(function (r) {
                    if (!r || !r.toId || !isChildType(r.type)) return;
                    var gc = peopleById(r.toId);
                    if (gc && !thisDescGenIds[gc.id] && gc.id !== anchorId) {
                        thisDescGen.push(gc);
                        thisDescGenIds[gc.id] = true;
                    }
                });
            });
            if (!thisDescGen.length) break;
            layout.descendants.push(thisDescGen);
        }

        // ── 7. In-laws (ghost cards) — parents of each spouse ──
        if (includeInLaws) {
            layout.spouses.concat(layout.exSpouses).forEach(function (s) {
                relsOf(s.person).forEach(function (r) {
                    if (!r || !r.toId || !isParentType(r.type)) return;
                    var il = peopleById(r.toId);
                    if (il && il.id !== anchorId && !parentIds[il.id]) {
                        layout.inLaws.push({ person: il, throughSpouseId: s.person.id });
                    }
                });
            });
        }

        // ── 8. Descendant spouses — partners/exes of anchor's children
        //    (and deeper descendants). These render next to their partner
        //    in the same row so grandchildren can connect to BOTH parents.
        //    Violetka 2026-05-22.
        layout.descendantSpouses = [];
        var descSpouseSeen = {};
        (layout.descendants || []).forEach(function (gen, genIdx) {
            gen.forEach(function (desc) {
                relsOf(desc).forEach(function (r) {
                    if (!r || !r.toId) return;
                    if (!(isSpouseType(r.type) || isFormerSpouseType(r.type))) return;
                    var sp = peopleById(r.toId);
                    if (!sp || sp.id === anchorId || descSpouseSeen[sp.id]) return;
                    // Skip if the spouse is ALREADY in the descendants chain
                    // (rare incest edge case but defensive).
                    var alreadyInChain = (layout.descendants || []).some(function (g) {
                        return g.some(function (p) { return p && p.id === sp.id; });
                    });
                    if (alreadyInChain) return;
                    descSpouseSeen[sp.id] = true;
                    layout.descendantSpouses.push({
                        person: sp,
                        throughDescId: desc.id,
                        genIdx: genIdx,
                        isEx: isFormerSpouseType(r.type)
                    });
                });
            });
        });

        return layout;
    }

    // ────────────────────────────────────────────────────────────
    // Card HTML emitter
    // ────────────────────────────────────────────────────────────
    function escHtml(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function roleForCard(person, perspective) {
        // Full role label from the perspective of the anchor. Violetka 2026-05-18:
        // "защо махна биологица степ и тн - казах ти да намалиш шрифта" — never
        // strip the modifier (Biological / Step / Adopted / Maternal / Paternal /
        // Half / Foster); fontSize auto-shrinks via paFitFtreeRoles instead.
        //
        // Resolution order:
        //   1. relationship.specificRole on the edge ego → person
        //      (e.g. "Biological Mother", "Step Father", "Adopted Daughter")
        //   2. IN-LAW DETECTION — ego has NO direct edge to person, but ego's
        //      spouse does. Compute the in-law label (Mother/Father/Brother/
        //      Sister-in-law, Step-Son/-Daughter from spouse's prior marriage).
        //      Violetka 2026-05-19: "в съмари cards да се виждат ролите спрямо
        //      човек в средата" — in-laws were rendering with their absolute
        //      role (e.g. "Biological Mother" for Sarah's mom on John's tree).
        //   3. person.roleLayer2 — the layered taxonomy already encodes the
        //      modifier ("Biological Grandmother", "Maternal Grandmother", etc.)
        //   4. type-based plain fallback (last-resort generic label).
        if (perspective && perspective !== person.id) {
            var ego = peopleById(perspective);
            if (ego) {
                var r = relsOf(ego).find(function (rel) { return rel.toId === person.id; });
                // ── Spouse / former-spouse: ALWAYS gender-derived ─────────
                // Husband/Wife/Ex-husband/Ex-wife is purely a gender label.
                // The data's specificRole has been seen swapped (e.g. Mary's
                // edge to Robert says "Wife"). Ignore specificRole here and
                // derive from the spouse's gender. Same for ex-spouses —
                // without this, Jack's tree showed Sarah as "Plan Owner"
                // (her profile role) instead of "Ex-wife". Violetka
                // 2026-05-19 anchor audit.
                if (r && r.type) {
                    var rt = String(r.type).toLowerCase();
                    var fem = (person.gender === 'female') || /female/i.test(person.gender || '');
                    if (isFormerSpouseType(rt) || /^former-spouse$/.test(rt)) {
                        return fem ? 'Ex-wife' : 'Ex-husband';
                    }
                    if (isSpouseType(rt)) {
                        return fem ? 'Wife' : 'Husband';
                    }
                }
                if (r && r.specificRole) return r.specificRole;
                // ── Inferred sibling check ────────────────────────────────
                // When perspective and person share at least one parent and
                // there's no direct sibling edge, derive the label from
                // shared-parent count. Violetka 2026-05-19: Emma anchored
                // tree was labeling her half-siblings (Liam/Lisa/Noah) as
                // "Biological Son" — they share only mother Sarah, so they
                // should be "Half-brother/Half-sister" (or "Biological
                // Brother/Sister" if BOTH parents shared).
                if (!r) {
                    // ── Ancestor-level walk: is person an ancestor of ego
                    // at some level N? If yes, return grandparent/great-
                    // grandparent/etc. label. Without this, Emma's tree
                    // labeled Mary Smith as "Biological Mother" (Sarah's
                    // role) instead of "Biological Grandmother" (Emma's
                    // perspective). Violetka 2026-05-19: "Mary Smith и
                    // Robert Smith са майка и баща на Сара - те трябва
                    // да са под нея" (= grandparents from Emma's view).
                    var ancVisited = {};
                    ancVisited[ego.id] = true;
                    var ancQueue = [{ id: ego.id, depth: 0 }];
                    var ancLevel = -1;
                    while (ancQueue.length) {
                        var node = ancQueue.shift();
                        if (node.depth > 6) continue;  // sanity cap
                        var nodePerson = peopleById(node.id);
                        if (!nodePerson) continue;
                        var parentEdges = (nodePerson.relationships || [])
                            .filter(function (rel) { return rel && String(rel.type).toLowerCase() === 'parent'; });
                        for (var pi = 0; pi < parentEdges.length; pi++) {
                            var parId = parentEdges[pi].toId;
                            if (parId === person.id) { ancLevel = node.depth + 1; break; }
                            if (!ancVisited[parId]) {
                                ancVisited[parId] = true;
                                ancQueue.push({ id: parId, depth: node.depth + 1 });
                            }
                        }
                        if (ancLevel !== -1) break;
                    }
                    if (ancLevel > 0) {
                        var isFemaleAnc = (person.gender === 'female') || /^female/i.test(person.gender || '');
                        // gen=1 → parent (already handled by direct edge),
                        // gen=2 → grandparent, gen=3 → great-grandparent, etc.
                        if (ancLevel === 1) return isFemaleAnc ? 'Biological Mother' : 'Biological Father';
                        if (ancLevel === 2) return isFemaleAnc ? 'Biological Grandmother' : 'Biological Grandfather';
                        if (ancLevel === 3) return isFemaleAnc ? 'Great-Grandmother' : 'Great-Grandfather';
                        return (ancLevel - 2) + '× Great-' + (isFemaleAnc ? 'Grandmother' : 'Grandfather');
                    }
                    // ── Descendant-level walk: is person a DESCENDANT of ego
                    // at some level N? If yes, return grandchild/great-
                    // grandchild label. Mirrors the ancestor walk above.
                    // Violetka 2026-05-22: TestChild (Liam's son) should
                    // render as "Biological Grandson" from Sarah's POV,
                    // not "Biological Son" (which is Liam's POV).
                    var descVisited = {};
                    descVisited[ego.id] = true;
                    var descQueue = [{ id: ego.id, depth: 0 }];
                    var descLevel = -1;
                    while (descQueue.length) {
                        var dnode = descQueue.shift();
                        if (dnode.depth > 6) continue;
                        var dnodePerson = peopleById(dnode.id);
                        if (!dnodePerson) continue;
                        var childEdges = (dnodePerson.relationships || [])
                            .filter(function (rel) { return rel && String(rel.type).toLowerCase() === 'child'; });
                        for (var ci = 0; ci < childEdges.length; ci++) {
                            var chId = childEdges[ci].toId;
                            if (chId === person.id) { descLevel = dnode.depth + 1; break; }
                            if (!descVisited[chId]) {
                                descVisited[chId] = true;
                                descQueue.push({ id: chId, depth: dnode.depth + 1 });
                            }
                        }
                        if (descLevel !== -1) break;
                    }
                    if (descLevel > 0) {
                        var isFemaleDesc = (person.gender === 'female') || /^female/i.test(person.gender || '');
                        // gen=1 → child (already handled by direct edge),
                        // gen=2 → grandchild, gen=3 → great-grandchild, etc.
                        if (descLevel === 1) return isFemaleDesc ? 'Biological Daughter' : 'Biological Son';
                        if (descLevel === 2) return isFemaleDesc ? 'Biological Granddaughter' : 'Biological Grandson';
                        if (descLevel === 3) return isFemaleDesc ? 'Great-Granddaughter' : 'Great-Grandson';
                        return (descLevel - 2) + '× Great-' + (isFemaleDesc ? 'Granddaughter' : 'Grandson');
                    }
                    // Count BIOLOGICAL parents only (type='parent', not
                    // step/adopted/foster). A shared step-parent does NOT
                    // make two people biological siblings — it makes them
                    // step-siblings at most. Half-sibling = exactly 1 shared
                    // bio parent; full sibling = 2 shared bio parents.
                    function bioParents(p) {
                        return relsOf(p)
                            .filter(function (rel) { return rel && String(rel.type).toLowerCase() === 'parent'; })
                            .map(function (rel) { return rel.toId; });
                    }
                    function stepParents(p) {
                        return relsOf(p)
                            .filter(function (rel) { return rel && /^(step-parent|adoptive-parent|foster-parent)$/i.test(String(rel.type)); })
                            .map(function (rel) { return rel.toId; });
                    }
                    var egoBio = bioParents(ego);
                    var pBio   = bioParents(person);
                    var sharedBio = egoBio.filter(function (pid) { return pBio.indexOf(pid) !== -1; });
                    if (sharedBio.length) {
                        var isFemaleSib = (person.gender === 'female') || /^female/i.test(person.gender || '');
                        if (sharedBio.length >= 2) {
                            return isFemaleSib ? 'Biological Sister' : 'Biological Brother';
                        }
                        return isFemaleSib ? 'Half-sister' : 'Half-brother';
                    }
                    // No shared bio parent — but maybe a shared step parent
                    // → step-sibling (rare but valid).
                    var egoStep = stepParents(ego);
                    var pStep   = stepParents(person);
                    var sharedStep = egoBio.filter(function (pid) { return pStep.indexOf(pid) !== -1; })
                        .concat(egoStep.filter(function (pid) { return pBio.indexOf(pid) !== -1 || pStep.indexOf(pid) !== -1; }));
                    if (sharedStep.length) {
                        var isFemStep = (person.gender === 'female') || /^female/i.test(person.gender || '');
                        return isFemStep ? 'Stepsister' : 'Stepbrother';
                    }
                }
                // ── In-law check ──────────────────────────────────────────
                // ONLY runs when ego has NO direct edge to person (otherwise
                // John's biological children would mis-resolve as "Stepson"
                // because Sarah is also their mother). Walk ego's CURRENT
                // spouses; if person has an edge from the spouse, derive the
                // in-law label. Violetka 2026-05-19.
                if (!r) {
                    var isFemale = (person.gender === 'female') || /^female/i.test(person.gender || '');
                    var spouseEdges = relsOf(ego).filter(function (rel) {
                        return rel && rel.type && isSpouseType(rel.type) && !isFormerSpouseType(rel.type);
                    });
                    for (var si = 0; si < spouseEdges.length; si++) {
                        var sp = peopleById(spouseEdges[si].toId);
                        if (!sp) continue;
                        var sr = relsOf(sp).find(function (rel) { return rel.toId === person.id; });
                        if (!sr || !sr.type) continue;
                        var t = String(sr.type).toLowerCase();
                        if (isParentType(sr.type)) return isFemale ? 'Mother-in-law' : 'Father-in-law';
                        if (t === 'sibling')       return isFemale ? 'Sister-in-law'  : 'Brother-in-law';
                        if (isChildType(sr.type))  return isFemale ? 'Stepdaughter'   : 'Stepson';
                        if (t === 'grandparent')   return isFemale ? 'Grandmother-in-law' : 'Grandfather-in-law';
                        if (t === 'grandchild')    return isFemale ? 'Step-Granddaughter' : 'Step-Grandson';
                    }
                }
            }
        }
        // Type-based perspective check BEFORE falling back to person.roleLayer2.
        // The edge type itself encodes the modifier (step- / adopted- /
        // foster- / half-) for the anchor's perspective — much more reliable
        // than person.roleLayer2 which was authored from someone else's
        // perspective. Violetka 2026-05-19 ("ролите спрямо човек в средата")
        // + persistence bug where specificRole gets stripped from localStorage.
        if (perspective && perspective !== person.id) {
            var ego2 = peopleById(perspective);
            if (ego2) {
                var r2 = relsOf(ego2).find(function (rel) { return rel.toId === person.id; });
                if (r2 && r2.type) {
                    var t = String(r2.type).toLowerCase();
                    var female = person.gender === 'female' || /female/i.test(person.gender || '');
                    // Step-relatives (no biological link)
                    if (t === 'step-parent')   return female ? 'Stepmother' : 'Stepfather';
                    if (t === 'step-child')    return female ? 'Stepdaughter' : 'Stepson';
                    if (t === 'step-sibling')  return female ? 'Stepsister'  : 'Stepbrother';
                    // Adopted relatives
                    if (t === 'adoptive-parent' || t === 'adopted-parent') return female ? 'Adoptive Mother' : 'Adoptive Father';
                    if (t === 'adopted-child') return female ? 'Adopted Daughter' : 'Adopted Son';
                    // Foster relatives
                    if (t === 'foster-parent') return female ? 'Foster Mother' : 'Foster Father';
                    if (t === 'foster-child')  return female ? 'Foster Daughter' : 'Foster Son';
                    // Half-siblings
                    if (t === 'half-sibling')  return female ? 'Half-sister' : 'Half-brother';
                    // Biological / plain (no modifier in type) — canonical
                    // taxonomy ALWAYS keeps the "Biological" prefix on
                    // parent/child/sibling/grandparent/grandchild labels
                    // (summary_card_role_typography memory, locked 2026-05-18).
                    if (t === 'parent')        return female ? 'Biological Mother' : 'Biological Father';
                    if (t === 'child')         return female ? 'Biological Daughter' : 'Biological Son';
                    if (t === 'sibling')       return female ? 'Biological Sister' : 'Biological Brother';
                    if (t === 'grandparent')   return female ? 'Biological Grandmother' : 'Biological Grandfather';
                    if (t === 'grandchild')    return female ? 'Biological Granddaughter' : 'Biological Grandson';
                    if (isSpouseType(t))       return female ? 'Wife' : 'Husband';
                }
            }
        }
        if (person.roleLayer2) return person.roleLayer2;
        if (person.role) return person.role;
        return '';
    }
    // Back-compat alias — old call sites still reference shortRoleForCard.
    var shortRoleForCard = roleForCard;

    function dobYear(person) {
        if (!person.dob) return '';
        var m = String(person.dob).match(/^(\d{4})/);
        return m ? m[1] : '';
    }
    function dodYear(person) {
        if (!person.dod) return '';
        var m = String(person.dod).match(/^(\d{4})/);
        return m ? m[1] : '';
    }

    function initialsOf(person) {
        var f = (person.firstName || (person.name || '').split(' ')[0] || '').charAt(0);
        var l = (person.familyName || (person.name || '').split(' ').slice(-1)[0] || '').charAt(0);
        return (f + l).toUpperCase();
    }

    function buildCardHtml(person, role, opts) {
        opts = opts || {};
        var isAnchor = !!opts.isAnchor;
        var isGhost = !!opts.isGhost;
        var coupleType = opts.coupleType || '';     // 'ex' | 'current' | 'sibling' | ''
        var isDeceased = (person.lifeStatus === 'Deceased') || person.alive === false;
        var photo = person.photo || '';
        var initials = initialsOf(person);
        // Full-date + Age string on the summary card (Violetka 2026-05-21
        // "wmesto bord - da e cqlata data .ageX"):
        //   Living:    "Sep 5, 2008 · Age 18"
        //   Deceased:  "Sep 5, 2008 – Aug 15, 2010 · Age 60"
        //   No dob:    ""
        function fmtDate(s) {
            if (!s) return '';
            var d = new Date(s);
            if (isNaN(d.getTime())) return '';
            return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }
        function yearOf(s) {
            if (!s) return null;
            var m = String(s).match(/^(\d{4})/);
            return m ? parseInt(m[1], 10) : null;
        }
        var dobStr = fmtDate(person.dob);
        var dodStr = fmtDate(person.dod);
        var dobY = yearOf(person.dob);
        var dodY = yearOf(person.dod);
        // Canonical date format (Violetka 2026-05-22 LOCKED):
        //   Living:    "Mar 15, 1950 (Age 75)"           ← Age in parentheses
        //   Deceased:  "Oct 17, 1927 • June 8, 2007"    ← bullet between dates, NO age
        //   No dob:    ""
        // The bullet is wrapped in .ftree-meta-dot — extra opacity reduction
        // so it doesn't read more prominent than the dates (Violetka noted
        // the dot opacity felt like 1 vs the muted date text).
        var yearStr = '';
        if (dobStr) {
            if (isDeceased) {
                yearStr = escHtml(dobStr) + (dodStr
                    ? ' <span class="ftree-meta-dot">•</span> ' + escHtml(dodStr)
                    : '');
            } else {
                var ageLiv = (dobY != null) ? (new Date().getFullYear() - dobY) : null;
                yearStr = escHtml(dobStr) + (ageLiv != null && ageLiv >= 0 ? ' (Age ' + ageLiv + ')' : '');
            }
        }
        var lifeDotCls = isDeceased ? 'deceased' : 'alive';
        var classes = ['ftree-card'];
        if (isAnchor) classes.push('ftree-card-anchor');
        if (isGhost)  classes.push('ftree-card-ghost');
        if (isDeceased) classes.push('ftree-card-deceased');
        if (coupleType === 'ex') classes.push('ftree-card-ex');

        var avatarHtml = photo
            ? '<img src="' + escHtml(photo) + '" alt="' + escHtml(person.name || '') + '">'
            : '<div class="ftree-initials">' + escHtml(initials) + '</div>';

        // Match the ORIGINAL hardcoded card structure (240×80 glass pill) per
        // Violetka 2026-05-18: "върни сумари кардс какъвто бяха в семейното
        // дърво — само подредбата ще е различна и функционалностите".
        // Same shell as the legacy template: .ftree-avatar (img + life-dot),
        // .ftree-info (name/role/meta), and the canonical + button below.
        // The onclick on the OUTER card triggers click-to-recenter; the
        // + button (now ⋯ menu) opens the per-card actions menu.
        // Branch tooltip on ex-spouse cards — "Click to view the family
        // branch of [First Name]". Matches MyHeritage's hover affordance.
        var branchTooltip = '';
        if (coupleType === 'ex') {
            var firstName = person.firstName || (person.name || '').split(' ')[0] || 'this person';
            branchTooltip = 'data-branch-tooltip="Click to view the family branch of ' + escHtml(firstName) + '" ';
        }
        // ── Hidden-relatives indicator chip (MyHeritage canonical pattern).
        // Two small grey pills connected by a short line, positioned on the
        // EDGE of the card pointing toward where the hidden generation lives.
        //   • Hidden parents (ancestors not shown)   → chip BELOW the card
        //     (parents are below in our canopy direction)
        //   • Hidden children (descendants not shown) → chip ABOVE the card
        //   The chip is purely visual (the whole card already click-recenters).
        //   Tooltip: "Click to view the family branch of <First Name>".
        // Violetka 2026-05-19: "ако сложа родителите на Джак - не го виждам
        // в моето (на Сара) дърво - но го видам в неговото и в това на Ема
        // като баба и дядо ... посоките на деца и родители са наобратно".
        var chipBelow = opts.hasHiddenAncestors  ? '<span class="ftree-hidden-chip ftree-hidden-chip-below"  aria-hidden="true"><span></span><span></span></span>' : '';
        var chipAbove = opts.hasHiddenDescendants ? '<span class="ftree-hidden-chip ftree-hidden-chip-above" aria-hidden="true"><span></span><span></span></span>' : '';
        // Always set branch tooltip when the card has either hidden direction
        // (or is an ex-spouse, original behaviour). The same data attribute
        // wires CSS-driven hover bubble.
        if (!branchTooltip && (opts.hasHiddenAncestors || opts.hasHiddenDescendants)) {
            var firstName2 = person.firstName || (person.name || '').split(' ')[0] || 'this person';
            branchTooltip = 'data-branch-tooltip="Click to view the family branch of ' + escHtml(firstName2) + '" ';
        }
        return ''
            + '<div class="' + classes.join(' ') + '" data-person="' + escHtml(person.id) + '" '
            +      (coupleType ? 'data-couple-type="' + escHtml(coupleType) + '" ' : '')
            +      branchTooltip
            +      'onclick="paTreeFocusPerson(\'' + escHtml(person.id) + '\', event)">'
            +   chipAbove
            +   '<div class="ftree-avatar">'
            +     avatarHtml
            +     '<span class="ftree-life-dot ' + lifeDotCls + '"></span>'
            +   '</div>'
            +   '<div class="ftree-info">'
            +     '<div class="ftree-name"><span class="ftree-name-text">' + escHtml(person.name || '') + '</span></div>'
            +     (role ? '<div class="ftree-role">' + escHtml(role) + '</div>' : '')
            +     (yearStr ? '<div class="ftree-meta">' + yearStr + '</div>' : '')
            +   '</div>'
            +   '<button class="ftree-add" type="button" '
            +           'aria-label="Add relatives for ' + escHtml(person.name || '') + '">+</button>'
            +   chipBelow
            + '</div>';
    }

    // ────────────────────────────────────────────────────────────
    // Renderer — emits row-based layout into a mount container
    // ────────────────────────────────────────────────────────────
    // ────────────────────────────────────────────────────────────
    // Placeholder card — canonical "Add X" empty slot.
    // Used when generations are expanded but a parent/grandparent is not
    // yet recorded in peopleStore. Same outer shape + glass styling as a
    // regular .ftree-card so connection lines + positioning work
    // identically; differentiated visually by .ftree-card-add-placeholder.
    // Click → opens the canonical F&R Add flow (TBD wiring) so the user
    // can fill the slot. Violetka 2026-05-19: "ако избера да виждам 3
    // поколения ми се появяват празни карти за лесно попълване".
    // ────────────────────────────────────────────────────────────
    function buildPlaceholderCard(role, parentId, idSeed) {
        var label = 'Add ' + role;
        // Canonical 2-circle empty-avatar pattern (Violetka 2026-05-22):
        // outer 80×80 at rgba(255,255,255,0.33) + inner 40×40 solid white
        // that GROWS to 60×60 on hover + plus 20×20 opacity 0.16 → 1 on hover.
        // Same pattern as .lsc-avatar-add-state in profile-edit avatars.
        return ''
            + '<div class="ftree-card ftree-card-add-placeholder" '
            +      'data-add-relation="' + escHtml(role) + '" '
            +      'data-parent-id="' + escHtml(parentId || '') + '" '
            +      'data-placeholder-id="' + escHtml(idSeed) + '" '
            +      'onclick="event.stopPropagation();if(window.paTreeAddRelative)window.paTreeAddRelative(this);">'
            +   '<div class="ftree-avatar ftree-add-placeholder-avatar">'
            +     '<span class="ftree-add-placeholder-inner" aria-hidden="true"></span>'
            +     '<svg class="ftree-add-placeholder-plus" viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">'
            +       '<path d="M10 5 L10 15 M5 10 L15 10"/>'
            +     '</svg>'
            +   '</div>'
            +   '<div class="ftree-info">'
            +     '<div class="ftree-add-placeholder-label">' + escHtml(label) + '</div>'
            +   '</div>'
            + '</div>';
    }

    // Compute grandparent-level role labels relative to the anchor.
    // gen=0 → parent ("Father"/"Mother")
    // gen=1 → grandparent ("Grandfather"/"Grandmother")
    // gen=2 → great-grandparent ("Great-Grandfather"/"Great-Grandmother")
    // gen=3+ → "2× Great-Grandfather"
    function ancestorRoleLabel(gen, isFemale) {
        if (gen === 0) return isFemale ? 'Mother' : 'Father';
        var role = isFemale ? 'Grandmother' : 'Grandfather';
        if (gen === 1) return role;
        if (gen === 2) return 'Great-' + role;
        return (gen - 1) + '× Great-' + role;
    }

    function paRenderTree(layout, container) {
        if (!layout || !container) return;
        var anchorId = layout.anchor.id;
        var html = '';

        // Build the set of person IDs ALREADY rendered in this tree so we
        // can detect "hidden relatives" (people that exist in peopleStore
        // but aren't in the current view because of depthUp/depthDown
        // limits, or because they're on a different branch). Used to
        // decide whether each card gets a MyHeritage-style indicator chip.
        var renderedIds = {};
        renderedIds[anchorId] = true;
        (layout.descendants || []).forEach(function (gen) {
            (gen || []).forEach(function (p) { renderedIds[p.id] = true; });
        });
        (layout.ancestors || []).forEach(function (gen) {
            (gen || []).forEach(function (p) { renderedIds[p.id] = true; });
        });
        (layout.spouses || []).forEach(function (s) { renderedIds[s.person.id] = true; });
        (layout.exSpouses || []).forEach(function (s) { renderedIds[s.person.id] = true; });
        (layout.siblings || []).forEach(function (p) { renderedIds[p.id] = true; });
        (layout.inLaws || []).forEach(function (il) { renderedIds[il.person.id] = true; });
        (layout.descendantSpouses || []).forEach(function (ds) { renderedIds[ds.person.id] = true; });

        // For a given person, return {hiddenAncestors, hiddenDescendants}.
        // Hidden ancestor = person has a parent edge to someone NOT rendered.
        // Hidden descendant = person has a child edge to someone NOT rendered.
        // Skip the anchor itself — its hidden relatives ARE the layout limit,
        // which is communicated via the Generations selector, not a chip.
        function hiddenFlagsFor(personId) {
            if (personId === anchorId) return { up: false, down: false };
            var p = peopleById(personId);
            if (!p) return { up: false, down: false };
            var rels = p.relationships || [];
            var hiddenUp = false, hiddenDown = false;
            for (var i = 0; i < rels.length; i++) {
                var r = rels[i];
                if (!r || !r.toId) continue;
                if (renderedIds[r.toId]) continue;          // already shown
                if (isParentType(r.type))      hiddenUp = true;
                else if (isChildType(r.type))  hiddenDown = true;
                if (hiddenUp && hiddenDown) break;
            }
            return { up: hiddenUp, down: hiddenDown };
        }
        // Helper that wraps buildCardHtml to inject the hidden-relative flags.
        // Canopy direction note (locked): in our metaphor TOP = descendants,
        // BOTTOM = ancestors. So a card's hidden PARENTS chip goes BELOW the
        // card (toward the parent direction); hidden CHILDREN chip goes ABOVE.
        function buildCardWithChips(p, role, opts) {
            opts = opts || {};
            var flags = hiddenFlagsFor(p.id);
            opts.hasHiddenAncestors = flags.up;
            opts.hasHiddenDescendants = flags.down;
            return buildCardHtml(p, role, opts);
        }

        // TREE METAPHOR direction (Violetka 2026-05-18 LOCKED):
        //   TOP    = branches → descendants (children, grandchildren, great-grandchildren)
        //   CENTER = anchor row (anchor + spouses + siblings)
        //   BOTTOM = roots → ancestors (parents, grandparents, great-grandparents)
        // The golden-tree.png background literally has branches at the top
        // and roots at the bottom — this layout matches the natural tree
        // visual so cards on the canopy = descendants, cards by the roots = ancestors.

        // ── Branches: deepest descendant generation first (highest up the canopy) ──
        // descendants[] is children-first, so iterate in REVERSE: great-grandchildren
        // render at the very top, then grandchildren, then children just above anchor.
        // Violetka 2026-05-22: descendantSpouses (partners of anchor's children +
        // deeper) render INLINE next to their partner — so grandchildren can
        // visually connect to BOTH parents.
        for (var di = layout.descendants.length - 1; di >= 0; di--) {
            var rowGen = di;
            var rowCards = '';
            layout.descendants[di].forEach(function (p) {
                rowCards += buildCardWithChips(p, shortRoleForCard(p, anchorId));
                // Inject descendant-spouses immediately after their partner
                (layout.descendantSpouses || []).forEach(function (ds) {
                    if (ds.genIdx === rowGen && ds.throughDescId === p.id) {
                        rowCards += buildCardWithChips(ds.person,
                            shortRoleForCard(ds.person, anchorId),
                            { coupleType: ds.isEx ? 'ex' : 'current' });
                    }
                });
            });
            var descLabel = di === 0 ? 'children' : (di === 1 ? 'grandchildren' : 'great-grandchildren-' + di);
            html += '<div class="ftree-row ftree-row-' + descLabel + '">' + rowCards + '</div>';
        }

        // ── Anchor row: [LEFT FLANK: ex-spouses + current spouses] [ANCHOR] [RIGHT FLANK: siblings]
        // 3-column grid: anchor card always sits at canvas centerX regardless of
        // how many spouses/siblings exist. Left flank flows right→left from anchor,
        // right flank flows left→right. Violetka 2026-05-19: "тя трябва да е в
        // средата, братя и сестри в дясно" (anchor in middle, siblings to right).
        // Each card gets data-couple-type for the SVG line renderer:
        //   data-couple-type="ex"      → dashed line to anchor
        //   data-couple-type="current" → solid line to anchor
        var leftFlankParts = [];
        layout.exSpouses.forEach(function (s) {
            leftFlankParts.push(buildCardWithChips(s.person, shortRoleForCard(s.person, anchorId), { coupleType: 'ex' }));
        });
        layout.spouses.forEach(function (s) {
            leftFlankParts.push(buildCardWithChips(s.person, shortRoleForCard(s.person, anchorId), { coupleType: 'current' }));
        });
        var rightFlankParts = [];
        layout.siblings.forEach(function (sib) {
            rightFlankParts.push(buildCardWithChips(sib, shortRoleForCard(sib, anchorId), { coupleType: 'sibling' }));
        });
        // Anchor card — show "Plan Owner" role label when the anchor IS
        // the Plan Owner (their own card on their own tree). Adds real
        // information ("this is me, the Plan Owner") instead of the noisy
        // "Me" suffix we removed previously. Violetka 2026-05-21: "this
        // is you - lipsva tuk". Other anchors (when re-centered on a
        // relative) keep an empty role since their identity is the focal.
        var anchorRoleLabel = '';
        var anchorPersonData = (typeof peopleById === 'function') ? peopleById(layout.anchor.id) : null;
        if (anchorPersonData && (anchorPersonData.role === 'Plan Owner' || anchorPersonData.roleLayer1 === 'Plan Owner')) {
            anchorRoleLabel = 'Plan Owner';
        }
        var anchorCardHtml = buildCardHtml(layout.anchor, anchorRoleLabel, { isAnchor: true });
        html += '<div class="ftree-row ftree-row-anchor">'
              +   '<div class="ftree-anchor-left-flank">' + leftFlankParts.join('') + '</div>'
              +   '<div class="ftree-anchor-center">' + anchorCardHtml + '</div>'
              +   '<div class="ftree-anchor-right-flank">' + rightFlankParts.join('') + '</div>'
              + '</div>';

        // ── Roots: parents row → grandparents → great-grandparents ──
        // ONLY the anchor's OWN blood ancestors. In-laws are NOT shown.
        // Each generation walks from the previous gen's people upward to
        // their bio parents. Missing slots get canonical "Add X"
        // placeholder cards so the user can fill the tree by clicking.
        // Violetka 2026-05-19: "ако избера да виждам 3 поколения ми се
        // появяват празни карти за лесно попълване".
        //
        // Pet anchors: skip human-style genealogy entirely. A pet doesn't
        // have a Father/Mother record to fill in — the tree should just
        // show the pet card with its guardians on the spouse/sibling row
        // (handled by Layout 1). Violetka anchor audit 2026-05-20.
        var anchorIsPet = (layout.anchor.categories || []).indexOf('pet') !== -1;
        var desiredDepthUp = anchorIsPet ? 0
            : ((typeof window.__paTreeGens === 'number' && window.__paTreeGens > 0)
                ? window.__paTreeGens : (layout.ancestors.length || 1));
        var prevGen = [{ person: layout.anchor, isPlaceholder: false, isStepBranch: false }];
        for (var g = 0; g < desiredDepthUp; g++) {
            var thisGen = [];
            prevGen.forEach(function (entry) {
                // Real person → look up bio parents. Placeholder → still
                // expand into two more placeholders (Add Father/Mother of
                // the placeholder), so user can fill multiple generations
                // by clicking the chain. Violetka 2026-05-19: "ако избера
                // да виждам 3 поколения ми се появяват празни карти".
                if (entry.isPlaceholder) {
                    var pidSeed = entry.parentId + '_' + g;
                    thisGen.push({ isPlaceholder: true, role: ancestorRoleLabel(g, false), parentId: pidSeed });
                    thisGen.push({ isPlaceholder: true, role: ancestorRoleLabel(g, true),  parentId: pidSeed });
                    return;
                }
                // Step branches (step-parent introduced at g=0) don't
                // propagate up — their parents are NOT the anchor's
                // grandparents in genealogy terms.
                if (entry.isStepBranch) return;
                var p = entry.person;
                var rels = (p.relationships || []);
                var bioParentRels = rels.filter(function (r) {
                    return r && String(r.type).toLowerCase() === 'parent';
                });
                var father = null, mother = null;
                bioParentRels.forEach(function (r) {
                    var par = peopleById(r.toId);
                    if (!par) return;
                    var fem = par.gender === 'female' || /female/i.test(par.gender || '');
                    if (fem) mother = par;
                    else father = par;
                });
                if (father) thisGen.push({ person: father, isPlaceholder: false, isStepBranch: false });
                else thisGen.push({ isPlaceholder: true, role: ancestorRoleLabel(g, false), parentId: p.id });
                if (mother) thisGen.push({ person: mother, isPlaceholder: false, isStepBranch: false });
                else thisGen.push({ isPlaceholder: true, role: ancestorRoleLabel(g, true), parentId: p.id });
                // At gen 0 (immediate parents of anchor) also include
                // step/adopted/foster parents on the same row — they're
                // socially co-parents even though they don't extend up
                // the blood line. Violetka 2026-05-19: "степ фадар й е
                // на линията на майка й" (Emma's stepfather John on the
                // same row as her bio parents).
                if (g === 0) {
                    rels.forEach(function (r) {
                        if (!r || !r.type) return;
                        var t = String(r.type).toLowerCase();
                        if (t === 'step-parent' || t === 'adoptive-parent' || t === 'adopted-parent' || t === 'foster-parent') {
                            var par = peopleById(r.toId);
                            if (par) thisGen.push({ person: par, isPlaceholder: false, isStepBranch: true });
                        }
                    });
                }
            });
            if (!thisGen.length) break;  // nothing to render at this depth
            var label = g === 0 ? 'parents' : (g === 1 ? 'grandparents' : 'great-grandparents-' + g);
            var cards = thisGen.map(function (entry, i) {
                if (entry.isPlaceholder) {
                    return buildPlaceholderCard(entry.role, entry.parentId, label + '-' + i);
                }
                return buildCardWithChips(entry.person, shortRoleForCard(entry.person, anchorId));
            }).join('');
            html += '<div class="ftree-row ftree-row-' + label + '">' + cards + '</div>';
            prevGen = thisGen;
        }

        container.innerHTML = html;
    }

    // ────────────────────────────────────────────────────────────
    // PHASE 3 — Connection lines (SVG)
    // ────────────────────────────────────────────────────────────
    // Draws into the existing <svg id="ftreeLines"> overlay inside .ftree-canvas.
    // Three line types:
    //   1. COUPLE   — horizontal line between anchor and each spouse.
    //                 Solid for current marriages, dashed for ex-marriages.
    //   2. PARENTS-TO-CHILDREN  — vertical line from the midpoint of a couple
    //                              down to the children sibling bar.
    //   3. SIBLING BRACKET      — horizontal line connecting children of the
    //                              same couple, with short verticals to each child.
    // Layout uses the existing .ftree-row flex order (which now puts ex-spouses
    // before current spouses before anchor) so positions read directly from DOM.
    // ────────────────────────────────────────────────────────────
    // PHASE 3 — Connection lines
    // ────────────────────────────────────────────────────────────
    // Violetka 2026-05-18 — incremental rebuild. First pattern in:
    //
    //   EX-SPOUSE PASS-UNDER LINE
    //   When an ex-spouse sits on the same row as the anchor with the current
    //   spouse positioned between them, the former-marriage line must visually
    //   "pass under" the current spouse's card. Pattern:
    //     • horizontal DASHED line at a level below the cards' visual mid-
    //       baseline, from the anchor's near edge toward the in-between card
    //     • short vertical TICK just outside the in-between card's right edge
    //     • GAP across the in-between card's width (line hidden as if behind)
    //     • short vertical TICK just outside the in-between card's left edge
    //     • horizontal DASHED line continuing to the ex-spouse's near edge
    //   The ticks read as little "doorways" where the line dips behind the card.
    function paRenderTreeLines(layout) {
        var svg = document.getElementById('ftreeLines');
        if (!svg) return;
        var canvas = document.getElementById('ftreeCanvas');
        if (!canvas) { svg.innerHTML = ''; return; }
        var canvasRect = canvas.getBoundingClientRect();
        svg.setAttribute('width', canvasRect.width);
        svg.setAttribute('height', canvasRect.height);
        svg.setAttribute('viewBox', '0 0 ' + canvasRect.width + ' ' + canvasRect.height);
        // Override the CSS rule .ftree-lines { pointer-events: none } via inline
        // style. With pointer-events:none on the parent SVG, Chromium / Safari
        // refuse to do hit testing on children even when each path has its own
        // pointer-events:stroke. Setting it to "auto" here lets hit-pads catch
        // hover; paint paths keep pointer-events:none so they never intercept.
        // The SVG element itself has NO paint (no background, no fill), so
        // setting pointer-events:auto on it doesn't capture random clicks —
        // events fall through to whatever's underneath unless they actually
        // land on a child stroke.
        svg.style.pointerEvents = 'auto';
        svg.innerHTML = '';

        if (!layout || !layout.anchor) return;

        var SVG_NS = 'http://www.w3.org/2000/svg';
        var STROKE = '#FFFFFF';  // Violetka 2026-05-18: "лините да са бели"
        var STROKE_W = 2;        // Violetka 2026-05-19: 1.5 → 2 за по-добра видимост
                                  // върху busy golden-tree background; "къде са линиите".
        // Three distinct line patterns (Violetka 2026-05-20 — professional
        // genealogy conventions, definitive):
        //   SOLID  = blood / currently active bond   (bio parent↔child, current marriage)
        //   DOTTED = legal-only family bond          (adopted, step, foster)
        //   DASHED = former / dissolved bond         (divorced spouse)
        var DASH   = '6 6';     // long dashes for former marriage
        var DOTTED = '0 8';     // zero-length dashes + round linecap → round dots

        // Fork registry — maps forkId → [personIds]. Hovering any path
        // tagged with data-fork=X lights up every card in forkPersons[X]
        // + every path with the same data-fork. Exposed on window so the
        // module-level applyHover handler (installFtreeLineHover) can
        // resolve the partner that isn't in any linkFrom/linkTo attribute.
        // Violetka 2026-05-21: "ako kogato e wyrhu wryzkata kum decata
        // da swetat i 5te".
        var forkPersons = {};
        window.__paFTreeForkPersons = forkPersons;

        function rectOf(personId) {
            var el = canvas.querySelector('[data-person="' + personId + '"]');
            if (!el) return null;
            var r = el.getBoundingClientRect();
            return {
                left:   r.left   - canvasRect.left,
                right:  r.right  - canvasRect.left,
                top:    r.top    - canvasRect.top,
                bottom: r.bottom - canvasRect.top,
                cx:     (r.left + r.right) / 2  - canvasRect.left,
                cy:     (r.top + r.bottom) / 2  - canvasRect.top
            };
        }
        // Core path emitter — hit-pad + visible paint with hover wiring.
        // Used by addLine (straight 2-point lines) and addCornerPath (curved
        // multi-segment paths with rounded Q corners).
        function addPath(d, opts) {
            opts = opts || {};
            // ── Invisible hit-pad ── transparent stroke around the visible
            // path so a 1.5 px line is reliably hoverable.
            if (opts.linkFrom && opts.linkTo) {
                var hit = document.createElementNS(SVG_NS, 'path');
                hit.setAttribute('d', d);
                hit.setAttribute('stroke', 'transparent');
                hit.setAttribute('stroke-width', 10);
                hit.setAttribute('stroke-linecap', 'butt');
                hit.setAttribute('stroke-linejoin', 'round');
                hit.setAttribute('fill', 'none');
                hit.setAttribute('data-link-from', opts.linkFrom);
                hit.setAttribute('data-link-to',   opts.linkTo);
                if (opts.linkType) hit.setAttribute('data-link-type', opts.linkType);
                if (opts.forkId)   hit.setAttribute('data-fork', opts.forkId);
                hit.setAttribute('data-link-role', 'hit');
                hit.style.pointerEvents = 'stroke';
                hit.style.cursor = 'pointer';
                (function (hitEl, svgEl, canvasEl, from, to, forkId) {
                    function toggle(on) {
                        // Fork-aware: if this path belongs to a registered
                        // couple→children fork, highlight ALL paths + ALL
                        // persons in the fork (both parents + all kids).
                        if (forkId && forkPersons[forkId]) {
                            svgEl.querySelectorAll('[data-fork="' + forkId + '"][data-link-role="paint"]').forEach(function (p) {
                                p.classList.toggle('ftree-link-hot', on);
                            });
                            forkPersons[forkId].forEach(function (pid) {
                                var c = canvasEl.querySelector('[data-person="' + pid + '"]');
                                if (c) c.classList.toggle('ftree-card-hot', on);
                            });
                            return;
                        }
                        // Fallback: per-edge highlight (used by marriage line,
                        // ex-marriage line, etc. — not part of a fork).
                        var sel = '[data-link-from="' + from + '"][data-link-to="' + to + '"][data-link-role="paint"]';
                        svgEl.querySelectorAll(sel).forEach(function (p) {
                            p.classList.toggle('ftree-link-hot', on);
                        });
                        [from, to].forEach(function (pid) {
                            var card = canvasEl.querySelector('[data-person="' + pid + '"]');
                            if (card) card.classList.toggle('ftree-card-hot', on);
                        });
                    }
                    hitEl.addEventListener('mouseenter', function () { toggle(true); });
                    hitEl.addEventListener('mouseleave', function () { toggle(false); });
                })(hit, svg, canvas, opts.linkFrom, opts.linkTo, opts.forkId);
                svg.appendChild(hit);
            }
            // ── Visible stroke ──
            var path = document.createElementNS(SVG_NS, 'path');
            path.setAttribute('d', d);
            path.setAttribute('stroke', opts.stroke || STROKE);
            path.setAttribute('stroke-width', opts.strokeWidth || STROKE_W);
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');
            path.setAttribute('fill', 'none');
            path.setAttribute('vector-effect', 'non-scaling-stroke');
            if (opts.dashed)      path.setAttribute('stroke-dasharray', DASH);
            else if (opts.dotted) path.setAttribute('stroke-dasharray', DOTTED);
            if (opts.linkFrom) path.setAttribute('data-link-from', opts.linkFrom);
            if (opts.linkTo)   path.setAttribute('data-link-to',   opts.linkTo);
            if (opts.linkType) path.setAttribute('data-link-type', opts.linkType);
            if (opts.forkId)   path.setAttribute('data-fork', opts.forkId);
            path.setAttribute('data-link-role', 'paint');
            path.style.pointerEvents = 'none';
            svg.appendChild(path);
            return path;
        }
        function addLine(x1, y1, x2, y2, opts) {
            return addPath('M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2, opts);
        }
        // Build path data for a one-child fork: vertical from marriage midpoint
        // → rounded corner → horizontal sibling-bar leg → rounded corner →
        // vertical stub down to the child's bottom edge. Violetka 2026-05-18:
        // "тези линии да са по-обли". Corner radius defaults to 8 px and
        // clamps so we never overshoot a short segment.
        function buildForkPathD(midX, yMarriage, childCx, childBottom, ySiblingBar, R) {
            var radius = (typeof R === 'number') ? R : 8;
            // Collapse near-vertical paths to a straight line. Anything within
            // 2× the corner radius can't fit two real Q-curves anyway — the
            // result is a wonky zigzag of 1 px offsets. Violetka 2026-05-18:
            // "линията сякаш е сцепена презуме — оправи я да е права." So
            // treat anything closer than the radius itself as one straight line.
            var horzDist = Math.abs(childCx - midX);
            if (horzDist < radius) {
                var x = (midX + childCx) / 2;
                return 'M ' + x + ' ' + yMarriage + ' L ' + x + ' ' + childBottom;
            }
            var vertDirMar   = (ySiblingBar > yMarriage) ? 1 : -1;
            var horzDir      = (childCx > midX) ? 1 : -1;
            var vertDirChild = (childBottom > ySiblingBar) ? 1 : -1;
            var vertDistMar  = Math.abs(yMarriage - ySiblingBar);
            var vertDistChld = Math.abs(childBottom - ySiblingBar);
            var rEff = Math.min(radius, horzDist / 2, vertDistMar / 2, vertDistChld / 2);
            return 'M ' + midX + ' ' + yMarriage
                + ' L ' + midX + ' ' + (ySiblingBar - vertDirMar * rEff)
                + ' Q ' + midX + ' ' + ySiblingBar + ' ' + (midX + horzDir * rEff) + ' ' + ySiblingBar
                + ' L ' + (childCx - horzDir * rEff) + ' ' + ySiblingBar
                + ' Q ' + childCx + ' ' + ySiblingBar + ' ' + childCx + ' ' + (ySiblingBar + vertDirChild * rEff)
                + ' L ' + childCx + ' ' + childBottom;
        }
        function addCornerPath(d, opts) { return addPath(d, opts); }

        // ────────────────────────────────────────────────────────────
        // McGoldrick line semantics (Violetka 2026-05-21, research-backed):
        //   • child + child   → solid (biological descent)
        //   • adopted-child   → dashed (legal adoption, full inheritance)
        //   • foster-child    → dotted (temporary legal guardianship)
        //   • step-child      → SKIP (shown via card role label only)
        //   • mixed cases     → use the strongest non-bio marker present
        // Reference: McGoldrick–Gerson genogram standard (1985+), the
        // clinical convention recognized by genealogists worldwide.
        // ────────────────────────────────────────────────────────────
        function determineChildBondStyle(typeA, typeB) {
            if (typeA === 'step-child' || typeB === 'step-child') return 'skip';
            if (typeA === 'foster-child' || typeB === 'foster-child') return 'dotted';
            if (typeA === 'adopted-child' || typeB === 'adopted-child') return 'dashed';
            if (typeA === 'child' && typeB === 'child') return 'solid';
            return 'solid';
        }

        // ────────────────────────────────────────────────────────────
        // Unified couple→children fork (Violetka 2026-05-20, definitive):
        //   • Trunk: ONE straight vertical line from marriage midpoint
        //     to sibling-bar Y
        //   • Bar: ONE straight horizontal line spanning all children's cx
        //   • Stubs: ONE straight vertical line per child from bar to card
        //   • Rounded corners ONLY at the trunk→bar junction (T or L)
        //     — never per-child Q curves stacking on the trunk top.
        // "Лудете са си прави да са прави - където се алага да има
        //  угъл просто да е раудед" (lines that should be straight
        //  must be straight; corners that must exist must be rounded).
        // ────────────────────────────────────────────────────────────
        function drawUnifiedFork(midX, yMarriage, parentRowTop, childrenWithRects, linkFromId, linkType, isDashed, partnerId) {
            if (!childrenWithRects.length) return;
            var radius = 8;
            var childrenBottom = Math.max.apply(null, childrenWithRects.map(function (c) { return c.rect.bottom; }));
            var ySiblingBar = (childrenBottom + parentRowTop) / 2;

            // Register this fork so hover highlights BOTH parents + ALL
            // children when the cursor enters any path in the structure.
            var forkPartners = partnerId ? [linkFromId, partnerId] : [linkFromId];
            var forkId = 'fork-' + forkPartners.slice().sort().join('-');
            var allPersons = forkPartners.concat(childrenWithRects.map(function (c) { return c.id; }));
            forkPersons[forkId] = allPersons;

            // Single child: use existing fork builder (collapses to a
            // straight line when child is directly above the midpoint).
            // Per-child style (solid/dashed/dotted) overrides isDashed
            // when child.style is provided.
            if (childrenWithRects.length === 1) {
                var only = childrenWithRects[0];
                var d0 = buildForkPathD(midX, yMarriage, only.rect.cx, only.rect.bottom, ySiblingBar, radius);
                addCornerPath(d0, {
                    linkFrom: linkFromId,
                    linkTo:   only.id,
                    linkType: linkType,
                    forkId:   forkId,
                    dashed:   only.style ? only.style === 'dashed' : !!isDashed,
                    dotted:   only.style === 'dotted'
                });
                return;
            }

            // Multi-child: unified trunk + bar + stubs
            var sorted  = childrenWithRects.slice().sort(function (a, b) { return a.rect.cx - b.rect.cx; });
            var minCx   = sorted[0].rect.cx;
            var maxCx   = sorted[sorted.length - 1].rect.cx;
            var leftEnd  = Math.min(minCx, midX);
            var rightEnd = Math.max(maxCx, midX);
            var trunkEnd = ySiblingBar + radius;
            var trunkInside = midX > leftEnd + 1 && midX < rightEnd - 1;

            if (trunkInside) {
                var dLeft = 'M ' + midX + ' ' + yMarriage
                          + ' L ' + midX + ' ' + trunkEnd
                          + ' Q ' + midX + ' ' + ySiblingBar + ' ' + (midX - radius) + ' ' + ySiblingBar
                          + ' L ' + leftEnd + ' ' + ySiblingBar;
                var dRight = 'M ' + midX + ' ' + trunkEnd
                           + ' Q ' + midX + ' ' + ySiblingBar + ' ' + (midX + radius) + ' ' + ySiblingBar
                           + ' L ' + rightEnd + ' ' + ySiblingBar;
                addCornerPath(dLeft, {
                    linkFrom: linkFromId,
                    linkTo:   sorted[0].id,
                    linkType: 'couple-trunk',
                    forkId:   forkId,
                    dashed:   !!isDashed
                });
                addCornerPath(dRight, {
                    linkFrom: linkFromId,
                    linkTo:   sorted[sorted.length - 1].id,
                    linkType: 'couple-trunk',
                    forkId:   forkId,
                    dashed:   !!isDashed
                });
            } else {
                var horzDir = (midX <= leftEnd) ? 1 : -1;
                var farEnd  = (horzDir === 1) ? rightEnd : leftEnd;
                var dL = 'M ' + midX + ' ' + yMarriage
                       + ' L ' + midX + ' ' + trunkEnd
                       + ' Q ' + midX + ' ' + ySiblingBar + ' ' + (midX + horzDir * radius) + ' ' + ySiblingBar
                       + ' L ' + farEnd + ' ' + ySiblingBar;
                addCornerPath(dL, {
                    linkFrom: linkFromId,
                    linkTo:   sorted[0].id,
                    linkType: 'couple-trunk',
                    forkId:   forkId,
                    dashed:   !!isDashed
                });
            }

            // Per-child stub — straight vertical from bar to child bottom.
            // Each stub honors that child's own line style (McGoldrick).
            // No Q corner at the stub-bar junction (sharp T-junction is
            // visually clean and matches the "straight lines stay straight"
            // principle).
            sorted.forEach(function (c) {
                addLine(c.rect.cx, ySiblingBar, c.rect.cx, c.rect.bottom, {
                    linkFrom: linkFromId,
                    linkTo:   c.id,
                    linkType: linkType,
                    forkId:   forkId,
                    dashed:   c.style ? c.style === 'dashed' : !!isDashed,
                    dotted:   c.style === 'dotted'
                });
            });
        }

        // EX-SPOUSE PASS-UNDER (Violetka 2026-05-18)
        // The dashed line sits at the cards' VERTICAL CENTER, runs across the
        // gaps between cards, and "disappears behind" each in-between card on
        // the same row. Short vertical ticks at each obstacle's outer edges
        // mark the entry / exit points where the line tucks under.
        var anchor = rectOf(layout.anchor.id);
        // BUGFIX 2026-05-19: was `if (anchor && exSpouses.length)` which meant
        // anchors with ONLY current spouses (e.g. John Johnson with Sarah, no
        // exes) got zero lines drawn. The exSpouses.forEach handles the
        // empty-array case gracefully, so just gate on `anchor` existing.
        // Violetka 2026-05-19: "линиите трябва да са правилни" — applies to
        // every anchor, not just those with former marriages.
        if (anchor) {
            // y of the pass-under line — middle of the anchor row cards, so it
            // reads as a horizontal between gaps. Cards have z-index 1 over the
            // SVG (z-index 0), so the line is naturally hidden behind the cards
            // without us having to "skip" the obstacle's horizontal range —
            // visually only the gap segments remain, which is the desired effect.
            // Two distinct Y bands so the current and former marriage lines
            // don't share pixels. Violetka 2026-05-18: "правата е отгоре,
            // пунктираната е отдолу". Current (solid) marriage stays as the
            // primary, on top; former (dashed) marriage drops below so its
            // 10 px ticks never cross the solid stroke above.
            var yLineCurrent = anchor.cy - 8;     // primary: solid, current marriage — ABOVE
            var yLineFormer  = anchor.cy + 8;     // secondary: dashed, former marriage — BELOW
            var tickHeight = 10;

            // Helper: drop a "children fork" from a marriage line midpoint to
            // every biological child SHARED between the anchor and the given
            // spouse. Children are above the anchor row in this tree, so the
            // fork goes UP: vertical from midX,yMarriage → up to the sibling
            // bar Y → horizontal sibling bar across the sharedChildren cxes →
            // short vertical stubs from each child's bottom down to the bar.
            // For a single shared child, the sibling bar collapses to a single
            // vertical (no horizontal segment needed).
            // Defined BEFORE both marriage loops so it's reachable from each.
            function drawChildrenFork(midX, yMarriage, spouseId, linkType) {
                var spouse = (typeof peopleById === 'function') ? peopleById(spouseId) : null;
                if (!spouse) return;
                var anchorPerson = (typeof peopleById === 'function') ? peopleById(layout.anchor.id) : null;
                // Build a map of childId → relationship-type per parent. A
                // couple→child line is drawn ONLY when BOTH parents have the
                // SAME bond type — i.e. both 'child' (bio couple), or both
                // 'adopted-child' / 'foster-child' (joint legal couple).
                // Mixed cases (bio mom + step dad) are SKIPPED here so we
                // don't drag a misleading dashed line from the new couple to
                // a child who is really bio of the OTHER (former) couple.
                // The bio side's own line still draws via its bio-couple or
                // solo-parent fork. Violetka 2026-05-20: "Emma е био-дъщеря —
                // не я показвай свързана към step-couple".
                function childRelMap(person) {
                    var m = {};
                    (person && person.relationships || []).forEach(function (r) {
                        if (!r || !r.toId || !r.type) return;
                        if (!isChildType(r.type)) return;
                        m[r.toId] = String(r.type).toLowerCase();
                    });
                    return m;
                }
                var anchorChildMap = childRelMap(anchorPerson);
                var spouseChildMap = childRelMap(spouse);
                var anchorChildren = (layout.descendants && layout.descendants[0]) || [];
                // McGoldrick per-child line styles: solid (bio), dashed
                // (adopted), dotted (foster). Step kids are SKIPPED — the
                // step relationship is conveyed via the card's role label,
                // not a separate line from the step-couple.
                var shared = anchorChildren
                    .filter(function (c) {
                        var a = anchorChildMap[c.id], b = spouseChildMap[c.id];
                        if (!a || !b) return false;
                        return determineChildBondStyle(a, b) !== 'skip';
                    })
                    .map(function (c) {
                        var style = determineChildBondStyle(anchorChildMap[c.id], spouseChildMap[c.id]);
                        return { id: c.id, rect: rectOf(c.id), style: style };
                    })
                    .filter(function (c) { return !!c.rect; });
                if (!shared.length) return;
                drawUnifiedFork(midX, yMarriage, anchor.top, shared, layout.anchor.id, linkType || 'spouse-children', false, spouseId);
            }

            // Collect rects for every other card in the SAME row (anchor row).
            // We approximate "same row" as cy within 30 px of anchor.cy.
            var sameRowRects = [];
            var allCards = canvas.querySelectorAll('[data-person]');
            for (var i = 0; i < allCards.length; i++) {
                var pid = allCards[i].getAttribute('data-person');
                if (!pid || pid === layout.anchor.id) continue;
                var r = rectOf(pid);
                if (!r) continue;
                if (Math.abs(r.cy - anchor.cy) > 30) continue;
                sameRowRects.push({ id: pid, rect: r });
            }

            // CURRENT MARRIAGE (Violetka 2026-05-18): anchor ↔ current spouse.
            // Single SOLID straight line at yLineCurrent, no ticks, no clearance —
            // cards are adjacent so no obstacle to dodge. Plus children fork
            // dropping from the marriage midpoint UP to each shared biological
            // child's bottom edge ("от нея ще излязват линиите към 3те деца").
            (layout.spouses || []).forEach(function (s) {
                var sp = rectOf(s.person.id);
                if (!sp) return;
                // Endpoints: from the spouse's NEAR edge to the anchor's NEAR edge.
                var fromX, toX;
                if (sp.cx < anchor.cx) { fromX = sp.right;     toX = anchor.left;  }
                else                   { fromX = anchor.right; toX = sp.left;      }
                addLine(fromX, yLineCurrent, toX, yLineCurrent, {
                    linkFrom: layout.anchor.id,
                    linkTo:   s.person.id,
                    linkType: 'spouse'
                });
                // Children fork at the marriage midpoint
                var midX = (fromX + toX) / 2;
                drawChildrenFork(midX, yLineCurrent, s.person.id, 'spouse-children');
            });

            layout.exSpouses.forEach(function (s) {
                var ex = rectOf(s.person.id);
                if (!ex) return;
                // Range between ex and anchor along x. Direction-agnostic.
                var xL = Math.min(ex.right, anchor.left);
                var xR = Math.max(ex.right, anchor.left);
                // We're going to walk from anchor.left toward ex.right (right→left
                // in the common case where ex is left of anchor). Normalize by
                // sorting endpoints by x.
                var fromX = anchor.left;
                var toX   = ex.right;
                if (toX > fromX) { var tmp = fromX; fromX = toX; toX = tmp; }
                // Now fromX > toX — segment runs RIGHT→LEFT.

                // PASS-UNDER DASHED LINE with vertical tick markers at each
                // in-between card's edges. The ticks visually communicate
                // "the line tucks under this card here". Pattern locked
                // 2026-05-18, restored 2026-05-20 ("вчера лините беше супер").
                var obstacles = sameRowRects.filter(function (o) {
                    if (o.id === s.person.id) return false;
                    return o.rect.left > toX + 2 && o.rect.right < fromX - 2;
                }).sort(function (a, b) { return b.rect.cx - a.rect.cx; });

                var edgeClearance = 4;
                var halfTick = tickHeight / 2;
                var cursor = fromX;
                var linkOpts = {
                    linkFrom: layout.anchor.id,
                    linkTo:   s.person.id,
                    linkType: 'former-spouse'
                };
                obstacles.forEach(function (o) {
                    var rightStopX = o.rect.right + edgeClearance;
                    var leftStopX  = o.rect.left  - edgeClearance;
                    addLine(cursor, yLineFormer, rightStopX, yLineFormer, Object.assign({ dashed: true }, linkOpts));
                    addLine(rightStopX, yLineFormer - halfTick, rightStopX, yLineFormer + halfTick, linkOpts);
                    addLine(leftStopX,  yLineFormer - halfTick, leftStopX,  yLineFormer + halfTick, linkOpts);
                    cursor = leftStopX;
                });
                addLine(cursor, yLineFormer, toX, yLineFormer, Object.assign({ dashed: true }, linkOpts));

                // Children fork from the segment closest to the ex (so the
                // vertical never crosses any obstacle).
                var formerForkX = (cursor + toX) / 2;
                drawChildrenFork(formerForkX, yLineFormer, s.person.id, 'former-children');
            });
        }

        // ────────────────────────────────────────────────────────────
        // ANCESTOR GENERATIONS — Sarah's parents, grandparents, great-…
        // ────────────────────────────────────────────────────────────
        // Same locked pattern as anchor's marriages, applied for every
        // ancestor generation in layout.ancestors:
        //   • Married pair → SOLID marriage line at their row's cy + a
        //     rounded fork up to each child SHARED with the spouse.
        //   • Solo parent (no spouse rendered in the same generation) →
        //     single rounded fork from the parent's top edge up to each
        //     of their children that's rendered in the next inner gen.
        // childGen is the generation one step closer to the anchor:
        //   genIdx 0 → [anchor], genIdx 1 → ancestors[0], etc.
        (layout.ancestors || []).forEach(function (generation, genIdx) {
            if (!generation || !generation.length) return;
            // childGen = the row directly BELOW this ancestor row, where the
            // shared-children fork should land. For genIdx=0 (anchor's
            // parents) the child row is the anchor PLUS all siblings —
            // because Sarah & John (current marriage) share Liam/Lisa/Noah
            // (Emma's half-siblings on the anchor row), and we want a fork
            // from Sarah-John midpoint up to those siblings, not just to
            // the anchor. Violetka 2026-05-20.
            var childGen = (genIdx === 0)
                ? [layout.anchor].concat((layout.siblings || []))
                : layout.ancestors[genIdx - 1];
            if (!childGen || !childGen.length) return;

            // 1. Find pairs within this generation. Detects BOTH current
            //    marriages AND former marriages — a parent row can contain
            //    e.g. Jack (Emma's bio dad, divorced from Sarah) + Sarah
            //    (Emma's bio mom, currently married to John) + John (step
            //    dad), so Sarah ends up in TWO pairs: dashed line to Jack
            //    (former) and solid line to John (current). Each pair gets
            //    its own line + its own shared-children fork.
            //    Violetka 2026-05-20: "защо тук я нямя пунктираната линия
            //    между Сара и Джак".
            var marriedPairs = [];       // [[idA, idB, isFormer], ...]
            var paired = {};              // person in ANY pair (current or former)
            for (var i = 0; i < generation.length; i++) {
                for (var j = i + 1; j < generation.length; j++) {
                    var pA = (typeof peopleById === 'function') ? peopleById(generation[i].id) : null;
                    if (!pA) continue;
                    var idA = generation[i].id;
                    var idB = generation[j].id;
                    var currentMatch = false, formerMatch = false;
                    (pA.relationships || []).forEach(function (r) {
                        if (!r || r.toId !== idB || !r.type) return;
                        if (isFormerSpouseType(r.type)) formerMatch = true;
                        else if (isSpouseType(r.type))  currentMatch = true;
                    });
                    if (currentMatch) {
                        marriedPairs.push([idA, idB, false]);
                        paired[idA] = true;
                        paired[idB] = true;
                    } else if (formerMatch) {
                        marriedPairs.push([idA, idB, true]);
                        paired[idA] = true;
                        paired[idB] = true;
                    }
                }
            }

            // 2. Marriage line + shared-child fork for each pair.
            marriedPairs.forEach(function (pair) {
                drawAncestorMarriagePair(pair[0], pair[1], childGen, pair[2]);
            });

            // 3. Solo-parent fork for unpaired members.
            generation.forEach(function (person) {
                if (paired[person.id]) return;
                drawSoloParentFork(person.id, childGen);
            });

            // 4. Paired parents who have children NOT shared with their
            //    current partner — draw a solo fork to those specific
            //    children. E.g. Sarah is paired with John (current
            //    marriage) but has Emma from a former marriage with Jack
            //    who isn't rendered → fork from Sarah alone to Emma.
            //    Violetka 2026-05-22: "защо не са свързани братата и
            //    сестрите". Without this, Emma stays disconnected in
            //    Liam's tree because Jack isn't rendered there.
            generation.forEach(function (person) {
                if (!paired[person.id]) return;
                // Find this person's children that are in childGen but
                // NOT in any pair's sharedChildren (i.e. they only have
                // ONE of the paired parents as a bio parent).
                var pData = peopleById(person.id);
                if (!pData) return;
                var myChildIds = (pData.relationships || [])
                    .filter(function (r) { return r && String(r.type).toLowerCase() === 'child'; })
                    .map(function (r) { return r.toId; });
                if (!myChildIds.length) return;
                // Build the set of "shared with my partner" children —
                // ONLY counts BIO children (type === 'child'), not step /
                // adopted / foster (which are legal-only and shouldn't
                // count as "shared" for connection-line purposes). Without
                // this, John's step-child edge to Emma was making us think
                // Emma was shared with him → Sarah's bio-only Emma line
                // never drew. Violetka 2026-05-22.
                var sharedWithPartner = {};
                marriedPairs.forEach(function (pair) {
                    var partnerId = pair[0] === person.id ? pair[1]
                                  : pair[1] === person.id ? pair[0] : null;
                    if (!partnerId) return;
                    var partnerData = peopleById(partnerId);
                    if (!partnerData) return;
                    (partnerData.relationships || []).forEach(function (r) {
                        if (r && String(r.type).toLowerCase() === 'child') {
                            sharedWithPartner[r.toId] = true;
                        }
                    });
                });
                // Children of mine NOT shared with my partner AND in childGen
                var unsharedKids = childGen.filter(function (c) {
                    return myChildIds.indexOf(c.id) !== -1 && !sharedWithPartner[c.id];
                });
                if (unsharedKids.length) {
                    drawSoloParentFork(person.id, unsharedKids);
                }
            });
        });

        // ────────────────────────────────────────────────────────────
        // DESCENDANT GENERATIONS — for each generation in descendants[],
        // find married pairs (with descendantSpouses) and draw forks UP
        // to the next-deeper generation's shared children. Mirrors the
        // ancestors logic. Violetka 2026-05-22.
        // ────────────────────────────────────────────────────────────
        // Build the per-row collection: descendants[gen] PLUS any
        // descendantSpouses tagged to that gen, so we can find pairs.
        var descRows = (layout.descendants || []).map(function (gen, genIdx) {
            var row = gen.slice();
            (layout.descendantSpouses || []).forEach(function (ds) {
                if (ds.genIdx === genIdx) row.push(ds.person);
            });
            return row;
        });
        // For each gen (0=children, 1=grandchildren, …) walk DOWN to find
        // pairs whose children are in gen+1 (deeper). Skip the last gen
        // (no further descendants).
        descRows.forEach(function (rowMembers, genIdx) {
            if (genIdx >= descRows.length - 1) return;        // no deeper gen
            var nextGen = layout.descendants[genIdx + 1] || [];
            if (!nextGen.length) return;

            // Find pairs within this row (current + former marriages)
            var dPairs = [];
            var dPaired = {};
            for (var i = 0; i < rowMembers.length; i++) {
                for (var j = i + 1; j < rowMembers.length; j++) {
                    var pA = peopleById(rowMembers[i].id);
                    if (!pA) continue;
                    var idA = rowMembers[i].id;
                    var idB = rowMembers[j].id;
                    var curr = false, former = false;
                    (pA.relationships || []).forEach(function (r) {
                        if (!r || r.toId !== idB || !r.type) return;
                        if (isFormerSpouseType(r.type)) former = true;
                        else if (isSpouseType(r.type))  curr = true;
                    });
                    if (curr)       { dPairs.push([idA, idB, false]); dPaired[idA] = dPaired[idB] = true; }
                    else if (former){ dPairs.push([idA, idB, true]);  dPaired[idA] = dPaired[idB] = true; }
                }
            }
            // Paired parents → marriage line + shared-children fork
            dPairs.forEach(function (pair) {
                drawAncestorMarriagePair(pair[0], pair[1], nextGen, pair[2]);
            });
            // Solo parents → single fork to children that are theirs
            rowMembers.forEach(function (member) {
                if (dPaired[member.id]) return;
                drawSoloParentFork(member.id, nextGen);
            });
        });

        function drawAncestorMarriagePair(idA, idB, childGen, isFormer) {
            var rA = rectOf(idA);
            var rB = rectOf(idB);
            if (!rA || !rB) return;
            // Marriage line at the average cy of the two cards. When a row
            // has BOTH a current and a former marriage involving the same
            // person (e.g. Emma's parents row: Jack–Sarah former + Sarah–
            // John current), offset the two lines on two Y-bands so they
            // don't share pixels — same pattern as anchor row's yLineCurrent
            // /yLineFormer split.
            var baseY = (rA.cy + rB.cy) / 2;
            var pYLine = isFormer ? baseY + 8 : baseY - 8;
            var pFromX, pToX;
            if (rA.cx < rB.cx) { pFromX = rA.right; pToX = rB.left; }
            else               { pFromX = rB.right; pToX = rA.left; }
            addLine(pFromX, pYLine, pToX, pYLine, {
                linkFrom: idA,
                linkTo:   idB,
                linkType: isFormer ? 'former-spouse' : 'spouse',
                dashed:   !!isFormer
            });
            // Shared children — both parents must list the child via SOME
            // parent-child link type (bio, adopted, step, foster). Per-child
            // we compute isBlood = (both sides have type 'child'). Anything
            // else → dashed legal-only line.
            var dataA = (typeof peopleById === 'function') ? peopleById(idA) : null;
            var dataB = (typeof peopleById === 'function') ? peopleById(idB) : null;
            if (!dataA || !dataB) return;
            function pChildRelMap(person) {
                var m = {};
                (person && person.relationships || []).forEach(function (r) {
                    if (!r || !r.toId || !r.type) return;
                    if (!isChildType(r.type)) return;
                    m[r.toId] = String(r.type).toLowerCase();
                });
                return m;
            }
            var aMap = pChildRelMap(dataA);
            var bMap = pChildRelMap(dataB);
            // McGoldrick per-child line styles — step kids skipped.
            var sharedChildren = childGen
                .filter(function (c) {
                    if (!aMap[c.id] || !bMap[c.id]) return false;
                    return determineChildBondStyle(aMap[c.id], bMap[c.id]) !== 'skip';
                })
                .map(function (c) {
                    var style = determineChildBondStyle(aMap[c.id], bMap[c.id]);
                    return { id: c.id, rect: rectOf(c.id), style: style };
                })
                .filter(function (c) { return !!c.rect; });
            if (!sharedChildren.length) return;
            var pMidX = (pFromX + pToX) / 2;
            var rowTop = Math.min(rA.top, rB.top);
            drawUnifiedFork(pMidX, pYLine, rowTop, sharedChildren, idA, 'parents-children', false, idB);
        }

        function drawSoloParentFork(parentId, childGen) {
            var pr = rectOf(parentId);
            if (!pr) return;
            var pData = (typeof peopleById === 'function') ? peopleById(parentId) : null;
            if (!pData) return;
            // Per-child relationship-type map — same blood vs legal logic
            // used for paired parents. type === 'child' → blood (solid);
            // adopted/step/foster → legal-only (dashed).
            var pMap = {};
            (pData.relationships || []).forEach(function (r) {
                if (!r || !r.toId || !r.type) return;
                if (!isChildType(r.type)) return;
                pMap[r.toId] = String(r.type).toLowerCase();
            });
            // McGoldrick solo-parent lines:
            //   child           → solid (bio)
            //   adopted-child   → dashed (legal)
            //   foster-child    → dotted (temporary legal)
            //   step-child      → SKIP (shown via card role label only)
            var children = childGen
                .filter(function (c) {
                    var t = pMap[c.id];
                    if (!t) return false;
                    if (t === 'step-child') return false;
                    return true;
                })
                .map(function (c) {
                    var t = pMap[c.id];
                    var style = (t === 'adopted-child') ? 'dashed'
                              : (t === 'foster-child')  ? 'dotted'
                              : 'solid';
                    return { id: c.id, rect: rectOf(c.id), style: style };
                })
                .filter(function (c) { return !!c.rect; });
            if (!children.length) return;
            // Solo parent has no spouse → trunk emerges from the parent's
            // TOP-center. yMarriage = parentRowTop = pr.top so the trunk
            // starts at parent's top edge and the sibling-bar Y falls
            // halfway between children-bottom and parent-top.
            drawUnifiedFork(pr.cx, pr.top, pr.top, children, parentId, 'solo-parent', false);
        }

        // ────────────────────────────────────────────────────────────
        // PLACEHOLDER CONNECTORS — connect empty "Add Father / Mother /
        // Grandmother / …" cards to the child they're a parent of, so
        // empty slots feel part of the family tree (Violetka 2026-05-21:
        // "свържи и празните карти"). Drawn as a rounded L from
        // placeholder.top UP to the bar Y of the child's parent fork,
        // then horizontal to the child's cx + UP into child stub. Solid
        // line because the slot represents the BIO parent who would fill
        // it (per the renderer's ancestor expansion logic).
        // ────────────────────────────────────────────────────────────
        // Helper — for a placeholder, find the nearest card in the row
        // directly below (closer to anchor) and use it as the target for
        // the connecting line. This handles BOTH real-person targets
        // (data-person) AND placeholder→placeholder chains in higher
        // generations, without needing brittle id matching.
        function elRectInCanvas(el) {
            var r = el.getBoundingClientRect();
            return {
                left:   r.left   - canvasRect.left,
                right:  r.right  - canvasRect.left,
                top:    r.top    - canvasRect.top,
                bottom: r.bottom - canvasRect.top,
                cx:     (r.left + r.right) / 2  - canvasRect.left,
                cy:     (r.top + r.bottom) / 2  - canvasRect.top
            };
        }
        function nearestCardInRowBelow(ph) {
            var row = ph.closest('.ftree-row');
            if (!row) return null;
            // The row CLOSER to the anchor is the previous sibling .ftree-row
            // (rows are emitted descendants-first, then anchor row, then
            // ancestors — so for an ancestor placeholder, the inner row is
            // the PREVIOUS sibling in DOM order).
            var prev = row.previousElementSibling;
            while (prev && !prev.classList.contains('ftree-row')) {
                prev = prev.previousElementSibling;
            }
            if (!prev) return null;
            var cards = prev.querySelectorAll('.ftree-card');
            if (!cards.length) return null;
            var phRect = elRectInCanvas(ph);
            var best = null, bestDist = Infinity;
            cards.forEach(function (c) {
                var r = elRectInCanvas(c);
                var d = Math.abs(r.cx - phRect.cx);
                if (d < bestDist) { bestDist = d; best = r; }
            });
            return best;
        }

        var phCards = canvas.querySelectorAll('.ftree-card-add-placeholder');
        phCards.forEach(function (ph) {
            var childId = ph.getAttribute('data-parent-id');
            if (!childId) return;
            var phRectAbs = ph.getBoundingClientRect();
            // Prefer real-person target by id, fall back to positional
            // matching for placeholder→placeholder chains.
            var childRect = rectOf(childId) || nearestCardInRowBelow(ph);
            if (!childRect) return;
            var phCx = (phRectAbs.left + phRectAbs.right) / 2 - canvasRect.left;
            var phTop = phRectAbs.top - canvasRect.top;
            var barY = (childRect.bottom + phTop) / 2;
            var radius = 8;
            var horzDir = (childRect.cx > phCx) ? 1 : -1;
            var d;
            if (Math.abs(childRect.cx - phCx) < radius) {
                d = 'M ' + phCx + ' ' + phTop + ' L ' + phCx + ' ' + childRect.bottom;
            } else {
                d = 'M ' + phCx + ' ' + phTop
                  + ' L ' + phCx + ' ' + (barY + radius)
                  + ' Q ' + phCx + ' ' + barY + ' ' + (phCx + horzDir * radius) + ' ' + barY
                  + ' L ' + (childRect.cx - horzDir * radius) + ' ' + barY
                  + ' Q ' + childRect.cx + ' ' + barY + ' ' + childRect.cx + ' ' + (barY - radius)
                  + ' L ' + childRect.cx + ' ' + childRect.bottom;
            }
            addCornerPath(d, {
                linkFrom: ph.getAttribute('data-placeholder-id') || 'placeholder',
                linkTo:   childId,
                linkType: 'placeholder-parent'
            });
        });

        // Install hover binding ONCE per page (idempotent). When the cursor
        // enters any tagged path, every path with the same data-link-from /
        // data-link-to pair lights up, and so do the two endpoint cards.
        // Pointer-events on each path were already set to "stroke" so only
        // the painted line catches the hover.
        installFtreeLineHover(canvas, svg);
    }

    var __ftreeHoverInstalled = false;
    // Human-readable label for a line's data-link-type. Three-pattern
    // system: solid (blood/current), dotted (legal-only), dashed (former).
    // Used by the hover tooltip. Violetka 2026-05-20.
    function ftreeLinkTypeLabel(linkType) {
        switch (linkType) {
            case 'spouse':           return 'Current marriage';
            case 'former-spouse':    return 'Former marriage';
            case 'spouse-children':  return 'Biological child';
            case 'former-children':  return 'Biological child (from former marriage)';
            case 'parents-children': return 'Biological descent';
            case 'solo-parent':      return 'Biological parent';
            case 'legal-child':      return 'Adopted, step or foster';
            default:                 return '';
        }
    }
    function installFtreeLineHover(canvas, svg) {
        if (__ftreeHoverInstalled) return;
        __ftreeHoverInstalled = true;
        // Single tooltip node reused across all line hovers. Same glass
        // styling as the existing branch-marker tooltip — see
        // .ftree-line-tooltip in _shared.css.
        var tip = document.createElement('div');
        tip.className = 'ftree-line-tooltip';
        tip.setAttribute('aria-hidden', 'true');
        document.body.appendChild(tip);
        function showTip(text, x, y) {
            if (!text) return;
            tip.textContent = text;
            tip.style.left = x + 'px';
            tip.style.top  = y + 'px';
            tip.classList.add('open');
        }
        function hideTip() { tip.classList.remove('open'); }
        function applyHover(target, on) {
            // Fork-aware: if the path belongs to a couple→children fork
            // (data-fork attribute), highlight ALL paths + ALL persons in
            // the fork (both parents + every child). Persons are derived
            // by unioning data-link-from + data-link-to across all paths
            // sharing the same data-fork. Hovering one child's line lights
            // up the whole family branch. Violetka 2026-05-21.
            var forkId = target.getAttribute('data-fork');
            if (forkId) {
                var forkPaths = svg.querySelectorAll('[data-fork="' + forkId + '"][data-link-role="paint"]');
                if (forkPaths.length) {
                    forkPaths.forEach(function (p) {
                        p.classList.toggle('ftree-link-hot', on);
                    });
                    // Resolve all persons: from the global fork map if
                    // present (includes the partner who isn't in any
                    // linkFrom/linkTo), else fall back to unioning the
                    // path attributes.
                    var personSet = {};
                    var registered = window.__paFTreeForkPersons && window.__paFTreeForkPersons[forkId];
                    if (registered && registered.length) {
                        registered.forEach(function (pid) { personSet[pid] = true; });
                    } else {
                        forkPaths.forEach(function (p) {
                            var f = p.getAttribute('data-link-from'); if (f) personSet[f] = true;
                            var t = p.getAttribute('data-link-to');   if (t) personSet[t] = true;
                        });
                    }
                    Object.keys(personSet).forEach(function (pid) {
                        var c = canvas.querySelector('[data-person="' + pid + '"]');
                        if (c) c.classList.toggle('ftree-card-hot', on);
                    });
                    return;
                }
            }
            // Fallback per-edge highlight for marriage / ex-marriage lines
            var from = target.getAttribute('data-link-from');
            var to   = target.getAttribute('data-link-to');
            if (!from || !to) return;
            var sel = '[data-link-from="' + from + '"][data-link-to="' + to + '"][data-link-role="paint"]';
            svg.querySelectorAll(sel).forEach(function (p) {
                p.classList.toggle('ftree-link-hot', on);
            });
            [from, to].forEach(function (pid) {
                var card = canvas.querySelector('[data-person="' + pid + '"]');
                if (card) card.classList.toggle('ftree-card-hot', on);
            });
        }
        svg.addEventListener('mouseover', function (e) {
            var t = e.target.closest('[data-link-from][data-link-to]');
            if (!t) return;
            applyHover(t, true);
            var label = ftreeLinkTypeLabel(t.getAttribute('data-link-type'));
            if (label) showTip(label, e.clientX, e.clientY);
        });
        svg.addEventListener('mousemove', function (e) {
            var t = e.target.closest('[data-link-from][data-link-to]');
            if (!t) return;
            if (tip.classList.contains('open')) {
                tip.style.left = e.clientX + 'px';
                tip.style.top  = e.clientY + 'px';
            }
        });
        svg.addEventListener('mouseout', function (e) {
            var t = e.target.closest('[data-link-from][data-link-to]');
            if (t) applyHover(t, false);
            hideTip();
        });
    }

    // ────────────────────────────────────────────────────────────
    // Convenience: mount + render + draw lines
    // ────────────────────────────────────────────────────────────
    function paFamilyTreeMount(anchorId, opts) {
        var container = document.getElementById('ftreeMount');
        if (!container) return;
        // Apply Generations selector (Violetka 2026-05-18). window.__paTreeGens
        // is the user's selected depth from the bottom-bar control: 1..5, where
        // 5 means "show all available generations (5+)". Pass it through to the
        // builder so layout.ancestors / layout.descendants get clipped.
        opts = opts || {};
        var gens = (typeof window.__paTreeGens === 'number' && window.__paTreeGens > 0)
                 ? window.__paTreeGens : 1;
        if (opts.depthUp == null)   opts.depthUp   = (gens >= 5) ? 5 : gens;
        if (opts.depthDown == null) opts.depthDown = (gens >= 5) ? 5 : gens;
        var layout = paBuildTreeForAnchor(anchorId || window.__paTreeFocusId || 'sj', opts);
        if (!layout) return;
        paRenderTree(layout, container);
        // Expose state for Phase 2 (click-to-recenter)
        window.__paTreeFocusId = layout.anchor.id;
        window.__paTreeLayout = layout;
        // Sync URL hash + breadcrumb chip
        try { syncUrlHash(layout.anchor.id); } catch (e) {}
        renderBreadcrumb(layout.anchor);
        // Canonical Plan Owner avatar sync — paRenderTree wrote person.photo
        // straight from peopleStore, but Sarah's LIVE photo (user upload) is
        // on window.planOwnerPhoto and applied by the global walker. Without
        // this, the Family Tree summary card for Sarah shows the stock seed
        // photo while every other surface (sidebar, header, profile, print)
        // shows the user's upload. Violetka 2026-05-19: "когато променя
        // снимката на плановнера тя се променя навсякъде освен в семейното
        // дърво в съмари карта". The walker resolves [data-person] wrappers
        // and applies window.planOwnerPhoto for the 'sj' card.
        if (typeof window.paSyncPersonAvatars === 'function') {
            try { window.paSyncPersonAvatars(); } catch (e) {}
        }
        // Phase 3 — draw connection lines (defer to next frame so DOM has layout)
        requestAnimationFrame(function () {
            try { paRenderTreeLines(layout); } catch (e) {}
            // Shrink long role labels ("Biological Grandmother" / "Adopted
            // Step-Father") so each card's role stays on one line. Runs after
            // layout settles so scrollWidth reflects the final glyph metrics.
            try { if (window.paFitFtreeRoles) window.paFitFtreeRoles(container); } catch (e) {}
            // Detect name overflow and tag the inner span so the marquee
            // animation kicks in on hover (only when needed). Violetka
            // 2026-05-20: "ако името е дълго — да се скрива и да се
            // скролва на курсор". Two-pass: rAF for initial paint, then
            // 80 ms timeout to catch any width changes from canvas pan/
            // zoom transforms or font-loading shifts. Use window.* form
            // to avoid any subtle closure resolution issue.
            try {
                if (typeof window.paDetectNameOverflow === 'function') {
                    window.paDetectNameOverflow(container);
                }
            } catch (e) {}
            setTimeout(function () {
                try {
                    if (typeof window.paDetectNameOverflow === 'function') {
                        window.paDetectNameOverflow(container);
                    }
                } catch (e) {}
                try { if (window.paFitFtreeRoles) window.paFitFtreeRoles(container); } catch (e) {}
                // Re-draw lines after layout stabilizes — placeholder
                // connectors need final rect positions. Without this
                // retry, freshly-rendered placeholders sometimes miss
                // their connecting lines. Violetka 2026-05-21.
                try { paRenderTreeLines(layout); } catch (e) {}
            }, 80);
        });
    }
    // Tag a single .ftree-name element if its inner text overflows.
    // Idempotent — safe to call repeatedly. Only writes when value changes
    // so we don't restart the marquee animation mid-hover.
    function tagNameOverflow(nameEl) {
        if (!nameEl) return;
        var textEl = nameEl.querySelector('.ftree-name-text');
        if (!textEl) return;
        var overflow = textEl.scrollWidth - nameEl.clientWidth;
        var current = textEl.getAttribute('data-overflow');
        if (overflow > 4) {
            var target = String(overflow);
            if (current !== target) {
                textEl.setAttribute('data-overflow', target);
                textEl.style.setProperty('--name-overflow', '-' + overflow + 'px');
            }
        } else if (current !== null) {
            textEl.removeAttribute('data-overflow');
            textEl.style.removeProperty('--name-overflow');
        }
    }
    function detectNameOverflow(container) {
        if (!container) return;
        var names = container.querySelectorAll('.ftree-name');
        names.forEach(tagNameOverflow);
    }
    // Expose so external callers (post-save re-renders, etc.) can refresh
    window.paDetectNameOverflow = detectNameOverflow;
    window.paTagNameOverflow = tagNameOverflow;
    // Just-in-time detection on hover — guarantees the marquee fires even if
    // the bulk post-paint pass missed the card (timing race with line render,
    // canvas transform, font load, etc.). Event delegation on document so it
    // works across re-renders. Violetka 2026-05-20.
    if (!window.__paFTreeHoverDetectorWired) {
        window.__paFTreeHoverDetectorWired = true;
        document.addEventListener('mouseover', function (e) {
            var card = e.target && e.target.closest ? e.target.closest('.ftree-card') : null;
            if (!card) return;
            var nameEl = card.querySelector('.ftree-name');
            if (!nameEl) return;
            // Tag every time so transforms / font-shifts get re-measured
            tagNameOverflow(nameEl);
        }, true);
    }
    window.paRenderTreeLines = paRenderTreeLines;
    // Re-draw lines on window resize (layout may shift)
    window.addEventListener('resize', function () {
        if (window.__paTreeLayout) {
            try { paRenderTreeLines(window.__paTreeLayout); } catch (e) {}
        }
    });

    // ────────────────────────────────────────────────────────────
    // PHASE 2 — Click-to-recenter with smooth animation
    // ────────────────────────────────────────────────────────────
    // Back-stack of previously focused persons (max 5 entries)
    var focusHistory = [];

    function syncUrlHash(personId) {
        if (!personId) return;
        var hash = personId === 'sj' ? '' : ('#' + encodeURIComponent(personId));
        if (location.hash !== hash) {
            history.replaceState(null, '', location.pathname + (hash || location.search));
        }
    }

    function renderBreadcrumb(anchor) {
        var existing = document.getElementById('ftreeBreadcrumb');
        // When viewing someone OTHER than Plan Owner: hide the top tabs row
        // (Family Tree / Family Members / Timeline) — they are Sarah-scoped
        // and irrelevant in a nested anchor view. Breadcrumb is the only
        // navigation needed. Violetka 2026-05-20: "ако превключа към family
        // tree с център някой друг, същата навигация за табовете... май не
        // ми трябва, а трябва да имам back button и viewing".
        document.body.classList.toggle('ft-nested-anchor', anchor.id !== 'sj');
        // No breadcrumb when viewing Plan Owner's tree (default state)
        if (anchor.id === 'sj') {
            if (existing) existing.remove();
            return;
        }
        var sarah = peopleById('sj');
        var sarahName = sarah ? (sarah.firstName || 'Sarah') : 'Plan Owner';
        var anchorName = anchor.name || ((anchor.firstName || '') + ' ' + (anchor.familyName || '')).trim() || 'Person';
        var html = ''
            + '<button class="ftree-bc-back" type="button" onclick="paTreeFocusPerson(\'sj\', event)" aria-label="Back to ' + escHtml(sarahName) + '">'
            +   '<span class="ftree-bc-arrow">←</span>'
            +   '<span class="ftree-bc-label">Back to ' + escHtml(sarahName) + '</span>'
            + '</button>'
            + '<span class="ftree-bc-sep">·</span>'
            + '<span class="ftree-bc-current">'
            +   '<span class="ftree-bc-current-prefix">Viewing</span> '
            +   '<span class="ftree-bc-current-name">' + escHtml(anchorName) + '\'s family</span>'
            + '</span>';
        if (!existing) {
            existing = document.createElement('div');
            existing.id = 'ftreeBreadcrumb';
            existing.className = 'ftree-breadcrumb';
            // Mount on top of the .ftree-canvas
            var canvas = document.getElementById('ftreeCanvas');
            if (canvas && canvas.parentNode) {
                canvas.parentNode.insertBefore(existing, canvas);
            } else {
                document.body.appendChild(existing);
            }
        }
        existing.innerHTML = html;
    }

    // Click-to-recenter handler — replaces Phase 1 stub
    window.paTreeFocusPerson = function (personId, event) {
        if (event) event.stopPropagation();
        if (!personId) return;
        if (personId === window.__paTreeFocusId) return; // no-op if already focused
        var container = document.getElementById('ftreeMount');
        if (!container) return;
        // Reset any user pan when switching anchor — the new tree should
        // appear centered, not at whatever pan offset the previous tree was
        // dragged to. Violetka 2026-05-20 drag-pan feature.
        if (typeof window.__paTreeResetPan === 'function') {
            try { window.__paTreeResetPan(); } catch (e) {}
        }
        // Push current focus to back-stack
        if (window.__paTreeFocusId && window.__paTreeFocusId !== personId) {
            focusHistory.push(window.__paTreeFocusId);
            if (focusHistory.length > 5) focusHistory.shift();
        }
        // Animate: fade out → swap → fade in. Smooth opacity + slight scale.
        container.style.transition = 'opacity 220ms ease-out, transform 220ms ease-out';
        container.style.opacity = '0';
        container.style.transform = 'scale(0.98)';
        setTimeout(function () {
            paFamilyTreeMount(personId);
            container.style.opacity = '0';
            container.style.transform = 'scale(1.02)';
            // Force reflow so next transition runs
            // eslint-disable-next-line no-unused-expressions
            container.offsetHeight;
            container.style.transition = 'opacity 280ms ease-out, transform 280ms ease-out';
            container.style.opacity = '1';
            container.style.transform = 'scale(1)';
        }, 220);
    };

    // Empty "Add X" placeholder click → opens the canonical tree-add modal
    // DIRECTLY (skips the cross picker) with Specific Role pre-selected to
    // the placeholder's role. User can still change the role from the
    // dropdown if needed. Violetka 2026-05-20: "ако натисна тези празни
    // (Add Mother / Add Father), полето Specific Role да е избрана
    // подходящата опция и юзера да може да я промени".
    //
    // Role → F&R type mapping:
    //   Father / Mother              → parent
    //   Grandfather / Grandmother    → parent  (added relative to the placeholder's parentId)
    //   Great-Grandfather / Mother   → parent  (same as above)
    //   Son / Daughter / Child       → child
    //   Brother / Sister / Sibling   → sibling
    //   Husband / Wife / Spouse      → spouse
    window.paTreeAddRelative = function (el) {
        if (!el) return;
        var role = el.getAttribute('data-add-relation') || '';
        var parentId = el.getAttribute('data-parent-id') || '';
        // Determine anchor and Specific Role label.
        var anchorId = window.__paTreeFocusId || 'sj';
        var specificRole = '';
        var frType = 'parent';
        if (/father/i.test(role)) {
            // For grandfather/great-grandfather: anchor is the placeholder's
            // parent-id child (the person whose father we're adding); for
            // father (gen 0): anchor is the tree-focus.
            if (/grandfather/i.test(role)) {
                specificRole = /great/i.test(role) ? 'Biological Father' : 'Biological Father';
                if (parentId) anchorId = parentId;  // add as parent of placeholder's anchor
            } else {
                specificRole = 'Biological Father';
            }
            frType = 'parent';
        } else if (/mother/i.test(role)) {
            if (/grandmother/i.test(role)) {
                specificRole = 'Biological Mother';
                if (parentId) anchorId = parentId;
            } else {
                specificRole = 'Biological Mother';
            }
            frType = 'parent';
        } else if (/son|daughter|child/i.test(role)) {
            specificRole = /daughter/i.test(role) ? 'Biological Daughter' : 'Biological Son';
            frType = 'child';
        } else if (/brother|sister|sibling/i.test(role)) {
            specificRole = /sister/i.test(role) ? 'Biological Sister' : 'Biological Brother';
            frType = 'sibling';
        } else if (/husband|wife|spouse|partner/i.test(role)) {
            specificRole = /wife/i.test(role) ? 'Wife' : 'Husband';
            frType = 'spouse';
        }
        // Map F&R type → picker action.
        var ACTION = {
            parent:  'add-parent',
            child:   'add-child',
            sibling: 'add-sibling',
            spouse:  'add-partner'
        };
        var action = ACTION[frType] || 'add-parent';
        // Position the form just below the clicked placeholder card —
        // same UX as the picker → form flow. Without this, the form opens
        // at the default 200 px document Y which feels disconnected from
        // where the user clicked. Violetka 2026-05-20: "когато натисна
        // празна — вече показа сумари карта — а да се отваря така".
        try {
            // Form card is position:fixed → use VIEWPORT coords (no scroll
            // offset). Form opens just below the clicked placeholder, but
            // CSS clamps the value so the card always fits in viewport
            // even if the placeholder is near the bottom edge.
            var clickedRect = el.getBoundingClientRect();
            document.body.style.setProperty('--ftree-inline-form-top',
                (clickedRect.bottom + 30) + 'px');
            document.body.style.setProperty('--ftree-inline-form-cx',
                (clickedRect.left + clickedRect.width / 2) + 'px');
        } catch (e) {}
        // Open the form modal directly via the same paTreeOpenAddForm used
        // by the picker → form flow. Pre-fill Specific Role after the form
        // mounts (give buildContactEditFormHtml time to render).
        if (typeof window.paTreeOpenAddForm === 'function') {
            window.paTreeOpenAddForm(anchorId, action);
            if (specificRole) {
                setTimeout(function () {
                    var valEl = document.querySelector('#ftreeAddFormHost .lsc-edit-rolelayer2-picker .ee-contact-picker-value');
                    if (valEl) {
                        valEl.textContent = specificRole;
                        valEl.classList.remove('is-placeholder');
                    }
                }, 100);
            }
            return;
        }
        if (typeof window.showToast === 'function') {
            window.showToast('Add ' + role + ' — opens form (paTreeOpenAddForm missing)');
        }
    };

    window.paTreeOpenMenu = function (personId, event) {
        if (event) event.stopPropagation();
        if (personId === 'sj') {
            window.location.href = 'profile.html';
        } else {
            window.location.href = 'record.html#' + encodeURIComponent(personId);
        }
    };

    // Read initial focus from URL hash (so family-tree.html#em opens Emma's tree)
    function readHashFocus() {
        if (location.hash && location.hash.length > 1) {
            var id = decodeURIComponent(location.hash.substring(1));
            if (peopleById(id)) return id;
        }
        return null;
    }
    // Listen for hash changes (back/forward navigation, manual URL edit)
    window.addEventListener('hashchange', function () {
        var id = readHashFocus() || 'sj';
        if (id !== window.__paTreeFocusId) {
            window.paTreeFocusPerson(id);
        }
    });

    // ────────────────────────────────────────────────────────────
    // Public API exports
    // ────────────────────────────────────────────────────────────
    window.paBuildTreeForAnchor = paBuildTreeForAnchor;
    window.paRenderTree = paRenderTree;
    window.paFamilyTreeMount = paFamilyTreeMount;

    // Auto-mount on DOMContentLoaded if #ftreeMount exists.
    // Honors URL hash so family-tree.html#em opens Emma's tree directly.
    function init() {
        if (!document.getElementById('ftreeMount')) return;
        var initialId = readHashFocus() || 'sj';
        paFamilyTreeMount(initialId);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // Slight defer so peopleStore is loaded
        setTimeout(init, 100);
    }
})();

