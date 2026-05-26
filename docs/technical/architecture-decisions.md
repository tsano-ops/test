# PlanAfter — Architecture Decisions

_Last updated: 2026-03-24_
_Source: A Data Pro partnership meeting, 05 March 2026_

## Current Codebase (Pre-A Data Pro)

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite (port 5173) |
| Styling | Tailwind CSS + custom CSS classes (globals.css for auth screens) |
| State Management | Zustand (auth state) + React Query (server data) |
| Forms | React Hook Form + Zod validation |
| Backend | NestJS + TypeScript (port 4000) |
| Database | PostgreSQL 16 via Prisma ORM |
| Cache | Redis |
| Auth | JWT + Passport + bcryptjs for hashing |
| Validation | class-validator + class-transformer |
| Infrastructure | Docker Compose (PostgreSQL + Redis locally) |

---

## A Data Pro Proposed Architecture

During the partnership meeting on 05 March 2026, A Data Pro proposed the following production architecture:

| Layer | Proposed Technology |
|-------|-------------------|
| Frontend | ReactJS / NextJS |
| Backend | Python microservices |
| Database | PostgreSQL — 2 logical databases |
| Deployment | Kubernetes |
| AI Model | Qwen LLM (on-premise) |

### Database Architecture: Two Logical Databases

| Database | Purpose |
|----------|---------|
| **Encrypted wills database** | Stores highly sensitive legal documents (wills, trusts, POA) with additional encryption layer beyond standard at-rest encryption |
| **Operational user data database** | Standard user data, profiles, assets, family, tasks, settings — encrypted at rest with AES-256 |

Rationale: Separation of concerns for compliance and security. The encrypted wills database has stricter access controls, audit requirements, and potentially different backup/retention policies.

---

## Engineering KPIs

| KPI | Target |
|-----|--------|
| Sprint velocity | Measurable and tracked per sprint (baseline established in first 3 sprints) |
| Code review coverage | 100% — every PR must be reviewed before merge |
| Test coverage | 70% minimum (unit tests) |
| Blocker resolution time | 24 hours maximum |
| OWASP critical vulnerabilities | 0 (zero tolerance for critical security findings) |
| Uptime (post-MVP) | 99.5% minimum |
| API response time (95th percentile) | Under 2 seconds |
| Critical bugs post-release | Under 5% of total issues |

---

## Sprint Process

| Parameter | Value |
|-----------|-------|
| Sprint length | 1 week |
| Sprint Review | Every Wednesday, includes live demo |
| Sprint Planning | Start of each sprint week |
| Retrospective | End of each sprint |

### Definition of Done

A feature/story is considered "done" when all of the following are met:

1. Code review passed (approved by at least one reviewer)
2. Unit tests written with minimum 70% coverage for new code
3. Successfully deployed to staging environment
4. Product Owner (Violetka) acceptance confirmed

---

## Project Management

| Decision | Status |
|----------|--------|
| PM Tool | Jira, Linear, or ClickUp — final decision after Discovery phase |
| Repository | Monorepo structure maintained |
| CI/CD | To be set up by the Security/DevOps lead |

### Meeting Cadence

| Meeting | Frequency | Participants |
|---------|-----------|-------------|
| Sprint Review | Weekly (Wednesday) | Dev team + PO + PM |
| Stakeholder Review | Monthly | Leadership team |
| Strategic Review | Quarterly | Core team + advisors |
| Emergency | As needed | Relevant stakeholders |

---

## Security Architecture

### Encryption

| Layer | Standard |
|-------|----------|
| Data at rest | AES-256 |
| Data in transit | TLS 1.2+ (minimum) |
| Key management | KMS with automatic key rotation |

### Authentication & Access

| Feature | Implementation |
|---------|---------------|
| Two-Factor Authentication | Authenticator app (TOTP), SMS, FIDO2 (hardware keys) |
| HTTP Security | HSTS (HTTP Strict Transport Security) enabled |
| Audit Trail | Immutable audit logs for all sensitive operations |
| Session Management | JWT with short-lived access tokens + refresh token rotation |

### Security Standards Targets

- OWASP Top 10 compliance
- ISO 27001 / 27701 certification path
- SOC 2 Type II audit readiness
- Regular penetration testing schedule

---

## AI Architecture

| Decision | Details |
|----------|---------|
| Model | Qwen-class LLM (on-premise deployment) |
| Data policy | No user data is ever sent to external AI services |
| Deployment | On-premise within PlanAfter's infrastructure |
| Compliance | EU AI Act compliant — transparency, human oversight, data governance |
| Use cases | Contextual guidance, document routing, adaptive questionnaires, task recommendations |

Rationale: On-premise AI was chosen to ensure complete data sovereignty. Given the sensitivity of estate planning data (wills, medical records, financial assets), sending any user data to third-party AI providers was ruled out. The Qwen model family provides sufficient capability for the planned use cases while allowing full on-premise deployment.

---

## Key Architecture Decisions Log

| # | Decision | Rationale | Date |
|---|----------|-----------|------|
| ADR-001 | Two separate logical PostgreSQL databases | Compliance isolation for sensitive legal documents vs. operational data | 2026-03-05 |
| ADR-002 | On-premise AI only (no external AI services) | Data sovereignty for sensitive estate planning data; EU AI Act compliance | 2026-03-05 |
| ADR-003 | Kubernetes for deployment | Scalability, service isolation, infrastructure-as-code | 2026-03-05 |
| ADR-004 | Python microservices for backend | A Data Pro team expertise; better AI/ML ecosystem integration for Qwen model | 2026-03-05 |
| ADR-005 | 1-week sprints | Fast feedback loops during MVP phase; can extend to 2 weeks post-launch | 2026-03-05 |
| ADR-006 | AES-256 + TLS 1.2+ encryption baseline | Industry standard for financial/medical data handling; required for ISO 27001 path | 2026-03-05 |
| ADR-007 | FIDO2 support for 2FA | Highest assurance level for authentication; future eIDAS 2.0 compatibility | 2026-03-05 |
