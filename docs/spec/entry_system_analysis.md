# Entry System — Comprehensive Spec Analysis

**Source:** `2.1. My Profile.txt` (14,578 lines, downloaded by Violetka)
**Synthesized:** 2026-05-04
**Status:** Living reference for entry-system implementation

This is a structured derivative of the master spec, focused on everything related to **entries** (Document Entries / individual data items) across the 7 cards on the Overview tab. The spec itself is the source of truth — this document is a digest for daily implementation work.

---

## A. Per-Card Breakdown (7 Cards)

### A.1 Essential Info (Card I)
- **Spec range:** lines 54–2170
- **Group title:** Identity & Vital Documents
- **Add button:** "+ Add Document"
- **Subcategories (entry types):** Passport · National ID · Driver's License · Birth Certificate · Residence Permit · EU Blue Card · Visa · Work Permit · Social Security/National Insurance · Name Change Document · Citizenship Certificate · Refugee Status Document · Death Certificate · Marriage Certificate · Other (free-text)
- **Empty state:** "No Document Entries added yet" + body about identity organization
- **Special:** Category locked when adding from card; multi-file allowed; expiry → 180/60/30d reminders; Document Entry modal independent of parent card save state
- **Propagation:** Documents Tab (Identity & Vital Documents) · Vault Directory · Tasks/Reminders (if expiry) · Linked person's record (shared, not copied) · Header card · Will/Legal templates · Executor dashboard

### A.2 Contact Info (Card II)
- **Spec range:** lines 2171–2670
- **No Document Entries** — structured contact detail card (Primary Email, Additional Emails, Primary Phone, Additional Phones, Primary Address, Additional Addresses, Social Media)

### A.3 Family & Relationships (Card III)
- **Spec range:** lines 2673–5281
- **Group title:** Relationship & Status Documents
- **Add button:** "+ Add Document"
- **Subcategories:** Marriage Certificate · Divorce Papers · Adoption Papers · Guardianship Document · Prenuptial Agreement · Other
- **Special:** Bidirectional relationship rules (single source of truth); only one Linked Summary Card editable at a time; relationship changes auto-regroup on save; no silent group reordering
- **Propagation:** Documents Tab · Vault · Tasks/Reminders (if expiry) · Linked person's record · Will/Legal templates

### A.4 Medical Information (Card IV)
- **Spec range:** lines 5282–7138
- **Add button:** "+ Add Allergy" / "+ Add Condition" / "+ Add Medication" / "+ Add Device"
- **Subcategories:** Blood Type · Allergies · Medical Conditions · Medications & Supplements · Medical Devices/Implants · Legal Medical Documents · Other Medical Info
- **Special:** "I have no known X" confirmed-negative checkboxes (allergies / conditions / devices / meds); medications can be linked to conditions (auto-sync via `linkedFrom`); severity ranking for allergies (Mild → Life-Threatening)
- **Propagation:** Documents Tab (Medical Records) · Vault · Tasks/Reminders · Emergency Contact Flow · Post-Loss Support workflow · Linked doctor/hospital record

### A.5 Education (Card V)
- **Spec range:** lines 7139–8927
- **Group title:** Education Documents
- **Add button:** "+ Add Qualification"
- **Subcategories:** Educational Qualification (with Education Level dropdown) · Professional Certification · Other Education
- **Special:** From Date / To Date (program duration); Issue/Award Date; Honors/Grade field; auto-feeds Resume/CV generation + Life Story timeline
- **Propagation:** Documents Tab · Vault · Linked institution/person record · Resume generation · Life Story

### A.6 Employment & Affiliations (Card VI)
- **Spec range:** lines 8928–10725
- **Add buttons:** "+ Add Employment" / "+ Add Membership" / "+ Add Business Affiliation"
- **Subcategories:** Employment Entry · Membership/Affiliation · Business Ownership/Partnership
- **Special:** Current role checkbox; ownership % field; status (Active/Inactive/Expired); sector/industry tag
- **Propagation:** Documents Tab · Vault · Linked company/person record · Life Story timeline · LinkedIn sync (future)

### A.7 Beliefs, Hobbies & Interests (Card VII)
- **Spec range:** lines 10726–12360
- **Add buttons:** "+ Add Belief" / "+ Add Hobby" / "+ Add Interest"
- **Subcategories:** Belief (with type & observance level) · Hobby (with skill level) · Interest (with category)
- **Special:** Freeform, text-based; no expiry; no required linked people; primary purpose = Memorial Page + Life Story + Emotional Legacy
- **Propagation:** Memorial Page generation · Life Story · Emotional Legacy modules · Documents Tab

---

## B. Universal Entry Form (3 Sections)

Every Document Entry across all cards uses the SAME 3-section form:

### B.1 About This Entry
- **Entry Name** (Required, max 120 chars, free text). Auto-fills from Document Type if empty; auto-fills from filename (extension stripped) on file upload. User can override.
- **Document Type** (Required, dropdown). Options vary per card. "Other" → opens "Describe Document Type" (max 80 chars, required).
- **Expiry Date** (Optional, date picker). If filled → schedules 180/60/30 day reminders. Past date → soft warning. Display: "Expires MMM DD, YYYY" or "Expired MMM DD, YYYY". No date → "Updated/Uploaded MMM DD, YYYY by [user]".
- **Adaptive Timeline Builder** — milestones array (see section C below)

### B.2 Documentation & Storage
- **Location of Original Document or File** (Optional dropdown, REQUIRED if no file uploaded). Options: Home Safe · Lawyer's Office · Bank Deposit · Cloud · Other. "Cloud" → opens Cloud Storage Link field. "Other" → opens "Please specify" free-text (required).
- **Location Details** (Optional free-text). Placeholder: "Drawer, safe, folder name…"
- **File Upload Dropzone** — see section D
- **Uploaded Files** display (when files exist) — File Row Cards with icon + name + upload timestamp + trash
- **AES-256 Important note** — appears ONLY when ≥1 file uploaded
- **Notes & Instructions** (Optional, multi-line). Placeholder: "Add additional instructions or details—anything important you want to remember or share about this document"

### B.3 People & Contacts
- **Add Contact** (Searchable dropdown selector) — see section E

---

## C. Adaptive Timeline Builder

Every entry has a Timeline section with milestones. Date entry: **Year (required) → Month (optional) → Day (optional)**. Partial dates valid. Each milestone has optional Details & Notes.

### Milestone types per card

| Card | Milestones |
|------|-----------|
| **Essential** (Identity) | Issue Date · Expiry Date · Custom Date |
| **Family & Relationships** | Relationship Start · Marriage · Engagement · Civil Partnership · Divorce · Relationship End · Adoption · Custom |
| **Medical** | Diagnosis · Treatment · Surgery/Procedure · Vaccine · Custom |
| **Education** | Start (From) · End (To)/Graduation · Issue/Award · Custom |
| **Employment** | Start · End · Promotion · Custom |
| **Beliefs/Hobbies** | (typically none — freeform) |

### Timeline rules
- Year required; Month optional; Day optional
- Day requires Month (if Day filled, Month must exist)
- Calendar validation: Feb 30 invalid, etc.
- End Date ≥ Start Date (validation)
- Divorce Date ≥ Marriage Date ≥ Relationship Start
- Custom milestones: user-defined Event Label + dates + notes
- Read mode: shown as labeled list; if no data → "No timeline details added yet" muted

---

## D. File Upload Dropzone

**Visual:** Container split horizontally — `[ Upload File ]  |  [ Drag and Drop File Here ]`. Dashed light-grey border, light translucent background.

### States
1. **Empty** — placeholder text + format indicators
2. **Hover (drag active)** — accent border + "Drop image here to upload"
3. **Uploading** — progress bar + percentage + cancel
4. **Uploaded** — File Row Card appears (icon + filename + timestamp + trash)
5. **Error** — red border + inline error + retry option

### Multi-file rules
- Multiple files allowed per entry
- Display: "2 files" + thumbnails in expanded entry view
- User can reorder + delete individual files
- Replacing file fully overwrites previous version
- Each file has independent trash icon → confirmation modal "Delete File? Are you sure? This action cannot be undone." (Delete in red)

### Validation
- File type validated BEFORE upload starts
- Size validated BEFORE upload starts (max 10 MB)
- Supported: JPG, PNG, WEBP for avatars; PDF, DOC, DOCX, image formats for docs
- On error: keep user in context, retry option visible

### Encryption messaging
- "AES-256" badge always shown below dropzone
- "Important!" full security note appears ONLY when ≥1 file uploaded:
  > All uploaded files are encrypted using AES-256 and stored securely. Access is limited strictly to individuals explicitly authorised by you, in accordance with your sharing and permission settings.

---

## E. Linked People System

### E.1 Searchable Picker
- Aggregated list from My Family + My Network
- Sorted alphabetically by Full Name (stable across filtering)
- Each result: Full Name (primary, black) + Role in Your Life (secondary, grey)
- Search: instant client-side, case-insensitive, matches First Name / Family Name / Full Name; trims whitespace; no min char requirement
- Empty input shows full list
- **Last option always:** "Create new"

### E.2 Create New Flow (Person Record Quick Creation)
**Directory Selector** (Required) — segmented pill: My Family ◐ My Network. Default = My Network. Switching changes form fields in-place (no reload).

**TYPE A — My Network (External Contact):** Avatar (optional) · First Name (req, 1–80) · Family Name (req, 1–80) · Full Name (auto) · Relationship Type (Layer 1 dropdown, required) · Please Specify (Layer 2, conditional) · Email (repeatable, primary toggle, validated) · Phone (repeatable, country code + format, primary toggle) · Social Media (platform dropdown + handle, repeatable) · Notes & Instructions

**TYPE B — My Family:** similar structure with family-specific Relationship Types

**Save:** disabled until valid; creates new record; auto-links to originating entry; displays Linked Summary Card immediately
**Cancel/Close (X):** if no data → close immediately; if unsaved data → "Unsaved Changes" modal

### E.3 Linked Summary Card (Read-only Projection)
**Collapsed (always visible):** Avatar + Life Status Dot · Full Name · Specific Role (entry context) · DOB + Age (or DOD) · Role-in-Plan badge (if applicable, PlanOwner-visible only)
**Expanded (inline on click):** All collapsed + Primary Email · Additional Emails · Primary Phone · Additional Phones · Primary Address (City/Country) · Social Media. Empty: "No contact information available"
**Action menu (⋯):** Edit · Remove

### E.4 Inline Edit on Linked Contact
- "Edit" replaces card with Contact Edit Form **in place** (no navigation)
- Form pre-populated with all data from authoritative record
- Visual accent (soft shadow / focus ring) indicates edit state
- "Save updates" → saves to authoritative record + propagates globally + transforms back to card
- "X" cancel → discards + restores card

### E.5 Remove vs Delete
- **Remove** → unlinks contact from this entry only. Person record stays in My Family/Network.
- **Delete** → would only happen from the person's own record itself, never from a linked entry.

---

## F. Save Dispatch & Propagation Matrix

Every entry save propagates to multiple destinations. **"It is one shared entry — not a copy"** (line 605). Editing or deleting anywhere affects ALL views.

| Source card | Destinations |
|-------------|--------------|
| **Essential Info** | Documents Tab (Identity & Vital Documents) · Vault Directory · Linked person's record · File upload → Album (Profile Documents) · Tasks/Reminders (if expiry) · Header card · Will/Legal templates · Executor dashboard |
| **Family & Relationships** | Documents Tab (Relationship & Status Documents) · Vault · Linked person's record · Tasks/Reminders · Will/Legal templates |
| **Medical** | Documents Tab (Medical Records) · Vault · Linked doctor/hospital record · Tasks/Reminders · Emergency Contact Flow · Post-Loss Support workflow |
| **Education** | Documents Tab (Education Documents) · Vault · Linked institution/person record · Resume generation · Life Story |
| **Employment** | Documents Tab (Employment & Affiliations) · Vault · Linked company/person record · Life Story |
| **Beliefs/Hobbies/Interests** | Memorial Page · Life Story · Emotional Legacy modules · Documents Tab |

---

## G. Status Indicators / Visual Rules

### File + Location Status (collapsed entry row, right side, before action menu)
- 🟢 **Green dot** = Digital file uploaded
- 🔵 **Blue dot** = Location recorded (physical original tracked)
- ⚪ **Dual indicator** = Both file AND location
- ⚫ **Grey dot** = Neither (informational placeholder)

### Expiry Status (next to expiry date in collapsed view)
- 🔴 **Red** = Expired
- 🟠 **Orange** = Expiring soon (<30 days)
- 🟢 **Green** = Valid
- ⚫ **Grey** = No expiry date

### Archive Status
- Archived entries: **50% opacity**, moved to bottom of list
- Action menu: "Unarchive" instead of "Archive"

---

## H. Edit / Archive / Delete Actions

### Action Menu (⋯) order
1. **Edit** — opens Document Entry Form inline (no modal)
2. **Archive** (active docs) OR **Unarchive** (archived docs)
3. **Delete** — confirmation modal: "Delete this entry? This action cannot be undone." (Delete in red)

### Delete behavior
- Confirmation required
- Deletes from ALL propagation targets
- Cannot be undone
- Linked person record NOT deleted (only association removed)

### Archive behavior
- Moves to bottom of list (sort: active first, archived last)
- 50% opacity
- Expiry reminders STOP firing
- Executor access rules unchanged
- Archive option becomes "Unarchive"

### Edit behavior
- Opens same 3-section form as creation
- All fields pre-populated
- Cancel (X) → discards
- Save → updates + propagates globally

---

## I. Locked Rules (Must / Always / Never)

1. **Single Source of Truth** — every entry stored once; all views are projections
2. **Document Entries section always visible** when card is expanded — Read OR Edit mode. Edit Mode of parent card does NOT affect Document Entries section.
3. **Category locked when adding from card** — pre-selected, read-only. Free-choice ONLY via Documents Tab Add.
4. **Document Entry modals are independent** of parent card save state
5. **Deletion is global** — deleting from anywhere deletes everywhere
6. **One shared entry, not a copy** — linked person sees same entry, not duplicate
7. **Linked People are read-only in entries** — Linked Summary Card never owns data
8. **Required fields lock after KYC verification** — First Name, Family Name, DOB lock; lock icon + tooltip
9. **No unsaved data loss** — "Unsaved Changes" modal on exit
10. **Expiry reminders are automatic** — 180/60/30 days before expiration → Tasks card
11. **Multiple files per entry** — display "2 files" + thumbnails
12. **No duplicate relationships** — same pair cannot have identical relationship link without different type/role
13. **Calendar date validation** — invalid dates blocked; End ≥ Start enforced
14. **Anchor-relative role labels** — role under person name is always relative to currently viewed record
15. **No modals for Document Entries** — form expands inline, user stays in context
16. **Location required IF no file** — but optional if file uploaded
17. **AES-256 encryption always applied** to uploaded files
18. **Edit Mode does not affect entries section** of parent card
19. **One Linked Summary Card editable at a time** in Family & Relationships Edit Mode
20. **No silent group re-ordering** — relationship type changes require explicit Save

---

## J. Edge Cases / Conditional Behaviours

1. Past expiry date → soft warning "This date is in the past. Please review the expiry date."
2. No expiry date → display "Updated/Uploaded [date]" instead of "Expires [date]"
3. "Other" Document Type → "Describe Document Type" required (max 80 chars)
4. "Cloud" location → "Cloud Storage Link" field opens (URL validation)
5. "Other" location → "Please specify" required free-text
6. Multi-file → reorder + delete individual + view individual previews
7. Primary email change → verification modal triggered
8. Primary address country change → legal recalculation triggered
9. Relationship type change (Partner → Former) → auto-regroup to Extended Family
10. Person deleted from My Family/Network → linked entries orphaned (entry stays, link severed)
11. Unsaved data on close → "Unsaved Changes" modal (Don't Save / Save)
12. Date validation fail → inline error "This date is invalid"
13. Required field missing → Save disabled, inline error
14. No files + no location → entry in "informational" state (placeholder)
15. Archived entry → expiry reminders DON'T fire
16. Person linked across multiple entries → each independent; editing person updates all
17. Mobile/responsive → entry rows stack vertically; action menu remains tappable

---

## K. Integrations

### K.1 Tasks & Reminders
- Trigger: entry with Expiry Date
- Schedule: 180d (early), 60d (moderate), 30d (urgent)
- Task label: "[Entry Name] expires in X days"
- Stops if: archived, deleted, expiry removed

### K.2 Vault Integration
- Directory: `/Vault/My Documents/[Category]/[Entry Name]/`
- Categories: Identity & Vital · Relationship & Status · Medical Records · Education · Employment & Affiliations · General
- Each entry = folder with files + metadata JSON
- Filtering: category · expiry status (Active/Expiring/Expired/Archived) · file status · linked person · modification date
- Search: full-text on entry name, type, notes

### K.3 Documents Tab
- All entries grouped by category
- Each: compact card (Entry Name · Document Type · Expiry Status · File Indicator · Linked People)
- Sort: category default; expiry date; modification date; linked person
- Filter: category · expiry status · file status · linked person · date range
- Search: real-time, on entry name + type + notes; results show category badge

### K.4 Album Tab
- Stores: Avatar photos (Profile Images folder); image files from Document Entries (with context)

### K.5 Life Story / Memorial Page
- Pulls from: Essential Info (Identity) · Education (timeline) · Employment (career) · Beliefs/Hobbies (legacy) · Medical (health, if shared) · Family (family timeline)
- Auto-generates: chronological timelines, narrative from notes, grouped sections

---

## L. Entry-Row Display Specs

### Collapsed (left → right)
1. Entry Type Icon
2. Entry Name (primary, black, bold)
3. Document Type (secondary, grey, smaller)
4. Expiry/Update Date (right-aligned or inline; color-coded per status)
5. File/Location Indicator (status dot)
6. Action Menu (⋯) — far right, always visible

### Expanded (inline, on click)
- All collapsed fields PLUS:
- Location of Original Document
- Location Details (free text)
- Uploaded Files (File Row Cards with trash + preview)
- Notes & Instructions
- Linked People (Linked Summary Cards, expandable)
- Timeline (milestones with labels + dates + notes)

---

## M. Validation Rules (consolidated)

| Field | Rule |
|-------|------|
| Entry Name | Required, 1–120 chars, free text |
| Document Type | Required, dropdown or "Other" + describe |
| "Describe" (Other type) | Required if Type = Other, max 80 chars |
| Expiry Date | Optional, valid calendar date |
| Location of Original | Required IF no file uploaded |
| Cloud Storage Link | Required IF Location = Cloud, valid URL |
| "Please specify" (Other location) | Required IF Location = Other |
| Notes | Optional, free text |
| Files | Multi, max 10 MB each, format-validated |
| Linked person (First Name) | Required, 1–80 chars |
| Linked person (Family Name) | Required, 1–80 chars |
| Linked person (Email) | Format-validated if entered |
| Linked person (Phone) | Country code + valid format |
| Timeline Year | Required for milestone |
| Timeline Day | Requires Month |
| End Date | ≥ Start Date |
| Divorce Date | ≥ Marriage Date ≥ Relationship Start |

---

**Status:** This document is the canonical implementation reference. When in doubt, check this. When this and the source spec disagree → spec wins; update this doc.
