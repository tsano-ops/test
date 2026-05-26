# PlanAfter — GDPR Requirements

_Last updated: 2026-03-24_
_Status: Requirements identified — implementation pending_

## Why GDPR Matters for PlanAfter

PlanAfter stores highly sensitive personal data:
- Financial account details
- Medical records
- Family relationships and personal letters
- Encrypted credentials
- Legal documents

Operating in the EU (Bulgaria, Germany, Netherlands, UK) means full GDPR compliance is **mandatory**, not optional.

---

## Required Implementations

### 1. Lawful Basis for Processing
- [ ] Define lawful basis for each data category (contract, consent, legitimate interest)
- [ ] Document in privacy policy

### 2. Privacy Policy
- [ ] Plain-language privacy policy
- [ ] What data we collect and why
- [ ] How long we retain it
- [ ] Who we share it with (Stripe, S3, email provider)
- [ ] User rights clearly explained

### 3. User Rights (Must Build)
- [ ] **Right to access** — user can download all their data
- [ ] **Right to erasure** — delete account and all associated data permanently
- [ ] **Right to portability** — export data in machine-readable format (JSON)
- [ ] **Right to rectification** — edit any personal data
- [ ] **Right to object** — opt out of any non-essential processing

### 4. Consent
- [ ] Explicit consent for marketing emails (separate from service emails)
- [ ] Consent log (when, what, version of policy)
- [ ] Easy consent withdrawal

### 5. Data Breach Notification
- [ ] Breach detection process
- [ ] 72-hour notification procedure to supervisory authority
- [ ] User notification template

### 6. Data Processing Records
- [ ] Register of processing activities (Article 30)
- [ ] Third-party processor agreements (Stripe, AWS/S3, email provider)

### 7. Cookies
- [ ] Cookie audit (what cookies we set)
- [ ] Cookie consent banner (if any non-essential cookies)

---

## Encryption Requirements

| Data Type | Requirement |
|-----------|-------------|
| Passwords | bcryptjs hashing ✅ |
| Credentials (vault) | Field-level symmetric encryption (AES-256) — **NOT YET BUILT** |
| Documents (S3) | Server-side encryption — configure on S3 |
| Database at rest | PostgreSQL encryption — configure on hosting |
| Data in transit | HTTPS/TLS — required on all endpoints |

---

## Priority Actions

1. **Immediate:** Add delete account endpoint that purges all user data
2. **Before launch:** Privacy policy written and published
3. **Before launch:** Data export (JSON download of all user data)
4. **Before EU launch:** Credentials module uses proper encryption (not just hashing)
5. **Before scaling:** Formal GDPR audit / legal review

---

## Resources

- GDPR text: gdpr.eu
- Bulgaria supervisory authority: KZLD (Commission for Personal Data Protection)
- UK post-Brexit: UK GDPR (same requirements, different authority — ICO)
