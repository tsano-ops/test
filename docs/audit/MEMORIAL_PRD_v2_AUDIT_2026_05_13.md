# Memorial Page PRD v2 — Line-by-line Implementation Audit

**Audit date:** 2026-05-13
**Source PRD:** "PlanAfter Memorial Page Creation & Management Product Requirements Document v2"
**Audited files:**
- `html-prototype/post-loss-memorial.html` (2,922 lines — published memorial display)
- `html-prototype/post-loss-memorial-create.html` (1,506 lines — creation wizard)
- `html-prototype/record.html` (Memorial tab inside record)
- `html-prototype/post-loss.html` (Quick Actions Memorial entry)

**Legend:**
- ✅ **DONE** — built and matches PRD
- 🟡 **PARTIAL** — partially built, gaps identified below
- ❌ **MISSING** — not built at all
- 🔵 **N/A** — out of scope for HTML prototype (requires backend)

---

## §1. Product Context and Position in PlanAfter
| Item | Status | Notes |
|---|---|---|
| Memorial reachable from Post-Loss Quick Actions | ✅ DONE | `post-loss.html` → "Memorial Page" sidebar item routes to `post-loss-memorial.html` |
| Memorial reachable from Care Plan step | 🟡 PARTIAL | Care Plan tab exists in `record.html` with seeded steps but Memorial-related step does not yet open the wizard |
| Memorial reachable from Memorialization tab on person record | ✅ DONE | `record.html` Memorial tab implemented with hero + 4-card grid + empty state |
| Memorial does not feel like an isolated website builder | ✅ DONE | All pages use the platform shell (sidebar, header, AI panel) |

## §2. Core Product Principle — Memorial is person-based
| Item | Status | Notes |
|---|---|---|
| Memorial linked to specific deceased person record | 🟡 PARTIAL | `peopleStore` has deceased members (jds/jsm/bw) but the create wizard does not yet enforce the link or write back to the record |
| Cannot exist without linked record | ❌ MISSING | Current create flow is a copy of `post-loss-flow.html` with title change — no person record enforcement |
| Person must be marked deceased before memorial creation | ❌ MISSING | Status check not implemented |
| Memorial data written back to person record | 🟡 PARTIAL | `record.html` Memorial tab reads from `peopleStore` but write-back not wired |

## §3. Governance Model — PlanOwner-only authority
| Item | Status | Notes |
|---|---|---|
| Single authoritative editor | ❌ MISSING | No role check in any memorial page |
| Suggestion mode for non-PlanOwners | ❌ MISSING | No suggestion vs. direct-edit distinction in UI |
| Audit retention of rejected suggestions | 🔵 N/A | Backend |

## §4. Product Goals (4 actions)
| Item | Status | Notes |
|---|---|---|
| Create memorial via guided setup flow | ❌ MISSING | Wizard is title-only stub |
| Maintain memorial over time | 🟡 PARTIAL | Display page has edit affordances but no proper save/draft cycle |
| Support private/invite-only inside PlanAfter | 🟡 PARTIAL | Visibility options shown in Settings panel as static radios (no enforcement) |
| Support public memorial on dedicated domain | 🟡 PARTIAL | Mentioned in Settings panel and in copy as `www.<name>.RememberedAfter.com` but no actual external publishing |

## §5. Scope (full memorial lifecycle)
| Item | Status | Notes |
|---|---|---|
| Access rules and role model | ❌ MISSING | Not enforced anywhere |
| Creation flow from all entry points | 🟡 PARTIAL | Entry points wired but flow itself is a stub |
| Verification and plan-entitlement gates | ❌ MISSING | No gate UI built |
| Privacy: private / invite-only / public | 🟡 PARTIAL | Static radios in Settings — no logic |
| Public publication domain + URL | 🟡 PARTIAL | Copy says RememberedAfter.com but no live setup form |
| Theme behavior — Basic vs Premium | 🟡 PARTIAL | 10 themes built and selectable but no plan-based locking |
| Section-by-section editing rules | 🟡 PARTIAL | Sections exist but suggestion vs. direct-edit not split by role |

## §6. Alignment with Post-Loss Support module
| Item | Status | Notes |
|---|---|---|
| Memorial feels like a continuation of post-loss flow | ✅ DONE | Uses same shell, same gradient pad treatment, same fonts |

## §7. Eligibility — verification gate + plan entitlement
| §7 sub-item | Status | Notes |
|---|---|---|
| §7.1 Authentication check | ❌ MISSING | Not built (prototype assumes signed-in) |
| §7.2 Verified-user-only access | ❌ MISSING | No verification gate UI |
| §7.2 Title/Body/CTAs of verification block | ❌ MISSING | "Verify your account to continue" modal not built |
| §7.3 Capability matrix Basic vs Premium | 🟡 PARTIAL | Capabilities exist but no gating logic |
| §7.3 Memorial creation from Quick Actions/Care Plan/Mem tab — Both tiers | ✅ DONE | Entry points wired |
| §7.3 Public publication — Premium only | 🟡 PARTIAL | UI text says Premium-only but no enforcement |
| §7.3 Theme choice — Premium only | ❌ MISSING | 10 themes selectable for everyone |
| §7.4 RememberedAfter.com domain | 🟡 PARTIAL | Mentioned in settings & docs but no flow to claim subdomain |

## §8. Role Model
| §8 sub-item | Status | Notes |
|---|---|---|
| §8.1 PlanOwner full authority | ❌ MISSING | No role differentiation |
| §8.2 Contributor — suggestion mode only | ❌ MISSING | No suggestion UI |
| §8.3 Executor — operator, not editor | ❌ MISSING | No role differentiation |
| §8.4 Beneficiary — read-only unless allowed | ❌ MISSING | No role differentiation |

## §9. Sharing / Release / Download Rules
| §9 sub-item | Status | Notes |
|---|---|---|
| §9.1 Only PlanOwner can share | ❌ MISSING | No share-gate by role |
| §9.2 Only Executor can release | ❌ MISSING | No release-flow UI |
| §9.3 Download permissions by role | ❌ MISSING | No download gates |

## §10. Memorial-Obituary access parity from person record
| Item | Status | Notes |
|---|---|---|
| Both under Memorialization tab | ✅ DONE | Memorial tab in `record.html` shows both as cards |
| Memorial tab only when person marked deceased | ✅ DONE | `body.pa-deceased` class controls tab visibility |
| Sibling tools under shared access state | 🟡 PARTIAL | UI shows both but no shared access state model |

## §11. Entry Points
| Entry Point | Status | Notes |
|---|---|---|
| A. Post-Loss → Quick Actions → Memorial Page | ✅ DONE | Sidebar item routes correctly |
| B. Deceased Person Record → Care Plan → Memorialization step | 🟡 PARTIAL | Care Plan has steps but Memorial step not specifically routed |
| C. Deceased Person Record → Memorialization tab | ✅ DONE | Memorial tab in record.html |
| All resolve to same memorial object model | ❌ MISSING | No memorial object model in prototype |

## §12. High-Level Creation Flow (7 steps)
**Status: ❌ MISSING — current `post-loss-memorial-create.html` is a copy of the Personalization Flow, not the memorial wizard.**

| Step | Status | Notes |
|---|---|---|
| Step 0 — Access validation | ❌ MISSING | No verification check |
| Step 1 — Identify or confirm person | ❌ MISSING | Identity-match logic not built |
| Step 2 — Memorial person details + setup | ❌ MISSING | Fields not built |
| Step 3 — Choose your plan (conditional) | ❌ MISSING | Plan-comparison step not built |
| Step 4 — Privacy and publishing | ❌ MISSING | Not built as separate step |
| Step 5 — Theme/design (conditional) | ❌ MISSING | Theme step in wizard not built (themes only on display page) |
| Step 6 — Memorial ready state | ❌ MISSING | Not built |
| Step 7 — First-run onboarding | ❌ MISSING | Not built |

## §13. Step 0 — Access Validation
**Status: ❌ MISSING entirely.** No signed-in check, no verification check, no role check, no plan-entitlement check before opening wizard.

## §14. Step 1 — Identity check (1A + 1B)
| Item | Status | Notes |
|---|---|---|
| §14.1 First name + Last name + DOB input | ❌ MISSING | |
| §14.2 Existing-record search on Next | ❌ MISSING | |
| §14.3 Outcome A — matching record found + deceased-check modal | ❌ MISSING | |
| §14.4 Outcome B — auto-create new person record | ❌ MISSING | |

## §15. Step 2 — Memorial Person Details
| Item | Status | Notes |
|---|---|---|
| §15.1 Middle / Gender / Relationship / Designation / Country fields | ❌ MISSING | Fields not built |
| §15.1 Expandable optional Birth/Death city/state | ❌ MISSING | |
| §15.2 Data persistence to person record | ❌ MISSING | |

## §16. Step 3 — Choose Your Plan (Basic users only)
| Item | Status | Notes |
|---|---|---|
| Conditional visibility (Basic only) | ❌ MISSING | |
| Side-by-side Basic vs Premium comparison | ❌ MISSING | |
| In-flow upgrade CTA | ❌ MISSING | |

## §17. Step 4 — Privacy and Publishing Options
| Item | Status | Notes |
|---|---|---|
| §17.1 Basic: Private + Invite-only choices | 🟡 PARTIAL | Choices shown in Settings panel of *display* page, not in *creation* wizard |
| §17.1 Premium: + Public option | 🟡 PARTIAL | Same as above |
| §17.4 Subdomain uniqueness validation | ❌ MISSING | Live subdomain form not built |
| §17.4 RememberedAfter.com URL pattern | 🟡 PARTIAL | Mentioned in copy but no input field |
| §17.5 Terms acceptance required | ❌ MISSING | No Terms checkbox |

## §18. Step 5 — Theme and Design (conditional)
| Item | Status | Notes |
|---|---|---|
| §18.1 Basic: default design only, locked | ❌ MISSING | Basic users currently see all 10 themes |
| §18.1 Informational note about no personalization | ❌ MISSING | |
| §18.2 Premium: choose from themes | ✅ DONE | 10 themes built (Classic/Warm/Modern/Nature/Night/Cherry/Mountain/Candle/Child/Veteran) |
| §18.2 Theme changeable later | ✅ DONE | Theme switcher in Settings panel |
| §18.2 Theme change preserves content | ✅ DONE | Theme is presentation-only |

## §19. Step 6 — Memorial Ready State
| Item | Status | Notes |
|---|---|---|
| Create memorial object | 🔵 N/A | Backend (prototype has no storage) |
| Link to deceased person record | ❌ MISSING | |
| Persist privacy/theme/settings | 🔵 N/A | Backend |
| Confirmation state + routing to admin | ❌ MISSING | |

## §20. Step 7 — First-Run Onboarding
| Item | Status | Notes |
|---|---|---|
| First-run onboarding tour | ❌ MISSING | Not built |
| Skippable + replayable | ❌ MISSING | |

## §21. Memorial Administration Experience
| Item | Status | Notes |
|---|---|---|
| Direct PlanOwner editing | 🟡 PARTIAL | Edit affordances on display page (life chapters Add CTA, Stories input) but no save/draft cycle |
| Suggestion intake from Contributors | ❌ MISSING | No suggestion UI |
| Scoped Beneficiary viewing | ❌ MISSING | |
| Task/release workflows | ❌ MISSING | |
| Audit-safe changes | 🔵 N/A | Backend |
| Public publication controls — Premium only | ❌ MISSING | Not gated |

## §22-27. Memorial Tabs (About / Life / Gallery / Stories / Admin)
**Status: ❌ MISSING tab structure.** Current `post-loss-memorial.html` is a single scrolling page with stacked sections, not a tabbed admin.

| §22 Tab | Status | Sections built that map to it |
|---|---|---|
| §23 About | 🟡 PARTIAL | Hero + Epitaph + Tribute Triplet (Lay Flower / Light Candle / Leave Note) exist as scrolling sections — should be the About tab |
| §24 Life | 🟡 PARTIAL | "A Life Remembered" chapter editor exists with Add Chapter CTA, rich-text not yet wired |
| §25 Gallery | 🟡 PARTIAL | Photos section + Voices/Audio section + Background Music exist — should be unified Gallery tab with Photo/Video/Audio sub-surfaces |
| §26 Stories | 🟡 PARTIAL | Stories Wall with input area + list exists — should be the Stories tab |
| §27 Admin | 🟡 PARTIAL | Memorial Settings panel with Privacy/Roles/Reminders exists — should become full Admin tab |

### §23.2 About Tab — rich-text editor
| Item | Status | Notes |
|---|---|---|
| Bold / italic / underline / quote / bullet / numbered / hyperlink | ❌ MISSING | Currently plain textarea |
| Save draft / Publish / Cancel actions | ❌ MISSING | |

### §23.3 Tribute area — submission mode for non-owners
| Item | Status | Notes |
|---|---|---|
| Lay a Flower / Light a Candle / Leave a Note tribute UI | ✅ DONE | 3-tribute triplet built |
| Submission-as-suggestion for non-owners | ❌ MISSING | All actions currently work as direct-edit |

### §24 Life Tab — chapter editor + attachments
| Item | Status | Notes |
|---|---|---|
| Title (optional) + Chapter body (required) | 🟡 PARTIAL | Chapter card pattern exists but fields not formalized |
| Rich-text formatting | ❌ MISSING | |
| Save / Publish / Edit / Delete / Reorder per chapter | ❌ MISSING | Only "Add Chapter" exists |
| Attachments: Images (10MB) / Docs (25MB) / Audio (50MB) / Video (100MB) | ❌ MISSING | No per-chapter attachment field |

### §25 Gallery Tab
| Item | Status | Notes |
|---|---|---|
| Sub-surfaces for Photos / Videos / Audio | 🟡 PARTIAL | Three sections exist (Photos / Voices / Music) but not unified Gallery tab with sub-tabs |
| Upload via drag/drop | 🟡 PARTIAL | Drag/drop exists on obituary photo, not on memorial Gallery |
| Title / caption / visibility per item | ❌ MISSING | |
| Format limits documented in UI | ❌ MISSING | |

### §26 Stories Tab
| Item | Status | Notes |
|---|---|---|
| Story editor (Title + Body + Author) | 🟡 PARTIAL | Title + Body inputs exist; Author attribution not wired |
| Rich-text formatting | ❌ MISSING | |
| Save / Publish / Edit / Hide / Remove | ❌ MISSING | |
| Attachments (Images/Docs/Audio/Video with limits) | ❌ MISSING | |

### §27 Admin Tab
| §27 sub-item | Status | Notes |
|---|---|---|
| §27.1 Edit page | ❌ MISSING | |
| §27.1 Add/replace cover picture | ❌ MISSING | |
| §27.1 Change theme/design | ✅ DONE | Theme switcher in Settings panel |
| §27.1 Manage privacy + public publishing | 🟡 PARTIAL | Static radios in Settings |
| §27.1 Invite people + Configure access | ❌ MISSING | |
| §27.1 Review/approve suggestions | ❌ MISSING | |
| §27.1 Notifications | 🟡 PARTIAL | Reminders block exists in Settings |
| §27.1 Archive / delete / unpublish | ❌ MISSING | |
| §27.2 Premium-only: Make public | ❌ MISSING | Not gated by plan |
| §27.2 Premium-only: Publish live | ❌ MISSING | |
| §27.2 Premium-only: Change subdomain | ❌ MISSING | |
| §27.3 Basic users see locked/upgrade CTA on premium controls | ❌ MISSING | |

## §28. Invitation Flow
| Item | Status | Notes |
|---|---|---|
| Contact/person selector | ❌ MISSING | |
| Optional create-new-person inline | ❌ MISSING | |
| Role / Access level / Scope / Timing / Notes | ❌ MISSING | |
| Reuses platform invite logic | ❌ MISSING | |

## §29. Suggestion Flow
**Status: ❌ MISSING entirely.** All current edit actions on display page are direct-edit; no suggestion vs. direct-edit role distinction.

## §30. Event-Based and Post-Mortem Release
| Item | Status | Notes |
|---|---|---|
| Post-mortem release | ❌ MISSING | |
| Life-event release | ❌ MISSING | |
| Executor-triggered confirmation | ❌ MISSING | |
| Release-without-content-view rule | ❌ MISSING | |

## §31. Notifications
| Role | Status | Notes |
|---|---|---|
| PlanOwner — full control | 🟡 PARTIAL | Reminders block in Settings |
| Contributor — suggestion-related only | ❌ MISSING | |
| Beneficiary — access-related only | ❌ MISSING | |
| Executor — task/release-related only | ❌ MISSING | |

## §32. Data Integration with Person Record
| Item | Status | Notes |
|---|---|---|
| Person record as canonical identity source | 🟡 PARTIAL | `peopleStore` SSOT exists; memorial does read from it |
| Memorial-only vs Memorial+Record edit prompt | ❌ MISSING | |
| Visitor stories don't overwrite record | 🔵 N/A | Backend |

## §33. Access Hierarchy and Inheritance
| Item | Status | Notes |
|---|---|---|
| Existence visibility | ❌ MISSING | |
| Readable access | ❌ MISSING | |
| Action access | ❌ MISSING | |
| Inheritance rules | ❌ MISSING | |
| Release ≠ View permission | ❌ MISSING | |

## §34. Audit, Proof, Legal Traceability
🔵 N/A — backend logging, out of HTML prototype scope.

## §35. Edge Cases
**Status: ❌ MISSING.** None of the documented edge-case flows (abandon-before-verify, plan-step abandon, No-deceased-confirmation, expired contributor access, executor-can't-serve, basic→premium upgrade) are wired.

## §36. Acceptance Criteria — 18 items
| AC | Status |
|---|---|
| 1. Memorial available from Quick Actions / Care Plan / Memorialization tab | ✅ DONE |
| 2. Every memorial linked to deceased person record | ❌ MISSING |
| 3. Memorial+Obituary same access logic from person record | 🟡 PARTIAL |
| 4. Creation+admin blocked for unverified users | ❌ MISSING |
| 5. Basic = private/invite-only | 🟡 PARTIAL |
| 6. Premium adds public + live external domain | 🟡 PARTIAL |
| 7. Basic cannot choose themes; Premium can | ❌ MISSING |
| 8. Public URL = www.<name>.RememberedAfter.com | 🟡 PARTIAL |
| 9. Only PlanOwner edits/publishes/approves/archives/deletes | ❌ MISSING |
| 10. Contributors only suggestion-mode | ❌ MISSING |
| 11. Executors release without content visibility | ❌ MISSING |
| 12. Beneficiaries read-only unless download allowed | ❌ MISSING |
| 13. Step 1 identity-check logic | ❌ MISSING |
| 14. Choose Plan step conditional on Basic | ❌ MISSING |
| 15. Privacy options plan-aware | ❌ MISSING |
| 16. About / Life / Gallery / Stories / Admin tabs follow role model | ❌ MISSING |
| 17. Attachment formats + limits enforced where supported | ❌ MISSING |
| 18. (implied) Suggestion approval audit retention | 🔵 N/A |

---

## SUMMARY — what's actually done vs. PRD

### ✅ Things that ARE built and match PRD
- Memorial entry points wired (Quick Actions / Memorialization tab)
- Memorial tab only when person marked deceased (`body.pa-deceased` class)
- 10 themes built and switchable (Classic / Warm / Modern / Nature / Night / Cherry / Mountain / Candle / Child / Veteran)
- Memorial display sections: Hero / Tribute Triplet / Life Timeline / LIFE chapters / STORIES / Tribute Wall / Photos / Voices / Music / Service & Events / QR / Settings
- Memorial Settings panel mentions Privacy/Public/Premium correctly in copy
- RememberedAfter.com mentioned in copy
- Canonical 312px gradient applied to memorial cards

### 🟡 Things that are PARTIALLY built (significant gaps)
- Privacy options — radios exist but no enforcement
- Plan-tier distinction — copy mentions Basic vs Premium but no gating
- Public publication — copy mentions external domain but no live setup flow
- Care Plan entry point — Care Plan exists but Memorial-related step not specifically wired to the wizard

### ❌ Things that are MISSING ENTIRELY (the bulk of PRD v2)
1. **The 7-step Creation Wizard** (§12-20) — current `post-loss-memorial-create.html` is just the Personalization Flow with title changed
2. **Verification gate** (§7.2) — no UI built
3. **Plan entitlement gates** (§7.3, §16, §18.1) — no logic
4. **Identity-match logic** (§14) — Step 1A/1B not built
5. **Memorial Person Details step** (§15) — fields not built
6. **The 5-tab admin structure** (§22 — About / Life / Gallery / Stories / Admin) — current page is single scroll, not tabbed
7. **Role-based behavior** (§8, §27) — no PlanOwner / Contributor / Executor / Beneficiary differentiation
8. **Suggestion mode** (§29) — all edits are direct-edit
9. **Invitation flow** (§28) — not built
10. **Event-based and post-mortem release** (§30) — not built
11. **Rich-text editors** for About / Life / Stories — currently plain textareas
12. **Attachment uploaders with format/size limits** per Life / Gallery / Stories — only obituary has the canonical drop zone
13. **Public subdomain claim form** with uniqueness validation (§17.4) — not built
14. **Edge cases** (§35) — none handled
15. **First-run onboarding** (§20) — not built

---

## HONEST CONCLUSION
- The **display side** of memorial (themes, sections, the look) is ~70% there.
- The **creation wizard + admin/role model** is ~5% there — only entry points wired; the actual 7-step flow + 5-tab admin + role gating are essentially not built.
- **Plan-tier gating, verification, identity-match, suggestion mode** — entirely missing.

This audit reflects the prototype's current state honestly. Several hours of focused work are needed to close the gaps in priority order:
1. Build proper 7-step creation wizard (replace the stub copy of personalization flow)
2. Convert single-scroll memorial display into 5-tab admin (About / Life / Gallery / Stories / Admin)
3. Add verification gate + plan-tier gating
4. Add identity-match step + person-record write-back
5. Add suggestion mode for non-owners
6. Add invitation flow + role-based access UI
7. Add rich-text editors + attachment uploaders per tab
