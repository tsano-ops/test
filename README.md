# PlanAfter

**Life & Estate Planning Platform**

A comprehensive platform that helps individuals organize, protect, and share their most important life information with trusted people.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS |
| State | Zustand + React Query |
| Backend | NestJS + TypeScript |
| Database | PostgreSQL 16 (Prisma ORM) |
| Cache | Redis |
| Auth | JWT + Passport |

## Project Structure

```
planafter/
├── apps/
│   ├── api/              ← NestJS backend
│   │   └── src/
│   │       ├── modules/
│   │       │   ├── auth/       ← Registration, login, JWT
│   │       │   ├── users/      ← Profile management
│   │       │   └── health/     ← Health check
│   │       ├── prisma/         ← DB service
│   │       └── main.ts
│   └── web/              ← React frontend
│       └── src/
│           ├── components/     ← UI components
│           ├── pages/          ← Route pages
│           ├── stores/         ← Zustand stores
│           ├── lib/            ← API client, utils
│           └── styles/         ← Tailwind globals
├── packages/
│   └── shared/           ← Shared types & constants
├── prisma/
│   └── schema.prisma     ← Database schema
├── docker-compose.yml    ← PostgreSQL + Redis
└── .env                  ← Environment variables
```

## Quick Start

### Prerequisites
- Node.js >= 20
- Docker & Docker Compose
- npm

### 1. Start databases
```bash
docker compose up -d
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup database
```bash
npm run db:generate
npm run db:push
```

### 4. Start development servers
```bash
npm run dev
```

This starts:
- **API** at http://localhost:4000/api/v1
- **Frontend** at http://localhost:5173

### 5. Test the API
```bash
# Health check
curl http://localhost:4000/api/v1/health

# Register
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!@#"}'

# Check console for verification code, then:
curl -X POST http://localhost:4000/api/v1/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","code":"123456"}'
```

## Environment Variables

Copy `.env.example` to `.env` and fill in values. For local development, defaults work out of the box.

## Development Roadmap

- [x] **Phase 1** — Scaffolding, Auth, DB Schema
- [ ] **Phase 2** — Dashboard, Profile
- [ ] **Phase 3** — Assets & Vault
- [ ] **Phase 4** — Family & Legacy
- [ ] **Phase 5** — AI, Sharing, Legal
- [ ] **Phase 6** — Post-Loss, Polish, Launch

---

**Poslepis Ltd.** — Confidential
