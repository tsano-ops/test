// =============================================================================
// PlanAfter — Tasks & Reminders System
// =============================================================================
//
// Per Violetka 2026-05-11 locked spec (Card IX. Tasks & Reminders):
//   - 2×2 grid Suggestions (exactly 4 visible, dynamic replacement from pool)
//   - 8 Sarah-specific personalized suggestions (covering health/career/docs)
//   - Accordion behavior on task rows (one-open-closes-other)
//   - Complete flow → move to Completed Tasks (faded + green check)
//
// Phase 1 deliverables. Phases 2-5 (Add Task form, Send Invitation, Edit mode,
// state machine) coming in subsequent sessions.
// =============================================================================

(function() {
    'use strict';

    // ─────────────────────────────────────────────────────────────────────
    // Suggestion Pool — 8 Sarah-specific personalized tasks (canonical seed
    // per spec section 3 of Card IX). Pool size ≥ 6 per spec; we ship 8.
    // ─────────────────────────────────────────────────────────────────────
    window.TASK_SUGGESTIONS_POOL = window.TASK_SUGGESTIONS_POOL || [
        {
            id: 'sug-passport-validity',
            tag: 'JUST',
            tagColor: '#FF2D55',
            title: 'Verify Your US Passport travel validity',
            meta: 'Passport',
            dueDate: 'Aug 14, 2026',
            reason: 'While your passport expires in Oct 2028, many international destinations require at least 6 months of validity. This check ensures you are ready for any upcoming travel without last-minute stress.',
            priority: 'Medium',
            assignedTo: 'sj'
        },
        {
            id: 'sug-neuro-check',
            tag: 'HEALTH',
            tagColor: '#FF2D55',
            title: 'Annual Neurological Health Check-up',
            meta: 'Health Maintenance',
            dueDate: 'Mar 17, 2026',
            reason: 'Essential for managing your Epilepsy and reviewing the effectiveness of your Levetiracetam prescription.',
            priority: 'High',
            assignedTo: 'sj'
        },
        {
            id: 'sug-pca-cert',
            tag: 'PROFESSIONAL',
            tagColor: '#FF9500',
            title: 'Update PCA Professional Certification',
            meta: 'Career',
            dueDate: 'May 15, 2026',
            reason: "Your Graphic Design certification from Paris College of Art hasn't been updated since 2000. A refresh will align your credentials with your current role as CEO.",
            priority: 'Medium',
            assignedTo: 'sj'
        },
        {
            id: 'sug-tax-status',
            tag: 'LEGAL',
            tagColor: '#FF2D55',
            title: 'Verify Your US-UK-CA Tax Status',
            meta: 'Triple Citizenship',
            dueDate: 'Apr 5, 2026',
            reason: 'Holding triple citizenship (USA, Canada, UK) while residing in London creates complex tax obligations. This ensures compliance across all three jurisdictions.',
            priority: 'High',
            assignedTo: 'sj'
        },
        {
            id: 'sug-icd-audit',
            tag: 'HEALTH',
            tagColor: '#FF2D55',
            title: 'ICD/Pacemaker Function Audit',
            meta: 'Medical Device',
            dueDate: 'Jun 1, 2026',
            reason: 'Routine maintenance for your heart device to ensure battery longevity and optimal pacing performance.',
            priority: 'High',
            assignedTo: 'sj'
        },
        {
            id: 'sug-liability-insurance',
            tag: 'CAREER',
            tagColor: '#FF9500',
            title: 'Review CEO Liability Insurance Policy',
            meta: 'Executive Protection',
            dueDate: 'Jul 10, 2026',
            reason: 'As the Founder and CEO of Johnson & Johnson, you need to ensure your executive protection and liability coverage are updated for the new fiscal quarter.',
            priority: 'Medium',
            assignedTo: 'sj'
        },
        {
            id: 'sug-epipen',
            tag: 'EMERGENCY',
            tagColor: '#FF2D55',
            title: 'Check Severe Allergy Protocol (EpiPen)',
            meta: 'Severe Allergy',
            dueDate: 'Feb 24, 2026',
            reason: 'Given your severe peanut allergy, it is critical to verify the expiry date of your emergency medication and ensure your surroundings are aware of the protocol.',
            priority: 'High',
            assignedTo: 'sj'
        },
        {
            id: 'sug-asthma',
            tag: 'HEALTH',
            tagColor: '#61C553',
            title: 'Schedule Annual Asthma Review',
            meta: 'Respiratory Health',
            dueDate: 'Sep 15, 2026',
            reason: 'To monitor lung function and manage your Albuterol usage before the start of the autumn season.',
            priority: 'Medium',
            assignedTo: 'sj'
        }
    ];

    // Persist dismissed/accepted suggestion ids so they don't re-appear after
    // page reload. Per spec section 3: removed suggestions replaced by next
    // item from pool; accepted suggestions become real tasks.
    // Bumped to v2 on 2026-05-11 to invalidate any stale dismiss/accept state
    // from earlier tests so all 8 Sarah-specific suggestions surface fresh.
    window.taskSuggestionsState = window.taskSuggestionsState || (function() {
        try {
            const raw = localStorage.getItem('planafter:taskSuggestionsState:v2');
            return raw ? JSON.parse(raw) : { dismissed: [], accepted: [] };
        } catch (_) { return { dismissed: [], accepted: [] }; }
    })();
    function persistState() {
        try { localStorage.setItem('planafter:taskSuggestionsState:v2', JSON.stringify(window.taskSuggestionsState)); }
        catch (_) {}
    }

    // Get the next 4 suggestions to display (filter dismissed + accepted).
    function getActiveSuggestions() {
        const dismissed = new Set(window.taskSuggestionsState.dismissed || []);
        const accepted = new Set(window.taskSuggestionsState.accepted || []);
        return window.TASK_SUGGESTIONS_POOL.filter(function(s) {
            return !dismissed.has(s.id) && !accepted.has(s.id);
        }).slice(0, 4); // exactly 4 visible per spec
    }
    window.getActiveTaskSuggestions = getActiveSuggestions;

    function escHtml(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, function(c) {
            return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
        });
    }

    // Render the 2×2 grid of suggestion cards into the existing .suggestions-row
    // container (inside Tasks & Reminders card on profile.html).
    // Per Violetka 2026-05-11: if the .suggestions-row has data-static-suggestions,
    // the hardcoded HTML is the source of truth (don't replace).
    function renderSuggestionsGrid() {
        const row = document.querySelector('.suggestions-row');
        if (!row) return;
        if (row.getAttribute('data-static-suggestions') === 'true') return;
        const suggestions = getActiveSuggestions();
        if (!suggestions.length) {
            row.innerHTML = '<div class="task-suggestions-empty">No more suggestions for now. Add tasks manually or check back later.</div>';
            return;
        }
        const tiles = suggestions.map(function(s) {
            return ''
                + '<div class="suggestion-card" data-suggestion-id="' + s.id + '">'
                +   '<div class="suggestion-priority"><div class="dot" style="background:' + s.tagColor + '"></div>'
                +     '<span style="color:' + s.tagColor + '">' + escHtml(s.tag) + '</span>'
                +   '</div>'
                +   '<div class="suggestion-title">' + escHtml(s.title) + '</div>'
                +   '<div class="suggestion-meta">' + escHtml(s.meta) + '<br>Due: ' + escHtml(s.dueDate) + '</div>'
                +   '<div class="suggestion-actions">'
                +     '<button class="suggestion-btn" onclick="paAcceptTaskSuggestion(\'' + s.id + '\')">Accept</button>'
                +     '<button class="suggestion-btn outline" onclick="paRemoveTaskSuggestion(\'' + s.id + '\')">Remove</button>'
                +   '</div>'
                + '</div>';
        }).join('');
        row.innerHTML = tiles;
    }
    window.paRenderTaskSuggestions = renderSuggestionsGrid;

    // Accept → create a real Active Task row (Phase 1 simple version; Phase 5
    // will pre-fill the canonical Add Task form instead).
    window.paAcceptTaskSuggestion = function paAcceptTaskSuggestion(suggestionId) {
        const s = window.TASK_SUGGESTIONS_POOL.find(function(x) { return x.id === suggestionId; });
        if (!s) return;
        // Mark accepted
        window.taskSuggestionsState.accepted = window.taskSuggestionsState.accepted || [];
        if (window.taskSuggestionsState.accepted.indexOf(suggestionId) === -1) {
            window.taskSuggestionsState.accepted.push(suggestionId);
        }
        persistState();
        // Create real task row in Active Tasks
        const tasksCard = findTasksCard();
        if (tasksCard) {
            const priorityColor = s.priority === 'High' ? '#E53935' : s.priority === 'Medium' ? '#FF9800' : '#61C553';
            const taskHtml = ''
                + '<div class="task-entry" data-task-id="' + suggestionId + '" data-task-status="active" onclick="paToggleTaskExpand(this, event)">'
                +   '<div class="task-priority-dot" style="background:' + priorityColor + '"></div>'
                +   '<div class="task-entry-info">'
                +     '<div class="task-entry-title">' + escHtml(s.title) + '</div>'
                +     '<div class="task-entry-sub">Assigned To: Sarah Johnson (You)<br>Due Date: ' + escHtml(s.dueDate) + '</div>'
                +   '</div>'
                +   '<div class="task-check" onclick="event.stopPropagation();paToggleTaskComplete(this)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></div>'
                + '</div>';
            // Insert after "Active Tasks" header
            const headers = tasksCard.querySelectorAll('.task-section-header');
            let activeHeader = null;
            headers.forEach(function(h) {
                if ((h.textContent || '').trim() === 'Active Tasks') activeHeader = h;
            });
            if (activeHeader) {
                activeHeader.insertAdjacentHTML('afterend', taskHtml);
            }
        }
        // Re-render grid to surface the next suggestion from pool
        renderSuggestionsGrid();
    };

    window.paRemoveTaskSuggestion = function paRemoveTaskSuggestion(suggestionId) {
        window.taskSuggestionsState.dismissed = window.taskSuggestionsState.dismissed || [];
        if (window.taskSuggestionsState.dismissed.indexOf(suggestionId) === -1) {
            window.taskSuggestionsState.dismissed.push(suggestionId);
        }
        persistState();
        renderSuggestionsGrid();
    };

    function findTasksCard() {
        const accordionTitles = document.querySelectorAll('.accordion-title');
        for (let i = 0; i < accordionTitles.length; i++) {
            if ((accordionTitles[i].textContent || '').trim() === 'Tasks & Reminders') {
                return accordionTitles[i].closest('.accordion-section');
            }
        }
        return null;
    }

    // ─────────────────────────────────────────────────────────────────────
    // Task Row Accordion + Complete Flow
    // ─────────────────────────────────────────────────────────────────────

    // Toggle expand/collapse on a task-entry row. Per spec: one-open-closes-other.
    // Currently Phase 1 — just toggles a class for future expanded view.
    window.paToggleTaskExpand = function paToggleTaskExpand(row, ev) {
        if (ev) {
            // Don't expand on check or menu clicks
            const target = ev.target;
            if (target.closest('.task-check')) return;
            if (target.closest('.entry-menu, .task-menu')) return;
        }
        const tasksCard = row.closest('.accordion-inner');
        if (tasksCard) {
            // Close peer task-entry rows
            tasksCard.querySelectorAll('.task-entry.expanded').forEach(function(other) {
                if (other !== row) other.classList.remove('expanded');
            });
        }
        row.classList.toggle('expanded');
    };

    // Click ✓ → toggle completed state. Move row from Active Tasks to
    // Completed Tasks section per spec (or back if uncompleting).
    window.paToggleTaskComplete = function paToggleTaskComplete(checkEl) {
        const row = checkEl.closest('.task-entry');
        if (!row) return;
        const tasksCard = row.closest('.accordion-inner');
        if (!tasksCard) return;
        const isCompleted = row.getAttribute('data-task-status') === 'completed';
        if (isCompleted) {
            // Uncomplete → move back to Active Tasks
            row.setAttribute('data-task-status', 'active');
            row.classList.remove('task-completed');
            const headers = tasksCard.querySelectorAll('.task-section-header');
            let activeHeader = null;
            headers.forEach(function(h) {
                if ((h.textContent || '').trim() === 'Active Tasks') activeHeader = h;
            });
            if (activeHeader) {
                activeHeader.insertAdjacentElement('afterend', row);
            }
        } else {
            // Complete → move to Completed Tasks
            row.setAttribute('data-task-status', 'completed');
            row.classList.add('task-completed');
            const headers = tasksCard.querySelectorAll('.task-section-header');
            let completedHeader = null;
            headers.forEach(function(h) {
                if ((h.textContent || '').trim() === 'Completed Tasks') completedHeader = h;
            });
            if (completedHeader) {
                // Remove "No completed tasks yet" placeholder if present
                const placeholder = completedHeader.nextElementSibling;
                if (placeholder && placeholder.classList.contains('med-label')) {
                    placeholder.style.display = 'none';
                }
                completedHeader.insertAdjacentElement('afterend', row);
            }
        }
    };

    // ─────────────────────────────────────────────────────────────────────
    // Wire existing static task rows for accordion + complete behavior
    // ─────────────────────────────────────────────────────────────────────
    function wireStaticTaskRows() {
        document.querySelectorAll('.task-entry').forEach(function(row) {
            if (row.hasAttribute('data-wired')) return;
            row.setAttribute('data-wired', 'true');
            if (!row.hasAttribute('data-task-status')) {
                row.setAttribute('data-task-status', 'active');
            }
            row.setAttribute('onclick', 'paToggleTaskExpand(this, event)');
            const check = row.querySelector('.task-check');
            if (check && !check.hasAttribute('data-wired')) {
                check.setAttribute('data-wired', 'true');
                check.setAttribute('onclick', 'event.stopPropagation();paToggleTaskComplete(this)');
            }
        });
    }

    // ─────────────────────────────────────────────────────────────────────
    // PHASE 2 — Add Task & Reminder Form (canonical per spec section 7)
    // ─────────────────────────────────────────────────────────────────────

    // Build the Add Task form HTML. Identical pattern is used for Edit Task
    // (spec 7.3 — Add and Edit forms share the same generator).
    function buildAddTaskFormHTML(prefill) {
        prefill = prefill || {};
        const title = prefill.title || '';
        const notes = prefill.notes || '';
        return '' +
        '<div class="task-form-wrap" id="newTaskForm">' +
        '  <div class="task-form-header">' +
        '    <span class="task-form-title">About This Task Entry</span>' +
        '    <button type="button" class="task-form-close" onclick="paCancelAddTaskForm()" aria-label="Cancel">×</button>' +
        '  </div>' +
        '  <!-- Task Title (required) -->' +
        '  <div class="task-form-field">' +
        '    <input type="text" class="task-form-input" id="taskTitleInput" placeholder="Task Title*" value="' + escHtml(title) + '" aria-label="Task Title">' +
        '    <div class="task-form-label"><span class="ee-input-required">*</span>Task Entry Name</div>' +
        '  </div>' +
        '  <!-- Assigned To (required) -->' +
        '  <div class="task-form-field">' +
        '    <div class="task-form-input task-form-picker" id="taskAssignedPicker" onclick="paOpenTaskAssignedPicker(this)">' +
        '      <span class="task-form-picker-value">Sarah Johnson (Me)</span>' +
        '      <span class="task-form-chevron"></span>' +
        '    </div>' +
        '    <div class="task-form-label"><span class="ee-input-required">*</span>Assigned To</div>' +
        '    <div class="task-form-info-banner">' +
        '      <span class="task-form-info-icon">i</span>' +
        '      <span class="task-form-info-text">Select a contact (a unique Record in PlanAfter) or create a new one to delegate this task to. Changes here might affect other Records.</span>' +
        '    </div>' +
        '  </div>' +
        '  <!-- Due Date -->' +
        '  <div class="task-form-field">' +
        '    <input type="date" class="task-form-input" id="taskDueInput" aria-label="Due Date">' +
        '    <div class="task-form-label">Due Date</div>' +
        '  </div>' +
        '  <!-- Priority (visible when Assigned To = Me) -->' +
        '  <div class="task-form-field" id="taskPriorityField">' +
        '    <select class="task-form-input task-form-select" id="taskPrioritySelect" aria-label="Priority">' +
        '      <option value="">Select Priority</option>' +
        '      <option value="High">High</option>' +
        '      <option value="Medium">Medium</option>' +
        '      <option value="Low">Low</option>' +
        '    </select>' +
        '    <div class="task-form-label">Task Priority</div>' +
        '  </div>' +
        '  <!-- Repeats (visible when Assigned To = Me) -->' +
        '  <div class="task-form-field" id="taskRepeatsField">' +
        '    <select class="task-form-input task-form-select" id="taskRepeatsSelect" aria-label="Repeats" onchange="paOnRepeatsChange()">' +
        '      <option value="None">Does Not Repeat</option>' +
        '      <option value="Daily">Daily</option>' +
        '      <option value="Weekly">Weekly</option>' +
        '      <option value="Monthly">Monthly</option>' +
        '      <option value="Annually">Annually</option>' +
        '      <option value="Custom">Custom</option>' +
        '      <option value="ReminderOnDate">Reminder on Date</option>' +
        '    </select>' +
        '    <div class="task-form-label">Repeats</div>' +
        '  </div>' +
        '  <!-- Ends (conditional — visible when Repeats != None) -->' +
        '  <div class="task-form-field task-form-field-hidden" id="taskEndsField">' +
        '    <select class="task-form-input task-form-select" id="taskEndsSelect" aria-label="Ends">' +
        '      <option value="Never">Never</option>' +
        '      <option value="OnDate">On Date</option>' +
        '      <option value="AfterN">After N Occurrences</option>' +
        '    </select>' +
        '    <div class="task-form-label">Ends</div>' +
        '  </div>' +
        '  <!-- Notes & Instructions -->' +
        '  <div class="task-form-field">' +
        '    <textarea class="task-form-textarea" id="taskNotesInput" rows="4" placeholder="Brief details…" aria-label="Notes & Instructions">' + escHtml(notes) + '</textarea>' +
        '    <div class="task-form-label">Notes & Instructions</div>' +
        '  </div>' +
        '  <!-- Save row -->' +
        '  <div class="task-form-actions">' +
        '    <button type="button" class="task-form-btn task-form-btn-cancel" onclick="paCancelAddTaskForm()">Cancel</button>' +
        '    <button type="button" class="task-form-btn task-form-btn-save" onclick="paSaveAddTaskForm()">Save</button>' +
        '  </div>' +
        '</div>';
    }

    // Open the Add Task form — hide +Add button, close any open task accordions,
    // expand form in place.
    window.paOpenAddTaskForm = function paOpenAddTaskForm(prefill) {
        const tasksCard = findTasksCard();
        if (!tasksCard) return;
        // Close any open task accordions
        tasksCard.querySelectorAll('.task-entry.expanded').forEach(function(t) { t.classList.remove('expanded'); });
        // Find the +Add button container
        const addBtn = tasksCard.querySelector('.emc-add-entry-btn');
        if (!addBtn) return;
        if (tasksCard.querySelector('#newTaskForm')) return; // already open
        // Hide button + insert form before it
        addBtn.style.display = 'none';
        addBtn.insertAdjacentHTML('beforebegin', buildAddTaskFormHTML(prefill));
        // Set Due Date default = today
        const dueInput = document.getElementById('taskDueInput');
        if (dueInput) dueInput.value = new Date().toISOString().slice(0, 10);
        // Focus Title input
        setTimeout(function() {
            const titleInput = document.getElementById('taskTitleInput');
            if (titleInput) titleInput.focus();
        }, 0);
    };

    window.paCancelAddTaskForm = function paCancelAddTaskForm() {
        const form = document.getElementById('newTaskForm');
        if (form) form.remove();
        const tasksCard = findTasksCard();
        if (tasksCard) {
            const addBtn = tasksCard.querySelector('.emc-add-entry-btn');
            if (addBtn) addBtn.style.display = '';
        }
    };

    // Toggle Ends field visibility based on Repeats selection.
    window.paOnRepeatsChange = function paOnRepeatsChange() {
        const repeats = document.getElementById('taskRepeatsSelect');
        const endsField = document.getElementById('taskEndsField');
        if (!repeats || !endsField) return;
        if (repeats.value === 'None') {
            endsField.classList.add('task-form-field-hidden');
        } else {
            endsField.classList.remove('task-form-field-hidden');
        }
    };

    // Read form values + create a real task row in Active Tasks.
    window.paSaveAddTaskForm = function paSaveAddTaskForm() {
        const titleEl = document.getElementById('taskTitleInput');
        const dueEl = document.getElementById('taskDueInput');
        const priEl = document.getElementById('taskPrioritySelect');
        const repeatsEl = document.getElementById('taskRepeatsSelect');
        const notesEl = document.getElementById('taskNotesInput');
        const assigneeEl = document.querySelector('#taskAssignedPicker .task-form-picker-value');
        if (!titleEl) return;
        const title = (titleEl.value || '').trim();
        if (!title) {
            titleEl.classList.add('task-form-input-error');
            titleEl.focus();
            return;
        }
        const due = dueEl ? dueEl.value : '';
        const dueFmt = due ? new Date(due + 'T00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
        const priority = priEl ? priEl.value || 'Medium' : 'Medium';
        const repeats = repeatsEl ? repeatsEl.value : 'None';
        const notes = notesEl ? notesEl.value.trim() : '';
        const assignee = assigneeEl ? assigneeEl.textContent.trim() : 'Sarah Johnson (Me)';
        const priorityColor = priority === 'High' ? '#FF2C55' : priority === 'Medium' ? '#FF9500' : '#61C553';
        const priorityLabel = priority.toUpperCase();
        const taskId = 'task-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

        // Insert new task row after Active Tasks header
        const tasksCard = findTasksCard();
        if (!tasksCard) return;
        const headers = tasksCard.querySelectorAll('.task-section-header');
        let activeHeader = null;
        headers.forEach(function(h) {
            if ((h.textContent || '').trim() === 'Active Tasks') activeHeader = h;
        });
        if (!activeHeader) return;
        const taskHtml = '' +
            '<div class="task-entry" data-task-id="' + taskId + '" data-priority-label="' + priorityLabel + '" data-task-status="active" onclick="paToggleTaskExpand(this, event)">' +
            '  <div class="task-priority-dot" style="background:' + priorityColor + '"></div>' +
            '  <div class="task-entry-info">' +
            '    <div class="task-entry-title">' + escHtml(title) + '</div>' +
            '    <div class="task-entry-sub">' +
            '      <span class="task-sub-label">Assigned To:</span><span class="task-sub-value">' + escHtml(assignee) + '</span>' +
            (dueFmt ? '<br><span class="task-sub-label">Due Date:</span><span class="task-sub-value">' + escHtml(dueFmt) + '</span>' : '') +
            '    </div>' +
            '  </div>' +
            '  <div class="task-check" onclick="event.stopPropagation();paToggleTaskComplete(this)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></div>' +
            '</div>';
        activeHeader.insertAdjacentHTML('afterend', taskHtml);
        // Close form
        window.paCancelAddTaskForm();
    };

    window.paOpenTaskAssignedPicker = function paOpenTaskAssignedPicker(el) {
        // Phase 3 stub — opens contact picker. For now, just keeps default Sarah.
        console.log('[paOpenTaskAssignedPicker] Phase 3 will implement grouped picker (You / My Family / My Network / + Create New)');
    };

    // Wire +Add button click to open form
    function wireAddTaskButton() {
        const tasksCard = findTasksCard();
        if (!tasksCard) return;
        const addBtn = tasksCard.querySelector('.emc-add-entry-btn');
        if (!addBtn || addBtn.hasAttribute('data-task-wired')) return;
        addBtn.setAttribute('data-task-wired', 'true');
        addBtn.addEventListener('click', function() {
            window.paOpenAddTaskForm();
        });
    }

    function init() {
        try {
            console.log('[tasks.js] init running — pool size:', (window.TASK_SUGGESTIONS_POOL || []).length);
            renderSuggestionsGrid();
            wireStaticTaskRows();
            wireAddTaskButton();
            console.log('[tasks.js] init complete — suggestions row content:', document.querySelector('.suggestions-row')?.children.length, 'children');
        } catch(e) {
            console.error('[tasks.js] init error:', e);
        }
    }
    // Multi-event init — ensure tasks render no matter when script loads.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 100); });
    } else {
        setTimeout(init, 100);
    }
    // Defensive — re-run on full window load (in case other scripts ran later).
    window.addEventListener('load', function() { setTimeout(init, 50); });
})();
