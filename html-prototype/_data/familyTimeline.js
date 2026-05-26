// Family Timeline — auto-generated from peopleStore.
// Extracts every life event (birth, marriage, divorce, death, custom milestone)
// across the family graph, plus a top-of-page Insights row of computed stats
// (family span, generations alive, upcoming birthdays, longest marriage, etc.).
// Two visualizations: horizontal life-bars chart + vertical event stream.
// Violetka 2026-05-18: "генерирай аналитика и данните автоматично — нещо
// страхотно и зарибяващо за потребителя".
(function() {
    'use strict';

    const PLAN_OWNER_ID = 'sj';
    const NOW = new Date();
    const NOW_YEAR = NOW.getFullYear();

    function people() { return Array.isArray(window.peopleStore) ? window.peopleStore : []; }
    function findPerson(id) { return people().find(p => p && p.id === id) || null; }
    function escHtml(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
            ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
    }
    function parseYMD(s) {
        if (!s || typeof s !== 'string') return null;
        const m = s.match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/);
        if (!m) return null;
        return { y: +m[1], mo: m[2] ? +m[2] : null, d: m[3] ? +m[3] : null };
    }
    function ymdToDate(ymd) {
        if (!ymd) return null;
        return new Date(ymd.y, (ymd.mo || 1) - 1, ymd.d || 1);
    }
    function ageAt(dobStr, atStr) {
        const dob = parseYMD(dobStr);
        const at  = parseYMD(atStr);
        if (!dob || !at) return null;
        let age = at.y - dob.y;
        if (at.mo && dob.mo && (at.mo < dob.mo || (at.mo === dob.mo && at.d && dob.d && at.d < dob.d))) age--;
        return age;
    }
    function currentAge(p) {
        if (!p || !p.dob) return null;
        if (!p.alive && p.dod) return ageAt(p.dob, p.dod);
        return ageAt(p.dob, NOW.toISOString().slice(0, 10));
    }
    function fmtDateLong(ymd) {
        if (!ymd) return '';
        const MO = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        if (ymd.d && ymd.mo) return `${MO[ymd.mo - 1]} ${ymd.d}, ${ymd.y}`;
        if (ymd.mo) return `${MO[ymd.mo - 1]} ${ymd.y}`;
        return String(ymd.y);
    }
    function shortName(p) {
        if (!p) return '';
        return p.name || ((p.firstName || '') + ' ' + (p.familyName || '')).trim();
    }
    function relLabel(specific, type) {
        return specific || (type ? type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : '');
    }

    // ────────────────────────────────────────────────────────────────────────
    // EVENT EXTRACTION — walks the peopleStore relationship graph and emits
    // every event with a year. Each event: { dateYMD, year, type, title,
    // subtitle, peopleIds, sarahAge, color, icon }.
    //
    // Dedup rule for two-sided edges (marriage / divorce / spouse-shared
    // dates): the edge is keyed by the SORTED id pair so it appears once
    // even though both people have an entry pointing at the other.
    // ────────────────────────────────────────────────────────────────────────
    function extractEvents() {
        const events = [];
        const seenEdge = new Set();   // for marriage / divorce / sep dedup
        const seenCustom = new Set(); // for custom_<ts> dedup across both sides
        const sarah = findPerson(PLAN_OWNER_ID);
        const sarahDob = sarah && sarah.dob;

        const TYPE_META = {
            birth:    { color: '#61C553', icon: 'birth' },
            death:    { color: '#FF2C55', icon: 'death' },
            marriage: { color: '#BC8D53', icon: 'marriage' },
            divorce:  { color: '#FF9500', icon: 'divorce' },
            engagement: { color: '#BC8D53', icon: 'engagement' },
            separation: { color: '#FF9500', icon: 'separation' },
            relationship: { color: '#BC8D53', icon: 'heart' },
            pet:      { color: '#3E8B70', icon: 'pet' },
            custom:   { color: '#667EEA', icon: 'star' },
            future:   { color: '#9CA3AF', icon: 'clock' }
        };

        function pushEvent(opts) {
            if (!opts.dateStr) return;
            const ymd = parseYMD(opts.dateStr);
            if (!ymd) return;
            const meta = TYPE_META[opts.type] || TYPE_META.custom;
            const isFuture = ymdToDate(ymd) > NOW;
            events.push({
                ymd,
                year: ymd.y,
                dateStr: opts.dateStr,
                type: opts.type,
                isFuture,
                title:    opts.title,
                subtitle: opts.subtitle || '',
                peopleIds: opts.peopleIds || [],
                sarahAge: sarahDob ? ageAt(sarahDob, opts.dateStr) : null,
                color: isFuture ? TYPE_META.future.color : meta.color,
                icon:  meta.icon,
                // Pass through contributors + custom-event metadata so the
                // contributors strip can render and the review/accept flow
                // can mutate the source record.
                contributors: opts.contributors || [],
                id: opts.id || null,
                notes: opts.notes || '',
                // Source = where the user's notes/photo will be saved.
                // birth/death  → on the person record (key 'dob' / 'dod')
                // edge events  → on the relationship.dates of BOTH people
                //                (mirrored — same canonical pattern)
                source: opts.source || null
            });
        }

        // Only events involving FAMILY members. Network (lawyer, doctor)
        // get their own events on their own records, not the family Timeline.
        // Violetka 2026-05-18: "тук се виждат данни от рекордите от My Family
        // само".
        const familyOnly = p => {
            if (!p) return false;
            const cats = p.categories || [];
            if (cats.indexOf('network') !== -1) return false;
            if (cats.indexOf('family') === -1) return false;
            return true;
        };
        people().filter(familyOnly).forEach(p => {
            if (!p) return;
            // BIRTH
            if (p.dob) {
                pushEvent({
                    dateStr: p.dob,
                    type: 'birth',
                    title: `${shortName(p)} was born`,
                    subtitle: p.placeOfBirth ? `In ${p.placeOfBirth}` : '',
                    peopleIds: [p.id],
                    source: { kind: 'person', personId: p.id, key: 'dob' }
                });
            }
            // DEATH
            if (!p.alive && p.dod) {
                pushEvent({
                    dateStr: p.dod,
                    type: 'death',
                    title: `${shortName(p)} passed away`,
                    subtitle: `Age ${ageAt(p.dob, p.dod) ?? '—'}`,
                    peopleIds: [p.id],
                    source: { kind: 'person', personId: p.id, key: 'dod' }
                });
            }
            // RELATIONSHIP DATES — walk edges, dedup by sorted-id pair + key
            // Skip edges to non-family people (lawyer, doctor, etc.) so
            // their events stay on their own records.
            (p.relationships || []).forEach(rel => {
                if (!rel || !rel.toId) return;
                const other = findPerson(rel.toId);
                if (!other) return;
                if (!familyOnly(other)) return;
                const dates = rel.dates || {};
                const pair = [p.id, rel.toId].sort().join('::');
                const otherShort = shortName(other);
                const meShort    = shortName(p);

                Object.keys(dates).forEach(key => {
                    if (!key || /Notes$|Label$/.test(key)) return;
                    const dateStr = dates[key];
                    if (!dateStr) return;
                    const noteKey  = key + 'Notes';
                    const labelKey = key + 'Label';
                    const note  = dates[noteKey] || '';
                    const label = dates[labelKey] || '';
                    // Edge-level dedup (only spouse-style edges have date keys)
                    const edgeKey = pair + '::' + key;
                    if (seenEdge.has(edgeKey)) return;
                    seenEdge.add(edgeKey);

                    let type = 'custom';
                    let title = '';
                    if (key === 'marriageDate') {
                        type = 'marriage';
                        title = `${meShort} & ${otherShort} got married`;
                    } else if (key === 'divorceDate') {
                        type = 'divorce';
                        title = `${meShort} & ${otherShort} divorced`;
                    } else if (key === 'separationDate') {
                        type = 'separation';
                        title = `${meShort} & ${otherShort} separated`;
                    } else if (key === 'engagementDate') {
                        type = 'engagement';
                        title = `${meShort} & ${otherShort} got engaged`;
                    } else if (key === 'relationshipStart') {
                        type = 'relationship';
                        title = `${meShort} & ${otherShort} started their relationship`;
                    } else if (key === 'civilPartnershipStartDate') {
                        type = 'marriage';
                        title = `${meShort} & ${otherShort} entered a civil partnership`;
                    } else if (key === 'joinedOurFamily') {
                        type = 'pet';
                        title = `${otherShort} joined the family`;
                    } else if (/^custom_/.test(key)) {
                        type = 'custom';
                        title = label ? `${label} — ${meShort} & ${otherShort}` : `Milestone — ${meShort} & ${otherShort}`;
                    } else {
                        title = `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} — ${meShort} & ${otherShort}`;
                    }
                    pushEvent({
                        dateStr,
                        type,
                        title,
                        subtitle: note,
                        peopleIds: [p.id, other.id],
                        source: { kind: 'edge', personA: p.id, personB: other.id, key: key }
                    });
                });
            });
        });

        // ── User-created custom events (paCustomEvents) ───────────────
        // Filter out custom events that reference only non-family people
        // (e.g. all participants are network contacts) — match the same
        // family-only scope as derived events.
        try {
            const raw = localStorage.getItem('paCustomEvents');
            const customs = raw ? JSON.parse(raw) : [];
            customs.forEach(ce => {
                if (!ce || !ce.dateStr) return;
                const ids = (ce.peopleIds || []).filter(pid => {
                    const p = findPerson(pid);
                    return p && (p.categories || []).indexOf('family') !== -1
                              && (p.categories || []).indexOf('network') === -1;
                });
                if (!ids.length) return;
                pushEvent({
                    dateStr: ce.dateStr,
                    type: 'custom',
                    title: ce.title || 'Custom event',
                    subtitle: ce.notes || '',
                    peopleIds: ids,
                    contributors: ce.contributors || [],
                    id: ce.id,
                    notes: ce.notes || '',
                    source: { kind: 'custom', id: ce.id, key: 'custom_' + ce.id }
                });
            });
        } catch (e) { /* localStorage disabled */ }

        // Sort: chronological, but PUSH past-vs-future to opposite ends of
        // the visual stream below. Here we sort plain chronological — render
        // function handles grouping.
        events.sort((a, b) => {
            const da = ymdToDate(a.ymd); const db = ymdToDate(b.ymd);
            return da - db;
        });
        return events;
    }

    // ────────────────────────────────────────────────────────────────────────
    // FUTURE MILESTONES — projects upcoming events from the data:
    //   • next birthday for every living person (within 365 days)
    //   • milestone birthdays (next round-decade for each person)
    //   • next wedding anniversary for every active marriage
    // ────────────────────────────────────────────────────────────────────────
    function projectFutureEvents() {
        const out = [];
        const sarah = findPerson(PLAN_OWNER_ID);
        const sarahDob = sarah && sarah.dob;
        // Family-only filter — future milestones for network (lawyer,
        // doctor) belong on their own records, not the family timeline.
        const familyOnly = p => {
            if (!p) return false;
            const cats = p.categories || [];
            return cats.indexOf('family') !== -1 && cats.indexOf('network') === -1;
        };

        people().filter(familyOnly).forEach(p => {
            if (!p || !p.alive || !p.dob) return;
            const dob = parseYMD(p.dob);
            if (!dob || !dob.mo) return;   // need month for projection
            // Milestone decade birthday (next 5 years)
            const curAge = currentAge(p);
            if (curAge == null) return;
            for (let n = 1; n <= 5; n++) {
                const futureAge = curAge + n;
                if (futureAge % 10 !== 0) continue;
                const yr = dob.y + futureAge;
                const dateStr = `${yr}-${String(dob.mo).padStart(2, '0')}-${String(dob.d || 1).padStart(2, '0')}`;
                out.push({
                    dateStr,
                    type: 'future',
                    title: `${shortName(p)} turns ${futureAge}`,
                    subtitle: `In ${yr}`,
                    peopleIds: [p.id]
                });
                break;
            }
        });

        // Anniversaries: walk Sarah's spouse edges
        if (sarah) {
            (sarah.relationships || []).forEach(rel => {
                if (rel.type !== 'spouse' || !rel.dates || !rel.dates.marriageDate) return;
                const other = findPerson(rel.toId);
                const mdate = parseYMD(rel.dates.marriageDate);
                if (!other || !mdate || !mdate.mo) return;
                // Next round anniversary year (5/10/20/25/50)
                const ROUNDS = [5, 10, 20, 25, 30, 40, 50];
                for (const n of ROUNDS) {
                    const yr = mdate.y + n;
                    if (yr <= NOW_YEAR) continue;
                    if (yr - NOW_YEAR > 10) continue;
                    const dateStr = `${yr}-${String(mdate.mo).padStart(2, '0')}-${String(mdate.d || 1).padStart(2, '0')}`;
                    out.push({
                        dateStr,
                        type: 'future',
                        title: `${n}th wedding anniversary`,
                        subtitle: `${shortName(sarah)} & ${shortName(other)}`,
                        peopleIds: [sarah.id, other.id]
                    });
                    break;
                }
            });
        }

        return out;
    }

    // ────────────────────────────────────────────────────────────────────────
    // INSIGHTS — auto-stats from the people graph.
    // ────────────────────────────────────────────────────────────────────────
    function buildInsights() {
        // Family-only — keep network (lawyer, doctor) out of the family
        // span / generations / longest marriage / next birthday stats.
        const pp = people().filter(p => {
            if (!p) return false;
            const cats = p.categories || [];
            return cats.indexOf('family') !== -1 && cats.indexOf('network') === -1;
        });
        const sarah = findPerson(PLAN_OWNER_ID);
        const sarahDob = sarah && sarah.dob;
        // Span
        const minBirth = pp.filter(p => p.dob).map(p => parseYMD(p.dob).y).reduce((a, b) => Math.min(a, b), Infinity);
        const maxFuture = Math.max(NOW_YEAR, ...pp.filter(p => p.alive && p.dob).map(p => parseYMD(p.dob).y + 100));
        const span = isFinite(minBirth) ? (maxFuture - minBirth) : 0;
        // Generations alive — anyone with alive: true
        const aliveCount = pp.filter(p => p.alive).length;
        // Generations
        const generations = countGenerations(pp);
        // Longest marriage
        const longestMarriage = findLongestMarriage(pp);
        // Oldest living
        const oldest = pp.filter(p => p.alive && p.dob)
            .map(p => ({ p, age: currentAge(p) }))
            .filter(x => x.age != null)
            .sort((a, b) => b.age - a.age)[0];
        // Next birthday
        const nextBday = pp.filter(p => p.alive && p.dob)
            .map(p => {
                const ymd = parseYMD(p.dob);
                if (!ymd || !ymd.mo) return null;
                const thisYr = new Date(NOW.getFullYear(), ymd.mo - 1, ymd.d || 1);
                const cand = thisYr >= NOW ? thisYr : new Date(NOW.getFullYear() + 1, ymd.mo - 1, ymd.d || 1);
                return { p, when: cand, days: Math.round((cand - NOW) / (1000 * 60 * 60 * 24)) };
            })
            .filter(Boolean)
            .sort((a, b) => a.when - b.when)[0];

        return {
            spanYears: span,
            spanStart: isFinite(minBirth) ? minBirth : NOW_YEAR,
            spanEnd: maxFuture,
            totalPeople: pp.length,
            aliveCount,
            deceasedCount: pp.length - aliveCount,
            generations,
            longestMarriage,
            oldest,
            nextBday
        };
    }

    function countGenerations(pp) {
        // Count generations alive simultaneously today.
        const aliveYears = pp.filter(p => p.alive && p.dob).map(p => parseYMD(p.dob).y);
        if (!aliveYears.length) return 0;
        const min = Math.min(...aliveYears);
        const max = Math.max(...aliveYears);
        // ~25 yrs per generation
        return Math.round((max - min) / 25) + 1;
    }

    function findLongestMarriage(pp) {
        let best = null;
        const seen = new Set();
        pp.forEach(p => {
            (p.relationships || []).forEach(rel => {
                if (rel.type !== 'spouse' || !rel.dates || !rel.dates.marriageDate) return;
                const other = findPerson(rel.toId);
                if (!other) return;
                const pair = [p.id, rel.toId].sort().join('::');
                if (seen.has(pair)) return;
                seen.add(pair);
                const mYmd = parseYMD(rel.dates.marriageDate);
                if (!mYmd) return;
                const endStr = (!p.alive && p.dod) ? p.dod : (!other.alive && other.dod) ? other.dod : NOW.toISOString().slice(0, 10);
                const yrs = ageAt(rel.dates.marriageDate, endStr);
                if (yrs == null) return;
                if (!best || yrs > best.years) {
                    best = { a: p, b: other, years: yrs, marriageDate: rel.dates.marriageDate };
                }
            });
        });
        return best;
    }

    // ────────────────────────────────────────────────────────────────────────
    // RENDER — Canonical analytics tool (.vault-header pattern)
    // Three modes:
    //   • Generations → custom layout: horizontal life-bars chart
    //   • Events      → standard layout: metric / bar / cats / prompts
    //   • Future      → standard layout: metric / bar / cats / prompts
    // Body of the tool (#ftlToolBody) is replaced wholesale per mode.
    // ────────────────────────────────────────────────────────────────────────
    let toolMode = 'generations';

    function renderTool(mode) {
        toolMode = mode || toolMode || 'generations';
        const body = document.getElementById('ftlToolBody');
        if (!body) return;
        if (toolMode === 'generations') {
            body.innerHTML = ''
                + '<div class="ftl-tool-section ftl-tool-lifebars">'
                +   '<div class="ftl-lifebars-title">'
                +     '<span class="ftl-lifebars-label">Generations across time</span>'
                +     '<span class="ftl-lifebars-now" id="ftlLifebarsNow"></span>'
                +   '</div>'
                +   '<div class="ftl-lifebars" id="ftlLifebars"></div>'
                + '</div>';
            renderLifebars();
        } else {
            const builder = (toolMode === 'events') ? buildToolEvents : buildToolFuture;
            const data = builder();
            body.innerHTML = ''
                + '<div class="vault-headline">'
                +   '<span class="vault-headline-metric">' + escHtml(data.metric) + '</span>'
                +   '<span class="vault-headline-label">' + escHtml(data.label) + '</span>'
                + '</div>'
                + '<div class="vault-bar">'
                +   data.bar.map(seg =>
                        '<div class="vault-bar-seg" style="flex:' + seg.pct + ';background:' + seg.color + ';--seg-glow:' + (seg.glow || seg.color) + ';" title="' + escHtml(seg.name + ': ' + seg.count) + '"></div>'
                    ).join('')
                + '</div>'
                + '<div class="vault-cats">'
                +   data.cats.map(c =>
                        '<div class="vault-cat-row">'
                        +   '<span class="vault-cat-dot" style="background:' + c.color + ';"></span>'
                        +   '<span class="vault-cat-name">' + escHtml(c.name) + '</span>'
                        +   '<span class="vault-cat-count">' + escHtml(c.count) + '</span>'
                        + '</div>'
                    ).join('')
                + '</div>'
                + '<div class="vault-prompts"><ul>'
                +   data.prompts.map(p => '<li>' + p + '</li>').join('')
                + '</ul></div>';
        }
        // Update active tab pill
        document.querySelectorAll('.vault-htab[data-ftl-mode]').forEach(t => {
            t.classList.toggle('active', t.getAttribute('data-ftl-mode') === toolMode);
        });
    }

    function buildToolEvents() {
        // Categorize all past events by type
        const past = extractEvents();
        const counts = { birth: 0, marriage: 0, death: 0, custom: 0 };
        past.forEach(ev => {
            if (ev.type === 'birth') counts.birth++;
            else if (ev.type === 'marriage' || ev.type === 'engagement' || ev.type === 'relationship') counts.marriage++;
            else if (ev.type === 'death') counts.death++;
            else counts.custom++;
        });
        const total = past.length;
        const COLORS = {
            birth: '#61C553', marriage: '#BC8D53', death: '#FF2C55', custom: '#667EEA'
        };
        const GLOWS = {
            birth: 'rgba(97,197,83,0.5)', marriage: 'rgba(188,141,83,0.5)',
            death: 'rgba(255,44,85,0.5)', custom: 'rgba(102,126,234,0.5)'
        };
        const bar = ['birth','marriage','death','custom']
            .filter(k => counts[k] > 0)
            .map(k => ({ name: k.replace(/^./, c => c.toUpperCase()) + (k==='birth'?'s':k==='marriage'?'s':k==='death'?'s':' milestones'),
                          count: counts[k], pct: counts[k], color: COLORS[k], glow: GLOWS[k] }));
        const cats = [
            { name: 'Births',     count: counts.birth,    color: COLORS.birth },
            { name: 'Marriages',  count: counts.marriage, color: COLORS.marriage },
            { name: 'Deaths',     count: counts.death,    color: COLORS.death },
            { name: 'Milestones', count: counts.custom,   color: COLORS.custom }
        ];
        const ins = buildInsights();
        const largest = bar.slice().sort((a,b) => b.count - a.count)[0];
        const prompts = [];
        prompts.push(`Your family timeline spans <strong>${ins.spanYears} years</strong> across <strong>${ins.generations} generations</strong>.`);
        if (largest) prompts.push(`<strong>${largest.name}</strong> is the most frequent event type — <strong>${largest.count}</strong> recorded.`);
        if (ins.longestMarriage) prompts.push(`Longest marriage in your family: <strong>${shortName(ins.longestMarriage.a)} &amp; ${shortName(ins.longestMarriage.b)}</strong> — <strong>${ins.longestMarriage.years} years</strong>.`);
        return {
            metric: String(total),
            label: 'Family events recorded',
            bar, cats, prompts
        };
    }

    function buildToolGenerations() {
        const pp = people();
        const buckets = { children: [], you: [], parents: [], grandparents: [], earlier: [] };
        const sarah = findPerson(PLAN_OWNER_ID);
        const sarahYr = sarah && sarah.dob ? parseYMD(sarah.dob).y : NOW_YEAR;
        pp.forEach(p => {
            if (!p || !p.dob) return;
            const y = parseYMD(p.dob).y;
            const gen = Math.round((y - sarahYr) / 25); // negative = older, 0 = sarah's gen, positive = younger
            if (gen <= -3) buckets.earlier.push(p);
            else if (gen === -2) buckets.grandparents.push(p);
            else if (gen === -1) buckets.parents.push(p);
            else if (gen === 0) buckets.you.push(p);
            else buckets.children.push(p);
        });
        const COLORS = {
            children: '#61C553', you: '#667EEA', parents: '#BC8D53',
            grandparents: '#826B96', earlier: '#3E8B70'
        };
        const GLOWS = {
            children: 'rgba(97,197,83,0.5)', you: 'rgba(102,126,234,0.5)',
            parents: 'rgba(188,141,83,0.5)', grandparents: 'rgba(130,107,150,0.5)',
            earlier: 'rgba(62,139,112,0.5)'
        };
        const LABELS = {
            children: 'Children & grandchildren',
            you: 'You & your generation',
            parents: 'Parents',
            grandparents: 'Grandparents',
            earlier: 'Earlier ancestors'
        };
        const bar = ['earlier','grandparents','parents','you','children']
            .filter(k => buckets[k].length > 0)
            .map(k => ({ name: LABELS[k], count: buckets[k].length, pct: buckets[k].length, color: COLORS[k], glow: GLOWS[k] }));
        const cats = ['children','you','parents','grandparents','earlier']
            .filter(k => buckets[k].length > 0)
            .map(k => ({ name: LABELS[k], count: buckets[k].length, color: COLORS[k] }));
        const ins = buildInsights();
        const eldest = ins.oldest;
        const prompts = [];
        prompts.push(`<strong>${ins.generations} generations</strong> are alive together today across <strong>${ins.aliveCount} living members</strong>.`);
        if (eldest) prompts.push(`Eldest living: <strong>${shortName(eldest.p)}</strong> at <strong>${eldest.age} years</strong>.`);
        if (buckets.children.length) prompts.push(`<strong>${buckets.children.length}</strong> family member${buckets.children.length===1?'':'s'} in the next generation — your legacy continues.`);
        return {
            metric: String(ins.generations),
            label: 'Generations in your family',
            bar, cats, prompts
        };
    }

    function buildToolFuture() {
        const future = projectFutureEvents();
        // Group by year-bucket: next 12 months / 1-3 yrs / 3-5 yrs / 5-10 yrs
        const buckets = { soon: [], oneToThree: [], threeToFive: [], fiveToTen: [] };
        future.forEach(ev => {
            const ymd = parseYMD(ev.dateStr);
            const yrs = ymd.y - NOW_YEAR;
            if (yrs <= 1) buckets.soon.push(ev);
            else if (yrs <= 3) buckets.oneToThree.push(ev);
            else if (yrs <= 5) buckets.threeToFive.push(ev);
            else buckets.fiveToTen.push(ev);
        });
        const COLORS = { soon:'#FF9500', oneToThree:'#667EEA', threeToFive:'#BC8D53', fiveToTen:'#3E8B70' };
        const GLOWS = { soon:'rgba(255,149,0,0.5)', oneToThree:'rgba(102,126,234,0.5)', threeToFive:'rgba(188,141,83,0.5)', fiveToTen:'rgba(62,139,112,0.5)' };
        const bar = ['soon','oneToThree','threeToFive','fiveToTen']
            .filter(k => buckets[k].length > 0)
            .map(k => ({ name: k, count: buckets[k].length, pct: buckets[k].length, color: COLORS[k], glow: GLOWS[k] }));
        const cats = [
            { name: 'Within 12 months',   count: buckets.soon.length,       color: COLORS.soon },
            { name: 'Within 3 years',     count: buckets.oneToThree.length, color: COLORS.oneToThree },
            { name: 'Within 5 years',     count: buckets.threeToFive.length, color: COLORS.threeToFive },
            { name: 'Within 10 years',    count: buckets.fiveToTen.length,  color: COLORS.fiveToTen }
        ];
        const ins = buildInsights();
        const prompts = [];
        prompts.push(`<strong>${future.length}</strong> milestone${future.length===1?'':'s'} projected in the next 10 years.`);
        if (ins.nextBday) prompts.push(`Next birthday: <strong>${shortName(ins.nextBday.p)}</strong> in <strong>${ins.nextBday.days} days</strong>.`);
        const nextDecade = future.find(ev => /turns \d0$/.test(ev.title));
        if (nextDecade) prompts.push(`Upcoming: <strong>${escHtml(nextDecade.title)}</strong> — ${escHtml(nextDecade.subtitle)}.`);
        return {
            metric: String(future.length),
            label: 'Upcoming milestones',
            bar, cats, prompts
        };
    }
    window.paFamilyTimelineSwitchMode = function(mode) { renderTool(mode); };

    // ────────────────────────────────────────────────────────────────────────
    // RENDER — Life Bars chart (horizontal life-spans across decades)
    // ────────────────────────────────────────────────────────────────────────
    function renderLifebars() {
        const root = document.getElementById('ftlLifebars');
        const nowEl = document.getElementById('ftlLifebarsNow');
        if (!root) return;
        // Only show FAMILY members — exclude network (lawyer, doctor, etc.).
        // Plan Owner is included (categories: ['family']).
        // Violetka 2026-05-18: "не си кодирал да се виждат рекордите OF FAMILY
        // в Generations Across Time — тук се виждат данни от рекордите ОТ
        // My Family само".
        const pp = people().filter(p => {
            if (!p || !p.dob) return false;
            const cats = p.categories || [];
            if (cats.indexOf('network') !== -1) return false;
            if (cats.indexOf('family') === -1) return false;
            return true;
        });
        if (!pp.length) { root.innerHTML = ''; return; }
        // X axis: min(dob) → max(dob+lifespan or NOW + 5y)
        const years = pp.map(p => parseYMD(p.dob).y);
        const deathYears = pp.filter(p => !p.alive && p.dod).map(p => parseYMD(p.dod).y);
        const minYr = Math.min(...years, ...deathYears) - 2;
        const maxYr = Math.max(NOW_YEAR + 5, ...years);
        const span = maxYr - minYr;
        // Sort: oldest first (so eldest at top, youngest at bottom — feels like generations stack)
        const sorted = pp.slice().sort((a, b) => parseYMD(a.dob).y - parseYMD(b.dob).y);
        const decades = decadesIn(minYr, maxYr);

        // Header — decade scale + Now line label
        const scaleHtml = decades.map(dy => {
            const pct = ((dy - minYr) / span * 100);
            return `<div class="ftl-lifebars-decade" style="left:${pct}%;">${dy}</div>`;
        }).join('');

        // Now line position
        const nowPct = ((NOW_YEAR - minYr) / span * 100);

        // Pagination — show only the first 12 by default; the rest collapse
        // behind a "Show all (N)" link. The user's state is kept in
        // window.__paLifebarsExpanded so it survives re-renders.
        // Violetka 2026-05-18: "ако стане дълъг списък — трябва да може да
        // се ограничава до някъде и да се разпъва, ако са повече от 15".
        const PAGE_SIZE = 12;
        const total = sorted.length;
        const expanded = !!window.__paLifebarsExpanded;
        const visible = (total > PAGE_SIZE && !expanded) ? sorted.slice(0, PAGE_SIZE) : sorted;
        const hiddenCount = total - visible.length;

        // Row for each person
        const rowsHtml = visible.map(p => {
            const dobY = parseYMD(p.dob).y;
            const endY = (!p.alive && p.dod) ? parseYMD(p.dod).y : NOW_YEAR;
            const startPct = ((dobY - minYr) / span * 100);
            const endPct   = ((endY  - minYr) / span * 100);
            const widthPct = endPct - startPct;
            const isPlanOwner = p.id === PLAN_OWNER_ID;
            const aliveBar  = p.alive;
            const photo = p.photo || '';
            const initials = (p.firstName || '?')[0] + (p.familyName ? p.familyName[0] : '');
            const age = currentAge(p);
            return ''
                + '<div class="ftl-lifebar-row' + (isPlanOwner ? ' ftl-lifebar-row-self' : '') + '">'
                +   '<div class="ftl-lifebar-avatar">'
                +     (photo
                          ? '<img src="' + escHtml(photo) + '" alt="">'
                          : '<span class="ftl-lifebar-initials">' + escHtml(initials) + '</span>')
                +   '</div>'
                +   '<div class="ftl-lifebar-name">' + escHtml(shortName(p))
                +     '<span class="ftl-lifebar-meta">' + (aliveBar ? (age != null ? age + ' yrs' : '') : 'In memory · ' + (age != null ? age + ' yrs' : '')) + '</span>'
                +   '</div>'
                +   '<div class="ftl-lifebar-track">'
                +     '<div class="ftl-lifebar-bar ' + (aliveBar ? 'ftl-lifebar-alive' : 'ftl-lifebar-deceased') + (isPlanOwner ? ' ftl-lifebar-bar-self' : '') + '"'
                +          ' style="left:' + startPct.toFixed(2) + '%; width:' + Math.max(0.5, widthPct).toFixed(2) + '%;"'
                +          ' data-person="' + escHtml(p.id) + '"'
                +          ' title="' + escHtml(shortName(p)) + ' · ' + dobY + (aliveBar ? ' → today' : ' → ' + endY) + '">'
                +       '<span class="ftl-lifebar-y-start">' + dobY + '</span>'
                +       (aliveBar
                          ? ''
                          : '<span class="ftl-lifebar-y-end">' + endY + '</span>')
                +     '</div>'
                +   '</div>'
                + '</div>';
        }).join('');

        const toggleHtml = (total > PAGE_SIZE)
            ? '<button type="button" class="ftl-lifebars-toggle">'
            +   (expanded ? 'Show less' : 'Show all (' + total + ')')
            + '</button>'
            : '';

        root.innerHTML = ''
            + '<div class="ftl-lifebars-scale">' + scaleHtml
            +   '<div class="ftl-lifebars-now-line" style="left:' + nowPct.toFixed(2) + '%;" aria-hidden="true"></div>'
            + '</div>'
            + '<div class="ftl-lifebars-rows">' + rowsHtml + '</div>'
            + toggleHtml;
        if (nowEl) nowEl.textContent = 'Today: ' + NOW_YEAR;

        // Click → open record
        root.querySelectorAll('.ftl-lifebar-bar').forEach(bar => {
            bar.addEventListener('click', () => {
                const pid = bar.getAttribute('data-person');
                if (window.openPersonRecord) window.openPersonRecord(pid);
                else if (pid === PLAN_OWNER_ID) window.location.href = 'profile.html';
                else window.location.href = 'record.html#' + encodeURIComponent(pid);
            });
        });
        const toggleBtn = root.querySelector('.ftl-lifebars-toggle');
        if (toggleBtn) toggleBtn.addEventListener('click', () => {
            window.__paLifebarsExpanded = !window.__paLifebarsExpanded;
            renderLifebars();
        });
    }

    function decadesIn(minYr, maxYr) {
        const result = [];
        let start = Math.floor(minYr / 10) * 10;
        for (let y = start; y <= maxYr; y += 10) result.push(y);
        return result;
    }

    // ────────────────────────────────────────────────────────────────────────
    // RENDER — Event stream (vertical chronological cards)
    // ────────────────────────────────────────────────────────────────────────
    function renderStream(filter) {
        const root = document.getElementById('ftlStream');
        const countEl = document.getElementById('ftlStreamCount');
        if (!root) return;
        const past = extractEvents();
        const future = projectFutureEvents().map(ev => ({
            ymd: parseYMD(ev.dateStr),
            year: parseYMD(ev.dateStr).y,
            dateStr: ev.dateStr,
            type: 'future',
            isFuture: true,
            title: ev.title,
            subtitle: ev.subtitle || '',
            peopleIds: ev.peopleIds || [],
            color: '#9CA3AF',
            icon: 'clock'
        }));
        const all = past.concat(future).sort((a, b) => ymdToDate(a.ymd) - ymdToDate(b.ymd));
        const flt = filter || 'all';
        const filtered = all.filter(ev => {
            if (flt === 'all') return true;
            if (flt === 'death') return ev.type === 'death';
            if (flt === 'birth') return ev.type === 'birth';
            if (flt === 'marriage') return ev.type === 'marriage' || ev.type === 'engagement' || ev.type === 'relationship';
            if (flt === 'custom') return ev.type === 'custom' || ev.type === 'pet';
            return true;
        });
        if (countEl) countEl.textContent = filtered.length + ' event' + (filtered.length === 1 ? '' : 's');
        if (!filtered.length) {
            root.innerHTML = '<div class="ftl-stream-empty">No events match this filter.</div>';
            return;
        }

        // Group by year
        const groups = {};
        const yearOrder = [];
        filtered.forEach(ev => {
            const y = ev.year;
            if (!groups[y]) { groups[y] = []; yearOrder.push(y); }
            groups[y].push(ev);
        });
        const sarah = findPerson(PLAN_OWNER_ID);
        const sarahDob = sarah && sarah.dob;

        const html = yearOrder.map(year => {
            const isFutureYear = year > NOW_YEAR;
            const sarahAgeYr = sarahDob ? (year - parseYMD(sarahDob).y) : null;
            const evList = groups[year].map(ev => eventCard(ev, sarah, filtered.indexOf(ev))).join('');
            return ''
                + '<div class="ftl-year-block' + (isFutureYear ? ' ftl-year-block-future' : '') + '">'
                +   '<div class="ftl-year-head">'
                +     '<div class="ftl-year-num">' + year + '</div>'
                +     (sarahAgeYr != null && sarahAgeYr >= 0
                         ? '<div class="ftl-year-meta">' + (sarah ? sarah.firstName : 'You') + ' age ' + sarahAgeYr + '</div>'
                         : '<div class="ftl-year-meta">' + (isFutureYear ? 'upcoming' : 'before your time') + '</div>')
                +   '</div>'
                +   '<div class="ftl-year-events">' + evList + '</div>'
                + '</div>';
        }).join('');
        root.innerHTML = html;

        // Stash event lookup by data-event-idx so click handlers can find
        // the source structure for inline editing.
        const allEventsForIdx = filtered;
        window.__paTimelineEvents = allEventsForIdx;

        // Card click → toggle inline editor expansion. The summary stays
        // visible; an editor pane opens below with notes + photo. Future
        // events stay click-to-open-record (no editor, nothing to enrich).
        root.querySelectorAll('.ftl-event-card').forEach((card) => {
            card.addEventListener('click', (e) => {
                // Avatar click → person record (existing behavior preserved)
                if (e.target.closest('.ftl-event-avatar')) {
                    const pid = card.getAttribute('data-person');
                    if (pid && window.openPersonRecord) window.openPersonRecord(pid);
                    return;
                }
                // Click inside editor → don't toggle
                if (e.target.closest('.ftl-event-editor')) return;
                // Click on the ⋯ menu → don't toggle the editor
                if (e.target.closest('.ftl-event-menu')) return;
                toggleEditor(card);
            });
        });
    }

    function toggleEditor(card) {
        if (card.classList.contains('ftl-event-future')) return; // skip future events
        const idx = +card.getAttribute('data-event-idx');
        const ev = (window.__paTimelineEvents || [])[idx];
        if (!ev || !ev.source) return;
        if (card.classList.contains('expanded')) {
            card.classList.remove('expanded');
            const editor = card.querySelector('.ftl-event-editor');
            if (editor) editor.remove();
            return;
        }
        card.classList.add('expanded');
        const { notes, photo, mediaType, mediaName } = readSource(ev.source);
        const editor = document.createElement('div');
        // Always open in VIEW mode first — Edit button toggles to Edit.
        // Violetka 2026-05-18 task 1: "като кликна на Timeline entries —
        // те се разтварят надолу в view mode, но имат edit бутон, ако се
        // натисне виждаме edit mode и всичко функционира".
        editor.className = 'ftl-event-editor entry-expand-body';
        // Render the media preview if a file is attached.
        let mediaPreview = '';
        if (photo) {
            if (mediaType === 'video') {
                mediaPreview = '<div class="ftl-event-photo"><video src="' + escHtml(photo) + '" controls></video><button type="button" class="ftl-event-photo-remove ee-edit-only" title="Remove">×</button></div>';
            } else if (mediaType === 'document') {
                mediaPreview = '<div class="ftl-event-photo ftl-event-doc"><span class="ftl-event-doc-icon">📄</span><span class="ftl-event-doc-name">' + escHtml(mediaName || 'document') + '</span><button type="button" class="ftl-event-photo-remove ee-edit-only" title="Remove">×</button></div>';
            } else {
                mediaPreview = '<div class="ftl-event-photo"><img src="' + escHtml(photo) + '" alt=""><button type="button" class="ftl-event-photo-remove ee-edit-only" title="Remove">×</button></div>';
            }
        }
        // ─── CANONICAL Event form sections — SAME structure as the
        // Add Event inline form (Violetka 2026-05-23 LOCKED: "удобрената
        // форма за ново събитие — трябва да може да има същата логика
        // на view и edit"). Mirrors buildAddEventInlineHtml section order:
        //   1. Event Name (locked if !isCustom, editable if isCustom)
        //   2. Date (Day/Month/Year — locked if !isCustom)
        //   3. Who's Involved (people row + Linked Summary Cards)
        //   4. Memory (canonical .ee-pad-textarea)
        //   5. Photo/video/audio/document
        //   6. Need help remembering? (contributor picker)
        // Title + Date for SYSTEM events (birth/death/marriage) are derived
        // from peopleStore facts, so they're locked read-only — they can
        // never be edited from the event card.
        const isCustom = ev.type === 'custom';
        const dayPart = ev.ymd ? ev.ymd.d : '';
        const monthPart = ev.ymd ? ev.ymd.m : '';
        const yearPart = ev.ymd ? ev.ymd.y : '';
        const monthName = ev.ymd ? ['','January','February','March','April','May','June','July','August','September','October','November','December'][ev.ymd.m] : '';
        // Date string for VIEW mode — same canonical format as the card collapsed view
        const dateLong = (typeof fmtDateLong === 'function' && ev.ymd) ? fmtDateLong(ev.ymd) : '';
        editor.innerHTML = ''
            // ── Top-right action row (Edit pencil / X close)
            + '<div class="ei-edit-btn-row ftl-event-edit-row">'
            +   '<button type="button" class="edit-btn ftl-event-edit-btn ee-view-only">'
            +     '<span>Edit</span>'
            +     '<div class="edit-btn-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></div>'
            +   '</button>'
            +   '<button type="button" class="edit-btn ftl-event-close-btn ee-edit-only" aria-label="Close edit">'
            +     '<div class="edit-btn-wrap ftl-event-close-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg></div>'
            +   '</button>'
            + '</div>'
            // ── 0. Event Name + Date (CUSTOM events only) ─────────────
            // Per Violetka 2026-05-23: "за такива ивенти няма нужда от име
            // и дата" — system events derive title + date from the family
            // record (visible in the COLLAPSED card header above). Don't
            // duplicate them in the expanded body. Only show editable
            // Event Name + Date fields for custom user-created events.
            + (isCustom
                ? '<div class="ee-section-title">Event Name</div>'
                  + '<div class="ee-pad ee-view-only ftl-event-readonly-pad">'
                  +   '<div class="data-value">' + escHtml(ev.title || '') + '</div>'
                  + '</div>'
                  + '<div class="ee-pad ee-pad-textarea ee-edit-only" style="min-height:60px;height:auto;padding:14px 20px;">'
                  +   '<input type="text" class="ftl-event-edit-title" value="' + escHtml(ev.title || '') + '" placeholder="e.g. First family vacation" style="width:100%;border:0;outline:0;background:transparent;font:600 16px/20px Inter,sans-serif;color:#000;">'
                  + '</div>'
                  + '<div class="data-label ee-pad-below-lbl">What is this event called?</div>'
                  + '<div class="ee-section-title">Date</div>'
                  + '<div class="ee-pad ee-view-only ftl-event-readonly-pad">'
                  +   '<div class="data-value">' + escHtml(dateLong || '—') + '</div>'
                  + '</div>'
                  + '<div class="data-label ee-pad-below-lbl">When did this happen?</div>'
                : '')
            // ── 2. Memory ──────────────────────────────────────────────
            + '<div class="ee-section-title">Memory</div>'
            // View: static notes (only when populated)
            + (notes
                ? '<div class="ee-pad ee-view-only"><div class="data-value">' + escHtml(notes) + '</div></div>'
                : '<div class="ee-pad ee-view-only"><div class="data-value data-empty">No memory recorded yet.</div></div>'
              )
            // Edit: textarea
            + '<div class="ee-pad ee-pad-textarea ee-edit-only">'
            +   '<textarea class="ee-pad-textarea-input" rows="4" placeholder="A memory, a story, a detail to preserve…">' + escHtml(notes || '') + '</textarea>'
            + '</div>'
            + '<div class="data-label ee-pad-below-lbl">What you remember about this day — names, places, the small things.</div>'
            // ── 2. Photo / video / audio / document ────────────────────
            + '<div class="ee-section-title">Photo, video, audio, or document</div>'
            + (mediaPreview || '<div class="ee-pad ee-view-only"><div class="data-value data-empty">Nothing attached yet.</div></div>')
            // Edit-only upload zone (always available so user can replace media)
            + '<div class="kyc-upload-zone ee-edit-only ftl-event-upload-zone" data-state="default">'
            +   '<input type="file" accept="image/*,video/*,audio/*,.pdf,.png,.jpg,.gif,.docx,.rtf,.txt,.xlsx,.mp3,.wav,.mov,.mp4" hidden>'
            +   '<span class="kyc-upload-hitzone kyc-upload-hitzone--upload" aria-hidden="true"></span>'
            +   '<span class="kyc-upload-hitzone kyc-upload-hitzone--drag" aria-hidden="true"></span>'
            +   '<span class="kyc-upload-circle"></span>'
            +   '<span class="kyc-upload-icon" aria-hidden="true"></span>'
            +   '<span class="kyc-upload-label">Upload File</span>'
            +   '<span class="kyc-upload-or-line-1"></span>'
            +   '<span class="kyc-upload-or-text">Or</span>'
            +   '<span class="kyc-upload-or-line-2"></span>'
            +   '<span class="kyc-upload-drag">Drag and Drop<br>File Here</span>'
            + '</div>'
            + '<p class="kyc-upload-formats ee-edit-only">Accepted formats: PDF, JPG, PNG, GIF, DOCX, RTF, TXT, XLSX, MP3, WAV, MOV, MP4. Max size: 25 Mb.</p>'
            // ── 3. Need help remembering? (EDIT only) ──────────────────
            + '<div class="ee-section-title ee-edit-only">Need help remembering?</div>'
            + '<div class="ee-input-row ee-edit-only ee-contact-picker ftl-event-ask-picker">'
            +   '<div class="ee-input-wrap" onclick="openContactPicker(this)">'
            +     '<span class="ee-input-value ee-contact-picker-value">Select a person</span>'
            +     '<input class="ee-contact-picker-input" type="text" placeholder="" aria-label="Select person to ask">'
            +     '<span class="ee-input-chevron"></span>'
            +   '</div>'
            +   '<div class="ee-input-label">Who would know about this day?</div>'
            +   '<div class="ee-contact-suggestions" role="listbox" aria-label="People you can ask">'
            +     askSuggestionsHtml(ev)
            +   '</div>'
            + '</div>'
            + '<div class="emc-add-entry-btn ftl-event-ask ee-edit-only">'
            +   '<div class="emc-add-entry-label">Send invitation</div>'
            +   '<div class="emc-add-entry-row">'
            +     '<div class="emc-add-entry-line"></div>'
            +     '<div class="emc-add-entry-plus-wrap">'
            +       '<div class="emc-add-entry-plus-inner"></div>'
            +       '<svg class="emc-add-entry-plus-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round"><path d="M10 3v14M3 10h14"/></svg>'
            +     '</div>'
            +     '<div class="emc-add-entry-line"></div>'
            +   '</div>'
            + '</div>'
            + '<p class="kyc-upload-formats ftl-event-ask-sub ee-edit-only">They’ll get a quick link to add a photo, voice memo, or note — no account needed.</p>'
            // ── Save row — quiet "Delete this memory" link on the left
            //   (visible only when data exists), canonical .ef-save-wrap
            //   on the right. Birth/death/marriage events themselves
            //   can't be deleted (they derive from peopleStore facts) —
            //   "Delete this memory" only wipes notes + media for the event.
            //
            //   Edit / Hide / Delete memory are now in the canonical ⋯ menu
            //   on the card row (collapsed state). The inline "Delete this
            //   memory" link stays as a fast-access second touchpoint when
            //   already in edit mode and a memory exists.
            + '<div class="ef-save-row ee-edit-only ftl-event-actions">'
            +   ((notes || photo)
                  ? '<button type="button" class="ftl-event-delete-link">Delete this memory</button>'
                  : '<span class="ftl-event-actions-spacer"></span>'
                 )
            +   '<div class="ef-save-wrap ftl-event-save">'
            +     '<span class="ef-save-label">Save</span>'
            +     '<span class="ef-save-dash"></span>'
            +     '<span class="ef-save-circle"><svg viewBox="0 0 9 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l7 7-7 7"/></svg></span>'
            +   '</div>'
            + '</div>';
        card.appendChild(editor);
        // Edit button toggles to edit mode
        const editBtn = editor.querySelector('.ftl-event-edit-btn');
        if (editBtn) editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            editor.classList.add('editing');
        });
        // X close (visible in EDIT mode only) — exits edit mode back to
        // view mode WITHOUT collapsing the card. To fully collapse, the
        // user clicks the card summary area again.
        const closeBtn = editor.querySelector('.ftl-event-close-btn');
        if (closeBtn) closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            editor.classList.remove('editing');
        });

        // Shared file handler — accepts photo / video / document.
        function handleFile(f) {
            if (!f) return;
            const reader = new FileReader();
            reader.onload = () => {
                let kind = 'photo';
                if (/^video\//.test(f.type)) kind = 'video';
                else if (!/^image\//.test(f.type)) kind = 'document';
                writeSource(ev.source, { photo: reader.result, mediaType: kind, mediaName: f.name });
                if (window.paAutoSave) window.paAutoSave();
                card.classList.remove('expanded');
                editor.remove();
                toggleEditor(card);
            };
            reader.readAsDataURL(f);
        }

        // File picker — click anywhere on the upload zone opens the file dialog.
        const fileInput = editor.querySelector('input[type="file"]');
        const uploadZone = editor.querySelector('.kyc-upload-zone');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => handleFile(e.target.files && e.target.files[0]));
            if (uploadZone) {
                uploadZone.addEventListener('click', (e) => {
                    if (e.target === fileInput) return;
                    fileInput.click();
                });
            }
        }
        // Drag and drop on the editor pane
        editor.addEventListener('dragover', (e) => { e.preventDefault(); editor.classList.add('is-dropping'); });
        editor.addEventListener('dragleave', (e) => { if (e.target === editor) editor.classList.remove('is-dropping'); });
        editor.addEventListener('drop', (e) => {
            e.preventDefault();
            editor.classList.remove('is-dropping');
            const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
            if (f) handleFile(f);
        });
        // Remove media
        const removeBtn = editor.querySelector('.ftl-event-photo-remove');
        if (removeBtn) {
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                writeSource(ev.source, { photo: '', mediaType: '', mediaName: '' });
                if (window.paAutoSave) window.paAutoSave();
                card.classList.remove('expanded');
                editor.remove();
                toggleEditor(card);
            });
        }
        // Save — canonical .ef-save-wrap pattern
        editor.querySelector('.ftl-event-save').addEventListener('click', () => {
            const ta = editor.querySelector('.ee-pad-textarea-input');
            const newNotes = ta ? ta.value : '';
            writeSource(ev.source, { notes: newNotes });
            if (window.paAutoSave) window.paAutoSave();
            card.classList.remove('expanded');
            editor.remove();
            const subEl = card.querySelector('.ftl-event-sub');
            if (subEl) subEl.textContent = newNotes;
            else if (newNotes) {
                const body = card.querySelector('.ftl-event-body');
                const newSub = document.createElement('div');
                newSub.className = 'ftl-event-sub';
                newSub.textContent = newNotes;
                body.insertBefore(newSub, body.querySelector('.ftl-event-meta'));
            }
        });
        // Ask-someone CTA — real contributor invite flow. Reads the picker
        // value, persists an invite record, swaps the button to a confirmation
        // chip, and shows a toast. Invitations are stored in
        // localStorage('paContributorInvites') as an append-only log so the
        // Tasks page / inbox can later pick them up. No backend yet — this is
        // a frontend-only simulation but the data model is real.
        const askBtn = editor.querySelector('.ftl-event-ask');
        if (askBtn) askBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const picker = editor.querySelector('.ftl-event-ask-picker');
            const valEl = picker && picker.querySelector('.ee-contact-picker-value');
            const name = valEl ? (valEl.textContent || '').trim() : '';
            if (!name || /^select a person/i.test(name)) {
                // No person picked — flash the picker red briefly to draw eye.
                if (picker) {
                    picker.classList.add('ftl-event-ask-picker-error');
                    setTimeout(() => picker.classList.remove('ftl-event-ask-picker-error'), 1400);
                }
                if (window.showToast) window.showToast('Pick a person to invite first');
                return;
            }
            // Resolve person ID for the invite record (best-effort match by
            // display name → peopleStore — useful for the future inbox UI).
            const targetPerson = (window.peopleStore || []).find(p =>
                p && (((p.firstName || '') + ' ' + (p.familyName || '')).trim() === name
                      || (p.name || '').trim() === name)
            );
            const invite = {
                id: 'inv_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
                createdAt: new Date().toISOString(),
                eventTitle: ev.title || '',
                eventDate: ev.dateStr || '',
                eventSource: ev.source || null,
                toPersonId: targetPerson ? targetPerson.id : null,
                toName: name,
                status: 'sent',
                askedBy: PLAN_OWNER_ID,
                magicLinkToken: Math.random().toString(36).slice(2, 12)
            };
            try {
                const raw = localStorage.getItem('paContributorInvites');
                const list = raw ? JSON.parse(raw) : [];
                list.push(invite);
                localStorage.setItem('paContributorInvites', JSON.stringify(list));
            } catch (err) { /* localStorage might be full or disabled */ }
            // Swap the "Send invitation" button into a confirmation state
            const label = askBtn.querySelector('.emc-add-entry-label');
            const plusIcon = askBtn.querySelector('.emc-add-entry-plus-icon');
            if (label) label.textContent = 'Invitation sent to ' + name;
            askBtn.classList.add('ftl-event-ask-sent');
            if (plusIcon) {
                // Swap + to ✓ — pure SVG, no asset dependency.
                plusIcon.setAttribute('viewBox', '0 0 20 20');
                plusIcon.innerHTML = '<path d="M4 10.5 L8.5 15 L16 6" stroke="#61C553" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
            }
            // Reset the picker so a second invite would start fresh
            if (valEl) {
                valEl.textContent = 'Select a person';
                valEl.classList.remove('has-value');
            }
            if (window.showToast) window.showToast('Invitation sent to ' + name);
        });
        // Delete this memory — inline link in edit mode. Opens the
        // canonical showSystemPopup confirmation, then calls into the
        // shared doDeleteMemoryFor helper (exposed by bindMenuActions).
        const delBtn = editor.querySelector('.ftl-event-delete-link');
        if (delBtn) delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof window.showSystemPopup !== 'function') return;
            window.showSystemPopup({
                title: 'Delete Memory',
                body: 'Are you sure you want to delete this memory? The event will remain, but the note, photo, and any attachment will be cleared. This action cannot be undone!',
                actionLabel: 'Delete',
                discardLabel: 'Cancel',
                onAction: function () {
                    if (typeof window.__paDoDeleteMemoryFor === 'function') {
                        window.__paDoDeleteMemoryFor(card, ev);
                    }
                }
            });
        });
    }

    // Stable event ID derived from the event's source descriptor. Used as
    // the key in paHiddenEvents[personId] so the same canonical event can
    // be hidden / un-hidden across sessions.
    //   person events  → "person:<pid>:<key>"            e.g. person:jj:dob
    //   edge events    → "edge:<sortedPair>:<key>"       e.g. edge:jj::sj:marriageDate
    function eventId(ev) {
        const src = ev && ev.source;
        if (!src) return '';
        if (src.kind === 'person') return 'person:' + src.personId + ':' + src.key;
        if (src.kind === 'edge') {
            const pair = [src.personA, src.personB].sort().join('::');
            return 'edge:' + pair + ':' + src.key;
        }
        return '';
    }

    // Soft-delete store: hide individual events from a SPECIFIC person's
    // Life Story view without touching the source data. Family Timeline
    // and other Life Stories stay unaffected. Violetka 2026-05-19:
    // "Hide from this Life Story" — useful when a derived event (someone
    // else's marriage) shows up on a relative's feed and the relative
    // doesn't want it there.
    //   Shape: { "<personId>": ["<eventId>", "<eventId>", ...] }
    function readHiddenEvents() {
        try {
            const raw = localStorage.getItem('paHiddenEvents');
            return raw ? JSON.parse(raw) : {};
        } catch (e) { return {}; }
    }
    function writeHiddenEvents(map) {
        try { localStorage.setItem('paHiddenEvents', JSON.stringify(map)); } catch (e) {}
    }
    function isEventHiddenFor(personId, evId) {
        if (!personId || !evId) return false;
        const map = readHiddenEvents();
        const list = map[personId] || [];
        return list.indexOf(evId) !== -1;
    }
    function hideEventFor(personId, evId) {
        if (!personId || !evId) return;
        const map = readHiddenEvents();
        const list = map[personId] || [];
        if (list.indexOf(evId) === -1) {
            list.push(evId);
            map[personId] = list;
            writeHiddenEvents(map);
        }
    }
    // Reserved for future "Restore" UI — kept colocated for clarity.
    // eslint-disable-next-line no-unused-vars
    function unhideEventFor(personId, evId) {
        if (!personId || !evId) return;
        const map = readHiddenEvents();
        const list = (map[personId] || []).filter(id => id !== evId);
        map[personId] = list;
        writeHiddenEvents(map);
    }

    // Read notes + media (photo/video/document) from the source location.
    function readSource(src) {
        const empty = { notes: '', photo: '', mediaType: '', mediaName: '' };
        if (!src) return empty;
        if (src.kind === 'person') {
            const p = findPerson(src.personId);
            if (!p) return empty;
            return {
                notes:     p[src.key + 'Notes']     || '',
                photo:     p[src.key + 'Photo']     || '',
                mediaType: p[src.key + 'MediaType'] || '',
                mediaName: p[src.key + 'MediaName'] || ''
            };
        }
        if (src.kind === 'edge') {
            const a = findPerson(src.personA);
            if (!a) return empty;
            const rel = (a.relationships || []).find(r => r.toId === src.personB);
            if (!rel || !rel.dates) return empty;
            return {
                notes:     rel.dates[src.key + 'Notes']     || '',
                photo:     rel.dates[src.key + 'Photo']     || '',
                mediaType: rel.dates[src.key + 'MediaType'] || '',
                mediaName: rel.dates[src.key + 'MediaName'] || ''
            };
        }
        return empty;
    }
    // Write notes / media back. Mirrors edge writes to BOTH sides.
    function writeSource(src, patch) {
        if (!src) return;
        const apply = (target, key) => {
            if (!target) return;
            if (patch.notes     != null) target[key + 'Notes']     = patch.notes;
            if (patch.photo     != null) target[key + 'Photo']     = patch.photo;
            if (patch.mediaType != null) target[key + 'MediaType'] = patch.mediaType;
            if (patch.mediaName != null) target[key + 'MediaName'] = patch.mediaName;
        };
        if (src.kind === 'person') {
            apply(findPerson(src.personId), src.key);
            return;
        }
        if (src.kind === 'edge') {
            const a = findPerson(src.personA);
            const b = findPerson(src.personB);
            const relA = a && (a.relationships || []).find(r => r.toId === src.personB);
            const relB = b && (b.relationships || []).find(r => r.toId === src.personA);
            if (relA) { relA.dates = relA.dates || {}; apply(relA.dates, src.key); }
            if (relB) { relB.dates = relB.dates || {}; apply(relB.dates, src.key); }
        }
    }

    // Build the list of people the user can ask about an event. Filters out
    // the Plan Owner herself + anyone who's deceased. Renders the canonical
    // .ee-contact-option markup so the picker dropdown styles them correctly.
    function askSuggestionsHtml(ev) {
        const candidates = people().filter(p => {
            if (!p || p.id === PLAN_OWNER_ID) return false;
            if (!p.alive) return false;
            if ((p.categories || []).indexOf('family') === -1 &&
                (p.categories || []).indexOf('network') === -1) return false;
            return true;
        });
        if (!candidates.length) return '<div class="ee-contact-option-empty">No people in your circle yet — add family members first.</div>';
        return candidates.map(p => {
            const name = shortName(p);
            const role = p.roleLayer2 || p.role || '';
            return '<div class="ee-contact-option" onclick="selectContact(this,\'' + escHtml(name).replace(/'/g, "\\'") + '\')">'
                +   '<span class="ee-contact-option-name">' + escHtml(name) + '</span>'
                +   (role ? '<span class="ee-contact-option-role">' + escHtml(role) + '</span>' : '')
                + '</div>';
        }).join('');
    }

    function eventCard(ev, sarah, idx) {
        const firstPid = ev.peopleIds && ev.peopleIds[0];
        const ageNote = ev.sarahAge != null && ev.sarahAge >= 0 && sarah
            ? '<span class="ftl-event-age">' + sarah.firstName + ' was ' + ev.sarahAge + '</span>'
            : '';
        // Each avatar wrapped in its OWN [data-person] container so the
        // platform's paSyncPersonAvatars walker resolves each face to its
        // own peopleStore record. (Otherwise the global walker sees the
        // single data-person on the parent card and rewrites every img in
        // the card to that one person — bug Violetka caught 2026-05-18:
        // "и двата аватара на двата линкнати рекорда са еднакви — повтаря
        // се само едного — трябва да са на двата линкнати рекорда".)
        const peoplePhotos = (ev.peopleIds || []).slice(0, 3).map(pid => {
            const p = findPerson(pid);
            if (!p) return '';
            const inner = p.photo
                ? '<img src="' + escHtml(p.photo) + '" alt="">'
                : '<span class="ftl-event-avatar-initials">'
                +   escHtml(((p.firstName || '?')[0] + (p.familyName ? p.familyName[0] : '')))
                + '</span>';
            return '<span class="ftl-event-avatar" data-person="' + escHtml(pid) + '">' + inner + '</span>';
        }).join('');
        const dateLong = fmtDateLong(ev.ymd);
        // Memory indicators — chip reflects what's attached.
        let memoryChip = '';
        let hasMemory = false;
        if (ev.source) {
            const { notes, photo, mediaType } = readSource(ev.source);
            hasMemory = !!(notes || photo);
            const parts = [];
            if (photo) parts.push(mediaType === 'video' ? '🎥' : mediaType === 'document' ? '📄' : '📷');
            if (notes) parts.push('📝');
            if (parts.length) memoryChip = '<span class="ftl-event-memory">' + parts.join(' ') + '</span>';
        }
        const evIdAttr = escHtml(eventId(ev));

        // ───────────────────────────────────────────────────────────────
        // Contributors strip — renders below the People row on events that
        // have an invitation list. Each contributor row shows:
        //   • Small avatar (24×24) + name
        //   • State chip with dot color + label
        //   • Action button (Review / Resend / View) based on state
        // States: awaiting | submitted | accepted | declined
        // Violetka 2026-05-22 — canonical strip from the contributor flow.
        // ───────────────────────────────────────────────────────────────
        const contributors = ev.contributors || [];
        let contribStripHtml = '';
        if (contributors.length) {
            // Facebook-style inline comments — Violetka 2026-05-23:
            // "трябва да е като фейсбук и коментарите — директно да ги
            // виждаш и файловете и нещо". Each contributor's submission
            // renders FULLY INLINE: avatar + name + timestamp header,
            // memory text in a quote bubble, file thumbnails, voice memo
            // player, and Accept/Decline inline actions for pending review.
            const STATE_META = {
                awaiting:  { glyph: '⏳', dot: '#9AA0AC', label: 'Awaiting reply',  cls: 'ftl-contrib-awaiting' },
                submitted: { glyph: '✓',  dot: '#61C553', label: 'Submitted',       cls: 'ftl-contrib-submitted' },
                accepted:  { glyph: '★',  dot: '#667EEA', label: 'Accepted',        cls: 'ftl-contrib-accepted' },
                declined:  { glyph: '✕',  dot: '#FF2C55', label: 'Declined',        cls: 'ftl-contrib-declined' }
            };
            // Canonical Facebook-style relative time (Violetka 2026-05-23:
            // "след определен период да е тоантa дата — като в Facebook
            // логиката"). After ~30 days OR if the date is in the future,
            // show the actual date. Recent dates use compact relative form.
            function fmtContribDate(iso) {
                if (!iso) return '';
                try {
                    var d = new Date(iso);
                    var now = new Date();
                    var diffMs = now - d;
                    var diffMin = Math.floor(diffMs / 60000);
                    var diffHrs = Math.floor(diffMs / 3600000);
                    var diffDays = Math.floor(diffMs / 86400000);
                    // FUTURE date → show absolute (with year if not current year)
                    if (diffMs < 0) {
                        return d.toLocaleDateString(undefined, {
                            month: 'short', day: 'numeric',
                            year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
                        });
                    }
                    if (diffMin < 1) return 'Just now';
                    if (diffMin < 60) return diffMin + ' min ago';
                    if (diffHrs < 24) return diffHrs + 'h ago';
                    if (diffDays === 1) return 'Yesterday';
                    if (diffDays < 7) return diffDays + ' days ago';
                    if (diffDays < 30) return Math.floor(diffDays / 7) + 'w ago';
                    // > 30 days → absolute date. Add year if different year.
                    return d.toLocaleDateString(undefined, {
                        month: 'short', day: 'numeric',
                        year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
                    });
                } catch (e) { return ''; }
            }
            const itemsHtml = contributors.map((c, ci) => {
                const p = findPerson(c.personId);
                const personName = p ? shortName(p) : '(removed)';
                const personPhoto = p && p.photo ? p.photo : '';
                const initials = p ? ((p.firstName || '?')[0] + (p.familyName ? p.familyName[0] : '')) : '?';
                const isDeceased = p && p.lifeStatus && /deceased/i.test(p.lifeStatus);
                const lifeColor = isDeceased ? '#FF2C55' : '#61C553';
                const state = c.status || 'awaiting';
                const meta = STATE_META[state] || STATE_META.awaiting;
                const contribution = c.contribution || {};
                const memory = contribution.memory || '';
                const voice = contribution.voiceMemoUrl || '';
                const files = contribution.files || [];
                const submittedAt = c.submittedAt || c.sentAt || '';
                const timeLabel = fmtContribDate(submittedAt);
                const avatarInner = personPhoto
                    ? '<img src="' + escHtml(personPhoto) + '" alt="">'
                    : '<span class="ftl-contrib-avatar-initials">' + escHtml(initials) + '</span>';
                const avatarHtml = '<span class="ftl-contrib-avatar" data-person-id="' + escHtml(c.personId) + '">' +
                                   avatarInner +
                                   '<span class="ftl-contrib-life-dot" style="background:' + lifeColor + ';"></span>' +
                                   '</span>';
                // Header row — name + state chip + timestamp
                const headerHtml =
                    '<div class="ftl-contrib-header">' +
                      avatarHtml +
                      '<div class="ftl-contrib-header-text">' +
                        '<div class="ftl-contrib-name-row">' +
                          '<span class="ftl-contrib-name">' + escHtml(personName) + '</span>' +
                          '<span class="ftl-contrib-chip">' +
                            '<span class="ftl-contrib-glyph" style="color:' + meta.dot + ';" aria-hidden="true">' + meta.glyph + '</span>' +
                            '<span class="ftl-contrib-state-label">' + meta.label + '</span>' +
                          '</span>' +
                        '</div>' +
                        (timeLabel ? '<div class="ftl-contrib-time">' + escHtml(timeLabel) + '</div>' : '') +
                      '</div>' +
                    '</div>';
                // Body — memory quote, voice memo, file thumbnails
                let bodyHtml = '';
                if (memory) {
                    bodyHtml += '<div class="ftl-contrib-memory">' + escHtml(memory) + '</div>';
                }
                if (voice) {
                    bodyHtml += '<div class="ftl-contrib-voice">' +
                                  '<audio controls src="' + escHtml(voice) + '"></audio>' +
                                '</div>';
                }
                if (files.length) {
                    // Classify each file by MIME family. data-person-id stops
                    // paSyncPersonAvatars from rewriting any img.src inside.
                    function fileKind(name, url) {
                        const ext = (name || url || '').toLowerCase();
                        if (/\.(jpe?g|png|gif|webp|heic)$/.test(ext))   return 'image';
                        if (/\.(mp4|mov|webm|m4v|ogv)$/.test(ext))      return 'video';
                        if (/\.(mp3|wav|m4a|ogg|aac|flac)$/.test(ext))  return 'audio';
                        if (/\.pdf$/.test(ext))                          return 'pdf';
                        return 'doc';
                    }
                    // Separate audio (horizontal card) from visual files (image/video grid)
                    const audioFiles = files.filter(f => fileKind(f.name, f.url) === 'audio');
                    const visualFiles = files.filter(f => {
                        const k = fileKind(f.name, f.url);
                        return k === 'image' || k === 'video';
                    });
                    const otherFiles = files.filter(f => {
                        const k = fileKind(f.name, f.url);
                        return k === 'pdf' || k === 'doc';
                    });
                    // Visual grid (images + video thumbs)
                    if (visualFiles.length) {
                        bodyHtml += '<div class="ftl-contrib-files" data-person-id="_filepreview">' +
                                      visualFiles.map(f => {
                                          const kind = fileKind(f.name, f.url);
                                          const url = f.url || '';
                                          const safeName = escHtml(f.name || 'file');
                                          if (kind === 'image') {
                                              return '<button type="button" class="ftl-contrib-file ftl-contrib-file-img" data-person-id="_filepreview" data-lightbox-url="' + escHtml(url) + '" data-lightbox-name="' + safeName + '" data-lightbox-kind="image" aria-label="Preview ' + safeName + '">' +
                                                       '<img src="' + escHtml(url) + '" alt="' + safeName + '">' +
                                                     '</button>';
                                          }
                                          // Video — show first-frame poster with play overlay
                                          return '<button type="button" class="ftl-contrib-file ftl-contrib-file-video" data-person-id="_filepreview" data-lightbox-url="' + escHtml(url) + '" data-lightbox-name="' + safeName + '" data-lightbox-kind="video" aria-label="Play ' + safeName + '">' +
                                                   '<video src="' + escHtml(url) + '" preload="metadata" muted playsinline></video>' +
                                                   '<span class="ftl-contrib-video-play" aria-hidden="true">' +
                                                     '<svg viewBox="0 0 24 24" fill="#FFFFFF"><path d="M8 5v14l11-7z"/></svg>' +
                                                   '</span>' +
                                                 '</button>';
                                      }).join('') +
                                    '</div>';
                    }
                    // Audio files — horizontal card with inline player
                    if (audioFiles.length) {
                        bodyHtml += '<div class="ftl-contrib-audio-list">' +
                                      audioFiles.map(f => {
                                          const url = f.url || '';
                                          const safeName = escHtml(f.name || 'voice memo');
                                          return '<div class="ftl-contrib-audio-card">' +
                                                   '<div class="ftl-contrib-audio-icon" aria-hidden="true">' +
                                                     '<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
                                                       '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>' +
                                                     '</svg>' +
                                                   '</div>' +
                                                   '<div class="ftl-contrib-audio-body">' +
                                                     '<div class="ftl-contrib-audio-name">' + safeName + '</div>' +
                                                     '<audio src="' + escHtml(url) + '" controls preload="metadata"></audio>' +
                                                   '</div>' +
                                                 '</div>';
                                      }).join('') +
                                    '</div>';
                    }
                    // Documents / PDFs — bordered card with icon + filename
                    if (otherFiles.length) {
                        bodyHtml += '<div class="ftl-contrib-docs-list">' +
                                      otherFiles.map(f => {
                                          const kind = fileKind(f.name, f.url);
                                          const url = f.url || '';
                                          const safeName = escHtml(f.name || 'attachment');
                                          const glyph = kind === 'pdf' ? '📄' : '📎';
                                          return '<button type="button" class="ftl-contrib-file ftl-contrib-file-doc" data-person-id="_filepreview" data-lightbox-url="' + escHtml(url) + '" data-lightbox-name="' + safeName + '" data-lightbox-kind="' + kind + '" title="' + safeName + '">' +
                                                   '<span class="ftl-contrib-file-icon">' + glyph + '</span>' +
                                                   '<span class="ftl-contrib-file-name">' + safeName + '</span>' +
                                                 '</button>';
                                      }).join('') +
                                    '</div>';
                    }
                }
                // Footer — inline actions per state
                let footerHtml = '';
                if (state === 'submitted') {
                    // CANONICAL .ef-save-wrap arrow button (XD-locked 2026-05-19):
                    // label + dash + 60×60 circle with chevron. Hover → black pill
                    // expands from right. Same DOM structure used in every Save
                    // button across the platform. Decline = canonical secondary
                    // text button (no border, op 0.5 → red on hover).
                    footerHtml =
                        '<div class="ftl-contrib-actions">' +
                          '<button class="ftl-contrib-action-decline" type="button" data-event-idx="' + idx + '" data-contrib-idx="' + ci + '" data-contrib-inline-action="decline">Decline</button>' +
                          '<button class="ef-save-wrap ftl-contrib-action-accept" type="button" data-event-idx="' + idx + '" data-contrib-idx="' + ci + '" data-contrib-inline-action="accept">' +
                            '<span class="ef-save-label">Accept</span>' +
                            '<span class="ef-save-dash"></span>' +
                            '<span class="ef-save-circle"><svg viewBox="0 0 9 16" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l7 7-7 7"/></svg></span>' +
                          '</button>' +
                        '</div>';
                } else if (state === 'awaiting') {
                    footerHtml =
                        '<div class="ftl-contrib-actions ftl-contrib-actions-subtle">' +
                          '<button class="ftl-contrib-action-link" type="button" data-event-idx="' + idx + '" data-contrib-idx="' + ci + '" data-contrib-inline-action="resend">Resend invitation</button>' +
                        '</div>';
                } else if (state === 'declined') {
                    footerHtml =
                        '<div class="ftl-contrib-actions ftl-contrib-actions-subtle">' +
                          '<button class="ftl-contrib-action-link" type="button" data-event-idx="' + idx + '" data-contrib-idx="' + ci + '" data-contrib-inline-action="undo">Undo decline</button>' +
                        '</div>';
                }
                return '<div class="ftl-contrib-item ' + meta.cls + '" data-event-idx="' + idx + '" data-contrib-idx="' + ci + '">' +
                         headerHtml +
                         (bodyHtml ? '<div class="ftl-contrib-body">' + bodyHtml + '</div>' : '') +
                         footerHtml +
                       '</div>';
            }).join('');
            const heading = 'Contributors &middot; ' + contributors.length;
            contribStripHtml = '' +
                '<div class="ftl-event-contributors">' +
                  '<div class="ftl-contrib-heading">' + heading + '</div>' +
                  '<div class="ftl-contrib-list">' + itemsHtml + '</div>' +
                '</div>';
        }

        // Canonical .doc-menu (3-dot menu) — IDENTICAL structure to every
        // entry row on the platform. Each .dd-row has:
        //   • .dd-row-label  (text, shifts 10px on hover)
        //   • .dd-row-icon   (50×50 wrapper; ::before paints a white circle
        //                     that fades in on hover — the canonical glass-
        //                     circle-solidifies pattern)
        //
        // Labels are kept SHORT to fit the canonical 150px dropdown width
        // (matches the platform convention: "Edit", "Archive", "Delete").
        // Items shown by context:
        //   • Edit          — always
        //   • Hide          — Life Story only (CSS gate). Confirm dialog
        //                     explains the soft-delete scope.
        //   • Delete event  — always. Smart routing in the click handler:
        //                     derived events redirect to the source record,
        //                     custom events (future) get hard-deleted.
        //   • Delete memory — only when notes/photo attached.
        // Icons are INLINE SVGs with stroke="#000" (the canonical trash.svg
        // ships with white stroke for dark contexts — wrong colour for the
        // white-glass dropdown). toggleDD is the global menu-open helper.
        const menuHtml = ''
            + '<div class="doc-menu ftl-event-menu" onclick="event.stopPropagation();toggleDD(this)">'
            +   '<div class="doc-menu-dots"><span></span><span></span><span></span></div>'
            +   '<div class="doc-dropdown">'
            +     '<div class="doc-dropdown-trigger-row"><div class="doc-menu-inner"><div class="doc-menu-dots"><span></span><span></span><span></span></div></div></div>'
            +     '<div class="dd-row dd-row-edit dd-row-ftl-edit" data-event-idx="' + idx + '">'
            +       '<span class="dd-row-label">Edit</span>'
            +       '<span class="dd-row-icon"></span>'
            +     '</div>'
            +     '<div class="dd-row dd-row-ftl-hide ftl-life-story-only" data-event-id="' + evIdAttr + '" title="Hide this event from this Life Story (keeps it everywhere else)">'
            +       '<span class="dd-row-label">Hide</span>'
            +       '<span class="dd-row-icon">'
            +         '<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
            +           '<path d="M3 3l18 18"/>'
            +           '<path d="M10.58 10.58a3 3 0 004.24 4.24"/>'
            +           '<path d="M9.88 5.09A10.4 10.4 0 0112 5c5 0 9 4 10 7-.36 1.07-1 2.27-1.93 3.41"/>'
            +           '<path d="M6.61 6.61C4.5 8 2.96 10.13 2 13c1 3 5 7 10 7 1.97 0 3.78-.62 5.31-1.62"/>'
            +         '</svg>'
            +       '</span>'
            +     '</div>'
            +     '<div class="dd-row dd-row-ftl-del-event" data-event-idx="' + idx + '" title="Delete this event from everywhere">'
            +       '<span class="dd-row-label">Delete event</span>'
            +       '<span class="dd-row-icon">'
            +         '<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
            +           '<path d="M3 6h18"/>'
            +           '<path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/>'
            +           '<path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>'
            +           '<path d="M10 11v6M14 11v6"/>'
            +         '</svg>'
            +       '</span>'
            +     '</div>'
            + (hasMemory
                ? '<div class="dd-row dd-row-ftl-del-memory" data-event-idx="' + idx + '" title="Clear the note, photo, and any attachment for this event">'
                +   '<span class="dd-row-label">Delete memory</span>'
                +   '<span class="dd-row-icon">'
                +     '<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
                +       '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>'
                +       '<path d="M9 10l6 6M15 10l-6 6"/>'
                +     '</svg>'
                +   '</span>'
                + '</div>'
                : '')
            +   '</div>'
            + '</div>';

        return ''
            + '<div class="ftl-event-card ftl-event-' + ev.type + (ev.isFuture ? ' ftl-event-future' : '') + '"'
            +     (firstPid ? ' data-person="' + escHtml(firstPid) + '"' : '')
            +     ' data-event-idx="' + idx + '">'
            +   '<div class="ftl-event-dot" style="background:' + ev.color + ';"></div>'
            +   '<div class="ftl-event-body">'
            +     '<div class="ftl-event-title">' + escHtml(ev.title) + memoryChip + '</div>'
            +     (ev.subtitle ? '<div class="ftl-event-sub">' + escHtml(ev.subtitle) + '</div>' : '')
            +     '<div class="ftl-event-meta">'
            +       '<span class="ftl-event-date">' + escHtml(dateLong) + '</span>'
            +       ageNote
            +     '</div>'
            +   '</div>'
            +   '<div class="ftl-event-people">' + peoplePhotos + '</div>'
            +   menuHtml
            // Contributors strip spans the full card width below body+people
            // so memory pads + file previews get proper breathing room. Was
            // inside .ftl-event-body and only got ~246px (Violetka 2026-05-23
            // "защо са толкова тесни прозорите за текста").
            +   contribStripHtml
            + '</div>';
    }

    // ────────────────────────────────────────────────────────────────────────
    // MENU ACTION DELEGATION — bound once at document level.
    // Cards (and their menus) are re-rendered every time the stream
    // refreshes, so per-card handlers would leak. Delegation handles all
    // event cards uniformly across Family Timeline + every Life Story.
    // Items: dd-row-ftl-edit / dd-row-ftl-hide / dd-row-ftl-del-memory.
    // ────────────────────────────────────────────────────────────────────────
    function bindMenuActions() {
        if (window.__paFtlMenuBound) return;
        window.__paFtlMenuBound = true;
        document.addEventListener('click', (e) => {
            const editRow = e.target.closest('.dd-row-ftl-edit');
            const hideRow = e.target.closest('.dd-row-ftl-hide');
            const delEventRow = e.target.closest('.dd-row-ftl-del-event');
            const delMemRow = e.target.closest('.dd-row-ftl-del-memory');
            if (!editRow && !hideRow && !delEventRow && !delMemRow) return;
            e.stopPropagation();
            // Resolve the card BEFORE closeAllDD runs — closeAllDD clears
            // dropdown._trigger and reparents the dropdown back into the
            // trigger, so if we close first the trigger pointer is gone.
            const dropdown = (editRow || hideRow || delEventRow || delMemRow).closest('.doc-dropdown');
            const trigger = dropdown && dropdown._trigger;
            const card = trigger ? trigger.closest('.ftl-event-card') : null;
            if (typeof window.closeAllDD === 'function') window.closeAllDD();
            if (!card) return;
            const idx = parseInt(card.getAttribute('data-event-idx'), 10);
            const ev = (window.__paTimelineEvents || [])[idx];
            if (!ev) return;

            // ── Edit ─────────────────────────────────────────────────────
            if (editRow) {
                if (!card.classList.contains('expanded')) toggleEditor(card);
                const editor = card.querySelector('.ftl-event-editor');
                if (editor && !editor.classList.contains('editing')) {
                    editor.classList.add('editing');
                }
                return;
            }
            // ── Hide from this Life Story ───────────────────────────────
            // Uses the canonical showSystemPopup confirmation modal — same
            // glass pad + warning triangle + red Delete-style action button
            // as every other delete/hide flow on the platform. Replaces the
            // native browser confirm() that Violetka caught 2026-05-19:
            // "системните съобщения не са такива - такива като за делете
            // имаш ги". Text content is the same; only chrome canonicalized.
            if (hideRow) {
                const stream = card.closest('#lifeStoryStream');
                if (!stream) return;
                const personId = window.__paViewedPersonRealId || 'sj';
                const evId = eventId(ev);
                if (!evId) return;
                const p = findPerson(personId);
                const firstName = (p && p.firstName) || 'this';
                if (typeof window.showSystemPopup !== 'function') return;
                window.showSystemPopup({
                    title: 'Hide Event',
                    body: 'Hide this event from ' + firstName + '\'s Life Story? It will still appear in the Family Timeline and other relatives\' Life Stories.',
                    actionLabel: 'Hide',
                    discardLabel: 'Cancel',
                    onAction: function () {
                        hideEventFor(personId, evId);
                        if (window.paRenderLifeStory) window.paRenderLifeStory(personId, stream);
                        if (window.showToast) window.showToast('Event hidden from this Life Story');
                    }
                });
                return;
            }
            // ── Delete event ────────────────────────────────────────────
            // Derived events (birth/death/marriage/relationship) can't be
            // deleted directly — they reflect peopleStore facts. Confirm
            // dialog explains + offers to open the source record where the
            // underlying date can be edited or removed. Custom events
            // (future) get hard-deleted from the customEvents store.
            if (delEventRow) {
                if (typeof window.showSystemPopup !== 'function') return;
                const src = ev.source;
                const isCustom = src && typeof src.key === 'string' && /^custom_/.test(src.key);
                if (isCustom) {
                    window.showSystemPopup({
                        title: 'Delete Event',
                        body: 'Delete this event permanently? This action cannot be undone!',
                        actionLabel: 'Delete',
                        discardLabel: 'Cancel',
                        onAction: function () {
                            // Hard-delete path — wire once Add custom event flow ships.
                            if (window.showToast) window.showToast('Custom event delete — wired once Add event flow ships');
                        }
                    });
                    return;
                }
                // Derived event — redirect to source for editing
                let label = 'this event';
                let target = '';
                if (src && src.kind === 'person') {
                    const p = findPerson(src.personId);
                    label = (p && p.firstName) ? (p.firstName + '\'s ' + (src.key === 'dod' ? 'date of death' : 'date of birth')) : 'the underlying date';
                    target = src.personId;
                } else if (src && src.kind === 'edge') {
                    const a = findPerson(src.personA);
                    const b = findPerson(src.personB);
                    label = ((a && a.firstName) || '?') + ' & ' + ((b && b.firstName) || '?') + ' relationship';
                    target = src.personA;
                }
                window.showSystemPopup({
                    title: 'Delete Event',
                    body: 'This event comes from ' + label + '. To remove it, edit the source record and clear that date. Open the record now?',
                    actionLabel: 'Open record',
                    discardLabel: 'Cancel',
                    onAction: function () {
                        if (!target) return;
                        if (window.openPersonRecord) window.openPersonRecord(target);
                        else if (target === 'sj') window.location.href = 'profile.html';
                        else window.location.href = 'record.html#' + encodeURIComponent(target);
                    }
                });
                return;
            }
            // ── Delete memory ───────────────────────────────────────────
            if (delMemRow) {
                if (typeof window.showSystemPopup !== 'function') return;
                window.showSystemPopup({
                    title: 'Delete Memory',
                    body: 'Are you sure you want to delete this memory? The event will remain, but the note, photo, and any attachment will be cleared. This action cannot be undone!',
                    actionLabel: 'Delete',
                    discardLabel: 'Cancel',
                    onAction: function () {
                        doDeleteMemoryFor(card, ev);
                    }
                });
                return;
            }
        }, true);

        // Extracted helper for the actual delete-memory mutation. Called
        // from the canonical confirm modal's onAction callback (and from
        // the inline "Delete this memory" link in edit mode).
        function doDeleteMemoryFor(card, ev) {
            writeSource(ev.source, { notes: '', photo: '', mediaType: '', mediaName: '' });
            if (window.paAutoSave) window.paAutoSave();
            // Strip the memory chip + subtitle from the card if open
            const chip = card.querySelector('.ftl-event-memory');
            if (chip) chip.remove();
            const subEl = card.querySelector('.ftl-event-sub');
            if (subEl && (ev.subtitle == null || ev.subtitle === '')) subEl.remove();
            // Collapse the card if expanded so the user sees the cleared state
            if (card.classList.contains('expanded')) {
                const editor = card.querySelector('.ftl-event-editor');
                if (editor) editor.remove();
                card.classList.remove('expanded');
            }
            // Refresh whichever stream the card lives in.
            const inLifeStory = card.closest('#lifeStoryStream');
            if (inLifeStory && window.paRenderLifeStory) {
                window.paRenderLifeStory(window.__paViewedPersonRealId || 'sj', inLifeStory);
            } else if (card.closest('#ftlStream')) {
                renderStream(currentFilter);
            }
            if (window.showToast) window.showToast('Memory deleted');
        }
        // Expose so the inline "Delete this memory" link in the editor
        // (toggleEditor closure) can call into the same helper.
        window.__paDoDeleteMemoryFor = doDeleteMemoryFor;
    }

    // ────────────────────────────────────────────────────────────────────────
    // FILTERS — type pills + view toggle
    // ────────────────────────────────────────────────────────────────────────
    let currentFilter = 'all';

    function bindFilters() {
        const typeGroup = document.getElementById('ftlFiltersType');
        if (typeGroup) {
            typeGroup.addEventListener('click', e => {
                const btn = e.target.closest('[data-filter-type]');
                if (!btn) return;
                currentFilter = btn.getAttribute('data-filter-type');
                typeGroup.querySelectorAll('.ftl-filter-pill').forEach(b => b.classList.toggle('ftl-filter-active', b === btn));
                renderStream(currentFilter);
            });
        }
    }

    // ────────────────────────────────────────────────────────────────────────
    // MOUNT
    // ────────────────────────────────────────────────────────────────────────
    function mount() {
        bindMenuActions(); // safe to call repeatedly — guarded by a flag
        if (!document.getElementById('ftlTool')) return;
        renderTool('generations');
        renderStream('all');
        bindFilters();
        // Wire the Family Timeline header "+ Add event" button once. The
        // Restore hidden header button is intentionally hidden on Family
        // Timeline (Hide is a Life-Story-only feature) — HTML ships it
        // with [hidden] and we never un-hide here.
        const addEventBtn = document.getElementById('ftlAddEventBtn');
        if (addEventBtn && !addEventBtn.__paWired) {
            addEventBtn.__paWired = true;
            addEventBtn.addEventListener('click', () => openAddEventModal());
        }
    }

    // ────────────────────────────────────────────────────────────────────────
    // ADD EVENT INLINE FORM — canonical entry-creation pattern.
    // Mounts INSIDE the stream wrap (right after the header row) so it
    // doesn't block the user with a full-screen overlay. Required fields
    // visible by default; Memory + Media revealed on-demand via canonical
    // "+ Add Memory" / "+ Add Media" buttons (matches the Add Document
    // canonical from Adobe XD: "Add Issue Date" / "Add Expiry Date" /
    // "Add Custom Date" reveal pattern). Violetka 2026-05-19: "нека да
    // се отвара като entry форма под бутона в средата и то поетапно, за
    // да не блокира съзнанието на юзъра".
    // ────────────────────────────────────────────────────────────────────────
    function buildAddEventInlineHtml() {
        const yearNow = (new Date()).getFullYear();
        const yearOpts = [];
        for (let y = yearNow + 5; y >= 1900; y--) yearOpts.push('<option value="' + y + '">' + y + '</option>');
        const monthOpts = ['January','February','March','April','May','June','July','August','September','October','November','December']
            .map((m, i) => '<option value="' + (i + 1) + '">' + m + '</option>').join('');
        const dayOpts = [];
        for (let d = 1; d <= 31; d++) dayOpts.push('<option value="' + d + '">' + d + '</option>');

        // CANONICAL new-entry form structure (.entry-form-wrap from
        // _shared.css:13778). Same shell as the Add Document / Add
        // Education / Add Medical entry forms. All classes below are
        // CANONICAL (.ef-*) — no custom overrides:
        //   .entry-form-wrap.open      — 600w glass pad (rgba 0.5,
        //                                 1px white border, 30 radius,
        //                                 0/10/30 shadow, 30/100 padding)
        //   .ef-form-header            — header row (30 margin-bottom)
        //   .ef-form-title             — "About this X" centered (400 14/17 op .5)
        //   .ef-form-close             — 20×20 cancel.svg top-right (op .5→1 hover)
        //   .ef-field                  — field container (margin-bottom 20)
        //   .ef-label                  — "* Field" label (12/15 op .5, with .req span for *)
        //   .ef-input-wrap             — underline-only input wrap (no fixed height)
        //   .ef-save-row + .ef-save-wrap — canonical Save arrow button
        return ''
            + '<div class="entry-form-wrap open pa-event-form" role="dialog" aria-labelledby="addEventTitle">'
            +   '<div class="ef-form-header">'
            +     '<span class="ef-form-title" id="addEventTitle">About this Event</span>'
            +     '<div class="ef-form-close" data-action="close"></div>'
            +   '</div>'

            // Event Name (REQUIRED) — label BELOW input (canonical
            // .ee-input-row pattern, Violetka 2026-05-22). ─────────────
            +   '<div class="ef-field">'
            +     '<div class="ef-input-wrap">'
            +       '<input type="text" id="addEventTitleInput" placeholder="e.g. First family vacation">'
            +     '</div>'
            +     '<label class="ef-label"><span class="req">*</span>Event Name</label>'
            +   '</div>'

            // Date (REQUIRED) — 3 selects in a row, "* Date" label BELOW row
            +   '<div class="ef-field">'
            +     '<div class="ef-row-3">'
            +       '<div class="ef-field"><div class="ef-input-wrap ef-select-wrap"><select id="addEventDay"><option value="">Day</option>' + dayOpts.join('') + '</select></div></div>'
            +       '<div class="ef-field"><div class="ef-input-wrap ef-select-wrap"><select id="addEventMonth"><option value="">Month</option>' + monthOpts + '</select></div></div>'
            +       '<div class="ef-field"><div class="ef-input-wrap ef-select-wrap"><select id="addEventYear"><option value="">Year</option>' + yearOpts.join('') + '</select></div></div>'
            +     '</div>'
            +     '<label class="ef-label"><span class="req">*</span>Date</label>'
            +   '</div>'

            // Who's Involved (REQUIRED) — CANONICAL .ee-contact-picker
            // pattern used everywhere (Vault, Entry Add Document, F&R,
            // Essential Info). Same classes, same CSS, same behavior.
            // Violetka 2026-05-22 LOCKED: "трябва да е от дизайн системата
            // ни, като в ентрто". Uses canonical openContactPicker which
            // detaches the dropdown to document.body so position:fixed
            // escapes the .entry-form-wrap's backdrop-filter containing block.
            +   '<div class="ef-field">'
            +     '<div class="ee-input-row ee-contact-picker" id="addEventPeoplePicker">'
            +       '<div class="ee-input-wrap" onclick="if(window.openContactPicker)window.openContactPicker(this)">'
            +         '<span class="ee-input-value ee-contact-picker-value">Select people</span>'
            +         '<span class="ee-input-chevron"></span>'
            +       '</div>'
            +       '<label class="ef-label"><span class="req">*</span>Who\'s Involved</label>'
            +       '<div class="ee-contact-suggestions" id="addEventPeopleOptions" role="listbox"></div>'
            +     '</div>'
            +     '<div class="pa-event-people-tags" id="addEventPeopleTags"></div>'
            // Canonical "Important!" callout
            +     '<div class="pa-event-important">'
            +       '<div class="pa-event-important-head">'
            +         '<span class="pa-event-important-icon" aria-hidden="true"></span>'
            +         '<span class="pa-event-important-title">Important!</span>'
            +       '</div>'
            +       '<div class="pa-event-important-body">Select a contact (a unique Record in PlanAfter) or create a new one to link them to this event.</div>'
            +     '</div>'
            +   '</div>'

            // Memory — OPTIONAL, hidden until "+ Add Memory" clicked.
            +   '<div class="lsc-add-inline-btn pa-event-optional-toggle" data-target="addEventMemorySection">'
            +     '<div class="lsc-add-inline-circle"><img src="img/plus-circle.svg" alt=""></div>'
            +     '<div class="lsc-add-inline-text">Add Memory</div>'
            +   '</div>'
            // Canonical bordered textarea pad — .ee-pad.ee-pad-textarea
            // (same pattern as Notes & Instructions across the platform).
            // Label sits BELOW the pad with descriptive caption text.
            // Violetka 2026-05-22: "ето така но с лейбъл отдолу".
            +   '<div class="ef-field pa-event-optional-section" id="addEventMemorySection" hidden>'
            +     '<div class="ee-pad ee-pad-textarea">'
            +       '<textarea id="addEventNotes" class="ee-pad-textarea-input" placeholder="A memory, a story, a detail to preserve…"></textarea>'
            +     '</div>'
            +     '<label class="ef-label ee-pad-below-lbl">What you remember about this day &mdash; names, places, the small things.</label>'
            +   '</div>'

            // Media — OPTIONAL
            +   '<div class="lsc-add-inline-btn pa-event-optional-toggle" data-target="addEventMediaSection">'
            +     '<div class="lsc-add-inline-circle"><img src="img/plus-circle.svg" alt=""></div>'
            +     '<div class="lsc-add-inline-text">Add Photo, Video or Document</div>'
            +   '</div>'
            +   '<div class="ef-field pa-event-optional-section" id="addEventMediaSection" hidden>'
            +     '<div class="kyc-upload-zone" id="addEventUploadZone" data-state="default">'
            +       '<input type="file" id="addEventFileInput" accept="image/*,video/*,audio/*,.pdf,.png,.jpg,.gif,.docx,.rtf,.txt,.xlsx,.mp3,.wav,.mov,.mp4" hidden>'
            +       '<span class="kyc-upload-hitzone kyc-upload-hitzone--upload" aria-hidden="true"></span>'
            +       '<span class="kyc-upload-hitzone kyc-upload-hitzone--drag" aria-hidden="true"></span>'
            +       '<span class="kyc-upload-circle"></span>'
            +       '<span class="kyc-upload-icon" aria-hidden="true"></span>'
            +       '<span class="kyc-upload-label">Upload File</span>'
            +       '<span class="kyc-upload-or-line-1"></span>'
            +       '<span class="kyc-upload-or-text">Or</span>'
            +       '<span class="kyc-upload-or-line-2"></span>'
            +       '<span class="kyc-upload-drag">Drag and Drop<br>File Here</span>'
            +     '</div>'
            +     '<label class="ef-label">Attachment</label>'
            +   '</div>'

            // ═══════════════════════════════════════════════════════
            // Canonical "Need help remembering?" — Invite Contributor
            // section. Violetka 2026-05-22: "това трябва да го има
            // в формата за нов event". Opens canonical paOpenInviteModal
            // pre-filled for the chosen contributor with the event
            // context. They get a secure link to add a photo / voice
            // memo / note without needing an account.
            // ═══════════════════════════════════════════════════════
            +   '<div class="pa-event-contrib-section">'
            +     '<div class="pa-event-contrib-title">Need help remembering?</div>'
            +     '<div class="ef-field">'
            +       '<div class="ee-input-row ee-contact-picker" id="addEventContribPicker">'
            +         '<div class="ee-input-wrap" onclick="if(window.openContactPicker)window.openContactPicker(this)">'
            +           '<span class="ee-input-value ee-contact-picker-value">Select a person</span>'
            +           '<span class="ee-input-chevron"></span>'
            +         '</div>'
            +         '<label class="ef-label">Who would know about this day?</label>'
            +         '<div class="ee-contact-suggestions" id="addEventContribOptions" role="listbox"></div>'
            +       '</div>'
            +     '</div>'
            +     '<div class="pa-event-contrib-cta-wrap">'
            +       '<button class="pa-event-contrib-cta" id="addEventContribSend" type="button" disabled>Send invitation</button>'
            +       '<div class="pa-event-contrib-hint">They&rsquo;ll get a quick link to add a photo, voice memo, or note &mdash; no account needed.</div>'
            +     '</div>'
            +   '</div>'

            // Canonical Save row + button
            +   '<div class="ef-save-row">'
            +     '<div class="ef-save-wrap" id="addEventSaveBtn" data-action="save">'
            +       '<span class="ef-save-label">Save</span>'
            +       '<span class="ef-save-dash"></span>'
            +       '<span class="ef-save-circle"><svg viewBox="0 0 9 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l7 7-7 7"/></svg></span>'
            +     '</div>'
            +   '</div>'
            + '</div>';
    }

    // Mount the inline form INSIDE the stream wrap (between header and
    // the year blocks). Strategy: insert as the FIRST child after the
    // .ftl-stream-title so the form appears directly below the Add event
    // button. Form is removed on close (clean DOM, no leftover state).
    function openAddEventInline() {
        // Find the active host: Family Timeline or Life Story
        let host = document.getElementById('ftlStreamWrap');
        const lifeHost = document.getElementById('lifeStoryWrap');
        // Prefer the visible one (Life Story is only in a hidden tab on profile/record)
        if (lifeHost && lifeHost.offsetParent !== null) host = lifeHost;
        if (!host) return;

        // If form already open in this host, just focus the title
        let existing = host.querySelector('.entry-form-wrap.pa-event-form');
        if (existing) {
            const t = existing.querySelector('#addEventTitleInput');
            if (t) t.focus();
            return;
        }
        // Insert after the .ftl-stream-title header row. The form root
        // IS the .entry-form-wrap (no extra wrapper div — matches the
        // canonical pattern used elsewhere on the platform).
        const titleRow = host.querySelector('.ftl-stream-title');
        const temp = document.createElement('div');
        temp.innerHTML = buildAddEventInlineHtml();
        const wrapper = temp.firstElementChild; // .entry-form-wrap.open
        if (titleRow && titleRow.nextSibling) {
            host.insertBefore(wrapper, titleRow.nextSibling);
        } else {
            host.appendChild(wrapper);
        }

        // Populate People suggestions — CANONICAL .ee-contact-* classes
        // (Violetka 2026-05-22 LOCKED: "знаеш дизайн системата — не
        // трябва да са различни на различните места"). EXACTLY the same
        // markup as the Entry Add Document picker — same group headings,
        // same option layout, same name/role typography. No scoped CSS.
        const optsHost = wrapper.querySelector('#addEventPeopleOptions');
        if (optsHost) {
            const candidates = people().filter(p => {
                if (!p) return false;
                const cats = p.categories || [];
                return cats.indexOf('family') !== -1 || cats.indexOf('network') !== -1;
            });
            const family = [], network = [];
            candidates.forEach(p => {
                const cats = p.categories || [];
                if (cats.indexOf('family') !== -1) family.push(p);
                else if (cats.indexOf('network') !== -1) network.push(p);
                else family.push(p); // fallback
            });
            const optHtml = (p) => {
                const name = shortName(p);
                const role = p.roleLayer2 || p.role || '';
                return '<div class="ee-contact-option" data-pid="' + escHtml(p.id) + '">'
                    + '<span class="ee-contact-option-name">' + escHtml(name) + '</span>'
                    + (role ? '<span class="ee-contact-option-role">(' + escHtml(role) + ')</span>' : '')
                    + '</div>';
            };
            let html = '';
            if (family.length) {
                html += '<div class="ee-contact-group">'
                     +    '<div class="ee-contact-group-label">My Family</div>'
                     +    family.map(optHtml).join('')
                     +  '</div>';
            }
            if (network.length) {
                html += '<div class="ee-contact-group">'
                     +    '<div class="ee-contact-group-label">My Network</div>'
                     +    network.map(optHtml).join('')
                     +  '</div>';
            }
            optsHost.innerHTML = html;
        }
        // Populate the SAME options into the contributor picker (different
        // host id but same data + canonical structure). Contributor picker
        // sets the chosen person on wrapper._contribPickedPersonId so the
        // Send invitation CTA can open paOpenInviteModal pre-filled.
        const contribOpts = wrapper.querySelector('#addEventContribOptions');
        if (contribOpts) {
            const candidates = people().filter(p => {
                if (!p) return false;
                const cats = p.categories || [];
                return cats.indexOf('family') !== -1 || cats.indexOf('network') !== -1;
            });
            const family = [], network = [];
            candidates.forEach(p => {
                const cats = p.categories || [];
                if (cats.indexOf('family') !== -1) family.push(p);
                else if (cats.indexOf('network') !== -1) network.push(p);
                else family.push(p);
            });
            const optHtml = (p) => {
                const name = shortName(p);
                const role = p.roleLayer2 || p.role || '';
                return '<div class="ee-contact-option" data-contrib-pid="' + escHtml(p.id) + '">'
                    + '<span class="ee-contact-option-name">' + escHtml(name) + '</span>'
                    + (role ? '<span class="ee-contact-option-role">(' + escHtml(role) + ')</span>' : '')
                    + '</div>';
            };
            let chtml = '';
            if (family.length) {
                chtml += '<div class="ee-contact-group">'
                      +    '<div class="ee-contact-group-label">My Family</div>'
                      +    family.map(optHtml).join('')
                      +  '</div>';
            }
            if (network.length) {
                chtml += '<div class="ee-contact-group">'
                      +    '<div class="ee-contact-group-label">My Network</div>'
                      +    network.map(optHtml).join('')
                      +  '</div>';
            }
            contribOpts.innerHTML = chtml;
        }
        // Pre-fill viewed person in Life Story context
        const viewedId = window.__paViewedPersonRealId;
        if (viewedId && host === lifeHost) {
            const p = findPerson(viewedId);
            if (p) addEventPersonTag(viewedId, shortName(p));
        }
        // Wire close + save + optional-reveal as a single delegated handler
        wrapper.addEventListener('click', (e) => {
            const close = e.target.closest('[data-action="close"]');
            if (close) { closeAddEventInline(wrapper); return; }
            const save = e.target.closest('[data-action="save"]');
            if (save) { handleAddEventSave(wrapper); return; }
            const toggle = e.target.closest('.pa-event-optional-toggle');
            if (toggle) {
                const targetId = toggle.getAttribute('data-target');
                const section = wrapper.querySelector('#' + targetId);
                if (section) {
                    section.hidden = false;
                    toggle.style.display = 'none';
                    // Auto-focus the first input inside the revealed section
                    const firstInput = section.querySelector('textarea, input[type="text"]');
                    if (firstInput && firstInput.type !== 'file') setTimeout(() => firstInput.focus(), 100);
                }
            }
        });
        // ESC to close
        wrapper.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeAddEventInline(wrapper);
        });
        // Focus title
        setTimeout(() => {
            const t = wrapper.querySelector('#addEventTitleInput');
            if (t) t.focus();
        }, 250);
    }

    function closeAddEventInline(wrapper) {
        if (!wrapper) wrapper = document.querySelector('.entry-form-wrap.pa-event-form');
        if (!wrapper) return;
        wrapper.classList.remove('open');
        setTimeout(() => { if (wrapper.parentElement) wrapper.parentElement.removeChild(wrapper); }, 220);
    }

    // Back-compat alias — older click handlers may still reference this.
    function openAddEventModal() { openAddEventInline(); }
    function closeAddEventModal() { closeAddEventInline(); }

    // Canonical Linked Summary Card pattern (Violetka 2026-05-22: "when a
    // person is picked, they should render as the canonical summary card —
    // avatar + name + 'My Family • Role' subtitle + ... menu + role badge,
    // not as a small tag chip"). Reuses the canonical buildLinkedCardHtml
    // from _shared.js — same renderer used in Entry Add Document, ANEF,
    // and every other People & Contacts section across the platform.
    function addEventPersonTag(pid, name, wrapper) {
        wrapper = wrapper || document.querySelector('.entry-form-wrap.pa-event-form');
        const tagsHost = wrapper && wrapper.querySelector('#addEventPeopleTags');
        if (!tagsHost) return;
        if (tagsHost.querySelector('[data-person-id="' + pid + '"]')) return;
        const person = findPerson(pid);
        if (!person) return;
        // Build the canonical summary card via the shared builder
        if (typeof window.buildLinkedCardHtml === 'function') {
            tagsHost.insertAdjacentHTML('beforeend', window.buildLinkedCardHtml(person));
        } else {
            // Defensive fallback — shouldn't normally happen since _shared.js
            // exposes the builder globally.
            const tag = document.createElement('span');
            tag.className = 'pa-event-people-tag';
            tag.setAttribute('data-pid', pid);
            tag.innerHTML = escHtml(name)
                + ' <button type="button" class="pa-event-people-tag-x" aria-label="Remove" data-pid="' + escHtml(pid) + '">×</button>';
            tagsHost.appendChild(tag);
        }
    }

    function handleAddEventSave(wrapper) {
        wrapper = wrapper || document.querySelector('.entry-form-wrap.pa-event-form');
        if (!wrapper) return;
        const titleEl = wrapper.querySelector('#addEventTitleInput');
        const dayEl = wrapper.querySelector('#addEventDay');
        const monthEl = wrapper.querySelector('#addEventMonth');
        const yearEl = wrapper.querySelector('#addEventYear');
        const tagsHost = wrapper.querySelector('#addEventPeopleTags');
        const notesEl = wrapper.querySelector('#addEventNotes');

        const title = (titleEl && titleEl.value || '').trim();
        const d = dayEl && dayEl.value;
        const m = monthEl && monthEl.value;
        const y = yearEl && yearEl.value;
        // Canonical Linked Summary Cards use data-person-id (NOT data-pid).
        // buildLinkedCardHtml puts the attribute on .linked-summary-card.
        // Fallback to data-pid for any legacy tag chips (defensive).
        const peopleIds = Array.from((tagsHost && tagsHost.querySelectorAll('[data-person-id], [data-pid]')) || [])
            .map(el => el.getAttribute('data-person-id') || el.getAttribute('data-pid'))
            .filter((v, i, a) => v && a.indexOf(v) === i);
        const notes = (notesEl && notesEl.value) || '';

        const missing = [];
        if (!title) missing.push('event name');
        if (!d || !m || !y) missing.push('date');
        if (!peopleIds.length) missing.push('at least one person');
        if (missing.length) {
            if (window.showToast) window.showToast('Please fill: ' + missing.join(', '));
            return;
        }
        const dateStr = y + '-' + String(m).padStart(2, '0') + '-' + String(d).padStart(2, '0');
        const id = 'custom_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
        const contributors = wrapper._contributors || [];
        const entry = {
            id: id, type: 'custom', dateStr: dateStr, title: title,
            peopleIds: peopleIds, notes: notes,
            photo: '', mediaType: '', mediaName: '',
            contributors: contributors,
            createdAt: new Date().toISOString()
        };
        const list = readCustomEvents();
        list.push(entry);
        writeCustomEvents(list);
        if (window.paAutoSave) window.paAutoSave();
        closeAddEventInline(wrapper);
        if (window.showToast) window.showToast('Event added');
        // Refresh whichever stream is mounted
        if (document.getElementById('ftlStream')) renderStream(currentFilter);
        const lifeRoot = document.getElementById('lifeStoryStream');
        if (lifeRoot && window.paRenderLifeStory) {
            window.paRenderLifeStory(window.__paViewedPersonRealId || 'sj', lifeRoot);
        }
    }

    // Custom events store helpers — persisted to localStorage.
    function readCustomEvents() {
        try {
            const raw = localStorage.getItem('paCustomEvents');
            return raw ? JSON.parse(raw) : [];
        } catch (e) { return []; }
    }
    function writeCustomEvents(list) {
        try { localStorage.setItem('paCustomEvents', JSON.stringify(list)); } catch (e) {}
    }
    // Delegated handlers on the inline form — people-tag remove + suggestion click.
    // Scoped to the canonical .entry-form-wrap.pa-event-form so handlers
    // don't fire on unrelated parts of the page.
    document.addEventListener('click', (e) => {
        const wrapper = e.target.closest('.entry-form-wrap.pa-event-form');
        if (!wrapper) return;
        const x = e.target.closest('.pa-event-people-tag-x');
        if (x) {
            const tag = x.closest('.pa-event-people-tag');
            if (tag) tag.remove();
            return;
        }
        const opt = e.target.closest('#addEventPeopleOptions .ee-contact-option');
        if (opt) {
            const pid = opt.getAttribute('data-pid');
            const p = findPerson(pid);
            if (p) addEventPersonTag(pid, shortName(p), wrapper);
            const picker = opt.closest('.ee-contact-picker');
            if (picker) picker.classList.remove('open');
            return;
        }
        // ── Contributor picker: pick person → enable Send invitation CTA
        const contribOpt = e.target.closest('#addEventContribOptions .ee-contact-option');
        if (contribOpt) {
            const cpid = contribOpt.getAttribute('data-contrib-pid');
            const cp = findPerson(cpid);
            if (cp) {
                wrapper._contribPickedPersonId = cpid;
                const valueEl = wrapper.querySelector('#addEventContribPicker .ee-contact-picker-value');
                if (valueEl) valueEl.textContent = shortName(cp);
                const sendBtn = wrapper.querySelector('#addEventContribSend');
                if (sendBtn) sendBtn.disabled = false;
            }
            const picker = contribOpt.closest('.ee-contact-picker');
            if (picker) picker.classList.remove('open');
            return;
        }
        // ── Contributor chip action → Review/Resend/View dispatcher
        // (delegated globally so it works on every timeline + life story)
        // — actually we don't need wrapper here; bound below at document.
        // ── Send invitation CTA → open canonical paOpenInviteModal
        const sendCta = e.target.closest('#addEventContribSend');
        if (sendCta && !sendCta.disabled) {
            const pid = wrapper._contribPickedPersonId;
            const person = findPerson(pid);
            if (!person || typeof window.paOpenInviteModal !== 'function') return;
            const titleEl = wrapper.querySelector('#addEventTitleInput');
            const eventName = (titleEl && titleEl.value || '').trim() || 'a family event';
            const dayEl = wrapper.querySelector('#addEventDay');
            const monthEl = wrapper.querySelector('#addEventMonth');
            const yearEl = wrapper.querySelector('#addEventYear');
            const d = dayEl && dayEl.value, m = monthEl && monthEl.value, y = yearEl && yearEl.value;
            const dateLabel = (d && m && y) ? (['','January','February','March','April','May','June','July','August','September','October','November','December'][Number(m)] + ' ' + d + ', ' + y) : '';
            window.paOpenInviteModal({
                person: person,
                title: 'Send Event Invitation',
                kind: 'event',
                subject: 'Help me remember: ' + eventName,
                contextLine: 'Event: ' + eventName + (dateLabel ? '\nDate: ' + dateLabel : ''),
                ownerName: 'Sarah Johnson',
                onSend: function (payload) {
                    if (!wrapper._contributors) wrapper._contributors = [];
                    wrapper._contributors.push({ personId: pid, email: payload.email, subject: payload.subject, sentAt: new Date().toISOString() });
                    const hint = wrapper.querySelector('.pa-event-contrib-hint');
                    if (hint) hint.textContent = '✓ Invitation sent to ' + (person.firstName || shortName(person));
                }
            });
            return;
        }
    });

    // ────────────────────────────────────────────────────────────────────
    // Contributor row actions — Review / Resend / View / Undo dispatcher
    // (delegated globally so it works on every timeline + life story).
    // Bound once. Each .ftl-contrib-action button carries its state on
    // data-contrib-action; row carries data-event-idx + data-contrib-idx
    // so we can look up the contributor record and apply the action.
    // ────────────────────────────────────────────────────────────────────
    // Inline accept/decline/resend/undo buttons — Facebook-style flow.
    // No Review pane; each comment has its own actions below the body.
    // ─── File lightbox — closable preview overlay ───────────────────
    // Click any file thumb/card to open a fullscreen overlay with X
    // close button. ESC + click outside also close. Violetka 2026-05-23:
    // "като отворя файл трябва да мога да го затворя".
    if (!window.__paFtlFileLightboxBound) {
        window.__paFtlFileLightboxBound = true;
        function openLightbox(url, name, kind) {
            let bd = document.getElementById('paFileLightboxBackdrop');
            if (!bd) {
                bd = document.createElement('div');
                bd.id = 'paFileLightboxBackdrop';
                bd.className = 'pa-file-lightbox-backdrop';
                document.body.appendChild(bd);
            }
            // Detect kind if not provided
            if (!kind) {
                const ext = (name || url || '').toLowerCase();
                if (/\.(jpe?g|png|gif|webp|heic)/.test(ext)) kind = 'image';
                else if (/\.(mp4|mov|webm|m4v|ogv)/.test(ext)) kind = 'video';
                else if (/\.(mp3|wav|m4a|ogg|aac|flac)/.test(ext)) kind = 'audio';
                else kind = 'doc';
            }
            let inner;
            if (kind === 'image') {
                inner = '<img class="pa-file-lightbox-img" src="' + escHtml(url) + '" alt="' + escHtml(name || '') + '">';
            } else if (kind === 'video') {
                inner = '<video class="pa-file-lightbox-video" src="' + escHtml(url) + '" controls autoplay playsinline></video>';
            } else if (kind === 'audio') {
                inner = '<div class="pa-file-lightbox-audio">' +
                          '<div class="pa-file-lightbox-doc-icon">🎵</div>' +
                          '<div class="pa-file-lightbox-doc-name">' + escHtml(name || 'voice memo') + '</div>' +
                          '<audio src="' + escHtml(url) + '" controls autoplay></audio>' +
                        '</div>';
            } else {
                inner = '<div class="pa-file-lightbox-doc">' +
                          '<div class="pa-file-lightbox-doc-icon">📎</div>' +
                          '<div class="pa-file-lightbox-doc-name">' + escHtml(name || 'attachment') + '</div>' +
                          '<a class="pa-file-lightbox-doc-open" href="' + escHtml(url) + '" target="_blank">Open in new tab &rarr;</a>' +
                        '</div>';
            }
            bd.innerHTML =
                '<div class="pa-file-lightbox" role="dialog" aria-label="File preview">' +
                  '<button class="pa-file-lightbox-close" type="button" aria-label="Close"></button>' +
                  inner +
                  (name ? '<div class="pa-file-lightbox-caption">' + escHtml(name) + '</div>' : '') +
                '</div>';
            bd.classList.add('open');
            const close = function () {
                bd.classList.remove('open');
                bd.innerHTML = '';
                document.removeEventListener('keydown', onEsc);
            };
            const onEsc = function (ev) { if (ev.key === 'Escape') close(); };
            bd.querySelector('.pa-file-lightbox-close').addEventListener('click', close);
            bd.addEventListener('click', function (ev) { if (ev.target === bd) close(); }, { once: true });
            document.addEventListener('keydown', onEsc);
        }
        document.addEventListener('click', function (e) {
            const fileBtn = e.target.closest('[data-lightbox-url]');
            if (!fileBtn) return;
            e.preventDefault();
            e.stopPropagation();
            openLightbox(
                fileBtn.getAttribute('data-lightbox-url'),
                fileBtn.getAttribute('data-lightbox-name'),
                fileBtn.getAttribute('data-lightbox-kind')
            );
        });
    }

    if (!window.__paFtlContribInlineBound) {
        window.__paFtlContribInlineBound = true;
        document.addEventListener('click', function (e) {
            const inlineBtn = e.target.closest('[data-contrib-inline-action]');
            if (!inlineBtn) return;
            e.preventDefault();
            e.stopPropagation();
            const evIdx = Number(inlineBtn.getAttribute('data-event-idx'));
            const cIdx  = Number(inlineBtn.getAttribute('data-contrib-idx'));
            const action = inlineBtn.getAttribute('data-contrib-inline-action');
            const allEvents = (window.__paTimelineEvents || []);
            const ev = allEvents[evIdx];
            if (!ev || !ev.contributors || !ev.contributors[cIdx]) return;
            const c = ev.contributors[cIdx];
            const person = findPerson(c.personId);
            function persist() {
                if (ev.type === 'custom') {
                    const list = readCustomEvents();
                    const idxInStore = list.findIndex(x => x.id === ev.id);
                    if (idxInStore >= 0) { list[idxInStore] = ev; writeCustomEvents(list); }
                }
            }
            if (action === 'accept') {
                c.status = 'accepted';
                const memory = (c.contribution || {}).memory || '';
                if (memory && !ev.__contribFolded?.[c.personId]) {
                    ev.__contribFolded = ev.__contribFolded || {};
                    ev.__contribFolded[c.personId] = true;
                    // Optional: fold into event memory with attribution.
                    // Skip folding now since comment is already visible
                    // inline — don't duplicate. Keep flag for future merge.
                }
                persist();
                renderStream(currentFilter);
                if (window.showToast) window.showToast(person ? person.firstName + "'s memory accepted" : 'Accepted');
            } else if (action === 'decline') {
                // 2-step confirmation: first click arms button, second commits
                if (!inlineBtn.classList.contains('ftl-contrib-action-decline-armed')) {
                    inlineBtn.classList.add('ftl-contrib-action-decline-armed');
                    const original = inlineBtn.textContent;
                    inlineBtn.textContent = 'Tap again to confirm';
                    setTimeout(function () {
                        if (inlineBtn.isConnected) {
                            inlineBtn.classList.remove('ftl-contrib-action-decline-armed');
                            inlineBtn.textContent = original;
                        }
                    }, 4000);
                    return;
                }
                c.status = 'declined';
                persist();
                renderStream(currentFilter);
                if (window.showToast) window.showToast('Contribution archived');
            } else if (action === 'resend') {
                if (!person || typeof window.paOpenInviteModal !== 'function') return;
                window.paOpenInviteModal({
                    person: person,
                    title: 'Resend Event Invitation',
                    kind: 'event',
                    subject: c.subject || 'Help me remember: ' + ev.title,
                    contextLine: 'Event: ' + ev.title + (ev.dateStr ? '\nDate: ' + fmtDateLong(ev.ymd) : ''),
                    ownerName: 'Sarah Johnson',
                    onSend: function (payload) {
                        c.email = payload.email;
                        c.subject = payload.subject;
                        c.sentAt = new Date().toISOString();
                        c.status = 'awaiting';
                        persist();
                        renderStream(currentFilter);
                    }
                });
            } else if (action === 'undo') {
                c.status = 'awaiting';
                persist();
                renderStream(currentFilter);
            }
        });
    }
    if (!window.__paFtlContribActionBound) {
        window.__paFtlContribActionBound = true;
        document.addEventListener('click', function (e) {
            const btn = e.target.closest('.ftl-contrib-action');
            if (!btn) return;
            e.preventDefault();
            e.stopPropagation();
            const row = btn.closest('.ftl-contrib-row');
            if (!row) return;
            const evIdx = Number(row.getAttribute('data-event-idx'));
            const cIdx  = Number(row.getAttribute('data-contrib-idx'));
            const action = btn.getAttribute('data-contrib-action');
            const list = readCustomEvents();
            // Build a unified events list (the same one renderStream uses)
            // so the idx aligns. For custom events the index maps 1-to-1.
            const allEvents = (window.__paTimelineEvents || []);
            const ev = allEvents[evIdx];
            if (!ev || !ev.contributors || !ev.contributors[cIdx]) return;
            const c = ev.contributors[cIdx];
            const person = findPerson(c.personId);
            if (action === 'submitted') {
                // Review submitted contribution
                openContribReviewPane(ev, c, person, evIdx, cIdx);
            } else if (action === 'awaiting') {
                // Resend invitation — reopen the canonical modal pre-filled
                if (!person || typeof window.paOpenInviteModal !== 'function') return;
                window.paOpenInviteModal({
                    person: person,
                    title: 'Resend Event Invitation',
                    kind: 'event',
                    subject: c.subject || 'Help me remember: ' + ev.title,
                    contextLine: 'Event: ' + ev.title + (ev.dateStr ? '\nDate: ' + fmtDateLong(ev.ymd) : ''),
                    ownerName: 'Sarah Johnson',
                    onSend: function (payload) {
                        c.email = payload.email;
                        c.subject = payload.subject;
                        c.sentAt = new Date().toISOString();
                        c.status = 'awaiting';
                        // Persist if custom event
                        if (ev.type === 'custom') {
                            const idxInStore = list.findIndex(x => x.id === ev.id);
                            if (idxInStore >= 0) { list[idxInStore] = ev; writeCustomEvents(list); }
                        }
                        renderStream(currentFilter);
                    }
                });
            } else if (action === 'accepted') {
                openContribReviewPane(ev, c, person, evIdx, cIdx, /*readonly*/ true);
            } else if (action === 'declined') {
                c.status = 'awaiting';
                if (ev.type === 'custom') {
                    const idxInStore = list.findIndex(x => x.id === ev.id);
                    if (idxInStore >= 0) { list[idxInStore] = ev; writeCustomEvents(list); }
                }
                renderStream(currentFilter);
                if (window.showToast) window.showToast('Contributor restored to Awaiting');
            }
        });
    }

    // ────────────────────────────────────────────────────────────────────
    // Review pane — opens a backdrop+sheet that shows what the contributor
    // submitted (memory text, voice memo, files). Sarah can Accept (folds
    // items into the event) or Decline (archives them). Same component for
    // accepted view (readonly).
    // ────────────────────────────────────────────────────────────────────
    function openContribReviewPane(ev, c, person, evIdx, cIdx, readonly) {
        let bd = document.getElementById('paContribReviewBackdrop');
        if (!bd) {
            bd = document.createElement('div');
            bd.id = 'paContribReviewBackdrop';
            bd.className = 'pa-contrib-review-backdrop';
            document.body.appendChild(bd);
        }
        const personName = person ? (person.firstName || shortName(person)) : '(removed)';
        const personPhoto = person && person.photo ? person.photo : '';
        const initials = person ? ((person.firstName || '?')[0] + (person.familyName ? person.familyName[0] : '')) : '?';
        const role = person ? (person.roleLayer2 || person.role || '') : '';
        const contribution = c.contribution || {};
        const memory = contribution.memory || '';
        const voice = contribution.voiceMemoUrl || '';
        const files = contribution.files || [];
        const submittedAt = c.submittedAt ? new Date(c.submittedAt).toLocaleString() : '';
        const avatarHtml = personPhoto
            ? '<img src="' + escHtml(personPhoto) + '" alt="">'
            : '<span class="pa-contrib-review-avatar-initials">' + escHtml(initials) + '</span>';
        bd.innerHTML = '' +
            '<div class="pa-contrib-review-sheet" role="dialog" aria-label="Review contribution">' +
              '<button class="pa-contrib-review-close" type="button" aria-label="Close"></button>' +
              '<div class="pa-contrib-review-title">' + escHtml(personName) + '&rsquo;s contribution &mdash; ' + escHtml(ev.title) + '</div>' +
              '<div class="pa-contrib-review-person">' +
                '<span class="pa-contrib-review-avatar">' + avatarHtml + '</span>' +
                '<span class="pa-contrib-review-name">' + escHtml(person ? shortName(person) : personName) + '</span>' +
                (role ? '<span class="pa-contrib-review-role">&middot; ' + escHtml(role) + '</span>' : '') +
              '</div>' +
              (memory ? '<div class="pa-contrib-review-section">' +
                          '<div class="pa-contrib-review-section-label">Memory</div>' +
                          '<div class="pa-contrib-review-memory">&ldquo;' + escHtml(memory) + '&rdquo;</div>' +
                       '</div>' : '') +
              (voice ? '<div class="pa-contrib-review-section">' +
                         '<div class="pa-contrib-review-section-label">Voice memo</div>' +
                         '<audio controls src="' + escHtml(voice) + '"></audio>' +
                       '</div>' : '') +
              (files.length ? '<div class="pa-contrib-review-section">' +
                                '<div class="pa-contrib-review-section-label">Files</div>' +
                                '<div class="pa-contrib-review-files">' +
                                  files.map(f => '<div class="pa-contrib-review-file">' + escHtml(f.name || 'attachment') + '</div>').join('') +
                                '</div>' +
                              '</div>' : '') +
              (!memory && !voice && !files.length ?
                  '<div class="pa-contrib-review-empty">Nothing submitted yet.</div>' : '') +
              (submittedAt ? '<div class="pa-contrib-review-meta">Submitted ' + escHtml(submittedAt) + '</div>' : '') +
              (readonly ? '' :
                '<div class="pa-contrib-review-actions">' +
                  '<button type="button" class="pa-contrib-review-decline" data-action="decline">Decline</button>' +
                  '<button type="button" class="pa-contrib-review-accept" data-action="accept">Accept memory &rarr;</button>' +
                '</div>') +
            '</div>';
        bd.classList.add('open');
        bd.addEventListener('click', function (e) {
            if (e.target === bd) closeContribReviewPane();
        }, { once: true });
        bd.querySelector('.pa-contrib-review-close').addEventListener('click', closeContribReviewPane);
        const acceptBtn = bd.querySelector('.pa-contrib-review-accept');
        const declineBtn = bd.querySelector('.pa-contrib-review-decline');
        if (acceptBtn) acceptBtn.addEventListener('click', function () {
            c.status = 'accepted';
            // Fold the memory into the event (prepend with attribution)
            if (memory) {
                const attribution = 'From ' + (person ? shortName(person) : personName) +
                                    (submittedAt ? ', ' + submittedAt : '') + ': ';
                ev.notes = (ev.notes ? ev.notes + '\n\n' : '') + attribution + memory;
            }
            // Persist
            if (ev.type === 'custom') {
                const list2 = readCustomEvents();
                const idxInStore = list2.findIndex(x => x.id === ev.id);
                if (idxInStore >= 0) { list2[idxInStore] = ev; writeCustomEvents(list2); }
            }
            closeContribReviewPane();
            renderStream(currentFilter);
            if (window.showToast) window.showToast('Memory added to event');
        });
        if (declineBtn) {
            let armed = false;
            let armTimer = null;
            const originalText = declineBtn.textContent;
            declineBtn.addEventListener('click', function () {
                // Canonical 2-step destructive confirmation (Nielsen heuristic #5).
                // First click: arm the button + show confirmation copy in the
                // actions row. Second click within 4s: commit the decline.
                // Click elsewhere or wait 4s: revert to safe state.
                if (!armed) {
                    armed = true;
                    declineBtn.textContent = 'Tap again to confirm';
                    declineBtn.classList.add('pa-contrib-review-decline-armed');
                    // Visual indication on the actions row
                    const actionsRow = declineBtn.closest('.pa-contrib-review-actions');
                    if (actionsRow) actionsRow.classList.add('pa-contrib-review-actions-confirm');
                    armTimer = setTimeout(function () {
                        armed = false;
                        declineBtn.textContent = originalText;
                        declineBtn.classList.remove('pa-contrib-review-decline-armed');
                        if (actionsRow) actionsRow.classList.remove('pa-contrib-review-actions-confirm');
                    }, 4000);
                    return;
                }
                // Confirmed — clear timer and commit
                if (armTimer) clearTimeout(armTimer);
                c.status = 'declined';
                if (ev.type === 'custom') {
                    const list2 = readCustomEvents();
                    const idxInStore = list2.findIndex(x => x.id === ev.id);
                    if (idxInStore >= 0) { list2[idxInStore] = ev; writeCustomEvents(list2); }
                }
                closeContribReviewPane();
                renderStream(currentFilter);
                if (window.showToast) window.showToast('Contribution archived');
            });
        }
    }
    function closeContribReviewPane() {
        const bd = document.getElementById('paContribReviewBackdrop');
        if (bd) { bd.classList.remove('open'); bd.innerHTML = ''; }
    }

    // Expose for debug
    window.openAddEventInline = openAddEventInline;
    window.openAddEventModal = openAddEventModal;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }
    // Expose for debugging / re-render after edits
    window.paFamilyTimelineMount = mount;

    // ────────────────────────────────────────────────────────────────────────
    // PERSON-SCOPED EVENT STREAM — used by Life Story tab on profile.html
    // and record.html so every person's record shows the SAME events that
    // appear on the Family Timeline (one source, two surfaces).
    // Edits made here write back to peopleStore via the same writeSource
    // pathway, so the Family Timeline auto-reflects them.
    // Violetka 2026-05-18: "тези Timeline трябва да се виждат и във всеки
    // record за който се отнасят, в таба на record-а Life Story. От там
    // също ще могат да се edit-ват или създават и ще се променят
    // синхронно или ще се появяват и на двете места".
    // ────────────────────────────────────────────────────────────────────────
    window.paRenderLifeStory = function paRenderLifeStory(personId, root) {
        bindMenuActions(); // ensure menu handlers active on profile.html / record.html
        if (!root || !personId) return;
        // Reuse the global event extractors — already family-filtered.
        const past = extractEvents();
        const future = projectFutureEvents().map(ev => {
            const ymd = parseYMD(ev.dateStr);
            return {
                ymd, year: ymd.y, dateStr: ev.dateStr,
                type: 'future', isFuture: true,
                title: ev.title, subtitle: ev.subtitle || '',
                peopleIds: ev.peopleIds || [],
                color: '#9CA3AF', icon: 'clock'
            };
        });
        const all = past.concat(future)
            .filter(ev => Array.isArray(ev.peopleIds) && ev.peopleIds.indexOf(personId) !== -1)
            // Soft-delete: remove events the user has hidden from THIS
            // person's Life Story. The event still exists everywhere else
            // (Family Timeline + other people's Life Stories).
            .filter(ev => !isEventHiddenFor(personId, eventId(ev)))
            .sort((a, b) => ymdToDate(a.ymd) - ymdToDate(b.ymd));

        // Stash for click handlers that look up by data-event-idx
        window.__paTimelineEvents = all;

        // Update the count badge next to the section title (e.g. "12 events").
        const countEl = document.getElementById('lifeStoryCount');
        if (countEl) countEl.textContent = all.length + (all.length === 1 ? ' event' : ' events');

        if (!all.length) {
            root.innerHTML = '<div class="ftl-stream-empty">No life events recorded yet.</div>';
            return;
        }

        const sarah = findPerson(PLAN_OWNER_ID);
        const sarahDob = sarah && sarah.dob;
        const groups = {};
        const yearOrder = [];
        all.forEach(ev => {
            const y = ev.year;
            if (!groups[y]) { groups[y] = []; yearOrder.push(y); }
            groups[y].push(ev);
        });

        const html = yearOrder.map(year => {
            const isFutureYear = year > NOW_YEAR;
            const sarahAgeYr = sarahDob ? (year - parseYMD(sarahDob).y) : null;
            const evList = groups[year].map(ev => eventCard(ev, sarah, all.indexOf(ev))).join('');
            return ''
                + '<div class="ftl-year-block' + (isFutureYear ? ' ftl-year-block-future' : '') + '">'
                +   '<div class="ftl-year-head">'
                +     '<div class="ftl-year-num">' + year + '</div>'
                +     (sarahAgeYr != null && sarahAgeYr >= 0
                         ? '<div class="ftl-year-meta">' + (sarah ? sarah.firstName : 'You') + ' age ' + sarahAgeYr + '</div>'
                         : '<div class="ftl-year-meta">' + (isFutureYear ? 'upcoming' : 'before your time') + '</div>')
                +   '</div>'
                +   '<div class="ftl-year-events">' + evList + '</div>'
                + '</div>';
        }).join('');
        root.innerHTML = html;

        // ── Restore hidden — toggle the canonical header button ───────
        // The button lives in the HTML header next to the count badge
        // (id="lifeStoryRestoreBtn"). We just toggle [hidden] + update
        // the label count + wire the click once. Footer placement was
        // moved to header per Violetka 2026-05-19: "и двата в header".
        const hiddenIdsForPerson = (readHiddenEvents()[personId] || []);
        const restoreBtn = document.getElementById('lifeStoryRestoreBtn');
        if (restoreBtn) {
            const n = hiddenIdsForPerson.length;
            if (n > 0) {
                restoreBtn.hidden = false;
                const labelEl = restoreBtn.querySelector('.lsc-add-inline-text');
                if (labelEl) labelEl.textContent = 'Restore hidden (' + n + ')';
                if (!restoreBtn.__paWired) {
                    restoreBtn.__paWired = true;
                    restoreBtn.addEventListener('click', () => {
                        if (typeof window.showSystemPopup !== 'function') return;
                        const pid = window.__paViewedPersonRealId || 'sj';
                        const p = findPerson(pid);
                        const firstName = (p && p.firstName) || 'this person';
                        const curN = (readHiddenEvents()[pid] || []).length;
                        window.showSystemPopup({
                            title: 'Restore Hidden Events',
                            body: 'Restore ' + curN + ' hidden event' + (curN === 1 ? '' : 's')
                                + ' to ' + firstName + '\'s Life Story? They will reappear in this feed.',
                            actionLabel: 'Restore',
                            discardLabel: 'Cancel',
                            onAction: function () {
                                const map = readHiddenEvents();
                                delete map[pid];
                                writeHiddenEvents(map);
                                if (window.paRenderLifeStory) window.paRenderLifeStory(pid, root);
                                if (window.showToast) window.showToast('Hidden events restored');
                            }
                        });
                    });
                }
            } else {
                restoreBtn.hidden = true;
            }
        }
        // ── Add event header button — wire once ───────────────────────
        const addEventBtn = document.getElementById('lifeStoryAddEventBtn');
        if (addEventBtn && !addEventBtn.__paWired) {
            addEventBtn.__paWired = true;
            addEventBtn.addEventListener('click', () => openAddEventModal());
        }

        // Wire up clicks → same toggleEditor closure (view → edit, save, etc.)
        // ALSO stamp each card's ⋯ dropdown with a marker class so the
        // Hide item stays visible after toggleDD reparents the dropdown
        // to document.body (#lifeStoryStream ancestor selector breaks
        // there). CSS rule:
        //   .doc-dropdown.ftl-menu-from-life-story .ftl-life-story-only
        //     { display: inline-flex; }
        root.querySelectorAll('.ftl-event-card').forEach((card) => {
            const dd = card.querySelector('.ftl-event-menu .doc-dropdown');
            if (dd) dd.classList.add('ftl-menu-from-life-story');
            card.addEventListener('click', (e) => {
                if (e.target.closest('.ftl-event-avatar')) {
                    const pid = card.getAttribute('data-person');
                    if (pid && window.openPersonRecord) window.openPersonRecord(pid);
                    return;
                }
                if (e.target.closest('.ftl-event-editor')) return;
                if (e.target.closest('.ftl-event-menu')) return;
                toggleEditor(card);
            });
        });
    };
})();
