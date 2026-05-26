# My Profile — Detailed Specification

_Source: Google Doc "2.1. My Profile — Personal Record of the PlanOwner"_
_Note: Document has some inconsistencies — CEO aware. Use XD for visual truth, this doc for logic._

---

## 2.1.1 Introduction

**Record Type:** Core Personal Record (PlanOwner)
**Location:** Me, My Family and My Network → My Profile

**Purpose:** Store and manage ALL personal, legal, identity, documentary, medical, educational, professional, relational, emotional, and legacy-related information about the PlanOwner.

**This record powers:**
- Account identity & ownership
- Verification (KYC / eID)
- Family Tree structure
- Inheritance engine (jurisdiction, spouse/children logic)
- Will & Legal document generation
- Vault classification
- Executor rights & access
- Emergency logic
- Notification logic
- Personalized tasks from AI Planning Engine
- Emotional Legacy (letters, values, life story)
- Timeline & life events
- Data consistency across the whole platform

**Cross-Link Logic — Single Source of Truth (SSOT) for:**
- Legal name, DOB-DOD, Citizenship/s & jurisdiction
- Marital status, Children, Contacts, Emergency contacts
- ID documents, Medical factors, Education & employment
- Beliefs & values, Shared With permissions, Verification status

**Any change here updates:** Settings, Family Tree, Other Records (Family, Members, Pets), Will & legal documents, Executor permissions, Beneficiaries, Emotional legacy routing, Vault categories, Financial planning logic, Account settings

---

## 2.1.2 Creation Methods

**Automatically during onboarding** — foundational identity and legal anchor of the entire PlanAfter account. All other records, legal documents, assets, family relationships, executors, beneficiaries, and permissions derive logic from this core record.

---

## 2.1.4 My Profile Record Structure

### Header
The "business card" of the record: identity, status, verification, and access. Identical in logic to Family/Pet/Network records but includes **additional layers ONLY for PlanOwner** (KYC verification).

### Tabs
| Tab | Purpose |
|-----|---------|
| Overview | Displays all structural cards and data sections |
| Document Entries | Centralized view of all documents with add ability |
| Album | Centralized view of all photos/media with upload |
| Life Story | Unified place: Life Events & Milestones, reflections, "Goals & Aspirations." Visualized as DNA spiral, category list, or timeline |
| Memorial | Only when deceased — dedicated space to honor memory |

---

## 2.1.4.3 Cards (Sections in Tab Overview)

| # | Color | Card | Subtitle | Narrative |
|---|-------|------|----------|-----------|
| 1 | 🟩 | Essential Info | Your core identity information - the foundation of your entire plan | Identity verification, security controls, legal template logic, post-loss activation |
| 2 | 🟧 | Contact Info | Your key contact details | Contact channels for identity verification, notifications, system workflows |
| 3 | 🟦 | Family & Relationships | The family structure that shapes your plan | Family structure, inheritance, guardianship, family-tree connections |
| 4 | 🔴 | Medical Info | Health information & records | Medical reports, diagnoses, treatments — helps doctors in emergencies |
| 5 | 🟣 | Education | Education & qualifications | Diplomas, certificates, learning milestones — contributes to Life Story |
| 6 | 🟫 | Employment & Affiliations | Work history & memberships | Work roles, employment docs, professional memberships |
| 7 | 🟨 | Beliefs, Hobbies & Interests | Personal values & interests | Values, cultural background, baptism records, hobby achievements |
| 8 | 🔵 | Roles & Access in Your Plan | The place to manage other roles and access | Manage roles, permissions, trusted individuals |
| 9 | 🟢 | Tasks & Reminders | Planning, responsibilities & document updates | Important tasks, renewal dates, follow-ups — organized in one space |
| 10 | 🟫 | Shared With | Who can access this record and what they can see | Full control over privacy, ensures right people are informed |

---

## Record Summary Cards

| Card Type | Density | Editable | Purpose |
|-----------|---------|----------|---------|
| Record Header Summary Card | High | Controlled actions | Full identity & lifecycle context |
| Linked Summary Card | Medium | No | Recognition & navigation |
| Expanded Linked Summary Card | Medium+ | No | Quick interaction |
| Compact Linked Summary Card | Low | No | Structural visualization |

---

## Header Card Fields & Behavior

### 1.1 Back Button Navigation
- **Behavior:** Click → return to previous directory (e.g., Dashboard)
- **Visuals:** Left arrow (<), text "Back", dark gray text
- **Hover:** Text turns PlanAfter Primary Green, tooltip "Go back to your previous view."
- **Use Cases:** Dashboard→Profile, FamilyTree→Profile, etc.

### 1.2 Interactive Avatar
**States:**
- Empty → initials from Person Name
- Filled → uploaded photo

**Status dot (life status):**
- 🟢 Green → Living
- 🔴 Red → Deceased
- ⚪ Grey → Unknown

**Interactions:**
- Click → Scroll to Essential Info avatar field
- Hover avatar → "Click to update photo."
- Hover status dot → shows "Living" / "Deceased" / "Status unknown"

### 1.3 Full Legal Name
- Displays prominently in Record Header Card
- **Synchronization:** Name entered at registration → updates Essential Info → auto-parses First Name, Middle Name, Last Name across platform

---

### 1.4 Breadcrumb Navigation
- **Format:** Category / Role (e.g., My Profile / This is You)
- **Styling:** All text is Gray, separated by slash /
- **Category** — Clickable, navigates to parent. Hovering turns text Green.
- **Role** — **Non-Clickable.** Plain text. Fixed to "You."
- Other records: My Family/Son, My Family/Father, My Network/Doctor, My Network/Friend

### 1.5 Date of Birth (age XX — calculated as per today)
- **Format:** Mon DD, YYYY (3-letter month abbreviation) e.g., `Jan 05, 1991`
- **Input:** Three-number inputs or date picker (Day numeric 1-31, Month dropdown full names)
- **Display:** `Date of Birth: Jan 05, 1991 (Age 34)` — 3-letter month in display
- **Validation:** Required, valid date, not future, range 1900-current year
- **Editability:** Editable before verification → **Locked after KYC**
- **On change (before verification):** Confirmation dialog → Recalculate age, Update Family Tree, Update legal templates
- **Edge case:** Age < 14 or > 120 → Soft warning "This age seems unusual."
- **Hover:** "Your date of birth affects legal logic, inheritance rules, and how your story and age appear across your plan."

### 1.6 Date of Death (DOD)
- **Visible only when record marked as deceased** (hidden by default)
- **Text:** "Date of Death: Age at Passing:"
- Same date format as DOB

### 1.7 Role in Your Plan
- Fixed "PlanOwner" for self-profile, varies for family/network records

### 1.8 Shared To
- Avatar list of people with access
- **Text Hover:** "These people have access to your profile, depending on the permissions you've set."
- **Avatar Hover:** Contact name + role in your life

### 1.9 Side Menu (Black Action Bar)
- **Width:** 50px (XD) — doc says 72px but XD is visual truth
- **Background:** #000000, rounded right edge (border-radius: 0px 30px 30px 0px)
- **Icons (top to bottom):**
  1. Verified Rosette (Green) — shows verification status
  2. User Plus — "Add Family"
  3. Tray Download — "Download"
  4. Curved Share — "Share with"
- **Tooltips:** Appear to the LEFT on hover
- **Icon states:** opacity 0.33 default → opacity 1 on hover

### 1.10.1 Verification Status Badge
| Status | Color | Behavior |
|--------|-------|----------|
| UNVERIFIED | Red | Button "Verify Now" → starts KYC |
| PENDING | Yellow/Orange (#FF9500) | Hover text, disables editing of certain fields |
| VERIFIED | Green (#61C553) | Locks key identity fields |
| FAILED | Orange | Retry button |

---

_Document has 7 pages in HEADER CARD tab + 272 pages in TAB 1: OVERVIEW tab._
_Reading continues..._
