# My Profile — Unified Entry Specification

> Universal Entry Anatomy · Lifecycle · Cross-Tab Visibility · Field & Action Catalogs · Life Story Tab
>
> Companion document to PlanAfter — My Profile Record · **Version 2.0** (English, expanded)
>
> Source: https://docs.google.com/document/d/1UnEPJ4o-yxNx5OrYlq5JMOrjvlMz-JZlgrOwIb1s6MU/
> Saved locally: 2026-05-05

---

## PART 0 — How to Use This Document

### 0.1 Purpose

This document is the **canonical specification for the Entry system in My Profile**. The rules described here apply to every card in My Profile that supports entries — Essential Info → Identity & Vital Documents, Medical Information, Education, Employment & Affiliations, Beliefs/Hobbies & Interests, and Tasks & Reminders — and to the new Life Story tab. It also defines how entries appear and behave outside their source card: in the Documents tab, Album tab, Life Story timeline, Linked Person Records, Family Tree, Memorial Page, and the Vault.

The intent is that per-card specifications reference this document for shared rules instead of duplicating them. When a per-card behavior diverges from the canonical pattern, the divergence must be explicitly called out in that card's spec, with rationale.

### 0.2 Scope

**In scope:**
- The structure of any Add / Edit Entry form (the four standard sections)
- Every action that can be performed on an entry across its lifecycle
- How entries propagate across tabs and records
- Permissions, audit logging, and edge-case behavior
- The full specification of the Life Story tab
- Master reference tables for fields, actions, visibility, and permissions

**Out of scope** (covered elsewhere):
- Header card, Linked Summary card, and Family Tree visualization
- KYC verification flow and identity-lock mechanics
- Memorial creation flow
- Person Record Quick Creation flow (referenced here, fully specified in the Person Record spec)
- Vault back-end storage architecture and encryption details

### 0.4 Definitions

| Term | Definition |
|---|---|
| **Entry** | An atomic, versioned unit of content that lives under a card. Every entry follows the four-section form pattern and the lifecycle defined in this document. |
| **Authoritative source** | The card and record where an entry was created. The single place where an entry can be edited or deleted. All other appearances are projections. |
| **Projection** | A read-only rendering of an entry in a location other than its source. |
| **Linked Summary Card** | The standard read-only representation of a Person Record when referenced outside its own record. |
| **Entry Row Card** | The collapsed read-mode rendering of an entry in its source section. |
| **Adaptive Timeline Builder** | The platform-wide component for specifying dates and milestones inside any entry. |
| **Magic link** | A signed, single-use URL that grants temporary access to a specific limited surface without requiring an account. |
| **SSOT** | Single Source of Truth. |
| **PlanOwner** | The owner of a PlanAfter account. Has full rights over their My Profile record. |
| **Executor** | A delegated role activated post-mortem. Read access by default to non-private entries; specific actions per grant. |
| **Beneficiary** | A delegated role with read access only to entries explicitly shared with them. |
| **Contributor** | A delegated role that can suggest edits or additions on shared cards/entries; final approval rests with the PlanOwner. |
| **Soft delete** | A removal that moves the entry into a trash window (default: 30 days) from which it can be restored. |
| **Hard delete** | Permanent removal of the entry and its data; not recoverable. |
| **Suggest mode** | A Contributor-only mode where edits are recorded as suggestions requiring PlanOwner approval. |

---

## PART A — Universal Entry Anatomy

### A.1 What Is an Entry

An entry is the **atomic content unit** of My Profile. It is the smallest stand-alone object that the user creates, edits, shares, archives, or deletes. Every card in My Profile that holds structured user content does so as a collection of entries.

An entry is not just a record in a database — it is a **UI primitive**, a **permission boundary**, and an **audit unit**. The same conceptual entry can appear in multiple surfaces of the platform (Documents tab, Album tab, Life Story timeline, etc.), but it is owned by exactly one card on one record. This single ownership is the principle that allows mutations to propagate consistently and predictably.

#### A.1.1 Properties of an Entry

- **Identity** — UUID assigned at creation, stable across edits/archives/unlinks; changes only on delete-and-recreate
- **Authoritative source** — exactly ONE source: the card on the record where it was created
- **Category** — chosen at creation, drives About fields and sub-section placement
- **Versioning** — every Save creates a new version with a delta in the audit log; recoverable for at least 30 days
- **Internal tags** — `linked_to`, `category`, `created_by`, `created_at`, `updated_at`, `archived_at`, `deleted_at`
- **Projections** — read-only renderings in other surfaces, always reflecting authoritative state
- **Permissioning** — inherits source card's scope by default; can be explicitly shared per-entry; never escalates
- **Lifecycle states** — Draft / Active / Archived / Soft-deleted / Hard-deleted

#### A.1.2 What Is NOT an Entry

- Linked Summary Cards on Family & Relationships card (projections of Person Records)
- The Emergency Medical Card (read-only aggregate)
- The Header Card of My Profile (record-level view)
- Avatar / profile photo (record property)
- AI Suggestions in Tasks (ephemeral until accepted)

#### A.1.3 The Single Editing Surface Principle

At any given moment, **only one entry form (Add or Edit) can be open on a card**. Enforced because:
- Prevents user confusion about which form a Save action will affect
- Allows consistent unsaved-changes detection
- Simplifies focus management for accessibility

When user attempts to open a second form: platform first checks the open form for unsaved changes. If none → silently closes. If yes → standard "Unsaved Changes" modal with Don't Save / Save / Cancel.

#### A.1.4 Auto-Save and Draft Recovery

- Every Add/Edit Entry form auto-saves a draft every **5 seconds** while typing
- Drafts stored locally (encrypted IndexedDB), never synced to server until Save committed
- On page reload with existing draft: form re-opens with banner "We restored your unsaved changes from [time]. Save or discard?" — buttons: Discard / Continue editing
- Drafts older than **7 days** auto-purged
- Drafts NOT transferable across devices (local recovery only)

### A.2 The Add / Edit Entry Form — Four Sections

Every entry form is structured as **exactly four sections in fixed order**. Always inline (never modal), expands downward from the "+ Add New Entry" button:

1. **About This Entry** — descriptive metadata, including Category and category-driven fields
2. **Timeline & Milestones** — dates and named events, using the Adaptive Timeline Builder
3. **Documentation & Storage** — uploaded files and physical-original location
4. **People & Contacts** — links to Person Records (My Family or My Network)

Some cards collapse Timeline into a sub-section of About (Employment, Medical) for screen-real-estate; others present Timeline as top-level (Education, Beliefs/Hobbies). Both acceptable. Four logical sections universal regardless of presentation.

#### A.2.1 Section 1 — About This Entry

First field is always **Category** (required). Category drives:
- Which additional fields appear in About This Entry
- Which sub-section of source card the saved entry appears in
- Which timeline milestones are pre-defined
- Which icon, badges, metadata appear in collapsed view
- Which file types are recommended in upload tooltip

**Conditional field behavior:**
- Category change mid-form (with data entered): confirmation modal "Changing the category will reset the fields below. Continue?"
- "Other → Please specify" pattern is **universal** — every dropdown with "Other" surfaces conditional free-text required field
- Conditional fields are hidden, NOT disabled, when not active
- All conditional fields validate independently

**Field labels and helpers:**
- Sentence case (not ALL CAPS)
- Required fields: asterisk (*) immediately after label
- Hover tooltips on labels (small "i" icon) explain "why" or "how" — never repeat label
- Placeholder text illustrative ("e.g., Bulgarian Bar Association"), not prescriptive
- Helper text reserved for validation context (max length, format), grey 9pt

#### A.2.2 Section 2 — Timeline & Milestones (Adaptive Timeline Builder)

**Milestone structure:**
- **Event Label** — predefined per Category OR Custom (via "+ Custom date")
- **Date** — Year (required if milestone added) → Month (optional) → Day (optional). Partial dates first-class
- **Details & Notes** — multi-line, max 500 chars

**Validation:**
- Year required; Day requires Month
- Calendar correctness (Feb 31 rejected)
- Future dates disallowed except for Goals/Reminders (1900 ≤ year ≤ current year + 50)
- End-type dates ≥ Start-type dates
- Soft warning if DOB age <14 or >120

**Display logic:**
- Collapsed entry: Timeline chip "Start – End" / "Start – Current" / "Start" alone / no chip
- Year-only renders as just year ("2018 – Current")
- Standard format: `Mon DD, YYYY` (e.g., Jan 05, 1991) regardless of input format
- Multiple milestones supported; expanded view shows all in order added

#### A.2.3 Section 3 — Documentation & Storage

**Fields in display order:**
1. **Location of the Original** (optional dropdown) — Home safe / Lawyer's office / Bank deposit / Cloud / Other
2. **Specific Storage Location Details** (conditional free text) — required when Location = Other; recommended otherwise; max 200 chars
3. **Cloud Link** (conditional URL) — required when Location = Cloud
4. **File Upload Dropzone** — dual-action (Upload File / Drag and Drop)
5. **Uploaded File Row Cards** — vertical list when files exist
6. **Notes** (varies by category)

**File rules:**
- Allowed: PDF, JPG, PNG, GIF, DOCX, RTF, TXT, XLSX, MP3, WAV, MOV, MP4
- Max 25 MB per file (client-side validation BEFORE upload)
- AES-256 encryption at rest
- States: Empty → Validating → Uploading → Uploaded → Error
- EXIF metadata extracted from images, capture date proposed as Timeline default
- Multi-file support; drag-and-drop reorder
- Click filename → full-screen preview modal

**Side effects when file added:**
- Indexed in Documents tab with breadcrumb back-link
- Media also indexed in Album tab
- AI face recognition (with consent) → "We detected 2 faces. Tag them?"
- Audit log entry

**Side effects when file deleted:**
- Confirmation modal: "Delete File? Are you sure… cannot be undone." Cancel + Delete (red)
- Soft-delete (30-day trash window in Vault)
- Disappears from source entry, Documents tab, Album tab
- Embedded uses (Cover image, Reflection embeds) show tombstone

**Important Note inline in form:**
> All uploaded files are encrypted using AES-256 and stored securely. Access is limited strictly to individuals explicitly authorized by you, in accordance with your sharing and permission settings.

#### A.2.4 Section 4 — People & Contacts

**Add Contact field — searchable dropdown:**
- Default: single-line input, placeholder "Search or add a contact…"
- On click/focus: becomes search bar, dropdown opens, cursor placed inside
- Search: instant client-side, matches First Name, Family Name, Full Name; case-insensitive; trimmed; no minimum chars
- Keyboard: arrows / Enter / Escape / Tab

**Dropdown content:**
- Aggregated list from My Family + My Network
- Sort: alphabetical by Full Name (A–Z) BEFORE filtering
- List item: avatar + Full Name (primary) + Role in Your Life (secondary, smaller, grey)
- Already-linked: shown but disabled (greyed) with "Already linked" indicator
- Last item always: **+ Create new** in primary green

**Linked Records display:**
- Each linked contact = Expanded Linked Summary Card directly below Add Contact field
- Read-only projection of authoritative Person Record
- Multiple stack vertically in order added; scroll inside form if >5
- Action menu (⋯): Edit (replaces in-place with Contact Edit Form) / Remove (unlinks for THIS entry only, person record stays)

**Inline editing transformation animation:**
- Duration ~150ms, ease-out
- Card fades out 50% over 80ms; Edit Form fades in
- Layout shift smoothed via height transition
- No bounce, no scale

#### A.2.5 The Cross-Record Rule (CRITICAL)

When PlanOwner links a Person Record to an entry (or creates new from inside): **that entry appears in the Person Record's view as well**. NOT a copy — same entry, projected.

- Entry has ONE authoritative source
- Person Record sees entry as read-only projection in "Linked Entries" tab
- Editing from PlanOwner side propagates to all projections
- Editing from Linked Summary Card (⋯ → Edit) edits authoritative Person Record
- Deleting from source removes projection everywhere
- Unlinking (⋯ → Remove) only severs THIS entry's projection; entry stays, person stays
- Permission edge: linked Person who has own PlanAfter account still sees read-only projection (authoritative source = original PlanOwner)

### A.3 Action Bar of the Form

**Layout:**
- Right-aligned: Cancel (secondary) + Save / Save updates (primary)
- Some cards (Tasks) may add left-aligned "Assign" / "Send invitation"

**Save button states:**
- **Disabled** — when any required field empty or invalid. Greyed; cursor pointer; click no-op; tooltip "Complete required fields to save"
- **Enabled** — primary green
- **Loading** — spinner during save; "Saving…" text if >500ms
- **Success** — checkmark flashes 600ms before form closes

**X close (top-right):**
- No unsaved changes → close immediately
- Unsaved changes → "Unsaved Changes" modal with Don't Save / Save / Cancel

**Keyboard shortcuts:**
- Cmd/Ctrl + Enter → Save (if enabled)
- Escape → Cancel (with unsaved-changes check)
- Tab / Shift+Tab → navigate fields in display order

### A.4 Read Mode — Entry Row Card

#### A.4.1 Collapsed View

Standard elements left to right:
1. **Type icon** (category-specific: 📜 / 🎓 / 💼 / 🏛️ / 🩺 / 💭 / 🎯 / 📖)
2. **Primary text** — main label (Document Name / Institution / Job Title / Allergen / Belief Type / Title)
3. **Secondary text** — context (Document Type / Education Level / Company / Severity / Sub-category)
4. **Indicator chips** — Timeline chip / File & Storage indicators (📎 if files, 🏠 if location) / Status chip / Tag chips
5. **Action menu (⋯)** — Edit / Archive / Share / Delete

**Visual states:**
- Active — full opacity, bold primary text
- Archived — 50% opacity, sorted bottom
- Pending (Reflection from Others) — yellow border + "Pending" badge
- Expired — red expiry chip + subtle red border
- Hover — subtle background tint
- Focused — visible focus ring

**Sorting within section:**
- Active first; within Active, per canonical sort key
- Archived last; sorted by archive date desc

#### A.4.2 Expanded View (click to expand inline)

Content order:
1. Header (chevron up)
2. **About this entry** (only populated fields)
3. **Location in the Platform** (only when opened from Vault/Documents tab)
4. **Timeline & Milestones**
5. **Documentation & Storage**
6. **People & Contacts**
7. **Notes & Instructions** (if populated)
8. **Action buttons** footer (Edit / Archive / Share / Delete)

#### A.4.3 Action Menu (⋯) Items per Role

| Role | Items |
|---|---|
| PlanOwner | Edit / Archive / Share / Delete |
| Executor | View, Download (post-mortem with grant) |
| Beneficiary | View, Download if granted |
| Contributor | Edit (suggest mode) |

**Disabled states:**
- Edit disabled if entry has KYC-locked fields → tooltip explains
- Delete disabled if entry referenced by active task/legal doc → tooltip explains

### A.5 Inline Form Behavior — UX Rules

- **No modals** — always unfolds inline
- **Smooth animation** — height/opacity, ease-out, ~150ms; no bounce, no scale
- **Sticky save bar** at large form heights — when taller than viewport, action bar sticks to bottom
- **Auto-save draft every 5s** (silent)
- **Tab navigation** — all fields reachable, order matches visual top-to-bottom, left-to-right
- **Field focus indicator** — visible focus ring (WCAG 2.1 AA contrast)
- **Error states** — inline below field, red text, no blocking modals; Save disabled until resolved
- **Single editing surface** enforcement
- **Body scroll lock** when confirmation modal open

### A.6 Validation Rules — Universal

| Pattern | Rule |
|---|---|
| Required fields | Asterisk (*); Save disabled until valid |
| Free-text length | 120 chars names / 300-500 short descriptions / 2000-5000 rich-text |
| Trimming | Leading/trailing whitespace auto-trimmed at Save |
| Date validation | Calendar correctness; partial dates allowed; end ≥ start |
| Country / City | Country = ISO-3166 dropdown; City = 1-80 chars free text |
| Special chars in names | Allow: hyphen, apostrophe, space, period. Block: digits, special chars |
| Email format | RFC 5322 compliant |
| Phone format | Per-country based on country code; international format supported |
| Duplicate handling | Allowed (multiple entries with same string valid) |
| File type/size | Validated client-side BEFORE upload |
| URL validation | Protocol (http/https) + basic structure |
| Special chars in titles | All Unicode allowed including emoji |

### A.7 Accessibility (WCAG 2.1 AA)

- All interactive elements keyboard-reachable
- Focus indicators ≥3:1 contrast
- Labels programmatically associated with inputs
- ARIA live regions for dynamic content
- Color not sole carrier of meaning (archived = opacity + "(Archived)" suffix)
- Form errors via aria-describedby
- Dropdowns implement WAI-ARIA combobox pattern
- Modals trap focus, return on close, respond to Escape
- Animations respect prefers-reduced-motion

### A.8 Internationalization (i18n)

- All strings externalized for translation
- Date formats: locale for narrative ("two days ago"); ISO-like `Mon DD, YYYY` for chips
- RTL support: form layout mirrors; primary CTA stays right
- Field max-length applies after Unicode NFC normalization
- Country dropdown: names in user's language; stored as ISO-3166-1 alpha-2 code

---

## PART B — Universal Entry Lifecycle

### B.1 Create

**Trigger:** click "+ Add New Entry"
**Behavior:** Button disappears → form unfolds (150ms ease-out) → Category auto-focused → user fills 4 sections → auto-save draft every 5s → Save click runs validation → if valid: persisted, form collapses, button returns, success toast "Entry added"
**Side effects:** internal tags set; Documents/Album indexing; reciprocal Person Record projections; Life Story markers; AI face recognition; expiry reminder if applicable
**Audit:** `entry.created` with actor / entry_id / card_id / record_id / category / timestamp / ip / user_agent
**Permission:** PlanOwner; Contributor in suggest mode (creates as "Pending Review")

### B.2 Edit

**Trigger:** ⋯ → Edit OR Edit button in expanded view footer
**Behavior:** expanded view replaced in-place by Edit form; pre-populated; subtle visual accent (focus ring/shadow); KYC-locked fields show lock icon
**On Save updates:** validation → persist → transform back to Read Mode
**On X/Cancel:** no changes → immediate close; with changes → Unsaved Changes modal
**Side effects:** updated_at = now; propagate to all projections; Linked Person changes create/sever reciprocal edges; share-related notifications opt-in
**Audit:** `entry.edited` with changed_fields (before/after deltas)
**Concurrency:** last-write-wins default; Save checks server version → if newer: banner "This entry was updated elsewhere — Refresh / Save anyway"

### B.3 Delete

**Trigger:** ⋯ → Delete OR Delete button in expanded view footer
**Behavior:** confirmation modal — "Delete entry? Are you sure… cannot be undone within trash window of 30 days." Cancel + Delete (red)
**On Delete:** soft-deleted state, deleted_at = now, soft_delete_until = now + 30 days
**Side effects:** removed from source visually; files soft-deleted from Documents/Album; reciprocal projections removed; Life Story markers removed; Person Records NOT deleted; tasks get warning chip "Source entry deleted"; Memorial projections removed
**Audit:** `entry.deleted` with soft_delete_until
**Toast:** "Entry deleted. Restore within 30 days from the Vault." with Undo button (10s)
**Recovery:** within 30 days from Vault → Recently Deleted → Restore. After 30 days hard-deleted (purged; only audit metadata remains)

### B.4 Archive / Unarchive

**Trigger:** ⋯ → Archive (Active) or Unarchive (Archived)
**Behavior:** archive → moves to bottom, opacity 50%; unarchive → returns to top sort. No confirmation (reversible)
**Side effects:** archived entries do NOT trigger expiry reminders; remain in Documents under "Archived" filter; Executor access unchanged (archived ≠ deleted)
**Sorting:** active first per canonical key; archived last by archive date desc
**Audit:** `entry.archived` / `entry.unarchived` with optional reason
**Optional "Archive reason"** per-card setting

### B.5 Share (Per-Entry Sharing)

**Trigger:** ⋯ → Share OR Share button in expanded view footer
**Modal layout:** 3 tabs — People (existing access) / Add People (search and invite) / Settings (visibility rules, notifications)
**Add People scope chooser:** View only / View and comment / View and edit
**Settings visibility triggers:** Now / Post-mortem only / On specific date / On specific event (e.g., 18th birthday)
**On Save:** recipients notified; entry appears in their "Shared with me"
**Inheritance rules:**
- Entry inherits source card permissions by default
- Cannot grant entry access to viewer with no card access
- Entry-level overrides only for visibility flags (post-mortem-only, on-date, on-event)
- Beneficiary access per-entry (only sees if explicitly shared)
**Permission:** PlanOwner only

### B.6 Link / Unlink Persons

#### B.6.1 Link Existing Person
1. User clicks Add Contact field; search bar activates
2. Types to filter; selects from dropdown
3. System auto-resolves source (My Family or My Network)
4. Linked Summary Card appears below Add Contact field
5. Add Contact field stays visible — multiple contacts addable
6. On entry Save: reciprocal reference created in linked Person Record

#### B.6.2 Create New Person + Link
1. User clicks Add Contact; selects "+ Create new"
2. Person Record Quick Creation flow starts
3. Directory Selector (segmented pill: My Family / My Network) determines destination
4. User fills Avatar (optional) / First Name (req) / Family Name (req) / Layer 1 (req) / Layer 2 (conditional or optional) / contact info (optional)
5. On Save Person: new record created in chosen directory, auto-linked to current entry; Linked Summary Card displays
6. On entry Save: reciprocal reference committed

#### B.6.3 Unlink Person
- Linked Summary Card → ⋯ → Remove
- Confirmation: "Remove this contact from this entry? This won't delete their record."
- On Confirm: link severed for THIS entry only
- Audit: `entry.person_unlinked`

#### B.6.4 Edit Linked Person (inline)
- Linked Summary Card → ⋯ → Edit
- Card replaces in-place with Contact Edit Form (pre-populated)
- On Save updates: writes back to authoritative Person Record; propagates everywhere
- On Cancel: original card restored
- Audit: `person.edited` with changed_fields + source_entry_id

#### B.6.5 Self-Initiated Unlink (Linked Person Side)
- Linked person CANNOT directly unlink themselves
- Their projection shows "Request removal" link
- On click: request sent to PlanOwner; PlanOwner approves/rejects via notification
- Audit: `entry.unlink_requested`

### B.7 File Operations

#### B.7.1 Add File
- Click Upload File → OS file picker; OR drag-and-drop hover state
- Client-side validation BEFORE upload
- States: Empty → Validating → Uploading → Uploaded / Error
- AES-256 encryption during upload
- EXIF extracted (capture date proposed as Timeline default)

#### B.7.2 View / Preview File
- Click filename or icon
- Full-screen modal: PDF (page nav) / image (pan/zoom) / video (controls) / audio (waveform + scrubber)
- Close (X) + Download button

#### B.7.3 Delete File
- Trash icon click
- Modal: "Delete File? Are you sure… cannot be undone." Cancel + Delete (red)
- Soft-delete (30-day trash)
- Removed from source entry, Documents, Album
- Embedded uses (Cover image, Reflection embeds) show tombstone

#### B.7.4 Reorder Files
- Edit mode of multi-file entry: drag-and-drop file row cards
- Order persists post-Save

#### B.7.5 Download File / Entry / Record
- Per file → download icon
- Per entry → ⋯ → Download → ZIP with files + entry summary PDF
- Per record → Header → Download → designed PDF of entire record with TOC + thumbnails

### B.8 Entry State Machine

| State | Description | Transitions out |
|---|---|---|
| Draft | Auto-saved locally, not yet committed via Save | Active (on Save), lost (after 7-day local cleanup) |
| Active | Saved and visible in source section | Archived (via Archive), Soft-deleted (via Delete), Active (on Edit) |
| Archived | Saved but at bottom of section, 50% opacity | Active (via Unarchive), Soft-deleted (via Delete) |
| Soft-deleted | In 30-day trash; not visible in normal views | Active (via Restore), Hard-deleted (after 30 days) |
| Hard-deleted | Permanently purged; only audit metadata remains | (terminal) |
| Pending Review | Created in suggest mode by Contributor | Active (on Approve), Hard-deleted (on Reject) |

### B.9 Audit Log — Universal Schema

| Field | Type | Description |
|---|---|---|
| action | enum | entry.created / .edited / .deleted / .restored / .archived / .unarchived / .shared / .unshared / .person_linked / .person_unlinked / .file_added / .file_deleted / .viewed / .suggestion_proposed / .suggestion_approved / .suggestion_rejected |
| actor | user_id | Who performed |
| entry_id | uuid | Identifier |
| card_id | string | Source card |
| record_id | uuid | Parent record |
| category | string | At time of action |
| changed_fields | array | Only for edit (before/after deltas) |
| recipient_id | user_id | Only for share-related |
| scope | enum | view / comment / edit |
| visibility_trigger | enum | now / post_mortem / specific_date / specific_event |
| reason | text | Optional, archive or special-case |
| timestamp | iso8601 | UTC |
| ip_address | string | For forensics, GDPR-compliant retention |
| user_agent | string | Browser/device fingerprint |
| session_id | uuid | Authenticated session |

**Retention:** minimum 10 years (GDPR/legal). Read-only from user; admin-export on legal request.

---

## PART C — Cross-Tab and Cross-Record Visibility

### C.1 Source Card (Authoritative)
- Where entry was created
- Only place to edit, delete, archive, share
- Full information (4 sections in expanded view)
- Tagged with `linked_to`

### C.2 Documents Tab (Centralized File Index)
- Read-only centralized index of all files attached to entries — NOT separate entry storage
- Each File Row: icon + name + breadcrumb ("From: Education > Bachelor's degree") + upload date + tags
- Click breadcrumb → opens entry in source card (expanded)
- Edit (rename, retag) propagates back to source
- Delete from Documents shows confirmation "This will also remove the file from [Source Entry]. Continue?"
- Filters: type / source card / tag / date range / person linked / archived
- Search: full-text on name + breadcrumb + tags
- **+ Add Document directly** in Documents tab → Category fully selectable (only path where Category not pre-selected)

### C.3 Album Tab (Media Index)
- Same logic as Documents but only for media (jpg/png/gif/svg/heic/webp/mp4/mov/avi/mp3/wav/m4a)
- Source badge: "From: Education > Bachelor's degree"
- Additional actions: Add to Timeline / Add to Life Story chapter / Move to Category / AI face tagging
- Categories within: Personal Photos / Family Moments / Events / Voice Messages / Videos / Childhood / Documents Images / Memories from Others / Emotional Legacy / Uncategorized
- AI: face recognition (group, suggest linking) + auto-tagging + story suggestions + timeline event creation + memory prompts

### C.4 Life Story Tab (Timeline & Chapters)
- Entries with timeline milestones project read-only markers in Life Story → Timeline
- Markers read-only — click navigates to source
- Native entries (created in Life Story directly): full edit/delete from Life Story tab
- Toggle "Show external markers" (default ON)

### C.5 Linked Person Records (Reciprocal Visibility)
- Entry appears in "Linked Entries" tab of every Person Record linked in entry's People & Contacts
- Read-only projection — editing NOT allowed (authoritative source = My Profile)
- Visible only with permission to source card OR explicit per-entry share
- Source delete removes projection
- Unlink severs only that one entry's projection

### C.6 Family Tree (Optional Visualization)
- Feature flag, off by default for v1
- Life Events linked to Family Members shown as connection markers (e.g., "Wedding 2010" between PlanOwner and Spouse)
- Education/Employment shown as small icons near person nodes
- Toggle in Settings → Family Tree → "Show life events on connections"

### C.7 Memorial Page (Post-Mortem Only)
- After death verification, Executor sees:
  - Documents/media marked "Show post-mortem" or "Always" (default)
  - Life Story entries (all), except those marked "Private — never share"
  - AI Life Summary suggestion from available entries
  - Life Chapters auto-suggested as Memorial → Life tab foundation
  - Approved Reflections from Others pre-fill Memorial → Stories tab

### C.8 Vault (Central File Storage)
- Back-end storage layer with access controls
- Hierarchical view: Record → Card → Entry → File
- Filters: Active / Archived / Recently Deleted (30-day window)
- Permission inheritance: Vault path inherits from parent entry → card → record

### C.9 Tasks Card (Task ↔ Entry References)
- Tasks can reference entries (e.g., "Renew passport" references Identity Document)
- Reference is loose:
  - Source entry deleted → task gets warning chip "Source entry deleted" but NOT auto-deleted
  - Source archived → task unaffected
  - Source Expiry Date changes → task Due Date does NOT auto-update; notification "Update related tasks?"

---

## PART D — Per-Card Entry Specifications

### D.1 Essential Info → Identity & Vital Documents

**Locked Category** when opened from Essential Info.

#### D.1.1 About This Entry

| Field | Type | Required | Notes |
|---|---|---|---|
| Document Entry Name | Text | Yes | 1–120 chars; primary label |
| Document Type | Dropdown + custom | Yes | Passport / National ID / Birth Cert / Driver's License / Marriage Cert / Divorce Decree / Adoption Papers / Naturalization Cert / Custom |
| Document Number | Text | No | **SENSITIVE** — masked in shared views by default |
| Issuing Country | Country | No | ISO-3166 |
| Issuing Authority | Text | No | e.g., "Ministry of Interior", "DMV — California" |
| Place of Issue | Text | No | City |
| Notes & Instructions | Textarea | No | 0–300 chars |

#### D.1.2 Timeline Milestones
- Issue Date (predefined)
- Expiry Date (predefined) — **auto-schedules expiry reminders 90/30/7 days before**
- Custom milestones supported

**Sorting:** Active first, by Expiry Date asc (soonest first); without Expiry sorted by Issue Date desc

#### D.1.3 Documentation
- Multi-file (front+back of ID, scan + photo)
- Location dropdown (Home safe / Lawyer / Bank / Cloud / Other)
- Entry CAN exist without files — only with location reference
- Tooltip: "diploma / scan / passport photo"

#### D.1.4 People & Contacts
- Optional (most identity docs don't link); useful for Marriage Cert (spouse), Birth Cert (guardian)

#### D.1.5 Special Behaviors
- After KYC verification: matching fields lock (Document Number, name); lock icon + tooltip
- Category locked from Essential Info; can re-categorize from Documents tab/Vault

### D.2 Medical Information

#### D.2.1 Categories Overview

| Category | Sub-section | Primary fields |
|---|---|---|
| Blood Type | General Emergency Info | Blood Type dropdown (A+/A-/B+/B-/AB+/AB-/O+/O-/Unknown) |
| Allergies | Allergies | Allergen / Severity (Mild/Moderate/Severe/Life-Threatening) / Reaction |
| Medical Conditions | Medical Conditions | Condition (dropdown + custom) / Medications (repeatable rows) / Severity tag |
| Medical Devices/Implants | Medical Devices/Implants | Device Type (Pacemaker/Insulin pump/Orthopedic/Vascular/Neuro/Hearing-Vision/Other) / Body Location |
| Legal Medical Documents | Legal Medical Documents | Document Name / Document Type (DNR/Advance Directive/Living Will/Medical Proxy/Other) |
| Other Medical Info | Other Medical Info | Description (free text) |

#### D.2.3 Special Surface — Emergency Medical Card (Read-Only Aggregate)
NOT an entry. Aggregate from underlying entries:
- Full Name / DOB / Blood Type / Allergies (high-vis pill badges) / Conditions (compact list) / Medications (derived) / Devices / Emergency Contacts (linked pills) / Primary Doctor (linked pill)
- Actions: Share / Download (wallet card) / Print
- Inline quick-add per snapshot block

#### D.2.4 Medical Profile Status (Completion Indicator)
% completion based on:
- Blood Type set (or "Unknown" explicit)
- At least one entry in Allergies/Conditions/Devices (or status "None")
- At least one Emergency Contact
- Allergy status explicit

### D.3 Education

| Category | Sub-section | Primary fields |
|---|---|---|
| Educational qualification | Educational Qualifications | Education Level / Degree / Institution / Country / City |
| Professional certification | Professional Certifications | Certificate Name / Issuing Org / Country / City |
| Other education | Other Education Entries | Title / Issuing Org / Description |

#### D.3.6 People & Contacts — Education-Specific Roles (Network)
When creating Person Record from inside Education entry, Layer 1 dropdown shows:
- Teacher / Professor / Mentor / Instructor / Tutor
- Supervisor / Research Advisor / Thesis Committee Member
- Classmate / Coursemate / Training Colleague
- Other → free text

### D.4 Employment & Affiliations

| Category | Sub-section | Primary fields |
|---|---|---|
| Employment Entries | Employment Entries | Job Title / Company / Country / City |
| Memberships & Affiliations | Memberships & Affiliations | Organisation Name / Organisation Type / Role/Position / Membership ID / Notes |

### D.5 Beliefs, Hobbies & Interests

| Category | Sub-section | Primary fields |
|---|---|---|
| Beliefs | Beliefs | Type (Spiritual/Religious / Cultural-Ethnic / Core Values / Traditions / Other) + category-specific |
| Hobbies | Hobbies | Hobby Name |
| Interests | Interests | Interest Category (multi-select) |

### D.6 Tasks & Reminders (Special Pattern)

**Differences from Universal Entry:**
- NO Documentation & Storage section as top-level
- NO People & Contacts (Assigned To absorbs)
- NO Timeline & Milestones (replaced by Due Date + Repeats)
- Distinct sections: Active Tasks / Completed Tasks
- Distinct state machine: Pending invitation → Active → Done (or Rejected)

#### D.6.2 Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| Task Title | Text | Yes | Always shown |
| Assigned To | Dropdown (Me/Family/Network/Create new) | Yes | Always |
| Due Date | Date picker | No | Default today; cannot be past |
| Priority | Dropdown (High/Medium/Low) | No | Visible only when Assigned To = Me |
| Repeats | Dropdown | No | None/Daily/Weekly/Monthly/Annually/Custom/Reminder on date — only when Assigned To = Me |
| Ends | Conditional | No | Never / On / After N occurrences — visible if Repeats ≠ None |
| Repeat Interval | Number + Unit | Conditional | If Repeats = Custom |
| Repeat on (weekday) | Multi-select S/M/T/W/T/F/S | Conditional | If Unit = Week |
| Reminder Date | Date picker | Conditional | If Repeats = "Reminder on date" |
| Temporary Access To | Multi-select scope | No | Only if Assigned To ≠ Me; hidden if assignee already has access |
| Notes & Instructions | Textarea | No | Always |

#### D.6.3 Delegation Flow
1. PlanOwner creates with Assigned To = Family/Network member
2. Task → "Pending invitation" state
3. "Send Task Invitation" modal opens with editable email content
4. On Send: assignee receives email with secure PlanAfter link
5. Task minimum-access logic: assignee gets Temporary Access only for granted scope
6. Assignee Accept / Reject (with Reason for Rejection if Reject)
7. Proposed Changes mode: assignee suggests changes; PlanOwner approves
8. On task completion (Done toggle): both parties notified

#### D.6.4 Suggestions (AI-Generated)
- 2x2 grid of exactly 4 personalized suggestion tiles
- Each tile: "Draft" tag + suggested title + short description + Accept + Remove
- Accept opens Add New Task prefilled; Assignee defaults to Me
- Remove hides suggestion, surfaces next from pool of ~6
- Pool covers health / identity / financial / legacy

---

## PART E — Life Story Tab Full Specification

Life Story uses the same Universal Entry pattern (Part A) with **5 new categories** and **3 views** over the same underlying entry collection.

### E.1 Tab Layout
Top bar:
1. **View Toggle** segmented control — Timeline / Chapters / By Type
2. **Filter & Search bar** — by category / year range / person tagged / mood / tag
3. **+ Add New Entry** CTA — standard inline form
4. **AI Suggestion Banner** (occasional) — "Based on your Education entries, would you like to start a Chapter for your university years?"

**Empty state:**
- Hero card: "Your story is more than dates and documents."
- 5 CTA buttons: Add a Life Event / Write a Reflection / Set a Goal / Start a Chapter / Invite someone to share a memory
- 3 random suggested prompts from Reflection library
- AI suggestion based on existing data

### E.2 Three Views

#### E.2.1 Timeline View (Default)
- Vertical chronological with year markers on left
- Mixes native Life Story entries (full-color cards) with read-only markers from Education/Employment/Beliefs/Medical (subtle icons + breadcrumbs) and Album items with capture dates
- Click native → expand inline; click marker → navigate to source
- Year groupings collapsible
- Quick-jump sidebar: 1990 / 2000 / 2010 / 2020 anchors
- Toggle "Show external markers" (default ON)

#### E.2.2 Chapters View
- Life Chapter entries as "book cover" cards (cover image + title + period)
- Click chapter → expand below: chapter body (rich-text) + pinned entries + AI-aggregated entries within period
- Drag-and-drop reorder (chronological default; user override)

#### E.2.3 By Type View
- Filter chips: All / Life Events / Reflections / Reflections from Others / Dreams & Goals / Life Chapters
- Grid layout, consistent card design
- Sort: Most recent / Oldest / Most edited / Most shared

### E.3 Five Native Categories

#### E.3.1 Life Event — "Something significant happened to me"
| Field | Type | Required | Notes |
|---|---|---|---|
| Title | Text | Yes | 1-120 chars |
| Location | Country + City + Place | No | Free-text place allows specificity |
| What happened | Textarea | Yes | 1-2000 chars |
| Significance / Mood | Dropdown | No | Joyful/Bittersweet/Difficult/Transformative/Quiet/Other |
| Visibility | Dropdown | No | Public to circle/Private/Post-mortem only (default Private) |

#### E.3.2 Reflection (Self) — "I am writing what I am thinking"
| Field | Type | Required | Notes |
|---|---|---|---|
| Title | Text | No | Auto-generated if empty |
| Prompt | Library/Custom | No | If from internal questionnaire |
| Reflection text | Rich-text editor | Yes | 0-5000 chars |
| Mood | Emoji picker | No | Optional one-tap |
| Tags | Multi-select | No | Custom (gratitude/fear/decision/clarity) |
| Visibility | Dropdown | No | Private (default)/Share post-mortem/Share with specific person |

#### E.3.3 Reflection from Others (Party Questionnaire) — "Someone else fills this out for me"

**Full Flow:**
1. PlanOwner creates invitation: selects Person + Template
2. System sends email/notification with **magic link** (single-use, signed, 30-day expiry, NO login required)
3. Author opens link → fills questionnaire → submits
4. PlanOwner receives "[Name] submitted a response to [Template title]"
5. PlanOwner reviews entry in Pending Review state — Approve (becomes Active, appears in Timeline) / Hide (preserved but not shown) / Delete (hard-delete; author notified)
6. Author notified ONLY on Delete, NOT Hide

**Privacy:**
- Only PlanOwner sees submitted entries (and Executor post-mortem default)
- Author sees only own response (read-only 90 days post-submission, then expires)
- Author cannot edit after submission
- Magic link encrypted in transit and at rest; expires after 30 days

#### E.3.4 Dream / Goal — "I want to achieve something"
| Field | Type | Required | Notes |
|---|---|---|---|
| Title | Text | Yes | 1-120 chars |
| Description | Textarea | No | 0-1000 chars |
| Why it matters | Textarea | No | 0-500 chars (motivational anchor) |
| Status | Dropdown | Yes | Active/Achieved/Released (default Active) |
| Category | Dropdown | No | Personal growth/Career/Relationships/Health/Travel/Creative/Legacy/Other |
| Visibility | Dropdown | No | Private (default)/Share with specific people/Public to circle |

**Status logic:**
- Active → Timeline view with blue accent + progress chip
- Achieved → green checkmark badge + auto-record achievement_date + celebratory micro-animation (one-time)
- Released → Chapters/By Type view only (NOT Timeline) with greyed style; optional gentle prompt "Want to add a note about why you're releasing this?"

#### E.3.5 Life Chapter — "I want to tell the story of an entire period"
| Field | Type | Required | Notes |
|---|---|---|---|
| Title | Text | Yes | e.g., "Childhood in Plovdiv" |
| Period — Start year | Year | Yes | 1900 ≤ year ≤ current year |
| Period — End year | Year | No | Empty = "Until present" |
| Theme / Tags | Multi-select | No | Family/Career/Education/Travel/Loss/Growth/Identity/Other |
| Chapter body | Rich-text editor | Yes | Bold/italic/underline/quote/lists/hyperlink/divider/styles + inline embeds from Album |
| Cover image | Image picker | No | Selectable from Album or upload new |
| Visibility | Dropdown | No | Private (default)/Family/Public/Post-mortem |

**Auto-aggregation logic:**
- In Chapters view, entries (Life Events/Reflections/Goals/Album items/external Education-Employment markers) whose dates fall within chapter's period displayed as cards under chapter body
- PlanOwner can pin/unpin specific entries
- Manually pinned always shown, even if dates outside period
- Toggle "Show auto-aggregated entries" default ON

### E.4 Reflection Library & Questionnaire Templates

**Self-Reflection Prompts (examples):**
- "What did I learn this past month?"
- "What am I grateful for today?"
- "What would I tell my younger self?"
- "What brings me peace?"
- "What is the bravest thing I've done?"
- "Which decision in my life turned out to be the most transformative?"
- "What do I want to be remembered for?"
- "Who has shaped me most, and how?"
- "What pattern am I noticing in my life right now?"

**Party Questionnaire Templates (examples):**
- "Letter to me" — open letter
- "5 things about me" — 5 qualities/memories
- "When did you see my bravest side?"
- "What advice do you have for my future?"
- "A memory that is mine because of us"
- "What do you love about me?"
- "Things I want my children to know about me"

**Custom Library:** User can create own prompts/templates (Title + Intro text + 1-10 questions). Sharing planned for v2.

### E.6 Permissions & Privacy for Life Story

| Role | Default access | Override possible |
|---|---|---|
| PlanOwner | Full | — |
| Executor | Read post-mortem (without "Private — never share") | Yes (PlanOwner can grant earlier) |
| Beneficiary | Read only for explicitly shared | Yes |
| Contributor | Suggest mode for shared chapters/events | Yes |
| Linked Person | Read only for entries linking them | Yes (PlanOwner can revoke per-entry) |
| Magic-link Author | Write to single Reflection from Others entry; no other read | No |

---

## PART F — Master Tables

### F.1 Field Master Table

#### F.1.1 Universal Fields (every entry)

| Section | Field | Type | Required | Notes |
|---|---|---|---|---|
| About | Category | Dropdown | Yes | First field; drives the rest |
| Timeline | Event Label | Text/Predefined | Conditional | Per milestone |
| Timeline | Year/Month/Day | Date parts | Year required if milestone added | Partial dates allowed |
| Timeline | Details & Notes | Textarea | No | 0-500 chars per milestone |
| Documentation | Location of Original | Dropdown | No | Home safe/Lawyer/Bank/Cloud/Other |
| Documentation | Specific Location Details | Text | Conditional | Required if Other; recommended otherwise |
| Documentation | Cloud Link | URL | Conditional | Required if Cloud |
| Documentation | File Upload | Multi-file | No | 25MB/file; PDF/JPG/PNG/GIF/DOCX/RTF/TXT/XLSX/MP3/WAV/MOV/MP4 |
| People | Add Contact | Searchable dropdown | No | My Family + My Network + Create new |

### F.3 Cross-Tab Visibility Matrix

| Entry Type | Source Card | Documents Tab | Album Tab | Life Story Timeline | Linked Person Records | Memorial (post-mortem) |
|---|---|---|---|---|---|---|
| Identity Document | ✓ Authoritative | ✓ Indexed | ✓ If image | ✗ (no timeline default) | ✗ Rare | ✓ If marked |
| Medical Entry | ✓ Authoritative | ✓ If file attached | ✗ | ✓ If date set | ✓ If doctor linked | ✓ If marked |
| Education Entry | ✓ Authoritative | ✓ If diploma uploaded | ✗ | ✓ If dates set | ✓ If teacher linked | ✓ Default |
| Employment Entry | ✓ Authoritative | ✓ If contract uploaded | ✗ | ✓ If dates set | ✓ If colleague linked | ✓ Default |
| Belief/Hobby/Interest | ✓ Authoritative | ✓ If docs | ✓ If media | ✓ If dates set | ✗ Rare | ✓ Default |
| Life Event | ✓ Authoritative (Life Story) | ✓ If docs | ✓ If media | ✓ Always | ✓ If people linked | ✓ Default |
| Reflection (self) | ✓ Authoritative (Life Story) | ✓ If audio | ✓ If media | ✓ If date set | ✓ If people linked (rare) | Conditional (visibility setting) |
| Reflection from Others | ✓ Authoritative (Life Story) | ✗ | ✗ | ✓ Once approved | ✓ In author's record | ✓ In Memorial Stories |
| Goal | ✓ Authoritative (Life Story) | ✓ If docs | ✓ If vision board | ✓ If Active or Achieved | ✓ If accountability linked | Conditional |
| Life Chapter | ✓ Authoritative (Life Story) | ✓ If docs | ✓ If cover/embeds | ✓ In Timeline view (period) | ✗ | ✓ Default → Memorial Life |
| Task | ✓ Authoritative (Tasks card) | ✗ | ✗ | ✗ | ✓ If delegated | ✗ |

### F.4 Permission Matrix per Role

| Action | PlanOwner | Executor | Beneficiary | Contributor | Linked Person |
|---|---|---|---|---|---|
| View entry | ✓ | ✓ (post-mortem default) | ✓ If shared | ✓ If granted | ✓ If linked + permitted |
| Create entry | ✓ | ✗ (except Memorial post-mortem) | ✗ | Suggest mode only | ✗ |
| Edit entry | ✓ | ✗ | ✗ | Suggest mode only | ✗ |
| Delete entry | ✓ | ✗ | ✗ | ✗ | ✗ |
| Restore entry | ✓ | ✗ | ✗ | ✗ | ✗ |
| Archive entry | ✓ | Conditional (post-mortem grant) | ✗ | ✗ | ✗ |
| Share entry | ✓ | ✗ | ✗ | ✗ | ✗ |
| Download entry | ✓ | ✓ (post-mortem) | ✓ If granted | ✗ | ✗ |
| Add file to entry | ✓ | ✗ | ✗ | Suggest mode only | ✗ |
| Delete file from entry | ✓ | ✗ | ✗ | ✗ | ✗ |
| Link person to entry | ✓ | ✗ | ✗ | ✗ | ✗ |
| Unlink person from entry | ✓ | ✗ | ✗ | ✗ | Self-unlink request only |
| Approve Contributor suggestion | ✓ | ✗ | ✗ | — | ✗ |
| Send party questionnaire | ✓ | ✗ | ✗ | ✗ | ✗ |
| Submit party questionnaire | N/A | N/A | N/A | N/A | Magic link author only |
| Approve Reflection from Others | ✓ | ✗ | ✗ | ✗ | ✗ |

---

## PART G — Edge Cases (Critical)

### G.1 Concurrency
- Two devices editing same entry → last-write-wins; on Save server checks version → if newer: banner "Refresh / Save anyway"; saving anyway records conflict in audit log
- PlanOwner deletes while another viewer has it open → on next interaction: "This entry has been deleted." (30s grace period)
- Contributor suggests edit on archived → block "Ask owner to unarchive first"

### G.2 Data Integrity
- Linked Person Record deleted → entry retains snapshot of name + role; tombstone in People & Contacts
- Person merge → all entries linked re-point to surviving record; audit captures both sources
- File corrupted → "File unavailable" placeholder + retry
- Cloud link broken → "Link is not working. Update?" toast (non-blocking)

### G.4 Party Questionnaire Specific
- Author fails to submit in 30 days → magic link expires; PlanOwner notified "Resend?"
- Author submits, then PlanOwner deletes → author notified
- Author tries to edit after submit → blocked
- Multiple invitations to same person → allowed (separate entries)
- Author shares magic link → single-use, fails after first use

### G.5 Goals
- Achieved → auto-record achievement_date + micro-animation + option to add reflection note
- Released → gentle prompt "Want to add a note about why?"
- Target date passes without achievement → soft notification (no auto-fail)
- Released → Active revival allowed

### G.6 Visibility
- "Post-mortem only" but PlanOwner shares manually → warning override allowed; audit captures
- Beneficiary tries non-shared → empty state ("This information is not available")
- "Private — never share" → excluded from Memorial + Executor inheritance

---

## PART H — Open Questions (25 items, full list in source)

Top 10:
1. Magic link without account or lite account? → Magic link 30-day expiry
2. Author notification on Hide vs Delete? → No on Hide, Yes on Delete
3. Auto-aggregation in Chapter? → Always ON with pin/unpin
4. Visibility scope per entry? → Override only post-mortem flag
5. Family Tree integration? → Feature flag, off v1
6. Goal milestone reminders? → Opt-in toggle
7. Reflection auto-title format? → First sentence if >5 words; else "Reflection — [Date]"
8. Life Chapter cover required? → Optional with AI suggestion
9. Multiple authors on Reflection from Others? → No (one entry = one author)
10. Goal "Released" date recorded? → At status change

---

## Changelog

| Version | Date | Changes |
|---|---|---|
| 1.0 | May 2026 | First unified spec consolidating Universal Entry pattern |
| 2.0 | May 2026 | Translated to English; expanded depth in every section; added Audit Log schema, Concurrency rules, Data Integrity edge cases, expanded Open Questions to 25; added Entry State Machine, Document Number masking, Contributor suggest-mode flow |

— End of Document —
