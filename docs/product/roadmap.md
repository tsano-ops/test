# PlanAfter Product Roadmap

_Last updated: 2026-03-24_
_Source: EPICS March 2026 — 30 epics across Phase 1 (Core/MVP) and Phase 2 (Future)_

## Current Status

- **Phase 1 auth system is complete** (signup, login, email verification, JWT tokens, refresh token rotation)
- Remaining Phase 1 epics are in active development
- Phase 2 epics are planned for post-MVP release

---

## Phase 1 — Core / MVP

### Epic 1: Registration & Onboarding

| Feature | Details |
|---------|---------|
| Email/Password Registration | Standard email + password account creation with strong password validation |
| 6-Digit OTP Email Verification | One-time password sent to email for account verification; time-limited code |
| Profile Setup | First name, last name, date of birth, country/region collection |
| Plan Source Selection | User selects how they heard about PlanAfter using radio pill selectors (.auth-source-option) |
| Stripe Checkout | Subscription plan selection and payment during onboarding flow |
| Interactive Tour | Guided walkthrough of the platform after first login, highlighting key sections |
| Life Assessment Questionnaire | Initial questionnaire to understand the user's planning needs, personalizes dashboard and task recommendations |

**Status:** Auth flow complete. Stripe checkout, interactive tour, and life assessment questionnaire pending.

---

### Epic 2: Account Types, Roles & Access

| Role | Description | Access Level |
|------|-------------|-------------|
| **PlanOwner** | Primary account holder. Single author of all plan content. Controls all sharing and distribution. | Full read/write on own plan |
| **Executor** | Trusted person designated to manage the PlanOwner's affairs after death. Invitation-based with fast-track registration. | Timed access — immediate, upon death confirmation, or delayed |
| **Contributor** | Temporary, scoped access. Suggests additions/edits only — cannot publish changes directly. | Suggestion-only; PlanOwner approval required |
| **Beneficiary** | Passive recipient. Receives content via timed or event-triggered delivery. Sees holding screen until conditions are met. | Read-only upon delivery |
| **Admin** | Platform administrator with full system management via Admin Panel. | Full system access via RBAC |

Additional features:
- Role-Based Access Control (RBAC) governs all permissions across the platform
- Sponsorship models: one user can pay for another's plan (employer-sponsored, family gifting, partner distribution)
- Role transitions and revocation managed by PlanOwner

---

### Epic 3: Dashboard & Navigation

- Personal dashboard as the primary landing page after login
- Quick-access cards for each major section (Family, Assets, Health, Letters, Vault, Tasks)
- Progress indicators showing plan completion percentage per section
- Section-level completion tracking with visual progress bars
- Recent activity feed
- Responsive layout: sidebar navigation on desktop, bottom nav on mobile
- Notification badges for pending tasks and updates

---

### Epic 4: Settings

| Feature | Details |
|---------|---------|
| Account Verification | Email and identity verification status display |
| Two-Factor Authentication | Authenticator app, SMS, and FIDO2 (hardware key) support |
| Legacy Mode Activation | Manual activation for when the PlanOwner becomes incapacitated or passes away |
| Billing Management | Subscription plan details, payment method updates, invoice history via Stripe |
| GDPR Rights | Data Subject Access Requests (DSAR), data export in machine-readable format, account deletion |
| Audit Logs | Immutable trail of all account actions — logins, edits, shares, downloads, role changes |
| Notification Preferences | Email, SMS, push notification settings per event type |

---

### Epic 5: Me, My Family & My Network

#### Profile Structure

Each person (self, family member, or network contact) has a profile with **4 tabs**:

| Tab | Purpose |
|-----|---------|
| **Overview** | Summary view with key information at a glance |
| **Document Entries** | All documents linked to this person |
| **Album** | Photo gallery and media files |
| **Life Story** | Biographical narrative and timeline |

#### Collapsible Information Cards

Each profile contains collapsible cards for the following data sections:

| Card | Contents |
|------|----------|
| **Basic Info** | Name, date of birth, gender, nationality, photo |
| **Contact** | Phone numbers, email addresses, physical addresses |
| **Medical** | Conditions, medications, allergies, blood type, healthcare providers |
| **Education** | Schools, degrees, certifications, dates |
| **Employment** | Employers, positions, dates, key details |
| **Beliefs** | Religious/spiritual beliefs, cultural traditions, values |
| **Tasks** | Tasks associated with this person |
| **Shared With** | Which roles/people have access to this person's data |

#### Family Tree

- Visual family tree with interactive nodes
- Add/edit/remove family members
- Relationship types: spouse/partner, parent, child, sibling, grandparent, grandchild, other
- Link family members to their full profiles
- Collapsible branches for extended family

---

### Epic 6: Emotional Legacy — Phase 1

| Feature | Description |
|---------|-------------|
| **Reflections** | Free-form written reflections on life, values, and experiences |
| **Memory Capture** | Record and organize significant memories with dates, people, and context |
| **Values** | Document personal values, principles, and what matters most |
| **Letters** | Write letters to loved ones for delivery at specified times or triggered by events |
| **Bucket List** | Track life goals, dreams, and aspirations with completion status |

---

### Epic 7: Body & Health

| Feature | Description |
|---------|-------------|
| **Advance Directives** | Living will, DNR preferences, end-of-life care wishes |
| **Medical Conditions** | Current and historical conditions with severity and treatment details |
| **Medications** | Active prescriptions, dosages, frequencies, pharmacies |
| **Healthcare Providers** | Doctors, specialists, hospitals with contact information |
| **Organ Donation** | Registered donor status, preferences, documentation |
| **Healthcare Proxy** | Designated healthcare decision-maker with legal documentation |
| **Allergies** | Drug, food, and environmental allergies with severity levels |

---

### Epic 8: Assets & Liabilities

#### Asset Categories

| Category | Examples |
|----------|----------|
| **Financial** | Bank accounts, investments, retirement accounts, stocks, bonds, crypto wallets |
| **Real Estate** | Primary residence, rental properties, land, commercial properties |
| **Vehicles** | Cars, motorcycles, boats, recreational vehicles |
| **Digital** | Domain names, social media accounts, digital subscriptions, NFTs, online businesses |
| **Other** | Jewelry, art, collectibles, intellectual property, business interests |

#### Liability Categories

| Category | Examples |
|----------|----------|
| **Mortgages** | Primary home mortgage, investment property mortgages |
| **Loans** | Personal loans, auto loans, student loans, business loans |
| **Credit Card Debt** | Outstanding balances across all credit cards |
| **Other Liabilities** | Tax obligations, legal judgments, alimony, child support |

#### Features

- **Net worth calculation**: Total assets minus total liabilities, updated in real time
- **Completion progress**: Per-category tracking showing what has been documented
- **Document attachments**: Deeds, titles, statements, contracts linked per asset/liability
- **Credential linking**: Securely stored login credentials cross-referenced from Vault

---

### Epic 9: Goals & Aspirations

- Personal and family goal tracking
- Short-term, medium-term, and long-term categorization
- Progress tracking and milestone markers
- Connection to Tasks & Reminders for actionable steps
- Linked to Emotional Legacy for aspirational alignment

---

### Epic 10: Will & Legal Actions

| Feature | Description |
|---------|-------------|
| **Will Upload/Download** | Upload existing will documents, download for offline review |
| **Will Versioning** | Track versions over time, compare changes, mark current active version |
| **Trusts** | Document trust arrangements, trustees, beneficiaries, terms |
| **Power of Attorney (POA)** | Financial and healthcare POA documentation and designees |
| **Guardianship** | Designated guardians for minor children or dependents |
| **Advance Directives** | Cross-linked with Body & Health section |
| **Business Continuity** | Succession plans, operating agreements, key contacts for business interests |

---

### Epic 11: Post-Loss Support

- Structured checklist for executors and family members after a loss
- Resource library with guides for common post-loss tasks (notifications, account closures, benefits claims)
- Task assignment to family members and executors
- Progress tracking across all post-loss activities
- Timeline guidance: what to do in the first 24 hours, first week, first month, first 6 months

---

### Epic 12: Vault

- **Centralized document repository** for the entire plan
- **Automatic aggregation** of documents uploaded across all sections (assets, health, legal, family)
- **Credentials tab** for securely stored login information (usernames, passwords, PINs, recovery keys)
- **Cross-linking** between documents and the plan sections they belong to
- **Search, filter, and sort** capabilities across all document types
- **Secure preview** — in-browser viewing without requiring download
- **Secure download** with audit logging of every access
- **Secure sharing** with role-based access controls per document

---

### Epic 13: Tasks & Reminders

| Feature | Description |
|---------|-------------|
| **Smart Task Engine** | Auto-generates tasks based on plan gaps and incomplete sections |
| **AI Proactive Suggestions** | AI-driven recommendations for tasks the user should consider based on their profile |
| **Manual Tasks** | User-created tasks with due dates, priorities, and assignees |
| **Multi-Channel Reminders** | Email, SMS, and push notification reminders |
| **Escalation Cadence** | Progressive reminder frequency as deadlines approach (gentle, moderate, urgent) |
| **Annual Review Prompt** | Yearly prompt to review and update the entire plan, triggered on plan anniversary |

---

### Epic 16: Marketing Website

- Public-facing marketing site separate from the application
- Feature overview, pricing page, testimonials
- SEO-optimized content pages
- Lead capture forms and conversion funnels
- Blog and resources section for thought leadership
- Partner landing pages for B2B2C distribution

---

### Epic 17: Executor Role

| Feature | Description |
|---------|-------------|
| **Invitation Flow** | PlanOwner invites executor via email with personalized message explaining the role |
| **Fast-Track Registration** | Simplified signup process for invited executors — reduced onboarding friction |
| **Access Controls with Timing** | Immediate access, upon-death access, or time-delayed access — all configured by PlanOwner |
| **Death Confirmation — eID** | Electronic identity verification to confirm death (eIDAS-compatible, Phase 2 full integration) |
| **Death Confirmation — Manual** | Manual confirmation with required documentation (death certificate upload) |
| **Death Confirmation — Dead Man's Switch** | Automated check-in system: if PlanOwner fails to respond to periodic check-ins, escalation sequence begins |
| **72-Hour Grace Period** | After death confirmation is triggered, a 72-hour waiting period before full executor access is granted |
| **Delivery Without Disclosure** | Executor can facilitate delivery of letters and content to beneficiaries without seeing the content themselves |

---

### Epic 18: Contributor Role

- **Temporary access** with defined expiration date
- **Scoped** to specific plan sections only (e.g., only Family, only Assets)
- **Suggestion-only mode** — contributors propose additions/edits but cannot directly modify plan content
- All suggestions require **explicit PlanOwner approval** before being applied
- **Activity logging** for all contributor actions
- PlanOwner can revoke contributor access at any time

---

### Epic 19: Beneficiary Role

- **Passive role** — no edit access to any plan content at any time
- **Timed delivery**: content released at a specific date/time set by PlanOwner
- **Event-triggered delivery**: content released upon death confirmation or other configured events
- **Holding screen** displayed until delivery conditions are met — reassuring, grief-sensitive messaging
- **Secure delivery** with encryption and access logging
- **One-time or persistent access** based on PlanOwner configuration

---

### Epic 23: Customer Billing

| Feature | Description |
|---------|-------------|
| **Stripe Integration** | Full payment processing via Stripe — cards, SEPA, iDEAL where applicable |
| **Subscription Management** | Monthly and annual plans, plan switching, cancellation |
| **Promotional Codes** | Discount codes for marketing campaigns and partnerships |
| **Referral Credits** | Account credits earned by referring new users to PlanAfter |
| **Upgrade/Downgrade** | Seamless tier changes with prorated billing calculations |

---

### Epic 24: Compliance

| Area | Details |
|------|---------|
| **GDPR** | DSAR processing, data export (machine-readable format), account/data deletion, consent management |
| **Cookie Consent** | Banner with granular opt-in/opt-out per cookie category |
| **eIDAS 2.0** | Phase 2 — European digital identity integration for death confirmation and identity verification |
| **ISO 27001 / 27701** | Information security and privacy management system certification targets |
| **SOC 2 Type II** | Service organization controls audit for enterprise/partner trust |
| **EU AI Act** | Compliance for AI Assistant features — transparency, human oversight, data governance |

---

### Epic 26: Encryption & Security

| Layer | Implementation |
|-------|---------------|
| **At Rest** | AES-256 encryption for all stored data |
| **In Transit** | TLS 1.2+ for all network communication |
| **Key Management** | KMS with automatic key rotation schedules |
| **Backups** | Encrypted backups with defined RPO/RTO targets |
| **Recovery** | Disaster recovery procedures with regular testing |
| **Monitoring** | Real-time security monitoring, alerting, and incident response runbooks |

---

### Epic 27: AI Assistant — Phase 1

| Feature | Description |
|---------|-------------|
| **On-Premise Deployment** | AI model runs on-premise (Qwen-class) — no user data ever sent to external AI services |
| **Contextual Guidance** | AI understands the user's current plan state and provides relevant, personalized guidance |
| **Document Routing** | AI suggests where uploaded documents should be filed within the plan structure |
| **Adaptive Questionnaire** | AI adjusts follow-up questions based on previous answers to reduce friction |
| **Task Recommendations** | AI recommends tasks based on plan gaps, user profile, and life stage |
| **EU AI Act Compliance** | Transparency about AI usage, human oversight mechanisms, data governance documentation |

---

## Phase 2 — Future

### Epic 14: Marketplace — Phase 2

- Vetted professionals directory: lawyers, financial advisors, estate planners, therapists, accountants
- Search and filter by specialty, location, language, ratings
- Booking and consultation scheduling integration
- Professional verification and review system

---

### Epic 15: Plans Shared With Me

- Aggregated view of all plans where the user has a role (Executor, Contributor, Beneficiary)
- Role-specific access and actions per shared plan
- Notification center for updates across all shared plans

---

### Epic 20: Admin Panel

| Feature | Description |
|---------|-------------|
| **RBAC** | Role-based access for admin team members (super admin, support, marketing, finance) |
| **Customer Management** | User accounts, subscription status, support history, account flags |
| **Lead Conversion** | Track marketing leads through conversion funnel, attribution reporting |
| **Revenue Reports** | MRR, ARR, churn rate, LTV, cohort analysis, revenue by channel |
| **Churn Tracking** | Identify at-risk users, cancellation reasons, win-back campaign management |
| **CMS** | Content management for marketing site, help center, resource library |
| **Audit Trail** | Full system-wide audit log for compliance, operations, and incident investigation |

---

### Epic 21: Annual PlanAfter Review — Phase 2

- Comprehensive annual review workflow triggered on plan anniversary
- Section-by-section guided update process
- Change summary and version comparison year over year
- Completion score recalculation after review

---

### Epic 22: Contract & Services Closure — Phase 2

- Automated service closure workflows after death confirmation
- Subscription cancellations, account closures, notification templates for service providers
- Guided checklists for executor to close financial accounts, utilities, memberships

---

### Epic 25: Mobile Apps — Phase 2

- Native iOS and Android applications
- Feature parity with web platform
- Biometric authentication (Face ID, fingerprint)
- Push notifications for tasks, reminders, and shared plan updates
- Offline access for critical information (emergency contacts, medical data)

---

### Epic 28: Archiving

- Long-term data archiving for inactive accounts
- Compliance with data retention policies (GDPR-aligned retention schedules)
- Retrievable archive format for regulatory or legal requests
- Automated archiving after configurable inactivity period

---

### Epic 29: Corporate Client Dashboards — Phase 2

- Multi-tenant dashboards for B2B2C corporate clients (employers, insurers, banks)
- Employee/member enrollment tracking and onboarding status
- Usage analytics and engagement reporting
- Custom branding per corporate client (logo, colors, domain)
- Aggregated reporting without exposing individual plan data

---

### Epic 30: Affiliate & White-Label — Phase 2

- Affiliate program with tracking links, attribution, and commission payouts
- White-label deployment for partners (banks, insurers, employers, pension funds)
- Custom branding: logo, colors, domain mapping, email templates
- Feature configuration per white-label instance
- Revenue share models with automated settlement
