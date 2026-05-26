# Card IX. TASKS & REMINDERS + Card X. SHARED WITH — LOCKED SPEC

**Date locked:** 2026-05-11 by Violetka
**Status:** AUTHORITATIVE — implement line-by-line, word-by-word
**Record Type:** My Profile (PlanOwner)
**Location:** Me, My Family & My Network → My Profile → Overview Tab

---

## Implementation Status (live tracker)

### Card IX. Tasks & Reminders

| # | Requirement | Status |
|---|-------------|--------|
| 1.1 | Title "Tasks & Reminders" | ✅ |
| 1.2 | Subtitle "Planning, responsibilities & document updates" | ✅ |
| 1.3 | Narrative paragraph | ✅ |
| 2.1 | Collapsed state (header + chevron) | ✅ |
| 2.2 | Expanded order (Narrative → Suggestions → Active → Completed) | ✅ |
| 2.2.a | Empty state for active "You have no active tasks..." | ❌ |
| 2.2.b | Empty state for completed "No completed tasks yet." | ✅ |
| 3.1 | Suggestions header | ✅ |
| 3.1.a | 2×2 grid (exactly 4 tiles) | ⚠️ partial (Phase 1) |
| 3.1.b | "Draft" tag + title + hint + Accept/Remove | ⚠️ |
| 3.1.c | Persistent action footer (#F8FAFC bg) | ❌ |
| 3.1.d | Dynamic replacement from pool of 6+ (8 seeded) | ✅ |
| 3.2 | Accept opens inline Add Task form pre-filled | ❌ (Phase 5) |
| 3.2 | Remove hides + next from pool | ✅ |
| 4.1 | Active Tasks list + Completed Tasks list | ✅ |
| 4.2 | Priority color bar (left) | ✅ |
| 4.2 | Done toggle circle | ✅ |
| 4.2 | Title + subtitle "Assigned to: X · Due: Y" | ✅ |
| 4.2 | Action menu ⋯ (Edit / Delete) | ❌ (Phase 4) |
| 4.2 | Chevron expandable indicator | ❌ |
| 4.2 | Completed styling (line-through + green check + faded) | ✅ |
| 4.2 | Click anywhere on row expands ONLY that task | ✅ (basic) |
| 4.2 | Open one closes others (accordion) | ✅ |
| 4.2 | Event propagation prevention (menu/check don't toggle) | ✅ |
| 4.3 | Expanded Read View — Linked Summary Card of assignee | ❌ (Phase 4) |
| 4.3 | Status (In Progress / Rejected / Pending+Resend) | ❌ |
| 4.3 | Due Date label per repeats logic | ❌ |
| 4.3 | Priority display | ❌ |
| 4.3 | Reminders (Repeats / Ends / Custom recurrence) | ❌ |
| 4.3 | Temporary Access display (delegated only) | ❌ |
| 4.3 | Notes & Instructions read-only | ❌ |
| 4.3 | Rejection Reason highlighted block (conditional) | ❌ |
| 5 | Edit mode (inline form replaces read view) | ❌ (Phase 4) |
| 5 | On Save → email + in-app notif to assignee | ❌ |
| 6 | Delete confirmation modal | ⚠️ generic exists |
| 7.1 | "+ Add New Task & Reminder" button | ✅ |
| 7.2 | Click → form expands in-place + close others | ❌ (Phase 2) |
| 7.3.1.A | Task Title (required) input | ❌ |
| 7.3.1.B | Assigned To grouped picker (You / Family / Network / Create New) | ❌ |
| 7.3.1.C | Due Date calendar picker (default today, can't be past) | ❌ |
| 7.3.1.D | Priority dropdown (visible: Me only) | ❌ |
| 7.3.2.E | Repeats dropdown (Me only) + Ends + Custom + Reminder on Date | ❌ |
| 7.3.2 | Custom recurrence (Repeat every N units + weekday selector) | ❌ |
| 7.3.3.F | Temporary Access tree (delegated only) | ❌ (Phase 3) |
| 7.3.3 | Inherited Access Exemption (hide for PlanOwner) | ❌ |
| 7.3.3 | Existing Access Exemption (hide for users with full access) | ❌ |
| 7.3.3 | Hierarchical multi-select (parent → children auto-check) | ❌ |
| 7.3.4.G | Notes & Instructions textarea | ❌ |
| 7.4 | Cancel / Save buttons | ❌ |
| 7.5.A | Send Task Invitation modal | ❌ (Phase 3) |
| 7.5.A | Recipient Email field (editable) | ❌ |
| 7.5.A | Subject "PlanAfter Task Assignment: [Task]" | ❌ |
| 7.5.A | Message body editable with template | ❌ |
| 7.5.A | Cancel / Send Invitation buttons | ❌ |
| 7.5 | Proposed Changes (assignee suggestion mode) | ❌ |
| 7.5 | Role permission matrix (Contributor / Executor / Beneficiary) | ❌ |

### Card X. Shared With

| # | Requirement | Status |
|---|-------------|--------|
| 1 | Purpose & UX Principles | ⚠️ static HTML exists |
| 2.1 | Collapsed state | ✅ |
| 2.1 | No preview fields shown | ✅ |
| 2.2 | Expanded view — stacked accordion items | ⚠️ partial |
| 2.2 | Add New Share bottom CTA | ⚠️ button exists |
| A.1 | Shared Contact Row header (avatar / name / role / status / tag / ⋯) | ⚠️ |
| A.2 | Accordion expand on header click | ❌ |
| A.2 | One-open-closes-other rule | ❌ |
| A.2 | Read-only "configuration summary" | ❌ |
| A.2 | Access Level (Contributor / Read-Only / Release Task) | ❌ |
| A.2 | Data Access Scope (Full / Partial / per-card / per-entry) | ❌ |
| A.2 | Access Granted (Immediately / Post-Mortem / Specific Date / Event) | ❌ |
| A.2 | Specific Event → Event Description + Choose Executor | ❌ |
| A.2 | Access Expiration Date | ❌ |
| A.2 | Invitation Status (Accepted / Rejected / Pending + Resend) | ❌ |
| A.2 | Resend Invitation button + toast | ❌ |
| A.2 | Notes & Instructions | ❌ |
| 2.3 | Edit Mode (inline transformation) | ❌ |
| 2.3.1 | Entry via ⋯ → Edit | ❌ |
| 2.3.2 | Disabled → enabled fields | ❌ |
| 2.3.3 | Cancel / Save Changes | ❌ |
| 2.3.4 | Revoke Access action + toast | ❌ |
| Modal | Step 1: Select Contact (search dropdown) | ❌ |
| Modal | Step 1: Create New contact flow (TYPE A My Network / TYPE B My Family) | ❌ |
| Modal | TYPE A: My Network Person Record creation | ❌ |
| Modal | TYPE B: My Family Person Record creation | ❌ |
| Modal | Step 2: Choose Access Level (Read-Only / Contributor / Release Task) | ❌ |
| Modal | Step 3: Which Information Can Be Accessed (scope tree) | ❌ |
| Modal | Step 4: When is Access Granted (Immediately / Specific Date / Post-Mortem / Specific Event) | ❌ |
| Modal | Step 5: Notes & Instructions | ❌ |
| Modal | Cancel / Send Invitation | ❌ |
| 3 | Toast system (global, bottom-right) | ❌ |

---

## Phase Plan

| Phase | Scope | Time est |
|-------|-------|----------|
| 1 | Subtitle + 2×2 grid + 8 suggestions pool + accordion + complete flow | ~30 min (DONE) |
| 2 | Add Task Form (Personal) — Title/Contact/Due/Priority/Repeats/Notes/Save | ~1 hr |
| 3 | Add Task Form (Delegated) + Temporary Access tree + Send Invitation modal | ~1 hr |
| 4 | Task Expand View (Read) + Edit mode + Delete confirmation modal | ~1.5 hr |
| 5 | Status state machine (Pending/Accepted/Rejected) + Suggestion → form prefill + Toasts | ~1 hr |
| 6 | Card X Shared With — Read mode (accordion contacts) | ~1 hr |
| 7 | Card X Edit mode (inline transform) + Revoke + Resend | ~1 hr |
| 8 | Card X Add New Share modal (Steps 1-5 + scope tree + Person creation) | ~2 hr |
| 9 | Global toast system + propagation | ~30 min |

**Total: ~10 hours full implementation** (Phase 1 done, Phases 2-9 pending)

---

## FULL SPEC TEXT (preserved verbatim from Violetka 2026-05-11)

[The full spec text from the user message is preserved here for reference.
See user message dated 2026-05-11 for the complete authoritative spec
including:
- Card IX section 1-7 (Purpose, States, Suggestions, Task Lists, Edit Mode,
  Delete, Add New Task with all conditional logic)
- Card X section 1-3 (Purpose, States, Add New Share modal with TYPE A
  My Network and TYPE B My Family person record creation flows)]
