# PlanAfter — User Types, Roles & Access Model

_Source: EPICS March 2026, Epics 2, 17, 18, 19_

---

## Account Types

### 1. PlanOwner (Primary User)
The sole author and editor of a plan. Full control over all content, roles, and sharing.

**How access is paid:**
| Type | Payer | Price |
|------|-------|-------|
| Direct (Self-Paid) | Individual | €100/yr (Basic) or €200/yr (Premium) |
| Sponsored (Corporate) | Employer, insurer, bank, pension fund | Included in partner deal |
| Sponsored (Family) | Primary family account holder | 50% discount (€50/yr or €100/yr) |
| Gifted | Gift code purchaser | Gift code activation |

### 2. Executor
Designated to manage and execute the plan after the PlanOwner's death.

- **Access timing:** Post-mortem (after death confirmation) or immediate (if configured)
- **Key capability:** Delivery without disclosure — can release content to beneficiaries WITHOUT reading it
- **Cost:** Free during PlanOwner's life; optional €12/yr Legacy Mode fee post-activation
- **Invitation:** Fast-track registration flow
- **Death confirmation methods:**
  1. Automated death registry verification (eID API, supported jurisdictions)
  2. Manual activation by executor (death certificate upload)
  3. Dead Man's Switch (check-in intervals with escalation)
- **72-hour grace period** after death certificate submission before full plan access

### 3. Contributor
Temporary helper role with scoped, suggestion-only access.

- **Access timing:** Immediate (pre-mortem only)
- **Duration:** Temporary, tied to task due dates
- **Capabilities:** Suggest changes (no direct edits), preview/download/print documents
- **PlanOwner approval required** for all contributions
- **Cost:** Free
- **Conversion path:** Contributor → PlanOwner (prompted after task completion)

### 4. Beneficiary
Passive recipient of designated content.

- **Access timing options:**
  - Immediate
  - Specific date
  - Post-mortem
  - Event-triggered (requires two confirmations)
- **Capabilities:** View-only for assigned content
- **Delivery:** Secure link or email
- **Holding screen** displayed before trigger condition is met
- **Cost:** Free; optional €12/yr Legacy Mode fee for ongoing access
- **Conversion path:** Beneficiary → PlanOwner (prompted after defined post-mortem period)

### 5. Admin (Internal)
Platform operators with NO access to user plan content.

| Role | Access |
|------|--------|
| Super Admin | Full platform management |
| Support | Customer management, limited data view |
| Financial Officer | Revenue reports, billing |
| Analyst | Usage analytics, anonymized data |
| Limited Viewer | Read-only dashboard access |

---

## Permission Formula

| Combination | Role |
|-------------|------|
| Access + Task | Contributor or Executor |
| Access without Task | Beneficiary or Executor |
| Task without Access | Executor |

**One person can hold multiple roles simultaneously** in the same plan.

---

## Single-Author, Controlled-Distribution Model

This is a core architectural principle:
- **PlanOwner is the sole editor** — nobody else can directly modify plan content
- **All other roles** interact through view access, suggestions, or task-based releases
- Contributors can only suggest — PlanOwner must approve
- Executors can release content without viewing it (delivery without disclosure)

---

## Sponsorship & Conversion Paths

```
Sponsored (Corporate) → Direct PlanOwner (when sponsor stops paying)
Sponsored (Family)    → Direct PlanOwner (when family plan ends)
Gifted               → Direct PlanOwner (when gift period expires)
Executor              → PlanOwner (conversion prompted after exploration)
Contributor           → PlanOwner (conversion prompted after task completion)
Beneficiary           → PlanOwner (conversion prompted after post-mortem period)
Free Trial            → Paid (targeting 20-30% conversion)
```

**Target conversion rates:**
- Sponsored → Direct: 60%
- Free Trial → Paid: 20-30%
