# PlanOwner Record — Overview Tab (Full Spec)

> Master spec for all 10 cards in the PlanOwner Record's Overview tab. Provided in full by Violetka on 2026-04-26 and represents the canonical structure for PlanOwner cards (and, where indicated, Family Member / Pet / Network Contact records too).

---

## Cards in Overview tab (always visible, in this order)

1. **Essential Info** — core identity (name, DOB, citizenships, residence, photo) + Document Entries (Identity & Vital Documents)
2. **Contact Info** — emails, phones, addresses, social profiles
3. **Family & Relationships** — relationship structure (Partner / Children / Parents / Siblings / Pets / Extended Family) + Document Entries (Relationship & Status Documents)
4. **Medical Info** — Emergency Medical Card (read-only snapshot) + grouped sections (Blood Type / Allergies / Medical Conditions / Medical Devices/Implants / Legal Medical Documents / Other Medical Info)
5. **Education** — Educational Qualifications / Professional Certifications / Other Education
6. **Employment & Affiliations** — Employment Entries / Memberships & Affiliations
7. **Beliefs, Hobbies & Interests** — Beliefs / Hobbies / Interests
8. **Roles & Access in Your Plan** — plan-level role assignments (Executor / Beneficiary / Contributor) + Data Access Summary + Role Tasks
9. **Tasks & Reminders** — Active / Completed lists + AI Suggestions + Add New Task flow with delegation
10. **Shared With** — record-level sharing (Read-only / Contributor / Release Task), scope (Full / Partial), timing (Immediate / Specific Date / On Event / Post-Mortem)

---

## Cross-card unified patterns (apply everywhere)

### Card states (universal)
- **Collapsed**: title + subtitle + caret only. No preview. Click anywhere → expand to Read Mode.
- **Read Mode**: shows narrative + edit pencil (top-right) + populated content sections only. Empty sections hidden.
- **Edit Mode**: triggered by pencil icon. Inputs become editable. Locked fields (after KYC) show lock icon. Unsaved changes attempt → "Unsaved Changes" modal (Don't Save / Save).

### Entry Form pattern (universal — used in cards 4, 5, 6, 7)
Every "+ Add New Entry" button transforms inline into a full-width form (no modal, no navigation). Form has 3 sections:
- **About This Entry** — Category dropdown determines conditional fields per category. Includes Adaptive Timeline Builder.
- **Documentation & Storage** — Location dropdown (Home Safe / Lawyer's Office / Bank Deposit / Cloud / Other) + Specific Storage/Location Details + File Upload Dropzone (multiple files per entry) + Important security note.
- **People & Contacts** — Add Contact searchable dropdown (My Family + My Network, sorted A-Z) + linked Expanded Linked Summary Cards. "Create new" launches Person Record Quick Creation flow.

### Document Entries pattern (used in cards 1, 3 — also Document Entries tab)
Card has its own Document Entries section that's always visible. Documents added from a card auto-tag with `linked_to=<card name>` and `category=<card-specific>` (locked). Same Document Entry pattern across all cards.

### Adaptive Timeline Builder (universal in entry forms)
- Pill buttons for each Date type (varies per card category)
- Click pill → expanded with Year* (required) + Month + Day + Caption + "Add Context..." textarea + "Details & Notes" caption + × close
- Partial dates allowed (Year-only valid)
- Display in read mode: "[Date Label] - [Adaptive Precision Value]"
- Custom date allowed multiple times (with free-text Event Label)

### File Upload Dropzone (universal)
- Dual zone: Upload File (left) + Drag and Drop File Here (right) + vertical divider
- Dashed border, light grey, rounded
- Hover Upload File side: white circular bg behind icon + text shifts right
- States: Empty → Uploading → Uploaded → Error
- Uploaded files appear as File Row Cards BELOW the dropzone
- Multi-file support, individual delete with confirmation
- Click file name/icon → opens Document Preview modal

### Person Record Quick Creation (universal)
Two types via Directory Type Selector pill (My Family preselected for some cards / My Network preselected for entries):

**TYPE A — My Network**: First/Last Name + Relationship Type Layer 1 (per-card vocabulary) + Layer 2 (free-text if "Other") + Avatar + multiple Email/Phone/Social entries + Notes. Required fields validation. New record appears in My Network + linked to entry.

**TYPE B — My Family**: First/Last Name + Date of Birth + Relationship Type Layer 1 (Partner/Spouse, Former Partner/Spouse, Child, Parent, Sibling) + Layer 2 (Specific Role from canonical list per type) + Avatar + Email/Phone/Social + Notes. New record appears in My Family + linked.

### Expanded Linked Summary Card (universal)
Read-only projection of authoritative Person Record. Never owns data.

**Collapsed view:** Avatar + Life Status dot + Full Name + Specific Role (Layer 2, anchor-relative) + Relationship Timeline (conditional) + DOB+Age + DOD (conditional) + Role-in-Plan badge.

**Inline expanded view:** Adds Primary Email + Additional Emails + Primary Phone + Additional Phones + Primary Address + Social Profiles (only populated fields shown, no placeholders).

**Action menu (⋯):** Edit (inline transformation to Contact Edit form, replacing card in place) / Remove (unlinks from current entry, doesn't delete record).

### Three-layer relationship system (universal)
- **Layer 1**: Relationship Type (system classification — Parent, Child, Sibling, etc.) — Edit Mode only
- **Layer 2**: Specific Role (user-facing — Mother, Daughter, Husband, Aunt) — always displayed, anchor-relative ("Your X" if PlanOwner / "Sarah's X" otherwise)
- **Layer 3**: Timeline conditional dates (marriage, divorce, adoption, etc.) — partial precision allowed

### Bidirectional relationships (locked)
Creating A→B auto-creates B→A with correct inverse role. One link object. Tier A auto-create (logically certain). Tier B auto-suggest (requires confirmation — e.g. spouse-of-parent → step-parent? bio? adoptive?).

### Display rules (locked)
- Only populated fields/sections shown in Read Mode
- No empty placeholders
- No edit icons inside read-only projections
- Permission-aware masking everywhere
- Date format universal: `Jan 05, 1991` (3-letter month, full year)
- DOB always combined for display: `Date of Birth: Jan 05, 1991 (Age 34)`

---

## Per-card category vocabularies & fields

### Card 4 — Medical Info categories
- Blood Type → Blood Type dropdown (A+/A-/B+/B-/AB+/AB-/O+/O-/Unknown)
- Allergies → Allergen + Severity (Mild/Moderate/Severe/Life-Threatening)
- Medical Conditions → Condition + Medications (repeatable rows: name + intake + dosage)
- Medical Devices/Implants → Device Type (Pacemaker/ICD, Insulin pump, Orthopedic, Vascular, Neurological, Hearing/vision, Other) + Location on Body
- Legal Medical Documents → Document Type (DNR, Advance Directive, Living Will, Medical Proxy, Other)
- Other Medical Info → just Notes + Documentation

**Timeline buttons (per category):** none for Blood Type; for others — Issue Date / Custom Date

**Network Layer 1 vocab:** GP / Specialist Doctor / Dentist / Mental Health Specialist / Gynecologist-Obstetrician / Pediatrician / Physiotherapist / Other

### Card 5 — Education categories
- Educational Qualification → Education Level (Primary/Secondary/Bachelor's/Master's/PhD/Professional/Other) + Degree-Specialisation + Institution Name + Country + City
  - Timeline: **Add Start Date** + **Add Graduation Date** (empty = "Current")
- Professional Certification → Certificate Name + Issuing Organisation
  - Timeline: **Add Issue Date** + **Add Expiry Date**
- Other Education → Title/Name + Issuing Organisation + Description
  - Timeline: **Add Start Date** + **Add Graduation Date**

**Network Layer 1 vocab:** Teacher / Professor / Mentor / Instructor / Tutor / Supervisor / Research Advisor / Classmate / Coursemate / Training Colleague / Other

### Card 6 — Employment & Affiliations categories
- Employment Entries → Job Title + Company/Organisation Name + Country + City
  - Timeline: **Add Start Date** + **Add End Date** (empty = "Current")
- Memberships & Affiliations → Organisation Name + Organisation Type (Professional/Academic/Non-profit/Union/Community/Other) + Role/Position (Member/Board Member/Chair/Secretary/Volunteer/Other) + Membership ID + Notes
  - Timeline: **Add Start Date** + **Add End Date** + **Add Custom Date**

**Network Layer 1 vocab — Employment:** Employer/Company Contact / HR / Direct Manager / Team Lead / Business Partner / Co-founder / Colleague / Legal-Compliance / Payroll-Benefits / Reference / Other

**Network Layer 1 vocab — Memberships:** Organisation Contact / Membership Administrator / Board Member / Chair-President / Secretary / Treasurer / Union Rep / Coordinator / Mentor-Sponsor / Fellow Member / Other

### Card 7 — Beliefs, Hobbies & Interests categories
- Beliefs → Type (Spiritual-Religious / Cultural-Ethnic / Core Values / Traditions / Other)
  - If Spiritual/Religious: Affiliation + Denomination + Level of Observance
  - If Other types: Description (required)
- Hobbies → Hobby Name + Details + Skill Level (Beginner/Intermediate/Advanced/Expert)
- Interests → Interest Category (Travel/Cooking/Music/Reading/Gaming/Gardening/Fitness/Photography/Collecting/DIY/Cars/Tech/Volunteering/Other) + Name + Description

**Timeline (contextual intelligence):** Christian → Baptism/Confirmation/First Communion/Custom; Jewish → Brit Milah/Bar-Bat Mitzvah/Wedding/Custom; Muslim → Shahada/Hajj/Eid/Custom; Hindu → Upanayana/Vivaha/Custom; Buddhist → Refuge Vows/Initiation/Custom; Hobbies → Started/Achievement/Tournament/Custom; Interests → Started Following/Significant Find/Custom

**Network Layer 1 vocab:** Spiritual/Religious Leader / Cultural Representative / Community Org Contact / Hobby Club Officer / Instructor-Trainer / Expert-Consultant / Fellow Member / Professional Advisor / Other

---

## Card-specific structure highlights

### Card 1 — Essential Info
- Avatar Two-Circle pattern (locked) with photo or initials + Status Dot (Living/Deceased/Unknown)
- Full Legal Name (First* / Middle / Family*) — locks after KYC
- Gender (optional, Male/Female/Other-with-Specify)
- DOB* — locks after KYC
- Place of Birth (optional)
- Citizenship(s)* (multi-select with one Primary)
- Country of Residence* (jurisdiction anchor)
- Document Entries section: "Identity & Vital Documents" (Passport / National ID / Driver's License / Birth Certificate / Residence Permit / EU Blue Card / Visa / Work Permit / Social Security / Name Change / Citizenship / Refugee / Death / Other)
- Subscription Banner at bottom (Individual / Family / Premium → Upgrade or Manage Plan)

### Card 2 — Contact Info
- Primary Email (login anchor — change requires verification)
- Additional Emails
- Primary Phone (with searchable country code) — only one Primary
- Additional Phones
- Primary Address (jurisdiction-defining: Address Line + City + ZIP + Country) — only one
- Additional Addresses
- Social Media Profiles (Facebook, Instagram, LinkedIn, X, TikTok, Other)
- Inline Delete confirmation Micro-Modal (NOT immediate delete)

### Card 3 — Family & Relationships
**Read mode shows (in order):**
1. Marital/Partnership Status (auto-derived from links)
2. Number of Children (auto-derived)
3. Relationship Groups: Partner/Spouse, Children, Parents, Siblings, Pets, divider, Extended Family
4. Document Entries section: "Relationship & Status Documents" (Marriage Certificate / Divorce Papers / Adoption Papers / Guardianship / Prenup / Other)

**Edit mode:**
- Hides Marital Status + Children count (derived)
- Shows all groups (even empty) with `+ Add` button
- Adds "Former Partner/Spouse" subsection under Partner/Spouse (Edit Mode only)
- Per-group "+ Add" → Search-or-Create panel inline → Step 2 Relationship Configuration with locked field-set per Specific Role
- Click linked card body in Edit Mode → expands editable Relationship Panel (Type / Specific Role / Timeline milestones / Notes)
- Action menu (⋯) per card: Open Record / Remove Relationship
- Single-edit rule: only one card editable at a time

### Card 4 — Medical Info
- Read mode shows **Emergency Medical Card** (read-only snapshot, derived from entries):
  - Full Name, DOB, Blood Type, Allergies (high-visibility pills), Conditions (compact list), Medications (compact), Devices (compact), Emergency Contacts (linked pills, expandable), Primary Doctor (linked pill)
  - Actions: Share / Download (wallet card) / Print
  - Inline `+` quick-add per snapshot block
- Then 6 grouped entry sections (only sections with entries shown)
- Each section uses the unified Entry Row Card (collapsed → inline expansion)

### Card 8 — Roles & Access in Your Plan
- Identical logic to Settings → Manage Access and Roles
- Linked Role & Access Row Card per assigned person:
  - Avatar + Life Status + Full Name + Plan Role + Status line ("Access Active · Expires in 7 days" / "Access Inactive · Post-Mortem Unlock" / etc.) + Access tag (Contributor Suggestive [blue] / Read-Only [orange] / Release Task [green]) + ⋯ menu
- Click row body → expands inline Data Access Summary (hierarchical: Directories → Categories → Sections → Records → Cards) + Role Tasks (Contributor's / Executor's / Beneficiary's, only sections relevant to assigned roles)
- Edit Panel: Access Level + Permission Scope (Full / Partial with granular checkboxes) + When granted (Immediate / Specific Date / On Event / Post-Mortem)
- Revoke confirmation inline (not modal)
- Single-edit rule

### Card 9 — Tasks & Reminders
- AI Suggestions section (2×2 grid, 4 visible at a time, replaceable from pool of 8): each tile = "Draft" tag + title + hint + Accept/Remove
- Active Tasks list + Completed Tasks list
- Done toggle circle (left) + Priority bar color (High red / Medium orange / Low grey) + Title + "Assigned to: X · Due: Date" + ⋯ menu
- Add New Task & Reminder inline form (no modal): Title* / Assigned To* (grouped: You / My Family / My Network / Create New) / Due Date / Priority (only if Me)
  - If Me: + Repeats (Does Not Repeat / Daily / Weekly-on-X / Monthly-on-X / Annually-on-X / Custom) + Ends + Reminder Date
  - If delegated: + Temporary Access To (multi-select: Full Record / Overview / specific cards / Document Entries / Album / Life Story)
- Notes & Instructions
- Delegated tasks: Send Task Invitation modal (Recipient Email / Subject / prefilled message / Cancel / Send)
- Assignee responses: Accepted (In Progress) / Rejected (with reason) / Pending (Resend Invitation button)
- Suggestion mode: assignee changes are SUGGESTED, not auto-applied — PlanOwner must approve

### Card 10 — Shared With
- Each share = single Share Permission object per contact
- Header row: Avatar + Life Status + Full Name + Specific Role + Status line ("Access Active · Expires in 7 days" / "Pending Acceptance" / "Rejected on DD/MM/YYYY" / "Revoked on DD/MM/YYYY") + Access tag (Read-Only orange / Contributor Suggestive blue / Release Task green) + ⋯ menu
- Inline accordion expansion shows all share details (Access Level / Data Access Scope / Access Granted / Access Expiration / Invitation Status with Resend button if Pending / Notes)
- Edit via ⋯ → Edit (inputs become editable)
- Add New Share modal (5 steps): Select Contact → Choose Access Level → Which Information → When Granted → Notes
- Toast feedback (bottom-right) for all state changes
- Contributor Suggestive Access = changes from contact must be approved by PlanOwner before becoming permanent

---

## Source
Provided in full by Violetka on 2026-04-26. This is the canonical spec for the PlanOwner Record Overview tab and applies to other Record types (Family Member, Pet, Network Contact) with adjustments noted in the original document.
