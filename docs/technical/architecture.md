# PlanAfter — Technical Architecture

_Last updated: 2026-03-24_

## Overview

PlanAfter is a monorepo with a React frontend, NestJS backend, and PostgreSQL database.

```
planafter/
├── apps/
│   ├── web/        ← React 18 + TypeScript + Vite (port 5173)
│   └── api/        ← NestJS + TypeScript (port 4000)
├── packages/
│   └── shared/     ← Shared TypeScript types (@planafter/shared)
├── prisma/         ← Database schema (PostgreSQL via Prisma)
├── docs/           ← All project documentation
└── agents/         ← AI team CLI tool (Claude-built utility)
```

## Frontend (`apps/web`)

| Concern | Library |
|---------|---------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS + custom CSS (auth screens) |
| State | Zustand (auth) + React Query (server data) |
| Forms | React Hook Form + Zod |
| HTTP | Axios (`src/lib/api.ts`) |
| Icons | Lucide React |
| Routing | React Router v6 (`src/App.tsx`) |

## Backend (`apps/api`)

| Concern | Library |
|---------|---------|
| Framework | NestJS + TypeScript |
| Database | PostgreSQL 16 via Prisma ORM |
| Cache | Redis |
| Auth | JWT + Passport + bcryptjs |
| Validation | class-validator + class-transformer |
| Security | Helmet, CORS, rate limiting |

## Database

- **ORM:** Prisma (schema at `prisma/schema.prisma`)
- **Database:** PostgreSQL 16 (Docker)
- **17 models:** User, Profile, Asset, Liability, Credential, Document, Relationship, FamilyTreeNode, ContactInfo, MedicalRecord, Allergy, Education, Employment, Belief, Task, Letter, PlanShare, AiConversation, AuditLog, RefreshToken

## Infrastructure

- **Local dev:** Docker Compose (PostgreSQL + Redis)
- **Future:** Cloud deployment (TBD — AWS / Railway / Render)
- **File storage:** S3 (planned for Document vault)
- **Email:** SMTP service (planned)
- **Payments:** Stripe (planned)

## Dev Commands

```bash
docker compose up -d          # Start databases
npm run dev                   # Start both servers
npm run dev:api               # API only (:4000)
npm run dev:web               # Web only (:5173)
npm run db:generate           # Generate Prisma client
npm run db:push               # Push schema to DB
npm run db:studio             # Open Prisma Studio
```

## NestJS Module Pattern

Every feature follows this exact structure:
```
modules/[feature]/
├── [feature].module.ts       ← Imports, exports
├── [feature].controller.ts   ← Routes + @UseGuards(JwtAuthGuard)
├── [feature].service.ts      ← Business logic + Prisma queries
└── dto/[feature].dto.ts      ← Input validation
```

## Auth Flow

1. User registers → password hashed with bcryptjs → stored in DB
2. Email verification code sent → user verifies
3. Login → JWT access token (short-lived) + refresh token (long-lived)
4. Protected routes use `@UseGuards(JwtAuthGuard)`
5. `req.user.userId` available in all protected controllers
