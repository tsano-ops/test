// Adaptive Timeline Builder — implements the 3 functions referenced in
// _shared.js (tlMountTimeline / tlReadValues / tlReadModeHtml) which were
// previously orphan references (called via typeof guards, never defined).
//
// Per spec (2.1 My Profile §3.9.2.6 Adaptive Timeline Builder):
//   - Every entry has a Timeline section with milestones
//   - Each milestone: Event Label + Date (Year req, Month opt, Day opt) + Notes
//   - Partial dates allowed (year-only is valid)
//   - Day requires Month
//   - Custom milestones supported (user-defined event label)
//
// Visual pattern matches the canonical Family & Relationships timeline
// (.fr-milestone-block / .fr-date-row / .fr-notes-input — locked design,
// full-bleed wide pad with 100px L/R padding, Year/Month/Day border-bottom
// selects, note textarea with border-bottom, X-clear circle per milestone).

(function() {
    'use strict';

    const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const CURRENT_YEAR = new Date().getFullYear();

    // Default milestone labels per card key. Custom Date is always added at end
    // via "+ Add Custom Date" button.
    const MILESTONES_BY_CARD = {
        essential:  ['Issue Date', 'Expiry Date'],
        family:     ['Relationship Start Date', 'Marriage Date', 'Engagement Date',
                     'Civil Partnership Start Date', 'Divorce Date', 'Adoption Date'],
        medical:    ['Diagnosis Date', 'Treatment Date', 'Surgery / Procedure Date', 'Vaccine Date'],
        education:  ['Start Date', 'Graduation Date'],
        employment: ['Start Date', 'End Date', 'Promotion Date'],
        beliefs:    []
    };
    // Per-subcategory overrides — e.g. Professional Certification has Issue/Expiry
    // instead of Start/Graduation. Falls back to MILESTONES_BY_CARD when absent.
    // Per Violetka 2026-05-11: PERMANENT documents (Birth/Death/Marriage/
    // Citizenship/Name Change/SSN) must NOT offer an Expiry milestone — they
    // don't expire. Each gets only relevant milestones for that document type.
    const MILESTONES_BY_SUBCATEGORY = {
        // ── Essential Info — Identity & Vital Documents ──
        // Expirable documents (renewal applies):
        'Passport':                              ['Issue Date', 'Expiry Date'],
        'National ID Card':                      ['Issue Date', 'Expiry Date'],
        'Driver’s License':                 ['Issue Date', 'Expiry Date'],
        'Residence Permit':                      ['Issue Date', 'Expiry Date'],
        'EU Blue Card':                          ['Issue Date', 'Expiry Date'],
        'Visa':                                  ['Issue Date', 'Expiry Date'],
        'Work Permit':                           ['Issue Date', 'Expiry Date'],
        'Refugee Status Document':               ['Issue Date', 'Expiry Date'],
        'Other':                                 ['Issue Date', 'Expiry Date'],
        // Permanent documents — NO Expiry. Special anchor dates per type:
        'Birth Certificate':                     ['Date of Birth', 'Issue Date'],
        'Death Certificate':                     ['Date of Death', 'Issue Date'],
        'Marriage Certificate':                  ['Marriage Date', 'Issue Date'],
        'Citizenship Certificate':               ['Issue Date'],
        'Name Change Document':                  ['Effective Date', 'Issue Date'],
        'Social Security / National Insurance':  ['Issue Date'],
        // ── Education ──
        'Professional Certification':            ['Issue Date', 'Expiry Date'],
        'Other Education':                       ['Start Date', 'Graduation Date']
    };

    // Per-milestone hint text — appears as a single line below the
    // Year/Month/Day row (NOT individual labels under each select).
    // Matches XD canonical: e.g. "When the Education Started".
    const HINT_BY_MILESTONE = {
        // Essential (Identity & Vital Documents)
        'Issue Date':                'When the Document was Issued',
        'Expiry Date':               'When the Document Expires',
        // Permanent-document specific anchors (no expiry):
        'Date of Birth':             'When the Person was Born',
        'Date of Death':             'When the Person Passed Away',
        'Effective Date':            'When the Change Took Effect',
        // Family & Relationships
        'Relationship Start Date':   'When the Relationship Started',
        'Marriage Date':             'When the Marriage was Concluded',
        'Engagement Date':           'When the Engagement was Made',
        'Civil Partnership Start Date': 'When the Civil Partnership Started',
        'Divorce Date':              'When the Divorce was Finalised',
        'Adoption Date':             'When the Adoption was Finalised',
        // Medical
        'Diagnosis Date':            'When the Diagnosis was Made',
        'Treatment Date':            'When the Treatment was Received',
        'Surgery / Procedure Date':  'When the Procedure Took Place',
        'Vaccine Date':              'When the Vaccine was Administered',
        // Education
        'Start Date':                'When the Education Started',
        'Graduation Date':           'When the Education Ended',
        'Issue / Award Date':        'When the Document was Issued',
        // Employment
        'End Date':                  'When the Position Ended',
        'Promotion Date':            'When the Promotion Happened'
    };
    function hintFor(label) {
        return HINT_BY_MILESTONE[label] || '';
    }

    function escHtml(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, function(c) {
            return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
        });
    }

    // Build YEAR / MONTH / DAY options for custom dropdown panels.
    // Each panel rendered with fixed size (XD-locked: same w as wrap, same h ~244px
    // showing 6 items at 40px row + 4px padding). Panels open downward over content.
    //
    // LOGIC RULE — Violetka 2026-05-07: no FUTURE dates allowed by default.
    // Issue dates / Marriage / Adoption / Joined-Our-Family / DoB / DoD are all
    // historical events. The few cases where future is valid (Expiry Date)
    // pass `allowFuture=true` to the buildXOptionsCustom call (future work).
    //
    // For Expiry Date (which CAN be in the future), the timeline-specific
    // category metadata defines `futureAllowed: true` — when present, year
    // range extends to CURRENT_YEAR + 10 (passports expire ~10 years out).
    var TODAY = new Date();
    var TODAY_Y = TODAY.getFullYear();
    var TODAY_M_IDX = TODAY.getMonth();
    var TODAY_D = TODAY.getDate();

    // Year range — UNIFIED full range 1900..CURRENT_YEAR+30 for EVERY milestone
    // (Violetka 2026-05-12: "защо в полета за година не мога да избере и
    // година в бъдеще"). The previous binary split — Expiry-style milestones
    // got FUTURE-ONLY, all others got PAST-ONLY — locked out legitimate edge
    // cases (an already-expired document, an Issue Date set for a future
    // planned issuance, etc.). Showing the full range gives the user complete
    // freedom; semantic validation (e.g., "Issue date is in the future, is
    // that correct?") can be added later as a separate non-blocking hint.
    // The allowFuture param is preserved for backward compat but no longer
    // restricts year options — it now ONLY affects whether typed years past
    // currentYear are accepted at validation time.
    function buildYearOptionsCustom(selected, allowFuture) {
        let html = '';
        let maxY = CURRENT_YEAR + 30;
        let minY = 1900;
        for (let y = maxY; y >= minY; y--) {
            html += '<div class="tl-dd-option' + (String(selected) === String(y) ? ' selected' : '') + '" data-val="' + y + '" onclick="tlPickDate(this)">' + y + '</div>';
        }
        return html;
    }
    function buildMonthOptionsCustom(selected, selectedYear, allowFuture) {
        let html = '';
        let maxIdx = 11;
        let minIdx = 0;
        let yy = parseInt(selectedYear, 10);
        // Past-only: if selected year === today, cap month at current.
        if (!allowFuture && yy === TODAY_Y) maxIdx = TODAY_M_IDX;
        // Future-only: if selected year === today, MIN month is current
        // (can't pick a past month of current year for an expiry).
        if (allowFuture && yy === TODAY_Y) minIdx = TODAY_M_IDX;
        MONTHS.forEach(function(m, i) {
            if (i > maxIdx || i < minIdx) return;
            html += '<div class="tl-dd-option' + (selected === m ? ' selected' : '') + '" data-val="' + m + '" onclick="tlPickDate(this)">' + m + '</div>';
        });
        return html;
    }
    function buildDayOptionsCustom(selected, selectedYear, selectedMonth, allowFuture) {
        let html = '';
        let yy = parseInt(selectedYear, 10) || 2000;
        let mIdx = MONTHS.indexOf(selectedMonth);
        if (mIdx < 0) mIdx = 0;
        let daysInMonth = new Date(yy, mIdx + 1, 0).getDate();
        let minDay = 1;
        let maxDay = daysInMonth;
        // Past-only: if selected year+month === today's → cap at today's day.
        if (!allowFuture && yy === TODAY_Y && mIdx === TODAY_M_IDX) {
            maxDay = Math.min(daysInMonth, TODAY_D);
        }
        // Future-only: if selected year+month === today's → start from today.
        if (allowFuture && yy === TODAY_Y && mIdx === TODAY_M_IDX) {
            minDay = TODAY_D;
        }
        for (let d = minDay; d <= maxDay; d++) {
            html += '<div class="tl-dd-option' + (String(selected) === String(d) ? ' selected' : '') + '" data-val="' + d + '" onclick="tlPickDate(this)">' + d + '</div>';
        }
        return html;
    }

    // Date row — Year / Month / Day with custom dropdown panels (NOT native select).
    // Each .tl-date-sel-wrap is a custom dropdown:
    //   .tl-dd-trigger (clickable wrap with value + chevron)
    //   .tl-dd-panel (fixed size scrollable list, hidden until open)
    //   <input type="hidden"> (stores selected value for tlReadValues compat)
    // Panels: same width as wrap (113/149/98), same fixed height (~244px showing 6+ items).
    function buildCustomDD(role, placeholder, selected, optionsHtml, allowFuture) {
        const isFilled = selected !== undefined && selected !== null && selected !== '';
        const displayVal = isFilled ? escHtml(String(selected)) : escHtml(placeholder);
        // Year is TYPEABLE — user can either click an option from the panel
        // OR type directly (4-digit year). As they type, the panel filters to
        // matching prefixes. On blur/Enter the value is validated and committed.
        // Invalid values (future birth date, future issue date, out-of-range)
        // get the .tl-dd-invalid class for the visible red border.
        //
        // 2026-05-12 — Year placeholder uses RED asterisk `*` (canonical .tl-req)
        // as the required-field marker, not plain text. The * sits OUTSIDE the
        // contenteditable span so it stays visible whether the year is empty
        // (showing "Year *") or filled (showing "2026 *"). Mirrors the design
        // system pattern used in record.html (line 5520) for conditional dates.
        if (role === 'year') {
            // Strip any literal "*" from the passed-in placeholder string —
            // we render it via .tl-req span instead (red, 600).
            const cleanPlaceholder = String(placeholder || 'Year').replace(/\*/g, '').trim();
            return ''
                + '<div class="tl-dd-trigger tl-dd-trigger-typeable" onclick="tlOpenDateDD(this)" data-tl-future="' + (allowFuture ? '1' : '0') + '">'
                +   '<span class="tl-dd-value' + (isFilled ? '' : ' is-placeholder') + '"'
                +     ' contenteditable="true" spellcheck="false"'
                +     ' inputmode="numeric" data-placeholder="' + escHtml(cleanPlaceholder) + '"'
                +     ' onkeydown="tlYearKeyDown(event,this)" oninput="tlYearTypeFilter(this)"'
                +     ' onblur="tlYearTypeCommit(this)"'
                +     ' onfocus="tlYearFocus(this)">' + (isFilled ? escHtml(String(selected)) : '') + '</span>'
                +   '<span class="tl-req" aria-hidden="true">*</span>'
                +   '<span class="tl-dd-chevron"></span>'
                + '</div>'
                + '<div class="tl-dd-panel" role="listbox">' + optionsHtml + '</div>'
                + '<input type="hidden" class="tl-' + role + '" value="' + (isFilled ? escHtml(String(selected)) : '') + '">';
        }
        // Month/Day stay click-only dropdowns.
        return ''
            + '<div class="tl-dd-trigger" onclick="tlOpenDateDD(this)">'
            +   '<span class="tl-dd-value' + (isFilled ? '' : ' is-placeholder') + '">' + displayVal + '</span>'
            +   '<span class="tl-dd-chevron"></span>'
            + '</div>'
            + '<div class="tl-dd-panel" role="listbox">' + optionsHtml + '</div>'
            + '<input type="hidden" class="tl-' + role + '" value="' + (isFilled ? escHtml(String(selected)) : '') + '">';
    }
    // Year-input event handlers — block non-digits, filter panel on input,
    // commit on blur/Enter. Validation enforces allowFuture rule (no future
    // birth/issue dates, no past expiry dates) and the visible year range.
    window.tlYearKeyDown = function(ev, span) {
        // Allow control keys (backspace, arrows, tab, enter, escape, delete)
        var allowed = ['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab','Enter','Escape','Home','End'];
        if (allowed.indexOf(ev.key) !== -1) {
            if (ev.key === 'Enter') { ev.preventDefault(); span.blur(); }
            if (ev.key === 'Escape') { ev.preventDefault(); span.blur(); }
            return;
        }
        // Digits only — and cap length at 4 characters.
        if (!/^\d$/.test(ev.key)) { ev.preventDefault(); return; }
        if ((span.textContent || '').length >= 4 && !window.getSelection().toString()) {
            ev.preventDefault();
        }
    };
    window.tlYearFocus = function(span) {
        // Opening the panel on focus mirrors click behaviour. Select all
        // current text so a user typing replaces (doesn't append) the value.
        var wrap = span.closest('.tl-date-sel-wrap');
        if (wrap && !wrap.classList.contains('open')) wrap.classList.add('open');
        // Select-all on focus.
        try {
            var range = document.createRange();
            range.selectNodeContents(span);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } catch(_e) {}
    };
    window.tlYearTypeFilter = function(span) {
        var wrap = span.closest('.tl-date-sel-wrap');
        if (!wrap) return;
        var panel = wrap.querySelector('.tl-dd-panel');
        if (!panel) return;
        // Filter visible options by prefix of the typed value. Empty input
        // shows everything.
        var typed = (span.textContent || '').trim();
        var opts = panel.querySelectorAll('.tl-dd-option');
        opts.forEach(function(o) {
            var v = o.getAttribute('data-val') || o.textContent;
            o.style.display = (!typed || v.indexOf(typed) === 0) ? '' : 'none';
        });
        // Open the panel so the filtered list is visible.
        wrap.classList.add('open');
        // Live placeholder swap.
        if (typed) span.classList.remove('is-placeholder');
        else span.classList.add('is-placeholder');
    };
    window.tlYearTypeCommit = function(span) {
        var wrap = span.closest('.tl-date-sel-wrap');
        if (!wrap) return;
        var trigger = span.closest('.tl-dd-trigger');
        var allowFuture = trigger && trigger.getAttribute('data-tl-future') === '1';
        var hidden = wrap.querySelector('input[type="hidden"]');
        var raw = (span.textContent || '').trim();
        // Empty → clear and revert to placeholder.
        if (!raw) {
            if (hidden) hidden.value = '';
            span.textContent = '';
            span.classList.add('is-placeholder');
            wrap.classList.remove('tl-dd-invalid');
            wrap.classList.remove('open');
            // Reset filter for next open.
            wrap.querySelectorAll('.tl-dd-option').forEach(function(o) { o.style.display = ''; });
            return;
        }
        // Must be 4 digits.
        if (!/^\d{4}$/.test(raw)) {
            wrap.classList.add('tl-dd-invalid');
            wrap.classList.remove('open');
            return;
        }
        var yr = parseInt(raw, 10);
        var minY = allowFuture ? TODAY_Y : 1900;
        var maxY = allowFuture ? (CURRENT_YEAR + 30) : TODAY_Y;
        if (yr < minY || yr > maxY) {
            wrap.classList.add('tl-dd-invalid');
            wrap.classList.remove('open');
            return;
        }
        // Valid → commit value.
        wrap.classList.remove('tl-dd-invalid');
        if (hidden) hidden.value = String(yr);
        span.textContent = String(yr);
        span.classList.remove('is-placeholder');
        // Mark selected option for visual sync; clear other selecteds.
        wrap.querySelectorAll('.tl-dd-option.selected').forEach(function(o) { o.classList.remove('selected'); });
        var match = wrap.querySelector('.tl-dd-option[data-val="' + yr + '"]');
        if (match) match.classList.add('selected');
        // Reset filter so next open shows all options.
        wrap.querySelectorAll('.tl-dd-option').forEach(function(o) { o.style.display = ''; });
        wrap.classList.remove('open');
        // Cascade: month/day re-filter — fire a synthetic tlPickDate logic.
        var row = wrap.closest('.tl-date-row');
        if (!row) return;
        var monthWrap = row.querySelector('.tl-sel-month');
        var dayWrap = row.querySelector('.tl-sel-day');
        var mVal = monthWrap && monthWrap.querySelector('input[type="hidden"]') && monthWrap.querySelector('input[type="hidden"]').value || '';
        var dVal = dayWrap && dayWrap.querySelector('input[type="hidden"]') && dayWrap.querySelector('input[type="hidden"]').value || '';
        if (monthWrap) {
            var mPanel = monthWrap.querySelector('.tl-dd-panel');
            if (mPanel) mPanel.innerHTML = buildMonthOptionsCustom(mVal, String(yr), allowFuture);
            if (mVal && yr === TODAY_Y && !allowFuture && MONTHS.indexOf(mVal) > TODAY_M_IDX) {
                var mSpan = monthWrap.querySelector('.tl-dd-value');
                var mHidden = monthWrap.querySelector('input[type="hidden"]');
                if (mSpan) { mSpan.textContent = 'Month'; mSpan.classList.add('is-placeholder'); }
                if (mHidden) mHidden.value = '';
            }
        }
        if (dayWrap) {
            var dPanel = dayWrap.querySelector('.tl-dd-panel');
            if (dPanel) dPanel.innerHTML = buildDayOptionsCustom(dVal, String(yr), mVal, allowFuture);
        }
    };
    // Decide if this milestone can have a FUTURE date.
    // Default: no future. Only Expiry-style fields allow future.
    function tlMilestoneAllowsFuture(milestoneLabel) {
        if (!milestoneLabel) return false;
        var L = String(milestoneLabel).toLowerCase();
        // Expiry / valid-until / renewal / due dates legitimately point forward.
        return L.indexOf('expiry') !== -1 || L.indexOf('expires') !== -1
            || L.indexOf('valid until') !== -1 || L.indexOf('renewal') !== -1
            || L.indexOf('due') !== -1 || L.indexOf('next ') !== -1;
    }
    function buildDateInputs(v, hintText, milestoneLabel) {
        v = v || {};
        var allowFuture = tlMilestoneAllowsFuture(milestoneLabel);
        return ''
            + '<div class="tl-date-row" data-tl-allow-future="' + (allowFuture ? '1' : '0') + '">'
            +   '<div class="tl-date-sel-wrap tl-sel-year">'
            +     buildCustomDD('year', 'Year *', v.year || '', buildYearOptionsCustom(v.year, allowFuture), allowFuture)
            +   '</div>'
            +   '<div class="tl-date-sel-wrap tl-sel-month">'
            +     buildCustomDD('month', 'Month', v.month || '', buildMonthOptionsCustom(v.month, v.year, allowFuture), allowFuture)
            +   '</div>'
            +   '<div class="tl-date-sel-wrap tl-sel-day">'
            +     buildCustomDD('day', 'Day', v.day || '', buildDayOptionsCustom(v.day, v.year, v.month, allowFuture), allowFuture)
            +   '</div>'
            + '</div>'
            + (hintText ? '<div class="tl-date-hint">' + escHtml(hintText) + '</div>' : '')
            + '<textarea class="tl-notes-input" rows="1" placeholder="Add details or notes about this milestone…">' + escHtml(v.notes || '') + '</textarea>'
            + '<div class="tl-notes-label">Details &amp; Notes</div>';
    }

    // Toggle dropdown panel open/closed; close other open panels first.
    window.tlOpenDateDD = function(trigger) {
        const wrap = trigger.parentElement;
        const open = wrap.classList.contains('open');
        // Close all other open dropdowns
        document.querySelectorAll('.tl-date-sel-wrap.open').forEach(function(w) { if (w !== wrap) w.classList.remove('open'); });
        if (open) wrap.classList.remove('open');
        else wrap.classList.add('open');
    };

    // User clicked a dropdown option — set value, update visible text, close panel,
    // AND re-render adjacent panels (month/day) so future-date filtering applies
    // the moment a year is selected. E.g. picking year=2026 immediately caps the
    // month dropdown to current month.
    window.tlPickDate = function(opt) {
        const wrap = opt.closest('.tl-date-sel-wrap');
        if (!wrap) return;
        const val = opt.getAttribute('data-val') || '';
        const valueSpan = wrap.querySelector('.tl-dd-value');
        const hidden = wrap.querySelector('input[type="hidden"]');
        if (valueSpan) {
            valueSpan.textContent = val;
            valueSpan.classList.remove('is-placeholder');
        }
        if (hidden) hidden.value = val;
        wrap.querySelectorAll('.tl-dd-option.selected').forEach(function(o) { o.classList.remove('selected'); });
        opt.classList.add('selected');
        wrap.classList.remove('open');

        // Cascade: re-render dependent panels in the same row.
        const row = wrap.closest('.tl-date-row');
        if (!row) return;
        const allowFuture = row.getAttribute('data-tl-allow-future') === '1';
        const yearWrap  = row.querySelector('.tl-sel-year');
        const monthWrap = row.querySelector('.tl-sel-month');
        const dayWrap   = row.querySelector('.tl-sel-day');
        const yVal = yearWrap  && yearWrap.querySelector('input[type="hidden"]')  && yearWrap.querySelector('input[type="hidden"]').value  || '';
        const mVal = monthWrap && monthWrap.querySelector('input[type="hidden"]') && monthWrap.querySelector('input[type="hidden"]').value || '';
        const dVal = dayWrap   && dayWrap.querySelector('input[type="hidden"]')   && dayWrap.querySelector('input[type="hidden"]').value   || '';
        // Always rebuild Month + Day panels so they respect the new Year/Month value.
        if (monthWrap) {
            const panel = monthWrap.querySelector('.tl-dd-panel');
            if (panel) panel.innerHTML = buildMonthOptionsCustom(mVal, yVal, allowFuture);
            // If current month value is now invalid (out of range), clear it.
            if (mVal && parseInt(yVal, 10) === TODAY_Y && !allowFuture && MONTHS.indexOf(mVal) > TODAY_M_IDX) {
                const mSpan = monthWrap.querySelector('.tl-dd-value');
                const mHidden = monthWrap.querySelector('input[type="hidden"]');
                if (mSpan) { mSpan.textContent = 'Month'; mSpan.classList.add('is-placeholder'); }
                if (mHidden) mHidden.value = '';
            }
        }
        if (dayWrap) {
            const panel = dayWrap.querySelector('.tl-dd-panel');
            if (panel) panel.innerHTML = buildDayOptionsCustom(dVal, yVal, mVal, allowFuture);
            // Clear day if it's now beyond today's date in current year/month.
            if (dVal && parseInt(yVal, 10) === TODAY_Y && MONTHS.indexOf(mVal) === TODAY_M_IDX && !allowFuture && parseInt(dVal, 10) > TODAY_D) {
                const dSpan = dayWrap.querySelector('.tl-dd-value');
                const dHidden = dayWrap.querySelector('input[type="hidden"]');
                if (dSpan) { dSpan.textContent = 'Day'; dSpan.classList.add('is-placeholder'); }
                if (dHidden) dHidden.value = '';
            }
        }
    };

    // Click outside any dropdown closes all open panels.
    document.addEventListener('click', function(e) {
        if (e.target.closest && e.target.closest('.tl-date-sel-wrap')) return;
        document.querySelectorAll('.tl-date-sel-wrap.open').forEach(function(w) { w.classList.remove('open'); });
    });

    // Fixed (default) milestone block — label + X-clear + date row + notes.
    // Always visible (no expand/collapse toggle — matches fr- pattern).
    function buildFixedMilestoneBlock(label, value) {
        const v = value || {};
        const filled = !!(v.year || v.month || v.day || v.notes);
        return ''
            + '<div class="tl-milestone tl-milestone-fixed' + (filled ? ' has-data' : '') + '" data-tl-label="' + escHtml(label) + '">'
            +   '<div class="tl-milestone-head">'
            +     '<span class="tl-milestone-title">' + escHtml(label) + '</span>'
            +     '<button type="button" class="tl-clear-btn" aria-label="Clear" onclick="tlClearMilestone(this)" title="Clear date">'
            +       '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 2l8 8M10 2l-8 8"/></svg>'
            +     '</button>'
            +   '</div>'
            +   buildDateInputs(v, hintFor(label), label)
            + '</div>';
    }

    function buildCustomMilestoneBlock(value) {
        const v = value || {};
        // Custom milestones — user types the label themselves. Pass the current
        // label so future-allowed detection works at render time. (When user
        // edits the label later, re-detection happens via tlOnCustomLabelChange.)
        return ''
            + '<div class="tl-milestone tl-milestone-custom has-data">'
            +   '<div class="tl-milestone-head">'
            +     '<input class="tl-custom-label-input" type="text" placeholder="Event label (e.g. Promotion, Joined Board)" value="' + escHtml(v.label || '') + '" oninput="tlOnCustomLabelChange(this)">'
            +     '<button type="button" class="tl-clear-btn" aria-label="Remove milestone" onclick="this.closest(\'.tl-milestone\').remove()" title="Remove milestone">'
            +       '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 2l8 8M10 2l-8 8"/></svg>'
            +     '</button>'
            +   '</div>'
            +   buildDateInputs(v, '', v.label || '')
            + '</div>';
    }
    // When user types a custom milestone label, re-evaluate allowFuture and
    // rebuild the Year/Month/Day panels so an "Expiry" custom label switches
    // the dropdowns to future range live.
    window.tlOnCustomLabelChange = function(input) {
        var block = input && input.closest('.tl-milestone-custom');
        if (!block) return;
        var label = (input.value || '').trim();
        var allowFuture = tlMilestoneAllowsFuture(label);
        var row = block.querySelector('.tl-date-row');
        if (!row) return;
        row.setAttribute('data-tl-allow-future', allowFuture ? '1' : '0');
        var yearWrap  = row.querySelector('.tl-sel-year');
        var monthWrap = row.querySelector('.tl-sel-month');
        var dayWrap   = row.querySelector('.tl-sel-day');
        var yVal = yearWrap  && yearWrap.querySelector('input[type="hidden"]')  && yearWrap.querySelector('input[type="hidden"]').value  || '';
        var mVal = monthWrap && monthWrap.querySelector('input[type="hidden"]') && monthWrap.querySelector('input[type="hidden"]').value || '';
        var dVal = dayWrap   && dayWrap.querySelector('input[type="hidden"]')   && dayWrap.querySelector('input[type="hidden"]').value   || '';
        if (yearWrap) {
            var trigger = yearWrap.querySelector('.tl-dd-trigger');
            if (trigger) trigger.setAttribute('data-tl-future', allowFuture ? '1' : '0');
            var yp = yearWrap.querySelector('.tl-dd-panel');
            if (yp) yp.innerHTML = buildYearOptionsCustom(yVal, allowFuture);
        }
        if (monthWrap) {
            var mp = monthWrap.querySelector('.tl-dd-panel');
            if (mp) mp.innerHTML = buildMonthOptionsCustom(mVal, yVal, allowFuture);
        }
        if (dayWrap) {
            var dp = dayWrap.querySelector('.tl-dd-panel');
            if (dp) dp.innerHTML = buildDayOptionsCustom(dVal, yVal, mVal, allowFuture);
        }
    };

    // X (cancel) handler — collapses expanded milestone back to "+ Add [Label]" pill.
    // If milestone has any data filled in, shows confirmation popup before discarding.
    // Custom milestones (no fixed label) just remove without recreating a pill.
    window.tlClearMilestone = function(btn) {
        const block = btn && btn.closest('.tl-milestone');
        if (!block) return;
        const isFixed = block.classList.contains('tl-milestone-fixed');
        const label = block.getAttribute('data-tl-label') || '';
        // Detect if any data has been entered
        let hasData = false;
        block.querySelectorAll('select').forEach(function(s) { if (s.value) hasData = true; });
        const notes = block.querySelector('.tl-notes-input');
        if (notes && notes.value.trim()) hasData = true;
        const customLabelInput = block.querySelector('.tl-custom-label-input');
        if (customLabelInput && customLabelInput.value.trim()) hasData = true;

        const collapseToPill = function() {
            const section = block.closest('.tl-section');
            if (!section) { block.remove(); return; }
            if (isFixed && label) {
                // Re-insert "+ Add [Label]" pill in the milestone's place
                const pill = document.createElement('button');
                pill.type = 'button';
                pill.className = 'tl-add-btn';
                pill.setAttribute('data-tl-add-label', label);
                pill.setAttribute('onclick', 'tlAddPredefinedDate(this)');
                pill.innerHTML = '<span class="tl-add-circle"></span><span class="tl-add-label">Add ' + escHtml(label) + '</span>';
                block.parentNode.insertBefore(pill, block);
            }
            block.remove();
        };

        if (hasData && typeof window.showSystemPopup === 'function') {
            window.showSystemPopup({
                title: 'Discard milestone?',
                body: 'You have entered data for this milestone. Closing will discard it.',
                actionLabel: 'Discard',
                discardLabel: 'Cancel',
                onAction: collapseToPill,
                onDiscard: function() { /* user cancelled the discard — do nothing */ }
            });
        } else {
            collapseToPill();
        }
    };

    // Add Custom Date click handler — inserts a new custom milestone row above
    // the Add button.
    window.tlAddCustomDate = function(btn) {
        const section = btn && btn.closest('.tl-section');
        if (!section) return;
        const wrap = document.createElement('div');
        wrap.innerHTML = buildCustomMilestoneBlock({});
        section.insertBefore(wrap.firstElementChild, btn);
        const labelInput = btn.previousElementSibling && btn.previousElementSibling.querySelector('.tl-custom-label-input');
        if (labelInput) setTimeout(function() { labelInput.focus(); }, 50);
    };

    // Add Predefined Date click handler — replaces the "+ Add [Label]" pill
    // with an empty fixed milestone block for that label, ready for input.
    // Used in progressive disclosure: predefined milestones not yet populated
    // appear as Add pills until clicked.
    window.tlAddPredefinedDate = function(btn) {
        const label = btn && btn.getAttribute('data-tl-add-label');
        if (!label) return;
        const section = btn.closest('.tl-section');
        if (!section) return;
        const wrap = document.createElement('div');
        wrap.innerHTML = buildFixedMilestoneBlock(label, {});
        const block = wrap.firstElementChild;
        section.insertBefore(block, btn);
        btn.remove();
        // Focus the year select for immediate input
        const yearSel = block.querySelector('.tl-year');
        if (yearSel) setTimeout(function() { yearSel.focus(); }, 50);
    };

    // Map an accordion-section / containing element to a cardKey for legacy
    // hardcoded entries whose data-entry has no .cardKey.
    const ACCORDION_TITLE_TO_CARDKEY = {
        'essential info': 'essential',
        'family & relationships': 'family',
        'medical info': 'medical',
        'medical info & emergency': 'medical',
        'education': 'education',
        'employment & affiliations': 'employment',
        'employment': 'employment',
        'beliefs, hobbies & interests': 'beliefs',
        'beliefs & interests': 'beliefs'
    };
    function resolveCardKeyFromContext(section) {
        if (!section) return '';
        const acc = section.closest && section.closest('.accordion-section');
        if (acc) {
            const ds = acc.getAttribute('data-section') || acc.getAttribute('data-card') || '';
            if (ds) return ds;
            const title = (acc.querySelector('.accordion-title')?.textContent || '').toLowerCase().trim();
            if (ACCORDION_TITLE_TO_CARDKEY[title]) return ACCORDION_TITLE_TO_CARDKEY[title];
        }
        return '';
    }

    /**
     * Mount timeline UI inside the .tl-section of a form / expand body.
     * Reads existing data from data-tl-data attribute on the section.
     */
    window.tlMountTimeline = function(container, cardKey, category) {
        if (!container) return;
        const section = container.querySelector ? container.querySelector('.tl-section') : null;
        if (!section) return;
        let existing = [];
        try {
            const raw = section.getAttribute('data-tl-data') || section.getAttribute('data-timeline') || '';
            if (raw) existing = JSON.parse(raw.replace(/&quot;/g, '"'));
            if (!Array.isArray(existing)) existing = [];
        } catch (e) { existing = []; }
        if (!cardKey) cardKey = resolveCardKeyFromContext(section);

        const fixedLabels = MILESTONES_BY_CARD[cardKey] || [];
        // Progressive disclosure (XD-locked semantic): show only POPULATED
        // milestones + "+ Add [Next]" pills for unfilled predefined ones.
        //   · Each existing entry's milestone (with year/month/day/notes) →
        //     rendered as a full milestone block (.tl-milestone-fixed)
        //   · Each predefined milestone NOT YET in `existing` → rendered as
        //     "+ Add [Name]" pill button (click expands into milestone block)
        //   · Existing custom milestones (label not in fixed list) → rendered
        //     as full custom milestone block
        //   · Always-on "+ Add Custom Date" pill at the very end
        const populatedFixedLabels = existing
            .filter(function(t) { return t && fixedLabels.indexOf(t.label) !== -1; })
            .map(function(t) { return t.label; });
        const fixedHtml = fixedLabels
            .filter(function(label) { return populatedFixedLabels.indexOf(label) !== -1; })
            .map(function(label) {
                const found = existing.find(function(t) { return t && t.label === label; });
                return buildFixedMilestoneBlock(label, found);
            }).join('');
        const customExisting = existing.filter(function(t) {
            return t && t.label && fixedLabels.indexOf(t.label) === -1;
        });
        const customHtml = customExisting.map(buildCustomMilestoneBlock).join('');
        // "+ Add [Next]" pill for each predefined milestone not yet populated
        const unfilledLabels = fixedLabels.filter(function(label) {
            return populatedFixedLabels.indexOf(label) === -1;
        });
        const addNextHtml = unfilledLabels.map(function(label) {
            return ''
                + '<button type="button" class="tl-add-btn" data-tl-add-label="' + escHtml(label) + '" onclick="tlAddPredefinedDate(this)">'
                +   '<span class="tl-add-circle"></span>'
                +   '<span class="tl-add-label">Add ' + escHtml(label) + '</span>'
                + '</button>';
        }).join('');
        // Always-on Custom Date pill at the bottom
        const addCustomBtn = ''
            + '<button type="button" class="tl-add-btn" onclick="tlAddCustomDate(this)">'
            +   '<span class="tl-add-circle"></span>'
            +   '<span class="tl-add-label">Add Custom Date</span>'
            + '</button>';

        section.innerHTML = fixedHtml + customHtml + addNextHtml + addCustomBtn;
    };

    /**
     * Read all milestone values out of the form/expand body's .tl-section.
     */
    window.tlReadValues = function(container) {
        if (!container) return [];
        const section = container.querySelector ? container.querySelector('.tl-section') : null;
        if (!section) return [];
        const blocks = section.querySelectorAll('.tl-milestone');
        const out = [];
        for (let i = 0; i < blocks.length; i++) {
            const m = blocks[i];
            const isCustom = m.classList.contains('tl-milestone-custom');
            const label = isCustom
                ? ((m.querySelector('.tl-custom-label-input') || {}).value || '').trim()
                : (m.getAttribute('data-tl-label') || '');
            const year  = ((m.querySelector('.tl-year')  || {}).value || '').trim();
            const month = ((m.querySelector('.tl-month') || {}).value || '').trim();
            const day   = ((m.querySelector('.tl-day')   || {}).value || '').trim();
            const notes = ((m.querySelector('.tl-notes-input') || {}).value || '').trim();
            if (!label) continue;
            if (!year && !month && !day && !notes) continue;
            out.push({ label: label, year: year, month: month, day: day, notes: notes });
        }
        return out;
    };

    /**
     * Render read-mode HTML for a timeline. Used in view mode of expand body
     * and in any aggregator that displays milestones inline. Matches the
     * canonical .fr-timeline-item read-mode pattern (wide pad, 600 16/24
     * date label, note box with 1px border + radius 20).
     */
    window.tlReadModeHtml = function(timeline) {
        if (!Array.isArray(timeline) || !timeline.length) return '';
        const formatDate = function(m) {
            // If a pre-formatted .value already exists (legacy seeds OR
            // saveEntryEdit-derived format "Mar 15, 2018"), use it as-is.
            if (m.value) return m.value;
            // Otherwise compose from parts. Canonical format:
            //   month + day → "Mar 15, 2028"   month-only → "Mar 2028"
            //   year-only → "2028"
            if (m.month && m.day && m.year) return `${m.month} ${m.day}, ${m.year}`;
            if (m.month && m.year) return `${m.month} ${m.year}`;
            if (m.year) return String(m.year);
            return '';
        };
        // Per XD: milestone label + date are ONE line ("Start Date - Oct 14, 2000")
        // — NOT two separate rows. Format: [label] - [formatted date].
        const items = timeline.map(function(m) {
            const dateStr = formatDate(m);
            const headLine = (m.label || '') + (dateStr ? ' - ' + dateStr : '');
            return ''
                + '<div class="tl-read-item">'
                +   '<div class="tl-read-date">' + escHtml(headLine) + '</div>'
                +   (m.notes
                        ? '<div class="tl-read-note">' + escHtml(m.notes) + '</div>'
                          + '<div class="tl-read-note-label">Details &amp; Notes</div>'
                        : '')
                + '</div>';
        }).join('');
        // Per XD: VIEW mode title is shorter ("Timeline & Milestones") —
        // the longer "Adaptive Timeline Builder - Timeline & Milestones"
        // is reserved for EDIT mode only (where the user is actively
        // building the timeline).
        return ''
            + '<div class="ee-section-title">Timeline &amp; Milestones</div>'
            + '<div class="tl-read-list">' + items + '</div>';
    };

    window.TIMELINE_MILESTONES_BY_CARD = MILESTONES_BY_CARD;
})();
