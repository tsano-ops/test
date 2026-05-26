// =============================================================================
// PlanAfter — Reminder System
// =============================================================================
//
// Auto-generated reminders for entries with expiry-style milestones. Per
// Violetka 2026-05-11: every document type that can EXPIRE gets scheduled
// reminders at sensible intervals before its Expiry Date. Permanent documents
// (Birth / Death / Marriage / Citizenship / Name Change / SSN) get NO reminders.
//
// Storage model:
//   Reminders are derived from entries (no separate persistent store needed for
//   v1). Each call to paGetRemindersForRecord(personId) re-computes the list
//   from entriesStore + DOCUMENT_REMINDER_RULES. This keeps the SSOT model
//   intact — archive/delete an entry and its reminders simply vanish.
//
// Display surfaces:
//   - Header notification bell (top-right, every page)
//   - Tasks card "Auto-generated Reminders" section
//   - Entry row color badge next to date (red <30d / orange <60d / green <180d)
//   - Email stub (console.log; future backend integration)
//
// Lifecycle:
//   - Generated: on every render — computed live from entries + rules
//   - Cancelled implicitly: when entry archived / deleted / expiry removed
//   - Renewed: edit entry with new Expiry Date → reminders auto-update
//   - Dismissed: user clicks "Mark Done" → stored in window.remindersDismissed
// =============================================================================

(function() {
    'use strict';

    // Per-subcategory reminder schedule. Array of days BEFORE expiry that
    // generate a reminder task. Empty array = permanent document, no reminders.
    window.DOCUMENT_REMINDER_RULES = {
        // Expirable documents
        'Passport':                ['180', '60', '30'],
        'National ID Card':        ['90', '30'],
        'Driver’s License':   ['60', '30'],
        'Visa':                    ['90', '60', '30'],
        'Work Permit':             ['90', '60', '30'],
        'Residence Permit':        ['90', '60', '30'],
        'EU Blue Card':            ['90', '60', '30'],
        'Refugee Status Document': ['90', '30'],
        // Permanent documents (no reminders):
        'Birth Certificate':                     [],
        'Death Certificate':                     [],
        'Marriage Certificate':                  [],
        'Citizenship Certificate':               [],
        'Name Change Document':                  [],
        'Social Security / National Insurance':  [],
        // Other categories (free-form): use moderate schedule by default
        'Other':                   ['90', '30'],
        // Education
        'Professional Certification': ['90', '30'],
        // Medical — recurring vaccines / device checks (future)
    };

    // Renewal time estimates per category — used in email body + reminder text.
    window.DOCUMENT_RENEWAL_ESTIMATES = {
        'Passport':                '4–8 weeks',
        'National ID Card':        '2–4 weeks',
        'Driver’s License':   '1–2 weeks',
        'Visa':                    'varies, often 4–12 weeks',
        'Work Permit':             '4–12 weeks',
        'Residence Permit':        '4–12 weeks',
        'EU Blue Card':            '4–12 weeks',
        'Refugee Status Document': 'depends on jurisdiction',
        'Other':                   'varies',
        'Professional Certification': '2–6 weeks'
    };

    // Persist dismissed reminders (so "Mark Done" persists across reloads).
    // Keyed by `${entryId}::${triggerDays}` so each schedule slot can be
    // independently dismissed.
    window.remindersDismissed = window.remindersDismissed || (function() {
        try {
            const raw = localStorage.getItem('planafter:remindersDismissed:v1');
            return raw ? JSON.parse(raw) : {};
        } catch (_) { return {}; }
    })();
    function persistDismissed() {
        try { localStorage.setItem('planafter:remindersDismissed:v1', JSON.stringify(window.remindersDismissed)); }
        catch (_) {}
    }

    // Parse a milestone {year, month, day} into a Date or null.
    function milestoneToDate(m) {
        if (!m || !m.year) return null;
        const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        const y = parseInt(m.year, 10);
        const mi = m.month ? MONTHS.indexOf(m.month) : 0;
        const d = m.day ? parseInt(m.day, 10) : 1;
        if (isNaN(y) || mi < 0) return null;
        return new Date(y, mi, d);
    }

    // Format a Date as "Mon DD, YYYY" (canonical short date for entry rows + tasks).
    function fmtDate(date) {
        const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return MONTHS[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    }

    // Days from today to a given date (positive = future, negative = past).
    function daysFromToday(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const target = new Date(date);
        target.setHours(0, 0, 0, 0);
        return Math.round((target - today) / (1000 * 60 * 60 * 24));
    }

    // Determine severity based on days remaining.
    //   <30 days  → urgent (red)
    //   30-60     → moderate (orange)
    //   60-180    → early (green)
    //   else      → none (no badge)
    function severityFromDays(days) {
        if (days < 0)      return 'expired';
        if (days <= 30)    return 'urgent';
        if (days <= 60)    return 'moderate';
        if (days <= 180)   return 'early';
        return 'none';
    }
    window.paReminderSeverity = severityFromDays;

    // Find the Expiry-style milestone in an entry's timeline. Looks for labels
    // containing "expir" or "renewal" or "due" or "valid until".
    function findExpiryMilestone(entry) {
        if (!entry || !Array.isArray(entry.timeline)) return null;
        const m = entry.timeline.find(function(t) {
            if (!t || !t.label) return false;
            const lbl = t.label.toLowerCase();
            return /expir|renewal|due|valid until|next/.test(lbl);
        });
        return m || null;
    }
    window.paFindExpiryMilestone = findExpiryMilestone;

    // Get reminder objects for a single entry (or [] if no rules / no expiry).
    // Each reminder = { entryId, entryTitle, ownerId, subcategory, triggerDays,
    //                   dueDate, severity, dismissed, renewalEstimate }
    function getRemindersForEntry(entry) {
        if (!entry || entry.archived) return [];
        const subcat = entry.subcategory || '';
        const schedule = window.DOCUMENT_REMINDER_RULES[subcat];
        if (!Array.isArray(schedule) || !schedule.length) return [];
        const expiry = findExpiryMilestone(entry);
        const expiryDate = milestoneToDate(expiry);
        if (!expiryDate) return [];
        const renewalEstimate = window.DOCUMENT_RENEWAL_ESTIMATES[subcat] || 'varies';
        return schedule.map(function(triggerDaysStr) {
            const triggerDays = parseInt(triggerDaysStr, 10);
            const due = new Date(expiryDate);
            due.setDate(due.getDate() - triggerDays);
            const daysToTrigger = daysFromToday(due);
            const daysToExpiry = daysFromToday(expiryDate);
            const dismissKey = entry.id + '::' + triggerDays;
            return {
                id: dismissKey,
                entryId: entry.id,
                entryTitle: entry.title || '(Untitled)',
                ownerId: entry.ownerId || '',
                cardKey: entry.cardKey || '',
                subcategory: subcat,
                triggerDays: triggerDays,
                dueDate: due,
                expiryDate: expiryDate,
                daysToExpiry: daysToExpiry,
                severity: severityFromDays(daysToExpiry),
                dismissed: !!window.remindersDismissed[dismissKey],
                renewalEstimate: renewalEstimate
            };
        });
    }
    window.paGetRemindersForEntry = getRemindersForEntry;

    // All ACTIVE reminders for a record (owner + linked) — sorted by due date.
    // Active = not dismissed AND entry not archived AND severity != 'none'.
    window.paGetActiveRemindersForRecord = function paGetActiveRemindersForRecord(personId) {
        if (!Array.isArray(window.entriesStore)) return [];
        const entries = window.entriesStore.filter(function(e) {
            if (!e || e.archived) return false;
            if (e.ownerId === personId) return true;
            const related = e.relatedTo || e.linkedContactIds || [];
            return Array.isArray(related) && related.indexOf(personId) !== -1;
        });
        const all = [];
        entries.forEach(function(e) {
            getRemindersForEntry(e).forEach(function(r) {
                if (r.dismissed) return;
                if (r.severity === 'none') return;
                all.push(r);
            });
        });
        all.sort(function(a, b) { return a.dueDate - b.dueDate; });
        return all;
    };

    // Mark a reminder dismissed (Mark Done in UI). Persists to localStorage.
    window.paDismissReminder = function paDismissReminder(reminderId) {
        window.remindersDismissed[reminderId] = true;
        persistDismissed();
    };

    // Restore a dismissed reminder (rare — user undoes Mark Done).
    window.paUndismissReminder = function paUndismissReminder(reminderId) {
        delete window.remindersDismissed[reminderId];
        persistDismissed();
    };

    // Email stub — logs intent to console. Real backend integration hooks here.
    // Real implementation will POST to /api/notifications/email-reminder with
    // template + recipient + variables. For prototype: console.log only.
    window.paSendEmailReminder = function paSendEmailReminder(reminder, recipientEmail) {
        console.log('[paSendEmailReminder] STUB — would email:', {
            to: recipientEmail || '(Plan Owner email)',
            subject: 'Renewal reminder · ' + reminder.subcategory + ' expires in ' + reminder.daysToExpiry + ' days',
            body: [
                'Hi,',
                '',
                'Your ' + reminder.subcategory + ' · "' + reminder.entryTitle + '" expires on ' + fmtDate(reminder.expiryDate) + '.',
                '',
                'This document typically takes ' + reminder.renewalEstimate + ' to renew.',
                '',
                'Open in PlanAfter to view details and start your renewal.',
                '',
                'Best,',
                'PlanAfter'
            ].join('\n')
        });
    };

    // Format helper for UI components.
    window.paFmtReminderDate = fmtDate;
    window.paDaysFromToday = daysFromToday;

    // ─────────────────────────────────────────────────────────────────────
    // Integration with existing UI surfaces:
    //   - Header #notifPanel + #notifList (existing notification bell btn)
    //   - Tasks & Reminders card "Auto-generated Reminders" section
    // Per Violetka 2026-05-11: use existing surfaces, don't add a floating bell.
    // ─────────────────────────────────────────────────────────────────────

    function getCurrentRecordId() {
        const hash = (location.hash || '').replace(/^#/, '');
        return hash ? decodeURIComponent(hash) : 'sj';
    }

    // Map our severity → existing notif-panel priority class.
    function severityToPriorityClass(sev) {
        if (sev === 'urgent' || sev === 'expired') return 'priority-high';
        if (sev === 'moderate')                    return 'priority-medium';
        if (sev === 'early')                       return 'priority-low';
        return 'priority-info';
    }
    function severityToPriorityLabel(sev) {
        if (sev === 'urgent' || sev === 'expired') return 'HIGH PRIORITY';
        if (sev === 'moderate')                    return 'MEDIUM PRIORITY';
        if (sev === 'early')                       return 'LOW PRIORITY';
        return 'INFO';
    }
    function priorityLabelClass(sev) {
        if (sev === 'urgent' || sev === 'expired') return 'high';
        if (sev === 'moderate')                    return 'medium';
        if (sev === 'early')                       return 'low';
        return 'info';
    }

    // Inject reminder items into the existing #notifList. Idempotent — skips
    // if already injected (data-reminder-id attribute presence). Inserted at the
    // TOP of the list so renewal reminders are most visible.
    function injectRemindersIntoHeaderNotifs() {
        const list = document.getElementById('notifList');
        if (!list) return;
        const recordId = getCurrentRecordId();
        const reminders = (typeof window.paGetActiveRemindersForRecord === 'function')
            ? window.paGetActiveRemindersForRecord(recordId)
            : [];
        // Remove any prior reminder items (so refresh stays clean).
        list.querySelectorAll('[data-reminder-id]').forEach(function(el) { el.remove(); });
        if (!reminders.length) return;
        const html = reminders.map(function(r) {
            const sev = r.severity;
            const cls = severityToPriorityClass(sev);
            const label = severityToPriorityLabel(sev);
            const lblCls = priorityLabelClass(sev);
            const daysTxt = r.daysToExpiry < 0
                ? 'Expired ' + Math.abs(r.daysToExpiry) + ' days ago'
                : 'Due in ' + Math.max(0, r.daysToExpiry - r.triggerDays) + ' days · expires in ' + r.daysToExpiry + ' days';
            return '<div class="notif-item ' + cls + '" data-reminder-id="' + r.id + '" onclick="paBellNavigateToEntry(\'' + r.entryId + '\')">'
                 + '<div class="notif-bar"></div>'
                 + '<div class="notif-item-meta">'
                 +   '<span class="notif-priority ' + lblCls + '">' + label + '</span>'
                 +   '<div class="notif-dot-sep"></div>'
                 +   '<span class="notif-time">' + daysTxt + '</span>'
                 + '</div>'
                 + '<div class="notif-item-title">Renew ' + r.entryTitle + '</div>'
                 + '<div class="notif-item-desc">Your ' + r.subcategory + ' expires on ' + fmtDate(r.expiryDate) + '. Renewal typically takes ' + r.renewalEstimate + '.</div>'
                 + '</div>';
        }).join('');
        list.insertAdjacentHTML('afterbegin', html);
        // Update badge count + dot.
        const badge = document.getElementById('notifBadgeCount');
        if (badge) {
            const allItems = list.querySelectorAll('.notif-item').length;
            badge.textContent = String(allItems);
        }
        const dot = document.querySelector('#notifBtn .notif-dot');
        if (dot && reminders.length > 0) dot.style.display = '';
    }
    window.paRefreshHeaderReminders = injectRemindersIntoHeaderNotifs;

    // Navigation helper — find entry-row, scroll + expand.
    window.paBellNavigateToEntry = function paBellNavigateToEntry(entryId) {
        // Close header notif panel.
        if (typeof window.closeNotifications === 'function') {
            try { window.closeNotifications(); } catch (_) {}
        }
        const row = document.querySelector('.entry-row[data-entry-id="' + CSS.escape(entryId) + '"]');
        if (row) {
            row.scrollIntoView({ behavior: 'smooth', block: 'center' });
            if (typeof window.toggleEntryExpand === 'function' && !row.classList.contains('expanded')) {
                window.toggleEntryExpand(row);
            }
        }
    };

    // ─────────────────────────────────────────────────────────────────────
    // Tasks & Reminders card → Suggestions tiles (canonical pattern from spec
    // D.6.4). When an entry has an upcoming expiry, a suggestion tile appears
    // in the existing .suggestions-row. User clicks "Accept" to create a real
    // Active Task, or "Remove" to dismiss the suggestion permanently.
    // Per Violetka 2026-05-11.
    // ─────────────────────────────────────────────────────────────────────

    // Accepted reminders persisted to localStorage so they survive reloads.
    // Keyed by reminder.id (entryId::triggerDays).
    window.paAcceptedReminders = window.paAcceptedReminders || (function() {
        try {
            const raw = localStorage.getItem('planafter:acceptedReminders:v1');
            return raw ? JSON.parse(raw) : {};
        } catch (_) { return {}; }
    })();
    function persistAccepted() {
        try { localStorage.setItem('planafter:acceptedReminders:v1', JSON.stringify(window.paAcceptedReminders)); }
        catch (_) {}
    }

    function findTasksCard() {
        const accordionTitles = document.querySelectorAll('.accordion-title');
        for (let i = 0; i < accordionTitles.length; i++) {
            if ((accordionTitles[i].textContent || '').trim() === 'Tasks & Reminders') {
                return accordionTitles[i].closest('.accordion-section');
            }
        }
        return null;
    }

    // Severity → suggestion-priority color + label (matches existing AI cards).
    function severityToSuggestionColor(sev) {
        if (sev === 'urgent' || sev === 'expired') return '#FF2D55';
        if (sev === 'moderate')                    return '#FF9500';
        if (sev === 'early')                       return '#61C553';
        return '#888';
    }
    function severityToSuggestionLabel(sev) {
        if (sev === 'urgent' || sev === 'expired') return 'URGENT';
        if (sev === 'moderate')                    return 'SOON';
        if (sev === 'early')                       return 'PLAN AHEAD';
        return 'REMINDER';
    }
    // Task-entry priority dot color (matches existing Active Tasks rows).
    function severityToTaskDotColor(sev) {
        if (sev === 'urgent' || sev === 'expired') return '#E53935';
        if (sev === 'moderate')                    return '#FF9800';
        return '#61C553';
    }

    function injectRemindersIntoTasksCard() {
        const tasksCard = findTasksCard();
        if (!tasksCard) return;
        const suggestionsRow = tasksCard.querySelector('.suggestions-row');
        if (!suggestionsRow) return;

        const recordId = getCurrentRecordId();
        const reminders = (typeof window.paGetActiveRemindersForRecord === 'function')
            ? window.paGetActiveRemindersForRecord(recordId)
            : [];

        // Remove prior reminder suggestion tiles (idempotent re-render).
        suggestionsRow.querySelectorAll('[data-reminder-suggestion]').forEach(function(el) { el.remove(); });

        // Skip reminders that user has already Accepted (now a real task) or Removed.
        const pending = reminders.filter(function(r) {
            return !window.paAcceptedReminders[r.id] && !window.remindersDismissed[r.id];
        });
        if (!pending.length) return;

        // Render suggestion tiles in canonical format (.suggestion-card pattern).
        const tilesHtml = pending.map(function(r) {
            const color = severityToSuggestionColor(r.severity);
            const label = severityToSuggestionLabel(r.severity);
            const daysTxt = r.daysToExpiry < 0
                ? 'Expired ' + Math.abs(r.daysToExpiry) + ' days ago'
                : 'Due in ' + r.daysToExpiry + ' days';
            const due = fmtDate(r.dueDate);
            return ''
                + '<div class="suggestion-card" data-reminder-suggestion="' + r.id + '">'
                +   '<div class="suggestion-priority"><div class="dot" style="background:' + color + '"></div> <span style="color:' + color + '">' + label + '</span></div>'
                +   '<div class="suggestion-title">Renew ' + r.entryTitle + '</div>'
                +   '<div class="suggestion-meta">' + r.subcategory + '<br>' + daysTxt + ' · Reminder due ' + due + '</div>'
                +   '<div class="suggestion-actions">'
                +     '<button class="suggestion-btn" onclick="paAcceptReminderSuggestion(\'' + r.id + '\')">Accept</button>'
                +     '<button class="suggestion-btn outline" onclick="paRemoveReminderSuggestion(\'' + r.id + '\')">Remove</button>'
                +   '</div>'
                + '</div>';
        }).join('');
        // Append AFTER any existing static AI suggestions (so renewal suggestions
        // appear alongside / after the spec D.6.4 AI-generated tiles).
        suggestionsRow.insertAdjacentHTML('beforeend', tilesHtml);
    }
    window.paRefreshTasksCardReminders = injectRemindersIntoTasksCard;

    // Accept a suggestion → create a real Active Task row + persist accepted state
    // + remove the suggestion tile. Subsequent refreshes won't re-create the tile
    // because paAcceptedReminders[r.id] is now truthy.
    window.paAcceptReminderSuggestion = function paAcceptReminderSuggestion(reminderId) {
        const tasksCard = findTasksCard();
        if (!tasksCard) return;
        // Find the reminder object via record's active set.
        const recordId = getCurrentRecordId();
        const reminders = (typeof window.paGetActiveRemindersForRecord === 'function')
            ? window.paGetActiveRemindersForRecord(recordId)
            : [];
        const r = reminders.find(function(x) { return x.id === reminderId; });
        if (!r) return;
        // Build canonical task-entry HTML matching the existing Active Tasks pattern.
        const dotColor = severityToTaskDotColor(r.severity);
        const owner = (typeof window.peopleById === 'function') ? window.peopleById(r.ownerId) : null;
        const ownerName = (owner && owner.name) || 'Plan Owner';
        const dueStr = fmtDate(r.dueDate);
        const taskHtml = ''
            + '<div class="task-entry" data-accepted-reminder="' + reminderId + '">'
            +   '<div class="task-priority-dot" style="background:' + dotColor + '"></div>'
            +   '<div class="task-entry-info">'
            +     '<div class="task-entry-title">Renew ' + r.entryTitle + '</div>'
            +     '<div class="task-entry-sub">Assigned To: ' + ownerName + ' (You)<br>Due Date: ' + dueStr + '</div>'
            +   '</div>'
            +   '<div class="task-check" onclick="paMarkAcceptedReminderDone(\'' + reminderId + '\', this)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></div>'
            + '</div>';
        // Find the "Active Tasks" section header → insert AFTER it.
        const headers = tasksCard.querySelectorAll('.task-section-header');
        let activeHeader = null;
        headers.forEach(function(h) {
            if ((h.textContent || '').trim() === 'Active Tasks') activeHeader = h;
        });
        if (activeHeader) {
            activeHeader.insertAdjacentHTML('afterend', taskHtml);
        } else {
            tasksCard.querySelector('.accordion-inner').insertAdjacentHTML('beforeend', taskHtml);
        }
        // Persist + refresh suggestion tiles.
        window.paAcceptedReminders[reminderId] = { acceptedAt: Date.now() };
        persistAccepted();
        injectRemindersIntoTasksCard();
        injectRemindersIntoHeaderNotifs();
    };

    // Remove a suggestion (user not interested). Same as dismiss.
    window.paRemoveReminderSuggestion = function paRemoveReminderSuggestion(reminderId) {
        if (typeof window.paDismissReminder === 'function') {
            window.paDismissReminder(reminderId);
        }
        injectRemindersIntoTasksCard();
        injectRemindersIntoHeaderNotifs();
    };

    // Mark an Accepted reminder as Done (user actually renewed). Removes the
    // Active Task row and persists permanent dismissal.
    window.paMarkAcceptedReminderDone = function paMarkAcceptedReminderDone(reminderId, btn) {
        const row = btn && btn.closest('.task-entry');
        if (row) row.remove();
        if (typeof window.paDismissReminder === 'function') {
            window.paDismissReminder(reminderId);
        }
        delete window.paAcceptedReminders[reminderId];
        persistAccepted();
        injectRemindersIntoHeaderNotifs();
    };

    window.paBellDismiss = function paBellDismiss(reminderId) {
        if (typeof window.paDismissReminder === 'function') {
            window.paDismissReminder(reminderId);
        }
        if (typeof window.paRefreshHeaderReminders === 'function') window.paRefreshHeaderReminders();
        if (typeof window.paRefreshTasksCardReminders === 'function') window.paRefreshTasksCardReminders();
    };

    function refreshAllReminderSurfaces() {
        try { injectRemindersIntoHeaderNotifs(); } catch (_) {}
        try { injectRemindersIntoTasksCard(); } catch (_) {}
    }
    window.paRefreshAllReminderSurfaces = refreshAllReminderSurfaces;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            // Defer until other init scripts (people/entries seeds) finish.
            setTimeout(refreshAllReminderSurfaces, 100);
        });
    } else {
        setTimeout(refreshAllReminderSurfaces, 100);
    }
    // Hashchange (record navigation) triggers refresh of all surfaces.
    window.addEventListener('hashchange', refreshAllReminderSurfaces);
})();
